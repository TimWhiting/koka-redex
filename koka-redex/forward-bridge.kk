module koka-redex/forward-bridge

// Bridge from typed rules (syntax.kk) to the forward engine (forward.kk).
//
// The key mechanism: relation markers in type-cons chains.
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

// from-inputs: convert list<term> to a type-cons chain of domain values
pub fun tcons/from-inputs(
  args: list<term>,
  ?from-term: term -> exn a,
  ?from-inputs: list<term> -> exn b
): exn type-cons<a, b>
  match args
    Cons(t, rest) -> TCons(t.from-term, rest.from-inputs)
    _ -> throw("from-inputs: not enough args for type-cons")

// Base: single remaining input (bare value)
pub fun end/from-inputs(
  args: list<term>,
  ?from-term: term -> exn a
): exn a
  match args
    Cons(t, _) -> t.from-term
    _ -> throw("from-inputs: not enough args for base")

// to-outputs: convert domain output value(s) to list<term>
pub fun tcons/to-outputs(
  TCons(h, t): type-cons<a, b>,
  ?to-term: a -> term,
  ?to-outputs: b -> list<term>
): list<term>
  Cons(h.to-term, t.to-outputs)

// Base: single output value
pub fun end/to-outputs(
  v: a,
  ?to-term: a -> term
): list<term>
  [v.to-term]

// ----------------------------------------------------------------------------
// Built-in to-term converters
// ----------------------------------------------------------------------------

pub fun term/to-term(t: term): term
  t

pub fun string/to-term(s: string): term
  TAtom(s)

pub fun int/to-term(i: int): term
  TInt(i)

// ----------------------------------------------------------------------------
// Output-arg collection (after the relation marker)
// ----------------------------------------------------------------------------

// Recursive: head is a value, tail is more cons
pub fun tcons/to-output-args(
  TCons(h, t): type-cons<a, b>,
  ?to-term: a -> term,
  ?to-output-args: b -> list<term>
): list<term>
  Cons(h.to-term, t.to-output-args)

// Base: two-element cons (last pair of outputs)
pub fun end/to-output-args(
  TCons(h, t): type-cons<a, b>,
  ?to-term: a -> term,
  ?tail/to-term: b -> term
): list<term>
  [h.to-term, t.tail/to-term]

// ----------------------------------------------------------------------------
// Chain → fact conversion (with input/output split)
// ----------------------------------------------------------------------------

// Pre-marker recursive: head is a value, tail has more (including marker)
pub fun tcons/to-fact-args(
  TCons(h, t): type-cons<a, b>,
  ?to-term: a -> term,
  ?to-fact-args: b -> div (list<term>, string, list<term>)
): div (list<term>, string, list<term>)
  val (inputs, pred, outputs) = t.to-fact-args
  (Cons(h.to-term, inputs), pred, outputs)

// Marker in middle: head has ?judgment-name, tail is cons of outputs
pub fun marker/to-fact-args(
  TCons(h, t): type-cons<a, b>,
  ?judgment-name: a -> string,
  ?to-output-args: b -> list<term>
): div (list<term>, string, list<term>)
  ([], h.judgment-name, t.to-output-args)

// Marker near end: head has ?judgment-name, tail is a single bare value
pub fun marker-end/to-fact-args(
  TCons(h, t): type-cons<a, b>,
  ?judgment-name: a -> string,
  ?to-term: b -> term
): div (list<term>, string, list<term>)
  ([], h.judgment-name, [t.to-term])

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
pub fun tnil/to-premises(_: type-nil): list<fact>
  Nil

// Fact-level: single fact (base case)
pub fun fact/to-premises(f: fact): list<fact>
  [f]

// Skip premise-sep marker, continue with tail
pub fun sep/to-premises(
  TCons(_sep, t): type-cons<premise-sep, b>,
  ?to-premises: b -> div list<fact>
): div list<fact>
  t.to-premises

// Fact-level: fact followed by premise-sep + more facts
pub fun fact-sep/to-premises(
  TCons(h, t): type-cons<fact, type-cons<premise-sep, b>>,
  ?to-premises: type-cons<premise-sep, b> -> div list<fact>
): div list<fact>
  Cons(h, t.to-premises)

// Premise whose head is a judgement chain (type-cons), followed by more premises
pub fun chain-tcons/to-premises(
  TCons(h, t): type-cons<type-cons<a1, a2>, b>,
  ?to-fact: type-cons<a1, a2> -> div fact,
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
  ?to-fact: c -> div fact
): div koka-redex/term/rule
  match r
    Rule(name, premises, conclusion) ->
      koka-redex/term/Rule(name.show, premises.to-premises, conclusion.to-fact)

// map-field for type-struct traversal (used by to-list)
pub fun forward/map-field(
  r: koka-redex/syntax/rule<n, p, c>,
  ?name/show: n -> div string,
  ?to-premises: p -> div list<fact>,
  ?to-fact: c -> div fact
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

// ----------------------------------------------------------------------------
// Key-info: per-relation memo-key derivation from relation structure
// ----------------------------------------------------------------------------

// Key info for one relation: predicate name + number of input args
pub value struct key-info
  pred: string
  n-inputs: int

// map-field for key extraction: extract key info from a rule's conclusion
pub fun key/map-field(
  Rule(_name, _premises, conclusion): koka-redex/syntax/rule<n, p, c>,
  ?to-fact-args: c -> div (list<term>, string, list<term>)
): div key-info
  val (inputs, pred, _outputs) = conclusion.to-fact-args
  Key-info(pred, inputs.length)

// Derive key-infos from a relation-def, one per unique predicate
pub fun relation/derive-keys(
  RelationDef(rules): relation-def<r>,
  ?to-list: r -> div list<key-info>
): div list<key-info>
  rules.to-list.unique-by-pred

fun unique-by-pred(keys: list<key-info>): div list<key-info>
  match keys
    Nil -> Nil
    Cons(k, rest) ->
      Cons(k, rest.filter(fn(k2) k2.pred != k.pred).unique-by-pred)

// Convert key-infos into a composed memo-key function
pub fun keys-to-memo-key(keys: list<key-info>): ((fact) -> string)
  compose-memo-keys(keys.map(fn(k) (k.pred, make-memo-key(k.pred, k.n-inputs))))

// ----------------------------------------------------------------------------
// relation-entry: sum type for mixed rule/external type-struct traversal
// ----------------------------------------------------------------------------

pub type relation-entry
  RuleEntry(r: koka-redex/term/rule)
  ExtEntry(ext-pred: string, ext-n-inputs: int, ext-solver: (fact) -> <logic,div,exn> maybe<list<fact>>)

// map-field: rule -> relation-entry
pub fun rule-entry/map-field(
  r: koka-redex/syntax/rule<n, p, c>,
  ?name/show: n -> div string,
  ?to-premises: p -> div list<fact>,
  ?to-fact: c -> div fact
): div relation-entry
  RuleEntry(r.rule/to-forward-rule)

// map-field: external-entry -> relation-entry
pub fun ext-entry/map-field(e: external-entry): div relation-entry
  ExtEntry(e.ext-pred, e.ext-n-inputs, e.ext-solver)

// key map-field: external-entry -> key-info
pub fun ext-key/map-field(e: external-entry): div key-info
  Key-info(e.ext-pred, e.ext-n-inputs)

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
  ?derive-keys: relation-def<r> -> div list<key-info>
): <div,exn> list<(string, list<fact>)>
  val entries = to-list(rel.rules)
  val (rules, ext-pairs) = partition-entries(entries)
  val ext = compose-externals(ext-pairs)
  val mk = keys-to-memo-key(rel.derive-keys)
  koka-redex/forward/forward-search(goal.to-fact, rules, ?external=ext, ?memo-key=mk)

// Stepping-stone: user provides memo-key and external explicitly.
pub fun search(
  goal: g,
  rel: relation-def<r>,
  ?to-fact: g -> div fact,
  ?to-list: r -> div list<koka-redex/term/rule>,
  ?external: (fact) -> <logic,div,exn> maybe<list<fact>>,
  ?memo-key: (fact) -> div string
): <div,exn> list<(string, list<fact>)>
  val rules = to-list(rel.rules)
  val goal-fact = goal.to-fact
  koka-redex/forward/forward-search(goal-fact, rules, ?external=external, ?memo-key=memo-key)

// ----------------------------------------------------------------------------
// Typed external solvers
// ----------------------------------------------------------------------------

// Simple wrapper: pair a predicate name with a solver function
pub fun wrap-external(
  pred: string,
  solver: (fact) -> <logic,div,exn> maybe<list<fact>>
): (string, (fact) -> <logic,div,exn> maybe<list<fact>>)
  (pred, solver)

// Make an external solver for a relation where the solver operates
// at the term level on the arguments.
// The solver receives the list of resolved args and returns
// lists of complete arg-lists for each solution.
pub fun make-external(
  pred: string,
  solver: (list<term>) -> <logic,div,exn> list<list<term>>
): (string, (fact) -> <logic,div,exn> maybe<list<fact>>)
  (pred, fn(goal)
    match goal
      Fact(p, args) ->
        if p == pred then
          val results = solver(args)
          Just(results.map(fn(a) Fact(pred, a)))
        else Nothing
  )
