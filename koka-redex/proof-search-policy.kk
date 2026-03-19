module koka-redex/proof-search-policy

import koka-redex/proof-search
import std/fixpoint/lattice

/*
  Typed implicit policy layer
  ===========================

  Goal:
  - Keep proof-search runtime representation unchanged (predicate names are strings).
  - Provide a typed front layer where lattice policy is resolved via implicits.

  Idea:
  - pred-tag<r> names a runtime predicate and carries a phantom type r.
  - rel-memo-lattice<r> carries the memo lattice for relation type r.
  - policy/of(tag) uses implicit rel-memo-lattice<r> to produce relation-policy.

  This enables per-relation policy declarations like:
    val reach/rel-memo-lattice : rel-memo-lattice<r-reach>
      = Rel-memo-lattice(memo-lattice/nondet-set())
    val edge/rel-memo-lattice : rel-memo-lattice<r-edge>
      = Rel-memo-lattice(memo-lattice/det-error())

  Then policies can be materialized from typed tags without manually writing
  string-based Relation-policy entries.
*/

pub value struct pred-tag<r>
  name: string

pub value struct rel-memo-lattice<r>
  memo-lattice: change-lattice<relation-memo-state, found-proof>

pub fun mk/pred-tag(name: string): pred-tag<r>
  Pred-tag(name)

pub fun policy/of(tag: pred-tag<r>, ?rel-memo-lattice: rel-memo-lattice<r>): relation-policy
  match tag
    Pred-tag(name) ->
      match rel-memo-lattice
        Rel-memo-lattice(memo-lattice) -> Relation-policy(name, memo-lattice, DepthHybrid)

pub fun policy/of-depth(tag: pred-tag<r>, depth-mode: relation-depth-mode,
                        ?rel-memo-lattice: rel-memo-lattice<r>): relation-policy
  match tag
    Pred-tag(name) ->
      match rel-memo-lattice
        Rel-memo-lattice(memo-lattice) -> Relation-policy(name, memo-lattice, depth-mode)

pub fun map-field(tag: pred-tag<r>, ?policy/of: pred-tag<r> -> relation-policy): relation-policy
  tag.policy/of

pub fun to-policies(tags: list<pred-tag<r>>, ?policy/of: pred-tag<r> -> relation-policy): list<relation-policy>
  tags.map(policy/of)
