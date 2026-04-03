module examples/pattern/reachability

// Reachability using pat<a> metavariables.
// Tests: rule construction, forward engine execution.

import koka-redex/forward-bridge
import koka-redex/pattern

// Relations
type r-edge
  REdge
val r-edge/judgment-name: name<r-edge> = Name("edge")

type r-reach
  RReach
val r-reach/judgment-name: name<r-reach> = Name("reach")

// (judgement helpers removed — inline syntax is clear enough)

// Concrete node IDs
fun n(i: int): pat<int>
  PatTerm(TInt(i))

// Pattern variable constructors (manual fresh IDs for now — codegen bug with effect handler)
fun pv(nm: string, id: int): pat<int>
  PatVar(nm, id)

// Rules
fun reach-relation()
  val x = pv("x", 1)
  val y = pv("y", 2)
  val z = pv("z", 3)

  with relation-def
  with rule(axiom --- "edge-1-2" --> n(1) |- REdge \ n(2))
  with rule(axiom --- "edge-2-3" --> n(2) |- REdge \ n(3))
  with rule(axiom --- "edge-3-4" --> n(3) |- REdge \ n(4))
  with rule(
    x |- REdge \ y
    --- "reach-edge" -->
    x |- RReach \ y)
  rule(
    x |- REdge \ y \\
    y |- RReach \ z
    --- "reach-step" -->
    x |- RReach \ z)

pub fun main()
  println("--- reach(1, ?) ---")
  val goal = n(1) |- RReach \ pv("target", 0)
  val table = forward-search(goal, reach-relation())
  val results = table.flatmap(fn(kv) if kv.fst == "reach(1)" then kv.snd else [])
  results.map(fn(f) f.show).foreach(println)
