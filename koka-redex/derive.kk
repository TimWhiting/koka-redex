module koka-redex/derive

// Generic derivation of to-term and from-term from con-info descriptors.
//
// Usage per domain type:
//   1. Define phantom tag + name/show per constructor
//   2. Define con-info per constructor
//   3. Combine into a type-info via t-struct
//   4. Define to-term/from-term using derive-to-term/derive-from-term
//      with val n/to-term = expr/to-term trick to close recursive loop

pub import type-level/con-info
pub import type-level/structs
pub import type-level/list
pub import type-level/nil
pub import koka-redex/term


// ============================================================================
// fields-to-terms: t-cons chain → list<term>
//
// Nested-type disambiguation:
//   t-cons<a, t-cons<b, c>>  — recursive: more fields
//   t-cons<a, t-nil>         — base: last field
//   t-cons<a, b>             — default: two bare fields
// ============================================================================

pub fun tcons/fields-to-terms(TCons(h, t): t-cons<a, t-cons<b, c>>,
  ?to-term: a -> div term,
  ?tail/fields-to-terms: t-cons<b, c> -> div list<term>): div list<term>
  Cons(h.to-term, t.fields-to-terms)

pub fun end/fields-to-terms(TCons(h, _): t-cons<a, t-nil>,
  ?to-term: a -> div term): div list<term>
  [h.to-term]

pub fun default/end/fields-to-terms(TCons(h, tl): t-cons<a, b>,
  ?a/to-term: a -> div term, ?b/to-term: b -> div term): div list<term>
  [h.to-term, tl.to-term]

// ============================================================================
// terms-to-fields: list<term> → t-cons chain
//
// Nested-type disambiguation on return type:
//   t-cons<a, t-cons<b, c>>  — recursive: consume head, recurse on tail
//   t-cons<a, t-nil>         — base: consume last element
// ============================================================================

pub fun tcons/terms-to-fields(
  args: list<term>,
  ?from-term: term -> <exn,div> a,
  ?tail/terms-to-fields: list<term> -> <exn,div> t-cons<b, c>
): <exn,div> t-cons<a, t-cons<b, c>>
  match args
    Cons(h, t) -> TCons(h.from-term, t.terms-to-fields)
    _ -> throw("terms-to-fields: not enough args")

pub fun end/terms-to-fields(
  args: list<term>,
  ?from-term: term -> <exn,div> a
): <exn,div> t-cons<a, t-nil>
  match args
    Cons(h, _) -> TCons(h.from-term, TNil)
    _ -> throw("terms-to-fields: not enough args")

// ============================================================================
// to-term: matcher overloads per con-info field shape
// ============================================================================

pub alias to-term-matcher<w> = (w) -> div maybe<term>

// fields = string → TAtom
pub fun atom/to-matcher<tag,whole>(ci: con-info<tag, string, whole>): to-term-matcher<whole>
  fn(v) match (ci.con-match)(v)
    Just(nm) -> Just(TAtom(nm))
    Nothing -> Nothing

// fields = t-cons<a, b> → TNode(name, fields)
pub fun node/to-matcher<tag,whole>(ci: con-info<tag, t-cons<a, b>, whole>,
  ?name/show: () -> name<tag>,
  ?fields-to-terms: t-cons<a, b> -> div list<term>): to-term-matcher<whole>
  val nm = ci.con-name
  fn(v) match (ci.con-match)(v)
    Just(fs) -> Just(TNode(nm, fs.fields-to-terms))
    Nothing -> Nothing

// fields = t-nil → TNode(name, [])
pub fun nullary/to-matcher<tag,whole>(ci: con-info<tag, t-nil, whole>, ?name/show: () -> name<tag>): to-term-matcher<whole>
  val nm = ci.con-name
  fn(v) match (ci.con-match)(v)
    Just(_) -> Just(TNode(nm, []))
    Nothing -> Nothing

// ============================================================================
// to-matchers: t-struct traversal collecting matcher list
// ============================================================================

pub fun tstruct/to-matchers<tag, tag1, fields, fields1, whole>(s: t-struct<n, con-info<tag, fields, whole>, t-struct<n1, con-info<tag1, fields1, whole>, r>>,
  ?to-matcher: con-info<tag, fields, whole> -> to-term-matcher<whole>,
  ?to-matchers: t-struct<n1, con-info<tag1, fields1, whole>, r> -> list<to-term-matcher<whole>>
): list<to-term-matcher<whole>>
  Cons(s.head-field.v.to-matcher, s.rest.to-matchers)

pub fun nil/to-matchers<tag, fields, whole>(s: t-struct<n, con-info<tag, fields, whole>, t-nil>,
  ?to-matcher: con-info<tag, fields, whole> -> to-term-matcher<whole>
): list<to-term-matcher<whole>>
  [s.head-field.v.to-matcher]

// ============================================================================
// derive-to-term
// ============================================================================

pub fun generic-to-term<whole>(v: whole, matchers: list<to-term-matcher<whole>>): div term
  match matchers
    Cons(m, rest) -> match m(v)
      Just(t) -> t
      Nothing -> generic-to-term(v, rest)
    Nil -> TAtom("<unknown>")

pub fun derive-to-term<whole>(v: whole, info: s,
  ?to-matchers: s -> list<to-term-matcher<whole>>): div term
  generic-to-term(v, info.to-matchers)

// ============================================================================
// from-term: matcher overloads per con-info field shape
// ============================================================================

pub alias from-term-matcher<w> = (term) -> <exn,div> maybe<w>

// fields = string → match TAtom
pub fun atom/from-matcher<tag,whole>(ci: con-info<tag, string, whole>): from-term-matcher<whole>
  fn(t) match t
    TAtom(nm) -> Just((ci.con-build)(nm))
    _ -> Nothing

// fields = t-cons<a, b> → match TNode(name, args), convert args to fields
pub fun node/from-matcher<tag,whole>(ci: con-info<tag, t-cons<a, b>, whole>,
  ?name/show: () -> name<tag>,
  ?terms-to-fields: list<term> -> <exn,div> t-cons<a, b>): from-term-matcher<whole>
  val nm = ci.con-name
  fn(t) match t
    TNode(n, args) | n == nm -> Just((ci.con-build)(args.terms-to-fields))
    _ -> Nothing

// fields = t-nil → match TNode(name, [])
pub fun nullary/from-matcher<tag,whole>(ci: con-info<tag, t-nil, whole>, ?name/show: () -> name<tag>): from-term-matcher<whole>
  val nm = ci.con-name
  fn(t) match t
    TNode(n, _) | n == nm -> Just((ci.con-build)(TNil))
    _ -> Nothing

// ============================================================================
// from-matchers: t-struct traversal collecting from-matcher list
// ============================================================================

pub fun struct/from-matchers<tag, tag1, fields, fields1, whole>(s: t-struct<n, con-info<tag, fields, whole>, t-struct<n1, con-info<tag1, fields1, whole>, r>>,
  ?from-matcher: con-info<tag, fields, whole> -> from-term-matcher<whole>,
  ?from-matchers: t-struct<n1, con-info<tag1, fields1, whole>, r> -> list<from-term-matcher<whole>>
): list<from-term-matcher<whole>>
  Cons(s.head-field.v.from-matcher, s.rest.from-matchers)

pub fun nil/from-matchers<tag, fields, whole>(s: t-struct<n, con-info<tag, fields, whole>, t-nil>,
  ?from-matcher: con-info<tag, fields, whole> -> from-term-matcher<whole>
): list<from-term-matcher<whole>>
  [s.head-field.v.from-matcher]

// ============================================================================
// derive-from-term
// ============================================================================

pub fun generic-from-term<whole>(t: term, matchers: list<from-term-matcher<whole>>): <exn,div> whole
  match matchers
    Cons(m, rest) -> match m(t)
      Just(v) -> v
      Nothing -> generic-from-term(t, rest)
    Nil -> throw("from-term: no constructor matched " ++ t.show)

pub fun derive-from-term<whole>(t: term, info: s,
  ?from-matchers: s -> list<from-term-matcher<whole>>): <exn,div> whole
  generic-from-term(t, info.from-matchers)
