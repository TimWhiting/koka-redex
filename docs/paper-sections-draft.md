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

### Positioning

Our framework is best characterized as **tabled logic programming with per-relation lattice policies and external relation dispatch**, embedded in Koka via algebraic effects and implicit parameters.

Like **Prolog**, our engine is demand-driven and uses unification with logic variables for rule matching and premise resolution. Like **tabled logic programming** (XSB Prolog, SLG resolution), recursive goals are memoized to guarantee termination and enable fixpoint computation. Like **Datalog with lattices** (Flix, Soufflé with lattice extensions), per-relation aggregation policies control how multiple results are combined.

Unlike any of these, our framework (1) allows per-relation lattice policies resolved via the host language's type system, (2) dispatches premises to external Koka functions for constraint solving alongside rule-based derivation, and (3) is embedded in a language with algebraic effects that naturally express the computational patterns of tabled search (memoization, nondeterminism, fixpoint).

### PLT Redex

**PLT Redex** [Felleisen, Findler, and Flatt 2009] provides a domain-specific language for reduction semantics embedded in Racket. Redex and our framework share the same starting point — users declare languages, relations, and rules — but diverge sharply in what the framework does with those declarations.

**What Redex provides that we do not.** Redex's `define-language` grammar mechanism enables pattern matching with nonterminal-based metavariables: any symbol matching a grammar production is automatically a pattern variable, with subscripts (`e_1`, `e_2`) for distinct instances. The `variable-not-otherwise-mentioned` pattern automatically excludes keywords. This S-expression-based pattern language is more concise than our typed metavariable encoding, which requires explicit metavar constructors or pattern wrappers.

Redex also provides evaluation context decomposition via `in-hole` and context-plugging — expressing reduction semantics with evaluation contexts like `E ::= [] | E e | v E`. Our framework does not support contexts with holes; rules must be fully syntax-directed or use explicit premise ordering.

Redex's `redex-check` provides random testing: given a language grammar, it generates random terms and checks that a property (expressed as a metafunction or judgement) holds. This is complementary to our fixpoint approach — we compute all results via tabled search rather than sampling.

**What we provide that Redex does not.** Redex has no built-in fixpoint computation, lattice-based aggregation, or tabled memoization. When a Redex user needs iterative analysis (e.g., 0CFA, type inference with fixpoints), they must hand-code the iteration loop, lattice joins, and termination checks. Our framework derives this machinery automatically from the rule declarations: the tabled engine handles fixpoint iteration, per-relation lattice policies control aggregation, and the `memo`/`depend`/`add-result` mechanism ensures termination.

Redex does not dispatch to external solvers. Metafunctions (Racket functions called from within rules) provide functional computation, but they are eager and deterministic — they cannot produce multiple results or participate in nondeterministic search. Our external relation mechanism (`?external`) integrates constraint solvers (e.g., unification) into the tabled search, with `do-each` exploring all solutions.

**Metavariable comparison.** Redex's pattern language is untyped: metavariables are just symbols, and the grammar disambiguates. Our typed approach uses Koka's type system to distinguish metavariables from concrete values. The advantage is static type checking (a `pattern<expr>` cannot appear where a `pattern<ty>` is expected); the disadvantage is verbosity (users must explicitly mark metavar positions). We explore several metavariable encoding strategies — phantom-typed `pattern<a>` wrappers, `EAny` constructors, and fresh-variable effects — each trading off conciseness against type safety.

**Rendering.** Both frameworks support rendering rules as typeset inference rules. Redex uses Racket's pict library; our framework uses LaTeX and Markdown generation via type-level traversal of rule structures. Both derive rendering from the same rule definitions used for execution.

~ todo
Cite: Felleisen, Findler, Flatt. "Semantics Engineering with PLT Redex." MIT Press, 2009.
Also cite Klein et al. "Run Your Research" (random testing with Redex).
~

### Datalog and Extensions

**Datalog and Soufflé** [Jordan et al. 2016] provide efficient bottom-up evaluation of Horn clauses with stratified negation and lattice extensions. Soufflé compiles Datalog programs to C++ for high performance. The execution model is fixed (bottom-up semi-naive evaluation); there is no demand-driven evaluation, no unification with logic variables, and no external relation dispatch. Our engine implements demand-driven tabled resolution — computation is triggered by goals, not by exhaustive forward saturation.

**Formulog** [Bembenek et al. 2020] extends Datalog with ML-like functions and SMT solver integration. Programs can call external functions from within Datalog rules, and constraint-generating rules can dispatch to Z3. This shares our motivation of combining rule-based reasoning with functional computation and external solvers. Formulog is a standalone language with its own type system and runtime; our approach leverages Koka's existing type system (implicits, effects) for extensibility, and external solvers are just Koka functions — no foreign function interface or separate solver process.

**Flix** [Madsen et al. 2016] combines Datalog-style fixpoint computation with a functional programming language, supporting user-defined lattices. Like our framework, Flix allows lattice-stratified analyses where different relations aggregate results differently. Unlike our approach, Flix commits to bottom-up evaluation and does not support demand-driven tabled resolution, unification with logic variables, or external solver dispatch per premise.

~ todo
Also mention: Doop (Bravenboer & Smaragdakis) for Datalog-based points-to analysis.
Ascent (Rust) for Datalog in a systems language.
~

### Logic Programming and Tabled Resolution

**Prolog** pioneered backward-chaining goal-directed search with unification. **Tabled logic programming** [Chen and Warren 1996; Swift and Warren 2012] (XSB Prolog, SLG resolution) adds memoization to avoid infinite loops and enable well-founded fixpoints. Our engine is a form of tabled resolution with two key extensions.

First, **per-relation lattice policies**: in standard tabled LP (SLG), all predicates use the same memoization strategy — a set of ground answers. Our framework allows different relations to use different aggregation semantics (`nondet-set`, `det-first`, `det-error`, or custom lattices). This is a generalization: SLG's answer set is our `nondet-set` policy; a deterministic function is our `det-first` policy. The policy is selected via the host language's type system (implicit resolution on phantom-typed relation tags), not by runtime configuration.

Second, **external relation dispatch**: SLG and XSB support tabled and non-tabled predicates, but all predicates are defined as Prolog clauses. Our framework allows individual relations to be implemented as host-language functions — the `?external` mechanism dispatches to arbitrary Koka computations (unification, arithmetic, store operations) that can use the same algebraic effects (nondeterminism, failure) as rule-based resolution.

SLG handles well-founded negation; we do not currently support negation. SLG uses answer completion to detect that a tabled predicate has computed all its answers; our approach uses lattice fixpoint — when the lattice stops growing, the computation terminates. These are equivalent for the `nondet-set` case but our lattice-based approach generalizes to widening and abstract domains.

**miniKanren/microKanren** [Byrd et al. 2012; Hemann and Friedman 2013] embed relational programming in functional languages using interleaving search with `conde`/`fresh`/`==` as the core primitives. Our logic effect (`logic.kk`) draws directly on this tradition: `unify`, `freshv`, `save`/`restore` mirror microKanren's substitution-based operations. The key difference is that microKanren uses stream-based interleaving for completeness, while our engine uses tabled memoization with lattice-based aggregation. Stream interleaving produces answers lazily but does not cache or share results between branches; tabling trades laziness for guaranteed sharing and termination on finite domains.

To our knowledge, **no prior work expresses microKanren's unification primitives as algebraic effects in a language with effect handlers**. The combination of unification-as-effect with tabled memoization-as-effect is novel and enables clean composition — the `logic` effect handles substitution state, the `cache` effect handles tabling, and Koka's effect system ensures they compose correctly.

### Parsing Strategies as Evaluation Strategies

Our demand-driven tabled resolution can be understood through the lens of parsing strategies, which have long served as a laboratory for studying the spectrum between top-down and bottom-up evaluation [Sikkel 1997; Shieber, Schabes, and Pereira 1995].

In pure top-down evaluation (Prolog-style SLD resolution, recursive-descent parsing), the goal determines computation but evaluation may diverge or redundantly recompute. In pure bottom-up evaluation (Datalog-style saturation, CYK parsing), all derivable facts are computed regardless of the goal. **Left-corner parsing** [Rosenkrantz and Lewis 1970; Demers 1977] occupies an intermediate position: the goal nonterminal filters which grammar rules are applicable, but recognition proceeds bottom-up from the left corner of each rule. Pereira and Shieber [1987] showed this strategy can be implemented in Prolog via a grammar transform, and Shieber, Schabes, and Pereira [1995] unified these strategies within a deductive parsing framework using tabled inference.

Our framework occupies an analogous position for program analysis:

| Left-Corner Parsing | Our Framework |
|---|---|
| Goal nonterminal to parse | Goal query to resolve |
| Left corner (first RHS symbol) | Ground/syntax-directed inputs |
| Bottom-up recognition from input | Forward evaluation from base facts |
| Top-down completion of remaining RHS | Demand-driven resolution of subgoals |
| Chart / memo table | Tabling with lattice fixpoint |

Like left-corner parsing, we use the goal to determine which rules are relevant, then evaluate those rules starting from their grounded inputs (base facts, syntax-directed components), memoizing intermediate results. This avoids both the non-termination risks of pure top-down evaluation and the exhaustive saturation of pure bottom-up analysis.

The **magic sets transformation** [Beeri and Ramakrishnan 1991] achieves a similar effect for Datalog by rewriting bottom-up programs to incorporate top-down demand. Our approach achieves this integration directly through the evaluation strategy — the `memo`/`depend` mechanism naturally combines demand-driven goal selection with bottom-up result propagation — rather than through program transformation. The connection between tabled resolution [Chen and Warren 1996] and chart parsing [Earley 1970] has been noted in the logic programming literature [Johnson 1995; McAllester 2002]. Our work can be seen as bringing the left-corner insight — that the goal selects rules while grounded information drives evaluation within those rules — to the setting of program analysis with per-relation lattice policies.

### Abstract Interpretation and ADI

**Abstracting Abstract Machines (AAM)** [Van Horn and Might 2010] and **Abstracting Definitional Interpreters (ADI)** [Darais et al. 2017] show that a concrete interpreter, when composed with memoization and a finite store abstraction, yields a sound abstract interpreter. The key insight is that memoization + finite abstraction = termination + soundness.

Our 0CFA example directly realizes this pattern: the bigstep evaluation rules define a "concrete interpreter," the tabled engine provides memoization, and the `nondet-set` lattice policy provides collecting semantics. The store-passing variant shows that the ADI pattern works with explicit store threading — the memo key projects only input positions (expression, store), and the lattice collects all (value, store') outputs.

The contribution relative to AAM/ADI is that this pattern falls out naturally from our rule-based tabled execution, rather than being hand-coded per analysis. The user writes evaluation rules in the same style as a paper's inference rules; the framework derives the memoized abstract interpreter by selecting the right lattice policy and memo-key projection.

~ todo
Also cite: Gilray et al. "Pushdown Control-Flow Analysis for Free" for
finitization and allocation strategies in AAM.
Johnson & Van Horn "Abstracting Abstract Control" for store-widening vs store-passing.
~

### Type-Directed Overloading and Implicits

**Scala implicits** and **Haskell typeclasses** provide type-directed dispatch for selecting implementations. Koka's implicit parameters serve a similar role in our framework: per-relation lattice policies, bridge conversions, and external solvers are all resolved by the type system at compile time.

The specific pattern of using **phantom-typed tags** to drive implicit resolution for analysis-specific behavior is central to our design. A `pred-tag<r>` carries a phantom type `r` that the compiler uses to look up the corresponding `rel-memo-lattice<r>` — the user declares the policy once, and all uses of that relation automatically receive the correct lattice. Similarly, the `forward-bridge` uses `?to-term`, `?judgment-name`, and `?to-fact-args` implicits to traverse heterogeneous type-level structures, converting typed rule definitions to engine format without user-written boilerplate.

This is related to the **type class metaprogramming** patterns in Haskell (e.g., GHC.Generics, deriving strategies) and **compile-time reflection** in Scala 3. Our approach is lighter-weight: Koka's implicit parameters are resolved by name and type at each call site, without the full machinery of type class instances or macro expansion. The trade-off is less expressiveness (no instance overlapping, no superclass constraints) but more predictability in resolution.

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
