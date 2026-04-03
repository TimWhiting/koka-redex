// Koka generated module: std/data/rb-map, koka version: 3.2.4
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
// type rbmap
export function Rbmap(tree) /* forall<a,b> (tree : std/data/rbtree/rbtree<a,b>) -> rbmap<a,b> */  {
  return tree;
}
 
// declarations
 
 
// Automatically generated. Retrieves the `tree` constructor field of the `:rbmap` type.
export function rbmap_fs_tree(rbmap) /* forall<a,b> (rbmap : rbmap<a,b>) -> std/data/rbtree/rbtree<a,b> */  {
  return rbmap;
}
 
export function rbmap_fs__copy(_this, tree) /* forall<a,b> (rbmap<a,b>, tree : ? (std/data/rbtree/rbtree<a,b>)) -> rbmap<a,b> */  {
  if (tree !== undefined) {
    var _x0 = tree;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
 
// monadic lift
export function _mlift_set_10039(_y_x10005) /* forall<e,a,b> (std/data/rbtree/rbtree<a,b>) -> e rbmap<a,b> */  {
  return _y_x10005;
}
 
export function set(s, k, v, _implicit_fs_order2) /* forall<e,a,b> (s : rbmap<a,b>, k : a, v : b, ?order2 : (a, a) -> e order2<a>) -> e rbmap<a,b> */  {
   
  var x_10048 = $std_data_rbtree_dash_bu.bu_fs_set(s, k, v, _implicit_fs_order2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10005 /* std/data/rbtree/rbtree<392,393> */ ) {
      return _y_x10005;
    });
  }
  else {
    return x_10048;
  }
}
 
 
// monadic lift
export function _mlift_add_10040(_y_x10007) /* forall<e,a,b> (std/data/rbtree/rbtree<a,b>) -> e rbmap<a,b> */  {
  return _y_x10007;
}
 
export function add(s, k, v, _implicit_fs_order2) /* forall<e,a,b> (s : rbmap<a,b>, k : a, v : b, ?order2 : (a, a) -> e order2<a>) -> e rbmap<a,b> */  {
   
  var x_10052 = $std_data_rbtree_dash_bu.bu_fs_add(s, k, v, _implicit_fs_order2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10007 /* std/data/rbtree/rbtree<526,527> */ ) {
      return _y_x10007;
    });
  }
  else {
    return x_10052;
  }
}
 
 
// monadic lift
export function _mlift_insert_10041(_y_x10009) /* forall<e,a,b> (std/data/rbtree/rbtree<a,b>) -> e rbmap<a,b> */  {
  return _y_x10009;
}
 
export function insert(s, k, f, _implicit_fs_order2) /* forall<e,a,b> (s : rbmap<a,b>, k : a, f : (maybe<b>) -> e b, ?order2 : (a, a) -> e order2<a>) -> e rbmap<a,b> */  {
   
  var x_10056 = $std_data_rbtree_dash_bu.bu_fs_insert(s, k, f, _implicit_fs_order2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10009 /* std/data/rbtree/rbtree<654,655> */ ) {
      return _y_x10009;
    });
  }
  else {
    return x_10056;
  }
}
 
export function contains(s, k, _implicit_fs_order2) /* forall<e,a,b> (s : rbmap<a,b>, k : a, ?order2 : (a, a) -> e order2<a>) -> e bool */  {
  return $std_data_rbtree.contains(s, k, _implicit_fs_order2);
}
 
export function empty() /* forall<a,b> () -> rbmap<a,b> */  {
  return $std_data_rbtree.Leaf;
}
 
export function list(s) /* forall<a,b> (s : rbmap<a,b>) -> list<(a, b)> */  {
  return $std_data_rbtree.list(s);
}
 
export function keys(s) /* forall<a,b> (s : rbmap<a,b>) -> list<a> */  {
  return $std_data_rbtree.keys(s);
}
 
export function values(s) /* forall<a,b> (s : rbmap<a,b>) -> list<b> */  {
  return $std_data_rbtree.values(s);
}
 
export function lookup(s, k, _implicit_fs_order2) /* forall<e,a,b> (s : rbmap<a,b>, k : a, ?order2 : (a, a) -> e order2<a>) -> e maybe<b> */  {
  return $std_data_rbtree.lookup(s, k, _implicit_fs_order2);
}
 
export function show(s, _implicit_fs_k_fs_show, _implicit_fs_v_fs_show) /* forall<e,a,b> (s : rbmap<a,b>, ?k/show : (a) -> e string, ?v/show : (b) -> e string) -> e string */  {
  return $std_core_list.show($std_core_hnd._open_none1($std_data_rbtree.list, s), function(_arg_x1 /* (1482, 1483) */ ) {
      return $std_core_tuple.tuple2_fs_show(_arg_x1, _implicit_fs_k_fs_show, _implicit_fs_v_fs_show);
    });
}
 
 
// monadic lift
export function kvalue_fs__mlift_map_10042(_y_x10018) /* forall<e,a,b> (std/data/rbtree/rbtree<a,b>) -> e rbmap<a,b> */  {
  return _y_x10018;
}
 
export function kvalue_fs_map(s, f) /* forall<e,a,b,c> (s : rbmap<a,b>, f : (a, b) -> e c) -> e rbmap<a,c> */  {
   
  var x_10060 = $std_data_rbtree.keyvalue_fs_map(s, f);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10018 /* std/data/rbtree/rbtree<1796,1798> */ ) {
      return _y_x10018;
    });
  }
  else {
    return x_10060;
  }
}
 
 
// monadic lift
export function value_fs__mlift_map_10043(_y_x10020) /* forall<e,a,b> (std/data/rbtree/rbtree<a,b>) -> e rbmap<a,b> */  {
  return _y_x10020;
}
 
export function value_fs_map(s, f) /* forall<e,a,b,c> (s : rbmap<a,b>, f : (b) -> e c) -> e rbmap<a,c> */  {
   
  var x_10064 = $std_data_rbtree.rb_fs_map(s, f);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10020 /* std/data/rbtree/rbtree<2011,2013> */ ) {
      return _y_x10020;
    });
  }
  else {
    return x_10064;
  }
}
 
 
// monadic lift
export function rec_fs__mlift_order2_10044(_implicit_fs_k_fs_order2, _implicit_fs_v_fs_order2, orig1, orig2, r1, r2, _y_x10024) /* forall<e,a,b> (?k/order2 : (a, a) -> e order2<a>, ?v/order2 : (b, b) -> e order2<b>, orig1 : rbmap<a,b>, orig2 : rbmap<a,b>, r1 : std/data/rbtree/rbtree<a,b>, r2 : std/data/rbtree/rbtree<a,b>, order2<rbmap<a,b>>) -> e order2<rbmap<a,b>> */  {
  if (_y_x10024._tag === 1) {
    return $std_core_types.Lt2(orig1, orig2);
  }
  else if (_y_x10024._tag === 3) {
    return $std_core_types.Gt2(orig2, orig1);
  }
  else {
    return rec_fs_order2(r1, r2, orig1, orig2, _implicit_fs_k_fs_order2, _implicit_fs_v_fs_order2);
  }
}
 
 
// monadic lift
export function rec_fs__mlift_order2_10045(l1, l2, _implicit_fs_k_fs_order2_0, _implicit_fs_v_fs_order2_0, orig1_0, orig2_0, r1_0, r2_0, _y_x10023) /* forall<e,a,b> (l1 : std/data/rbtree/rbtree<a,b>, l2 : std/data/rbtree/rbtree<a,b>, ?k/order2 : (a, a) -> e order2<a>, ?v/order2 : (b, b) -> e order2<b>, orig1 : rbmap<a,b>, orig2 : rbmap<a,b>, r1 : std/data/rbtree/rbtree<a,b>, r2 : std/data/rbtree/rbtree<a,b>, order2<b>) -> e order2<rbmap<a,b>> */  {
  if (_y_x10023._tag === 1) {
    return $std_core_types.Lt2(orig1_0, orig2_0);
  }
  else if (_y_x10023._tag === 3) {
    return $std_core_types.Gt2(orig2_0, orig1_0);
  }
  else {
     
    var x_10068 = rec_fs_order2(l1, l2, orig1_0, orig2_0, _implicit_fs_k_fs_order2_0, _implicit_fs_v_fs_order2_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10024_0 /* order2<rbmap<3236,3237>> */ ) {
        return rec_fs__mlift_order2_10044(_implicit_fs_k_fs_order2_0, _implicit_fs_v_fs_order2_0, orig1_0, orig2_0, r1_0, r2_0, _y_x10024_0);
      });
    }
    else {
      return rec_fs__mlift_order2_10044(_implicit_fs_k_fs_order2_0, _implicit_fs_v_fs_order2_0, orig1_0, orig2_0, r1_0, r2_0, x_10068);
    }
  }
}
 
 
// monadic lift
export function rec_fs__mlift_order2_10046(l1_0, l2_0, _implicit_fs_k_fs_order2_1, _implicit_fs_v_fs_order2_1, orig1_1, orig2_1, r1_1, r2_1, v1, v2, _y_x10022) /* forall<e,a,b> (l1 : std/data/rbtree/rbtree<a,b>, l2 : std/data/rbtree/rbtree<a,b>, ?k/order2 : (a, a) -> e order2<a>, ?v/order2 : (b, b) -> e order2<b>, orig1 : rbmap<a,b>, orig2 : rbmap<a,b>, r1 : std/data/rbtree/rbtree<a,b>, r2 : std/data/rbtree/rbtree<a,b>, v1 : b, v2 : b, order2<a>) -> e order2<rbmap<a,b>> */  {
  if (_y_x10022._tag === 1) {
    return $std_core_types.Lt2(orig1_1, orig2_1);
  }
  else if (_y_x10022._tag === 3) {
    return $std_core_types.Gt2(orig2_1, orig1_1);
  }
  else {
     
    var x_0_10070 = _implicit_fs_v_fs_order2_1(v1, v2);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10023_0 /* order2<3237> */ ) {
        return rec_fs__mlift_order2_10045(l1_0, l2_0, _implicit_fs_k_fs_order2_1, _implicit_fs_v_fs_order2_1, orig1_1, orig2_1, r1_1, r2_1, _y_x10023_0);
      });
    }
    else {
      return rec_fs__mlift_order2_10045(l1_0, l2_0, _implicit_fs_k_fs_order2_1, _implicit_fs_v_fs_order2_1, orig1_1, orig2_1, r1_1, r2_1, x_0_10070);
    }
  }
}
 
export function rec_fs_order2(t1, t2, orig1_2, orig2_2, _implicit_fs_k_fs_order2_2, _implicit_fs_v_fs_order2_2) /* forall<e,a,b> (t1 : std/data/rbtree/rbtree<a,b>, t2 : std/data/rbtree/rbtree<a,b>, orig1 : rbmap<a,b>, orig2 : rbmap<a,b>, ?k/order2 : (a, a) -> e order2<a>, ?v/order2 : (b, b) -> e order2<b>) -> e order2<rbmap<a,b>> */  { tailcall: while(1)
{
  if (t1 === null) {
    if (t2 === null) {
      return $std_core_types.Eq2(orig1_2);
    }
    else {
      return $std_core_types.Lt2(orig1_2, orig2_2);
    }
  }
  else {
    if (t2 === null) {
      return $std_core_types.Gt2(orig2_2, orig1_2);
    }
    else {
       
      var x_1_10072 = _implicit_fs_k_fs_order2_2(t1.key, t2.key);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10022_0 /* order2<3236> */ ) {
          return rec_fs__mlift_order2_10046(t1.left, t2.left, _implicit_fs_k_fs_order2_2, _implicit_fs_v_fs_order2_2, orig1_2, orig2_2, t1.right, t2.right, t1.value, t2.value, _y_x10022_0);
        });
      }
      else {
        if (x_1_10072._tag === 1) {
          return $std_core_types.Lt2(orig1_2, orig2_2);
        }
        else if (x_1_10072._tag === 3) {
          return $std_core_types.Gt2(orig2_2, orig1_2);
        }
        else {
           
          var x_2_10075 = _implicit_fs_v_fs_order2_2(t1.value, t2.value);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10023_1 /* order2<3237> */ ) {
              return rec_fs__mlift_order2_10045(t1.left, t2.left, _implicit_fs_k_fs_order2_2, _implicit_fs_v_fs_order2_2, orig1_2, orig2_2, t1.right, t2.right, _y_x10023_1);
            });
          }
          else {
            if (x_2_10075._tag === 1) {
              return $std_core_types.Lt2(orig1_2, orig2_2);
            }
            else if (x_2_10075._tag === 3) {
              return $std_core_types.Gt2(orig2_2, orig1_2);
            }
            else {
               
              var x_3_10078 = rec_fs_order2(t1.left, t2.left, orig1_2, orig2_2, _implicit_fs_k_fs_order2_2, _implicit_fs_v_fs_order2_2);
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(function(_y_x10024_1 /* order2<rbmap<3236,3237>> */ ) {
                  return rec_fs__mlift_order2_10044(_implicit_fs_k_fs_order2_2, _implicit_fs_v_fs_order2_2, orig1_2, orig2_2, t1.right, t2.right, _y_x10024_1);
                });
              }
              else {
                if (x_3_10078._tag === 1) {
                  return $std_core_types.Lt2(orig1_2, orig2_2);
                }
                else if (x_3_10078._tag === 3) {
                  return $std_core_types.Gt2(orig2_2, orig1_2);
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
    }
  }
}}
 
export function order2(orig1, orig2, _implicit_fs_k_fs_order2, _implicit_fs_v_fs_order2) /* forall<e,a,b> (orig1 : rbmap<a,b>, orig2 : rbmap<a,b>, ?k/order2 : (a, a) -> e order2<a>, ?v/order2 : (b, b) -> e order2<b>) -> e order2<rbmap<a,b>> */  {
  return rec_fs_order2(orig1, orig2, orig1, orig2, _implicit_fs_k_fs_order2, _implicit_fs_v_fs_order2);
}
 
 
// monadic lift
export function _lp__at_mlift_x_10047_eq__eq__rp_(_y_x10034) /* forall<e,a,b> (order2<rbmap<a,b>>) -> e bool */  {
  return (_y_x10034._tag === 2);
}
 
export function _lp__eq__eq__rp_(s1, s2, _implicit_fs_k_fs_order2, _implicit_fs_v_fs_order2) /* forall<e,a,b> (s1 : rbmap<a,b>, s2 : rbmap<a,b>, ?k/order2 : (a, a) -> e order2<a>, ?v/order2 : (b, b) -> e order2<b>) -> e bool */  {
   
  var x_10081 = rec_fs_order2(s1, s2, s1, s2, _implicit_fs_k_fs_order2, _implicit_fs_v_fs_order2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10034 /* order2<rbmap<3562,3563>> */ ) {
      return (_y_x10034._tag === 2);
    });
  }
  else {
    return (x_10081._tag === 2);
  }
}