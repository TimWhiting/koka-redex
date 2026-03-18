module examples2/proof-search-typed-rules-demo

import koka-redex2/syntax
import koka-redex2/proof-search
import koka-redex2/proof-search-bridge

fun v(name: string): term
  TVar(name, 0)

fun edge(a: term, b: term): fact
  Fact("edge", [a, b])

fun reach(a: term, b: term): fact
  Fact("reach", [a, b])

fun relation()
  relation-def(
    cons/rule("reach-edge", edge(v("x"), v("y")), reach(v("x"), v("y")), fn()
      single/rule("reach-step", edge(v("x"), v("y")) \ reach(v("y"), v("z")), reach(v("x"), v("z")))
    )
  )

fun facts(): list<fact>
  [ edge(TInt(1), TInt(2)),
    edge(TInt(2), TInt(3)),
    edge(TInt(3), TInt(4)) ]

pub fun main()
  val goal = reach(TInt(1), TInt(4))
  val policies = [Relation-policy("reach", memo-lattice/nondet-set()),
                  Relation-policy("edge", memo-lattice/det-error())]
  val search-rules =
    [ koka-redex2/proof-search/Rule("reach-edge", [edge(v("x"), v("y"))], reach(v("x"), v("y"))),
      koka-redex2/proof-search/Rule("reach-step", [edge(v("x"), v("y")), reach(v("y"), v("z"))], reach(v("x"), v("z"))) ]
  match search-memo/relation(goal, facts(), relation(), policies, 25,
    ?relation/to-search-rules = fn(_) search-rules,
    ?as-fact = fn(f) f
  )
    Just(pf) ->
      println("Goal: " ++ goal.show)
      println("Proof:\n" ++ pf.show)
    Nothing ->
      println("No proof found for: " ++ goal.show)
