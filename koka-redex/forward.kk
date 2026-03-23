module koka-redex/forward

// Demand-driven tabled resolution engine.
//
// Given a goal, find matching rules by unifying the conclusion,
// then evaluate premises left-to-right. Recursive calls are tabled
// via fixpoint-memo. External Koka functions handle non-rule relations.
//
// Handles ground, partial, and fully open queries uniformly.
// Per-relation lattice aggregation via the change-lattice from fixpoint-memo.

pub import koka-redex/term
pub import koka-redex/unify
import std/fixpoint/fixpoint-memo
import std/fixpoint/lattice
import std/core/unsafe

// ---------------------------------------------------------------------------
// Fresh ID effect for standardize-apart
// ---------------------------------------------------------------------------

pub effect fresh-id
  fun next-fresh(): int

// ---------------------------------------------------------------------------
// Result lattice: set of resolved conclusion facts
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

// Returns Nothing if not handled, Just(solutions) for all matching facts.
pub alias external-solver = (fact) -> div maybe<list<fact>>

pub fun default-external(_goal: fact): div maybe<list<fact>>
  Nothing

// ---------------------------------------------------------------------------
// Core engine
// ---------------------------------------------------------------------------

pub fun forward-eval(
  goal: fact,
  rules: list<rule>,
  ?external: external-solver,
  ?memo-key: (fact) -> div string
): <cache<string, result>, fresh-id, div> result
  val key = memo-key(goal)
  with each <- memo(key)
  // Try each rule: unify conclusion with goal, then execute premises
  val branches = rules.flatmap fn(r)
    val (_, rf) = freshen-rule(r, next-fresh())
    match unify-fact(goal, rf.conclusion, [])
      Just(s) ->
        [fn()
          val s-final = forward-premises(rf.premises, s, rules, ?external=external, ?memo-key=memo-key)
          apply-subst-fact(rf.conclusion, s-final)
        ]
      Nothing -> []
  // Also try external solver
  val ext-branches : list<() -> <cache<string,result>,fresh-id,div> result> = match external(goal)
    Just(results) -> results.map(fn(r) fn() r)
    Nothing -> []
  val all = branches ++ ext-branches
  if all.is-empty then none()
  else each(all)

// Execute premises left-to-right, threading substitutions.
// Returns the final substitution with all variables resolved.
fun forward-premises(
  premises: list<fact>,
  s: list<binding>,
  rules: list<rule>,
  ?external: external-solver,
  ?memo-key: (fact) -> div string
): <cache<string, result>, fresh-id, div> list<binding>
  match premises
    Nil -> s
    Cons(p, ps) ->
      val p1 = apply-subst-fact(p, s)
      // Resolve this premise (external or recursive)
      val resolved = match external(p1)
        Just(results) ->
          if results.is-empty then none()
          else do-each(results)
        Nothing ->
          forward-eval(p1, rules, ?external=external, ?memo-key=memo-key)
      // Unify resolved result with original premise to capture output bindings
      match unify-fact(p, resolved, s)
        Just(s1) -> forward-premises(ps, s1, rules, ?external=external, ?memo-key=memo-key)
        Nothing -> none()

// ---------------------------------------------------------------------------
// Entry point: run evaluation and return the full memo table
// ---------------------------------------------------------------------------

pub fun forward-search(
  goal: fact,
  rules: list<rule>,
  ?external: external-solver,
  ?memo-key: (fact) -> div string
): <div,exn> list<(string, list<result>)>
  var counter := 10000
  with handler
    fun next-fresh()
      counter := counter + 100
      counter
  val table =
    with cache(?change-lattice = result-lattice,
               ?order2 = string/order2,
               ?k/show = fn(s) s,
               ?r/show = fn(f: fact) unsafe-total({f.show}))
    forward-eval(goal, rules, ?external=external, ?memo-key=memo-key)
  table.list
