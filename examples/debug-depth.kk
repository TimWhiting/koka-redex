module examples/debug-depth

import koka-redex/proof-search
import koka-redex/proof-search-policy
import koka-redex/syntax
import koka-redex/proof-search-bridge

pub type r-test
  RTest

val test/rel-memo-lattice : rel-memo-lattice<r-test>
  = Rel-memo-lattice(memo-lattice/nondet-set())

fun a(x: term): fact
  Fact("a", [x])

fun b(x: term): fact
  Fact("b", [x])

fun relation()
  with relation-def
  with rule(
    a(TVar("x", 0)),
    "rule-a",
    b(TVar("x", 0))
  )
  rule(
    a(TVar("x", 0)),
    "rule-a2",
    b(TVar("x", 0))
  )

fun facts(): list<fact>
  [a(TInt(1))]

fun policies(): list<relation-policy>
  val test-tag : pred-tag<r-test> = mk/pred-tag("a")
  val test-tag2 : pred-tag<r-test> = mk/pred-tag("b")
  [policy/of(test-tag)]

pub fun main()
  val rel = relation()
  val rules-list = rel.to-search-rules
  
  println("=== Rules in relation ===")
  rules-list.foreach(fn(r)
    val Rule(name, premises, conclusion) = r
    println("  Rule: " ++ name)
    println("    Premises: " ++ premises.map(fact/show).join(", "))
    println("    Conclusion: " ++ conclusion.show)
  )
  
  println("")
  println("=== Test 1: Direct a(1) lookup ===")
  match search-memo/relation(a(TInt(1)), facts(), relation(), policies(), 5, ?as-fact = fact/to-fact)
    Just(_) -> println("✓ a(1) found")
    Nothing -> println("✗ a(1) not found")

  println("")
  println("=== Test 2: Derived b(1) with depth=1 ===")
  match search-memo/relation(b(TInt(1)), facts(), relation(), policies(), 1, ?as-fact = fact/to-fact)
    Just(_) -> println("✓ b(1) found with depth 1")
    Nothing -> println("✗ b(1) not found with depth 1")
    
  println("")
  println("=== Test 3: Derived b(1) with depth=2 ===")
  match search-memo/relation(b(TInt(1)), facts(), relation(), policies(), 2, ?as-fact = fact/to-fact)
    Just(_) -> println("✓ b(1) found with depth 2")
    Nothing -> println("✗ b(1) not found with depth 2")
    
  println("")
  println("=== Test 4: Derived b(1) with depth=5 ===")
  match search-memo/relation(b(TInt(1)), facts(), relation(), policies(), 5, ?as-fact = fact/to-fact)
    Just(_) -> println("✓ b(1) found with depth 5")
    Nothing -> println("✗ b(1) not found with depth 5")
