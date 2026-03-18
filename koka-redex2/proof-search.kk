module koka-redex2/proof-search

import std/fixpoint/fixpoint-memo
import std/fixpoint/lattice

/*
  Proof Search Architecture
  =========================

  This module contains two related proof engines over the same term/fact/rule AST:

  1) search (plain backward chaining)
     - Depth-bounded DFS over rules and base facts.
     - Uses unification + substitutions + standardize-apart freshness.
     - Good baseline and fallback for non-ground goals.

  2) search-memo / search-all-memo (tabled search)
     - Goal-directed search with memoization via std/fixpoint/fixpoint-memo.
     - Caches ground goals in a fixpoint table keyed by a goal string.
     - Uses a per-relation lattice policy to model deterministic and
       nondeterministic relation outputs.

  Why two paths?
  - Non-ground subgoals need substitution-threaded search where variable bindings
    flow left-to-right through premises.
  - Ground subgoals can be safely tabled and composed through fixpoint joins.

  Main invariants
  - Variables are freshened (standardize-apart) on every rule application.
  - Unification has an occurs-check.
  - Ground-loop prevention is enabled via seen-ground in both engines.
  - Deterministic relation conflicts are surfaced as exceptions in memo mode.
*/

pub type term
  TVar(name: string, id: int)
  TAtom(name: string)
  TInt(value: int)
  TNode(name: string, args: list<term>)

pub type fact
  Fact(pred: string, args: list<term>)

pub value struct rule
  name: string
  premises: list<fact>
  conclusion: fact

pub type proof
  ByFact(fact: fact)
  ByRule(name: string, conclusion: fact, subproofs: list<proof>)

value struct binding
  name: string
  id: int
  value: term

value struct renaming
  name: string
  oldid: int
  newid: int

// -----------------------------------------------------------------------------
// Substitutions and unification
// -----------------------------------------------------------------------------

// lookup-binding + walk implement union-find-like dereferencing for substitutions.
// We keep substitutions as a simple list and follow chains eagerly in walk.

fun binding/matches(b: binding, name: string, id: int): bool
  match b
    Binding(n, i, _) -> n == name && i == id

fun renaming/matches(r: renaming, name: string, id: int): bool
  match r
    Renaming(n, oldid, _) -> n == name && oldid == id

fun lookup-binding(s: list<binding>, name: string, id: int): div maybe<term>
  match s
    Nil -> Nothing
    Cons(Binding(n, i, v), rst) ->
      if n == name && i == id then Just(v)
      else lookup-binding(rst, name, id)

fun lookup-renaming(rs: list<renaming>, name: string, id: int): div maybe<int>
  match rs
    Nil -> Nothing
    Cons(Renaming(n, oldid, newid), rst) ->
      if n == name && oldid == id then Just(newid)
      else lookup-renaming(rst, name, id)

fun walk(t: term, s: list<binding>): div term
  match t
    TVar(name, id) ->
      match lookup-binding(s, name, id)
        Just(v) -> walk(v, s)
        Nothing -> t
    _ -> t

fun term/eq(t1: term, t2: term): div bool
  match (t1, t2)
    (TVar(n1, i1), TVar(n2, i2)) -> n1 == n2 && i1 == i2
    (TAtom(a1), TAtom(a2)) -> a1 == a2
    (TInt(i1), TInt(i2)) -> i1 == i2
    (TNode(n1, as1), TNode(n2, as2)) -> n1 == n2 && term-list/eq(as1, as2)
    _ -> False

fun term-list/eq(xs: list<term>, ys: list<term>): div bool
  match (xs, ys)
    (Nil, Nil) -> True
    (Cons(x, xr), Cons(y, yr)) -> term/eq(x, y) && term-list/eq(xr, yr)
    _ -> False

pub fun fact/eq(f1: fact, f2: fact): div bool
  match (f1, f2)
    (Fact(p1, as1), Fact(p2, as2)) -> p1 == p2 && term-list/eq(as1, as2)

fun occurs(name: string, id: int, t: term, s: list<binding>): div bool
  match walk(t, s)
    TVar(n, i) -> n == name && i == id
    TNode(_, args) -> args.any(fn(arg) occurs(name, id, arg, s))
    _ -> False

fun bind-var(name: string, id: int, t: term, s: list<binding>): div maybe<list<binding>>
  // Occurs-check prevents x = f(x), which would make substitution cyclic.
  val tw = walk(t, s)
  if occurs(name, id, tw, s) then Nothing
  else Just(Cons(Binding(name, id, tw), s))

fun unify-args(xs: list<term>, ys: list<term>, s: list<binding>): div maybe<list<binding>>
  match (xs, ys)
    (Nil, Nil) -> Just(s)
    (Cons(x, xr), Cons(y, yr)) ->
      match unify-term(x, y, s)
        Just(s1) -> unify-args(xr, yr, s1)
        Nothing -> Nothing
    _ -> Nothing

fun unify-term(t1: term, t2: term, s: list<binding>): div maybe<list<binding>>
  // Always unify canonical representatives under the current substitution.
  val w1 = walk(t1, s)
  val w2 = walk(t2, s)
  match (w1, w2)
    (TVar(n1, i1), TVar(n2, i2)) ->
      if n1 == n2 && i1 == i2 then Just(s)
      else bind-var(n1, i1, w2, s)
    (TVar(n, i), t) -> bind-var(n, i, t, s)
    (t, TVar(n, i)) -> bind-var(n, i, t, s)
    (TAtom(a1), TAtom(a2)) -> if a1 == a2 then Just(s) else Nothing
    (TInt(i1), TInt(i2)) -> if i1 == i2 then Just(s) else Nothing
    (TNode(n1, as1), TNode(n2, as2)) ->
      if n1 == n2 then unify-args(as1, as2, s) else Nothing
    _ -> Nothing

fun unify-fact(f1: fact, f2: fact, s: list<binding>): div maybe<list<binding>>
  match (f1, f2)
    (Fact(p1, as1), Fact(p2, as2)) ->
      if p1 == p2 then unify-args(as1, as2, s) else Nothing

fun apply-subst-term(t: term, s: list<binding>): div term
  match walk(t, s)
    TVar(n, i) -> TVar(n, i)
    TAtom(a) -> TAtom(a)
    TInt(i) -> TInt(i)
    TNode(n, args) -> TNode(n, args.map(fn(arg) apply-subst-term(arg, s)))

fun apply-subst-fact(Fact(pred, args): fact, s: list<binding>): div fact
  Fact(pred, args.map(fn(arg) apply-subst-term(arg, s)))

fun term/is-ground(t: term): div bool
  match t
    TVar(_, _) -> False
    TNode(_, args) -> args.all(term/is-ground)
    _ -> True

fun fact/is-ground(Fact(_, args): fact): div bool
  args.all(term/is-ground)

// -----------------------------------------------------------------------------
// Freshness / standardize-apart
// -----------------------------------------------------------------------------

// Renaming ensures every rule application gets fresh variable ids, avoiding
// accidental variable capture and cross-branch aliasing.

fun rename-term(t: term, next-id: int, rs: list<renaming>): div (int, list<renaming>, term)
  match t
    TVar(name, old-id) ->
      match lookup-renaming(rs, name, old-id)
        Just(new-id) -> (next-id, rs, TVar(name, new-id))
        Nothing ->
          val r = Renaming(name, old-id, next-id)
          (next-id + 1, Cons(r, rs), TVar(name, next-id))
    TNode(name, args) ->
      val (next2, rs2, args2) = rename-terms(args, next-id, rs)
      (next2, rs2, TNode(name, args2))
    _ -> (next-id, rs, t)

fun rename-terms(ts: list<term>, next-id: int, rs: list<renaming>): div (int, list<renaming>, list<term>)
  match ts
    Nil -> (next-id, rs, Nil)
    Cons(t, rst) ->
      val (n1, rs1, t1) = rename-term(t, next-id, rs)
      val (n2, rs2, rst1) = rename-terms(rst, n1, rs1)
      (n2, rs2, Cons(t1, rst1))

fun rename-fact(Fact(pred, args): fact, next-id: int, rs: list<renaming>): div (int, list<renaming>, fact)
  val (n1, rs1, args1) = rename-terms(args, next-id, rs)
  (n1, rs1, Fact(pred, args1))

fun rename-facts(fs: list<fact>, next-id: int, rs: list<renaming>): div (int, list<renaming>, list<fact>)
  match fs
    Nil -> (next-id, rs, Nil)
    Cons(f, rst) ->
      val (n1, rs1, f1) = rename-fact(f, next-id, rs)
      val (n2, rs2, rst1) = rename-facts(rst, n1, rs1)
      (n2, rs2, Cons(f1, rst1))

fun freshen-rule(r: rule, next-id: int): div (int, rule)
  val Rule(name, premises, conclusion) = r
  val (n1, rs1, conc1) = rename-fact(conclusion, next-id, Nil)
  val (n2, _, prems1) = rename-facts(premises, n1, rs1)
  (n2, Rule(name, prems1, conc1))

fun fact/in-list(f: fact, fs: list<fact>): div bool
  fs.any(fn(x) fact/eq(f, x))

// -----------------------------------------------------------------------------
// Plain backward chaining (depth-bounded DFS)
// -----------------------------------------------------------------------------

// prove-premises processes premises left-to-right so substitutions found by
// earlier premises constrain later ones.

fun prove-premises(premises: list<fact>, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
                   base-facts: list<fact>, rules: list<rule>): div maybe<(list<binding>, list<proof>, int)>
  match premises
    Nil -> Just((s, Nil, next-id))
    Cons(p, ps) ->
      match prove-goal(p, s, depth, next-id, seen-ground, base-facts, rules)
        Just((s1, pf, next1)) ->
          match prove-premises(ps, s1, depth, next1, seen-ground, base-facts, rules)
            Just((s2, pfs, next2)) -> Just((s2, Cons(pf, pfs), next2))
            Nothing -> Nothing
        Nothing -> Nothing

fun try-base-facts(goal: fact, s: list<binding>, base-facts: list<fact>): div maybe<(list<binding>, proof, int)>
  match base-facts
    Nil -> Nothing
    Cons(f, rst) ->
      match unify-fact(goal, f, s)
        Just(s1) -> Just((s1, ByFact(apply-subst-fact(goal, s1)), 0))
        Nothing -> try-base-facts(goal, s, rst)

fun try-rules(goal: fact, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
              base-facts: list<fact>, all-rules: list<rule>, rules: list<rule>): div maybe<(list<binding>, proof, int)>
  match rules
    Nil -> Nothing
    Cons(r, rst) ->
      val (next1, rf) = freshen-rule(r, next-id)
      val Rule(rname, rpremises, rconclusion) = rf
      match unify-fact(goal, rconclusion, s)
        Just(s1) ->
          match prove-premises(rpremises, s1, depth - 1, next1, seen-ground, base-facts, all-rules)
            Just((s2, subproofs, next2)) ->
              val conc = apply-subst-fact(rconclusion, s2)
              Just((s2, ByRule(rname, conc, subproofs), next2))
            Nothing -> try-rules(goal, s, depth, next1, seen-ground, base-facts, all-rules, rst)
        Nothing -> try-rules(goal, s, depth, next1, seen-ground, base-facts, all-rules, rst)

fun prove-goal(goal0: fact, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
               base-facts: list<fact>, rules: list<rule>): div maybe<(list<binding>, proof, int)>
  // seen-ground is a simple cycle brake for recursive ground goals.
  if depth < 0 then Nothing
  else
    val goal = apply-subst-fact(goal0, s)
    if goal.is-ground && fact/in-list(goal, seen-ground) then Nothing
    else
      val seen1 = if goal.is-ground then Cons(goal, seen-ground) else seen-ground
      match try-base-facts(goal, s, base-facts)
        Just((s1, pf, _)) -> Just((s1, pf, next-id))
        Nothing -> try-rules(goal, s, depth, next-id, seen1, base-facts, rules, rules)

pub fun search(goal: fact, base-facts: list<fact>, rules: list<rule>, max-depth: int = 50): div maybe<proof>
  match prove-goal(goal, Nil, max-depth, 0, Nil, base-facts, rules)
    Just((_, pf, _)) -> Just(pf)
    Nothing -> Nothing

pub fun term/show(t: term): div string
  match t
    TVar(name, id) -> name ++ "_" ++ id.show
    TAtom(name) -> name
    TInt(i) -> i.show
    TNode(name, args) -> name ++ "(" ++ args.map(term/show).join(",") ++ ")"

pub fun fact/show(Fact(pred, args): fact): div string
  pred ++ "(" ++ args.map(term/show).join(",") ++ ")"

pub fun proof/show(pf: proof, indent: string = ""): div string
  match pf
    ByFact(f) -> indent ++ "fact " ++ f.show
    ByRule(name, conc, subs) ->
      val head = indent ++ "rule " ++ name ++ " => " ++ conc.show
      val body = list/joinsep/join(subs.map(fn(p) proof/show(p, indent ++ "  ")), "\n")
      if body.is-empty then head else head ++ "\n" ++ body


// -----------------------------------------------------------------------------
// Tabled search using fixpoint-memo
// -----------------------------------------------------------------------------

/*
  Memo model
  ----------
  - Key: ground goal string.
  - Change: one newly found proof for a relation.
  - Aggregate: relation-specific lattice accumulator.

  relation-lattice policies:
  - LatDetError  : deterministic; second distinct result becomes a conflict.
  - LatNondetSet : nondeterministic; accumulate deduplicated proofs.
  - LatDetFirst  : deterministic-first; keep only the first result.
*/

pub type relation-lattice
  LatDetError
  LatNondetSet
  LatDetFirst

pub value struct relation-policy
  pred: string
  lattice: relation-lattice

type found-proof
  Found-proof(proof: proof, key: string)

type search-change
  NoChange
  Found(pred: string, lattice: relation-lattice, result: found-proof)

type search-agg
  AggUnknown
  AggDet(pred: string, value: maybe<found-proof>)
  AggDetConflict(pred: string, first: found-proof, second: found-proof)
  AggFirst(pred: string, value: maybe<found-proof>)
  AggNondet(pred: string, values: list<found-proof>)

fun found-proof/same-key(fp1: found-proof, fp2: found-proof): bool
  match (fp1, fp2)
    (Found-proof(_, k1), Found-proof(_, k2)) -> k1 == k2

fun relation-lattice-of(pred: string, policies: list<relation-policy>): relation-lattice
  match policies
    Nil -> LatNondetSet
    Cons(Relation-policy(name, lattice), rst) ->
      if name == pred then lattice else relation-lattice-of(pred, rst)

fun search-join(old: search-agg, change: search-change): (bool, search-agg)
  // This is the lattice join used by fixpoint-memo/cache.
  match change
    NoChange -> (False, old)
    Found(pred, lattice, found) ->
      match old
        AggUnknown ->
          match lattice
            LatDetError -> (True, AggDet(pred, Just(found)))
            LatNondetSet -> (True, AggNondet(pred, [found]))
            LatDetFirst -> (True, AggFirst(pred, Just(found)))
        AggDet(pred0, Nothing) ->
          if pred0 == pred then (True, AggDet(pred, Just(found))) else (False, old)
        AggDet(pred0, Just(first)) ->
          if pred0 == pred then
            if first.same-key(found) then (False, old)
            else (True, AggDetConflict(pred, first, found))
          else (False, old)
        AggDetConflict(_, _, _) -> (False, old)
        AggFirst(pred0, Nothing) ->
          if pred0 == pred then (True, AggFirst(pred, Just(found))) else (False, old)
        AggFirst(pred0, Just(first)) ->
          if pred0 == pred then
            if first.same-key(found) then (False, old)
            else (False, old)
          else (False, old)
        AggNondet(pred0, values) ->
          if pred0 == pred then
            if values.any(fn(v) v.same-key(found)) then (False, old)
            else (True, AggNondet(pred, Cons(found, values)))
          else (False, old)

fun search-changes(agg: search-agg): list<search-change>
  // Exposes the current aggregate as a stream of changes for dependents.
  match agg
    AggUnknown -> Nil
    AggDet(_pred, Nothing) -> Nil
    AggDet(pred, Just(found)) -> [Found(pred, LatDetError, found)]
    AggDetConflict(pred, first, second) -> [Found(pred, LatDetError, first), Found(pred, LatDetError, second)]
    AggFirst(_pred, Nothing) -> Nil
    AggFirst(pred, Just(found)) -> [Found(pred, LatDetFirst, found)]
    AggNondet(pred, values) -> values.map(fn(found) Found(pred, LatNondetSet, found))

fun search-lattice(): change-lattice<search-agg, search-change>
  Change-lattice(AggUnknown, search-join, search-changes)

fun search-change/show(_: search-change): string
  "search-change"

fun found-change(pred: string, lattice: relation-lattice, pf: proof): div search-change
  // Proof string is used as a stable dedup key inside aggregation.
  val k = pf.show
  Found(pred, lattice, Found-proof(pf, k))

fun base-branch(goal: fact, f: fact, s: list<binding>, pred: string, lattice: relation-lattice): <cache<string,search-change>,div> search-change
  match unify-fact(goal, f, s)
    Just(s1) -> found-change(pred, lattice, ByFact(apply-subst-fact(goal, s1)))
    Nothing -> NoChange

fun rule-branch(goal: fact, r: rule, s: list<binding>, depth: int, next-id: int, seen1: list<fact>,
                base-facts: list<fact>, rules: list<rule>, policies: list<relation-policy>,
                pred: string, lattice: relation-lattice): <cache<string,search-change>,div> search-change
  val (next1, rf) = freshen-rule(r, next-id)
  val Rule(rname, rpremises, rconclusion) = rf
  match unify-fact(goal, rconclusion, s)
    Just(s1) ->
      match prove-premises-memo(rpremises, s1, depth - 1, next1, seen1, base-facts, rules, policies)
        Just((s2, subproofs, _)) ->
          val conc = apply-subst-fact(rconclusion, s2)
          found-change(pred, lattice, ByRule(rname, conc, subproofs))
        Nothing -> NoChange
    Nothing -> NoChange

fun prove-premises-memo(premises: list<fact>, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
                        base-facts: list<fact>, rules: list<rule>, policies: list<relation-policy>): <cache<string,search-change>,div> maybe<(list<binding>, list<proof>, int)>
  match premises
    Nil -> Just((s, Nil, next-id))
    Cons(p, ps) ->
      val p1 = apply-subst-fact(p, s)
      if p1.is-ground then
        // Ground premise: safe to table.
        match prove-goal-memo(p1, s, depth, next-id, seen-ground, base-facts, rules, policies)
          Found(_, _, Found-proof(pf, _)) ->
            match prove-premises-memo(ps, s, depth, next-id, seen-ground, base-facts, rules, policies)
              Just((s2, pfs, next2)) -> Just((s2, Cons(pf, pfs), next2))
              Nothing -> Nothing
          NoChange -> Nothing
      else
        // Non-ground premise: keep substitution-threaded DFS semantics.
        match prove-goal(p, s, depth, next-id, seen-ground, base-facts, rules)
          Just((s1, pf, next1)) ->
            match prove-premises-memo(ps, s1, depth, next1, seen-ground, base-facts, rules, policies)
              Just((s2, pfs, next2)) -> Just((s2, Cons(pf, pfs), next2))
              Nothing -> Nothing
          Nothing -> Nothing

fun prove-goal-memo(goal0: fact, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
                    base-facts: list<fact>, rules: list<rule>, policies: list<relation-policy>): <cache<string,search-change>,div> search-change
  if depth < 0 then NoChange
  else
    val goal = apply-subst-fact(goal0, s)
    if !goal.is-ground then
      // Non-ground goals are not table keys; use DFS and wrap result as change.
      match prove-goal(goal, s, depth, next-id, seen-ground, base-facts, rules)
        Just((_, pf, _)) ->
          val Fact(pred, _) = goal
          found-change(pred, relation-lattice-of(pred, policies), pf)
        Nothing -> NoChange
    else
      val Fact(pred, _) = goal
      val lattice = relation-lattice-of(pred, policies)
      if goal.is-ground && fact/in-list(goal, seen-ground) then NoChange
      else
        val seen1 = if goal.is-ground then Cons(goal, seen-ground) else seen-ground
        val key = goal.show
        // memo(key) provides recursive tabling over all applicable branches.
        with each <- memo(key)
        val base-branches =
          base-facts.map(fn(f)
            fn() base-branch(goal, f, s, pred, lattice)
          )
        val rule-branches =
          rules.map(fn(r)
            fn() rule-branch(goal, r, s, depth, next-id, seen1, base-facts, rules, policies, pred, lattice)
          )
        val branches = base-branches ++ rule-branches
        each(if branches.is-empty then [fn() NoChange] else branches)

fun agg-proofs(agg: search-agg): <exn,div> list<proof>
  match agg
    AggUnknown -> Nil
    AggDet(_, Nothing) -> Nil
    AggDet(_, Just(found)) -> [found-proof/proof(found)]
    AggDetConflict(pred, _, _) ->
      // Deterministic policy explicitly rejects multiple distinct derivations.
      throw("deterministic relation produced multiple results: " ++ pred)
    AggFirst(_, Nothing) -> Nil
    AggFirst(_, Just(found)) -> [found-proof/proof(found)]
    AggNondet(_, values) -> values.map(found-proof/proof)

pub fun search-all-memo(goal: fact, base-facts: list<fact>, rules: list<rule>,
                        policies: list<relation-policy> = Nil, max-depth: int = 50): <exn,div> list<proof>
  val key = goal.show
  val table =
    // Lattice is provided explicitly; no implicit lattice resolution.
    with std/fixpoint/fixpoint-memo/cache(?change-lattice = search-lattice(), ?order2 = string/order2,
                                          ?k/show = show/string/show, ?r/show = search-change/show)
    prove-goal-memo(goal, Nil, max-depth, 0, Nil, base-facts, rules, policies)
  match table.lookup(key)
    Just(agg) -> agg-proofs(agg)
    Nothing -> Nil

pub fun search-memo(goal: fact, base-facts: list<fact>, rules: list<rule>,
                    policies: list<relation-policy> = Nil, max-depth: int = 50): <exn,div> maybe<proof>
  match search-all-memo(goal, base-facts, rules, policies, max-depth)
    Nil -> Nothing
    Cons(pf, _) -> Just(pf)
