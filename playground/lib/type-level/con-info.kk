/*----------------------------------------------------------------------------
   Copyright 2024, Koka-Community Authors

   Licensed under the MIT License ("The License"). You may not
   use this file except in compliance with the License. A copy of the License
   can be found in the LICENSE file at the root of this distribution.
----------------------------------------------------------------------------*/
module type-level/con-info

pub import type-level/structs
pub import type-level/list
pub import type-level/nil

// Generic constructor descriptor for ADTs.
//
// A con-info<tag, fields, whole> describes one constructor of type `whole`:
//   tag: a phantom type identifying the constructor (e.g. `type var-expr`)
//        The constructor name is derived via `?name/show: () -> name<tag>`
//   fields: the field types as a type-level structure
//      - string              for atom/leaf constructors (single string field)
//      - t-cons<a, b>        for node constructors (one or more typed fields)
//      - t-nil               for nullary constructors (no fields)
//   whole: the ADT type being described
//
// The shape of `fields` drives implicit resolution for generic derivation
// (to-term, from-term, show, etc.) — each shape maps to a different
// overload, making resolution an exhaustive pattern match on types.

pub struct con-info<t, f, w>
  con-match: (w) -> maybe<f>
  con-build: (f) -> w

pub fun con-info/con-name<tag, fields, whole>(ci: con-info<tag, fields, whole>, ?name/show: () -> name<tag>): string
  ?name/show().s

// ============================================================================
// Generic show for values described by a type-info (t-struct of con-infos)
//
// Tries each constructor's match. On success, shows "Name(field1, field2, ...)".
// ============================================================================

pub alias show-matcher<w> = (w) -> div maybe<string>

// Atom: con-info<tag, string, whole> — show as just the string value
pub fun atom/show-con<tag,whole>(ci: con-info<tag, string, whole>, ?name/show: () -> name<tag>): show-matcher<whole>
  fn(v) match (ci.con-match)(v)
    Just(nm) -> Just(nm)
    Nothing -> Nothing

// Node: con-info<tag, t-cons<a, b>, whole> — show as "Name(fields...)"
pub fun node/show-con<tag,whole>(ci: con-info<tag, t-cons<a, b>, whole>,
  ?name/show: () -> name<tag>,
  ?show-fields: t-cons<a, b> -> div list<string>): show-matcher<whole>
  fn(v) match (ci.con-match)(v)
    Just(fs) -> Just(ci.con-name ++ "(" ++ fs.show-fields.join(", ") ++ ")")
    Nothing -> Nothing

// Nullary: con-info<tag, t-nil, whole> — show as just the name
pub fun nullary/show-con<tag,whole>(ci: con-info<tag, t-nil, whole>, ?name/show: () -> name<tag>): show-matcher<whole>
  fn(v) match (ci.con-match)(v)
    Just(_) -> Just(ci.con-name)
    Nothing -> Nothing

// show-fields: walk t-cons chain showing each element
pub fun tcons/show-fields(TCons(h, t): t-cons<a, t-cons<b, c>>,
  ?show: a -> div string, ?tail/show-fields: t-cons<b, c> -> div list<string>): div list<string>
  Cons(h.show, t.show-fields)

pub fun end/show-fields(TCons(h, _): t-cons<a, t-nil>,
  ?show: a -> div string): div list<string>
  [h.show]

// show-matchers: t-struct traversal collecting show-matcher list
pub fun tstruct/show-matchers<tag, tag1, fields, fields1, whole>(s: t-struct<n, con-info<tag, fields, whole>, t-struct<n1, con-info<tag1, fields1, whole>, r>>,
  ?show-con: con-info<tag, fields, whole> -> show-matcher<whole>,
  ?show-matchers: t-struct<n1, con-info<tag1, fields1, whole>, r> -> list<show-matcher<whole>>
): e list<show-matcher<whole>>
  Cons(s.head-field.v.show-con, s.rest.show-matchers)

pub fun nil/show-matchers<tag, fields, whole>(s: t-struct<n, con-info<tag, fields, whole>, t-nil>,
  ?show-con: con-info<tag, fields, whole> -> show-matcher<whole>
): e list<show-matcher<whole>>
  [s.head-field.v.show-con]

// generic-show: try each show-matcher until one matches
pub fun generic-show<whole>(v: whole, matchers: list<show-matcher<whole>>): div string
  match matchers
    Cons(m, rest) -> match m(v)
      Just(s) -> s
      Nothing -> generic-show(v, rest)
    Nil -> "<unknown>"

pub fun derive-show<whole>(v: whole, info: s,
  ?show-matchers: s -> list<show-matcher<whole>>): div string
  generic-show(v, info.show-matchers)
