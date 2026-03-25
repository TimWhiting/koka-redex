module examples/implicit/reach-typed

// Reachability using typed rules via the forward bridge.
// Fact-level: premises and conclusions are already fact values.
// Uses string names for simplicity.

import koka-redex/forward-bridge

fun v(nm: string): term
  TVar(nm, 0)

fun n(i: int): term
  TInt(i)

fun edge(a: term, b: term): fact
  Fact("edge", [a, b])

fun reach(a: term, b: term): fact
  Fact("reach", [a, b])

// Typed rules using syntax.kk
fun reach-relation()
  with relation-def
  with rule(axiom === "edge-1-2" ==> edge(n(1), n(2)))
  with rule(axiom === "edge-2-3" ==> edge(n(2), n(3)))
  with rule(axiom === "edge-3-4" ==> edge(n(3), n(4)))
  with rule(
    edge(v("x"), v("y"))
    === "reach-edge" ==>
    reach(v("x"), v("y")))
  single/rule(
    edge(v("x"), v("y")) \\ reach(v("y"), v("z"))
    === "reach-step" ==>
    reach(v("x"), v("z")))

pub fun main()
  val rules = relation/to-rules(reach-relation())
  println("Rules: " ++ rules.length.show)

  println("\n=== reach(1, ?) ===")
  val table = forward-search(
    reach(n(1), v("target")),
    rules,
    ?memo-key = fn(f) f.show
  )
  val reach-results = table.flatmap(fn(kv) if kv.fst.starts-with("reach(1,").is-just then kv.snd else [])
  reach-results.map(fn(f) f.show).foreach(println)
