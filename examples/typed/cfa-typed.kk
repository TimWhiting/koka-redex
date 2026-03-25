module examples/typed/cfa-typed

// 0CFA with store-passing using DOMAIN TYPES via the forward bridge.

import koka-redex/forward-bridge

// ----------------------------------------------------------------------------
// Domain types — EAny/SAny for metavariables in rules
// ----------------------------------------------------------------------------

pub type expr
  EAny(pre: string, i: int)
  EAtom(nm: string)
  EVar(nm: expr)
  EApp(e1: expr, e2: expr)
  ELam(x: expr, body: expr)

pub type store
  SAny(pre: string, i: int)
  SNil
  SCons(nm: expr, vl: expr, rest: store)

pub fun expr/to-term(e: expr): term
  match e
    EAny(p, i) -> TVar(p, i)
    EAtom(n) -> TAtom(n)
    EVar(n) -> TNode("var", [n.to-term])
    EApp(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    ELam(x, body) -> TNode("lam", [x.to-term, body.to-term])

pub fun store/to-term(s: store): term
  match s
    SAny(p, i) -> TVar(p, i)
    SNil -> TNode("snil", [])
    SCons(n, v, rest) -> TNode("scons", [n.to-term, v.to-term, rest.to-term])

// ----------------------------------------------------------------------------
// Relation markers
// ----------------------------------------------------------------------------

pub type r-eval
  REval
pub fun r-eval/pred-name(_: r-eval): string
  "eval"

pub type r-lookup
  RLookup
pub fun r-lookup/pred-name(_: r-lookup): string
  "lookup"

// ----------------------------------------------------------------------------
// Metavariable helpers
// ----------------------------------------------------------------------------

fun ev(nm: string): expr
  EAny(nm, 0)

fun sv(nm: string): store
  SAny(nm, 0)

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------

fun cfa-relation()
  val x = ev("x")
  with relation-def
  with rule(
    axiom
    --- "E-Lam" -->
    ELam(x, ev("e")) \ sv("s") |- REval \ ELam(x, ev("e")) \ sv("s"))
  with external-rule(sv("s") \ ev("x") |- RLookup \ ev("v")) fn(TCons(s-val, x-val)) 
    store-lookup-all(s-val, x-val)
  with rule(
    sv("s") \ x |- RLookup \ ev("val")
    --- "E-Var" -->
    EVar(x) \ sv("s") |- REval \ ev("val") \ sv("s"))
  single/rule(
    ev("e1") \ sv("s0") |- REval \ ELam(x, ev("e3")) \ sv("s1") \\
    ev("e2") \ sv("s1") |- REval \ ev("v2") \ sv("s2") \\
    ev("e3") \ SCons(x, ev("v2"), sv("s2")) |- REval \ ev("v") \ sv("s3")
    --- "E-App" -->
    EApp(ev("e1"), ev("e2")) \ sv("s0") |- REval \ ev("v") \ sv("s3"))

// ----------------------------------------------------------------------------
// from-term (for typed external solver)
// ----------------------------------------------------------------------------

pub fun expr/from-term(t: term): exn expr
  match t
    TVar(p, i) -> EAny(p, i)
    TAtom(n) -> EAtom(n)
    TNode("var", [n]) -> EVar(n.from-term)
    TNode("app", [e1, e2]) -> EApp(e1.from-term, e2.from-term)
    TNode("lam", [x, body]) -> ELam(x.from-term, body.from-term)
    _ -> throw("cannot convert to expr: " ++ t.show)

pub fun store/from-term(t: term): exn store
  match t
    TVar(p, i) -> SAny(p, i)
    TNode("snil", []) -> SNil
    TNode("scons", [n, v, rest]) -> SCons(n.from-term, v.from-term, rest.from-term)
    _ -> throw("cannot convert to store: " ++ t.show)

// ----------------------------------------------------------------------------
// Typed external solver (domain-level!)
// ----------------------------------------------------------------------------

fun store-lookup-all(s: store, nm: expr): div list<expr>
  match s
    SCons(n, vl, rest) ->
      val found = if n.to-term.show == nm.to-term.show then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

// ----------------------------------------------------------------------------
// Run — memo-key auto-derived from relation structure
// ----------------------------------------------------------------------------

pub fun main()
  val rel = cfa-relation()

  println("--- (λx.x)(λz.z) ---")
  val id-fn = ELam(EAtom("x"), EVar(EAtom("x")))
  val goal1 = EApp(id-fn, ELam(EAtom("z"), EVar(EAtom("z")))) \ SNil |- REval \ ev("v") \ sv("s")
  val table1 = forward-search(goal1, rel)
  println("Entries: " ++ table1.length.show)

  println("\n--- let f = λx.x in (f λa.a)(f λb.b) ---")
  val lam-a = ELam(EAtom("a"), EVar(EAtom("a")))
  val lam-b = ELam(EAtom("b"), EVar(EAtom("b")))
  val body = EApp(EApp(EVar(EAtom("f")), lam-a), EApp(EVar(EAtom("f")), lam-b))
  val prog2 = EApp(ELam(EAtom("f"), body), id-fn)
  val goal2 = prog2 \ SNil |- REval \ ev("v") \ sv("s")
  val table2 = forward-search(goal2, rel)
  println("Entries: " ++ table2.length.show)

  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.map(fn(kv) "  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **").foreach(println)
