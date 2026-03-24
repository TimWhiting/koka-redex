module examples/pattern/reachability

// Reachability using pattern<a> metavariables.
// Tests: rule construction, forward engine execution.

import koka-redex/forward-bridge
import koka-redex/pattern

// Relations
pub type r-edge
  REdge
pub fun r-edge/pred-name(_: r-edge): string
  "edge"

pub type r-reach
  RReach
pub fun r-reach/pred-name(_: r-reach): string
  "reach"

// Judgement constructors using pattern<int> for node IDs
fun edge-j(a: pattern<int>, b: pattern<int>)
  a \ REdge \ b

fun reach-j(a: pattern<int>, b: pattern<int>)
  a \ RReach \ b

// Concrete node IDs
fun n(i: int): pattern<int>
  PatTerm(TInt(i))

// Pattern variable constructors (manual fresh IDs for now — codegen bug with effect handler)
fun pv(nm: string, id: int): pattern<int>
  PatVar(nm, id)

// Rules
fun reach-relation()
  val x = pv("x", 1)
  val y = pv("y", 2)
  val z = pv("z", 3)

  with relation-def
  with rule(TNil, "edge-1-2", edge-j(n(1), n(2)))
  with rule(TNil, "edge-2-3", edge-j(n(2), n(3)))
  with rule(TNil, "edge-3-4", edge-j(n(3), n(4)))
  with rule(
    edge-j(x, y),
    "reach-edge",
    reach-j(x, y))
  single/rule(
    edge-j(x, y) \ reach-j(y, z),
    "reach-step",
    reach-j(x, z))

pub fun main()
  val rel = reach-relation()
  val rules = relation/to-rules(rel)
  println("Rules: " ++ rules.length.show)
  rules.foreach fn(r)
    println("  " ++ r.koka-redex/term/rule/name ++ ": " ++ r.conclusion.show)

  println("\n=== reach(1, ?) ===")
  val goal = Fact("reach", [TInt(1), TVar("target", 0)])
  val table = koka-redex/forward/forward-search(goal, rules,
    ?external = default-external,
    ?memo-key = fn(f) f.show)
  val results = table.flatmap(fn(kv) if kv.fst.starts-with("reach(1,").is-just then kv.snd else [])
  results.map(fn(f) f.show).foreach(println)
