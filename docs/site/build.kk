// koka-redex doc site build script
//
// Usage:
//   koka -e -i<path-to-koka-community/html> build.kk
// Or:
//   ./build.sh

import std/os/path
import std/os/dir
import std/os/file
import std/os/process
import std/os/env
import std/text/regex
import shell

fun main()
  val out = "out".path

  println("Creating output directories...")
  [out, out / "styles", out / "playground"].foreach fn(d)
    if !d.is-directory then ensure-dir(d)

  println("Copying static assets...")
  copy-dir("styles".path, out / "styles")

  // Copy playground dist for embedded editors
  println("Copying playground assets...")
  deploy-playground(out / "playground")

  println("Building pages...")
  val pages = [
    ("index",     "Koka Redex"),
    ("tutorial",  "Tutorial · Koka Redex"),
    ("engine",    "Engine · Koka Redex"),
    ("derive",    "Derive · Koka Redex"),
    ("rendering", "Rendering · Koka Redex"),
    ("api",       "API Reference · Koka Redex")
  ]

  pages.foreach fn((name, page-title))
    build-page(out, name, page-title)

  println("Done. Site written to out/")

// Deploy playground assets needed for embedded <koka-editor> elements
fun deploy-playground(dst: path): io ()
  val home = get-env-value("HOME").default("/Users/timwhiting")
  val playground-dist = get-env-value("PLAYGROUND_DIST").default(
    home ++ "/koka/.worktrees/redex/web/playground/dist").path
  if !playground-dist.is-directory then
    println("  Warning: playground dist not found at " ++ playground-dist.string)
    println("  Build it first: cd ~/koka/.worktrees/redex/web/playground && npm run build")
    return ()

  // WASM compiler binary
  val wasm = playground-dist / "koka-playground.wasm"
  if wasm.is-file then copy-file(wasm, dst / "koka-playground.wasm")

  // Bundled JS/CSS assets (hashed filenames from Vite)
  copy-dir(playground-dist / "assets", dst / "assets")

  // Embed entry point — create a stable name that redirects to the hashed bundle
  // Find the embed-*.js file in assets
  val embed-js = find-embed-js(dst / "assets")
  if !embed-js.is-empty then
    // Write a small redirect module
    write-text-file(dst / "embed.js",
      "export * from './assets/" ++ embed-js ++ "';\n" ++
      "import './assets/" ++ embed-js ++ "';\n")
    println("  Copied embed bundle (" ++ embed-js ++ ")")
  else
    println("  Warning: embed JS bundle not found in assets/")

  // Stdlib sources (std/, type-level/, koka-redex/)
  copy-dir(playground-dist / "lib", dst / "lib")

  // Precompiled .kki + .mjs
  copy-dir(playground-dist / "precompiled", dst / "precompiled")

  // Manifests
  ["stdlib-manifest.json", "precompiled-manifest.json"].foreach fn(f)
    val src = playground-dist / f
    if src.is-file then copy-file(src, dst / f)

  // Cross-origin isolation service worker
  val coi = playground-dist / "coi-serviceworker.js"
  if coi.is-file then copy-file(coi, dst / "coi-serviceworker.js")

  println("  Playground deployed to " ++ dst.string)

// Find the embed-*.js bundle in the assets directory
fun find-embed-js(assets-dir: path): io string
  if !assets-dir.is-directory then return ""
  val files = list-directory(assets-dir)
  match files.filter(fn(f) f.basename.starts-with("embed-").is-just && f.basename.ends-with(".js").is-just).take(1)
    Cons(f, _) -> f.basename
    _ -> ""

fun build-page(out: path, name: string, page-title: string): io ()
  val src-mdk  = "content".path / (name ++ ".mdk")
  val out-html = out / (name ++ ".html")

  if !src-mdk.is-file then
    println("  Skipping missing: " ++ src-mdk.string)
    return ()

  val deps = [src-mdk, "content/style.mdk".path, "styles/site.css".path, "shell.kk".path]
  if target-up-to-date(out-html, deps) then
    println("  Skipping unchanged: " ++ name)
    return ()

  println("  " ++ name)

  val tmp-dir  = ("/tmp/koka-redex-doc-" ++ name).path
  if !tmp-dir.is-directory then ensure-dir(tmp-dir)
  val tmp-html = tmp-dir / (name ++ ".html")
  val madoko-cmd = "madoko --odir=" ++ tmp-dir.string ++ " -mline-no:false -mlogo:false " ++ src-mdk.string
  val code = run-system(madoko-cmd)
  if code != 0 then
    println("  Warning: madoko exited " ++ code.show ++ " for " ++ name)

  if !tmp-html.is-file then
    println("  Error: madoko did not produce " ++ tmp-html.string)
    return ()
  val madoko-html = read-text-file(tmp-html)
  val fragment = extract-body(madoko-html)
  val final-html = doc-page(page-title, fragment)
  write-text-file(out-html, final-html)

fun extract-body(h: string): io string
  val body-re = regex("<body[^>]*>([\\s\\S]*)</body>")
  match body-re.exec(h)
    Cons(_, Cons(group1, _)) -> group1.string.trim
    _ -> h

fun copy-dir(src: path, dst: path): io ()
  if !src.is-directory then return ()
  ensure-dir(dst)
  list-directory(src).foreach fn(p)
    val src-f = src / p.basename
    val dst-f = dst / p.basename
    if src-f.is-file then copy-file(src-f, dst-f)
    elif src-f.is-directory then copy-dir(src-f, dst-f)

fun target-up-to-date(target: path, deps: list<path>): io bool
  if !target.is-file then False
  else deps.all fn(dep)
    if dep.is-file then run-system("test " ++ target.string ++ " -nt " ++ dep.string) == 0
    else True
