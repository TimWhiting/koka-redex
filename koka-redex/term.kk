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

pub type fact
  Fact(pred: string, args: list<term>)

pub value struct rule
  name: string
  premises: list<fact>
  conclusion: fact

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
    _ -> True

pub fun fact/is-ground(Fact(_, args): fact): div bool
  args.all(term/is-ground)
