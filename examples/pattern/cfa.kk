module examples/pattern/cfa

// 0CFA with store-passing using `pat<a>` metavariables.
// Domain types are CLEAN — no Any/metavar constructors needed.
// Metavariables come from `pat<a>` with fresh-pat.

import koka-redex/forward-bridge
import koka-redex/pattern
import koka-redex/latex
import koka-redex/markdown

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

pub fun expr/to-term(e: expr): term
  match e
    EAtom(n) -> TAtom(n)
    EVar(n) -> TNode("var", [n.to-term])
    EApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    ELam(x, body) -> TNode("lam", [x.to-term, body.to-term])

pub fun store/to-term(s: store): term
  match s
    SNil -> TNode("snil", [])
    SCons(n, v, rest) -> TNode("scons", [n.to-term, v.to-term, rest.to-term])

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

fun show-term-expr-md(t: term): div string
  match t
    TAtom(n) -> n
    TVar(nm, id) -> if id == 0 then nm else nm ++ id.show
    TNode("var", [n]) -> show-term-expr-md(n)
    TNode("app", [e1, e2]) -> show-term-expr-md(e1) ++ " " ++ show-term-expr-md(e2)
    TNode("lam", [x, body]) -> "\\lambda " ++ show-term-expr-md(x) ++ ". " ++ show-term-expr-md(body)
    _ -> t.show

fun show-term-store-md(t: term): div string
  match t
    TVar(nm, id) -> if id == 0 then nm else nm ++ id.show
    TNode("snil", []) -> "\\emptyset"
    TNode("scons", [n, v, rest]) -> show-term-store-md(rest) ++ "[" ++ show-term-expr-md(n) ++ " \\mapsto " ++ show-term-expr-md(v) ++ "]"
    _ -> t.show

fun show-term-expr-latex(t: term): div string
  match t
    TAtom(n) -> n
    TVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    TNode("var", [n]) -> show-term-expr-latex(n)
    TNode("app", [e1, e2]) -> show-term-expr-latex(e1) ++ "\\; " ++ show-term-expr-latex(e2)
    TNode("lam", [x, body]) -> "\\lambda " ++ show-term-expr-latex(x) ++ ".\\; " ++ show-term-expr-latex(body)
    _ -> t.show

fun show-term-store-latex(t: term): div string
  match t
    TVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    TNode("snil", []) -> "\\emptyset"
    TNode("scons", [n, v, rest]) -> show-term-store-latex(rest) ++ "[" ++ show-term-expr-latex(n) ++ " \\mapsto " ++ show-term-expr-latex(v) ++ "]"
    _ -> t.show

// Pattern renderers: delegate to term-level renderers
pub fun pexpr/show-md(p: pat<expr>): div string
  match p
    PatVar(nm, _id) -> nm
    PatTerm(t) -> show-term-expr-md(t)

pub fun pexpr/show-latex-j(p: pat<expr>): div string
  match p
    PatVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    PatTerm(t) -> show-term-expr-latex(t)

pub fun pstore/show-md(p: pat<store>): div string
  match p
    PatVar(nm, _id) -> nm
    PatTerm(t) -> show-term-store-md(t)

pub fun pstore/show-latex-j(p: pat<store>): div string
  match p
    PatVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    PatTerm(t) -> show-term-store-latex(t)

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

// Lift concrete values into patterns (for goals)
fun pe(e: expr): pat<expr>
  PatTerm(e.to-term)

fun ps(s: store): pat<store>
  PatTerm(s.to-term)

// ----------------------------------------------------------------------------
// Rules — using fresh-pat for metavariables
// ----------------------------------------------------------------------------

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
// External solver + policy
// ----------------------------------------------------------------------------

fun store-lookup-all(s: term, nm: term): div list<term>
  match s
    TNode("scons", [n, vl, rest]) ->
      val found = if term/eq(n, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

val lookup-solver = make-external("lookup") fn(args)
  match args
    Cons(s, Cons(nm, _)) ->
      store-lookup-all(s, nm).map(fn(vl) [s, nm, vl])
    _ -> []

val cfa/external = compose-externals([lookup-solver])

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
  val goal1 = pe(EApp(id-fn, ELam(EAtom("z"), EVar(EAtom("z"))))) \ ps(SNil) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table1 = forward-search(goal1, rel)
  println("Entries: " ++ table1.length.show)

  // Example 2: let f = λx.x in (f λa.a)(f λb.b)
  println("\n--- let f = λx.x in (f λa.a)(f λb.b) ---")
  val lam-a = ELam(EAtom("a"), EVar(EAtom("a")))
  val lam-b = ELam(EAtom("b"), EVar(EAtom("b")))
  val body = EApp(EApp(EVar(EAtom("f")), lam-a), EApp(EVar(EAtom("f")), lam-b))
  val prog2 = EApp(ELam(EAtom("f"), body), id-fn)
  val goal2 = pe(prog2) \ ps(SNil) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table2 = forward-search(goal2, rel)
  println("Entries: " ++ table2.length.show)

  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.map(fn(kv) "  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **").foreach(println)
