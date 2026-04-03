// Koka generated module: handlers/scoped, koka version: 3.2.4
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
import * as $std_core from './std_core.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the effect `:nondet`
export var nondet_fs__tag;
var nondet_fs__tag = "nondet@scoped";
 
 
// runtime tag for the effect `:state`
export var state_fs__tag;
var state_fs__tag = "state@scoped";
 
 
// runtime tag for the effect `:cutfail`
export var cutfail_fs__tag;
var cutfail_fs__tag = "cutfail@scoped";
 
 
// runtime tag for the effect `:symbol`
export var symbol_fs__tag;
var symbol_fs__tag = "symbol@scoped";
// type cutfail
export function _Hnd_cutfail(_cfc, _ctl_cutfail) /* forall<e,a> (int, forall<b> hnd/clause0<b,cutfail,e,a>) -> cutfail<e,a> */  {
  return { _cfc: _cfc, _ctl_cutfail: _ctl_cutfail };
}
// type nondet
export function _Hnd_nondet(_cfc, _ctl_fail, _ctl_flip) /* forall<e,a> (int, forall<b> hnd/clause0<b,nondet,e,a>, hnd/clause0<bool,nondet,e,a>) -> nondet<e,a> */  {
  return { _cfc: _cfc, _ctl_fail: _ctl_fail, _ctl_flip: _ctl_flip };
}
// type state
export function _Hnd_state(_cfc, _fun_get, _fun_put) /* forall<a,e,b> (int, hnd/clause0<a,state<a>,e,b>, hnd/clause1<a,(),state<a>,e,b>) -> state<a,e,b> */  {
  return { _cfc: _cfc, _fun_get: _fun_get, _fun_put: _fun_put };
}
// type symbol
export function _Hnd_symbol(_cfc, _fun_symbol) /* forall<e,a> (int, hnd/clause1<string,string,symbol,e,a>) -> symbol<e,a> */  {
  return { _cfc: _cfc, _fun_symbol: _fun_symbol };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:nondet` type.
export function nondet_fs__cfc(nondet) /* forall<e,a> (nondet : nondet<e,a>) -> int */  {
  return nondet._cfc;
}
 
 
// handler for the effect `:nondet`
export function nondet_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : nondet<e,b>, ret : (res : a) -> e b, action : () -> <nondet|e> a) -> e b */  {
  return $std_core_hnd._hhandle(nondet_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@ctl-flip` constructor field of the `:nondet` type.
export function nondet_fs__ctl_flip(nondet) /* forall<e,a> (nondet : nondet<e,a>) -> hnd/clause0<bool,nondet,e,a> */  {
  return nondet._ctl_flip;
}
 
 
// select `flip` operation out of effect `:nondet`
export function flip_fs__select(hnd) /* forall<e,a> (hnd : nondet<e,a>) -> hnd/clause0<bool,nondet,e,a> */  {
  return hnd._ctl_flip;
}
 
 
// Call the `ctl flip` operation of the effect `:nondet`
export function flip() /* () -> nondet bool */  {
   
  var ev_10372 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10372.hnd._ctl_flip(ev_10372.marker, ev_10372);
}
 
 
// Automatically generated. Retrieves the `@ctl-fail` constructor field of the `:nondet` type.
export function nondet_fs__ctl_fail(nondet) /* forall<e,a,b> (nondet : nondet<e,a>) -> hnd/clause0<b,nondet,e,a> */  {
  return nondet._ctl_fail;
}
 
 
// select `fail` operation out of effect `:nondet`
export function fail_fs__select(hnd) /* forall<a,e,b> (hnd : nondet<e,b>) -> hnd/clause0<a,nondet,e,b> */  {
  return hnd._ctl_fail;
}
 
 
// Call the `ctl fail` operation of the effect `:nondet`
export function fail() /* forall<a> () -> nondet a */  {
   
  var ev_10374 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x0 = ev_10374.hnd._ctl_fail;
  return _x0(ev_10374.marker, ev_10374);
}
 
 
// monadic lift
export function _mlift_select_10332(x, xx, _y_x10038) /* forall<a> (x : a, xx : list<a>, bool) -> nondet a */  {
  if (_y_x10038) {
    return x;
  }
  else {
    return select(xx);
  }
}
 
export function select(xs) /* forall<a> (xs : list<a>) -> nondet a */  { tailcall: while(1)
{
  if (xs === null) {
     
    var ev_10376 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    var _x1 = ev_10376.hnd._ctl_fail;
    return _x1(ev_10376.marker, ev_10376);
  }
  else {
     
    var ev_0_10378 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x_1 = ev_0_10378.hnd._ctl_flip(ev_0_10378.marker, ev_0_10378);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10038_0 /* bool */ ) {
        return _mlift_select_10332(xs.head, xs.tail, _y_x10038_0);
      });
    }
    else {
      if (x_1) {
        return xs.head;
      }
      else {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// monadic lift
export function _mlift_trmc_knapsack_10333(_acc, _y_x10042) /* (ctx<list<int>>, list<int>) -> nondet list<int> */  {
  return $std_core_types._cctx_apply(_acc,_y_x10042);
}
 
 
// monadic lift
export function _mlift_trmc_knapsack_10334(_acc_0, vs, w, v) /* (ctx<list<int>>, vs : list<int>, w : int, v : int) -> nondet list<int> */  {
   
  var _trmc_x10030 = undefined;
   
  var _trmc_x10031 = $std_core_types.Cons(v, _trmc_x10030);
  return _trmc_knapsack($std_core_types._int_sub(w,v), vs, $std_core_types._cctx_extend(_acc_0,_trmc_x10031,({obj: _trmc_x10031, field_name: "tail"})));
}
 
 
// monadic lift
export function _mlift_trmcm_knapsack_10335(_accm, vs_0, w_0, v_0) /* ((list<int>) -> list<int>, vs : list<int>, w : int, v : int) -> nondet list<int> */  {
  return _trmcm_knapsack($std_core_types._int_sub(w_0,v_0), vs_0, function(_trmc_x10033 /* list<int> */ ) {
      return _accm($std_core_types.Cons(v_0, _trmc_x10033));
    });
}
 
export function _trmc_knapsack(w_1, vs_1, _acc_1) /* (w : int, vs : list<int>, ctx<list<int>>) -> <div,nondet> list<int> */  { tailcall: while(1)
{
  if ($std_core_types._int_lt(w_1,0)) {
     
    var ev_10380 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var _x2 = ev_10380.hnd._ctl_fail;
    var x = _x2(ev_10380.marker, ev_10380);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10042_0 /* list<int> */ ) {
        return _mlift_trmc_knapsack_10333(_acc_1, _y_x10042_0);
      });
    }
    else {
      return $std_core_types._cctx_apply(_acc_1,x);
    }
  }
  else {
    if ($std_core_types._int_eq(w_1,0)) {
      return $std_core_types._cctx_apply(_acc_1,($std_core_types.Nil));
    }
    else {
       
      var x_0_10382 = select(vs_1);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(v_1 /* int */ ) {
          return _mlift_trmc_knapsack_10334(_acc_1, vs_1, w_1, v_1);
        });
      }
      else {
         
        var _trmc_x10030_0 = undefined;
         
        var _trmc_x10031_0 = $std_core_types.Cons(x_0_10382, _trmc_x10030_0);
        {
          // tail call
          var _x2 = $std_core_types._int_sub(w_1,x_0_10382);
          var _x3 = $std_core_types._cctx_extend(_acc_1,_trmc_x10031_0,({obj: _trmc_x10031_0, field_name: "tail"}));
          w_1 = _x2;
          _acc_1 = _x3;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function _trmcm_knapsack(w_2, vs_2, _accm_0) /* (w : int, vs : list<int>, (list<int>) -> list<int>) -> <div,nondet> list<int> */  { tailcall: while(1)
{
  if ($std_core_types._int_lt(w_2,0)) {
     
    var ev_0_10385 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var _x4 = ev_0_10385.hnd._ctl_fail;
    var x_1 = _x4(ev_0_10385.marker, ev_0_10385);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_accm_0);
    }
    else {
      return _accm_0(x_1);
    }
  }
  else {
    if ($std_core_types._int_eq(w_2,0)) {
      return _accm_0($std_core_types.Nil);
    }
    else {
       
      var x_2_10387 = select(vs_2);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(v_3 /* int */ ) {
          return _mlift_trmcm_knapsack_10335(_accm_0, vs_2, w_2, v_3);
        });
      }
      else {
        {
          // tail call
          var _x6 = $std_core_types._int_sub(w_2,x_2_10387);
          var _x7 = function(__at_accm_04 /* (list<int>) -> list<int> */ , _x_2_103875 /* int */ ) {
            return function(_trmc_x10033_0 /* list<int> */ ) {
              return __at_accm_04($std_core_types.Cons(_x_2_103875, _trmc_x10033_0));
            };
          }(_accm_0, x_2_10387);
          w_2 = _x6;
          _accm_0 = _x7;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function knapsack(w_3, vs_3) /* (w : int, vs : list<int>) -> <div,nondet> list<int> */  {
  var _x8 = $std_core_hnd._evv_is_affine();
  if (_x8) {
    return _trmc_knapsack(w_3, vs_3, $std_core_types._cctx_empty());
  }
  else {
    return _trmcm_knapsack(w_3, vs_3, function(_trmc_x10032 /* list<int> */ ) {
        return _trmc_x10032;
      });
  }
}
 
 
// monadic lift
export function _mlift_solutions_10336(_y_x10055, _y_x10056) /* forall<a,e> (list<a>, list<a>) -> e list<a> */  {
  return $std_core_hnd._open_none2(function(xs /* list<965> */ , ys /* list<965> */ ) {
      return $std_core_list.append(xs, ys);
    }, _y_x10055, _y_x10056);
}
 
 
// monadic lift
export function _mlift_solutions_10337(resume_0, _y_x10055) /* forall<a,e> (resume@0 : (bool) -> e list<a>, list<a>) -> e list<a> */  {
   
  var x_10390 = resume_0(false);
   
  function next_10391(_y_x10056) /* (list<965>) -> 966 list<965> */  {
    return $std_core_hnd._open_none2(function(xs /* list<965> */ , ys /* list<965> */ ) {
        return $std_core_list.append(xs, ys);
      }, _y_x10055, _y_x10056);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10391);
  }
  else {
    return next_10391(x_10390);
  }
}
 
export function solutions(_action) /* forall<a,e> (() -> <nondet|e> a) -> e list<a> */  {
  return nondet_fs__handle(_Hnd_nondet(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (918) -> 966 list<965> */ ) {
          return $std_core_types.Nil;
        }), $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume_0 /* (bool) -> 966 list<965> */ ) {
           
          var x_10394 = resume_0(true);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10055 /* list<965> */ ) {
              return _mlift_solutions_10337(resume_0, _y_x10055);
            });
          }
          else {
            return _mlift_solutions_10337(resume_0, x_10394);
          }
        })), function(x_0 /* 965 */ ) {
      return $std_core_types.Cons(x_0, $std_core_types.Nil);
    }, _action);
}
 
export function example1() /* () -> div list<list<int>> */  {
  return solutions(function() {
     
    var vs_10397 = $std_core_types.Cons(3, $std_core_types.Cons(2, $std_core_types.Cons(1, $std_core_types.Nil)));
    var _x9 = $std_core_hnd._evv_is_affine();
    if (_x9) {
      return _trmc_knapsack(3, vs_10397, $std_core_types._cctx_empty());
    }
    else {
      return _trmcm_knapsack(3, vs_10397, function(_trmc_x10032 /* list<int> */ ) {
          return _trmc_x10032;
        });
    }
  });
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:state` type.
export function state_fs__cfc(state_0) /* forall<a,e,b> (state : state<a,e,b>) -> int */  {
  return state_0._cfc;
}
 
 
// handler for the effect `:state`
export function state_fs__handle(hnd, ret, action) /* forall<a,b,e,c> (hnd : state<a,e,c>, ret : (res : b) -> e c, action : () -> <state<a>|e> b) -> e c */  {
  return $std_core_hnd._hhandle(state_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-get` constructor field of the `:state` type.
export function state_fs__fun_get(state_0) /* forall<a,e,b> (state : state<a,e,b>) -> hnd/clause0<a,state<a>,e,b> */  {
  return state_0._fun_get;
}
 
 
// select `get` operation out of effect `:state`
export function get_fs__select(hnd) /* forall<a,e,b> (hnd : state<a,e,b>) -> hnd/clause0<a,state<a>,e,b> */  {
  return hnd._fun_get;
}
 
 
// Call the `fun get` operation of the effect `:state`
export function get() /* forall<a> () -> (state<a>) a */  {
   
  var ev_10399 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10399.hnd._fun_get(ev_10399.marker, ev_10399);
}
 
 
// Automatically generated. Retrieves the `@fun-put` constructor field of the `:state` type.
export function state_fs__fun_put(state_0) /* forall<a,e,b> (state : state<a,e,b>) -> hnd/clause1<a,(),state<a>,e,b> */  {
  return state_0._fun_put;
}
 
 
// select `put` operation out of effect `:state`
export function put_fs__select(hnd) /* forall<a,e,b> (hnd : state<a,e,b>) -> hnd/clause1<a,(),state<a>,e,b> */  {
  return hnd._fun_put;
}
 
 
// Call the `fun put` operation of the effect `:state`
export function put(i) /* forall<a> (i : a) -> (state<a>) () */  {
   
  var ev_10401 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10401.hnd._fun_put(ev_10401.marker, ev_10401, i);
}
 
 
// monadic lift
export function _mlift_state_10338(x, _y_x10064) /* forall<h,a,b,e> (x : b, a) -> <local<h>|e> (a, b) */  {
  return $std_core_types.Tuple2(_y_x10064, x);
}
 
export function state(init, action) /* forall<a,b,e> (init : a, action : () -> <state<a>|e> b) -> e (a, b) */  {
  return function() {
     
    var loc = { value: init };
     
    var res = state_fs__handle(_Hnd_state(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
            return ((loc).value);
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(i /* 1641 */ ) {
            return ((loc).value = i);
          })), function(x /* 1642 */ ) {
         
        var x_0_10406 = ((loc).value);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10064 /* 1641 */ ) {
            return $std_core_types.Tuple2(_y_x10064, x);
          });
        }
        else {
          return $std_core_types.Tuple2(x_0_10406, x);
        }
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// monadic lift
export function _mlift_incr_10339(i, _y_x10069) /* (i : ? int, int) -> (state<int>) () */  {
   
  var _x10 = (i !== undefined) ? i : 1;
  var i_0_10001 = $std_core_types._int_add(_y_x10069,_x10);
   
  var ev_10411 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10411.hnd._fun_put(ev_10411.marker, ev_10411, i_0_10001);
}
 
export function incr(i) /* (i : ? int) -> (state<int>) () */  {
   
  var ev_10414 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10414.hnd._fun_get(ev_10414.marker, ev_10414);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10069 /* int */ ) {
      return _mlift_incr_10339(i, _y_x10069);
    });
  }
  else {
     
    var _x10 = (i !== undefined) ? i : 1;
    var i_0_10001 = $std_core_types._int_add(x,_x10);
     
    var ev_0_10416 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    return ev_0_10416.hnd._fun_put(ev_0_10416.marker, ev_0_10416, i_0_10001);
  }
}
 
export function local(s, action) /* forall<a,b,e> (s : a, action : () -> <nondet,state<a>|e> b) -> e list<(a, b)> */  {
  return solutions(function() {
    return state(s, action);
  });
}
 
export function global(s, action) /* forall<a,b,e> (s : a, action : () -> <nondet,state<a>|e> b) -> e (a, list<b>) */  {
  return state(s, function() {
      return solutions(action);
    });
}
 
 
// monadic lift
export function _mlift_choices_10340(wild__) /* forall<e> (wild_ : ()) -> <state<int>,nondet|e> bool */  {
  return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
       
      var ev_10419 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10419.hnd._ctl_flip(ev_10419.marker, ev_10419);
    });
}
 
export function choices(_action) /* forall<a,e> (() -> <nondet,nondet,state<int>|e> a) -> <nondet,state<int>|e> a */  {
  return nondet_fs__handle(_Hnd_nondet(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (1840) -> <nondet,state<int>|1878> 1877 */ ) {
          return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
               
              var ev_10421 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
              var _x10 = ev_10421.hnd._ctl_fail;
              return _x10(ev_10421.marker, ev_10421);
            });
        }), $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
           
          var x_10423 = $std_core_hnd._open_at1($std_core_hnd._evv_index(state_fs__tag), incr);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
              return _mlift_choices_10340(wild__);
            });
          }
          else {
            return _mlift_choices_10340(x_10423);
          }
        })), function(_res /* 1877 */ ) {
      return _res;
    }, _action);
}
 
export function state_show(x, _implicit_fs_show) /* forall<a> (x : (int, a), ?show : (a) -> string) -> string */  {
  var _x11 = x.fst;
  var _x12 = x.snd;
  return $std_core_types._lp__plus__plus__rp_("(state=", $std_core_types._lp__plus__plus__rp_($std_core_int.show(_x11), $std_core_types._lp__plus__plus__rp_(", ", $std_core_types._lp__plus__plus__rp_(_implicit_fs_show(_x12), ")"))));
}
 
export function example2() /* () -> div (int, list<list<int>>) */  {
  return state(0, function() {
      return solutions(function() {
        return choices(function() {
          return $std_core_hnd._open_at2(0, knapsack, 3, $std_core_types.Cons(3, $std_core_types.Cons(2, $std_core_types.Cons(1, $std_core_types.Nil))));
        });
      });
    });
}
 
export function example3() /* () -> div list<(int, list<int>)> */  {
  return solutions(function() {
    return state(0, function() {
        return choices(function() {
          return $std_core_hnd._open_at2(0, knapsack, 3, $std_core_types.Cons(3, $std_core_types.Cons(2, $std_core_types.Cons(1, $std_core_types.Nil))));
        });
      });
  });
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:cutfail` type.
export function cutfail_fs__cfc(cutfail_0) /* forall<e,a> (cutfail : cutfail<e,a>) -> int */  {
  return cutfail_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@ctl-cutfail` constructor field of the `:cutfail` type.
export function cutfail_fs__ctl_cutfail(cutfail_0) /* forall<e,a,b> (cutfail : cutfail<e,a>) -> hnd/clause0<b,cutfail,e,a> */  {
  return cutfail_0._ctl_cutfail;
}
 
 
// handler for the effect `:cutfail`
export function cutfail_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : cutfail<e,b>, ret : (res : a) -> e b, action : () -> <cutfail|e> a) -> e b */  {
  return $std_core_hnd._hhandle(cutfail_fs__tag, hnd, ret, action);
}
 
 
// select `cutfail` operation out of effect `:cutfail`
export function cutfail_fs__select(hnd) /* forall<a,e,b> (hnd : cutfail<e,b>) -> hnd/clause0<a,cutfail,e,b> */  {
  return hnd._ctl_cutfail;
}
 
 
// Call the `ctl cutfail` operation of the effect `:cutfail`
export function cutfail() /* forall<a> () -> cutfail a */  {
   
  var ev_10426 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x13 = ev_10426.hnd._ctl_cutfail;
  return _x13(ev_10426.marker, ev_10426);
}
 
 
// monadic lift
export function _mlift_cut_10341(_y_x10090) /* (bool) -> <nondet,cutfail> () */  {
  if (_y_x10090) {
    return $std_core_types.Unit;
  }
  else {
    return $std_core_hnd._open_at0(0, function() {
         
        var ev_10428 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x14 = ev_10428.hnd._ctl_cutfail;
        return _x14(ev_10428.marker, ev_10428);
      });
  }
}
 
export function cut() /* () -> <cutfail,nondet> () */  {
   
  var x_10430 = $std_core_hnd._open_at0(1, function() {
       
      var ev_10433 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10433.hnd._ctl_flip(ev_10433.marker, ev_10433);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_cut_10341);
  }
  else {
    if (x_10430) {
      return $std_core_types.Unit;
    }
    else {
      return $std_core_hnd._open_at0(0, function() {
           
          var ev_0_10435 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          var _x15 = ev_0_10435.hnd._ctl_cutfail;
          return _x15(ev_0_10435.marker, ev_0_10435);
        });
    }
  }
}
 
export function hcutfail(action) /* forall<a,e> (action : () -> <cutfail,nondet|e> a) -> <nondet|e> a */  {
  return cutfail_fs__handle(_Hnd_cutfail(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (2579) -> <nondet|2595> 2594 */ ) {
          return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
               
              var ev_10437 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
              var _x16 = ev_10437.hnd._ctl_fail;
              return _x16(ev_10437.marker, ev_10437);
            });
        })), function(_res /* 2594 */ ) {
      return _res;
    }, action);
}
 
 
// monadic lift
export function _mlift_collect_10342(p, wild__) /* forall<h,a,e> (p : () -> <nondet,local<h>,div|e> a, wild_ : ()) -> <local<h>,nondet,div|e> a */  {
  return p();
}
 
 
// monadic lift
export function _mlift_collect_10343(q, _y_x10098) /* forall<h,a,e> (q : local-var<h,list<() -> <nondet,local<h>,div|e> a>>, list<() -> <nondet,local<h>,div|e> a>) -> <local<h>,nondet,div|e> a */  {
  if (_y_x10098 === null) {
    return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
         
        var ev_10439 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x17 = ev_10439.hnd._ctl_fail;
        return _x17(ev_10439.marker, ev_10439);
      });
  }
  else {
     
    var x_10441 = ((q).value = (_y_x10098.tail));
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
        return _y_x10098.head();
      });
    }
    else {
      return _y_x10098.head();
    }
  }
}
 
 
// monadic lift
export function _mlift_collect_10344(resume_0, wild___0) /* forall<h,a,e> (resume@0 : (bool) -> <local<h>,nondet,div|e> a, wild_@0 : ()) -> <local<h>,div,nondet|e> a */  {
  return resume_0(true);
}
 
 
// monadic lift
export function _mlift_collect_10345(q, resume_0, _y_x10105) /* forall<h,a,e> (q : local-var<h,list<() -> <nondet,local<h>,div|e> a>>, resume@0 : (bool) -> <local<h>,nondet,div|e> a, list<() -> <nondet,local<h>,div|e> a>) -> <local<h>,div,nondet|e> a */  {
   
  var x_10445 = ((q).value = ($std_core_types.Cons(function() {
      return resume_0(false);
    }, _y_x10105)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
      return resume_0(true);
    });
  }
  else {
    return resume_0(true);
  }
}
 
 
// monadic lift
export function _mlift_collect_10346(p_0, wild___1) /* forall<h,a,e> (p@0 : () -> <nondet,local<h>,div|e> a, wild_@1 : ()) -> <local<h>,div,nondet|e> a */  {
  return p_0();
}
 
 
// monadic lift
export function _mlift_collect_10347(q, _y_x10110) /* forall<h,a,e> (q : local-var<h,list<() -> <nondet,local<h>,div|e> a>>, list<() -> <nondet,local<h>,div|e> a>) -> <local<h>,nondet,div|e> a */  {
  if (_y_x10110 === null) {
    return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
         
        var ev_10449 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x18 = ev_10449.hnd._ctl_fail;
        return _x18(ev_10449.marker, ev_10449);
      });
  }
  else {
     
    var x_10451 = ((q).value = (_y_x10110.tail));
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___1 /* () */ ) {
        return _y_x10110.head();
      });
    }
    else {
      return _y_x10110.head();
    }
  }
}
 
 
// monadic lift
export function _mlift_collect_10348(q, x, _y_x10109) /* forall<h,a,e> (q : local-var<h,list<() -> <nondet,local<h>,div|e> a>>, x : a, bool) -> <nondet,div,local<h>|e> a */  {
  if (_y_x10109) {
    return x;
  }
  else {
     
    var x_0_10455 = ((q).value);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10110 /* list<() -> <nondet,local<2978>,div|2980> 2979> */ ) {
        return _mlift_collect_10347(q, _y_x10110);
      });
    }
    else {
      return _mlift_collect_10347(q, x_0_10455);
    }
  }
}
 
 
// collect creates thunks of continuations,
// only `cutfail` will `fail` and cut the choices short
export function collect(action) /* forall<a,e> (action : () -> <div,nondet,nondet|e> a) -> <div,nondet|e> a */  {
  return function() {
     
    var loc = { value: ($std_core_types.Cons(function() {
        return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
             
            var ev_10459 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
            var _x19 = ev_10459.hnd._ctl_fail;
            return _x19(ev_10459.marker, ev_10459);
          });
      }, $std_core_types.Nil)) };
     
    var res = nondet_fs__handle(_Hnd_nondet(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (2821) -> <local<2978>,nondet,div|2980> 2979 */ ) {
             
            var x_10461 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10098 /* list<() -> <nondet,local<2978>,div|2980> 2979> */ ) {
                return _mlift_collect_10343(loc, _y_x10098);
              });
            }
            else {
              return _mlift_collect_10343(loc, x_10461);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume_0 /* (bool) -> <local<2978>,nondet,div|2980> 2979 */ ) {
             
            var x_0_10463 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10105 /* list<() -> <nondet,local<2978>,div|2980> 2979> */ ) {
                return _mlift_collect_10345(loc, resume_0, _y_x10105);
              });
            }
            else {
              return _mlift_collect_10345(loc, resume_0, x_0_10463);
            }
          })), function(x_1 /* 2979 */ ) {
         
        var x_2_10465 = $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
             
            var ev_0_10467 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
            return ev_0_10467.hnd._ctl_flip(ev_0_10467.marker, ev_0_10467);
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10109 /* bool */ ) {
            return _mlift_collect_10348(loc, x_1, _y_x10109);
          });
        }
        else {
          return _mlift_collect_10348(loc, x_1, x_2_10465);
        }
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function call(p) /* forall<a,e> (p : () -> <cutfail,div,nondet,nondet|e> a) -> <div,nondet|e> a */  {
  return hcutfail(function() {
    return collect(p);
  });
}
 
 
// monadic lift
export function _mlift_once_10349(x, wild__) /* forall<a,e> (x : a, wild_ : ()) -> <cutfail,nondet,div,nondet|e> a */  {
  return x;
}
 
 
// monadic lift
export function _mlift_once_10350(x) /* forall<a,e> (x : a) -> <cutfail,nondet,div,nondet|e> a */  {
   
  var x_0_10470 = $std_core_hnd._open0($std_core_vector.unvlist($std_core_types.Cons($std_core_hnd._evv_index(cutfail_fs__tag), $std_core_types.Cons($std_core_hnd._evv_index(nondet_fs__tag), $std_core_types.Nil))), cut);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return x;
    });
  }
  else {
    return x;
  }
}
 
export function once(p) /* forall<a,e> (p : () -> <cutfail,div,nondet,nondet|e> a) -> <div,nondet|e> a */  {
  return hcutfail(function() {
    return collect(function() {
       
      var x_10474 = p();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(x_0 /* 3050 */ ) {
          return _mlift_once_10350(x_0);
        });
      }
      else {
        return _mlift_once_10350(x_10474);
      }
    });
  });
}
 
 
// monadic lift
export function _mlift_example4_10351(x, wild__) /* (x : list<int>, wild_ : ()) -> <cutfail,nondet,div,nondet> list<int> */  {
  return x;
}
 
 
// monadic lift
export function _mlift_example4_10352(x) /* (x : list<int>) -> <div,nondet,cutfail,nondet> list<int> */  {
   
  var x_0_10476 = $std_core_hnd._open0($std_core_vector.unvlist($std_core_types.Cons(0, $std_core_types.Cons(1, $std_core_types.Nil))), cut);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return x;
    });
  }
  else {
    return x;
  }
}
 
export function example4() /* () -> div list<list<int>> */  {
  return solutions(function() {
    return hcutfail(function() {
      return collect(function() {
         
        var x_10480 = $std_core_hnd._open_at2(1, knapsack, 3, $std_core_types.Cons(3, $std_core_types.Cons(2, $std_core_types.Cons(1, $std_core_types.Nil))));
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(_mlift_example4_10352);
        }
        else {
          return _mlift_example4_10352(x_10480);
        }
      });
    });
  });
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:symbol` type.
export function symbol_fs__cfc(symbol_0) /* forall<e,a> (symbol : symbol<e,a>) -> int */  {
  return symbol_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@fun-symbol` constructor field of the `:symbol` type.
export function symbol_fs__fun_symbol(symbol_0) /* forall<e,a> (symbol : symbol<e,a>) -> hnd/clause1<string,string,symbol,e,a> */  {
  return symbol_0._fun_symbol;
}
 
 
// handler for the effect `:symbol`
export function symbol_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : symbol<e,b>, ret : (res : a) -> e b, action : () -> <symbol|e> a) -> e b */  {
  return $std_core_hnd._hhandle(symbol_fs__tag, hnd, ret, action);
}
 
 
// select `symbol` operation out of effect `:symbol`
export function symbol_fs__select(hnd) /* forall<e,a> (hnd : symbol<e,a>) -> hnd/clause1<string,string,symbol,e,a> */  {
  return hnd._fun_symbol;
}
 
 
// Call the `fun symbol` operation of the effect `:symbol`
export function symbol(s) /* (s : string) -> symbol string */  {
   
  var ev_10483 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10483.hnd._fun_symbol(ev_10483.marker, ev_10483, s);
}
 
 
// monadic lift
export function _mlift_parse_10353(s, wild__) /* forall<h,e> (s : string, wild_ : ()) -> <local<h>,nondet|e> string */  {
  return s;
}
 
 
// monadic lift
export function _mlift_parse_10354(cs, s, _y_x10133) /* forall<h,e> (cs : local-var<h,string>, s : string, string) -> <local<h>,nondet|e> string */  {
  var _x19 = $std_core_hnd._open_none2($std_core_sslice.starts_with, _y_x10133, s);
  if (_x19 === null) {
    return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
         
        var ev_10486 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x20 = ev_10486.hnd._ctl_fail;
        return _x20(ev_10486.marker, ev_10486);
      });
  }
  else {
     
    var x_10488 = ((cs).value = ($std_core_hnd._open_none1($std_core_sslice.string, _x19.value)));
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
        return s;
      });
    }
    else {
      return s;
    }
  }
}
 
 
// monadic lift
export function _mlift_parse_10355(x, _y_x10138) /* forall<h,a,e> (x : a, string) -> <local<h>,nondet|e> a */  {
  if ((_y_x10138 === (""))) {
    return x;
  }
  else {
    return $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
         
        var ev_10492 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x21 = ev_10492.hnd._ctl_fail;
        return _x21(ev_10492.marker, ev_10492);
      });
  }
}
 
export function parse(input, action) /* forall<a,e> (input : string, action : () -> <nondet,symbol|e> a) -> <nondet|e> a */  {
  return function() {
     
    var loc = { value: input };
     
    var res = symbol_fs__handle(_Hnd_symbol(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(s /* string */ ) {
             
            var x_10496 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10133 /* string */ ) {
                return _mlift_parse_10354(loc, s, _y_x10133);
              });
            }
            else {
              return _mlift_parse_10354(loc, s, x_10496);
            }
          })), function(x_0 /* 3561 */ ) {
         
        var x_1_10498 = ((loc).value);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10138 /* string */ ) {
            return _mlift_parse_10355(x_0, _y_x10138);
          });
        }
        else {
          return _mlift_parse_10355(x_0, x_1_10498);
        }
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export var digits;
var digits = $std_core_list.map($std_core_list.range_fs_list(0, 9), $std_core_int.show);
 
 
// monadic lift
export function _mlift_digit_10356(_y_x10147) /* (string) -> <nondet,symbol> string */  {
  return $std_core_hnd._open_at1(1, function(s /* string */ ) {
       
      var ev_10501 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10501.hnd._fun_symbol(ev_10501.marker, ev_10501, s);
    }, _y_x10147);
}
 
export function digit() /* () -> <nondet,symbol> string */  {
   
  var x_10504 = $std_core_hnd._open_at1(0, select, digits);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_digit_10356);
  }
  else {
    return $std_core_hnd._open_at1(1, function(s /* string */ ) {
         
        var ev_10507 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        return ev_10507.hnd._fun_symbol(ev_10507.marker, ev_10507, s);
      }, x_10504);
  }
}
 
 
// monadic lift
export function _mlift_choice_10357(p1, p2, _y_x10150) /* forall<a,e> (p1 : () -> <nondet|e> a, p2 : () -> <nondet|e> a, bool) -> <nondet|e> a */  {
  if (_y_x10150) {
    return p1();
  }
  else {
    return p2();
  }
}
 
export function choice(p1, p2) /* forall<a,e> (p1 : () -> <nondet|e> a, p2 : () -> <nondet|e> a) -> <nondet|e> a */  {
   
  var x_10510 = $std_core_hnd._open_at0($std_core_hnd._evv_index(nondet_fs__tag), function() {
       
      var ev_10513 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10513.hnd._ctl_flip(ev_10513.marker, ev_10513);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10150 /* bool */ ) {
      if (_y_x10150) {
        return p1();
      }
      else {
        return p2();
      }
    });
  }
  else {
    if (x_10510) {
      return p1();
    }
    else {
      return p2();
    }
  }
}
 
 
// monadic lift
export function _mlift_many1_10358(_y_x10156, _y_x10157) /* forall<a,e> (a, list<a>) -> <div,nondet|e> list<a> */  {
  return $std_core_types.Cons(_y_x10156, _y_x10157);
}
 
 
// monadic lift
export function _mlift_many1_10359(p_0, _y_x10156_0) /* forall<a,e> (p@0 : () -> <nondet,div|e> a, a) -> <nondet,div|e> list<a> */  {
   
  var x_10518 = many(p_0);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10157_0 /* list<3891> */ ) {
      return _mlift_many1_10358(_y_x10156_0, _y_x10157_0);
    });
  }
  else {
    return _mlift_many1_10358(_y_x10156_0, x_10518);
  }
}
 
export function many(p) /* forall<a,e> (p : () -> <div,nondet|e> a) -> <div,nondet|e> list<a> */  {
  return choice(function() {
      return many1(p);
    }, function() {
      return $std_core_types.Nil;
    });
}
 
export function many1(p_0_0) /* forall<a,e> (p : () -> <div,nondet|e> a) -> <div,nondet|e> list<a> */  {
   
  var x_0_10520 = p_0_0();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10156_1 /* 3891 */ ) {
      return _mlift_many1_10359(p_0_0, _y_x10156_1);
    });
  }
  else {
     
    var x_1_10523 = many(p_0_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10157_1 /* list<3891> */ ) {
        return _mlift_many1_10358(x_0_10520, _y_x10157_1);
      });
    }
    else {
      return $std_core_types.Cons(x_0_10520, x_1_10523);
    }
  }
}
 
 
// monadic lift
export function _mlift_number_10360(_y_x10158, _y_x10160) /* (string, list<string>) -> <nondet,div,symbol> int */  {
   
  var _x_x1_0_10317 = $std_core_hnd._open_none1($std_core_list.concat_fs_join, $std_core_types.Cons(_y_x10158, _y_x10160));
   
  var _x_x1_10315 = $std_core_hnd._open_none2(function(s /* string */ , hex /* ? bool */ ) {
      var _x22 = (hex !== undefined) ? hex : false;
      return $std_core_int.xparse(s, _x22);
    }, _x_x1_0_10317);
  return $std_core_hnd._open_none2(function(m /* maybe<int> */ , nothing /* int */ ) {
      return (m === null) ? nothing : m.value;
    }, _x_x1_10315, 0);
}
 
 
// monadic lift
export function _mlift_number_10361(_y_x10158) /* (string) -> <nondet,symbol> int */  {
   
  var x_10526 = choice(function() {
      return many1(digit);
    }, function() {
      return $std_core_types.Nil;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10160 /* list<string> */ ) {
      return _mlift_number_10360(_y_x10158, _y_x10160);
    });
  }
  else {
    return _mlift_number_10360(_y_x10158, x_10526);
  }
}
 
export function number() /* () -> <div,nondet,symbol> int */  {
   
  var x_10528 = digit();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_number_10361);
  }
  else {
     
    var x_0_10531 = choice(function() {
        return many1(digit);
      }, function() {
        return $std_core_types.Nil;
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10160 /* list<string> */ ) {
        return _mlift_number_10360(x_10528, _y_x10160);
      });
    }
    else {
       
      var _x_x1_0_10317 = $std_core_hnd._open_none1($std_core_list.concat_fs_join, $std_core_types.Cons(x_10528, x_0_10531));
       
      var _x_x1_10315 = $std_core_hnd._open_none2(function(s /* string */ , hex /* ? bool */ ) {
          var _x22 = (hex !== undefined) ? hex : false;
          return $std_core_int.xparse(s, _x22);
        }, _x_x1_0_10317);
      return $std_core_hnd._open_none2(function(m /* maybe<int> */ , nothing /* int */ ) {
          return (m === null) ? nothing : m.value;
        }, _x_x1_10315, 0);
    }
  }
}
 
 
// monadic lift
export function _mlift_expr_10362(i, j) /* (i : int, j : int) -> <div,nondet,symbol> int */  {
  return $std_core_types._int_add(i,j);
}
 
 
// monadic lift
export function _mlift_expr_10363(i_0, wild__) /* (i : int, wild_ : string) -> <symbol,nondet,div> int */  {
   
  var x_10534 = term();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(j_0 /* int */ ) {
      return _mlift_expr_10362(i_0, j_0);
    });
  }
  else {
    return _mlift_expr_10362(i_0, x_10534);
  }
}
 
 
// monadic lift
export function _mlift_expr_10364(i_1) /* (i : int) -> <div,nondet,symbol> int */  {
   
  var x_0_10536 = $std_core_hnd._open_at1(1, function(s /* string */ ) {
       
      var ev_10538 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10538.hnd._fun_symbol(ev_10538.marker, ev_10538, s);
    }, "+");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0 /* string */ ) {
      return _mlift_expr_10363(i_1, wild___0);
    });
  }
  else {
    return _mlift_expr_10363(i_1, x_0_10536);
  }
}
 
 
// monadic lift
export function _mlift_factor_10365(i_0_0, wild___0_0) /* (i@0 : int, wild_@0@0 : string) -> <symbol,div,nondet> int */  {
  return i_0_0;
}
 
 
// monadic lift
export function _mlift_factor_10366(i_0_1) /* (i@0 : int) -> <div,nondet,symbol> int */  {
   
  var x_2_10541 = $std_core_hnd._open_at1(1, function(s_1 /* string */ ) {
       
      var ev_0_10543 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_0_10543.hnd._fun_symbol(ev_0_10543.marker, ev_0_10543, s_1);
    }, ")");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0_0_0 /* string */ ) {
      return _mlift_factor_10365(i_0_1, wild___0_0_0);
    });
  }
  else {
    return _mlift_factor_10365(i_0_1, x_2_10541);
  }
}
 
 
// monadic lift
export function _mlift_factor_10367(wild___0_1) /* (wild_@0 : string) -> <symbol,div,nondet> int */  {
   
  var x_4_10546 = expr();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_factor_10366);
  }
  else {
    return _mlift_factor_10366(x_4_10546);
  }
}
 
 
// monadic lift
export function _mlift_term_10368(i_1_0, j_0_0) /* (i@1 : int, j@0 : int) -> <div,nondet,symbol> int */  {
  return $std_core_types._int_mul(i_1_0,j_0_0);
}
 
 
// monadic lift
export function _mlift_term_10369(i_1_1, wild___1) /* (i@1 : int, wild_@1 : string) -> <symbol,div,nondet> int */  {
   
  var x_5_10548 = factor();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(j_0_1 /* int */ ) {
      return _mlift_term_10368(i_1_1, j_0_1);
    });
  }
  else {
    return _mlift_term_10368(i_1_1, x_5_10548);
  }
}
 
 
// monadic lift
export function _mlift_term_10370(i_1_2) /* (i@1 : int) -> <div,nondet,symbol> int */  {
   
  var x_6_10550 = $std_core_hnd._open_at1(1, function(s_2 /* string */ ) {
       
      var ev_1_10552 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_1_10552.hnd._fun_symbol(ev_1_10552.marker, ev_1_10552, s_2);
    }, "*");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___1_0 /* string */ ) {
      return _mlift_term_10369(i_1_2, wild___1_0);
    });
  }
  else {
    return _mlift_term_10369(i_1_2, x_6_10550);
  }
}
 
export function expr() /* () -> <div,nondet,symbol> int */  {
  return choice(function() {
       
      var x_8_10555 = term();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_expr_10364);
      }
      else {
        return _mlift_expr_10364(x_8_10555);
      }
    }, term);
}
 
export function factor() /* () -> <div,nondet,symbol> int */  {
  return choice(number, function() {
       
      var x_9_10557 = $std_core_hnd._open_at1(1, function(s_0 /* string */ ) {
           
          var ev_2_10559 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          return ev_2_10559.hnd._fun_symbol(ev_2_10559.marker, ev_2_10559, s_0);
        }, "(");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_factor_10367);
      }
      else {
        return _mlift_factor_10367(x_9_10557);
      }
    });
}
 
export function term() /* () -> <div,nondet,symbol> int */  {
  return choice(function() {
       
      var x_11_10562 = factor();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_term_10370);
      }
      else {
        return _mlift_term_10370(x_11_10562);
      }
    }, factor);
}
 
export function example5() /* () -> div list<int> */  {
  return solutions(function() {
    return parse("2+8*5", function() {
        return choice(function() {
             
            var x_10564 = choice(function() {
                 
                var x_11_10562 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10370);
                }
                else {
                  return _mlift_term_10370(x_11_10562);
                }
              }, factor);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift_expr_10364);
            }
            else {
              return _mlift_expr_10364(x_10564);
            }
          }, function() {
            return choice(function() {
                 
                var x_11_10562_0 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10370);
                }
                else {
                  return _mlift_term_10370(x_11_10562_0);
                }
              }, factor);
          });
      });
  });
}
 
export function main() /* () -> <console/console,div> () */  {
   
  var s_10014 = $std_core_list.show(solutions(function() {
       
      var vs_10567 = $std_core_types.Cons(3, $std_core_types.Cons(2, $std_core_types.Cons(1, $std_core_types.Nil)));
      var _x22 = $std_core_hnd._evv_is_affine();
      if (_x22) {
        return _trmc_knapsack(3, vs_10567, $std_core_types._cctx_empty());
      }
      else {
        return _trmcm_knapsack(3, vs_10567, function(_trmc_x10032 /* list<int> */ ) {
            return _trmc_x10032;
          });
      }
    }), function(_arg_x1 /* list<int> */ ) {
      return $std_core_list.show(_arg_x1, $std_core_int.show);
    });
   
  $std_core_console.printsln(s_10014);
   
  var x_10016 = state(0, function() {
      return solutions(function() {
        return choices(function() {
          return $std_core_hnd._open_at2(0, knapsack, 3, $std_core_types.Cons(3, $std_core_types.Cons(2, $std_core_types.Cons(1, $std_core_types.Nil))));
        });
      });
    });
   
  var _x23 = x_10016.fst;
  var _x24 = x_10016.snd;
  var s_0_10015 = $std_core_types._lp__plus__plus__rp_("(state=", $std_core_types._lp__plus__plus__rp_($std_core_int.show(_x23), $std_core_types._lp__plus__plus__rp_(", ", $std_core_types._lp__plus__plus__rp_($std_core_list.show(_x24, function(_arg_x1_1 /* list<int> */ ) {
              return $std_core_list.show(_arg_x1_1, $std_core_int.show);
            }), ")"))));
   
  $std_core_console.printsln(s_0_10015);
   
  var s_1_10020 = $std_core_list.show(solutions(function() {
      return state(0, function() {
          return choices(function() {
            return $std_core_hnd._open_at2(0, knapsack, 3, $std_core_types.Cons(3, $std_core_types.Cons(2, $std_core_types.Cons(1, $std_core_types.Nil))));
          });
        });
    }), function(_arg_x1_2 /* (int, list<int>) */ ) {
      var _x25 = _arg_x1_2.fst;
      var _x26 = _arg_x1_2.snd;
      return $std_core_types._lp__plus__plus__rp_("(state=", $std_core_types._lp__plus__plus__rp_($std_core_int.show(_x25), $std_core_types._lp__plus__plus__rp_(", ", $std_core_types._lp__plus__plus__rp_($std_core_list.show(_x26, $std_core_int.show), ")"))));
    });
   
  $std_core_console.printsln(s_1_10020);
   
  var s_2_10025 = $std_core_list.show(example4(), function(_arg_x1_4 /* list<int> */ ) {
      return $std_core_list.show(_arg_x1_4, $std_core_int.show);
    });
   
  $std_core_console.printsln(s_2_10025);
   
  var s_3_10026 = $std_core_list.show(solutions(function() {
      return parse("2+8*5", function() {
          return choice(function() {
               
              var x_10568 = choice(function() {
                   
                  var x_11_10562 = factor();
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(_mlift_term_10370);
                  }
                  else {
                    return _mlift_term_10370(x_11_10562);
                  }
                }, factor);
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(_mlift_expr_10364);
              }
              else {
                return _mlift_expr_10364(x_10568);
              }
            }, function() {
              return choice(function() {
                   
                  var x_11_10562_0 = factor();
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(_mlift_term_10370);
                  }
                  else {
                    return _mlift_term_10370(x_11_10562_0);
                  }
                }, factor);
            });
        });
    }), $std_core_int.show);
  return $std_core_console.printsln(s_3_10026);
}