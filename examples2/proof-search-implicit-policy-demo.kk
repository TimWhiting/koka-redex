module examples2/proof-search-implicit-policy-demo

import koka-redex2/proof-search
import koka-redex2/proof-search-policy

pub type r-reach
  RReach

pub type r-edge
  REdge

val reach/rel-lattice : rel-lattice<r-reach>
  = Rel-lattice(LatNondetSet)

val edge/rel-lattice : rel-lattice<r-edge>
  = Rel-lattice(LatDetError)

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

fun policies(): list<relation-policy>
  val reach-tag : pred-tag<r-reach> = mk/pred-tag("reach")
  val edge-tag : pred-tag<r-edge> = mk/pred-tag("edge")
  [ policy/of(reach-tag),
    policy/of(edge-tag) ]

pub fun main()
  val goal = reach(TInt(1), TInt(4))
  match search-memo(goal, facts(), rules(), policies(), 25)
    Just(pf) ->
      println("Goal: " ++ goal.show)
      println("Proof:\n" ++ pf.show)
    Nothing ->
      println("No proof found for: " ++ goal.show)
