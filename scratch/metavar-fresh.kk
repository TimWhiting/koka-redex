module scratch/metavar-fresh

// Approach: fresh pattern variables as Koka vals
//
// val x = fresh-pat("x")  -- Koka variable x IS the metavar
// val e = fresh-pat("e")
//
// rule(TNil, "E-Lam", eval-j(lam-p(x, e), s, lam-p(x, e), s))
//
// Same val used twice = same metavar. No string matching.
// fresh effect manages unique IDs.

import koka-redex/forward-bridge

// ============================================================================
// pattern<a>: metavar or concrete term
// ============================================================================

pub type pattern<a>
  PatVar(nm: string, id: int)
  PatTerm(t: term)

pub fun pattern/to-term(p: pattern<a>): term
  match p
    PatVar(nm, id) -> TVar(nm, id)
    PatTerm(t) -> t

// ============================================================================
// Fresh pattern variable generation
// ============================================================================

pub effect pat-fresh
  fun fresh-id(): int

pub fun fresh-pat(nm: string): <pat-fresh> pattern<a>
  PatVar(nm, fresh-id())

pub fun with-fresh-pats(action: () -> <pat-fresh|e> a): e a
  var counter := 0
  with handler
    fun fresh-id()
      counter := counter + 1
      counter
  action()

// ============================================================================
// Lifting concrete values to pattern<a>
// ============================================================================

pub fun expr/to-pattern(e: expr): div pattern<expr>
  PatTerm(e.to-term)

pub fun store/to-pattern(s: store): div pattern<store>
  PatTerm(s.to-term)

pub fun ty/to-pattern(t: ty): div pattern<ty>
  PatTerm(t.to-term)

// ============================================================================
// Clean domain types — no metavar constructors
// ============================================================================

pub type expr
  EVar(nm: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)
  EInt(n: int)

pub fun expr/to-term(e: expr): div term
  match e
    EVar(n) -> TNode("var", [TAtom(n)])
    EApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    ELam(x, body) -> TNode("lam", [TAtom(x), body.to-term])
    EInt(n) -> TNode("int", [TInt(n)])

pub type store
  SNil
  SCons(nm: string, vl: expr, rest: store)

pub fun store/to-term(s: store): div term
  match s
    SNil -> TNode("snil", [])
    SCons(n, v, rest) -> TNode("scons", [TAtom(n), v.to-term, rest.to-term])

pub type ty
  TArrow(t1: ty, t2: ty)
  TBase(nm: string)

pub fun ty/to-term(t: ty): div term
  match t
    TArrow(t1, t2) -> TNode("arrow", [t1.to-term, t2.to-term])
    TBase(n) -> TAtom(n)

// ============================================================================
// Pattern constructors — take pattern<a> for each position
// ============================================================================

pub fun lam-p(x: pattern<string>, body: pattern<expr>): pattern<expr>
  PatTerm(TNode("lam", [x.to-term, body.to-term]))

pub fun var-p(x: pattern<string>): pattern<expr>
  PatTerm(TNode("var", [x.to-term]))

pub fun app-p(e1: pattern<expr>, e2: pattern<expr>): pattern<expr>
  PatTerm(TNode("app", [e1.to-term, e2.to-term]))

pub fun int-p(n: pattern<int>): pattern<expr>
  PatTerm(TNode("int", [n.to-term]))

pub fun snil-p(): pattern<store>
  PatTerm(TNode("snil", []))

pub fun scons-p(nm: pattern<string>, vl: pattern<expr>, rest: pattern<store>): pattern<store>
  PatTerm(TNode("scons", [nm.to-term, vl.to-term, rest.to-term]))

// Type environment cons (stores types, not expressions)
pub fun tenv-cons-p(nm: pattern<string>, t: pattern<ty>, rest: pattern<store>): pattern<store>
  PatTerm(TNode("scons", [nm.to-term, t.to-term, rest.to-term]))

pub fun arrow-p(t1: pattern<ty>, t2: pattern<ty>): pattern<ty>
  PatTerm(TNode("arrow", [t1.to-term, t2.to-term]))

pub fun base-p(nm: string): pattern<ty>
  PatTerm(TAtom(nm))

// ============================================================================
// Relation markers
// ============================================================================

pub type r-eval
  REval
pub fun r-eval/pred-name(_: r-eval): string
  "eval"

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

fun eval-j(e: pattern<expr>, s: pattern<store>, v: pattern<expr>, s2: pattern<store>)
  e \ s \ REval \ v \ s2

fun lookup-expr(env: pattern<store>, x: pattern<string>, v: pattern<expr>)
  env \ x \ RLookup \ v

fun lookup-ty(env: pattern<store>, x: pattern<string>, t: pattern<ty>)
  env \ x \ RLookup \ t

fun unify-j(t1: pattern<ty>, t2: pattern<ty>)
  t1 \ RUnify \ t2

fun infer-j(e: pattern<expr>, env: pattern<store>, t: pattern<ty>)
  e \ env \ RInfer \ t

pub type r-infer
  RInfer
pub fun r-infer/pred-name(_: r-infer): string
  "infer"

// ============================================================================
// RULES — using fresh pattern variables
// ============================================================================

fun cfa-rules()
  with-fresh-pats
    val x = fresh-pat("x")
    val e = fresh-pat("e")
    val e1 = fresh-pat("e1")
    val e2 = fresh-pat("e2")
    val e3 = fresh-pat("e3")
    val v1 = fresh-pat("v")
    val v2 = fresh-pat("v2")
    val s = fresh-pat("s")
    val s0 = fresh-pat("s0")
    val s1 = fresh-pat("s1")
    val s2 = fresh-pat("s2")
    val s3 = fresh-pat("s3")
    val vl = fresh-pat("val")

    with relation-def
    // E-Lam
    with rule(TNil, "E-Lam",
      eval-j(lam-p(x, e), s, lam-p(x, e), s))
    // E-Var
    with rule(
      lookup-expr(s, x, vl),
      "E-Var",
      eval-j(var-p(x), s, vl, s))
    // E-App
    single/rule(
      eval-j(e1, s0, lam-p(x, e3), s1) \
      eval-j(e2, s1, v1, s2) \
      eval-j(e3, scons-p(x, v1, s2), v2, s3),
      "E-App",
      eval-j(app-p(e1, e2), s0, v2, s3))

fun type-rules()
  with-fresh-pats
    val x = fresh-pat("x")
    val e = fresh-pat("e")
    val e1 = fresh-pat("e1")
    val e2 = fresh-pat("e2")
    val env = fresh-pat("env")
    val t = fresh-pat("t")
    val t1 = fresh-pat("t1")
    val t2 = fresh-pat("t2")
    val a = fresh-pat("a")
    val n = fresh-pat("n")

    with relation-def
    // T-Int
    with rule(TNil, "T-Int",
      infer-j(int-p(n), env, base-p("Int")))
    // T-Var
    with rule(
      lookup-ty(env, x, t),
      "T-Var",
      infer-j(var-p(x), env, t))
    // T-Lam
    with rule(
      infer-j(e, tenv-cons-p(x, a, env), t),
      "T-Lam",
      infer-j(lam-p(x, e), env, arrow-p(a, t)))
    // T-App
    single/rule(
      infer-j(e1, env, t1) \
      infer-j(e2, env, t2) \
      unify-j(t1, arrow-p(t2, a)),
      "T-App",
      infer-j(app-p(e1, e2), env, a))

// ============================================================================
// Test
// ============================================================================

pub fun main()
  println("=== CFA Rules ===")
  val cfa = cfa-rules()
  val cfa-engine-rules = relation/to-rules(cfa)
  cfa-engine-rules.foreach fn(r)
    println("  " ++ r.koka-redex/term/rule/name ++ ": " ++ r.premises.length.show ++ " premises")
    println("    conclusion: " ++ r.conclusion.show)

  println("\n=== Type Inference Rules ===")
  val ti = type-rules()
  val ti-engine-rules = relation/to-rules(ti)
  ti-engine-rules.foreach fn(r)
    println("  " ++ r.koka-redex/term/rule/name ++ ": " ++ r.premises.length.show ++ " premises")
    println("    conclusion: " ++ r.conclusion.show)
