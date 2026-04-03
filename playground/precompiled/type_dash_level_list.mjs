// Koka generated module: type-level/list, koka version: 3.2.4
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
import * as $type_dash_level_nil from './type_dash_level_nil.mjs';
 
// externals
 
// type declarations
// type t-cons
export function TCons(head, tail) /* forall<a,b> (head : a, tail : b) -> t-cons<a,b> */  {
  return { head: head, tail: tail };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `head` constructor field of the `:t-cons` type.
export function t_cons_fs_head(_this) /* forall<a,b> (t-cons<a,b>) -> a */  {
  return _this.head;
}
 
 
// Automatically generated. Retrieves the `tail` constructor field of the `:t-cons` type.
export function t_cons_fs_tail(_this) /* forall<a,b> (t-cons<a,b>) -> b */  {
  return _this.tail;
}
 
export function t_cons_fs__copy(_this, head, tail) /* forall<a,b> (t-cons<a,b>, head : ? a, tail : ? b) -> t-cons<a,b> */  {
  if (head !== undefined) {
    var _x0 = head;
  }
  else {
    var _x0 = _this.head;
  }
  if (tail !== undefined) {
    var _x1 = tail;
  }
  else {
    var _x1 = _this.tail;
  }
  return TCons(_x0, _x1);
}
 
export function _lp__plus__colon__rp_(a, rst) /* forall<a,b> (a : a, rst : b) -> t-cons<a,b> */  {
  return TCons(a, rst);
}
 
export function tcons_fs_append(_pat_x21__22, r, _implicit_fs_append) /* forall<a,b,c,d> (t-cons<a,b>, r : c, ?append : (b, c) -> d) -> t-cons<a,d> */  {
  return TCons(_pat_x21__22.head, _implicit_fs_append(_pat_x21__22.tail, r));
}
 
export function tcons_fs__lp__plus__plus__rp_(_pat_x23__20, r, _implicit_fs__lp__plus__plus__rp_) /* forall<a,b,c,d> (t-cons<a,b>, r : c, ?(++) : (b, c) -> d) -> t-cons<a,d> */  {
  return TCons(_pat_x23__20.head, _implicit_fs__lp__plus__plus__rp_(_pat_x23__20.tail, r));
}
 
export function tcons_fs_map(_pat_x26__19, _implicit_fs_mapper, _implicit_fs_map) /* forall<a,b,c,d> (t-cons<a,b>, ?mapper : (a) -> c, ?map : (b) -> d) -> t-cons<c,d> */  {
  return TCons(_implicit_fs_mapper(_pat_x26__19.head), _implicit_fs_map(_pat_x26__19.tail));
}
 
export function tcons_fs_to_list(_pat_x29__23, _implicit_fs_to_list) /* forall<a,b> (t-cons<a,b>, ?to-list : (b) -> list<a>) -> list<a> */  {
  return $std_core_types.Cons(_pat_x29__23.head, _implicit_fs_to_list(_pat_x29__23.tail));
}
 
export function map_fs__lp__eq__eq__rp_(_pat_x32__18, _pat_x32__48, _implicit_fs_a_fs__lp__eq__eq__rp_, _implicit_fs_tail_fs__lp__eq__eq__rp_) /* forall<a,b> (t-cons<a,b>, t-cons<a,b>, ?a/(==) : (a, a) -> bool, ?tail/(==) : (b, b) -> bool) -> bool */  {
  var _x2 = _implicit_fs_a_fs__lp__eq__eq__rp_(_pat_x32__18.head, _pat_x32__48.head);
  if (_x2) {
    return _implicit_fs_tail_fs__lp__eq__eq__rp_(_pat_x32__18.tail, _pat_x32__48.tail);
  }
  else {
    return false;
  }
}
 
 
// monadic lift
export function default_fs_mapend_fs__mlift_cons_show_10011(_y_x10002, _y_x10003) /* forall<e> (string, string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10002, $std_core_types.Cons(_y_x10003, $std_core_types.Nil));
}
 
 
// monadic lift
export function default_fs_mapend_fs__mlift_cons_show_10012(_implicit_fs_tail_fs_show, t_sq_, _y_x10002) /* forall<a,e> (?tail/show : (a) -> e string, t' : a, string) -> e list<string> */  {
   
  var x_10017 = _implicit_fs_tail_fs_show(t_sq_);
   
  function next_10018(_y_x10003) /* (string) -> 840 list<string> */  {
    return $std_core_types.Cons(_y_x10002, $std_core_types.Cons(_y_x10003, $std_core_types.Nil));
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10018);
  }
  else {
    return next_10018(x_10017);
  }
}
 
 
// Once there is one more level of nesting (no more nested `tcons`), we can delegate to the regular `show` instance for that type (in case the user didn't add TNil)
export function default_fs_mapend_fs_cons_show(t, _implicit_fs_a_fs_show, _implicit_fs_tail_fs_show) /* forall<a,b,e> (t : t-cons<a,b>, ?a/show : (a) -> e string, ?tail/show : (b) -> e string) -> e list<string> */  {
   
  var x_10021 = _implicit_fs_a_fs_show(t.head);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10002 /* string */ ) {
      return default_fs_mapend_fs__mlift_cons_show_10012(_implicit_fs_tail_fs_show, t.tail, _y_x10002);
    });
  }
  else {
     
    var x_0_10024 = _implicit_fs_tail_fs_show(t.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10003 /* string */ ) {
        return $std_core_types.Cons(x_10021, $std_core_types.Cons(_y_x10003, $std_core_types.Nil));
      });
    }
    else {
      return $std_core_types.Cons(x_10021, $std_core_types.Cons(x_0_10024, $std_core_types.Nil));
    }
  }
}
 
 
// monadic lift
export function map_fs__mlift_cons_show_10013(_y_x10005, _y_x10006) /* forall<e> (string, list<string>) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10005, _y_x10006);
}
 
 
// monadic lift
export function map_fs__mlift_cons_show_10014(_implicit_fs_tail_fs_cons_show, t_sq_, _y_x10005) /* forall<a,b,e> (?tail/cons-show : (t-cons<a,b>) -> e list<string>, t' : t-cons<a,b>, string) -> e list<string> */  {
   
  var x_10029 = _implicit_fs_tail_fs_cons_show(t_sq_);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10006 /* list<string> */ ) {
      return $std_core_types.Cons(_y_x10005, _y_x10006);
    });
  }
  else {
    return $std_core_types.Cons(_y_x10005, x_10029);
  }
}
 
 
// Primary workhorse for showing type-level lists
// Essentially we are pattern matching on the first two levels of types to avoid ambiguity
export function map_fs_cons_show(t, _implicit_fs_a_fs_show, _implicit_fs_tail_fs_cons_show) /* forall<a,b,c,e> (t : t-cons<a,t-cons<b,c>>, ?a/show : (a) -> e string, ?tail/cons-show : (t-cons<b,c>) -> e list<string>) -> e list<string> */  {
   
  var x_10033 = _implicit_fs_a_fs_show(t.head);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10005 /* string */ ) {
      return map_fs__mlift_cons_show_10014(_implicit_fs_tail_fs_cons_show, t.tail, _y_x10005);
    });
  }
  else {
     
    var x_0_10036 = _implicit_fs_tail_fs_cons_show(t.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10006 /* list<string> */ ) {
        return $std_core_types.Cons(x_10033, _y_x10006);
      });
    }
    else {
      return $std_core_types.Cons(x_10033, x_0_10036);
    }
  }
}
 
 
// monadic lift
export function nil_fs__mlift_cons_show_10015(_y_x10008) /* forall<e> (string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10008, $std_core_types.Nil);
}
 
 
// Base case for showing type-level lists: when the tail is `t-nil`, we can show the head and stop
export function nil_fs_cons_show(t, _implicit_fs_a_fs_show) /* forall<a,e> (t : t-cons<a,type-level/nil/t-nil>, ?a/show : (a) -> e string) -> e list<string> */  {
   
  var x_10041 = _implicit_fs_a_fs_show(t.head);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10008 /* string */ ) {
      return $std_core_types.Cons(_y_x10008, $std_core_types.Nil);
    });
  }
  else {
    return $std_core_types.Cons(x_10041, $std_core_types.Nil);
  }
}
 
 
// monadic lift
export function default_fs_cons_fs__mlift_show_10016(_y_x10010) /* forall<e> (list<string>) -> e string */  {
  return $std_core_types._lp__plus__plus__rp_("[", $std_core_types._lp__plus__plus__rp_($std_core_list.joinsep(_y_x10010, ","), "]"));
}
 
export function default_fs_cons_fs_show(t, _implicit_fs_a_fs_cons_show) /* forall<a,e> (t : a, ?a/cons-show : (a) -> e list<string>) -> e string */  {
   
  var x_10045 = _implicit_fs_a_fs_cons_show(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10010 /* list<string> */ ) {
      return $std_core_types._lp__plus__plus__rp_("[", $std_core_types._lp__plus__plus__rp_($std_core_list.joinsep(_y_x10010, ","), "]"));
    });
  }
  else {
    return $std_core_types._lp__plus__plus__rp_("[", $std_core_types._lp__plus__plus__rp_($std_core_list.joinsep(x_10045, ","), "]"));
  }
}