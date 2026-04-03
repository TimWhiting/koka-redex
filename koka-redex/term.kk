module koka-redex/term
import std/core/undiv
import type-level/nil

// Core types for the rule-based framework.
// These are the foundation that all engines, bridges, and renderers build on.

// ---------------------------------------------------------------------------
// Terms: the universal value representation
// ---------------------------------------------------------------------------

pub val axiom = TNil

pub type term
  TVar(name: string, id: int)
  TAtom(name: string)
  TInt(value: int)
  TNode(name: string, args: list<term>)
  TRef(ref-id: int)              // opaque ground reference (interned value)

pub type fact
  Fact(pred: string, args: list<term>)

pub value struct rule
  name: string
  premises: list<fact>
  conclusions: list<fact>

pub type proof
  ByFact(fact: fact)
  ByRule(name: string, conclusion: fact, subproofs: list<proof>)

// ---------------------------------------------------------------------------
// Show
// ---------------------------------------------------------------------------

pub fun term/show(t: term): string
  match t
    TVar(name, id) -> name ++ "_" ++ id.show
    TAtom(name) -> name
    TInt(i) -> i.show
    TNode(name, args) -> name ++ "(" ++ args.map(fn(t') term/show(t'.pretend-decreasing)).join(",") ++ ")"
    TRef(id) -> "#" ++ id.show

pub fun fact/show(Fact(pred, args): fact): string
  pred ++ "(" ++ args.map(term/show).join(",") ++ ")"

pub fun proof/show(pf: proof, indent: string = ""): div string
  match pf
    ByFact(f) -> indent ++ "fact " ++ f.show
    ByRule(name, conc, subs) ->
      val head = indent ++ "rule " ++ name ++ " => " ++ conc.show
      val body = list/joinsep/join(subs.map(fn(p) proof/show(p, indent ++ "  ")), "\n")
      if body.is-empty then head else head ++ "\n" ++ body

pub fun proof/conclusion-key(pf: proof): div string
  match pf
    ByFact(f) -> f.show
    ByRule(_, conc, _) -> conc.show

// ---------------------------------------------------------------------------
// Equality
// ---------------------------------------------------------------------------

pub fun term/eq(t1: term, t2: term): div bool
  match (t1, t2)
    (TVar(n1, i1), TVar(n2, i2)) -> n1 == n2 && i1 == i2
    (TAtom(a1), TAtom(a2)) -> a1 == a2
    (TInt(i1), TInt(i2)) -> i1 == i2
    (TNode(n1, as1), TNode(n2, as2)) -> n1 == n2 && term-list/eq(as1, as2)
    (TRef(a), TRef(b)) -> a == b    // O(1) — just compare interned ids
    _ -> False

fun term-list/eq(xs: list<term>, ys: list<term>): div bool
  match (xs, ys)
    (Nil, Nil) -> True
    (Cons(x, xr), Cons(y, yr)) -> term/eq(x, y) && term-list/eq(xr, yr)
    _ -> False

pub fun fact/eq(f1: fact, f2: fact): div bool
  match (f1, f2)
    (Fact(p1, as1), Fact(p2, as2)) -> p1 == p2 && term-list/eq(as1, as2)

pub fun fact/in-list(f: fact, fs: list<fact>): div bool
  fs.any(fn(x) fact/eq(f, x))

// ---------------------------------------------------------------------------
// Groundness
// ---------------------------------------------------------------------------

pub fun term/is-ground(t: term): div bool
  match t
    TVar(_, _) -> False
    TNode(_, args) -> args.all(term/is-ground)
    _ -> True  // TAtom, TInt, TRef are all ground

pub fun fact/is-ground(Fact(_, args): fact): div bool
  args.all(term/is-ground)

// ---------------------------------------------------------------------------
// Ref pools: first-class interning for abstract term slots
// ---------------------------------------------------------------------------

pub named effect ref-pool<a::V>
  fun pool-intern(x: a): int
  fun pool-deref(id: int): a

pub fun make-pool(eq: (a, a) -> pure bool): pure ev<ref-pool<a>>
  var entries := []
  var next-id := 0
  with r <- named handler
    fun pool-intern(x)
      match entries.find(fn((_, existing)) eq(x, existing))
        Just((id, _)) -> id
        Nothing ->
          val id = next-id
          next-id := next-id + 1
          entries := Cons((id, x), entries)
          id
    fun pool-deref(id)
      match entries.find(fn((i, _)) i == id)
        Just((_, v)) -> v
        Nothing -> throw("pool-deref: invalid ref " ++ id.show)
  r

// Generic to-term / from-term for any interned type
pub fun ref/to-term(x: a, ?pool: ev<ref-pool<a>>): pure term
  TRef(pool.pool-intern(x))

pub fun ref/from-term(t: term, ?pool: ev<ref-pool<a>>): pure a
  match t
    TRef(id) -> pool.pool-deref(id)
    _ -> throw("ref/from-term: expected TRef, got " ++ t.show)

// ---------------------------------------------------------------------------
// Primitive to-term / from-term converters
// ---------------------------------------------------------------------------

pub fun term/to-term(t: term): term
  t

pub fun string/to-term(s: string): term
  TAtom(s)

pub fun int/to-term(i: int): term
  TInt(i)

pub fun string/from-term(t: term): exn string
  match t
    TAtom(s) -> s
    _ -> throw("string/from-term: expected TAtom, got " ++ t.show)

pub fun int/from-term(t: term): exn int
  match t
    TInt(i) -> i
    _ -> throw("int/from-term: expected TInt, got " ++ t.show)
