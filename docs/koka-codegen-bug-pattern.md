# Koka Codegen Bug: `_lp_1_rp_` undeclared in generated C

## Root Cause Analysis

The C backend's `genLambda` function (in `src/Backend/C/FromCore.hs`, line ~1228) computes free variables of a lambda via `freeLocals (Lam params eff body)`. This analysis finds a spurious `()` (unit) value as a free variable. The unit value comes from `type-nil/TNil` (a zero-field constructor) that appears in the lambda body's pattern matches after inlining.

The C codegen then:
1. Creates a closure struct with `kk_unit_t _lp_1_rp_` as a captured field
2. Generates a constructor `new_main_funNNN(_lp_1_rp_, _ctx)` that requires the unit argument
3. But the calling scope (the `main` function) never declares `_lp_1_rp_`

**Verified via `--showfcore`:** The final Core IR shows the lambda with NO free variables. The spurious capture is introduced by the C backend, not present in the Core.

**Proposed fix:** In `genLambda`, filter unit-typed variables from `freeVars` since `kk_Unit` can always be reconstructed locally. Alternatively, fix the free variable analysis to not include variables that are produced by pattern matching on zero-field constructors inside the lambda body.

**Minimal trigger conditions:**
- A `type-struct` with `to-list`/`map-field` implicit traversal
- Where the `map-field` lambda's body pattern-matches on a value containing a zero-field constructor (e.g., `type-nil/TNil`)
- And the implicit chain involves multiple levels of resolution (forward-bridge's chain-to-fact, premise conversion, etc.)

The bug does NOT trigger with simpler implicit chains (direct `map-field` without multi-level implicit resolution).

## Minimal Reproduction

```koka
import type-level/structs
import type-level/list
import type-level/nil

pub type pattern<a>
  PatVar(nm: string, id: int)
  PatTerm(t: int)  // simplified

pub fun pattern/to-term(p: pattern<a>): int
  match p
    PatVar(_, id) -> id
    PatTerm(t) -> t

pub type marker
  Marker

pub infixr 5 (\)
pub fun (\)(h: a, t: b): type-cons<a, b>
  TCons(h, t)

pub type rule<n, p, c>
  Rule(name: n, premises: p, conclusion: c)

pub type relation-def<r>
  RelationDef(rules: r)

pub fun single/rule(premises: p, name: n, conclusion: c): type-struct<n, rule<n, p, c>, type-nil>
  any/mk-field(Rule(name, premises, conclusion)) + TNil

pub fun cons/rule(premises: p, name: n, conclusion: c, rest: () -> type-struct<_, _, _>): type-struct<n, rule<n, p, c>, type-struct<_, _, _>>
  any/mk-field(Rule(name, premises, conclusion)) + rest()

// The map-field that triggers the bug
pub fun my/map-field(r: rule<n, p, c>, ?name/show: n -> string): string
  match r
    Rule(name, _, _) -> name.show

pub fun my/to-rules(RelationDef(rules): relation-def<r>, ?to-list: r -> list<string>): list<string>
  rules.to-list

fun test-rel()
  with relation-def
  cons/rule(TNil, "base", PatVar("x", 0) \ Marker \ PatVar("y", 0))
    single/rule(TNil, "step", PatVar("a", 0) \ Marker \ PatVar("b", 0))

pub fun main()
  val rel = test-rel()
  val rules = my/to-rules(rel)  // THIS triggers _lp_1_rp_ codegen error
  rules.foreach(println)
```

## Error

```
.koka/.../generated.c:NNN: error: use of undeclared identifier '_lp_1_rp_'
```

The `_lp_1_rp_` appears to be the name-mangled `()` unit value. It's used in closure constructors passed to `to-list` but not declared in the enclosing scope.

## Environment

- Koka v3.2.3
- macOS Darwin 25.3.0
- The bug occurs when `pattern<a>` (a phantom-typed type) is used inside type-struct rule conclusions, and `to-list` traverses the struct via implicit `map-field`.
- Using `fact` (a non-phantom type) in the same position works fine.

## Workaround

Use non-phantom types (like `fact`) instead of `pattern<a>` in rule conclusions. The `pattern<a>` approach type-checks correctly — only codegen fails.
