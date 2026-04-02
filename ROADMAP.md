# Koka Redex: Roadmap (April 2026)

## Current Architecture

### Core Modules

**`koka-redex/term.kk`** — Universal value representation (`term`, `fact`, `rule`). Includes `TRef(id)` for opaque interned values. `ref-pool<a>` named effect for first-class intern pools. Generic `ref/to-term` and `ref/from-term` for any interned type. Primitive `to-term`/`from-term` for string/int.

**`koka-redex/logic.kk`** — Microkanren-style unification as an algebraic effect. `unify`, `resolve`, `freshv`, `save`/`restore`. Novel: no prior work expresses microkanren unification as algebraic effects with handlers.

**`koka-redex/forward.kk`** — Demand-driven tabled resolution engine. Combines unification (logic effect), tabled memoization (fixpoint-memo), and external relation dispatch. `normalize-fact` canonicalizes memo keys preserving variable sharing. Per-relation lattice policies via `?join-policy` implicit.

**`koka-redex/forward-bridge.kk`** — Compiles typed rules to the forward engine via implicits. Chain-to-fact conversion with relation marker detection. Auto-derives memo keys and lattice policies from relation structure. External solver composition.

**`koka-redex/syntax.kk`** — Type-level rule encoding. `rule<n,p,c>`, `relation-def<r>`, external-rule builders. Operators `\`, `|-`, `\\`, `---`, `-->` for natural rule syntax.

**`koka-redex/pattern.kk`** — `pat<a>` phantom-typed metavariables. `PatVar(nm, id)` for metavars, `PatTerm(t)` for concrete terms.

**`koka-redex/derive.kk`** — Auto-derive `to-term`, `from-term`, `show` from `con-info<tag, fields, whole>` descriptors. Per-backend render entry builders via `map-field` overloads with `latex-entry`/`md-entry` return-type dispatch. Type-safe constructor rendering with `name<tag>` + t-cons fields via `field-witness<b>`.

**`koka-redex/latex.kk`**, **`koka-redex/markdown.kk`** — Rule rendering with generic `pat/show-latex`/`pat/show-md` for patterns.

**`type-level/con-info.kk`** — Generic constructor descriptor `con-info<tag, fields, whole>` with phantom type tags. Generic `show` derivation via `show-matchers`.

### Key Design Patterns

- **Implicits as exhaustive type-level pattern match**: Nested-type disambiguation (e.g., `t-cons<a, t-cons<b,c>>` vs `t-cons<a, t-nil>`) makes implicit resolution unambiguous.
- **Cross-module recursive implicits**: `val n/to-term = expr/to-term` binds self as local implicit to close the recursive loop.
- **Structurally-driven resolution**: `field-witness<b>` carries known type structure from con-info, preventing unbounded implicit expansion.
- **Return-type dispatch**: `latex-entry` vs `md-entry` wrapper types drive `to-list` to resolve different `map-field` overloads per backend.
- **Per-relation policies**: Relation marker phantom types carry `?join-policy`, `?judgment-name` implicits, derived from relation-def structure.
- **First-class intern pools**: `ev<ref-pool<a>>` is a named handler value — no effect in caller signatures. Passed as `?pool` implicit, resolved by type. Pool creation is scoped to analysis entry point.

### Examples & Tests

- **`pattern/cfa.kk`**: 0CFA with store-passing. Simplified domain types (`EVar(string)`, no `EAtom`). Derived to-term/from-term. Per-backend LaTeX/Markdown rendering.
- **`pattern/cfa-interned.kk`**: 0CFA with interned stores. Stores are `list<(string, expr)>` interned as opaque `TRef(id)`. Store operations (lookup, extend) are external solvers that dereference via `ref-pool`. Same results as structural version.
- **`pattern/type-infer.kk`**: Type inference with unification. Derived to-term/from-term for expr/ty/tenv.
- **`pattern/reachability.kk`**, **`typed/reach-typed.kk`**: Reachability examples.
- **`typed/cfa-typed.kk`**, **`typed/type-infer-typed.kk`**: Typed examples with manual Any constructors.
- **39 tests**: 23 derive (including 4 ref-pool tests) + 8 forward + 8 bridge.

---

## Phase 1: Abstract Term Slots (Done)

### Problem

The `term` tree representation makes all operations O(n) in term size:
- Equality (`fact/eq`): deep structural walk
- Memo keys (`fact.show`): serialize entire term to string
- Store lookup: linear scan over `TNode("scons", ...)` chains
- Unification: structural walk of both terms

### Design: Opaque Ground References

Add a new term constructor for interned domain values:

```koka
type term
  TVar(name: string, id: int)    // unifiable metavar
  TAtom(name: string)
  TInt(value: int)
  TNode(name: string, args: list<term>)
  TRef(id: int)                  // opaque ground reference
```

`TRef` is **ground** — the engine treats it like `TAtom` (never unifies into, never walks its structure). External solvers dereference through an intern pool to get the real value.

### Interning Infrastructure

The `std/data/intern` library provides scoped interning with O(1) equality via index comparison. However, its current implementation uses **linear search** (O(n) per intern call).

**Improvement needed**: Replace the linear scan with an `int-map` (integer patricia trie) or nested `rbmap` for O(log n) intern operations. The type-level list machinery could drive smart field ordering in nested maps — put the most discriminating constructor field first.

For now, the linear implementation is fine for validation. Optimize the intern backend when it becomes the bottleneck.

### How It Works

```koka
// Setup: create typed intern pools
with intern-creator
val store-pool = make-interner(?(==)=store/(==))

// Domain → term: intern the store, get an opaque id
fun store/to-term(s: store): term
  TRef(store-pool.intern(s).idx)

// External solver: dereference the id to operate on the real store
fun store-lookup(goal: fact): maybe<list<fact>>
  match goal
    Fact("lookup", [TRef(store-id), key, _]) ->
      val store = store-pool.deref(store-id)
      ...
```

### Engine Changes

1. **`term.kk`**: Add `TRef(id: int)` constructor. Update `term/eq`, `term/show`, `term/is-ground`.
2. **`logic.kk`**: `walk` treats `TRef` as ground (like `TAtom`). `unify(TRef(a), TRef(b))` succeeds iff `a == b` (O(1)). `unify(TRef(_), TVar(_))` binds the variable to the ref.
3. **`forward.kk`**: `normalize-fact` leaves `TRef` as-is (already ground). `render-term` shows `TRef(id)` as `#id` or deferences for display.
4. **`derive.kk`**: New con-info field shape for interned types. `to-term` interns, `from-term` dereferences.

### Con-Info for Abstract Types

A new field shape `intern-ref<store>` (or similar) would tell the derive system this field is interned:

```koka
// Instead of structural encoding:
pub val scons-store/con-info : con-info<scons-store, t-cons<string, t-cons<expr, t-cons<store, t-nil>>>, store>

// The store itself becomes abstract — operations are external
// The intern pool provides to-term (TRef) and from-term (deref)
```

The exact API depends on how we thread the intern pool. Options:
- Thread via effect (cleanest but adds effect to signatures)
- Thread via module-level mutable state (simple but less composable)
- Thread via implicit parameter (compositional, no effect)

### Validation

Convert the CFA example to use interned stores. Compare:
- Correctness: same results as structural version
- Memo table size: should have fewer entries (TRef ids are canonical)
- Store operations: lookup by name in the real store, not term-walking

---

## Phase 2: Full Hash-Consing (Medium-term)

### Design

Intern ALL terms. Every `TNode`, `TAtom`, `TInt` gets a unique integer id. The term type becomes a handle:

```koka
type hterm
  HTerm(id: int)

// Intern table maps id → term structure (children are also ids)
type term-node
  NVar(name: string, vid: int)
  NAtom(name: string)
  NInt(value: int)
  NNode(name: string, args: list<hterm>)
  NRef(ref-id: int)  // opaque abstract slot (from Phase 1)
```

### Benefits

- **O(1) equality** for all terms (compare ids)
- **Integer memo keys** (or small tuples of integers)
- **Structural sharing**: `app(big-expr, big-expr)` stores `big-expr` once
- **Canonical forms**: `normalize-fact` is free (intern already canonicalizes)
- **Foundation for e-graphs** (ids already exist, just add union-find)

### Intern Backend

The `std/data/intern` linear search should be replaced with an efficient lookup structure:

- **Integer patricia trie** (`int-map`): O(log n) lookup by structural hash. Already available in koka-community std. Natural fit since term-node children are integer ids.
- **Nested maps with type-level field ordering**: For `NNode(name, args)`, use `rbmap<string, int-map<...>>` keyed first by constructor name, then by child ids. The type-level list from con-info could drive which field to discriminate on first.
- **Trie-based unique table**: Path through the trie encodes `(constructor, child1-id, child2-id, ...)`. Lookup is O(arity × log n). Used by BDD libraries (CUDD).

### Unification with Hash-Consed Terms

Substitution becomes `int-map<int, int>` (variable-id → term-id). `walk(id, subst)` follows the map. `unify(id1, id2, subst)`:
1. Walk both to roots
2. If equal ids → success (O(1))
3. If one is a variable → extend subst
4. If both are nodes → check constructor, recursively unify children
5. If incompatible → fail

The structural recursion is the same as current unification, but equality checks at each level are O(1).

---

## Phase 3: E-Graph Integration (Longer-term)

### E-Graphs as Relations

An e-graph equivalence can be viewed as a relation:

```
equiv(term-id-1, term-id-2)
```

With hash-consed terms, this is a fact in the forward engine. The key property — **congruence closure** — says:

```
equiv(a, a') ⟹ equiv(f(a, b), f(a', b))
```

This COULD be encoded as a rule in the relation system. But explicit rule firing for congruence is O(n) per merge (must check all terms containing the merged id). Traditional e-graphs implement this via a specialized rebuild phase that's amortized efficient.

### Hybrid Approach

- Use the **relation system** to declare equalities (rewrite rules are just rules that produce `equiv` facts)
- Implement **congruence closure** as a specialized external solver (not as explicit rules) — when `equiv(a, a')` is added, the solver propagates congruence automatically using union-find
- The forward engine sees `equiv` as another relation with a custom lattice policy
- **Extraction** (finding the best representative) is a post-processing step over the union-find

### Union-Find vs Unification

Both track equalities, but at different levels:

- **Unification** (logic.kk): Operates on terms with variables. Structural — matches constructors, recurses on children. Can fail. Produces substitutions. Used during rule matching.
- **Union-find** (e-graph): Operates on equivalence classes of ground terms. Flat — just merges sets. Always succeeds. No variables. Used to track discovered equalities.

They coexist: unification resolves metavariables during rule matching, while union-find tracks discovered equalities between ground (hash-consed) terms. The e-graph's congruence closure adds structural awareness to union-find — "if children are equivalent, parents are equivalent" — which is like "unification in reverse."

---

## Other Planned Work

### Pattern Constructor Derivation
Pattern constructors (`p-var`, `p-lam`) are per-constructor boilerplate. Each mirrors a con-info but takes `pat<field>` args. The curried API is ergonomically important for rule writing. May provide a generic helper but per-constructor wrappers are likely unavoidable without macros.

### Typed Example Migration
The `typed/*` examples have `Any`/`TVar` metavar constructors. Need a new con-info field shape for the "metavar" pattern mapping to `TVar(name, id)`.

### Capture-Avoiding Substitution
Likely implemented as an external relation. The forward engine doesn't need to know about binding structure — substitution is just another external operation like store lookup.

### Paper
See `SHORT-PAPER-OUTLINE.md` and `docs/paper-sections-draft.md`. The story: typed rule schemas + forward-first execution + per-relation lattice policies + external solver dispatch. The derive system demonstrates "one specification, multiple backends" (execution + LaTeX + Markdown).

---

## File Structure

```
koka-redex/
├── koka-redex/
│   ├── term.kk              # core types + primitive to-term/from-term
│   ├── logic.kk             # microkanren unification effect
│   ├── forward.kk           # tabled resolution engine + lattice policies
│   ├── forward-bridge.kk    # typed rules → engine via implicits
│   ├── syntax.kk            # type-level rule encoding
│   ├── pattern.kk           # pat<a> phantom-typed metavars
│   ├── derive.kk            # auto-derive to-term/from-term/show/render
│   ├── latex.kk             # LaTeX rule rendering
│   ├── markdown.kk          # Markdown rule rendering
│   └── fresh.kk             # fresh variable generation
├── examples/
│   ├── pattern/              # clean domain types + pat<a>
│   │   ├── cfa.kk           # 0CFA (derived, simplified)
│   │   ├── type-infer.kk    # type inference (derived)
│   │   └── reachability.kk
│   ├── typed/                # domain types with Any constructors
│   │   ├── cfa-typed.kk
│   │   ├── type-infer-typed.kk
│   │   └── reach-typed.kk
│   └── term/                 # raw term-level examples
│       ├── reachability.kk
│       ├── cfa-store.kk
│       └── type-infer.kk
├── test/
│   ├── test-derive.kk       # 19 tests
│   ├── test-forward.kk      # 8 tests
│   └── test-bridge.kk       # 8 tests
└── scratch/                  # explorations
    └── type-info-to-term.kk  # derive prototype

type-level/ (koka-community)
├── structs.kk               # t-struct, field, name
├── list.kk                  # t-cons
├── nil.kk                   # t-nil
└── con-info.kk              # con-info + show derivation
```
