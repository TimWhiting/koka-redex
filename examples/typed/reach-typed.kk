module examples/typed/reach-typed

// Reachability using typed rules via the forward bridge.

import koka-redex/forward-bridge

fun v(nm: string): term
  TVar(nm, 0)

fun n(i: int): term
  TInt(i)

// Relation markers
pub type r-edge
  REdge
pub val r-edge/judgment-name: name<r-edge> = Name("edge")

pub type r-reach
  RReach
pub val r-reach/judgment-name: name<r-reach> = Name("reach")

fun reach-relation()
  with relation-def
  with rule(axiom --- "edge-1-2" --> n(1) |- REdge \ n(2))
  with rule(axiom --- "edge-2-3" --> n(2) |- REdge \ n(3))
  with rule(axiom --- "edge-3-4" --> n(3) |- REdge \ n(4))
  with rule(
    v("x") |- REdge \ v("y")
    --- "reach-edge" -->
    v("x") |- RReach \ v("y"))
  single/rule(
    v("x") |- REdge \ v("y") \\
    v("y") |- RReach \ v("z")
    --- "reach-step" -->
    v("x") |- RReach \ v("z"))

pub fun main()
  println("--- reach(1, ?) ---")
  val table = forward-search(n(1) |- RReach \ v("target"), reach-relation())
  val results = table.flatmap(fn(kv) if kv.fst == "reach(1)" then kv.snd else [])
  results.map(fn(f) f.show).foreach(println)
