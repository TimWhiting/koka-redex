module examples/cfa-bind-demo

// 0CFA via global bind relation (no store-passing, no substitution)
//
// The bind(x, v) relation IS the abstract store.
// nondet-set on bind collects all bindings across call sites.
// The memo fixpoint iterates until bind and eval stabilize.

import koka-redex/proof-search
import koka-redex/proof-search-policy

// ---------------------------------------------------------------------------
// Relation types
// ---------------------------------------------------------------------------

pub type r-eval
  REval

pub type r-bind
  RBind

val eval/rel-memo-lattice : rel-memo-lattice<r-eval>
  = Rel-memo-lattice(memo-lattice/nondet-set())

val bind/rel-memo-lattice : rel-memo-lattice<r-bind>
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

fun bind(x: term, v: term): fact
  Fact("bind", [x, v])

// ---------------------------------------------------------------------------
// Rules — global bind, no substitution
// ---------------------------------------------------------------------------

fun v(name: string): term
  TVar(name, 0)

fun cfa-rules(): list<rule>
  [ // E-Lam: lambda values evaluate to themselves
    Rule("E-Lam", [],
      eval(TNode("lam", [v("x"), v("e")]), TNode("lam", [v("x"), v("e")]))),
    // E-Var: variable lookup via bind relation
    Rule("E-Var",
      [bind(v("x"), v("val"))],
      eval(TNode("var", [v("x")]), v("val"))),
    // E-App-Bind: application creates a binding for the parameter
    Rule("E-App-Bind",
      [ eval(v("e1"), TNode("lam", [v("x"), v("e3")])),
        eval(v("e2"), v("v2")) ],
      bind(v("x"), v("v2"))),
    // E-App-Eval: application result comes from evaluating the body
    Rule("E-App-Eval",
      [ eval(v("e1"), TNode("lam", [v("x"), v("e3")])),
        eval(v("e3"), v("result")) ],
      eval(eapp(v("e1"), v("e2")), v("result")))
  ]

fun policies(): list<relation-policy>
  val eval-tag : pred-tag<r-eval> = mk/pred-tag("eval")
  val bind-tag : pred-tag<r-bind> = mk/pred-tag("bind")
  [ policy/of(eval-tag),
    policy/of(bind-tag) ]

// ---------------------------------------------------------------------------
// Examples
// ---------------------------------------------------------------------------

fun show-table(table: list<(string, list<proof>)>)
  table.foreach fn((key, proofs))
    println("  " ++ key ++ "  [" ++ proofs.length.show ++ " value(s)]")

pub fun main()
  // Example 1: (λx.x)(λz.z)
  println("=== Global-Bind 0CFA: (λx.x)(λz.z) ===")
  val id-fn = elam("x", evar("x"))
  val arg = elam("z", evar("z"))
  val program1 = eapp(id-fn, arg)

  val goal1 = eval(program1, arg)
  val table1 = search-table(goal1, [], cfa-rules(), policies(), 20)
  show-table(table1)

  // Example 2: let f = λx.x in (f λa.a)(f λb.b)
  // = (λf. (f λa.a)(f λb.b))(λx.x)
  //
  // 0CFA should show: bind(x, λa.a) AND bind(x, λb.b)
  // eval(var(x)) should have BOTH λa.a and λb.b as values
  println("\n=== Global-Bind 0CFA: let f = λx.x in (f λa.a)(f λb.b) ===")
  val lam-a = elam("a", evar("a"))
  val lam-b = elam("b", evar("b"))
  val f-app-a = eapp(evar("f"), lam-a)
  val f-app-b = eapp(evar("f"), lam-b)
  val body2 = eapp(f-app-a, f-app-b)
  val program2 = eapp(elam("f", body2), id-fn)

  // Query for concrete result
  val goal2 = eval(program2, lam-b)
  val table2 = search-table(goal2, [], cfa-rules(), policies(), 30)
  println("\nMemo table (eval and bind entries):")
  show-table(table2)

  // Also check: does bind have both values for x?
  println("\nBind entries (over-approximation check):")
  table2.foreach fn((key, proofs))
    if proofs.length > 0 then
      match key.starts-with("bind(")
        Just(_) -> println("  " ++ key ++ "  [" ++ proofs.length.show ++ "]")
        Nothing -> ()
