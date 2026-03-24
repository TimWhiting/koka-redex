module examples/implicit/type-infer-typed

// Type inference using DOMAIN TYPES via the forward bridge.
// Demonstrates forward + backward reasoning:
//   Forward: syntax-directed rule selection (T-Int, T-Var, T-Lam, T-App)
//   Backward: unification as external relation (T-App's unify premise)

import koka-redex/forward-bridge

// ============================================================================
// Domain types
// ============================================================================

// Expressions
pub type expr
  XAny(pre: string, i: int)  // metavariable (matches anything)
  XAtom(nm: string)           // literal name
  XVar(nm: expr)
  XApp(e1: expr, e2: expr)
  XLam(x: expr, body: expr)
  XInt(n: int)
  XIntAny(pre: string, i: int)  // metavariable matching any int node

pub fun expr/to-term(e: expr): term
  match e
    XAny(p, i) -> TVar(p, i)
    XAtom(n) -> TAtom(n)
    XVar(n) -> TNode("var", [n.to-term])
    XApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    XLam(x, body) -> TNode("lam", [x.to-term, body.to-term])
    XInt(n) -> TNode("int", [TInt(n)])
    XIntAny(p, i) -> TNode("int", [TVar(p, i)])

// Types
pub type ty
  TAny(pre: string, i: int)  // metavariable (type variable)
  TArrow(t1: ty, t2: ty)
  TBase(nm: string)           // base type like "Int"

pub fun ty/to-term(t: ty): term
  match t
    TAny(p, i) -> TVar(p, i)
    TArrow(t1, t2) -> TNode("arrow", [t1.to-term, t2.to-term])
    TBase(n) -> TAtom(n)

// Type environments
pub type tenv
  TENil
  TEAny(pre: string, i: int)  // metavariable
  TECons(nm: expr, typ: ty, rest: tenv)

pub fun tenv/to-term(e: tenv): term
  match e
    TENil -> TNode("snil", [])
    TEAny(p, i) -> TVar(p, i)
    TECons(n, t, rest) -> TNode("scons", [n.to-term, t.to-term, rest.to-term])

// ============================================================================
// Relation markers
// ============================================================================

pub type r-infer
  RInfer
pub fun r-infer/pred-name(_: r-infer): string
  "infer"

pub type r-lookup
  RLookup
pub fun r-lookup/pred-name(_: r-lookup): string
  "lookup"

pub type r-unify
  RUnify
pub fun r-unify/pred-name(_: r-unify): string
  "unify-types"

// ============================================================================
// Judgement constructors
// ============================================================================

// infer(expr, env) => ty
// Written as: expr \ env \ RInfer \ ty
fun infer-j(e: expr, env: tenv, t: ty)
  e \ env \ RInfer \ t

// lookup(env, name) => ty
fun lookup-j(env: tenv, x: expr, t: ty)
  env \ x \ RLookup \ t

// unify-types(ty, ty) — both are "inputs" to constraint solving
// But the marker pattern puts them as input \ RUnify \ input
// For unification, both sides are inputs and the "output" is the resolved type
// We represent as: ty \ RUnify \ ty
fun unify-j(t1: ty, t2: ty)
  t1 \ RUnify \ t2

// ============================================================================
// Metavariable helpers
// ============================================================================

fun xv(nm: string): expr
  XAny(nm, 0)

fun tv(nm: string): ty
  TAny(nm, 0)

fun ev(nm: string): tenv
  TEAny(nm, 0)

// ============================================================================
// Rules — in domain types
// ============================================================================

// Note on T-Int: XInt(n) has a specific n, but the rule needs to match
// ANY integer. We use XAny("int-expr", 0) as a broad metavariable.
// A better solution would be to add an XIntAny metavar constructor.

fun type-relation()
  val x = xv("x")
  with relation-def
  // T-Int: any int expression has type Int
  with rule(TNil, "T-Int",
    infer-j(XIntAny("n", 0), ev("env"), TBase("Int")))

  // T-Var: variable lookup
  with rule(
    lookup-j(ev("env"), x, tv("t")),
    "T-Var",
    infer-j(XVar(x), ev("env"), tv("t")))

  // T-Lam: lambda abstraction — TAny("a") is a fresh type variable
  with rule(
    infer-j(xv("e"), TECons(x, tv("a"), ev("env")), tv("t")),
    "T-Lam",
    infer-j(XLam(x, xv("e")), ev("env"), TArrow(tv("a"), tv("t"))))

  // T-App: application with unification
  single/rule(
    infer-j(xv("e1"), ev("env"), tv("t1")) \
    infer-j(xv("e2"), ev("env"), tv("t2")) \
    unify-j(tv("t1"), TArrow(tv("t2"), tv("a"))),
    "T-App",
    infer-j(XApp(xv("e1"), xv("e2")), ev("env"), tv("a")))

// ============================================================================
// External solvers
// ============================================================================

fun store-lookup-all(s: term, nm: term): div list<term>
  match s
    TNode("scons", [n, vl, rest]) ->
      val found = if term/eq(n, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

val lookup-ext = make-external("lookup") fn(args)
  match args
    Cons(store, Cons(nm, _)) ->
      store-lookup-all(store, nm).map(fn(vl) [store, nm, vl])
    _ -> []

val unify-ext = ("unify-types", fn(goal: fact): <logic,div> maybe<list<fact>>
  match goal
    Fact("unify-types", [t1, t2]) ->
      unify(t1, t2)
      Just([Fact("unify-types", [resolve(t1), resolve(t2)])])
    _ -> Nothing
)

fun ti-memo-key(): div ((fact) -> div string)
  compose-memo-keys([
    ("infer", make-memo-key("infer", 2)),
    ("lookup", make-memo-key("lookup", 2)),
    ("unify-types", make-memo-key("unify-types", 2))
  ])

fun ti-ext()
  compose-externals([lookup-ext, unify-ext])

// ============================================================================
// Pretty-print types from term representation
// ============================================================================

fun show-type(t: term): div string
  match t
    TAtom("Int") -> "Int"
    TNode("arrow", [a, b]) -> "(" ++ show-type(a) ++ " -> " ++ show-type(b) ++ ")"
    TVar(n, i) -> n ++ "_" ++ i.show
    _ -> t.show

// ============================================================================
// Run
// ============================================================================

fun run-infer(nm: string, program: expr)
  println("  " ++ nm ++ " : ")
  val goal = infer-j(program, TENil, tv("result"))
  val goal-fact = chain/to-fact(goal)
  val mk = ti-memo-key()
  val ext = ti-ext()
  val table = koka-redex/forward/forward-search(goal-fact,
    relation/to-rules(type-relation()),
    ?external=ext, ?memo-key=mk)
  val top-key = mk(goal-fact)
  table.foreach fn(kv)
    if kv.fst == top-key then
      kv.snd.foreach fn(f)
        match f
          Fact(_, args) ->
            val typ = args.last.default(TAtom("?"))
            println("    " ++ show-type(typ))

pub fun main()
  println("=== Type Inference (typed rules) ===")
  // Use XAtom for concrete names in programs
  fun va(n: string): expr
    XVar(XAtom(n))
  fun la(x: string, body: expr): expr
    XLam(XAtom(x), body)
  fun ap(e1: expr, e2: expr): expr
    XApp(e1, e2)

  run-infer("42", XInt(42))
  run-infer("\\x.x", la("x", va("x")))
  run-infer("(\\x.x) 42", ap(la("x", va("x")), XInt(42)))
  run-infer("(\\f.\\x.f x)(\\y.y) 42",
    ap(ap(la("f", la("x", ap(va("f"), va("x")))),
          la("y", va("y"))),
       XInt(42)))
