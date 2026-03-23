module examples/reach-forward-demo

// Reachability using the forward engine.
// Demonstrates:
//   1. Ground query: reach(1, 4) — demand-driven forward
//   2. Partial query: reach(1, ?) — discover all reachable from 1
//   3. Open query: reach(?, ?) — full saturation from base facts

import koka-redex/proof-search
import koka-redex/forward

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

fun edge(a: term, b: term): fact
  Fact("edge", [a, b])

fun reach(a: term, b: term): fact
  Fact("reach", [a, b])

fun v(name: string): term
  TVar(name, 0)

fun n(i: int): term
  TInt(i)

// ---------------------------------------------------------------------------
// Rules: base facts as zero-premise rules + reach rules
// ---------------------------------------------------------------------------

fun edge-facts(): list<rule>
  [ Rule("edge-1-2", [], edge(n(1), n(2))),
    Rule("edge-2-3", [], edge(n(2), n(3))),
    Rule("edge-3-4", [], edge(n(3), n(4))) ]

fun reach-rules(): list<rule>
  [ Rule("reach-edge",
      [edge(v("x"), v("y"))],
      reach(v("x"), v("y"))),
    Rule("reach-step",
      [edge(v("x"), v("y")), reach(v("y"), v("z"))],
      reach(v("x"), v("z"))) ]

fun all-rules(): list<rule>
  edge-facts() ++ reach-rules()

// ---------------------------------------------------------------------------
// Memo key: full fact (all positions are "input" for reachability)
// For open queries, all results accumulate under one key
// ---------------------------------------------------------------------------

fun full-key(f: fact): div string
  f.show

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

fun show-table(table: list<(string, list<fact>)>)
  table.foreach fn((key, results))
    if results.length > 0 then
      val vals = results.map(fn(f) f.show).list/joinsep/join(", ")
      println("  " ++ key ++ " => {" ++ vals ++ "}")

pub fun main()
  val rules = all-rules()

  // 1. Ground query: reach(1, 4)
  println("=== reach(1, 4) — ground query ===")
  val goal1 = reach(n(1), n(4))
  val table1 = forward-search(goal1, rules, ?memo-key=full-key, ?external=default-external)
  show-table(table1)

  // 2. Partial query: reach(1, ?) — all reachable from 1
  println("\n=== reach(1, ?) — partial query ===")
  val goal2 = reach(n(1), v("target"))
  val table2 = forward-search(goal2, rules, ?memo-key=full-key, ?external=default-external)
  show-table(table2)

  // 3. Open query: reach(?, ?) — full saturation
  println("\n=== reach(?, ?) — open query (full saturation) ===")
  val goal3 = reach(v("src"), v("dst"))
  val table3 = forward-search(goal3, rules, ?memo-key=full-key, ?external=default-external)
  show-table(table3)
