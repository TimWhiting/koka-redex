module koka-redex/forward

import koka-redex/proof-search
import std/fixpoint/fixpoint-memo
import std/fixpoint/lattice
import std/core/unsafe

pub effect fresh-id
  fun next-fresh(): int

pub alias result = fact

fun result/(==)(a: result, b: result): div bool
  fact/eq(a, b)

fun result-join(old: list<result>, new: result): pure (bool, list<result>)
  if old.any(fn(r) unsafe-total({result/(==)(r, new)})) then (False, old)
  else (True, Cons(new, old))

val result-lattice : change-lattice<list<result>, result> = Change-lattice([], result-join, fn(x) x)

pub fun forward-eval(
  goal: fact,
  rules: list<rule>,
  ?external: (fact) -> div maybe<list<fact>>,
  ?memo-key: (fact) -> div string
): <cache<string, result>, fresh-id, div> result
  val key = memo-key(goal)
  with each <- memo(key)
  val branches = rules.flatmap fn(r)
    val (_, rf) = freshen-rule(r, next-fresh())
    match unify-fact(goal, rf.conclusion, [])
      Just(s) ->
        [fn()
          val s-final = forward-premises(rf.premises, s, rules, ?external=external, ?memo-key=memo-key)
          apply-subst-fact(rf.conclusion, s-final)
        ]
      Nothing -> []
  val ext-branches : list<() -> <cache<string,result>,fresh-id,div> result> = match external(goal)
    Just(results) -> results.map(fn(r) fn() r)
    Nothing -> []
  val all = branches ++ ext-branches
  if all.is-empty then none()
  else each(all)

fun forward-premises(
  premises: list<fact>,
  s: list<binding>,
  rules: list<rule>,
  ?external: (fact) -> div maybe<list<fact>>,
  ?memo-key: (fact) -> div string
): <cache<string, result>, fresh-id, div> list<binding>
  match premises
    Nil -> s
    Cons(p, ps) ->
      val p1 = apply-subst-fact(p, s)
      val resolved = match external(p1)
        Just(results) ->
          if results.is-empty then none()
          else do-each(results)
        Nothing ->
          forward-eval(p1, rules, ?external=external, ?memo-key=memo-key)
      match unify-fact(p, resolved, s)
        Just(s1) -> forward-premises(ps, s1, rules, ?external=external, ?memo-key=memo-key)
        Nothing -> none()

pub fun default-external(_goal: fact): div maybe<list<fact>>
  Nothing

pub fun forward-search(
  goal: fact,
  rules: list<rule>,
  ?external: (fact) -> div maybe<list<fact>>,
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
