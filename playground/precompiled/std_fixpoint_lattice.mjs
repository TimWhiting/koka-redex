// Koka generated module: std/fixpoint/lattice, koka version: 3.2.4
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
import * as $std_data_rb_dash_set from './std_data_rb_dash_set.mjs';
import * as $std_data_rbtree from './std_data_rbtree.mjs';
 
// externals
 
// type declarations
// type change-lattice
export function Change_lattice(bottom, join, changes) /* forall<a,b> (bottom : a, join : (a, b) -> pure (bool, a), changes : (a) -> list<b>) -> change-lattice<a,b> */  {
  return { bottom: bottom, join: join, changes: changes };
}
// type product-change
export function CLeft(a) /* forall<a,b> (a : a) -> product-change<a,b> */  {
  return { _tag: 1, a: a };
}
export function CRight(b) /* forall<a,b> (b : b) -> product-change<a,b> */  {
  return { _tag: 2, b: b };
}
// type simple-lattice
export function LValue(a) /* forall<a> (a : a) -> simple-lattice<a> */  {
  return { _tag: 1, a: a };
}
export const LTop = { _tag: 2 }; // forall<a> simple-lattice<a>
export const LBot = { _tag: 3 }; // forall<a> simple-lattice<a>
 
// declarations
 
 
// Automatically generated. Retrieves the `bottom` constructor field of the `:change-lattice` type.
export function change_lattice_fs_bottom(_this) /* forall<a,b> (change-lattice<a,b>) -> a */  {
  return _this.bottom;
}
 
 
// Automatically generated. Retrieves the `join` constructor field of the `:change-lattice` type.
export function change_lattice_fs_join(_this) /* forall<a,b> (change-lattice<a,b>) -> ((a, b) -> pure (bool, a)) */  {
  return _this.join;
}
 
 
// Automatically generated. Retrieves the `changes` constructor field of the `:change-lattice` type.
export function change_lattice_fs_changes(_this) /* forall<a,b> (change-lattice<a,b>) -> ((a) -> list<b>) */  {
  return _this.changes;
}
 
 
// monadic lift
export function change_lattice_fs__mlift_copy_10040(_this, bottom, changes, _c_x10014) /* forall<a,b> (change-lattice<a,b>, bottom : ? a, changes : ? ((a) -> list<b>), (a, b) -> pure (bool, a)) -> change-lattice<a,b> */  {
  if (bottom !== undefined) {
    var _x0 = bottom;
  }
  else {
    var _x0 = _this.bottom;
  }
  if (changes !== undefined) {
    var _x1 = changes;
  }
  else {
    var _x1 = _this.changes;
  }
  return Change_lattice(_x0, _c_x10014, _x1);
}
 
export function change_lattice_fs__copy(_this, bottom, join, changes) /* forall<a,b> (change-lattice<a,b>, bottom : ? a, join : ? ((a, b) -> pure (bool, a)), changes : ? ((a) -> list<b>)) -> change-lattice<a,b> */  {
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10014 /* (290, 291) -> pure (bool, 290) */ ) {
      if (bottom !== undefined) {
        var _x2 = bottom;
      }
      else {
        var _x2 = _this.bottom;
      }
      if (changes !== undefined) {
        var _x3 = changes;
      }
      else {
        var _x3 = _this.changes;
      }
      return Change_lattice(_x2, _c_x10014, _x3);
    });
  }
  else {
    if (bottom !== undefined) {
      var _x4 = bottom;
    }
    else {
      var _x4 = _this.bottom;
    }
    if (join !== undefined) {
      var _x5 = join;
    }
    else {
      var _x5 = _this.join;
    }
    if (changes !== undefined) {
      var _x6 = changes;
    }
    else {
      var _x6 = _this.changes;
    }
    return Change_lattice(_x4, _x5, _x6);
  }
}
 
export function _lp__eq__eq__rp_(a, b, _implicit_fs__lp__eq__eq__rp_) /* forall<a> (a : simple-lattice<a>, b : simple-lattice<a>, ?(==) : (a, a) -> pure bool) -> pure bool */  {
  if (a._tag === 1 && b._tag === 1) {
    return _implicit_fs__lp__eq__eq__rp_(a.a, b.a);
  }
  else if (a._tag === 2 && b._tag === 2) {
    return true;
  }
  else if (a._tag === 3 && b._tag === 3) {
    return true;
  }
  else {
    return false;
  }
}
 
 
// monadic lift
export function list_fs__mlift_join_10041($new, old, _y_x10018) /* forall<a> (new : a, old : list<a>, bool) -> <div,exn> (bool, list<a>) */  {
  if (_y_x10018) {
    return $std_core_types.Tuple2(false, old);
  }
  else {
    return $std_core_types.Tuple2(true, $std_core_types.Cons($new, old));
  }
}
 
export function list_fs_join(old, $new, _implicit_fs__lp__eq__eq__rp_) /* forall<a> (old : list<a>, new : a, ?(==) : (a, a) -> pure bool) -> pure (bool, list<a>) */  {
   
  var x_10054 = $std_core_list.any(old, function(_eta_x11__14 /* 680 */ ) {
      return _implicit_fs__lp__eq__eq__rp_(_eta_x11__14, $new);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10018 /* bool */ ) {
      if (_y_x10018) {
        return $std_core_types.Tuple2(false, old);
      }
      else {
        return $std_core_types.Tuple2(true, $std_core_types.Cons($new, old));
      }
    });
  }
  else {
    if (x_10054) {
      return $std_core_types.Tuple2(false, old);
    }
    else {
      return $std_core_types.Tuple2(true, $std_core_types.Cons($new, old));
    }
  }
}
 
 
// monadic lift
export function set_fs__mlift_join_10042(_y_x10019) /* forall<a> ((bool, std/data/rb-set/rbset<a>)) -> <div,exn> (bool, std/data/rb-set/rbset<a>) */  {
  return $std_core_types.Tuple2(_y_x10019.fst, _y_x10019.snd);
}
 
export function set_fs_join(old, $new, _implicit_fs_order2) /* forall<a> (old : std/data/rb-set/rbset<a>, new : a, ?order2 : (a, a) -> pure order2<a>) -> pure (bool, std/data/rb-set/rbset<a>) */  {
   
  var x_10060 = $std_data_rb_dash_set.check_fs_add(old, $new, _implicit_fs_order2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10019 /* (bool, std/data/rb-set/rbset<804>) */ ) {
      return $std_core_types.Tuple2(_y_x10019.fst, _y_x10019.snd);
    });
  }
  else {
    return $std_core_types.Tuple2(x_10060.fst, x_10060.snd);
  }
}
 
 
// monadic lift
export function simple_fs__mlift_join_10043(a, _y_x10020) /* forall<a> (a : simple-lattice<a>, bool) -> pure (bool, simple-lattice<a>) */  {
  if (_y_x10020) {
    return $std_core_types.Tuple2(false, a);
  }
  else {
    return $std_core_types.Tuple2(true, LTop);
  }
}
 
export function simple_fs_join(a, b, _implicit_fs__lp__eq__eq__rp_) /* forall<a> (a : simple-lattice<a>, b : simple-lattice<a>, ?(==) : (a, a) -> pure bool) -> pure (bool, simple-lattice<a>) */  {
  if (a._tag === 2) {
    return $std_core_types.Tuple2(false, LTop);
  }
  else if (b._tag === 2) {
    return $std_core_types.Tuple2(true, LTop);
  }
  else if (a._tag === 3) {
    return $std_core_types.Tuple2(true, b);
  }
  else if (b._tag === 3) {
    return $std_core_types.Tuple2(false, a);
  }
  else {
     
    var x_1_10064 = _implicit_fs__lp__eq__eq__rp_(a.a, b.a);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10020 /* bool */ ) {
        if (_y_x10020) {
          return $std_core_types.Tuple2(false, a);
        }
        else {
          return $std_core_types.Tuple2(true, LTop);
        }
      });
    }
    else {
      if (x_1_10064) {
        return $std_core_types.Tuple2(false, a);
      }
      else {
        return $std_core_types.Tuple2(true, LTop);
      }
    }
  }
}
 
export function list_fs_change_lattice(_implicit_fs__lp__eq__eq__rp_) /* forall<a> (?(==) : (a, a) -> pure bool) -> pure change-lattice<list<a>,a> */  {
  return Change_lattice($std_core_types.Nil, function(r /* list<1162> */ , c /* 1162 */ ) {
      return list_fs_join(r, c, _implicit_fs__lp__eq__eq__rp_);
    }, function(x /* list<1162> */ ) {
      return x;
    });
}
 
 
// monadic lift
export function set_fs__mlift_change_lattice_10044(_y_x10023) /* forall<a> ((bool, std/data/rb-set/rbset<a>)) -> <div,exn> (bool, std/data/rb-set/rbset<a>) */  {
  return $std_core_types.Tuple2(_y_x10023.fst, _y_x10023.snd);
}
 
export function set_fs_change_lattice(_implicit_fs_order2) /* forall<a> (?order2 : (a, a) -> pure order2<a>) -> change-lattice<std/data/rb-set/rbset<a>,a> */  {
  return Change_lattice($std_data_rbtree.Leaf, function(r /* std/data/rb-set/rbset<1280> */ , c /* 1280 */ ) {
       
      var x_10069 = $std_data_rb_dash_set.check_fs_add(r, c, _implicit_fs_order2);
       
      function next_10070(_y_x10023) /* ((bool, std/data/rb-set/rbset<1280>)) -> <div,exn> (bool, std/data/rb-set/rbset<1280>) */  {
        return $std_core_types.Tuple2(_y_x10023.fst, _y_x10023.snd);
      }
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(next_10070);
      }
      else {
        return next_10070(x_10069);
      }
    }, $std_data_rb_dash_set.list);
}
 
 
// Automatically generated. Tests for the `LValue` constructor of the `:simple-lattice` type.
export function is_lvalue(simple_lattice) /* forall<a> (simple-lattice : simple-lattice<a>) -> bool */  {
  return (simple_lattice._tag === 1);
}
 
 
// Automatically generated. Tests for the `LTop` constructor of the `:simple-lattice` type.
export function is_ltop(simple_lattice) /* forall<a> (simple-lattice : simple-lattice<a>) -> bool */  {
  return (simple_lattice._tag === 2);
}
 
 
// Automatically generated. Tests for the `LBot` constructor of the `:simple-lattice` type.
export function is_lbot(simple_lattice) /* forall<a> (simple-lattice : simple-lattice<a>) -> bool */  {
  return (simple_lattice._tag === 3);
}
 
export function order2(a, b, _implicit_fs_order2) /* forall<a> (a : simple-lattice<a>, b : simple-lattice<a>, ?order2 : (a, a) -> order2<a>) -> pure order2<simple-lattice<a>> */  {
  if (a._tag === 1 && b._tag === 1) {
    var _x7 = $std_core_hnd._open_none2(_implicit_fs_order2, a.a, b.a);
    if (_x7._tag === 1) {
      return $std_core_types.Lt2(a, b);
    }
    else if (_x7._tag === 3) {
      return $std_core_types.Gt2(b, a);
    }
    else {
      return $std_core_types.Eq2(a);
    }
  }
  else if (a._tag === 2 && b._tag === 2) {
    return $std_core_types.Eq2(LTop);
  }
  else if (a._tag === 2) {
    return $std_core_types.Gt2(LTop, b);
  }
  else if (b._tag === 2) {
    return $std_core_types.Lt2(a, LTop);
  }
  else if (a._tag === 3 && b._tag === 3) {
    return $std_core_types.Eq2(LBot);
  }
  else if (a._tag === 3) {
    return $std_core_types.Lt2(LBot, b);
  }
  else if (b._tag === 3) {
    return $std_core_types.Gt2(a, LBot);
  }
  else {
    return $std_core_exn.error_pattern("std/fixpoint/lattice(29, 3)", "order2");
  }
}
 
export function show(s, _implicit_fs_show) /* forall<a> (s : simple-lattice<a>, ?show : (a) -> string) -> string */  {
  if (s._tag === 1) {
    return $std_core_types._lp__plus__plus__rp_("LValue(", $std_core_types._lp__plus__plus__rp_(_implicit_fs_show(s.a), ")"));
  }
  else if (s._tag === 2) {
    return "LTop";
  }
  else {
    return "LBot";
  }
}
 
export function simple_fs_change_lattice(_lp__at_x_0_eq__eq__rp_) /* forall<a> ((==) : (a, a) -> pure bool) -> pure change-lattice<simple-lattice<a>,simple-lattice<a>> */  {
  return Change_lattice(LBot, function(r /* simple-lattice<1914> */ , c /* simple-lattice<1914> */ ) {
      return simple_fs_join(r, c, _lp__at_x_0_eq__eq__rp_);
    }, function(_eta_x64__53 /* simple-lattice<1914> */ ) {
      return $std_core_types.Cons(_eta_x64__53, $std_core_types.Nil);
    });
}
 
 
// Automatically generated. Tests for the `CLeft` constructor of the `:product-change` type.
export function is_cleft(product_change) /* forall<a,b> (product-change : product-change<a,b>) -> bool */  {
  return (product_change._tag === 1);
}
 
 
// Automatically generated. Tests for the `CRight` constructor of the `:product-change` type.
export function is_cright(product_change) /* forall<a,b> (product-change : product-change<a,b>) -> bool */  {
  return (product_change._tag === 2);
}
 
 
// monadic lift
export function product_fs__mlift_change_lattice_10045(r1, _y_x10028) /* forall<a,b> (r1 : b, (bool, a)) -> pure (bool, (a, b)) */  {
  return $std_core_types.Tuple2(_y_x10028.fst, $std_core_types.Tuple2(_y_x10028.snd, r1));
}
 
 
// monadic lift
export function product_fs__mlift_change_lattice_10046(l1, _y_x10030) /* forall<a,b> (l1 : a, (bool, b)) -> pure (bool, (a, b)) */  {
  return $std_core_types.Tuple2(_y_x10030.fst, $std_core_types.Tuple2(l1, _y_x10030.snd));
}
 
export function product_fs_change_lattice(l, r) /* forall<a,b,c,d> (l : change-lattice<c,a>, r : change-lattice<d,b>) -> change-lattice<(c, d),product-change<a,b>> */  {
  var _x8 = l.bottom;
  var _x9 = r.bottom;
  return Change_lattice($std_core_types.Tuple2(_x8, _x9), function(_pat_x72__22 /* (2313, 2314) */ , c /* product-change<2311,2312> */ ) {
      if (c._tag === 1) {
         
        var x_10072 = $std_core_hnd._open_none1(function(_this_1 /* change-lattice<2313,2311> */ ) {
            return _this_1.join;
          }, l)(_pat_x72__22.fst, c.a);
         
        var next_10073 = function(_y_x10028 /* (bool, 2313) */ ) {
          return $std_core_types.Tuple2(_y_x10028.fst, $std_core_types.Tuple2(_y_x10028.snd, _pat_x72__22.snd));
        };
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(next_10073);
        }
        else {
          return next_10073(x_10072);
        }
      }
      else {
         
        var x_0_10076 = $std_core_hnd._open_none1(function(_this_2 /* change-lattice<2314,2312> */ ) {
            return _this_2.join;
          }, r)(_pat_x72__22.snd, c.b);
         
        var next_0_10077 = function(_y_x10030 /* (bool, 2314) */ ) {
          return $std_core_types.Tuple2(_y_x10030.fst, $std_core_types.Tuple2(_pat_x72__22.fst, _y_x10030.snd));
        };
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(next_0_10077);
        }
        else {
          return next_0_10077(x_0_10076);
        }
      }
    }, function(_pat_x81__21 /* (2313, 2314) */ ) {
       
      var _x10 = l.changes(_pat_x81__21.fst);
      var xs_10008 = $std_core_list.map(_x10, CLeft);
       
      var _x11 = r.changes(_pat_x81__21.snd);
      var ys_10009 = $std_core_list.map(_x11, CRight);
      return $std_core_list.append(xs_10008, ys_10009);
    });
}