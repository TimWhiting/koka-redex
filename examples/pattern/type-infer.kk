module examples/pattern/type-infer

// Type inference using pat<a> metavariables.
// Demonstrates forward + backward reasoning:
//   Forward: syntax-directed rule selection
//   Backward: unification as external relation

import koka-redex/forward-bridge
import koka-redex/pattern

// ----------------------------------------------------------------------------
// Clean domain types
// ----------------------------------------------------------------------------

pub type expr
  XAtom(nm: string)
  XVar(nm: expr)
  XApp(e1: expr, e2: expr)
  XLam(x: expr, body: expr)
  XInt(n: int)

pub type ty
  TArrow(t1: ty, t2: ty)
  TBase(nm: string)

pub type tenv
  TENil
  TECons(nm: expr, typ: ty, rest: tenv)

// to-term converters
pub fun expr/to-term(e: expr): term
  match e
    XAtom(n) -> TAtom(n)
    XVar(n) -> TNode("var", [n.to-term])
    XApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    XLam(x, body) -> TNode("lam", [x.to-term, body.to-term])
    XInt(n) -> TNode("int", [TInt(n)])

pub fun ty/to-term(t: ty): term
  match t
    TArrow(t1, t2) -> TNode("arrow", [t1.to-term, t2.to-term])
    TBase(n) -> TAtom(n)

pub fun tenv/to-term(e: tenv): term
  match e
    TENil -> TNode("snil", [])
    TECons(n, t, rest) -> TNode("scons", [n.to-term, t.to-term, rest.to-term])

// ----------------------------------------------------------------------------
// Pattern constructors
// ----------------------------------------------------------------------------

fun p-atom(nm: string): pat<expr>
  PatTerm(TAtom(nm))

fun p-var(nm: pat<expr>): pat<expr>
  PatTerm(TNode("var", [nm.to-term]))

fun p-app(e1: pat<expr>, e2: pat<expr>): pat<expr>
  PatTerm(TNode("app", [e1.to-term, e2.to-term]))

fun p-lam(x: pat<expr>, body: pat<expr>): pat<expr>
  PatTerm(TNode("lam", [x.to-term, body.to-term]))

fun p-int(p: pat<int>): pat<expr>
  PatTerm(TNode("int", [p.to-term]))

fun p-arrow(t1: pat<ty>, t2: pat<ty>): pat<ty>
  PatTerm(TNode("arrow", [t1.to-term, t2.to-term]))

fun p-base(nm: string): pat<ty>
  PatTerm(TAtom(nm))

fun p-tnil(): pat<tenv>
  PatTerm(TNode("snil", []))

fun p-tcons(nm: pat<expr>, typ: pat<ty>, rest: pat<tenv>): pat<tenv>
  PatTerm(TNode("scons", [nm.to-term, typ.to-term, rest.to-term]))

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

pub type r-infer
  RInfer
pub fun r-infer/judgment-name(_: r-infer): string
  "infer"

pub type r-lookup
  RLookup
pub fun r-lookup/judgment-name(_: r-lookup): string
  "lookup"

pub type r-unify
  RUnify
pub fun r-unify/judgment-name(_: r-unify): string
  "unify-types"

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

fun store-lookup-all(s: tenv, nm: expr): div list<ty>
  match s
    TECons(n, t, rest) ->
      val found = if n.to-term.show == nm.to-term.show then [t] else []
      found ++ store-lookup-all(rest, nm)
    TENil -> []

fun type-relation()
  with with-pats
  val x   : pat<expr> = fresh-pat("x")
  val e   : pat<expr> = fresh-pat("e")
  val e1  : pat<expr> = fresh-pat("e1")
  val e2  : pat<expr> = fresh-pat("e2")
  val n   : pat<int> = fresh-pat("n")
  val env : pat<tenv> = fresh-pat("env")
  val t   : pat<ty> = fresh-pat("t")
  val t1  : pat<ty> = fresh-pat("t1")
  val t2  : pat<ty> = fresh-pat("t2")
  val a   : pat<ty> = fresh-pat("a")

  with relation-def
  with rule(
    axiom
    --- "T-Int" -->
    p-int(n) \ env |- RInfer \ p-base("Int"))
  with rule(
    env \ x |- RLookup \ t
    --- "T-Var" -->
    p-var(x) \ env |- RInfer \ t)
  with rule(
    e \ p-tcons(x, a, env) |- RInfer \ t
    --- "T-Lam" -->
    p-lam(x, e) \ env |- RInfer \ p-arrow(a, t))
  with cons/external-rule(env \ x |- RLookup \ t) fn(TCons(env-val: tenv, x-val: expr))
    store-lookup-all(env-val, x-val)
  with external-term-rule(t1 \ t2 |- RUnify \ TNil) fn([t1', t2'])
    unify(t1', t2')
    [Fact("unify-types", [resolve(t1'), resolve(t2')])]
  single/rule(
    e1 \ env |- RInfer \ t1 \\
    e2 \ env |- RInfer \ t2 \\
    t1 \ p-arrow(t2, a) |- RUnify \ TNil
    --- "T-App" -->
    p-app(e1, e2) \ env |- RInfer \ a)

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------

fun show-type(t: term): div string
  match t
    TAtom("Int") -> "Int"
    TNode("arrow", [a, b]) -> "(" ++ show-type(a) ++ " -> " ++ show-type(b) ++ ")"
    TVar(n, i) -> n ++ "_" ++ i.show
    _ -> t.show

fun run-infer(nm: string, program: expr)
  println("  " ++ nm ++ " : ")
  with with-pats
  val goal = pat(program) \ pat(TENil) |- RInfer \ (fresh-pat("result") : pat<ty>)
  val rel = type-relation()
  val table = forward-search(goal, rel)
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
  println("--- Type Inference (pat<a>) ---")
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
