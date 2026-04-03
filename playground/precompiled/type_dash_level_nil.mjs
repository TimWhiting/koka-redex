// Koka generated module: type-level/nil, koka version: 3.2.4
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
// type t-nil
export const TNil = 1; // t-nil
 
// declarations
 
export function t_nil_fs__copy(_this) /* (t-nil) -> t-nil */  {
  return TNil;
}
 
 
// List operations for t-nil
export function append(_x_at___wildcard_x15__16, r) /* forall<a> (t-nil, r : a) -> a */  {
  return r;
}
 
export function _lp__plus__plus__rp_(_x_at___wildcard_x17__14, r) /* forall<a> (t-nil, r : a) -> a */  {
  return r;
}
 
export function map(l) /* (l : t-nil) -> t-nil */  {
  return l;
}
 
export function to_list(_x_at___wildcard_x21__17) /* forall<a> (t-nil) -> list<a> */  {
  return $std_core_types.Nil;
}
 
export function _lp__eq__eq__rp_(_x_at___wildcard_x23__14, _x_at___wildcard_x23__24) /* (t-nil, t-nil) -> bool */  {
  return true;
}
 
 
// Show instances for t-nil
export function strlist_fs_show(_x_at___wildcard_x27__22) /* (t-nil) -> list<string> */  {
  return $std_core_types.Nil;
}
 
export function default_fs_empty_fs_show(_x_at___wildcard_x29__28) /* (t-nil) -> string */  {
  return "[]";
}