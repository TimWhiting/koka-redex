module test/test-bridge

import std/test
import koka-redex/forward-bridge

// ============================================================================
// Helpers
// ============================================================================

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

// ============================================================================
// Domain types for chain/to-fact tests
// ============================================================================

pub type expr
  EAny(pre: string, i: int)
  EVar(nm: string)
  ELam(x: string, body: expr)
  EApp(e1: expr, e2: expr)

pub fun expr/to-term(e: expr): term
  match e
    EAny(p, i) -> TVar(p, i)
    EVar(nm) -> TNode("var", [TAtom(nm)])
    ELam(x, body) -> TNode("lam", [TAtom(x), body.to-term])
    EApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])

pub type r-eval
  REval
pub fun r-eval/pred-name(_: r-eval): string
  "eval"

pub type r-reach2
  RReach2
pub fun r-reach2/pred-name(_: r-reach2): string
  "reach"

// ============================================================================
// CFA helpers
// ============================================================================

fun eval-fact(e: term, s: term, vl: term, s2: term): fact
  Fact("eval", [e, s, vl, s2])

fun snil-t(): term
  TNode("snil", [])

fun scons-t(nm: term, vl: term, rest: term): term
  TNode("scons", [nm, vl, rest])

fun tv(nm: string): term
  TVar(nm, 0)

fun store-lookup-all(s: term, nm: term): div list<term>
  match s
    TNode("scons", [nn, vl, rest]) ->
      val found = if term/eq(nn, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

fun lookup-external(goal: fact): <logic,div> maybe<list<fact>>
  match goal
    Fact("lookup", [s, nm, _]) ->
      val results = store-lookup-all(s, nm)
      Just(results.map(fn(vl) Fact("lookup", [s, nm, vl])))
    _ -> Nothing

fun evar-t(x: string): term
  TNode("var", [TAtom(x)])
fun elam-t(x: string, body: term): term
  TNode("lam", [TAtom(x), body])
fun eapp-t(e1: term, e2: term): term
  TNode("app", [e1, e2])

// ============================================================================
// Tests
// ============================================================================

fun get-results(table: list<(string, list<fact>)>, pred: string): list<fact>
  table.flatmap fn(kv)
    if kv.fst.starts-with(pred).is-just then kv.snd else []

pub fun main()
  with run-tests()

  group("Bridge: fact-level rules")
    test("relation/to-rules extracts correct count")
      fun rel()
        with relation-def
        with rule(TNil === "edge-1-2" ==> edge(n(1), n(2)))
        single/rule(
          edge(v("x"), v("y"))
          === "reach-edge" ==>
          reach(v("x"), v("y")))
      val rules = relation/to-rules(rel())
      expect(2) { rules.length }

    test("reachability via typed relation-def")
      fun rel()
        with relation-def
        with rule(TNil === "edge-1-2" ==> edge(n(1), n(2)))
        with rule(TNil === "edge-2-3" ==> edge(n(2), n(3)))
        with rule(
          edge(v("x"), v("y"))
          === "reach-edge" ==>
          reach(v("x"), v("y")))
        single/rule(
          edge(v("x"), v("y")) \\ reach(v("y"), v("z"))
          === "reach-step" ==>
          reach(v("x"), v("z")))
      val rules = relation/to-rules(rel())
      val table = forward-search(reach(n(1), v("t")), rules,
        ?external=default-external, ?memo-key=full-key)
      val results = get-results(table, "reach(1,")
      // 2 edges: 1→2, 2→3. Reachable from 1: {2, 3}
      expect(2) { results.length }

  group("Bridge: chain/to-fact")
    test("simple chain e |- REval \\ v")
      val e = EVar("x")
      val vl = ELam("y", EVar("y"))
      val chain = e |- REval \ vl
      val f = chain/to-fact(chain)
      expect("eval") { match f { Fact(p, _) -> p } }

    test("chain to-fact-info gives num-inputs")
      val e = EVar("x")
      val vl = ELam("y", EVar("y"))
      val chain = e |- REval \ vl
      val info = chain/to-fact-info(chain)
      expect(1) { info.snd }  // 1 input (e), 1 output (v)

  group("Bridge: memo-key derivation")
    test("make-memo-key projects first n args")
      val key-fn = make-memo-key("eval", 2)
      val f = Fact("eval", [TAtom("e"), TAtom("s"), TAtom("v"), TAtom("s2")])
      val key = key-fn(f)
      expect("eval(e,s)") { key }

    test("compose-memo-keys dispatches by predicate")
      val key = compose-memo-keys([
        ("eval", make-memo-key("eval", 2)),
        ("lookup", make-memo-key("lookup", 2))
      ])
      val f1 = Fact("eval", [TAtom("e"), TAtom("s"), TAtom("v"), TAtom("s2")])
      val f2 = Fact("lookup", [TAtom("s"), TAtom("x"), TAtom("v")])
      expect("eval(e,s)") { key(f1) }
      expect("lookup(s,x)") { key(f2) }

  group("0CFA via typed bridge")
    test("identity application")
      fun cfa-rel()
        with relation-def
        with rule(
          TNil
          === "E-Lam" ==>
          eval-fact(TNode("lam", [tv("x"), tv("e")]), tv("s"),
                    TNode("lam", [tv("x"), tv("e")]), tv("s")))
        with rule(
          Fact("lookup", [tv("s"), tv("x"), tv("val")])
          === "E-Var" ==>
          eval-fact(TNode("var", [tv("x")]), tv("s"), tv("val"), tv("s")))
        single/rule(
          eval-fact(tv("e1"), tv("s0"), TNode("lam", [tv("x"), tv("e3")]), tv("s1")) \\
          eval-fact(tv("e2"), tv("s1"), tv("v2"), tv("s2")) \\
          eval-fact(tv("e3"), scons-t(tv("x"), tv("v2"), tv("s2")), tv("v"), tv("s3"))
          === "E-App" ==>
          eval-fact(TNode("app", [tv("e1"), tv("e2")]), tv("s0"), tv("v"), tv("s3")))
      val rules = relation/to-rules(cfa-rel())
      val mk = compose-memo-keys([("eval", make-memo-key("eval", 2)), ("lookup", make-memo-key("lookup", 2))])
      val ext = compose-externals([("lookup", lookup-external)])
      val id-fn = elam-t("x", evar-t("x"))
      val goal = eval-fact(eapp-t(id-fn, elam-t("z", evar-t("z"))), snil-t(), tv("v"), tv("s"))
      val table = forward-search(goal, rules, ?external=ext, ?memo-key=mk)
      expect(4) { table.length }

    test("over-approximation: let f = id in (f a)(f b)")
      fun cfa-rel()
        with relation-def
        with rule(
          TNil
          === "E-Lam" ==>
          eval-fact(TNode("lam", [tv("x"), tv("e")]), tv("s"),
                    TNode("lam", [tv("x"), tv("e")]), tv("s")))
        with rule(
          Fact("lookup", [tv("s"), tv("x"), tv("val")])
          === "E-Var" ==>
          eval-fact(TNode("var", [tv("x")]), tv("s"), tv("val"), tv("s")))
        single/rule(
          eval-fact(tv("e1"), tv("s0"), TNode("lam", [tv("x"), tv("e3")]), tv("s1")) \\
          eval-fact(tv("e2"), tv("s1"), tv("v2"), tv("s2")) \\
          eval-fact(tv("e3"), scons-t(tv("x"), tv("v2"), tv("s2")), tv("v"), tv("s3"))
          === "E-App" ==>
          eval-fact(TNode("app", [tv("e1"), tv("e2")]), tv("s0"), tv("v"), tv("s3")))
      val rules = relation/to-rules(cfa-rel())
      val mk = compose-memo-keys([("eval", make-memo-key("eval", 2)), ("lookup", make-memo-key("lookup", 2))])
      val ext = compose-externals([("lookup", lookup-external)])
      val id-fn = elam-t("x", evar-t("x"))
      val lam-a = elam-t("a", evar-t("a"))
      val lam-b = elam-t("b", evar-t("b"))
      val body = eapp-t(eapp-t(evar-t("f"), lam-a), eapp-t(evar-t("f"), lam-b))
      val goal = eval-fact(eapp-t(elam-t("f", body), id-fn), snil-t(), tv("v"), tv("s"))
      val table = forward-search(goal, rules, ?external=ext, ?memo-key=mk)
      // Should have entries with >1 value (over-approximation)
      val multi = table.filter(fn(kv) kv.snd.length > 1)
      expect-that(fn(nn) nn >= 4) { multi.length }
