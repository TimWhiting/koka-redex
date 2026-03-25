module examples/implicit/bigstep-forward

// Bigstep evaluation using domain types + forward engine via the bridge.
// Uses the relation marker pattern: e |- REval \ v
// The bridge detects REval via ?pred-name and splits inputs/outputs.

import koka-redex/forward-bridge

// ============================================================================
// Domain types
// ============================================================================

pub type expr
  EAny(pre: string, i: int)
  EVar(name: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

// to-term for the engine
pub fun expr/to-term(e: expr): term
  match e
    EAny(p, i) -> TVar(p, i)
    EVar(n) -> TNode("var", [TAtom(n)])
    EApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    ELam(x, body) -> TNode("lam", [TAtom(x), body.to-term])

// ============================================================================
// Relation markers
// ============================================================================

pub type r-eval
  REval

pub fun r-eval/pred-name(_: r-eval): string
  "eval"

// ============================================================================
// Judgement constructor: e ⇓ v
// ============================================================================

fun (~>)(e: expr, v: expr)
  e |- REval \ v

// ============================================================================
// Rules
// ============================================================================

fun v(nm: string): expr
  EAny(nm, 0)

fun eval-rules()
  val x = v("x")
  val e = v("e")
  val e1 = v("e1")
  val e2 = v("e2")
  val e3 = v("e3")
  val v1 = v("v1")
  val v2 = v("v2")

  with relation-def
  with rule(
    axiom
    === "E-Lam" ==>
    ELam("x", e) ~> ELam("x", e))
  single/rule(
    (e1 ~> ELam("x", e3)) \\
    (e2 ~> v1)
    === "E-App" ==>
    EApp(e1, e2) ~> v2)

pub fun main()
  val rules = relation/to-rules(eval-rules())
  println("Rules: " ++ rules.length.show)
  rules.foreach fn(r)
    println("  " ++ r.koka-redex/term/rule/name ++ ": " ++ r.premises.length.show ++ " premises")

  // Test: λx.x ⇓ λx.x (E-Lam, no premises)
  println("\n=== λx.x ⇓ ? ===")
  val id-fn = ELam("x", EVar("x"))
  val goal = Fact("eval", [id-fn.to-term, TVar("result", 0)])
  val table = forward-search(goal, rules,
    ?memo-key = fn(f: fact) match f { Fact(p, args) -> Fact(p, args.take(1)).show })
  table.map(fst).foreach(println)
