module koka-redex/markdown

import type-level/structs
import type-level/list
import type-level/nil
import koka-redex/syntax

// Helper to wrap text in latex math block for markdown
pub fun math(s: string): string
  "$" ++ s ++ "$"

// -----------------------------------------------------------------------------
// Formatting Type-Classes
// -----------------------------------------------------------------------------

// Format `type-nil` of premises
pub fun tnil/show-markdown(l: type-nil): e list<string>
  Nil

// Format `type-cons` of premises, recursively formatting the head and tail
pub fun tcons/show-markdown(TCons(h, t): type-cons<a, b>, ?show-md: a -> e string, ?show-markdown: b -> e list<string>): e list<string>
  Cons(show-md(h), t.show-markdown)

// Format a single item (terminal element that is not type-nil or type-cons)
pub fun default/show-markdown(a: a, ?show-md: a -> e string): e list<string>
  Cons(show-md(a), Nil)

// A single judgement is a type-list, so we provide `show-md` for it which joins the parts with spaces.
pub fun tcons/show-md(l: type-cons<a, b>, ?show-markdown: type-cons<a, b> -> e list<string>): e string
  l.show-markdown.join(" ")

// Format a single rule 
pub fun rule/show-markdown(Rule(name, premises, conclusion): rule<n, p, c>, ?show-markdown: p -> e list<string>, ?conclusion/show-md: c -> e string, ?name/show-md: n -> e string): e string
  val premises-md = premises.show-markdown.map(fn(s) "- " ++ math(s)).join("\n")
  val conc-md = "- " ++ math(conclusion.show-md)
  
  "**" ++ name.show-md ++ "**\n" ++ 
  (if premises-md.is-empty then "" else premises-md ++ "\n--------\n") ++ 
  conc-md ++ "\n"

pub value struct mdstr( s: string )

pub fun map-field(r: rule<n, p, c>, ?show-markdown: rule<n, p, c> -> e string): e mdstr
  Mdstr(r.show-markdown)

pub fun relation-to-md(RelationDef(rules): relation-def<r>, name: string, ?to-list: r -> e list<mdstr>): e string
  "# Relation: " ++ name ++ "\n\n" ++ rules.to-list.map(s).join("\n")
