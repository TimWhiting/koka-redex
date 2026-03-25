module koka-redex/syntax

import type-level/structs
import type-level/list

pub infixr 5 (\)
pub infixr 5 (|-)
pub infixr 3 (\\)
pub infixl 2 (---)
pub infixl 1 (-->)

// -----------------------------------------------------------------------------
// AST Definition
// -----------------------------------------------------------------------------

pub type rule<n, p, c>
  Rule(name: n, premises: p, conclusion: c)

pub type relation-def<r>
  RelationDef(rules: r)

// Premise separator marker — empty phantom type inserted by \\
pub type premise-sep
  PremiseSep

// Chain premises: inserts a premise-sep marker between them in the type-cons chain
pub fun cons/(\\)(h: a, t: b): type-cons<a, type-cons<premise-sep, b>>
  TCons(h, TCons(PremiseSep, t))

// Rule line: premises --- "name" --> conclusion
pub fun named/(---)(premises: p, name: n): (p, n)
  (premises, name)

pub fun concluded/(-->)(pn: (p, n), conclusion: c): rule<n, p, c>
  Rule(pn.snd, pn.fst, conclusion)

// Builders for type-struct rule collections
pub fun single/rule(r: rule<n, p, c>): type-struct<n, rule<n, p, c>, type-nil>
  any/mk-field(r) + TNil

pub fun cons/rule(r: rule<n, p, c>, rest: () -> type-struct<_, _, _>): type-struct<n, rule<n, p, c>, type-struct<_, _, _>>
  any/mk-field(r) + rest()

// Within-judgement chaining (elements of one judgement)
pub fun cons/(\)(h: a, t: b): type-cons<a, b>
  h +: t

// Turnstile: visual marker before relation name (same as \, just for readability)
pub fun turnstile/(|-)(h: a, t: b): type-cons<a, b>
  h +: t

pub fun default/relation-def(rules: r): relation-def<r>
  RelationDef(rules)

pub fun func/relation-def(rules: () -> r): relation-def<r>
  RelationDef(rules())