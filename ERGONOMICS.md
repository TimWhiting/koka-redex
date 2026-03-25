# Ergonomic Improvements to Koka Redex DSL

## Background: PLT Redex Ergonomics
In Racket/PLT Redex, languages, terms, and reduction relations are defined with extreme conciseness using Lisp macros.
For example, defining a language and a reduction relation in Redex looks like:

```racket
(define-language L
  (e ::= (e e) (lambda (x) e) x v)
  (v ::= (lambda (x) e))
  (x ::= variable-not-otherwise-mentioned))

(define red
  (reduction-relation L
    (--> ((lambda (x) e) v)
         (substitute e x v)
         "beta")))
```

Notice the absence of explicit constructors like `TApp`, `TVar`, `JRel`, etc. Redex infers the AST structure from the S-expressions and the language grammar.

## Current Koka Redex Verbosity
Our current Koka Redex DSL is very explicit and verbose:
```koka
add-rule(rule("E-App")
  premise(evals-to(TVar("e_1"), e-lam("x", TVar("e_3"))))
  premise(evals-to(TVar("e_2"), TVar("v_2")))
  premise(subst-in(TVar("e_3"), TVar("x"), TVar("v_2"), TVar("e_4")))
  premise(evals-to(TVar("e_4"), TVar("v_3")))
  conclusion(evals-to(e-app(TVar("e_1"), TVar("e_2")), TVar("v_3")))
)
```

## Proposed Koka Idioms for Conciseness

Since Koka lacks macros to rewrite arbitrary syntax trees, we must use types, implicits, and overloading to achieve conciseness.

### 1. Overloaded String/Int Literals via Implicits
Instead of explicitly wrapping strings in `TVar("x")` or ints in `TNum(5)`, we can use Koka's type-directed implicit resolution or overloaded variables/functions if we provide a standard environment.
Even better, we can define a `to-term` typeclass-like implicit parameter:

```koka
fun to-term(s: string): term { TVar(s) }
fun to-term(i: int): term { TNum(i) }
fun to-term(t: term): term { t }
```

### 2. Custom Operators for Relations
We can define custom infix operators for common judgements.
Instead of `has-type(Gamma, e, T)` or `evals-to(e, v)`:
```koka
pub fun (|-)(gamma: term, e: term, t: term): judgement { JRel(r-typing, [gamma, e, t]) }
pub fun (~>)(e: term, v: term): judgement { JRel(r-eval, [e, v]) }
```

### 3. Dropping Explicit `premise` and `conclusion` Wrappers
Instead of writing `premise(...)` and `conclusion(...)` repetitively, a single rule can be defined by a list of premises and one conclusion, or even using operators to delineate them:

```koka
// Operator `-->` creates a rule from a list of premises to a conclusion
pub fun (-->)(premises: list<judgement>, conclusion: judgement): rule
```
Combined with Koka's list syntax and block trailing closures:

```koka
add-rule $ rule("E-App")
  [ gamma |- e1 : t-arrow(t1, t2),
    gamma |- e2 : t1 ] 
  --> (gamma |- e-app(e1, e2) : t2)
```
Wait, Koka's layout rules mean we could possibly just do:
```koka
rule("E-App")
  gamma |- e1 : t-arrow(t1, t2)
  gamma |- e2 : t1
  -----------------------------------
  gamma |- e-app(e1, e2) : t2
```
If `---` is defined as an operator that separates the accumulated premises from the conclusion. This requires some effect handler state (similar to what we have, but cleaner).

### 4. Smart Constructors for AST Nodes
Instead of `TApp("app", [e1, e2])`, we just define `app(e1, e2)` returning a `term`. This is already partially done in the examples, but we can make it more systematic.

### 5. Finally Tagless or Type-Level Encoding
If we want to enforce structural invariants (e.g., ensuring `e1` is actually an expression and not a type), we can phantom-type the terms: `term<expr>` vs `term<type>`.
```koka
pub type term<a> ...
```
This requires passing around the phantom type, which might increase verbosity for the implementer but increases safety.

## Example Refactored Syntax

```koka
val r-eval = Relation("\\Downarrow")
pub fun (~>)(e, v) { JRel(r-eval, [e, v]) }

relation-def(r-eval)
  rule("E-App")
    e1 ~> lam("x", e3)
    e2 ~> v2
    subst(e3, "x", v2, e4)
    e4 ~> v3
    ---
    app(e1, e2) ~> v3
```
*Note: Koka allows identifier names like `---` if defined as operators.*

## Action Items
1. Define a `(---)` or `(-->)` operator in `syntax.kk` that takes the current effect state of premises and registers the conclusion.
2. Provide overloaded helpers to lift strings automatically to `TVar` (using implicits or simply smart constructors like `v("x")`).
3. Refactor `examples/untyped-bigstep.kk` to use this much cleaner syntax and see if it feels close to Redex.
