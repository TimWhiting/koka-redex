module koka-redex/pattern

// Pattern types for rule metavariables.
//
// pat<a> wraps either a metavar (TVar) or a concrete term.
// fresh-pat() allocates fresh metavars using pat-fresh effect.
// Pattern constructors (user-defined) take pat<a> for each position.

pub import koka-redex/term

// ----------------------------------------------------------------------------
// pat<a>: phantom-typed metavar or concrete term
// ----------------------------------------------------------------------------

pub type pat<a>
  PatVar(nm: string, id: int)
  PatTerm(t: term)

pub fun term/pat(t: a, ?to-term: a -> div term): div pat<term>
  PatTerm(to-term(t))

pub fun pattern/to-term(p: pat<a>): term
  match p
    PatVar(nm, id) -> TVar(nm, id)
    PatTerm(t) -> t

// ----------------------------------------------------------------------------
// Fresh metavar generation
// ----------------------------------------------------------------------------

pub effect pat-fresh
  fun fresh-id(): int

pub fun fresh-pat(nm: string): <pat-fresh> pat<a>
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

// The user provides `pat` for their domain types, e.g.:
//   fun expr/pat(e: expr): div pat<expr>
//     PatTerm(e.to-term)
//
// Built-in lifts for primitives:

pub fun string/pat(s: string): pat<string>
  PatTerm(TAtom(s))

pub fun int/pat(n: int): pat<int>
  PatTerm(TInt(n))

pub fun default/term/pat(t: term): pat<term>
  PatTerm(t)
