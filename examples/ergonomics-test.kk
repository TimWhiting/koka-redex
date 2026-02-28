module ergonomics-test

import koka-redex/syntax
import koka-redex/markdown
import std/core/undiv

// -----------------------------------------------------------------------------
// Ergonomic Builder Effects
// -----------------------------------------------------------------------------

pub effect ergo-builder
  fun emit-judgement(j: judgement): ()
  fun switch-to-conclusion(): ()

// Operator to register a judgement as a premise or conclusion depending on state
pub fun (~>)(e: term, v: term): <ergo-builder> ()
  // For the prototype, we assume the user calls a separator to switch modes.
  // We'll just define the operator to return a judgement and let the user specify.
  // Actually, we can use a state effect inside the rule builder:
  emit-judgement(JRel(Relation("\\Downarrow"), [e, v]))

// The user calls `---` to switch the builder from accepting premises to expecting the conclusion
pub fun (---)(): <ergo-builder> ()
  switch-to-conclusion()

pub fun ergo-rule(name: string, build: () -> <ergo-builder|e> ()): e rule
  var premises := []
  var conc := Just(JRel(Relation("error"), []))
  var is-conclusion := False
  
  with handler
    fun emit-judgement(j)
      if is-conclusion then conc := Just(j)
      else premises := Cons(j, premises)
    fun switch-to-conclusion()
      is-conclusion := True
    return(_)
      Rule(name, premises.reverse, conc.default(JRel(Relation("error"), [])))

  build()

// -----------------------------------------------------------------------------
// Smart AST Constructors using Implicits
// -----------------------------------------------------------------------------

pub fun sym(s: string): term { TVar(s) }
pub fun n(i: int): term { TNum(i) }

// Named effect for generating fresh variables
pub named effect fresh
  fun generate-fresh(): term

pub fun e(?e-fresh: ev<fresh>): <exn> term { (?e-fresh).generate-fresh() }
pub fun v(?v-fresh: ev<fresh>): <exn> term { (?v-fresh).generate-fresh() }

// Handler that runs a computation with a specific prefix for fresh variables
pub fun with-fresh(pref: string, action: (ev<fresh>) -> <div|e> b): <div|e> b
  var counter := 0
  with f <- named handler
    fun generate-fresh()
      counter := counter + 1
      TVar(pref ++ "-" ++ counter.show)
      
  action(f)

// -----------------------------------------------------------------------------
// Test
// -----------------------------------------------------------------------------

pub fun test-relation(?e-fresh: ev<fresh>, ?v-fresh: ev<fresh>): <relation-builder,exn,div|e> ()
  add-rule(ergo-rule("E-App")
    val e1 = e()
    val e2 = e()
    val e3 = e()
    val v2 = v()
    val v3 = v()
    
    e1 ~> TApp("lam", [sym("x"), e3])
    e2 ~> v2
    // Assume subst is another operator or function call
    emit-judgement(JRel(Relation("subst"), [e3, sym("x"), v2, e()]))
    e() ~> v3
    
    (---)()
    
    TApp("app", [e1, e2]) ~> v3
  )


pub fun main()
  with e-fresh <- with-fresh("e")
  with v-fresh <- with-fresh("v")
  
  val rel = relation-def(Relation("\\Downarrow"))
    test-relation(?e-fresh = e-fresh, ?v-fresh = v-fresh)
  
  println(relation-to-md(rel))
