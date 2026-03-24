module test/test-forward

import std/test
import std/test/test
import koka-redex/forward

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

fun v(nm: string): term
  TVar(nm, 0)

fun n(i: int): term
  TInt(i)

fun edge(a: term, b: term): fact
  Fact("edge", [a, b])

fun reach(a: term, b: term): fact
  Fact("reach", [a, b])

fun full-key(f: fact): div string
  f.show

fun reach-rules(): list<rule>
  [ Rule("edge-1-2", [], edge(n(1), n(2))),
    Rule("edge-2-3", [], edge(n(2), n(3))),
    Rule("edge-3-4", [], edge(n(3), n(4))),
    Rule("reach-edge",
      [edge(v("x"), v("y"))],
      reach(v("x"), v("y"))),
    Rule("reach-step",
      [edge(v("x"), v("y")), reach(v("y"), v("z"))],
      reach(v("x"), v("z"))) ]

fun get-results(table: list<(string, list<fact>)>, pred: string): list<fact>
  table.flatmap fn(kv)
    if kv.fst.starts-with(pred).is-just then kv.snd else []

// ---------------------------------------------------------------------------
// CFA helpers
// ---------------------------------------------------------------------------

fun evar(x: string): term
  TNode("var", [TAtom(x)])

fun elam(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp(e1: term, e2: term): term
  TNode("app", [e1, e2])

fun snil(): term
  TNode("snil", [])

fun scons(nm: term, vl: term, rest: term): term
  TNode("scons", [nm, vl, rest])

fun eval-fact(e: term, s-in: term, vl: term, s-out: term): fact
  Fact("eval", [e, s-in, vl, s-out])

fun cfa-rules(): list<rule>
  [ Rule("E-Lam", [],
      eval-fact(TNode("lam", [v("x"), v("e")]), v("s"), TNode("lam", [v("x"), v("e")]), v("s"))),
    Rule("E-Var",
      [Fact("lookup", [v("s"), v("x"), v("val")])],
      eval-fact(TNode("var", [v("x")]), v("s"), v("val"), v("s"))),
    Rule("E-App",
      [ eval-fact(v("e1"), v("s0"), TNode("lam", [v("x"), v("e3")]), v("s1")),
        eval-fact(v("e2"), v("s1"), v("v2"), v("s2")),
        eval-fact(v("e3"), scons(v("x"), v("v2"), v("s2")), v("v"), v("s3")) ],
      eval-fact(eapp(v("e1"), v("e2")), v("s0"), v("v"), v("s3")))
  ]

fun store-lookup-all(store: term, nm: term): div list<term>
  match store
    TNode("scons", [nn, vl, rest]) ->
      val found = if term/eq(nn, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

fun cfa-external(goal: fact): <logic,div> maybe<list<fact>>
  match goal
    Fact("lookup", [store, nm, _]) ->
      val results = store-lookup-all(store, nm)
      Just(results.map(fn(vl) Fact("lookup", [store, nm, vl])))
    _ -> Nothing

fun eval-memo-key(f: fact): div string
  match f
    Fact(pred, args) -> Fact(pred, args.take(2)).show

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

pub fun main()
  with run-tests()

  group("Reachability")
    test("ground query reach(1,4)")
      val table = forward-search(reach(n(1), n(4)), reach-rules(),
        ?external=default-external, ?memo-key=full-key)
      val reach-results = get-results(table, "reach(1,4)")
      expect(1) { reach-results.length }

    test("partial query reach(1,?)")
      val table = forward-search(reach(n(1), v("t")), reach-rules(),
        ?external=default-external, ?memo-key=full-key)
      val reach-results = get-results(table, "reach(1,")
      // reach(1,2), reach(1,3), reach(1,4)
      expect(3) { reach-results.length }

    test("open query reach(?,?)")
      val table = forward-search(reach(v("s"), v("d")), reach-rules(),
        ?external=default-external, ?memo-key=full-key)
      val reach-results = get-results(table, "reach(")
      // 6 reachable pairs from 3 edges
      // Some may be duplicated due to freshening — check at least 6
      expect-that(fn(n) n >= 6) { reach-results.length }

  group("0CFA Store-Passing")
    test("identity application")
      val id-fn = elam("x", evar("x"))
      val prog = eapp(id-fn, elam("z", evar("z")))
      val goal = eval-fact(prog, snil(), v("v"), v("s"))
      val table = forward-search(goal, cfa-rules(),
        ?external=cfa-external, ?memo-key=eval-memo-key)
      val results = get-results(table, "eval(app(")
      expect(1) { results.length }

    test("over-approximation: let f = id in (f a)(f b)")
      val id-fn = elam("x", evar("x"))
      val lam-a = elam("a", evar("a"))
      val lam-b = elam("b", evar("b"))
      val body = eapp(eapp(evar("f"), lam-a), eapp(evar("f"), lam-b))
      val prog = eapp(elam("f", body), id-fn)
      val goal = eval-fact(prog, snil(), v("v"), v("s"))
      val table = forward-search(goal, cfa-rules(),
        ?external=cfa-external, ?memo-key=eval-memo-key)
      // The top-level entry should have 2 values (over-approximation)
      val top-key = eval-memo-key(goal)
      val top-results = table.flatmap fn(kv)
        if kv.fst == top-key then kv.snd else []
      expect(2) { top-results.length }
