module examples/implicit/evaluator-demo

import koka-redex/syntax
import koka-redex/old/evaluator
import type-level/list
import type-level/nil

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
  val facts = evaluate-rules(rules, seeds)
  println("Derived facts:")
  facts.foreach(fn(fact) println("- " ++ show(fact)))
