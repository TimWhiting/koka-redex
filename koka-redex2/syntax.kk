module koka-redex2/syntax

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

pub fun single/rule(name: n, premises: p, conclusion: c): type-struct<n, rule<n, p, c>, type-nil>
  any/mk-field(Rule(name, premises, conclusion)) + TNil

pub fun cons/rule(name: n, premises: p, conclusion: c, rest: () -> type-struct<_, _, _>): type-struct<n, rule<n, p, c>, type-struct<_, _, _>>
  any/mk-field(Rule(name, premises, conclusion)) + rest()

pub fun (\)(h: a, t: b): type-cons<a, b>
  h +: t

pub fun relation-def(rules: r): relation-def<r>
  RelationDef(rules)
