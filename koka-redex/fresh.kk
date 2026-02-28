module koka-redex/fresh

// Named effect for generating fresh variables of generic type `<t>`
pub named effect fresh<t>
  fun generate-fresh(): t

// Handler that runs a computation with a specific prefix for fresh variables
pub fun with-fresh(pref: string, gen: (string, int) -> t, action: (ev<fresh<t>>) -> <div|e> b): <div|e> b
  var counter := 0
  with f <- named handler
    fun generate-fresh()
      counter := counter + 1
      gen(pref, counter)
      
  action(f)

pub fun fresh2(gen: () -> e t): e (t, t)
  (gen(), gen())

pub fun fresh3(gen: () -> e t): e (t, t, t)
  (gen(), gen(), gen())

pub fun fresh4(gen: () -> e t): e (t, t, t, t)
  (gen(), gen(), gen(), gen())

pub fun fresh5(gen: () -> e t): e (t, t, t, t, t)
  (gen(), gen(), gen(), gen(), gen())
