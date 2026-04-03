// Koka generated module: koka-redex/pattern, koka version: 3.2.4
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
import * as $koka_dash_redex_term from './koka_dash_redex_term.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the effect `:pat-fresh`
export var pat_fresh_fs__tag;
var pat_fresh_fs__tag = "pat-fresh@pattern";
// type pat
export function PatVar(nm, id) /* forall<a> (nm : string, id : int) -> pat<a> */  {
  return { _tag: 1, nm: nm, id: id };
}
export function PatTerm(t) /* forall<a> (t : koka-redex/term/term) -> pat<a> */  {
  return { _tag: 2, t: t };
}
// type pat-fresh
export function _Hnd_pat_fresh(_cfc, _fun_fresh_id) /* forall<e,a> (int, hnd/clause0<int,pat-fresh,e,a>) -> pat-fresh<e,a> */  {
  return { _cfc: _cfc, _fun_fresh_id: _fun_fresh_id };
}
 
// declarations
 
 
// Automatically generated. Tests for the `PatVar` constructor of the `:pat` type.
export function is_patVar(pat) /* forall<a> (pat : pat<a>) -> bool */  {
  return (pat._tag === 1);
}
 
 
// Automatically generated. Tests for the `PatTerm` constructor of the `:pat` type.
export function is_patTerm(pat) /* forall<a> (pat : pat<a>) -> bool */  {
  return (pat._tag === 2);
}
 
export function pattern_fs_to_term(p) /* forall<a> (p : pat<a>) -> koka-redex/term/term */  {
  if (p._tag === 1) {
    return $koka_dash_redex_term.TVar(p.nm, p.id);
  }
  else {
    return p.t;
  }
}
 
 
// monadic lift
export function term_fs__mlift_pat_10034(_y_x10001) /* (koka-redex/term/term) -> pure pat<koka-redex/term/term> */  {
  return PatTerm(_y_x10001);
}
 
export function term_fs_pat(t, _implicit_fs_to_term) /* forall<a> (t : a, ?to-term : (a) -> pure koka-redex/term/term) -> pure pat<koka-redex/term/term> */  {
   
  var x_10052 = _implicit_fs_to_term(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(term_fs__mlift_pat_10034);
  }
  else {
    return PatTerm(x_10052);
  }
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:pat-fresh` type.
export function pat_fresh_fs__cfc(_this) /* forall<e,a> (pat-fresh<e,a>) -> int */  {
  return _this._cfc;
}
 
 
// handler for the effect `:pat-fresh`
export function pat_fresh_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : pat-fresh<e,b>, ret : (res : a) -> e b, action : () -> <pat-fresh|e> a) -> e b */  {
  return $std_core_hnd._hhandle(pat_fresh_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-fresh-id` constructor field of the `:pat-fresh` type.
export function pat_fresh_fs__fun_fresh_id(_this) /* forall<e,a> (pat-fresh<e,a>) -> hnd/clause0<int,pat-fresh,e,a> */  {
  return _this._fun_fresh_id;
}
 
 
// select `fresh-id` operation out of effect `:pat-fresh`
export function fresh_id_fs__select(hnd) /* forall<e,a> (hnd : pat-fresh<e,a>) -> hnd/clause0<int,pat-fresh,e,a> */  {
  return hnd._fun_fresh_id;
}
 
 
// Call the `fun fresh-id` operation of the effect `:pat-fresh`
export function fresh_id() /* () -> pat-fresh int */  {
   
  var ev_10056 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10056.hnd._fun_fresh_id(ev_10056.marker, ev_10056);
}
 
 
// monadic lift
export function _mlift_fresh_pat_10035(nm, _y_x10004) /* forall<a> (nm : string, int) -> pat-fresh pat<a> */  {
  return PatVar(nm, _y_x10004);
}
 
export function fresh_pat(nm) /* forall<a> (nm : string) -> pat-fresh pat<a> */  {
   
  var ev_10058 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
   
  var x = ev_10058.hnd._fun_fresh_id(ev_10058.marker, ev_10058);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10004 /* int */ ) {
      return PatVar(nm, _y_x10004);
    });
  }
  else {
    return PatVar(nm, x);
  }
}
 
 
// monadic lift
export function two_fs__mlift_fresh_pats_10036(_y_x10005, _y_x10006) /* forall<a> (pat<a>, pat<a>) -> pat-fresh (pat<a>, pat<a>) */  {
  return $std_core_types.Tuple2(_y_x10005, _y_x10006);
}
 
 
// monadic lift
export function two_fs__mlift_fresh_pats_10037(nm, _y_x10005) /* forall<a> (nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>) */  {
   
  var x_10062 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10006 /* pat<455> */ ) {
      return $std_core_types.Tuple2(_y_x10005, _y_x10006);
    });
  }
  else {
    return $std_core_types.Tuple2(_y_x10005, x_10062);
  }
}
 
export function two_fs_fresh_pats(nm) /* forall<a> (nm : string) -> pat-fresh (pat<a>, pat<a>) */  {
   
  var x_10066 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10005 /* pat<455> */ ) {
      return two_fs__mlift_fresh_pats_10037(nm, _y_x10005);
    });
  }
  else {
     
    var x_0_10069 = fresh_pat(nm);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10006 /* pat<455> */ ) {
        return $std_core_types.Tuple2(x_10066, _y_x10006);
      });
    }
    else {
      return $std_core_types.Tuple2(x_10066, x_0_10069);
    }
  }
}
 
 
// monadic lift
export function three_fs__mlift_fresh_pats_10038(_y_x10007, _y_x10008, _y_x10009) /* forall<a> (pat<a>, pat<a>, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>) */  {
  return $std_core_types.Tuple3(_y_x10007, _y_x10008, _y_x10009);
}
 
 
// monadic lift
export function three_fs__mlift_fresh_pats_10039(_y_x10007, nm, _y_x10008) /* forall<a> (pat<a>, nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>) */  {
   
  var x_10074 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10009 /* pat<504> */ ) {
      return $std_core_types.Tuple3(_y_x10007, _y_x10008, _y_x10009);
    });
  }
  else {
    return $std_core_types.Tuple3(_y_x10007, _y_x10008, x_10074);
  }
}
 
 
// monadic lift
export function three_fs__mlift_fresh_pats_10040(nm, _y_x10007) /* forall<a> (nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>) */  {
   
  var x_10079 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10008 /* pat<504> */ ) {
      return three_fs__mlift_fresh_pats_10039(_y_x10007, nm, _y_x10008);
    });
  }
  else {
    return three_fs__mlift_fresh_pats_10039(_y_x10007, nm, x_10079);
  }
}
 
export function three_fs_fresh_pats(nm) /* forall<a> (nm : string) -> pat-fresh (pat<a>, pat<a>, pat<a>) */  {
   
  var x_10081 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10007 /* pat<504> */ ) {
      return three_fs__mlift_fresh_pats_10040(nm, _y_x10007);
    });
  }
  else {
     
    var x_0_10084 = fresh_pat(nm);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10008 /* pat<504> */ ) {
        return three_fs__mlift_fresh_pats_10039(x_10081, nm, _y_x10008);
      });
    }
    else {
       
      var x_1_10087 = fresh_pat(nm);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10009 /* pat<504> */ ) {
          return $std_core_types.Tuple3(x_10081, x_0_10084, _y_x10009);
        });
      }
      else {
        return $std_core_types.Tuple3(x_10081, x_0_10084, x_1_10087);
      }
    }
  }
}
 
 
// monadic lift
export function four_fs__mlift_fresh_pats_10041(_y_x10010, _y_x10011, _y_x10012, _y_x10013) /* forall<a> (pat<a>, pat<a>, pat<a>, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>) */  {
  return $std_core_types.Tuple4(_y_x10010, _y_x10011, _y_x10012, _y_x10013);
}
 
 
// monadic lift
export function four_fs__mlift_fresh_pats_10042(_y_x10010, _y_x10011, nm, _y_x10012) /* forall<a> (pat<a>, pat<a>, nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10093 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10013 /* pat<564> */ ) {
      return $std_core_types.Tuple4(_y_x10010, _y_x10011, _y_x10012, _y_x10013);
    });
  }
  else {
    return $std_core_types.Tuple4(_y_x10010, _y_x10011, _y_x10012, x_10093);
  }
}
 
 
// monadic lift
export function four_fs__mlift_fresh_pats_10043(_y_x10010, nm, _y_x10011) /* forall<a> (pat<a>, nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10099 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10012 /* pat<564> */ ) {
      return four_fs__mlift_fresh_pats_10042(_y_x10010, _y_x10011, nm, _y_x10012);
    });
  }
  else {
    return four_fs__mlift_fresh_pats_10042(_y_x10010, _y_x10011, nm, x_10099);
  }
}
 
 
// monadic lift
export function four_fs__mlift_fresh_pats_10044(nm, _y_x10010) /* forall<a> (nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10101 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10011 /* pat<564> */ ) {
      return four_fs__mlift_fresh_pats_10043(_y_x10010, nm, _y_x10011);
    });
  }
  else {
    return four_fs__mlift_fresh_pats_10043(_y_x10010, nm, x_10101);
  }
}
 
export function four_fs_fresh_pats(nm) /* forall<a> (nm : string) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10103 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10010 /* pat<564> */ ) {
      return four_fs__mlift_fresh_pats_10044(nm, _y_x10010);
    });
  }
  else {
     
    var x_0_10106 = fresh_pat(nm);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10011 /* pat<564> */ ) {
        return four_fs__mlift_fresh_pats_10043(x_10103, nm, _y_x10011);
      });
    }
    else {
       
      var x_1_10109 = fresh_pat(nm);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10012 /* pat<564> */ ) {
          return four_fs__mlift_fresh_pats_10042(x_10103, x_0_10106, nm, _y_x10012);
        });
      }
      else {
         
        var x_2_10112 = fresh_pat(nm);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10013 /* pat<564> */ ) {
            return $std_core_types.Tuple4(x_10103, x_0_10106, x_1_10109, _y_x10013);
          });
        }
        else {
          return $std_core_types.Tuple4(x_10103, x_0_10106, x_1_10109, x_2_10112);
        }
      }
    }
  }
}
 
 
// monadic lift
export function five_fs__mlift_fresh_pats_10045(_y_x10014, _y_x10015, _y_x10016, _y_x10017, _y_x10018) /* forall<a> (pat<a>, pat<a>, pat<a>, pat<a>, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>, pat<a>) */  {
  return $std_core_types.Tuple5(_y_x10014, _y_x10015, _y_x10016, _y_x10017, _y_x10018);
}
 
 
// monadic lift
export function five_fs__mlift_fresh_pats_10046(_y_x10014, _y_x10015, _y_x10016, nm, _y_x10017) /* forall<a> (pat<a>, pat<a>, pat<a>, nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10119 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10018 /* pat<635> */ ) {
      return $std_core_types.Tuple5(_y_x10014, _y_x10015, _y_x10016, _y_x10017, _y_x10018);
    });
  }
  else {
    return $std_core_types.Tuple5(_y_x10014, _y_x10015, _y_x10016, _y_x10017, x_10119);
  }
}
 
 
// monadic lift
export function five_fs__mlift_fresh_pats_10047(_y_x10014, _y_x10015, nm, _y_x10016) /* forall<a> (pat<a>, pat<a>, nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10126 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10017 /* pat<635> */ ) {
      return five_fs__mlift_fresh_pats_10046(_y_x10014, _y_x10015, _y_x10016, nm, _y_x10017);
    });
  }
  else {
    return five_fs__mlift_fresh_pats_10046(_y_x10014, _y_x10015, _y_x10016, nm, x_10126);
  }
}
 
 
// monadic lift
export function five_fs__mlift_fresh_pats_10048(_y_x10014, nm, _y_x10015) /* forall<a> (pat<a>, nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10128 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10016 /* pat<635> */ ) {
      return five_fs__mlift_fresh_pats_10047(_y_x10014, _y_x10015, nm, _y_x10016);
    });
  }
  else {
    return five_fs__mlift_fresh_pats_10047(_y_x10014, _y_x10015, nm, x_10128);
  }
}
 
 
// monadic lift
export function five_fs__mlift_fresh_pats_10049(nm, _y_x10014) /* forall<a> (nm : string, pat<a>) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10130 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10015 /* pat<635> */ ) {
      return five_fs__mlift_fresh_pats_10048(_y_x10014, nm, _y_x10015);
    });
  }
  else {
    return five_fs__mlift_fresh_pats_10048(_y_x10014, nm, x_10130);
  }
}
 
export function five_fs_fresh_pats(nm) /* forall<a> (nm : string) -> pat-fresh (pat<a>, pat<a>, pat<a>, pat<a>, pat<a>) */  {
   
  var x_10132 = fresh_pat(nm);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10014 /* pat<635> */ ) {
      return five_fs__mlift_fresh_pats_10049(nm, _y_x10014);
    });
  }
  else {
     
    var x_0_10135 = fresh_pat(nm);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10015 /* pat<635> */ ) {
        return five_fs__mlift_fresh_pats_10048(x_10132, nm, _y_x10015);
      });
    }
    else {
       
      var x_1_10138 = fresh_pat(nm);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10016 /* pat<635> */ ) {
          return five_fs__mlift_fresh_pats_10047(x_10132, x_0_10135, nm, _y_x10016);
        });
      }
      else {
         
        var x_2_10141 = fresh_pat(nm);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10017 /* pat<635> */ ) {
            return five_fs__mlift_fresh_pats_10046(x_10132, x_0_10135, x_1_10138, nm, _y_x10017);
          });
        }
        else {
           
          var x_3_10144 = fresh_pat(nm);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10018 /* pat<635> */ ) {
              return $std_core_types.Tuple5(x_10132, x_0_10135, x_1_10138, x_2_10141, _y_x10018);
            });
          }
          else {
            return $std_core_types.Tuple5(x_10132, x_0_10135, x_1_10138, x_2_10141, x_3_10144);
          }
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_with_pats_10050(counter, wild__) /* forall<h,e> (counter : local-var<h,int>, wild_ : ()) -> <local<h>|e> int */  {
  return ((counter).value);
}
 
 
// monadic lift
export function _mlift_with_pats_10051(counter, _y_x10019) /* forall<h,e> (counter : local-var<h,int>, int) -> <local<h>|e> int */  {
   
  var x_10152 = ((counter).value = ($std_core_types._int_add(_y_x10019,1)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return ((counter).value);
    });
  }
  else {
    return ((counter).value);
  }
}
 
 
// Run an action with fresh pattern variable allocation.
// Returns the action's result with all metavar IDs assigned.
export function with_pats(action) /* forall<a,e> (action : () -> <pat-fresh|e> a) -> e a */  {
  return function() {
     
    var loc = { value: 0 };
     
    var res = pat_fresh_fs__handle(_Hnd_pat_fresh(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
             
            var x_10158 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10019 /* int */ ) {
                return _mlift_with_pats_10051(loc, _y_x10019);
              });
            }
            else {
              return _mlift_with_pats_10051(loc, x_10158);
            }
          })), function(_res /* 801 */ ) {
        return _res;
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function string_fs_pat(s) /* (s : string) -> pat<string> */  {
  return PatTerm($koka_dash_redex_term.TAtom(s));
}
 
export function int_fs_pat(n) /* (n : int) -> pat<int> */  {
  return PatTerm($koka_dash_redex_term.TInt(n));
}
 
export function default_fs_term_fs_pat(t) /* (t : koka-redex/term/term) -> pat<koka-redex/term/term> */  {
  return PatTerm(t);
}