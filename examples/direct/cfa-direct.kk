module examples/direct/cfa-direct

// 0CFA for lambda calculus — direct style using fixpoint-memo
//
// This demonstrates what koka-redex should generate from typed rules:
// a forward-chaining memoized interpreter where the expression structure
// determines control flow, and the fixpoint memo handles the abstraction.
//
// Key design: forward chain when possible (syntax-directed).
// Premises are evaluated in dependency order — each output feeds the next input.
// No backward chaining needed.

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

fun expr/order2(a: expr, b: expr): div order2<expr>
  match a.show.cmp(b.show)
    Lt -> Lt2(a, b)
    Gt -> Gt2(a, b)
    Eq -> Eq2(a)

// ---------------------------------------------------------------------------
// Values: in 0CFA, values are just lambda terms (closures without environments)
// ---------------------------------------------------------------------------

type cvalue
  ClosV(param: string, body: expr)

fun cvalue/show(v: cvalue): div string
  match v
    ClosV(p, b) -> "(lam " ++ p ++ " " ++ b.show ++ ")"

fun cvalue/(==)(a: cvalue, b: cvalue): div bool
  match (a, b)
    (ClosV(p1, b1), ClosV(p2, b2)) -> p1 == p2 && expr/(==)(b1, b2)

fun expr/(==)(a: expr, b: expr): div bool
  match (a, b)
    (EVar(n1), EVar(n2)) -> n1 == n2
    (ELam(p1, b1), ELam(p2, b2)) -> p1 == p2 && expr/(==)(b1, b2)
    (EApp(f1, a1), EApp(f2, a2)) -> expr/(==)(f1, f2) && expr/(==)(a1, a2)
    _ -> False

// ---------------------------------------------------------------------------
// Lattice: set of values (nondet-set)
// ---------------------------------------------------------------------------

fun value-join(old: list<cvalue>, new: cvalue): pure (bool, list<cvalue>)
  if old.any(fn(v) unsafe-total({cvalue/(==)(v, new)})) then (False, old)
  else (True, Cons(new, old))

val value-lattice : change-lattice<list<cvalue>, cvalue> = Change-lattice([], value-join, fn(x) x)

// ---------------------------------------------------------------------------
// Store: maps variable names to sets of values
// Uses the same fixpoint-memo cache as eval, but with string keys
// ---------------------------------------------------------------------------

// We use a product lattice: eval results and store results share one cache
// Key = either ("eval", expr.show) or ("store", varname)
// Both map to set<cvalue>

fun eval-key(e: expr): div string
  "eval:" ++ e.show

fun store-key(x: string): string
  "store:" ++ x

// ---------------------------------------------------------------------------
// The interpreter
// ---------------------------------------------------------------------------

fun eval(e: expr): <cache<string, cvalue>, div> cvalue
  with each <- memo(eval-key(e))
  match e
    ELam(x, body) ->
      each([fn() ClosV(x, body)])
    EVar(x) ->
      // Variable lookup: depend on the store for x
      // push in EApp initializes the key; if not initialized, it's an unbound variable
      each([fn() depend(store-key(x))])
    EApp(f, a) ->
      // Evaluate function and argument
      val fv = eval(f)
      val av = eval(a)
      match fv
        ClosV(x, body) ->
          // Bind parameter: add argument value to store for x
          push(store-key(x), av)
          // Evaluate body — result flows to this application
          eval(body)

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

fun run-cfa(name: string, program: expr)
  println("\n--- " ++ name ++ " ---")
  println("Program: " ++ program.show)
  val table =
    with cache(?change-lattice = value-lattice,
               ?order2 = string/order2,
               ?k/show = fn(s) s,
               ?r/show = fn(v: cvalue) unsafe-total({v.show}))
    eval(program)
  // Show all entries
  table.list.foreach fn((key, values))
    val vs = values.map(fn(v) unsafe-total({v.show})).list/joinsep/join(", ")
    if vs != "" then
      println("  " ++ key ++ " => {" ++ vs ++ "}")

pub fun main()
  // Example 1: (λx.x)(λz.z)
  val id-fn = ELam("x", EVar("x"))
  val arg1 = ELam("z", EVar("z"))
  run-cfa("(λx.x)(λz.z)", EApp(id-fn, arg1))

  // Example 2: (λf.f f)(λx.x)
  run-cfa("(λf.f f)(λx.x)", EApp(ELam("f", EApp(EVar("f"), EVar("f"))), id-fn))

  // Example 3: let f = λx.x in (f λa.a)(f λb.b)
  // = (λf. (f λa.a)(f λb.b))(λx.x)
  // 0CFA should show x => {λa.a, λb.b} — over-approximation!
  val lam-a = ELam("a", EVar("a"))
  val lam-b = ELam("b", EVar("b"))
  val body3 = EApp(EApp(EVar("f"), lam-a), EApp(EVar("f"), lam-b))
  run-cfa("let f = λx.x in (f λa.a)(f λb.b)", EApp(ELam("f", body3), id-fn))
