// Koka generated module: handlers/vec, koka version: 3.2.4
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
 
 
// runtime tag for the effect `:vec`
export var vec_fs__tag;
var vec_fs__tag = "vec@vec";
// type ix
export function Ix(index) /* forall<s> (index : int) -> ix<s> */  {
  return index;
}
// type vec
export function _Hnd_vec(_cfc, _fun_lookup, _fun_push) /* forall<s,e,a> (int, hnd/clause1<ix<s>,string,vec<s>,e,a>, hnd/clause1<string,ix<s>,vec<s>,e,a>) -> vec<s,e,a> */  {
  return { _cfc: _cfc, _fun_lookup: _fun_lookup, _fun_push: _fun_push };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `index` constructor field of the `:ix` type.
export function ix_fs_index(ix) /* forall<s> (ix : ix<s>) -> int */  {
  return ix;
}
 
export function ix_fs__copy(_this, index) /* forall<s> (ix<s>, index : ? int) -> ix<s> */  {
  if (index !== undefined) {
    var _x0 = index;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:vec` type.
export function vec_fs__cfc(vec_0) /* forall<s,e,a> (vec : vec<s,e,a>) -> int */  {
  return vec_0._cfc;
}
 
 
// handler for the effect `:vec`
export function vec_fs__handle(hnd, ret, action) /* forall<s,a,e,b> (hnd : vec<s,e,b>, ret : (res : a) -> e b, action : () -> <vec<s>|e> a) -> e b */  {
  return $std_core_hnd._hhandle(vec_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-push` constructor field of the `:vec` type.
export function vec_fs__fun_push(vec_0) /* forall<s,e,a> (vec : vec<s,e,a>) -> hnd/clause1<string,ix<s>,vec<s>,e,a> */  {
  return vec_0._fun_push;
}
 
 
// select `push` operation out of effect `:vec`
export function push_fs__select(hnd) /* forall<s,e,a> (hnd : vec<s,e,a>) -> hnd/clause1<string,ix<s>,vec<s>,e,a> */  {
  return hnd._fun_push;
}
 
 
// Call the `fun push` operation of the effect `:vec`
export function push(s) /* forall<s> (s : string) -> (vec<s>) ix<s> */  {
   
  var ev_10055 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10055.hnd._fun_push(ev_10055.marker, ev_10055, s);
}
 
 
// Automatically generated. Retrieves the `@fun-lookup` constructor field of the `:vec` type.
export function vec_fs__fun_lookup(vec_0) /* forall<s,e,a> (vec : vec<s,e,a>) -> hnd/clause1<ix<s>,string,vec<s>,e,a> */  {
  return vec_0._fun_lookup;
}
 
 
// select `lookup` operation out of effect `:vec`
export function lookup_fs__select(hnd) /* forall<s,e,a> (hnd : vec<s,e,a>) -> hnd/clause1<ix<s>,string,vec<s>,e,a> */  {
  return hnd._fun_lookup;
}
 
 
// Call the `fun lookup` operation of the effect `:vec`
export function lookup(ix) /* forall<s> (ix : ix<s>) -> (vec<s>) string */  {
   
  var ev_10058 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10058.hnd._fun_lookup(ev_10058.marker, ev_10058, ix);
}
 
 
// monadic lift
export function _mlift_vec_10048(ix, _y_x10007) /* forall<_s,h,e> (ix : ix<_s>, list<string>) -> <local<h>|e> string */  {
   
  var _x_x2_0_10037 = $std_core_hnd._open_none1(function(ix_0 /* ix<_584> */ ) {
      return ix_0;
    }, ix);
   
  var _x_x1_0_10034 = $std_core_hnd._open_none2($std_core_list._index, _y_x10007, _x_x2_0_10037);
  return $std_core_hnd._open_none2(function(m /* maybe<string> */ , nothing /* string */ ) {
      return (m === null) ? nothing : m.value;
    }, _x_x1_0_10034, "");
}
 
 
// monadic lift
export function _mlift_vec_10049(i, wild__) /* forall<_s,h,e> (i : int, wild_ : ()) -> <local<h>|e> ix<_s> */  {
  return i;
}
 
 
// monadic lift
export function _mlift_vec_10050(i, s, xs, _y_x10009) /* forall<_s,h,e> (i : int, s : string, xs : local-var<h,list<string>>, list<string>) -> <local<h>|e> ix<_s> */  {
   
  var x_10061 = ((xs).value = ($std_core_hnd._open_none2(function(xs_1 /* list<string> */ , ys /* list<string> */ ) {
      return $std_core_list.append(xs_1, ys);
    }, _y_x10009, $std_core_types.Cons(s, $std_core_types.Nil))));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return i;
    });
  }
  else {
    return i;
  }
}
 
 
// monadic lift
export function _mlift_vec_10051(s, xs, _y_x10008) /* forall<_s,h,e> (s : string, xs : local-var<h,list<string>>, list<string>) -> <local<h>|e> ix<_s> */  {
   
  var i = $std_core_hnd._open_none1(function(xs_0 /* list<string> */ ) {
      return $std_core_list._lift_length_6003(xs_0, 0);
    }, _y_x10008);
   
  var x_10065 = ((xs).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10009 /* list<string> */ ) {
      return _mlift_vec_10050(i, s, xs, _y_x10009);
    });
  }
  else {
    return _mlift_vec_10050(i, s, xs, x_10065);
  }
}
 
 
// Create a `vec` handler that safely only handles its own indices (parameterized by `:s`)
export function vec(action) /* forall<a,e> (action : forall<s> () -> <vec<s>|e> a) -> e a */  {
  return function() {
     
    var loc = { value: ($std_core_types.Nil) };
     
    var res = vec_fs__handle(_Hnd_vec(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(ix /* ix<_584> */ ) {
             
            var x_10069 = ((loc).value);
             
            function next_10070(_y_x10007) /* (list<string>) -> <local<833>|845> string */  {
               
              var _x_x2_0_10037 = $std_core_hnd._open_none1(function(ix_0_0 /* ix<_584> */ ) {
                  return ix_0_0;
                }, ix);
               
              var _x_x1_0_10034 = $std_core_hnd._open_none2($std_core_list._index, _y_x10007, _x_x2_0_10037);
              return $std_core_hnd._open_none2(function(m /* maybe<string> */ , nothing /* string */ ) {
                  return (m === null) ? nothing : m.value;
                }, _x_x1_0_10034, "");
            }
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(next_10070);
            }
            else {
              return next_10070(x_10069);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(s /* string */ ) {
             
            var x_1_10073 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10008 /* list<string> */ ) {
                return _mlift_vec_10051(s, loc, _y_x10008);
              });
            }
            else {
              return _mlift_vec_10051(s, loc, x_1_10073);
            }
          })), function(_res /* 844 */ ) {
        return _res;
      }, function() {
        return action();
      });
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// monadic lift
export function _mlift_main_10052(_y_x10017) /* forall<s> (string) -> (vec<s>) () */  {
   
  var _x_x1_1_10045 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10017, " world");
  return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10045);
}
 
 
// monadic lift
export function _mlift_main_10053(ix) /* forall<s> (ix : ix<s>) -> (vec<s>) () */  {
   
  var ev_10076 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10076.hnd._fun_lookup(ev_10076.marker, ev_10076, ix);
   
  function next(_y_x10017) /* (string) -> (vec<947>) () */  {
     
    var _x_x1_1_10045 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10017, " world");
    return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10045);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next);
  }
  else {
    return next(x);
  }
}
 
export function main() /* () -> console/console () */  {
  return vec(function() {
     
    var ev_10080 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x = ev_10080.hnd._fun_push(ev_10080.marker, ev_10080, "hello");
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(ix /* ix<947> */ ) {
        return _mlift_main_10053(ix);
      });
    }
    else {
      return _mlift_main_10053(x);
    }
  });
}