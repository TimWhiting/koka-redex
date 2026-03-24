module scratch/min-repro

// Minimal repro for _lp_1_rp_ codegen bug.
// Narrowing down: pattern<a> + type-struct + to-list

import type-level/structs
import type-level/list
import type-level/nil

// Phantom-typed wrapper (like pattern<a>)
pub type pat<a>
  PVar(nm: string, id: int)
  PTerm(v: int)

pub fun pat/to-int(p: pat<a>): int
  match p
    PVar(_, id) -> id
    PTerm(v) -> v

// Zero-field singleton
pub type marker
  Marker

// map-field for the struct traversal
pub fun my/map-field(TCons(h, TCons(_m, t)): type-cons<pat<int>, type-cons<marker, pat<int>>>): int
  h.to-int + t.to-int

// Build using syntax.kk-like constructors
fun single-entry(v: a): type-struct<string, a, type-nil>
  any/mk-field(v) + TNil

fun cons-entry(v: a, rest: () -> type-struct<_, _, _>): type-struct<string, a, type-struct<_, _, _>>
  any/mk-field(v) + rest()

fun test-struct()
  with cons-entry(TCons(PVar("x", 1), TCons(Marker, PVar("y", 2))))
  single-entry(TCons(PTerm(10), TCons(Marker, PTerm(20))))

pub fun main()
  val s = test-struct()
  val results : list<int> = type-level/structs/to-list(s)
  results.foreach fn(r)
    println(r.show)
