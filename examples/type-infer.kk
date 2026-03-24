module examples/type-infer

// Type inference for simply-typed lambda calculus.
// Forward rule selection + backward unification as external relation.

import koka-redex/forward

// Term constructors
fun evar(x: string): term
  TNode("var", [TAtom(x)])

fun elam(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp(e1: term, e2: term): term
  TNode("app", [e1, e2])

fun eint(n: int): term
  TNode("int", [TInt(n)])

fun tarrow(t1: term, t2: term): term
  TNode("arrow", [t1, t2])

fun tint(): term
  TAtom("Int")

fun snil(): term
  TNode("snil", [])

fun scons(nm: term, typ: term, rest: term): term
  TNode("scons", [nm, typ, rest])

// Relations
fun infer(e: term, env: term, typ: term): fact
  Fact("infer", [e, env, typ])

fun v(nm: string): term
  TVar(nm, 0)

// Rules
fun type-rules(): list<rule>
  [ Rule("T-Int", [],
      infer(TNode("int", [v("n")]), v("env"), tint())),
    Rule("T-Var",
      [Fact("lookup", [v("env"), v("x"), v("t")])],
      infer(TNode("var", [v("x")]), v("env"), v("t"))),
    Rule("T-Lam",
      [infer(v("e"), scons(v("x"), v("a"), v("env")), v("t"))],
      infer(TNode("lam", [v("x"), v("e")]), v("env"), tarrow(v("a"), v("t")))),
    Rule("T-App",
      [ infer(v("e1"), v("env"), v("t1")),
        infer(v("e2"), v("env"), v("t2")),
        Fact("unify-types", [v("t1"), tarrow(v("t2"), v("a"))]) ],
      infer(TNode("app", [v("e1"), v("e2")]), v("env"), v("a")))
  ]

// External: lookup + unification
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
    Fact("unify-types", [t1, t2]) ->
      // Use the logic effect's unify directly
      unify(t1, t2)
      val r1 = resolve(t1)
      val r2 = resolve(t2)
      Just([Fact("unify-types", [r1, r2])])
    _ -> Nothing

fun infer-memo-key(f: fact): div string
  match f
    Fact("infer", args) -> Fact("infer", args.take(2)).show
    Fact(pred, args) -> Fact(pred, args).show

fun show-type(t: term): div string
  match t
    TAtom("Int") -> "Int"
    TNode("arrow", [a, b]) -> "(" ++ show-type(a) ++ " -> " ++ show-type(b) ++ ")"
    TVar(n, i) -> n ++ "_" ++ i.show
    _ -> t.show

fun run-infer(nm: string, program: term)
  println("  " ++ nm ++ " : ")
  val goal = infer(program, snil(), v("result"))
  val table = forward-search(goal, type-rules(), ?external=external, ?memo-key=infer-memo-key)
  val top-key = infer-memo-key(goal)
  table.foreach fn(kv)
    if kv.fst == top-key then
      kv.snd.foreach fn(f)
        match f
          Fact(_, args) ->
            val typ = args.last.default(TAtom("?"))
            println("    " ++ show-type(typ))

pub fun main()
  println("=== Type Inference ===")
  run-infer("42", eint(42))
  run-infer("\\x.x", elam("x", evar("x")))
  run-infer("(\\x.x) 42", eapp(elam("x", evar("x")), eint(42)))
  run-infer("(\\f.\\x.f x)(\\y.y) 42",
    eapp(eapp(elam("f", elam("x", eapp(evar("f"), evar("x")))),
              elam("y", evar("y"))),
         eint(42)))
