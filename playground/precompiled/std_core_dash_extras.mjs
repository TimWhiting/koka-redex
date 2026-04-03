// Koka generated module: std/core-extras, koka version: 3.2.4
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
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
import * as $std_core_undiv from './std_core_undiv.mjs';
import * as $std_core_exn from './std_core_exn.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the effect `:find`
export var find_fs__tag;
var find_fs__tag = "find@core-extras";
// type find
export function _Hnd_find(_cfc, _brk_found) /* forall<a,e,b> (int, forall<c> hnd/clause1<a,c,find<a>,e,b>) -> find<a,e,b> */  {
  return { _cfc: _cfc, _brk_found: _brk_found };
}
 
// declarations
 
export function pretend_not_reachable(_implicit_fs_kk_file_line) /* forall<a> (?kk-file-line : string) -> a */  {
  return $std_core_debug.impossible(undefined, _implicit_fs_kk_file_line);
}
 
export function list_fs_contains(l, v, _implicit_fs__lp__eq__eq__rp_) /* forall<a,e> (l : list<a>, v : a, ?(==) : (a, a) -> e bool) -> e bool */  {
  return $std_core_list.any(l, function(_eta_x26__9 /* 422 */ ) {
      return _implicit_fs__lp__eq__eq__rp_(_eta_x26__9, v);
    });
}
 
export function list_fs_and(l) /* (l : list<bool>) -> bool */  { tailcall: while(1)
{
  if (l === null) {
    return true;
  }
  else if (l !== null && l.head) {
    {
      // tail call
      l = l.tail;
      continue tailcall;
    }
  }
  else {
    return false;
  }
}}
 
 
// String and char utilities
export function string_fs_is_prefix_of(s1, s2) /* (s1 : string, s2 : string) -> bool */  {
   
  var mb_10000 = $std_core_sslice.starts_with(s2, s1);
  return (mb_10000 !== null);
}
 
 
// monadic lift
export function list_fs__mlift_is_prefix_of_10093(_implicit_fs__lp__eq__eq__rp_, t1, t2, _y_x10047) /* forall<a,e> (?(==) : (a, a) -> e bool, t1 : list<a>, t2 : list<a>, bool) -> e bool */  {
  if (_y_x10047) {
    return list_fs_is_prefix_of(t1, t2, _implicit_fs__lp__eq__eq__rp_);
  }
  else {
    return false;
  }
}
 
export function list_fs_is_prefix_of(l1, l2, _implicit_fs__lp__at_x_0_eq__eq__rp_) /* forall<a,e> (l1 : list<a>, l2 : list<a>, ?(==) : (a, a) -> e bool) -> e bool */  { tailcall: while(1)
{
  if (l1 === null) {
    return true;
  }
  else if (l2 === null) {
    return false;
  }
  else {
     
    var x_10097 = _implicit_fs__lp__at_x_0_eq__eq__rp_(l1.head, l2.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10047_0 /* bool */ ) {
        return list_fs__mlift_is_prefix_of_10093(_implicit_fs__lp__at_x_0_eq__eq__rp_, l1.tail, l2.tail, _y_x10047_0);
      });
    }
    else {
      if (x_10097) {
        {
          // tail call
          l1 = l1.tail;
          l2 = l2.tail;
          continue tailcall;
        }
      }
      else {
        return false;
      }
    }
  }
}}
 
 
// monadic lift
export function list_fs__mlift_lift_maximum_by_2946_10094(acc, cmp, h, t, _y_x10052) /* forall<a,e> (acc : maybe<a>, cmp : (a, a) -> e order, h : a, t : list<a>, order) -> e maybe<a> */  {
  if (_y_x10052 === 3) {
    return list_fs__lift_maximum_by_2946(t, $std_core_types.Just(h), cmp);
  }
  else {
    return list_fs__lift_maximum_by_2946(t, acc, cmp);
  }
}
 
 
// lifted local: list/maximum-by, loop
export function list_fs__lift_maximum_by_2946(l, acc_0, cmp_0) /* forall<a,e> (l : list<a>, acc : maybe<a>, cmp : (a, a) -> e order) -> e maybe<a> */  { tailcall: while(1)
{
  if (l === null) {
    return acc_0;
  }
  else {
    if (acc_0 === null) {
      {
        // tail call
        var _x0 = $std_core_types.Just(l.head);
        l = l.tail;
        acc_0 = _x0;
        continue tailcall;
      }
    }
    else {
       
      var x_10100 = cmp_0(l.head, acc_0.value);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10052_0 /* order */ ) {
          return list_fs__mlift_lift_maximum_by_2946_10094(acc_0, cmp_0, l.head, l.tail, _y_x10052_0);
        });
      }
      else {
        if (x_10100 === 3) {
          {
            // tail call
            var _x1 = $std_core_types.Just(l.head);
            l = l.tail;
            acc_0 = _x1;
            continue tailcall;
          }
        }
        else {
          {
            // tail call
            l = l.tail;
            continue tailcall;
          }
        }
      }
    }
  }
}}
 
export function list_fs_maximum_by(l0, cmp0) /* forall<a,e> (l0 : list<a>, cmp0 : (a, a) -> e order) -> e maybe<a> */  {
  return list_fs__lift_maximum_by_2946(l0, $std_core_types.Nothing, cmp0);
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:find` type.
export function find_fs__cfc(find_0) /* forall<a,e,b> (find : find<a,e,b>) -> int */  {
  return find_0._cfc;
}
 
 
// handler for the effect `:find`
export function find_fs__handle(hnd, ret, action) /* forall<a,b,e,c> (hnd : find<a,e,c>, ret : (res : b) -> e c, action : () -> <find<a>|e> b) -> e c */  {
  return $std_core_hnd._hhandle(find_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@brk-found` constructor field of the `:find` type.
export function find_fs__brk_found(find_0) /* forall<a,e,b,c> (find : find<a,e,b>) -> hnd/clause1<a,c,find<a>,e,b> */  {
  return find_0._brk_found;
}
 
 
// select `found` operation out of effect `:find`
export function found_fs__select(hnd) /* forall<a,b,e,c> (hnd : find<a,e,c>) -> hnd/clause1<a,b,find<a>,e,c> */  {
  return hnd._brk_found;
}
 
 
// Call the `final ctl found` operation of the effect `:find`
export function found(a) /* forall<a,b> (a : a) -> (find<a>) b */  {
   
  var ev_10104 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x2 = ev_10104.hnd._brk_found;
  return _x2(ev_10104.marker, ev_10104, a);
}
 
export function find(f) /* forall<a,e> (f : () -> <find<a>|e> a) -> e a */  {
  return find_fs__handle(_Hnd_find(0, $std_core_hnd._open_none1($std_core_hnd.clause_never1, function(a /* 1268 */ ) {
          return a;
        })), function(_res /* 1268 */ ) {
      return _res;
    }, f);
}
 
 
// Maybe utilities
export function flatten(item) /* forall<a> (item : maybe<maybe<a>>) -> maybe<a> */  {
  return (item !== null) ? item.value : $std_core_types.Nothing;
}
 
export function maybe_fs_foreach(v, f) /* forall<a,e> (v : maybe<a>, f : (a) -> e ()) -> e () */  {
  if (v !== null) {
    return f(v.value);
  }
  else {
    return $std_core_types.Unit;
  }
}
 
export function is_space(c) /* (c : char) -> bool */  {
  return ((c === 0x0020)) ? true : (c === 0x0009);
}
 
export function ssize__t_fs_incr(i) /* (i : ssize_t) -> ssize_t */  {
  return (i + 1);
}
 
 
// monadic lift
export function _mlift_lift_forz_2947_10095(action, i, n, wild__) /* forall<e> (action : (ssize_t) -> e (), i : ssize_t, n : ssize_t, wild_ : ()) -> e () */  {
   
  var i_0_10001 = $std_core_hnd._open_none1(ssize__t_fs_incr, i);
  return _lift_forz_2947(action, n, i_0_10001);
}
 
 
// lifted local: forz, rep
export function _lift_forz_2947(action_0, n_0, i_0) /* forall<e> (action : (ssize_t) -> e (), n : ssize_t, i : ssize_t) -> e () */  { tailcall: while(1)
{
  if ((i_0 < n_0)) {
     
    var x_10107 = action_0(i_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
        return _mlift_lift_forz_2947_10095(action_0, i_0, n_0, wild___0);
      });
    }
    else {
       
      var i_0_10001_0 = $std_core_hnd._open_none1(ssize__t_fs_incr, i_0);
      {
        // tail call
        i_0 = i_0_10001_0;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types.Unit;
  }
}}
 
 
// Executes `action` `n` times for each integer between [`0`,`n`)  (excluding `n` ).
// If `n <= 0`  the function returns without any call to `action` .
export function forz(n, action) /* forall<e> (n : ssize_t, action : (ssize_t) -> e ()) -> e () */  {
   
  var i = $std_core_hnd._open_none1($std_core_int.ssize__t, 0);
  return _lift_forz_2947(action, n, i);
}
 
export function foreach_indexedz(v, f) /* forall<a,e> (v : vector<a>, f : (ssize_t, a) -> e ()) -> e () */  {
   
  var n_10002 = ((v).length);
   
  var i = $std_core_hnd._open_none1($std_core_int.ssize__t, 0);
  return _lift_forz_2947(function(i_0 /* ssize_t */ ) {
      return f(i_0, (v)[i_0]);
    }, n_10002, i);
}
 
 
// Apply a total function `f` to each element in a vector `v`
// Since the vector consists of boxed values we can ignore type incompatibilities
// However, we also cannot allow exception effects in f, because then the vector would be left in an inconsistent state which would be observable and unreversable
// We could allow div, but then this is always div even when f is not div
export function unique_fs_map(v, f) /* forall<a,b> (v : vector<a>, f : (a) -> b) -> vector<b> */  {
  var _x3 = $std_core._unsupported_external("std/core-extras/is-vec-unique");
  if (_x3) {
     
    var n_10002 = ((v).length);
     
    var i = 0;
     
    _lift_forz_2947(function(i_0 /* ssize_t */ ) {
         
        var x_10042 = (v)[i_0];
        return (v)[i_0] = (f(x_10042));
      }, n_10002, i);
    return v;
  }
  else {
     
    var w = Array(($std_core_int.ssize__t($std_core_types._int_from_int32((((v).length))))));
     
    var n_10002_0 = ((v).length);
     
    var i_2 = 0;
     
    _lift_forz_2947(function(i_0_0 /* ssize_t */ ) {
         
        var x_0_10044 = (v)[i_0_0];
        return (w)[i_0_0] = (f(x_0_10044));
      }, n_10002_0, i_2);
    return w;
  }
}
 
 
// TODO: use core/std/exit after https://github.com/koka-lang/koka/pull/703 is released
export function exit(i) /* (i : int) -> <st<global>,console/console,div,fsys,ndet,net,ui> () */  {
  return (function(){throw(`Exited with code: ${i}`)})();
}
 
 
// Show instance for `error<t>`
export function error_fs_show(a, _implicit_fs_show) /* forall<e,a> (a : error<a>, ?show : (a) -> e string) -> e string */  {
  if (a._tag === 2) {
    return _implicit_fs_show(a.value);
  }
  else {
    return $std_core_hnd._open_none1(function(exn /* exception */ ) {
        return exn.message;
      }, a.error);
  }
}
 
export function no_effect_top(a, _implicit_fs_kk_file_line) /* forall<a> (a : () -> pure a, ?kk-file-line : string) -> a */  {
  return $std_core_exn.exn_fs__handle($std_core_exn._Hnd_exn(0, function(m /* hnd/marker<div,2101> */ , _x_at___wildcard_x654__16 /* hnd/ev<exn> */ , x /* exception */ ) {
        return $std_core_hnd.yield_to_final(m, function(_x_at___wildcard_x654__45 /* (hnd/resume-result<10004,2101>) -> div 2101 */ ) {
            var _x4 = x.message;
            return $std_core_debug.impossible(_x4, _implicit_fs_kk_file_line);
          });
      }), function(_res /* 2101 */ ) {
      return _res;
    }, a);
}
 
export function string_fs_reverse(s) /* (s : string) -> string */  {
   
  var xs_10009 = $std_core_string.list(s);
  return $std_core_string.listchar_fs_string($std_core_list.reverse_acc($std_core_types.Nil, xs_10009));
}
 
 
// monadic lift
export function _mlift_lift_nub_2948_10096(_implicit_fs__lp__eq__eq__rp_, acc, h, t, _y_x10073) /* forall<a,e> (?(==) : (a, a) -> e bool, acc : list<a>, h : a, t : list<a>, bool) -> e list<a> */  {
  if (_y_x10073) {
    return _lift_nub_2948(_implicit_fs__lp__eq__eq__rp_, t, acc);
  }
  else {
    return _lift_nub_2948(_implicit_fs__lp__eq__eq__rp_, t, $std_core_types.Cons(h, acc));
  }
}
 
 
// lifted local: nub, loop
export function _lift_nub_2948(_implicit_fs__lp__at_x_0_eq__eq__rp_, l_sq_, acc_0) /* forall<a,e> (?(==) : (a, a) -> e bool, l' : list<a>, acc : list<a>) -> e list<a> */  { tailcall: while(1)
{
  if (l_sq_ === null) {
    return $std_core_hnd._open_none1(function(xs /* list<2329> */ ) {
        return $std_core_list.reverse_acc($std_core_types.Nil, xs);
      }, acc_0);
  }
  else {
     
    var x_10111 = $std_core_list.any(acc_0, function(_eta_x26__9 /* 2329 */ ) {
        return _implicit_fs__lp__at_x_0_eq__eq__rp_(_eta_x26__9, l_sq_.head);
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10073_0 /* bool */ ) {
        return _mlift_lift_nub_2948_10096(_implicit_fs__lp__at_x_0_eq__eq__rp_, acc_0, l_sq_.head, l_sq_.tail, _y_x10073_0);
      });
    }
    else {
      if (x_10111) {
        {
          // tail call
          l_sq_ = l_sq_.tail;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          var _x5 = $std_core_types.Cons(l_sq_.head, acc_0);
          l_sq_ = l_sq_.tail;
          acc_0 = _x5;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function nub(l, _implicit_fs__lp__eq__eq__rp_) /* forall<a,e> (l : list<a>, ?(==) : (a, a) -> e bool) -> e list<a> */  {
  return _lift_nub_2948(_implicit_fs__lp__eq__eq__rp_, l, $std_core_types.Nil);
}
 
export function to_upper(c) /* (c : char) -> char */  {
   
  var s_10019 = $std_core_string.to_upper($std_core_string.char_fs_string(c));
   
  var m_10017 = $std_core_sslice.slice_fs_foreach_while($std_core_sslice.Sslice(s_10019, 0, s_10019.length), $std_core_types.Just);
  return (m_10017 === null) ? c : m_10017.value;
}
 
export function to_lower(c) /* (c : char) -> char */  {
   
  var s_10022 = $std_core_string.to_lower($std_core_string.char_fs_string(c));
   
  var m_10020 = $std_core_sslice.slice_fs_foreach_while($std_core_sslice.Sslice(s_10022, 0, s_10022.length), $std_core_types.Just);
  return (m_10020 === null) ? c : m_10020.value;
}
 
 
// lifted local: split-by, loop
export function _lift_split_by_2949(pred, sl, numchars, acc) /* (pred : (char) -> bool, sl : sslice/sslice, numchars : int, acc : ctx<list<string>>) -> list<string> */  { tailcall: while(1)
{
  var _x6 = $std_core_sslice.next(sl);
  if (_x6 === null) {
    return $std_core_types._cctx_apply(acc,($std_core_types.Nil));
  }
  else {
    var _x7 = pred(_x6.value.fst);
    if (_x7) {
       
      var slice_0_10023 = $std_core_sslice.advance(_x6.value.snd, $std_core_types._int_sub(0,numchars));
       
      var _x8 = slice_0_10023.str;
      var _x9 = slice_0_10023.start;
      var _cctx_x2513 = $std_core_types.Cons($std_core_sslice.string($std_core_sslice.extend($std_core_sslice.Sslice(_x8, _x9, 0), numchars)), undefined);
       
      var _cctx_x2514 = {obj: _cctx_x2513, field_name: "tail"};
       
      var acc_0_10028 = $std_core_types._cctx_compose(acc,($std_core_types._cctx_create(_cctx_x2513,_cctx_x2514)));
      {
        // tail call
        var _x8 = 0;
        sl = _x6.value.snd;
        numchars = _x8;
        acc = acc_0_10028;
        continue tailcall;
      }
    }
    else {
       
      var numchars_1_10030 = $std_core_types._int_add(numchars,1);
      {
        // tail call
        sl = _x6.value.snd;
        numchars = numchars_1_10030;
        continue tailcall;
      }
    }
  }
}}
 
export function split_by(s, pred) /* (s : string, pred : (char) -> bool) -> list<string> */  {
   
  var sl = $std_core_sslice.Sslice(s, 0, s.length);
   
  var acc = $std_core_types._cctx_empty();
  return _lift_split_by_2949(pred, sl, 0, acc);
}
 
 
// lifted local: vector-init-list, assigns
export function _lift_vector_init_list_2950(v, xs_sq_) /* forall<a> (v : vector<a>, xs' : list<(int, a)>) -> () */  { tailcall: while(1)
{
  if (xs_sq_ !== null) {
     
    (v)[($std_core_int.ssize__t(xs_sq_.head.fst))] = (xs_sq_.head.snd);
    {
      // tail call
      xs_sq_ = xs_sq_.tail;
      continue tailcall;
    }
  }
  else {
    return $std_core_types.Unit;
  }
}}
 
 
// Vector utilities
export function vector_init_list(n, xs) /* forall<a> (n : int, xs : list<(int, a)>) -> vector<a> */  {
   
  var v = Array(($std_core_int.ssize__t(n)));
   
  _lift_vector_init_list_2950(v, xs);
  return v;
}
 
 
// This function takes a vector `v` and a position to stop at `stop`
// If you supply a `stop` larger than the length, then the length of the vector is used instead.
// This function shouldn't be called directly unless you know exactly what you are doing.
export function unsafe_vector_clear(v, stop) /* forall<a> (v : vector<a>, stop : ssize_t) -> () */  {
  return $std_core._unsupported_external("std/core-extras/@extern-unsafe-vector-clear");
}
 
 
// This function takes a vector `v` and a `position` to clear at.
// This is all done without a bounds check, so make sure to get it right.
// This function shouldn't be called directly unless you know exactly what you are doing.
export function unsafe_vector_clear_at(v, position) /* forall<a> (v : vector<a>, position : ssize_t) -> () */  {
  return $std_core._unsupported_external("std/core-extras/@extern-unsafe-vector-clear-at");
}
 
 
// Set the element at position `index` in vector `v` without bounds check!
export function unsafe_set(v, index, value) /* forall<a> (v : vector<a>, index : int, value : a) -> vector<a> */  {
  var _x9 = $std_core._unsupported_external("std/core-extras/is-vec-unique");
  if (_x9) {
     
    (v)[($std_core_int.ssize__t(index))] = value;
    return v;
  }
  else {
     
    var v_sq_ = [...(v)];
     
    (v_sq_)[($std_core_int.ssize__t(index))] = value;
    return v_sq_;
  }
}
 
export function a_fs_unsafe_swap(v, idx1, idx2) /* forall<a> (v : vector<a>, idx1 : int, idx2 : int) -> vector<a> */  {
  var _x10 = $std_core._unsupported_external("std/core-extras/is-vec-unique");
  if (_x10) {
     
    var item1 = (v)[($std_core_int.ssize__t(idx1))];
     
    (v)[($std_core_int.ssize__t(idx1))] = ((v)[($std_core_int.ssize__t(idx2))]);
     
    (v)[($std_core_int.ssize__t(idx2))] = item1;
    return v;
  }
  else {
     
    var v_sq_ = [...(v)];
     
    var item1_0 = (v_sq_)[($std_core_int.ssize__t(idx1))];
     
    (v_sq_)[($std_core_int.ssize__t(idx1))] = ((v_sq_)[($std_core_int.ssize__t(idx2))]);
     
    (v_sq_)[($std_core_int.ssize__t(idx2))] = item1_0;
    return v_sq_;
  }
}
 
 
// This variant mutates in-place
export function unit_fs_unsafe_swap(v, idx1, idx2) /* forall<a> (v : vector<a>, idx1 : int, idx2 : int) -> () */  {
   
  var item1 = (v)[($std_core_int.ssize__t(idx1))];
   
  (v)[($std_core_int.ssize__t(idx1))] = ((v)[($std_core_int.ssize__t(idx2))]);
  return (v)[($std_core_int.ssize__t(idx2))] = item1;
}
 
export function read_byte_file(path) /* (path : string) -> vector<int8> */  {
  return $std_core._unsupported_external("std/core-extras/@extern-read-byte-file");
}