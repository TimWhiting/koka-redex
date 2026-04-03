// Koka generated module: std/data/rbtree, koka version: 3.2.4
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
import * as $std_os_env from './std_os_env.mjs';
import * as $std_num_random from './std_num_random.mjs';
import * as $std_num_int32 from './std_num_int32.mjs';
import * as $std_data_tree_dash_common from './std_data_tree_dash_common.mjs';
 
// externals
 
// type declarations
// type color
export const Red = 1; // color
export const Black = 2; // color
// type dhole
export const Hole = { _tag: 1 }; // dhole
// type rbtree
export const Leaf = null; // forall<a,b> rbtree<a,b>
export function Node(color, left, key, value, right) /* forall<a,b> (color : color, left : rbtree<a,b>, key : a, value : b, right : rbtree<a,b>) -> rbtree<a,b> */  {
  return { color: color, left: left, key: key, value: value, right: right };
}
// type dtree
export function DNodeR(color, lchild, key, value, dhole) /* forall<a,b> (color : color, lchild : rbtree<a,b>, key : a, value : b, dhole : dhole) -> dtree<a,b> */  {
  return { _tag: 1, color: color, lchild: lchild, key: key, value: value, dhole: dhole };
}
export function DNodeL(color, dhole, key, value, rchild) /* forall<a,b> (color : color, dhole : dhole, key : a, value : b, rchild : rbtree<a,b>) -> dtree<a,b> */  {
  return { _tag: 2, color: color, dhole: dhole, key: key, value: value, rchild: rchild };
}
export const NodeNone = { _tag: 3 }; // forall<a,b> dtree<a,b>
// type root
export function Root(color, left, key, value, right) /* forall<a,b> (color : color, left : rbtree<a,b>, key : a, value : b, right : rbtree<a,b>) -> root<a,b> */  {
  return { color: color, left: left, key: key, value: value, right: right };
}
// type zipper
export function ZNodeR(color, lchild, key, value, zip) /* forall<a,b> (color : color, lchild : rbtree<a,b>, key : a, value : b, zip : zipper<a,b>) -> zipper<a,b> */  {
  return { _tag: 1, color: color, lchild: lchild, key: key, value: value, zip: zip };
}
export function ZNodeL(color, zip, key, value, rchild) /* forall<a,b> (color : color, zip : zipper<a,b>, key : a, value : b, rchild : rbtree<a,b>) -> zipper<a,b> */  {
  return { _tag: 2, color: color, zip: zip, key: key, value: value, rchild: rchild };
}
export const Done = { _tag: 3 }; // forall<a,b> zipper<a,b>
 
// declarations
 
 
// Automatically generated. Tests for the `Red` constructor of the `:color` type.
export function is_red(color) /* (color : color) -> bool */  {
  return (color === 1);
}
 
 
// Automatically generated. Tests for the `Black` constructor of the `:color` type.
export function is_black(color) /* (color : color) -> bool */  {
  return (color === 2);
}
 
 
// Automatically generated. Tests for the `Leaf` constructor of the `:rbtree` type.
export function is_leaf(rbtree) /* forall<a,b> (rbtree : rbtree<a,b>) -> bool */  {
  return (rbtree === null);
}
 
 
// Automatically generated. Tests for the `Node` constructor of the `:rbtree` type.
export function is_node(rbtree) /* forall<a,b> (rbtree : rbtree<a,b>) -> bool */  {
  return (rbtree !== null);
}
 
 
// Automatically generated. Retrieves the `color` constructor field of the `:root` type.
export function root_fs_color(root) /* forall<a,b> (root : root<a,b>) -> color */  {
  return root.color;
}
 
 
// Automatically generated. Retrieves the `key` constructor field of the `:root` type.
export function root_fs_key(root) /* forall<a,b> (root : root<a,b>) -> a */  {
  return root.key;
}
 
 
// Automatically generated. Retrieves the `left` constructor field of the `:root` type.
export function root_fs_left(root) /* forall<a,b> (root : root<a,b>) -> rbtree<a,b> */  {
  return root.left;
}
 
 
// Automatically generated. Retrieves the `right` constructor field of the `:root` type.
export function root_fs_right(root) /* forall<a,b> (root : root<a,b>) -> rbtree<a,b> */  {
  return root.right;
}
 
 
// Automatically generated. Retrieves the `value` constructor field of the `:root` type.
export function root_fs_value(root) /* forall<a,b> (root : root<a,b>) -> b */  {
  return root.value;
}
 
export function root_fs__copy(_this, color, left, key, value, right) /* forall<a,b> (root<a,b>, color : ? color, left : ? (rbtree<a,b>), key : ? a, value : ? b, right : ? (rbtree<a,b>)) -> root<a,b> */  {
  if (color !== undefined) {
    var _x0 = color;
  }
  else {
    var _x0 = _this.color;
  }
  if (left !== undefined) {
    var _x1 = left;
  }
  else {
    var _x1 = _this.left;
  }
  if (key !== undefined) {
    var _x2 = key;
  }
  else {
    var _x2 = _this.key;
  }
  if (value !== undefined) {
    var _x3 = value;
  }
  else {
    var _x3 = _this.value;
  }
  if (right !== undefined) {
    var _x4 = right;
  }
  else {
    var _x4 = _this.right;
  }
  return Root(_x0, _x1, _x2, _x3, _x4);
}
 
 
// Automatically generated. Tests for the `ZNodeR` constructor of the `:zipper` type.
export function is_znodeR(zipper) /* forall<a,b> (zipper : zipper<a,b>) -> bool */  {
  return (zipper._tag === 1);
}
 
 
// Automatically generated. Tests for the `ZNodeL` constructor of the `:zipper` type.
export function is_znodeL(zipper) /* forall<a,b> (zipper : zipper<a,b>) -> bool */  {
  return (zipper._tag === 2);
}
 
 
// Automatically generated. Tests for the `Done` constructor of the `:zipper` type.
export function is_done(zipper) /* forall<a,b> (zipper : zipper<a,b>) -> bool */  {
  return (zipper._tag === 3);
}
 
 
// Automatically generated. Tests for the `DNodeR` constructor of the `:dtree` type.
export function is_dnodeR(dtree) /* forall<a,b> (dtree : dtree<a,b>) -> bool */  {
  return (dtree._tag === 1 && dtree.dhole._tag === 1);
}
 
 
// Automatically generated. Tests for the `DNodeL` constructor of the `:dtree` type.
export function is_dnodeL(dtree) /* forall<a,b> (dtree : dtree<a,b>) -> bool */  {
  return (dtree._tag === 2 && dtree.dhole._tag === 1);
}
 
 
// Automatically generated. Tests for the `NodeNone` constructor of the `:dtree` type.
export function is_nodeNone(dtree) /* forall<a,b> (dtree : dtree<a,b>) -> bool */  {
  return (dtree._tag === 3);
}
 
export function dhole_fs__copy(_this) /* (dhole) -> dhole */  {
  return Hole;
}
 
 
// append a `dtree<k,v>` to a context `acc`.
export function _lp__plus__plus__rp_(acc, t) /* forall<a,b> (acc : ctx<rbtree<a,b>>, t : dtree<a,b>) -> ctx<rbtree<a,b>> */  {
  if (t._tag === 1 && t.dhole._tag === 1) {
     
    var _cctx_x861 = Node(t.color, t.lchild, t.key, t.value, undefined);
     
    var _cctx_x862 = {obj: _cctx_x861, field_name: "right"};
    return $std_core_types._cctx_compose(acc,($std_core_types._cctx_create(_cctx_x861,_cctx_x862)));
  }
  else if (t._tag === 2 && t.dhole._tag === 1) {
     
    var _cctx_x922 = Node(t.color, undefined, t.key, t.value, t.rchild);
     
    var _cctx_x923 = {obj: _cctx_x922, field_name: "left"};
    return $std_core_types._cctx_compose(acc,($std_core_types._cctx_create(_cctx_x922,_cctx_x923)));
  }
  else {
    return acc;
  }
}
 
 
// Common functionality
// TODO: Optimize
export function list(t) /* forall<a,b> (t : rbtree<a,b>) -> list<(a, b)> */  {
  if (t === null) {
    return $std_core_types.Nil;
  }
  else {
     
    var xs_10005 = list(t.left);
     
    var ys_10006 = $std_core_types.Cons($std_core_types.Tuple2(t.key, t.value), list(t.right));
    return $std_core_list.append(xs_10005, ys_10006);
  }
}
 
 
// monadic lift
export function _mlift_lookup_10117(key, l, _implicit_fs_order2, r, v, _y_x10030) /* forall<e,a,b> (key : a, l : rbtree<a,b>, ?order2 : (a, a) -> e order2<a>, r : rbtree<a,b>, v : b, order2<a>) -> e maybe<b> */  {
  if (_y_x10030._tag === 1) {
    return lookup(l, key, _implicit_fs_order2);
  }
  else if (_y_x10030._tag === 3) {
    return lookup(r, key, _implicit_fs_order2);
  }
  else {
    return $std_core_types.Just(v);
  }
}
 
export function lookup(t, key_0, _implicit_fs_order2_0) /* forall<e,a,b> (t : rbtree<a,b>, key : a, ?order2 : (a, a) -> e order2<a>) -> e maybe<b> */  { tailcall: while(1)
{
  if (t === null) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x_10135 = _implicit_fs_order2_0(key_0, t.key);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10030_0 /* order2<1463> */ ) {
        return _mlift_lookup_10117(key_0, t.left, _implicit_fs_order2_0, t.right, t.value, _y_x10030_0);
      });
    }
    else {
      if (x_10135._tag === 1) {
        {
          // tail call
          t = t.left;
          continue tailcall;
        }
      }
      else if (x_10135._tag === 3) {
        {
          // tail call
          t = t.right;
          continue tailcall;
        }
      }
      else {
        return $std_core_types.Just(t.value);
      }
    }
  }
}}
 
 
// TODO: Keep an inline size
export function tree_fs__lp__eq__eq__rp_(t1, t2, _implicit_fs_order2, _implicit_fs__lp__eq__eq__rp_) /* forall<a,b> (t1 : rbtree<a,b>, t2 : rbtree<a,b>, ?order2 : (a, a) -> order2<a>, ?(==) : (b, b) -> bool) -> bool */  {
   
  var xs_10007 = list(t1);
   
  var xs_0_10008 = list(t2);
  var _x5 = $std_core_types._int_eq(($std_core_list._lift_length_6003(xs_10007, 0)),($std_core_list._lift_length_6003(xs_0_10008, 0)));
  if (_x5) {
    return $std_core_list.all(list(t1), function(_pat_x36__54 /* (1959, 1960) */ ) {
        var _x6 = lookup(t2, _pat_x36__54.fst, _implicit_fs_order2);
        if (_x6 === null) {
          return false;
        }
        else {
          return _implicit_fs__lp__eq__eq__rp_(_pat_x36__54.snd, _x6.value);
        }
      });
  }
  else {
    return false;
  }
}
 
export function keys(t) /* forall<a,b> (t : rbtree<a,b>) -> list<a> */  {
  if (t === null) {
    return $std_core_types.Nil;
  }
  else {
     
    var xs_10009 = keys(t.left);
     
    var ys_10010 = $std_core_types.Cons(t.key, keys(t.right));
    return $std_core_list.append(xs_10009, ys_10010);
  }
}
 
export function values(t) /* forall<a,b> (t : rbtree<a,b>) -> list<b> */  {
  if (t === null) {
    return $std_core_types.Nil;
  }
  else {
     
    var xs_10011 = values(t.left);
     
    var ys_10012 = $std_core_types.Cons(t.value, values(t.right));
    return $std_core_list.append(xs_10011, ys_10012);
  }
}
 
export function empty() /* forall<a,b> () -> rbtree<a,b> */  {
  return Leaf;
}
 
export function set_black(t) /* forall<a,b> (t : rbtree<a,b>) -> rbtree<a,b> */  {
  if (t !== null) {
    return Node(Black, t.left, t.key, t.value, t.right);
  }
  else {
    return Leaf;
  }
}
 
 
// monadic lift
export function _mlift_contains_10118(key, l, _implicit_fs_order2, r, _y_x10035) /* forall<e,a,b> (key : a, l : rbtree<a,b>, ?order2 : (a, a) -> e order2<a>, r : rbtree<a,b>, order2<a>) -> e bool */  {
  if (_y_x10035._tag === 1) {
    return contains(l, key, _implicit_fs_order2);
  }
  else if (_y_x10035._tag === 3) {
    return contains(r, key, _implicit_fs_order2);
  }
  else {
    return true;
  }
}
 
export function contains(t, key_0, _implicit_fs_order2_0) /* forall<e,a,b> (t : rbtree<a,b>, key : a, ?order2 : (a, a) -> e order2<a>) -> e bool */  { tailcall: while(1)
{
  if (t === null) {
    return false;
  }
  else {
     
    var x_10138 = _implicit_fs_order2_0(key_0, t.key);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10035_0 /* order2<2525> */ ) {
        return _mlift_contains_10118(key_0, t.left, _implicit_fs_order2_0, t.right, _y_x10035_0);
      });
    }
    else {
      if (x_10138._tag === 1) {
        {
          // tail call
          t = t.left;
          continue tailcall;
        }
      }
      else if (x_10138._tag === 3) {
        {
          // tail call
          t = t.right;
          continue tailcall;
        }
      }
      else {
        return true;
      }
    }
  }
}}
 
export function rbtree_fs_is_red(t) /* forall<a,b> (t : rbtree<a,b>) -> bool */  {
  return (t !== null && t.color === 1);
}
 
 
// Helpers for other variants of the tree
export function dt_fs_is_red(t) /* forall<a,b> (t : dtree<a,b>) -> bool */  {
  if (t._tag === 1 && t.color === 1 && t.dhole._tag === 1) {
    return true;
  }
  else if (t._tag === 2 && t.color === 1 && t.dhole._tag === 1) {
    return true;
  }
  else {
    return false;
  }
}
 
 
// Cormen et al. textbook version
export function rebuild(z, t) /* forall<a,b> (z : zipper<a,b>, t : rbtree<a,b>) -> rbtree<a,b> */  { tailcall: while(1)
{
  if (z._tag === 1) {
    {
      // tail call
      var _x7 = Node(z.color, z.lchild, z.key, z.value, t);
      z = z.zip;
      t = _x7;
      continue tailcall;
    }
  }
  else if (z._tag === 2) {
    {
      // tail call
      var _x8 = Node(z.color, t, z.key, z.value, z.rchild);
      z = z.zip;
      t = _x8;
      continue tailcall;
    }
  }
  else {
    if (t !== null) {
      return Node(Black, t.left, t.key, t.value, t.right);
    }
    else {
      return Leaf;
    }
  }
}}
 
export function rebuild_no_set(z, t) /* forall<a,b> (z : zipper<a,b>, t : rbtree<a,b>) -> rbtree<a,b> */  { tailcall: while(1)
{
  if (z._tag === 1) {
    {
      // tail call
      var _x9 = Node(z.color, z.lchild, z.key, z.value, t);
      z = z.zip;
      t = _x9;
      continue tailcall;
    }
  }
  else if (z._tag === 2) {
    {
      // tail call
      var _x10 = Node(z.color, t, z.key, z.value, z.rchild);
      z = z.zip;
      t = _x10;
      continue tailcall;
    }
  }
  else {
    return t;
  }
}}
 
 
// plug an `rbtree<k,v>`` into a `dtree<k,v>`
export function _lp__plus__plus__dot__rp_(d, t) /* forall<a,b> (d : dtree<a,b>, t : rbtree<a,b>) -> rbtree<a,b> */  {
  if (d._tag === 1 && d.dhole._tag === 1) {
    return Node(d.color, d.lchild, d.key, d.value, t);
  }
  else if (d._tag === 2 && d.dhole._tag === 1) {
    return Node(d.color, t, d.key, d.value, d.rchild);
  }
  else {
    return t;
  }
}
 
export function to_node(root) /* forall<a,b> (root : root<a,b>) -> rbtree<a,b> */  {
  return Node(root.color, root.left, root.key, root.value, root.right);
}
 
export function showc(c) /* (c : color) -> string */  {
  return (c === 1) ? "r" : "b";
}
 
 
// monadic lift
export function _mlift_render_10119(_y_x10040, _y_x10041, c, _y_x10042) /* forall<e> (std/data/tree-common/render, string, c : color, std/data/tree-common/render) -> e std/data/tree-common/render */  {
   
  var _x_x2_4_10102 = $std_core_hnd._open_none1(function(c_0 /* color */ ) {
      return (c_0 === 1) ? "r" : "b";
    }, c);
   
  var _x_x2_3_10100 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "@", _x_x2_4_10102);
   
  var _x_x1_2_10096 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10041, _x_x2_3_10100);
   
  var _x_x1_1_10094 = $std_core_hnd._open_none3($std_core_string.pad_left, _x_x1_2_10096, 3);
   
  var _x_x2_0_10093 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_1_10094, "-");
   
  var _x_x2_10090 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "-", _x_x2_0_10093);
  return $std_core_hnd._open_none3($std_data_tree_dash_common.beside, _y_x10040, _x_x2_10090, _y_x10042);
}
 
 
// monadic lift
export function _mlift_render_10120(_y_x10040_0, c_1, r, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show, _y_x10041_0) /* forall<e,a,b> (std/data/tree-common/render, c : color, r : rbtree<a,b>, ?key/show : (a) -> e string, ?value/show : (b) -> e string, string) -> e std/data/tree-common/render */  {
   
  var x_10141 = render(r, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10042_0 /* std/data/tree-common/render */ ) {
      return _mlift_render_10119(_y_x10040_0, _y_x10041_0, c_1, _y_x10042_0);
    });
  }
  else {
    return _mlift_render_10119(_y_x10040_0, _y_x10041_0, c_1, x_10141);
  }
}
 
 
// monadic lift
export function _mlift_render_10121(c_2, r_0, _implicit_fs_key_fs_show_0, _implicit_fs_value_fs_show_0, x_0, _y_x10040_1) /* forall<e,a,b> (c : color, r : rbtree<a,b>, ?key/show : (a) -> e string, ?value/show : (b) -> e string, x : a, std/data/tree-common/render) -> e std/data/tree-common/render */  {
   
  var x_1_10143 = _implicit_fs_key_fs_show_0(x_0);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10041_1 /* string */ ) {
      return _mlift_render_10120(_y_x10040_1, c_2, r_0, _implicit_fs_key_fs_show_0, _implicit_fs_value_fs_show_0, _y_x10041_1);
    });
  }
  else {
    return _mlift_render_10120(_y_x10040_1, c_2, r_0, _implicit_fs_key_fs_show_0, _implicit_fs_value_fs_show_0, x_1_10143);
  }
}
 
export function render(t, _implicit_fs_key_fs_show_1, _implicit_fs_value_fs_show_1) /* forall<e,a,b> (t : rbtree<a,b>, ?key/show : (a) -> e string, ?value/show : (b) -> e string) -> e std/data/tree-common/render */  {
  if (t === null) {
    return $std_data_tree_dash_common.Render(0, $std_core_types.Nil);
  }
  else {
     
    var x_3_10145 = render(t.left, _implicit_fs_key_fs_show_1, _implicit_fs_value_fs_show_1);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10040_2 /* std/data/tree-common/render */ ) {
        return _mlift_render_10121(t.color, t.right, _implicit_fs_key_fs_show_1, _implicit_fs_value_fs_show_1, t.key, _y_x10040_2);
      });
    }
    else {
       
      var x_4_10148 = _implicit_fs_key_fs_show_1(t.key);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10041_2 /* string */ ) {
          return _mlift_render_10120(x_3_10145, t.color, t.right, _implicit_fs_key_fs_show_1, _implicit_fs_value_fs_show_1, _y_x10041_2);
        });
      }
      else {
         
        var x_5_10151 = render(t.right, _implicit_fs_key_fs_show_1, _implicit_fs_value_fs_show_1);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10042_1 /* std/data/tree-common/render */ ) {
            return _mlift_render_10119(x_3_10145, x_4_10148, t.color, _y_x10042_1);
          });
        }
        else {
           
          var _x_x2_4_10102_0 = $std_core_hnd._open_none1(function(c_0_0 /* color */ ) {
              return (c_0_0 === 1) ? "r" : "b";
            }, t.color);
           
          var _x_x2_3_10100_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "@", _x_x2_4_10102_0);
           
          var _x_x1_2_10096_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_4_10148, _x_x2_3_10100_0);
           
          var _x_x1_1_10094_0 = $std_core_hnd._open_none3($std_core_string.pad_left, _x_x1_2_10096_0, 3);
           
          var _x_x2_0_10093_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_1_10094_0, "-");
           
          var _x_x2_10090_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "-", _x_x2_0_10093_0);
          return $std_core_hnd._open_none3($std_data_tree_dash_common.beside, x_3_10145, _x_x2_10090_0, x_5_10151);
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_show_10122(_y_x10044) /* forall<e> (std/data/tree-common/render) -> e string */  {
   
  var _x_x1_10104 = $std_core_hnd._open_none1(function(render_0 /* std/data/tree-common/render */ ) {
      return render_0.lines;
    }, _y_x10044);
  return $std_core_hnd._open_none1($std_core_list.unlines, _x_x1_10104);
}
 
export function show(t, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show) /* forall<e,a,b> (t : rbtree<a,b>, ?key/show : (a) -> e string, ?value/show : (b) -> e string) -> e string */  {
   
  var x_10154 = render(t, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10044 /* std/data/tree-common/render */ ) {
       
      var _x_x1_10104 = $std_core_hnd._open_none1(function(render_0 /* std/data/tree-common/render */ ) {
          return render_0.lines;
        }, _y_x10044);
      return $std_core_hnd._open_none1($std_core_list.unlines, _x_x1_10104);
    });
  }
  else {
     
    var _x_x1_10104_0 = $std_core_hnd._open_none1(function(render_0_0 /* std/data/tree-common/render */ ) {
        return render_0_0.lines;
      }, x_10154);
    return $std_core_hnd._open_none1($std_core_list.unlines, _x_x1_10104_0);
  }
}
 
 
// monadic lift
export function _mlift_show_trees_10123(i, _y_x10045) /* forall<e> (i : int, string) -> e string */  {
   
  var _x_x1_1_10110 = $std_core_types._int_add(i,1);
   
  var _x_x1_0_10108 = $std_core_hnd._open_none1($std_core_int.show, _x_x1_1_10110);
   
  var _x_x2_0_10109 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, ":\n\n", _y_x10045);
   
  var _x_x2_10107 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_0_10108, _x_x2_0_10109);
  return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "rbtree<k,v> ", _x_x2_10107);
}
 
 
// monadic lift
export function _mlift_show_trees_10124(_y_x10046) /* forall<e> (list<string>) -> e string */  {
  return $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10046, "\n\n");
}
 
export function show_trees(ts, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show) /* forall<e,a,b> (ts : list<rbtree<a,b>>, ?key/show : (a) -> e string, ?value/show : (b) -> e string) -> e string */  {
   
  var x_10158 = $std_core_list.map_indexed(ts, function(i /* int */ , t /* rbtree<3926,3927> */ ) {
       
      var x_0_10161 = show(t, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10045 /* string */ ) {
          return _mlift_show_trees_10123(i, _y_x10045);
        });
      }
      else {
        return _mlift_show_trees_10123(i, x_0_10161);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10046 /* list<string> */ ) {
      return $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10046, "\n\n");
    });
  }
  else {
    return $std_core_hnd._open_none2($std_core_list.joinsep, x_10158, "\n\n");
  }
}
 
 
// monadic lift
export function _mlift_print_10125(_y_x10047) /* forall<e> (string) -> <alloc<global>,console/console,div,exn,fsys,ndet,net,read<global>,ui,write<global>|e> () */  {
  return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10047);
}
 
export function print(t, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show) /* forall<e,a,b> (t : rbtree<a,b>, ?key/show : (a) -> <io|e> string, ?value/show : (b) -> <io|e> string) -> <io|e> () */  {
   
  var x_10164 = show(t, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10047 /* string */ ) {
      return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10047);
    });
  }
  else {
    return $std_core_hnd._open_none1($std_core_console.printsln, x_10164);
  }
}
 
 
// monadic lift
export function _mlift_print_trees_10126(_y_x10048) /* forall<e> (string) -> <alloc<global>,console/console,div,exn,fsys,ndet,net,read<global>,ui,write<global>|e> () */  {
  return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10048);
}
 
export function print_trees(ts, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show) /* forall<e,a,b> (ts : list<rbtree<a,b>>, ?key/show : (a) -> <io|e> string, ?value/show : (b) -> <io|e> string) -> <io|e> () */  {
   
  var x_10168 = show_trees(ts, _implicit_fs_key_fs_show, _implicit_fs_value_fs_show);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10048 /* string */ ) {
      return $std_core_hnd._open_none1($std_core_console.printsln, _y_x10048);
    });
  }
  else {
    return $std_core_hnd._open_none1($std_core_console.printsln, x_10168);
  }
}
 
 
// `d` is the default value for leaf nodes, `f` combines
export function bu_fs_fold(t, d, f) /* forall<a,b,c> (t : rbtree<b,c>, d : a, f : (a, a, b, c) -> a) -> a */  {
  if (t === null) {
    return d;
  }
  else if (t !== null && t.left === null) {
    return f(bu_fs_fold(t.right, d, f), d, t.key, t.value);
  }
  else if (t !== null && t.right === null) {
    return f(bu_fs_fold(t.left, d, f), d, t.key, t.value);
  }
  else {
    return f(bu_fs_fold(t.right, d, f), bu_fs_fold(t.left, d, f), t.key, t.value);
  }
}
 
 
// `acc` is the accumulated value, `f` combines
export function buacc_fs_fold(t, acc, f) /* forall<a,b,c> (t : rbtree<b,c>, acc : a, f : (a, b, c) -> a) -> a */  {
  if (t === null) {
    return acc;
  }
  else if (t !== null && t.left === null) {
    return f(buacc_fs_fold(t.right, acc, f), t.key, t.value);
  }
  else if (t !== null && t.right === null) {
    return f(buacc_fs_fold(t.left, acc, f), t.key, t.value);
  }
  else {
    return f(buacc_fs_fold(t.right, buacc_fs_fold(t.left, acc, f), f), t.key, t.value);
  }
}
 
 
// `acc` is the accumulated value, `f` combines
export function td_fs_fold(t, acc, f) /* forall<a,b,c> (t : rbtree<b,c>, acc : a, f : (a, b, c) -> a) -> a */  { tailcall: while(1)
{
  if (t === null) {
    return acc;
  }
  else {
     
    var res = td_fs_fold(t.right, f(acc, t.key, t.value), f);
    {
      // tail call
      t = t.left;
      acc = res;
      continue tailcall;
    }
  }
}}
 
 
// `acc` is the accumulated value, `f` combines
export function tdzip_fs_fold(t, acc, c, f) /* forall<a,b,c> (t : rbtree<a,b>, acc : c, c : zipper<a,b>, f : (c, a, b) -> c) -> div c */  { tailcall: while(1)
{
  if (t === null) {
    if (c._tag === 3) {
      return acc;
    }
    else if (c._tag === 2) {
      {
        // tail call
        t = c.rchild;
        c = c.zip;
        continue tailcall;
      }
    }
    else {
      {
        // tail call
        t = c.lchild;
        c = c.zip;
        continue tailcall;
      }
    }
  }
  else {
    {
      // tail call
      var _x11 = f(acc, t.key, t.value);
      var _x12 = ZNodeR(t.color, t.left, t.key, t.value, c);
      t = t.right;
      acc = _x11;
      c = _x12;
      continue tailcall;
    }
  }
}}
 
 
// monadic lift
export function keyvalue_fs__mlift_trmc_map_10127(_acc, _trmc_x10014, c, f, k, r, _trmc_x10015) /* forall<e,a,b,c> (ctx<rbtree<a,c>>, rbtree<a,c>, c : color, f : (a, b) -> e c, k : a, r : rbtree<a,b>, c) -> e rbtree<a,c> */  {
   
  var _trmc_x10016 = undefined;
   
  var _trmc_x10017 = Node(c, _trmc_x10014, k, _trmc_x10015, _trmc_x10016);
  return keyvalue_fs__trmc_map(r, f, $std_core_types._cctx_extend(_acc,_trmc_x10017,({obj: _trmc_x10017, field_name: "right"})));
}
 
 
// monadic lift
export function keyvalue_fs__mlift_trmc_map_10128(_acc_0, c_0, f_0, k_0, r_0, v, _trmc_x10014_0) /* forall<e,a,b,c> (ctx<rbtree<a,c>>, c : color, f : (a, b) -> e c, k : a, r : rbtree<a,b>, v : b, rbtree<a,c>) -> e rbtree<a,c> */  {
   
  var x_10172 = f_0(k_0, v);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_trmc_x10015_0 /* 5616 */ ) {
      return keyvalue_fs__mlift_trmc_map_10127(_acc_0, _trmc_x10014_0, c_0, f_0, k_0, r_0, _trmc_x10015_0);
    });
  }
  else {
    return keyvalue_fs__mlift_trmc_map_10127(_acc_0, _trmc_x10014_0, c_0, f_0, k_0, r_0, x_10172);
  }
}
 
 
// monadic lift
export function keyvalue_fs__mlift_trmcm_map_10129(_accm, _trmc_x10020, c_1, f_1, k_1, r_1, _trmc_x10021) /* forall<e,a,b,c> ((rbtree<a,c>) -> rbtree<a,c>, rbtree<a,c>, c : color, f : (a, b) -> e c, k : a, r : rbtree<a,b>, c) -> e rbtree<a,c> */  {
  return keyvalue_fs__trmcm_map(r_1, f_1, function(_trmc_x10019 /* rbtree<5614,5616> */ ) {
      return _accm(Node(c_1, _trmc_x10020, k_1, _trmc_x10021, _trmc_x10019));
    });
}
 
 
// monadic lift
export function keyvalue_fs__mlift_trmcm_map_10130(_accm_0, c_2, f_2, k_2, r_2, v_0, _trmc_x10020_0) /* forall<e,a,b,c> ((rbtree<a,c>) -> rbtree<a,c>, c : color, f : (a, b) -> e c, k : a, r : rbtree<a,b>, v : b, rbtree<a,c>) -> e rbtree<a,c> */  {
   
  var x_0_10174 = f_2(k_2, v_0);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_trmc_x10021_0 /* 5616 */ ) {
      return keyvalue_fs__mlift_trmcm_map_10129(_accm_0, _trmc_x10020_0, c_2, f_2, k_2, r_2, _trmc_x10021_0);
    });
  }
  else {
    return keyvalue_fs__mlift_trmcm_map_10129(_accm_0, _trmc_x10020_0, c_2, f_2, k_2, r_2, x_0_10174);
  }
}
 
export function keyvalue_fs__trmc_map(t, f_3, _acc_1) /* forall<e,a,b,c> (t : rbtree<a,b>, f : (a, b) -> e c, ctx<rbtree<a,c>>) -> e rbtree<a,c> */  { tailcall: while(1)
{
  if (t === null) {
    return $std_core_types._cctx_apply(_acc_1,Leaf);
  }
  else {
     
    var x_1_10176 = keyvalue_fs_map(t.left, f_3);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_trmc_x10014_1 /* rbtree<5614,5616> */ ) {
        return keyvalue_fs__mlift_trmc_map_10128(_acc_1, t.color, f_3, t.key, t.right, t.value, _trmc_x10014_1);
      });
    }
    else {
       
      var x_2_10179 = f_3(t.key, t.value);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_trmc_x10015_1 /* 5616 */ ) {
          return keyvalue_fs__mlift_trmc_map_10127(_acc_1, x_1_10176, t.color, f_3, t.key, t.right, _trmc_x10015_1);
        });
      }
      else {
         
        var _trmc_x10016_0 = undefined;
         
        var _trmc_x10017_0 = Node(t.color, x_1_10176, t.key, x_2_10179, _trmc_x10016_0);
        {
          // tail call
          var _x13 = $std_core_types._cctx_extend(_acc_1,_trmc_x10017_0,({obj: _trmc_x10017_0, field_name: "right"}));
          t = t.right;
          _acc_1 = _x13;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function keyvalue_fs__trmcm_map(t_0, f_4, _accm_1) /* forall<e,a,b,c> (t : rbtree<a,b>, f : (a, b) -> e c, (rbtree<a,c>) -> rbtree<a,c>) -> e rbtree<a,c> */  { tailcall: while(1)
{
  if (t_0 === null) {
    return _accm_1(Leaf);
  }
  else {
     
    var x_3_10182 = keyvalue_fs_map(t_0.left, f_4);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_trmc_x10020_1 /* rbtree<5614,5616> */ ) {
        return keyvalue_fs__mlift_trmcm_map_10130(_accm_1, t_0.color, f_4, t_0.key, t_0.right, t_0.value, _trmc_x10020_1);
      });
    }
    else {
       
      var x_4_10185 = f_4(t_0.key, t_0.value);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_trmc_x10021_1 /* 5616 */ ) {
          return keyvalue_fs__mlift_trmcm_map_10129(_accm_1, x_3_10182, t_0.color, f_4, t_0.key, t_0.right, _trmc_x10021_1);
        });
      }
      else {
        {
          // tail call
          var _x19 = function(__at_accm_114 /* (rbtree<5614,5616>) -> rbtree<5614,5616> */ , _c_415 /* color */ , _k_416 /* 5614 */ , _x_3_1018217 /* rbtree<5614,5616> */ , _x_4_1018518 /* 5616 */ ) {
            return function(_trmc_x10019_0 /* rbtree<5614,5616> */ ) {
              return __at_accm_114(Node(_c_415, _x_3_1018217, _k_416, _x_4_1018518, _trmc_x10019_0));
            };
          }(_accm_1, t_0.color, t_0.key, x_3_10182, x_4_10185);
          t_0 = t_0.right;
          _accm_1 = _x19;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function keyvalue_fs_map(t_1, f_5) /* forall<e,a,b,c> (t : rbtree<a,b>, f : (a, b) -> e c) -> e rbtree<a,c> */  {
  var _x20 = $std_core_hnd._evv_is_affine();
  if (_x20) {
    return keyvalue_fs__trmc_map(t_1, f_5, $std_core_types._cctx_empty());
  }
  else {
    return keyvalue_fs__trmcm_map(t_1, f_5, function(_trmc_x10018 /* rbtree<5614,5616> */ ) {
        return _trmc_x10018;
      });
  }
}
 
 
// monadic lift
export function rb_fs__mlift_trmc_map_10131(_acc, _trmc_x10022, c, f, k, r, _trmc_x10023) /* forall<e,a,b,c> (ctx<rbtree<a,c>>, rbtree<a,c>, c : color, f : (b) -> e c, k : a, r : rbtree<a,b>, c) -> e rbtree<a,c> */  {
   
  var _trmc_x10024 = undefined;
   
  var _trmc_x10025 = Node(c, _trmc_x10022, k, _trmc_x10023, _trmc_x10024);
  return rb_fs__trmc_map(r, f, $std_core_types._cctx_extend(_acc,_trmc_x10025,({obj: _trmc_x10025, field_name: "right"})));
}
 
 
// monadic lift
export function rb_fs__mlift_trmc_map_10132(_acc_0, c_0, f_0, k_0, r_0, v, _trmc_x10022_0) /* forall<e,a,b,c> (ctx<rbtree<a,c>>, c : color, f : (b) -> e c, k : a, r : rbtree<a,b>, v : b, rbtree<a,c>) -> e rbtree<a,c> */  {
   
  var x_10188 = f_0(v);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_trmc_x10023_0 /* 5960 */ ) {
      return rb_fs__mlift_trmc_map_10131(_acc_0, _trmc_x10022_0, c_0, f_0, k_0, r_0, _trmc_x10023_0);
    });
  }
  else {
    return rb_fs__mlift_trmc_map_10131(_acc_0, _trmc_x10022_0, c_0, f_0, k_0, r_0, x_10188);
  }
}
 
 
// monadic lift
export function rb_fs__mlift_trmcm_map_10133(_accm, _trmc_x10028, c_1, f_1, k_1, r_1, _trmc_x10029) /* forall<e,a,b,c> ((rbtree<a,c>) -> rbtree<a,c>, rbtree<a,c>, c : color, f : (b) -> e c, k : a, r : rbtree<a,b>, c) -> e rbtree<a,c> */  {
  return rb_fs__trmcm_map(r_1, f_1, function(_trmc_x10027 /* rbtree<5958,5960> */ ) {
      return _accm(Node(c_1, _trmc_x10028, k_1, _trmc_x10029, _trmc_x10027));
    });
}
 
 
// monadic lift
export function rb_fs__mlift_trmcm_map_10134(_accm_0, c_2, f_2, k_2, r_2, v_0, _trmc_x10028_0) /* forall<e,a,b,c> ((rbtree<a,c>) -> rbtree<a,c>, c : color, f : (b) -> e c, k : a, r : rbtree<a,b>, v : b, rbtree<a,c>) -> e rbtree<a,c> */  {
   
  var x_0_10190 = f_2(v_0);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_trmc_x10029_0 /* 5960 */ ) {
      return rb_fs__mlift_trmcm_map_10133(_accm_0, _trmc_x10028_0, c_2, f_2, k_2, r_2, _trmc_x10029_0);
    });
  }
  else {
    return rb_fs__mlift_trmcm_map_10133(_accm_0, _trmc_x10028_0, c_2, f_2, k_2, r_2, x_0_10190);
  }
}
 
 
// TODO: Optimize
export function rb_fs__trmc_map(t, f_3, _acc_1) /* forall<e,a,b,c> (t : rbtree<a,b>, f : (b) -> e c, ctx<rbtree<a,c>>) -> e rbtree<a,c> */  { tailcall: while(1)
{
  if (t === null) {
    return $std_core_types._cctx_apply(_acc_1,Leaf);
  }
  else {
     
    var x_1_10192 = rb_fs_map(t.left, f_3);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_trmc_x10022_1 /* rbtree<5958,5960> */ ) {
        return rb_fs__mlift_trmc_map_10132(_acc_1, t.color, f_3, t.key, t.right, t.value, _trmc_x10022_1);
      });
    }
    else {
       
      var x_2_10195 = f_3(t.value);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_trmc_x10023_1 /* 5960 */ ) {
          return rb_fs__mlift_trmc_map_10131(_acc_1, x_1_10192, t.color, f_3, t.key, t.right, _trmc_x10023_1);
        });
      }
      else {
         
        var _trmc_x10024_0 = undefined;
         
        var _trmc_x10025_0 = Node(t.color, x_1_10192, t.key, x_2_10195, _trmc_x10024_0);
        {
          // tail call
          var _x21 = $std_core_types._cctx_extend(_acc_1,_trmc_x10025_0,({obj: _trmc_x10025_0, field_name: "right"}));
          t = t.right;
          _acc_1 = _x21;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// TODO: Optimize
export function rb_fs__trmcm_map(t_0, f_4, _accm_1) /* forall<e,a,b,c> (t : rbtree<a,b>, f : (b) -> e c, (rbtree<a,c>) -> rbtree<a,c>) -> e rbtree<a,c> */  { tailcall: while(1)
{
  if (t_0 === null) {
    return _accm_1(Leaf);
  }
  else {
     
    var x_3_10198 = rb_fs_map(t_0.left, f_4);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_trmc_x10028_1 /* rbtree<5958,5960> */ ) {
        return rb_fs__mlift_trmcm_map_10134(_accm_1, t_0.color, f_4, t_0.key, t_0.right, t_0.value, _trmc_x10028_1);
      });
    }
    else {
       
      var x_4_10201 = f_4(t_0.value);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_trmc_x10029_1 /* 5960 */ ) {
          return rb_fs__mlift_trmcm_map_10133(_accm_1, x_3_10198, t_0.color, f_4, t_0.key, t_0.right, _trmc_x10029_1);
        });
      }
      else {
        {
          // tail call
          var _x27 = function(__at_accm_122 /* (rbtree<5958,5960>) -> rbtree<5958,5960> */ , _c_423 /* color */ , _k_424 /* 5958 */ , _x_3_1019825 /* rbtree<5958,5960> */ , _x_4_1020126 /* 5960 */ ) {
            return function(_trmc_x10027_0 /* rbtree<5958,5960> */ ) {
              return __at_accm_122(Node(_c_423, _x_3_1019825, _k_424, _x_4_1020126, _trmc_x10027_0));
            };
          }(_accm_1, t_0.color, t_0.key, x_3_10198, x_4_10201);
          t_0 = t_0.right;
          _accm_1 = _x27;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// TODO: Optimize
export function rb_fs_map(t_1, f_5) /* forall<e,a,b,c> (t : rbtree<a,b>, f : (b) -> e c) -> e rbtree<a,c> */  {
  var _x28 = $std_core_hnd._evv_is_affine();
  if (_x28) {
    return rb_fs__trmc_map(t_1, f_5, $std_core_types._cctx_empty());
  }
  else {
    return rb_fs__trmcm_map(t_1, f_5, function(_trmc_x10026 /* rbtree<5958,5960> */ ) {
        return _trmc_x10026;
      });
  }
}