module examples/typed/type-infer-typed

// Type inference using DOMAIN TYPES via the forward bridge.
// Forward: syntax-directed rule selection
// Backward: unification as external relation

import koka-redex/forward-bridge

// ============================================================================
// Domain types
// ============================================================================

pub type expr
  XAny(pre: string, i: int)
  XAtom(nm: string)
  XVar(nm: expr)
  XApp(e1: expr, e2: expr)
  XLam(x: expr, body: expr)
  XInt(n: int)
  XIntAny(pre: string, i: int)

pub fun expr/to-term(e: expr): term
  match e
    XAny(p, i) -> TVar(p, i)
    XAtom(n) -> TAtom(n)
    XVar(n) -> TNode("var", [n.to-term])
    XApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    XLam(x, body) -> TNode("lam", [x.to-term, body.to-term])
    XInt(n) -> TNode("int", [TInt(n)])
    XIntAny(p, i) -> TNode("int", [TVar(p, i)])

pub type ty
  TAny(pre: string, i: int)
  TArrow(t1: ty, t2: ty)
  TBase(nm: string)

pub fun ty/to-term(t: ty): term
  match t
    TAny(p, i) -> TVar(p, i)
    TArrow(t1, t2) -> TNode("arrow", [t1.to-term, t2.to-term])
    TBase(n) -> TAtom(n)

pub type tenv
  TENil
  TEAny(pre: string, i: int)
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
// Metavariable helpers
// ============================================================================

fun xv(nm: string): expr
  XAny(nm, 0)

fun tv(nm: string): ty
  TAny(nm, 0)

fun ev(nm: string): tenv
  TEAny(nm, 0)

// ============================================================================
// Rules
// ============================================================================

fun type-relation()
  val x = xv("x")
  with relation-def
  with rule(
    axiom
    === "T-Int" ==>
    XIntAny("n", 0) \ ev("env") |- RInfer \ TBase("Int"))
  with rule(
    ev("env") \ x |- RLookup \ tv("t")
    === "T-Var" ==>
    XVar(x) \ ev("env") |- RInfer \ tv("t"))
  with rule(
    xv("e") \ TECons(x, tv("a"), ev("env")) |- RInfer \ tv("t")
    === "T-Lam" ==>
    XLam(x, xv("e")) \ ev("env") |- RInfer \ TArrow(tv("a"), tv("t")))
  single/rule(
    xv("e1") \ ev("env") |- RInfer \ tv("t1") \\
    xv("e2") \ ev("env") |- RInfer \ tv("t2") \\
    tv("t1") |- RUnify \ TArrow(tv("t2"), tv("a"))
    === "T-App" ==>
    XApp(xv("e1"), xv("e2")) \ ev("env") |- RInfer \ tv("a"))

// ============================================================================
// External solvers + memo-key
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

val ti/external = compose-externals([lookup-ext, unify-ext])

// ============================================================================
// Run
// ============================================================================

fun show-type(t: term): div string
  match t
    TAtom("Int") -> "Int"
    TNode("arrow", [a, b]) -> "(" ++ show-type(a) ++ " -> " ++ show-type(b) ++ ")"
    TVar(n, i) -> n ++ "_" ++ i.show
    _ -> t.show

fun run-infer(nm: string, program: expr)
  println("  " ++ nm ++ " : ")
  val goal = program \ TENil |- RInfer \ tv("result")
  val rel = type-relation()
  val table = forward-search(goal, rel)
  // Use derived keys for result lookup too
  val mk = keys-to-memo-key(rel.derive-keys)
  val goal-fact = chain/to-fact(goal)
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
