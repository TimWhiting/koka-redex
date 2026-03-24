module scratch/min-repro3

// Trying to trigger the bug with forward-bridge implicits

import koka-redex/forward-bridge
import koka-redex/pattern

pub type r-test
  RTest
pub fun r-test/pred-name(_: r-test): string
  "test"

// Use pattern<int> in a chain — same as pattern-rel.kk
fun test-j(a: pattern<int>, b: pattern<int>)
  a \ RTest \ b

fun pv(nm: string, id: int): pattern<int>
  PatVar(nm, id)

fun pi(n: int): pattern<int>
  PatTerm(TInt(n))

// Single rule — just one entry, no type-struct recursion
fun test-one()
  with relation-def
  single/rule(TNil, "only", test-j(pv("x", 1), pv("y", 2)))

pub fun main()
  val rel = test-one()
  val rules = relation/to-rules(rel)
  println("Rules: " ++ rules.length.show)
