# Short Paper Outline: Typed Rule Organization for Static Analysis in Koka

## Working Title
From Typed Rule Schemas to Goal-Directed 0CFA in Koka

## 1. Abstract (1 paragraph)
- Problem: control flow analyses are often specified declaratively, but fixpoint computations are hand-wired with custom lattice joins.
- Idea: use type-level rule organization (`relation-def`) as the single source of truth and derive fixpoint analysis directly.
- Approach: connect typed analysis relations to a memoized iterative engine with per-relation lattice policies over abstract values.
- Result: concise demos show direct derivation of 0CFA from lambda calculus relation rules and practical control over lattice semantics.
- Contribution claim: one framework supports readable analysis rule declarations, generated fixpoint computation, and configurable lattice policies.

## 2. Introduction and Motivation (0.5-1 page)
### 2.1 Pain Point
- Analysis specifications and fixpoint engines drift apart.
- Manual translation of analysis rules to join-based computation duplicates structure and introduces bugs.
- Each analysis variant requires custom lattice wiring.

### 2.2 Key Insight
- The type-level organization of analysis relations already contains enough structure to derive fixpoint computation.
- If analysis relations are typed with their abstract domains, lattice policies (join behavior, widening) can also be typed and attached by relation.

### 2.3 Contributions (explicit list)
- A typed relation representation for static analyses in Koka.
- A bridge from typed `relation-def` structure to fixpoint engine execution.
- A memoized iterative backend with per-relation lattice policies over abstract values.
- Demonstration on 0CFA for lambda calculus plus smaller reachability examples.

## 3. Framework Overview (0.5 page)
### 3.1 Components
- Analysis rules: `koka-redex/syntax` (lambda calculus + analysis relations).
- Fixpoint engine: `koka-redex/proof-search` (adapted for value lattices).
- Bridge: `koka-redex/proof-search-bridge` (derive analysis from relation structure).
- Policy layer: `koka-redex/proof-search-policy` (lattice join behavior per relation).

### 3.2 End-to-End Flow
1. Declare analysis relations with `relation-def` over abstract value types.
2. Provide relation lattice policies (power set, set union, widening strategies).
3. Run `search-memo/relation` on analysis goals until fixpoint.
4. Obtain analysis result (set of possible values at each point).

## 4. Core Technical Design (1-1.5 pages)
### 4.1 Typed Rule Organization
- `rule<n,p,c>` and `relation-def<r>` encode rule sets at the type level.
- Premise lists and relation composition are represented structurally.

### 4.2 Analysis Semantics
- Dataflow computation: compute abstract values for each program point using rule premises.
- Unification and substitution for matching patterns against abstract values.
- Fixpoint iteration: replay rules until all abstract value sets stabilize.
- Memoization: cache analysis results (abstract value sets) indexed by program location.

### 4.3 Abstract Value Lattice Policies
- Lattice choice per relation: power set of lambda values, power set of expressions, etc.
- Join operation: set union determines when new values are discovered.
- Iteration strategy: ruled-based fixpoint (forward chaining) until no changes.
- Typed policy interface (`value-lattice`, `rel-fixpoint-policy`) for ergonomic lattice specification.

### 4.4 Bridge and Implicits
- Deriving executable search rules from typed relation structure.
- Practical note: some call sites may need explicit implicit-parameter disambiguation.

## 5. Running Example: 0CFA for Lambda Calculus (1 page)
### 5.1 Rule Fragment
- Analyze abstract values at each call site.
- Core relations: `analyze-app` (function can be called at a call site), `analyze-expr` (expression can evaluate to a value).
- Three rules: 
  - Rule A: If `fun` can evaluate at call site, trace to its body.  
  - Rule B: Lambda expressions are values.
  - Rule C: Function application: if `e1` evaluates to `\x.e` and `e2` evaluates to `v`, then `e1 e2` evaluates to result of `e[x := v]`.

### 5.2 Query
- Example: analyze `(\x. x) (\z. z)` — which function values flow to the application site?

### 5.3 Derived Analysis
- Show one iteration of the fixpoint: abstract values computed by `search-memo/relation`.
- Emphasize that lattice structure (set of lambda values) is reused directly rather than custom join code.

## 6. Evaluation Plan for a Short Paper (0.5-1 page)
- Qualitative:
  - Conciseness of specification (analysis-rule lines vs manual fixpoint-loop lines).
  - Readability and maintainability (single source of truth).
- Functional:
  - Correct analysis results on 0CFA examples (function sets match expected sets).
  - Fixpoint convergence on recursive lambda expressions.
- Performance sanity:
  - Iteration count and time to fixpoint vs hand-coded 0CFA on small benchmarks.
  - Impact of memoization on convergence speed.

## 7. Related Work (0.5 page)
- Dataflow analysis frameworks (DFA) and constraint-based approaches.
- Classical 0CFA / k-CFA literature (Shivers, Might et al.).
- Logic programming approaches to static analysis (tabled resolution for fixpoint).
- Declarative analysis languages and tools (Datalog, Soufflé, Formulog, Flix).
- Positioning: typed rule organization plus configurable lattice policies in a lightweight Koka setting, bridging declarative specs and executable engines.

## 8. Limitations and Threats to Validity (0.25-0.5 page)
- Current demos are on small lambda calculus fragments; larger program analyses pending.
- 0CFA is a well-understood baseline; comparison to more sophisticated analyses (k-CFA, type-guided) is future work.
- Some analysis patterns (widening, abstract domain design) still may require manual tuning.
- Scalability to realistic program sizes and rule sets is not yet evaluated.

## 9. Conclusion (short)
- Restate main claim: typed analysis rule declarations can drive practical, goal-directed fixpoint computation with lattice policy control.
- Immediate next step: expand to interprocedural 0CFA and add comparison with hand-coded reference implementations.

## Appendix Ideas (optional)
- Full rule listings for 0CFA subset on lambda calculus.
- Extra fixpoint iterations and convergence traces.
- API quick reference for `relation-def`, lattice policies, and value domain specifications.

## Writing Checklist
- Keep contributions refutable and concrete.
- Include one diagram of the pipeline (rules -> bridge -> search -> proof).
- Use one running example consistently across sections.
- State what is implemented now vs future work.
