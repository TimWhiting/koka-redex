module examples/typed/type-infer-typed

// Type inference using DOMAIN TYPES via the forward bridge.
// Forward: syntax-directed rule selection
// Backward: unification as external relation

import koka-redex/forward-bridge

// ----------------------------------------------------------------------------
// Domain types
// ----------------------------------------------------------------------------

type expr
  XAny(pre: string, i: int)
  XAtom(nm: string)
  XVar(nm: expr)
  XApp(e1: expr, e2: expr)
  XLam(x: expr, body: expr)
  XInt(n: int)
  XIntAny(pre: string, i: int)

fun expr/to-term(e: expr): term
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

pub fun expr/from-term(t: term): exn expr
  match t
    TVar(p, i) -> XAny(p, i)
    TAtom(n) -> XAtom(n)
    TNode("var", [n]) -> XVar(n.from-term)
    TNode("app", [e1, e2]) -> XApp(e1.from-term, e2.from-term)
    TNode("lam", [x, body]) -> XLam(x.from-term, body.from-term)
    TNode("int", [TInt(n)]) -> XInt(n)
    TNode("int", [TVar(p, i)]) -> XIntAny(p, i)
    _ -> throw("expr/from-term: invalid term " ++ t.show)

pub fun ty/from-term(t: term): exn ty
  match t
    TVar(p, i) -> TAny(p, i)
    TNode("arrow", [t1, t2]) -> TArrow(t1.from-term, t2.from-term)
    TAtom(n) -> TBase(n)
    _ -> throw("ty/from-term: invalid term " ++ t.show)

pub fun tenv/from-term(t: term): exn tenv
  match t
    TVar(p, i) -> TEAny(p, i)
    TNode("snil", []) -> TENil
    TNode("scons", [n, typ, rest]) -> TECons(n.from-term, typ.from-term, rest.from-term)
    _ -> throw("tenv/from-term: invalid term " ++ t.show)

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

pub type r-infer
  RInfer
pub val r-infer/judgment-name: name<r-infer> = Name("infer")

pub type r-lookup
  RLookup
pub val r-lookup/judgment-name: name<r-lookup> = Name("lookup")

pub type r-unify
  RUnify
pub val r-unify/judgment-name: name<r-unify> = Name("unify-types")

// ----------------------------------------------------------------------------
// Metavariable helpers
// ----------------------------------------------------------------------------

fun xv(nm: string): expr
  XAny(nm, 0)

fun tv(nm: string): ty
  TAny(nm, 0)

fun ev(nm: string): tenv
  TEAny(nm, 0)

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// External solver helpers
// ----------------------------------------------------------------------------

fun store-lookup-all(s: tenv, nm: expr): div list<ty>
  match s
    TECons(n, t, rest) ->
      val found = if n.to-term.show == nm.to-term.show then [t] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

fun type-relation()
  val x = xv("x")
  with relation-def
  with rule(
    axiom
    --- "T-Int" -->
    XIntAny("n", 0) \ ev("env") |- RInfer \ TBase("Int"))
  with rule(
    ev("env") \ x |- RLookup \ tv("t")
    --- "T-Var" -->
    XVar(x) \ ev("env") |- RInfer \ tv("t"))
  with rule(
    xv("e") \ TECons(x, tv("a"), ev("env")) |- RInfer \ tv("t")
    --- "T-Lam" -->
    XLam(x, xv("e")) \ ev("env") |- RInfer \ TArrow(tv("a"), tv("t")))
  with cons/external-rule(ev("env") \ x |- RLookup \ tv("t")) fn(TCons(env-val: tenv, x-val: expr))
    store-lookup-all(env-val, x-val)
  with external-term-rule(tv("t1") \ tv("t2") |- RUnify \ TNil) fn([t1', t2'])
    unify(t1', t2')
    [Fact("unify-types", [resolve(t1'), resolve(t2')])]
  single/rule(
    xv("e1") \ ev("env") |- RInfer \ tv("t1") \\
    xv("e2") \ ev("env") |- RInfer \ tv("t2") \\
    tv("t1") \ tv("t2") |- RUnify \ TNil
    --- "T-App" -->
    XApp(xv("e1"), xv("e2")) \ ev("env") |- RInfer \ tv("a"))

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------

fun show-type(t: term): pure string
  match t
    TAtom("Int") -> "Int"
    TNode("arrow", [a, b]) -> "(" ++ show-type(a) ++ " -> " ++ show-type(b) ++ ")"
    TVar(n, i) -> n ++ "_" ++ i.show

fun run-infer(nm: string, program: expr)
  println("\n\n" ++ nm ++ " : ")
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
  println("--- Type Inference (typed rules) ---")
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
