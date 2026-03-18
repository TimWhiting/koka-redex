module koka-redex2/proof-search-bridge

import koka-redex2/syntax
import koka-redex2/evaluator
import koka-redex2/proof-search
import type-level/structs
import type-level/list
import type-level/nil

fun fact/to-premises(f: fact): list<fact>
  Cons(f, Nil)

fun tcons/to-premises(TCons(h, t): type-cons<fact, b>, ?to-premises: b -> list<fact>): list<fact>
  Cons(h, t.to-premises)

fun tnil/to-premises(_: type-nil): list<fact>
  Nil

pub fun map-field(r: koka-redex2/syntax/rule<n, p, c>,
                  ?name/show: n -> string,
                  ?to-premises: p -> list<j>,
                  ?to-fact: c -> j,
                  ?as-fact: j -> fact): koka-redex2/proof-search/rule
  match r
    Rule(name, premises, conclusion) ->
      koka-redex2/proof-search/Rule(name.show, premises.to-premises.map(as-fact), as-fact(to-fact(conclusion)))

pub fun fact/map-field(r: koka-redex2/syntax/rule<n, p, c>,
                       ?name/show: n -> string,
                       ?to-premises: p -> list<fact>,
                       ?to-fact: c -> fact): koka-redex2/proof-search/rule
  match r
    Rule(name, premises, conclusion) ->
      koka-redex2/proof-search/Rule(name.show, premises.to-premises, to-fact(conclusion))

pub fun default/to-search-rules(RelationDef(rules): relation-def<r>,
                                 ?to-list: r -> list<koka-redex2/proof-search/rule>): list<koka-redex2/proof-search/rule>
  to-list(rules)

// Specialized converter for fact-based relations. This keeps the supporting
// implicit conversions in one module so callers only need ?as-fact.
pub fun fact/to-search-rules(RelationDef(rules): relation-def<type-struct<n, f, r>>,
                             ?map-field: f -> koka-redex2/proof-search/rule,
                             ?to-list: r -> list<koka-redex2/proof-search/rule>): list<koka-redex2/proof-search/rule>
  type-level/structs/to-list(rules, ?map-field = map-field, ?to-list = to-list)

pub fun search-memo/relation(goal: j,
                             base-facts: list<j>,
                             rel: relation-def<r>,
                             policies: list<relation-policy> = Nil,
                             max-depth: int = 50,
                             ?relation/to-search-rules: relation-def<r> -> list<koka-redex2/proof-search/rule>,
                             ?as-fact: j -> fact): <exn,div> maybe<proof>
  search-memo(as-fact(goal), base-facts.map(as-fact), rel.to-search-rules, policies, max-depth)

pub fun search-all-memo/relation(goal: j,
                                 base-facts: list<j>,
                                 rel: relation-def<r>,
                                 policies: list<relation-policy> = Nil,
                                 max-depth: int = 50,
                                 ?relation/to-search-rules: relation-def<r> -> list<koka-redex2/proof-search/rule>,
                                 ?as-fact: j -> fact): <exn,div> list<proof>
  search-all-memo(as-fact(goal), base-facts.map(as-fact), rel.to-search-rules, policies, max-depth)
