module koka-redex2/latex

import type-level/structs
import type-level/list
import type-level/nil
import koka-redex2/syntax
import std/core/undiv

// -----------------------------------------------------------------------------
// Formatting Type-Classes
// -----------------------------------------------------------------------------

// Format `type-nil` of premises
pub fun tnil/show-latex(l: type-nil): e list<string>
  Nil

// Format `type-cons` of premises, recursively formatting the head and tail
pub fun tcons/show-latex(TCons(h, t): type-cons<a, b>, ?show-latex-j: a -> e string, ?show-latex: b -> e list<string>): e list<string>
  Cons(show-latex-j(h), t.show-latex)

// A single judgement is a type-list, so we provide `show-latex-j` for it which joins the parts with spaces.
pub fun tcons/show-latex-j(l: type-cons<a, b>, ?show-latex: type-cons<a, b> -> e list<string>): e string
  l.show-latex.join(" ")

// Format a single rule 
pub fun rule/show-latex(Rule(name, premises, conclusion): rule<n, p, c>, ?show-latex: p -> e list<string>, ?conclusion/show-latex-j: c -> e string, ?name/show-latex-j: n -> e string): e string
  val premises-str = premises.show-latex.join(" \\\\\\\\ ")
  val conc-str = conclusion.show-latex-j
  
  "\\inferrule*[Right=" ++ name.show-latex-j ++ "]\n  { " ++ premises-str ++ " }\n  { " ++ conc-str ++ " }"

// Format a single item (terminal element that is not type-nil or type-cons)
pub fun default/show-latex(a: a, ?show-md: a -> e string): e list<string>
  Cons(show-md(a), Nil)

pub value struct latexstr( s: string )

pub fun map-field(r: rule<n, p, c>, ?show-latex: rule<n, p, c> -> e string): e latexstr
  Latexstr(r.show-latex)

pub fun relation-to-latex(RelationDef(rules): relation-def<r>, ?to-list: r -> e list<latexstr>): e string
  "\\begin{mathpar}\n" ++ rules.to-list.map(s).join("\n\n") ++ "\n\\end{mathpar}"
