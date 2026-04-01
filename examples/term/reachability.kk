module examples/term/reachability

// Reachability: ground, partial, and open queries
// Demonstrates the forward engine on simple Horn clauses.

import koka-redex/forward

fun edge(a: term, b: term): fact
  Fact("edge", [a, b])

fun reach(a: term, b: term): fact
  Fact("reach", [a, b])

fun v(name: string): term
  TVar(name, 0)

fun n(i: int): term
  TInt(i)

fun all-rules(): list<rule>
  [ Rule("edge-1-2", [], edge(n(1), n(2))),
    Rule("edge-2-3", [], edge(n(2), n(3))),
    Rule("edge-3-4", [], edge(n(3), n(4))),
    Rule("reach-edge",
      [edge(v("x"), v("y"))],
      reach(v("x"), v("y"))),
    Rule("reach-step",
      [edge(v("x"), v("y")), reach(v("y"), v("z"))],
      reach(v("x"), v("z"))) ]

fun memo-key(f: fact): div string
  f.show

fun show-results(name: string, goal: fact, table: list<(string, list<fact>)>)
  println("--- " ++ name ++ " ---")
  val goal-key = memo-key(normalize-fact(goal))
  val results = table.flatmap fn(kv)
    if kv.fst == goal-key then kv.snd else []
  results.map(fn(f) f.show).foreach(println)

pub fun main()
  val rules = all-rules()

  val g1 = reach(n(1), n(4))
  show-results("reach(1, 4)", g1,
    forward-search(g1, rules))

  val g2 = reach(n(1), v("target"))
  show-results("reach(1, ?)", g2,
    forward-search(g2, rules))

  val g3 = reach(v("src"), v("dst"))
  show-results("reach(?, ?)", g3,
    forward-search(g3, rules))
