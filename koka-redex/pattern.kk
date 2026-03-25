module koka-redex/pattern

// Pattern types for rule metavariables.
//
// pattern<a> wraps either a metavar (TVar) or a concrete term.
// fresh-pat() allocates fresh metavars using pat-fresh effect.
// Pattern constructors (user-defined) take pattern<a> for each position.

pub import koka-redex/term

// ----------------------------------------------------------------------------
// pattern<a>: phantom-typed metavar or concrete term
// ----------------------------------------------------------------------------

pub type pattern<a>
  PatVar(nm: string, id: int)
  PatTerm(t: term)

pub fun pattern/to-term(p: pattern<a>): term
  match p
    PatVar(nm, id) -> TVar(nm, id)
    PatTerm(t) -> t

// ----------------------------------------------------------------------------
// Fresh metavar generation
// ----------------------------------------------------------------------------

pub effect pat-fresh
  fun fresh-id(): int

pub fun fresh-pat(nm: string): <pat-fresh> pattern<a>
  PatVar(nm, fresh-id())

// Run an action with fresh pattern variable allocation.
// Returns the action's result with all metavar IDs assigned.
pub fun with-pats(action: () -> <pat-fresh|e> a): e a
  var counter := 0
  with handler
    fun fresh-id()
      counter := counter + 1
      counter
  action()

// ----------------------------------------------------------------------------
// Lifting concrete values to patterns
// ----------------------------------------------------------------------------

// The user provides to-pattern for their domain types, e.g.:
//   fun expr/to-pattern(e: expr): div pattern<expr>
//     PatTerm(e.to-term)
//
// Built-in lifts for primitives:

pub fun string/to-pattern(s: string): pattern<string>
  PatTerm(TAtom(s))

pub fun int/to-pattern(n: int): pattern<int>
  PatTerm(TInt(n))

pub fun term/to-pattern(t: term): pattern<term>
  PatTerm(t)
