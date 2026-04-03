// Koka generated module: std/data/tree-common, koka version: 3.2.4
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
// type render
export function Render(root, lines) /* (root : int, lines : list<string>) -> render */  {
  return { root: root, lines: lines };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `root` constructor field of the `:render` type.
export function render_fs_root(render) /* (render : render) -> int */  {
  return render.root;
}
 
 
// Automatically generated. Retrieves the `lines` constructor field of the `:render` type.
export function render_fs_lines(render) /* (render : render) -> list<string> */  {
  return render.lines;
}
 
export function render_fs__copy(_this, root, lines) /* (render, root : ? int, lines : ? (list<string>)) -> render */  {
  if (root !== undefined) {
    var _x0 = root;
  }
  else {
    var _x0 = _this.root;
  }
  if (lines !== undefined) {
    var _x1 = lines;
  }
  else {
    var _x1 = _this.lines;
  }
  return Render(_x0, _x1);
}
 
export function height(r) /* (r : render) -> int */  {
  var _x2 = r.lines;
  return $std_core_list._lift_length_6003(_x2, 0);
}
 
export function width(r) /* (r : render) -> int */  {
   
  var _x3 = r.lines;
  var xs_10006 = $std_core_list.map(_x3, $std_core_string.chars_fs_count);
   
  if (xs_10006 === null) {
    var _x4 = undefined;
    var j_10005 = (_x4 !== undefined) ? _x4 : 0;
  }
  else {
    var j_10005 = $std_core_list.foldl(xs_10006.tail, xs_10006.head, $std_core_int.max);
  }
  return ($std_core_types._int_ge(1,j_10005)) ? 1 : j_10005;
}
 
export function pad_render(r, n) /* (r : render, n : int) -> render */  {
   
  var _x3 = r.lines;
  var y_10014 = $std_core_list._lift_length_6003(_x3, 0);
   
  var ys_10011 = $std_core_list.replicate("", $std_core_types._int_sub(n,y_10014));
  var _x3 = r.root;
  var _x4 = r.lines;
  return Render(_x3, $std_core_list.append(_x4, ys_10011));
}
 
export function pad_height(l, r) /* (l : render, r : render) -> (render, render) */  {
   
  var _x5 = l.lines;
  var i_10018 = $std_core_list._lift_length_6003(_x5, 0);
   
  var _x6 = r.lines;
  var j_10019 = $std_core_list._lift_length_6003(_x6, 0);
   
  var h = ($std_core_types._int_ge(i_10018,j_10019)) ? i_10018 : j_10019;
  return $std_core_types.Tuple2(pad_render(l, h), pad_render(r, h));
}
 
export function fill(n, c) /* (n : int, c : char) -> string */  {
  return $std_core_string.pad_right("", n, c);
}
 
export function spaces(n) /* (n : int) -> string */  {
  return $std_core_string.pad_right("", n, 0x0020);
}
 
export function half(i) /* (i : int) -> int */  {
  if ($std_core_types._int_isodd(i)) {
     
    var x_10028 = $std_core_types._int_div(i,2);
    return $std_core_types._int_add(x_10028,1);
  }
  else {
    return $std_core_types._int_div(i,2);
  }
}
 
export function beside(l, head, r) /* (l : render, head : string, r : render) -> render */  {
  var _x5 = pad_height(l, r);
   
  var wl = width(_x5.fst);
   
  var wr = width(_x5.snd);
   
  var _x6 = l.root;
  var n_10030 = $std_core_types._int_sub(_x6,1);
   
  var _x7 = l.root;
  var x_0_10038 = $std_core_types._int_sub(wl,_x7);
   
  var n_1_10036 = $std_core_types._int_sub(x_0_10038,1);
   
  var lheader = $std_core_types._lp__plus__plus__rp_($std_core_string.pad_right("", n_10030, 0x0020), $std_core_types._lp__plus__plus__rp_("+", $std_core_string.pad_right("", n_1_10036, 0x002D)));
   
  var _x8 = r.root;
  var n_2_10043 = $std_core_types._int_sub(_x8,1);
   
  var rheader = $std_core_types._lp__plus__plus__rp_($std_core_string.pad_right("", n_2_10043, 0x002D), "+");
   
  var header = $std_core_types._lp__plus__plus__rp_(lheader, $std_core_types._lp__plus__plus__rp_(head, rheader));
   
  var n_3_10048 = $std_core_string.chars_fs_count(head);
   
  var sep = $std_core_string.pad_right("", n_3_10048, 0x0020);
   
  var _x9 = _x5.fst.lines;
  var _x10 = _x5.snd.lines;
  var under = $std_core_list.zipwith(_x9, _x10, function(ls /* string */ , rs /* string */ ) {
      return $std_core_types._lp__plus__plus__rp_($std_core_string.pad_right(ls, wl), $std_core_types._lp__plus__plus__rp_(sep, rs));
    });
   
  var x_4_10055 = $std_core_string.chars_fs_count(lheader);
   
  var y_4_10056 = $std_core_string.chars_fs_count(head);
   
  var x_3_10053 = $std_core_types._int_add(x_4_10055,y_4_10056);
   
  var newroot = $std_core_types._int_sub(x_3_10053,1);
  return Render(newroot, $std_core_types.Cons(header, under));
}