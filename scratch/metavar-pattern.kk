module scratch/metavar-pattern

// Approach 10: pattern<a> with to-pattern implicit + fresh IDs
//
// Key ideas:
// - pattern<a> wraps either a metavar (TVar) or a concrete term
// - string/to-pattern makes strings into metavars (the common case in rules)
// - expr/to-pattern makes concrete domain values into patterns
// - Pattern constructors use ?to-pattern implicits on each arg
// - A fresh-name effect maps string names to unique IDs within a rule scope
//   (same "x" → same ID, different rules → different IDs via freshen)

import koka-redex/forward-bridge

// ============================================================================
// pattern<a>: the universal pattern type
// ============================================================================

pub type pattern<a>
  PatVar(nm: string, id: int)   // metavariable
  PatTerm(t: term)              // concrete term

pub fun pattern/to-term(p: pattern<a>): term
  match p
    PatVar(nm, id) -> TVar(nm, id)
    PatTerm(t) -> t

// ============================================================================
// to-pattern: implicit dispatch determines interpretation
// ============================================================================

// Strings become metavariables (the default in rules)
pub fun string/to-pattern(s: string): pattern<a>
  PatVar(s, 0)

// Integers become concrete int terms
pub fun int/to-pattern(n: int): pattern<a>
  PatTerm(TInt(n))

// pattern<a> is identity
pub fun pattern/to-pattern(p: pattern<a>): pattern<a>
  p

// ============================================================================
// Clean domain types — NO metavar constructors
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

// Concrete expr → pattern<expr>
pub fun expr/to-pattern(e: expr): div pattern<expr>
  PatTerm(e.to-term)

pub type store
  SNil
  SCons(nm: string, vl: expr, rest: store)

pub fun store/to-term(s: store): div term
  match s
    SNil -> TNode("snil", [])
    SCons(n, v, rest) -> TNode("scons", [TAtom(n), v.to-term, rest.to-term])

pub fun store/to-pattern(s: store): div pattern<store>
  PatTerm(s.to-term)

pub type ty
  TArrow(t1: ty, t2: ty)
  TBase(nm: string)

pub fun ty/to-term(t: ty): div term
  match t
    TArrow(t1, t2) -> TNode("arrow", [t1.to-term, t2.to-term])
    TBase(n) -> TAtom(n)

pub fun ty/to-pattern(t: ty): div pattern<ty>
  PatTerm(t.to-term)

// ============================================================================
// Pattern constructors — use ?to-pattern for each argument
// ============================================================================

// Each pattern constructor mirrors a domain constructor but accepts
// anything with to-pattern (strings → metavars, domain values → concrete)

pub fun lam-p(x: a, body: b, ?to-pattern: a -> pattern<string>, ?body/to-pattern: b -> div pattern<expr>): pattern<expr>
  PatTerm(TNode("lam", [x.to-pattern.to-term, body.body/to-pattern.to-term]))

pub fun var-p(x: a, ?to-pattern: a -> pattern<string>): pattern<expr>
  PatTerm(TNode("var", [x.to-pattern.to-term]))

pub fun app-p(e1: a, e2: b, ?to-pattern: a -> div pattern<expr>, ?e2/to-pattern: b -> div pattern<expr>): div pattern<expr>
  PatTerm(TNode("app", [e1.to-pattern.to-term, e2.e2/to-pattern.to-term]))

pub fun int-p(n: a, ?to-pattern: a -> pattern<int>): pattern<expr>
  PatTerm(TNode("int", [n.to-pattern.to-term]))

pub fun snil-p(): pattern<store>
  PatTerm(TNode("snil", []))

pub fun scons-p(nm: a, vl: b, rest: c,
  ?to-pattern: a -> pattern<string>,
  ?vl/to-pattern: b -> div pattern<expr>,
  ?rest/to-pattern: c -> div pattern<store>): div pattern<store>
  PatTerm(TNode("scons", [nm.to-pattern.to-term, vl.vl/to-pattern.to-term, rest.rest/to-pattern.to-term]))

pub fun arrow-p(t1: a, t2: b,
  ?to-pattern: a -> div pattern<ty>,
  ?t2/to-pattern: b -> div pattern<ty>): div pattern<ty>
  PatTerm(TNode("arrow", [t1.to-pattern.to-term, t2.t2/to-pattern.to-term]))

// ============================================================================
// Relation markers
// ============================================================================

pub type r-eval
  REval
pub fun r-eval/pred-name(_: r-eval): string
  "eval"

// ============================================================================
// Judgement constructor — fully polymorphic
// to-term on pattern<a> returns TVar or concrete term
// ============================================================================

fun eval-j(e: pattern<expr>, s: pattern<store>, v: pattern<expr>, s2: pattern<store>)
  e \ s \ REval \ v \ s2

// ============================================================================
// Test: rules using strings-as-metavars
// ============================================================================

pub fun main()
  // Test pattern constructors
  println("=== Pattern constructors ===")

  // lam-p with strings → metavars
  val p1 = lam-p("x", "e")
  println("lam-p(\"x\", \"e\") = " ++ p1.to-term.show)
  // Expected: lam(x_0, e_0)

  // lam-p with concrete body
  val p2 = lam-p("x", EVar("y"))
  println("lam-p(\"x\", EVar(y)) = " ++ p2.to-term.show)
  // Expected: lam(x_0, var(y))

  // var-p
  val p3 = var-p("x")
  println("var-p(\"x\") = " ++ p3.to-term.show)
  // Expected: var(x_0)

  // int-p with string → metavar (matches any int)
  val p4 = int-p("n")
  println("int-p(\"n\") = " ++ p4.to-term.show)
  // Expected: int(n_0)

  // int-p with concrete int
  val p5 = int-p(42)
  println("int-p(42) = " ++ p5.to-term.show)
  // Expected: int(42)

  // Rule-like usage:
  println("\n=== Rule patterns ===")
  // E-Lam: lam(x,e) ⇓ lam(x,e)
  val e-lam-concl = eval-j(lam-p("x", "e"), string/to-pattern("s"), lam-p("x", "e"), string/to-pattern("s"))
  println("E-Lam conclusion chain type-cons created: ok")
  val e-lam-fact = chain/to-fact(e-lam-concl)
  println("E-Lam as fact: " ++ e-lam-fact.show)
  // Expected: eval(lam(x_0,e_0), s_0, lam(x_0,e_0), s_0)

  // Concrete program: (λx.x)(λz.z)
  println("\n=== Concrete program ===")
  val prog = EApp(ELam("x", EVar("x")), ELam("z", EVar("z")))
  val goal = eval-j(expr/to-pattern(prog), store/to-pattern(SNil),
                     string/to-pattern("v"), string/to-pattern("s"))
  val goal-fact = chain/to-fact(goal)
  println("Goal: " ++ goal-fact.show)
