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

pub alias result = fact

fun result/(==)(a: result, b: result): div bool
  fact/eq(a, b)

fun result-join(old: list<result>, new: result): pure (bool, list<result>)
  if old.any(fn(r) unsafe-total({result/(==)(r, new)})) then (False, old)
  else (True, Cons(new, old))

val result-lattice : change-lattice<list<result>, result> = Change-lattice([], result-join, fn(x) x)

// ---------------------------------------------------------------------------
// External relation solver
// ---------------------------------------------------------------------------

pub alias external-solver = (fact) -> <logic,div> maybe<list<fact>>

pub fun default-external(_goal: fact): <logic,div> maybe<list<fact>>
  Nothing

// ---------------------------------------------------------------------------
// Core engine
// ---------------------------------------------------------------------------

pub fun forward-eval(
  goal: fact,
  rules: list<rule>,
  ?external: external-solver,
  ?memo-key: (fact) -> div string
): <cache<string, result>, logic, div> result
  val key = memo-key(goal)
  with each <- memo(key)
  // Each rule is a branch. Unification failure calls none() via on-fail,
  // which kills just this branch (scoped by do-each).
  val rule-branches = rules.map fn(r)
    fn()
      val rf = freshen-rule(r)
      unify-facts(goal, rf.conclusion)
      forward-premises(rf.premises, rules, ?external=external, ?memo-key=memo-key)
      resolve-fact(rf.conclusion)
  val ext-branches : list<() -> <cache<string,result>,logic,div> result> = match external(goal)
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
): <cache<string, result>, logic, div> ()
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
): <div,exn> list<(string, list<result>)>
  val table =
    with cache(?change-lattice = result-lattice,
               ?order2 = string/order2,
               ?k/show = fn(s) s,
               ?r/show = fn(f: fact) unsafe-total({f.show}))
    with-logic({none()})
      forward-eval(goal, rules, ?external=external, ?memo-key=memo-key)
  table.list
