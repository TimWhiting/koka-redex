module test/test-derive

import std/test
import std/test/test
import koka-redex/derive

// ============================================================================
// Test domain: expr (recursive) + store (multi-field, cross-type)
// ============================================================================

pub type expr
  EAtom(nm: string)
  EVar(nm: expr)
  EApp(e1: expr, e2: expr)
  ELam(x: expr, body: expr)

pub type store
  SNil
  SCons(nm: expr, vl: expr, rest: store)

// ============================================================================
// Phantom tags + name providers
// ============================================================================

pub type atom-expr
pub val atom-expr/con-name: name<atom-expr> = Name("")

pub type var-expr
pub val var-expr/con-name: name<var-expr> = Name("var")

pub type app-expr
pub val app-expr/con-name: name<app-expr> = Name("app")

pub type lam-expr
pub val lam-expr/con-name: name<lam-expr> = Name("lam")

pub type snil-store
pub val snil-store/con-name: name<snil-store> = Name("snil")

pub type scons-store
pub val scons-store/con-name: name<scons-store> = Name("scons")

// ============================================================================
// Con-info definitions
// ============================================================================

pub val atom-expr/con-info : con-info<atom-expr, string, expr> = Con-info(
  fn(e) match e { EAtom(n) -> Just(n); _ -> Nothing },
  EAtom)

pub val var-expr/con-info : con-info<var-expr, t-cons<expr, t-nil>, expr> = Con-info(
  fn(e) match e { EVar(n) -> Just(n +: TNil); _ -> Nothing },
  fn(TCons(n, _)) EVar(n))

pub val app-expr/con-info : con-info<app-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { EApp(a, b) -> Just(a +: b +: TNil); _ -> Nothing },
  fn(TCons(a, TCons(b, _))) EApp(a, b))

pub val lam-expr/con-info : con-info<lam-expr, t-cons<expr, t-cons<expr, t-nil>>, expr> = Con-info(
  fn(e) match e { ELam(x, body) -> Just(x +: body +: TNil); _ -> Nothing },
  fn(TCons(x, TCons(body, _))) ELam(x, body))

pub val expr-info =
  mk-field(atom-expr/con-info) *: mk-field(var-expr/con-info) *: mk-field(app-expr/con-info) *: mk-field(lam-expr/con-info) *: TNil

pub val snil-store/con-info : con-info<snil-store, t-nil, store> = Con-info(
  fn(s) match s { SNil -> Just(TNil); _ -> Nothing },
  fn(_) SNil)

pub val scons-store/con-info : con-info<scons-store, t-cons<expr, t-cons<expr, t-cons<store, t-nil>>>, store> = Con-info(
  fn(s) match s { SCons(n, v, rest) -> Just(n +: v +: rest +: TNil); _ -> Nothing },
  fn(TCons(n, TCons(v, TCons(rest, _)))) SCons(n, v, rest))

pub val store-info =
  mk-field(snil-store/con-info) *: mk-field(scons-store/con-info) *: TNil

// ============================================================================
// Derived functions
// ============================================================================

pub fun expr/to-term(e: expr): div term
  val n/to-term = expr/to-term
  derive-to-term(e, expr-info)

pub fun expr/from-term(t: term): <exn,div> expr
  val n/from-term = expr/from-term
  derive-from-term(t, expr-info)

pub fun expr/show(e: expr): div string
  val n/show = expr/show
  derive-show(e, expr-info)

pub fun store/to-term(s: store): div term
  val n/to-term = store/to-term
  derive-to-term(s, store-info)

pub fun store/from-term(t: term): <exn,div> store
  val n/from-term = store/from-term
  derive-from-term(t, store-info)

pub fun store/show(s: store): div string
  val n/show = store/show
  derive-show(s, store-info)

// ============================================================================
// Test helpers
// ============================================================================

fun roundtrip-expr(e: expr): <div,exn> bool
  val t = e.to-term
  val e' : expr = t.from-term
  e'.to-term.show == t.show

fun roundtrip-store(s: store): <div,exn> bool
  val t = s.to-term
  val s' : store = t.from-term
  s'.to-term.show == t.show

// ============================================================================
// Tests
// ============================================================================

pub fun main()
  with run-tests()

  group("to-term")
    test("atom")
      expect("x") { EAtom("x").to-term.show }
    test("var")
      expect("var(x)") { EVar(EAtom("x")).to-term.show }
    test("app")
      expect("app(var(f),x)") { EApp(EVar(EAtom("f")), EAtom("x")).to-term.show }
    test("lam")
      expect("lam(x,var(x))") { ELam(EAtom("x"), EVar(EAtom("x"))).to-term.show }
    test("nested app")
      expect("app(app(var(f),var(x)),y)") {
        EApp(EApp(EVar(EAtom("f")), EVar(EAtom("x"))), EAtom("y")).to-term.show
      }

  group("to-term store")
    test("snil")
      expect("snil()") { SNil.to-term.show }
    test("scons")
      expect("scons(x,y,snil())") { SCons(EAtom("x"), EAtom("y"), SNil).to-term.show }

  group("from-term roundtrip")
    test("atom roundtrip")
      expect(True) { roundtrip-expr(EAtom("x")) }
    test("var roundtrip")
      expect(True) { roundtrip-expr(EVar(EAtom("x"))) }
    test("app roundtrip")
      expect(True) { roundtrip-expr(EApp(EVar(EAtom("f")), EAtom("x"))) }
    test("lam roundtrip")
      expect(True) { roundtrip-expr(ELam(EAtom("x"), EVar(EAtom("x")))) }
    test("deep nesting roundtrip")
      expect(True) { roundtrip-expr(EApp(EApp(EVar(EAtom("f")), EVar(EAtom("x"))), EAtom("y"))) }
    test("store roundtrip")
      expect(True) { roundtrip-store(SCons(EAtom("x"), ELam(EAtom("y"), EVar(EAtom("y"))), SNil)) }

  group("show")
    test("atom show")
      expect("x") { EAtom("x").expr/show }
    test("var show")
      expect("var(x)") { EVar(EAtom("x")).expr/show }
    test("app show")
      expect("app(var(f), x)") { EApp(EVar(EAtom("f")), EAtom("x")).expr/show }
    test("nullary show")
      expect("snil") { SNil.store/show }
    test("scons show")
      expect("scons(x, y, snil)") { SCons(EAtom("x"), EAtom("y"), SNil).store/show }

  group("cross-type")
    test("store with lam roundtrip")
      val s = SCons(EAtom("f"), ELam(EAtom("x"), EVar(EAtom("x"))), SCons(EAtom("y"), EAtom("z"), SNil))
      expect(True) { roundtrip-store(s) }

  group("ref-pool")
    test("intern produces TRef")
      val store/pool : ev<ref-pool<store>> = make-pool(fn(a: store, b: store) a.to-term.show == b.to-term.show)
      val s = SCons(EAtom("x"), EAtom("y"), SNil)
      val t = ref/to-term(s)
      expect(True) { match t { TRef(_) -> True; _ -> False } }

    test("intern dedup — same value same id")
      val store/pool : ev<ref-pool<store>> = make-pool(fn(a: store, b: store) a.to-term.show == b.to-term.show)
      val s1 = SCons(EAtom("x"), EAtom("y"), SNil)
      val s2 = SCons(EAtom("x"), EAtom("y"), SNil)
      val t1 = ref/to-term(s1)
      val t2 = ref/to-term(s2)
      expect(True) { term/eq(t1, t2) }

    test("intern distinct — different values different ids")
      val store/pool : ev<ref-pool<store>> = make-pool(fn(a: store, b: store) a.to-term.show == b.to-term.show)
      val s1 = SCons(EAtom("x"), EAtom("y"), SNil)
      val s2 = SCons(EAtom("z"), EAtom("w"), SNil)
      val t1 = ref/to-term(s1)
      val t2 = ref/to-term(s2)
      expect(False) { term/eq(t1, t2) }

    test("roundtrip through pool")
      val store/pool : ev<ref-pool<store>> = make-pool(fn(a: store, b: store) a.store/to-term.show == b.store/to-term.show)
      val s = SCons(EAtom("x"), ELam(EAtom("y"), EVar(EAtom("y"))), SNil)
      val t = ref/to-term(s)
      val s2 : store = ref/from-term(t)
      expect(True) { s.store/to-term.show == s2.store/to-term.show }
