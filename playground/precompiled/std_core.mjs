// Koka generated module: std/core, koka version: 3.2.4
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_undiv from './std_core_undiv.mjs';
import * as $std_core_unsafe from './std_core_unsafe.mjs';
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
 
// externals
 
// type declarations
// type blocking
// type fsys
// type global-scope
// type net
// type ui
// type nmd
// type scope
// type stream
export function Next(head, tail) /* forall<a> (head : a, tail : stream<a>) -> stream<a> */  {
  return { head: head, tail: tail };
}
 
// declarations
 
 
// Apply a function `f` to a specified argument `x`.
export function apply(f, x) /* forall<a,b,e> (f : (a) -> e b, x : a) -> e b */  {
  return f(x);
}
 
 
// Compose two functions `f` and `g`.
export function o(f, g) /* forall<a,b,c,e> (f : (a) -> e b, g : (c) -> e a) -> ((x : c) -> e b) */  {
  return function(x /* 243 */ ) {
     
    var x_0_10116 = g(x);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(f);
    }
    else {
      return f(x_0_10116);
    }
  };
}
 
 
// The `ignore` function ignores its argument.
export function ignore(x) /* forall<a> (x : a) -> () */  {
  return $std_core_types.Unit;
}
 
 
// Return a 'constant' function that ignores its argument and always returns the same result
export function $const($default) /* forall<a,b> (default : a) -> ((x : b) -> a) */  {
  return function(_x_at___wildcard_x106__6 /* 287 */ ) {
    return $default;
  };
}
 
 
// Concise way to ensure two expressions have the same type.
export function same_type(x, y) /* forall<a> (x : a, y : a) -> a */  {
  return x;
}
 
 
// monadic lift
export function _mlift_while_10103(action, predicate, wild__) /* forall<e> (action : () -> <div|e> (), predicate : () -> <div|e> bool, wild_ : ()) -> <div|e> () */  {
  return $while(predicate, action);
}
 
 
// monadic lift
export function _mlift_while_10104(action_0, predicate_0, _y_x10028) /* forall<e> (action : () -> <div|e> (), predicate : () -> <div|e> bool, bool) -> <div|e> () */  {
  if (_y_x10028) {
     
    var x_10118 = action_0();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
        return _mlift_while_10103(action_0, predicate_0, wild___0);
      });
    }
    else {
      return _mlift_while_10103(action_0, predicate_0, x_10118);
    }
  }
  else {
    return $std_core_types.Unit;
  }
}
 
 
// The `while` fun executes `action`  as long as `pred`  is `true`.
export function $while(predicate_1, action_1) /* forall<e> (predicate : () -> <div|e> bool, action : () -> <div|e> ()) -> <div|e> () */  { tailcall: while(1)
{
   
  var x_0_10120 = predicate_1();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10028_0 /* bool */ ) {
      return _mlift_while_10104(action_1, predicate_1, _y_x10028_0);
    });
  }
  else {
    if (x_0_10120) {
       
      var x_1_10123 = action_1();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild___1 /* () */ ) {
          return _mlift_while_10103(action_1, predicate_1, wild___1);
        });
      }
      else {
        {
          // tail call
          continue tailcall;
        }
      }
    }
    else {
      return $std_core_types.Unit;
    }
  }
}}
 
 
// monadic lift
export function default_fs_cmp_fs__lp__at_mlift_x_10105_eq__eq__rp_(_y_x10032) /* forall<e> (order) -> e bool */  {
  return (_y_x10032 === 2);
}
 
 
// Generic equality if `cmp` exists
export function default_fs_cmp_fs__lp__eq__eq__rp_(x, y, _implicit_fs_cmp) /* forall<a,e> (x : a, y : a, ?cmp : (a, a) -> e order) -> e bool */  {
   
  var x_0_10126 = _implicit_fs_cmp(x, y);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10032 /* order */ ) {
      return (_y_x10032 === 2);
    });
  }
  else {
    return (x_0_10126 === 2);
  }
}
 
 
// monadic lift
export function default_fs__lp__at_mlift_x_10106_excl__eq__rp_(_y_x10033) /* forall<e> (bool) -> e bool */  {
  return $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _y_x10033);
}
 
 
// Generic inequality
export function default_fs__lp__excl__eq__rp_(x, y, _implicit_fs__lp__eq__eq__rp_) /* forall<a,e> (x : a, y : a, ?(==) : (a, a) -> e bool) -> e bool */  {
   
  var x_0_10130 = _implicit_fs__lp__eq__eq__rp_(x, y);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10033 /* bool */ ) {
      return $std_core_hnd._open_none1(function(b /* bool */ ) {
          return (b) ? false : true;
        }, _y_x10033);
    });
  }
  else {
    return $std_core_hnd._open_none1(function(b_0 /* bool */ ) {
        return (b_0) ? false : true;
      }, x_0_10130);
  }
}
 
 
// monadic lift
export function default_fs_cmp_fs__lp__at_mlift_x_10107_gt__rp_(_y_x10034) /* forall<e> (order) -> e bool */  {
  return $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10034, $std_core_types.Gt);
}
 
 
// Generic greater than
export function default_fs_cmp_fs__lp__gt__rp_(x, y, _implicit_fs_cmp) /* forall<a,e> (x : a, y : a, ?cmp : (a, a) -> e order) -> e bool */  {
   
  var x_0_10134 = _implicit_fs_cmp(x, y);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10034 /* order */ ) {
      return $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10034, $std_core_types.Gt);
    });
  }
  else {
    return $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, x_0_10134, $std_core_types.Gt);
  }
}
 
 
// monadic lift
export function range_fs__mlift_fold_10108(end, f, start, x) /* forall<a,e> (end : int, f : (int, a) -> e a, start : int, x : a) -> e a */  {
  return range_fs_fold($std_core_types._int_add(start,1), end, x, f);
}
 
 
// Fold over the integers between [`start`,`end`] (including `end`).
export function range_fs_fold(start_0, end_0, init, f_0) /* forall<a,e> (start : int, end : int, init : a, f : (int, a) -> e a) -> e a */  { tailcall: while(1)
{
  if ($std_core_types._int_gt(start_0,end_0)) {
    return init;
  }
  else {
     
    var x_0_10138 = f_0(start_0, init);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(x_1 /* 823 */ ) {
        return range_fs__mlift_fold_10108(end_0, f_0, start_0, x_1);
      });
    }
    else {
      {
        // tail call
        var _x0 = $std_core_types._int_add(start_0,1);
        start_0 = _x0;
        init = x_0_10138;
        continue tailcall;
      }
    }
  }
}}
 
 
// Fold over the integers between [0,`upto`)  (excluding `upto`).
export function fold(upto, init, f) /* forall<a,e> (upto : int, init : a, f : (int, a) -> e a) -> e a */  {
  return range_fs_fold(0, $std_core_types._int_sub(upto,1), init, f);
}
 
 
// monadic lift
export function range_fs__mlift_fold_while_10109(end, f, init, start, _y_x10039) /* forall<a,e> (end : int, f : (int, a) -> e maybe<a>, init : a, start : int, maybe<a>) -> e a */  {
  if (_y_x10039 !== null) {
    return range_fs_fold_while($std_core_types._int_add(start,1), end, _y_x10039.value, f);
  }
  else {
    return init;
  }
}
 
 
// Fold over the integers between [`start`,`end`] (including `end`) or until `f` returns `Nothing`
export function range_fs_fold_while(start_0, end_0, init_0, f_0) /* forall<a,e> (start : int, end : int, init : a, f : (int, a) -> e maybe<a>) -> e a */  { tailcall: while(1)
{
  if ($std_core_types._int_gt(start_0,end_0)) {
    return init_0;
  }
  else {
     
    var x_0_10141 = f_0(start_0, init_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10039_0 /* maybe<960> */ ) {
        return range_fs__mlift_fold_while_10109(end_0, f_0, init_0, start_0, _y_x10039_0);
      });
    }
    else {
      if (x_0_10141 !== null) {
        {
          // tail call
          var _x1 = $std_core_types._int_add(start_0,1);
          start_0 = _x1;
          init_0 = x_0_10141.value;
          continue tailcall;
        }
      }
      else {
        return init_0;
      }
    }
  }
}}
 
 
// Fold over the integers between [0,`n`) (excluding `n`) or until `f` returns `Nothing`
export function fold_while(n, init, f) /* forall<a,e> (n : int, init : a, f : (int, a) -> e maybe<a>) -> e a */  {
  return range_fs_fold_while(0, $std_core_types._int_sub(n,1), init, f);
}
 
 
// monadic lift
export function default_fs_cmp_fs__lp__at_mlift_x_10110_lt__rp_(_y_x10044) /* forall<e> (order) -> e bool */  {
  return $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10044, $std_core_types.Lt);
}
 
 
// Generic lower than
export function default_fs_cmp_fs__lp__lt__rp_(x, y, _implicit_fs_cmp) /* forall<a,e> (x : a, y : a, ?cmp : (a, a) -> e order) -> e bool */  {
   
  var x_0_10144 = _implicit_fs_cmp(x, y);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10044 /* order */ ) {
      return $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10044, $std_core_types.Lt);
    });
  }
  else {
    return $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, x_0_10144, $std_core_types.Lt);
  }
}
 
 
// monadic lift
export function default_fs_cmp_fs__lp__at_mlift_x_10111_gt__eq__rp_(_y_x10045) /* forall<e> (order) -> e bool */  {
   
  var _x_x1_10093 = $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10045, $std_core_types.Lt);
  return $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _x_x1_10093);
}
 
 
// Generic greater than or equal
export function default_fs_cmp_fs__lp__gt__eq__rp_(x, y, _implicit_fs_cmp) /* forall<a,e> (x : a, y : a, ?cmp : (a, a) -> e order) -> e bool */  {
   
  var x_0_10148 = _implicit_fs_cmp(x, y);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10045 /* order */ ) {
       
      var _x_x1_10093 = $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10045, $std_core_types.Lt);
      return $std_core_hnd._open_none1(function(b /* bool */ ) {
          return (b) ? false : true;
        }, _x_x1_10093);
    });
  }
  else {
     
    var _x_x1_10093_0 = $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, x_0_10148, $std_core_types.Lt);
    return $std_core_hnd._open_none1(function(b_0 /* bool */ ) {
        return (b_0) ? false : true;
      }, _x_x1_10093_0);
  }
}
 
 
// monadic lift
export function default_fs_cmp_fs__lp__at_mlift_x_10112_lt__eq__rp_(_y_x10046) /* forall<e> (order) -> e bool */  {
   
  var _x_x1_10096 = $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10046, $std_core_types.Gt);
  return $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _x_x1_10096);
}
 
 
// Generic lower than or equal
export function default_fs_cmp_fs__lp__lt__eq__rp_(x, y, _implicit_fs_cmp) /* forall<a,e> (x : a, y : a, ?cmp : (a, a) -> e order) -> e bool */  {
   
  var x_0_10152 = _implicit_fs_cmp(x, y);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10046 /* order */ ) {
       
      var _x_x1_10096 = $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, _y_x10046, $std_core_types.Gt);
      return $std_core_hnd._open_none1(function(b /* bool */ ) {
          return (b) ? false : true;
        }, _x_x1_10096);
    });
  }
  else {
     
    var _x_x1_10096_0 = $std_core_hnd._open_none2($std_core_order._lp__eq__eq__rp_, x_0_10152, $std_core_types.Gt);
    return $std_core_hnd._open_none1(function(b_0 /* bool */ ) {
        return (b_0) ? false : true;
      }, _x_x1_10096_0);
  }
}
 
 
// monadic lift
export function range_fs__mlift_lift_for_1928_10113(action, end, i, wild__) /* forall<e> (action : (int) -> e (), end : int, i : int, wild_ : ()) -> e () */  {
   
  var i_0_10006 = $std_core_types._int_add(i,1);
  return range_fs__lift_for_1928(action, end, i_0_10006);
}
 
 
// lifted local: range/for, rep
export function range_fs__lift_for_1928(action_0, end_0, i_0) /* forall<e> (action : (int) -> e (), end : int, i : int) -> e () */  { tailcall: while(1)
{
  if ($std_core_types._int_le(i_0,end_0)) {
     
    var x_10156 = action_0(i_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
        return range_fs__mlift_lift_for_1928_10113(action_0, end_0, i_0, wild___0);
      });
    }
    else {
       
      var i_0_10006_0 = $std_core_types._int_add(i_0,1);
      {
        // tail call
        i_0 = i_0_10006_0;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types.Unit;
  }
}}
 
 
// Executes `action`  for each integer from `start` to `end` (including `end` ).
// If `start > end`  the function returns without any call to `action` .
export function range_fs_for(start, end, action) /* forall<e> (start : int, end : int, action : (int) -> e ()) -> e () */  {
  return range_fs__lift_for_1928(action, end, start);
}
 
 
// Executes `action` `n` times for each integer from `0` to `n - 1`.
// If `n <= 0`  the function returns without any call to `action` .
export function $for(n, action) /* forall<e> (n : int, action : (int) -> e ()) -> e () */  {
   
  var end_10008 = $std_core_types._int_sub(n,1);
  return range_fs__lift_for_1928(action, end_10008, 0);
}
 
 
// The `repeat` fun executes `action`  `n`  times.
export function repeat(n, action) /* forall<e> (n : int, action : () -> e ()) -> e () */  {
   
  var end_10013 = $std_core_types._int_sub(n,1);
  return range_fs__lift_for_1928(function(i_0 /* int */ ) {
      return action();
    }, end_10013, 0);
}
 
 
// monadic lift
export function range_fs__mlift_lift_for_while_1929_10114(action, end, i, _y_x10054) /* forall<a,e> (action : (int) -> e maybe<a>, end : int, i : int, maybe<a>) -> e maybe<a> */  {
  if (_y_x10054 === null) {
     
    var i_0_10015 = $std_core_types._int_add(i,1);
    return range_fs__lift_for_while_1929(action, end, i_0_10015);
  }
  else {
    return $std_core_types.Just(_y_x10054.value);
  }
}
 
 
// lifted local: range/for-while, rep
export function range_fs__lift_for_while_1929(action_0, end_0, i_0) /* forall<a,e> (action : (int) -> e maybe<a>, end : int, i : int) -> e maybe<a> */  { tailcall: while(1)
{
  if ($std_core_types._int_le(i_0,end_0)) {
     
    var x_0_10159 = action_0(i_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10054_0 /* maybe<1486> */ ) {
        return range_fs__mlift_lift_for_while_1929_10114(action_0, end_0, i_0, _y_x10054_0);
      });
    }
    else {
      if (x_0_10159 === null) {
         
        var i_0_10015_0 = $std_core_types._int_add(i_0,1);
        {
          // tail call
          i_0 = i_0_10015_0;
          continue tailcall;
        }
      }
      else {
        return $std_core_types.Just(x_0_10159.value);
      }
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}}
 
 
// Executes `action`  for each integer between `start`  to `end`  (including `end` ).
// If `start > end`  the function returns without any call to `action` .
// If `action` returns `Just`, the iteration is stopped and the result returned
export function range_fs_for_while(start, end, action) /* forall<a,e> (start : int, end : int, action : (int) -> e maybe<a>) -> e maybe<a> */  {
  return range_fs__lift_for_while_1929(action, end, start);
}
 
 
// Executes `action`  for each integer between [0,`n`)  (excluding `n` ).
// If `n <= 0`  the function returns without any call to `action` .
// If `action` returns `Just`, the iteration is stopped and the result returned
export function for_while(n, action) /* forall<a,e> (n : int, action : (int) -> e maybe<a>) -> e maybe<a> */  {
   
  var end_10017 = $std_core_types._int_sub(n,1);
  return range_fs__lift_for_while_1929(action, end_10017, 0);
}
 
 
// Used by the compiler to wrap main console applications
export function main_console(main) /* forall<a,e> (main : () -> e a) -> e a */  {
  return (main)();
}
 
 
// Return the host environment: `dotnet`, `browser`, `webworker`, `node`, or `libc`.
export function host() /* () -> ndet string */  {
  return $std_core_console._host;
}
 
 
// monadic lift
export function _mlift_default_exn_10115(_y_x10061) /* forall<e> (string) -> <console/console|e> () */  {
  return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10061);
}
 
 
// The default exception handler
export function _default_exn(action) /* forall<e> (action : () -> <exn,console/console|e> ()) -> <console/console|e> () */  {
  return $std_core_exn.exn_fs__handle($std_core_exn._Hnd_exn(0, $std_core_hnd._open_none1($std_core_hnd.clause_never1, function(exn /* exception */ ) {
           
          $std_core_hnd._open_none1($std_core_console.prints, "uncaught exception: ");
           
          var x_10162 = $std_core_hnd._open_none1($std_core_exn.show, exn);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10061 /* string */ ) {
              return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10061);
            });
          }
          else {
            return $std_core_hnd._open_none1($std_core_console.printsln, x_10162);
          }
        })), function(_res /* () */ ) {
      return _res;
    }, action);
}
 
export var unique_count;
var unique_count = { value: 0 };
 
 
// Returns a unique integer (modulo 32-bits).
export function unique() /* () -> ndet int */  {
   
  var u = unique_count.value;
   
  ((unique_count).value = ($std_core_types._int_add(u,1)));
  return u;
}
 
 
// Automatically generated. Retrieves the `head` constructor field of the `:stream` type.
export function stream_fs_head(stream) /* forall<a> (stream : stream<a>) -> a */  {
  return stream.head;
}
 
 
// Automatically generated. Retrieves the `tail` constructor field of the `:stream` type.
export function stream_fs_tail(stream) /* forall<a> (stream : stream<a>) -> stream<a> */  {
  return stream.tail;
}
 
export function stream_fs__copy(_this, head, tail) /* forall<a> (stream<a>, head : ? a, tail : ? (stream<a>)) -> stream<a> */  {
  if (head !== undefined) {
    var _x2 = head;
  }
  else {
    var _x2 = _this.head;
  }
  if (tail !== undefined) {
    var _x3 = tail;
  }
  else {
    var _x3 = _this.tail;
  }
  return Next(_x2, _x3);
}