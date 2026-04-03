module examples/pattern/cfa-interned

// 0CFA with interned stores.
// Stores are opaque TRef values — the engine never looks inside.
// Store operations (lookup, extend) are external.

import koka-redex/forward-bridge
import koka-redex/derive
import koka-redex/pattern

// ----------------------------------------------------------------------------
// Domain types
// ----------------------------------------------------------------------------

pub type expr
  EVar(nm: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

// Store is just a regular Koka list — not a custom ADT
pub alias store = list<(string, expr)>

// ----------------------------------------------------------------------------
// Expr con-info (same as cfa.kk)
// ----------------------------------------------------------------------------

pub type var-expr
pub val var-expr/con-name: name<var-expr> = Name("var")
pub type app-expr
pub val app-expr/con-name: name<app-expr> = Name("app")
pub type lam-expr
pub val lam-expr/con-name: name<lam-expr> = Name("lam")

pub val var-expr/con-info : con-info<var-expr, t-cons<string, t-nil>, expr> = Con-info(
  fn(e) match e { EVar(n) -> Just(n +: TNil); _ -> Nothing }, fn(TCons(n, _)) EVar(n))
pub val app-expr/con-info : con-info<app-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { EApp(a, b) -> Just(a +: b +: TNil); _ -> Nothing }, fn(TCons(a, TCons(b, _))) EApp(a, b))
pub val lam-expr/con-info : con-info<lam-expr, t-cons<string, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { ELam(x, body) -> Just(x +: body +: TNil); _ -> Nothing }, fn(TCons(x, TCons(body, _))) ELam(x, body))
val expr-info =
  mk-field(var-expr/con-info) *: mk-field(app-expr/con-info) *: mk-field(lam-expr/con-info) *: TNil

pub fun expr/to-term(e: expr): div term
  val n/to-term = expr/to-term
  derive-to-term(e, expr-info)

pub fun expr/from-term(t: term): <exn,div> expr
  val n/from-term = expr/from-term
  derive-from-term(t, expr-info)

// ----------------------------------------------------------------------------
// Store equality (for interning)
// ----------------------------------------------------------------------------

fun store/(==)(a: store, b: store): pure bool
  match (a, b)
    (Nil, Nil) -> True
    (Cons((n1, v1), r1), Cons((n2, v2), r2)) ->
      n1 == n2 && v1.to-term.show == v2.to-term.show && r1 == r2
    _ -> False

// store/to-term and store/from-term come from ref/to-term + ref/from-term
// via ?pool: ev<ref-pool<store>> implicit — no structural encoding needed

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

pub type r-eval
  REval
pub val r-eval/judgment-name: name<r-eval> = Name("eval")

pub type r-lookup
  RLookup
pub val r-lookup/judgment-name: name<r-lookup> = Name("lookup")

// String rendering for rule names
pub fun string/show-latex(s: string): string { s }
pub fun string/show-md(s: string): string { s }

// ----------------------------------------------------------------------------
// Pattern constructors
// ----------------------------------------------------------------------------

fun p-var(nm: pat<string>): pat<expr>
  PatTerm(TNode("var", [nm.to-term]))
fun p-app(e1: pat<expr>, e2: pat<expr>): pat<expr>
  PatTerm(TNode("app", [e1.to-term, e2.to-term]))
fun p-lam(x: pat<string>, body: pat<expr>): pat<expr>
  PatTerm(TNode("lam", [x.to-term, body.to-term]))

// No p-scons / p-snil — stores are opaque TRef values

// ----------------------------------------------------------------------------
// External solvers
// ----------------------------------------------------------------------------

// (solvers are defined inline in the relation via external-rule/external-term-rule)

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

pub type r-extend
  RExtend
pub val r-extend/judgment-name: name<r-extend> = Name("extend")

fun cfa-relation(?pool: ev<ref-pool<store>>)
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
  val s4 : pat<store> = fresh-pat("s4")
  val v  : pat<expr> = fresh-pat("v")
  val v2 : pat<expr> = fresh-pat("v2")
  val vl : pat<expr> = fresh-pat("val")

  with relation-def
  // E-Lam: λ values evaluate to themselves
  with rule(
    axiom
    --- "E-Lam" -->
    p-lam(x, e) \ s |- REval \ p-lam(x, e) \ s)
  // E-Var: variable lookup (external — dereferences store via pool)
  with external-rule(s \ x |- RLookup \ v,
    fn(TCons(s-val: store, x-val: string))
      s-val.filter(fn((n, _)) n == x-val).map(snd)
    )
  with rule(
    s \ x |- RLookup \ vl
    --- "E-Var" -->
    p-var(x) \ s |- REval \ vl \ s)
  // E-App: application with store extension (external — interns new store via pool)
  with external-term-rule(s2 \ x \ v2 |- RExtend \ s4) fn([s2-term, x-term, v2-term])
    val s2-val : store = ref/from-term(s2-term)
    val x-val = string/from-term(x-term)
    val v2-val : expr = expr/from-term(v2-term)
    val new-store = Cons((x-val, v2-val), s2-val)
    [Fact("extend", [s2-term, x-term, v2-term, ref/to-term(new-store)])]
  single/rule(
    e1 \ s0 |- REval \ p-lam(x, e3) \ s1 \\
    e2 \ s1 |- REval \ v2 \ s2 \\
    s2 \ x \ v2 |- RExtend \ s3 \\
    e3 \ s3 |- REval \ v \ s4
    --- "E-App" -->
    p-app(e1, e2) \ s0 |- REval \ v \ s4)

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------

pub fun main()
  // Create store pool — scoped to this analysis run
  val store/pool : ev<ref-pool<store>> = make-pool(store/(==))

  with with-pats
  val rel = cfa-relation()

  println("--- (λx.x)(λz.z) ---")
  val id-fn = ELam("x", EVar("x"))
  val empty-store : store = []
  val goal1 = pat(EApp(id-fn, ELam("z", EVar("z")))) \ pat(empty-store) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table1 = forward-search(goal1, rel)
  println("Entries: " ++ table1.length.show)

  println("\n--- let f = λx.x in (f λa.a)(f λb.b) ---")
  val lam-a = ELam("a", EVar("a"))
  val lam-b = ELam("b", EVar("b"))
  val body = EApp(EApp(EVar("f"), lam-a), EApp(EVar("f"), lam-b))
  val prog2 = EApp(ELam("f", body), id-fn)
  val goal2 = pat(prog2) \ pat(empty-store) |- REval \ fresh-pat("v") \ (fresh-pat("s") : pat<store>)
  val table2 = forward-search(goal2, rel)
  println("Entries: " ++ table2.length.show)

  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.map(fn(kv) "  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **").foreach(println)
