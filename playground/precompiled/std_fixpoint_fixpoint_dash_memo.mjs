// Koka generated module: std/fixpoint/fixpoint-memo, koka version: 3.2.4
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
import * as $std_data_rb_dash_map from './std_data_rb_dash_map.mjs';
import * as $std_fixpoint_lattice from './std_fixpoint_lattice.mjs';
import * as $std_data_rbtree from './std_data_rbtree.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the effect `:cache`
export var cache_fs__tag;
var cache_fs__tag = "cache@fixpoint-memo";
// type cache
export function _Hnd_cache(_cfc, _fun_add_result, _ctl_depend, _ctl_do_each, _fun_is_cached, _brk_none) /* forall<a,b,e,c> (int, hnd/clause2<a,b,(),cache<a,b>,e,c>, hnd/clause1<a,b,cache<a,b>,e,c>, forall<d> hnd/clause1<list<d>,d,cache<a,b>,e,c>, hnd/clause1<a,bool,cache<a,b>,e,c>, forall<d> hnd/clause0<d,cache<a,b>,e,c>) -> cache<a,b,e,c> */  {
  return { _cfc: _cfc, _fun_add_result: _fun_add_result, _ctl_depend: _ctl_depend, _ctl_do_each: _ctl_do_each, _fun_is_cached: _fun_is_cached, _brk_none: _brk_none };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:cache` type.
export function cache_fs__cfc(cache_0) /* forall<a,b,e,c> (cache : cache<a,b,e,c>) -> int */  {
  return cache_0._cfc;
}
 
 
// handler for the effect `:cache`
export function cache_fs__handle(hnd, ret, action) /* forall<a,b,c,e,d> (hnd : cache<a,b,e,d>, ret : (res : c) -> e d, action : () -> <cache<a,b>|e> c) -> e d */  {
  return $std_core_hnd._hhandle(cache_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-add-result` constructor field of the `:cache` type.
export function cache_fs__fun_add_result(cache_0) /* forall<a,b,e,c> (cache : cache<a,b,e,c>) -> hnd/clause2<a,b,(),cache<a,b>,e,c> */  {
  return cache_0._fun_add_result;
}
 
 
// select `add-result` operation out of effect `:cache`
export function add_result_fs__select(hnd) /* forall<a,b,e,c> (hnd : cache<a,b,e,c>) -> hnd/clause2<a,b,(),cache<a,b>,e,c> */  {
  return hnd._fun_add_result;
}
 
 
// Call the `fun add-result` operation of the effect `:cache`
export function add_result(key, result) /* forall<a,b> (key : a, result : b) -> (cache<a,b>) () */  {
   
  var evx_10203 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return evx_10203.hnd._fun_add_result(evx_10203.marker, evx_10203, key, result);
}
 
 
// Automatically generated. Retrieves the `@fun-is-cached` constructor field of the `:cache` type.
export function cache_fs__fun_is_cached(cache_0) /* forall<a,b,e,c> (cache : cache<a,b,e,c>) -> hnd/clause1<a,bool,cache<a,b>,e,c> */  {
  return cache_0._fun_is_cached;
}
 
 
// select `is-cached` operation out of effect `:cache`
export function is_cached_fs__select(hnd) /* forall<a,b,e,c> (hnd : cache<a,b,e,c>) -> hnd/clause1<a,bool,cache<a,b>,e,c> */  {
  return hnd._fun_is_cached;
}
 
 
// Call the `fun is-cached` operation of the effect `:cache`
export function is_cached(key) /* forall<a,b> (key : a) -> (cache<a,b>) bool */  {
   
  var ev_10207 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10207.hnd._fun_is_cached(ev_10207.marker, ev_10207, key);
}
 
 
// Automatically generated. Retrieves the `@ctl-do-each` constructor field of the `:cache` type.
export function cache_fs__ctl_do_each(cache_0) /* forall<a,b,e,c,d> (cache : cache<a,b,e,c>) -> hnd/clause1<list<d>,d,cache<a,b>,e,c> */  {
  return cache_0._ctl_do_each;
}
 
 
// select `do-each` operation out of effect `:cache`
export function do_each_fs__select(hnd) /* forall<a,b,c,e,d> (hnd : cache<a,b,e,d>) -> hnd/clause1<list<c>,c,cache<a,b>,e,d> */  {
  return hnd._ctl_do_each;
}
 
 
// Call the `ctl do-each` operation of the effect `:cache`
export function do_each(ss) /* forall<a,b,c> (ss : list<c>) -> (cache<a,b>) c */  {
   
  var ev_10210 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x0 = ev_10210.hnd._ctl_do_each;
  return _x0(ev_10210.marker, ev_10210, ss);
}
 
 
// Automatically generated. Retrieves the `@brk-none` constructor field of the `:cache` type.
export function cache_fs__brk_none(cache_0) /* forall<a,b,e,c,d> (cache : cache<a,b,e,c>) -> hnd/clause0<d,cache<a,b>,e,c> */  {
  return cache_0._brk_none;
}
 
 
// select `none` operation out of effect `:cache`
export function none_fs__select(hnd) /* forall<a,b,c,e,d> (hnd : cache<a,b,e,d>) -> hnd/clause0<c,cache<a,b>,e,d> */  {
  return hnd._brk_none;
}
 
 
// Call the `final ctl none` operation of the effect `:cache`
export function none() /* forall<a,b,c> () -> (cache<a,b>) c */  {
   
  var ev_10213 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x1 = ev_10213.hnd._brk_none;
  return _x1(ev_10213.marker, ev_10213);
}
 
 
// Automatically generated. Retrieves the `@ctl-depend` constructor field of the `:cache` type.
export function cache_fs__ctl_depend(cache_0) /* forall<a,b,e,c> (cache : cache<a,b,e,c>) -> hnd/clause1<a,b,cache<a,b>,e,c> */  {
  return cache_0._ctl_depend;
}
 
 
// select `depend` operation out of effect `:cache`
export function depend_fs__select(hnd) /* forall<a,b,e,c> (hnd : cache<a,b,e,c>) -> hnd/clause1<a,b,cache<a,b>,e,c> */  {
  return hnd._ctl_depend;
}
 
 
// Call the `ctl depend` operation of the effect `:cache`
export function depend(key) /* forall<a,b> (key : a) -> (cache<a,b>) b */  {
   
  var ev_10215 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10215.hnd._ctl_depend(ev_10215.marker, ev_10215, key);
}
 
 
// monadic lift
export function _mlift_update_10161(wild__) /* forall<e> (wild_ : ()) -> <pure|e> () */  {
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_update_10162(change, _y_x10018) /* forall<a,e> (change : a, maybe<list<(a) -> <pure|e> ()>>) -> <div,exn|e> () */  {
  if (_y_x10018 !== null) {
    return $std_core_list.foreach(_y_x10018.value, function(resumption /* (1555) -> <pure|1556> () */ ) {
         
        var x_10218 = resumption(change);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
            return $std_core_types.Unit;
          });
        }
        else {
          return $std_core_types.Unit;
        }
      });
  }
  else {
    return $std_core_types.Unit;
  }
}
 
export function update(deps, key, change, _implicit_fs_order2) /* forall<a,e,b> (deps : std/data/rb-map/rbmap<b,list<(a) -> <pure|e> ()>>, key : b, change : a, ?order2 : (b, b) -> pure order2<b>) -> <pure|e> () */  {
   
  var x_10221 = $std_data_rb_dash_map.lookup(deps, key, function(_x_x1 /* 1557 */ , _x_x2 /* 1557 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1, _x_x2);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10018 /* maybe<list<(1555) -> <pure|1556> ()>> */ ) {
      return _mlift_update_10162(change, _y_x10018);
    });
  }
  else {
    if (x_10221 !== null) {
      return $std_core_list.foreach(x_10221.value, function(resumption /* (1555) -> <pure|1556> () */ ) {
           
          var x_0_10224 = resumption(change);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
              return $std_core_types.Unit;
            });
          }
          else {
            return $std_core_types.Unit;
          }
        });
    }
    else {
      return $std_core_types.Unit;
    }
  }
}
 
 
// monadic lift
export function _mlift_cache_10163(wild___0) /* forall<h,e> (wild_@0 : ()) -> <pure,local<h>|e> () */  {
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_cache_10164(change, _y_x10029) /* forall<h,e,a> (change : a, maybe<list<(a) -> <pure,local<h>|e> ()>>) -> <div,exn,local<h>|e> () */  {
  if (_y_x10029 !== null) {
    return $std_core_list.foreach(_y_x10029.value, function(resumption /* (3517) -> <pure,local<3490>|3515> () */ ) {
         
        var x_10227 = resumption(change);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
            return $std_core_types.Unit;
          });
        }
        else {
          return $std_core_types.Unit;
        }
      });
  }
  else {
    return $std_core_types.Unit;
  }
}
 
 
// monadic lift
export function _mlift_cache_10165(change, key, _implicit_fs_order2, deps_0_10001) /* forall<h,e,a,b> (change : b, key : a, ?order2 : (a, a) -> pure order2<a>, deps@0@10001 : std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>) -> <local<h>,div,exn|e> () */  {
   
  var x_10230 = $std_data_rb_dash_map.lookup(deps_0_10001, key, function(_x_x1_3 /* 3516 */ , _x_x2_2 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_3, _x_x2_2);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10029 /* maybe<list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return _mlift_cache_10164(change, _y_x10029);
    });
  }
  else {
    return _mlift_cache_10164(change, x_10230);
  }
}
 
 
// monadic lift
export function _mlift_cache_10166(change, deps, key, _implicit_fs_order2, wild__) /* forall<h,e,a,b> (change : b, deps : local-var<h,std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>>, key : a, ?order2 : (a, a) -> pure order2<a>, wild_ : ()) -> <local<h>,div,exn|e> () */  {
   
  var x_10232 = ((deps).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(deps_0_10001 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return _mlift_cache_10165(change, key, _implicit_fs_order2, deps_0_10001);
    });
  }
  else {
    return _mlift_cache_10165(change, key, _implicit_fs_order2, x_10232);
  }
}
 
 
// monadic lift
export function _mlift_cache_10167(cache_0, change, deps, key, _implicit_fs_order2, _y_x10026) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,a>) -> <div,exn,local<h>|e> () */  {
   
  var x_10234 = ((cache_0).value = _y_x10026);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return _mlift_cache_10166(change, deps, key, _implicit_fs_order2, wild__);
    });
  }
  else {
    return _mlift_cache_10166(change, deps, key, _implicit_fs_order2, x_10234);
  }
}
 
 
// monadic lift
export function _mlift_cache_10168(cache_0, change, deps, key, _implicit_fs_order2, r_sq__sq_, _y_x10025) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key : b, ?order2 : (b, b) -> pure order2<b>, r'' : a, std/data/rb-map/rbmap<b,a>) -> <local<h>,div,exn|e> () */  {
   
  var x_10236 = $std_data_rb_dash_map.set(_y_x10025, key, r_sq__sq_, function(_x_x1_2 /* 3516 */ , _x_x2_1 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_2, _x_x2_1);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10026 /* std/data/rb-map/rbmap<3516,3513> */ ) {
      return _mlift_cache_10167(cache_0, change, deps, key, _implicit_fs_order2, _y_x10026);
    });
  }
  else {
    return _mlift_cache_10167(cache_0, change, deps, key, _implicit_fs_order2, x_10236);
  }
}
 
 
// monadic lift
export function _mlift_cache_10169(cache_0, change, deps, key, _implicit_fs_order2, _y_x10024) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key : b, ?order2 : (b, b) -> pure order2<b>, (bool, a)) -> <div,exn,local<h>|e> () */  {
  if (_y_x10024.fst) {
     
    var x_10238 = ((cache_0).value);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10025 /* std/data/rb-map/rbmap<3516,3513> */ ) {
        return _mlift_cache_10168(cache_0, change, deps, key, _implicit_fs_order2, _y_x10024.snd, _y_x10025);
      });
    }
    else {
      return _mlift_cache_10168(cache_0, change, deps, key, _implicit_fs_order2, _y_x10024.snd, x_10238);
    }
  }
  else {
    return $std_core_types.Unit;
  }
}
 
 
// monadic lift
export function _mlift_cache_10170(wild___1) /* forall<h,e> (wild_@1 : ()) -> <pure,local<h>|e> () */  {
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_cache_10171(change, _y_x10040) /* forall<h,e,a> (change : a, maybe<list<(a) -> <pure,local<h>|e> ()>>) -> <div,exn,local<h>|e> () */  {
  if (_y_x10040 !== null) {
    return $std_core_list.foreach(_y_x10040.value, function(resumption_0 /* (3517) -> <pure,local<3490>|3515> () */ ) {
         
        var x_10240 = resumption_0(change);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild___1 /* () */ ) {
            return $std_core_types.Unit;
          });
        }
        else {
          return $std_core_types.Unit;
        }
      });
  }
  else {
    return $std_core_types.Unit;
  }
}
 
 
// monadic lift
export function _mlift_cache_10172(change, key, _implicit_fs_order2, deps_1_10005) /* forall<h,e,a,b> (change : b, key : a, ?order2 : (a, a) -> pure order2<a>, deps@1@10005 : std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>) -> <local<h>,div,exn|e> () */  {
   
  var x_10243 = $std_data_rb_dash_map.lookup(deps_1_10005, key, function(_x_x1_7 /* 3516 */ , _x_x2_5 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_7, _x_x2_5);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10040 /* maybe<list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return _mlift_cache_10171(change, _y_x10040);
    });
  }
  else {
    return _mlift_cache_10171(change, x_10243);
  }
}
 
 
// monadic lift
export function _mlift_cache_10173(change, deps, key, _implicit_fs_order2, wild___0_0) /* forall<h,e,a,b> (change : b, deps : local-var<h,std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>>, key : a, ?order2 : (a, a) -> pure order2<a>, wild_@0@0 : ()) -> <local<h>,div,exn|e> () */  {
   
  var x_10245 = ((deps).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(deps_1_10005 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return _mlift_cache_10172(change, key, _implicit_fs_order2, deps_1_10005);
    });
  }
  else {
    return _mlift_cache_10172(change, key, _implicit_fs_order2, x_10245);
  }
}
 
 
// monadic lift
export function _mlift_cache_10174(cache_0, change, deps, key, _implicit_fs_order2, _y_x10037) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,a>) -> <div,exn,local<h>|e> () */  {
   
  var x_10247 = ((cache_0).value = _y_x10037);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0_0 /* () */ ) {
      return _mlift_cache_10173(change, deps, key, _implicit_fs_order2, wild___0_0);
    });
  }
  else {
    return _mlift_cache_10173(change, deps, key, _implicit_fs_order2, x_10247);
  }
}
 
 
// monadic lift
export function _mlift_cache_10175(_y_x10035, cache_0, change, deps, key, _implicit_fs_order2, _y_x10036) /* forall<h,a,e,b,c> (std/data/rb-map/rbmap<b,a>, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key : b, ?order2 : (b, b) -> pure order2<b>, (bool, a)) -> <div,exn,local<h>|e> () */  {
   
  var x_10249 = $std_data_rb_dash_map.set(_y_x10035, key, $std_core_hnd._open_none1(function(tuple2 /* (bool, 3513) */ ) {
        return tuple2.snd;
      }, _y_x10036), function(_x_x1_6 /* 3516 */ , _x_x2_4 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_6, _x_x2_4);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10037 /* std/data/rb-map/rbmap<3516,3513> */ ) {
      return _mlift_cache_10174(cache_0, change, deps, key, _implicit_fs_order2, _y_x10037);
    });
  }
  else {
    return _mlift_cache_10174(cache_0, change, deps, key, _implicit_fs_order2, x_10249);
  }
}
 
 
// monadic lift
export function _mlift_cache_10176(change_lattice_fs_bottom, cache_0, change, deps, change_lattice_fs_join, key, _implicit_fs_order2, _y_x10035) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, change-lattice/join : (a, c) -> pure (bool, a), key : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,a>) -> <local<h>,div,exn|e> () */  {
   
  var x_10251 = $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), change_lattice_fs_join, change_lattice_fs_bottom, change);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10036 /* (bool, 3513) */ ) {
      return _mlift_cache_10175(_y_x10035, cache_0, change, deps, key, _implicit_fs_order2, _y_x10036);
    });
  }
  else {
    return _mlift_cache_10175(_y_x10035, cache_0, change, deps, key, _implicit_fs_order2, x_10251);
  }
}
 
 
// monadic lift
export function _mlift_cache_10177(change_lattice_fs_bottom, cache_0, change, deps, change_lattice_fs_join, key, _implicit_fs_order2, _y_x10023) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, change-lattice/join : (a, c) -> pure (bool, a), key : b, ?order2 : (b, b) -> pure order2<b>, maybe<a>) -> <div,exn,local<h>|e> () */  {
  if (_y_x10023 !== null) {
     
    var x_10253 = $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), change_lattice_fs_join, _y_x10023.value, change);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10024 /* (bool, 3513) */ ) {
        return _mlift_cache_10169(cache_0, change, deps, key, _implicit_fs_order2, _y_x10024);
      });
    }
    else {
      return _mlift_cache_10169(cache_0, change, deps, key, _implicit_fs_order2, x_10253);
    }
  }
  else {
     
    var x_0_10255 = ((cache_0).value);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10035 /* std/data/rb-map/rbmap<3516,3513> */ ) {
        return _mlift_cache_10176(change_lattice_fs_bottom, cache_0, change, deps, change_lattice_fs_join, key, _implicit_fs_order2, _y_x10035);
      });
    }
    else {
      return _mlift_cache_10176(change_lattice_fs_bottom, cache_0, change, deps, change_lattice_fs_join, key, _implicit_fs_order2, x_0_10255);
    }
  }
}
 
 
// monadic lift
export function _mlift_cache_10178(change_lattice_fs_bottom, cache_0, change, deps, change_lattice_fs_join, key, _implicit_fs_order2, _y_x10022) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change : c, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, change-lattice/join : (a, c) -> pure (bool, a), key : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,a>) -> <local<h>,div,exn|e> () */  {
   
  var x_10257 = $std_data_rb_dash_map.lookup(_y_x10022, key, function(_x_x1_0 /* 3516 */ , _x_x2 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_0, _x_x2);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10023 /* maybe<3513> */ ) {
      return _mlift_cache_10177(change_lattice_fs_bottom, cache_0, change, deps, change_lattice_fs_join, key, _implicit_fs_order2, _y_x10023);
    });
  }
  else {
    return _mlift_cache_10177(change_lattice_fs_bottom, cache_0, change, deps, change_lattice_fs_join, key, _implicit_fs_order2, x_10257);
  }
}
 
 
// monadic lift
export function _mlift_cache_10179(change_lattice_fs_changes, resume, _y_x10053) /* forall<h,a,e,b> (change-lattice/changes : (a) -> list<b>, resume : (b) -> <div,exn,local<h>|e> (), maybe<a>) -> <div,exn,local<h>|e> () */  {
  if (_y_x10053 !== null) {
    return $std_core_list.foreach($std_core_hnd._open_none1(change_lattice_fs_changes, _y_x10053.value), resume);
  }
  else {
    return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), $std_core_exn.error_pattern, "std/fixpoint/fixpoint-memo(50, 7)", "cache");
  }
}
 
 
// monadic lift
export function _mlift_cache_10180(change_lattice_fs_changes, key_0_0, _implicit_fs_order2, resume, _y_x10052) /* forall<h,a,e,b,c> (change-lattice/changes : (a) -> list<c>, key@0@0 : b, ?order2 : (b, b) -> pure order2<b>, resume : (c) -> <div,exn,local<h>|e> (), std/data/rb-map/rbmap<b,a>) -> <local<h>,div,exn|e> () */  {
   
  var x_10259 = $std_data_rb_dash_map.lookup(_y_x10052, key_0_0, function(_x_x1_12 /* 3516 */ , _x_x2_9 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_12, _x_x2_9);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10053 /* maybe<3513> */ ) {
      return _mlift_cache_10179(change_lattice_fs_changes, resume, _y_x10053);
    });
  }
  else {
    return _mlift_cache_10179(change_lattice_fs_changes, resume, x_10259);
  }
}
 
 
// monadic lift
export function _mlift_cache_10181(deps, _y_x10048) /* forall<h,e,a,b> (deps : local-var<h,std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>>, std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>) -> <div,exn,local<h>|e> () */  {
  return ((deps).value = _y_x10048);
}
 
 
// monadic lift
export function _mlift_cache_10182(deps, key_0_0, _implicit_fs_order2, resume, resumes_1, _y_x10047) /* forall<h,e,a,b> (deps : local-var<h,std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>>, key@0@0 : a, ?order2 : (a, a) -> pure order2<a>, resume : (b) -> <div,exn,local<h>|e> (), resumes@1 : list<(b) -> <pure,local<h>|e> ()>, std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>) -> <local<h>,div,exn|e> () */  {
   
  var x_10261 = $std_data_rb_dash_map.set(_y_x10047, key_0_0, $std_core_types.Cons(resume, resumes_1), function(_x_x1_10 /* 3516 */ , _x_x2_7 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_10, _x_x2_7);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10048 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return ((deps).value = _y_x10048);
    });
  }
  else {
    return ((deps).value = x_10261);
  }
}
 
 
// monadic lift
export function _mlift_cache_10183(cache_0, change_lattice_fs_changes, key_0_0, _implicit_fs_order2, resume, _c_x10051) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change-lattice/changes : (a) -> list<c>, key@0@0 : b, ?order2 : (b, b) -> pure order2<b>, resume : (c) -> <div,exn,local<h>|e> (), ()) -> () */  {
   
  var x_10265 = ((cache_0).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10052 /* std/data/rb-map/rbmap<3516,3513> */ ) {
      return _mlift_cache_10180(change_lattice_fs_changes, key_0_0, _implicit_fs_order2, resume, _y_x10052);
    });
  }
  else {
    return _mlift_cache_10180(change_lattice_fs_changes, key_0_0, _implicit_fs_order2, resume, x_10265);
  }
}
 
 
// monadic lift
export function _mlift_cache_10184(cache_0, change_lattice_fs_changes, deps, key_0_0, _implicit_fs_order2, resume, _y_x10046) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change-lattice/changes : (a) -> list<c>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@0@0 : b, ?order2 : (b, b) -> pure order2<b>, resume : (c) -> <div,exn,local<h>|e> (), maybe<list<(c) -> <pure,local<h>|e> ()>>) -> <div,exn,local<h>|e> () */  {
   
  if (_y_x10046 !== null) {
     
    var x_0_10269 = ((deps).value);
    if ($std_core_hnd._yielding()) {
      var x_10267 = $std_core_hnd.yield_extend(function(_y_x10047 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
        return _mlift_cache_10182(deps, key_0_0, _implicit_fs_order2, resume, _y_x10046.value, _y_x10047);
      });
    }
    else {
      var x_10267 = _mlift_cache_10182(deps, key_0_0, _implicit_fs_order2, resume, _y_x10046.value, x_0_10269);
    }
  }
  else {
    var x_10267 = $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), $std_core_exn.error_pattern, "std/fixpoint/fixpoint-memo(46, 7)", "_");
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10051 /* () */ ) {
      return _mlift_cache_10183(cache_0, change_lattice_fs_changes, key_0_0, _implicit_fs_order2, resume, _c_x10051);
    });
  }
  else {
    return _mlift_cache_10183(cache_0, change_lattice_fs_changes, key_0_0, _implicit_fs_order2, resume, x_10267);
  }
}
 
 
// monadic lift
export function _mlift_cache_10185(cache_0, change_lattice_fs_changes, deps, key_0_0, _implicit_fs_order2, resume, _y_x10045) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, change-lattice/changes : (a) -> list<c>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@0@0 : b, ?order2 : (b, b) -> pure order2<b>, resume : (c) -> <div,exn,local<h>|e> (), std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>) -> <local<h>,div,exn|e> () */  {
   
  var x_10271 = $std_data_rb_dash_map.lookup(_y_x10045, key_0_0, function(_x_x1_9 /* 3516 */ , _x_x2_6 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_9, _x_x2_6);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10046 /* maybe<list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return _mlift_cache_10184(cache_0, change_lattice_fs_changes, deps, key_0_0, _implicit_fs_order2, resume, _y_x10046);
    });
  }
  else {
    return _mlift_cache_10184(cache_0, change_lattice_fs_changes, deps, key_0_0, _implicit_fs_order2, resume, x_10271);
  }
}
 
 
// monadic lift
export function _mlift_cache_10186(wild___3) /* forall<h,e> (wild_@3 : ()) -> <local<h>,div,exn|e> bool */  {
  return false;
}
 
 
// monadic lift
export function _mlift_cache_10187(deps, _y_x10066) /* forall<h,e,a,b> (deps : local-var<h,std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>>, std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>) -> <div,exn,local<h>|e> bool */  {
   
  var x_10273 = ((deps).value = _y_x10066);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___3 /* () */ ) {
      return false;
    });
  }
  else {
    return false;
  }
}
 
 
// monadic lift
export function _mlift_cache_10188(deps, key_1_0, _implicit_fs_order2, _y_x10065) /* forall<h,e,a,b> (deps : local-var<h,std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>>, key@1@0 : a, ?order2 : (a, a) -> pure order2<a>, std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>) -> <local<h>,div,exn|e> bool */  {
   
  var x_10276 = $std_data_rb_dash_map.set(_y_x10065, key_1_0, $std_core_types.Nil, function(_x_x1_20 /* 3516 */ , _x_x2_14 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_20, _x_x2_14);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10066 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return _mlift_cache_10187(deps, _y_x10066);
    });
  }
  else {
    return _mlift_cache_10187(deps, x_10276);
  }
}
 
 
// monadic lift
export function _mlift_cache_10189(deps, key_1_0, _implicit_fs_order2, wild___2) /* forall<h,e,a,b> (deps : local-var<h,std/data/rb-map/rbmap<a,list<(b) -> <pure,local<h>|e> ()>>>, key@1@0 : a, ?order2 : (a, a) -> pure order2<a>, wild_@2 : ()) -> <local<h>,div,exn|e> bool */  {
   
  var x_10278 = ((deps).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10065 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
      return _mlift_cache_10188(deps, key_1_0, _implicit_fs_order2, _y_x10065);
    });
  }
  else {
    return _mlift_cache_10188(deps, key_1_0, _implicit_fs_order2, x_10278);
  }
}
 
 
// monadic lift
export function _mlift_cache_10190(cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10063) /* forall<h,a,e,b,c> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@1@0 : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,a>) -> <div,exn,local<h>|e> bool */  {
   
  var x_10280 = ((cache_0).value = _y_x10063);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___2 /* () */ ) {
      return _mlift_cache_10189(deps, key_1_0, _implicit_fs_order2, wild___2);
    });
  }
  else {
    return _mlift_cache_10189(deps, key_1_0, _implicit_fs_order2, x_10280);
  }
}
 
 
// monadic lift
export function _mlift_cache_10191(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10062) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@1@0 : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,a>) -> <local<h>,div,exn|e> bool */  {
   
  var x_10282 = $std_data_rb_dash_map.set(_y_x10062, key_1_0, change_lattice_fs_bottom, function(_x_x1_19 /* 3516 */ , _x_x2_13 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_19, _x_x2_13);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10063 /* std/data/rb-map/rbmap<3516,3513> */ ) {
      return _mlift_cache_10190(cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10063);
    });
  }
  else {
    return _mlift_cache_10190(cache_0, deps, key_1_0, _implicit_fs_order2, x_10282);
  }
}
 
 
// monadic lift
export function _mlift_cache_10192(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10061) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@1@0 : b, ?order2 : (b, b) -> pure order2<b>, bool) -> <div,exn,local<h>|e> bool */  {
  if (_y_x10061) {
    return true;
  }
  else {
     
    var x_10284 = ((cache_0).value);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10062 /* std/data/rb-map/rbmap<3516,3513> */ ) {
        return _mlift_cache_10191(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10062);
      });
    }
    else {
      return _mlift_cache_10191(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, x_10284);
    }
  }
}
 
 
// monadic lift
export function _mlift_cache_10193(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10060) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@1@0 : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>) -> <local<h>,div,exn|e> bool */  {
   
  var x_10286 = $std_data_rb_dash_map.contains(_y_x10060, key_1_0, function(_x_x1_18 /* 3516 */ , _x_x2_12 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_18, _x_x2_12);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10061 /* bool */ ) {
      return _mlift_cache_10192(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10061);
    });
  }
  else {
    return _mlift_cache_10192(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, x_10286);
  }
}
 
 
// monadic lift
export function _mlift_cache_10194(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10059) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@1@0 : b, ?order2 : (b, b) -> pure order2<b>, bool) -> <div,exn,local<h>|e> bool */  {
  if (_y_x10059) {
    return true;
  }
  else {
     
    var x_10288 = ((deps).value);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10060 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
        return _mlift_cache_10193(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10060);
      });
    }
    else {
      return _mlift_cache_10193(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, x_10288);
    }
  }
}
 
 
// monadic lift
export function _mlift_cache_10195(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10058) /* forall<h,a,e,b,c> (change-lattice/bottom : a, cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, deps : local-var<h,std/data/rb-map/rbmap<b,list<(c) -> <pure,local<h>|e> ()>>>, key@1@0 : b, ?order2 : (b, b) -> pure order2<b>, std/data/rb-map/rbmap<b,a>) -> <local<h>,div,exn|e> bool */  {
   
  var x_10290 = $std_data_rb_dash_map.contains(_y_x10058, key_1_0, function(_x_x1_17 /* 3516 */ , _x_x2_11 /* 3516 */ ) {
      return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core_exn.exn_fs__tag), _implicit_fs_order2, _x_x1_17, _x_x2_11);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10059 /* bool */ ) {
      return _mlift_cache_10194(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, _y_x10059);
    });
  }
  else {
    return _mlift_cache_10194(change_lattice_fs_bottom, cache_0, deps, key_1_0, _implicit_fs_order2, x_10290);
  }
}
 
 
// monadic lift
export function _mlift_cache_10196(cache_0, x_3705) /* forall<h,a,e,b> (cache@0 : local-var<h,std/data/rb-map/rbmap<b,a>>, x@3705 : ()) -> <local<h>,div,exn|e> std/data/rb-map/rbmap<b,a> */  {
  return ((cache_0).value);
}
 
 
// A fixpoint cache handler
export function cache(comp, _implicit_fs_order2, _implicit_fs_change_lattice, _implicit_fs_k_fs_show, _implicit_fs_r_fs_show) /* forall<a,b,e,c,d> (comp : () -> <pure,cache<c,d>|e> b, ?order2 : (c, c) -> pure order2<c>, ?change-lattice : std/fixpoint/lattice/change-lattice<a,d>, ?k/show : (c) -> string, ?r/show : (d) -> string) -> <pure|e> std/data/rb-map/rbmap<c,a> */  {
  return function() {
     
    var loc = { value: ($std_data_rbtree.Leaf) };
     
    var loc_0 = { value: ($std_data_rbtree.Leaf) };
     
    var res_0 = cache_fs__handle(_Hnd_cache(3, $std_core_hnd._open_none1($std_core_hnd.clause_tail2, function(key /* 3516 */ , change /* 3517 */ ) {
             
            var x_0_10298 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10022 /* std/data/rb-map/rbmap<3516,3513> */ ) {
                return _mlift_cache_10178(_implicit_fs_change_lattice.bottom, loc, change, loc_0, _implicit_fs_change_lattice.join, key, _implicit_fs_order2, _y_x10022);
              });
            }
            else {
              return _mlift_cache_10178(_implicit_fs_change_lattice.bottom, loc, change, loc_0, _implicit_fs_change_lattice.join, key, _implicit_fs_order2, x_0_10298);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(key_0_0 /* 3516 */ , resume /* (3517) -> <div,exn,local<3490>|3515> () */ ) {
             
            var x_1_10300 = ((loc_0).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10045 /* std/data/rb-map/rbmap<3516,list<(3517) -> <pure,local<3490>|3515> ()>> */ ) {
                return _mlift_cache_10185(loc, _implicit_fs_change_lattice.changes, loc_0, key_0_0, _implicit_fs_order2, resume, _y_x10045);
              });
            }
            else {
              return _mlift_cache_10185(loc, _implicit_fs_change_lattice.changes, loc_0, key_0_0, _implicit_fs_order2, resume, x_1_10300);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(ss /* list<2943> */ , resume_0 /* (2943) -> <div,exn,local<3490>|3515> () */ ) {
            return $std_core_list.foreach(ss, resume_0);
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(key_1_0 /* 3516 */ ) {
             
            var x_2_10302 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10058 /* std/data/rb-map/rbmap<3516,3513> */ ) {
                return _mlift_cache_10195(_implicit_fs_change_lattice.bottom, loc, loc_0, key_1_0, _implicit_fs_order2, _y_x10058);
              });
            }
            else {
              return _mlift_cache_10195(_implicit_fs_change_lattice.bottom, loc, loc_0, key_1_0, _implicit_fs_order2, x_2_10302);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_never0, function() {
            return $std_core_types.Unit;
          })), function(x_0_0 /* 3514 */ ) {
        return $std_core_types.Unit;
      }, comp);
     
    var x_10294 = $std_core_hnd.prompt_local_var(loc_0, res_0);
     
    if ($std_core_hnd._yielding()) {
      var res = $std_core_hnd.yield_extend(function(x_3705 /* () */ ) {
        return ((loc).value);
      });
    }
    else {
      var res = ((loc).value);
    }
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// monadic lift
export function _mlift_push_10197(key, result, wild__) /* forall<a,b> (key : a, result : b, wild_ : bool) -> (cache<a,b>) () */  {
   
  var evx_10307 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return evx_10307.hnd._fun_add_result(evx_10307.marker, evx_10307, key, result);
}
 
 
// Push a result to a key, initializing the key if needed.
// Use this when a relation is populated externally (e.g., a store)
// rather than through memo/depend.
export function push(key, result) /* forall<a,b> (key : a, result : b) -> (cache<a,b>) () */  {
   
  var ev_10311 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10311.hnd._fun_is_cached(ev_10311.marker, ev_10311, key);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* bool */ ) {
      return _mlift_push_10197(key, result, wild__);
    });
  }
  else {
     
    var evx_10314 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    return evx_10314.hnd._fun_add_result(evx_10314.marker, evx_10314, key, result);
  }
}
 
 
// monadic lift
export function fix_fs__mlift_each_10198(result, wild__) /* forall<e,a,b> (result : b, wild_ : ()) -> <cache<a,b>|e> b */  {
  return result;
}
 
 
// monadic lift
export function fix_fs__mlift_each_10199(key, result) /* forall<e,a,b> (key : a, result : b) -> <cache<a,b>|e> b */  {
   
  var x_10318 = $std_core_hnd._open_at2($std_core_hnd._evv_index(cache_fs__tag), function(key_0 /* 3623 */ , result_0 /* 3624 */ ) {
       
      var evx_10320 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return evx_10320.hnd._fun_add_result(evx_10320.marker, evx_10320, key_0, result_0);
    }, key, result);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return result;
    });
  }
  else {
    return result;
  }
}
 
 
// monadic lift
export function fix_fs__mlift_each_10200(key, func) /* forall<e,a,b> (key : a, func : () -> <cache<a,b>|e> b) -> <cache<a,b>|e> b */  {
   
  var x_10326 = func();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(result /* 3624 */ ) {
      return fix_fs__mlift_each_10199(key, result);
    });
  }
  else {
    return fix_fs__mlift_each_10199(key, x_10326);
  }
}
 
export function fix_fs_each(key, ls) /* forall<e,a,b> (key : a, ls : list<() -> <cache<a,b>|e> b>) -> <cache<a,b>|e> b */  {
   
  var x_10328 = $std_core_hnd._open_at1($std_core_hnd._evv_index(cache_fs__tag), function(ss /* list<() -> <cache<3623,3624>|3622> 3624> */ ) {
       
      var ev_10331 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      var _x2 = ev_10331.hnd._ctl_do_each;
      return _x2(ev_10331.marker, ev_10331, ss);
    }, ls);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(func /* () -> <cache<3623,3624>|3622> 3624 */ ) {
      return fix_fs__mlift_each_10200(key, func);
    });
  }
  else {
     
    var x_1_10334 = x_10328();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(result /* 3624 */ ) {
        return fix_fs__mlift_each_10199(key, result);
      });
    }
    else {
       
      var x_2_10337 = $std_core_hnd._open_at2($std_core_hnd._evv_index(cache_fs__tag), function(key_0 /* 3623 */ , result_0_0 /* 3624 */ ) {
           
          var evx_10340 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          return evx_10340.hnd._fun_add_result(evx_10340.marker, evx_10340, key_0, result_0_0);
        }, key, x_1_10334);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
          return x_1_10334;
        });
      }
      else {
        return x_1_10334;
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_memo_10201(func, key, _y_x10085) /* forall<e,a,b> (func : ((list<() -> <cache<a,b>|e> b>) -> <cache<a,b>|e> b) -> <cache<a,b>|e> b, key : a, bool) -> <cache<a,b>|e> b */  {
  if (_y_x10085) {
    return $std_core_hnd._open_at1($std_core_hnd._evv_index(cache_fs__tag), function(key_1 /* 3692 */ ) {
         
        var ev_10346 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        return ev_10346.hnd._ctl_depend(ev_10346.marker, ev_10346, key_1);
      }, key);
  }
  else {
    return func(function(ls /* list<() -> <cache<3692,3693>|3691> 3693> */ ) {
      return fix_fs_each(key, ls);
    });
  }
}
 
 
// Inserts a memoization point at a recursive invocation
export function memo(key, func) /* forall<e,a,b> (key : a, func : ((list<() -> <cache<a,b>|e> b>) -> <cache<a,b>|e> b) -> <cache<a,b>|e> b) -> <cache<a,b>|e> b */  {
   
  var x_10349 = $std_core_hnd._open_at1($std_core_hnd._evv_index(cache_fs__tag), function(key_0 /* 3692 */ ) {
       
      var ev_10352 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10352.hnd._fun_is_cached(ev_10352.marker, ev_10352, key_0);
    }, key);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10085 /* bool */ ) {
      return _mlift_memo_10201(func, key, _y_x10085);
    });
  }
  else {
    if (x_10349) {
      return $std_core_hnd._open_at1($std_core_hnd._evv_index(cache_fs__tag), function(key_1 /* 3692 */ ) {
           
          var ev_0_10355 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          return ev_0_10355.hnd._ctl_depend(ev_0_10355.marker, ev_0_10355, key_1);
        }, key);
    }
    else {
      return func(function(ls /* list<() -> <cache<3692,3693>|3691> 3693> */ ) {
        return fix_fs_each(key, ls);
      });
    }
  }
}