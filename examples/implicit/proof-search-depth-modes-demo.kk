module examples/implicit/proof-search-depth-modes-demo

import koka-redex/proof-search

fun v(name: string): term
  TVar(name, 0)

fun p(x: term): fact
  Fact("p", [x])

fun q(x: term): fact
  Fact("q", [x])

fun r(x: term): fact
  Fact("r", [x])

fun rules(): list<rule>
  [ Rule("p-from-q", [q(v("y"))], p(v("x"))),
    Rule("q-from-r", [r(v("y"))], q(v("y"))) ]

fun facts(): list<fact>
  [ r(TInt(1)) ]

fun policies(mode: relation-depth-mode): list<relation-policy>
  [ Relation-policy("p", memo-lattice/nondet-set(), mode, Nothing),
    Relation-policy("q", memo-lattice/nondet-set(), mode, Nothing),
    Relation-policy("r", memo-lattice/nondet-set(), mode, Nothing) ]

fun run-mode(label: string, mode: relation-depth-mode, max-depth: int)
  val goal = p(TInt(1))
  println("-- " ++ label ++ " (max-depth=" ++ max-depth.show ++ ")")
  match search-memo(goal, facts(), rules(), policies(mode), max-depth)
    Just(pf) ->
      println("   result: success")
      println("   proof: " ++ pf.show)
    Nothing ->
      println("   result: no proof")

pub fun main()
  println("Depth mode comparison demo")
  println("Goal: p(1)")
  println("Rules: p(x) <- q(y), q(y) <- r(y), fact r(1)")
  println("\nExpected behavior:")
  println("- DepthTrusted ignores depth and succeeds")
  println("- DepthResetPerGoal(1) fails because each memoized rule step decrements before non-ground DFS")
  println("- DepthHybrid matches current behavior and succeeds here")
  println("")

  run-mode("DepthTrusted", DepthTrusted, 1)
  run-mode("DepthResetPerGoal(1)", DepthResetPerGoal(1), 1)
  run-mode("DepthResetPerGoal(2)", DepthResetPerGoal(2), 1)
  run-mode("DepthHybrid", DepthHybrid, 1)
