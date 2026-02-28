module term

pub import koka-redex/fresh
// AST Definition
// -----------------------------------------------------------------------------

// A generic term in the language
pub type term
  TVar(name: string)
  TApp(func: string, args: list<term>)
  TNum(value: int)
  TStr(value: string)

// -----------------------------------------------------------------------------
// Ergonomic Smart AST Constructors
// -----------------------------------------------------------------------------

pub fun sym(s: string): term { TVar(s) }
pub fun n(i: int): term { TNum(i) }

// Helper typed fresh variable generators for Terms
pub fun e(?e-fresh: ev<fresh<term>>): <exn,div> term { (?e-fresh).generate-fresh() }
pub fun v(?v-fresh: ev<fresh<term>>): <exn,div> term { (?v-fresh).generate-fresh() }
pub fun t(?t-fresh: ev<fresh<term>>): <exn,div> term { (?t-fresh).generate-fresh() }

pub fun with-fresh-term(pref: string, action: (ev<fresh<term>>) -> <div|e> b): <div|e> b
  with-fresh(pref, fn(p, c) TVar(p ++ "-" ++ c.show), action)

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

pub fun show-markdown(t: term): div string
  match t
    TVar(name) -> name
    TNum(v) -> v.show
    TStr(v) -> v
    TApp(func, args) ->
      if args.is-empty then func
      else func ++ "(" ++ args.map(show-markdown).join(", ") ++ ")"

pub fun show-latex(t: term): div string
  match t
    TVar(name) -> name
    TNum(v) -> v.show
    TStr(v) -> "\\text{" ++ v ++ "}"
    TApp(func, args) ->
      if args.is-empty then func
      else func ++ "(" ++ args.map(show-latex).join(", ") ++ ")"
