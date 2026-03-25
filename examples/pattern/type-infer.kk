module examples/pattern/type-infer

// Type inference using pattern<a> metavariables.
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

fun p-atom(nm: string): pattern<expr>
  PatTerm(TAtom(nm))

fun p-var(nm: pattern<expr>): pattern<expr>
  PatTerm(TNode("var", [nm.to-term]))

fun p-app(e1: pattern<expr>, e2: pattern<expr>): pattern<expr>
  PatTerm(TNode("app", [e1.to-term, e2.to-term]))

fun p-lam(x: pattern<expr>, body: pattern<expr>): pattern<expr>
  PatTerm(TNode("lam", [x.to-term, body.to-term]))

fun p-int(p: pattern<int>): pattern<expr>
  PatTerm(TNode("int", [p.to-term]))

fun p-arrow(t1: pattern<ty>, t2: pattern<ty>): pattern<ty>
  PatTerm(TNode("arrow", [t1.to-term, t2.to-term]))

fun p-base(nm: string): pattern<ty>
  PatTerm(TAtom(nm))

fun p-tnil(): pattern<tenv>
  PatTerm(TNode("snil", []))

fun p-tcons(nm: pattern<expr>, typ: pattern<ty>, rest: pattern<tenv>): pattern<tenv>
  PatTerm(TNode("scons", [nm.to-term, typ.to-term, rest.to-term]))

// Lift concrete values
fun pe(e: expr): pattern<expr>
  PatTerm(e.to-term)

fun pt(t: ty): pattern<ty>
  PatTerm(t.to-term)

fun penv(e: tenv): pattern<tenv>
  PatTerm(e.to-term)

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

fun type-relation()
  with with-pats
  val x   : pattern<expr> = fresh-pat("x")
  val e   : pattern<expr> = fresh-pat("e")
  val e1  : pattern<expr> = fresh-pat("e1")
  val e2  : pattern<expr> = fresh-pat("e2")
  val n   : pattern<int> = fresh-pat("n")
  val env : pattern<tenv> = fresh-pat("env")
  val t   : pattern<ty> = fresh-pat("t")
  val t1  : pattern<ty> = fresh-pat("t1")
  val t2  : pattern<ty> = fresh-pat("t2")
  val a   : pattern<ty> = fresh-pat("a")

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
  single/rule(
    e1 \ env |- RInfer \ t1 \\
    e2 \ env |- RInfer \ t2 \\
    t1 |- RUnify \ p-arrow(t2, a)
    --- "T-App" -->
    p-app(e1, e2) \ env |- RInfer \ a)

// ----------------------------------------------------------------------------
// External solvers
// ----------------------------------------------------------------------------

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
  val goal = pe(program) \ penv(TENil) |- RInfer \ (fresh-pat("result") : pattern<ty>)
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
  println("--- Type Inference (pattern<a>) ---")
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
