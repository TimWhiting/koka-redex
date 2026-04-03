// Koka generated module: std/data/intern, koka version: 3.2.4
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
import * as $std_core_dash_extras from './std_core_dash_extras.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the effect `:interner`
export var interner_fs__tag;
var interner_fs__tag = "interner@intern";
 
 
// runtime tag for the effect `:intern`
export var intern_fs__tag;
var intern_fs__tag = "intern@intern";
// type intern-ref
export function Interned(idx, a) /* forall<a> (idx : int, a : a) -> intern-ref<a> */  {
  return { idx: idx, a: a };
}
// type intern
export function _Hnd_intern(_cfc, _fun_intern) /* forall<s,a,e,b> (int, hnd/clause1<a,intern-ref<a>,intern<s,a>,e,b>) -> intern<s,a,e,b> */  {
  return { _cfc: _cfc, _fun_intern: _fun_intern };
}
// type interner
export function _Hnd_interner(_cfc, _ctl_interner) /* forall<s,e,a> (int, forall<b> hnd/clause1<(b, b) -> pure bool,hnd/ev<intern<s,b>>,interner<s>,e,a>) -> interner<s,e,a> */  {
  return { _cfc: _cfc, _ctl_interner: _ctl_interner };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:interner` type.
export function interner_fs__cfc(interner_0) /* forall<s,e,a> (interner : interner<s,e,a>) -> int */  {
  return interner_0._cfc;
}
 
 
// handler for the effect `:interner`
export function interner_fs__handle(hnd, ret, action) /* forall<s,a,e,b> (hnd : interner<s,e,b>, ret : (res : a) -> e b, action : forall<s1> () -> <interner<s1>|e> a) -> e b */  {
  return $std_core_hnd._hhandle(interner_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@ctl-interner` constructor field of the `:interner` type.
export function interner_fs__ctl_interner(interner_0) /* forall<s,e,a,b> (interner : interner<s,e,a>) -> hnd/clause1<(b, b) -> pure bool,hnd/ev<intern<s,b>>,interner<s>,e,a> */  {
  return interner_0._ctl_interner;
}
 
 
// select `interner` operation out of effect `:interner`
export function interner_fs__select(hnd) /* forall<s,a,e,b> (hnd : interner<s,e,b>) -> hnd/clause1<(a, a) -> pure bool,hnd/ev<intern<s,a>>,interner<s>,e,b> */  {
  return hnd._ctl_interner;
}
 
 
// Call the `ctl interner` operation of the effect `:interner`
export function interner(eq) /* forall<s,a> (eq : (a, a) -> pure bool) -> (interner<s>) hnd/ev<intern<s,a>> */  {
   
  var ev_10137 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x0 = ev_10137.hnd._ctl_interner;
  return _x0(ev_10137.marker, ev_10137, eq);
}
 
export function make_interner(_implicit_fs__lp__eq__eq__rp_) /* forall<s,a> (?(==) : (a, a) -> pure bool) -> (interner<s>) hnd/ev<intern<s,a>> */  {
   
  var ev_10140 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x1 = ev_10140.hnd._ctl_interner;
  return _x1(ev_10140.marker, ev_10140, _implicit_fs__lp__eq__eq__rp_);
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:intern` type.
export function intern_fs__cfc(intern_0) /* forall<s,a,e,b> (intern : intern<s,a,e,b>) -> int */  {
  return intern_0._cfc;
}
 
 
// handler for the effect `:intern`
export function intern_fs__handle(hnd, ret, action) /* forall<s,a,b,e,c> (hnd : intern<s,a,e,c>, ret : (res : b) -> e c, action : (hname : hnd/ev<intern<s,a>>) -> e b) -> e c */  {
  return $std_core_hnd._named_handle(intern_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-intern` constructor field of the `:intern` type.
export function intern_fs__fun_intern(intern_0) /* forall<s,a,e,b> (intern : intern<s,a,e,b>) -> hnd/clause1<a,intern-ref<a>,intern<s,a>,e,b> */  {
  return intern_0._fun_intern;
}
 
 
// select `intern` operation out of effect `:intern`
export function intern_fs__select(hnd) /* forall<s,a,e,b> (hnd : intern<s,a,e,b>) -> hnd/clause1<a,intern-ref<a>,intern<s,a>,e,b> */  {
  return hnd._fun_intern;
}
 
 
// Call the `fun intern` operation of the effect `:intern`
export function intern(_hname, x) /* forall<s,a> (hnd/ev<intern<s,a>>, x : a) -> <div,interner<s>,exn> intern-ref<a> */  {
  return _hname.hnd._fun_intern(_hname.marker, _hname, x);
}
 
 
// Automatically generated. Retrieves the `idx` constructor field of the `:intern-ref` type.
export function intern_ref_fs_idx(_this) /* forall<a> (intern-ref<a>) -> int */  {
  return _this.idx;
}
 
 
// Automatically generated. Retrieves the `a` constructor field of the `:intern-ref` type.
export function intern_ref_fs_a(_this) /* forall<a> (intern-ref<a>) -> a */  {
  return _this.a;
}
 
export function intern_ref_fs__copy(_this, idx, a) /* forall<a> (intern-ref<a>, idx : ? int, a : ? a) -> intern-ref<a> */  {
  if (idx !== undefined) {
    var _x2 = idx;
  }
  else {
    var _x2 = _this.idx;
  }
  if (a !== undefined) {
    var _x3 = a;
  }
  else {
    var _x3 = _this.a;
  }
  return Interned(_x2, _x3);
}
 
 
// monadic lift
export function _mlift_with_new_pool_10121(a, _y_x10045) /* forall<h,a,e> (a : a, list<a>) -> <local<h>,div,std/core-extras/find<intern-ref<a>>|e> intern-ref<a> */  {
   
  var x_0_10079 = $std_core_hnd._open_none1(function(xs /* list<1252> */ ) {
      return $std_core_list._lift_length_6003(xs, 0);
    }, _y_x10045);
  return Interned($std_core_types._int_sub(x_0_10079,1), a);
}
 
 
// monadic lift
export function _mlift_with_new_pool_10122(a, vec, wild___0) /* forall<h,a,e> (a : a, vec : local-var<h,list<a>>, wild_@0 : ()) -> <local<h>,div,std/core-extras/find<intern-ref<a>>|e> intern-ref<a> */  {
   
  $std_core._unsupported_external("std/core-extras/unsafe-box-drop");
   
  var x_10147 = ((vec).value);
   
  function next_10148(_y_x10045) /* (list<1252>) -> <local<1234>,div,std/core-extras/find<intern-ref<1252>>|1254> intern-ref<1252> */  {
     
    var x_0_10079 = $std_core_hnd._open_none1(function(xs /* list<1252> */ ) {
        return $std_core_list._lift_length_6003(xs, 0);
      }, _y_x10045);
    return Interned($std_core_types._int_sub(x_0_10079,1), a);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10148);
  }
  else {
    return next_10148(x_10147);
  }
}
 
 
// monadic lift
export function _mlift_with_new_pool_10123(a, vec, _y_x10043) /* forall<h,a,e> (a : a, vec : local-var<h,list<a>>, list<a>) -> <local<h>,div,std/core-extras/find<intern-ref<a>>|e> intern-ref<a> */  {
   
  var x_10151 = ((vec).value = ($std_core_types.Cons(a, _y_x10043)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
      return _mlift_with_new_pool_10122(a, vec, wild___0);
    });
  }
  else {
    return _mlift_with_new_pool_10122(a, vec, x_10151);
  }
}
 
 
// monadic lift
export function _mlift_with_new_pool_10124(i, x, _y_x10037) /* forall<a,e> (i : int, x : a, bool) -> <std/core-extras/find<intern-ref<a>>,div|e> () */  {
  if (_y_x10037) {
    return $std_core_hnd._open_at1($std_core_hnd._evv_index($std_core_dash_extras.find_fs__tag), function(a_1 /* intern-ref<1252> */ ) {
         
        var ev_10153 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x4 = $std_core_dash_extras.found_fs__select(ev_10153.hnd);
        return _x4(ev_10153.marker, ev_10153, a_1);
      }, Interned(i, x));
  }
  else {
    return $std_core_types.Unit;
  }
}
 
 
// monadic lift
export function _mlift_with_new_pool_10125(a, vec, wild__) /* forall<h,a,e> (a : a, vec : local-var<h,list<a>>, wild_ : ()) -> <local<h>,div,std/core-extras/find<intern-ref<a>>|e> intern-ref<a> */  {
   
  var x_10156 = ((vec).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10043 /* list<1252> */ ) {
      return _mlift_with_new_pool_10123(a, vec, _y_x10043);
    });
  }
  else {
    return _mlift_with_new_pool_10123(a, vec, x_10156);
  }
}
 
 
// monadic lift
export function _mlift_with_new_pool_10126(a, eq, vec, v) /* forall<h,a,e> (a : a, eq : (a, a) -> <std/core-extras/find<intern-ref<a>>,div|e> bool, vec : local-var<h,list<a>>, v : list<a>) -> <local<h>,div,std/core-extras/find<intern-ref<a>>|e> intern-ref<a> */  {
   
  var x_10158 = $std_core_list.foreach_indexed(v, function(i /* int */ , x_0 /* 1252 */ ) {
       
      var x_1_10161 = eq(a, x_0);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10037 /* bool */ ) {
          return _mlift_with_new_pool_10124(i, x_0, _y_x10037);
        });
      }
      else {
        return _mlift_with_new_pool_10124(i, x_0, x_1_10161);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return _mlift_with_new_pool_10125(a, vec, wild__);
    });
  }
  else {
    return _mlift_with_new_pool_10125(a, vec, x_10158);
  }
}
 
export function with_new_pool(eq, action) /* forall<a,b,e,s> (eq : (a, a) -> <std/core-extras/find<intern-ref<a>>,div|e> bool, action : (hnd/ev<intern<s,a>>) -> <div|e> b) -> <div|e> b */  {
  return function() {
     
    var loc = { value: ($std_core_types.Nil) };
     
    var res = intern_fs__handle(_Hnd_intern(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(a /* 1252 */ ) {
            return $std_core_dash_extras.find_fs__handle($std_core_dash_extras._Hnd_find(0, $std_core_hnd._open_none1($std_core_hnd.clause_never1, function(a_0 /* intern-ref<1252> */ ) {
                    return a_0;
                  })), function(_res /* intern-ref<1252> */ ) {
                return _res;
              }, function() {
                 
                var x_10165 = ((loc).value);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(v /* list<1252> */ ) {
                    return _mlift_with_new_pool_10126(a, eq, loc, v);
                  });
                }
                else {
                  return _mlift_with_new_pool_10126(a, eq, loc, x_10165);
                }
              });
          })), function(_res_0 /* 1253 */ ) {
        return _res_0;
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function intern_creator(action) /* forall<a,e> (action : forall<s> () -> <interner<s>,pure|e> a) -> <pure|e> a */  {
  return interner_fs__handle(_Hnd_interner(3, $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(eq /* (1367, 1367) -> pure bool */ , resume /* (hnd/ev<intern<_1299,1367>>) -> <div,exn|1404> 1403 */ ) {
          return with_new_pool(function(_x_x1_0 /* 1367 */ , _x_x2 /* 1367 */ ) {
              return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), eq, _x_x1_0, _x_x2);
            }, resume);
        })), function(_res /* 1403 */ ) {
      return _res;
    }, function() {
      return action();
    });
}
 
export function _lp__eq__eq__rp_(x, y) /* forall<a> (x : intern-ref<a>, y : intern-ref<a>) -> bool */  {
  var _x5 = x.idx;
  var _x6 = y.idx;
  return $std_core_types._int_eq(_x5,_x6);
}
 
export var strs;
var strs = $std_core_delayed.delay(function() {
  return $std_core_hnd._open_at1(1, function(eq /* (string, string) -> pure bool */ ) {
       
      var ev_10168 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      var _x7 = ev_10168.hnd._ctl_interner;
      return _x7(ev_10168.marker, ev_10168, eq);
    }, (function(_x8, _x9) {
      return (_x8 === _x9);
    }));
});
 
 
// monadic lift
export function _mlift_s_intern_10127(s, _hname_10007) /* forall<s> (s : string, hnd/ev<intern<s,string>>) -> <div,exn,interner<s>> intern-ref<string> */  {
  return _hname_10007.hnd._fun_intern(_hname_10007.marker, _hname_10007, s);
}
 
export function s_intern(s) /* forall<s> (s : string) -> <pure,interner<s>> intern-ref<string> */  {
   
  var x_10174 = $std_core_hnd._open_none1($std_core_delayed.unsafe_no_state_div_cast, function() {
      return $std_core_delayed.force_fs_go(strs);
    })();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_hname_10007 /* hnd/ev<intern<1696,string>> */ ) {
      return _hname_10007.hnd._fun_intern(_hname_10007.marker, _hname_10007, s);
    });
  }
  else {
    return x_10174.hnd._fun_intern(x_10174.marker, x_10174, s);
  }
}
 
 
// monadic lift
export function _mlift_example_10128(_y_x10071) /* forall<s> (string) -> <console/console,div,exn,interner<s>> () */  {
  return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10071);
}
 
 
// monadic lift
export function _mlift_example_10129(a, anothera, _y_x10070) /* forall<s> (a : intern-ref<string>, anothera : intern-ref<string>, string) -> <console/console,div,exn,interner<s>> () */  {
   
  $std_core_hnd._open_none1($std_core_console.printsln, _y_x10070);
   
  var x_4_10027 = $std_core_hnd._open_none2(function(x_5 /* intern-ref<string> */ , y_0 /* intern-ref<string> */ ) {
      var _x10 = x_5.idx;
      var _x11 = y_0.idx;
      return $std_core_types._int_eq(_x10,_x11);
    }, a, anothera);
   
  var x_10180 = $std_core_hnd._open_none1($std_core_bool.show, x_4_10027);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10071 /* string */ ) {
      return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10071);
    });
  }
  else {
    return $std_core_hnd._open_none1($std_core_console.printsln, x_10180);
  }
}
 
 
// monadic lift
export function _mlift_example_10130(a, b, anothera) /* forall<s> (a : intern-ref<string>, b : intern-ref<string>, anothera : intern-ref<string>) -> <div,exn,interner<s>> () */  {
   
  var x_2_10023 = $std_core_hnd._open_none2(function(x_3 /* intern-ref<string> */ , y /* intern-ref<string> */ ) {
      var _x10 = x_3.idx;
      var _x11 = y.idx;
      return $std_core_types._int_eq(_x10,_x11);
    }, a, b);
   
  var x_10183 = $std_core_hnd._open_none1($std_core_bool.show, x_2_10023);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10070 /* string */ ) {
      return _mlift_example_10129(a, anothera, _y_x10070);
    });
  }
  else {
    return _mlift_example_10129(a, anothera, x_10183);
  }
}
 
 
// monadic lift
export function _mlift_example_10131(a, b, _hname_1_10020) /* forall<s> (a : intern-ref<string>, b : intern-ref<string>, hnd/ev<intern<s,string>>) -> <div,exn,interner<s>> () */  {
   
  var x_10185 = _hname_1_10020.hnd._fun_intern(_hname_1_10020.marker, _hname_1_10020, "a");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(anothera /* intern-ref<string> */ ) {
      return _mlift_example_10130(a, b, anothera);
    });
  }
  else {
    return _mlift_example_10130(a, b, x_10185);
  }
}
 
 
// monadic lift
export function _mlift_example_10132(a, b) /* forall<s> (a : intern-ref<string>, b : intern-ref<string>) -> <div,exn,interner<s>> () */  {
   
  var x_10190 = $std_core_hnd._open_none1($std_core_delayed.unsafe_no_state_div_cast, function() {
      return $std_core_delayed.force_fs_go(strs);
    })();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_hname_1_10020 /* hnd/ev<intern<1392,string>> */ ) {
      return _mlift_example_10131(a, b, _hname_1_10020);
    });
  }
  else {
    return _mlift_example_10131(a, b, x_10190);
  }
}
 
 
// monadic lift
export function _mlift_example_10133(a, _hname_0_10016) /* forall<s> (a : intern-ref<string>, hnd/ev<intern<s,string>>) -> <div,exn,interner<s>> () */  {
   
  var x_10192 = _hname_0_10016.hnd._fun_intern(_hname_0_10016.marker, _hname_0_10016, "b");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(b /* intern-ref<string> */ ) {
      return _mlift_example_10132(a, b);
    });
  }
  else {
    return _mlift_example_10132(a, x_10192);
  }
}
 
 
// monadic lift
export function _mlift_example_10134(a) /* forall<s> (a : intern-ref<string>) -> <div,exn,interner<s>> () */  {
   
  var x_10197 = $std_core_hnd._open_none1($std_core_delayed.unsafe_no_state_div_cast, function() {
      return $std_core_delayed.force_fs_go(strs);
    })();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_hname_0_10016 /* hnd/ev<intern<1392,string>> */ ) {
      return _mlift_example_10133(a, _hname_0_10016);
    });
  }
  else {
    return _mlift_example_10133(a, x_10197);
  }
}
 
 
// monadic lift
export function _mlift_example_10135(_hname_10012) /* forall<s> (hnd/ev<intern<s,string>>) -> <div,exn,interner<s>> () */  {
   
  var x_10199 = _hname_10012.hnd._fun_intern(_hname_10012.marker, _hname_10012, "a");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(a /* intern-ref<string> */ ) {
      return _mlift_example_10134(a);
    });
  }
  else {
    return _mlift_example_10134(x_10199);
  }
}
 
export function example() /* () -> <pure,console/console> () */  {
  return interner_fs__handle(_Hnd_interner(3, $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(eq /* (1367, 1367) -> pure bool */ , resume /* (hnd/ev<intern<_1299,1367>>) -> <div,exn,console/console> () */ ) {
          return with_new_pool(function(_x_x1_0 /* 1367 */ , _x_x2 /* 1367 */ ) {
              return $std_core_hnd._open_at2(0, eq, _x_x1_0, _x_x2);
            }, resume);
        })), function(_res /* () */ ) {
      return _res;
    }, function() {
       
      var x_10204 = $std_core_hnd._open_none1($std_core_delayed.unsafe_no_state_div_cast, function() {
          return $std_core_delayed.force_fs_go(strs);
        })();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_hname_10012 /* hnd/ev<intern<1392,string>> */ ) {
          return _mlift_example_10135(_hname_10012);
        });
      }
      else {
        return _mlift_example_10135(x_10204);
      }
    });
}