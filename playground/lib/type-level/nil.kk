/*----------------------------------------------------------------------------
   Copyright 2024, Koka-Community Authors

   Licensed under the MIT License ("The License"). You may not
   use this file except in compliance with the License. A copy of the License
   can be found in the LICENSE file at the root of this distribution.
----------------------------------------------------------------------------*/
module type-level/nil

// An empty type-level list
pub type t-nil
  TNil

// List operations for t-nil
pub fun append(_: t-nil, r : b) : b
  r
pub fun (++)(_: t-nil, r : b) : b
  r
pub fun map(l: t-nil) : t-nil
  l
pub fun to-list(_: t-nil): list<a>
  Nil
pub fun (==)(_: t-nil, _: t-nil): bool
  True

// Show instances for t-nil
pub fun strlist/show(_: t-nil): list<string>
  Nil
pub fun default/empty/show(_: t-nil): string
  "[]"
