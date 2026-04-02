// Doc site shell for koka-redex
// Uses koka-community/html to generate page wrapper around Madoko content.

import html/html

val playground-base = "/koka-redex/playground"

pub fun doc-page(page-title: string, content: string): string
  "<!DOCTYPE html>\n" ++
  html
    head
      if page-title == "Tutorial · Koka Redex" then
        component("script")
          add-attr("src", playground-base ++ "/coi-serviceworker.js")
      meta-charset()
      meta-viewport()
      title
        text(page-title)
      stylesheet("https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400&display=swap")
      stylesheet("styles/site.css")
      // Koka playground embed configuration
      component("meta")
        add-attr("name", "koka-wasm-url")
        add-attr("content", playground-base ++ "/koka-playground.wasm")
      component("meta")
        add-attr("name", "koka-stdlib-url")
        add-attr("content", playground-base ++ "/")
    body
      nav(classes=["site-nav"])
        div(classes=["nav-brand"])
          a("index.html")
            text("Koka Redex")
        div(classes=["nav-links"])
          a("index.html", classes=["nav-link"])
            text("Overview")
          a("tutorial.html", classes=["nav-link"])
            text("Tutorial")
          a("engine.html", classes=["nav-link"])
            text("Engine")
          a("derive.html", classes=["nav-link"])
            text("Derive")
          a("rendering.html", classes=["nav-link"])
            text("Rendering")
          a("api.html", classes=["nav-link"])
            text("API")
      main(classes=["site-content"])
        raw-html(content)
      footer(classes=["site-footer"])
        text("Koka Redex")
      component("script")
        add-attr("type", "module")
        add-attr("src", playground-base ++ "/embed.js")
  .show
