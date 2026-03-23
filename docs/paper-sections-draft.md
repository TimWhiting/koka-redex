# Paper Draft Sections: Search Semantics, Fixpoint Machinery, Related Work

These sections are independent of the final syntax/implicits/type-level design.

---

## Forward-Chaining with Memoized Fixpoint

### The Execution Model

The framework's forward engine executes rules syntax-directedly: the structure of the goal's input positions determines which rule fires, and premises are evaluated left-to-right with each premise's output feeding the next premise's input. This is essentially a definitional interpreter compiled from declarative rules.

The key computational infrastructure comes from Koka's `fixpoint-memo` library, which provides three operations via the `cache<k,r>` effect:

- **`memo(key, computation)`**: If `key` has been seen before, suspend the current computation and register it as a dependent — when new results arrive for this key, the computation resumes. If `key` is fresh, run the computation and add results to the cache.
- **`add-result(key, value)`**: Join `value` into the lattice aggregate for `key`. If the aggregate changes, notify all dependents (resume their suspended computations with the new value).
- **`do-each(alternatives)`**: Nondeterministically choose from a list of alternatives. The handler iterates through all choices, resuming the computation with each.

These compose to give demand-driven fixpoint iteration: computations that depend on not-yet-computed values suspend and resume when those values become available, and the iteration terminates when no new values are produced.

### From Rules to Memoized Computation

Given a goal `eval(expr, store, ?, ?)` where `?` marks output positions:

1. **Rule matching:** The forward engine tries each rule by unifying the goal with the rule's conclusion. Unification binds the input positions (expr, store) from the goal into the rule's variables. Multiple rules may match (nondeterminism via `do-each`).

2. **Premise evaluation:** Each premise is either:
   - A recursive goal of the same (or different) relation → forward-eval recursively, going through `memo`
   - An externally-solved relation (lookup, unify, neq) → call the external solver function, which returns a list of solutions. `do-each` selects one; if later premises fail, the engine backtracks to try the next.

3. **Output resolution:** After all premises succeed, the substitution accumulated from premise outputs is applied to the rule's conclusion. This resolved conclusion becomes the result — the value that `add-result` joins into the lattice.

4. **Fixpoint:** When a recursive call hits a key already in the cache, `memo` suspends the caller and registers a dependency. When the callee produces a new value (via a different rule branch or a propagated update), the suspended caller resumes with the new value. This continues until no new values are produced — the fixpoint.

### The Memo Key

The memo key determines what constitutes "the same computation." For a relation `eval(expr, store, value, store')` where the first two arguments are inputs and the last two are outputs, the key should be `eval(expr, store)` — only the input positions. Different output values for the same input are collected by the lattice, not distinguished as separate computations.

The framework accepts a `?memo-key: (fact) -> string` parameter that extracts the key from a goal. This is currently user-provided; with type-level input/output mode annotations, it could be derived automatically.

### Example: 0CFA Fixpoint

Consider `let f = λx.x in (f λa.a)(f λb.b)`:

1. `eval(app(var(f), lam(a,...)), store={f:λx.x})` — E-App fires. Premise 1: `eval(var(f), ...)` → lookup f → `λx.x`. Premise 2: `eval(lam(a,...), ...)` → `λa.a`. Premise 3: `eval(var(x), store={x:λa.a, f:λx.x})` → lookup x → `λa.a`.

2. `eval(app(var(f), lam(b,...)), store={x:λa.a, f:λx.x})` — E-App fires again. Premise 2: `eval(lam(b,...), ...)` → `λb.b`. Premise 3: `eval(var(x), store={x:λb.b, x:λa.a, f:λx.x})` → lookup x → returns BOTH `λb.b` and `λa.a` (the store has accumulated both bindings). The `do-each` mechanism explores both alternatives.

3. **Over-approximation emerges:** `eval(var(x), ...)` produces two values `{λa.a, λb.b}`. This propagates upward: the application `(f λb.b)` can return either value, and the outer application `((f λa.a)(f λb.b))` collects results from both paths.

The final memo table has 14 entries. Entries with multiple values show the over-approximation:
```
eval(var(x), store={x:λb.b, x:λa.a, f:λx.x}) => {λa.a, λb.b}
eval(app(var(f), lam(b,...)), ...) => {λa.a, λb.b}
eval(program, ∅) => {λa.a, λb.b}
```

This is correct 0CFA behavior — the analysis is sound (includes the concrete result `λb.b`) but over-approximate (also includes the spurious `λa.a`).

### Backward Engine

The backward-chaining engine serves a complementary role. Given a fully-specified goal (e.g., `reach(1, 4)`), it searches for a proof by unifying the goal with rule conclusions and recursively proving premises. Memoization with per-relation lattice policies provides tabled resolution for ground goals.

The backward engine uses the same rule format as the forward engine. The difference is in the direction of information flow:
- **Forward:** Inputs are known, outputs are discovered. The expression structure drives rule selection.
- **Backward:** The desired conclusion is known (or partially known). Rules are tried by unifying conclusions, then premises are proved.

For ground goals (all arguments known), both engines produce the same results. The distinction matters for non-ground goals — forward discovery of outputs vs backward search from a target.

### External Relations: Bridging Forward and Backward

Some premises are neither recursive rule applications nor simple lookups — they require constraint solving. Type unification is the canonical example: given two types, find a substitution that makes them equal. This is a backward operation embedded in a forward derivation.

External relations handle this by providing a Koka function that takes a goal fact and returns all solutions:

```
?external: (fact) -> maybe<list<fact>>
```

`Nothing` means "not my relation, use rules." `Just(solutions)` provides all resolved facts. The forward engine integrates these with `do-each` — trying each solution and backtracking if later premises fail.

This mechanism is general:
- **Inequality** (`neq`): check two terms are not equal. Returns one solution (the original fact) or none.
- **Store lookup**: walk a store term, collect all bindings for a name. Returns multiple solutions.
- **Unification**: attempt to unify two types. Returns the resolved types or no solution.
- **(Future) SMT**: delegate arithmetic constraints to an external solver.

---

## Related Work

### Rule-Based Analysis Frameworks

**PLT Redex** (Felleisen et al.) provides a domain-specific language for reduction semantics in Racket. Users define languages, reduction relations, and typing judgements using S-expression patterns. Redex offers rendering (typeset rules), random testing, and trace exploration. However, Redex does not provide fixpoint computation, lattice-based abstract interpretation, or memoized search — analyses that require iteration must be hand-coded. Our framework complements this direction: we start from typed rule declarations (not S-expression patterns) and derive executable analysis engines with fixpoint behavior.

**Datalog and Soufflé** (Jordan et al.) provide efficient forward-chaining evaluation of Horn clauses with stratified negation and lattice extensions. Soufflé compiles Datalog programs to C++ for high performance. The execution model is fixed (bottom-up semi-naive evaluation); there is no backward search, no external relation dispatch, and no type-level rule encoding. Our forward engine implements a similar demand-driven fixpoint via `fixpoint-memo`, but over a richer term language with external solvers and per-relation policies.

**Formulog** (Bembenek et al.) extends Datalog with ML-like functions and SMT solver integration. Programs can call external functions from within Datalog rules. This shares our motivation of combining rule-based reasoning with functional computation, but Formulog is a standalone language rather than a library embedded in a host language. Our approach leverages Koka's type system (implicits, effects) for extensibility rather than designing a new language.

**Flix** (Madsen et al.) combines Datalog-style fixpoint computation with a functional programming language, supporting user-defined lattices. Like our framework, Flix allows lattice-stratified analyses. Unlike our approach, Flix commits to bottom-up evaluation and does not support backward-chaining or external solver dispatch per premise.

### Logic Programming and Tabled Resolution

**Prolog** pioneered backward-chaining goal-directed search with unification. **Tabled logic programming** (XSB Prolog, SLG resolution) adds memoization to avoid infinite loops and enable well-founded fixpoints. Our backward engine is a simplified tabled resolution with per-relation lattice policies — a feature not present in standard tabled LP, where all predicates share the same memoization strategy.

**miniKanren/microKanren** (Byrd et al., Hemann & Friedman) embed relational programming in functional languages using interleaving search. The Koka `microkanren` sample demonstrates this with `choose`/`fail` effects. Our framework draws on this approach for nondeterminism (`do-each`/`none`) but extends it with memoized fixpoint and lattice-based aggregation rather than stream-based search.

### Abstract Interpretation and ADI

**Abstracting Abstract Machines (AAM)** (Van Horn & Might) and **Abstracting Definitional Interpreters (ADI)** (Darais et al.) show that a concrete interpreter, when composed with memoization and a finite store abstraction, yields a sound abstract interpreter. Our 0CFA example directly realizes this pattern: the bigstep rules are the "concrete interpreter," the forward engine provides memoization, and the `nondet-set` lattice policy provides the collecting semantics. The contribution is that this pattern falls out naturally from the framework's rule-based execution rather than being hand-coded.

### Type-Directed Overloading and Implicits

**Scala implicits** and **Haskell typeclasses** provide type-directed dispatch for selecting implementations. Koka's implicit parameters serve a similar role in our framework: per-relation lattice policies, bridge conversions, and external solvers are all resolved by the type system. The specific pattern of using phantom-typed tags (`pred-tag<r>`) to drive implicit resolution for analysis-specific behavior appears to be novel in the context of program analysis frameworks.

---

## Limitations and Future Work

### Current Limitations

**Store-passing scalability.** The memo key for `eval(expr, store)` includes the full store as a serialized string. For programs with many variables, this grows linearly with store size and quadratically with program depth. Approaches include hash-consing for structural sharing, or a widened global store (as in our `cfa-direct.kk` variant) where the store is external state rather than a rule argument.

**Polymorphic type inference.** Memoizing type inference results that contain free type variables requires generalization (closing over free variables) and instantiation (renaming them fresh at each use). This is the standard Hindley-Milner mechanism. Our current framework does not distinguish "polymorphic memo entries" from "monomorphic" ones — each `(expr, env)` pair gets one entry. Integrating let-polymorphism would require the memo lattice to understand type variable scoping.

**Complete backtracking.** The forward engine's premise evaluation is sequential: when a premise succeeds, its choice is committed. If a later premise fails, the engine backtracks within that premise (via `do-each`) but does not revisit earlier premises' choices. Full backtracking (as in Prolog or microKanren) would require continuation-based search across all premises. For the syntax-directed analyses demonstrated here, this is not needed — but it would be required for analyses with overlapping rules or ambiguous dispatch.

**Performance.** The term-based representation (`TNode`, `TAtom`, `TVar`) adds indirection compared to direct Koka data types. Unification and substitution operate on these generic terms rather than typed values. A future optimization could specialize the engine for specific term types, or compile rules to direct Koka code (as AAM/ADI implementations do).

### Future Directions

**Automatic mode inference.** The `?memo-key` and `?external` parameters are currently user-provided. With type-level input/output mode annotations on relation arguments, the framework could derive these automatically: input positions form the key, output positions are lattice-aggregated, and relations without rules are dispatched to external solvers.

**Effect-based substitution.** Capture-avoiding substitution could be an effect handler that intercepts variable binding operations, similar to the `subst-handler` pattern in our roadmap. This would allow substitution-based analyses (like bigstep evaluation) to opt into capture-avoidance without changing the rule definitions.

**SMT integration.** External relations currently return explicit solution lists. For constraint-heavy analyses, an SMT solver could serve as an external relation that returns satisfying assignments. The `?external` dispatch mechanism already supports this — the solver would receive a constraint fact and return solutions.

**Compiled execution.** Rather than interpreting rules at runtime, the framework could compile typed rule definitions to specialized Koka functions at compile time, using Koka's type-level programming to generate efficient pattern-matching code.
