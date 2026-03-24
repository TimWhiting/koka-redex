module scratch/min-repro2

// Minimal repro attempt: type-struct + to-list with a phantom-typed field

import type-level/structs
import type-level/list
import type-level/nil

// Phantom type (the key ingredient)
pub type wrap<a>
  WrapA(nm: string, id: int)
  WrapB(v: int)

pub fun wrap/to-int(w: wrap<a>): int
  match w
    WrapA(_, id) -> id
    WrapB(v) -> v

// Zero-field singleton
pub type tag
  Tag

// map-field for struct traversal — takes a type-cons with phantom wrap and tag
pub fun my/map-field(TCons(h, TCons(_t, tail)): type-cons<wrap<int>, type-cons<tag, wrap<int>>>): int
  h.to-int + tail.to-int

// Build the struct
fun single-mk(v: a): type-struct<string, a, type-nil>
  any/mk-field(v) + TNil

fun cons-mk(v: a, rest: () -> type-struct<_, _, _>): type-struct<string, a, type-struct<_, _, _>>
  any/mk-field(v) + rest()

fun test()
  with cons-mk(TCons(WrapA("x", 1), TCons(Tag, WrapA("y", 2))))
  single-mk(TCons(WrapB(10), TCons(Tag, WrapB(20))))

pub fun main()
  val s = test()
  val r : list<int> = type-level/structs/to-list(s)
  r.foreach fn(x) println(x.show)
