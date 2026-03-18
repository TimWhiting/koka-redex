module examples2/proof-search-implicit-policy-demo

import koka-redex2/proof-search
import koka-redex2/proof-search-policy
import koka-redex2/syntax
import koka-redex2/proof-search-bridge
import type-level/structs
import type-level/list
import type-level/nil

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
  relation-def(
    cons/rule("reach-edge", edge(v("x"), v("y")), reach(v("x"), v("y")), fn()
      single/rule("reach-step", edge(v("x"), v("y")) \ reach(v("y"), v("z")), reach(v("x"), v("z")))
    )
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

fun fact/to-premises(f: fact): list<fact>
  Cons(f, Nil)

fun tcons/to-premises(TCons(h, t): type-cons<fact, b>, ?to-premises: b -> list<fact>): list<fact>
  Cons(h, t.to-premises)

fun tnil/to-premises(_: type-nil): list<fact>
  Nil

fun fact/to-fact(f: fact): fact
  f

pub fun main()
  val goal = reach(TInt(1), TInt(4))
  match search-memo/relation(goal, facts(), relation(), policies(), 25,
    ?as-fact = fact/to-fact
  )
    Just(pf) ->
      println("Goal: " ++ goal.show)
      println("Proof:\n" ++ pf.show)
    Nothing ->
      println("No proof found for: " ++ goal.show)
