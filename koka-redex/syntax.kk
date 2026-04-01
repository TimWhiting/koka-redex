module koka-redex/syntax

import type-level/structs
import type-level/list
import koka-redex/term
import koka-redex/logic

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

// Chain premises: inserts a premise-sep marker between them in the tcons chain
pub fun cons/(\\)(h: a, t: b): t-cons<a, t-cons<premise-sep, b>>
  TCons(h, TCons(PremiseSep, t))

// Rule line: premises --- "name" --> conclusion
pub fun named/(---)(premises: p, name: n): (p, n)
  (premises, name)

pub fun concluded/(-->)(pn: (p, n), conclusion: c): rule<n, p, c>
  Rule(pn.snd, pn.fst, conclusion)

// Builders for t-struct rule collections
pub fun single/rule(r: rule<n, p, c>): t-struct<n, rule<n, p, c>, t-nil>
  any/mk-field(r) *: TNil

pub fun cons/rule(r: rule<n, p, c>, rest: () -> e t-struct<_, _, _>): e t-struct<n, rule<n, p, c>, t-struct<_, _, _>>
  any/mk-field(r) *: rest()

// Within-judgement chaining (elements of one judgement)
pub fun cons/(\)(h: a, t: b): t-cons<a, b>
  h +: t

// Turnstile: visual marker before relation name (same as \, just for readability)
pub fun turnstile/(|-)(h: a, t: b): t-cons<a, b>
  h +: t

// External solver entry (stored in t-struct alongside rules)
pub type external-entry
  MkExternalEntry(
    ext-pred: string,
    ext-n-inputs: int,
    ext-solver: (fact) -> <logic,div,exn> maybe<list<fact>>
  )

// Builders for external solvers within relation-def
pub fun cons/external-rule(
  shape: s,
  solver: (i) -> <logic,div,exn> list<o>,
  rest: () -> <div|e> t-struct<_, _, _>,
  ?to-fact-args: s -> div (list<term>, string, list<term>),
  ?from-inputs: list<term> -> exn i,
  ?to-outputs: o -> list<term>
): <div|e> t-struct<string, external-entry, t-struct<_, _, _>>
  val (input-terms, pred, _) = shape.to-fact-args
  val n = input-terms.length
  val wrapped-solver : ((fact) -> <logic,div> maybe<list<fact>>) = fn(goal)
    match goal
      Fact(p, args) ->
        if p == pred then
          val input-args = args.take(n)
          val attempt = try fn()
            val domain-inputs = input-args.from-inputs
            val results = solver(domain-inputs)
            results.map fn(out)
              Fact(pred, input-args ++ out.to-outputs)
          match attempt
            Ok(facts) -> Just(facts)
            Error(_) -> Nothing
        else Nothing
  any/mk-field(MkExternalEntry(pred, n, wrapped-solver)) *: rest()


// Builders for external solvers within relation-def
pub fun cons/external-term-rule(
  shape: s,
  solver: (list<term>) -> <logic,div,exn> list<fact>,
  rest: () -> <div|e> t-struct<_, _, _>,
  ?to-fact-args: s -> div (list<term>, string, list<term>)
): <div|e> t-struct<string, external-entry, t-struct<_, _, _>>
  val (input-terms, pred, _) = shape.to-fact-args
  val n = input-terms.length
  val wrapped-solver : ((fact) -> <logic,div> maybe<list<fact>>) = fn(goal)
    match goal
      Fact(p, args) ->
        if p == pred then
          try { Just(solver(args.take(n))) } fn(err)
            Nothing
        else Nothing
  any/mk-field(MkExternalEntry(pred, n, wrapped-solver)) *: rest()

pub fun single/external-rule(
  shape: s,
  solver: (i) -> <logic,div,exn> list<o>,
  ?to-fact-args: s -> div (list<term>, string, list<term>),
  ?from-inputs: list<term> -> exn i,
  ?to-outputs: o -> list<term>
): div t-struct<string, external-entry, t-nil>
  val (input-terms, pred, _) = shape.to-fact-args
  val n = input-terms.length
  val wrapped-solver : ((fact) -> <logic,div> maybe<list<fact>>) = fn(goal)
    match goal
      Fact(p, args) ->
        if p == pred then
          val input-args = args.take(n)
          val attempt = try fn()
            val domain-inputs = input-args.from-inputs
            val results = solver(domain-inputs)
            results.map fn(out)
              Fact(pred, input-args ++ out.to-outputs)
          match attempt
            Ok(facts) -> Just(facts)
            Error(_) -> Nothing
        else Nothing
  any/mk-field(MkExternalEntry(pred, n, wrapped-solver)) *: TNil

pub fun default/relation-def(rules: r): relation-def<r>
  RelationDef(rules)

pub fun func/relation-def(rules: () -> e r): e relation-def<r>
  RelationDef(rules())