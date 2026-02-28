module koka-redex/latex

import koka-redex/syntax
import std/core/undiv

// Convert a judgement AST to a LaTeX string
pub fun judgement-to-latex(j: judgement<t>, ?show-latex: t -> div string): div string
  match j
    JRel(_, payload) -> show-latex(payload)

// Convert a single rule to a LaTeX inference rule using the `mathpar` or `proof` package syntax 
// (e.g. \inferrule*{premises}{conclusion})
pub fun rule-to-latex(r: rule<t>, ?show-latex: t -> div string): div string
  val premises-str = r.premises.map(judgement-to-latex).join(" \\\\\\\\ ")
  val conc-str = r.conclusions.map(judgement-to-latex).join(" \\\\\\\\ ")
  
  "\\inferrule*[Right=" ++ r.name ++ "]\n  { " ++ premises-str ++ " }\n  { " ++ conc-str ++ " }"

// Convert a relation to a group of LaTeX rules
pub fun relation-to-latex(r: relation-def<t>, ?show-latex: t -> div string): div string
  "\\begin{mathpar}\n" ++ r.rules.map(rule-to-latex).join("\n\n") ++ "\n\\end{mathpar}"

pub fun main()
  ()
