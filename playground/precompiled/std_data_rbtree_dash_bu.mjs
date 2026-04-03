// Koka generated module: std/data/rbtree-bu, koka version: 3.2.4
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
import * as $std_num_int32 from './std_num_int32.mjs';
import * as $std_data_rbtree from './std_data_rbtree.mjs';
import * as $std_data_tree_dash_common from './std_data_tree_dash_common.mjs';
import * as $std_core_undiv from './std_core_undiv.mjs';
import * as $std_core_dash_extras from './std_core_dash_extras.mjs';
 
// externals
 
// type declarations
// type tup2
export function DB(rbtree, k, v) /* forall<a,b> (rbtree : std/data/rbtree/rbtree<a,b>, k : a, v : b) -> tup2<a,b> */  {
  return { _tag: 1, rbtree: rbtree, k: k, v: v };
}
export function $T(rbtree) /* forall<a,b> (rbtree : std/data/rbtree/rbtree<a,b>) -> tup2<a,b> */  {
  return { _tag: 2, rbtree: rbtree };
}
 
// declarations
 
export function balance(z, t) /* forall<a,b> (z : std/data/rbtree/zipper<a,b>, t : std/data/rbtree/root<a,b>) -> std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
  if (z._tag === 1 && z.color === 1) {
    if (z.zip._tag === 1) {
      if (z.zip.lchild !== null && z.zip.lchild.color === 1) {
        {
          // tail call
          if (z.zip.lchild !== null) {
            var _x1 = $std_data_rbtree.Node($std_data_rbtree.Black, z.zip.lchild.left, z.zip.lchild.key, z.zip.lchild.value, z.zip.lchild.right);
          }
          else {
            var _x1 = $std_data_rbtree.Leaf;
          }
          var _x2 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
          var _x0 = $std_data_rbtree.Root($std_data_rbtree.Red, _x1, z.zip.key, z.zip.value, $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild, z.key, z.value, _x2));
          z = z.zip.zip;
          t = _x0;
          continue tailcall;
        }
      }
      else {
        var _x3 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
        return $std_data_rbtree.rebuild(z.zip.zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, z.zip.lchild, z.zip.key, z.zip.value, z.lchild), z.key, z.value, _x3));
      }
    }
    else if (z.zip._tag === 2) {
      if (z.zip.rchild !== null && z.zip.rchild.color === 1) {
        {
          // tail call
          var _x5 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
          if (z.zip.rchild !== null) {
            var _x6 = $std_data_rbtree.Node($std_data_rbtree.Black, z.zip.rchild.left, z.zip.rchild.key, z.zip.rchild.value, z.zip.rchild.right);
          }
          else {
            var _x6 = $std_data_rbtree.Leaf;
          }
          var _x4 = $std_data_rbtree.Root($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild, z.key, z.value, _x5), z.zip.key, z.zip.value, _x6);
          z = z.zip.zip;
          t = _x4;
          continue tailcall;
        }
      }
      else {
        return $std_data_rbtree.rebuild(z.zip.zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, z.lchild, z.key, z.value, t.left), t.key, t.value, $std_data_rbtree.Node($std_data_rbtree.Red, t.right, z.zip.key, z.zip.value, z.zip.rchild)));
      }
    }
    else {
      var _x7 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
      return $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild, z.key, z.value, _x7);
    }
  }
  else if (z._tag === 2 && z.color === 1) {
    if (z.zip._tag === 2) {
      if (z.zip.rchild !== null && z.zip.rchild.color === 1) {
        {
          // tail call
          var _x9 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
          if (z.zip.rchild !== null) {
            var _x10 = $std_data_rbtree.Node($std_data_rbtree.Black, z.zip.rchild.left, z.zip.rchild.key, z.zip.rchild.value, z.zip.rchild.right);
          }
          else {
            var _x10 = $std_data_rbtree.Leaf;
          }
          var _x8 = $std_data_rbtree.Root($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x9, z.key, z.value, z.rchild), z.zip.key, z.zip.value, _x10);
          z = z.zip.zip;
          t = _x8;
          continue tailcall;
        }
      }
      else {
        var _x11 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
        return $std_data_rbtree.rebuild(z.zip.zip, $std_data_rbtree.Node($std_data_rbtree.Black, _x11, z.key, z.value, $std_data_rbtree.Node($std_data_rbtree.Red, z.rchild, z.zip.key, z.zip.value, z.zip.rchild)));
      }
    }
    else if (z.zip._tag === 1) {
      if (z.zip.lchild !== null && z.zip.lchild.color === 1) {
        {
          // tail call
          if (z.zip.lchild !== null) {
            var _x13 = $std_data_rbtree.Node($std_data_rbtree.Black, z.zip.lchild.left, z.zip.lchild.key, z.zip.lchild.value, z.zip.lchild.right);
          }
          else {
            var _x13 = $std_data_rbtree.Leaf;
          }
          var _x14 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
          var _x12 = $std_data_rbtree.Root($std_data_rbtree.Red, _x13, z.zip.key, z.zip.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x14, z.key, z.value, z.rchild));
          z = z.zip.zip;
          t = _x12;
          continue tailcall;
        }
      }
      else {
        return $std_data_rbtree.rebuild(z.zip.zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, z.zip.lchild, z.zip.key, z.zip.value, t.left), t.key, t.value, $std_data_rbtree.Node($std_data_rbtree.Red, t.right, z.key, z.value, z.rchild)));
      }
    }
    else {
      var _x15 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
      return $std_data_rbtree.Node($std_data_rbtree.Black, _x15, z.key, z.value, z.rchild);
    }
  }
  else {
    var _x16 = $std_data_rbtree.Node(t.color, t.left, t.key, t.value, t.right);
    return $std_data_rbtree.rebuild(z, _x16);
  }
}}
 
 
// monadic lift
export function zip_fs__mlift_set_10098(c, l, _implicit_fs_order2, r, v, vx, z, _y_x10044) /* forall<e,a,b> (c : std/data/rbtree/color, l : std/data/rbtree/rbtree<a,b>, ?order2 : (a, a) -> e order2<a>, r : std/data/rbtree/rbtree<a,b>, v : b, vx : b, z : std/data/rbtree/zipper<a,b>, order2<a>) -> e std/data/rbtree/rbtree<a,b> */  {
  if (_y_x10044._tag === 1) {
    return zip_fs_set(l, _y_x10044.lt, v, $std_data_rbtree.ZNodeL(c, z, _y_x10044.gt, vx, r), _implicit_fs_order2);
  }
  else if (_y_x10044._tag === 3) {
    return zip_fs_set(r, _y_x10044.gt, v, $std_data_rbtree.ZNodeR(c, l, _y_x10044.lt, vx, z), _implicit_fs_order2);
  }
  else {
    return $std_core_hnd._open_none2($std_data_rbtree.rebuild, z, $std_data_rbtree.Node(c, l, _y_x10044.eq, v, r));
  }
}
 
export function zip_fs_set(t, key, v_0, z_0, _implicit_fs_order2_0) /* forall<e,a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, v : b, z : std/data/rbtree/zipper<a,b>, ?order2 : (a, a) -> e order2<a>) -> e std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
  if (t !== null) {
     
    var x_10103 = _implicit_fs_order2_0(key, t.key);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10044_0 /* order2<2004> */ ) {
        return zip_fs__mlift_set_10098(t.color, t.left, _implicit_fs_order2_0, t.right, v_0, t.value, z_0, _y_x10044_0);
      });
    }
    else {
      if (x_10103._tag === 1) {
        {
          // tail call
          var _x17 = $std_data_rbtree.ZNodeL(t.color, z_0, x_10103.gt, t.value, t.right);
          t = t.left;
          key = x_10103.lt;
          z_0 = _x17;
          continue tailcall;
        }
      }
      else if (x_10103._tag === 3) {
        {
          // tail call
          var _x18 = $std_data_rbtree.ZNodeR(t.color, t.left, x_10103.lt, t.value, z_0);
          t = t.right;
          key = x_10103.gt;
          z_0 = _x18;
          continue tailcall;
        }
      }
      else {
        return $std_core_hnd._open_none2($std_data_rbtree.rebuild, z_0, $std_data_rbtree.Node(t.color, t.left, x_10103.eq, v_0, t.right));
      }
    }
  }
  else {
    return $std_core_hnd._open_none2(balance, z_0, $std_data_rbtree.Root($std_data_rbtree.Red, $std_data_rbtree.Leaf, key, v_0, $std_data_rbtree.Leaf));
  }
}}
 
export function bu_fs_set(t, key, value, _implicit_fs_order2) /* forall<e,a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, value : b, ?order2 : (a, a) -> e order2<a>) -> e std/data/rbtree/rbtree<a,b> */  {
  return zip_fs_set(t, key, value, $std_data_rbtree.Done, _implicit_fs_order2);
}
 
 
// monadic lift
export function zip_fs__mlift_add_10099(c, l, _implicit_fs_order2, r, v, vx, z, _y_x10050) /* forall<e,a,b> (c : std/data/rbtree/color, l : std/data/rbtree/rbtree<a,b>, ?order2 : (a, a) -> e order2<a>, r : std/data/rbtree/rbtree<a,b>, v : b, vx : b, z : std/data/rbtree/zipper<a,b>, order2<a>) -> e std/data/rbtree/rbtree<a,b> */  {
  if (_y_x10050._tag === 1) {
    return zip_fs_add(l, _y_x10050.lt, v, $std_data_rbtree.ZNodeL(c, z, _y_x10050.gt, vx, r), _implicit_fs_order2);
  }
  else if (_y_x10050._tag === 3) {
    return zip_fs_add(r, _y_x10050.gt, v, $std_data_rbtree.ZNodeR(c, l, _y_x10050.lt, vx, z), _implicit_fs_order2);
  }
  else {
    return $std_core_hnd._open_none2($std_data_rbtree.rebuild, z, $std_data_rbtree.Node(c, l, _y_x10050.eq, vx, r));
  }
}
 
export function zip_fs_add(t, key, v_0, z_0, _implicit_fs_order2_0) /* forall<e,a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, v : b, z : std/data/rbtree/zipper<a,b>, ?order2 : (a, a) -> e order2<a>) -> e std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
  if (t !== null) {
     
    var x_10106 = _implicit_fs_order2_0(key, t.key);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10050_0 /* order2<3063> */ ) {
        return zip_fs__mlift_add_10099(t.color, t.left, _implicit_fs_order2_0, t.right, v_0, t.value, z_0, _y_x10050_0);
      });
    }
    else {
      if (x_10106._tag === 1) {
        {
          // tail call
          var _x19 = $std_data_rbtree.ZNodeL(t.color, z_0, x_10106.gt, t.value, t.right);
          t = t.left;
          key = x_10106.lt;
          z_0 = _x19;
          continue tailcall;
        }
      }
      else if (x_10106._tag === 3) {
        {
          // tail call
          var _x20 = $std_data_rbtree.ZNodeR(t.color, t.left, x_10106.lt, t.value, z_0);
          t = t.right;
          key = x_10106.gt;
          z_0 = _x20;
          continue tailcall;
        }
      }
      else {
        return $std_core_hnd._open_none2($std_data_rbtree.rebuild, z_0, $std_data_rbtree.Node(t.color, t.left, x_10106.eq, t.value, t.right));
      }
    }
  }
  else {
    return $std_core_hnd._open_none2(balance, z_0, $std_data_rbtree.Root($std_data_rbtree.Red, $std_data_rbtree.Leaf, key, v_0, $std_data_rbtree.Leaf));
  }
}}
 
export function bu_fs_add(t, key, value, _implicit_fs_order2) /* forall<e,a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, value : b, ?order2 : (a, a) -> e order2<a>) -> e std/data/rbtree/rbtree<a,b> */  {
  return zip_fs_add(t, key, value, $std_data_rbtree.Done, _implicit_fs_order2);
}
 
 
// monadic lift
export function zip_fs__mlift_insert_10100(c, kx_sq_, l, r, z, _y_x10059) /* forall<e,a,b> (c : std/data/rbtree/color, kx' : a, l : std/data/rbtree/rbtree<a,b>, r : std/data/rbtree/rbtree<a,b>, z : std/data/rbtree/zipper<a,b>, b) -> e std/data/rbtree/rbtree<a,b> */  {
  return $std_core_hnd._open_none2($std_data_rbtree.rebuild, z, $std_data_rbtree.Node(c, l, kx_sq_, _y_x10059, r));
}
 
 
// monadic lift
export function zip_fs__mlift_insert_10101(c_0, f, l_0, _implicit_fs_order2, r_0, vx, z_0, _y_x10056) /* forall<e,a,b> (c : std/data/rbtree/color, f : (maybe<b>) -> e b, l : std/data/rbtree/rbtree<a,b>, ?order2 : (a, a) -> e order2<a>, r : std/data/rbtree/rbtree<a,b>, vx : b, z : std/data/rbtree/zipper<a,b>, order2<a>) -> e std/data/rbtree/rbtree<a,b> */  {
  if (_y_x10056._tag === 1) {
    return zip_fs_insert(l_0, _y_x10056.lt, $std_data_rbtree.ZNodeL(c_0, z_0, _y_x10056.gt, vx, r_0), f, _implicit_fs_order2);
  }
  else if (_y_x10056._tag === 3) {
    return zip_fs_insert(r_0, _y_x10056.gt, $std_data_rbtree.ZNodeR(c_0, l_0, _y_x10056.lt, vx, z_0), f, _implicit_fs_order2);
  }
  else {
     
    var x_10109 = f($std_core_types.Just(vx));
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10059_0 /* 4046 */ ) {
        return zip_fs__mlift_insert_10100(c_0, _y_x10056.eq, l_0, r_0, z_0, _y_x10059_0);
      });
    }
    else {
      return zip_fs__mlift_insert_10100(c_0, _y_x10056.eq, l_0, r_0, z_0, x_10109);
    }
  }
}
 
 
// monadic lift
export function zip_fs__mlift_insert_10102(key, z_1, _y_x10061) /* forall<e,a,b> (key : a, z : std/data/rbtree/zipper<a,b>, b) -> e std/data/rbtree/rbtree<a,b> */  {
  return $std_core_hnd._open_none2(balance, z_1, $std_data_rbtree.Root($std_data_rbtree.Red, $std_data_rbtree.Leaf, key, _y_x10061, $std_data_rbtree.Leaf));
}
 
 
// Take a function that is called with Just the old value if it exists, or Nothing if it doesn't
export function zip_fs_insert(t, key_0, z_2, f_0, _implicit_fs_order2_0) /* forall<e,a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, z : std/data/rbtree/zipper<a,b>, f : (maybe<b>) -> e b, ?order2 : (a, a) -> e order2<a>) -> e std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
  if (t !== null) {
     
    var x_0_10111 = _implicit_fs_order2_0(key_0, t.key);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10056_0 /* order2<4045> */ ) {
        return zip_fs__mlift_insert_10101(t.color, f_0, t.left, _implicit_fs_order2_0, t.right, t.value, z_2, _y_x10056_0);
      });
    }
    else {
      if (x_0_10111._tag === 1) {
        {
          // tail call
          var _x21 = $std_data_rbtree.ZNodeL(t.color, z_2, x_0_10111.gt, t.value, t.right);
          t = t.left;
          key_0 = x_0_10111.lt;
          z_2 = _x21;
          continue tailcall;
        }
      }
      else if (x_0_10111._tag === 3) {
        {
          // tail call
          var _x22 = $std_data_rbtree.ZNodeR(t.color, t.left, x_0_10111.lt, t.value, z_2);
          t = t.right;
          key_0 = x_0_10111.gt;
          z_2 = _x22;
          continue tailcall;
        }
      }
      else {
         
        var x_1_10114 = f_0($std_core_types.Just(t.value));
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10059_1 /* 4046 */ ) {
            return zip_fs__mlift_insert_10100(t.color, x_0_10111.eq, t.left, t.right, z_2, _y_x10059_1);
          });
        }
        else {
          return $std_core_hnd._open_none2($std_data_rbtree.rebuild, z_2, $std_data_rbtree.Node(t.color, t.left, x_0_10111.eq, x_1_10114, t.right));
        }
      }
    }
  }
  else {
     
    var x_2_10117 = f_0($std_core_types.Nothing);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10061_0 /* 4046 */ ) {
        return zip_fs__mlift_insert_10102(key_0, z_2, _y_x10061_0);
      });
    }
    else {
      return $std_core_hnd._open_none2(balance, z_2, $std_data_rbtree.Root($std_data_rbtree.Red, $std_data_rbtree.Leaf, key_0, x_2_10117, $std_data_rbtree.Leaf));
    }
  }
}}
 
export function bu_fs_insert(t, key, f, _implicit_fs_order2) /* forall<e,a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, f : (maybe<b>) -> e b, ?order2 : (a, a) -> e order2<a>) -> e std/data/rbtree/rbtree<a,b> */  {
  return zip_fs_insert(t, key, $std_data_rbtree.Done, f, _implicit_fs_order2);
}
 
 
// Automatically generated. Tests for the `DB` constructor of the `:tup2` type.
export function is_db(tup2) /* forall<a,b> (tup2 : tup2<a,b>) -> bool */  {
  return (tup2._tag === 1);
}
 
 
// Automatically generated. Retrieves the `rbtree` constructor field of the `:tup2` type.
export function tup2_fs_rbtree(tup2) /* forall<a,b> (tup2 : tup2<a,b>) -> std/data/rbtree/rbtree<a,b> */  {
  return (tup2._tag === 1) ? tup2.rbtree : tup2.rbtree;
}
 
 
// Automatically generated. Tests for the `T` constructor of the `:tup2` type.
export function is_t(tup2) /* forall<a,b> (tup2 : tup2<a,b>) -> bool */  {
  return (tup2._tag === 2);
}
 
 
// Balance final zipper
export function db_balance_rebuild(zip, t) /* forall<a,b> (zip : std/data/rbtree/zipper<a,b>, t : std/data/rbtree/rbtree<a,b>) -> std/data/rbtree/rbtree<a,b> */  {
  if (t !== null && t.color === 2 && t.left !== null && t.left.color === 1 && t.left.left !== null && t.left.left.color === 1) {
    return $std_data_rbtree.rebuild(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.left.left, t.left.left.key, t.left.left.value, t.left.left.right), t.left.key, t.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.right, t.key, t.value, t.right)));
  }
  else if (t !== null && t.color === 2 && t.left !== null && t.left.color === 1 && t.left.right !== null && t.left.right.color === 1) {
    return $std_data_rbtree.rebuild(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.left, t.left.key, t.left.value, t.left.right.left), t.left.right.key, t.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.right.right, t.key, t.value, t.right)));
  }
  else if (t !== null && t.color === 2 && t.right !== null && t.right.color === 1 && t.right.left !== null && t.right.left.color === 1) {
    return $std_data_rbtree.rebuild(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left, t.key, t.value, t.right.left.left), t.right.left.key, t.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.right.left.right, t.right.key, t.right.value, t.right.right)));
  }
  else if (t !== null && t.color === 2 && t.right !== null && t.right.color === 1 && t.right.right !== null && t.right.right.color === 1) {
    return $std_data_rbtree.rebuild(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left, t.key, t.value, t.right.left), t.right.key, t.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.right.right.left, t.right.right.key, t.right.right.value, t.right.right.right)));
  }
  else {
    return $std_data_rbtree.rebuild(zip, t);
  }
}
 
 
// Double black rotation (final zipper)
export function db_rotate(z, t) /* forall<a,b> (z : std/data/rbtree/zipper<a,b>, t : std/data/rbtree/rbtree<a,b>) -> std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
   
  var db_balance_rotate_build = function(zip /* std/data/rbtree/zipper<4634,4635> */ , t_sq_ /* std/data/rbtree/rbtree<4634,4635> */ ) {
    if (t_sq_ !== null && t_sq_.left !== null && t_sq_.left.color === 1 && t_sq_.left.right !== null && t_sq_.left.right.color === 1) {
      return $std_data_rbtree.rebuild(zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.left.left, t_sq_.left.key, t_sq_.left.value, t_sq_.left.right.left), t_sq_.left.right.key, t_sq_.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.left.right.right, t_sq_.key, t_sq_.value, t_sq_.right)));
    }
    else if (t_sq_ !== null && t_sq_.right !== null && t_sq_.right.color === 1 && t_sq_.right.left !== null && t_sq_.right.left.color === 1) {
      return $std_data_rbtree.rebuild(zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.left, t_sq_.key, t_sq_.value, t_sq_.right.left.left), t_sq_.right.left.key, t_sq_.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.right.left.right, t_sq_.right.key, t_sq_.right.value, t_sq_.right.right)));
    }
    else {
      return db_rotate(zip, t_sq_);
    }
  };
  if (z._tag === 2 && z.color === 1 && z.rchild !== null && z.rchild.color === 2) {
    var _x23 = $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, t, z.key, z.value, z.rchild.left), z.rchild.key, z.rchild.value, z.rchild.right);
    if (_x23 !== null && _x23.color === 2 && _x23.left !== null && _x23.left.color === 1 && _x23.left.left !== null && _x23.left.left.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.left.left.left, _x23.left.left.key, _x23.left.left.value, _x23.left.left.right), _x23.left.key, _x23.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.left.right, _x23.key, _x23.value, _x23.right)));
    }
    else if (_x23 !== null && _x23.color === 2 && _x23.left !== null && _x23.left.color === 1 && _x23.left.right !== null && _x23.left.right.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.left.left, _x23.left.key, _x23.left.value, _x23.left.right.left), _x23.left.right.key, _x23.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.left.right.right, _x23.key, _x23.value, _x23.right)));
    }
    else if (_x23 !== null && _x23.color === 2 && _x23.right !== null && _x23.right.color === 1 && _x23.right.left !== null && _x23.right.left.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.left, _x23.key, _x23.value, _x23.right.left.left), _x23.right.left.key, _x23.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.right.left.right, _x23.right.key, _x23.right.value, _x23.right.right)));
    }
    else if (_x23 !== null && _x23.color === 2 && _x23.right !== null && _x23.right.color === 1 && _x23.right.right !== null && _x23.right.right.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.left, _x23.key, _x23.value, _x23.right.left), _x23.right.key, _x23.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x23.right.right.left, _x23.right.right.key, _x23.right.right.value, _x23.right.right.right)));
    }
    else {
      return $std_data_rbtree.rebuild(z.zip, _x23);
    }
  }
  else if (z._tag === 1 && z.color === 1 && z.lchild !== null && z.lchild.color === 2) {
    var _x24 = $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild.left, z.lchild.key, z.lchild.value, $std_data_rbtree.Node($std_data_rbtree.Red, z.lchild.right, z.key, z.value, t));
    if (_x24 !== null && _x24.color === 2 && _x24.left !== null && _x24.left.color === 1 && _x24.left.left !== null && _x24.left.left.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.left.left.left, _x24.left.left.key, _x24.left.left.value, _x24.left.left.right), _x24.left.key, _x24.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.left.right, _x24.key, _x24.value, _x24.right)));
    }
    else if (_x24 !== null && _x24.color === 2 && _x24.left !== null && _x24.left.color === 1 && _x24.left.right !== null && _x24.left.right.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.left.left, _x24.left.key, _x24.left.value, _x24.left.right.left), _x24.left.right.key, _x24.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.left.right.right, _x24.key, _x24.value, _x24.right)));
    }
    else if (_x24 !== null && _x24.color === 2 && _x24.right !== null && _x24.right.color === 1 && _x24.right.left !== null && _x24.right.left.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.left, _x24.key, _x24.value, _x24.right.left.left), _x24.right.left.key, _x24.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.right.left.right, _x24.right.key, _x24.right.value, _x24.right.right)));
    }
    else if (_x24 !== null && _x24.color === 2 && _x24.right !== null && _x24.right.color === 1 && _x24.right.right !== null && _x24.right.right.color === 1) {
      return $std_data_rbtree.rebuild(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.left, _x24.key, _x24.value, _x24.right.left), _x24.right.key, _x24.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x24.right.right.left, _x24.right.right.key, _x24.right.right.value, _x24.right.right.right)));
    }
    else {
      return $std_data_rbtree.rebuild(z.zip, _x24);
    }
  }
  else if (z._tag === 2 && z.color === 2 && z.rchild !== null && z.rchild.color === 2) {
    return db_balance_rotate_build(z.zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, t, z.key, z.value, z.rchild.left), z.rchild.key, z.rchild.value, z.rchild.right));
  }
  else if (z._tag === 1 && z.color === 2 && z.lchild !== null && z.lchild.color === 2) {
    return db_balance_rotate_build(z.zip, $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild.left, z.lchild.key, z.lchild.value, $std_data_rbtree.Node($std_data_rbtree.Red, z.lchild.right, z.key, z.value, t)));
  }
  else if (z._tag === 2 && z.color === 2 && z.rchild !== null && z.rchild.color === 1 && z.rchild.left !== null && z.rchild.left.color === 2) {
     
    var zip_2_10021 = $std_data_rbtree.ZNodeL($std_data_rbtree.Black, z.zip, z.rchild.key, z.rchild.value, z.rchild.right);
    var _x25 = $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, t, z.key, z.value, z.rchild.left.left), z.rchild.left.key, z.rchild.left.value, z.rchild.left.right);
    if (_x25 !== null && _x25.color === 2 && _x25.left !== null && _x25.left.color === 1 && _x25.left.left !== null && _x25.left.left.color === 1) {
      return $std_data_rbtree.rebuild(zip_2_10021, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.left.left.left, _x25.left.left.key, _x25.left.left.value, _x25.left.left.right), _x25.left.key, _x25.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.left.right, _x25.key, _x25.value, _x25.right)));
    }
    else if (_x25 !== null && _x25.color === 2 && _x25.left !== null && _x25.left.color === 1 && _x25.left.right !== null && _x25.left.right.color === 1) {
      return $std_data_rbtree.rebuild(zip_2_10021, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.left.left, _x25.left.key, _x25.left.value, _x25.left.right.left), _x25.left.right.key, _x25.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.left.right.right, _x25.key, _x25.value, _x25.right)));
    }
    else if (_x25 !== null && _x25.color === 2 && _x25.right !== null && _x25.right.color === 1 && _x25.right.left !== null && _x25.right.left.color === 1) {
      return $std_data_rbtree.rebuild(zip_2_10021, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.left, _x25.key, _x25.value, _x25.right.left.left), _x25.right.left.key, _x25.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.right.left.right, _x25.right.key, _x25.right.value, _x25.right.right)));
    }
    else if (_x25 !== null && _x25.color === 2 && _x25.right !== null && _x25.right.color === 1 && _x25.right.right !== null && _x25.right.right.color === 1) {
      return $std_data_rbtree.rebuild(zip_2_10021, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.left, _x25.key, _x25.value, _x25.right.left), _x25.right.key, _x25.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x25.right.right.left, _x25.right.right.key, _x25.right.right.value, _x25.right.right.right)));
    }
    else {
      return $std_data_rbtree.rebuild(zip_2_10021, _x25);
    }
  }
  else if (z._tag === 1 && z.color === 2 && z.lchild !== null && z.lchild.color === 1 && z.lchild.right !== null && z.lchild.right.color === 2) {
     
    var zip_3_10023 = $std_data_rbtree.ZNodeR($std_data_rbtree.Black, z.lchild.left, z.lchild.key, z.lchild.value, z.zip);
    var _x26 = $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild.right.left, z.lchild.right.key, z.lchild.right.value, $std_data_rbtree.Node($std_data_rbtree.Red, z.lchild.right.right, z.key, z.value, t));
    if (_x26 !== null && _x26.color === 2 && _x26.left !== null && _x26.left.color === 1 && _x26.left.left !== null && _x26.left.left.color === 1) {
      return $std_data_rbtree.rebuild(zip_3_10023, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.left.left.left, _x26.left.left.key, _x26.left.left.value, _x26.left.left.right), _x26.left.key, _x26.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.left.right, _x26.key, _x26.value, _x26.right)));
    }
    else if (_x26 !== null && _x26.color === 2 && _x26.left !== null && _x26.left.color === 1 && _x26.left.right !== null && _x26.left.right.color === 1) {
      return $std_data_rbtree.rebuild(zip_3_10023, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.left.left, _x26.left.key, _x26.left.value, _x26.left.right.left), _x26.left.right.key, _x26.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.left.right.right, _x26.key, _x26.value, _x26.right)));
    }
    else if (_x26 !== null && _x26.color === 2 && _x26.right !== null && _x26.right.color === 1 && _x26.right.left !== null && _x26.right.left.color === 1) {
      return $std_data_rbtree.rebuild(zip_3_10023, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.left, _x26.key, _x26.value, _x26.right.left.left), _x26.right.left.key, _x26.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.right.left.right, _x26.right.key, _x26.right.value, _x26.right.right)));
    }
    else if (_x26 !== null && _x26.color === 2 && _x26.right !== null && _x26.right.color === 1 && _x26.right.right !== null && _x26.right.right.color === 1) {
      return $std_data_rbtree.rebuild(zip_3_10023, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.left, _x26.key, _x26.value, _x26.right.left), _x26.right.key, _x26.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x26.right.right.left, _x26.right.right.key, _x26.right.right.value, _x26.right.right.right)));
    }
    else {
      return $std_data_rbtree.rebuild(zip_3_10023, _x26);
    }
  }
  else if (z._tag === 1) {
    {
      // tail call
      var _x27 = $std_data_rbtree.Node(z.color, z.lchild, z.key, z.value, t);
      z = z.zip;
      t = _x27;
      continue tailcall;
    }
  }
  else if (z._tag === 2) {
    {
      // tail call
      var _x28 = $std_data_rbtree.Node(z.color, t, z.key, z.value, z.rchild);
      z = z.zip;
      t = _x28;
      continue tailcall;
    }
  }
  else {
    if (t !== null) {
      return $std_data_rbtree.Node($std_data_rbtree.Black, t.left, t.key, t.value, t.right);
    }
    else {
      return $std_data_rbtree.Leaf;
    }
  }
}}
 
export function rebuild_no_set2(z, t, f) /* forall<a,b> (z : std/data/rbtree/zipper<a,b>, t : std/data/rbtree/rbtree<a,b>, f : (std/data/rbtree/rbtree<a,b>, bool) -> std/data/rbtree/rbtree<a,b>) -> std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
  if (z._tag === 1) {
    {
      // tail call
      var _x29 = $std_data_rbtree.Node(z.color, z.lchild, z.key, z.value, t);
      z = z.zip;
      t = _x29;
      continue tailcall;
    }
  }
  else if (z._tag === 2) {
    {
      // tail call
      var _x30 = $std_data_rbtree.Node(z.color, t, z.key, z.value, z.rchild);
      z = z.zip;
      t = _x30;
      continue tailcall;
    }
  }
  else {
    return f(t, false);
  }
}}
 
 
// Balance inner zipper
export function db_balance_rebuild_no_set(zip, t, f) /* forall<a,b> (zip : std/data/rbtree/zipper<a,b>, t : std/data/rbtree/rbtree<a,b>, f : (std/data/rbtree/rbtree<a,b>, bool) -> std/data/rbtree/rbtree<a,b>) -> std/data/rbtree/rbtree<a,b> */  {
  if (t !== null && t.color === 2 && t.left !== null && t.left.color === 1 && t.left.left !== null && t.left.left.color === 1) {
    return rebuild_no_set2(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.left.left, t.left.left.key, t.left.left.value, t.left.left.right), t.left.key, t.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.right, t.key, t.value, t.right)), f);
  }
  else if (t !== null && t.color === 2 && t.left !== null && t.left.color === 1 && t.left.right !== null && t.left.right.color === 1) {
    return rebuild_no_set2(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.left, t.left.key, t.left.value, t.left.right.left), t.left.right.key, t.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.left.right.right, t.key, t.value, t.right)), f);
  }
  else if (t !== null && t.color === 2 && t.right !== null && t.right.color === 1 && t.right.left !== null && t.right.left.color === 1) {
    return rebuild_no_set2(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left, t.key, t.value, t.right.left.left), t.right.left.key, t.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.right.left.right, t.right.key, t.right.value, t.right.right)), f);
  }
  else if (t !== null && t.color === 2 && t.right !== null && t.right.color === 1 && t.right.right !== null && t.right.right.color === 1) {
    return rebuild_no_set2(zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, t.left, t.key, t.value, t.right.left), t.right.key, t.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, t.right.right.left, t.right.right.key, t.right.right.value, t.right.right.right)), f);
  }
  else {
    return rebuild_no_set2(zip, t, f);
  }
}
 
export function db_rotate_done(z, t, f) /* forall<a,b> (z : std/data/rbtree/zipper<a,b>, t : std/data/rbtree/rbtree<a,b>, f : (std/data/rbtree/rbtree<a,b>, bool) -> std/data/rbtree/rbtree<a,b>) -> std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
   
  var db_balance_rotate_done = function(zip /* std/data/rbtree/zipper<5697,5698> */ , t_sq_ /* std/data/rbtree/rbtree<5697,5698> */ , f1 /* (std/data/rbtree/rbtree<5697,5698>, bool) -> std/data/rbtree/rbtree<5697,5698> */ ) {
    if (t_sq_ !== null && t_sq_.left !== null && t_sq_.left.color === 1 && t_sq_.left.right !== null && t_sq_.left.right.color === 1) {
      return rebuild_no_set2(zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.left.left, t_sq_.left.key, t_sq_.left.value, t_sq_.left.right.left), t_sq_.left.right.key, t_sq_.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.left.right.right, t_sq_.key, t_sq_.value, t_sq_.right)), f1);
    }
    else if (t_sq_ !== null && t_sq_.right !== null && t_sq_.right.color === 1 && t_sq_.right.left !== null && t_sq_.right.left.color === 1) {
      return rebuild_no_set2(zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.left, t_sq_.key, t_sq_.value, t_sq_.right.left.left), t_sq_.right.left.key, t_sq_.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, t_sq_.right.left.right, t_sq_.right.key, t_sq_.right.value, t_sq_.right.right)), f1);
    }
    else {
      return db_rotate_done(zip, t_sq_, f1);
    }
  };
  if (z._tag === 2 && z.color === 1 && z.rchild !== null && z.rchild.color === 2) {
    var _x31 = $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, t, z.key, z.value, z.rchild.left), z.rchild.key, z.rchild.value, z.rchild.right);
    if (_x31 !== null && _x31.color === 2 && _x31.left !== null && _x31.left.color === 1 && _x31.left.left !== null && _x31.left.left.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.left.left.left, _x31.left.left.key, _x31.left.left.value, _x31.left.left.right), _x31.left.key, _x31.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.left.right, _x31.key, _x31.value, _x31.right)), f);
    }
    else if (_x31 !== null && _x31.color === 2 && _x31.left !== null && _x31.left.color === 1 && _x31.left.right !== null && _x31.left.right.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.left.left, _x31.left.key, _x31.left.value, _x31.left.right.left), _x31.left.right.key, _x31.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.left.right.right, _x31.key, _x31.value, _x31.right)), f);
    }
    else if (_x31 !== null && _x31.color === 2 && _x31.right !== null && _x31.right.color === 1 && _x31.right.left !== null && _x31.right.left.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.left, _x31.key, _x31.value, _x31.right.left.left), _x31.right.left.key, _x31.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.right.left.right, _x31.right.key, _x31.right.value, _x31.right.right)), f);
    }
    else if (_x31 !== null && _x31.color === 2 && _x31.right !== null && _x31.right.color === 1 && _x31.right.right !== null && _x31.right.right.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.left, _x31.key, _x31.value, _x31.right.left), _x31.right.key, _x31.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x31.right.right.left, _x31.right.right.key, _x31.right.right.value, _x31.right.right.right)), f);
    }
    else {
      return rebuild_no_set2(z.zip, _x31, f);
    }
  }
  else if (z._tag === 1 && z.color === 1 && z.lchild !== null && z.lchild.color === 2) {
    var _x32 = $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild.left, z.lchild.key, z.lchild.value, $std_data_rbtree.Node($std_data_rbtree.Red, z.lchild.right, z.key, z.value, t));
    if (_x32 !== null && _x32.color === 2 && _x32.left !== null && _x32.left.color === 1 && _x32.left.left !== null && _x32.left.left.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.left.left.left, _x32.left.left.key, _x32.left.left.value, _x32.left.left.right), _x32.left.key, _x32.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.left.right, _x32.key, _x32.value, _x32.right)), f);
    }
    else if (_x32 !== null && _x32.color === 2 && _x32.left !== null && _x32.left.color === 1 && _x32.left.right !== null && _x32.left.right.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.left.left, _x32.left.key, _x32.left.value, _x32.left.right.left), _x32.left.right.key, _x32.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.left.right.right, _x32.key, _x32.value, _x32.right)), f);
    }
    else if (_x32 !== null && _x32.color === 2 && _x32.right !== null && _x32.right.color === 1 && _x32.right.left !== null && _x32.right.left.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.left, _x32.key, _x32.value, _x32.right.left.left), _x32.right.left.key, _x32.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.right.left.right, _x32.right.key, _x32.right.value, _x32.right.right)), f);
    }
    else if (_x32 !== null && _x32.color === 2 && _x32.right !== null && _x32.right.color === 1 && _x32.right.right !== null && _x32.right.right.color === 1) {
      return rebuild_no_set2(z.zip, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.left, _x32.key, _x32.value, _x32.right.left), _x32.right.key, _x32.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x32.right.right.left, _x32.right.right.key, _x32.right.right.value, _x32.right.right.right)), f);
    }
    else {
      return rebuild_no_set2(z.zip, _x32, f);
    }
  }
  else if (z._tag === 2 && z.color === 2 && z.rchild !== null && z.rchild.color === 2) {
    return db_balance_rotate_done(z.zip, $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, t, z.key, z.value, z.rchild.left), z.rchild.key, z.rchild.value, z.rchild.right), f);
  }
  else if (z._tag === 1 && z.color === 2 && z.lchild !== null && z.lchild.color === 2) {
    return db_balance_rotate_done(z.zip, $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild.left, z.lchild.key, z.lchild.value, $std_data_rbtree.Node($std_data_rbtree.Red, z.lchild.right, z.key, z.value, t)), f);
  }
  else if (z._tag === 2 && z.color === 2 && z.rchild !== null && z.rchild.color === 1 && z.rchild.left !== null && z.rchild.left.color === 2) {
     
    var zip_2_10032 = $std_data_rbtree.ZNodeL($std_data_rbtree.Black, z.zip, z.rchild.key, z.rchild.value, z.rchild.right);
    var _x33 = $std_data_rbtree.Node($std_data_rbtree.Black, $std_data_rbtree.Node($std_data_rbtree.Red, t, z.key, z.value, z.rchild.left.left), z.rchild.left.key, z.rchild.left.value, z.rchild.left.right);
    if (_x33 !== null && _x33.color === 2 && _x33.left !== null && _x33.left.color === 1 && _x33.left.left !== null && _x33.left.left.color === 1) {
      return rebuild_no_set2(zip_2_10032, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.left.left.left, _x33.left.left.key, _x33.left.left.value, _x33.left.left.right), _x33.left.key, _x33.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.left.right, _x33.key, _x33.value, _x33.right)), f);
    }
    else if (_x33 !== null && _x33.color === 2 && _x33.left !== null && _x33.left.color === 1 && _x33.left.right !== null && _x33.left.right.color === 1) {
      return rebuild_no_set2(zip_2_10032, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.left.left, _x33.left.key, _x33.left.value, _x33.left.right.left), _x33.left.right.key, _x33.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.left.right.right, _x33.key, _x33.value, _x33.right)), f);
    }
    else if (_x33 !== null && _x33.color === 2 && _x33.right !== null && _x33.right.color === 1 && _x33.right.left !== null && _x33.right.left.color === 1) {
      return rebuild_no_set2(zip_2_10032, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.left, _x33.key, _x33.value, _x33.right.left.left), _x33.right.left.key, _x33.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.right.left.right, _x33.right.key, _x33.right.value, _x33.right.right)), f);
    }
    else if (_x33 !== null && _x33.color === 2 && _x33.right !== null && _x33.right.color === 1 && _x33.right.right !== null && _x33.right.right.color === 1) {
      return rebuild_no_set2(zip_2_10032, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.left, _x33.key, _x33.value, _x33.right.left), _x33.right.key, _x33.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x33.right.right.left, _x33.right.right.key, _x33.right.right.value, _x33.right.right.right)), f);
    }
    else {
      return rebuild_no_set2(zip_2_10032, _x33, f);
    }
  }
  else if (z._tag === 1 && z.color === 2 && z.lchild !== null && z.lchild.color === 1 && z.lchild.right !== null && z.lchild.right.color === 2) {
     
    var zip_3_10035 = $std_data_rbtree.ZNodeR($std_data_rbtree.Black, z.lchild.left, z.lchild.key, z.lchild.value, z.zip);
    var _x34 = $std_data_rbtree.Node($std_data_rbtree.Black, z.lchild.right.left, z.lchild.right.key, z.lchild.right.value, $std_data_rbtree.Node($std_data_rbtree.Red, z.lchild.right.right, z.key, z.value, t));
    if (_x34 !== null && _x34.color === 2 && _x34.left !== null && _x34.left.color === 1 && _x34.left.left !== null && _x34.left.left.color === 1) {
      return rebuild_no_set2(zip_3_10035, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.left.left.left, _x34.left.left.key, _x34.left.left.value, _x34.left.left.right), _x34.left.key, _x34.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.left.right, _x34.key, _x34.value, _x34.right)), f);
    }
    else if (_x34 !== null && _x34.color === 2 && _x34.left !== null && _x34.left.color === 1 && _x34.left.right !== null && _x34.left.right.color === 1) {
      return rebuild_no_set2(zip_3_10035, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.left.left, _x34.left.key, _x34.left.value, _x34.left.right.left), _x34.left.right.key, _x34.left.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.left.right.right, _x34.key, _x34.value, _x34.right)), f);
    }
    else if (_x34 !== null && _x34.color === 2 && _x34.right !== null && _x34.right.color === 1 && _x34.right.left !== null && _x34.right.left.color === 1) {
      return rebuild_no_set2(zip_3_10035, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.left, _x34.key, _x34.value, _x34.right.left.left), _x34.right.left.key, _x34.right.left.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.right.left.right, _x34.right.key, _x34.right.value, _x34.right.right)), f);
    }
    else if (_x34 !== null && _x34.color === 2 && _x34.right !== null && _x34.right.color === 1 && _x34.right.right !== null && _x34.right.right.color === 1) {
      return rebuild_no_set2(zip_3_10035, $std_data_rbtree.Node($std_data_rbtree.Red, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.left, _x34.key, _x34.value, _x34.right.left), _x34.right.key, _x34.right.value, $std_data_rbtree.Node($std_data_rbtree.Black, _x34.right.right.left, _x34.right.right.key, _x34.right.right.value, _x34.right.right.right)), f);
    }
    else {
      return rebuild_no_set2(zip_3_10035, _x34, f);
    }
  }
  else if (z._tag === 1) {
    {
      // tail call
      var _x35 = $std_data_rbtree.Node(z.color, z.lchild, z.key, z.value, t);
      z = z.zip;
      t = _x35;
      continue tailcall;
    }
  }
  else if (z._tag === 2) {
    {
      // tail call
      var _x36 = $std_data_rbtree.Node(z.color, t, z.key, z.value, z.rchild);
      z = z.zip;
      t = _x36;
      continue tailcall;
    }
  }
  else {
    return f(t, true);
  }
}}
 
export function do_remove_inorder(c, z, l, r, rz) /* forall<a,b> (c : std/data/rbtree/color, z : std/data/rbtree/zipper<a,b>, l : std/data/rbtree/rbtree<a,b>, r : std/data/rbtree/rbtree<a,b>, rz : std/data/rbtree/zipper<a,b>) -> std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
  if (r !== null && r.color === 1 && r.left === null && r.right === null) {
    return $std_data_rbtree.rebuild(z, $std_data_rbtree.Node(c, l, r.key, r.value, $std_data_rbtree.rebuild_no_set(rz, $std_data_rbtree.Leaf)));
  }
  else if (r !== null && r.color === 2 && r.left === null && r.right !== null && r.right.color === 1) {
    return $std_data_rbtree.rebuild(z, $std_data_rbtree.Node(c, l, r.key, r.value, $std_data_rbtree.rebuild_no_set(rz, $std_data_rbtree.Node($std_data_rbtree.Black, r.right.left, r.right.key, r.right.value, r.right.right))));
  }
  else if (r !== null && r.color === 2 && r.left === null) {
    return db_rotate_done(rz, r.right, function(r_sq_ /* std/data/rbtree/rbtree<6436,6437> */ , is_double_black /* bool */ ) {
        if (is_double_black) {
          return db_rotate($std_data_rbtree.ZNodeR(c, l, r.key, r.value, z), r_sq_);
        }
        else {
          return $std_data_rbtree.rebuild($std_data_rbtree.ZNodeR(c, l, r.key, r.value, z), r_sq_);
        }
      });
  }
  else if (r !== null) {
    {
      // tail call
      var _x37 = $std_data_rbtree.ZNodeL(r.color, rz, r.key, r.value, r.right);
      r = r.left;
      rz = _x37;
      continue tailcall;
    }
  }
  else {
    return $std_data_rbtree.Leaf;
  }
}}
 
export function do_remove(c, z, l, r) /* forall<a,b> (c : std/data/rbtree/color, z : std/data/rbtree/zipper<a,b>, l : std/data/rbtree/rbtree<a,b>, r : std/data/rbtree/rbtree<a,b>) -> std/data/rbtree/rbtree<a,b> */  {
  if (l === null) {
    if (r === null) {
      if (c === 1) {
        return $std_data_rbtree.rebuild(z, $std_data_rbtree.Leaf);
      }
      else {
        return db_rotate(z, $std_data_rbtree.Leaf);
      }
    }
    else {
      if (r !== null) {
        var _x38 = $std_data_rbtree.Node($std_data_rbtree.Black, r.left, r.key, r.value, r.right);
      }
      else {
        var _x38 = $std_data_rbtree.Leaf;
      }
      return $std_data_rbtree.rebuild(z, _x38);
    }
  }
  else {
    if (r === null) {
      if (l !== null) {
        var _x39 = $std_data_rbtree.Node($std_data_rbtree.Black, l.left, l.key, l.value, l.right);
      }
      else {
        var _x39 = $std_data_rbtree.Leaf;
      }
      return $std_data_rbtree.rebuild(z, _x39);
    }
    else {
      return do_remove_inorder(c, z, l, r, $std_data_rbtree.Done);
    }
  }
}
 
export function zip_fs_remove(t, key, z, _implicit_fs_order2) /* forall<a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, z : std/data/rbtree/zipper<a,b>, ?order2 : (a, a) -> order2<a>) -> exn std/data/rbtree/rbtree<a,b> */  { tailcall: while(1)
{
  if (t !== null) {
    var _x40 = $std_core_hnd._open_none2(_implicit_fs_order2, key, t.key);
    if (_x40._tag === 1) {
      {
        // tail call
        var _x41 = $std_data_rbtree.ZNodeL(t.color, z, _x40.gt, t.value, t.right);
        t = t.left;
        key = _x40.lt;
        z = _x41;
        continue tailcall;
      }
    }
    else if (_x40._tag === 3) {
      {
        // tail call
        var _x42 = $std_data_rbtree.ZNodeR(t.color, t.left, _x40.lt, t.value, z);
        t = t.right;
        key = _x40.gt;
        z = _x42;
        continue tailcall;
      }
    }
    else {
      return $std_core_hnd._open_none4(do_remove, t.color, z, t.left, t.right);
    }
  }
  else {
    return $std_core_hnd._open_none2($std_data_rbtree.rebuild, z, $std_data_rbtree.Leaf);
  }
}}
 
export function bu_fs_remove(t, key, _implicit_fs_order2) /* forall<a,b> (t : std/data/rbtree/rbtree<a,b>, key : a, ?order2 : (a, a) -> order2<a>) -> exn std/data/rbtree/rbtree<a,b> */  {
  return zip_fs_remove(t, key, $std_data_rbtree.Done, _implicit_fs_order2);
}