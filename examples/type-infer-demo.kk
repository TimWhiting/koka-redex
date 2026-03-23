module examples/type-infer-demo

// Type inference for simply-typed lambda calculus
// Demonstrates forward + backward reasoning in the same derivation:
//   Forward: syntax-directed rule selection, environment lookup
//   Backward: unification to solve type constraints in App rule
//
// Rules:
//   T-Int:  Γ ⊢ n : Int
//   T-Var:  lookup(Γ, x, τ)  ⊢  Γ ⊢ x : τ
//   T-Lam:  Γ[x:α] ⊢ e : τ  ⊢  Γ ⊢ λx.e : α → τ    (α fresh)
//   T-App:  Γ ⊢ e1 : τ1,  Γ ⊢ e2 : τ2,  unify(τ1, τ2 → α)  ⊢  Γ ⊢ e1 e2 : α

import koka-redex/proof-search
import koka-redex/forward

// ---------------------------------------------------------------------------
// Term constructors
// ---------------------------------------------------------------------------

// Expressions
fun evar(x: string): term
  TNode("var", [TAtom(x)])

fun elam(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp(e1: term, e2: term): term
  TNode("app", [e1, e2])

fun eint(n: int): term
  TNode("int", [TInt(n)])

// Types
fun tarrow(t1: term, t2: term): term
  TNode("arrow", [t1, t2])

fun tint(): term
  TAtom("Int")

// Type variable (fresh, using TVar)
fun tvar(name: string): term
  TVar(name, 0)

// Store (type environment)
fun snil(): term
  TNode("snil", [])

fun scons(name: term, typ: term, rest: term): term
  TNode("scons", [name, typ, rest])

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

fun infer(e: term, env: term, typ: term): fact
  Fact("infer", [e, env, typ])

fun lookup-fact(s: term, x: term, v: term): fact
  Fact("lookup", [s, x, v])

fun unify-fact(t1: term, t2: term): fact
  Fact("unify", [t1, t2])

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

fun v(name: string): term
  TVar(name, 0)

fun type-rules(): list<rule>
  [ // T-Int: integer literals have type Int
    Rule("T-Int", [],
      infer(TNode("int", [v("n")]), v("env"), tint())),

    // T-Var: variable lookup in type environment
    Rule("T-Var",
      [lookup-fact(v("env"), v("x"), v("τ"))],
      infer(TNode("var", [v("x")]), v("env"), v("τ"))),

    // T-Lam: lambda abstraction — α is fresh (from rule freshening)
    //   Γ[x:α] ⊢ e : τ  ⊢  Γ ⊢ λx.e : α → τ
    Rule("T-Lam",
      [infer(v("e"), scons(v("x"), v("α"), v("env")), v("τ"))],
      infer(TNode("lam", [v("x"), v("e")]), v("env"), tarrow(v("α"), v("τ")))),

    // T-App: application — unification provides backward reasoning
    //   Γ ⊢ e1 : τ1,  Γ ⊢ e2 : τ2,  unify(τ1, τ2 → α)  ⊢  Γ ⊢ e1 e2 : α
    Rule("T-App",
      [ infer(v("e1"), v("env"), v("τ1")),
        infer(v("e2"), v("env"), v("τ2")),
        unify-fact(v("τ1"), tarrow(v("τ2"), v("α"))) ],
      infer(TNode("app", [v("e1"), v("e2")]), v("env"), v("α")))
  ]

// ---------------------------------------------------------------------------
// External solvers: lookup + unification
// ---------------------------------------------------------------------------

fun store-lookup-all(store: term, nm: term): div list<term>
  match store
    TNode("scons", [n, vl, rest]) ->
      val found = if term/eq(n, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

// Unification on type terms — the "backward" part
fun unify-types(t1: term, t2: term, s: list<binding>): div maybe<list<binding>>
  val w1 = walk-type(t1, s)
  val w2 = walk-type(t2, s)
  match (w1, w2)
    (TVar(n1, i1), TVar(n2, i2)) ->
      if n1 == n2 && i1 == i2 then Just(s)
      else Just(Cons(Binding(n1, i1, w2), s))
    (TVar(n, i), t) -> Just(Cons(Binding(n, i, t), s))
    (t, TVar(n, i)) -> Just(Cons(Binding(n, i, t), s))
    (TAtom(a1), TAtom(a2)) -> if a1 == a2 then Just(s) else Nothing
    (TNode("arrow", [a1, b1]), TNode("arrow", [a2, b2])) ->
      match unify-types(a1, a2, s)
        Just(s1) -> unify-types(b1, b2, s1)
        Nothing -> Nothing
    _ -> Nothing

fun walk-type(t: term, s: list<binding>): div term
  match t
    TVar(nm, id) ->
      match s.find(fn(b) match b { Binding(n, i, _) -> n == nm && i == id })
        Just(Binding(_, _, vl)) -> walk-type(vl, s)
        Nothing -> t
    _ -> t

fun apply-type-subst(t: term, s: list<binding>): div term
  match walk-type(t, s)
    TVar(n, i) -> TVar(n, i)
    TAtom(a) -> TAtom(a)
    TNode(n, args) -> TNode(n, args.map(fn(a) apply-type-subst(a, s)))
    TInt(i) -> TInt(i)

fun external(goal: fact): div maybe<list<fact>>
  match goal
    Fact("lookup", [store, name, _]) ->
      val results = store-lookup-all(store, name)
      Just(results.map(fn(vl) Fact("lookup", [store, name, vl])))
    Fact("unify", [t1, t2]) ->
      // Backward reasoning: find a substitution that makes t1 = t2
      match unify-types(t1, t2, [])
        Just(s) ->
          val r1 = apply-type-subst(t1, s)
          val r2 = apply-type-subst(t2, s)
          Just([Fact("unify", [r1, r2])])
        Nothing -> Just([])  // unification failed — no solutions
    _ -> Nothing

// ---------------------------------------------------------------------------
// Memo key: only input positions (expr, env) — first 2 args of infer
// ---------------------------------------------------------------------------

fun infer-memo-key(f: fact): div string
  match f
    Fact("infer", args) -> Fact("infer", args.take(2)).show
    Fact(pred, args) -> Fact(pred, args).show  // other relations: full key

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

fun show-type(t: term): div string
  match t
    TAtom("Int") -> "Int"
    TNode("arrow", [a, b]) -> "(" ++ show-type(a) ++ " → " ++ show-type(b) ++ ")"
    TVar(n, i) -> n ++ "_" ++ i.show
    _ -> t.show

fun run-infer(name: string, program: term)
  println("\n=== " ++ name ++ " ===")
  val goal = infer(program, snil(), TVar("result", 0))
  val table = forward-search(goal, type-rules(), ?external=external, ?memo-key=infer-memo-key)
  // Find the top-level result
  val top-key = infer-memo-key(goal)
  table.foreach fn((key, results))
    if key == top-key then
      results.foreach fn(f)
        match f
          Fact(_, args) ->
            val typ = args[2].unjust
            println("  Type: " ++ show-type(typ))
  // Show full table for debugging
  println("  Memo table (" ++ table.length.show ++ " entries):")
  table.foreach fn((key, results))
    val types = results.map fn(f)
      match f
        Fact(_, args) -> show-type(args.last.unjust)
    println("    " ++ key ++ " => {" ++ types.list/joinsep/join(", ") ++ "}")

pub fun main()
  // 1. Integer literal: 42 : Int
  run-infer("42", eint(42))

  // 2. Identity: λx.x : α → α
  run-infer("λx.x", elam("x", evar("x")))

  // 3. Application: (λx.x) 42 : Int
  //    Forward: infer λx.x → α→α, infer 42 → Int
  //    Backward: unify(α→α, Int→β) → α=Int, β=Int
  run-infer("(λx.x) 42", eapp(elam("x", evar("x")), eint(42)))

  // 4. Nested: (λf.λx. f x) (λy.y) 42 : Int
  //    Forward: syntax-directed rule selection at each level
  //    Backward: two unification steps
  val inner = elam("f", elam("x", eapp(evar("f"), evar("x"))))
  run-infer("(λf.λx. f x)(λy.y) 42", eapp(eapp(inner, elam("y", evar("y"))), eint(42)))

  // 5. Constant function: (λx.λy.x) 42 (λz.z) : Int
  //    The type of y is unconstrained (stays as a variable)
  val const-fn = elam("x", elam("y", evar("x")))
  run-infer("(λx.λy.x) 42 (λz.z)", eapp(eapp(const-fn, eint(42)), elam("z", evar("z"))))
