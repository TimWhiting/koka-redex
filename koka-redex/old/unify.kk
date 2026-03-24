module koka-redex/old/unify

// Unification, substitution, and freshening over the term/fact/rule types.

import koka-redex/term

// ---------------------------------------------------------------------------
// Bindings and substitutions
// ---------------------------------------------------------------------------

pub value struct binding
  name: string
  id: int
  value: term

value struct renaming
  name: string
  oldid: int
  newid: int

// ---------------------------------------------------------------------------
// Substitution lookup and application
// ---------------------------------------------------------------------------

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

// Walk follows substitution chains (union-find-like dereferencing)
pub fun walk(t: term, s: list<binding>): div term
  match t
    TVar(name, id) ->
      match lookup-binding(s, name, id)
        Just(v) -> walk(v, s)
        Nothing -> t
    _ -> t

fun apply-subst-term(t: term, s: list<binding>): div term
  match walk(t, s)
    TVar(n, i) -> TVar(n, i)
    TAtom(a) -> TAtom(a)
    TInt(i) -> TInt(i)
    TNode(n, args) -> TNode(n, args.map(fn(arg) apply-subst-term(arg, s)))

pub fun apply-subst-fact(Fact(pred, args): fact, s: list<binding>): div fact
  Fact(pred, args.map(fn(arg) apply-subst-term(arg, s)))

// ---------------------------------------------------------------------------
// Unification with occurs-check
// ---------------------------------------------------------------------------

fun occurs(name: string, id: int, t: term, s: list<binding>): div bool
  match walk(t, s)
    TVar(n, i) -> n == name && i == id
    TNode(_, args) -> args.any(fn(arg) occurs(name, id, arg, s))
    _ -> False

fun bind-var(name: string, id: int, t: term, s: list<binding>): div maybe<list<binding>>
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

pub fun unify-term(t1: term, t2: term, s: list<binding>): div maybe<list<binding>>
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

// ---------------------------------------------------------------------------
// Freshening (standardize-apart)
// ---------------------------------------------------------------------------

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
