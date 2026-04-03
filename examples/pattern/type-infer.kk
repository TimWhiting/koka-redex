module examples/pattern/type-infer

// Type inference using pat<a> metavariables.
// Demonstrates forward + backward reasoning:
//   Forward: syntax-directed rule selection
//   Backward: unification as external relation

import koka-redex/forward-bridge
import koka-redex/derive
import koka-redex/pattern

// ----------------------------------------------------------------------------
// Clean domain types
// ----------------------------------------------------------------------------

type expr
  XAtom(nm: string)
  XVar(nm: expr)
  XApp(e1: expr, e2: expr)
  XLam(x: expr, body: expr)
  XInt(n: int)

type ty
  TArrow(t1: ty, t2: ty)
  TBase(nm: string)

type tenv
  TENil
  TECons(nm: expr, typ: ty, rest: tenv)

// ----------------------------------------------------------------------------
// Con-info descriptors
// ----------------------------------------------------------------------------

pub type atom-expr
pub val atom-expr/con-name: name<atom-expr> = Name("")
pub type var-expr
pub val var-expr/con-name: name<var-expr> = Name("var")
pub type app-expr
pub val app-expr/con-name: name<app-expr> = Name("app")
pub type lam-expr
pub val lam-expr/con-name: name<lam-expr> = Name("lam")
pub type int-expr
pub val int-expr/con-name: name<int-expr> = Name("int")

pub val atom-expr/con-info : con-info<atom-expr, string, expr> = Con-info(
  fn(e) match e { XAtom(n) -> Just(n); _ -> Nothing }, XAtom)
pub val var-expr/con-info : con-info<var-expr, t-cons<expr, t-nil>, expr> = Con-info(
  fn(e) match e { XVar(n) -> Just(n +: TNil); _ -> Nothing }, fn(TCons(n, _)) XVar(n))
pub val app-expr/con-info : con-info<app-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { XApp(a, b) -> Just(a +: b +: TNil); _ -> Nothing }, fn(TCons(a, TCons(b, _))) XApp(a, b))
pub val lam-expr/con-info : con-info<lam-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { XLam(x, body) -> Just(x +: body +: TNil); _ -> Nothing }, fn(TCons(x, TCons(body, _))) XLam(x, body))
pub val int-expr/con-info : con-info<int-expr, t-cons<int, t-nil>, expr> = Con-info(
  fn(e) match e { XInt(n) -> Just(n +: TNil); _ -> Nothing }, fn(TCons(n, _)) XInt(n))
val expr-info =
  mk-field(atom-expr/con-info) *: mk-field(var-expr/con-info) *: mk-field(app-expr/con-info) *: mk-field(lam-expr/con-info) *: mk-field(int-expr/con-info) *: TNil

pub type arrow-ty
pub val arrow-ty/con-name: name<arrow-ty> = Name("arrow")
pub type base-ty
pub val base-ty/con-name: name<base-ty> = Name("base")

pub val arrow-ty/con-info : con-info<arrow-ty, t-cons<ty, t-cons<ty, t-nil>>, ty> = Con-info(
  fn(t) match t { TArrow(t1, t2) -> Just(t1 +: t2 +: TNil); _ -> Nothing }, fn(TCons(t1, TCons(t2, _))) TArrow(t1, t2))
pub val base-ty/con-info : con-info<base-ty, string, ty> = Con-info(
  fn(t) match t { TBase(n) -> Just(n); _ -> Nothing }, TBase)
val ty-info =
  mk-field(arrow-ty/con-info) *: mk-field(base-ty/con-info) *: TNil

pub type tenil-tenv
pub val tenil-tenv/con-name: name<tenil-tenv> = Name("snil")
pub type tecons-tenv
pub val tecons-tenv/con-name: name<tecons-tenv> = Name("scons")

pub val tenil-tenv/con-info : con-info<tenil-tenv, t-nil, tenv> = Con-info(
  fn(e) match e { TENil -> Just(TNil); _ -> Nothing }, fn(_) TENil)
pub val tecons-tenv/con-info : con-info<tecons-tenv, t-cons<expr, t-cons<ty, t-cons<tenv, t-nil>>>, tenv> = Con-info(
  fn(e) match e { TECons(n, t, rest) -> Just(n +: t +: rest +: TNil); _ -> Nothing }, fn(TCons(n, TCons(t, TCons(rest, _)))) TECons(n, t, rest))
val tenv-info =
  mk-field(tenil-tenv/con-info) *: mk-field(tecons-tenv/con-info) *: TNil

// ----------------------------------------------------------------------------
// Derived to-term / from-term
// ----------------------------------------------------------------------------

pub fun expr/to-term(e: expr): div term
  val n/to-term = expr/to-term
  derive-to-term(e, expr-info)

pub fun ty/to-term(t: ty): div term
  val n/to-term = ty/to-term
  derive-to-term(t, ty-info)

pub fun tenv/to-term(e: tenv): div term
  val n/to-term = tenv/to-term
  derive-to-term(e, tenv-info)

pub fun expr/from-term(t: term): <exn,div> expr
  val n/from-term = expr/from-term
  derive-from-term(t, expr-info)

pub fun ty/from-term(t: term): <exn,div> ty
  val n/from-term = ty/from-term
  derive-from-term(t, ty-info)

pub fun tenv/from-term(t: term): <exn,div> tenv
  val n/from-term = tenv/from-term
  derive-from-term(t, tenv-info)

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
pub val r-infer/judgment-name: name<r-infer> = Name("infer")

pub type r-lookup
  RLookup
pub val r-lookup/judgment-name: name<r-lookup> = Name("lookup")

pub type r-unify
  RUnify
pub val r-unify/judgment-name: name<r-unify> = Name("unify-types")

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
  rule(
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
