module examples/logic-test

import koka-redex/logic

import koka-redex/forward
import std/fixpoint/fixpoint-memo
import std/fixpoint/lattice
import std/core/unsafe

pub fun main()
  // Test 1: logic handler alone
  println("=== Logic handler alone ===")
  with-logic({println("FAIL")})
    unify(TAtom("a"), TAtom("a"))
    println("OK: a = a")
    unify(TVar("x", 0), TAtom("b"))
    println("OK: x = " ++ resolve(TVar("x", 0)).show)

  // Test 2: forward-search with simplest possible rule
  println("\n=== Forward search: single axiom ===")
  val rules = [Rule("ax", [], Fact("p", [TAtom("hello")]))]
  val goal = Fact("p", [TVar("x", 0)])
  val table = forward-search(goal, rules,
    ?external = default-external,
    ?memo-key = fn(f) f.show)
  table.foreach fn((key, results))
    println("  " ++ key ++ " => " ++ results.length.show ++ " results")
    results.foreach fn(r)
      println("    " ++ r.show)

  // Test 3: two edges, reach-edge + reach-step
  println("\n=== Forward search: 2 edges, 2 reach rules ===")
  val rules3 =
    [ Rule("edge-1-2", [], Fact("edge", [TInt(1), TInt(2)])),
      Rule("edge-2-3", [], Fact("edge", [TInt(2), TInt(3)])),
      Rule("reach-edge", [Fact("edge", [TVar("x",0), TVar("y",0)])],
                          Fact("reach", [TVar("x",0), TVar("y",0)])),
      Rule("reach-step", [Fact("edge", [TVar("x",0), TVar("y",0)]),
                           Fact("reach", [TVar("y",0), TVar("z",0)])],
                          Fact("reach", [TVar("x",0), TVar("z",0)])) ]
  val goal3 = Fact("reach", [TInt(1), TInt(3)])
  val table3 = forward-search(goal3, rules3,
    ?external = default-external,
    ?memo-key = fn(f) f.show)
  table3.foreach fn((key, results))
    println("  " ++ key ++ " => " ++ results.length.show ++ " results")
    results.foreach fn(r)
      println("    " ++ r.show)
