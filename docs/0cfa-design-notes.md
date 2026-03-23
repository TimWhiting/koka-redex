# 0CFA Design Notes: Abstracting Definitional Interpreters in koka-redex

## Key Insight: Fully Ground Syntax-Directed Rules

The correct approach avoids DFS entirely. All goals should be **fully ground** and **syntax-directed** — the expression determines which rule fires, and the "output" (value set) is accumulated in the memo table via the lattice, not threaded through unification variables.

Previous successful 0CFA implementation using `fixpoint-memo` worked because:
- `eval(expr)` is the memo key (fully ground — the expression IS the key)
- The lattice (`nondet-set`) collects all values that expression can evaluate to
- No unification variables in goals — everything is ground
- No DFS fallback needed — the memo engine handles everything

The current koka-redex rules produce non-ground goals because output positions (value, store') are unification variables. This forces DFS fallback, which doesn't table results and doesn't explore all paths.

**Fix:** Restructure rules so all goals are ground. The memo table accumulates outputs via the lattice rather than unification.

## What Went Wrong: Non-Ground Outputs

Our attempts:

**Substitution-based bigstep** (`cfa-demo.kk`): Rules are `eval(expr, value)` where value is a unification variable. Ground when the expected result is specified. But substitution eliminates sharing — each call site gets its own copy of the body, no merging point.

**Store-passing** (`cfa-store-demo.kk`): Rules are `eval(expr, store_in, value, store_out)` where value and store_out are unification variables. These non-ground goals fall to DFS, which:
- Only finds one solution (no collecting semantics)
- Doesn't populate the memo table for inner goals
- Doesn't backtrack across premise boundaries

**Global bind** (`cfa-bind-demo.kk`): Split E-App into E-App-Bind and E-App-Eval. The `bind(x, v)` relation has `nondet-set`, but premises like `eval(e1, lam(x, e3))` are non-ground (e3 is a variable), falling to DFS.

**Custom memo keys** (`?memo-key`): Added `memo-key` field to `relation-policy` that extracts only input positions for the key. But the memo engine can't propagate output bindings from cached results to subsequent premises — it returns `search-change` (a proof), not substitutions.

## Architecture: What's Needed

### 1. Fully Ground Encoding (Priority: Do First)

Encode 0CFA so ALL goals are ground. The expression is the key. Example:

```
// Instead of: eval(expr, ?value) with value as unification variable
// Use:        eval(expr) with lattice collecting {value1, value2, ...}

// The "store" is the memo table itself:
//   eval(var(x)) depends on bind(x)
//   bind(x) depends on eval(app(e1,e2)) where e1 can be lam(x,...)
```

This requires the rules to produce ground goals for all premises. For `eval(app(e1, e2))`:
- Premise: `eval(e1)` → memo returns `{lam(x1,e3), lam(x2,e4), ...}`
- For EACH value `lam(xi, ei)` in that set: derive `bind(xi, v)` for each `v` in `eval(e2)`
- For EACH body `ei`: the result set of `eval(app(e1,e2))` includes all of `eval(ei)`

The challenge: iterating over the value set of a premise. This is where multi-conclusion rules or external relations come in — the engine needs to enumerate the memo table entries for a subgoal and derive consequences from each.

### 2. Choose-Based Backtracking (Priority: Core Infrastructure)

Adopt the microkanren `ctl choose` pattern from `koka-community/samples/microkanren`. Replace DFS's first-match semantics with nondeterministic search that explores all alternatives:

```koka
effect search
  ctl choose(alternatives: list<a>): a
  final ctl fail(): b
```

This enables:
- Backtracking across premise boundaries (not just within one premise)
- External relations returning multiple results that integrate with backtracking
- Natural composition with the existing `each` combinator in the memo engine

### 3. Input/Output Modes via Type-Level Key Projection (Priority: Ergonomics)

User defines rules over typed facts. A type-level transformation marks input vs output positions and derives the `?memo-key` function:

```koka
// Type-level: eval has 2 input positions (expr, store), 2 output (value, store')
type eval-mode = type-cons<input, type-cons<input, type-cons<output, type-cons<output, type-nil>>>>

// Derived: key function strips output positions
// eval(expr, store, value, store') → "eval(expr, store)"
```

This composes with `rule<n,p,c>` and `relation-def<r>` — the bridge can derive both search rules AND key functions from the type-level encoding.

## Implementation Plan

### Phase 1: Fully Ground 0CFA Demo (Immediate)
- Encode 0CFA with ALL ground goals
- `eval(expr)` as key, `nondet-set` collects values
- `bind(x)` as key, `nondet-set` collects values
- Multi-conclusion: use separate rules for bind and eval from the same application
- May need engine support for iterating over a subgoal's collected values
- Target: `let f = λx.x in (f λa.a)(f λb.b)` shows over-approximation

### Phase 2: Choose-Based Backtracking
- Add `choose` effect to the search engine (following microkanren pattern)
- Replace DFS first-match with nondeterministic exploration
- External solver results integrate naturally via `choose`
- Enables non-ground goals to explore all paths

### Phase 3: Type-Level Key Projection
- Input/output mode markers on relation arguments
- Type-level transformation to derive `?memo-key` from modes
- Bridge derives both search rules and key functions
- User writes typed rules, framework handles everything

### Phase 4: External Relations as Choose-Compatible Solvers
- `neq`, `lookup`, `store-update` as external Koka functions
- Return results via `choose` for natural backtracking integration
- Pluggable per-relation via implicit dispatch

## What Currently Works

- `proof-search-demo.kk` — ground reachability with memo fixpoint ✓
- `proof-search-untyped-bigstep-demo.kk` — bigstep eval with proof output ✓
- `proof-search-implicit-policy-demo.kk` — typed policy resolution ✓
- `cfa-demo.kk` — substitution-based bigstep with `search-table` API ✓
- `cfa-store-demo.kk` — store-passing with external lookup/neq ✓
- `cfa-bind-demo.kk` — global bind approach (partial) ✓
- External solver infrastructure (`?external` parameter) ✓
- Custom memo key infrastructure (`?memo-key` in policy) ✓ (plumbing only)

## What's Implemented But Not Yet Working

- Custom memo key + non-ground output propagation (infinite loop due to freshened variables)
- Over-approximation in store-passing demo (DFS doesn't backtrack across premises)
- Global bind approach for multi-conclusion rules (inner goals resolved by DFS, not tabled)
