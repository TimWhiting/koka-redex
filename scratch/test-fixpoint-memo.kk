module scratch/test-fixpoint-memo

import std/fixpoint/fixpoint-memo
import std/fixpoint/lattice

fun ping(n: int)
  with each <- memo(n)
  each([fn() n])

fun int-list-lattice(): change-lattice<list<int>, int>
  Change-lattice([], fn(old, new) list/join(old, new, ?(==) = int/(==)), fn(x) x)

pub fun main()
  val res =
    with std/fixpoint/fixpoint-memo/cache(?change-lattice = int-list-lattice(), ?order2 = int/order2)
    ping(1)
  println(res.show)
