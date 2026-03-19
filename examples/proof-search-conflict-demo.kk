module examples/proof-search-conflict-demo

import koka-redex/proof-search

fun color(i: int, c: string): fact
  Fact("color", [TInt(i), TAtom(c)])

fun rules(): list<rule>
  [ Rule("color-red-1", Nil, color(1, "red")),
    Rule("color-red-2", Nil, color(1, "red")) ]

pub fun main()
  val policies = [Relation-policy("color", memo-lattice/det-error(), DepthHybrid)]
  val goal = color(1, "red")
  match try({ search-all-memo(goal, Nil, rules(), policies, 10) })
    Ok(proofs) ->
      println("Unexpected success with " ++ proofs.length.show ++ " proof(s)")
      proofs.foreach(fn(pf) println(pf.show))
    Error(e) ->
      println("Expected deterministic conflict:")
      println(e.message)
