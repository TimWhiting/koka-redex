// Koka generated module: koka-redex/forward, koka version: 3.2.4
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
import * as $std_data_rb_dash_map from './std_data_rb_dash_map.mjs';
import * as $std_core from './std_core.mjs';
import * as $koka_dash_redex_term from './koka_dash_redex_term.mjs';
import * as $koka_dash_redex_logic from './koka_dash_redex_logic.mjs';
import * as $std_fixpoint_fixpoint_dash_memo from './std_fixpoint_fixpoint_dash_memo.mjs';
import * as $std_fixpoint_lattice from './std_fixpoint_lattice.mjs';
import * as $std_core_unsafe from './std_core_unsafe.mjs';
import * as $std_data_rbtree from './std_data_rbtree.mjs';
 
// externals
 
// type declarations
 
// declarations
 
export function search_result_fs__lp__eq__eq__rp_(a, b) /* (a : search-result, b : search-result) -> div bool */  {
  if (((a.pred) === (b.pred))) {
    return $koka_dash_redex_term.term_list_fs_eq(a.args, b.args);
  }
  else {
    return false;
  }
}
 
 
// monadic lift
export function _mlift_set_join_10167($new, old, _y_x10023) /* (new : search-result, old : list<search-result>, bool) -> pure (bool, list<search-result>) */  {
  if (_y_x10023) {
    return $std_core_types.Tuple2(false, old);
  }
  else {
    return $std_core_types.Tuple2(true, $std_core_types.Cons($new, old));
  }
}
 
 
// Set join: collect all distinct results (default)
export function set_join(old, $new) /* join-policy */  {
   
  var x_10185 = $std_core_list.any(old, function(r /* search-result */ ) {
      return $std_core_hnd._open_none1(function(action /* () -> <div|_166> bool */ ) {
          return action();
        }, function() {
          return $std_core_hnd._open_none2(function(a /* search-result */ , b /* search-result */ ) {
              if (((a.pred) === (b.pred))) {
                return $koka_dash_redex_term.term_list_fs_eq(a.args, b.args);
              }
              else {
                return false;
              }
            }, r, $new);
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10023 /* bool */ ) {
      if (_y_x10023) {
        return $std_core_types.Tuple2(false, old);
      }
      else {
        return $std_core_types.Tuple2(true, $std_core_types.Cons($new, old));
      }
    });
  }
  else {
    if (x_10185) {
      return $std_core_types.Tuple2(false, old);
    }
    else {
      return $std_core_types.Tuple2(true, $std_core_types.Cons($new, old));
    }
  }
}
 
 
// Single join: deterministic relation — error if a second distinct result appears
export function single_join(old, $new) /* join-policy */  {
  if (old === null) {
    return $std_core_types.Tuple2(true, $std_core_types.Cons($new, $std_core_types.Nil));
  }
  else {
    var _x0 = $std_core_hnd._open_none1(function(action /* () -> <div|_253> bool */ ) {
        return action();
      }, function() {
        return $std_core_hnd._open_none2(function(a /* search-result */ , b /* search-result */ ) {
            if (((a.pred) === (b.pred))) {
              return $koka_dash_redex_term.term_list_fs_eq(a.args, b.args);
            }
            else {
              return false;
            }
          }, old.head, $new);
      });
    if (_x0) {
      return $std_core_types.Tuple2(false, old);
    }
    else {
       
      var _x_x1_2_10127 = $std_core_hnd._open_none1(function(action_0 /* () -> _303 string */ ) {
          return action_0();
        }, function() {
          return $std_core_hnd._open_none1($koka_dash_redex_term.fact_fs_show, old.head);
        });
       
      var _x_x2_2_10132 = $std_core_hnd._open_none1(function(action_1 /* () -> _400 string */ ) {
          return action_1();
        }, function() {
          return $std_core_hnd._open_none1($koka_dash_redex_term.fact_fs_show, $new);
        });
       
      var _x_x2_1_10128 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, " vs ", _x_x2_2_10132);
       
      var _x_x2_0_10126 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_2_10127, _x_x2_1_10128);
      return $std_core_exn.$throw($std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "single-join: relation produced multiple distinct results: ", _x_x2_0_10126));
    }
  }
}
 
 
// monadic lift
export function _mlift_make_lattice_10168($new, old, _y_x10027) /* (new : search-result, old : list<search-result>, maybe<(string, join-policy)>) -> <div,exn> (bool, list<search-result>) */  {
  if (_y_x10027 !== null) {
    return _y_x10027.value.snd(old, $new);
  }
  else {
    return set_join(old, $new);
  }
}
 
 
// Per-relation lattice: dispatches join by predicate name
export function make_lattice(policies) /* (policies : list<(string, join-policy)>) -> std/fixpoint/lattice/change-lattice<list<search-result>,search-result> */  {
  return $std_fixpoint_lattice.Change_lattice($std_core_types.Nil, function(old /* list<search-result> */ , $new /* search-result */ ) {
       
      var x_10191 = $std_core_list.find(policies, function(p /* (string, join-policy) */ ) {
          return (($std_core_hnd._open_none1(function(tuple2 /* (string, join-policy) */ ) {
              return tuple2.fst;
            }, p)) === ($new.pred));
        });
       
      function next_10192(_y_x10027) /* (maybe<(string, join-policy)>) -> <div,exn> (bool, list<search-result>) */  {
        if (_y_x10027 !== null) {
          return _y_x10027.value.snd(old, $new);
        }
        else {
          return set_join(old, $new);
        }
      }
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(next_10192);
      }
      else {
        return next_10192(x_10191);
      }
    }, function(x_0 /* list<search-result> */ ) {
      return x_0;
    });
}
 
export var result_lattice;
var result_lattice = make_lattice($std_core_types.Nil);
 
export function default_fs_external(_x_at___wildcard_x59__26) /* (koka-redex/term/fact) -> <pure,koka-redex/logic/logic> maybe<list<koka-redex/term/fact>> */  {
  return $std_core_types.Nothing;
}
 
export function default_fs_memo_key(f) /* (f : koka-redex/term/fact) -> div string */  {
  return $koka_dash_redex_term.fact_fs_show(f);
}
 
export function normalize_term(t, counter, mapping) /* (t : koka-redex/term/term, counter : int, mapping : list<(string, int, int)>) -> div (koka-redex/term/term, int, list<(string, int, int)>) */  {
  if (t._tag === 1) {
    var _x1 = $std_core_list.find(mapping, function(e /* (string, int, int) */ ) {
        var _x3 = e.fst;
        var _x2 = (_x3 === (t.name));
        if (_x2) {
          var _x4 = e.snd;
          return $std_core_types._int_eq(_x4,(t.id));
        }
        else {
          return false;
        }
      });
    if (_x1 !== null) {
      return $std_core_types.Tuple3($koka_dash_redex_term.TVar("_", _x1.value.thd), counter, mapping);
    }
    else {
      return $std_core_types.Tuple3($koka_dash_redex_term.TVar("_", counter), $std_core_types._int_add(counter,1), $std_core_types.Cons($std_core_types.Tuple3(t.name, t.id, counter), mapping));
    }
  }
  else if (t._tag === 4) {
    var _x5 = normalize_terms(t.args, counter, mapping);
    return $std_core_types.Tuple3($koka_dash_redex_term.TNode(t.name, _x5.fst), _x5.snd, _x5.thd);
  }
  else {
    return $std_core_types.Tuple3(t, counter, mapping);
  }
}
 
 
// Canonicalize unbound variables so that logically equivalent queries
// (differing only in fresh variable IDs) map to the same memo-key.
// Variables are renamed to _0, _1, ... in order of first occurrence,
// preserving sharing: reach(X, X) -> reach(_0, _0) vs reach(X, Y) -> reach(_0, _1).
export function normalize_terms(ts, counter_0, mapping_0) /* (ts : list<koka-redex/term/term>, counter : int, mapping : list<(string, int, int)>) -> div (list<koka-redex/term/term>, int, list<(string, int, int)>) */  {
  if (ts === null) {
    return $std_core_types.Tuple3($std_core_types.Nil, counter_0, mapping_0);
  }
  else {
    var _x6 = normalize_term(ts.head, counter_0, mapping_0);
    var _x7 = normalize_terms(ts.tail, _x6.snd, _x6.thd);
    return $std_core_types.Tuple3($std_core_types.Cons(_x6.fst, _x7.fst), _x7.snd, _x7.thd);
  }
}
 
export function normalize_fact(f) /* (f : koka-redex/term/fact) -> div koka-redex/term/fact */  {
  var _x8 = normalize_terms(f.args, 0, $std_core_types.Nil);
  return $koka_dash_redex_term.Fact(f.pred, _x8.fst);
}
 
 
// Count ground arguments in a resolved fact
export function groundness(f) /* (f : koka-redex/term/fact) -> div int */  {
  return $std_core_list.foldl(f.args, 0, function(acc /* int */ , a /* koka-redex/term/term */ ) {
      var _x9 = $koka_dash_redex_term.term_fs_is_ground(a);
      return (_x9) ? $std_core_types._int_add(acc,1) : acc;
    });
}
 
export function _trmc_insert_by_groundness(x, sorted, _acc) /* (x : (koka-redex/term/fact, koka-redex/term/fact), sorted : list<(koka-redex/term/fact, koka-redex/term/fact)>, ctx<list<(koka-redex/term/fact, koka-redex/term/fact)>>) -> div list<(koka-redex/term/fact, koka-redex/term/fact)> */  { tailcall: while(1)
{
  if (sorted === null) {
    return $std_core_types._cctx_apply(_acc,($std_core_types.Cons(x, $std_core_types.Nil)));
  }
  else {
    var _x11 = $std_core_list.foldl(x.snd.args, 0, function(acc /* int */ , a /* koka-redex/term/term */ ) {
        var _x12 = $koka_dash_redex_term.term_fs_is_ground(a);
        return (_x12) ? $std_core_types._int_add(acc,1) : acc;
      });
    var _x13 = $std_core_list.foldl(sorted.head.snd.args, 0, function(acc_0 /* int */ , a_0 /* koka-redex/term/term */ ) {
        var _x14 = $koka_dash_redex_term.term_fs_is_ground(a_0);
        return (_x14) ? $std_core_types._int_add(acc_0,1) : acc_0;
      });
    var _x10 = $std_core_types._int_ge(_x11,_x13);
    if (_x10) {
      return $std_core_types._cctx_apply(_acc,($std_core_types.Cons(x, sorted)));
    }
    else {
       
      var _trmc_x10021 = undefined;
       
      var _trmc_x10022 = $std_core_types.Cons(sorted.head, _trmc_x10021);
      {
        // tail call
        var _x15 = $std_core_types._cctx_extend(_acc,_trmc_x10022,({obj: _trmc_x10022, field_name: "tail"}));
        sorted = sorted.tail;
        _acc = _x15;
        continue tailcall;
      }
    }
  }
}}
 
export function insert_by_groundness(x_0, sorted_0) /* (x : (koka-redex/term/fact, koka-redex/term/fact), sorted : list<(koka-redex/term/fact, koka-redex/term/fact)>) -> div list<(koka-redex/term/fact, koka-redex/term/fact)> */  {
  return _trmc_insert_by_groundness(x_0, sorted_0, $std_core_types._cctx_empty());
}
 
 
// Sort premise pairs by groundness (most ground first) — simple insertion sort
export function sort_by_groundness(xs) /* (xs : list<(koka-redex/term/fact, koka-redex/term/fact)>) -> div list<(koka-redex/term/fact, koka-redex/term/fact)> */  {
  if (xs === null) {
    return $std_core_types.Nil;
  }
  else {
     
    var sorted_10197 = sort_by_groundness(xs.tail);
    return _trmc_insert_by_groundness(xs.head, sorted_10197, $std_core_types._cctx_empty());
  }
}
 
 
// monadic lift
export function _mlift_forward_eval_10169(each, rule_branches, _c_x10047) /* (each : (list<() -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result>) -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result, rule-branches : list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact>, list<() -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic,div,exn> search-result>) -> search-result */  {
   
  var all = $std_core_hnd._open_none2(function(xs /* list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact> */ , ys /* list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact> */ ) {
      return $std_core_list.append(xs, ys);
    }, rule_branches, _c_x10047);
  var _x16 = $std_core_hnd._open_none1(function(xs_0 /* list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact> */ ) {
      return (xs_0 === null);
    }, all);
  if (_x16) {
    return $std_core_hnd._open_at0(0, function() {
         
        var ev_10198 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x17 = $std_fixpoint_fixpoint_dash_memo.none_fs__select(ev_10198.hnd);
        return _x17(ev_10198.marker, ev_10198);
      });
  }
  else {
    return each(all);
  }
}
 
 
// monadic lift
export function _mlift_forward_eval_10170(each_0, rule_branches_0, _y_x10045) /* (each : (list<() -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result>) -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result, rule-branches : list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact>, maybe<list<koka-redex/term/fact>>) -> <div,exn,koka-redex/logic/logic,std/fixpoint/fixpoint-memo/cache<string,search-result>> search-result */  {
   
  if (_y_x10045 !== null) {
    var x_10200 = $std_core_list.map(_y_x10045.value, function(r_0_0 /* koka-redex/term/fact */ ) {
        return function() {
          return r_0_0;
        };
      });
  }
  else {
    var x_10200 = $std_core_types.Nil;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10047_0 /* list<() -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic,div,exn> search-result> */ ) {
      return _mlift_forward_eval_10169(each_0, rule_branches_0, _c_x10047_0);
    });
  }
  else {
    return _mlift_forward_eval_10169(each_0, rule_branches_0, x_10200);
  }
}
 
 
// monadic lift
export function _mlift_forward_eval_10171(rf, wild___0) /* (rf : koka-redex/term/rule, wild_@0 : ()) -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact */  {
   
  var _x_x1_7_10146 = $std_core_hnd._open_none1(function(rule_1 /* koka-redex/term/rule */ ) {
      return rule_1.conclusion;
    }, rf);
  return $std_core_hnd._open_at1(2, function(f_1 /* koka-redex/term/fact */ ) {
       
      var ev_0_10202 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      var _x18 = $koka_dash_redex_logic.resolve_fact_fs__select(ev_0_10202.hnd);
      return _x18(ev_0_10202.marker, ev_0_10202, f_1);
    }, _x_x1_7_10146);
}
 
 
// monadic lift
export function _mlift_forward_eval_10172(_implicit_fs_external, _implicit_fs_memo_key, rf_0, rules, wild__) /* (?external : external-solver, ?memo-key : (koka-redex/term/fact) -> div string, rf : koka-redex/term/rule, rules : list<koka-redex/term/rule>, wild_ : ()) -> <div,koka-redex/logic/logic,std/fixpoint/fixpoint-memo/cache<string,search-result>,exn> koka-redex/term/fact */  {
   
  var x_1_10205 = forward_premises($std_core_hnd._open_none1(function(rule_0 /* koka-redex/term/rule */ ) {
        return rule_0.premises;
      }, rf_0), rules, _implicit_fs_external, _implicit_fs_memo_key);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0_0 /* () */ ) {
      return _mlift_forward_eval_10171(rf_0, wild___0_0);
    });
  }
  else {
    return _mlift_forward_eval_10171(rf_0, x_1_10205);
  }
}
 
 
// monadic lift
export function _mlift_forward_eval_10173(args1, name, pred, _y_x10035) /* (args1 : list<koka-redex/term/term>, name : string, pred : string, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>)) -> <div,koka-redex/logic/logic> koka-redex/term/rule */  {
  return $koka_dash_redex_term.Rule(name, _y_x10035.snd, $koka_dash_redex_term.Fact(pred, args1));
}
 
 
// monadic lift
export function _mlift_forward_eval_10174(name_0, pred_0, premises, _y_x10034) /* (name : string, pred : string, premises : list<koka-redex/term/fact>, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>)) -> <div,koka-redex/logic/logic> koka-redex/term/rule */  {
   
  var x_2_10207 = $koka_dash_redex_logic.freshen_facts(premises, _y_x10034.fst);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10035_0 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>) */ ) {
      return _mlift_forward_eval_10173(_y_x10034.snd, name_0, pred_0, _y_x10035_0);
    });
  }
  else {
    return _mlift_forward_eval_10173(_y_x10034.snd, name_0, pred_0, x_2_10207);
  }
}
 
 
// monadic lift
export function _mlift_forward_eval_10175(_implicit_fs_external_0, goal, _implicit_fs_memo_key_0, rules_0, rf_1) /* (?external : external-solver, goal : koka-redex/term/fact, ?memo-key : (koka-redex/term/fact) -> div string, rules : list<koka-redex/term/rule>, rf : koka-redex/term/rule) -> <div,koka-redex/logic/logic,std/fixpoint/fixpoint-memo/cache<string,search-result>,exn> koka-redex/term/fact */  {
   
  var _x_x2_10142 = $std_core_hnd._open_none1(function(rule /* koka-redex/term/rule */ ) {
      return rule.conclusion;
    }, rf_1);
   
  var x_3_10209 = $std_core_hnd._open_at2(2, $koka_dash_redex_logic.unify_facts, goal, _x_x2_10142);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___1 /* () */ ) {
      return _mlift_forward_eval_10172(_implicit_fs_external_0, _implicit_fs_memo_key_0, rf_1, rules_0, wild___1);
    });
  }
  else {
    return _mlift_forward_eval_10172(_implicit_fs_external_0, _implicit_fs_memo_key_0, rf_1, rules_0, x_3_10209);
  }
}
 
 
// monadic lift
export function _mlift_forward_eval_10176(each_1, _implicit_fs_external_1, goal_0, rule_branches_1) /* (each : (list<() -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result>) -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result, ?external : external-solver, goal : koka-redex/term/fact, rule-branches : list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact>) -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result */  {
   
  var x_4_10211 = $std_core_hnd._open1($std_core_vector.unvlist($std_core_types.Cons(1, $std_core_types.Cons(2, $std_core_types.Nil))), _implicit_fs_external_1, goal_0);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10045_0 /* maybe<list<koka-redex/term/fact>> */ ) {
      return _mlift_forward_eval_10170(each_1, rule_branches_1, _y_x10045_0);
    });
  }
  else {
    return _mlift_forward_eval_10170(each_1, rule_branches_1, x_4_10211);
  }
}
 
 
// monadic lift
export function _mlift_forward_eval_10177(_implicit_fs_external_2, goal_1, _implicit_fs_memo_key_1, rules_1, _y_x10033) /* (?external : external-solver, goal : koka-redex/term/fact, ?memo-key : (koka-redex/term/fact) -> div string, rules : list<koka-redex/term/rule>, koka-redex/term/fact) -> <koka-redex/logic/logic,div,std/fixpoint/fixpoint-memo/cache<string,search-result>,exn> search-result */  {
   
  var _x_x1_1_10138 = $std_core_hnd._open_none1(function(f_2 /* koka-redex/term/fact */ ) {
      var _x19 = normalize_terms(f_2.args, 0, $std_core_types.Nil);
      return $koka_dash_redex_term.Fact(f_2.pred, _x19.fst);
    }, _y_x10033);
   
  var key = $std_core_hnd._open_none1(_implicit_fs_memo_key_1, _x_x1_1_10138);
  return $std_fixpoint_fixpoint_dash_memo.memo(key, function(each_2 /* (list<() -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result>) -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result */ ) {
       
      var x_5_10213 = $std_core_list.map(rules_1, function(r /* koka-redex/term/rule */ ) {
          return function() {
             
            var x_6_10215 = $std_core_hnd._open_at1(2, function(r_0 /* koka-redex/term/rule */ ) {
                 
                var x_7_10217 = $koka_dash_redex_logic.freshen_terms(r_0.conclusion.args, $std_core_types.Nil);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(_y_x10034_0 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
                    return _mlift_forward_eval_10174(r_0.name, r_0.conclusion.pred, r_0.premises, _y_x10034_0);
                  });
                }
                else {
                  return _mlift_forward_eval_10174(r_0.name, r_0.conclusion.pred, r_0.premises, x_7_10217);
                }
              }, r);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(rf_2 /* koka-redex/term/rule */ ) {
                return _mlift_forward_eval_10175(_implicit_fs_external_2, goal_1, _implicit_fs_memo_key_1, rules_1, rf_2);
              });
            }
            else {
              return _mlift_forward_eval_10175(_implicit_fs_external_2, goal_1, _implicit_fs_memo_key_1, rules_1, x_6_10215);
            }
          };
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(rule_branches_2 /* list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact> */ ) {
          return _mlift_forward_eval_10176(each_2, _implicit_fs_external_2, goal_1, rule_branches_2);
        });
      }
      else {
        return _mlift_forward_eval_10176(each_2, _implicit_fs_external_2, goal_1, x_5_10213);
      }
    });
}
 
 
// monadic lift
export function _mlift_forward_premises_10178(_implicit_fs_external_0_0, _implicit_fs_memo_key_0_0, rules_0_0, _y_x10065) /* (?external@0 : external-solver, ?memo-key@0 : (koka-redex/term/fact) -> div string, rules@0 : list<koka-redex/term/rule>, list<koka-redex/term/fact>) -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> () */  {
  return forward_premises(_y_x10065, rules_0_0, _implicit_fs_external_0_0, _implicit_fs_memo_key_0_0);
}
 
 
// monadic lift
export function _mlift_forward_premises_10179(_implicit_fs_external_0_1, _implicit_fs_memo_key_0_1, rest, rules_0_1, wild___1_0) /* (?external@0 : external-solver, ?memo-key@0 : (koka-redex/term/fact) -> div string, rest : list<(koka-redex/term/fact, koka-redex/term/fact)>, rules@0 : list<koka-redex/term/rule>, wild_@1 : ()) -> <div,koka-redex/logic/logic,std/fixpoint/fixpoint-memo/cache<string,search-result>,exn> () */  {
   
  var x_8_10219 = $std_core_list.map(rest, function(_x_x1_8 /* (koka-redex/term/fact, koka-redex/term/fact) */ ) {
      return $std_core_hnd._open_none1($std_core_types.tuple2_fs_fst, _x_x1_8);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10065_0 /* list<koka-redex/term/fact> */ ) {
      return _mlift_forward_premises_10178(_implicit_fs_external_0_1, _implicit_fs_memo_key_0_1, rules_0_1, _y_x10065_0);
    });
  }
  else {
    return _mlift_forward_premises_10178(_implicit_fs_external_0_1, _implicit_fs_memo_key_0_1, rules_0_1, x_8_10219);
  }
}
 
 
// monadic lift
export function _mlift_forward_premises_10180(_implicit_fs_external_0_2, _implicit_fs_memo_key_0_2, p_0_0, rest_0, rules_0_2, _c_x10063) /* (?external@0 : external-solver, ?memo-key@0 : (koka-redex/term/fact) -> div string, p@0@0 : koka-redex/term/fact, rest : list<(koka-redex/term/fact, koka-redex/term/fact)>, rules@0 : list<koka-redex/term/rule>, koka-redex/term/fact) -> () */  {
   
  var x_9_10221 = $std_core_hnd._open_at2(2, $koka_dash_redex_logic.unify_facts, p_0_0, _c_x10063);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___1_1 /* () */ ) {
      return _mlift_forward_premises_10179(_implicit_fs_external_0_2, _implicit_fs_memo_key_0_2, rest_0, rules_0_2, wild___1_1);
    });
  }
  else {
    return _mlift_forward_premises_10179(_implicit_fs_external_0_2, _implicit_fs_memo_key_0_2, rest_0, rules_0_2, x_9_10221);
  }
}
 
 
// monadic lift
export function _mlift_forward_premises_10181(_implicit_fs_external_0_3, _implicit_fs_memo_key_0_3, p_resolved, p_0_0_0, rest_1, rules_0_3, _y_x10056) /* (?external@0 : external-solver, ?memo-key@0 : (koka-redex/term/fact) -> div string, p-resolved : koka-redex/term/fact, p@0@0 : koka-redex/term/fact, rest : list<(koka-redex/term/fact, koka-redex/term/fact)>, rules@0 : list<koka-redex/term/rule>, maybe<list<koka-redex/term/fact>>) -> <div,exn,koka-redex/logic/logic,std/fixpoint/fixpoint-memo/cache<string,search-result>> () */  {
   
  if (_y_x10056 !== null) {
    var _x19 = $std_core_hnd._open_none1(function(xs_1 /* list<koka-redex/term/fact> */ ) {
        return (xs_1 === null);
      }, _y_x10056.value);
    if (_x19) {
      var x_10_10223 = $std_core_hnd._open_at0(0, function() {
           
          var ev_1_10225 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          var _x20 = $std_fixpoint_fixpoint_dash_memo.none_fs__select(ev_1_10225.hnd);
          return _x20(ev_1_10225.marker, ev_1_10225);
        });
    }
    else {
      var x_10_10223 = $std_core_hnd._open_at1(0, function(ss /* list<koka-redex/term/fact> */ ) {
           
          var ev_2_10227 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          var _x21 = $std_fixpoint_fixpoint_dash_memo.do_each_fs__select(ev_2_10227.hnd);
          return _x21(ev_2_10227.marker, ev_2_10227, ss);
        }, _y_x10056.value);
    }
  }
  else {
    var x_10_10223 = forward_eval(p_resolved, rules_0_3, _implicit_fs_external_0_3, _implicit_fs_memo_key_0_3);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10063_0 /* koka-redex/term/fact */ ) {
      return _mlift_forward_premises_10180(_implicit_fs_external_0_3, _implicit_fs_memo_key_0_3, p_0_0_0, rest_1, rules_0_3, _c_x10063_0);
    });
  }
  else {
    return _mlift_forward_premises_10180(_implicit_fs_external_0_3, _implicit_fs_memo_key_0_3, p_0_0_0, rest_1, rules_0_3, x_10_10223);
  }
}
 
 
// monadic lift
export function _mlift_forward_premises_10182(p_0, _y_x10054) /* (p@0 : koka-redex/term/fact, koka-redex/term/fact) -> <koka-redex/logic/logic,std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn> (koka-redex/term/fact, koka-redex/term/fact) */  {
  return $std_core_types.Tuple2(p_0, _y_x10054);
}
 
 
// monadic lift
export function _mlift_forward_premises_10183(_implicit_fs_external_0_4, _implicit_fs_memo_key_0_4, rules_0_4, resolved) /* (?external@0 : external-solver, ?memo-key@0 : (koka-redex/term/fact) -> div string, rules@0 : list<koka-redex/term/rule>, resolved : list<(koka-redex/term/fact, koka-redex/term/fact)>) -> <koka-redex/logic/logic,std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn> () */  {
   
  var sorted = $std_core_hnd._open_none1(sort_by_groundness, resolved);
  if (sorted !== null) {
     
    var x_12_10230 = $std_core_hnd._open1($std_core_vector.unvlist($std_core_types.Cons(1, $std_core_types.Cons(2, $std_core_types.Nil))), _implicit_fs_external_0_4, sorted.head.snd);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10056_0 /* maybe<list<koka-redex/term/fact>> */ ) {
        return _mlift_forward_premises_10181(_implicit_fs_external_0_4, _implicit_fs_memo_key_0_4, sorted.head.snd, sorted.head.fst, sorted.tail, rules_0_4, _y_x10056_0);
      });
    }
    else {
      return _mlift_forward_premises_10181(_implicit_fs_external_0_4, _implicit_fs_memo_key_0_4, sorted.head.snd, sorted.head.fst, sorted.tail, rules_0_4, x_12_10230);
    }
  }
  else {
    return $std_core_types.Unit;
  }
}
 
export function forward_eval(goal_2, rules_2, _implicit_fs_external_3, _implicit_fs_memo_key_2) /* (goal : koka-redex/term/fact, rules : list<koka-redex/term/rule>, ?external : external-solver, ?memo-key : (koka-redex/term/fact) -> div string) -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> search-result */  {
   
  var x_13_10232 = $std_core_hnd._open_at1(2, function(f_0_0 /* koka-redex/term/fact */ ) {
       
      var ev_3_10235 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      var _x19 = $koka_dash_redex_logic.resolve_fact_fs__select(ev_3_10235.hnd);
      return _x19(ev_3_10235.marker, ev_3_10235, f_0_0);
    }, goal_2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10033_0 /* koka-redex/term/fact */ ) {
      return _mlift_forward_eval_10177(_implicit_fs_external_3, goal_2, _implicit_fs_memo_key_2, rules_2, _y_x10033_0);
    });
  }
  else {
     
    var _x_x1_1_10138_0 = $std_core_hnd._open_none1(function(f_6 /* koka-redex/term/fact */ ) {
        var _x19 = normalize_terms(f_6.args, 0, $std_core_types.Nil);
        return $koka_dash_redex_term.Fact(f_6.pred, _x19.fst);
      }, x_13_10232);
     
    var key_0 = $std_core_hnd._open_none1(_implicit_fs_memo_key_2, _x_x1_1_10138_0);
    return $std_fixpoint_fixpoint_dash_memo.memo(key_0, function(each_3 /* (list<() -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result>) -> <std/fixpoint/fixpoint-memo/cache<string,search-result>,div,exn,koka-redex/logic/logic> search-result */ ) {
         
        var x_15_10238 = $std_core_list.map(rules_2, function(r_1 /* koka-redex/term/rule */ ) {
            return function() {
               
              var x_16_10240 = $std_core_hnd._open_at1(2, function(r_0_1 /* koka-redex/term/rule */ ) {
                   
                  var x_17_10242 = $koka_dash_redex_logic.freshen_terms(r_0_1.conclusion.args, $std_core_types.Nil);
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(function(_y_x10034_1 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
                      return _mlift_forward_eval_10174(r_0_1.name, r_0_1.conclusion.pred, r_0_1.premises, _y_x10034_1);
                    });
                  }
                  else {
                    return _mlift_forward_eval_10174(r_0_1.name, r_0_1.conclusion.pred, r_0_1.premises, x_17_10242);
                  }
                }, r_1);
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(function(rf_3 /* koka-redex/term/rule */ ) {
                  return _mlift_forward_eval_10175(_implicit_fs_external_3, goal_2, _implicit_fs_memo_key_2, rules_2, rf_3);
                });
              }
              else {
                return _mlift_forward_eval_10175(_implicit_fs_external_3, goal_2, _implicit_fs_memo_key_2, rules_2, x_16_10240);
              }
            };
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(rule_branches_3 /* list<() -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> koka-redex/term/fact> */ ) {
            return _mlift_forward_eval_10176(each_3, _implicit_fs_external_3, goal_2, rule_branches_3);
          });
        }
        else {
          return _mlift_forward_eval_10176(each_3, _implicit_fs_external_3, goal_2, x_15_10238);
        }
      });
  }
}
 
 
// Sort premises by groundness (most ground first), re-sorting after each evaluation
export function forward_premises(premises_0_0, rules_0_5, _implicit_fs_external_0_5, _implicit_fs_memo_key_0_5) /* (premises : list<koka-redex/term/fact>, rules : list<koka-redex/term/rule>, ?external : external-solver, ?memo-key : (koka-redex/term/fact) -> div string) -> <pure,std/fixpoint/fixpoint-memo/cache<string,search-result>,koka-redex/logic/logic> () */  { tailcall: while(1)
{
  if (premises_0_0 === null) {
    return $std_core_types.Unit;
  }
  else {
     
    var x_18_10244 = $std_core_list.map(premises_0_0, function(p_0_1 /* koka-redex/term/fact */ ) {
         
        var x_19_10247 = $std_core_hnd._open_at1(2, function(f_2_0 /* koka-redex/term/fact */ ) {
             
            var ev_4_10249 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
            var _x19 = $koka_dash_redex_logic.resolve_fact_fs__select(ev_4_10249.hnd);
            return _x19(ev_4_10249.marker, ev_4_10249, f_2_0);
          }, p_0_1);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10054_0 /* koka-redex/term/fact */ ) {
            return _mlift_forward_premises_10182(p_0_1, _y_x10054_0);
          });
        }
        else {
          return _mlift_forward_premises_10182(p_0_1, x_19_10247);
        }
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(resolved_0 /* list<(koka-redex/term/fact, koka-redex/term/fact)> */ ) {
        return _mlift_forward_premises_10183(_implicit_fs_external_0_5, _implicit_fs_memo_key_0_5, rules_0_5, resolved_0);
      });
    }
    else {
       
      var sorted_0 = $std_core_hnd._open_none1(sort_by_groundness, x_18_10244);
      if (sorted_0 !== null) {
         
        var x_21_10252 = $std_core_hnd._open1($std_core_vector.unvlist($std_core_types.Cons(1, $std_core_types.Cons(2, $std_core_types.Nil))), _implicit_fs_external_0_5, sorted_0.head.snd);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10056_1 /* maybe<list<koka-redex/term/fact>> */ ) {
            return _mlift_forward_premises_10181(_implicit_fs_external_0_5, _implicit_fs_memo_key_0_5, sorted_0.head.snd, sorted_0.head.fst, sorted_0.tail, rules_0_5, _y_x10056_1);
          });
        }
        else {
           
          if (x_21_10252 !== null) {
            var _x19 = $std_core_hnd._open_none1(function(xs_1_0 /* list<koka-redex/term/fact> */ ) {
                return (xs_1_0 === null);
              }, x_21_10252.value);
            if (_x19) {
              var x_22_10255 = $std_core_hnd._open_at0(0, function() {
                   
                  var ev_5_10258 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
                  var _x20 = $std_fixpoint_fixpoint_dash_memo.none_fs__select(ev_5_10258.hnd);
                  return _x20(ev_5_10258.marker, ev_5_10258);
                });
            }
            else {
              var x_22_10255 = $std_core_hnd._open_at1(0, function(ss_0 /* list<koka-redex/term/fact> */ ) {
                   
                  var ev_6_10260 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
                  var _x21 = $std_fixpoint_fixpoint_dash_memo.do_each_fs__select(ev_6_10260.hnd);
                  return _x21(ev_6_10260.marker, ev_6_10260, ss_0);
                }, x_21_10252.value);
            }
          }
          else {
            var x_22_10255 = forward_eval(sorted_0.head.snd, rules_0_5, _implicit_fs_external_0_5, _implicit_fs_memo_key_0_5);
          }
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_c_x10063_1 /* koka-redex/term/fact */ ) {
              return _mlift_forward_premises_10180(_implicit_fs_external_0_5, _implicit_fs_memo_key_0_5, sorted_0.head.fst, sorted_0.tail, rules_0_5, _c_x10063_1);
            });
          }
          else {
             
            var x_24_10263 = $std_core_hnd._open_at2(2, $koka_dash_redex_logic.unify_facts, sorted_0.head.fst, x_22_10255);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(wild___1_2 /* () */ ) {
                return _mlift_forward_premises_10179(_implicit_fs_external_0_5, _implicit_fs_memo_key_0_5, sorted_0.tail, rules_0_5, wild___1_2);
              });
            }
            else {
               
              var x_25_10266 = $std_core_list.map(sorted_0.tail, function(_x_x1_8_0 /* (koka-redex/term/fact, koka-redex/term/fact) */ ) {
                  return $std_core_hnd._open_none1($std_core_types.tuple2_fs_fst, _x_x1_8_0);
                });
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(function(_y_x10065_1 /* list<koka-redex/term/fact> */ ) {
                  return _mlift_forward_premises_10178(_implicit_fs_external_0_5, _implicit_fs_memo_key_0_5, rules_0_5, _y_x10065_1);
                });
              }
              else {
                {
                  // tail call
                  premises_0_0 = x_25_10266;
                  continue tailcall;
                }
              }
            }
          }
        }
      }
      else {
        return $std_core_types.Unit;
      }
    }
  }
}}
 
export var default_fs_lattice_policies;
var default_fs_lattice_policies = $std_core_types.Nil;
 
 
// monadic lift
export function _mlift_forward_search_10184(table) /* (table : std/data/rb-map/rbmap<string,list<search-result>>) -> pure list<(string, list<search-result>)> */  {
  return $std_core_hnd._open_none1(function(s_0 /* std/data/rb-map/rbmap<string,list<search-result>> */ ) {
      return $std_data_rbtree.list(s_0);
    }, table);
}
 
export function forward_search(goal, rules, _implicit_fs_external, _implicit_fs_memo_key, _implicit_fs_lattice_policies) /* (goal : koka-redex/term/fact, rules : list<koka-redex/term/rule>, ?external : external-solver, ?memo-key : (koka-redex/term/fact) -> div string, ?lattice-policies : list<(string, join-policy)>) -> pure list<(string, list<search-result>)> */  {
   
  var _arg_x2515 = $std_core_hnd._open_none1(make_lattice, _implicit_fs_lattice_policies);
   
  var x_10269 = $std_fixpoint_fixpoint_dash_memo.cache(function() {
      return $koka_dash_redex_logic.with_logic(function() {
          return $std_core_hnd._open_at0(0, function() {
               
              var ev_10272 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
              var _x19 = $std_fixpoint_fixpoint_dash_memo.none_fs__select(ev_10272.hnd);
              return _x19(ev_10272.marker, ev_10272);
            });
        }, function() {
          return forward_eval(goal, rules, _implicit_fs_external, _implicit_fs_memo_key);
        });
    }, function(_x_x1_0 /* string */ , _x_x2 /* string */ ) {
      return $std_core_hnd._open_none2($std_core_string.order2, _x_x1_0, _x_x2);
    }, _arg_x2515, function(s /* string */ ) {
      return s;
    }, function(f_0 /* koka-redex/term/fact */ ) {
      return $std_core_hnd._open_none1($koka_dash_redex_term.fact_fs_show, f_0);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_forward_search_10184);
  }
  else {
    return $std_core_hnd._open_none1(function(s_0 /* std/data/rb-map/rbmap<string,list<search-result>> */ ) {
        return $std_data_rbtree.list(s_0);
      }, x_10269);
  }
}