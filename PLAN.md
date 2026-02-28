# Koka Redex: Project Plan

## 1. Goals
Create a library/DSL in Koka to define and execute mathematical relations and reduction semantics, similar to PLT Redex. Features include:
- A clean, readable surface syntax leveraging Koka's flexible block layout, trailing closures, and implicit parameters.
- An execution backend based on `std/fixpoint/fixpoint-memo` to compute relation closures and evaluate rule fixpoints.
- A documentation generator that extracts rules to render them in LaTeX and/or Markdown.
- Exploring finally tagless style semantics, with an underlying AST to ground the exploration and aid in rendering.

## 2. Surface Syntax (DSL)
We are currently focusing heavily on the **ergonomics** of the surface syntax.
We want to define languages, relations, and rules in a way that minimizes verbosity, drawing inspiration from the macro-driven terseness of PLT Redex. 
To achieve this in Koka without Lisp macros, we are exploring:
- Koka's block syntax (`with`) and trailing closures.
- Advanced typing patterns (e.g., from `koka-community/type-level` and `test/overload`).
- Implicit parameters to implicitly thread contexts.

## 3. AST and Output Generators (Markdown & LaTeX)
We have an explicit AST for the terms, rules, and relations. 
This AST is the target of the DSL builders and is traversed to generate LaTeX and Markdown. (Implemented in `koka-redex/syntax`, `koka-redex/latex`, and `koka-redex/markdown`).

## 4. Semantic Backend (ON HOLD)
**NOTE: Do not implement the semantic backend or execution engine until the user explicitly requests it.**
The current priority is perfecting the surface syntax ergonomics.
Once the DSL is finalized, the backend will leverage `std/fixpoint/fixpoint-memo.kk` to iterate relations to a fixed point.
