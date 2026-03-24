module examples/implicit/cfa-typed

// 0CFA with store-passing using typed rules via the forward bridge.
// Demonstrates:
//   - Domain types with relation markers (e \ REval \ v)
//   - Automatic memo-key derivation from chain structure
//   - External solver for lookup
//   - Over-approximation via collecting semantics

import koka-redex/forward-bridge

// ============================================================================
// Domain types
// ============================================================================

pub type expr
  EAny(pre: string, i: int)
  EVar(nm: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

pub type store
  SNil
  SCons(nm: string, vl: expr, rest: store)

pub fun expr/to-term(e: expr): term
  match e
    EAny(p, i) -> TVar(p, i)
    EVar(n) -> TNode("var", [TAtom(n)])
    EApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    ELam(x, body) -> TNode("lam", [TAtom(x), body.to-term])

pub fun store/to-term(s: store): term
  match s
    SNil -> TNode("snil", [])
    SCons(n, v, rest) -> TNode("scons", [TAtom(n), v.to-term, rest.to-term])

// ============================================================================
// Relation markers
// ============================================================================

pub type r-eval
  REval

pub fun r-eval/pred-name(_: r-eval): string
  "eval"

pub type r-lookup
  RLookup

pub fun r-lookup/pred-name(_: r-lookup): string
  "lookup"

// ============================================================================
// Judgement constructors
// ============================================================================

// eval(expr, store) => (value, store')
// Written as: expr \ store \ REval \ expr \ store
fun eval-j(e: expr, s: store, v: expr, s2: store)
  e \ s \ REval \ v \ s2

// lookup(store, name, value) — external, but we define the chain for key derivation
fun lookup-j(s: store, x: string, v: expr)
  s \ x \ RLookup \ v

// ============================================================================
// Helper: expression metavariables
// ============================================================================

fun v(nm: string): expr
  EAny(nm, 0)

fun sv(nm: string): store
  // Store metavariable — represented as a TVar in the engine
  // We use a special store constructor that maps to TVar
  SNil // placeholder — we'll use term-level vars directly

// For rules we need term-level metavariables for stores
// Since store is threaded, we use TVar directly in the fact
fun eval-fact(e: term, s: term, vl: term, s2: term): fact
  Fact("eval", [e, s, vl, s2])

fun snil-t(): term
  TNode("snil", [])

fun scons-t(nm: term, vl: term, rest: term): term
  TNode("scons", [nm, vl, rest])

fun tv(nm: string): term
  TVar(nm, 0)

// ============================================================================
// Rules (fact-level for stores, domain-type for expressions)
// We use fact-level since stores need metavariables (TVar)
// ============================================================================

fun cfa-relation()
  with relation-def
  // E-Lam
  with rule(
    TNil,
    "E-Lam",
    eval-fact(TNode("lam", [tv("x"), tv("e")]), tv("s"),
              TNode("lam", [tv("x"), tv("e")]), tv("s"))
  )
  // E-Var: lookup in store (external)
  with rule(
    Fact("lookup", [tv("s"), tv("x"), tv("val")]),
    "E-Var",
    eval-fact(TNode("var", [tv("x")]), tv("s"), tv("val"), tv("s"))
  )
  // E-App
  single/rule(
    eval-fact(tv("e1"), tv("s0"), TNode("lam", [tv("x"), tv("e3")]), tv("s1")) \
    eval-fact(tv("e2"), tv("s1"), tv("v2"), tv("s2")) \
    eval-fact(tv("e3"), scons-t(tv("x"), tv("v2"), tv("s2")), tv("v"), tv("s3")),
    "E-App",
    eval-fact(TNode("app", [tv("e1"), tv("e2")]), tv("s0"), tv("v"), tv("s3"))
  )

// ============================================================================
// External solver: lookup
// ============================================================================

fun store-lookup-all(s: term, nm: term): div list<term>
  match s
    TNode("scons", [n, vl, rest]) ->
      val found = if term/eq(n, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

fun lookup-external(goal: fact): <logic,div> maybe<list<fact>>
  match goal
    Fact("lookup", [s, nm, _]) ->
      val results = store-lookup-all(s, nm)
      Just(results.map(fn(vl) Fact("lookup", [s, nm, vl])))
    _ -> Nothing

// ============================================================================
// Memo-key: eval has 2 inputs (expr, store), lookup has 2 inputs (store, name)
// ============================================================================

fun cfa-memo-key(): div ((fact) -> div string)
  val eval-key = make-memo-key("eval", 2)
  val lookup-key = make-memo-key("lookup", 2)
  compose-memo-keys([("eval", eval-key), ("lookup", lookup-key)])

fun cfa-external(): ((fact) -> <logic,div> maybe<list<fact>>)
  compose-externals([("lookup", lookup-external)])

// ============================================================================
// Examples
// ============================================================================

fun evar-t(x: string): term
  TNode("var", [TAtom(x)])

fun elam-t(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp-t(e1: term, e2: term): term
  TNode("app", [e1, e2])

pub fun main()
  val rules = relation/to-rules(cfa-relation())
  println("Rules: " ++ rules.length.show)

  // Example 1: (λx.x)(λz.z)
  println("\n=== (λx.x)(λz.z) ===")
  val id-fn = elam-t("x", evar-t("x"))
  val goal1 = eval-fact(eapp-t(id-fn, elam-t("z", evar-t("z"))), snil-t(), tv("v"), tv("s"))
  val table1 = forward-search(goal1, rules, ?external=cfa-external(), ?memo-key=cfa-memo-key())
  println("Entries: " ++ table1.length.show)

  // Example 2: let f = λx.x in (f λa.a)(f λb.b)
  println("\n=== let f = λx.x in (f λa.a)(f λb.b) ===")
  val lam-a = elam-t("a", evar-t("a"))
  val lam-b = elam-t("b", evar-t("b"))
  val body = eapp-t(eapp-t(evar-t("f"), lam-a), eapp-t(evar-t("f"), lam-b))
  val goal2 = eval-fact(eapp-t(elam-t("f", body), id-fn), snil-t(), tv("v"), tv("s"))
  val table2 = forward-search(goal2, rules, ?external=cfa-external(), ?memo-key=cfa-memo-key())
  println("Entries: " ++ table2.length.show)

  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.map(fn(kv) "  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **").foreach(println)
