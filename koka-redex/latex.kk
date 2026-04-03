module koka-redex/latex

import type-level/structs
import type-level/list
import type-level/nil
import koka-redex/syntax
import koka-redex/pattern
import std/core/undiv

// -----------------------------------------------------------------------------
// Formatting Type-Classes
// -----------------------------------------------------------------------------

// ---- Premise-level rendering (returns list<string>, one per premise) ----

// No premises
pub fun tnil/show-latex-premises(_l: t-nil): e list<string>
  Nil

// Skip premise-sep marker, continue with tail
pub fun sep/show-latex-premises(TCons(_sep, t): t-cons<premise-sep, b>, ?show-latex-premises: b -> e list<string>): e list<string>
  t.show-latex-premises

// Premise whose head is a judgement chain (tcons) — render as one joined string
pub fun tcons-prem/show-latex-premises(TCons(h, t): t-cons<t-cons<a1, a2>, b>,
  ?show-latex: t-cons<a1, a2> -> e string,
  ?show-latex-premises: b -> e list<string>): e list<string>
  Cons(h.show-latex, t.show-latex-premises)

// Single premise (bare value, not tcons) — base case
pub fun default/show-latex-premises(a: a, ?show-latex: a -> e string): e list<string>
  Cons(show-latex(a), Nil)

// ---- Within-judgement rendering (flattens to list<string>, joined with spaces) ----

// Format `t-nil`
pub fun tnil/show-latex-tokens(_l: t-nil): e list<string>
  Nil

// Format `tcons` within a judgement — each element is one token
pub fun tcons/show-latex-tokens(TCons(h, t): t-cons<a, b>, ?show-latex: a -> e string, ?show-latex-tokens: b -> e list<string>): e list<string>
  Cons(show-latex(h), t.show-latex-tokens)

// A judgement (tcons chain) rendered as a single string by joining tokens with spaces
pub fun tcons/show-latex(l: t-cons<a, b>, ?show-latex-tokens: t-cons<a, b> -> e list<string>): e string
  l.show-latex-tokens.join(" ")

// Single element as list
pub fun default/show-latex-tokens(a: a, ?show-latex: a -> e string): e list<string>
  Cons(show-latex(a), Nil)

// Default show-latex from name-latex val (for relation markers etc.)
pub fun default/show-latex(_a: a, ?name-latex: name<a>): string
  ?name-latex.s


// ---- Rule rendering ----

pub fun rule/show-latex(Rule(name, premises, conclusion): koka-redex/syntax/rule<n, p, c>, ?show-latex-premises: p -> e list<string>, ?conclusion/show-latex: c -> e string, ?name/show-latex: n -> e string): e string
  val premises-str = premises.show-latex-premises.join(" \\\\\\\\ ")
  val conc-str = conclusion.show-latex

  "\\inferrule*[Right=" ++ name.show-latex ++ "]\n  { " ++ premises-str ++ " }\n  { " ++ conc-str ++ " }"

pub value struct latexstr( s: string )

pub fun map-field(r: koka-redex/syntax/rule<n, p, c>, ?show-latex: koka-redex/syntax/rule<n, p, c> -> e string): e latexstr
  Latexstr(r.show-latex)

// External entries are skipped in LaTeX rendering
pub fun ext/map-field(_e: external-entry): e latexstr
  Latexstr("")

pub fun relation-to-latex(RelationDef(rules): relation-def<r>, ?to-list: r -> e list<latexstr>): e string
  "\\begin{mathpar}\n" ++ rules.to-list.filter(fn(l) !l.s.is-empty).map(s).join("\n\n") ++ "\n\\end{mathpar}"

// ============================================================================
// Generic pattern renderer for LaTeX
//
// Works for any pat<a> given a term renderer.
// PatVar → metavar name with LaTeX subscript
// PatTerm → delegate to term renderer
// ============================================================================

pub fun pat/show-latex(p: pat<a>, ?term-show-latex: (term) -> <div,exn> string): <div,exn> string
  match p
    PatVar(nm, id) -> if id == 0 then nm else nm ++ "_{" ++ id.show ++ "}"
    PatTerm(t) -> t.term-show-latex
