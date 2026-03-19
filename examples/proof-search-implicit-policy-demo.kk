module examples/proof-search-implicit-policy-demo

import koka-redex/proof-search
import koka-redex/proof-search-policy
import koka-redex/syntax
import koka-redex/proof-search-bridge 

pub type r-reach
  RReach

pub type r-edge
  REdge

val reach/rel-memo-lattice : rel-memo-lattice<r-reach>
  = Rel-memo-lattice(memo-lattice/nondet-set())

val edge/rel-memo-lattice : rel-memo-lattice<r-edge>
  = Rel-memo-lattice(memo-lattice/det-error())

fun v(name: string): term
  TVar(name, 0)

fun edge(a: term, b: term): fact
  Fact("edge", [a, b])

fun reach(a: term, b: term): fact
  Fact("reach", [a, b])

fun relation()
  with relation-def
  with rule(
    edge(v("x"), v("y")), 
    // ------------------
    "reach-edge", 
    reach(v("x"), v("y"))
    )
  single/rule(
    edge(v("x"), v("y")) \ 
    reach(v("y"), v("z")), 
    "reach-step",
    // --------------
    reach(v("x"), v("z"))
  )

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
  match search-memo/relation(goal, facts(), relation(), policies(), 25, ?as-fact = to-fact)
    Just(pf) ->
      println("Goal: " ++ goal.show)
      println("Proof:\n" ++ pf.show) 
    Nothing ->
      println("No proof found for: " ++ goal.show)
