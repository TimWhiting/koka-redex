module koka-redex/forward

// Demand-driven tabled resolution engine using the logic effect.
//
// Combines:
//   - microkanren-style unification (logic effect: unify, walk, fresh)
//   - tabled memoization (fixpoint-memo: memo, depend, add-result, do-each)
//   - external relation dispatch (pluggable Koka functions)

pub import koka-redex/term
pub import koka-redex/logic
import std/fixpoint/fixpoint-memo
import std/fixpoint/lattice
import std/core/unsafe

// ---------------------------------------------------------------------------
// Result lattice
// ---------------------------------------------------------------------------

pub alias search-result = fact

fun search-result/(==)(a: search-result, b: search-result): div bool
  fact/eq(a, b)

fun result-join(old: list<search-result>, new: search-result): pure (bool, list<search-result>)
  if old.any(fn(r) unsafe-total({search-result/(==)(r, new)})) then (False, old)
  else (True, Cons(new, old))

val result-lattice : change-lattice<list<search-result>, search-result> = Change-lattice([], result-join, fn(x) x)

// ---------------------------------------------------------------------------
// External relation solver
// ---------------------------------------------------------------------------

pub alias external-solver = (fact) -> <logic,div,exn> maybe<list<fact>>

pub fun default/external(_goal: fact): <logic,div,exn> maybe<list<fact>>
  Nothing

// ---------------------------------------------------------------------------
// Default memo-key: use full fact as key
// ---------------------------------------------------------------------------

pub fun default/memo-key(f: fact): div string
  f.show

// ---------------------------------------------------------------------------
// Normalize unbound variables for memo-key canonicalization
// ---------------------------------------------------------------------------

// Canonicalize unbound variables so that logically equivalent queries
// (differing only in fresh variable IDs) map to the same memo-key.
// Variables are renamed to _0, _1, ... in order of first occurrence,
// preserving sharing: reach(X, X) -> reach(_0, _0) vs reach(X, Y) -> reach(_0, _1).
fun normalize-terms(ts: list<term>, counter: int, mapping: list<(string, int, int)>): div (list<term>, int, list<(string, int, int)>)
  match ts
    Nil -> (Nil, counter, mapping)
    Cons(t, rest) ->
      val (t', counter', mapping') = normalize-term(t, counter, mapping)
      val (rest', counter'', mapping'') = normalize-terms(rest, counter', mapping')
      (Cons(t', rest'), counter'', mapping'')

fun normalize-term(t: term, counter: int, mapping: list<(string, int, int)>): div (term, int, list<(string, int, int)>)
  match t
    TVar(nm, id) ->
      match mapping.find(fn(e) e.fst == nm && e.snd == id)
        Just((_, _, canonical)) -> (TVar("_", canonical), counter, mapping)
        Nothing -> (TVar("_", counter), counter + 1, Cons((nm, id, counter), mapping))
    TNode(n, args) ->
      val (args', counter', mapping') = normalize-terms(args, counter, mapping)
      (TNode(n, args'), counter', mapping')
    _ -> (t, counter, mapping)

pub fun normalize-fact(f: fact): div fact
  match f
    Fact(p, args) ->
      val (args', _, _) = normalize-terms(args, 0, [])
      Fact(p, args')

// ---------------------------------------------------------------------------
// Core engine
// ---------------------------------------------------------------------------

pub fun forward-eval(
  goal: fact,
  rules: list<rule>,
  ?external: external-solver,
  ?memo-key: (fact) -> div string
): <cache<string, search-result>, logic, div, exn> search-result
  val key = memo-key(normalize-fact(resolve-fact(goal)))
  with each <- memo(key)
  // Each rule is a branch. Unification failure calls none() via on-fail,
  // which kills just this branch (scoped by do-each).
  val rule-branches = rules.map fn(r)
    fn()
      val rf = freshen-rule(r)
      unify-facts(goal, rf.conclusion)
      forward-premises(rf.premises, rules, ?external=external, ?memo-key=memo-key)
      resolve-fact(rf.conclusion)
  val ext-branches : list<() -> <cache<string,search-result>,logic,div,exn> search-result> = match external(goal)
    Just(results) -> results.map(fn(r) fn() r)
    Nothing -> []
  val all = rule-branches ++ ext-branches
  if all.is-empty then none()
  else each(all)

// Execute premises left-to-right.
fun forward-premises(
  premises: list<fact>,
  rules: list<rule>,
  ?external: external-solver,
  ?memo-key: (fact) -> div string
): <cache<string, search-result>, logic, div, exn> ()
  match premises
    Nil -> ()
    Cons(p, ps) ->
      val p-resolved = resolve-fact(p)
      val result = match external(p-resolved)
        Just(results) ->
          if results.is-empty then none()
          else do-each(results)
        Nothing ->
          forward-eval(p-resolved, rules, ?external=external, ?memo-key=memo-key)
      // Unify result with premise to capture output bindings
      unify-facts(p, result)
      forward-premises(ps, rules, ?external=external, ?memo-key=memo-key)

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

pub fun forward-search(
  goal: fact,
  rules: list<rule>,
  ?external: external-solver,
  ?memo-key: (fact) -> div string
): <div,exn> list<(string, list<search-result>)>
  val table =
    with cache(?change-lattice = result-lattice,
               ?order2 = string/order2,
               ?k/show = fn(s) s,
               ?r/show = fn(f: fact) unsafe-total({f.show}))
    with-logic({none()})
      forward-eval(goal, rules, ?external=external, ?memo-key=memo-key)
  table.list
// test comment
// kki test
