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

fun full-key(f: fact): div string
  f.show

fun show-results(name: string, table: list<(string, list<fact>)>)
  println("--- " ++ name ++ " ---")
  val reach-entries = table.flatmap fn(kv)
    match kv
      (key, results) ->
        if key.starts-with("reach(").is-just then
          results.map(fn(f) f.show)
        else []
  reach-entries.foreach(println)

pub fun main()
  val rules = all-rules()

  show-results("reach(1, 4)",
    forward-search(reach(n(1), n(4)), rules, ?memo-key=full-key))

  show-results("reach(1, ?)",
    forward-search(reach(n(1), v("target")), rules, ?memo-key=full-key))

  show-results("reach(?, ?)",
    forward-search(reach(v("src"), v("dst")), rules, ?memo-key=full-key))
