module koka-redex/markdown

import type-level/structs
import type-level/list
import type-level/nil
import koka-redex/syntax
import koka-redex/pattern

// Helper to wrap text in latex math block for markdown
pub fun math(s: string): string
  "$" ++ s ++ "$"

// -----------------------------------------------------------------------------
// Formatting Type-Classes
// -----------------------------------------------------------------------------

// ---- Premise-level rendering (returns list<string>, one per premise) ----

// No premises
pub fun tnil/show-md-premises(_l: t-nil): e list<string>
  Nil

// Skip premise-sep marker
pub fun sep/show-md-premises(TCons(_sep, t): t-cons<premise-sep, b>, ?show-md-premises: b -> e list<string>): e list<string>
  t.show-md-premises

// Premise whose head is a judgement chain (tcons)
pub fun tcons-prem/show-md-premises(TCons(h, t): t-cons<t-cons<a1, a2>, b>,
  ?show-md: t-cons<a1, a2> -> e string,
  ?show-md-premises: b -> e list<string>): e list<string>
  Cons(h.show-md, t.show-md-premises)

// Single premise (bare value)
pub fun default/show-md-premises(a: a, ?show-md: a -> e string): e list<string>
  Cons(show-md(a), Nil)

// ---- Within-judgement rendering ----

// Format `t-nil`
pub fun tnil/show-markdown(_l: t-nil): e list<string>
  Nil

// Format `tcons` within a judgement
pub fun tcons/show-markdown(TCons(h, t): t-cons<a, b>, ?show-md: a -> e string, ?show-markdown: b -> e list<string>): e list<string>
  Cons(show-md(h), t.show-markdown)

// Single element
pub fun default/show-markdown(a: a, ?show-md: a -> e string): e list<string>
  Cons(show-md(a), Nil)

// A judgement (tcons chain) as a single string
pub fun tcons/show-md(l: t-cons<a, b>, ?show-markdown: t-cons<a, b> -> e list<string>): e string
  l.show-markdown.join(" ")

// ---- Rule rendering ----

pub fun rule/show-markdown(Rule(name, premises, conclusion): koka-redex/syntax/rule<n, p, c>, ?show-md-premises: p -> e list<string>, ?conclusion/show-md: c -> e string, ?name/show-md: n -> e string): e string
  val premises-md = premises.show-md-premises.map(fn(s) "- " ++ s).join("\n")
  val conc-md = "- " ++ conclusion.show-md

  "**" ++ name.show-md ++ "**\n" ++
  (if premises-md.is-empty then "" else premises-md ++ "\n--------\n") ++
  conc-md ++ "\n"

pub value struct mdstr( s: string )

pub fun map-field(r: koka-redex/syntax/rule<n, p, c>, ?show-markdown: koka-redex/syntax/rule<n, p, c> -> e string): e mdstr
  Mdstr(r.show-markdown)

// External entries are skipped in Markdown rendering
pub fun ext/map-field(_e: external-entry): e mdstr
  Mdstr("")

// Default: fall back to show when no show-md is defined
pub fun default/show-md(a: a, ?show: a -> string): string
  show(a)

pub fun relation-to-md(RelationDef(rules): relation-def<r>, name: string, ?to-list: r -> e list<mdstr>): e string
  "# Relation: " ++ name ++ "\n\n" ++ rules.to-list.filter(fn(l) !l.s.is-empty).map(s).join("\n")

// ============================================================================
// Generic pattern renderer for Markdown
// ============================================================================

pub fun pat/show-md(p: pat<a>, ?term-show-md: (term) -> <div,exn> string): <div,exn> string
  match p
    PatVar(nm, _id) -> nm
    PatTerm(t) -> t.term-show-md
