module examples/stlc

import koka-redex/syntax
import koka-redex/markdown
import koka-redex/latex
import koka-redex/fresh
import std/core/undiv

// -----------------------------------------------------------------------------
// STLC Syntax
// -----------------------------------------------------------------------------

pub type typ
  TArrow(t1: typ, t2: typ)
  TBase(name: string, index: int = 0)

pub fun (=>)(t1: typ, t2: typ): typ { TArrow(t1, t2) }

pub type expr
  EVar(name: string, index: int = 0)
  EApp(e1: expr, e2: expr)
  ELam(x: string, t: typ, body: expr)
  ETrue
  EFalse

pub type env
  Empty
  Extend(env: env, x: string, t: typ)
  EnvVar(name: string, index: int = 0)

pub type stlc-judgement
  JTyping(g: env, e: expr, tp: typ)
  JInEnv(x: string, tp: typ, g: env)

pub fun with-fresh-env(pref: string, action: (ev<fresh<env>>) -> <div|e> b): <div|e> b
  with-fresh(pref, fn(p, c) EnvVar(p, c), action)

pub fun with-fresh-expr(pref: string, action: (ev<fresh<expr>>) -> <div|e> b): <div|e> b
  with-fresh(pref, fn(p, c) EVar(p, c), action)

pub fun with-fresh-typ(pref: string, action: (ev<fresh<typ>>) -> <div|e> b): <div|e> b
  with-fresh(pref, fn(p, c) TBase(p, c), action)

pub effect terms
  fun t(): typ
  fun e(): expr
  fun g(): env
  fun x(): string

val r-typing = Relation("\\vdash")
val r-in-env = Relation("\\in")

// Judgement: Gamma |- e : T
pub fun (|-) (gamma: env, e_t: (expr, typ)): <rule-builder<stlc-judgement>> ()
  emit-judgement(JRel(r-typing, JTyping(gamma, e_t.fst, e_t.snd)))

// Judgement: (x : T) in Gamma
pub fun in-env(x: string, tp: typ, gamma: env): <rule-builder<stlc-judgement>> ()
  emit-judgement(JRel(r-in-env, JInEnv(x, tp, gamma)))

// -----------------------------------------------------------------------------
// STLC Rules
// -----------------------------------------------------------------------------

pub fun stlc-typing(): <relation-builder<stlc-judgement>,terms,exn,div|e> ()
  val gamma = g()

  rule("T-Var")
    val x-var = x()
    val t-var = t()
    in-env(x-var, t-var, gamma)
    (---)()
    gamma |- (EVar(x-var), t-var)

  rule("T-App")
    val (t1, t2) = fresh2(t)
    val (e1, e2) = fresh2(e)
    gamma |- (e1, t1 => t2)
    gamma |- (e2, t1)
    (---)()
    gamma |- (EApp(e1, e2), t2)

  rule("T-Abs")
    val (t1, t2) = fresh2(t)
    val e0 = e()
    val x-var = x()
    Extend(gamma, x-var, t1) |- (e0, t2)
    (---)()
    gamma |- (ELam(x-var, t1, e0), t1 => t2)

  rule("T-True")
    (---)()
    gamma |- (ETrue, TBase("Bool"))

  rule("T-False")
    (---)()
    gamma |- (EFalse, TBase("Bool"))

pub fun stlc-env(): <relation-builder<stlc-judgement>,terms,exn,div|e> ()
  val gamma = g()

  rule("Env-Hit")
    val x-var = x()
    val t-var = t()
    (---)()
    in-env(x-var, t-var, Extend(gamma, x-var, t-var))

  rule("Env-Miss")
    val (x-var, y-var) = fresh2(x)
    val (t-var, t2-var) = fresh2(t)
    emit-judgement(JRel(Relation("\\neq"), JTyping(gamma, EVar(x-var), t-var))) // dummy for \neq
    in-env(x-var, t-var, gamma)
    (---)()
    in-env(x-var, t-var, Extend(gamma, y-var, t2-var))

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

pub fun format-var(name: string, index: int): string
  if index == 0 then name else name ++ "-" ++ index.show

pub fun typ-to-md(t: typ): string
  match t
    TArrow(t1, t2) -> typ-to-md(t1) ++ " \\to " ++ typ-to-md(t2)
    TBase(name, idx) -> format-var(name, idx)

pub fun expr-to-md(e: expr): div string
  match e
    EVar(n, i) -> format-var(n, i)
    EApp(e1, e2) -> expr-to-md(e1) ++ " " ++ expr-to-md(e2)
    ELam(x, t, body) -> "\\lambda " ++ x ++ " : " ++ typ-to-md(t) ++ ". " ++ expr-to-md(body)
    ETrue -> "true"
    EFalse -> "false"

pub fun env-to-md(g: env): string
  match g
    Empty -> "\\emptyset"
    Extend(g1, x, t) -> env-to-md(g1) ++ ", " ++ x ++ " : " ++ typ-to-md(t)
    EnvVar(n, i) -> format-var(n, i)

pub fun show-markdown(j: stlc-judgement): div string
  match j
    JTyping(g, e, tp) -> env-to-md(g) ++ " \\vdash " ++ expr-to-md(e) ++ " : " ++ typ-to-md(tp)
    JInEnv(x, tp, g) -> x ++ " : " ++ typ-to-md(tp) ++ " \\in " ++ env-to-md(g)


// LaTeX Formatting translates specific Unicodes like Γ to \Gamma

pub fun latex-subst(s: string): string
  if s == "Γ" then "\\Gamma"
  elif s == "Bool" then "\\mathsf{Bool}"
  else s

pub fun format-latex-var(name: string, index: int): string
  val base = latex-subst(name)
  if index == 0 then base else base ++ "_{" ++ index.show ++ "}"

pub fun typ-to-latex(t: typ): string
  match t
    TArrow(t1, t2) -> typ-to-latex(t1) ++ " \\to " ++ typ-to-latex(t2)
    TBase(name, idx) -> format-latex-var(name, idx)

pub fun expr-to-latex(e: expr): div string
  match e
    EVar(n, i) -> format-latex-var(n, i)
    EApp(e1, e2) -> expr-to-latex(e1) ++ "\\; " ++ expr-to-latex(e2)
    ELam(x, t, body) -> "\\lambda " ++ latex-subst(x) ++ " : " ++ typ-to-latex(t) ++ ".\\; " ++ expr-to-latex(body)
    ETrue -> "\\mathrm{true}"
    EFalse -> "\\mathrm{false}"

pub fun env-to-latex(g: env): string
  match g
    Empty -> "\\emptyset"
    Extend(g1, x, t) -> env-to-latex(g1) ++ ", " ++ latex-subst(x) ++ " : " ++ typ-to-latex(t)
    EnvVar(n, i) -> format-latex-var(n, i)

pub fun show-latex(j: stlc-judgement): div string
  match j
    JTyping(g, e, tp) -> env-to-latex(g) ++ " \\vdash " ++ expr-to-latex(e) ++ " : " ++ typ-to-latex(tp)
    JInEnv(x, tp, g) -> latex-subst(x) ++ " : " ++ typ-to-latex(tp) ++ " \\in " ++ env-to-latex(g)


pub fun main()
  with t-fresh <- with-fresh-typ("T")
  with e-fresh <- with-fresh-expr("e")
  with g-fresh <- with-fresh-env("Γ")
  with x-fresh <- with-fresh("x", fn(p, c) if c == 0 then p else p ++ "-" ++ c.show)

  with handler
    fun t() t-fresh.generate-fresh()
    fun e() e-fresh.generate-fresh()
    fun g() g-fresh.generate-fresh()
    fun x() x-fresh.generate-fresh()

  val typing-def = relation-def(r-typing)
    stlc-typing()
  val env-def = relation-def(r-in-env)
    stlc-env()
    
  println("--- Markdown Output ---")
  println(relation-to-md(typing-def, ?show-markdown = show-markdown))
  println(relation-to-md(env-def, ?show-markdown = show-markdown))
  println("\n--- LaTeX Output ---")
  println(relation-to-latex(typing-def, ?show-latex = show-latex))
  println(relation-to-latex(env-def, ?show-latex = show-latex))
