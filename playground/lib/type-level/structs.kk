/*----------------------------------------------------------------------------
   Copyright 2024, Koka-Community Authors

   Licensed under the MIT License ("The License"). You may not
   use this file except in compliance with the License. A copy of the License
   can be found in the LICENSE file at the root of this distribution.
----------------------------------------------------------------------------*/
module type-level/structs
pub import type-level/nil

pub infixr 5 (*:)

pub struct field<n,f>
  v : f

pub fun field/show(f: field<n,f>, ?field/show: f -> e string, ?name/show: () -> name<n>) : e string
  ?name/show().s ++ ":" ++ f.v.show

pub struct name<n>
  s: string

pub type t-struct<n,f,r>
  TStruct(
    head-field : field<n,f>,
    rest : r
  )

pub fun any/mk-field<n,a>(v: a): field<n,a>
  Field(v)
pub fun field/(*:)(f1: field<n,f>, f2: field<n1,f1>) : t-struct<n,f,t-struct<n1,f1,t-nil>>
  TStruct(f1, TStruct(f2, TNil))
pub fun end/(*:)(f1: field<n,f>, _: t-nil) : t-struct<n,f,t-nil>
  TStruct(f1, TNil)
pub fun prepend/(*:)(f1: field<n,f>, s: t-struct<n1,f1,r>) : t-struct<n,f,t-struct<n1,f1,r>>
  TStruct(f1, s)

pub fun direct/field(self: t-struct<n,f,r>) : field<n,f>
  self.head-field
pub fun recur/field(self: t-struct<n,f,r>, ?field: r -> field<n1,f1>) : field<n1,f1>
  self.rest.field

pub fun direct/update-field(self: t-struct<n,f,r>, new-field: field<n,f1>) : t-struct<n,f1,r>
  TStruct(new-field, self.rest)
pub fun recur/update-field(self: t-struct<n,f,r>, new-field: field<n1,f1>, ?update-field: (r, field<n1,f1>) -> r1) : t-struct<n,f,r1>
  TStruct(self.head-field, self.rest.update-field(new-field))

pub fun to-list(self: t-struct<n,f,r>, ?map-field: f -> e a, ?to-list: r -> e list<a>): e list<a>
  Cons(map-field(self.head-field.v), self.rest.to-list)
// Primary workhorse for showing type-level structs
// Essentially we are pattern matching on the first two levels of types to avoid ambiguity
pub fun map/struct-show(t : t-struct<n,a,t-struct<n1,b,c>>, ?field/show : field<n,a> -> e string, ?tail/struct-show : t-struct<n1,b,c> -> e list<string>) : e list<string>
  match t
    TStruct(h, t') -> Cons(h.show, t'.struct-show)
// Base case for showing type-level structs: when the tail is `t-nil`, we can show the head and stop
pub fun nil/struct-show(t : t-struct<n,a,t-nil>, ?field/show : field<n,a> -> e string) : e list<string>
  match t
    TStruct(h, TNil) -> Cons(h.show, [])
// Once there is one more level of nesting (no more nested `tcons`), we can delegate to the regular `show` instance for that type (in case the user didn't add TNil)
pub fun default/mapend/struct-show(t : t-struct<n,a,b>, ?field/show : field<n,a> -> e string, ?tail/struct-show : b -> e string) : e list<string>
  match t
    TStruct(h, t') -> Cons(h.show, [t'.struct-show])

pub fun default/struct/show(t: a, ?a/struct-show : a -> e list<string>) : e string
  "{" ++ t.struct-show.join(",") ++ "}"