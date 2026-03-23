module examples/cfa-demo

// 0CFA via Abstracting Definitional Interpreters
//
// Key insight: the same bigstep evaluation rules + nondet-set lattice policy
// + memoization = collecting semantics (0CFA).
//
// The memo table IS the abstract store/cache.
// Each entry eval(expr, value) records that `expr` can evaluate to `value`.
// The nondet-set policy collects ALL such values per expression.

import koka-redex/proof-search
import koka-redex/proof-search-policy

// ---------------------------------------------------------------------------
// Relation types (same as bigstep demo)
// ---------------------------------------------------------------------------

pub type r-eval
  REval

pub type r-subst
  RSubst

// The key difference from bigstep: nondet-set on eval collects all values
val eval/rel-memo-lattice : rel-memo-lattice<r-eval>
  = Rel-memo-lattice(memo-lattice/nondet-set())

val subst/rel-memo-lattice : rel-memo-lattice<r-subst>
  = Rel-memo-lattice(memo-lattice/nondet-set())

// ---------------------------------------------------------------------------
// Term constructors
// ---------------------------------------------------------------------------

fun evar(x: string): term
  TNode("var", [TAtom(x)])

fun elam(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp(e1: term, e2: term): term
  TNode("app", [e1, e2])

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

fun eval(e: term, v: term): fact
  Fact("eval", [e, v])

fun subst-term(e: term, x: term, v: term, result: term): fact
  Fact("subst", [e, x, v, result])

fun neq-fact(a: term, b: term): fact
  Fact("neq", [a, b])

// ---------------------------------------------------------------------------
// Rules: bigstep eval + full substitution
// ---------------------------------------------------------------------------

fun eval-rules(): list<rule>
  [ // E-Lam: lambda values evaluate to themselves
    Rule("E-Lam", [],
      eval(TNode("lam", [TVar("x", 0), TVar("e", 0)]), TNode("lam", [TVar("x", 0), TVar("e", 0)]))),
    // E-App: application
    Rule("E-App",
      [ eval(TVar("e1", 0), TNode("lam", [TVar("x", 0), TVar("e3", 0)])),
        eval(TVar("e2", 0), TVar("v1", 0)),
        subst-term(TVar("e3", 0), TVar("x", 0), TVar("v1", 0), TVar("e4", 0)),
        eval(TVar("e4", 0), TVar("v2", 0)) ],
      eval(eapp(TVar("e1", 0), TVar("e2", 0)), TVar("v2", 0)))
  ]

fun subst-rules(): list<rule>
  [ // S-Var-Eq: subst(var(x), x, w) = w
    Rule("S-Var-Eq", [],
      subst-term(TNode("var", [TVar("x", 0)]), TVar("x", 0), TVar("w", 0), TVar("w", 0))),
    // S-Var-Neq: subst(var(y), x, w) = var(y)  when x ≠ y
    Rule("S-Var-Neq",
      [ neq-fact(TVar("x", 0), TVar("y", 0)) ],
      subst-term(TNode("var", [TVar("y", 0)]), TVar("x", 0), TVar("w", 0), TNode("var", [TVar("y", 0)]))),
    // S-App: subst distributes over application
    Rule("S-App",
      [ subst-term(TVar("e1", 0), TVar("x", 0), TVar("w", 0), TVar("e1'", 0)),
        subst-term(TVar("e2", 0), TVar("x", 0), TVar("w", 0), TVar("e2'", 0)) ],
      subst-term(eapp(TVar("e1", 0), TVar("e2", 0)), TVar("x", 0), TVar("w", 0), eapp(TVar("e1'", 0), TVar("e2'", 0)))),
    // S-Lam-Eq: subst into lambda with same binder is no-op
    Rule("S-Lam-Eq", [],
      subst-term(TNode("lam", [TVar("x", 0), TVar("e", 0)]), TVar("x", 0), TVar("w", 0), TNode("lam", [TVar("x", 0), TVar("e", 0)]))),
    // S-Lam-Neq: subst into lambda with different binder goes into body
    Rule("S-Lam-Neq",
      [ neq-fact(TVar("x", 0), TVar("y", 0)),
        subst-term(TVar("e", 0), TVar("x", 0), TVar("w", 0), TVar("e'", 0)) ],
      subst-term(TNode("lam", [TVar("y", 0), TVar("e", 0)]), TVar("x", 0), TVar("w", 0), TNode("lam", [TVar("y", 0), TVar("e'", 0)])))
  ]

fun all-rules(): list<rule>
  eval-rules() ++ subst-rules()

// Generate neq facts for a set of variable names
fun neq-facts(names: list<string>): list<fact>
  names.flatmap fn(a)
    names.flatmap fn(b)
      if a != b then [neq-fact(TAtom(a), TAtom(b))] else []

fun policies(): list<relation-policy>
  val eval-tag : pred-tag<r-eval> = mk/pred-tag("eval")
  val subst-tag : pred-tag<r-subst> = mk/pred-tag("subst")
  [ policy/of(eval-tag),
    policy/of(subst-tag) ]

// ---------------------------------------------------------------------------
// Helper: display the memo table (the abstract store)
// ---------------------------------------------------------------------------

fun show-table(table: list<(string, list<proof>)>)
  println("\n=== Abstract Store (Memo Table) ===")
  table.foreach fn((key, proofs))
    if proofs.length > 0 then
      println("\n  " ++ key ++ "  [" ++ proofs.length.show ++ " proof(s)]")
      proofs.foreach fn(pf)
        println("    " ++ pf.show)

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

pub fun main()
  // Example 1: (λx.x)(λz.z) — identity applied to identity
  println("=== 0CFA Example 1: (λx.x)(λz.z) ===")
  val id-fn = elam("x", evar("x"))
  val arg = elam("z", evar("z"))
  val program1 = eapp(id-fn, arg)
  val vars1 = ["x", "z"]

  val goal1 = eval(program1, arg)
  val table1 = search-table(goal1, neq-facts(vars1), all-rules(), policies(), 20)
  show-table(table1)

  // Example 2: (λf.f f)(λx.x) — self-application of identity
  println("\n\n=== 0CFA Example 2: (λf.f f)(λx.x) ===")
  val self-app-body = eapp(evar("f"), evar("f"))
  val self-app = elam("f", self-app-body)
  val program2 = eapp(self-app, id-fn)
  val vars2 = ["f", "x"]

  val goal2 = eval(program2, id-fn)
  val table2 = search-table(goal2, neq-facts(vars2), all-rules(), policies(), 30)
  show-table(table2)

  // Example 3: (λf.λg.(f g))(λx.x)(λy.y)
  // Multiple subexpressions, richer store
  println("\n\n=== 0CFA Example 3: (λf.λg.f g)(λx.x)(λy.y) ===")
  // (λf.λg.f g)(λx.x)(λy.y)
  val id-x = elam("x", evar("x"))
  val id-y = elam("y", evar("y"))
  val inner-body = eapp(evar("f"), evar("g"))  // f g
  val outer-lam = elam("f", elam("g", inner-body))  // λf.λg.f g
  val program3 = eapp(eapp(outer-lam, id-x), id-y)
  val vars3 = ["f", "g", "x", "y"]

  val goal3 = eval(program3, id-y)
  val table3 = search-table(goal3, neq-facts(vars3), all-rules(), policies(), 30)
  show-table(table3)

  // Note: Examples 1-3 use explicit substitution, which is concrete bigstep.
  // The memo table records all explored subgoals but each expression has exactly
  // one value — no over-approximation.
  //
  // For true 0CFA collecting semantics (over-approximation), we need
  // environment-passing rules where the variable lookup relation merges
  // across different call contexts. See cfa-env-demo.kk.
