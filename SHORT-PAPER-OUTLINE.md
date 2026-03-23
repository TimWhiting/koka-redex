# Paper Outline: Typed Rule Schemas for Program Analysis in Koka

## Working Title
Typed Rule Schemas with Forward-First Execution for Program Analysis in Koka

## Core Thesis
A single typed rule representation, combined with Koka's implicits and effect handlers, can drive both forward-chaining (syntax-directed) and backward-chaining (goal-directed) program analysis — with per-relation lattice policies, external relation dispatch, and memoized fixpoint computation selected automatically via the type system.

---

## 1. Abstract (1 paragraph)
- **Problem:** Program analyses are specified as declarative rules but executed by hand-wired fixpoint engines with custom lattice joins. The gap between specification and implementation is a source of bugs and duplication. Moreover, different analyses need different execution strategies (forward vs backward), but frameworks typically commit to one.
- **Approach:** We present a framework in Koka where analysis relations are encoded at the type level using `rule<n,p,c>` and `relation-def<r>`. Per-relation policies (lattice join, memoization key, execution mode) are resolved via Koka's implicit parameters. A forward-chaining engine handles syntax-directed analyses; a backward-chaining engine handles goal-directed search; external Koka functions handle pure-functional relations. The framework selects the right execution strategy per-premise.
- **Results:** We demonstrate bigstep evaluation (backward), 0CFA with collecting semantics (forward + fixpoint), and simple type inference with unification (forward + backward) — all from the same rule representation.

---

## 2. Introduction and Motivation (1 page)

### 2.1 The Specification-Implementation Gap
- Analysis rules are naturally declarative (inference rules, Horn clauses)
- But execution requires: fixpoint iteration, lattice joins, memoization, substitution threading, nondeterminism handling
- Each new analysis re-implements this machinery
- **Observation:** The rule structure already contains enough information to determine execution strategy

### 2.2 The Forward-Backward Tension
- Some analyses are syntax-directed: the expression structure determines the rule (evaluation, CFA, type checking). These should run forward.
- Some need search: type inference unification, proof search, instance resolution. These need backward reasoning.
- Most real analyses COMBINE both (e.g., type inference: forward rule selection + backward unification)
- Existing frameworks commit to one mode (Datalog = forward, Prolog = backward, PLT Redex = pattern matching)

### 2.3 Our Approach
- **One rule representation** (`rule<n,p,c>`) for all analyses
- **Type-level metadata** determines execution: input/output modes on relation arguments, per-relation lattice policies
- **Implicits** resolve the right engine, lattice, and external solver per relation
- **Effects** provide the computational infrastructure: memoization via `fixpoint-memo`, nondeterminism via `each`/`do-each`, fresh variable generation via `fresh-id`

### 2.4 Contributions
1. A typed rule representation where premises, conclusions, and relation metadata are encoded at the type level, enabling implicit derivation of execution behavior
2. A forward-first execution model: syntax-directed forward chaining with memoized fixpoint, falling back to backward chaining or external solvers per-premise
3. Per-relation lattice policies (`nondet-set`, `det-first`, `det-error`) resolved via typed implicit parameters (`pred-tag<r>`, `rel-memo-lattice<r>`)
4. External relation dispatch: pure Koka functions (unification, inequality, store operations) plugged in alongside rule-based relations via implicits
5. Demonstrations on three qualitatively different analyses from the same framework

---

## 3. Framework Architecture (1.5 pages)

### 3.1 Rule Representation (`syntax.kk`)
- `rule<n,p,c>`: name, premises (type-indexed list), conclusion
- `relation-def<r>`: generic wrapper for rule sets
- Premise lists via type-level cons: `a \ b \ c` builds `type-cons<a, type-cons<b, c>>`
- **Key property:** The rule structure is a *value* — it can be inspected, rendered (LaTeX/Markdown), and compiled to different engines

```koka
// Example: bigstep evaluation rules
fun eval-rules()
  with relation-def
  with rule(TNil, "E-Lam", eval(lam(x,e), lam(x,e)))
  single/rule(
    eval(e1, lam(x,e3)) \ eval(e2, v1) \ subst(e3,x,v1,e4) \ eval(e4, v2),
    "E-App", eval(app(e1,e2), v2))
```

### 3.2 The Bridge: From Types to Execution (`proof-search-bridge.kk`)
- Implicit `?to-premises`, `?to-fact`, `?map-field` convert typed rules to engine format
- `relation/to-search-rules` derives executable rules from `relation-def`
- **The implicit resolution chain:** user writes typed rules → bridge resolves conversions → engine receives `list<rule>` with `list<fact>` premises/conclusions

### 3.3 Policy Layer (`proof-search-policy.kk`)
- `pred-tag<r>` — phantom-typed predicate tag (carries runtime name + compile-time type)
- `rel-memo-lattice<r>` — per-relation lattice policy (resolved via implicit on `r`)
- `policy/of(tag)` — materializes a `relation-policy` from typed tag + implicit lattice
- **Example:** Declaring `val eval/rel-memo-lattice = Rel-memo-lattice(nondet-set())` makes ALL uses of `eval` automatically use `nondet-set` — no manual wiring

### 3.4 Execution Engines

#### Forward Engine (`forward.kk`) — for syntax-directed analyses
- Given input positions of a goal, find matching rules by unifying the conclusion
- Execute premises left-to-right, each output feeds the next input
- Recursive calls go through `memo(key)` from `fixpoint-memo` — provides fixpoint iteration
- External relations (lookup, unify, neq) dispatched via `?external` implicit
- Nondeterminism via `each`/`do-each` from the cache effect
- **Memo key:** `?memo-key` implicit extracts only input positions → output discovered by fixpoint

#### Backward Engine (`proof-search.kk`) — for goal-directed search
- Backward-chaining with unification and substitution threading
- Memoized via `fixpoint-memo` for ground goals
- DFS with depth bounding for non-ground goals
- External solver `?external` for per-premise dispatch
- **Same rule format** as forward engine — the user doesn't choose the engine, the framework does

### 3.5 External Relations
- Some relations are better computed in Koka than searched via rules
- `neq(a, b)` — structural inequality check
- `lookup(store, name, value)` — store/environment lookup returning all matches
- `unify(type1, type2)` — type unification constraint solving
- Plugged in via `?external: (fact) -> maybe<list<fact>>` — returns `Nothing` (not handled) or `Just(solutions)`
- **Connection to implicits:** In the typed layer, each relation's solver could be an implicit — `?solve: pred-tag<r> -> solver<r>`. Currently uses a single dispatch function; the typed version is future work.

---

## 4. Running Examples (2-2.5 pages)

### 4.1 Reachability: Backward Search with Memoization (0.5 page)
- Ground relations: `edge(a,b)`, `reach(a,b)` with Horn clause rules
- Demonstrates: backward-chaining, memoization, per-relation lattice policies
- `nondet-set` on reach, `det-error` on edge
- Output: proof tree for `reach(1,4)`

### 4.2 0CFA: Forward-Chaining with Fixpoint (1 page)
- Store-passing bigstep rules: `eval(expr, store, value, store')`
- `?memo-key` extracts `(expr, store)` — output discovered by fixpoint
- Store lookup as external relation returning all bindings
- **The ADI connection:** Same rule structure as concrete evaluation, but `nondet-set` lattice + fixpoint = collecting abstract interpreter
- `let f = λx.x in (f λa.a)(f λb.b)` shows over-approximation: `eval(var(x), ...) => {λa.a, λb.b}`
- **Explain the fixpoint machinery here** — `memo`/`depend`/`add-result`/`do-each` and how they compose for demand-driven iteration

### 4.3 Type Inference: Forward + Backward Combined (1 page)
- T-Int, T-Var, T-Lam: forward (syntax-directed rule selection)
- T-App: forward for subexpression typing, THEN unification as external relation (backward constraint solving)
- Fresh type variables arise naturally from rule freshening (standardize-apart)
- `(λx.x) 42 : Int` — unify(α→α, Int→β) resolves α=Int
- `(λf.λx.f x)(λy.y) 42 : Int` — nested unification across rule applications
- **Key observation:** Typeclass/instance constraints and type unification constraints are both solved by the same mechanism — backward search / unification on premises. The framework unifies these naturally.

---

## 7. The Role of Implicits and Type-Level Programming (0.5-1 page)

### 7.1 What Implicits Buy Us
- **Per-relation policy resolution:** `rel-memo-lattice<r>` resolved by the type of `r`. No manual policy tables.
- **Bridge generation:** `?to-premises`, `?to-fact` resolved per rule structure. User writes typed rules, framework converts.
- **External dispatch:** `?external` selected per analysis. Different analyses plug in different solvers.
- **Execution mode selection:** (Future) `?execute: relation -> forward | backward` resolved per relation type.

### 7.2 What Type-Level Programming Buys Us
- `rule<n,p,c>` — premises and conclusions carry their types. The bridge inspects the type structure to generate conversions.
- `type-cons`/`type-nil` premise lists — structural traversal via `to-list` generates correct premise extraction.
- `relation-def<r>` — the type `r` determines the rule set's structure. Multiple `relation-def`s compose.

### 7.3 Future: Auto-Derivation from Type Structure
- Input/output modes as type-level markers on relation arguments
- Auto-derive `?memo-key` from mode annotations
- Auto-derive forward vs backward execution from mode analysis
- Auto-derive external solver dispatch from relation type tags
- **Vision:** Write typed rules + annotate modes → framework generates the complete analysis engine

---

## 8. Related Work (0.5 page)
- **PLT Redex:** Rule-based reduction semantics in Racket using S-expression patterns. Provides rendering (typeset rules), random testing, trace exploration. Does not provide fixpoint computation, lattice-based abstraction, or memoized search — analyses requiring iteration must be hand-coded. Uses macros for ergonomics where we use typed implicits.
- **Datalog/Soufflé:** Forward-chaining with lattice joins. Fixed execution model. No backward search, no external relations, no type-level rule encoding.
- **Prolog/tabled LP (XSB, SLG):** Backward-chaining with tabling. No per-relation lattice policies. No typed implicit dispatch.
- **Formulog/Flix:** Combine Datalog with functions/lattices. Richer than pure Datalog but still commit to forward chaining. No implicit-driven policy selection.
- **AAM/ADI (Van Horn & Might):** Abstracting abstract machines / definitional interpreters. Our framework can express the ADI pattern from typed rules. The connection between rule declarations and memoized interpreters is our contribution.
- **Koka effects literature:** We build on `fixpoint-memo` for demand-driven fixpoint. The `each`/`depend`/`add-result` pattern enables nondeterministic forward chaining. The framework shows these effects compose with typed implicits for analysis-specific dispatch.

## 9. Limitations and Future Work (0.5 page)
- **Store-passing scalability:** Memo keys grow with store size. Hash-consing or external state would help.
- **Polymorphic type inference:** Memoizing types with free variables requires generalization/instantiation (HM-style). Not yet handled.
- **Automatic mode inference:** Currently the user provides `?memo-key` and `?external`. These should be derivable from type-level mode annotations.
- **Choose-based backtracking:** DFS doesn't backtrack across premises. Full `choose` (microkanren-style) would enable complete search.
- **Performance:** The term-based representation adds overhead vs direct Koka. For large analyses, a compiled/specialized backend would be needed.
- **Capture-avoiding substitution:** Currently handled by store-passing (avoiding subst entirely) or external relation. A proper effect-based substitution handler is future work.

## 10. Conclusion (0.25 page)
- One typed rule representation serves multiple execution strategies
- Koka's implicits resolve per-relation policies without boilerplate
- Forward-first execution with backward fallback covers a wide range of analyses
- The framework bridges the gap between declarative rule specifications and efficient fixpoint engines
- Demonstrated on evaluation, 0CFA, and type inference — three qualitatively different analyses

---

## Figures / Diagrams
1. **Architecture diagram:** Rules → Bridge (implicits) → Engine (forward/backward) → Fixpoint (memo/lattice)
2. **Rule rendering:** LaTeX output of eval rules (already implemented)
3. **Memo table:** 0CFA example showing over-approximation entries
4. **Type inference derivation:** Forward rule selection + backward unification in the same tree

## Code Artifacts
- `syntax.kk` — rule representation (~30 lines)
- `proof-search-bridge.kk` — implicit bridge (~70 lines)
- `proof-search-policy.kk` — typed policy layer (~55 lines)
- `proof-search.kk` — backward engine (~600 lines)
- `forward.kk` — forward engine (~90 lines)
- `cfa-forward-demo.kk` — 0CFA from rules (~100 lines)
- `type-infer-demo.kk` — type inference from rules (~170 lines)
