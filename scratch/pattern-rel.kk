module scratch/pattern-rel

import koka-redex/forward-bridge
import koka-redex/pattern

pub type r-test
  RTest
pub fun r-test/pred-name(_: r-test): string
  "test"

fun test-j(a: pattern<int>, b: pattern<int>)
  a \ RTest \ b

fun pv(nm: string, id: int): pattern<int>
  PatVar(nm, id)

fun pi(n: int): pattern<int>
  PatTerm(TInt(n))

fun test-relation()
  val x = pv("x", 1)
  val y = pv("y", 2)
  with relation-def
  with rule(TNil, "base", test-j(pi(1), pi(2)))
  single/rule(
    test-j(x, y),
    "step",
    test-j(x, pi(99)))

pub fun main()
  val rel = test-relation()
  // Workaround: convert each rule individually via to-forward-rule
  val r1 = rule/to-forward-rule(direct/field(rel.rules).v)
  println("Rule 1: " ++ r1.koka-redex/term/rule/name ++ " " ++ r1.conclusion.show)
