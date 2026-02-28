module examples/untyped-bigstep

import koka-redex/syntax
import koka-redex/markdown
import koka-redex/latex
import koka-redex/fresh
import std/core/undiv

// -----------------------------------------------------------------------------
// Untyped Lambda Calculus Syntax
// -----------------------------------------------------------------------------

pub type expr
  EVar(name: string, index: int = 0)
  EApp(e1: expr, e2: expr)
  ELam(x: string, body: expr)

pub type untyped-judgement
  JEval(e1: expr, e2: expr)
  JSubst(e1: expr, x: string, v: expr, result: expr)
  JNeq(x: string, y: string)

pub fun with-fresh-expr(pref: string, action: (ev<fresh<expr>>) -> <div|e> b): <div|e> b
  with-fresh(pref, fn(p, c) EVar(p, c), action)

pub effect terms
  fun e(): expr
  fun v(): expr
  fun x(): string

val r-eval = Relation("\\Downarrow")
val r-subst = Relation("subst")

// Judgement: e \Downarrow v
pub fun (~>)(e: expr, v: expr): <rule-builder<untyped-judgement>> ()
  emit-judgement(JRel(r-eval, JEval(e, v)))

// Judgement: e[x -> v] = result
pub fun subst(e: expr, x: string, v: expr, result: expr): <rule-builder<untyped-judgement>> ()
  emit-judgement(JRel(r-subst, JSubst(e, x, v, result)))

// Judgement: t1 \neq t2
pub fun neq(t1: string, t2: string): <rule-builder<untyped-judgement>> ()
  emit-judgement(JRel(Relation("\\neq"), JNeq(t1, t2)))


// -----------------------------------------------------------------------------
// Big-Step Evaluation Rules
// -----------------------------------------------------------------------------

pub fun bigstep-eval(): <relation-builder<untyped-judgement>,terms,div,exn|e> ()

  rule("E-Lam")
    val x-var = x(); val e-body = e()
    (---)()
    ELam(x-var, e-body) ~> ELam(x-var, e-body)

  rule("E-App")
    val x-var = x()
    val (e1, e2, e3, e4) = fresh4(e)
    val (v2, v3) = fresh2(v)

    e1 ~> ELam(x-var, e3)
    e2 ~> v2
    subst(e3, x-var, v2, e4)
    e4 ~> v3
    (---)()
    EApp(e1, e2) ~> v3

pub fun bigstep-subst(): <relation-builder<untyped-judgement>,terms,div,exn|e> ()

  rule("S-Var-Eq")
    val x-var = x()
    val w-var = e()
    (---)()
    subst(EVar(x-var), x-var, w-var, w-var)

  rule("S-Var-Neq")
    val (x-var, y-var) = fresh2(x)
    val w-var = e()
    neq(x-var, y-var)
    (---)()
    subst(EVar(y-var), x-var, w-var, EVar(y-var))

  rule("S-App")
    val x-var = x()
    val (w-var, e1, e2, e1', e2') = fresh5(e)
    subst(e1, x-var, w-var, e1')
    subst(e2, x-var, w-var, e2')
    (---)()
    subst(EApp(e1, e2), x-var, w-var, EApp(e1', e2'))

  rule("S-Lam-Eq")
    val x-var = x()
    val (w-var, e-body) = fresh2(e)
    (---)()
    subst(ELam(x-var, e-body), x-var, w-var, ELam(x-var, e-body))

  rule("S-Lam-Neq")
    val (x-var, y-var) = fresh2(x)
    val (w-var, e0, e') = fresh3(e)
    neq(x-var, y-var)
    subst(e0, x-var, w-var, e')
    (---)()
    subst(ELam(y-var, e0), x-var, w-var, ELam(y-var, e'))

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

pub fun format-var(name: string, index: int): string
  if index == 0 then name else name ++ "-" ++ index.show

pub fun expr-to-md(e: expr): div string
  match e
    EVar(n, i) -> format-var(n, i)
    EApp(e1, e2) -> expr-to-md(e1) ++ " " ++ expr-to-md(e2)
    ELam(x, body) -> "\\lambda " ++ x ++ ". " ++ expr-to-md(body)

pub fun show-markdown(j: untyped-judgement): div string
  match j
    JEval(e, v) -> expr-to-md(e) ++ " \\Downarrow " ++ expr-to-md(v)
    JSubst(e, x, v, result) -> expr-to-md(e) ++ "[" ++ x ++ " \\mapsto " ++ expr-to-md(v) ++ "] = " ++ expr-to-md(result)
    JNeq(x, y) -> x ++ " \\neq " ++ y


// LaTeX Formatting translates specific Unicodes like Γ to \Gamma

pub fun latex-subst(s: string): string
  s // No special substitution needed for basic variables here usually

pub fun format-latex-var(name: string, index: int): string
  val base = latex-subst(name)
  if index == 0 then base else base ++ "_{" ++ index.show ++ "}"

pub fun expr-to-latex(e: expr): div string
  match e
    EVar(n, i) -> format-latex-var(n, i)
    EApp(e1, e2) -> expr-to-latex(e1) ++ "\\; " ++ expr-to-latex(e2)
    ELam(x, body) -> "\\lambda " ++ latex-subst(x) ++ ".\\; " ++ expr-to-latex(body)

pub fun show-latex(j: untyped-judgement): div string
  match j
    JEval(e, v) -> expr-to-latex(e) ++ " \\Downarrow " ++ expr-to-latex(v)
    JSubst(e, x, v, result) -> expr-to-latex(e) ++ "[" ++ latex-subst(x) ++ " \\mapsto " ++ expr-to-latex(v) ++ "] = " ++ expr-to-latex(result)
    JNeq(x, y) -> latex-subst(x) ++ " \\neq " ++ latex-subst(y)

pub fun main()
  with e-fresh <- with-fresh-expr("e")
  with v-fresh <- with-fresh-expr("v")
  with x-fresh <- with-fresh("x", fn(p, c) if c == 0 then p else p ++ "-" ++ c.show)
  with handler  
    fun e() e-fresh.generate-fresh()
    fun v() v-fresh.generate-fresh()
    fun x() x-fresh.generate-fresh()

  val eval-def = relation-def(r-eval)
    bigstep-eval()
  val subst-def = relation-def(r-subst)
    bigstep-subst()
  
  println("--- Markdown Output ---")
  println(relation-to-md(eval-def))
  println(relation-to-md(subst-def))
  println("\n--- LaTeX Output ---")
  println(relation-to-latex(eval-def))
  println(relation-to-latex(subst-def))
