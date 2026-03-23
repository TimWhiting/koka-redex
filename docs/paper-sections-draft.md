# Paper Draft Sections: Search Semantics, Fixpoint Machinery, Related Work

These sections are independent of the final syntax/implicits/type-level design.

~ todo
Positioning: The framework is best characterized as **tabled logic programming with
per-relation lattice policies and external relation dispatch**, embedded in Koka via
effects and implicits. It is demand-driven (like Prolog/SLG), tabled with fixpoint
convergence (like Datalog/XSB), supports per-relation lattice aggregation (like Flix),
and dispatches to external Koka functions for non-rule-based relations (novel).
This positioning should be reflected throughout all sections.
~

---

## Execution Model

~ todo
Rewrite this section to present a SINGLE unified engine rather than "forward" vs
"backward." The engine is demand-driven tabled resolution:
- Start from a goal (demand-driven, like Prolog)
- Table results with lattice-based aggregation (like Datalog with lattices)
- Unification with variables in both goals and rules (like Prolog, unlike Datalog)
- Fixpoint convergence via memo/depend/add-result (like XSB's SLG resolution)
- External relation dispatch for constraint solving (novel)

The three cases (ground query, partial query, open query) are all handled by the
same engine — the difference is only in how many rule branches fire initially.
~

### The Execution Model

The framework's engine executes rules via demand-driven tabled resolution. Given a goal, the engine finds matching rules by unifying the goal with rule conclusions, then evaluates premises left-to-right. Recursive calls are tabled via Koka's `fixpoint-memo` library, which provides the core computational infrastructure through three operations on the `cache<k,r>` effect:

- **`memo(key, computation)`**: If `key` has been seen before, suspend the current computation and register it as a dependent — when new results arrive for this key, the computation resumes. If `key` is fresh, run the computation and add results to the cache.
- **`add-result(key, value)`**: Join `value` into the lattice aggregate for `key`. If the aggregate changes, notify all dependents (resume their suspended computations with the new value).
- **`do-each(alternatives)`**: Nondeterministically choose from a list of alternatives. The handler iterates through all choices, resuming the computation with each.

These compose to give demand-driven fixpoint iteration: computations that depend on not-yet-computed values suspend and resume when those values become available, and the iteration terminates when no new values are produced.

### From Rules to Tabled Computation

Given a goal (which may have ground inputs, partial inputs, or no ground inputs):

1. **Rule matching:** The engine tries each rule by unifying the goal with the rule's conclusion. Unification binds input positions from the goal into the rule's variables. Multiple rules may match — nondeterminism via `do-each` explores all branches.

2. **Premise evaluation:** Each premise is either:
   - A recursive goal → tabled evaluation via `memo`, which handles fixpoint
   - An externally-solved relation (lookup, unify, neq) → call the external solver, which returns a list of solutions. `do-each` selects one; if later premises fail, the engine tries the next.

3. **Output resolution:** After all premises succeed, the substitution accumulated from premise outputs is applied to the rule's conclusion. This resolved conclusion is the result that `add-result` joins into the lattice.

4. **Fixpoint:** When a recursive call hits a key already in the cache, `memo` suspends the caller and registers a dependency. When the callee produces a new value (via a different rule branch or a propagated update), the suspended caller resumes with the new value. This continues until no new values are produced — the fixpoint.

### The Memo Key

The memo key determines what constitutes "the same computation." For a relation `eval(expr, store, value, store')` where the first two arguments are inputs and the last two are outputs, the key should be `eval(expr, store)` — only the input positions. Different output values for the same input are collected by the lattice, not distinguished as separate computations.

The framework accepts a `?memo-key: (fact) -> string` parameter that extracts the key from a goal. For ground relations like `reach(a, b)` where all positions are inputs, the key is the full fact. For syntax-directed analyses with output positions, the key projects to inputs only.

~ todo
With type-level input/output mode annotations, the memo-key could be derived
automatically. This is the key connection to the type-level layer.
~

### Demand-Driven Evaluation: Three Cases

The same engine handles goals with varying degrees of groundness:

**Ground query** (`reach(1, 4)`): The goal is fully specified. Rule matching narrows to rules whose conclusions can unify with this specific fact. Premises are evaluated recursively, each fully grounded by earlier premise outputs. The result is yes/no (the goal is in the lattice or not).

**Partial query** (`reach(1, ?)`): Some input positions are ground, others are variables. Rule matching fires for all rules whose conclusions unify — the variable positions remain open. The lattice collects all results: `{reach(1,2), reach(1,3), reach(1,4)}`.

**Open query** (`reach(?, ?)`): No input positions are ground. All rules fire. Base facts (zero-premise rules) provide the initial seed — `edge(1,2)`, `edge(2,3)`, `edge(3,4)` all match. The fixpoint then derives all reachable pairs from these seeds: `{reach(1,2), reach(1,3), reach(1,4), reach(2,3), reach(2,4), reach(3,4)}`.

~ todo
Analogy to left-corner parsing: the goal structure (top-down) determines which
rules are relevant, then evaluation proceeds bottom-up from base facts that those
rules can use. Neither purely top-down (Prolog) nor purely bottom-up (Datalog).
~

### Example: 0CFA Fixpoint

Consider `let f = λx.x in (f λa.a)(f λb.b)`:

1. `eval(app(var(f), lam(a,...)), store={f:λx.x})` — E-App fires. Premise 1: `eval(var(f), ...)` → lookup f → `λx.x`. Premise 2: `eval(lam(a,...), ...)` → `λa.a`. Premise 3: `eval(var(x), store={x:λa.a, f:λx.x})` → lookup x → `λa.a`.

2. `eval(app(var(f), lam(b,...)), store={x:λa.a, f:λx.x})` — E-App fires again. Premise 2: `eval(lam(b,...), ...)` → `λb.b`. Premise 3: `eval(var(x), store={x:λb.b, x:λa.a, f:λx.x})` → lookup x → returns BOTH `λb.b` and `λa.a` (the store has accumulated both bindings). `do-each` explores both alternatives.

3. **Over-approximation emerges:** `eval(var(x), ...)` produces two values `{λa.a, λb.b}`. This propagates upward: the application `(f λb.b)` can return either value, and the outer application collects results from both paths.

### External Relations: Pluggable Solvers

Some premises are neither recursive rule applications nor base facts — they require computation outside the rule system. Type unification is the canonical example: given two types, find a substitution that makes them equal.

External relations handle this via a function:

```
?external: (fact) -> maybe<list<fact>>
```

`Nothing` means "not my relation, use rules." `Just(solutions)` provides all resolved facts. The engine integrates these with `do-each` — trying each solution and propagating through subsequent premises.

This mechanism is general:
- **Inequality** (`neq`): check two terms are not equal. One solution or none.
- **Store lookup**: walk a store term, collect all bindings for a name. Multiple solutions.
- **Unification**: unify two types. Returns resolved types or no solution.
- **(Future) SMT**: delegate arithmetic constraints to an external solver.

~ todo
The external relation mechanism connects to the broader vision of pluggable
solvers dispatched via implicits per relation type. Currently uses a single
dispatch function; the typed version would use `?solve: pred-tag<r> -> solver<r>`.
~

---

## Related Work

~ todo
Flesh out citations. Add: Chen & Warren (SLG resolution), Sagonas et al. (XSB),
Swift & Warren (tabled LP survey). Position our work precisely against SLG —
the main difference is per-relation lattice policies and embedding in a typed
functional language with effects.
~

### Positioning

Our framework is best characterized as **tabled logic programming with per-relation lattice policies and external relation dispatch**, embedded in Koka via algebraic effects and implicit parameters.

Like **Prolog**, our engine is demand-driven and uses unification with logic variables for rule matching and premise resolution. Like **tabled logic programming** (XSB Prolog, SLG resolution), recursive goals are memoized to guarantee termination and enable fixpoint computation. Like **Datalog with lattices** (Flix, Soufflé with lattice extensions), per-relation aggregation policies control how multiple results are combined.

Unlike any of these, our framework (1) allows per-relation lattice policies resolved via the host language's type system, (2) dispatches premises to external Koka functions for constraint solving alongside rule-based derivation, and (3) is embedded in a language with algebraic effects that naturally express the computational patterns of tabled search (memoization, nondeterminism, fixpoint).

### Rule-Based Analysis Frameworks

**PLT Redex** (Felleisen et al.) provides a domain-specific language for reduction semantics in Racket. Users define languages, reduction relations, and typing judgements using S-expression patterns. Redex offers rendering (typeset rules), random testing, and trace exploration. However, Redex does not provide fixpoint computation, lattice-based abstract interpretation, or tabled search — analyses that require iteration must be hand-coded. Our framework complements this direction: we start from typed rule declarations and derive executable analysis engines with tabled fixpoint behavior.

~ todo
More careful PLT Redex comparison: Redex's context decomposition / plugging
is a pattern we don't support (reduction contexts with holes). Redex's random
testing is complementary to our fixpoint approach. Discuss whether our typed
rule encoding could support Redex-style testing.
~

**Datalog and Soufflé** (Jordan et al.) provide efficient bottom-up evaluation of Horn clauses with stratified negation and lattice extensions. Soufflé compiles Datalog programs to C++ for high performance. The execution model is fixed (bottom-up semi-naive evaluation); there is no demand-driven evaluation, no unification with logic variables, and no external relation dispatch. Our engine implements demand-driven tabled resolution over a richer term language.

**Formulog** (Bembenek et al.) extends Datalog with ML-like functions and SMT solver integration. Programs can call external functions from within Datalog rules. This shares our motivation of combining rule-based reasoning with functional computation. Formulog is a standalone language; our approach leverages Koka's type system (implicits, effects) for extensibility.

**Flix** (Madsen et al.) combines Datalog-style fixpoint computation with a functional programming language, supporting user-defined lattices. Like our framework, Flix allows lattice-stratified analyses. Unlike our approach, Flix commits to bottom-up evaluation and does not support demand-driven tabled resolution or external solver dispatch per premise.

### Logic Programming and Tabled Resolution

**Prolog** pioneered backward-chaining goal-directed search with unification. **Tabled logic programming** (XSB Prolog, SLG resolution; Chen & Warren) adds memoization to avoid infinite loops and enable well-founded fixpoints. Our engine is a form of tabled resolution, but extends it with per-relation lattice policies — in standard tabled LP, all predicates share the same memoization strategy (set-of-answers). Our framework allows different relations to use different aggregation (deterministic-first, deterministic-error, nondeterministic-set, or custom lattices).

~ todo
Discuss how our approach relates to SLG resolution more precisely:
- SLG uses answer completion; we use lattice fixpoint
- SLG handles negation; we don't (yet)
- Our per-relation lattice policies are a generalization of SLG's uniform answer set
~

**miniKanren/microKanren** (Byrd et al., Hemann & Friedman) embed relational programming in functional languages using interleaving search. The Koka `microkanren` sample demonstrates this with `choose`/`fail` effects. Our framework draws on this pattern for nondeterminism (`do-each`/`none`) but replaces stream-based search with tabled fixpoint computation and lattice-based aggregation.

### Abstract Interpretation and ADI

**Abstracting Abstract Machines (AAM)** (Van Horn & Might) and **Abstracting Definitional Interpreters (ADI)** (Darais et al.) show that a concrete interpreter, when composed with memoization and a finite store abstraction, yields a sound abstract interpreter. Our 0CFA example directly realizes this pattern: the bigstep rules are the "concrete interpreter," the tabled engine provides memoization, and the `nondet-set` lattice policy provides the collecting semantics. The contribution is that this pattern falls out naturally from rule-based tabled execution rather than being hand-coded per analysis.

### Type-Directed Overloading and Implicits

**Scala implicits** and **Haskell typeclasses** provide type-directed dispatch for selecting implementations. Koka's implicit parameters serve a similar role: per-relation lattice policies, bridge conversions, and external solvers are resolved by the type system. The pattern of using phantom-typed tags (`pred-tag<r>`) to drive implicit resolution for analysis-specific behavior appears novel in the context of program analysis frameworks.

~ todo
Discuss connection to type-directed partial evaluation (Danvy et al.) and
staging / multi-stage programming. Our typed rule representation could be
viewed as a staged computation: rules are the "code," the engine is the
"interpreter," and compilation to direct Koka code is the "staged" version.
~

---

## Limitations and Future Work

### Current Limitations

**Store-passing scalability.** The memo key for `eval(expr, store)` includes the full store as a serialized string. For programs with many variables, this grows with store size. Approaches include hash-consing for structural sharing, or a widened global store (as in our `cfa-direct.kk` variant) where the store is external state rather than a rule argument.

**Memo key proliferation.** When goals contain freshened variables (from standardize-apart), semantically equivalent goals may receive different keys. For example, `edge(src_0, y_10502)` and `edge(src_0, y_12002)` are the same open query but produce different keys. Normalizing variable names in keys would reduce redundancy.

~ todo
Quantify this: how many redundant entries does reach(?,?) produce vs the
minimal set? Is this a constant factor or does it grow with rule count?
~

**Polymorphic type inference.** Memoizing type inference results that contain free type variables requires generalization (closing over free variables) and instantiation (renaming them fresh at each use). This is the standard Hindley-Milner mechanism. Integrating let-polymorphism would require the memo lattice to understand type variable scoping.

**Performance.** The term-based representation (`TNode`, `TAtom`, `TVar`) adds indirection compared to direct Koka data types. Unification and substitution operate on generic terms. A future optimization could specialize the engine for specific term types, or compile rules to direct Koka code.

### Future Directions

**Automatic mode inference.** The `?memo-key` and `?external` parameters are currently user-provided. With type-level input/output mode annotations on relation arguments, the framework could derive these automatically.

**Effect-based substitution.** Capture-avoiding substitution as an effect handler, allowing substitution-based analyses to opt into capture-avoidance without changing rule definitions.

**SMT integration.** External relations currently return explicit solution lists. An SMT solver could serve as an external relation for constraint-heavy analyses.

**Compiled execution.** Compile typed rule definitions to specialized Koka functions at compile time using type-level programming, eliminating the interpretation overhead.

~ todo
Semi-naive evaluation: Currently the engine may re-derive facts on each
fixpoint iteration. Implementing delta-based iteration (only process new
facts) would significantly improve performance for large relation sets.
This is standard in Datalog but would need adaptation for demand-driven
tabled resolution.
~
