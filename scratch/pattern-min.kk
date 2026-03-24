module scratch/pattern-min

import koka-redex/forward-bridge
import koka-redex/pattern

pub type r-test
  RTest
pub fun r-test/pred-name(_: r-test): string
  "test"

pub fun main()
  val p1 : pattern<int> = PatVar("x", 0)
  val p2 : pattern<int> = PatTerm(TInt(42))
  // Simple chain: pattern<int> \ RTest \ pattern<int>
  val chain = p1 \ RTest \ p2
  val f = chain/to-fact(chain)
  println("fact: " ++ f.show)
