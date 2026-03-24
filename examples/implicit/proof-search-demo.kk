module examples/implicit/proof-search-demo

import koka-redex/proof-search

fun v(name: string): term
  TVar(name, 0)

fun edge(a: term, b: term): fact
  Fact("edge", [a, b])

fun reach(a: term, b: term): fact
  Fact("reach", [a, b])

fun rules(): list<rule>
  [ Rule("reach-edge", [edge(v("x"), v("y"))], reach(v("x"), v("y"))),
    Rule("reach-step", [edge(v("x"), v("y")), reach(v("y"), v("z"))], reach(v("x"), v("z"))) ]

fun facts(): list<fact>
  [ edge(TInt(1), TInt(2)),
    edge(TInt(2), TInt(3)),
    edge(TInt(3), TInt(4)) ]

pub fun main()
  val goal = reach(TInt(1), TInt(4))
  val policies = [Relation-policy("reach", memo-lattice/nondet-set(), DepthHybrid, Nothing),
                  Relation-policy("edge", memo-lattice/det-error(), DepthHybrid, Nothing)]
  match search-memo(goal, facts(), rules(), policies, 25)
    Just(pf) ->
      println("Goal: " ++ goal.show)
      println("Proof:\n" ++ pf.show)
    Nothing ->
      println("No proof found for: " ++ goal.show)
