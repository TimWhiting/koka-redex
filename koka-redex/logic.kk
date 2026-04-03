module koka-redex/logic

// Logic effect: microkanren-style unification as an algebraic effect.
//
// Combines unification, nondeterminism awareness, and fresh variable generation.
// The effect is currently over the `term` type; future versions will be
// generic via implicits (user provides ?unify for their domain type).

pub import koka-redex/term

// ---------------------------------------------------------------------------
// The logic effect
// ---------------------------------------------------------------------------

pub effect logic
  // Unify two terms. Modifies the substitution state.
  // Fails (via ctl fail) if unification is impossible.
  fun unify(t1: term, t2: term): ()
  // Resolve a term through the current substitution (shallow walk)
  fun walk(t: term): term
  // Apply substitution deeply (resolve all variables)
  fun resolve(t: term): term
  // Resolve a fact
  fun resolve-fact(f: fact): fact
  // Generate a fresh variable
  fun freshv(pre: string): term
  // Save/restore substitution state (for nondeterministic branches)
  fun save(): list<(string, int, term)>
  fun restore(s: list<(string, int, term)>): ()

// ---------------------------------------------------------------------------
// Convenience: unify two facts
// ---------------------------------------------------------------------------

pub fun unify-facts(f1: fact, f2: fact): <logic,div> ()
  match (f1, f2)
    (Fact(p1, as1), Fact(p2, as2)) ->
      if p1 != p2 then unify(TAtom(""), TInt(0))  // will fail in handler
      else unify-lists(as1, as2)

fun unify-lists(xs: list<term>, ys: list<term>): <logic,div> ()
  match (xs, ys)
    (Nil, Nil) -> ()
    (Cons(x, xr), Cons(y, yr)) -> { unify(x, y); unify-lists(xr, yr) }
    _ -> unify(TAtom(""), TInt(0))  // will fail in handler

// ---------------------------------------------------------------------------
// Freshen a rule using the logic effect
// ---------------------------------------------------------------------------

fun freshen-term(t: term, rs: list<(string, int, term)>): <logic,div> (list<(string, int, term)>, term)
  match t
    TVar(name, old-id) ->
      match rs.find(fn((n, i, _)) n == name && i == old-id)
        Just((_, _, new-t)) -> (rs, new-t)
        Nothing ->
          val new-t = freshv(name)
          (Cons((name, old-id, new-t), rs), new-t)
    TNode(name, args) ->
      val (rs2, args2) = freshen-terms(args, rs)
      (rs2, TNode(name, args2))
    _ -> (rs, t)

fun freshen-terms(ts: list<term>, rs: list<(string, int, term)>): <logic,div> (list<(string, int, term)>, list<term>)
  match ts
    Nil -> (rs, Nil)
    Cons(t, rest) ->
      val (rs1, t1) = freshen-term(t, rs)
      val (rs2, rest1) = freshen-terms(rest, rs1)
      (rs2, Cons(t1, rest1))

fun freshen-fact(Fact(pred, args): fact, rs: list<(string, int, term)>): <logic,div> (list<(string, int, term)>, fact)
  val (rs1, args1) = freshen-terms(args, rs)
  (rs1, Fact(pred, args1))

fun freshen-facts(fs: list<fact>, rs: list<(string, int, term)>): <logic,div> (list<(string, int, term)>, list<fact>)
  match fs
    Nil -> (rs, Nil)
    Cons(f, rest) ->
      val (rs1, f1) = freshen-fact(f, rs)
      val (rs2, rest1) = freshen-facts(rest, rs1)
      (rs2, Cons(f1, rest1))

pub fun freshen-rule(r: rule): <logic,div> rule
  val Rule(name, premises, conclusions) = r
  val (rs1, concs1) = freshen-facts(conclusions, [])
  val (_, prems1) = freshen-facts(premises, rs1)
  Rule(name, prems1, concs1)

// ---------------------------------------------------------------------------
// Handler: provides logic operations backed by a substitution list
// ---------------------------------------------------------------------------

// `on-fail` is called when unification fails — typically `none()` from cache effect.
pub fun with-logic(on-fail: () -> <div|e> (), action: () -> <logic,div|e> a): <div|e> a
  var subst : list<(string, int, term)> := []
  var counter := 10000
  with handler
    fun unify(t1, t2)
      match unify-internal(t1, t2, subst)
        Just(s) -> 
          subst := s
          // trace("New subst: " ++ subst.show)
        Nothing -> on-fail()
    fun walk(t)
      walk-internal(t, subst)
    fun resolve(t)
      resolve-internal(t, subst)
    fun resolve-fact(f)
      match f
        Fact(pred, args) -> Fact(pred, args.map(fn(a) resolve-internal(a, subst)))
    fun freshv(pre)
      counter := counter + 1
      TVar(pre, counter)
    fun save()
      subst
    fun restore(s)
      subst := s
  action()

// ---------------------------------------------------------------------------
// Internal: unification over term with occurs-check
// ---------------------------------------------------------------------------

fun unify-internal(t1: term, t2: term, s: list<(string, int, term)>): div maybe<list<(string, int, term)>>
  val w1 = walk-internal(t1, s)
  val w2 = walk-internal(t2, s)
  match (w1, w2)
    (TVar(n1, i1), TVar(n2, i2)) ->
      if n1 == n2 && i1 == i2 then Just(s)
      else Just(Cons((n1, i1, w2), s))
    (TVar(n, i), t) ->
      if occurs-internal(n, i, t, s) then Nothing
      else Just(Cons((n, i, t), s))
    (t, TVar(n, i)) ->
      if occurs-internal(n, i, t, s) then Nothing
      else Just(Cons((n, i, t), s))
    (TAtom(a1), TAtom(a2)) -> if a1 == a2 then Just(s) else Nothing
    (TInt(i1), TInt(i2)) -> if i1 == i2 then Just(s) else Nothing
    (TRef(a), TRef(b)) -> if a == b then Just(s) else Nothing  // O(1)
    (TNode(n1, as1), TNode(n2, as2)) ->
      if n1 == n2 then unify-args-internal(as1, as2, s) else Nothing
    _ -> Nothing

fun unify-args-internal(xs: list<term>, ys: list<term>, s: list<(string, int, term)>): div maybe<list<(string, int, term)>>
  match (xs, ys)
    (Nil, Nil) -> Just(s)
    (Cons(x, xr), Cons(y, yr)) ->
      match unify-internal(x, y, s)
        Just(s1) -> unify-args-internal(xr, yr, s1)
        Nothing -> Nothing
    _ -> Nothing

fun walk-internal(t: term, s: list<(string, int, term)>): div term
  match t
    TVar(name, id) ->
      match s.find(fn((n, i, _)) n == name && i == id)
        Just((_, _, v)) -> walk-internal(v, s)
        Nothing -> t
    _ -> t

fun resolve-internal(t: term, s: list<(string, int, term)>): div term
  match walk-internal(t, s)
    TVar(n, i) -> TVar(n, i)
    TAtom(a) -> TAtom(a)
    TInt(i) -> TInt(i)
    TRef(id) -> TRef(id)  // opaque, don't walk into
    TNode(n, args) -> TNode(n, args.map(fn(a) resolve-internal(a, s)))

fun occurs-internal(name: string, id: int, t: term, s: list<(string, int, term)>): div bool
  match walk-internal(t, s)
    TVar(n, i) -> n == name && i == id
    TNode(_, args) -> args.any(fn(a) occurs-internal(name, id, a, s))
    _ -> False
