module koka-redex/latex

import type-level/structs
import type-level/list
import type-level/nil
import koka-redex/syntax
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
  ?show-latex-j: t-cons<a1, a2> -> e string,
  ?show-latex-premises: b -> e list<string>): e list<string>
  Cons(h.show-latex-j, t.show-latex-premises)

// Single premise (bare value, not tcons) — base case
pub fun default/show-latex-premises(a: a, ?show-latex-j: a -> e string): e list<string>
  Cons(show-latex-j(a), Nil)

// ---- Within-judgement rendering (flattens to list<string>, joined with spaces) ----

// Format `t-nil`
pub fun tnil/show-latex(_l: t-nil): e list<string>
  Nil

// Format `tcons` within a judgement — each element is one token
pub fun tcons/show-latex(TCons(h, t): t-cons<a, b>, ?show-latex-j: a -> e string, ?show-latex: b -> e list<string>): e list<string>
  Cons(show-latex-j(h), t.show-latex)

// A judgement (tcons chain) rendered as a single string by joining elements with spaces
pub fun tcons/show-latex-j(l: t-cons<a, b>, ?show-latex: t-cons<a, b> -> e list<string>): e string
  l.show-latex.join(" ")

// Single element as list
pub fun default/show-latex(a: a, ?show-latex-j: a -> e string): e list<string>
  Cons(show-latex-j(a), Nil)

// ---- Rule rendering ----

pub fun rule/show-latex(Rule(name, premises, conclusion): rule<n, p, c>, ?show-latex-premises: p -> e list<string>, ?conclusion/show-latex-j: c -> e string, ?name/show-latex-j: n -> e string): e string
  val premises-str = premises.show-latex-premises.join(" \\\\\\\\ ")
  val conc-str = conclusion.show-latex-j

  "\\inferrule*[Right=" ++ name.show-latex-j ++ "]\n  { " ++ premises-str ++ " }\n  { " ++ conc-str ++ " }"

pub value struct latexstr( s: string )

pub fun map-field(r: rule<n, p, c>, ?show-latex: rule<n, p, c> -> e string): e latexstr
  Latexstr(r.show-latex)

// External entries are skipped in LaTeX rendering
pub fun ext/map-field(_e: external-entry): e latexstr
  Latexstr("")

pub fun relation-to-latex(RelationDef(rules): relation-def<r>, ?to-list: r -> e list<latexstr>): e string
  "\\begin{mathpar}\n" ++ rules.to-list.filter(fn(l) !l.s.is-empty).map(s).join("\n\n") ++ "\n\\end{mathpar}"
