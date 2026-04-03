// Koka generated module: handlers/basic, koka version: 3.2.4
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
import * as $std_num_random from './std_num_random.mjs';
import * as $std_num_int32 from './std_num_int32.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the effect `:ask`
export var ask_fs__tag;
var ask_fs__tag = "ask@basic";
 
 
// runtime tag for the effect `:raise`
export var raise_fs__tag;
var raise_fs__tag = "raise@basic";
 
 
// runtime tag for the effect `:state`
export var state_fs__tag;
var state_fs__tag = "state@basic";
 
 
// runtime tag for the effect `:yield`
export var yield_fs__tag;
var yield_fs__tag = "yield@basic";
 
 
// runtime tag for the effect `:flip`
export var flip_fs__tag;
var flip_fs__tag = "flip@basic";
// type ask
export function _Hnd_ask(_cfc, _fun_ask) /* forall<e,a> (int, hnd/clause0<string,ask,e,a>) -> ask<e,a> */  {
  return { _cfc: _cfc, _fun_ask: _fun_ask };
}
// type flip
export function _Hnd_flip(_cfc, _ctl_flip) /* forall<e,a> (int, hnd/clause0<bool,flip,e,a>) -> flip<e,a> */  {
  return { _cfc: _cfc, _ctl_flip: _ctl_flip };
}
// type raise
export function _Hnd_raise(_cfc, _ctl_raise) /* forall<e,a> (int, forall<b> hnd/clause1<string,b,raise,e,a>) -> raise<e,a> */  {
  return { _cfc: _cfc, _ctl_raise: _ctl_raise };
}
// type state
export function _Hnd_state(_cfc, _fun_get, _fun_put) /* forall<a,e,b> (int, hnd/clause0<a,state<a>,e,b>, hnd/clause1<a,(),state<a>,e,b>) -> state<a,e,b> */  {
  return { _cfc: _cfc, _fun_get: _fun_get, _fun_put: _fun_put };
}
// type yield
export function _Hnd_yield(_cfc, _ctl_yield) /* forall<a,e,b> (int, hnd/clause1<a,(),yield<a>,e,b>) -> yield<a,e,b> */  {
  return { _cfc: _cfc, _ctl_yield: _ctl_yield };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:ask` type.
export function ask_fs__cfc(ask_0) /* forall<e,a> (ask : ask<e,a>) -> int */  {
  return ask_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@fun-ask` constructor field of the `:ask` type.
export function ask_fs__fun_ask(ask_0) /* forall<e,a> (ask : ask<e,a>) -> hnd/clause0<string,ask,e,a> */  {
  return ask_0._fun_ask;
}
 
 
// handler for the effect `:ask`
export function ask_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : ask<e,b>, ret : (res : a) -> e b, action : () -> <ask|e> a) -> e b */  {
  return $std_core_hnd._hhandle(ask_fs__tag, hnd, ret, action);
}
 
 
// select `ask` operation out of effect `:ask`
export function ask_fs__select(hnd) /* forall<e,a> (hnd : ask<e,a>) -> hnd/clause0<string,ask,e,a> */  {
  return hnd._fun_ask;
}
 
 
// Call the `fun ask` operation of the effect `:ask`
export function ask() /* () -> ask string */  {
   
  var ev_10210 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10210.hnd._fun_ask(ev_10210.marker, ev_10210);
}
 
 
// monadic lift
export function _mlift_hello_10191(name, _y_x10031) /* (name : string, string) -> ask () */  {
   
  var _x_x2_0_10152 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, ", ", _y_x10031);
   
  var _x_x2_10150 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, name, _x_x2_0_10152);
   
  var _x_x1_1_10148 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "Hello ", _x_x2_10150);
  return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10148);
}
 
 
// monadic lift
export function _mlift_hello_10192(name) /* (name : string) -> ask () */  {
   
  var ev_10212 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10212.hnd._fun_ask(ev_10212.marker, ev_10212);
   
  function next(_y_x10031) /* (string) -> ask () */  {
     
    var _x_x2_0_10152 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, ", ", _y_x10031);
     
    var _x_x2_10150 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, name, _x_x2_0_10152);
     
    var _x_x1_1_10148 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "Hello ", _x_x2_10150);
    return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10148);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next);
  }
  else {
    return next(x);
  }
}
 
export function hello() /* () -> <ask,console/console> () */  {
   
  var ev_10216 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10216.hnd._fun_ask(ev_10216.marker, ev_10216);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_hello_10192);
  }
  else {
     
    var ev_0_10218 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x_0 = ev_0_10218.hnd._fun_ask(ev_0_10218.marker, ev_0_10218);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10031 /* string */ ) {
         
        var _x_x2_0_10152 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, ", ", _y_x10031);
         
        var _x_x2_10150 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x, _x_x2_0_10152);
         
        var _x_x1_1_10148 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "Hello ", _x_x2_10150);
        return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10148);
      });
    }
    else {
       
      var _x_x2_0_10152_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, ", ", x_0);
       
      var _x_x2_10150_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x, _x_x2_0_10152_0);
       
      var _x_x1_1_10148_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "Hello ", _x_x2_10150_0);
      return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10148_0);
    }
  }
}
 
export function example2() /* () -> console/console () */  {
  return ask_fs__handle(_Hnd_ask(1, function(_x_at___wildcard_x695__14 /* hnd/marker<console/console,()> */ , _x_at___wildcard_x695__17 /* hnd/ev<ask> */ ) {
        return "there";
      }), function(_res /* () */ ) {
      return _res;
    }, hello);
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:raise` type.
export function raise_fs__cfc(raise_0) /* forall<e,a> (raise : raise<e,a>) -> int */  {
  return raise_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@ctl-raise` constructor field of the `:raise` type.
export function raise_fs__ctl_raise(raise_0) /* forall<e,a,b> (raise : raise<e,a>) -> hnd/clause1<string,b,raise,e,a> */  {
  return raise_0._ctl_raise;
}
 
 
// handler for the effect `:raise`
export function raise_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : raise<e,b>, ret : (res : a) -> e b, action : () -> <raise|e> a) -> e b */  {
  return $std_core_hnd._hhandle(raise_fs__tag, hnd, ret, action);
}
 
 
// select `raise` operation out of effect `:raise`
export function raise_fs__select(hnd) /* forall<a,e,b> (hnd : raise<e,b>) -> hnd/clause1<string,a,raise,e,b> */  {
  return hnd._ctl_raise;
}
 
 
// Call the `ctl raise` operation of the effect `:raise`
export function raise(s) /* forall<a> (s : string) -> raise a */  {
   
  var ev_10224 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x0 = ev_10224.hnd._ctl_raise;
  return _x0(ev_10224.marker, ev_10224, s);
}
 
export function safe_div(x, y) /* (x : int, y : int) -> raise int */  {
  if ($std_core_types._int_eq(y,0)) {
     
    var ev_10227 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    var _x1 = ev_10227.hnd._ctl_raise;
    return _x1(ev_10227.marker, ev_10227, "division by zero");
  }
  else {
    return $std_core_types._int_div(x,y);
  }
}
 
export function rcatch(action, h) /* forall<a,e> (action : () -> <raise|e> a, h : (string) -> e a) -> e a */  {
  return raise_fs__handle(_Hnd_raise(3, $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(s /* string */ , resume /* (1051) -> 1065 1064 */ ) {
          return h(s);
        })), function(_res /* 1064 */ ) {
      return _res;
    }, action);
}
 
export function zerodiv(x, y) /* (x : int, y : int) -> int */  {
  return raise_fs__handle(_Hnd_raise(3, function(m /* hnd/marker<total,int> */ , _x_at___wildcard_x639__16 /* hnd/ev<raise> */ , x_0 /* string */ ) {
        return $std_core_hnd.yield_to(m, function(k /* (hnd/resume-result<_985,int>) -> int */ ) {
            return $std_core_hnd.protect(x_0, function(s /* string */ , resume /* (1051) -> int */ ) {
                return 0;
              }, k);
          });
      }), function(_res /* int */ ) {
      return _res;
    }, function() {
      return safe_div(x, y);
    });
}
 
 
// monadic lift
export function _mlift_to_maybe_10193(_y_x10039) /* forall<a,e> (a) -> <raise|e> maybe<a> */  {
  return $std_core_types.Just(_y_x10039);
}
 
 
// reify the exception effect back to a `:maybe` value
export function to_maybe(action) /* forall<a,e> (action : () -> <raise|e> a) -> e maybe<a> */  {
  return raise_fs__handle(_Hnd_raise(0, $std_core_hnd._open_none1($std_core_hnd.clause_never1, function(s /* string */ ) {
          return $std_core_types.Nothing;
        })), function(_res /* maybe<1185> */ ) {
      return _res;
    }, function() {
       
      var x_10231 = action();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10039 /* 1185 */ ) {
          return $std_core_types.Just(_y_x10039);
        });
      }
      else {
        return $std_core_types.Just(x_10231);
      }
    });
}
 
export function example1() /* () -> console/console () */  {
   
  var x_10003 = raise_fs__handle(_Hnd_raise(3, function(m /* hnd/marker<total,int> */ , _x_at___wildcard_x639__16 /* hnd/ev<raise> */ , x /* string */ ) {
        return $std_core_hnd.yield_to(m, function(k /* (hnd/resume-result<_985,int>) -> int */ ) {
            return $std_core_hnd.protect(x, function(s /* string */ , resume /* (1051) -> int */ ) {
                return 0;
              }, k);
          });
      }), function(_res /* int */ ) {
      return _res;
    }, function() {
      return safe_div(10, 0);
    });
  return $std_core_console.printsln($std_core_int.show(x_10003));
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
   
  var ev_10236 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10236.hnd._fun_get(ev_10236.marker, ev_10236);
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
export function put(x) /* forall<a> (x : a) -> (state<a>) () */  {
   
  var ev_10238 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10238.hnd._fun_put(ev_10238.marker, ev_10238, x);
}
 
 
// monadic lift
export function _mlift_counter_10194(wild___0) /* (wild_@0 : ()) -> (state<int>) () */  {
  return counter();
}
 
 
// monadic lift
export function _mlift_counter_10195(i) /* (i : int) -> (state<int>) () */  {
  if ($std_core_types._int_le(i,0)) {
    return $std_core_types.Unit;
  }
  else {
     
    $std_core_hnd._open_none1($std_core_console.printsln, "hi");
     
    var x_10009 = $std_core_types._int_sub(i,1);
     
    var ev_10243 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x_10241 = ev_10243.hnd._fun_put(ev_10243.marker, ev_10243, x_10009);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_mlift_counter_10194);
    }
    else {
      return _mlift_counter_10194(x_10241);
    }
  }
}
 
export function counter() /* () -> <console/console,div,state<int>> () */  { tailcall: while(1)
{
   
  var ev_0_10246 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x_1 = ev_0_10246.hnd._fun_get(ev_0_10246.marker, ev_0_10246);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_counter_10195);
  }
  else {
    if ($std_core_types._int_le(x_1,0)) {
      return $std_core_types.Unit;
    }
    else {
       
      $std_core_hnd._open_none1($std_core_console.printsln, "hi");
       
      var x_10009_0 = $std_core_types._int_sub(x_1,1);
       
      var ev_1_10251 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
       
      var x_2_10248 = ev_1_10251.hnd._fun_put(ev_1_10251.marker, ev_1_10251, x_10009_0);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_counter_10194);
      }
      else {
        {
          // tail call
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// monadic lift
export function _mlift_state_10196(x_0, _y_x10051) /* forall<h,a,e,b> (x@0 : a, b) -> <local<h>,div|e> (a, b) */  {
  return $std_core_types.Tuple2(x_0, _y_x10051);
}
 
 
// State handler.
export function state(init, action) /* forall<a,e,b> (init : b, action : () -> <state<b>,div|e> a) -> <div|e> (a, b) */  {
  return function() {
     
    var loc = { value: init };
     
    var res = state_fs__handle(_Hnd_state(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
            return ((loc).value);
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(x /* 2007 */ ) {
            return ((loc).value = x);
          })), function(x_0 /* 2005 */ ) {
         
        var x_1_10256 = ((loc).value);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10051 /* 2007 */ ) {
            return $std_core_types.Tuple2(x_0, _y_x10051);
          });
        }
        else {
          return $std_core_types.Tuple2(x_0, x_1_10256);
        }
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function example3() /* () -> <console/console,div> int */  {
   
  var tuple2_10011 = state(1, counter);
  return tuple2_10011.snd;
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:yield` type.
export function yield_fs__cfc(yield_0) /* forall<a,e,b> (yield : yield<a,e,b>) -> int */  {
  return yield_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@ctl-yield` constructor field of the `:yield` type.
export function yield_fs__ctl_yield(yield_0) /* forall<a,e,b> (yield : yield<a,e,b>) -> hnd/clause1<a,(),yield<a>,e,b> */  {
  return yield_0._ctl_yield;
}
 
 
// handler for the effect `:yield`
export function yield_fs__handle(hnd, ret, action) /* forall<a,b,e,c> (hnd : yield<a,e,c>, ret : (res : b) -> e c, action : () -> <yield<a>|e> b) -> e c */  {
  return $std_core_hnd._hhandle(yield_fs__tag, hnd, ret, action);
}
 
 
// select `yield` operation out of effect `:yield`
export function yield_fs__select(hnd) /* forall<a,e,b> (hnd : yield<a,e,b>) -> hnd/clause1<a,(),yield<a>,e,b> */  {
  return hnd._ctl_yield;
}
 
 
// Call the `ctl yield` operation of the effect `:yield`
export function $yield(item) /* forall<a> (item : a) -> (yield<a>) () */  {
   
  var ev_10262 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10262.hnd._ctl_yield(ev_10262.marker, ev_10262, item);
}
 
 
// monadic lift
export function _mlift_iterate_10197(xx, wild__) /* forall<a> (xx : list<a>, wild_ : ()) -> (yield<a>) () */  {
  return iterate(xx);
}
 
export function iterate(xs) /* forall<a> (xs : list<a>) -> (yield<a>) () */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var ev_10265 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x_0 = ev_10265.hnd._ctl_yield(ev_10265.marker, ev_10265, xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
        return _mlift_iterate_10197(xs.tail, wild___0);
      });
    }
    else {
      {
        // tail call
        xs = xs.tail;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types.Unit;
  }
}}
 
 
// monadic lift
export function _mlift_foreach_10198(resume, _y_x10061) /* forall<e> (resume : (()) -> e (), bool) -> e () */  {
  if (_y_x10061) {
    return resume($std_core_types.Unit);
  }
  else {
    return $std_core_types.Unit;
  }
}
 
export function foreach(f, action) /* forall<a,e> (f : (a) -> e bool, action : () -> <yield<a>|e> ()) -> e () */  {
  return yield_fs__handle(_Hnd_yield(3, $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(x /* 2465 */ , resume /* (()) -> 2466 () */ ) {
           
          var x_0_10268 = f(x);
           
          function next_10269(_y_x10061) /* (bool) -> 2466 () */  {
            if (_y_x10061) {
              return resume($std_core_types.Unit);
            }
            else {
              return $std_core_types.Unit;
            }
          }
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(next_10269);
          }
          else {
            return next_10269(x_0_10268);
          }
        })), function(_res /* () */ ) {
      return _res;
    }, action);
}
 
export function example4() /* () -> console/console () */  {
  return yield_fs__handle(_Hnd_yield(3, function(m /* hnd/marker<console/console,()> */ , _x_at___wildcard_x639__16 /* hnd/ev<yield<int>> */ , x /* int */ ) {
        return $std_core_hnd.yield_to(m, function(k /* (hnd/resume-result<(),()>) -> console/console () */ ) {
            return $std_core_hnd.protect(x, function(x_0 /* int */ , resume /* (()) -> console/console () */ ) {
                 
                $std_core_console.printsln($std_core_int.show(x_0));
                if ($std_core_types._int_le(x_0,1)) {
                  return resume($std_core_types.Unit);
                }
                else {
                  return $std_core_types.Unit;
                }
              }, k);
          });
      }), function(_res /* () */ ) {
      return _res;
    }, function() {
      return iterate($std_core_types.Cons(1, $std_core_types.Cons(2, $std_core_types.Cons(3, $std_core_types.Nil))));
    });
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:flip` type.
export function flip_fs__cfc(flip_0) /* forall<e,a> (flip : flip<e,a>) -> int */  {
  return flip_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@ctl-flip` constructor field of the `:flip` type.
export function flip_fs__ctl_flip(flip_0) /* forall<e,a> (flip : flip<e,a>) -> hnd/clause0<bool,flip,e,a> */  {
  return flip_0._ctl_flip;
}
 
 
// handler for the effect `:flip`
export function flip_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : flip<e,b>, ret : (res : a) -> e b, action : () -> <flip|e> a) -> e b */  {
  return $std_core_hnd._hhandle(flip_fs__tag, hnd, ret, action);
}
 
 
// select `flip` operation out of effect `:flip`
export function flip_fs__select(hnd) /* forall<e,a> (hnd : flip<e,a>) -> hnd/clause0<bool,flip,e,a> */  {
  return hnd._ctl_flip;
}
 
 
// Call the `ctl flip` operation of the effect `:flip`
export function flip() /* () -> flip bool */  {
   
  var ev_10274 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10274.hnd._ctl_flip(ev_10274.marker, ev_10274);
}
 
 
// handler that randomly flips
export function coinflip(_action) /* forall<a,e> (() -> <flip,ndet|e> a) -> <ndet|e> a */  {
  return flip_fs__handle(_Hnd_flip(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
          return $std_core_hnd._open_none0(function() {
            return (($std_num_random.srandom_int32()) >= 0);
          });
        })), function(_res /* 2901 */ ) {
      return _res;
    }, _action);
}
 
 
// monadic lift
export function _mlift_amb_10199(_y_x10069, _y_x10070) /* forall<a,e> (list<a>, list<a>) -> e list<a> */  {
  return $std_core_hnd._open_none2(function(xs /* list<3007> */ , ys /* list<3007> */ ) {
      return $std_core_list.append(xs, ys);
    }, _y_x10069, _y_x10070);
}
 
 
// monadic lift
export function _mlift_amb_10200(resume, _y_x10069) /* forall<a,e> (resume : (bool) -> e list<a>, list<a>) -> e list<a> */  {
   
  var x_10276 = resume(true);
   
  function next_10277(_y_x10070) /* (list<3007>) -> 3008 list<3007> */  {
    return $std_core_hnd._open_none2(function(xs /* list<3007> */ , ys /* list<3007> */ ) {
        return $std_core_list.append(xs, ys);
      }, _y_x10069, _y_x10070);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10277);
  }
  else {
    return next_10277(x_10276);
  }
}
 
 
// handler that returns all possible outcomes
export function amb(_action) /* forall<a,e> (() -> <flip|e> a) -> e list<a> */  {
  return flip_fs__handle(_Hnd_flip(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (bool) -> 3008 list<3007> */ ) {
           
          var x_10280 = resume(false);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10069 /* list<3007> */ ) {
              return _mlift_amb_10200(resume, _y_x10069);
            });
          }
          else {
            return _mlift_amb_10200(resume, x_10280);
          }
        })), function(x_0 /* 3007 */ ) {
      return $std_core_types.Cons(x_0, $std_core_types.Nil);
    }, _action);
}
 
 
// monadic lift
export function _mlift_example4b_10201(_y_x10073) /* (string) -> <console/console,flip> () */  {
  return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10073);
}
 
 
// monadic lift
export function _mlift_example4b_10202(resume, x, _c_x10074) /* (resume : (()) -> <console/console,flip> (), x : int, ()) -> () */  {
  if ($std_core_types._int_le(x,1)) {
    return resume($std_core_types.Unit);
  }
  else {
    return $std_core_types.Unit;
  }
}
 
 
// monadic lift
export function _mlift_example4b_10203(resume, x, _y_x10072) /* (resume : (()) -> <console/console,flip> (), x : int, bool) -> flip () */  {
   
  if (_y_x10072) {
     
    var x_1_10284 = $std_core_hnd._open_none1($std_core_int.show, x);
    if ($std_core_hnd._yielding()) {
      var x_0_10282 = $std_core_hnd.yield_extend(_mlift_example4b_10201);
    }
    else {
      var x_0_10282 = $std_core_hnd._open_none1($std_core_console.printsln, x_1_10284);
    }
  }
  else {
     
    var _x_x2_10180 = $std_core_hnd._open_none1($std_core_int.show, x);
     
    var _x_x1_3_10178 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "flip false ", _x_x2_10180);
    var x_0_10282 = $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_3_10178);
  }
   
  function next_10283(_c_x10074) /* (()) -> () */  {
    if ($std_core_types._int_le(x,1)) {
      return resume($std_core_types.Unit);
    }
    else {
      return $std_core_types.Unit;
    }
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10283);
  }
  else {
    return next_10283(x_0_10282);
  }
}
 
export function example4b() /* () -> console/console () */  {
   
  var x_4195 = amb(function() {
    return yield_fs__handle(_Hnd_yield(3, $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(x /* int */ , resume /* (()) -> <console/console,flip> () */ ) {
             
            var ev_10289 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
             
            var x_0 = ev_10289.hnd._ctl_flip(ev_10289.marker, ev_10289);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10072 /* bool */ ) {
                return _mlift_example4b_10203(resume, x, _y_x10072);
              });
            }
            else {
              return _mlift_example4b_10203(resume, x, x_0);
            }
          })), function(_res /* () */ ) {
        return _res;
      }, function() {
        return $std_core_hnd._open_at1(1, iterate, $std_core_types.Cons(1, $std_core_types.Cons(2, $std_core_types.Cons(3, $std_core_types.Nil))));
      });
  });
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_xor_10204(p, q) /* (p : bool, q : bool) -> flip bool */  {
  if (p) {
    var _x2 = (p) ? q : false;
    return $std_core_hnd._open_none1(function(b /* bool */ ) {
        return (b) ? false : true;
      }, _x2);
  }
  else {
    if (q) {
      var _x3 = (p) ? q : false;
      return $std_core_hnd._open_none1(function(b_0 /* bool */ ) {
          return (b_0) ? false : true;
        }, _x3);
    }
    else {
      return false;
    }
  }
}
 
 
// monadic lift
export function _mlift_xor_10205(p) /* (p : bool) -> flip bool */  {
   
  var ev_10291 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10291.hnd._ctl_flip(ev_10291.marker, ev_10291);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(q /* bool */ ) {
      return _mlift_xor_10204(p, q);
    });
  }
  else {
    return _mlift_xor_10204(p, x);
  }
}
 
export function xor() /* () -> flip bool */  {
   
  var ev_10293 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10293.hnd._ctl_flip(ev_10293.marker, ev_10293);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_xor_10205);
  }
  else {
     
    var ev_0_10295 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x_0 = ev_0_10295.hnd._ctl_flip(ev_0_10295.marker, ev_0_10295);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(q /* bool */ ) {
        return _mlift_xor_10204(x, q);
      });
    }
    else {
      if (x) {
        var _x4 = (x) ? x_0 : false;
        return $std_core_hnd._open_none1(function(b /* bool */ ) {
            return (b) ? false : true;
          }, _x4);
      }
      else {
        if (x_0) {
          var _x5 = (x) ? x_0 : false;
          return $std_core_hnd._open_none1(function(b_0 /* bool */ ) {
              return (b_0) ? false : true;
            }, _x5);
        }
        else {
          return false;
        }
      }
    }
  }
}
 
export function example5() /* () -> console/console () */  {
   
  var s_10021 = $std_core_list.show(amb(xor), $std_core_bool.show);
  return $std_core_console.printsln(s_10021);
}
 
 
// monadic lift
export function _mlift_surprising_10206(i, p, wild__) /* (i : int, p : bool, wild_ : ()) -> <state<int>,flip> bool */  {
  if ($std_core_types._int_gt(i,0)) {
    if (p) {
      return $std_core_hnd._open_at0(0, xor);
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
 
 
// monadic lift
export function _mlift_surprising_10207(p, i) /* (p : bool, i : int) -> <state<int>,flip> bool */  {
   
  var _x_x1_1_10190 = $std_core_types._int_add(i,1);
   
  var x_10297 = $std_core_hnd._open_at1(1, function(x_0 /* int */ ) {
       
      var ev_10299 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10299.hnd._fun_put(ev_10299.marker, ev_10299, x_0);
    }, _x_x1_1_10190);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return _mlift_surprising_10206(i, p, wild__);
    });
  }
  else {
    return _mlift_surprising_10206(i, p, x_10297);
  }
}
 
 
// monadic lift
export function _mlift_surprising_10208(p) /* (p : bool) -> <flip,state<int>> bool */  {
   
  var x_10302 = $std_core_hnd._open_at0(1, function() {
       
      var ev_10304 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10304.hnd._fun_get(ev_10304.marker, ev_10304);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(i /* int */ ) {
      return _mlift_surprising_10207(p, i);
    });
  }
  else {
    return _mlift_surprising_10207(p, x_10302);
  }
}
 
export function surprising() /* () -> <flip,state<int>> bool */  {
   
  var x_10306 = $std_core_hnd._open_at0(0, function() {
       
      var ev_10309 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10309.hnd._ctl_flip(ev_10309.marker, ev_10309);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_surprising_10208);
  }
  else {
     
    var x_0_10311 = $std_core_hnd._open_at0(1, function() {
         
        var ev_0_10314 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        return ev_0_10314.hnd._fun_get(ev_0_10314.marker, ev_0_10314);
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(i /* int */ ) {
        return _mlift_surprising_10207(x_10306, i);
      });
    }
    else {
       
      var _x_x1_1_10190 = $std_core_types._int_add(x_0_10311,1);
       
      var x_1_10316 = $std_core_hnd._open_at1(1, function(x_2 /* int */ ) {
           
          var ev_1_10319 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          return ev_1_10319.hnd._fun_put(ev_1_10319.marker, ev_1_10319, x_2);
        }, _x_x1_1_10190);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
          return _mlift_surprising_10206(x_0_10311, x_10306, wild__);
        });
      }
      else {
        if ($std_core_types._int_gt(x_0_10311,0)) {
          if (x_10306) {
            return $std_core_hnd._open_at0(0, xor);
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }
      }
    }
  }
}
 
export function example6() /* () -> <console/console,div> () */  {
   
  var s_10022 = $std_core_tuple.tuple2_fs_show(state(0, function() {
        return amb(surprising);
      }), function(_arg_x1 /* list<bool> */ ) {
      return $std_core_list.show(_arg_x1, $std_core_bool.show);
    }, $std_core_int.show);
  return $std_core_console.printsln(s_10022);
}
 
export function example7() /* () -> <console/console,div> () */  {
   
  var s_10023 = $std_core_list.show(amb(function() {
      return state(0, surprising);
    }), function(_arg_x1 /* (bool, int) */ ) {
      return $std_core_tuple.tuple2_fs_show(_arg_x1, $std_core_bool.show, $std_core_int.show);
    });
  return $std_core_console.printsln(s_10023);
}
 
 
// --------------------------------------------------------
//  Testing
// --------------------------------------------------------
export function main() /* () -> <console/console,div> int */  {
   
  var x_10003 = raise_fs__handle(_Hnd_raise(3, function(m /* hnd/marker<total,int> */ , _x_at___wildcard_x639__16 /* hnd/ev<raise> */ , x /* string */ ) {
        return $std_core_hnd.yield_to(m, function(k /* (hnd/resume-result<_985,int>) -> int */ ) {
            return $std_core_hnd.protect(x, function(s /* string */ , resume /* (1051) -> int */ ) {
                return 0;
              }, k);
          });
      }), function(_res /* int */ ) {
      return _res;
    }, function() {
      return safe_div(10, 0);
    });
   
  $std_core_console.printsln($std_core_int.show(x_10003));
   
  ask_fs__handle(_Hnd_ask(1, function(_x_at___wildcard_x695__14 /* hnd/marker<console/console,()> */ , _x_at___wildcard_x695__17 /* hnd/ev<ask> */ ) {
        return "there";
      }), function(_res_0 /* () */ ) {
      return _res_0;
    }, hello);
   
  var tuple2 = state(1, counter);
   
  example4();
   
  $std_core_console.printsln($std_core_list.show(amb(xor), $std_core_bool.show));
   
  $std_core_console.printsln($std_core_tuple.tuple2_fs_show(state(0, function() {
        return amb(surprising);
      }), function(_arg_x1 /* list<bool> */ ) {
      return $std_core_list.show(_arg_x1, $std_core_bool.show);
    }, $std_core_int.show));
  return 42;
}