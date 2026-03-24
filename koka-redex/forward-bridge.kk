module koka-redex/forward-bridge

// Bridge from typed rules (syntax.kk) to the forward engine (forward.kk).
//
// The key mechanism: relation markers in type-cons chains.
// Users write `e \ REval \ v` where REval carries ?pred-name.
// Elements before the marker are inputs, after are outputs.
// The bridge builds Fact(pred-name, inputs ++ outputs).

pub import koka-redex/term
pub import koka-redex/syntax
pub import koka-redex/forward
pub import type-level/structs
pub import type-level/list
pub import type-level/nil

// ============================================================================
// Built-in to-term converters
// ============================================================================

pub fun term/to-term(t: term): term
  t

pub fun string/to-term(s: string): term
  TAtom(s)

pub fun int/to-term(i: int): term
  TInt(i)

// ============================================================================
// Output-arg collection (after the relation marker)
// ============================================================================

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

// ============================================================================
// Chain → fact conversion (with input/output split)
// ============================================================================

// Pre-marker recursive: head is a value, tail has more (including marker)
pub fun tcons/to-fact-args(
  TCons(h, t): type-cons<a, b>,
  ?to-term: a -> term,
  ?to-fact-args: b -> div (list<term>, string, list<term>)
): div (list<term>, string, list<term>)
  val (inputs, pred, outputs) = t.to-fact-args
  (Cons(h.to-term, inputs), pred, outputs)

// Marker in middle: head has ?pred-name, tail is cons of outputs
pub fun marker/to-fact-args(
  TCons(h, t): type-cons<a, b>,
  ?pred-name: a -> string,
  ?to-output-args: b -> list<term>
): div (list<term>, string, list<term>)
  ([], h.pred-name, t.to-output-args)

// Marker near end: head has ?pred-name, tail is a single bare value
pub fun marker-end/to-fact-args(
  TCons(h, t): type-cons<a, b>,
  ?pred-name: a -> string,
  ?to-term: b -> term
): div (list<term>, string, list<term>)
  ([], h.pred-name, [t.to-term])

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

// ============================================================================
// Fact-level identity converters (for rules already using fact/term)
// ============================================================================

pub fun fact/to-fact(f: fact): div fact
  f

// ============================================================================
// Premise chain conversion
// ============================================================================

// Fact-level: single fact
pub fun fact/to-premises(f: fact): list<fact>
  [f]

// Fact-level: cons of facts
pub fun fact-tcons/to-premises(
  TCons(h, t): type-cons<fact, b>,
  ?to-premises: b -> list<fact>
): list<fact>
  Cons(h, t.to-premises)

// Nil: no premises
pub fun tnil/to-premises(_: type-nil): list<fact>
  Nil

// Domain-type: single judgement chain → convert to fact
pub fun default/to-premises(
  c: a,
  ?to-fact: a -> div fact
): div list<fact>
  [c.to-fact]

// Domain-type: cons of judgement chains
// The head is a type-cons (a judgement chain), distinguished from fact
pub fun chain-tcons/to-premises(
  TCons(h, t): type-cons<type-cons<a1, a2>, b>,
  ?to-fact: type-cons<a1, a2> -> div fact,
  ?to-premises: b -> div list<fact>
): div list<fact>
  Cons(h.to-fact, t.to-premises)

// ============================================================================
// Rule conversion
// ============================================================================

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

// ============================================================================
// Memo-key derivation
// ============================================================================

// Create a memo-key function that projects only the first n args
pub fun make-memo-key(pred: string, n-inputs: int): div ((fact) -> div string)
  val n = n-inputs
  fn(f)
    match f
      Fact(p, args) ->
        if p == pred then Fact(p, args.take(n)).show
        else f.show

// Derive a (pred-name, memo-key) pair from a sample judgement chain.
// The chain is traversed via to-fact-args to count input positions.
// Usage: derive-key(e \ REval \ v) gives ("eval", key-fn-that-takes-1-input)
pub fun derive-key(
  sample: a,
  ?to-fact-args: a -> div (list<term>, string, list<term>)
): div (string, (fact) -> div string)
  val (inputs, pred, _) = sample.to-fact-args
  (pred, make-memo-key(pred, inputs.length))

// Compose memo-keys for multiple relations
pub fun compose-memo-keys(
  keys: list<(string, (fact) -> div string)>
)
  fn(f)
    match f
      Fact(pred, _) ->
        match keys.find(fn(p) p.fst == pred)
          Just(kv) -> (kv.snd)(f)
          Nothing -> f.show

// ============================================================================
// External solver composition
// ============================================================================

pub fun compose-externals(
  solvers: list<(string, (fact) -> <logic,div> maybe<list<fact>>)>
)
  fn(goal)
    match goal
      Fact(pred, _) ->
        match solvers.find(fn(p) p.fst == pred)
          Just(kv) -> (kv.snd)(goal)
          Nothing -> Nothing
