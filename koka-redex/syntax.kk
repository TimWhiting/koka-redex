module syntax

import std/core/undiv

// -----------------------------------------------------------------------------
// AST Definition
// -----------------------------------------------------------------------------

// Generic syntax definition separated from term logic.

pub value struct relation
  name: string

pub type judgement<t>
  JRel(rel: relation, payload: t)

pub type rule<t>
  Rule(name: string, premises: list<judgement<t>>, conclusions: list<judgement<t>>)

pub type relation-def<t>
  RelationDef(rel: relation, rules: list<rule<t>>)

// -----------------------------------------------------------------------------
// DSL Effect Handlers
// -----------------------------------------------------------------------------

pub effect rule-builder<t>
  fun emit-judgement(j: judgement<t>): ()
  fun switch-to-conclusion(): ()

pub fun rule(name: string, build: () -> <rule-builder<t>,relation-builder<t>|e> ()): <relation-builder<t>|e> ()
  var premises := []
  var conclusions := []
  var is-conclusion := False

  with handler
    fun emit-judgement(j) 
      if is-conclusion then conclusions := Cons(j, conclusions)
      else premises := Cons(j, premises)
    fun switch-to-conclusion()
      is-conclusion := True
    return(_)
      add-rule(Rule(name, premises.reverse, conclusions.reverse))
      
  build()

// The user calls `---` to switch the builder from accepting premises to expecting the conclusion
pub fun (---)(): <rule-builder<t>> ()
  switch-to-conclusion()

pub effect relation-builder<t>
  fun add-rule(r: rule<t>): ()

pub fun relation-def(rel: relation, build: () -> <relation-builder<t>|e> ()): e relation-def<t>
  var rules := []
  
  with handler
    fun add-rule(r)
      rules := Cons(r, rules)
    return(_)
      RelationDef(rel, rules.reverse)
      
  build()
