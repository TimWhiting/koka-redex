# Paper Outline: Typed Rule Schemas for Program Analysis in Koka

## Working Title
Typed Rule Schemas with Demand-Driven Tabled Resolution in Koka

## Core Thesis
A single typed rule representation, combined with Koka's implicits and algebraic effects, can drive demand-driven tabled resolution — with per-relation lattice policies, external solver dispatch, and abstract domain interning — where execution strategy, memo behavior, and rendering are all derived from the type-level rule structure.

---

## 1. Abstract
- **Problem:** Program analyses are specified as declarative inference rules but executed by custom fixpoint engines. The gap between specification and implementation causes bugs and duplication. Different analyses need different execution strategies, lattice policies, and external operations, but frameworks typically hardcode these choices.
- **Approach:** We present a framework in Koka where analysis relations are encoded as typed rule schemas (`rule<n,p,c>`). Per-relation lattice policies and external solvers are resolved via implicits. A demand-driven tabled resolution engine handles the execution: goal-directed rule selection with forward premise evaluation, memoized fixpoint iteration, and microkanren-style unification as an algebraic effect. Domain types are described by constructor descriptors (`con-info`) from which term encoding, rendering, and show functions are auto-derived. Abstract domains (stores, environments) can be interned as opaque references for O(1) comparison.
- **Results:** We demonstrate 0CFA with collecting semantics, type inference with unification, and reachability — all from the same rule representation, with LaTeX/Markdown rendering derived from the same type structure.

---

## 2. Introduction and Motivation (1 page)

### 2.1 The Specification-Implementation Gap
- Analysis rules are naturally declarative (inference rules, Horn clauses)
- Execution requires: fixpoint iteration, lattice joins, memoization, unification, external operations
- Each analysis re-implements this machinery
- **Observation:** The typed rule structure contains enough information to derive execution behavior

### 2.2 Demand-Driven Tabled Resolution
- **Goal-directed**: starts from a query, selects matching rules by unifying with conclusions (like SLG/Prolog)
- **Syntax-directed premise reordering**: after unifying the goal with a rule's conclusion, the engine resolves all premises and evaluates the most-grounded first. After each premise evaluation, remaining premises are re-sorted with new bindings. This maximizes syntax-directed evaluation — the user writes premises in any order for clarity, the engine finds the optimal data-flow order automatically
- **Tabled with continuation resumption**: recursive calls go through `memo`/`depend`/`add-result`. When a sub-goal discovers a new answer, **all dependent computations re-execute** with the new result — this provides complete backtracking across premises without explicit choice points
- **Implicit demand propagation**: goal-directed evaluation naturally computes only what's needed, achieving the same selectivity as Datalog's magic sets transformation without a program transformation step
- **Delayed variable binding**: when a premise contains unbound variables, the engine proceeds with them as unresolved — they get bound later through unification with subsequent premise results. The memo key canonicalizes unbound variables (`normalize-fact`), so parametric computations share table entries
- **External dispatch**: some premises are computed by Koka functions (store lookup, unification, store extension) rather than rule search

### 2.3 Relationship to SLG and Magic Sets
Our approach occupies a middle ground between SLG resolution (top-down, tabled) and magic-sets-transformed Datalog (bottom-up, demand-driven):

- **SLG resolution** (XSB Prolog): goal-directed with answer completion. When a tabled goal is encountered, it suspends; when answers arrive, suspended computations resume. Our `memo`/`depend`/`add-result` mechanism is the algebraic-effect equivalent of SLG's suspension/resumption. The key difference: SLG operates at the clause level, we operate at the premise level — each premise evaluation can independently table and resume.

- **Magic sets**: a source-to-source transformation that adds "demand" predicates to Datalog rules, restricting bottom-up evaluation to facts reachable from the query. Our goal-directed evaluation achieves this implicitly — the query determines which sub-goals get evaluated, and tabling prevents redundant work. No transformation step needed.

- **Completeness**: for the stratified Datalog fragment (no negation, finite domains), our engine is complete — the tabled fixpoint converges to the same results as bottom-up evaluation. The continuation resumption mechanism ensures that all answers are discovered regardless of premise evaluation order.

### 2.4 What We Support
- **Fully ground queries**: `reach(1, 4)` — deterministic yes/no
- **Partial queries**: `reach(1, ?)` — discover all reachable nodes from 1
- **Open queries**: `reach(?, ?)` — discover all reachable pairs
- **Complete backtracking**: via tabled continuation resumption — when a sub-goal gets a new answer, all dependents re-fire automatically
- **Delayed variable resolution**: unbound variables in premises persist as parametric queries until later premises or continuation resumption binds them
- **Over-approximation via lattice fixpoint**: 0CFA where multiple values flow to the same variable
- **Unification as external relation**: type inference where type variables are resolved via microkanren unification (algebraic effect)
- **Interned abstract domains**: stores as opaque references with O(1) comparison

### 2.5 What We Don't (Yet) Support
- Explicit choice points / Prolog-style cut (our backtracking is implicit via tabling, not manually controllable)
- Well-founded or stratified negation
- Constraint handling rules (CHR) — though the combination of unification + tabled fixpoint provides a form of constraint propagation
- Automatic mode inference from type annotations

### 2.5 Contributions
1. Typed rule schemas where execution behavior is derived from type-level structure via implicits
2. Demand-driven tabled resolution combining goal-directed selection with forward premise evaluation
3. Microkanren-style unification expressed as an algebraic effect (novel in the effects literature)
4. Per-relation lattice policies derived from relation marker types
5. Constructor descriptors (`con-info`) enabling auto-derivation of term encoding, decoding, show, and per-backend rendering (LaTeX/Markdown)
6. First-class intern pools for abstract domains via named handler values
7. Demonstrations on three qualitatively different analyses

---

## 3. Framework Architecture (1.5 pages)

### 3.1 Rule Representation (`syntax.kk`)
- `rule<n,p,c>`: name, premises (type-indexed heterogeneous list), conclusion
- `relation-def<r>`: generic wrapper for rule sets including external solvers
- Natural syntax via operators: `e1 \ s |- REval \ v \ s'` for judgement chains, `\\` for premise separation, `--- "name" -->` for rule lines
- Rules are values — inspectable, renderable, compilable to different backends

### 3.2 Constructor Descriptors and Auto-Derivation (`con-info`, `derive.kk`)
- `con-info<tag, fields, whole>`: phantom-tagged constructor descriptor
- Auto-derive `to-term`, `from-term`, `show` from type-info traversal
- Per-backend rendering via `render-latex`/`render-md` with type-safe t-cons field destructuring
- `field-witness<b>` for structurally-driven implicit resolution
- Cross-module recursion via `val n/to-term = expr/to-term` trick

### 3.3 The Engine (`forward.kk`)
- `forward-eval(goal, rules, ?external, ?memo-key)`: core evaluation loop
- Rule matching: freshen rule, unify goal with conclusion, evaluate premises left-to-right
- Tabling: `memo(key)` from `fixpoint-memo`. On first encounter, evaluates and caches. On re-encounter, returns cached results AND registers a dependency — when new answers arrive, the continuation resumes with the new answer. This is the algebraic-effect encoding of SLG's suspension/resumption mechanism.
- Nondeterminism: `do-each(branches)` explores all matching rules and external solver results
- `normalize-fact`: canonicalize unbound variables in memo keys preserving variable sharing (`reach(X,X)` → `reach(_0,_0)` distinct from `reach(X,Y)` → `reach(_0,_1)`)
- Per-relation lattice: `?join-policy` implicit on relation markers, dispatched by predicate name. `set-join` (default — collect all distinct results), `single-join` (deterministic — error on multiple distinct results)
- **Completeness argument**: every rule is tried for every goal (via `do-each`). Every tabled answer triggers dependent resumption. The lattice fixpoint terminates when no new answers are produced. For finite domains, this is complete.

### 3.4 The Bridge (`forward-bridge.kk`)
- Compiles typed `relation-def<r>` to `list<rule>` + external solver + memo-key
- Implicit chain: `?to-fact-args` walks the judgement chain, detects relation markers, splits inputs/outputs
- `?derive-keys` and `?derive-policies` extract memo-key configuration and lattice policies from the rule structure
- External solvers: `?from-inputs` / `?to-outputs` unwrap/wrap domain values for typed external functions

### 3.5 External Relations and Interning
- External relations: Koka functions for operations better computed than searched (lookup, unification, inequality, store extension)
- `ref-pool<a>`: first-class named handler value for interning domain values as opaque `TRef(id)` terms
- Engine treats `TRef` as ground — O(1) equality, never walked into by unification
- External solvers dereference through the pool to operate on real domain values

### 3.6 Rendering (`latex.kk`, `markdown.kk`)
- Rule rendering: walks the type-level rule structure via `show-latex` / `show-md` implicits
- Pattern rendering: `pat/show-latex` dispatches PatVar → metavar name, PatTerm → term renderer
- Term rendering: derived from type-info with per-constructor format functions per backend
- Return-type dispatch: `latex-entry` vs `md-entry` drives which `map-field` overloads `to-list` resolves

---

## 4. Running Examples (2 pages)

### 4.1 Reachability (0.5 page)
- Ground, partial, and open queries
- Demonstrates: tabling, normalization (variable canonicalization), lattice dedup
- Tests verify no duplicates across all query types

### 4.2 0CFA with Collecting Semantics (1 page)
- **Structural version**: `EVar(string)`, `ELam(string, expr)`, store as custom ADT
  - Store-passing rules: `e \ s |- REval \ v \ s'`
  - Store lookup as external relation
  - Over-approximation: `let f = id in (f a)(f b)` produces `{λa.a, λb.b}` for `x`
- **Interned version**: store as `list<(string, expr)>`, interned via `ref-pool`
  - Same rules, same results
  - Stores appear as `#0`, `#2`, `#3` in memo table — opaque references
  - Store extension as external solver (dereference, extend, re-intern)
- **The ADI connection**: same rules as concrete evaluation + set-join lattice + fixpoint = abstract interpreter

### 4.3 Type Inference with Unification (0.5 page)
- Forward: T-Int, T-Var (lookup), T-Lam — syntax-directed rule selection
- Backward: T-App uses unification as external relation — resolve `t1 = t2 → a`
- Unification via `logic.kk` algebraic effect — `unify`, `resolve`, `freshv`
- `(λx.x) 42 : Int`, `(λf.λx.f x)(λy.y) 42 : Int`

---

## 5. The Role of Algebraic Effects and Implicits (0.5 page)

### Effects
- **`logic`**: unification, variable resolution, fresh generation, save/restore
- **`cache`** (from `fixpoint-memo`): memo/depend/add-result/do-each for tabled fixpoint
- **`ref-pool`**: named handler — first-class value, no effect in caller types
- These compose: the engine uses `cache` + `logic` together; external solvers can use `logic` for unification

### Implicits
- **Per-type dispatch**: `?to-term`, `?from-term`, `?show-latex`, `?render-latex` resolve by argument type
- **Per-relation dispatch**: `?judgment-name`, `?join-policy` resolve by relation marker type
- **Per-backend dispatch**: `latex-entry` vs `md-entry` return types drive rendering overload selection
- **Recursive implicits**: `val n/to-term = expr/to-term` trick for cross-module self-reference

---

## 6. Related Work (0.75 page)
- **PLT Redex**: Rule-based reduction semantics with rendering (typesetting). No fixpoint, tabling, or lattice abstraction — analyses requiring iteration must be hand-coded. Uses Racket macros for ergonomics where we use typed implicits and algebraic effects. We share the "one specification, multiple uses" goal (execution + rendering).
- **Datalog/Soufflé**: Bottom-up forward-chaining with lattice joins. Complete for its fragment but requires magic sets transformation for demand-driven evaluation — our goal-directed tabling achieves this implicitly. No unification, no external solver dispatch.
- **XSB Prolog / SLG resolution**: The closest relative. SLG provides demand-driven tabling with answer completion — our `memo`/`depend`/`add-result` is the algebraic-effect encoding of SLG's suspension/resumption. Key differences: (1) we add per-relation lattice policies (SLG uses set-of-answers), (2) we compose external Koka solvers alongside rules (SLG is pure LP), (3) our type-level rule encoding enables auto-derivation of memo keys, rendering, and term encoding.
- **Magic sets**: a program transformation achieving demand-driven evaluation for bottom-up engines. Our approach achieves the same selectivity directly through goal-directed evaluation — no transformation step. The relationship: magic sets is to Datalog what our goal-directed tabling is to SLG — both bridge the top-down/bottom-up gap, from opposite directions.
- **Formulog/Flix**: Datalog extended with functions (Formulog) or lattice types (Flix). Richer than pure Datalog but committed to bottom-up stratified evaluation. No demand-driven tabling, no unification as a first-class operation.
- **miniKanren/microKanren**: Stream-based relational programming with unification. We express the same unification primitives (`unify`, `walk`, `fresh`) as algebraic effects with handlers — to our knowledge novel in the effects literature. Our tabling adds memoization that miniKanren lacks.
- **AAM/ADI (Van Horn & Might)**: Abstracting abstract machines / definitional interpreters. Our 0CFA directly realizes the ADI pattern: concrete bigstep evaluation rules + set-join lattice + tabled fixpoint = collecting abstract interpreter. The framework makes this connection explicit and automatic.

## 7. Limitations and Future Work (0.5 page)
- **No negation**: well-founded or stratified negation is not yet supported. SLG handles this; extending our algebraic-effect encoding to support it is future work.
- **No cut / explicit control**: backtracking is implicit via tabling — the user cannot control search order or prune branches. For most program analyses this is fine; for general LP it's a limitation.
- **Intern pool scalability**: current pools use linear search for dedup. Integer patricia tries or nested maps (with type-level field ordering) would give O(log n) interning.
- **Hash-consing all terms**: currently only abstract domains use `TRef`. Full hash-consing (all terms interned) would give O(1) equality everywhere and enable e-graph integration (union-find over term ids + congruence closure as an external solver).
- **Polymorphic type inference**: HM-style generalization/instantiation not yet supported — requires let-polymorphism with constraint generation.
- **Automatic mode inference**: memo-key derivation and input/output classification could be derived from type-level annotations on relation arguments.

## 8. Conclusion (0.25 page)
- One typed rule representation serves multiple analyses with different execution needs
- Koka's implicits and algebraic effects bridge the specification-implementation gap
- Demand-driven tabled resolution with per-relation policies covers a wide range of program analyses
- Constructor descriptors unify term encoding, rendering, and abstract domain interning
- Demonstrated on evaluation, 0CFA, and type inference

---

## Figures
1. Architecture diagram: Rules → Bridge (implicits) → Engine (tabled resolution) → Fixpoint (memo/lattice)
2. LaTeX rendering of CFA rules (auto-derived)
3. Memo table for 0CFA showing over-approximation with `TRef` store ids
4. Type inference: forward rule selection + backward unification in same derivation

## Code Size
- `term.kk` — ~140 lines (types + ref-pool + primitives)
- `logic.kk` — ~170 lines (unification effect)
- `forward.kk` — ~170 lines (tabled resolution + lattice policies)
- `forward-bridge.kk` — ~400 lines (typed rule compilation)
- `syntax.kk` — ~130 lines (rule encoding + external builders)
- `derive.kk` — ~340 lines (auto-derivation of to-term/from-term/render)
- `pattern/cfa.kk` — ~250 lines (complete 0CFA example with rendering)
- `pattern/cfa-interned.kk` — ~190 lines (0CFA with interned stores)
