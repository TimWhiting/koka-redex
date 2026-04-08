module koka-redex/forward-bridge

// Bridge from typed rules (syntax.kk) to the forward engine (forward.kk).
//
// The key mechanism: relation markers in tcons chains.
// Users write `e |- REval \ v` where REval carries `?judgment-name`.
// Elements before the marker are inputs, after are outputs.
// The bridge builds `Fact(judgment-name, inputs ++ outputs)`.

pub import koka-redex/term
pub import koka-redex/syntax
pub import koka-redex/forward
pub import type-level/structs
pub import type-level/list
pub import type-level/nil
import std/core/undiv

// ----------------------------------------------------------------------------
// Implicit chains for external solver input/output conversion
// ----------------------------------------------------------------------------

// from-inputs: convert list<term> to a tcons chain of domain values
pub fun tcons/from-inputs(
  args: list<term>,
  ?from-term: term -> <exn,div> a,
  ?from-inputs: list<term> -> <exn,div> b
): <exn,div> t-cons<a, b>
  match args
    Cons(t, rest) -> TCons(t.from-term, rest.from-inputs)
    _ -> throw("from-inputs: not enough args for tcons")

// Base: single remaining input (bare value)
pub fun end/from-inputs(
  args: list<term>,
  ?from-term: term -> <exn,div> a
): <exn,div> a
  match args
    Cons(t, _) -> t.from-term
    _ -> throw("from-inputs: not enough args for base")

// to-outputs: convert domain output value(s) to list<term>
pub fun tcons/to-outputs(
  TCons(h, t): t-cons<a, b>,
  ?to-term: a -> div term,
  ?to-outputs: b -> div list<term>
): div list<term>
  Cons(h.to-term, t.to-outputs)

// Base: single output value
pub fun end/to-outputs(
  v: a,
  ?to-term: a -> div term
): div list<term>
  [v.to-term]

// ----------------------------------------------------------------------------
// Output-arg collection (after the relation marker)
// ----------------------------------------------------------------------------

// Recursive: head is a value, tail is more cons
pub fun tcons/to-output-args(
  TCons(h, t): t-cons<a, b>,
  ?to-term: a -> div term,
  ?to-output-args: b -> div list<term>
): div list<term>
  Cons(h.to-term, t.to-output-args)

// Base: two-element cons (last pair of outputs)
pub fun end/to-output-args(
  TCons(h, t): t-cons<a, b>,
  ?to-term: a -> div term,
  ?tail/to-term: b -> div term
): div list<term>
  [h.to-term, t.tail/to-term]

// ----------------------------------------------------------------------------
// Chain → fact conversion (with input/output split)
// ----------------------------------------------------------------------------

// Pre-marker recursive: head is a value, tail has more (including marker)
pub fun tcons/to-fact-args(
  TCons(h, t): t-cons<a, b>,
  ?to-term: a -> div term,
  ?to-fact-args: b -> div (list<term>, string, list<term>),
  ?before-judgment: b -> ()
): div (list<term>, string, list<term>)
  val (inputs, judgment, outputs) = t.to-fact-args
  (Cons(h.to-term, inputs), judgment, outputs)

// Pre-marker recursive: head is a value, tail has more (including marker)
pub fun default/after/to-fact-args(
  TCons(h, t): t-cons<a, b>,
  ?to-term: a -> div term,
  ?to-fact-args: b -> div (list<term>, string, list<term>)): div (list<term>, string, list<term>)
  val (inputs, judgment, outputs) = t.to-fact-args
  (inputs, judgment, Cons(h.to-term, outputs))

pub fun tnil/to-fact-args(tn: t-nil) : (list<term>, string, list<term>)
  (Nil, "", Nil)
pub fun tnil/to-output-args(tn: t-nil) : div list<term>
  Nil

pub fun tcons/before-judgment(b: t-cons<a,b>, ?before-judgment: b -> ()): ()
  ()
pub fun judgement/before-judgment(j: t-cons<a,b>, ?judgment-name: name<a>): ()
  ()

// Marker in middle: head has ?judgment-name, tail is cons of outputs
pub fun marker/to-fact-args(
  TCons(_, t): t-cons<a, b>,
  ?judgment-name: name<a>,
  ?to-output-args: b -> div list<term>
): div (list<term>, string, list<term>)
  ([], judgment-name.s, t.to-output-args)

// Marker near end: head has ?judgment-name, tail is a single bare value
pub fun marker-end/to-fact-args(
  TCons(_, t): t-cons<a, b>,
  ?judgment-name: name<a>,
  ?to-term: b -> div term
): div (list<term>, string, list<term>)
  ([], judgment-name.s, [t.to-term])

// Convert a typed judgement chain to a fact
pub fun chain/to-fact(
  chain: a,
  ?to-fact-args: a -> div (list<term>, string, list<term>)
): div fact
  val (inputs, pred, outputs) = chain.to-fact-args
  Fact(pred, inputs ++ outputs)

// Convert and also get the number of input args (for memo-key)
pub fun chain/to-fact-info(
  chain: a,
  ?to-fact-args: a -> div (list<term>, string, list<term>)
): div (fact, int)
  val (inputs, pred, outputs) = chain.to-fact-args
  (Fact(pred, inputs ++ outputs), inputs.length)

// ----------------------------------------------------------------------------
// Fact-level identity converters (for rules already using fact/term)
// ----------------------------------------------------------------------------

pub fun fact/to-fact(f: fact): div fact
  f

// ----------------------------------------------------------------------------
// Premise chain conversion
// ----------------------------------------------------------------------------

// Nil: no premises
pub fun tnil/to-premises(_: t-nil): list<fact>
  Nil

// Fact-level: single fact (base case)
pub fun fact/to-premises(f: fact): list<fact>
  [f]

// Skip premise-sep marker, continue with tail
pub fun sep/to-premises(
  TCons(_sep, t): t-cons<premise-sep, b>,
  ?to-premises: b -> div list<fact>
): div list<fact>
  t.to-premises

// Fact-level: fact followed by premise-sep + more facts
pub fun fact-sep/to-premises(
  TCons(h, t): t-cons<fact, t-cons<premise-sep, b>>,
  ?to-premises: t-cons<premise-sep, b> -> div list<fact>
): div list<fact>
  Cons(h, t.to-premises)

// Premise whose head is a judgement chain (tcons), followed by more premises
pub fun chain-tcons/to-premises(
  TCons(h, t): t-cons<t-cons<a1, a2>, b>,
  ?to-fact: t-cons<a1, a2> -> div fact,
  ?to-premises: b -> div list<fact>
): div list<fact>
  Cons(h.to-fact, t.to-premises)

// Domain-type: single judgement chain → convert to fact (base case)
pub fun default/to-premises(
  c: a,
  ?to-fact: a -> div fact
): div list<fact>
  [c.to-fact]

// ----------------------------------------------------------------------------
// Rule conversion
// ----------------------------------------------------------------------------

// Convert a typed rule to a forward-engine rule
pub fun rule/to-forward-rule(
  r: koka-redex/syntax/rule<n, p, c>,
  ?name/show: n -> div string,
  ?to-premises: p -> div list<fact>,
  ?conclusion/to-premises: c -> div list<fact>
): div koka-redex/term/rule
  match r
    Rule(name, premises, conclusion) ->
      koka-redex/term/Rule(name.show, premises.to-premises, conclusion.to-premises)

// map-field for t-struct traversal (used by to-list)
pub fun forward/map-field(
  r: koka-redex/syntax/rule<n, p, c>,
  ?name/show: n -> div string,
  ?to-premises: p -> div list<fact>,
  ?conclusion/to-premises: c -> div list<fact>
): div koka-redex/term/rule
  r.rule/to-forward-rule

// Convert a relation-def to a list of forward-engine rules
pub fun relation/to-rules(
  RelationDef(rules): relation-def<r>,
  ?to-list: r -> div list<koka-redex/term/rule>
): div list<koka-redex/term/rule>
  rules.to-list

// ----------------------------------------------------------------------------
// Memo-key derivation
// ----------------------------------------------------------------------------

// Create a memo-key function that projects only the first n args
pub fun make-memo-key(pred: string, n-inputs: int): ((fact) -> string)
  fn(f)
    match f
      Fact(p, args) ->
        if p == pred then Fact(p, args.take(n-inputs)).show
        else f.show

// Derive a (judgment-name, memo-key) pair from a sample judgement chain.
// The chain is traversed via to-fact-args to count input positions.
// Usage: derive-key(e |- REval \ v) gives ("eval", key-fn-that-takes-1-input)
pub fun derive-key(
  sample: a,
  ?to-fact-args: a -> (list<term>, string, list<term>)
): (string, (fact) -> string)
  val (inputs, pred, _) = sample.to-fact-args
  (pred, make-memo-key(pred, inputs.length))

// Compose memo-keys for multiple relations
pub fun compose-memo-keys(keys: list<(string, (fact) -> string)>): ((fact) -> string)
  fn(f: fact)
    match f
      Fact(pred, _) ->
        match keys.find(fn(p) p.fst == pred)
          Just((_, snd)) -> snd(f.pretend-decreasing)
          Nothing -> f.show

// ----------------------------------------------------------------------------
// External solver composition
// ----------------------------------------------------------------------------

pub fun compose-externals(
  solvers: list<(string, (fact) -> <logic,div,exn> maybe<list<fact>>)>
)
  fn(goal)
    match goal
      Fact(pred, _) ->
        match solvers.find(fn(p) p.fst == pred)
          Just(kv) -> (kv.snd)(goal)
          Nothing -> Nothing
            // throw("compose-externals: no solver found for predicate " ++ pred ++ " in " ++ solvers.map(fst).show)

// ----------------------------------------------------------------------------
// Judgment signatures: unified key + policy derivation (two-step bridge)
//
// Step 1: collect-sigs extracts judgment signatures from all conclusions
// Step 2: sigs drive memo-key and lattice policy construction
// ----------------------------------------------------------------------------

pub value struct judgment-sig
  pred: string
  n-inputs: int
  policy: join-policy

// Default join policy: set-join
pub fun default/join-policy(_a: a): join-policy
  set-join

// ---- Extract sigs from conclusion chains ----

// Single judgement chain → one sig
pub fun default/to-sigs(
  c: a,
  ?to-fact-args: a -> div (list<term>, string, list<term>)
): div list<judgment-sig>
  val (inputs, pred, _) = c.to-fact-args
  [Judgment-sig(pred, inputs.length, set-join)]

// Chain separated by \\ → multiple sigs
pub fun chain-sep/to-sigs(
  TCons(h, t): t-cons<t-cons<a1, a2>, t-cons<premise-sep, b>>,
  ?to-fact-args: t-cons<a1, a2> -> div (list<term>, string, list<term>),
  ?to-sigs: b -> div list<judgment-sig>
): div list<judgment-sig>
  val (inputs, pred, _) = h.to-fact-args
  Cons(Judgment-sig(pred, inputs.length, set-join), t.tail.to-sigs)

// Skip premise-sep in sig extraction
pub fun sep/to-sigs(
  TCons(_sep, t): t-cons<premise-sep, b>,
  ?to-sigs: b -> div list<judgment-sig>
): div list<judgment-sig>
  t.to-sigs

// ---- map-field overloads for sig collection ----

pub fun sig/map-field(
  Rule(_name, _premises, conclusion): koka-redex/syntax/rule<n, p, c>,
  ?to-sigs: c -> div list<judgment-sig>
): div list<judgment-sig>
  conclusion.to-sigs

pub fun ext-sig/map-field(e: external-entry): div list<judgment-sig>
  [Judgment-sig(e.ext-pred, e.ext-n-inputs, set-join)]

// ---- Collect and validate ----

pub fun relation/collect-sigs(
  RelationDef(rules): relation-def<r>,
  ?to-list: r -> div list<list<judgment-sig>>
): <div,exn> list<judgment-sig>
  rules.to-list.flatmap(id).validate-sigs

fun validate-sigs(xs: list<judgment-sig>): <div,exn> list<judgment-sig>
  fun go(remaining: list<judgment-sig>, acc: list<judgment-sig>): <div,exn> list<judgment-sig>
    match remaining
      Nil -> acc.reverse
      Cons(x, rest) ->
        match acc.find(fn(s) s.pred == x.pred)
          Just(existing) ->
            if existing.n-inputs != x.n-inputs then
              throw("judgment '" ++ x.pred ++ "' used inconsistently: "
                ++ existing.n-inputs.show ++ " inputs vs " ++ x.n-inputs.show ++ " inputs")
            go(rest, acc)
          Nothing ->
            go(rest, Cons(x, acc))
  go(xs, [])

// ---- Build memo-key and policies from sigs ----

pub fun sigs-to-memo-key(sigs: list<judgment-sig>): div ((fact) -> string)
  compose-memo-keys(sigs.map(fn(s) (s.pred, make-memo-key(s.pred, s.n-inputs))))

pub fun sigs-to-policies(sigs: list<judgment-sig>): list<(string, join-policy)>
  sigs.map(fn(s) (s.pred, s.policy))

// ----------------------------------------------------------------------------
// relation-entry: sum type for mixed rule/external t-struct traversal
// ----------------------------------------------------------------------------

pub type relation-entry
  RuleEntry(r: koka-redex/term/rule)
  ExtEntry(ext-pred: string, ext-n-inputs: int, ext-solver: (fact) -> <logic,div,exn> maybe<list<fact>>)

// map-field: rule -> relation-entry
pub fun rule-entry/map-field(
  r: koka-redex/syntax/rule<n, p, c>,
  ?name/show: n -> div string,
  ?to-premises: p -> div list<fact>,
  ?conclusion/to-premises: c -> div list<fact>
): div relation-entry
  RuleEntry(r.rule/to-forward-rule)

// map-field: external-entry -> relation-entry
pub fun ext-entry/map-field(e: external-entry): div relation-entry
  ExtEntry(e.ext-pred, e.ext-n-inputs, e.ext-solver)


// Partition relation-entries into rules and external solvers
fun partition-entries(entries: list<relation-entry>): (list<koka-redex/term/rule>, list<(string, (fact) -> <logic,div,exn> maybe<list<fact>>)>)
  match entries
    Nil -> ([], [])
    Cons(RuleEntry(r), rest) ->
      val (rules, exts) = partition-entries(rest)
      (Cons(r, rules), exts)
    Cons(ExtEntry(pred, _, solver), rest) ->
      val (rules, exts) = partition-entries(rest)
      (rules, Cons((pred, solver), exts))

// ----------------------------------------------------------------------------
// Typed forward-search (unified: rules + externals from relation-def)
// ----------------------------------------------------------------------------

// Unified forward-search: extracts rules AND externals from relation-def,
// auto-derives memo-key from relation structure.
pub fun forward-search(
  goal: g,
  rel: relation-def<r>,
  ?to-fact: g -> div fact,
  ?to-list: r -> div list<relation-entry>,
  ?collect-sigs: relation-def<r> -> <div,exn> list<judgment-sig>,
  ?initial-facts: list<fact>
): <div,exn> list<(string, list<fact>)>
  val entries = to-list(rel.rules)
  val (rules, ext-pairs) = partition-entries(entries)
  val ext = compose-externals(ext-pairs)
  val sigs = rel.collect-sigs
  val mk = sigs-to-memo-key(sigs)
  val policies = sigs-to-policies(sigs)
  koka-redex/forward/forward-search(goal.to-fact, rules, ?external=ext, ?memo-key=mk, ?lattice-policies=policies, ?initial-facts=initial-facts)

