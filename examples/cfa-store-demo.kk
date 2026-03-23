module examples/cfa-store-demo

// 0CFA via store-passing definitional interpreter
// with external relation solver for lookup
//
// eval(expr, store_in, value, store_out)
//
// The store maps variable names → values. In 0CFA, the same variable can
// be bound to multiple values (from different call sites), so the store
// is a flat list where lookup returns ANY matching binding.
// Over-approximation arises because bindings accumulate monotonically.
//
// The lookup relation is implemented as an external Koka function that
// returns ALL matching bindings, enabling backtracking through alternatives.

import koka-redex/proof-search
import koka-redex/proof-search-policy

// ---------------------------------------------------------------------------
// Store representation as terms
// ---------------------------------------------------------------------------

fun snil(): term
  TNode("snil", [])

fun scons(name: term, value: term, rest: term): term
  TNode("scons", [name, value, rest])

// ---------------------------------------------------------------------------
// Term constructors
// ---------------------------------------------------------------------------

fun evar(x: string): term
  TNode("var", [TAtom(x)])

fun elam(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp(e1: term, e2: term): term
  TNode("app", [e1, e2])

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

fun eval-fact(e: term, s-in: term, v: term, s-out: term): fact
  Fact("eval", [e, s-in, v, s-out])

fun lookup-fact(s: term, x: term, v: term): fact
  Fact("lookup", [s, x, v])

fun neq-fact(a: term, b: term): fact
  Fact("neq", [a, b])

// ---------------------------------------------------------------------------
// External solver: lookup and neq as Koka functions
// ---------------------------------------------------------------------------

// Walk the store term and collect ALL values bound to the given name
fun store-lookup-all(store: term, name: term): div list<term>
  match store
    TNode("scons", [n, v, rest]) ->
      val found = if term/eq(n, name) then [v] else []
      found ++ store-lookup-all(rest, name)
    _ -> []

fun external-solve(goal: fact, s: list<binding>): div maybe<list<(list<binding>, proof)>>
  val goal1 = apply-subst-fact(goal, s)
  match goal1
    Fact("lookup", [store, name, _value]) ->
      val results = store-lookup-all(store, name)
      if results.is-empty then Just([])  // handled but no results
      else
        val solutions = results.map fn(v)
          val resolved = Fact("lookup", [store, name, v])
          // Unify the original goal with the resolved fact to get bindings
          match unify-fact(goal, resolved, s)
            Just(s1) -> Just((s1, ByFact(resolved)))
            Nothing -> Nothing
        Just(solutions.flatmap(fn(x) match x { Just(r) -> [r]; Nothing -> [] }))
    Fact("neq", [a, b]) ->
      if term/eq(a, b) then Just([])  // same: no solutions
      else Just([(s, ByFact(goal1))])  // different: one solution with current subst
    _ -> Nothing  // not handled

// ---------------------------------------------------------------------------
// Policies with custom memo key
// ---------------------------------------------------------------------------

pub type r-eval
  REval

val eval/rel-memo-lattice : rel-memo-lattice<r-eval>
  = Rel-memo-lattice(memo-lattice/nondet-set())

// Custom key: only expr and store_in are the memo key (first 2 args)
// value and store_out are outputs discovered by the fixpoint
fun eval-key(f: fact): div string
  match f
    Fact(pred, args) ->
      val input-args = args.take(2)
      Fact(pred, input-args).show

fun policies(): list<relation-policy>
  val eval-tag : pred-tag<r-eval> = mk/pred-tag("eval")
  [ policy/of-key(eval-tag, eval-key) ]

// ---------------------------------------------------------------------------
// Rules (no lookup rules needed — handled externally)
// ---------------------------------------------------------------------------

fun v(name: string): term
  TVar(name, 0)

fun eval-rules(): list<rule>
  [ // E-Lam: lambda values evaluate to themselves, store unchanged
    Rule("E-Lam", [],
      eval-fact(TNode("lam", [v("x"), v("e")]), v("s"), TNode("lam", [v("x"), v("e")]), v("s"))),
    // E-Var: variable lookup in store
    Rule("E-Var",
      [lookup-fact(v("s"), v("x"), v("val"))],
      eval-fact(TNode("var", [v("x")]), v("s"), v("val"), v("s"))),
    // E-App: evaluate function, argument, then body with extended store
    Rule("E-App",
      [ eval-fact(v("e1"), v("s0"), TNode("lam", [v("x"), v("e3")]), v("s1")),
        eval-fact(v("e2"), v("s1"), v("v2"), v("s2")),
        eval-fact(v("e3"), scons(v("x"), v("v2"), v("s2")), v("v"), v("s3")) ],
      eval-fact(eapp(v("e1"), v("e2")), v("s0"), v("v"), v("s3")))
  ]

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

pub fun main()
  val id-fn = elam("x", evar("x"))
  val lam-a = elam("a", evar("a"))
  val lam-b = elam("b", evar("b"))

  // Example 1: (λx.x)(λz.z) — DFS with external lookup
  println("=== Store-Passing: (λx.x)(λz.z) ===")
  val arg = elam("z", evar("z"))
  val program1 = eapp(id-fn, arg)
  val goal1 = eval-fact(program1, snil(), TVar("v", 0), TVar("s", 0))
  match search(goal1, [], eval-rules(), 20, ?external=external-solve)
    Just(pf) -> println(pf.conclusion-key)
    Nothing -> println("No proof")

  // Example 2: let f = λx.x in (f λa.a)(f λb.b)
  println("\n=== Store-Passing: let f = λx.x in (f λa.a)(f λb.b) ===")
  val f-app-a = eapp(evar("f"), lam-a)
  val f-app-b = eapp(evar("f"), lam-b)
  val body2 = eapp(f-app-a, f-app-b)
  val program2 = eapp(elam("f", body2), id-fn)

  // Concrete: result is λb.b
  println("--- Query: result = λb.b ---")
  val goal2a = eval-fact(program2, snil(), lam-b, TVar("s", 0))
  match search(goal2a, [], eval-rules(), 30, ?external=external-solve)
    Just(pf) -> println("Found: " ++ pf.conclusion-key)
    Nothing -> println("No proof")

  // Over-approximation: can result be λa.a?
  // External lookup enables backtracking through x→λa.a when x→λb.b is also in store
  println("--- Query: result = λa.a (over-approximation?) ---")
  val goal2b = eval-fact(program2, snil(), lam-a, TVar("s", 0))
  match search(goal2b, [], eval-rules(), 30, ?external=external-solve)
    Just(pf) -> println("Found: " ++ pf.conclusion-key ++ " (spurious but sound!)")
    Nothing -> println("No proof — store-threading prevents merging without recursion")
