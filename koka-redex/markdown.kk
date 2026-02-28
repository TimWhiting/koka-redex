module koka-redex/markdown

import koka-redex/syntax
import std/core/undiv

// Helper to wrap text in latex math block for markdown
pub fun math(s: string): string
  "$" ++ s ++ "$"

pub fun judgement-to-md(j: judgement<t>, ?show-markdown: t -> div string): div string
  match j
    JRel(_, payload) -> show-markdown(payload)

// Format a single rule in markdown
// E.g.
// **Rule-Name**
// - Premise 1
// - Premise 2
// --------
// Conclusion
pub fun rule-to-md(r: rule<t>, ?show-markdown: t -> div string): div string
  val premises-md = r.premises.map(fn(p) "- " ++ math(judgement-to-md(p))).join("\n")
  val conc-md = r.conclusions.map(fn(p) "- " ++ math(judgement-to-md(p))).join("\n")
  
  "**" ++ r.name ++ "**\n" ++ 
  (if r.premises.is-empty then "" else premises-md ++ "\n--------\n") ++ 
  conc-md ++ "\n"

pub fun relation-to-md(r: relation-def<t>, ?show-markdown: t -> div string): div string
  "# Relation: " ++ r.rel.name ++ "\n\n" ++ r.rules.map(rule-to-md).join("\n")
