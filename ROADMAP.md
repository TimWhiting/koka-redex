# Koka Redex: Architecture & Roadmap

## Executive Summary

**Current State (March 2026):** A working memoized proof-search engine with configurable depth policies and multi-relation support.

**Next Phase Goal:** Decouple the ergonomic surface layer (how users write analyses/relations) from the minimal core search engine, using implicits and effects to compile user intent down to the common framework.

**Key Insight:** The search machinery should remain minimal (100-150 lines of core logic, rest is lattice policies). Domain-specific features (logic variables, substitution strategies, capture-avoiding renamings) layer on top via implicit conversions and effect handlers.

---

## Part 1: Current Architecture

### Core Search Engine (`koka-redex/proof-search.kk`)
**Responsibility:** Backward-chaining goal-directed search with memoization.

**Key Components:**
- **Unification:** Pattern matching with occurs-check, substitution threading
- **Depth Control:** Three modes (Trusted, ResetPerGoal, Hybrid) for recursion management
- **Memoization:** Per-relation lattice-based fixpoint over ground goals
- **Fallback for Non-Ground:** DFS with depth-bounded search for non-ground premises

**Invariants:**
- Variable renaming (standardize-apart) on every rule application
- Ground-loop prevention via `seen-ground` list
- Depth budget prevents unbounded recursion

**Size:** ~550 lines. Should stay this size or grow minimally.

### Policy Layer (`koka-redex/proof-search-policy.kk`)
**Responsibility:** Attach per-relation lattice behavior and depth strategies.

**Current Features:**
- Typed predicate tags (`pred-tag<r>`) for implicit lattice resolution
- Per-relation memo lattice (nondet-set, det-error, det-first)
- Depth mode selection (DepthTrusted, DepthResetPerGoal, DepthHybrid)

**Size:** ~50 lines. Minimal, by design.

### Bridge Layer (`koka-redex/proof-search-bridge.kk`)
**Responsibility:** Convert typed rule structures to search engine format.

**Current Features:**
- `fact/to-premises`, `tcons/to-premises`, `tnil/to-premises` for implicit premise extraction
- `relation/to-search-rules` deriving search rules from type-level rule definitions
- Helper conversions for common patterns

**Size:** ~60 lines. Extensible for new domain types.

### Rule Representation (`koka-redex/syntax.kk`)
**Responsibility:** Type-level encoding of rule sets.

**Current Design:**
- `rule<n,p,c>` where n=name, p=premises (type-indexed), c=conclusion
- `relation-def<r>` as a generic wrapper for any rule structure
- `cons/rule` and `single/rule` for building type-safe rule lists

**Limitation:** Fairly generic; doesn't capture domain semantics (eval rules vs type rules vs reachability rules).

---

## Part 2: What's Currently Supported

### ✓ Working Cases

1. **Ground Relations (Simple Derivation)**
   - Example: `reach(a, c)` from facts + rules
   - All subgoals are ground (e.g., `edge(a, b)`)
   - Demo: [examples/proof-search-demo.kk](examples/proof-search-demo.kk)

2. **Multi-Premise Rules with Memoization**
   - Rules with up to N premises, all eventually ground after substitution
   - Memo table prevents infinite cycles
   - Demo: [examples/debug-depth.kk](examples/debug-depth.kk)

3. **Configurable Depth Policies**
   - DepthTrusted: no depth limit (rely on goal state finiteness)
   - DepthResetPerGoal: resets depth counter per relation goal entry
   - DepthHybrid: memo doesn't decrement, DFS does (current best-practice)
   - Demo: [examples/proof-search-depth-modes-demo.kk](examples/proof-search-depth-modes-demo.kk)

4. **Type-Level Rule Organization**
   - Implicit derivation of search rules from typed relations
   - Per-relation lattice policies
   - Demo: [examples/proof-search-implicit-policy-demo.kk](examples/proof-search-implicit-policy-demo.kk)

### ✗ Not Currently Supported (Or Partial)

1. **Direct Untyped-BigStep Formalism**
   - Currently need `Fact("eval", [...])` wrapper around lambda calculus terms
   - **Desired:** Write `eval(app(id, arg), result)` directly using implicit conversions
   - Blocker: No automatic bridging from domain types to the `fact` representation

2. **Logic Variables with Proper Scoping**
   - Current approach: free `TVar` threading through substitutions
   - **Desired:** First-class logic variables like microkanren (with gensym, delayed unification)
   - Blocker: Substitution mechanism is eager; no support for choice points / backtracking

3. **Capture-Avoiding Substitution**
   - Current: Simple substitution apply, freeness checking via occurs-check
   - **Desired:** Automatic renaming of bound variables in lambda bodies to avoid capture
   - Known: Implemented in `freshen-rule`, but not used for term substitution
   - Blocker: No generic framework for capture-avoiding; would need effect handler

4. **Backtracking & Non-Deterministic Search**
   - Current: Memoization collects all proofs; no choice point support
   - **Desired:** Structured choice with cut, soft cut, probabilistic selection
   - Blocker: Would conflict with memoization assumptions (memo stores final set, not lazy stream)

5. **Effects & Custom Search Behavior**
   - Current: Search is pure (mostly); policies are inert data
   - **Desired:** Let policies inject custom behavior (e.g., constraint checking, trace logging)
   - Blocker: Memo lattice is opaque; hard to inject effects mid-search

---

## Part 3: Proposed Architecture Evolution

### Phase A: Direct Domain Term Representation (High-Impact, Low-Risk)

**Goal:** Allow users to write `eval(λx.x, λx.x)` instead of `Fact("eval", [TNode("lam", ...)])`.

**Approach:** Use implicit conversions to bridge domain terms to search facts while preserving type-level rule structure.

**Example Pattern:**

```koka
// User writes this (in their domain file):
type eval-term
  evar(name: string)
  elam(param: string, body: eval-term)
  eapp(fn: eval-term, arg: eval-term)

// Bridge implicitly converts to search fact:
pub fun eval-term/to-fact(e: eval-term, v: eval-term): fact
  ... // encode as Fact structures

// User queries like this:
val goal = eval(eapp(evar("x"), evar("y")), evar("result"))
match search-memo/relation(goal, facts(), rules(), policies(), depth, ?as-fact = eval-term/to-fact)
  Just(pf) -> ...
```

**Implementation Steps:**
1. Create `examples/untyped-bigstep-implicit.kk` with domain types
2. Write implicit converters: `eval-term/to-fact`, premise extractors
3. Re-implement untyped-bigstep demo using this approach
4. Test that output matches current working version

**Expected Benefit:** Much clearer user code; no `Fact`/`TNode` cruft.

---

### Phase B: Capture-Avoiding Substitution & Better Variable Handling

**Goal:** Support substitution of terms into lambda bodies without accidental capture.

**Current Issue:**
- `subst(λx.x, x, λz.z, result)` should give `result = λz.z`, not rebind z
- Need to rename bound variables in lambda when substituting into scope

**Approach:** Effect-based capture-avoiding substitution.

```koka
effect subst-handler
  fun fresh-var(): string
  fun in-scope(x: string): bool

pub fun subst-capture-avoid(term: my-term, var: string, replacement: my-term): <subst-handler> my-term
  match term
    lam(x, body) ->
      if x == var then lam(x, body)  // shadowing: stop
      else if in-scope(var) then
        val x' = fresh-var()  // rename to avoid capture
        lam(x', subst-capture-avoid(rename-var(body, x, x'), var, replacement))
      else lam(x, subst-capture-avoid(body, var, replacement))
    _ -> ...
```

**Implementation Steps:**
1. Create `koka-redex/subst-handler.kk` with effect + handler
2. Update untyped-bigstep S-rules to use effect-based substitution
3. Add tests for capture-avoiding (e.g., `subst(λy.λx.y, y, λx.x, ?)`)
4. Document the invariant clearly

**Expected Benefit:** Correct semantics for lambda calculus and similar formalisms.

---

### Phase C: Logic Variables & Microkanren-Style Unification (Medium Effort, High Unlock)

**Goal:** Support fresh logic variables with delayed unification.

**Current Blocker:** 
- Fresh variables must be renamed upfront via `freshen-rule`
- No support for "generate and test" pattern

**Desired New Capability:**
```koka
fun ancestor(x: person, z: person)  // generate: what z's are ancestors of x?
  [
    parent(x, z),  // if z is immediate parent
    parent(x, y) \ ancestor(y, z)   // if z is ancestor of y who is parent of x
  ]
```

**Approach:** Staged implementation:
1. **Stage 1 (Minimal):** Add `gensym` effect to support fresh variable generation inside rules
2. **Stage 2 (Full):** Delay constraints (unification of variables) until all premises are gathered
3. **Stage 3 (Nice-to-have):** Choice points / backtracking for multi-solution queries

**Implementation Steps:**
1. Add `gensym` effect + handler to `koka-redex/proof-search.kk`
2. Refactor freshness to use `fresh()` calls rather than upfront renaming
3. Create test with ancestor/parent relations
4. Evaluate performance (memo + delayed unification interaction)

**Expected Benefit:** More natural logic programming feel; support for open-ended queries.

---

### Phase D: Custom Search Behavior via Implicit Effects

**Goal:** Extend search with tracing, constraint checking, analysis-specific callbacks without core changes.

**Approach:** Parameterize search by an implicit effect handler.

```koka
effect search-hook
  fun on-rule-apply(rule-name: string, goal: fact): ()
  fun on-memo-hit(goal: fact, cached-result: proof): ()
  fun on-depth-exceeded(goal: fact, depth: int): ()

// User can install hooks for debugging / analysis:
fun trace-search<a>(f: () -> <search-hook|e> a): <e,console> a
  with handler
    fun on-rule-apply(r, g) -> println("Apply " ++ r ++ " to " ++ g.show)
    fun on-memo-hit(g, _) -> println("Cache hit: " ++ g.show)
    ...
  f()
```

**Implementation Steps:**
1. Add minimal `search-hook` effect to `proof-search.kk` (just declarations)
2. Thread effect callbacks through memo/DFS (3-5 small edits)
3. Create `examples/trace-search-demo.kk` showing hook usage
4. Benchmark to confirm no performance regress

**Expected Benefit:** Extensibility without cluttering core. Users can layer observability.

---

### Phase E: Type-Level Automatic Derivation (Zero-Work Bridge Generation)

**Goal:** Automatically derive `to-fact` and `to-premises` via type-level structure (as in `syntax.kk`), not by inspecting data constructors.

**Current Limitation:**
- Current approach: users manually write `to-fact`, `to-premises`, and glue implicits for each domain judgement shape.
- Boilerplate repeats the same pattern already encoded in `rule<n,p,c>` + `type-struct` form.
- We are not yet exploiting the existing type-level representation (`type-level/structs`, `type-level/list`) to derive bridges generically.

**Desired New Capability:**
```koka
// Marker types carry semantics at the type level (like pred-tag<r>)
type eval-goal-tag
type subst-goal-tag

// Domain judgement constructors remain user-friendly
fun (~>)(e: expr, v: expr) e \ REval \ v

// Framework derives conversion by traversing the type-level shape:
// - rule<n,p,c>
// - type-struct<name, rule, rest>
// - type-cons premise lists
// no handwritten eval-term/to-fact per domain

pub fun main()
  val goal = eval(id-fn, result)  // direct domain type, no manual bridge
  search-memo/relation(goal, facts(), rules(), policies(), depth)
```

**Approach (Using Type-Level Library):**

1. **Marker Types (No Runtime Payload):** introduce judgement marker/tag types (like `pred-tag<r>` pattern) to classify bridge behavior.
   - These may be empty marker types or unit-constructor marker types.
   - Purpose: carry compile-time evidence for implicit resolution, not runtime data.

2. **Type-Level Traversal:** derive bridge functions from the existing syntax encoding.
   - Traverse `relation-def<type-struct<n,f,r>>` via `type-level/structs/to-list`.
   - For each `rule<n,p,c>`, derive:
     - conclusion conversion (`c -> fact`)
     - premise conversion (`p -> list<fact>`) by folding `type-cons`/`type-nil`.
   - Reuse current primitives (`fact/to-fact`, `fact/to-premises`, `tcons/to-premises`, `tnil/to-premises`) as defaults.

3. **Shape-Directed Derivation:** add marker-driven constraints for which type shapes are considered rule conclusions/premises.
   - Example: marker types for judgement forms (`eval`, `subst`, `neq`) and for premise containers.
   - This avoids ambiguous derivation for arbitrary product-like domain types.

4. **Implicit Resolution Strategy:** resolve the most specific derived bridge first, then fall back.
   - Prefer: marker-directed derived instance.
   - Fallback: manually supplied `?to-fact` / `?to-premises`.

**Implementation Steps:**
1. Create `koka-redex/type-reflection.kk` with marker/type-shape helpers.
   - Define marker/tag aliases and utilities over `type-struct`, `type-cons`, `type-nil`.
   - Add functions that identify admissible rule/premise/conclusion shapes.
2. Create `koka-redex/auto-bridge.kk` with automatic derivation
   - Implement generic derivation over `rule<n,p,c>` trees from `relation-def`.
   - Register with implicit resolution in `proof-search-bridge.kk`
3. Update `examples/untyped-bigstep-implicit.kk` to use auto-derivation
   - Keep user-facing judgement constructors (`~>`, `subst`, etc.)
   - Add marker declarations and rely on derived bridge implicits
   - Verify output matches reference implementation
4. Generalize to `koka-redex/proof-search-bridge.kk` once tested

**Key Design Decision:**
- Follow the `pred-tag<r>` precedent: tags provide typed implicit dispatch.
- Derivation targets type-level rule structure (`rule<n,p,c>`, `type-struct`, `type-cons`), not value constructors.
- Marker types decide admissible derivation shapes to keep inference predictable.
- No runtime overhead; all control is type-indexed.

**Expected Benefit:** Users write almost no boilerplate. Domain types are directly executable via type-level machinery.

---

### Phase F: SMT/SAT Solving & E-Graph Integration (Future Direction)

**Goal:** Extend proof-search with constraint solving and term rewriting for optimization/simplification.

**Use Cases:**
1. **Constraint Satisfaction:** When goal derivation involves equality constraints (e.g., type inference with unification)
2. **Term Rewriting & Normalization:** Combine goal-directed search with e-graph rewrite rules
3. **Automated Reasoning:** Fallback to SAT for undecidable premises (e.g., arithmetic constraints)

**Proposed Integration:**
- **Layer 1 (Minimal):** Pluggable constraint checker in proof-search: before memoizing a goal, optionally call SMT to validate consistency
- **Layer 2 (Medium):** E-graph as alternate backend to DFS for non-ground search, for structural exploration and optimization
- **Layer 3 (Advanced):** Probabilistic search using SMT heuristics (e.g., most-constrained-first)

**Approach (TBD after Phase A-E validation):**
1. Survey egraph libraries (egg, egglog, others) for Koka compatibility
2. Create minimal SMT interface (`koka-redex/smt-hook.kk`) for external solver calls
3. Define `constraint<a>` type for delayed constraint checking
4. Add optional constraint-checking phase to proof memo loop
5. Benchmark on large search spaces

**Open Questions:**
- Which SMT solver? z3, cvc5, yices? Language binding availability?
- Should e-graphs be for exploration or just memoization improvement?
- How to handle backtracking if constraints fail?

**Timeline:** Phase F is exploratory; implement after Phase A-E are stable (likely Month 2+).

**Expected Benefit:** Support complex invariant-driven program analysis; competitive with specialized tools like Z3-based analyses.

---

### Audience Segmentation

1. **Researchers (PL/Static Analysis):** "Here's how to encode a 0CFA / type inference in 50 lines."
2. **Koka Developers:** "Here's an example of tiered architecture using implicits and effects."
3. **Logic Programmers:** "Compare this to Prolog, Datalog, λProlog."

### Documentation Layers (for ~/timwhitingdev)

1. **Overview Page** (`content/projects/koka-redex-overview.mdk`)
   - One pager: what problem does this solve?
   - Diagram: from domain types → implicit bridge → search → result
   - Quick start: run a proof-search demo in 30 seconds

2. **Architecture Guide** (`content/projects/koka-redex-architecture.mdk`)
   - Core search machinery (1 section, focus on clarity not completeness)
   - Policy layer (1 section, explain per-relation lattices)
   - Bridge layer (1 section, implicit conversions)
   - Depth modes (1 section, when to use each)

3. **Tutorial by Example** (`content/projects/koka-redex-tutorial/`)
   - Lesson 1: Reachability (ground relations)
   - Lesson 2: Type inference (non-ground premises)
   - Lesson 3: 0CFA (multi-relation with policies)
   - Lesson 4: Custom effects for tracing

4. **API Reference** (`content/projects/koka-redex-api-reference.mdk`)
   - Function signatures, types, implicit parameter defaults
   - Per-function: what problem does it solve? When is it needed?

5. **Design Decisions & Rationale** (`content/projects/koka-redex-design.mdk`)
   - Why memoization? Why three depth modes?
   - Why implicit over explicit threading?
   - Design tradeoffs (e.g., why no backtracking by default)

6. **Comparisons** (`content/projects/koka-redex-comparisons.mdk`)
   - How this compares to Redex, Prolog, Datalog, λProlog
   - When to reach for koka-redex vs alternatives

### Build Integration

Use `build.kk` to:
1. Extract code examples from `.kk` files
2. Generate Madoko includes for examples
3. Auto-run demos and embed output
4. Generate LaTeX rule renderings from `koka-redex/markdown`

---

## Part 5: Next Steps (Revised March 2026)

### Key Design Discovery: Forward-First Execution Model

The framework should **forward chain when possible, backward chain when necessary**.

**Forward chaining** (syntax-directed): The expression structure determines which rule fires. Premises are evaluated in dependency order — each output feeds the next input. The fixpoint memo with `each`/`depend`/`add-result` handles nondeterminism and cycle detection. No DFS needed.

**Backward chaining** (goal-directed): Only when a premise's inputs genuinely depend on an unknown output. This is rare for syntax-directed analyses.

**Validated:** `cfa-direct.kk` demonstrates working 0CFA using direct-style forward chaining with `fixpoint-memo`. Over-approximation (`store:x => {λa.a, λb.b}`) works correctly. The framework needs to compile typed rules into this kind of memoized interpreter.

### What We Learned (Approaches That Don't Work)

- **Substitution-based bigstep + nondet-set**: Substitution eliminates sharing points. Each call gets its own copy — no merging. (`cfa-demo.kk`)
- **Store-passing via backward chaining**: Non-ground output goals fall to DFS which doesn't table and doesn't backtrack across premises. (`cfa-store-demo.kk`)
- **Global bind via backward chaining**: Same non-ground problem. E-App-Bind premises have unresolved rule variables. (`cfa-bind-demo.kk`)
- **Custom memo-key on non-ground goals**: The memo engine can't propagate output bindings from cached results to subsequent premises.

### Immediate (This Week)
- [x] **0CFA.1:** Working 0CFA via direct-style forward chaining (`cfa-direct.kk`)
- [ ] **0CFA.2:** Express 0CFA rules in koka-redex `rule<n,p,c>` format with input/output mode annotations
- [ ] **0CFA.3:** Build bridge that compiles typed rules → forward-chaining memoized interpreter (the key framework contribution)
- [ ] **Paper.1:** Outline the paper around this story: typed rules + forward-first execution + lattice policies = ADI

### Short-term (Next 2-3 Weeks)
- [ ] **0CFA.4:** Add Z combinator / recursive example showing fixpoint convergence
- [ ] **External.1:** Formalize external relation mechanism — `neq`, `lookup`, arithmetic as pluggable Koka functions
- [ ] **External.2:** Connect external relations to the forward-chaining bridge (implicits select dispatch per relation)
- [ ] **Paper.2:** Write Sections 3-5 (framework overview, core design, running example)

### Medium-term (Weeks 4-6)
- [ ] **Choose.1:** Add `choose`-based backtracking (microkanren pattern) for premises that need it
- [ ] **Choose.2:** Integrate `choose` with the memo engine for cases requiring backward search
- [ ] **TypeLevel.1:** Input/output mode markers on type-level rule encodings
- [ ] **TypeLevel.2:** Auto-derive `?memo-key` from mode annotations
- [ ] **Paper.3:** Write remaining sections, evaluation, related work

### Longer-term (Month 2+)
- [ ] **Phase E:** Full auto-derivation of bridges from type-level structure (the ergonomic differentiator)
- [ ] **Subst.1:** Capture-avoiding substitution as an external relation / effect
- [ ] **SMT.1:** Pluggable SMT/constraint solving for non-Horn-clause premises
- [ ] **Paper.4:** Polish, evaluate on larger examples, submit

---

## Part 6: Open Questions for You

1. **Type-Level Derivation:** Should automatic `tcons/to-fact` generation detect premises vs conclusions via:
   - Marker-tagged judgement shapes (preferred)?
   - Explicit marker/alias wrappers for premise containers?
   - User overrides for ambiguous cases?

2. **Substitution Strategy:** Should capture-avoiding be baked into the framework, or a separate module users opt into? (My intuition: separate, since some use cases don't need it.)

3. **SMT Integration:** Should SMT be optional (pluggable hook) or should certain predicates be marked as SMT-solvable upfront?

4. **Variable Scoping:** For microkanren-style variables, do you want gensym + delayed unification, or something else?

5. **Documentation Priorities:** Which audience / tutorial lesson should we tackle first to validate the approach?

6. **Performance vs Features:** Should we benchmark Phase B/C/E changes, or prioritize functionality for now?

7. **Backward Compatibility:** Should `examples/` old working versions stay as reference, or migrate to implicit/auto-derivation approach?

---

## Appendix: File Structure After Changes

```
koka-redex/
├── examples/
│   ├── debug-depth.kk                          # ✓ current
│   ├── proof-search-demo.kk                    # ✓ current
│   ├── proof-search-depth-modes-demo.kk        # ✓ current
│   ├── proof-search-untyped-bigstep-demo.kk    # ✓ current (using Fact)
│   └── untyped-bigstep-implicit.kk             # NEW: Phase A + E (implicit bridge + auto-derivation)
├── koka-redex/
│   ├── proof-search.kk                         # current core
│   ├── proof-search-policy.kk                  # current policies
│   ├── proof-search-bridge.kk                  # current bridge (will incorporate Phase E)
│   ├── syntax.kk                               # current rule representation
│   ├── type-reflection.kk                      # NEW: Phase E (type inspection)
│   ├── auto-bridge.kk                          # NEW: Phase E (auto-derivation)
│   ├── subst-handler.kk                        # NEW: Phase B (capture-avoiding)
│   ├── search-hooks.kk                         # NEW: Phase D (custom behavior)
│   └── smt-hook.kk                             # NEW: Phase F (SMT integration)
└── ROADMAP.md                                  # this file

timwhitingdev/content/projects/
├── koka-redex-overview.mdk                     # NEW: Documentation.1
├── koka-redex-architecture.mdk                 # NEW: Documentation.2
├── koka-redex-tutorial/
│   ├── lesson-1-reachability.mdk               # NEW: Documentation.3.1
│   └── lesson-2-type-inference.mdk             # NEW: Documentation.3.2
├── koka-redex-api-reference.mdk                # NEW: Documentation.4
├── koka-redex-design.mdk                       # NEW: Documentation.5
└── koka-redex-comparisons.mdk                  # NEW: Documentation.6
```
