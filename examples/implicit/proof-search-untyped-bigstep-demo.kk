module examples/implicit/proof-search-untyped-bigstep-demo

import koka-redex/proof-search
import koka-redex/proof-search-policy
import koka-redex/syntax
import koka-redex/proof-search-bridge

pub type r-eval
  REval

pub type r-subst
  RSubst

val eval/rel-memo-lattice : rel-memo-lattice<r-eval>
  = Rel-memo-lattice(memo-lattice/nondet-set())

val subst/rel-memo-lattice : rel-memo-lattice<r-subst>
  = Rel-memo-lattice(memo-lattice/nondet-set())

fun evar(x: string): term
  TNode("var", [TAtom(x)])

fun elam(x: string, body: term): term
  TNode("lam", [TAtom(x), body])

fun eapp(e1: term, e2: term): term
  TNode("app", [e1, e2])

fun eval(e: term, v: term): fact
  Fact("eval", [e, v])

fun subst(e: term, x: string, v: term, result: term): fact
  Fact("subst", [e, TAtom(x), v, result])

fun subst-term(e: term, x: term, v: term, result: term): fact
  Fact("subst", [e, x, v, result])

fun relation()
  with relation-def
  with rule(
    TNil,
    // ------------------
    "E-Lam",
    eval(TNode("lam", [TVar("x", 0), TVar("e", 0)]), TNode("lam", [TVar("x", 0), TVar("e", 0)]))
  )
  with rule(
    eval(TVar("e1", 0), TNode("lam", [TVar("x", 0), TVar("e3", 0)])) \
    eval(TVar("e2", 0), TVar("v1", 0)) \
    subst-term(TVar("e3", 0), TVar("x", 0), TVar("v1", 0), TVar("e4", 0)) \
    eval(TVar("e4", 0), TVar("v2", 0)),
    "E-App",
    // ------------------
    eval(eapp(TVar("e1", 0), TVar("e2", 0)), TVar("v2", 0))
  )
  single/rule(
    TNil,
    "S-Var-Eq",
    // ------------------
    subst-term(TNode("var", [TVar("x", 0)]), TVar("x", 0), TVar("w", 0), TVar("w", 0))
  )

fun facts(): list<fact>
  Nil

fun policies(): list<relation-policy>
  val eval-tag : pred-tag<r-eval> = mk/pred-tag("eval")
  val subst-tag : pred-tag<r-subst> = mk/pred-tag("subst")
  [ policy/of(eval-tag),
    policy/of(subst-tag) ]

pub fun main()
  val id = elam("x", evar("x"))
  val arg = elam("z", evar("z"))
  val goal = eval(eapp(id, arg), arg)
  match search-memo/relation(goal, facts(), relation(), policies(), 20,
    ?as-fact = fact/to-fact
  )
    Just(pf) ->
      println("\nGoal: " ++ goal.show)
      println("Proof:\n" ++ pf.show)
    Nothing ->
      println("\nNo proof found for: " ++ goal.show)
