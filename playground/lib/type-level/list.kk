/*----------------------------------------------------------------------------
   Copyright 2024, Koka-Community Authors

   Licensed under the MIT License ("The License"). You may not
   use this file except in compliance with the License. A copy of the License
   can be found in the LICENSE file at the root of this distribution.
----------------------------------------------------------------------------*/
module type-level/list
pub import type-level/nil

pub infixr 5 (+:)

pub type t-cons<a, b>
  TCons(
    head : a,
    tail : b
  )
pub fun (+:)(a: a, rst: b) : t-cons<a, b>
   TCons(a, rst)

pub fun tcons/append(TCons(h, t): t-cons<a, b>, r: c, ?append: (b, c) -> d) : t-cons<a, d>
   TCons(h, t.append(r))
pub fun tcons/(++)(TCons(h, t): t-cons<a, b>, r: c, ?(++): (b, c) -> d) : t-cons<a, d>
   TCons(h, t ++ r)

pub fun tcons/map(TCons(x, t) : t-cons<a, b>, ?mapper : (a -> c), ?map : (b) -> d) : t-cons<c, d>
  TCons(mapper(x), t.map)

pub fun tcons/to-list(TCons(h, t) : t-cons<a, b>, ?to-list : (b) -> list<a>) : list<a>
  Cons(h, t.to-list)

pub fun map/(==)(TCons(h1, t1) : t-cons<a, b>, TCons(h2, t2) : t-cons<a, b>, ?a/(==) : (a, a) -> bool, ?tail/(==) : (b, b) -> bool) : bool
  a/(==)(h1, h2) && tail/(==)(t1, t2)

// Primary workhorse for showing type-level lists
// Essentially we are pattern matching on the first two levels of types to avoid ambiguity
pub fun map/cons-show(t : t-cons<a,t-cons<b,c>>, ?a/show : a -> e string, ?tail/cons-show : t-cons<b,c> -> e list<string>) : e list<string>
  match t
    TCons(h, t') -> Cons(h.show, t'.cons-show)
// Base case for showing type-level lists: when the tail is `t-nil`, we can show the head and stop
pub fun nil/cons-show(t : t-cons<a,t-nil>, ?a/show : a -> e string) : e list<string>
  match t
    TCons(h, TNil) -> Cons(h.show, [])
// Once there is one more level of nesting (no more nested `tcons`), we can delegate to the regular `show` instance for that type (in case the user didn't add TNil)
pub fun default/mapend/cons-show(t : t-cons<a,b>, ?a/show : a -> e string, ?tail/show : b -> e string) : e list<string>
  match t
    TCons(h, t') -> Cons(h.show, [t'.show])

pub fun default/cons/show(t: a, ?a/cons-show : a -> e list<string>) : e string
  "[" ++ t.cons-show.join(",") ++ "]"