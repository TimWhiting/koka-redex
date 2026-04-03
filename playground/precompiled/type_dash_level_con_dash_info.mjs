// Koka generated module: type-level/con-info, koka version: 3.2.4
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
import * as $type_dash_level_structs from './type_dash_level_structs.mjs';
import * as $type_dash_level_list from './type_dash_level_list.mjs';
import * as $type_dash_level_nil from './type_dash_level_nil.mjs';
 
// externals
 
// type declarations
// type con-info
export function Con_info(con_match, con_build) /* forall<a,b,c> (con-match : (c) -> maybe<b>, con-build : (b) -> c) -> con-info<a,b,c> */  {
  return { con_match: con_match, con_build: con_build };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `con-match` constructor field of the `:con-info` type.
export function con_info_fs_con_match(_this) /* forall<a,b,c> (con-info<a,b,c>) -> ((c) -> maybe<b>) */  {
  return _this.con_match;
}
 
 
// Automatically generated. Retrieves the `con-build` constructor field of the `:con-info` type.
export function con_info_fs_con_build(_this) /* forall<a,b,c> (con-info<a,b,c>) -> ((b) -> c) */  {
  return _this.con_build;
}
 
export function con_info_fs__copy(_this, con_match, con_build) /* forall<a,b,c> (con-info<a,b,c>, con-match : ? ((c) -> maybe<b>), con-build : ? ((b) -> c)) -> con-info<a,b,c> */  {
  if (con_match !== undefined) {
    var _x0 = con_match;
  }
  else {
    var _x0 = _this.con_match;
  }
  if (con_build !== undefined) {
    var _x1 = con_build;
  }
  else {
    var _x1 = _this.con_build;
  }
  return Con_info(_x0, _x1);
}
 
export function con_info_fs_con_name(ci, _implicit_fs_con_name) /* forall<a,b,c> (ci : con-info<a,b,c>, ?con-name : type-level/structs/name<a>) -> string */  {
  return _implicit_fs_con_name;
}
 
 
// Atom: con-info<tag, string, whole> — show as just the string value
export function atom_fs_show_con(ci, _implicit_fs_con_name) /* forall<a,b> (ci : con-info<a,string,b>, ?con-name : type-level/structs/name<a>) -> show-matcher<b> */  {
  return function(v /* 450 */ ) {
    var _x2 = ci.con_match(v);
    if (_x2 !== null) {
      return $std_core_types.Just(_x2.value);
    }
    else {
      return $std_core_types.Nothing;
    }
  };
}
 
export function end_fs_show_fields(_pat_x69__25, _implicit_fs_show) /* forall<a> (type-level/list/t-cons<a,type-level/nil/t-nil>, ?show : (a) -> div string) -> div list<string> */  {
  return $std_core_types.Cons(_implicit_fs_show(_pat_x69__25.head), $std_core_types.Nil);
}
 
 
// show-fields: walk t-cons chain showing each element
export function tcons_fs_show_fields(_pat_x65__27, _implicit_fs_show, _implicit_fs_tail_fs_show_fields) /* forall<a,b,c> (type-level/list/t-cons<a,type-level/list/t-cons<b,c>>, ?show : (a) -> div string, ?tail/show-fields : (type-level/list/t-cons<b,c>) -> div list<string>) -> div list<string> */  {
  return $std_core_types.Cons(_implicit_fs_show(_pat_x65__27.head), _implicit_fs_tail_fs_show_fields(_pat_x65__27.tail));
}
 
 
// Node: con-info<tag, t-cons<a, b>, whole> — show as "Name(fields...)"
export function node_fs_show_con(ci, _implicit_fs_con_name, _implicit_fs_show_fields) /* forall<a,b,c,d> (ci : con-info<a,type-level/list/t-cons<c,d>,b>, ?con-name : type-level/structs/name<a>, ?show-fields : (type-level/list/t-cons<c,d>) -> div list<string>) -> show-matcher<b> */  {
  return function(v /* 963 */ ) {
    var _x3 = ci.con_match(v);
    if (_x3 !== null) {
       
      var xs_10008 = _implicit_fs_show_fields(_x3.value);
      var _x4 = _implicit_fs_con_name;
      return $std_core_types.Just($std_core_types._lp__plus__plus__rp_(_x4, $std_core_types._lp__plus__plus__rp_("(", $std_core_types._lp__plus__plus__rp_($std_core_list.joinsep(xs_10008, ", "), ")"))));
    }
    else {
      return $std_core_types.Nothing;
    }
  };
}
 
 
// Nullary: con-info<tag, t-nil, whole> — show as just the name
export function nullary_fs_show_con(ci, _implicit_fs_con_name) /* forall<a,b> (ci : con-info<a,type-level/nil/t-nil,b>, ?con-name : type-level/structs/name<a>) -> show-matcher<b> */  {
  return function(v /* 1052 */ ) {
    var _x5 = ci.con_match(v);
    if (_x5 !== null && _x5.value === 1) {
      var _x6 = _implicit_fs_con_name;
      return $std_core_types.Just(_x6);
    }
    else {
      return $std_core_types.Nothing;
    }
  };
}
 
export function nil_fs_show_matchers(s, _implicit_fs_show_con) /* forall<a,b,c,e,d> (s : type-level/structs/t-struct<d,con-info<a,b,c>,type-level/nil/t-nil>, ?show-con : (con-info<a,b,c>) -> show-matcher<c>) -> e list<show-matcher<c>> */  {
   
  var _x_x1_0_10023 = $std_core_hnd._open_none1(function(_this /* type-level/structs/t-struct<1163,con-info<1159,1160,1161>,type-level/nil/t-nil> */ ) {
      return _this.head_field;
    }, s);
   
  var _x_x1_10022 = $std_core_hnd._open_none1(function(field /* type-level/structs/field<1163,con-info<1159,1160,1161>> */ ) {
      return field;
    }, _x_x1_0_10023);
  return $std_core_types.Cons($std_core_hnd._open_none1(_implicit_fs_show_con, _x_x1_10022), $std_core_types.Nil);
}
 
 
// show-matchers: t-struct traversal collecting show-matcher list
export function tstruct_fs_show_matchers(s, _implicit_fs_show_con, _implicit_fs_show_matchers) /* forall<a,b,c,d,a1,e,b1,c1,d1> (s : type-level/structs/t-struct<b1,con-info<a,c,a1>,type-level/structs/t-struct<c1,con-info<b,d,a1>,d1>>, ?show-con : (con-info<a,c,a1>) -> show-matcher<a1>, ?show-matchers : (type-level/structs/t-struct<c1,con-info<b,d,a1>,d1>) -> list<show-matcher<a1>>) -> e list<show-matcher<a1>> */  {
   
  var _x_x1_0_10026 = $std_core_hnd._open_none1(function(_this /* type-level/structs/t-struct<1380,con-info<1374,1376,1378>,type-level/structs/t-struct<1381,con-info<1375,1377,1378>,1382>> */ ) {
      return _this.head_field;
    }, s);
   
  var _x_x1_10025 = $std_core_hnd._open_none1(function(field /* type-level/structs/field<1380,con-info<1374,1376,1378>> */ ) {
      return field;
    }, _x_x1_0_10026);
   
  var _x_x1_2_10028 = $std_core_hnd._open_none1(function(_this_0 /* type-level/structs/t-struct<1380,con-info<1374,1376,1378>,type-level/structs/t-struct<1381,con-info<1375,1377,1378>,1382>> */ ) {
      return _this_0.rest;
    }, s);
  return $std_core_types.Cons($std_core_hnd._open_none1(_implicit_fs_show_con, _x_x1_10025), $std_core_hnd._open_none1(_implicit_fs_show_matchers, _x_x1_2_10028));
}
 
 
// generic-show: try each show-matcher until one matches
export function generic_show(v, matchers) /* forall<a> (v : a, matchers : list<show-matcher<a>>) -> div string */  { tailcall: while(1)
{
  if (matchers !== null) {
    var _x7 = matchers.head(v);
    if (_x7 !== null) {
      return _x7.value;
    }
    else {
      {
        // tail call
        matchers = matchers.tail;
        continue tailcall;
      }
    }
  }
  else {
    return "<unknown>";
  }
}}
 
export function derive_show(v, info, _implicit_fs_show_matchers) /* forall<a,b> (v : a, info : b, ?show-matchers : (b) -> list<show-matcher<a>>) -> div string */  {
  return generic_show(v, _implicit_fs_show_matchers(info));
}