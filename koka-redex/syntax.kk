module koka-redex/syntax

import type-level/structs
import type-level/list

pub infixr 5 (\)

// -----------------------------------------------------------------------------
// AST Definition
// -----------------------------------------------------------------------------

pub type rule<n, p, c>
  Rule(name: n, premises: p, conclusion: c)

pub type relation-def<r>
  RelationDef(rules: r)

pub fun single/rule(premises: p, name: n, conclusion: c): type-struct<n, rule<n, p, c>, type-nil>
  any/mk-field(Rule(name, premises, conclusion)) + TNil

pub fun cons/rule(premises: p, name: n, conclusion: c, rest: () -> type-struct<_, _, _>): type-struct<n, rule<n, p, c>, type-struct<_, _, _>>
  any/mk-field(Rule(name, premises, conclusion)) + rest()

pub fun cons/(\)(h: a, t: b): type-cons<a, b>
  h +: t

pub fun default/relation-def(rules: r): relation-def<r>
  RelationDef(rules)


pub fun func/relation-def(rules: () -> r): relation-def<r>
  RelationDef(rules())