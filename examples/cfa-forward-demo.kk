module examples/cfa-forward-demo

// 0CFA with store-passing using the koka-redex framework's forward-chaining engine.
// Rules are defined using proof-search's rule/fact/term types.
// Execution uses forward.kk instead of backward-chaining proof-search.

import koka-redex/proof-search
import koka-redex/forward

// ---------------------------------------------------------------------------
// Term constructors (same as other demos)
// ---------------------------------------------------------------------------

fun evar(x: string): term
  TNode("var", [TAtom(x)])

fun elam(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp(e1: term, e2: term): term
  TNode("app", [e1, e2])

fun snil(): term
  TNode("snil", [])

fun scons(name: term, value: term, rest: term): term
  TNode("scons", [name, value, rest])

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

fun eval-fact(e: term, s-in: term, v: term, s-out: term): fact
  Fact("eval", [e, s-in, v, s-out])

fun lookup-fact(s: term, x: term, v: term): fact
  Fact("lookup", [s, x, v])

// ---------------------------------------------------------------------------
// Rules — store-passing eval
// ---------------------------------------------------------------------------

fun v(name: string): term
  TVar(name, 0)

fun cfa-rules(): list<rule>
  [ // E-Lam: lambda values evaluate to themselves, store unchanged
    Rule("E-Lam", [],
      eval-fact(TNode("lam", [v("x"), v("e")]), v("s"), TNode("lam", [v("x"), v("e")]), v("s"))),
    // E-Var: variable lookup in store (lookup handled externally)
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
// External solver: lookup in store terms
// ---------------------------------------------------------------------------

fun store-lookup-all(store: term, name: term): div list<term>
  match store
    TNode("scons", [n, vl, rest]) ->
      val found = if term/eq(n, name) then [vl] else []
      found ++ store-lookup-all(rest, name)
    _ -> []

fun external(goal: fact): div maybe<list<fact>>
  match goal
    Fact("lookup", [store, name, _value]) ->
      val results = store-lookup-all(store, name)
      Just(results.map(fn(vl) Fact("lookup", [store, name, vl])))
    _ -> Nothing

// ---------------------------------------------------------------------------
// Memo key: only input positions (expr, store_in) — first 2 args
// ---------------------------------------------------------------------------

fun eval-memo-key(f: fact): div string
  match f
    Fact(pred, args) ->
      Fact(pred, args.take(2)).show

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

fun show-table(table: list<(string, list<fact>)>)
  println("  (" ++ table.length.show ++ " memo entries)")
  table.foreach fn((key, results))
    val vals = results.map(fn(f)
      match f
        Fact(_, args) -> args.drop(2).map(fn(t) t.show).list/joinsep/join(", ")
    )
    val vs = if vals.is-empty then "<bottom>" else vals.list/joinsep/join(" | ")
    println("  " ++ key ++ " => {" ++ vs ++ "}")

pub fun main()
  val id-fn = elam("x", evar("x"))
  val rules = cfa-rules()

  // Example 1: (λx.x)(λz.z)
  println("=== Forward-Chaining 0CFA: (λx.x)(λz.z) ===")
  val arg = elam("z", evar("z"))
  val program1 = eapp(id-fn, arg)
  val goal1 = eval-fact(program1, snil(), TVar("v", 0), TVar("s", 0))
  val table1 = forward-search(goal1, rules, ?external=external, ?memo-key=eval-memo-key)
  show-table(table1)

  // Example 2: (λf.f f)(λx.x)
  println("\n=== Forward-Chaining 0CFA: (λf.f f)(λx.x) ===")
  val program2 = eapp(elam("f", eapp(evar("f"), evar("f"))), id-fn)
  val goal2 = eval-fact(program2, snil(), TVar("v", 0), TVar("s", 0))
  val table2 = forward-search(goal2, rules, ?external=external, ?memo-key=eval-memo-key)
  show-table(table2)

  // Example 3: let f = λx.x in (f λa.a)(f λb.b)
  println("\n=== Forward-Chaining 0CFA: let f = λx.x in (f λa.a)(f λb.b) ===")
  val lam-a = elam("a", evar("a"))
  val lam-b = elam("b", evar("b"))
  val body3 = eapp(eapp(evar("f"), lam-a), eapp(evar("f"), lam-b))
  val program3 = eapp(elam("f", body3), id-fn)
  val goal3 = eval-fact(program3, snil(), TVar("v", 0), TVar("s", 0))
  val table3 = forward-search(goal3, rules, ?external=external, ?memo-key=eval-memo-key)
  show-table(table3)

  // Check for over-approximation
  println("\nOver-approximation check:")
  table3.foreach fn((key, results))
    if results.length > 1 then
      println("  ** " ++ key ++ " has " ++ results.length.show ++ " values **")
