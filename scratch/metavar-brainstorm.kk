module scratch/metavar-brainstorm

// Brainstorming: better metavariable support for typed rules
//
// PROBLEM: In PLT Redex, metavariables are implicit (nonterminals from the grammar).
// In our typed Koka approach, we need explicit metavar constructors per domain type,
// leading to:
//   - EAny("x", 0)  for "any expression"
//   - XIntAny("n", 0)  for "any integer expression"
//   - SAny("s", 0)  for "any store"
//   - TEAny("env", 0) for "any type environment"
// Each domain type needs its own metavar constructor(s). For structured patterns
// like "any lambda" or "any integer", you need even more constructors.
//
// COMPARISON WITH PLT REDEX:
//   Redex: (define-language L (e ::= x (lambda (x) e) (e e) integer))
//   Rule:  (e_1 e_2) → ... matches ANY application, e_1/e_2 are metavars
//   Int:   integer_1 matches ANY integer
//   Var:   x matches any variable-not-otherwise-mentioned
//
//   Us:    XApp(xv("e1"), xv("e2")) — explicit metavar in each position
//          XIntAny("n", 0) — special constructor for "any int"
//          XVar(xv("x")) — metavar in name position
//
// ============================================================================
// APPROACH 1: Generic metavar wrapper (phantom-typed)
// ============================================================================
//
// Instead of adding XAny to each type, have a single generic metavar:
//
//   type metavar<a>
//     MVar(name: string, id: int)
//     Concrete(value: a)
//
// Then domain types use metavar<T> where T would normally go:
//
//   type expr
//     EVar(nm: metavar<string>)
//     EApp(e1: metavar<expr>, e2: metavar<expr>)
//     ELam(x: metavar<string>, body: metavar<expr>)
//     EInt(n: metavar<int>)
//
// Usage in rules:  ELam(MVar("x", 0), MVar("e", 0))
// Usage concrete:  ELam(Concrete("x"), Concrete(EVar(Concrete("y"))))
//
// to-term for metavar<a>:
//   MVar(n, i) -> TVar(n, i)
//   Concrete(v) -> v.to-term
//
// PROS: One metavar type for all positions. No XAny/SAny/TEAny needed.
// CONS: Very verbose for concrete programs. ELam(Concrete("x"), Concrete(...))
//       Nested metavar<metavar<...>> is ugly.
//       Every field becomes metavar<T>, changing the domain type signature.

// ============================================================================
// APPROACH 2: Two-level types (pattern vs concrete)
// ============================================================================
//
// Separate "pattern" types from "concrete" types:
//
//   type expr          // concrete: no metavars
//     EVar(nm: string)
//     EApp(e1: expr, e2: expr)
//     ELam(x: string, body: expr)
//     EInt(n: int)
//
//   type pat-expr      // pattern: every position can be a metavar
//     PVar(nm: pat-string)
//     PApp(e1: pat-expr, e2: pat-expr)
//     PLam(x: pat-string, body: pat-expr)
//     PInt(n: pat-int)
//     PAny(name: string, id: int)  // matches any expr
//
//   type pat-string
//     PSLit(s: string)
//     PSAny(name: string, id: int)
//
//   type pat-int
//     PILit(n: int)
//     PIAny(name: string, id: int)
//
// Rules use pat-expr. Programs use expr. Bridge converts pat-expr to term.
//
// PROS: Clean separation. Concrete programs are clean. Patterns are explicit.
// CONS: Duplicates every type. Boilerplate explosion.
//       Could maybe auto-generate with a macro or type-level trick.

// ============================================================================
// APPROACH 3: Open recursion / finally tagless with a "base" parameter
// ============================================================================
//
// Parameterize the AST over a "base" type that can be either concrete or pattern:
//
//   type expr<b>
//     EBase(b: b)           // inject base (metavar OR nothing)
//     EVar(nm: b)           // name is base-typed
//     EApp(e1: expr<b>, e2: expr<b>)
//     ELam(x: b, body: expr<b>)
//     EInt(n: b)            // hmm, int position needs different base
//
// For concrete: b = void (no metavars possible)
// For patterns: b = metavar
//
// PROBLEM: Different positions need different "kinds" of metavars.
//          A string position needs a string-or-metavar, an int position
//          needs an int-or-metavar. Single `b` doesn't work.

// ============================================================================
// APPROACH 4: Term is the universal pattern language
// ============================================================================
//
// Don't try to make domain types support metavars at all.
// Instead, rules are always written over `term` (which has TVar for metavars).
// Domain types are only used for concrete programs and rendering.
//
//   // Rules: in term language (like proof-search-untyped-bigstep-demo.kk)
//   Rule("E-Lam", [], eval(TNode("lam", [TVar("x",0), TVar("e",0)]), ...))
//
//   // Programs: in domain types
//   val prog = EApp(ELam("x", EVar("x")), ELam("z", EVar("z")))
//   val goal = Fact("eval", [prog.to-term, TVar("result", 0)])
//
// PROS: Simple. No metavar gymnastics. Rules are concise with helper functions.
// CONS: Loses type safety in rules. Can't render rules from the same types.
//       The whole point of the typed layer is to avoid this.

// ============================================================================
// APPROACH 5: Nonterminal-based metavars (Redex-inspired)
// ============================================================================
//
// Define a "language" that maps nonterminal names to types.
// Metavars are just nonterminal references with optional subscripts.
//
//   // Language definition
//   type lang
//     ...
//
//   // Nonterminal = a name that refers to a grammar production
//   type nt<a>
//     Nt(name: string, subscript: int)  // metavar: matches any `a`
//     Lit(value: a)                     // literal: matches exactly this
//
// Then domain types use `nt<T>` in positions that can be metavars:
//
//   type expr
//     EVar(nm: nt<string>)
//     EApp(e1: nt<expr>, e2: nt<expr>)
//     ELam(x: nt<string>, body: nt<expr>)
//     EInt(n: nt<int>)
//
// Sugar functions:
//   fun e(name: string): nt<expr> = Nt(name, 0)
//   fun x(name: string): nt<string> = Nt(name, 0)
//   fun n(name: string): nt<int> = Nt(name, 0)
//   fun lit(v: a): nt<a> = Lit(v)
//
// Rules:  ELam(x("x"), e("body")) ~> ELam(x("x"), e("body"))
// Concrete: ELam(lit("x"), lit(EVar(lit("y"))))
//
// to-term for nt<a>:
//   Nt(name, i) -> TVar(name, i)
//   Lit(v) -> v.to-term
//
// This is essentially Approach 1 but renamed to match Redex terminology.
//
// PROS: Mirrors Redex. Sugar makes it readable. Generic over any type.
// CONS: Still verbose for concrete programs. Nested nt<nt<...>> issue.
//       Same as Approach 1 fundamentally.

// ============================================================================
// APPROACH 6: Overloaded string/int literals as implicit metavars
// ============================================================================
//
// Use Koka's implicit resolution to make strings automatically convert
// to metavars in rule context:
//
//   fun string/to-expr(s: string): expr = EAny(s, 0)
//   fun string/to-store(s: string): store = SAny(s, 0)
//   fun string/to-int-pat(s: string): int-pat = IPAny(s, 0)
//
// Then in rules:  ELam("x", "e") ~> ELam("x", "e")
// But this conflicts with actual string usage (EVar takes a string name).
//
// Alternatively, use a special wrapper type:
//   type mv  // "metavar reference"
//     MV(name: string)
//
//   fun mv/to-expr(MV(s)): expr = EAny(s, 0)
//   fun mv/to-store(MV(s)): store = SAny(s, 0)
//
//   fun ($)(s: string): mv = MV(s)
//
// Rules: ELam($"x", $"e") ~> ELam($"x", $"e")
//
// PROS: Concise. One $ prefix marks metavars.
// CONS: Needs implicit from mv to every domain type. $ might not be valid.
//       Implicit resolution could be ambiguous.

// ============================================================================
// APPROACH 7: Effect-based rule construction
// ============================================================================
//
// Use an effect to track metavar allocation, similar to how the
// untyped-bigstep.kk example uses the `fresh` effect:
//
//   effect rule-vars
//     fun evar(name: string): expr     // allocate metavar for expr
//     fun svar(name: string): store    // allocate metavar for store
//     fun ivar(name: string): int-pat  // allocate metavar for int
//
// Rules:
//   fun eval-rules()
//     val x = evar("x")
//     val e = evar("e")
//     val s = svar("s")
//     rule(TNil, "E-Lam",
//       eval-j(ELam(x, e), s, ELam(x, e), s))
//
// The handler maps each name to a TVar with a unique ID.
// Concrete values are used directly (not through the effect).
//
// PROS: Natural. Mirrors the existing untyped-bigstep.kk pattern.
//       No changes to domain types needed!
//       The `fresh` effect already does this.
// CONS: Requires the effect handler wrapping rule definitions.
//       Can't easily distinguish "x is a string metavar" from
//       "x is an expr metavar" at the type level.
//
// Actually, this is ALREADY what untyped-bigstep.kk does:
//   effect terms
//     fun e(): expr
//     fun v(): expr
//     fun x(): string
//
//   fun eval-rules()
//     val x-var = x()         // fresh string metavar
//     val (e1, e2) = fresh2(e) // fresh expr metavars
//     ...
//
// The difference: that example uses custom `expr` type where EAny
// already exists. The effect just manages the IDs.

// ============================================================================
// APPROACH 8: Staged construction — rules as functions
// ============================================================================
//
// Instead of building a rule AST, define rules as FUNCTIONS over metavars.
// The framework calls the function with fresh metavars to instantiate:
//
//   fun e-lam-rule(x: string, e: expr, s: store): (list<judgement>, judgement)
//     ([], eval-j(ELam(x, e), s, ELam(x, e), s))
//
//   fun e-app-rule(e1: expr, e2: expr, ...): (list<judgement>, judgement)
//     ([eval-j(e1, s0, ELam(x, e3), s1), ...],
//      eval-j(EApp(e1, e2), s0, v, s3))
//
// The framework calls e-lam-rule with fresh TVar-backed values for each param.
// The function's parameter types tell the framework what kind of metavar to create.
//
// PROS: No metavar constructors in domain types at all!
//       The function signature IS the metavar declaration.
//       Type-safe: you can't put a string metavar where an expr goes.
// CONS: Rules are functions, not data. Can't inspect/render them.
//       Lose the relation-def / type-struct machinery.
//       The to-term conversion happens at call time, not definition time.

// ============================================================================
// RECOMMENDATION
// ============================================================================
//
// Short-term (current): Approach 7 (effect-based) is closest to what we have
// and requires no domain type changes. The `fresh` effect manages IDs.
// Users define `effect rule-vars` per domain and use it in rule definitions.
//
// Medium-term: Approach 5/6 (nt<a> or $ prefix) for a cleaner syntax.
// The nt<a> wrapper is generic and works with any domain type.
// The $ prefix is more concise but may have implicit resolution issues.
//
// Long-term: Approach 8 (staged/functional rules) is the most type-safe
// but requires rethinking the rule representation. Could be combined with
// the current approach — rules are functions that produce syntax/rule values,
// called with fresh metavar-backed domain values.
//
// KEY INSIGHT: The problem is that domain types conflate "concrete values"
// and "patterns with holes." Redex solves this by having everything be
// S-expressions (untyped). We need either:
//   a) A generic "hole" mechanism (nt<a>, metavar<a>)
//   b) Separate pattern types (verbose)
//   c) An effect/function that injects metavars at rule construction time
//
// Option (c) is the most Koka-idiomatic and requires the least new machinery.

// Let me try option (c) concretely:

import koka-redex/forward-bridge
import koka-redex/fresh

// Domain types — NO metavar constructors needed
type expr0
  Var0(nm: string)
  App0(e1: expr0, e2: expr0)
  Lam0(x: string, body: expr0)
  Int0(n: int)

fun expr0/to-term(e: expr0): term
  match e
    Var0(n) -> TNode("var", [TAtom(n)])
    App0(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    Lam0(x, body) -> TNode("lam", [TAtom(x), body.to-term])
    Int0(n) -> TNode("int", [TInt(n)])

// Metavar-generating effect for rule construction
// Returns domain values backed by TVar
effect rule-meta
  fun meta-expr(nm: string): expr0
  fun meta-string(nm: string): string
  fun meta-int(nm: string): int

// Handler that generates unique TVar-backed values
// The trick: we return domain values that, when to-term'd, produce TVar
// This requires adding a "metavar" case to each domain type...
// which is what we're trying to avoid.

// Actually, the issue is fundamental: to-term(meta-expr("x")) needs to
// return TVar("x", 42), but expr0 has no constructor that maps to TVar.
// So we DO need at least one metavar constructor in each type.

// The MINIMAL addition: one `Any` constructor per type, auto-managed by the effect:

type expr1
  Var1(nm: string)
  App1(e1: expr1, e2: expr1)
  Lam1(x: string, body: expr1)
  Int1(n: int)
  Any1(nm: string, id: int)  // the single metavar constructor

fun expr1/to-term(e: expr1): term
  match e
    Var1(n) -> TNode("var", [TAtom(n)])
    App1(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    Lam1(x, body) -> TNode("lam", [TAtom(x), body.to-term])
    Int1(n) -> TNode("int", [TInt(n)])
    Any1(p, i) -> TVar(p, i)

// (with-rule-meta omitted — see approach 9 below for the better API)

// Usage in rules (SKETCH — not real, just showing the API):
//   with-rule-meta
//     val x = Any1("x", generate-fresh())
//     val e = Any1("e", generate-fresh())
//     val s = SAny("s", generate-fresh())  // for store
//     rule(TNil, "E-Lam", eval-j(Lam1(???, e), s, Lam1(???, e), s))
//     // But Lam1 takes string, not expr1, for the param name!

// The REAL issue: Lam1(x: string, body: expr1) — the `x` position is
// a string, not an expr1, so we can't put Any1 there.
// We need Lam1(x: expr1, body: expr1) or Lam1(x: string-or-meta, body: expr1).

// CONCLUSION: There's no escaping the need for metavar support in the
// domain type's field types. The question is just how to make it ergonomic.
// The nt<a> / metavar<a> wrapper is the cleanest generic solution.

// Let me try nt<a> concretely:

pub type nt<a>
  NtVar(nm: string, id: int)  // metavariable
  NtLit(value: a)             // literal/concrete value

pub fun nt/to-term(v: nt<a>, ?to-term: a -> e term): e term
  match v
    NtVar(nm, id) -> TVar(nm, id)
    NtLit(value) -> value.to-term

// Sugar
pub fun nv(nm: string): nt<a>
  NtVar(nm, 0)

pub fun nl(v: a): nt<a>
  NtLit(v)

// Now domain types use nt<T> for any position that could be a metavar:

type expr2
  Var2(nm: nt<string>)
  App2(e1: nt<expr2>, e2: nt<expr2>)
  Lam2(x: nt<string>, body: nt<expr2>)
  Int2(n: nt<int>)

fun expr2/to-term(e: expr2): div term
  match e
    Var2(n) -> TNode("var", [n.nt/to-term])
    App2(e1, e2) -> TNode("app", [e1.nt/to-term, e2.nt/to-term])
    Lam2(x, body) -> TNode("lam", [x.nt/to-term, body.nt/to-term])
    Int2(n) -> TNode("int", [n.nt/to-term])

// Rules with nt<a>:
// E-Lam: Lam2(nv("x"), nv("e")) ⇓ Lam2(nv("x"), nv("e"))
// E-App: App2(nv("e1"), nv("e2")) ...
// T-Int: Int2(nv("n"))  — matches any int!
//
// Concrete programs:
// Lam2(nl("x"), nl(Var2(nl("x"))))
// Int2(nl(42))
//
// The nl() wrapping is verbose for concrete programs.
// Could be improved with smart constructors:
//   fun lam(x: string, body: expr2): expr2 = Lam2(nl(x), nl(body))
//   fun var2(x: string): expr2 = Var2(nl(x))
//   fun int2(n: int): expr2 = Int2(nl(n))
//   fun app2(e1: expr2, e2: expr2): expr2 = App2(nl(e1), nl(e2))
//
// Then:
//   Concrete: lam("x", var2("x"))  -- clean!
//   Rule:     Lam2(nv("x"), nv("e"))  -- also clean, different constructor

// ============================================================================
// APPROACH 9: Phantom-typed meta<a> + polymorphic judgement constructors
// ============================================================================
//
// meta<a> is a metavariable that can stand in for any type `a`.
// It's phantom-typed — no `a` value inside, just the name/id.
// The `to-term` implicit on meta<a> returns TVar.
// Domain types stay clean — no EAny needed.
// Judgement constructors are polymorphic, accepting either domain values
// or meta<T> in any position.

pub type meta<a>
  MetaV(nm: string, id: int)

pub fun meta/to-term(m: meta<a>): term
  match m
    MetaV(nm, id) -> TVar(nm, id)

pub fun mv(nm: string): meta<a>
  MetaV(nm, 0)

// Clean domain types — NO metavar constructors
type expr3
  Var3(nm: string)
  App3(e1: expr3, e2: expr3)
  Lam3(x: string, body: expr3)
  Int3(n: int)

fun expr3/to-term(e: expr3): div term
  match e
    Var3(n) -> TNode("var", [TAtom(n)])
    App3(e1, e2) -> TNode("app", [e1.to-term, e2.to-term])
    Lam3(x, body) -> TNode("lam", [TAtom(x), body.to-term])
    Int3(n) -> TNode("int", [TInt(n)])

type store3
  SNil3
  SCons3(nm: string, vl: expr3, rest: store3)

fun store3/to-term(s: store3): div term
  match s
    SNil3 -> TNode("snil", [])
    SCons3(n, v, rest) -> TNode("scons", [TAtom(n), v.to-term, rest.to-term])

// Relation markers (unchanged)
type r-eval3
  REval3
fun r-eval3/pred-name(_: r-eval3): string
  "eval"

// Polymorphic judgement constructor — accepts any type with to-term
// The \ operator already requires to-term on each element.
// So we just define eval-j polymorphically:
fun eval3-j(e, s, v, s2)
  e \ s \ REval3 \ v \ s2

// RULES use meta<T> for metavar positions:
//   eval3-j(mv("e") : meta<expr3>, mv("s") : meta<store3>,
//           mv("v") : meta<expr3>, mv("s2") : meta<store3>)
//
// But we can also MIX concrete and meta:
//   eval3-j(Lam3(???, mv("e")), mv("s"), Lam3(???, mv("e")), mv("s"))
//
// The ??? problem: Lam3 takes (string, expr3). We can't pass meta<string>
// for the string position because Lam3 is typed to take string, not meta<string>.
//
// SOLUTION A: Make Lam3 also polymorphic: Lam3(x, body) where x is anything
//             with to-term. But then Lam3 is no longer a simple ADT.
//
// SOLUTION B: The rule doesn't use Lam3 directly — it uses the chain.
//             The chain `Lam3(x, e) \ s \ REval3 \ v \ s2` has Lam3 in the
//             first position. But Lam3 is concrete — it IS an expr3.
//             The issue is only internal to Lam3's fields.
//
// SOLUTION C: For positions inside domain constructors that need metavars,
//             use a separate "pattern constructor" that takes meta<T>:
//
//   fun lam-pat(x: meta<string>, body: meta<expr3>): meta<expr3>
//     MetaV(???)  // Can't construct — we lose the structure
//
// This doesn't work because meta<expr3> erases the structure.
//
// SOLUTION D: For mixed patterns (partially concrete, partially meta),
//             drop down to the term level for that sub-expression:
//
//   fun lam-t(x: term, body: term): term
//     TNode("lam", [x, body])
//
//   // In rule: lam-t(mv("x").to-term, mv("e").to-term)
//   // But this is back to the term level...
//
// CONCLUSION: meta<a> works great for TOP-LEVEL positions in judgement
// chains (the arguments to eval-j, infer-j, etc.). For positions INSIDE
// domain constructors (like the param name in Lam), we still need
// either metavar constructors in the domain type or term-level patterns.
//
// The BEST API might be a hybrid:
//   - meta<T> for top-level rule positions
//   - "pattern constructors" for structured patterns
//     (e.g., lam-pat(x, body) that creates a term-level TNode("lam", [x, y]))
//
// For the E-Lam rule:
//   eval3-j(lam-pat(mv("x"), mv("e")), mv("s"),
//           lam-pat(mv("x"), mv("e")), mv("s"))
//
// Where lam-pat returns something with to-term that produces TNode("lam", ...).
// This "something" could be meta<expr3> (phantom — the inner structure is lost).
// Or it could be a proper term.

// Let me try: "pattern constructors" return a meta<T> wrapping a pre-built term
pub type meta2<a>
  Meta2Var(nm: string, id: int)
  Meta2Term(t: term)  // pre-built term pattern

pub fun meta2/to-term(m: meta2<a>): term
  match m
    Meta2Var(nm, id) -> TVar(nm, id)
    Meta2Term(t) -> t

pub fun mv2(nm: string): meta2<a>
  Meta2Var(nm, 0)

// Pattern constructors build meta2<expr3> with embedded term structure:
fun lam-p(x: meta2<string>, body: meta2<expr3>): meta2<expr3>
  Meta2Term(TNode("lam", [x.to-term, body.to-term]))

fun var-p(x: meta2<string>): meta2<expr3>
  Meta2Term(TNode("var", [x.to-term]))

fun app-p(e1: meta2<expr3>, e2: meta2<expr3>): meta2<expr3>
  Meta2Term(TNode("app", [e1.to-term, e2.to-term]))

fun int-p(n: meta2<int>): meta2<expr3>
  Meta2Term(TNode("int", [n.to-term]))

fun scons-p(nm: meta2<string>, vl: meta2<expr3>, rest: meta2<store3>): meta2<store3>
  Meta2Term(TNode("scons", [nm.to-term, vl.to-term, rest.to-term]))

// Lift concrete values into meta2
fun meta2/lift-string(s: string): meta2<string>
  Meta2Term(TAtom(s))

fun meta2/lift-int(n: int): meta2<int>
  Meta2Term(TInt(n))

fun meta2/lift-expr(e: expr3): div meta2<expr3>
  Meta2Term(e.to-term)

fun meta2/lift-store(s: store3): div meta2<store3>
  Meta2Term(s.to-term)

// NOW the E-Lam rule looks like:
// eval3-j(lam-p(mv2("x"), mv2("e")), mv2("s"),
//         lam-p(mv2("x"), mv2("e")), mv2("s"))
//
// And the E-App rule:
// eval3-j(mv2("e1"), mv2("s0"), lam-p(mv2("x"), mv2("e3")), mv2("s1")) ...
//
// And T-Int: infer-j(int-p(mv2("n")), mv2("env"), TBase("Int"))
//
// Concrete programs:
// eval3-j(lift-expr(App3(Lam3("x", Var3("x")), Lam3("z", Var3("z")))),
//         lift-store(SNil3), mv2("v"), mv2("s"))
//
// Or with pattern constructors for everything:
// eval3-j(app-p(lam-p(lift-string("x"), var-p(lift-string("x"))),
//               lam-p(lift-string("z"), var-p(lift-string("z")))),
//         lift-store(SNil3), mv2("v"), mv2("s"))
//
// VERDICT: meta2<a> with pattern constructors is workable.
// The pattern constructors mirror the domain constructors but operate on meta2.
// This is essentially the "two-level types" approach but with one generic wrapper.
// The boilerplate is the pattern constructors (one per domain constructor).
// These could potentially be auto-generated from the domain type definition.

pub fun main()
  // Test meta2
  val e = lam-p(mv2("x"), mv2("e"))
  println("lam-p(mv2(x), mv2(e)) = " ++ e.to-term.show)
  // Expected: lam(x_0, e_0)

  val concrete = lam-p(meta2/lift-string("x"), meta2/lift-expr(Var3("y")))
  println("lam-p(lift(x), lift(Var3(y))) = " ++ concrete.to-term.show)
  // Expected: lam(x, var(y))
  // Quick test: nt<a> to-term
  val v1 : nt<string> = nv("x")
  val v2 : nt<string> = nl("hello")
  println("nv(x) = " ++ v1.nt/to-term.show)    // TVar(x, 0)
  println("nl(hello) = " ++ v2.nt/to-term.show) // TAtom(hello) ... wait, need string/to-term
  // string/to-term is TAtom, already defined in forward-bridge

  // Test expr2
  val rule-lam = Lam2(nv("x"), nv("e"))
  println("Lam2(nv(x), nv(e)) = " ++ rule-lam.to-term.show)
  // Should be: lam(x_0, e_0)

  val concrete = Lam2(nl("x"), nl(Var2(nl("x"))))
  println("Lam2(nl(x), nl(Var2(nl(x)))) = " ++ concrete.to-term.show)
  // Should be: lam(x, var(x))
