# Koka Codegen Bug: `_lp_1_rp_` undeclared in generated C

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
