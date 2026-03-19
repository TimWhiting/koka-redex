module examples/untyped-bigstep

import koka-redex/syntax
import koka-redex/markdown
import koka-redex/latex
import koka-redex/fresh
import type-level/list
import type-level/structs
import std/core/undiv

// -----------------------------------------------------------------------------
// Untyped Lambda Calculus Syntax
// -----------------------------------------------------------------------------

pub type expr
  EAny(pre: string, i: int)
  EVar(name: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

pub fun format-var(name: string, index: int): string
  if index == 0 then name else name ++ "-" ++ index.show

// -----------------------------------------------------------------------------
// Markdown formatters
// -----------------------------------------------------------------------------

pub fun expr/show-md(e: expr): div string
  match e
    EAny(p, i) -> format-var(p, i)
    EVar(n) -> n
    EApp(e1, e2) -> e1.show-md ++ " " ++ e2.show-md
    ELam(x, body) -> "\\lambda " ++ x ++ ". " ++ body.show-md

// -----------------------------------------------------------------------------
// LaTeX formatters
// -----------------------------------------------------------------------------

pub fun latex-subst(s: string): string
  s // No special substitution needed for basic variables here usually

pub fun format-latex-var(name: string, index: int): string
  val base = latex-subst(name)
  if index == 0 then base else base ++ "_{" ++ index.show ++ "}"

pub fun expr/show-latex-j(e: expr): div string
  match e
    EAny(p, i) -> format-latex-var(p, i)
    EVar(n) -> n
    EApp(e1, e2) -> e1.show-latex-j ++ "\\; " ++ e2.show-latex-j
    ELam(x, body) -> "\\lambda " ++ latex-subst(x) ++ ".\\; " ++ body.show-latex-j

// String formatters for AST embedding
pub fun string/show-md(s: string): string { s }
pub fun string/show-latex-j(s: string): string { latex-subst(s) }


// -----------------------------------------------------------------------------
// Relations
// -----------------------------------------------------------------------------

pub type r-eval
  REval
pub type rule-eval-lam
  RuleEvalLam
pub fun rule-eval-lam/show(rule-eval-lam: rule-eval-lam): string
  "RuleEvalLam"
pub type rule-eval-app
  RuleEvalApp
pub fun rule-eval-app/show(rule-eval-app: rule-eval-app): string
  "RuleEvalApp"

pub type r-subst
  RSubst
pub type rule-subst-var-eq
  RuleSubstVarEq
pub fun rule-subst-var-eq/show(rule-subst-var-eq: rule-subst-var-eq): string
  "RuleSubstVarEq"
pub type rule-subst-var-neq
  RuleSubstVarNeq
pub fun rule-subst-var-neq/show(rule-subst-var-neq: rule-subst-var-neq): string
  "RuleSubstVarNeq"
pub type rule-subst-app
  RuleSubstApp
pub fun rule-subst-app/show(rule-subst-app: rule-subst-app): string
  "RuleSubstApp"
pub type rule-subst-lam-eq
  RuleSubstLamEq
pub fun rule-subst-lam-eq/show(rule-subst-lam-eq: rule-subst-lam-eq): string
  "RuleSubstLamEq"
pub type rule-subst-lam-neq
  RuleSubstLamNeq
pub fun rule-subst-lam-neq/show(rule-subst-lam-neq: rule-subst-lam-neq): string
  "RuleSubstLamNeq"
pub type r-neq
  RNeq

pub fun default/show-md(a: a, ?show: a -> string): string
  show(a)
pub fun default/show-latex-j(a: a, ?show: a -> string): string
  show(a)

// Formatting relations
pub fun r-eval/show-md(r: r-eval): string
  "\\Downarrow"
pub fun r-eval/show-latex-j(r: r-eval): string
  "\\Downarrow"

pub fun r-subst/show-md(r: r-subst): string
  "\\mapsto"
pub fun r-subst/show-latex-j(r: r-subst): string
  "\\mapsto"

pub fun r-neq/show-md(r: r-neq): string
  "\\neq"
pub fun r-neq/show-latex-j(r: r-neq): string
  "\\neq"

// -----------------------------------------------------------------------------
// Effect Handlers (Fresh Generation)
// -----------------------------------------------------------------------------
pub fun with-fresh-expr(pref: string, action: (ev<fresh<expr>>) -> <div|e> b): <div|e> b
  with-fresh(pref, fn(p, c) EAny(p, c), action)

pub effect terms
  fun e(): expr
  fun v(): expr
  fun x(): string

// -----------------------------------------------------------------------------
// Main execution
// -----------------------------------------------------------------------------

// Judgements as Type Lists:
// e \Downarrow v
fun (~>)(expr-left: expr, expr-right: expr)
  expr-left \ REval \ expr-right

// e[x -> v] = result
fun subst(expr-in: expr, x-target: string, expr-val: expr, result: expr)
  expr-in \ x-target \ RSubst \ expr-val \ result

// t1 \neq t2
fun neq(t1: string, t2: string)
  t1 \ RNeq \ t2

fun eval-rules()
  val x-var = x();
  val (e1, e2, e3, e4) = fresh4(e)
  val e-body = e();
  val (v1, v2) = fresh2(v)

  with rule(
    TNil, 
    // ---------------
    RuleEvalLam, 
    ELam(x-var, e-body) ~> ELam(x-var, e-body))
  rule(
    (e1 ~> ELam(x-var, e3)) \
    (e2 ~> v1) \
    subst(e3, x-var, v1, e4) \
    (e4 ~> v2),
    // --------------
    RuleEvalApp,
    EApp(e1, e2) ~> v2
  )

pub fun subst-rules()
  val (x-var, y-var) = fresh2(x)
  val (e0, w-var, e-body, e') = fresh4(e)
  val (e1, e1', e2, e2') = fresh4(e)
  with rule(TNil, RuleSubstVarEq, subst(EVar(x-var), x-var, w-var, w-var))
  with rule(neq(x-var, y-var), RuleSubstVarNeq, subst(EVar(y-var), x-var, w-var, EVar(y-var)))
  with rule(
    subst(e1, x-var, w-var, e1') \
    subst(e2, x-var, w-var, e2'),
    // ---------------
    RuleSubstApp,
    subst(EApp(e1, e2), x-var, w-var, EApp(e1', e2'))
  )
  with rule(TNil, RuleSubstLamEq, subst(ELam(x-var, e-body), x-var, w-var, ELam(x-var, e-body)))
  rule(
    neq(x-var, y-var) \
    subst(e0, x-var, w-var, e'),
    // ---------------
    RuleSubstLamNeq,
    subst(ELam(y-var, e0), x-var, w-var, ELam(y-var, e'))
  )

pub fun main()
  with e-fresh <- with-fresh-expr("e")
  with v-fresh <- with-fresh-expr("v")
  with x-fresh <- with-fresh("x", fn(p, c) if c == 0 then p else p ++ c.show)
  with handler  
    fun e() e-fresh.generate-fresh()
    fun v() v-fresh.generate-fresh()
    fun x() x-fresh.generate-fresh()

  val eval-relation = relation-def(eval-rules())
  val subst-relation = relation-def(subst-rules())
  
  println("--- Markdown Output ---")
  println(eval-relation.relation-to-md("\\Downarrow"))
  println(subst-relation.relation-to-md("subst"))
  println("\n--- LaTeX Output ---")
  println(eval-relation.relation-to-latex)
  println(subst-relation.relation-to-latex)
