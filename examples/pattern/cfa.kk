module examples/pattern/cfa

// 0CFA with store-passing using `pat<a>` metavariables.

import koka-redex/forward-bridge
import koka-redex/derive
import koka-redex/pattern
import koka-redex/latex
import koka-redex/markdown

// ----------------------------------------------------------------------------
// Domain types
// ----------------------------------------------------------------------------

pub type expr
  EVar(nm: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

pub type store
  SNil
  SCons(nm: string, vl: expr, rest: store)

// ----------------------------------------------------------------------------
// Con-info descriptors
// ----------------------------------------------------------------------------

pub type var-expr
pub fun var-expr/name/show(): name<var-expr>
  Name("var")
pub type app-expr
pub fun app-expr/name/show(): name<app-expr>
  Name("app")
pub type lam-expr
pub fun lam-expr/name/show(): name<lam-expr>
  Name("lam")
pub type snil-store
pub fun snil-store/name/show(): name<snil-store>
  Name("snil")
pub type scons-store
pub fun scons-store/name/show(): name<scons-store>
  Name("scons")

pub val var-expr/con-info : con-info<var-expr, t-cons<string, t-nil>, expr> = Con-info(
  fn(e) match e { EVar(n) -> Just(n +: TNil); _ -> Nothing }, fn(TCons(n, _)) EVar(n))
pub val app-expr/con-info : con-info<app-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { EApp(a, b) -> Just(a +: b +: TNil); _ -> Nothing }, fn(TCons(a, TCons(b, _))) EApp(a, b))
pub val lam-expr/con-info : con-info<lam-expr, t-cons<string, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { ELam(x, body) -> Just(x +: body +: TNil); _ -> Nothing }, fn(TCons(x, TCons(body, _))) ELam(x, body))
val expr-info =
  mk-field(var-expr/con-info) *: mk-field(app-expr/con-info) *: mk-field(lam-expr/con-info) *: TNil

pub val snil-store/con-info : con-info<snil-store, t-nil, store> = Con-info(
  fn(s) match s { SNil -> Just(TNil); _ -> Nothing }, fn(_) SNil)
pub val scons-store/con-info : con-info<scons-store, t-cons<string, t-cons<expr, t-cons<store, t-nil>>>, store> = Con-info(
  fn(s) match s { SCons(n, v, rest) -> Just(n +: v +: rest +: TNil); _ -> Nothing }, fn(TCons(n, TCons(v, TCons(rest, _)))) SCons(n, v, rest))
val store-info =
  mk-field(snil-store/con-info) *: mk-field(scons-store/con-info) *: TNil

// ----------------------------------------------------------------------------
// Derived to-term / from-term
// ----------------------------------------------------------------------------

pub fun expr/to-term(e: expr): div term
  val n/to-term = expr/to-term
  derive-to-term(e, expr-info)

pub fun store/to-term(s: store): div term
  val n/to-term = store/to-term
  derive-to-term(s, store-info)

pub fun expr/from-term(t: term): <exn,div> expr
  val n/from-term = expr/from-term
  derive-from-term(t, expr-info)

pub fun store/from-term(t: term): <exn,div> store
  val n/from-term = store/from-term
  derive-from-term(t, store-info)

// ----------------------------------------------------------------------------
// LaTeX rendering
// ----------------------------------------------------------------------------

fun var-expr/render-latex(_: name<var-expr>, TCons(n, _): t-cons<string, t-nil>): <div,exn> string
  n
fun app-expr/render-latex(_: name<app-expr>, TCons(e1, TCons(e2, _)): t-cons<string, t-cons<string, t-nil>>): <div,exn> string
  e1 ++ "\\; " ++ e2
fun lam-expr/render-latex(_: name<lam-expr>, TCons(x, TCons(body, _)): t-cons<string, t-cons<string, t-nil>>): <div,exn> string
  "\\lambda " ++ x ++ ".\\; " ++ body
fun scons-store/render-latex(_: name<scons-store>, TCons(n, TCons(v, TCons(rest, _))): t-cons<string, t-cons<string, t-cons<string, t-nil>>>): <div,exn> string
  rest ++ "[" ++ n ++ " \\mapsto " ++ v ++ "]"
fun snil-store/name-latex(_: name<snil-store>): string
  "\\emptyset"

// ----------------------------------------------------------------------------
// Markdown rendering (only where it differs)
// ----------------------------------------------------------------------------

fun app-expr/render-md(_: name<app-expr>, TCons(e1, TCons(e2, _)): t-cons<string, t-cons<string, t-nil>>): <div,exn> string
  e1 ++ " " ++ e2
fun lam-expr/render-md(_: name<lam-expr>, TCons(x, TCons(body, _)): t-cons<string, t-cons<string, t-nil>>): <div,exn> string
  "λ" ++ x ++ ". " ++ body
fun scons-store/render-md(_: name<scons-store>, TCons(n, TCons(v, TCons(rest, _))): t-cons<string, t-cons<string, t-cons<string, t-nil>>>): <div,exn> string
  rest ++ "[" ++ n ++ " ↦ " ++ v ++ "]"
fun snil-store/name-md(_: name<snil-store>): string
  "∅"

// ----------------------------------------------------------------------------
// Term renderers
// ----------------------------------------------------------------------------

val cfa/term-show-latex: term-renderer =
  val expr-entries : list<latex-entry> = expr-info.to-list
  val store-entries : list<latex-entry> = store-info.to-list
  make-term-renderer(expr-entries.map(entry) ++ store-entries.map(entry), ?var-render=latex/var-render)

val cfa/term-show-md: term-renderer =
  val expr-entries : list<md-entry> = expr-info.to-list
  val store-entries : list<md-entry> = store-info.to-list
  make-term-renderer(expr-entries.map(entry) ++ store-entries.map(entry), ?var-render=md/var-render)

// pat/show-latex and pat/show-md from the framework resolve
// ?term-show-latex → cfa/term-show-latex and ?term-show-md → cfa/term-show-md

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

pub type r-eval
  REval
pub fun r-eval/judgment-name(_: r-eval): string
  "eval"
pub fun r-eval/show-md(_: r-eval): string
  "⇓"
pub fun r-eval/show-latex(_: r-eval): string
  "\\Downarrow"

pub type r-lookup
  RLookup
pub fun r-lookup/judgment-name(_: r-lookup): string
  "lookup"
pub fun r-lookup/show-md(_: r-lookup): string
  "∈"
pub fun r-lookup/show-latex(_: r-lookup): string
  "\\in"

// String rendering for rule names
pub fun string/show-latex(s: string): string
  s
pub fun string/show-md(s: string): string
  s

// ----------------------------------------------------------------------------
// Pattern constructors
// ----------------------------------------------------------------------------

fun p-var(nm: pat<string>): pat<expr>
  PatTerm(TNode("var", [nm.to-term]))
fun p-app(e1: pat<expr>, e2: pat<expr>): pat<expr>
  PatTerm(TNode("app", [e1.to-term, e2.to-term]))
fun p-lam(x: pat<string>, body: pat<expr>): pat<expr>
  PatTerm(TNode("lam", [x.to-term, body.to-term]))
fun p-snil(): pat<store>
  PatTerm(TNode("snil", []))
fun p-scons(nm: pat<string>, vl: pat<expr>, rest: pat<store>): pat<store>
  PatTerm(TNode("scons", [nm.to-term, vl.to-term, rest.to-term]))

// ----------------------------------------------------------------------------
// External solver
// ----------------------------------------------------------------------------

fun store-lookup-all(s: store, nm: string): div list<expr>
  match s
    SCons(n, vl, rest) ->
      val found = if n == nm then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

fun cfa-relation()
  with with-pats
  val x  : pat<string> = fresh-pat("x")
  val e  : pat<expr> = fresh-pat("e")
  val e1 : pat<expr> = fresh-pat("e1")
  val e2 : pat<expr> = fresh-pat("e2")
  val e3 : pat<expr> = fresh-pat("e3")
  val s  : pat<store> = fresh-pat("s")
  val s0 : pat<store> = fresh-pat("s0")
  val s1 : pat<store> = fresh-pat("s1")
  val s2 : pat<store> = fresh-pat("s2")
  val s3 : pat<store> = fresh-pat("s3")
  val v  : pat<expr> = fresh-pat("v")
  val v2 : pat<expr> = fresh-pat("v2")
  val vl : pat<expr> = fresh-pat("val")

  with relation-def
  // E-Lam: λ values evaluate to themselves
  with rule(
    axiom
    --- "E-Lam" -->
    p-lam(x, e) \ s |- REval \ p-lam(x, e) \ s)
  // E-Var: variable lookup (external)
  with external-rule(s \ x |- RLookup \ v,
    fn(TCons(s-val: store, x-val : string))
      store-lookup-all(s-val, x-val)
    )
  with rule(
    s \ x |- RLookup \ vl
    --- "E-Var" -->
    p-var(x) \ s |- REval \ vl \ s)
  // E-App: application with store threading
  single/rule(
    e1 \ s0 |- REval \ p-lam(x, e3) \ s1 \\
    e2 \ s1 |- REval \ v2 \ s2 \\
    e3 \ p-scons(x, v2, s2) |- REval \ v \ s3
    --- "E-App" -->
    p-app(e1, e2) \ s0 |- REval \ v \ s3)

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------

pub fun main()
  with with-pats
  val rel = cfa-relation()

  println("--- LaTeX ---")
  println(rel.relation-to-latex)
  println("\n--- Markdown ---")
  println(rel.relation-to-md("eval/lookup"))

  println("\n--- (λx.x)(λz.z) ---")
  val id-fn = ELam("x", EVar("x"))
  val goal1 = pat(EApp(id-fn, ELam("z", EVar("z")))) \ pat(SNil) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table1 = forward-search(goal1, rel)
  println("Entries: " ++ table1.length.show)

  println("\n--- let f = λx.x in (f λa.a)(f λb.b) ---")
  val lam-a = ELam("a", EVar("a"))
  val lam-b = ELam("b", EVar("b"))
  val body = EApp(EApp(EVar("f"), lam-a), EApp(EVar("f"), lam-b))
  val prog2 = EApp(ELam("f", body), id-fn)
  val goal2 = pat(prog2) \ pat(SNil) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table2 = forward-search(goal2, rel)
  println("Entries: " ++ table2.length.show)

  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.map(fn(kv) "  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **").foreach(println)
