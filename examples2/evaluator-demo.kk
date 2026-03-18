module examples2/evaluator-demo

import koka-redex2/syntax
import koka-redex2/evaluator
import type-level/list

pub type rule-edge12
  RuleEdge12
pub fun rule-edge12/show(_: rule-edge12): string
  "edge12"

pub type rule-edge23
  RuleEdge23
pub fun rule-edge23/show(_: rule-edge23): string
  "edge23"

pub type rule-trans
  RuleTrans
pub fun rule-trans/show(_: rule-trans): string
  "trans"

pub fun edge(a: int, b: int)
  a \ "edge" \ b

pub fun reach(a: int, b: int)
  a \ "reach" \ b

pub fun fact/eq(f1: type-cons<int, type-cons<string, int>>, f2: type-cons<int, type-cons<string, int>>): bool
  match (f1, f2)
    (TCons(a1, TCons(r1, b1)), TCons(a2, TCons(r2, b2))) -> a1 == a2 && r1 == r2 && b1 == b2

pub fun fact/show(f: type-cons<int, type-cons<string, int>>): string
  match f
    TCons(a, TCons(r, b)) -> a.show ++ " " ++ r ++ " " ++ b.show

pub fun relation()
  relation-def(
    cons/rule(RuleEdge12, edge(1, 2), reach(1, 2), fn()
      cons/rule(RuleEdge23, edge(2, 3), reach(2, 3), fn()
        single/rule(RuleTrans, reach(1, 2) \ reach(2, 3), reach(1, 3))
      )
    )
  )

pub fun main()
  val rules = [
    Eval-rule([edge(1, 2)], reach(1, 2)),
    Eval-rule([edge(2, 3)], reach(2, 3)),
    Eval-rule([reach(1, 2), reach(2, 3)], reach(1, 3))
  ]
  val seeds = [edge(1, 2), edge(2, 3)]
  val facts = evaluate-rules(rules, seeds, ?(==) = fact/eq)
  println("Derived facts:")
  facts.foreach(fn(fact) println("- " ++ fact/show(fact)))
