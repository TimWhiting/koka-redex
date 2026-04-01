module examples/pattern/cfa

// 0CFA with store-passing using `pat<a>` metavariables.
// Domain types are CLEAN — no Any/metavar constructors needed.
// Metavariables come from `pat<a>` with fresh-pat.

import koka-redex/forward-bridge
import koka-redex/derive
import koka-redex/pattern
import koka-redex/latex
import koka-redex/markdown
import std/core/undiv

// ----------------------------------------------------------------------------
// Clean domain types — no metavariable constructors!
// ----------------------------------------------------------------------------

pub type expr
  EAtom(nm: string)
  EVar(nm: expr)
  EApp(e1: expr, e2: expr)
  ELam(x: expr, body: expr)

pub type store
  SNil
  SCons(nm: expr, vl: expr, rest: store)

// ----------------------------------------------------------------------------
// Con-info descriptors
// ----------------------------------------------------------------------------

pub type atom-expr
pub fun atom-expr/name/show(): name<atom-expr>
  Name("")
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

pub val atom-expr/con-info : con-info<atom-expr, string, expr> = Con-info(
  fn(e) match e { EAtom(n) -> Just(n); _ -> Nothing }, EAtom)
pub val var-expr/con-info : con-info<var-expr, t-cons<expr, t-nil>, expr> = Con-info(
  fn(e) match e { EVar(n) -> Just(n +: TNil); _ -> Nothing }, fn(TCons(n, _)) EVar(n))
pub val app-expr/con-info : con-info<app-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { EApp(a, b) -> Just(a +: b +: TNil); _ -> Nothing }, fn(TCons(a, TCons(b, _))) EApp(a, b))
pub val lam-expr/con-info : con-info<lam-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { ELam(x, body) -> Just(x +: body +: TNil); _ -> Nothing }, fn(TCons(x, TCons(body, _))) ELam(x, body))
val expr-info =
  mk-field(atom-expr/con-info) *: mk-field(var-expr/con-info) *: mk-field(app-expr/con-info) *: mk-field(lam-expr/con-info) *: TNil

pub val snil-store/con-info : con-info<snil-store, t-nil, store> = Con-info(
  fn(s) match s { SNil -> Just(TNil); _ -> Nothing }, fn(_) SNil)
pub val scons-store/con-info : con-info<scons-store, t-cons<expr, t-cons<expr, t-cons<store, t-nil>>>, store> = Con-info(
  fn(s) match s { SCons(n, v, rest) -> Just(n +: v +: rest +: TNil); _ -> Nothing }, fn(TCons(n, TCons(v, TCons(rest, _)))) SCons(n, v, rest))
val store-info =
  mk-field(snil-store/con-info) *: mk-field(scons-store/con-info) *: TNil

// ----------------------------------------------------------------------------
// Derived to-term / from-term (pretend-no-div for forward-bridge compat)
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
// LaTeX/Markdown formatters
// ----------------------------------------------------------------------------

pub fun expr/show-md(e: expr): div string
  match e
    EAtom(n) -> n
    EVar(n) -> n.show-md
    EApp(e1, e2) -> e1.show-md ++ " " ++ e2.show-md
    ELam(x, body) -> "\\lambda " ++ x.show-md ++ ". " ++ body.show-md

pub fun expr/show-latex-j(e: expr): div string
  match e
    EAtom(n) -> n
    EVar(n) -> n.show-latex-j
    EApp(e1, e2) -> e1.show-latex-j ++ "\\; " ++ e2.show-latex-j
    ELam(x, body) -> "\\lambda " ++ x.show-latex-j ++ ".\\; " ++ body.show-latex-j

pub fun store/show-md(s: store): div string
  match s
    SNil -> "\\emptyset"
    SCons(n, v, rest) -> rest.show-md ++ "[" ++ n.show-md ++ " \\mapsto " ++ v.show-md ++ "]"

pub fun store/show-latex-j(s: store): div string
  match s
    SNil -> "\\emptyset"
    SCons(n, v, rest) -> rest.show-latex-j ++ "[" ++ n.show-latex-j ++ " \\mapsto " ++ v.show-latex-j ++ "]"

// Pattern formatters: delegate to inner type or show metavar name
// ----------------------------------------------------------------------------
// Term-level renderers (interpret term structure back to readable form)
// ----------------------------------------------------------------------------

fun term/show-md(t: term): div string
  match t
    TAtom(n) -> n
    TVar(nm, id) -> if id == 0 then nm else nm ++ id.show
    TNode("var", [n]) -> term/show-md(n)
    TNode("app", [e1, e2]) -> term/show-md(e1) ++ " " ++ term/show-md(e2)
    TNode("lam", [x, body]) -> "\\lambda " ++ term/show-md(x) ++ ". " ++ term/show-md(body)
    TNode("snil", []) -> "\\emptyset"
    TNode("scons", [n, v, rest]) -> term/show-md(rest) ++ "[" ++ term/show-md(n) ++ " \\mapsto " ++ term/show-md(v) ++ "]"
    _ -> t.show

fun term/show-latex-j(t: term): div string
  match t
    TAtom(n) -> n
    TVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    TNode("var", [n]) -> term/show-latex-j(n)
    TNode("app", [e1, e2]) -> term/show-latex-j(e1) ++ "\\; " ++ term/show-latex-j(e2)
    TNode("lam", [x, body]) -> "\\lambda " ++ term/show-latex-j(x) ++ ".\\; " ++ term/show-latex-j(body)
    TNode("snil", []) -> "\\emptyset"
    TNode("scons", [n, v, rest]) -> term/show-latex-j(rest) ++ "[" ++ term/show-latex-j(n) ++ " \\mapsto " ++ term/show-latex-j(v) ++ "]"
    _ -> t.show

// Pattern renderers: delegate to term-level renderers
pub fun pexpr/show-md(p: pat<expr>): div string
  match p
    PatVar(nm, _id) -> nm
    PatTerm(t) -> term/show-md(t)

pub fun pexpr/show-latex-j(p: pat<expr>): div string
  match p
    PatVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    PatTerm(t) -> term/show-latex-j(t)

pub fun pstore/show-md(p: pat<store>): div string
  match p
    PatVar(nm, _id) -> nm
    PatTerm(t) -> show-md(t)

pub fun pstore/show-latex-j(p: pat<store>): div string
  match p
    PatVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    PatTerm(t) -> term/show-latex-j(t)

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

pub type r-eval
  REval
pub fun r-eval/judgment-name(_: r-eval): string
  "eval"
pub fun r-eval/show-md(_: r-eval): string
  "\\Downarrow"
pub fun r-eval/show-latex-j(_: r-eval): string
  "\\Downarrow"

pub type r-lookup
  RLookup
pub fun r-lookup/judgment-name(_: r-lookup): string
  "lookup"
pub fun r-lookup/show-md(_: r-lookup): string
  "\\in"
pub fun r-lookup/show-latex-j(_: r-lookup): string
  "\\in"

// Default formatters for names
pub fun default/show-md(a: a, ?show: a -> string): string
  show(a)
pub fun default/show-latex-j(a: a, ?show: a -> string): string
  show(a)

// ----------------------------------------------------------------------------
// Pattern constructors: build compound patterns from pattern parts
// These mirror the domain type constructors but work on patterns.
// ----------------------------------------------------------------------------

fun p-atom(nm: string): pat<expr>
  PatTerm(TAtom(nm))

fun p-var(nm: pat<expr>): pat<expr>
  PatTerm(TNode("var", [nm.to-term]))

fun p-app(e1: pat<expr>, e2: pat<expr>): pat<expr>
  PatTerm(TNode("app", [e1.to-term, e2.to-term]))

fun p-lam(x: pat<expr>, body: pat<expr>): pat<expr>
  PatTerm(TNode("lam", [x.to-term, body.to-term]))

fun p-snil(): pat<store>
  PatTerm(TNode("snil", []))

fun p-scons(nm: pat<expr>, vl: pat<expr>, rest: pat<store>): pat<store>
  PatTerm(TNode("scons", [nm.to-term, vl.to-term, rest.to-term]))

// ----------------------------------------------------------------------------
// Rules — using fresh-pat for metavariables
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// External solver + policy
// ----------------------------------------------------------------------------

fun store-lookup-all(s: store, nm: expr): div list<expr>
  match s
    SCons(n, vl, rest) ->
      val found = if n.to-term.show == nm.to-term.show then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

fun cfa-relation()
  with with-pats
  val x  : pat<expr> = fresh-pat("x")
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
    fn(TCons(s-val: store, x-val : expr)) 
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

  // LaTeX rendering
  println("--- LaTeX ---")
  println(rel.relation-to-latex)
  println("\n--- Markdown ---")
  println(rel.relation-to-md("eval/lookup"))

  // Example 1: (λx.x)(λz.z)
  println("\n--- (λx.x)(λz.z) ---")
  val id-fn = ELam(EAtom("x"), EVar(EAtom("x")))
  val goal1 = pat(EApp(id-fn, ELam(EAtom("z"), EVar(EAtom("z"))))) \ pat(SNil) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table1 = forward-search(goal1, rel)
  println("Entries: " ++ table1.length.show)

  // Example 2: let f = λx.x in (f λa.a)(f λb.b)
  println("\n--- let f = λx.x in (f λa.a)(f λb.b) ---")
  val lam-a = ELam(EAtom("a"), EVar(EAtom("a")))
  val lam-b = ELam(EAtom("b"), EVar(EAtom("b")))
  val body = EApp(EApp(EVar(EAtom("f")), lam-a), EApp(EVar(EAtom("f")), lam-b))
  val prog2 = EApp(ELam(EAtom("f"), body), id-fn)
  val goal2 = pat(prog2) \ pat(SNil) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table2 = forward-search(goal2, rel)
  println("Entries: " ++ table2.length.show)

  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.map(fn(kv) "  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **").foreach(println)
