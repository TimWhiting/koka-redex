module examples/direct/cfa-store-direct

// 0CFA for lambda calculus — store-passing style using fixpoint-memo
//
// Unlike cfa-direct.kk (which uses a widened global store via push/depend),
// this version threads the store explicitly through the evaluation.
// The store is a Koka value (list of bindings), not a memo table entry.
//
// This is closer to what koka-redex rules would produce initially,
// where the store is an argument to the eval relation:
//   eval(expr, store) => (value, store')
//
// The memo key is (expr, store) — the input positions.
// The lattice collects (value, store') pairs as outputs.

import std/fixpoint/fixpoint-memo
import std/fixpoint/lattice
import std/core/unsafe

// ---------------------------------------------------------------------------
// Expressions
// ---------------------------------------------------------------------------

type expr
  EVar(name: string)
  ELam(param: string, body: expr)
  EApp(fn_: expr, arg: expr)

fun expr/show(e: expr): div string
  match e
    EVar(n) -> n
    ELam(p, b) -> "(lam " ++ p ++ " " ++ b.show ++ ")"
    EApp(f, a) -> "(" ++ f.show ++ " " ++ a.show ++ ")"

fun expr/(==)(a: expr, b: expr): div bool
  match (a, b)
    (EVar(n1), EVar(n2)) -> n1 == n2
    (ELam(p1, b1), ELam(p2, b2)) -> p1 == p2 && expr/(==)(b1, b2)
    (EApp(f1, a1), EApp(f2, a2)) -> expr/(==)(f1, f2) && expr/(==)(a1, a2)
    _ -> False

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

type cvalue
  ClosV(param: string, body: expr)

fun cvalue/show(v: cvalue): div string
  match v
    ClosV(p, b) -> "(lam " ++ p ++ " " ++ b.show ++ ")"

fun cvalue/(==)(a: cvalue, b: cvalue): div bool
  match (a, b)
    (ClosV(p1, b1), ClosV(p2, b2)) -> p1 == p2 && expr/(==)(b1, b2)

// ---------------------------------------------------------------------------
// Store: list of (name, value) bindings
// ---------------------------------------------------------------------------

alias store = list<(string, cvalue)>

fun store/show(s: store): div string
  s.map(fn((n, v)) n ++ "=" ++ v.show).list/joinsep/join(", ")

fun store/lookup-all(s: store, name: string): div list<cvalue>
  s.flatmap fn((n, v))
    if n == name then [v] else []

fun store/bind(s: store, name: string, value: cvalue): store
  Cons((name, value), s)

fun store/(==)(a: store, b: store): div bool
  match (a, b)
    (Nil, Nil) -> True
    (Cons((n1,v1), r1), Cons((n2,v2), r2)) -> n1 == n2 && cvalue/(==)(v1, v2) && store/(==)(r1, r2)
    _ -> False

// ---------------------------------------------------------------------------
// Result: (value, store') pair
// ---------------------------------------------------------------------------

struct result
  value: cvalue
  store_: store

fun result/show(r: result): div string
  "(" ++ r.value.show ++ ", [" ++ store/show(r.store_) ++ "])"

fun result/(==)(a: result, b: result): div bool
  cvalue/(==)(a.value, b.value) && store/(==)(a.store_, b.store_)

// ---------------------------------------------------------------------------
// Lattice: set of results
// ---------------------------------------------------------------------------

fun result-join(old: list<result>, new: result): pure (bool, list<result>)
  if old.any(fn(r) unsafe-total({result/(==)(r, new)})) then (False, old)
  else (True, Cons(new, old))

val result-lattice : change-lattice<list<result>, result> = Change-lattice([], result-join, fn(x) x)

// ---------------------------------------------------------------------------
// Memo key: (expr, store) as string
// ---------------------------------------------------------------------------

fun eval-key(e: expr, s: store): div string
  unsafe-total({e.show}) ++ "|" ++ unsafe-total({store/show(s)})

// ---------------------------------------------------------------------------
// The interpreter — store-passing
// ---------------------------------------------------------------------------

fun eval(e: expr, s: store): <cache<string, result>, div> result
  with each <- memo(eval-key(e, s))
  match e
    ELam(x, body) ->
      each([fn() Result(ClosV(x, body), s)])
    EVar(x) ->
      // Look up ALL bindings for x in the store
      val vals = s.lookup-all(x)
      each(vals.map(fn(v) fn() Result(v, s)))
    EApp(f, a) ->
      // Evaluate function
      val Result(fv, s1) = eval(f, s)
      // Evaluate argument
      val Result(av, s2) = eval(a, s1)
      match fv
        ClosV(x, body) ->
          // Extend store with binding
          val s3 = s2.bind(x, av)
          // Evaluate body
          eval(body, s3)

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

fun run-cfa(name: string, program: expr)
  println("\n=== " ++ name ++ " ===")
  println("Program: " ++ unsafe-total({program.show}))
  val table =
    with cache(?change-lattice = result-lattice,
               ?order2 = string/order2,
               ?k/show = fn(s) s,
               ?r/show = fn(r: result) unsafe-total({r.show}))
    eval(program, [])
  // Show entries with results
  println("Memo table (" ++ table.list.length.show ++ " entries):")
  table.list.foreach fn((key, results))
    if results.length > 0 then
      val vs = results.map(fn(r) unsafe-total({r.value.show})).list/joinsep/join(", ")
      println("  " ++ key ++ " => {" ++ vs ++ "}")
  // Highlight over-approximation
  table.list.foreach fn((key, results))
    if results.length > 1 then
      println("  ** OVER-APPROX: " ++ key ++ " has " ++ results.length.show ++ " values **")

pub fun main()
  val id-fn = ELam("x", EVar("x"))

  // Example 1: (λx.x)(λz.z)
  run-cfa("(λx.x)(λz.z)", EApp(id-fn, ELam("z", EVar("z"))))

  // Example 2: (λf.f f)(λx.x)
  run-cfa("(λf.f f)(λx.x)", EApp(ELam("f", EApp(EVar("f"), EVar("f"))), id-fn))

  // Example 3: let f = λx.x in (f λa.a)(f λb.b)
  val lam-a = ELam("a", EVar("a"))
  val lam-b = ELam("b", EVar("b"))
  val body3 = EApp(EApp(EVar("f"), lam-a), EApp(EVar("f"), lam-b))
  run-cfa("let f = λx.x in (f λa.a)(f λb.b)", EApp(ELam("f", body3), id-fn))
