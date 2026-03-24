module examples2/proof-search-untyped-bigstep-demo
import std/core/types = std/core/types pub = "";
import std/core/hnd = std/core/hnd pub = "";
import std/core/exn = std/core/exn pub = "";
import std/core/bool = std/core/bool pub = "";
import std/core/order = std/core/order pub = "";
import std/core/char = std/core/char pub = "";
import std/core/int = std/core/int pub = "";
import std/core/vector = std/core/vector pub = "";
import std/core/string = std/core/string pub = "";
import std/core/sslice = std/core/sslice pub = "";
import std/core/list = std/core/list pub = "";
import std/core/maybe = std/core/maybe pub = "";
import std/core/maybe2 = std/core/maybe2 pub = "";
import std/core/either = std/core/either pub = "";
import std/core/tuple = std/core/tuple pub = "";
import std/core/lazy = std/core/lazy pub = "";
import std/core/show = std/core/show pub = "";
import std/core/debug = std/core/debug pub = "";
import std/core/delayed = std/core/delayed pub = "";
import std/core/console = std/core/console pub = "";
import type-level/structs = type-level/structs pub = "";
import type-level/list = type-level/list pub = "";
import type-level/nil = type-level/nil pub = "";
import std/core = std/core = "";
import koka-redex2/proof-search = koka-redex2/proof-search = "";
import koka-redex2/proof-search-policy = koka-redex2/proof-search-policy = "";
import koka-redex2/syntax = koka-redex2/syntax = "";
import koka-redex2/proof-search-bridge = koka-redex2/proof-search-bridge = "";
// An alias for pure effects: a pure function always returns the same result
// when called with the same arguments but may not terminate or raise an exception.
local alias pure :: E = <(exn :: (E, V) -> V),(div :: X)> = 1;
pub value{1,0,1} type examples2/proof-search-untyped-bigstep-demo/r-eval[8,1,9,7] {
  pub con examples2/proof-search-untyped-bigstep-demo/REval[9,3,9,7]{0,0,0} : examples2/proof-search-untyped-bigstep-demo/r-eval = 1;
};
pub value{1,0,1} type examples2/proof-search-untyped-bigstep-demo/r-subst[11,1,12,8] {
  pub con examples2/proof-search-untyped-bigstep-demo/RSubst[12,3,12,8]{0,0,0} : examples2/proof-search-untyped-bigstep-demo/r-subst = 1;
};
pub fun r-eval/@copy : (@this : examples2/proof-search-untyped-bigstep-demo/r-eval) -> examples2/proof-search-untyped-bigstep-demo/r-eval
  = fn(@this){
    examples2/proof-search-untyped-bigstep-demo/REval;
  };
pub fun r-subst/@copy : (@this : examples2/proof-search-untyped-bigstep-demo/r-subst) -> examples2/proof-search-untyped-bigstep-demo/r-subst
  = fn(@this){
    examples2/proof-search-untyped-bigstep-demo/RSubst;
  };
val eval/rel-memo-lattice : koka-redex2/proof-search-policy/rel-memo-lattice<examples2/proof-search-untyped-bigstep-demo/r-eval>
  = koka-redex2/proof-search-policy/Rel-memo-lattice((std/core/types/@open(koka-redex2/proof-search/memo-lattice/nondet-set)()));
val subst/rel-memo-lattice : koka-redex2/proof-search-policy/rel-memo-lattice<examples2/proof-search-untyped-bigstep-demo/r-subst>
  = koka-redex2/proof-search-policy/Rel-memo-lattice((std/core/types/@open(koka-redex2/proof-search/memo-lattice/nondet-set)()));
fun evar : (x : string) -> koka-redex2/proof-search/term
  = fn(x){
    koka-redex2/proof-search/TNode("var", (std/core/types/Cons((koka-redex2/proof-search/TAtom(x)), std/core/types/Nil)));
  };
fun elam : (x : string, body : koka-redex2/proof-search/term) -> koka-redex2/proof-search/term
  = fn(x, body){
    koka-redex2/proof-search/TNode("lam", (std/core/types/Cons((koka-redex2/proof-search/TAtom(x)), (std/core/types/Cons(body, std/core/types/Nil)))));
  };
fun eapp : (e1 : koka-redex2/proof-search/term, e2 : koka-redex2/proof-search/term) -> koka-redex2/proof-search/term
  = fn(e1, e2){
    koka-redex2/proof-search/TNode("app", (std/core/types/Cons(e1, (std/core/types/Cons(e2, std/core/types/Nil)))));
  };
fun eval : (e : koka-redex2/proof-search/term, v : koka-redex2/proof-search/term) -> koka-redex2/proof-search/fact
  = fn(e, v){
    koka-redex2/proof-search/Fact("eval", (std/core/types/Cons(e, (std/core/types/Cons(v, std/core/types/Nil)))));
  };
fun subst : (e : koka-redex2/proof-search/term, x : string, v : koka-redex2/proof-search/term, result : koka-redex2/proof-search/term) -> koka-redex2/proof-search/fact
  = fn(e, x, v, result){
    koka-redex2/proof-search/Fact("subst", (std/core/types/Cons(e, (std/core/types/Cons((koka-redex2/proof-search/TAtom(x)), (std/core/types/Cons(v, (std/core/types/Cons(result, std/core/types/Nil)))))))));
  };
fun subst-term : (e : koka-redex2/proof-search/term, x : koka-redex2/proof-search/term, v : koka-redex2/proof-search/term, result : koka-redex2/proof-search/term) -> koka-redex2/proof-search/fact
  = fn(e, x, v, result){
    koka-redex2/proof-search/Fact("subst", (std/core/types/Cons(e, (std/core/types/Cons(x, (std/core/types/Cons(v, (std/core/types/Cons(result, std/core/types/Nil)))))))));
  };
fun relation : () -> koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>
  = fn(){
    std/core/types/@open(koka-redex2/syntax/func/relation-def)((fn(){
      (std/core/types/@open(koka-redex2/syntax/cons/rule)(type-level/nil/TNil, "E-Lam", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)((koka-redex2/proof-search/TNode("lam", (std/core/types/Cons((koka-redex2/proof-search/TVar("x", 0)), (std/core/types/Cons((koka-redex2/proof-search/TVar("e", 0)), std/core/types/Nil)))))), (koka-redex2/proof-search/TNode("lam", (std/core/types/Cons((koka-redex2/proof-search/TVar("x", 0)), (std/core/types/Cons((koka-redex2/proof-search/TVar("e", 0)), std/core/types/Nil)))))))), (fn(){
          (std/core/types/@open(koka-redex2/syntax/cons/rule)((std/core/types/@open(koka-redex2/syntax/(\))((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)((koka-redex2/proof-search/TVar("e1", 0)), (koka-redex2/proof-search/TNode("lam", (std/core/types/Cons((koka-redex2/proof-search/TVar("x", 0)), (std/core/types/Cons((koka-redex2/proof-search/TVar("e3", 0)), std/core/types/Nil)))))))), (std/core/types/@open(koka-redex2/syntax/(\))((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)((koka-redex2/proof-search/TVar("e2", 0)), (koka-redex2/proof-search/TVar("v1", 0)))), (std/core/types/@open(koka-redex2/syntax/(\))((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/subst-term)((koka-redex2/proof-search/TVar("e3", 0)), (koka-redex2/proof-search/TVar("x", 0)), (koka-redex2/proof-search/TVar("v1", 0)), (koka-redex2/proof-search/TVar("e4", 0)))), (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)((koka-redex2/proof-search/TVar("e4", 0)), (koka-redex2/proof-search/TVar("v2", 0)))))))))), "E-App", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eapp)((koka-redex2/proof-search/TVar("e1", 0)), (koka-redex2/proof-search/TVar("e2", 0)))), (koka-redex2/proof-search/TVar("v2", 0)))), (fn(){
              (std/core/types/@open(koka-redex2/syntax/single/rule)(type-level/nil/TNil, "S-Var-Eq", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/subst-term)((koka-redex2/proof-search/TNode("var", (std/core/types/Cons((koka-redex2/proof-search/TVar("x", 0)), std/core/types/Nil)))), (koka-redex2/proof-search/TVar("x", 0)), (koka-redex2/proof-search/TVar("w", 0)), (koka-redex2/proof-search/TVar("w", 0))))));
            })));
        })));
    }));
  };
fun facts : () -> list<koka-redex2/proof-search/fact>
  = fn(){
    std/core/types/Nil;
  };
fun policies : () -> list<koka-redex2/proof-search/relation-policy>
  = fn(){
    val eval-tag : koka-redex2/proof-search-policy/pred-tag<examples2/proof-search-untyped-bigstep-demo/r-eval>
      = std/core/types/@open(koka-redex2/proof-search-policy/mk/pred-tag)("eval");
    val subst-tag : koka-redex2/proof-search-policy/pred-tag<examples2/proof-search-untyped-bigstep-demo/r-subst>
      = std/core/types/@open(koka-redex2/proof-search-policy/mk/pred-tag)("subst");
    std/core/types/Cons((std/core/types/@open(koka-redex2/proof-search-policy/policy/of)(eval-tag, examples2/proof-search-untyped-bigstep-demo/eval/rel-memo-lattice)), (std/core/types/Cons((std/core/types/@open(koka-redex2/proof-search-policy/policy/of)(subst-tag, examples2/proof-search-untyped-bigstep-demo/subst/rel-memo-lattice)), std/core/types/Nil)));
  };
pub fun main : () -> <pure,console/console> ()
  = fn(){
    val id : koka-redex2/proof-search/term
      = std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/elam)("x", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/evar)("x")));
    val arg : koka-redex2/proof-search/term
      = std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/elam)("z", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/evar)("z")));
    val goal : koka-redex2/proof-search/fact
      = std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eapp)(id, arg)), arg);
    fun debug-goal : (label : string, g : koka-redex2/proof-search/fact) -> <pure,console/console> ()
      = fn(label, g){
        match (fun @fct-x2474 : (goal : koka-redex2/proof-search/fact, base-facts : (list<koka-redex2/proof-search/fact>), rel : (koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>), policies : ? (list<koka-redex2/proof-search/relation-policy>), max-depth : ? int, ?relation/to-search-rules : ((koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>) -> list<koka-redex2/proof-search/rule>), ?as-fact : ((koka-redex2/proof-search/fact) -> koka-redex2/proof-search/fact)) -> <div,exn,console/console> maybe<koka-redex2/proof-search/proof>
                 = (std/core/types/@open(koka-redex2/proof-search-bridge/search-memo/relation));
               val @arg-x2467 : koka-redex2/proof-search/fact
                 = g;
               val @arg-x2468 : (list<koka-redex2/proof-search/fact>)
                 = (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/facts)());
               val @arg-x2469 : (koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>)
                 = (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/relation)());
               val @arg-x2470 : ? (list<koka-redex2/proof-search/relation-policy>)
                 = (std/core/types/@Optional((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/policies)())));
               val @arg-x2471 : ? int
                 = (std/core/types/@Optional(20));
               val @arg-x2473 : ((f : koka-redex2/proof-search/fact) -> koka-redex2/proof-search/fact)
                 = (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact));
               val @arg-x2472 : ((koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>) -> list<koka-redex2/proof-search/rule>)
                 = (fn(@arg-x1){
                   (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-search-rules)(@arg-x1, (fn(@arg-x1){
                       (std/core/types/@open(koka-redex2/proof-search-bridge/fact/map-field)(@arg-x1, (std/core/types/@open(std/core/show/string/show)), (std/core/types/@open(koka-redex2/proof-search-bridge/tnil/to-premises)), (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact))));
                     }), (fn(@arg-x1){
                       (type-level/structs/to-list(@arg-x1, (fn(@arg-x1){
                           (std/core/types/@open(koka-redex2/proof-search-bridge/fact/map-field)(@arg-x1, (std/core/types/@open(std/core/show/string/show)), (fn(@arg-x1){
                               (std/core/types/@open(koka-redex2/proof-search-bridge/tcons/to-premises)(@arg-x1, (fn(@arg-x1){
                                   (std/core/types/@open(koka-redex2/proof-search-bridge/tcons/to-premises)(@arg-x1, (fn(@arg-x1){
                                       (std/core/types/@open(koka-redex2/proof-search-bridge/tcons/to-premises)(@arg-x1, (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-premises))));
                                     })));
                                 })));
                             }), (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact))));
                         }), (fn(@arg-x1){
                           (type-level/structs/to-list(@arg-x1, (fn(@arg-x1){
                               (std/core/types/@open(koka-redex2/proof-search-bridge/fact/map-field)(@arg-x1, (std/core/types/@open(std/core/show/string/show)), (std/core/types/@open(koka-redex2/proof-search-bridge/tnil/to-premises)), (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact))));
                             }), (std/core/types/@open(type-level/nil/to-list))));
                         })));
                     })));
                 });
        (@fct-x2474(@arg-x2467, @arg-x2468, @arg-x2469, @arg-x2470, @arg-x2471, @arg-x2472, @arg-x2473))) {
          (std/core/types/Just((pf)) : maybe<koka-redex2/proof-search/proof> )
             -> val _ : ()
                      = std/core/types/@open(std/core/console/string/println)((std/core/types/@open(std/core/types/(++))("[debug] ", (std/core/types/@open(std/core/types/(++))(label, " = provable")))));
            std/core/types/@open(std/core/console/string/println)((std/core/types/@open(std/core/types/(++))("[debug] proof: ", (std/core/types/@open(koka-redex2/proof-search/proof/show)(pf, std/core/types/@None)))));
          (@skip std/core/types/Nothing() : (maybe<koka-redex2/proof-search/proof>) )
             -> std/core/types/@open(std/core/console/string/println)((std/core/types/@open(std/core/types/(++))("[debug] ", (std/core/types/@open(std/core/types/(++))(label, " = NOT provable")))));
        };
      };
    val _ : ()
      = std/core/types/@open(std/core/console/string/println)((std/core/types/@open(std/core/types/(++))("[debug] main goal: ", (std/core/types/@open(koka-redex2/proof-search/fact/show)(goal)))));
    val _ : ()
      = std/core/types/@open(debug-goal)("E-Lam for id", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)(id, id)));
    val _ : ()
      = std/core/types/@open(debug-goal)("E-Lam for arg", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/eval)(arg, arg)));
    val _ : ()
      = std/core/types/@open(debug-goal)("S-Var-Eq(x)", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/subst-term)((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/evar)("x")), (koka-redex2/proof-search/TAtom("x")), arg, arg)));
    val _ : ()
      = std/core/types/@open(debug-goal)("S-Var-Eq(z)", (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/subst-term)((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/evar)("z")), (koka-redex2/proof-search/TAtom("z")), arg, arg)));
    match (fun @fct-x4774 : (goal : koka-redex2/proof-search/fact, base-facts : (list<koka-redex2/proof-search/fact>), rel : (koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>), policies : ? (list<koka-redex2/proof-search/relation-policy>), max-depth : ? int, ?relation/to-search-rules : ((koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>) -> list<koka-redex2/proof-search/rule>), ?as-fact : ((koka-redex2/proof-search/fact) -> koka-redex2/proof-search/fact)) -> <div,exn,console/console> maybe<koka-redex2/proof-search/proof>
             = (std/core/types/@open(koka-redex2/proof-search-bridge/search-memo/relation));
           val @arg-x4767 : koka-redex2/proof-search/fact
             = goal;
           val @arg-x4768 : (list<koka-redex2/proof-search/fact>)
             = (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/facts)());
           val @arg-x4769 : (koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>)
             = (std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/relation)());
           val @arg-x4770 : ? (list<koka-redex2/proof-search/relation-policy>)
             = (std/core/types/@Optional((std/core/types/@open(examples2/proof-search-untyped-bigstep-demo/policies)())));
           val @arg-x4771 : ? int
             = (std/core/types/@Optional(20));
           val @arg-x4773 : ((f : koka-redex2/proof-search/fact) -> koka-redex2/proof-search/fact)
             = (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact));
           val @arg-x4772 : ((koka-redex2/syntax/relation-def<type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,type-level/list/type-cons<koka-redex2/proof-search/fact,koka-redex2/proof-search/fact>>>,koka-redex2/proof-search/fact>,type-level/structs/type-struct<string,koka-redex2/syntax/rule<string,type-level/nil/type-nil,koka-redex2/proof-search/fact>,type-level/nil/type-nil>>>>) -> list<koka-redex2/proof-search/rule>)
             = (fn(@arg-x1){
               (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-search-rules)(@arg-x1, (fn(@arg-x1){
                   (std/core/types/@open(koka-redex2/proof-search-bridge/fact/map-field)(@arg-x1, (std/core/types/@open(std/core/show/string/show)), (std/core/types/@open(koka-redex2/proof-search-bridge/tnil/to-premises)), (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact))));
                 }), (fn(@arg-x1){
                   (type-level/structs/to-list(@arg-x1, (fn(@arg-x1){
                       (std/core/types/@open(koka-redex2/proof-search-bridge/fact/map-field)(@arg-x1, (std/core/types/@open(std/core/show/string/show)), (fn(@arg-x1){
                           (std/core/types/@open(koka-redex2/proof-search-bridge/tcons/to-premises)(@arg-x1, (fn(@arg-x1){
                               (std/core/types/@open(koka-redex2/proof-search-bridge/tcons/to-premises)(@arg-x1, (fn(@arg-x1){
                                   (std/core/types/@open(koka-redex2/proof-search-bridge/tcons/to-premises)(@arg-x1, (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-premises))));
                                 })));
                             })));
                         }), (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact))));
                     }), (fn(@arg-x1){
                       (type-level/structs/to-list(@arg-x1, (fn(@arg-x1){
                           (std/core/types/@open(koka-redex2/proof-search-bridge/fact/map-field)(@arg-x1, (std/core/types/@open(std/core/show/string/show)), (std/core/types/@open(koka-redex2/proof-search-bridge/tnil/to-premises)), (std/core/types/@open(koka-redex2/proof-search-bridge/fact/to-fact))));
                         }), (std/core/types/@open(type-level/nil/to-list))));
                     })));
                 })));
             });
    (@fct-x4774(@arg-x4767, @arg-x4768, @arg-x4769, @arg-x4770, @arg-x4771, @arg-x4772, @arg-x4773))) {
      (std/core/types/Just((pf)) : maybe<koka-redex2/proof-search/proof> )
         -> val _ : ()
                  = std/core/types/@open(std/core/console/string/println)((std/core/types/@open(std/core/types/(++))("Goal: ", (std/core/types/@open(koka-redex2/proof-search/fact/show)(goal)))));
        std/core/types/@open(std/core/console/string/println)((std/core/types/@open(std/core/types/(++))("Proof:\x0A", (std/core/types/@open(koka-redex2/proof-search/proof/show)(pf, std/core/types/@None)))));
      (@skip std/core/types/Nothing() : (maybe<koka-redex2/proof-search/proof>) )
         -> std/core/types/@open(std/core/console/string/println)((std/core/types/@open(std/core/types/(++))("No proof found for: ", (std/core/types/@open(koka-redex2/proof-search/fact/show)(goal)))));
    };
  };