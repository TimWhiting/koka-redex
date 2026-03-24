module koka-redex/old/proof-search

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

pub value struct binding
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

pub fun term/eq(t1: term, t2: term): div bool
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

pub fun unify-fact(f1: fact, f2: fact, s: list<binding>): div maybe<list<binding>>
  match (f1, f2)
    (Fact(p1, as1), Fact(p2, as2)) ->
      if p1 == p2 then unify-args(as1, as2, s) else Nothing

fun apply-subst-term(t: term, s: list<binding>): div term
  match walk(t, s)
    TVar(n, i) -> TVar(n, i)
    TAtom(a) -> TAtom(a)
    TInt(i) -> TInt(i)
    TNode(n, args) -> TNode(n, args.map(fn(arg) apply-subst-term(arg, s)))

pub fun apply-subst-fact(Fact(pred, args): fact, s: list<binding>): div fact
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

pub fun freshen-rule(r: rule, next-id: int): div (int, rule)
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

type depth-control
  DepthFinite
  DepthInfinite

fun depth-control/dec(depth: int, dctrl: depth-control): int
  match dctrl
    DepthFinite -> depth - 1
    DepthInfinite -> depth

fun depth-control/exhausted(depth: int, dctrl: depth-control): bool
  match dctrl
    DepthFinite -> depth < 0
    DepthInfinite -> False

fun try-external-results(results: list<(list<binding>, proof)>, ps: list<fact>, depth: int, next-id: int, seen-ground: list<fact>,
                         base-facts: list<fact>, rules: list<rule>, dctrl: depth-control,
                         ?external: external-solver): div maybe<(list<binding>, list<proof>, int)>
  match results
    Nil -> Nothing
    Cons((s1, pf), rest) ->
      match prove-premises(ps, s1, depth, next-id, seen-ground, base-facts, rules, dctrl, ?external=external)
        Just((s2, pfs, next2)) -> Just((s2, Cons(pf, pfs), next2))
        Nothing -> try-external-results(rest, ps, depth, next-id, seen-ground, base-facts, rules, dctrl, ?external=external)

fun prove-premises(premises: list<fact>, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
                   base-facts: list<fact>, rules: list<rule>, dctrl: depth-control,
                   ?external: external-solver): div maybe<(list<binding>, list<proof>, int)>
  match premises
    Nil -> Just((s, Nil, next-id))
    Cons(p, ps) ->
      val p1 = apply-subst-fact(p, s)
      // Try external solver first (supports backtracking through all results)
      match external(p1, s)
        Just(results) ->
          try-external-results(results, ps, depth, next-id, seen-ground, base-facts, rules, dctrl, ?external=external)
        Nothing ->
          match prove-goal(p, s, depth, next-id, seen-ground, base-facts, rules, dctrl, ?external=external)
            Just((s1, pf, next1)) ->
              match prove-premises(ps, s1, depth, next1, seen-ground, base-facts, rules, dctrl, ?external=external)
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
              base-facts: list<fact>, all-rules: list<rule>, rules: list<rule>, dctrl: depth-control,
              ?external: (fact, list<binding>) -> div maybe<list<(list<binding>, proof)>>): div maybe<(list<binding>, proof, int)>
  match rules
    Nil -> Nothing
    Cons(r, rst) ->
      val (next1, rf) = freshen-rule(r, next-id)
      val Rule(rname, rpremises, rconclusion) = rf
      match unify-fact(goal, rconclusion, s)
        Just(s1) ->
          match prove-premises(rpremises, s1, depth-control/dec(depth, dctrl), next1, seen-ground, base-facts, all-rules, dctrl, ?external=external)
            Just((s2, subproofs, next2)) ->
              val conc = apply-subst-fact(rconclusion, s2)
              Just((s2, ByRule(rname, conc, subproofs), next2))
            Nothing -> try-rules(goal, s, depth, next1, seen-ground, base-facts, all-rules, rst, dctrl, ?external=external)
        Nothing -> try-rules(goal, s, depth, next1, seen-ground, base-facts, all-rules, rst, dctrl, ?external=external)

fun prove-goal(goal0: fact, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
               base-facts: list<fact>, rules: list<rule>, dctrl: depth-control,
               ?external: external-solver): div maybe<(list<binding>, proof, int)>
  // seen-ground is a simple cycle brake for recursive ground goals.
  if depth-control/exhausted(depth, dctrl) then Nothing
  else
    val goal = apply-subst-fact(goal0, s)
    if goal.is-ground && fact/in-list(goal, seen-ground) then Nothing
    else
      val seen1 = if goal.is-ground then Cons(goal, seen-ground) else seen-ground
      match try-base-facts(goal, s, base-facts)
        Just((s1, pf, _)) -> Just((s1, pf, next-id))
        Nothing -> try-rules(goal, s, depth, next-id, seen1, base-facts, rules, rules, dctrl, ?external=external)

// External relation solver: given a goal and current substitution, return
// Nothing if not handled, or Just(list of (substitution, proof) pairs) for all solutions.
// The DFS engine tries each solution in order with backtracking.
pub alias external-solver = (fact, list<binding>) -> div maybe<list<(list<binding>, proof)>>

pub fun default/external(_goal: fact, _s: list<binding>): div maybe<list<(list<binding>, proof)>>
  Nothing

pub fun search(goal: fact, base-facts: list<fact>, rules: list<rule>, max-depth: int = 50,
               ?external: external-solver): div maybe<proof>
  match prove-goal(goal, Nil, max-depth, 0, Nil, base-facts, rules, DepthFinite, ?external=external)
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
  - Change: one newly found proof.
  - Aggregate: relation-specific memo state.

  Instead of a mode enum, each relation policy now carries an explicit
  memo lattice value (change-lattice<relation-memo-state, found-proof>).
*/

pub type found-proof
  Found-proof(proof: proof, key: string)

type search-change
  NoChange
  Found(pred: string, result: found-proof)

pub type relation-memo-state
  MemoDet(value: maybe<found-proof>)
  MemoDetConflict(first: found-proof, second: found-proof)
  MemoFirst(value: maybe<found-proof>)
  MemoNondet(values: list<found-proof>)

pub struct relation-policy
  pred: string
  memo-lattice: change-lattice<relation-memo-state, found-proof>
  depth-mode: relation-depth-mode
  memo-key: maybe<(fact) -> div string>  // Custom memo key: if Just, use instead of goal.show and skip groundness check

pub type relation-depth-mode
  DepthTrusted
  DepthResetPerGoal(limit: int)
  DepthHybrid

type search-agg
  AggUnknown
  AggKnown(pred: string, memo-lattice: change-lattice<relation-memo-state, found-proof>, state: relation-memo-state)

fun found-proof/same-key(fp1: found-proof, fp2: found-proof): bool
  match (fp1, fp2)
    (Found-proof(_, k1), Found-proof(_, k2)) -> k1 == k2

fun relation-policy/of(predicate: string, policies: list<relation-policy>): relation-policy
  match policies.find(fn(p) p.pred == predicate)
    Just(p) -> p
    Nothing -> Relation-policy(predicate, memo-lattice/nondet-set(), DepthHybrid, Nothing)

fun relation-depth/reset(mode: relation-depth-mode, incoming-depth: int): int
  match mode
    DepthTrusted -> incoming-depth
    DepthResetPerGoal(limit) -> limit
    DepthHybrid -> incoming-depth

fun relation-depth/premise-depth(mode: relation-depth-mode, depth: int): int
  match mode
    DepthTrusted -> depth
    DepthResetPerGoal(_) -> depth - 1
    DepthHybrid -> depth

fun relation-depth/control(mode: relation-depth-mode): depth-control
  match mode
    DepthTrusted -> DepthInfinite
    DepthResetPerGoal(_) -> DepthFinite
    DepthHybrid -> DepthFinite

fun memo-state/show(s: relation-memo-state): string
  match s
    MemoDet(Nothing) -> "MemoDet(None)"
    MemoDet(Just(_)) -> "MemoDet(Some)"
    MemoDetConflict(_, _) -> "MemoDetConflict"
    MemoFirst(Nothing) -> "MemoFirst(None)"
    MemoFirst(Just(_)) -> "MemoFirst(Some)"
    MemoNondet(vs) -> "MemoNondet(" ++ vs.length.show ++ ")"

fun memo-lattice/det-error-join(old: relation-memo-state, found: found-proof): (bool, relation-memo-state)
  match old
    MemoDet(Nothing) -> (True, MemoDet(Just(found)))
    MemoDet(Just(first)) ->
      if first.same-key(found) then (False, old)
      else (True, MemoDetConflict(first, found))
    MemoDetConflict(_, _) -> (False, old)
    _ -> (False, old)

fun memo-lattice/det-first-join(old: relation-memo-state, found: found-proof): (bool, relation-memo-state)
  match old
    MemoFirst(Nothing) -> (True, MemoFirst(Just(found)))
    MemoFirst(Just(first)) ->
      if first.same-key(found) then (False, old)
      else (False, old)
    _ -> (False, old)

fun memo-lattice/nondet-set-join(old: relation-memo-state, found: found-proof): (bool, relation-memo-state)
  match old
    MemoNondet(values) ->
      if values.any(fn(v) v.same-key(found)) then (False, old)
      else (True, MemoNondet(Cons(found, values)))
    _ -> (False, old)

fun memo-lattice/det-error-changes(state: relation-memo-state): list<found-proof>
  match state
    MemoDet(Nothing) -> Nil
    MemoDet(Just(found)) -> [found]
    MemoDetConflict(first, second) -> [first, second]
    _ -> Nil

fun memo-lattice/det-first-changes(state: relation-memo-state): list<found-proof>
  match state
    MemoFirst(Nothing) -> Nil
    MemoFirst(Just(found)) -> [found]
    _ -> Nil

fun memo-lattice/nondet-set-changes(state: relation-memo-state): list<found-proof>
  match state
    MemoNondet(values) -> values
    _ -> Nil

pub fun memo-lattice/det-error(): change-lattice<relation-memo-state, found-proof>
  Change-lattice(MemoDet(Nothing), memo-lattice/det-error-join, memo-lattice/det-error-changes)

pub fun memo-lattice/det-first(): change-lattice<relation-memo-state, found-proof>
  Change-lattice(MemoFirst(Nothing), memo-lattice/det-first-join, memo-lattice/det-first-changes)

pub fun memo-lattice/nondet-set(): change-lattice<relation-memo-state, found-proof>
  Change-lattice(MemoNondet(Nil), memo-lattice/nondet-set-join, memo-lattice/nondet-set-changes)

fun search-changes(agg: search-agg): list<search-change>
  // Exposes the current aggregate as a stream of changes for dependents.
  match agg
    AggUnknown -> Nil
    AggKnown(pred, lat, state) ->
      val Change-lattice(_, _, changes) = lat
      changes(state).map(fn(found) Found(pred, found))

fun search-lattice(policies: list<relation-policy>): change-lattice<search-agg, search-change>
  fun join(old: search-agg, change: search-change): _ (bool, search-agg)
    match change
      NoChange -> (False, old)
      Found(pred, found) ->
        match old
          AggUnknown ->
            val Relation-policy(_, lat, _) = relation-policy/of(pred, policies)
            val Change-lattice(bottom, join, _) = lat
            val (changed, state) = join(bottom, found)
            (changed, AggKnown(pred, lat, state))
          AggKnown(pred0, lat, state) ->
            if pred0 == pred then
              val Change-lattice(_, join, _) = lat
              val (changed, state2) = join(state, found)
              (changed, AggKnown(pred, lat, state2))
            else (False, old)
  Change-lattice(AggUnknown, join, search-changes)

fun search-change/show(_: search-change): string
  "search-change"

pub fun proof/conclusion-key(pf: proof): div string
  match pf
    ByFact(f) -> f.show
    ByRule(_, conc, _) -> conc.show

fun found-change(pred: string, pf: proof): div search-change
  // Dedup key is the conclusion only — same result via different paths is one entry.
  val k = pf.conclusion-key
  Found(pred, Found-proof(pf, k))

fun base-branch(goal: fact, f: fact, s: list<binding>, pred: string): <cache<string,search-change>,div> search-change
  match unify-fact(goal, f, s)
    Just(s1) -> found-change(pred, ByFact(apply-subst-fact(goal, s1)))
    Nothing -> NoChange

fun rule-branch(goal: fact, r: rule, s: list<binding>, depth: int, next-id: int, seen1: list<fact>,
                base-facts: list<fact>, rules: list<rule>, policies: list<relation-policy>,
                pred: string, depth-mode: relation-depth-mode): <cache<string,search-change>,div> search-change
  val (next1, rf) = freshen-rule(r, next-id)
  val Rule(rname, rpremises, rconclusion) = rf
  match unify-fact(goal, rconclusion, s)
    Just(s1) ->
      match prove-premises-memo(rpremises, s1, relation-depth/premise-depth(depth-mode, depth), next1, seen1, base-facts, rules, policies, depth-mode)
        Just((s2, subproofs, _)) ->
          val conc = apply-subst-fact(rconclusion, s2)
          found-change(pred, ByRule(rname, conc, subproofs))
        Nothing -> NoChange
    Nothing -> NoChange

fun can-table-premise(p: fact, policies: list<relation-policy>): div bool
  if p.is-ground then True
  else
    val Fact(pred, _) = p
    val policy = relation-policy/of(pred, policies)
    policy.memo-key.is-just

fun prove-premises-memo(premises: list<fact>, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
                        base-facts: list<fact>, rules: list<rule>, policies: list<relation-policy>,
                        depth-mode: relation-depth-mode): <cache<string,search-change>,div> maybe<(list<binding>, list<proof>, int)>
  match premises
    Nil -> Just((s, Nil, next-id))
    Cons(p, ps) ->
      val p1 = apply-subst-fact(p, s)
      if can-table-premise(p1, policies) then
        // Ground premise or custom key: safe to table.
        match prove-goal-memo(p1, s, depth, next-id, seen-ground, base-facts, rules, policies)
          Found(_, Found-proof(pf, _)) ->
            match prove-premises-memo(ps, s, depth, next-id, seen-ground, base-facts, rules, policies, depth-mode)
              Just((s2, pfs, next2)) -> Just((s2, Cons(pf, pfs), next2))
              Nothing -> Nothing
          NoChange -> Nothing
      else
        // Non-ground premise without custom key: keep substitution-threaded DFS semantics.
        match prove-goal(p, s, depth, next-id, seen-ground, base-facts, rules, relation-depth/control(depth-mode))
          Just((s1, pf, next1)) ->
            match prove-premises-memo(ps, s1, depth, next1, seen-ground, base-facts, rules, policies, depth-mode)
              Just((s2, pfs, next2)) -> Just((s2, Cons(pf, pfs), next2))
              Nothing -> Nothing
          Nothing -> Nothing

fun prove-goal-memo(goal0: fact, s: list<binding>, depth: int, next-id: int, seen-ground: list<fact>,
                    base-facts: list<fact>, rules: list<rule>, policies: list<relation-policy>): <cache<string,search-change>,div> search-change
  val goal = apply-subst-fact(goal0, s)
  val Fact(pred, _) = goal
  val policy = relation-policy/of(pred, policies)
  val Relation-policy(_, _, depth-mode, custom-key) = policy
  val local-depth = relation-depth/reset(depth-mode, depth)
  if depth-control/exhausted(local-depth, relation-depth/control(depth-mode)) then NoChange
  else
    // With a custom key, we can table non-ground goals (the user controls what's keyed)
    val can-table = custom-key.is-just || goal.is-ground
    if !can-table then
      // Non-ground goals without custom key: use DFS and wrap result as change.
      match prove-goal(goal, s, local-depth, next-id, seen-ground, base-facts, rules, relation-depth/control(depth-mode))
        Just((_, pf, _)) ->
          found-change(pred, pf)
        Nothing -> NoChange
    else
      if goal.is-ground && fact/in-list(goal, seen-ground) then NoChange
      else
        val seen1 = if goal.is-ground then Cons(goal, seen-ground) else seen-ground
        val key = match custom-key
          Just(f) -> f(goal)
          Nothing -> goal.show
        // memo(key) provides recursive tabling over all applicable branches.
        with each <- memo(key)
        val base-branches =
          base-facts.map(fn(f)
            fn() base-branch(goal, f, s, pred)
          )
        val rule-branches =
          rules.map(fn(r)
            fn() rule-branch(goal, r, s, local-depth, next-id, seen1, base-facts, rules, policies, pred, depth-mode)
          )
        val branches = base-branches ++ rule-branches
        each(if branches.is-empty then [fn() NoChange] else branches)

fun agg-proofs(agg: search-agg): <exn,div> list<proof>
  match agg
    AggUnknown -> Nil
    AggKnown(pred, _, state) ->
      match state
        MemoDetConflict(_, _) -> throw("deterministic relation produced multiple results: " ++ pred)
        MemoDet(Nothing) -> Nil
        MemoDet(Just(found)) -> [found-proof/proof(found)]
        MemoFirst(Nothing) -> Nil
        MemoFirst(Just(found)) -> [found-proof/proof(found)]
        MemoNondet(values) -> values.map(found-proof/proof)

pub fun search-all-memo(goal: fact, base-facts: list<fact>, rules: list<rule>,
                        policies: list<relation-policy> = Nil, max-depth: int = 50): <exn,div> list<proof>
  val key = goal.show
  val table =
    // Lattice is provided explicitly; no implicit lattice resolution.
    with std/fixpoint/fixpoint-memo/cache(?change-lattice = search-lattice(policies), ?order2 = string/order2,
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

// Run search and return the full memo table: all goals explored and their proofs.
// This is the "collecting semantics" view — the table is the analysis result.
pub fun search-table(goal: fact, base-facts: list<fact>, rules: list<rule>,
                     policies: list<relation-policy> = Nil, max-depth: int = 50): <exn,div> list<(string, list<proof>)>
  val table =
    with std/fixpoint/fixpoint-memo/cache(?change-lattice = search-lattice(policies), ?order2 = string/order2,
                                          ?k/show = show/string/show, ?r/show = search-change/show)
    prove-goal-memo(goal, Nil, max-depth, 0, Nil, base-facts, rules, policies)
  table.list.map(fn((k, agg)) (k, agg-proofs(agg)))
