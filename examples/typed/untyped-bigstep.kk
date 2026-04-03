module examples/typed/untyped-bigstep

import koka-redex/term
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

type expr
  EAny(pre: string, i: int)
  EVar(name: string)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

fun format-var(name: string, index: int): string
  if index == 0 then name else name ++ "-" ++ index.show

// -----------------------------------------------------------------------------
// Markdown formatters
// -----------------------------------------------------------------------------

fun expr/show-md(e: expr): div string
  match e
    EAny(p, i) -> format-var(p, i)
    EVar(n) -> n
    EApp(e1, e2) -> e1.show-md ++ " " ++ e2.show-md
    ELam(x, body) -> "\\lambda " ++ x ++ ". " ++ body.show-md

// -----------------------------------------------------------------------------
// LaTeX formatters
// -----------------------------------------------------------------------------

fun format-latex-var(name: string, index: int): string
  val base = name
  if index == 0 then base else base ++ "_{" ++ index.show ++ "}"

fun expr/show-latex(e: expr): div string
  match e
    EAny(p, i) -> format-latex-var(p, i)
    EVar(n) -> n
    EApp(e1, e2) -> e1.show-latex ++ "\\; " ++ e2.show-latex
    ELam(x, body) -> "\\lambda " ++ x ++ ".\\; " ++ body.show-latex



// -----------------------------------------------------------------------------
// Relations
// -----------------------------------------------------------------------------

type r-eval
  REval
val r-eval/judgment-name : name<r-eval> = Name("eval")
val r-eval/name-md : name<r-eval> = Name("\\Downarrow")
val r-eval/name-latex : name<r-eval> = Name("\\Downarrow")

type rule-eval-lam
  RuleEvalLam
val rule-eval-lam/rule-name : name<rule-eval-lam> = Name("E-Lam")
type rule-eval-app
  RuleEvalApp
val rule-eval-app/rule-name : name<rule-eval-app> = Name("E-App")

type r-subst
  RSubst
val r-subst/judgment-name : name<r-subst> = Name("subst")
val r-subst/name-md : name<r-subst> = Name("\\mapsto")
val r-subst/name-latex : name<r-subst> = Name("\\mapsto")

type rule-subst-var-eq
  RuleSubstVarEq
val rule-subst-var-eq/rule-name : name<rule-subst-var-eq> = Name("S-Var-Eq")
type rule-subst-var-neq
  RuleSubstVarNeq
val rule-subst-var-neq/rule-name : name<rule-subst-var-neq> = Name("S-Var-Neq")
type rule-subst-app
  RuleSubstApp
val rule-subst-app/rule-name : name<rule-subst-app> = Name("S-App")
type rule-subst-lam-eq
  RuleSubstLamEq
val rule-subst-lam-eq/rule-name : name<rule-subst-lam-eq> = Name("S-Lam-Eq")
type rule-subst-lam-neq
  RuleSubstLamNeq
val rule-subst-lam-neq/rule-name : name<rule-subst-lam-neq> = Name("S-Lam-Neq")

type r-neq
  RNeq
val r-neq/judgment-name : name<r-neq> = Name("neq")
val r-neq/name-md : name<r-neq> = Name("\\neq")
val r-neq/name-latex : name<r-neq> = Name("\\neq")

// -----------------------------------------------------------------------------
// Effect Handlers (Fresh Generation)
// -----------------------------------------------------------------------------
fun with-fresh-expr(pref: string, action: (ev<fresh<expr>>) -> <div|e> b): <div|e> b
  with-fresh(pref, fn(p, c) EAny(p, c), action)

effect terms
  fun e(): expr
  fun v(): expr
  fun x(): string

// -----------------------------------------------------------------------------
// Main execution
// -----------------------------------------------------------------------------

// Judgements as Type Lists:
// e \Downarrow v
fun (~>)(expr-left: expr, expr-right: expr)
  expr-left |- REval \ expr-right

// e[x -> v] = result
fun subst(expr-in: expr, x-target: string, expr-val: expr, result: expr)
  expr-in \ x-target |- RSubst \ expr-val \ result

// t1 \neq t2
fun neq(t1: string, t2: string)
  t1 |- RNeq \ t2

fun eval-rules()
  val x-var = x();
  val (e1, e2, e3, e4) = fresh4(e)
  val e-body = e();
  val (v1, v2) = fresh2(v)

  with rule(
    axiom
    --- RuleEvalLam -->
    ELam(x-var, e-body) ~> ELam(x-var, e-body))
  rule(
    (e1 ~> ELam(x-var, e3)) \\
    (e2 ~> v1) \\
    subst(e3, x-var, v1, e4) \\
    (e4 ~> v2)
    --- RuleEvalApp -->
    EApp(e1, e2) ~> v2)

fun subst-rules()
  val (x-var, y-var) = fresh2(x)
  val (e0, w-var, e-body, e') = fresh4(e)
  val (e1, e1', e2, e2') = fresh4(e)
  with rule(
    axiom
    --- RuleSubstVarEq -->
    subst(EVar(x-var), x-var, w-var, w-var))
  with rule(
    neq(x-var, y-var)
    --- RuleSubstVarNeq -->
    subst(EVar(y-var), x-var, w-var, EVar(y-var)))
  with rule(
    subst(e1, x-var, w-var, e1') \\
    subst(e2, x-var, w-var, e2')
    --- RuleSubstApp -->
    subst(EApp(e1, e2), x-var, w-var, EApp(e1', e2')))
  with rule(
    axiom
    --- RuleSubstLamEq -->
    subst(ELam(x-var, e-body), x-var, w-var, ELam(x-var, e-body)))
  rule(
    neq(x-var, y-var) \\
    subst(e0, x-var, w-var, e')
    --- RuleSubstLamNeq -->
    subst(ELam(y-var, e0), x-var, w-var, ELam(y-var, e')))

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
