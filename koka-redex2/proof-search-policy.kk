module koka-redex2/proof-search-policy

import koka-redex2/proof-search

/*
  Typed implicit policy layer
  ===========================

  Goal:
  - Keep proof-search runtime representation unchanged (predicate names are strings).
  - Provide a typed front layer where lattice policy is resolved via implicits.

  Idea:
  - pred-tag<r> names a runtime predicate and carries a phantom type r.
  - rel-lattice<r> carries the policy for relation type r.
  - policy/of(tag) uses implicit rel-lattice<r> to produce relation-policy.

  This enables per-relation policy declarations like:
    fun lattice/reach(): rel-lattice<r-reach> Rel-lattice(LatNondetSet)
    fun lattice/edge(): rel-lattice<r-edge> Rel-lattice(LatDetError)

  Then policies can be materialized from typed tags without manually writing
  string-based Relation-policy entries.
*/

pub value struct pred-tag<r>
  name: string

pub value struct rel-lattice<r>
  lattice: relation-lattice

pub fun mk/pred-tag(name: string): pred-tag<r>
  Pred-tag(name)

pub fun policy/of(tag: pred-tag<r>, ?rel-lattice: rel-lattice<r>): relation-policy
  match tag
    Pred-tag(name) ->
      match rel-lattice
        Rel-lattice(lattice) -> Relation-policy(name, lattice)

pub fun map-field(tag: pred-tag<r>, ?policy/of: pred-tag<r> -> relation-policy): relation-policy
  tag.policy/of

pub fun to-policies(tags: list<pred-tag<r>>, ?policy/of: pred-tag<r> -> relation-policy): list<relation-policy>
  tags.map(policy/of)
