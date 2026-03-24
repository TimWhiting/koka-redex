module koka-redex/old/evaluator

import koka-redex/syntax
import type-level/list
import type-level/structs
import type-level/nil

// Normalized rule representation used by the evaluator backend.
pub value struct eval-rule<j>
  premises: list<j>
  conclusion: j

// -----------------------------------------------------------------------------
// Rule normalization
// -----------------------------------------------------------------------------

pub fun tnil/to-premises(_: type-nil): list<j>
  Nil

pub fun tcons/to-premises(TCons(h, t): type-cons<a, b>, ?to-fact: a -> j, ?to-premises: b -> list<j>): list<j>
  Cons(to-fact(h), t.to-premises)

pub fun default/to-premises(x: a, ?to-fact: a -> j): list<j>
  Cons(to-fact(x), Nil)

pub fun default/to-fact(x: a): a
  x

pub fun rule/to-eval-rule(Rule(_, premises, conclusion): rule<n, p, c>, ?to-premises: p -> list<j>, ?to-fact: c -> j): eval-rule<j>
  Eval-rule(premises.to-premises, to-fact(conclusion))

pub fun map-field(r: rule<n, p, c>, ?to-eval-rule: rule<n, p, c> -> eval-rule<j>): eval-rule<j>
  r.to-eval-rule

// -----------------------------------------------------------------------------
// Ground evaluator
// -----------------------------------------------------------------------------

fun list/contains(xs: list<j>, x: j, ?(==): (j, j) -> bool): bool
  match xs
    Nil -> False
    Cons(y, ys) -> if y == x then True else ys.contains(x)

fun add-unique(known: list<j>, fact: j, ?(==): (j, j) -> bool): (bool, list<j>)
  if known.contains(fact) then (False, known) else (True, Cons(fact, known))

fun contains-all(known: list<j>, premises: list<j>, ?(==): (j, j) -> bool): bool
  match premises
    Nil -> True
    Cons(p, ps) -> known.contains(p) && contains-all(known, ps)

fun seed-facts(known: list<j>, seeds: list<j>, ?(==): (j, j) -> bool): list<j>
  match seeds
    Nil -> known
    Cons(seed, rst) ->
      val known' = add-unique(known, seed).snd
      seed-facts(known', rst)

fun apply-rules-once(known: list<j>, rules: list<eval-rule<j>>, ?(==): (j, j) -> bool): (bool, list<j>)
  match rules
    Nil -> (False, known)
    Cons(rule, rst) ->
      val (changed-tail, known-tail) = apply-rules-once(known, rst)
      if contains-all(known-tail, rule.premises) then
        val (changed-head, known') = add-unique(known-tail, rule.conclusion)
        (changed-head || changed-tail, known')
      else
        (changed-tail, known-tail)

fun saturate(known: list<j>, rules: list<eval-rule<j>>, ?(==): (j, j) -> bool): div list<j>
  val (changed, known') = apply-rules-once(known, rules)
  if changed then saturate(known', rules) else known'

pub fun evaluate-rules(rules: list<eval-rule<j>>, seeds: list<j>, ?(==): (j, j) -> bool): div list<j>
  val known0 = seed-facts(Nil, seeds)
  saturate(known0, rules)

pub fun evaluate(RelationDef(rules): relation-def<r>, seeds: list<j>, ?to-list: r -> list<eval-rule<j>>, ?(==): (j, j) -> bool): div list<j>
  evaluate-rules(rules.to-list, seeds)
