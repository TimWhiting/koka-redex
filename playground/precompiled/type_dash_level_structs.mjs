// Koka generated module: type-level/structs, koka version: 3.2.4
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
// type field
export function Field(v) /* forall<a,b> (v : b) -> field<a,b> */  {
  return v;
}
// type name
export function Name(s) /* forall<a> (s : string) -> name<a> */  {
  return s;
}
// type t-struct
export function TStruct(head_field, rest) /* forall<a,b,c> (head-field : field<a,b>, rest : c) -> t-struct<a,b,c> */  {
  return { head_field: head_field, rest: rest };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `v` constructor field of the `:field` type.
export function field_fs_v(field) /* forall<a,b> (field : field<a,b>) -> b */  {
  return field;
}
 
export function field_fs__copy(_this, v) /* forall<a,b> (field<a,b>, v : ? b) -> field<a,b> */  {
  if (v !== undefined) {
    var _x0 = v;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
 
// Automatically generated. Retrieves the `s` constructor field of the `:name` type.
export function name_fs_s(name) /* forall<a> (name : name<a>) -> string */  {
  return name;
}
 
 
// monadic lift
export function default_fs_struct_fs__mlift_show_10026(_y_x10009) /* forall<e> (list<string>) -> e string */  {
  return $std_core_types._lp__plus__plus__rp_("{", $std_core_types._lp__plus__plus__rp_($std_core_list.joinsep(_y_x10009, ","), "}"));
}
 
export function default_fs_struct_fs_show(t, _implicit_fs_a_fs_struct_show) /* forall<a,e> (t : a, ?a/struct-show : (a) -> e list<string>) -> e string */  {
   
  var x_10035 = _implicit_fs_a_fs_struct_show(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10009 /* list<string> */ ) {
      return $std_core_types._lp__plus__plus__rp_("{", $std_core_types._lp__plus__plus__rp_($std_core_list.joinsep(_y_x10009, ","), "}"));
    });
  }
  else {
    return $std_core_types._lp__plus__plus__rp_("{", $std_core_types._lp__plus__plus__rp_($std_core_list.joinsep(x_10035, ","), "}"));
  }
}
 
 
// monadic lift
export function field_fs__mlift_show_10027(_implicit_fs_name_fs_show, _y_x10010) /* forall<e,a> (?name/show : () -> name<a>, string) -> e string */  {
   
  var name_10022 = _implicit_fs_name_fs_show();
  var _x1 = name_10022;
  return $std_core_types._lp__plus__plus__rp_(_x1, $std_core_types._lp__plus__plus__rp_(":", _y_x10010));
}
 
export function field_fs_show(f, _implicit_fs_field_fs_show, _implicit_fs_name_fs_show) /* forall<e,a,b> (f : field<b,a>, ?field/show : (a) -> e string, ?name/show : () -> name<b>) -> e string */  {
   
  var _x2 = f;
  var x_10039 = _implicit_fs_field_fs_show(_x2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10010 /* string */ ) {
       
      var name_10022 = _implicit_fs_name_fs_show();
      var _x2 = name_10022;
      return $std_core_types._lp__plus__plus__rp_(_x2, $std_core_types._lp__plus__plus__rp_(":", _y_x10010));
    });
  }
  else {
     
    var name_10022_0 = _implicit_fs_name_fs_show();
    var _x3 = name_10022_0;
    return $std_core_types._lp__plus__plus__rp_(_x3, $std_core_types._lp__plus__plus__rp_(":", x_10039));
  }
}
 
 
// monadic lift
export function default_fs_mapend_fs__mlift_struct_show_10028(_y_x10011, _y_x10012) /* forall<e> (string, string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10011, $std_core_types.Cons(_y_x10012, $std_core_types.Nil));
}
 
 
// monadic lift
export function default_fs_mapend_fs__mlift_struct_show_10029(_implicit_fs_tail_fs_struct_show, t_sq_, _y_x10011) /* forall<a,e> (?tail/struct-show : (a) -> e string, t' : a, string) -> e list<string> */  {
   
  var x_10044 = _implicit_fs_tail_fs_struct_show(t_sq_);
   
  function next_10045(_y_x10012) /* (string) -> 796 list<string> */  {
    return $std_core_types.Cons(_y_x10011, $std_core_types.Cons(_y_x10012, $std_core_types.Nil));
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10045);
  }
  else {
    return next_10045(x_10044);
  }
}
 
 
// Once there is one more level of nesting (no more nested `tcons`), we can delegate to the regular `show` instance for that type (in case the user didn't add TNil)
export function default_fs_mapend_fs_struct_show(t, _implicit_fs_field_fs_show, _implicit_fs_tail_fs_struct_show) /* forall<a,b,e,c> (t : t-struct<c,a,b>, ?field/show : (field<c,a>) -> e string, ?tail/struct-show : (b) -> e string) -> e list<string> */  {
   
  var x_10048 = _implicit_fs_field_fs_show(t.head_field);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10011 /* string */ ) {
      return default_fs_mapend_fs__mlift_struct_show_10029(_implicit_fs_tail_fs_struct_show, t.rest, _y_x10011);
    });
  }
  else {
     
    var x_0_10051 = _implicit_fs_tail_fs_struct_show(t.rest);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10012 /* string */ ) {
        return $std_core_types.Cons(x_10048, $std_core_types.Cons(_y_x10012, $std_core_types.Nil));
      });
    }
    else {
      return $std_core_types.Cons(x_10048, $std_core_types.Cons(x_0_10051, $std_core_types.Nil));
    }
  }
}
 
 
// monadic lift
export function map_fs__mlift_struct_show_10030(_y_x10014, _y_x10015) /* forall<e> (string, list<string>) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10014, _y_x10015);
}
 
 
// monadic lift
export function map_fs__mlift_struct_show_10031(_implicit_fs_tail_fs_struct_show, t_sq_, _y_x10014) /* forall<a,b,e,c> (?tail/struct-show : (t-struct<c,a,b>) -> e list<string>, t' : t-struct<c,a,b>, string) -> e list<string> */  {
   
  var x_10056 = _implicit_fs_tail_fs_struct_show(t_sq_);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10015 /* list<string> */ ) {
      return $std_core_types.Cons(_y_x10014, _y_x10015);
    });
  }
  else {
    return $std_core_types.Cons(_y_x10014, x_10056);
  }
}
 
 
// Primary workhorse for showing type-level structs
// Essentially we are pattern matching on the first two levels of types to avoid ambiguity
export function map_fs_struct_show(t, _implicit_fs_field_fs_show, _implicit_fs_tail_fs_struct_show) /* forall<a,b,c,e,d,a1> (t : t-struct<d,a,t-struct<a1,b,c>>, ?field/show : (field<d,a>) -> e string, ?tail/struct-show : (t-struct<a1,b,c>) -> e list<string>) -> e list<string> */  {
   
  var x_10060 = _implicit_fs_field_fs_show(t.head_field);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10014 /* string */ ) {
      return map_fs__mlift_struct_show_10031(_implicit_fs_tail_fs_struct_show, t.rest, _y_x10014);
    });
  }
  else {
     
    var x_0_10063 = _implicit_fs_tail_fs_struct_show(t.rest);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10015 /* list<string> */ ) {
        return $std_core_types.Cons(x_10060, _y_x10015);
      });
    }
    else {
      return $std_core_types.Cons(x_10060, x_0_10063);
    }
  }
}
 
 
// monadic lift
export function nil_fs__mlift_struct_show_10032(_y_x10017) /* forall<e> (string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10017, $std_core_types.Nil);
}
 
 
// Base case for showing type-level structs: when the tail is `t-nil`, we can show the head and stop
export function nil_fs_struct_show(t, _implicit_fs_field_fs_show) /* forall<a,e,b> (t : t-struct<b,a,type-level/nil/t-nil>, ?field/show : (field<b,a>) -> e string) -> e list<string> */  {
   
  var x_10068 = _implicit_fs_field_fs_show(t.head_field);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10017 /* string */ ) {
      return $std_core_types.Cons(_y_x10017, $std_core_types.Nil);
    });
  }
  else {
    return $std_core_types.Cons(x_10068, $std_core_types.Nil);
  }
}
 
export function name_fs__copy(_this, s) /* forall<a> (name<a>, s : ? string) -> name<a> */  {
  if (s !== undefined) {
    var _x4 = s;
  }
  else {
    var _x4 = _this;
  }
  return _x4;
}
 
 
// Automatically generated. Retrieves the `head-field` constructor field of the `:t-struct` type.
export function t_struct_fs_head_field(_this) /* forall<a,b,c> (t-struct<a,b,c>) -> field<a,b> */  {
  return _this.head_field;
}
 
 
// Automatically generated. Retrieves the `rest` constructor field of the `:t-struct` type.
export function t_struct_fs_rest(_this) /* forall<a,b,c> (t-struct<a,b,c>) -> c */  {
  return _this.rest;
}
 
export function t_struct_fs__copy(_this, head_field, rest) /* forall<a,b,c> (t-struct<a,b,c>, head-field : ? (field<a,b>), rest : ? c) -> t-struct<a,b,c> */  {
  if (head_field !== undefined) {
    var _x5 = head_field;
  }
  else {
    var _x5 = _this.head_field;
  }
  if (rest !== undefined) {
    var _x6 = rest;
  }
  else {
    var _x6 = _this.rest;
  }
  return TStruct(_x5, _x6);
}
 
export function any_fs_mk_field(v) /* forall<a,b> (v : b) -> field<a,b> */  {
  return v;
}
 
export function field_fs__lp__star__colon__rp_(f1, f2) /* forall<a,b,c,d> (f1 : field<c,a>, f2 : field<d,b>) -> t-struct<c,a,t-struct<d,b,type-level/nil/t-nil>> */  {
  return TStruct(f1, TStruct(f2, $type_dash_level_nil.TNil));
}
 
export function end_fs__lp__star__colon__rp_(f1, _x_at___wildcard_x32__34) /* forall<a,b> (f1 : field<b,a>, type-level/nil/t-nil) -> t-struct<b,a,type-level/nil/t-nil> */  {
  return TStruct(f1, $type_dash_level_nil.TNil);
}
 
export function prepend_fs__lp__star__colon__rp_(f1, s) /* forall<a,b,c,d,a1> (f1 : field<c,a>, s : t-struct<d,b,a1>) -> t-struct<c,a,t-struct<d,b,a1>> */  {
  return TStruct(f1, s);
}
 
export function direct_fs_field(self) /* forall<a,b,c> (self : t-struct<b,a,c>) -> field<b,a> */  {
  return self.head_field;
}
 
export function recur_fs_field(self, _implicit_fs_field) /* forall<a,b,c,d,a1> (self : t-struct<c,a,a1>, ?field : (a1) -> field<d,b>) -> field<d,b> */  {
  var _x7 = self.rest;
  return _implicit_fs_field(_x7);
}
 
export function direct_fs_update_field(self, new_field) /* forall<a,b,c,d> (self : t-struct<c,a,d>, new-field : field<c,b>) -> t-struct<c,b,d> */  {
  var _x8 = self.rest;
  return TStruct(new_field, _x8);
}
 
export function recur_fs_update_field(self, new_field, _implicit_fs_update_field) /* forall<a,b,c,d,a1,b1> (self : t-struct<c,a,a1>, new-field : field<d,b>, ?update-field : (a1, field<d,b>) -> b1) -> t-struct<c,a,b1> */  {
  var _x9 = self.head_field;
  var _x10 = self.rest;
  return TStruct(_x9, _implicit_fs_update_field(_x10, new_field));
}
 
 
// monadic lift
export function _mlift_to_list_10033(_y_x10019, _y_x10020) /* forall<a,e> (a, list<a>) -> e list<a> */  {
  return $std_core_types.Cons(_y_x10019, _y_x10020);
}
 
 
// monadic lift
export function _mlift_to_list_10034(self, _implicit_fs_to_list, _y_x10019) /* forall<a,e,b,c,d> (self : t-struct<c,b,d>, ?to-list : (d) -> e list<a>, a) -> e list<a> */  {
   
  var _x11 = self.rest;
  var x_10072 = _implicit_fs_to_list(_x11);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10020 /* list<1986> */ ) {
      return $std_core_types.Cons(_y_x10019, _y_x10020);
    });
  }
  else {
    return $std_core_types.Cons(_y_x10019, x_10072);
  }
}
 
export function to_list(self, _implicit_fs_map_field, _implicit_fs_to_list) /* forall<a,e,b,c,d> (self : t-struct<c,b,d>, ?map-field : (b) -> e a, ?to-list : (d) -> e list<a>) -> e list<a> */  {
   
  var _x11 = self.head_field;
  var x_10076 = _implicit_fs_map_field(_x11);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10019 /* 1986 */ ) {
      return _mlift_to_list_10034(self, _implicit_fs_to_list, _y_x10019);
    });
  }
  else {
     
    var _x11 = self.rest;
    var x_0_10079 = _implicit_fs_to_list(_x11);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10020 /* list<1986> */ ) {
        return $std_core_types.Cons(x_10076, _y_x10020);
      });
    }
    else {
      return $std_core_types.Cons(x_10076, x_0_10079);
    }
  }
}