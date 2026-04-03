// Koka generated module: koka-redex/logic, koka version: 3.2.4
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
 
 
// runtime tag for the effect `:logic`
export var logic_fs__tag;
var logic_fs__tag = "logic@logic";
// type logic
export function _Hnd_logic(_cfc, _fun_freshv, _fun_resolve, _fun_resolve_fact, _fun_restore, _fun_save, _fun_unify, _fun_walk) /* forall<e,a> (int, hnd/clause1<string,koka-redex/term/term,logic,e,a>, hnd/clause1<koka-redex/term/term,koka-redex/term/term,logic,e,a>, hnd/clause1<koka-redex/term/fact,koka-redex/term/fact,logic,e,a>, hnd/clause1<list<(string, int, koka-redex/term/term)>,(),logic,e,a>, hnd/clause0<list<(string, int, koka-redex/term/term)>,logic,e,a>, hnd/clause2<koka-redex/term/term,koka-redex/term/term,(),logic,e,a>, hnd/clause1<koka-redex/term/term,koka-redex/term/term,logic,e,a>) -> logic<e,a> */  {
  return { _cfc: _cfc, _fun_freshv: _fun_freshv, _fun_resolve: _fun_resolve, _fun_resolve_fact: _fun_resolve_fact, _fun_restore: _fun_restore, _fun_save: _fun_save, _fun_unify: _fun_unify, _fun_walk: _fun_walk };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:logic` type.
export function logic_fs__cfc(logic) /* forall<e,a> (logic : logic<e,a>) -> int */  {
  return logic._cfc;
}
 
 
// handler for the effect `:logic`
export function logic_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : logic<e,b>, ret : (res : a) -> e b, action : () -> <logic|e> a) -> e b */  {
  return $std_core_hnd._hhandle(logic_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-unify` constructor field of the `:logic` type.
export function logic_fs__fun_unify(logic) /* forall<e,a> (logic : logic<e,a>) -> hnd/clause2<koka-redex/term/term,koka-redex/term/term,(),logic,e,a> */  {
  return logic._fun_unify;
}
 
 
// select `unify` operation out of effect `:logic`
export function unify_fs__select(hnd) /* forall<e,a> (hnd : logic<e,a>) -> hnd/clause2<koka-redex/term/term,koka-redex/term/term,(),logic,e,a> */  {
  return hnd._fun_unify;
}
 
 
// Fails (via ctl fail) if unification is impossible.
// Call the `fun unify` operation of the effect `:logic`
export function unify(t1, t2) /* (t1 : koka-redex/term/term, t2 : koka-redex/term/term) -> logic () */  {
   
  var evx_10141 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return evx_10141.hnd._fun_unify(evx_10141.marker, evx_10141, t1, t2);
}
 
 
// Automatically generated. Retrieves the `@fun-walk` constructor field of the `:logic` type.
export function logic_fs__fun_walk(logic) /* forall<e,a> (logic : logic<e,a>) -> hnd/clause1<koka-redex/term/term,koka-redex/term/term,logic,e,a> */  {
  return logic._fun_walk;
}
 
 
// select `walk` operation out of effect `:logic`
export function walk_fs__select(hnd) /* forall<e,a> (hnd : logic<e,a>) -> hnd/clause1<koka-redex/term/term,koka-redex/term/term,logic,e,a> */  {
  return hnd._fun_walk;
}
 
 
// Resolve a term through the current substitution (shallow walk)
// Call the `fun walk` operation of the effect `:logic`
export function walk(t) /* (t : koka-redex/term/term) -> logic koka-redex/term/term */  {
   
  var ev_10145 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10145.hnd._fun_walk(ev_10145.marker, ev_10145, t);
}
 
 
// Automatically generated. Retrieves the `@fun-resolve` constructor field of the `:logic` type.
export function logic_fs__fun_resolve(logic) /* forall<e,a> (logic : logic<e,a>) -> hnd/clause1<koka-redex/term/term,koka-redex/term/term,logic,e,a> */  {
  return logic._fun_resolve;
}
 
 
// select `resolve` operation out of effect `:logic`
export function resolve_fs__select(hnd) /* forall<e,a> (hnd : logic<e,a>) -> hnd/clause1<koka-redex/term/term,koka-redex/term/term,logic,e,a> */  {
  return hnd._fun_resolve;
}
 
 
// Apply substitution deeply (resolve all variables)
// Call the `fun resolve` operation of the effect `:logic`
export function resolve(t) /* (t : koka-redex/term/term) -> logic koka-redex/term/term */  {
   
  var ev_10148 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10148.hnd._fun_resolve(ev_10148.marker, ev_10148, t);
}
 
 
// Automatically generated. Retrieves the `@fun-resolve-fact` constructor field of the `:logic` type.
export function logic_fs__fun_resolve_fact(logic) /* forall<e,a> (logic : logic<e,a>) -> hnd/clause1<koka-redex/term/fact,koka-redex/term/fact,logic,e,a> */  {
  return logic._fun_resolve_fact;
}
 
 
// select `resolve-fact` operation out of effect `:logic`
export function resolve_fact_fs__select(hnd) /* forall<e,a> (hnd : logic<e,a>) -> hnd/clause1<koka-redex/term/fact,koka-redex/term/fact,logic,e,a> */  {
  return hnd._fun_resolve_fact;
}
 
 
// Resolve a fact
// Call the `fun resolve-fact` operation of the effect `:logic`
export function resolve_fact(f) /* (f : koka-redex/term/fact) -> logic koka-redex/term/fact */  {
   
  var ev_10151 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10151.hnd._fun_resolve_fact(ev_10151.marker, ev_10151, f);
}
 
 
// Automatically generated. Retrieves the `@fun-freshv` constructor field of the `:logic` type.
export function logic_fs__fun_freshv(logic) /* forall<e,a> (logic : logic<e,a>) -> hnd/clause1<string,koka-redex/term/term,logic,e,a> */  {
  return logic._fun_freshv;
}
 
 
// select `freshv` operation out of effect `:logic`
export function freshv_fs__select(hnd) /* forall<e,a> (hnd : logic<e,a>) -> hnd/clause1<string,koka-redex/term/term,logic,e,a> */  {
  return hnd._fun_freshv;
}
 
 
// Generate a fresh variable
// Call the `fun freshv` operation of the effect `:logic`
export function freshv(pre) /* (pre : string) -> logic koka-redex/term/term */  {
   
  var ev_10154 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10154.hnd._fun_freshv(ev_10154.marker, ev_10154, pre);
}
 
 
// Automatically generated. Retrieves the `@fun-save` constructor field of the `:logic` type.
export function logic_fs__fun_save(logic) /* forall<e,a> (logic : logic<e,a>) -> hnd/clause0<list<(string, int, koka-redex/term/term)>,logic,e,a> */  {
  return logic._fun_save;
}
 
 
// select `save` operation out of effect `:logic`
export function save_fs__select(hnd) /* forall<e,a> (hnd : logic<e,a>) -> hnd/clause0<list<(string, int, koka-redex/term/term)>,logic,e,a> */  {
  return hnd._fun_save;
}
 
 
// Save/restore substitution state (for nondeterministic branches)
// Call the `fun save` operation of the effect `:logic`
export function save() /* () -> logic list<(string, int, koka-redex/term/term)> */  {
   
  var ev_10157 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10157.hnd._fun_save(ev_10157.marker, ev_10157);
}
 
 
// Automatically generated. Retrieves the `@fun-restore` constructor field of the `:logic` type.
export function logic_fs__fun_restore(logic) /* forall<e,a> (logic : logic<e,a>) -> hnd/clause1<list<(string, int, koka-redex/term/term)>,(),logic,e,a> */  {
  return logic._fun_restore;
}
 
 
// select `restore` operation out of effect `:logic`
export function restore_fs__select(hnd) /* forall<e,a> (hnd : logic<e,a>) -> hnd/clause1<list<(string, int, koka-redex/term/term)>,(),logic,e,a> */  {
  return hnd._fun_restore;
}
 
 
// Call the `fun restore` operation of the effect `:logic`
export function restore(s) /* (s : list<(string, int, koka-redex/term/term)>) -> logic () */  {
   
  var ev_10159 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10159.hnd._fun_restore(ev_10159.marker, ev_10159, s);
}
 
 
// monadic lift
export function _mlift_unify_lists_10121(xr, yr, wild__) /* (xr : list<koka-redex/term/term>, yr : list<koka-redex/term/term>, wild_ : ()) -> logic () */  {
  return unify_lists(xr, yr);
}
 
export function unify_lists(xs, ys) /* (xs : list<koka-redex/term/term>, ys : list<koka-redex/term/term>) -> <div,logic> () */  { tailcall: while(1)
{
  if (xs === null && ys === null) {
    return $std_core_types.Unit;
  }
  else if (xs !== null && ys !== null) {
     
    var evx_10162 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x_0 = evx_10162.hnd._fun_unify(evx_10162.marker, evx_10162, xs.head, ys.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
        return _mlift_unify_lists_10121(xs.tail, ys.tail, wild___0);
      });
    }
    else {
      {
        // tail call
        xs = xs.tail;
        ys = ys.tail;
        continue tailcall;
      }
    }
  }
  else {
     
    var evx_0_10166 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    return evx_0_10166.hnd._fun_unify(evx_0_10166.marker, evx_0_10166, $koka_dash_redex_term.TAtom(""), $koka_dash_redex_term.TInt(0));
  }
}}
 
export function unify_facts(f1, f2) /* (f1 : koka-redex/term/fact, f2 : koka-redex/term/fact) -> <div,logic> () */  {
  if (((f1.pred) !== (f2.pred))) {
     
    var evx_10170 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    return evx_10170.hnd._fun_unify(evx_10170.marker, evx_10170, $koka_dash_redex_term.TAtom(""), $koka_dash_redex_term.TInt(0));
  }
  else {
    return unify_lists(f1.args, f2.args);
  }
}
 
 
// monadic lift
export function _mlift_freshen_term_10122(name, old_id, rs, new_t_0) /* (name : string, old-id : int, rs : list<(string, int, koka-redex/term/term)>, new-t@0 : koka-redex/term/term) -> logic (list<(string, int, koka-redex/term/term)>, koka-redex/term/term) */  {
  return $std_core_types.Tuple2($std_core_types.Cons($std_core_types.Tuple3(name, old_id, new_t_0), rs), new_t_0);
}
 
 
// monadic lift
export function _mlift_freshen_term_10123(name_0, old_id_0, rs_0, _y_x10030) /* (name : string, old-id : int, rs : list<(string, int, koka-redex/term/term)>, maybe<(string, int, koka-redex/term/term)>) -> <logic,div> (list<(string, int, koka-redex/term/term)>, koka-redex/term/term) */  {
  if (_y_x10030 !== null) {
    return $std_core_types.Tuple2(rs_0, _y_x10030.value.thd);
  }
  else {
     
    var ev_10174 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x = ev_10174.hnd._fun_freshv(ev_10174.marker, ev_10174, name_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(new_t_0_0 /* koka-redex/term/term */ ) {
        return _mlift_freshen_term_10122(name_0, old_id_0, rs_0, new_t_0_0);
      });
    }
    else {
      return _mlift_freshen_term_10122(name_0, old_id_0, rs_0, x);
    }
  }
}
 
 
// monadic lift
export function _mlift_freshen_term_10124(name_0_0, _y_x10033) /* (name@0 : string, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>)) -> <div,logic> (list<(string, int, koka-redex/term/term)>, koka-redex/term/term) */  {
  return $std_core_types.Tuple2(_y_x10033.fst, $koka_dash_redex_term.TNode(name_0_0, _y_x10033.snd));
}
 
 
// monadic lift
export function _mlift_freshen_terms_10125(t1, _y_x10036) /* (t1 : koka-redex/term/term, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>)) -> <div,logic> (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */  {
  return $std_core_types.Tuple2(_y_x10036.fst, $std_core_types.Cons(t1, _y_x10036.snd));
}
 
 
// monadic lift
export function _mlift_freshen_terms_10126(rest, _y_x10035) /* (rest : list<koka-redex/term/term>, (list<(string, int, koka-redex/term/term)>, koka-redex/term/term)) -> <div,logic> (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */  {
   
  var x_1_10177 = freshen_terms(rest, _y_x10035.fst);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10036_0 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
      return _mlift_freshen_terms_10125(_y_x10035.snd, _y_x10036_0);
    });
  }
  else {
    return _mlift_freshen_terms_10125(_y_x10035.snd, x_1_10177);
  }
}
 
export function freshen_term(t, rs_1) /* (t : koka-redex/term/term, rs : list<(string, int, koka-redex/term/term)>) -> <div,logic> (list<(string, int, koka-redex/term/term)>, koka-redex/term/term) */  {
  if (t._tag === 1) {
     
    var x_2_10179 = $std_core_list.find(rs_1, function(_pat_x54__24 /* (string, int, koka-redex/term/term) */ ) {
        return (((_pat_x54__24.fst) === (t.name))) ? $std_core_types._int_eq((_pat_x54__24.snd),(t.id)) : false;
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10030_0 /* maybe<(string, int, koka-redex/term/term)> */ ) {
        return _mlift_freshen_term_10123(t.name, t.id, rs_1, _y_x10030_0);
      });
    }
    else {
      if (x_2_10179 !== null) {
        return $std_core_types.Tuple2(rs_1, x_2_10179.value.thd);
      }
      else {
         
        var ev_0_10182 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
         
        var x_3 = ev_0_10182.hnd._fun_freshv(ev_0_10182.marker, ev_0_10182, t.name);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(new_t_0_1 /* koka-redex/term/term */ ) {
            return _mlift_freshen_term_10122(t.name, t.id, rs_1, new_t_0_1);
          });
        }
        else {
          return $std_core_types.Tuple2($std_core_types.Cons($std_core_types.Tuple3(t.name, t.id, x_3), rs_1), x_3);
        }
      }
    }
  }
  else if (t._tag === 4) {
     
    var x_5_10185 = freshen_terms(t.args, rs_1);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10033_0 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
        return _mlift_freshen_term_10124(t.name, _y_x10033_0);
      });
    }
    else {
      return $std_core_types.Tuple2(x_5_10185.fst, $koka_dash_redex_term.TNode(t.name, x_5_10185.snd));
    }
  }
  else {
    return $std_core_types.Tuple2(rs_1, t);
  }
}
 
export function freshen_terms(ts, rs_0_0) /* (ts : list<koka-redex/term/term>, rs : list<(string, int, koka-redex/term/term)>) -> <div,logic> (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */  {
  if (ts === null) {
    return $std_core_types.Tuple2(rs_0_0, $std_core_types.Nil);
  }
  else {
     
    var x_6_10188 = freshen_term(ts.head, rs_0_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10035_0 /* (list<(string, int, koka-redex/term/term)>, koka-redex/term/term) */ ) {
        return _mlift_freshen_terms_10126(ts.tail, _y_x10035_0);
      });
    }
    else {
       
      var x_7_10191 = freshen_terms(ts.tail, x_6_10188.fst);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10036_1 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
          return _mlift_freshen_terms_10125(x_6_10188.snd, _y_x10036_1);
        });
      }
      else {
        return $std_core_types.Tuple2(x_7_10191.fst, $std_core_types.Cons(x_6_10188.snd, x_7_10191.snd));
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_freshen_fact_10127(pred, _y_x10039) /* (pred : string, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>)) -> <div,logic> (list<(string, int, koka-redex/term/term)>, koka-redex/term/fact) */  {
  return $std_core_types.Tuple2(_y_x10039.fst, $koka_dash_redex_term.Fact(pred, _y_x10039.snd));
}
 
export function freshen_fact(_pat_x72__18, rs) /* (koka-redex/term/fact, rs : list<(string, int, koka-redex/term/term)>) -> <div,logic> (list<(string, int, koka-redex/term/term)>, koka-redex/term/fact) */  {
   
  var x_10194 = freshen_terms(_pat_x72__18.args, rs);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10039 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
      return $std_core_types.Tuple2(_y_x10039.fst, $koka_dash_redex_term.Fact(_pat_x72__18.pred, _y_x10039.snd));
    });
  }
  else {
    return $std_core_types.Tuple2(x_10194.fst, $koka_dash_redex_term.Fact(_pat_x72__18.pred, x_10194.snd));
  }
}
 
 
// monadic lift
export function _mlift_freshen_facts_10128(args1, pred, _y_x10042) /* (args1 : list<koka-redex/term/term>, pred : string, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>)) -> <div,logic> (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>) */  {
  return $std_core_types.Tuple2(_y_x10042.fst, $std_core_types.Cons($koka_dash_redex_term.Fact(pred, args1), _y_x10042.snd));
}
 
 
// monadic lift
export function _mlift_freshen_facts_10129(pred_0, rest, _y_x10041) /* (pred : string, rest : list<koka-redex/term/fact>, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>)) -> <div,logic> (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>) */  {
   
  var x_10199 = freshen_facts(rest, _y_x10041.fst);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10042_0 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>) */ ) {
      return _mlift_freshen_facts_10128(_y_x10041.snd, pred_0, _y_x10042_0);
    });
  }
  else {
    return _mlift_freshen_facts_10128(_y_x10041.snd, pred_0, x_10199);
  }
}
 
export function freshen_facts(fs, rs) /* (fs : list<koka-redex/term/fact>, rs : list<(string, int, koka-redex/term/term)>) -> <div,logic> (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>) */  {
  if (fs === null) {
    return $std_core_types.Tuple2(rs, $std_core_types.Nil);
  }
  else {
     
    var x_0_10201 = freshen_terms(fs.head.args, rs);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10041_0 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
        return _mlift_freshen_facts_10129(fs.head.pred, fs.tail, _y_x10041_0);
      });
    }
    else {
       
      var x_1_10204 = freshen_facts(fs.tail, x_0_10201.fst);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10042_1 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>) */ ) {
          return _mlift_freshen_facts_10128(x_0_10201.snd, fs.head.pred, _y_x10042_1);
        });
      }
      else {
        return $std_core_types.Tuple2(x_1_10204.fst, $std_core_types.Cons($koka_dash_redex_term.Fact(fs.head.pred, x_0_10201.snd), x_1_10204.snd));
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_freshen_rule_10130(args1, name, pred, _y_x10047) /* (args1 : list<koka-redex/term/term>, name : string, pred : string, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>)) -> <div,logic> koka-redex/term/rule */  {
  return $koka_dash_redex_term.Rule(name, _y_x10047.snd, $koka_dash_redex_term.Fact(pred, args1));
}
 
 
// monadic lift
export function _mlift_freshen_rule_10131(name, pred, premises, _y_x10046) /* (name : string, pred : string, premises : list<koka-redex/term/fact>, (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>)) -> <div,logic> koka-redex/term/rule */  {
   
  var x_10207 = freshen_facts(premises, _y_x10046.fst);
   
  function next_10208(_y_x10047) /* ((list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>)) -> <div,logic> koka-redex/term/rule */  {
    return $koka_dash_redex_term.Rule(name, _y_x10047.snd, $koka_dash_redex_term.Fact(pred, _y_x10046.snd));
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10208);
  }
  else {
    return next_10208(x_10207);
  }
}
 
export function freshen_rule(r) /* (r : koka-redex/term/rule) -> <div,logic> koka-redex/term/rule */  {
   
  var x_10213 = freshen_terms(r.conclusion.args, $std_core_types.Nil);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10046 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/term>) */ ) {
      return _mlift_freshen_rule_10131(r.name, r.conclusion.pred, r.premises, _y_x10046);
    });
  }
  else {
     
    var x_0_10216 = freshen_facts(r.premises, x_10213.fst);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10047 /* (list<(string, int, koka-redex/term/term)>, list<koka-redex/term/fact>) */ ) {
        return $koka_dash_redex_term.Rule(r.name, _y_x10047.snd, $koka_dash_redex_term.Fact(r.conclusion.pred, x_10213.snd));
      });
    }
    else {
      return $koka_dash_redex_term.Rule(r.name, x_0_10216.snd, $koka_dash_redex_term.Fact(r.conclusion.pred, x_10213.snd));
    }
  }
}
 
export function walk_internal(t, s) /* (t : koka-redex/term/term, s : list<(string, int, koka-redex/term/term)>) -> div koka-redex/term/term */  { tailcall: while(1)
{
  if (t._tag === 1) {
    var _x0 = $std_core_list.find(s, function(_pat_x155__23 /* (string, int, koka-redex/term/term) */ ) {
        return (((_pat_x155__23.fst) === (t.name))) ? $std_core_types._int_eq((_pat_x155__23.snd),(t.id)) : false;
      });
    if (_x0 !== null) {
      {
        // tail call
        t = _x0.value.thd;
        continue tailcall;
      }
    }
    else {
      return t;
    }
  }
  else {
    return t;
  }
}}
 
export function resolve_internal(t, s) /* (t : koka-redex/term/term, s : list<(string, int, koka-redex/term/term)>) -> div koka-redex/term/term */  {
  var _x1 = walk_internal(t, s);
  if (_x1._tag === 1) {
    return $koka_dash_redex_term.TVar(_x1.name, _x1.id);
  }
  else if (_x1._tag === 2) {
    return $koka_dash_redex_term.TAtom(_x1.name);
  }
  else if (_x1._tag === 3) {
    return $koka_dash_redex_term.TInt(_x1.value);
  }
  else if (_x1._tag === 5) {
    return $koka_dash_redex_term.TRef(_x1.ref_id);
  }
  else {
    return $koka_dash_redex_term.TNode(_x1.name, $std_core_list.map(_x1.args, function(a_0 /* koka-redex/term/term */ ) {
          return resolve_internal(a_0, s);
        }));
  }
}
 
export function occurs_internal(name, id, t, s) /* (name : string, id : int, t : koka-redex/term/term, s : list<(string, int, koka-redex/term/term)>) -> div bool */  {
  var _x2 = walk_internal(t, s);
  if (_x2._tag === 1) {
    return (((_x2.name) === name)) ? $std_core_types._int_eq((_x2.id),id) : false;
  }
  else if (_x2._tag === 4) {
    return $std_core_list.any(_x2.args, function(a /* koka-redex/term/term */ ) {
        return occurs_internal(name, id, a, s);
      });
  }
  else {
    return false;
  }
}
 
export function unify_args_internal(xs, ys, s) /* (xs : list<koka-redex/term/term>, ys : list<koka-redex/term/term>, s : list<(string, int, koka-redex/term/term)>) -> div maybe<list<(string, int, koka-redex/term/term)>> */  { tailcall: while(1)
{
  if (xs === null && ys === null) {
    return $std_core_types.Just(s);
  }
  else if (xs !== null && ys !== null) {
    var _x3 = unify_internal(xs.head, ys.head, s);
    if (_x3 !== null) {
      {
        // tail call
        xs = xs.tail;
        ys = ys.tail;
        s = _x3.value;
        continue tailcall;
      }
    }
    else {
      return $std_core_types.Nothing;
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}}
 
export function unify_internal(t1, t2, s_0) /* (t1 : koka-redex/term/term, t2 : koka-redex/term/term, s : list<(string, int, koka-redex/term/term)>) -> div maybe<list<(string, int, koka-redex/term/term)>> */  {
   
  var w1 = walk_internal(t1, s_0);
   
  var w2 = walk_internal(t2, s_0);
  if (w1._tag === 1 && w2._tag === 1) {
    if (((w1.name) === (w2.name))) {
      if ($std_core_types._int_eq((w1.id),(w2.id))) {
        return $std_core_types.Just(s_0);
      }
      else {
        return $std_core_types.Just($std_core_types.Cons($std_core_types.Tuple3(w1.name, w1.id, w2), s_0));
      }
    }
    else {
      return $std_core_types.Just($std_core_types.Cons($std_core_types.Tuple3(w1.name, w1.id, w2), s_0));
    }
  }
  else if (w1._tag === 1) {
    var _x4 = occurs_internal(w1.name, w1.id, w2, s_0);
    if (_x4) {
      return $std_core_types.Nothing;
    }
    else {
      return $std_core_types.Just($std_core_types.Cons($std_core_types.Tuple3(w1.name, w1.id, w2), s_0));
    }
  }
  else if (w2._tag === 1) {
    var _x5 = occurs_internal(w2.name, w2.id, w1, s_0);
    if (_x5) {
      return $std_core_types.Nothing;
    }
    else {
      return $std_core_types.Just($std_core_types.Cons($std_core_types.Tuple3(w2.name, w2.id, w1), s_0));
    }
  }
  else if (w1._tag === 2 && w2._tag === 2) {
    if (((w1.name) === (w2.name))) {
      return $std_core_types.Just(s_0);
    }
    else {
      return $std_core_types.Nothing;
    }
  }
  else if (w1._tag === 3 && w2._tag === 3) {
    if ($std_core_types._int_eq((w1.value),(w2.value))) {
      return $std_core_types.Just(s_0);
    }
    else {
      return $std_core_types.Nothing;
    }
  }
  else if (w1._tag === 5 && w2._tag === 5) {
    if ($std_core_types._int_eq((w1.ref_id),(w2.ref_id))) {
      return $std_core_types.Just(s_0);
    }
    else {
      return $std_core_types.Nothing;
    }
  }
  else if (w1._tag === 4 && w2._tag === 4) {
    if (((w1.name) === (w2.name))) {
      return unify_args_internal(w1.args, w2.args, s_0);
    }
    else {
      return $std_core_types.Nothing;
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// monadic lift
export function _mlift_with_logic_10132(pre, _y_x10053) /* forall<h,e> (pre : string, int) -> <local<h>,div|e> koka-redex/term/term */  {
  return $koka_dash_redex_term.TVar(pre, _y_x10053);
}
 
 
// monadic lift
export function _mlift_with_logic_10133(counter, pre, wild__) /* forall<h,e> (counter : local-var<h,int>, pre : string, wild_ : ()) -> <local<h>,div|e> koka-redex/term/term */  {
   
  var x_10223 = ((counter).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10053 /* int */ ) {
      return $koka_dash_redex_term.TVar(pre, _y_x10053);
    });
  }
  else {
    return $koka_dash_redex_term.TVar(pre, x_10223);
  }
}
 
 
// monadic lift
export function _mlift_with_logic_10134(counter, pre, _y_x10051) /* forall<h,e> (counter : local-var<h,int>, pre : string, int) -> <local<h>,div|e> koka-redex/term/term */  {
   
  var x_10227 = ((counter).value = ($std_core_types._int_add(_y_x10051,1)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return _mlift_with_logic_10133(counter, pre, wild__);
    });
  }
  else {
    return _mlift_with_logic_10133(counter, pre, x_10227);
  }
}
 
 
// monadic lift
export function _mlift_with_logic_10135(t, _y_x10054) /* forall<h,e> (t : koka-redex/term/term, list<(string, int, koka-redex/term/term)>) -> <local<h>,div|e> koka-redex/term/term */  {
  return $std_core_hnd._open_none2(resolve_internal, t, _y_x10054);
}
 
 
// monadic lift
export function _mlift_with_logic_10136(a, _y_x10055) /* forall<h,e> (a : koka-redex/term/term, list<(string, int, koka-redex/term/term)>) -> <local<h>,div|e> koka-redex/term/term */  {
  return $std_core_hnd._open_none2(resolve_internal, a, _y_x10055);
}
 
 
// monadic lift
export function _mlift_with_logic_10137(pred, _y_x10056) /* forall<h,e> (pred : string, list<koka-redex/term/term>) -> <div,local<h>|e> koka-redex/term/fact */  {
  return $koka_dash_redex_term.Fact(pred, _y_x10056);
}
 
 
// monadic lift
export function _mlift_with_logic_10138(on_fail, subst, t1, t2, _y_x10060) /* forall<h,e> (on-fail : () -> <div|e> (), subst : local-var<h,list<(string, int, koka-redex/term/term)>>, t1 : koka-redex/term/term, t2 : koka-redex/term/term, list<(string, int, koka-redex/term/term)>) -> <local<h>,div|e> () */  {
  var _x6 = $std_core_hnd._open_none3(unify_internal, t1, t2, _y_x10060);
  if (_x6 !== null) {
    return ((subst).value = (_x6.value));
  }
  else {
    return on_fail();
  }
}
 
 
// monadic lift
export function _mlift_with_logic_10139(t_0, _y_x10064) /* forall<h,e> (t@0 : koka-redex/term/term, list<(string, int, koka-redex/term/term)>) -> <local<h>,div|e> koka-redex/term/term */  {
  return $std_core_hnd._open_none2(walk_internal, t_0, _y_x10064);
}
 
 
// `on-fail` is called when unification fails — typically `none()` from cache effect.
export function with_logic(on_fail, action) /* forall<a,e> (on-fail : () -> <div|e> (), action : () -> <logic,div|e> a) -> <div|e> a */  {
  return function() {
     
    var loc = { value: ($std_core_types.Nil) };
     
    var loc_0 = { value: 10000 };
     
    var res_0 = logic_fs__handle(_Hnd_logic(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(pre /* string */ ) {
             
            var x_10234 = ((loc_0).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10051 /* int */ ) {
                return _mlift_with_logic_10134(loc_0, pre, _y_x10051);
              });
            }
            else {
              return _mlift_with_logic_10134(loc_0, pre, x_10234);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(t /* koka-redex/term/term */ ) {
             
            var x_0_10236 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10054 /* list<(string, int, koka-redex/term/term)> */ ) {
                return $std_core_hnd._open_none2(resolve_internal, t, _y_x10054);
              });
            }
            else {
              return $std_core_hnd._open_none2(resolve_internal, t, x_0_10236);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(f /* koka-redex/term/fact */ ) {
             
            var x_1_10240 = $std_core_list.map(f.args, function(a /* koka-redex/term/term */ ) {
                 
                var x_2_10242 = ((loc).value);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(_y_x10055 /* list<(string, int, koka-redex/term/term)> */ ) {
                    return $std_core_hnd._open_none2(resolve_internal, a, _y_x10055);
                  });
                }
                else {
                  return $std_core_hnd._open_none2(resolve_internal, a, x_2_10242);
                }
              });
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10056 /* list<koka-redex/term/term> */ ) {
                return $koka_dash_redex_term.Fact(f.pred, _y_x10056);
              });
            }
            else {
              return $koka_dash_redex_term.Fact(f.pred, x_1_10240);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(s /* list<(string, int, koka-redex/term/term)> */ ) {
            return ((loc).value = s);
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
            return ((loc).value);
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail2, function(t1 /* koka-redex/term/term */ , t2 /* koka-redex/term/term */ ) {
             
            var x_3_10248 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10060 /* list<(string, int, koka-redex/term/term)> */ ) {
                return _mlift_with_logic_10138(on_fail, loc, t1, t2, _y_x10060);
              });
            }
            else {
              return _mlift_with_logic_10138(on_fail, loc, t1, t2, x_3_10248);
            }
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(t_0_0 /* koka-redex/term/term */ ) {
             
            var x_4_10250 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10064 /* list<(string, int, koka-redex/term/term)> */ ) {
                return $std_core_hnd._open_none2(walk_internal, t_0_0, _y_x10064);
              });
            }
            else {
              return $std_core_hnd._open_none2(walk_internal, t_0_0, x_4_10250);
            }
          })), function(_res /* 4398 */ ) {
        return _res;
      }, action);
     
    var res = $std_core_hnd.prompt_local_var(loc_0, res_0);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}