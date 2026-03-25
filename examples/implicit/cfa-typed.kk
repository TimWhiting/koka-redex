module examples/implicit/cfa-typed

// 0CFA with store-passing using DOMAIN TYPES via the forward bridge.
// Rules are written over expr/store types. The bridge converts to fact/term.

import koka-redex/forward-bridge

// ============================================================================
// Domain types — note EAny/SAny for metavariables in rules
// ============================================================================

// Domain types. EAny/SAny are metavariables (for use in rules).
// Name positions (EVar, ELam, SCons) take `expr` so metavariables work there.
pub type expr
  EAny(pre: string, i: int)  // metavariable → TVar
  EAtom(nm: string)           // literal name → TAtom
  EVar(nm: expr)              // var(name)
  EApp(e1: expr, e2: expr)
  ELam(x: expr, body: expr)   // lam(name, body)

pub type store
  SAny(pre: string, i: int)  // metavariable → TVar
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

// ============================================================================
// Metavariable helpers
// ============================================================================

fun ev(nm: string): expr
  EAny(nm, 0)

fun sv(nm: string): store
  SAny(nm, 0)

// ============================================================================
// Rules — ENTIRELY in domain types
// ============================================================================

fun cfa-relation()
  val x = ev("x")
  with relation-def
  with rule(
    TNil
    === "E-Lam" ==>
    ELam(x, ev("e")) \ sv("s") |- REval \ ELam(x, ev("e")) \ sv("s"))
  with rule(
    sv("s") \ x |- RLookup \ ev("val")
    === "E-Var" ==>
    EVar(x) \ sv("s") |- REval \ ev("val") \ sv("s"))
  single/rule(
    ev("e1") \ sv("s0") |- REval \ ELam(x, ev("e3")) \ sv("s1") \\
    ev("e2") \ sv("s1") |- REval \ ev("v2") \ sv("s2") \\
    ev("e3") \ SCons(x, ev("v2"), sv("s2")) |- REval \ ev("v") \ sv("s3")
    === "E-App" ==>
    EApp(ev("e1"), ev("e2")) \ sv("s0") |- REval \ ev("v") \ sv("s3"))

// ============================================================================
// External solver + policy (still at term level for now)
// ============================================================================

fun store-lookup-all(s: term, nm: term): div list<term>
  match s
    TNode("scons", [n, vl, rest]) ->
      val found = if term/eq(n, nm) then [vl] else []
      found ++ store-lookup-all(rest, nm)
    _ -> []

val lookup-solver = make-external("lookup") fn(args)
  match args
    Cons(s, Cons(nm, _)) ->
      store-lookup-all(s, nm).map(fn(vl) [s, nm, vl])
    _ -> []

fun cfa-memo-key(): ((fact) -> string)
  compose-memo-keys([
    ("eval", make-memo-key("eval", 2)),
    ("lookup", make-memo-key("lookup", 2))
  ])

fun cfa-ext()
  compose-externals([lookup-solver])

// ============================================================================
// Run — goals use domain types, bridge converts
// ============================================================================

pub fun main()
  val rules = relation/to-rules(cfa-relation())
  val mk = cfa-memo-key()
  val ext = cfa-ext()
  println("Rules: " ++ rules.length.show)

  // Example 1: (λx.x)(λz.z) — concrete programs use EAtom for literal names
  println("\n=== (λx.x)(λz.z) ===")
  val id-fn = ELam(EAtom("x"), EVar(EAtom("x")))
  val goal1 = EApp(id-fn, ELam(EAtom("z"), EVar(EAtom("z")))) \ SNil |- REval \ ev("v") \ sv("s")
  val goal1-fact = chain/to-fact(goal1)
  val table1 = koka-redex/forward/forward-search(goal1-fact, rules, ?external=ext, ?memo-key=mk)
  println("Entries: " ++ table1.length.show)

  // Example 2: let f = λx.x in (f λa.a)(f λb.b)
  println("\n=== let f = λx.x in (f λa.a)(f λb.b) ===")
  val lam-a = ELam(EAtom("a"), EVar(EAtom("a")))
  val lam-b = ELam(EAtom("b"), EVar(EAtom("b")))
  val body = EApp(EApp(EVar(EAtom("f")), lam-a), EApp(EVar(EAtom("f")), lam-b))
  val prog2 = EApp(ELam(EAtom("f"), body), id-fn)
  val goal2 = prog2 \ SNil |- REval \ ev("v") \ sv("s")
  val goal2-fact = chain/to-fact(goal2)
  val table2 = koka-redex/forward/forward-search(goal2-fact, rules, ?external=ext, ?memo-key=mk)
  println("Entries: " ++ table2.length.show)

  println("\nOver-approximation:")
  val multi = table2.filter(fn(kv) kv.snd.length > 1)
  println("  Entries with >1 value: " ++ multi.length.show)
  multi.map(fn(kv) "  ** " ++ kv.fst ++ " has " ++ kv.snd.length.show ++ " values **").foreach(println)
