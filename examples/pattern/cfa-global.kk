module examples/pattern/cfa-global

// 0CFA with global store widening.
//
// Instead of threading a store through evaluation, bindings are a
// separate relation: bind(x, v). Rules produce bind facts as
// additional conclusions. Lookup reads from the bind table.
// The set-join lattice on bind accumulates all values per variable.

import koka-redex/forward-bridge
import koka-redex/derive
import koka-redex/pattern

// ----------------------------------------------------------------------------
// Domain types
// ----------------------------------------------------------------------------

type expr
  EVar(nm: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

// Con-info for auto-derived to-term / from-term
type var-expr
val var-expr/con-name : name<var-expr> = Name("var")
type app-expr
val app-expr/con-name : name<app-expr> = Name("app")
type lam-expr
val lam-expr/con-name : name<lam-expr> = Name("lam")

val var-expr/con-info : con-info<var-expr, t-cons<string, t-nil>, expr> = Con-info(
  fn(e) match e { EVar(n) -> Just(n +: TNil); _ -> Nothing }, fn(TCons(n, _)) EVar(n))
val app-expr/con-info : con-info<app-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { EApp(a, b) -> Just(a +: b +: TNil); _ -> Nothing }, fn(TCons(a, TCons(b, _))) EApp(a, b))
val lam-expr/con-info : con-info<lam-expr, t-cons<string, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { ELam(x, body) -> Just(x +: body +: TNil); _ -> Nothing }, fn(TCons(x, TCons(body, _))) ELam(x, body))
val expr-info =
  mk-field(var-expr/con-info) *: mk-field(app-expr/con-info) *: mk-field(lam-expr/con-info) *: TNil

fun expr/to-term(e: expr): div term
  val n/to-term = expr/to-term
  derive-to-term(e, expr-info)

fun expr/from-term(t: term): <exn,div> expr
  val n/from-term = expr/from-term
  derive-from-term(t, expr-info)

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

type r-eval
  REval
val r-eval/judgment-name : name<r-eval> = Name("eval")

type r-bind
  RBind
val r-bind/judgment-name : name<r-bind> = Name("bind")

// ----------------------------------------------------------------------------
// Pattern constructors
// ----------------------------------------------------------------------------

fun p-var(nm: pat<string>): pat<expr>
  PatTerm(TNode("var", [nm.to-term]))
fun p-app(e1: pat<expr>, e2: pat<expr>): pat<expr>
  PatTerm(TNode("app", [e1.to-term, e2.to-term]))
fun p-lam(x: pat<string>, body: pat<expr>): pat<expr>
  PatTerm(TNode("lam", [x.to-term, body.to-term]))

// ----------------------------------------------------------------------------
// Rules
//
// E-Lam: λx.e ⇓ λx.e
//
// E-Var: x ∈ v          (lookup from bind table)
//        ─────
//        var(x) ⇓ v
//
// E-App: e1 ⇓ λx.e3
//        e2 ⇓ v2
//        e3 ⇓ v
//        ─────────────
//        app(e1,e2) ⇓ v
//        x ∈ v2          (side-effect: add binding)
// ----------------------------------------------------------------------------

fun cfa-relation()
  with with-pats
  val x  : pat<string> = fresh-pat("x")
  val e  : pat<expr> = fresh-pat("e")
  val e1 : pat<expr> = fresh-pat("e1")
  val e2 : pat<expr> = fresh-pat("e2")
  val e3 : pat<expr> = fresh-pat("e3")
  val v  : pat<expr> = fresh-pat("v")
  val v2 : pat<expr> = fresh-pat("v2")

  with relation-def
  // E-Lam: lambda values evaluate to themselves
  with rule(
    axiom
    --- "E-Lam" -->
    p-lam(x, e) |- REval \ p-lam(x, e))
  // E-Var: variable lookup from global bind table
  with rule(
    x |- RBind \ v
    --- "E-Var" -->
    p-var(x) |- REval \ v)
  // E-App: application with global bind as side-effect conclusion
  with rule(
    e1 |- REval \ p-lam(x, e3) \\
    e2 |- REval \ v2
    --- "E-App-Bind" -->
    p-app(e1, e2) |- REval \ v \\
    x |- RBind \ v2)
  rule(
    e1 |- REval \ p-lam(x, e3) \\
    e2 |- REval \ v2 \\
    e3 |- REval \ v
    --- "E-App" -->
    p-app(e1, e2) |- REval \ v)

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------

pub fun main()
  with with-pats
  val rel = cfa-relation()

  // Example 1: (λx.x)(λz.z)
  println("--- (λx.x)(λz.z) ---")
  val id-fn = ELam("x", EVar("x"))
  val goal1 = pat(EApp(id-fn, ELam("z", EVar("z")))) |- REval \ (fresh-pat("v") : pat<expr>)
  val table1 = forward-search(goal1, rel)
  println("Entries: " ++ table1.length.show)
  table1.foreach fn(kv)
    println("  " ++ kv.fst ++ " -> " ++ kv.snd.map(show).join(", "))

  // Example 2: let f = λx.x in (f λa.a)(f λb.b)
  println("\n--- let f = λx.x in (f λa.a)(f λb.b) ---")
  val lam-a = ELam("a", EVar("a"))
  val lam-b = ELam("b", EVar("b"))
  val body = EApp(EApp(EVar("f"), lam-a), EApp(EVar("f"), lam-b))
  val prog2 = EApp(ELam("f", body), id-fn)
  val goal2 = pat(prog2) |- REval \ (fresh-pat("v") : pat<expr>)
  val table2 = forward-search(goal2, rel)
  println("Entries: " ++ table2.length.show)

  // Show bind table entries (the global store)
  println("\nGlobal store (bind table):")
  val binds = table2.filter(fn(kv) kv.fst.starts-with("bind(").is-just)
  binds.foreach fn(kv)
    println("  " ++ kv.fst ++ " -> " ++ kv.snd.length.show ++ " values")
    kv.snd.foreach fn(f) println("    " ++ f.show)

  // Show over-approximation
  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.foreach fn(kv)
    println("  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **")
