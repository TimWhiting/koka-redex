module examples/term/cfa-store

// 0CFA with store-passing using the forward engine + logic effect.
// Demonstrates over-approximation via shared variable bindings.

import koka-redex/forward

// Term constructors
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

// Relations
fun eval-fact(e: term, s-in: term, v: term, s-out: term): fact
  Fact("eval", [e, s-in, v, s-out])

fun v(name: string): term
  TVar(name, 0)

// Rules
fun cfa-rules(): list<rule>
  [ Rule("E-Lam", [],
      [eval-fact(TNode("lam", [v("x"), v("e")]), v("s"), TNode("lam", [v("x"), v("e")]), v("s"))]),
    Rule("E-Var",
      [Fact("lookup", [v("s"), v("x"), v("val")])],
      [eval-fact(TNode("var", [v("x")]), v("s"), v("val"), v("s"))]),
    Rule("E-App",
      [ eval-fact(v("e1"), v("s0"), TNode("lam", [v("x"), v("e3")]), v("s1")),
        eval-fact(v("e2"), v("s1"), v("v2"), v("s2")),
        eval-fact(v("e3"), scons(v("x"), v("v2"), v("s2")), v("v"), v("s3")) ],
      [eval-fact(eapp(v("e1"), v("e2")), v("s0"), v("v"), v("s3"))])
  ]

// External: store lookup returning all bindings
fun store-lookup-all(store: term, nm: term): div list<term>
  match store
    TNode("scons", [n, vl, rest]) ->
      val found = if term/eq(n, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

fun external(goal: fact): <logic,div> maybe<list<fact>>
  match goal
    Fact("lookup", [store, nm, _]) ->
      val results = store-lookup-all(store, nm)
      Just(results.map(fn(vl) Fact("lookup", [store, nm, vl])))
    _ -> Nothing

// Memo key: only input positions (expr, store_in)
fun eval-memo-key(f: fact): div string
  match f
    Fact(pred, args) -> Fact(pred, args.take(2)).show

fun show-eval-results(table: list<(string, list<fact>)>)
  val keys = table.map(fst)
  val counts = table.map(fn(kv) kv.snd.length)
  keys.zip(counts).foreach fn(p)
    if p.snd > 0 then
      println("  " ++ p.fst ++ " [" ++ p.snd.show ++ "]")

pub fun main()
  val rules = cfa-rules()

  println("--- (λx.x)(λz.z) ---")
  val id-fn = elam("x", evar("x"))
  val goal1 = eval-fact(eapp(id-fn, elam("z", evar("z"))), snil(), v("v"), v("s"))
  show-eval-results(forward-search(goal1, rules, ?external=external, ?memo-key=eval-memo-key))

  println("\n--- let f = λx.x in (f λa.a)(f λb.b) ---")
  val lam-a = elam("a", evar("a"))
  val lam-b = elam("b", evar("b"))
  val body = eapp(eapp(evar("f"), lam-a), eapp(evar("f"), lam-b))
  val goal2 = eval-fact(eapp(elam("f", body), id-fn), snil(), v("v"), v("s"))
  val table2 = forward-search(goal2, rules, ?external=external, ?memo-key=eval-memo-key)
  show-eval-results(table2)

  println("\nOver-approximation:")
  table2.foreach fn(kv)
    if kv.snd.length > 1 then
      println("  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **")
