// Koka generated module: std/data/rb-set, koka version: 3.2.4
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
import * as $std_data_rbtree from './std_data_rbtree.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_data_rbtree_dash_bu from './std_data_rbtree_dash_bu.mjs';
 
// externals
 
// type declarations
// type rbset
export function Rbset(tree) /* forall<a> (tree : std/data/rbtree/rbtree<a,()>) -> rbset<a> */  {
  return tree;
}
 
// declarations
 
 
// Automatically generated. Retrieves the `tree` constructor field of the `:rbset` type.
export function rbset_fs_tree(rbset) /* forall<a> (rbset : rbset<a>) -> std/data/rbtree/rbtree<a,()> */  {
  return rbset;
}
 
export function rbset_fs__copy(_this, tree) /* forall<a> (rbset<a>, tree : ? (std/data/rbtree/rbtree<a,()>)) -> rbset<a> */  {
  if (tree !== undefined) {
    var _x0 = tree;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
 
// monadic lift
export function set_fs__mlift_add_10020(_y_x10001) /* forall<e,a> (std/data/rbtree/rbtree<a,()>) -> e rbset<a> */  {
  return _y_x10001;
}
 
export function set_fs_add(s, k, _implicit_fs_order2) /* forall<e,a> (s : rbset<a>, k : a, ?order2 : (a, a) -> e order2<a>) -> e rbset<a> */  {
   
  var x_10025 = $std_data_rbtree_dash_bu.bu_fs_set(s, k, $std_core_types.Unit, _implicit_fs_order2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10001 /* std/data/rbtree/rbtree<219,()> */ ) {
      return _y_x10001;
    });
  }
  else {
    return x_10025;
  }
}
 
export function contains(s, k, _implicit_fs_order2) /* forall<e,a> (s : rbset<a>, k : a, ?order2 : (a, a) -> e order2<a>) -> e bool */  {
  return $std_data_rbtree.contains(s, k, _implicit_fs_order2);
}
 
 
// monadic lift
export function check_fs__mlift_add_10021(_y_x10006) /* forall<e,a> (std/data/rbtree/rbtree<a,()>) -> e (bool, rbset<a>) */  {
  return $std_core_types.Tuple2(true, _y_x10006);
}
 
 
// monadic lift
export function check_fs__mlift_add_10022(k, _implicit_fs_order2, tree, _y_x10005) /* forall<e,a> (k : a, ?order2 : (a, a) -> e order2<a>, tree : std/data/rbtree/rbtree<a,()>, bool) -> e (bool, rbset<a>) */  {
  if (_y_x10005) {
    return $std_core_types.Tuple2(false, tree);
  }
  else {
     
    var x_10029 = $std_data_rbtree_dash_bu.bu_fs_set(tree, k, $std_core_types.Unit, _implicit_fs_order2);
     
    var next_10030 = function(_y_x10006 /* std/data/rbtree/rbtree<576,()> */ ) {
      return $std_core_types.Tuple2(true, _y_x10006);
    };
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(next_10030);
    }
    else {
      return next_10030(x_10029);
    }
  }
}
 
export function check_fs_add(s, k, _implicit_fs_order2) /* forall<e,a> (s : rbset<a>, k : a, ?order2 : (a, a) -> e order2<a>) -> e (bool, rbset<a>) */  {
   
  var x_10032 = $std_data_rbtree.contains(s, k, _implicit_fs_order2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10005 /* bool */ ) {
      return check_fs__mlift_add_10022(k, _implicit_fs_order2, s, _y_x10005);
    });
  }
  else {
    if (x_10032) {
      return $std_core_types.Tuple2(false, s);
    }
    else {
       
      var x_0_10035 = $std_data_rbtree_dash_bu.bu_fs_set(s, k, $std_core_types.Unit, _implicit_fs_order2);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10006 /* std/data/rbtree/rbtree<576,()> */ ) {
          return $std_core_types.Tuple2(true, _y_x10006);
        });
      }
      else {
        return $std_core_types.Tuple2(true, x_0_10035);
      }
    }
  }
}
 
export function empty() /* forall<a> () -> rbset<a> */  {
  return $std_data_rbtree.Leaf;
}
 
export function list(s) /* forall<a> (s : rbset<a>) -> list<a> */  {
  return $std_data_rbtree.keys(s);
}
 
export function show(s, _implicit_fs_k_fs_show) /* forall<e,a> (s : rbset<a>, ?k/show : (a) -> e string) -> e string */  {
  return $std_core_list.show($std_core_hnd._open_none1($std_data_rbtree.keys, s), _implicit_fs_k_fs_show);
}
 
 
// monadic lift
export function _mlift_order2_10023(_implicit_fs_order2, orig1, orig2, r1, r2, _y_x10012) /* forall<e,a> (?order2 : (a, a) -> e order2<a>, orig1 : rbset<a>, orig2 : rbset<a>, r1 : std/data/rbtree/rbtree<a,()>, r2 : std/data/rbtree/rbtree<a,()>, order2<rbset<a>>) -> e order2<rbset<a>> */  {
  if (_y_x10012._tag === 1) {
    return $std_core_types.Lt2(orig1, orig2);
  }
  else if (_y_x10012._tag === 3) {
    return $std_core_types.Gt2(orig2, orig1);
  }
  else {
    return order2(r1, r2, orig1, orig2, _implicit_fs_order2);
  }
}
 
 
// monadic lift
export function _mlift_order2_10024(l1, l2, _implicit_fs_order2_0, orig1_0, orig2_0, r1_0, r2_0, _y_x10011) /* forall<e,a> (l1 : std/data/rbtree/rbtree<a,()>, l2 : std/data/rbtree/rbtree<a,()>, ?order2 : (a, a) -> e order2<a>, orig1 : rbset<a>, orig2 : rbset<a>, r1 : std/data/rbtree/rbtree<a,()>, r2 : std/data/rbtree/rbtree<a,()>, order2<a>) -> e order2<rbset<a>> */  {
  if (_y_x10011._tag === 1) {
    return $std_core_types.Lt2(orig1_0, orig2_0);
  }
  else if (_y_x10011._tag === 3) {
    return $std_core_types.Gt2(orig2_0, orig1_0);
  }
  else {
     
    var x_10039 = order2(l1, l2, orig1_0, orig2_0, _implicit_fs_order2_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10012_0 /* order2<rbset<1356>> */ ) {
        return _mlift_order2_10023(_implicit_fs_order2_0, orig1_0, orig2_0, r1_0, r2_0, _y_x10012_0);
      });
    }
    else {
      return _mlift_order2_10023(_implicit_fs_order2_0, orig1_0, orig2_0, r1_0, r2_0, x_10039);
    }
  }
}
 
export function order2(t1, t2, orig1_1, orig2_1, _implicit_fs_order2_1) /* forall<e,a> (t1 : std/data/rbtree/rbtree<a,()>, t2 : std/data/rbtree/rbtree<a,()>, orig1 : rbset<a>, orig2 : rbset<a>, ?order2 : (a, a) -> e order2<a>) -> e order2<rbset<a>> */  { tailcall: while(1)
{
  if (t1 === null) {
    if (t2 === null) {
      return $std_core_types.Eq2(orig1_1);
    }
    else {
      return $std_core_types.Lt2(orig1_1, orig2_1);
    }
  }
  else {
    if (t2 === null) {
      return $std_core_types.Gt2(orig2_1, orig1_1);
    }
    else {
       
      var x_0_10041 = _implicit_fs_order2_1(t1.key, t2.key);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10011_0 /* order2<1356> */ ) {
          return _mlift_order2_10024(t1.left, t2.left, _implicit_fs_order2_1, orig1_1, orig2_1, t1.right, t2.right, _y_x10011_0);
        });
      }
      else {
        if (x_0_10041._tag === 1) {
          return $std_core_types.Lt2(orig1_1, orig2_1);
        }
        else if (x_0_10041._tag === 3) {
          return $std_core_types.Gt2(orig2_1, orig1_1);
        }
        else {
           
          var x_1_10044 = order2(t1.left, t2.left, orig1_1, orig2_1, _implicit_fs_order2_1);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10012_1 /* order2<rbset<1356>> */ ) {
              return _mlift_order2_10023(_implicit_fs_order2_1, orig1_1, orig2_1, t1.right, t2.right, _y_x10012_1);
            });
          }
          else {
            if (x_1_10044._tag === 1) {
              return $std_core_types.Lt2(orig1_1, orig2_1);
            }
            else if (x_1_10044._tag === 3) {
              return $std_core_types.Gt2(orig2_1, orig1_1);
            }
            else {
              {
                // tail call
                t1 = t1.right;
                t2 = t2.right;
                continue tailcall;
              }
            }
          }
        }
      }
    }
  }
}}