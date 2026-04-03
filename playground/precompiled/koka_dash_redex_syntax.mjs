// Koka generated module: koka-redex/syntax, koka version: 3.2.4
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core_exn from './std_core_exn.mjs';
import * as $std_core_bool from './std_core_bool.mjs';
import * as $std_core_order from './std_core_order.mjs';
import * as $std_core_char from './std_core_char.mjs';
import * as $std_core_int from './std_core_int.mjs';
import * as $std_core_vector from './std_core_vector.mjs';
import * as $std_core_string from './std_core_string.mjs';
import * as $std_core_sslice from './std_core_sslice.mjs';
import * as $std_core_list from './std_core_list.mjs';
import * as $std_core_maybe from './std_core_maybe.mjs';
import * as $std_core_maybe2 from './std_core_maybe2.mjs';
import * as $std_core_either from './std_core_either.mjs';
import * as $std_core_result from './std_core_result.mjs';
import * as $std_core_tuple from './std_core_tuple.mjs';
import * as $std_core_lazy from './std_core_lazy.mjs';
import * as $std_core_show from './std_core_show.mjs';
import * as $std_core_debug from './std_core_debug.mjs';
import * as $std_core_delayed from './std_core_delayed.mjs';
import * as $std_core_console from './std_core_console.mjs';
import * as $type_dash_level_nil from './type_dash_level_nil.mjs';
import * as $std_core from './std_core.mjs';
import * as $type_dash_level_structs from './type_dash_level_structs.mjs';
import * as $type_dash_level_list from './type_dash_level_list.mjs';
import * as $koka_dash_redex_term from './koka_dash_redex_term.mjs';
import * as $koka_dash_redex_logic from './koka_dash_redex_logic.mjs';
 
// externals
 
// type declarations
// type external-entry
export function MkExternalEntry(ext_pred, ext_n_inputs, ext_solver) /* (ext-pred : string, ext-n-inputs : int, ext-solver : (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) -> external-entry */  {
  return { ext_pred: ext_pred, ext_n_inputs: ext_n_inputs, ext_solver: ext_solver };
}
// type premise-sep
export const PremiseSep = 1; // premise-sep
// type relation-def
export function RelationDef(rules) /* forall<a> (rules : a) -> relation-def<a> */  {
  return rules;
}
// type rule
export function Rule(name, premises, conclusion) /* forall<a,b,c> (name : a, premises : b, conclusion : c) -> rule<a,b,c> */  {
  return { name: name, premises: premises, conclusion: conclusion };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `conclusion` constructor field of the `:rule` type.
export function rule_fs_conclusion(rule) /* forall<a,b,c> (rule : rule<a,b,c>) -> c */  {
  return rule.conclusion;
}
 
 
// Automatically generated. Retrieves the `name` constructor field of the `:rule` type.
export function rule_fs_name(rule) /* forall<a,b,c> (rule : rule<a,b,c>) -> a */  {
  return rule.name;
}
 
 
// Automatically generated. Retrieves the `premises` constructor field of the `:rule` type.
export function rule_fs_premises(rule) /* forall<a,b,c> (rule : rule<a,b,c>) -> b */  {
  return rule.premises;
}
 
export function rule_fs__copy(_this, name, premises, conclusion) /* forall<a,b,c> (rule<a,b,c>, name : ? a, premises : ? b, conclusion : ? c) -> rule<a,b,c> */  {
  if (name !== undefined) {
    var _x0 = name;
  }
  else {
    var _x0 = _this.name;
  }
  if (premises !== undefined) {
    var _x1 = premises;
  }
  else {
    var _x1 = _this.premises;
  }
  if (conclusion !== undefined) {
    var _x2 = conclusion;
  }
  else {
    var _x2 = _this.conclusion;
  }
  return Rule(_x0, _x1, _x2);
}
 
 
// Automatically generated. Retrieves the `rules` constructor field of the `:relation-def` type.
export function relation_def_fs_rules(_this) /* forall<a> (relation-def<a>) -> a */  {
  return _this;
}
 
export function relation_def_fs__copy(_this, rules) /* forall<a> (relation-def<a>, rules : ? a) -> relation-def<a> */  {
  if (rules !== undefined) {
    var _x3 = rules;
  }
  else {
    var _x3 = _this;
  }
  return _x3;
}
 
export function premise_sep_fs__copy(_this) /* (premise-sep) -> premise-sep */  {
  return PremiseSep;
}
 
 
// Chain premises: inserts a premise-sep marker between them in the tcons chain
export function cons_fs__lp__bs__bs__rp_(h, t) /* forall<a,b> (h : a, t : b) -> type-level/list/t-cons<a,type-level/list/t-cons<premise-sep,b>> */  {
  return $type_dash_level_list.TCons(h, $type_dash_level_list.TCons(PremiseSep, t));
}
 
 
// Rule line: premises --- "name" --> conclusion
export function named_fs__lp__dash__dash__dash__rp_(premises, name) /* forall<a,b> (premises : b, name : a) -> (b, a) */  {
  return $std_core_types.Tuple2(premises, name);
}
 
export function concluded_fs__lp__dash__dash__gt__rp_(pn, conclusion) /* forall<a,b,c> (pn : (c, b), conclusion : a) -> rule<b,c,a> */  {
  var _x4 = pn.snd;
  var _x5 = pn.fst;
  return Rule(_x4, _x5, conclusion);
}
 
 
// Builders for t-struct rule collections
export function single_fs_rule(r) /* forall<a,b,c> (r : rule<b,c,a>) -> type-level/structs/t-struct<b,rule<b,c,a>,type-level/nil/t-nil> */  {
  return $type_dash_level_structs.TStruct(r, $type_dash_level_nil.TNil);
}
 
 
// monadic lift
export function cons_fs__mlift_rule_10093(r, _y_x10022) /* forall<a,b,c,d,a1,b1,e> (r : rule<a,b,c>, type-level/structs/t-struct<d,a1,b1>) -> e type-level/structs/t-struct<a,rule<a,b,c>,type-level/structs/t-struct<d,a1,b1>> */  {
  return $type_dash_level_structs.TStruct(r, _y_x10022);
}
 
export function cons_fs_rule(r, rest) /* forall<a,b,c,d,a1,b1,e> (r : rule<a,b,c>, rest : () -> e type-level/structs/t-struct<d,a1,b1>) -> e type-level/structs/t-struct<a,rule<a,b,c>,type-level/structs/t-struct<d,a1,b1>> */  {
   
  var x_10105 = rest();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10022 /* type-level/structs/t-struct<900,901,902> */ ) {
      return $type_dash_level_structs.TStruct(r, _y_x10022);
    });
  }
  else {
    return $type_dash_level_structs.TStruct(r, x_10105);
  }
}
 
 
// Within-judgement chaining (elements of one judgement)
export function cons_fs__lp__bs__rp_(h, t) /* forall<a,b> (h : a, t : b) -> type-level/list/t-cons<a,b> */  {
  return $type_dash_level_list.TCons(h, t);
}
 
 
// Turnstile: visual marker before relation name (same as \, just for readability)
export function turnstile_fs__lp__bar__dash__rp_(h, t) /* forall<a,b> (h : a, t : b) -> type-level/list/t-cons<a,b> */  {
  return $type_dash_level_list.TCons(h, t);
}
 
 
// Automatically generated. Retrieves the `ext-pred` constructor field of the `:external-entry` type.
export function external_entry_fs_ext_pred(_this) /* (external-entry) -> string */  {
  return _this.ext_pred;
}
 
 
// Automatically generated. Retrieves the `ext-n-inputs` constructor field of the `:external-entry` type.
export function external_entry_fs_ext_n_inputs(_this) /* (external-entry) -> int */  {
  return _this.ext_n_inputs;
}
 
 
// Automatically generated. Retrieves the `ext-solver` constructor field of the `:external-entry` type.
export function external_entry_fs_ext_solver(_this) /* (external-entry) -> ((koka-redex/term/fact) -> <pure,koka-redex/logic/logic> maybe<list<koka-redex/term/fact>>) */  {
  return _this.ext_solver;
}
 
 
// monadic lift
export function external_entry_fs__mlift_copy_10094(_this, ext_n_inputs, ext_pred, _c_x10025) /* (external-entry, ext-n-inputs : ? int, ext-pred : ? string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) -> external-entry */  {
  if (ext_pred !== undefined) {
    var _x6 = ext_pred;
  }
  else {
    var _x6 = _this.ext_pred;
  }
  if (ext_n_inputs !== undefined) {
    var _x7 = ext_n_inputs;
  }
  else {
    var _x7 = _this.ext_n_inputs;
  }
  return MkExternalEntry(_x6, _x7, _c_x10025);
}
 
export function external_entry_fs__copy(_this, ext_pred, ext_n_inputs, ext_solver) /* (external-entry, ext-pred : ? string, ext-n-inputs : ? int, ext-solver : ? ((koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>)) -> external-entry */  {
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10025 /* (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>> */ ) {
      if (ext_pred !== undefined) {
        var _x8 = ext_pred;
      }
      else {
        var _x8 = _this.ext_pred;
      }
      if (ext_n_inputs !== undefined) {
        var _x9 = ext_n_inputs;
      }
      else {
        var _x9 = _this.ext_n_inputs;
      }
      return MkExternalEntry(_x8, _x9, _c_x10025);
    });
  }
  else {
    if (ext_pred !== undefined) {
      var _x10 = ext_pred;
    }
    else {
      var _x10 = _this.ext_pred;
    }
    if (ext_n_inputs !== undefined) {
      var _x11 = ext_n_inputs;
    }
    else {
      var _x11 = _this.ext_n_inputs;
    }
    if (ext_solver !== undefined) {
      var _x12 = ext_solver;
    }
    else {
      var _x12 = _this.ext_solver;
    }
    return MkExternalEntry(_x10, _x11, _x12);
  }
}
 
 
// monadic lift
export function cons_fs__mlift_external_rule_10095(input_args, pred, _implicit_fs_to_outputs, results) /* forall<a> (input-args : list<koka-redex/term/term>, pred : string, ?to-outputs : (a) -> div list<koka-redex/term/term>, results : list<a>) -> <koka-redex/logic/logic,div,exn> list<koka-redex/term/fact> */  {
  return $std_core_list.map(results, function(out /* 1526 */ ) {
       
      var _x_x2_0_10080 = $std_core_hnd._open_none1(_implicit_fs_to_outputs, out);
      return $koka_dash_redex_term.Fact(pred, $std_core_hnd._open_none2(function(xs_0 /* list<koka-redex/term/term> */ , ys /* list<koka-redex/term/term> */ ) {
            return $std_core_list.append(xs_0, ys);
          }, input_args, _x_x2_0_10080));
    });
}
 
 
// monadic lift
export function cons_fs__mlift_external_rule_10096(input_args, pred, solver, _implicit_fs_to_outputs, domain_inputs) /* forall<a,b> (input-args : list<koka-redex/term/term>, pred : string, solver : (a) -> <koka-redex/logic/logic,div,exn> list<b>, ?to-outputs : (b) -> div list<koka-redex/term/term>, domain-inputs : a) -> <div,exn,koka-redex/logic/logic> list<koka-redex/term/fact> */  {
   
  var x_10117 = solver(domain_inputs);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(results /* list<1526> */ ) {
      return cons_fs__mlift_external_rule_10095(input_args, pred, _implicit_fs_to_outputs, results);
    });
  }
  else {
    return cons_fs__mlift_external_rule_10095(input_args, pred, _implicit_fs_to_outputs, x_10117);
  }
}
 
 
// monadic lift
export function cons_fs__mlift_external_rule_10097(attempt) /* (attempt : error<list<koka-redex/term/fact>>) -> <div,koka-redex/logic/logic> maybe<list<koka-redex/term/fact>> */  {
  if (attempt._tag === 2) {
    return $std_core_types.Just(attempt.value);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// monadic lift
export function cons_fs__mlift_external_rule_10098(_implicit_fs_from_inputs, n, pred, solver, _implicit_fs_to_outputs, _y_x10032) /* forall<a,b,c,d,a1,e> (?from-inputs : (list<koka-redex/term/term>) -> <exn,div> a, n : int, pred : string, solver : (a) -> <koka-redex/logic/logic,div,exn> list<b>, ?to-outputs : (b) -> div list<koka-redex/term/term>, type-level/structs/t-struct<c,d,a1>) -> <div|e> type-level/structs/t-struct<string,external-entry,type-level/structs/t-struct<c,d,a1>> */  {
  return $type_dash_level_structs.TStruct(MkExternalEntry(pred, n, function(_x_x1_1 /* koka-redex/term/fact */ ) {
        return $std_core_hnd._open_at1(1, function(goal /* koka-redex/term/fact */ ) {
            if (((goal.pred) === pred)) {
               
              var input_args = $std_core_hnd._open_none2($std_core_list.take, goal.args, n);
               
              var x_10119 = $std_core_exn.$try(function() {
                 
                var x_0_10121 = $std_core_hnd._open_at1(0, _implicit_fs_from_inputs, input_args);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(domain_inputs /* 1525 */ ) {
                    return cons_fs__mlift_external_rule_10096(input_args, pred, solver, _implicit_fs_to_outputs, domain_inputs);
                  });
                }
                else {
                  return cons_fs__mlift_external_rule_10096(input_args, pred, solver, _implicit_fs_to_outputs, x_0_10121);
                }
              });
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(cons_fs__mlift_external_rule_10097);
              }
              else {
                if (x_10119._tag === 2) {
                  return $std_core_types.Just(x_10119.value);
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
            }
            else {
              return $std_core_types.Nothing;
            }
          }, _x_x1_1);
      }), _y_x10032);
}
 
 
// Builders for external solvers within relation-def
export function cons_fs_external_rule(shape, solver, rest, _implicit_fs_to_fact_args, _implicit_fs_from_inputs, _implicit_fs_to_outputs) /* forall<a,b,c,d,a1,b1,e> (shape : a, solver : (b) -> <pure,koka-redex/logic/logic> list<c>, rest : () -> <div|e> type-level/structs/t-struct<d,a1,b1>, ?to-fact-args : (a) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>), ?from-inputs : (list<koka-redex/term/term>) -> pure b, ?to-outputs : (c) -> div list<koka-redex/term/term>) -> <div|e> type-level/structs/t-struct<string,external-entry,type-level/structs/t-struct<d,a1,b1>> */  {
  var _x13 = $std_core_hnd._open_none1(_implicit_fs_to_fact_args, shape);
   
  var n = $std_core_hnd._open_none1(function(xs /* list<koka-redex/term/term> */ ) {
      return $std_core_list._lift_length_6003(xs, 0);
    }, _x13.fst);
   
  var x_10123 = rest();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10032 /* type-level/structs/t-struct<1527,1528,1529> */ ) {
      return cons_fs__mlift_external_rule_10098(_implicit_fs_from_inputs, n, _x13.snd, solver, _implicit_fs_to_outputs, _y_x10032);
    });
  }
  else {
    return $type_dash_level_structs.TStruct(MkExternalEntry(_x13.snd, n, function(_x_x1_1 /* koka-redex/term/fact */ ) {
          return $std_core_hnd._open_at1(1, function(goal /* koka-redex/term/fact */ ) {
              if (((goal.pred) === (_x13.snd))) {
                 
                var input_args = $std_core_hnd._open_none2($std_core_list.take, goal.args, n);
                 
                var x_0_10126 = $std_core_exn.$try(function() {
                   
                  var x_1_10128 = $std_core_hnd._open_at1(0, _implicit_fs_from_inputs, input_args);
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(function(domain_inputs /* 1525 */ ) {
                      return cons_fs__mlift_external_rule_10096(input_args, _x13.snd, solver, _implicit_fs_to_outputs, domain_inputs);
                    });
                  }
                  else {
                    return cons_fs__mlift_external_rule_10096(input_args, _x13.snd, solver, _implicit_fs_to_outputs, x_1_10128);
                  }
                });
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(cons_fs__mlift_external_rule_10097);
                }
                else {
                  if (x_0_10126._tag === 2) {
                    return $std_core_types.Just(x_0_10126.value);
                  }
                  else {
                    return $std_core_types.Nothing;
                  }
                }
              }
              else {
                return $std_core_types.Nothing;
              }
            }, _x_x1_1);
        }), x_10123);
  }
}
 
 
// monadic lift
export function cons_fs__mlift_external_term_rule_10099(_y_x10034) /* (list<koka-redex/term/fact>) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>> */  {
  return $std_core_types.Just(_y_x10034);
}
 
 
// monadic lift
export function cons_fs__mlift_external_term_rule_10100(n, pred, solver, _y_x10038) /* forall<a,b,c,e> (n : int, pred : string, solver : (list<koka-redex/term/term>) -> <koka-redex/logic/logic,div,exn> list<koka-redex/term/fact>, type-level/structs/t-struct<a,b,c>) -> <div|e> type-level/structs/t-struct<string,external-entry,type-level/structs/t-struct<a,b,c>> */  {
  return $type_dash_level_structs.TStruct(MkExternalEntry(pred, n, function(_x_x1_1 /* koka-redex/term/fact */ ) {
        return $std_core_hnd._open_at1(1, function(goal /* koka-redex/term/fact */ ) {
            if (((goal.pred) === pred)) {
              return $std_core_exn.exn_fs__handle($std_core_exn._Hnd_exn(0, $std_core_hnd._open_none1($std_core_hnd.clause_never1, function(err /* exception */ ) {
                      return $std_core_types.Nothing;
                    })), function(_res /* maybe<list<koka-redex/term/fact>> */ ) {
                  return _res;
                }, function() {
                   
                  var x_10130 = solver($std_core_hnd._open_none2($std_core_list.take, goal.args, n));
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(cons_fs__mlift_external_term_rule_10099);
                  }
                  else {
                    return $std_core_types.Just(x_10130);
                  }
                });
            }
            else {
              return $std_core_types.Nothing;
            }
          }, _x_x1_1);
      }), _y_x10038);
}
 
 
// Builders for external solvers within relation-def
export function cons_fs_external_term_rule(shape, solver, rest, _implicit_fs_to_fact_args) /* forall<a,b,c,d,e> (shape : a, solver : (list<koka-redex/term/term>) -> <pure,koka-redex/logic/logic> list<koka-redex/term/fact>, rest : () -> <div|e> type-level/structs/t-struct<b,c,d>, ?to-fact-args : (a) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>)) -> <div|e> type-level/structs/t-struct<string,external-entry,type-level/structs/t-struct<b,c,d>> */  {
  var _x14 = $std_core_hnd._open_none1(_implicit_fs_to_fact_args, shape);
   
  var n = $std_core_hnd._open_none1(function(xs /* list<koka-redex/term/term> */ ) {
      return $std_core_list._lift_length_6003(xs, 0);
    }, _x14.fst);
   
  var x_10132 = rest();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10038 /* type-level/structs/t-struct<1858,1859,1860> */ ) {
      return cons_fs__mlift_external_term_rule_10100(n, _x14.snd, solver, _y_x10038);
    });
  }
  else {
    return $type_dash_level_structs.TStruct(MkExternalEntry(_x14.snd, n, function(_x_x1_1 /* koka-redex/term/fact */ ) {
          return $std_core_hnd._open_at1(1, function(goal /* koka-redex/term/fact */ ) {
              if (((goal.pred) === (_x14.snd))) {
                return $std_core_exn.exn_fs__handle($std_core_exn._Hnd_exn(0, $std_core_hnd._open_none1($std_core_hnd.clause_never1, function(err /* exception */ ) {
                        return $std_core_types.Nothing;
                      })), function(_res /* maybe<list<koka-redex/term/fact>> */ ) {
                    return _res;
                  }, function() {
                     
                    var x_0_10135 = solver($std_core_hnd._open_none2($std_core_list.take, goal.args, n));
                    if ($std_core_hnd._yielding()) {
                      return $std_core_hnd.yield_extend(cons_fs__mlift_external_term_rule_10099);
                    }
                    else {
                      return $std_core_types.Just(x_0_10135);
                    }
                  });
              }
              else {
                return $std_core_types.Nothing;
              }
            }, _x_x1_1);
        }), x_10132);
  }
}
 
 
// monadic lift
export function single_fs__mlift_external_rule_10101(input_args, pred, _implicit_fs_to_outputs, results) /* forall<a> (input-args : list<koka-redex/term/term>, pred : string, ?to-outputs : (a) -> div list<koka-redex/term/term>, results : list<a>) -> <koka-redex/logic/logic,div,exn> list<koka-redex/term/fact> */  {
  return $std_core_list.map(results, function(out /* 2298 */ ) {
       
      var _x_x2_0_10091 = $std_core_hnd._open_none1(_implicit_fs_to_outputs, out);
      return $koka_dash_redex_term.Fact(pred, $std_core_hnd._open_none2(function(xs_0 /* list<koka-redex/term/term> */ , ys /* list<koka-redex/term/term> */ ) {
            return $std_core_list.append(xs_0, ys);
          }, input_args, _x_x2_0_10091));
    });
}
 
 
// monadic lift
export function single_fs__mlift_external_rule_10102(input_args, pred, solver, _implicit_fs_to_outputs, domain_inputs) /* forall<a,b> (input-args : list<koka-redex/term/term>, pred : string, solver : (a) -> <koka-redex/logic/logic,div,exn> list<b>, ?to-outputs : (b) -> div list<koka-redex/term/term>, domain-inputs : a) -> <div,exn,koka-redex/logic/logic> list<koka-redex/term/fact> */  {
   
  var x_10137 = solver(domain_inputs);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(results /* list<2298> */ ) {
      return single_fs__mlift_external_rule_10101(input_args, pred, _implicit_fs_to_outputs, results);
    });
  }
  else {
    return single_fs__mlift_external_rule_10101(input_args, pred, _implicit_fs_to_outputs, x_10137);
  }
}
 
 
// monadic lift
export function single_fs__mlift_external_rule_10103(attempt) /* (attempt : error<list<koka-redex/term/fact>>) -> <div,koka-redex/logic/logic> maybe<list<koka-redex/term/fact>> */  {
  if (attempt._tag === 2) {
    return $std_core_types.Just(attempt.value);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
export function single_fs_external_rule(shape, solver, _implicit_fs_to_fact_args, _implicit_fs_from_inputs, _implicit_fs_to_outputs) /* forall<a,b,c> (shape : c, solver : (a) -> <koka-redex/logic/logic,div,exn> list<b>, ?to-fact-args : (c) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>), ?from-inputs : (list<koka-redex/term/term>) -> <exn,div> a, ?to-outputs : (b) -> div list<koka-redex/term/term>) -> div type-level/structs/t-struct<string,external-entry,type-level/nil/t-nil> */  {
  var _x15 = _implicit_fs_to_fact_args(shape);
   
  var n = $std_core_list._lift_length_6003(_x15.fst, 0);
  return $type_dash_level_structs.TStruct(MkExternalEntry(_x15.snd, n, function(_x_x1 /* koka-redex/term/fact */ ) {
        return $std_core_hnd._open_at1(1, function(goal /* koka-redex/term/fact */ ) {
            if (((goal.pred) === (_x15.snd))) {
               
              var input_args = $std_core_hnd._open_none2($std_core_list.take, goal.args, n);
               
              var x_10139 = $std_core_exn.$try(function() {
                 
                var x_0_10141 = $std_core_hnd._open_at1(0, _implicit_fs_from_inputs, input_args);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(domain_inputs /* 2297 */ ) {
                    return single_fs__mlift_external_rule_10102(input_args, _x15.snd, solver, _implicit_fs_to_outputs, domain_inputs);
                  });
                }
                else {
                  return single_fs__mlift_external_rule_10102(input_args, _x15.snd, solver, _implicit_fs_to_outputs, x_0_10141);
                }
              });
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(single_fs__mlift_external_rule_10103);
              }
              else {
                if (x_10139._tag === 2) {
                  return $std_core_types.Just(x_10139.value);
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
            }
            else {
              return $std_core_types.Nothing;
            }
          }, _x_x1);
      }), $type_dash_level_nil.TNil);
}
 
export function default_fs_relation_def(rules) /* forall<a> (rules : a) -> relation-def<a> */  {
  return rules;
}
 
 
// monadic lift
export function func_fs__mlift_relation_def_10104(_y_x10047) /* forall<e,a> (a) -> e relation-def<a> */  {
  return _y_x10047;
}
 
export function func_fs_relation_def(rules) /* forall<e,a> (rules : () -> e a) -> e relation-def<a> */  {
   
  var x_10143 = rules();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10047 /* 2351 */ ) {
      return _y_x10047;
    });
  }
  else {
    return x_10143;
  }
}