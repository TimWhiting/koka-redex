module examples/typed/bigstep-forward

// Bigstep evaluation using domain types + forward engine via the bridge.
// Uses the relation marker pattern: e |- REval \ v

import koka-redex/forward-bridge

// ----------------------------------------------------------------------------
// Domain types
// ----------------------------------------------------------------------------

pub type expr
  EAny(pre: string, i: int)
  EVar(name: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

pub fun expr/to-term(e: expr): term
  match e
    EAny(p, i) -> TVar(p, i)
    EVar(n) -> TNode("var", [TAtom(n)])
    EApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    ELam(x, body) -> TNode("lam", [TAtom(x), body.to-term])

// ----------------------------------------------------------------------------
// Relation marker
// ----------------------------------------------------------------------------

pub type r-eval
  REval
pub val r-eval/judgment-name: name<r-eval> = Name("eval")

// e ⇓ v
fun (~>)(e: expr, v: expr)
  e |- REval \ v

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

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
    --- "E-Lam" -->
    ELam("x", e) ~> ELam("x", e))
  single/rule(
    (e1 ~> ELam("x", e3)) \\
    (e2 ~> v1)
    --- "E-App" -->
    EApp(e1, e2) ~> v2)

pub fun main()
  println("--- λx.x ⇓ ? ---")
  val id-fn = ELam("x", EVar("x"))
  val goal = id-fn ~> v("result")
  val table = forward-search(goal, eval-rules())
  table.map(fst).foreach(println)
