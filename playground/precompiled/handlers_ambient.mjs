// Koka generated module: handlers/ambient, koka version: 3.2.4
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
 
 
// runtime tag for the effect `:width`
export var width_fs__tag;
var width_fs__tag = "width@ambient";
 
 
// runtime tag for the effect `:emitx`
export var emitx_fs__tag;
var emitx_fs__tag = "emitx@ambient";
 
 
// runtime tag for the effect `:emit`
export var emit_fs__tag;
var emit_fs__tag = "emit@ambient";
 
 
// runtime tag for the effect `:state`
export var state_fs__tag;
var state_fs__tag = "state@ambient";
 
 
// runtime tag for the effect `:total`
export var total_fs__tag;
var total_fs__tag = "total@ambient";
 
 
// runtime tag for the effect `:abort`
export var abort_fs__tag;
var abort_fs__tag = "abort@ambient";
 
 
// runtime tag for the effect `:choice`
export var choice_fs__tag;
var choice_fs__tag = "choice@ambient";
 
 
// runtime tag for the effect `:cwd`
export var cwd_fs__tag;
var cwd_fs__tag = "cwd@ambient";
 
 
// runtime tag for the effect `:marked`
export var marked_fs__tag;
var marked_fs__tag = "marked@ambient";
 
 
// runtime tag for the effect `:mark`
export var mark_fs__tag;
var mark_fs__tag = "mark@ambient";
 
 
// runtime tag for the effect `:children`
export var children_fs__tag;
var children_fs__tag = "children@ambient";
// type abort
export function _Hnd_abort(_cfc, _ctl_abort) /* forall<e,a> (int, hnd/clause0<(),abort,e,a>) -> abort<e,a> */  {
  return { _cfc: _cfc, _ctl_abort: _ctl_abort };
}
// type children
export function _Hnd_children(_cfc, _fun_children) /* forall<e,a> (int, hnd/clause1<vertex,list<vertex>,children,e,a>) -> children<e,a> */  {
  return { _cfc: _cfc, _fun_children: _fun_children };
}
// type choice
export function _Hnd_choice(_cfc, _ctl_choice) /* forall<e,a> (int, hnd/clause0<bool,choice,e,a>) -> choice<e,a> */  {
  return { _cfc: _cfc, _ctl_choice: _ctl_choice };
}
// type cwd
export function _Hnd_cwd(_cfc, _val_cwd) /* forall<e,a> (int, hnd/clause0<string,cwd,e,a>) -> cwd<e,a> */  {
  return { _cfc: _cfc, _val_cwd: _val_cwd };
}
// type emit
export function _Hnd_emit(_cfc, _fun_emit) /* forall<e,a> (int, hnd/clause1<string,(),emit,e,a>) -> emit<e,a> */  {
  return { _cfc: _cfc, _fun_emit: _fun_emit };
}
// type emitx
export function _Hnd_emitx(_cfc, _val_emitx) /* forall<e,a> (int, hnd/clause0<(s : string) -> io (),emitx,e,a>) -> emitx<e,a> */  {
  return { _cfc: _cfc, _val_emitx: _val_emitx };
}
// type graph
export const Graph = 1; // graph
// type mark
export function _Hnd_mark(_cfc, _fun_mark) /* forall<e,a> (int, hnd/clause1<vertex,(),mark,e,a>) -> mark<e,a> */  {
  return { _cfc: _cfc, _fun_mark: _fun_mark };
}
// type marked
export function _Hnd_marked(_cfc, _fun_marked) /* forall<e,a> (int, hnd/clause1<vertex,bool,marked,e,a>) -> marked<e,a> */  {
  return { _cfc: _cfc, _fun_marked: _fun_marked };
}
// type rose
export function Rose(v, sub) /* (v : vertex, sub : list<rose>) -> rose */  {
  return { v: v, sub: sub };
}
// type state
export function _Hnd_state(_cfc, _ctl_get, _ctl_set) /* forall<a,e,b> (int, hnd/clause0<a,state<a>,e,b>, hnd/clause1<a,(),state<a>,e,b>) -> state<a,e,b> */  {
  return { _cfc: _cfc, _ctl_get: _ctl_get, _ctl_set: _ctl_set };
}
// type total
export function _Hnd_total(_cfc, _fun_total) /* forall<e,a> (int, hnd/clause0<int,total,e,a>) -> total<e,a> */  {
  return { _cfc: _cfc, _fun_total: _fun_total };
}
// type width
export function _Hnd_width(_cfc, _val_width) /* forall<e,a> (int, hnd/clause0<int,width,e,a>) -> width<e,a> */  {
  return { _cfc: _cfc, _val_width: _val_width };
}
 
// declarations
 
 
// select `@val-width` operation out of effect `:width`
export function _val_width_fs__select(hnd) /* forall<e,a> (hnd : width<e,a>) -> hnd/clause0<int,width,e,a> */  {
  return hnd._val_width;
}
 
 
// Call the `val width` operation of the effect `:width`
export function _val_width() /* () -> width int */  {
   
  var ev_10318 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10318.hnd._val_width(ev_10318.marker, ev_10318);
}
 
 
// Automatically generated. Retrieves the `@val-width` constructor field of the `:width` type.
export function width_fs__val_width(width_0) /* forall<e,a> (width : width<e,a>) -> hnd/clause0<int,width,e,a> */  {
  return width_0._val_width;
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:width` type.
export function width_fs__cfc(width_0) /* forall<e,a> (width : width<e,a>) -> int */  {
  return width_0._cfc;
}
 
 
// handler for the effect `:width`
export function width_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : width<e,b>, ret : (res : a) -> e b, action : () -> <width|e> a) -> e b */  {
  return $std_core_hnd._hhandle(width_fs__tag, hnd, ret, action);
}
 
 
// Call the `val width` operation of the effect `:width`
export var width;
var width = $std_core_types._Valueop;
 
export function f() /* () -> <console/console,width> () */  {
   
  var g = width_fs__handle(_Hnd_width(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
          return 80;
        })), function(_res /* () -> width int */ ) {
      return _res;
    }, function() {
      return function() {
         
        var ev_10321 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
         
        var x_10123 = ev_10321.hnd._val_width(ev_10321.marker, ev_10321);
        return $std_core_types._int_add(x_10123,1);
      };
    });
   
  var x_0_10000 = g();
   
  var _x_x1_2_10211 = $std_core_hnd._open_none1($std_core_int.show, x_0_10000);
   
  $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_2_10211);
   
  var x_1_10002 = width_fs__handle(_Hnd_width(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
          return 80;
        })), function(_res_0 /* int */ ) {
      return _res_0;
    }, function() {
       
      var x_2_10129 = $std_core_hnd._open_at0(0, function() {
           
          var ev_0_10323 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
          return ev_0_10323.hnd._val_width(ev_0_10323.marker, ev_0_10323);
        });
      return $std_core_types._int_add(x_2_10129,1);
    });
   
  var _x_x1_6_10215 = $std_core_hnd._open_none1($std_core_int.show, x_1_10002);
  return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_6_10215);
}
 
export function half(action) /* forall<a,e> (action : () -> <width,width|e> a) -> <width|e> a */  {
   
  var _value_width_l21_c12 = $std_core_types._int_div(($std_core_hnd._open_at0($std_core_hnd._evv_index(width_fs__tag), function() {
       
      var ev_10325 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10325.hnd._val_width(ev_10325.marker, ev_10325);
    })),2);
  return width_fs__handle(_Hnd_width(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
          return _value_width_l21_c12;
        })), function(_res /* 1031 */ ) {
      return _res;
    }, action);
}
 
 
// select `@val-emitx` operation out of effect `:emitx`
export function _val_emitx_fs__select(hnd) /* forall<e,a> (hnd : emitx<e,a>) -> hnd/clause0<(s : string) -> io (),emitx,e,a> */  {
  return hnd._val_emitx;
}
 
 
// Call the `val emitx` operation of the effect `:emitx`
export function _val_emitx() /* () -> emitx ((s : string) -> io ()) */  {
   
  var ev_10327 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10327.hnd._val_emitx(ev_10327.marker, ev_10327);
}
 
 
// Automatically generated. Retrieves the `@val-emitx` constructor field of the `:emitx` type.
export function emitx_fs__val_emitx(emitx_0) /* forall<e,a> (emitx : emitx<e,a>) -> hnd/clause0<(s : string) -> io (),emitx,e,a> */  {
  return emitx_0._val_emitx;
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:emitx` type.
export function emitx_fs__cfc(emitx_0) /* forall<e,a> (emitx : emitx<e,a>) -> int */  {
  return emitx_0._cfc;
}
 
 
// handler for the effect `:emitx`
export function emitx_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : emitx<e,b>, ret : (res : a) -> e b, action : () -> <emitx|e> a) -> e b */  {
  return $std_core_hnd._hhandle(emitx_fs__tag, hnd, ret, action);
}
 
 
// Call the `val emitx` operation of the effect `:emitx`
export var emitx;
var emitx = $std_core_types._Valueop;
 
export function emit1(action) /* forall<a,e> (action : () -> <emitx|e> a) -> e a */  {
  return emitx_fs__handle(_Hnd_emitx(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
          return function(s /* string */ ) {
            return $std_core_hnd._open_none1($std_core_console.printsln, s);
          };
        })), function(_res /* 1348 */ ) {
      return _res;
    }, action);
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:emit` type.
export function emit_fs__cfc(emit_0) /* forall<e,a> (emit : emit<e,a>) -> int */  {
  return emit_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@fun-emit` constructor field of the `:emit` type.
export function emit_fs__fun_emit(emit_0) /* forall<e,a> (emit : emit<e,a>) -> hnd/clause1<string,(),emit,e,a> */  {
  return emit_0._fun_emit;
}
 
 
// handler for the effect `:emit`
export function emit_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : emit<e,b>, ret : (res : a) -> e b, action : () -> <emit|e> a) -> e b */  {
  return $std_core_hnd._hhandle(emit_fs__tag, hnd, ret, action);
}
 
 
// select `emit` operation out of effect `:emit`
export function emit_fs__select(hnd) /* forall<e,a> (hnd : emit<e,a>) -> hnd/clause1<string,(),emit,e,a> */  {
  return hnd._fun_emit;
}
 
 
// Call the `fun emit` operation of the effect `:emit`
export function emit(s) /* (s : string) -> emit () */  {
   
  var ev_10331 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10331.hnd._fun_emit(ev_10331.marker, ev_10331, s);
}
 
 
// monadic lift
export function _mlift_pretty_emit1_10293(action, wild__) /* forall<a,e> (action : () -> <console/console,emit,exn|e> a, wild_ : ()) -> <emit,console/console,exn|e> a */  {
  return action();
}
 
export function pretty_emit1(action) /* forall<a,e> (action : () -> <console/console,emit,exn|e> a) -> <console/console|e> error<a> */  {
  return $std_core_exn.$try(function() {
    return emit_fs__handle(_Hnd_emit(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(s /* string */ ) {
            return $std_core_hnd._open_none1($std_core_console.printsln, s);
          })), function(_res /* 1684 */ ) {
        return _res;
      }, function() {
         
        var x_10334 = $std_core_hnd._open_at1($std_core_hnd._evv_index(emit_fs__tag), function(s_1 /* string */ ) {
             
            var ev_10336 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
            return ev_10336.hnd._fun_emit(ev_10336.marker, ev_10336, s_1);
          }, "hi");
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
            return action();
          });
        }
        else {
          return action();
        }
      });
  });
}
 
 
// dynamic binding with local reasoning
export function pretty_emit2(action) /* forall<a,e> (action : () -> <console/console,emit,width|e> a) -> <console/console,width|e> a */  {
  return emit_fs__handle(_Hnd_emit(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(s /* string */ ) {
           
          var _x_x2_10230 = $std_core_hnd._open_at0($std_core_hnd._evv_index(width_fs__tag), function() {
               
              var ev_10341 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
              return ev_10341.hnd._val_width(ev_10341.marker, ev_10341);
            });
           
          var _x_x1_0_10228 = $std_core_hnd._open_none2($std_core_sslice.string_fs_truncate, s, _x_x2_10230);
          return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_0_10228);
        })), function(_res /* 1812 */ ) {
      return _res;
    }, action);
}
 
 
// monadic lift
export function _mlift_pretty_emit_10294(out, s, _y_x10032) /* forall<h,e> (out : local-var<h,string>, s : string, string) -> <local<h>|e> () */  {
   
  var _x_x2_10234 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, s, "\n");
  return ((out).value = ($std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10032, _x_x2_10234)));
}
 
 
// monadic lift
export function _mlift_pretty_emit_10295(out, wild__) /* forall<h,a,e> (out : local-var<h,string>, wild_ : a) -> <local<h>|e> string */  {
  return ((out).value);
}
 
 
// with lexically scoped state
export function pretty_emit(action) /* forall<a,e> (action : () -> <emit|e> a) -> e string */  {
  return function() {
     
    var loc = { value: ("") };
     
    var x_0 = emit_fs__handle(_Hnd_emit(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(s /* string */ ) {
             
            var x_10345 = ((loc).value);
             
            function next_10346(_y_x10032) /* (string) -> <local<1996>|1998> () */  {
               
              var _x_x2_10234 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, s, "\n");
              return ((loc).value = ($std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10032, _x_x2_10234)));
            }
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(next_10346);
            }
            else {
              return next_10346(x_10345);
            }
          })), function(_res /* 1997 */ ) {
        return _res;
      }, action);
     
    if ($std_core_hnd._yielding()) {
      var res = $std_core_hnd.yield_extend(function(wild__ /* 1997 */ ) {
        return ((loc).value);
      });
    }
    else {
      var res = ((loc).value);
    }
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:state` type.
export function state_fs__cfc(state) /* forall<a,e,b> (state : state<a,e,b>) -> int */  {
  return state._cfc;
}
 
 
// handler for the effect `:state`
export function state_fs__handle(hnd, ret, action) /* forall<a,b,e,c> (hnd : state<a,e,c>, ret : (res : b) -> e c, action : () -> <state<a>|e> b) -> e c */  {
  return $std_core_hnd._hhandle(state_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@ctl-get` constructor field of the `:state` type.
export function state_fs__ctl_get(state) /* forall<a,e,b> (state : state<a,e,b>) -> hnd/clause0<a,state<a>,e,b> */  {
  return state._ctl_get;
}
 
 
// select `get` operation out of effect `:state`
export function get_fs__select(hnd) /* forall<a,e,b> (hnd : state<a,e,b>) -> hnd/clause0<a,state<a>,e,b> */  {
  return hnd._ctl_get;
}
 
 
// Call the `ctl get` operation of the effect `:state`
export function get() /* forall<a> () -> (state<a>) a */  {
   
  var ev_10354 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10354.hnd._ctl_get(ev_10354.marker, ev_10354);
}
 
 
// Automatically generated. Retrieves the `@ctl-set` constructor field of the `:state` type.
export function state_fs__ctl_set(state) /* forall<a,e,b> (state : state<a,e,b>) -> hnd/clause1<a,(),state<a>,e,b> */  {
  return state._ctl_set;
}
 
 
// select `set` operation out of effect `:state`
export function set_fs__select(hnd) /* forall<a,e,b> (hnd : state<a,e,b>) -> hnd/clause1<a,(),state<a>,e,b> */  {
  return hnd._ctl_set;
}
 
 
// Call the `ctl set` operation of the effect `:state`
export function set(x) /* forall<a> (x : a) -> (state<a>) () */  {
   
  var ev_10356 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10356.hnd._ctl_set(ev_10356.marker, ev_10356, x);
}
 
export function state1(action) /* forall<a,e> (action : () -> <state<int>|e> a) -> e a */  {
  return function() {
     
    var loc = { value: 0 };
     
    var res = state_fs__handle(_Hnd_state(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
            return ((loc).value);
          }), $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(x /* int */ ) {
            return ((loc).value = x);
          })), function(_res /* 2574 */ ) {
        return _res;
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:total` type.
export function total_fs__cfc(total_0) /* forall<e,a> (total : total<e,a>) -> int */  {
  return total_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@fun-total` constructor field of the `:total` type.
export function total_fs__fun_total(total_0) /* forall<e,a> (total : total<e,a>) -> hnd/clause0<int,total,e,a> */  {
  return total_0._fun_total;
}
 
 
// handler for the effect `:total`
export function total_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : total<e,b>, ret : (res : a) -> e b, action : () -> <total|e> a) -> e b */  {
  return $std_core_hnd._hhandle(total_fs__tag, hnd, ret, action);
}
 
 
// select `total` operation out of effect `:total`
export function total_fs__select(hnd) /* forall<e,a> (hnd : total<e,a>) -> hnd/clause0<int,total,e,a> */  {
  return hnd._fun_total;
}
 
 
// Call the `fun total` operation of the effect `:total`
export function total() /* () -> total int */  {
   
  var ev_10363 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10363.hnd._fun_total(ev_10363.marker, ev_10363);
}
 
 
// monadic lift
export function _mlift_emit4_10296(out, s, _y_x10050) /* forall<h,e> (out : local-var<h,string>, s : string, string) -> <local<h>|e> () */  {
   
  var _x_x2_10244 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, s, "\n");
  return ((out).value = ($std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10050, _x_x2_10244)));
}
 
 
// monadic lift
export function _mlift_emit4_10297(_y_x10052) /* forall<h,e> (string) -> <local<h>,emit|e> int */  {
  return $std_core_hnd._open_none1($std_core_string.chars_fs_count, _y_x10052);
}
 
 
// monadic lift
export function _mlift_emit4_10298(out, x_5712) /* forall<h,a,e> (out : local-var<h,string>, x@5712 : a) -> <local<h>|e> string */  {
  return ((out).value);
}
 
export function emit4(action) /* forall<a,e> (action : () -> <emit,total|e> a) -> e string */  {
  return function() {
     
    var loc = { value: ("") };
     
    var x_0 = emit_fs__handle(_Hnd_emit(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(s /* string */ ) {
             
            var x_10367 = ((loc).value);
             
            function next_10368(_y_x10050) /* (string) -> <local<3041>|3043> () */  {
               
              var _x_x2_10244 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, s, "\n");
              return ((loc).value = ($std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10050, _x_x2_10244)));
            }
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(next_10368);
            }
            else {
              return next_10368(x_10367);
            }
          })), function(_res /* 3042 */ ) {
        return _res;
      }, function() {
        return total_fs__handle(_Hnd_total(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
                 
                var x_1_10372 = ((loc).value);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(_y_x10052 /* string */ ) {
                    return $std_core_hnd._open_none1($std_core_string.chars_fs_count, _y_x10052);
                  });
                }
                else {
                  return $std_core_hnd._open_none1($std_core_string.chars_fs_count, x_1_10372);
                }
              })), function(_res_0 /* 3042 */ ) {
            return _res_0;
          }, action);
      });
     
    if ($std_core_hnd._yielding()) {
      var res = $std_core_hnd.yield_extend(function(x_5712 /* 3042 */ ) {
        return ((loc).value);
      });
    }
    else {
      var res = ((loc).value);
    }
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:abort` type.
export function abort_fs__cfc(abort_0) /* forall<e,a> (abort : abort<e,a>) -> int */  {
  return abort_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@ctl-abort` constructor field of the `:abort` type.
export function abort_fs__ctl_abort(abort_0) /* forall<e,a> (abort : abort<e,a>) -> hnd/clause0<(),abort,e,a> */  {
  return abort_0._ctl_abort;
}
 
 
// handler for the effect `:abort`
export function abort_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : abort<e,b>, ret : (res : a) -> e b, action : () -> <abort|e> a) -> e b */  {
  return $std_core_hnd._hhandle(abort_fs__tag, hnd, ret, action);
}
 
 
// select `abort` operation out of effect `:abort`
export function abort_fs__select(hnd) /* forall<e,a> (hnd : abort<e,a>) -> hnd/clause0<(),abort,e,a> */  {
  return hnd._ctl_abort;
}
 
 
// Call the `ctl abort` operation of the effect `:abort`
export function abort() /* () -> abort () */  {
   
  var ev_10379 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10379.hnd._ctl_abort(ev_10379.marker, ev_10379);
}
 
export function pretty_abort(action) /* forall<e> (action : () -> <abort,emit|e> ()) -> e string */  {
  return pretty_emit(function() {
    return abort_fs__handle(_Hnd_abort(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (()) -> <emit|3315> () */ ) {
            return $std_core_types.Unit;
          })), function(_res /* () */ ) {
        return _res;
      }, action);
  });
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:choice` type.
export function choice_fs__cfc(choice_0) /* forall<e,a> (choice : choice<e,a>) -> int */  {
  return choice_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@ctl-choice` constructor field of the `:choice` type.
export function choice_fs__ctl_choice(choice_0) /* forall<e,a> (choice : choice<e,a>) -> hnd/clause0<bool,choice,e,a> */  {
  return choice_0._ctl_choice;
}
 
 
// handler for the effect `:choice`
export function choice_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : choice<e,b>, ret : (res : a) -> e b, action : () -> <choice|e> a) -> e b */  {
  return $std_core_hnd._hhandle(choice_fs__tag, hnd, ret, action);
}
 
 
// select `choice` operation out of effect `:choice`
export function choice_fs__select(hnd) /* forall<e,a> (hnd : choice<e,a>) -> hnd/clause0<bool,choice,e,a> */  {
  return hnd._ctl_choice;
}
 
 
// Call the `ctl choice` operation of the effect `:choice`
export function choice() /* () -> choice bool */  {
   
  var ev_10382 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10382.hnd._ctl_choice(ev_10382.marker, ev_10382);
}
 
 
// monadic lift
export function _mlift_pretty_all_10299(_y_x10065, _y_x10066) /* forall<e> (list<string>, list<string>) -> e list<string> */  {
  return $std_core_hnd._open_none2($std_core_list.append, _y_x10065, _y_x10066);
}
 
 
// monadic lift
export function _mlift_pretty_all_10300(resume, _y_x10065) /* forall<e> (resume : (bool) -> e list<string>, list<string>) -> e list<string> */  {
   
  var x_10384 = resume(false);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10066 /* list<string> */ ) {
      return $std_core_hnd._open_none2($std_core_list.append, _y_x10065, _y_x10066);
    });
  }
  else {
    return $std_core_hnd._open_none2($std_core_list.append, _y_x10065, x_10384);
  }
}
 
 
// monadic lift
export function _mlift_pretty_all_10301(_y_x10067) /* forall<e> (string) -> <choice|e> list<string> */  {
  return $std_core_types.Cons(_y_x10067, $std_core_types.Nil);
}
 
export function pretty_all(action) /* forall<e> (action : () -> <abort,choice,emit|e> ()) -> e list<string> */  {
  return choice_fs__handle(_Hnd_choice(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (bool) -> 3597 list<string> */ ) {
           
          var x_10388 = resume(true);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10065 /* list<string> */ ) {
              return _mlift_pretty_all_10300(resume, _y_x10065);
            });
          }
          else {
            return _mlift_pretty_all_10300(resume, x_10388);
          }
        })), function(_res /* list<string> */ ) {
      return _res;
    }, function() {
       
      var x_0_10390 = pretty_emit(function() {
        return abort_fs__handle(_Hnd_abort(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume_0 /* (()) -> <emit,choice|3597> () */ ) {
                return $std_core_types.Unit;
              })), function(_res_0 /* () */ ) {
            return _res_0;
          }, action);
      });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10067 /* string */ ) {
          return $std_core_types.Cons(_y_x10067, $std_core_types.Nil);
        });
      }
      else {
        return $std_core_types.Cons(x_0_10390, $std_core_types.Nil);
      }
    });
}
 
 
// monadic lift
export function _mlift_pretty_all2_10302(_y_x10069, _y_x10070) /* forall<e> (list<string>, list<string>) -> e list<string> */  {
  return $std_core_hnd._open_none2($std_core_list.append, _y_x10069, _y_x10070);
}
 
 
// monadic lift
export function _mlift_pretty_all2_10303(resume, _y_x10069) /* forall<e> (resume : (bool) -> e list<string>, list<string>) -> e list<string> */  {
   
  var x_10394 = resume(false);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10070 /* list<string> */ ) {
      return $std_core_hnd._open_none2($std_core_list.append, _y_x10069, _y_x10070);
    });
  }
  else {
    return $std_core_hnd._open_none2($std_core_list.append, _y_x10069, x_10394);
  }
}
 
 
// monadic lift
export function _mlift_pretty_all2_10304(x_5717) /* forall<e> (x@5717 : string) -> <choice|e> list<string> */  {
  return $std_core_types.Cons(x_5717, $std_core_types.Nil);
}
 
export function pretty_all2(action) /* forall<e> (action : () -> <abort,choice,emit|e> ()) -> e list<string> */  {
  return choice_fs__handle(_Hnd_choice(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (bool) -> 3707 list<string> */ ) {
           
          var x_10398 = resume(true);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10069 /* list<string> */ ) {
              return _mlift_pretty_all2_10303(resume, _y_x10069);
            });
          }
          else {
            return _mlift_pretty_all2_10303(resume, x_10398);
          }
        })), function(_res /* list<string> */ ) {
      return _res;
    }, function() {
       
      var x_0_10400 = pretty_emit(function() {
        return abort_fs__handle(_Hnd_abort(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume_0 /* (()) -> <emit,choice|3707> () */ ) {
                return $std_core_types.Unit;
              })), function(_res_0 /* () */ ) {
            return _res_0;
          }, action);
      });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(x_5717 /* string */ ) {
          return $std_core_types.Cons(x_5717, $std_core_types.Nil);
        });
      }
      else {
        return $std_core_types.Cons(x_0_10400, $std_core_types.Nil);
      }
    });
}
 
 
// monadic lift
export function _mlift_state2_10305(s, _y_x10073) /* forall<a,b,e> (s : a, (a) -> e b) -> e b */  {
  return _y_x10073(s);
}
 
 
// monadic lift
export function _mlift_state2_10306(x, _y_x10075) /* forall<a,b,e> (x : a, (a) -> e b) -> e b */  {
  return _y_x10075(x);
}
 
 
// monadic lift
export function _mlift_state2_10307(x_0) /* forall<a,b,e> (x@0 : b) -> <state<a>|e> ((s@1 : a) -> e b) */  {
  return function(s_1 /* 3858 */ ) {
    return x_0;
  };
}
 
 
// monadic lift
export function _mlift_state2_10308(init, f_5720) /* forall<a,b,e> (init : a, f@5720 : (a) -> e b) -> e b */  {
  return f_5720(init);
}
 
export function state2(init, action) /* forall<a,b,e> (init : a, action : () -> <state<a>|e> b) -> e b */  {
   
  var x_3 = state_fs__handle(_Hnd_state(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (3858) -> 3860 ((3858) -> 3860 3859) */ ) {
          return function(s /* 3858 */ ) {
             
            var x_10404 = resume(s);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10073 /* (3858) -> 3860 3859 */ ) {
                return _y_x10073(s);
              });
            }
            else {
              return x_10404(s);
            }
          };
        }), $std_core_hnd._open_none1($std_core_hnd.clause_control1, function(x_0 /* 3858 */ , resume_0 /* (()) -> 3860 ((3858) -> 3860 3859) */ ) {
          return function(s_0_0 /* 3858 */ ) {
             
            var x_1_10408 = resume_0($std_core_types.Unit);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10075 /* (3858) -> 3860 3859 */ ) {
                return _y_x10075(x_0);
              });
            }
            else {
              return x_1_10408(x_0);
            }
          };
        })), function(_res /* (s : 3858) -> 3860 3859 */ ) {
      return _res;
    }, function() {
       
      var x_4_10412 = action();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(x_0_0 /* 3859 */ ) {
          return function(s_1 /* 3858 */ ) {
            return x_0_0;
          };
        });
      }
      else {
        return function(s_1_0 /* 3858 */ ) {
          return x_4_10412;
        };
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(f_5720 /* (3858) -> 3860 3859 */ ) {
      return f_5720(init);
    });
  }
  else {
    return x_3(init);
  }
}
 
 
// select `@val-cwd` operation out of effect `:cwd`
export function _val_cwd_fs__select(hnd) /* forall<e,a> (hnd : cwd<e,a>) -> hnd/clause0<string,cwd,e,a> */  {
  return hnd._val_cwd;
}
 
 
// Call the `val cwd` operation of the effect `:cwd`
export function _val_cwd() /* () -> cwd string */  {
   
  var ev_10417 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10417.hnd._val_cwd(ev_10417.marker, ev_10417);
}
 
 
// Automatically generated. Retrieves the `@val-cwd` constructor field of the `:cwd` type.
export function cwd_fs__val_cwd(cwd_0) /* forall<e,a> (cwd : cwd<e,a>) -> hnd/clause0<string,cwd,e,a> */  {
  return cwd_0._val_cwd;
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:cwd` type.
export function cwd_fs__cfc(cwd_0) /* forall<e,a> (cwd : cwd<e,a>) -> int */  {
  return cwd_0._cfc;
}
 
 
// handler for the effect `:cwd`
export function cwd_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : cwd<e,b>, ret : (res : a) -> e b, action : () -> <cwd|e> a) -> e b */  {
  return $std_core_hnd._hhandle(cwd_fs__tag, hnd, ret, action);
}
 
 
// Call the `val cwd` operation of the effect `:cwd`
export var cwd;
var cwd = $std_core_types._Valueop;
 
export function is_home() /* () -> cwd bool */  {
   
  var ev_10420 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x0 = ev_10420.hnd._val_cwd(ev_10420.marker, ev_10420);
  return (_x0 === ("/home"));
}
 
export function example1() /* () -> bool */  {
  return cwd_fs__handle(_Hnd_cwd(1, function(_x_at___wildcard_x695__14 /* hnd/marker<total,bool> */ , _x_at___wildcard_x695__17 /* hnd/ev<cwd> */ ) {
        return "/";
      }), function(_res /* bool */ ) {
      return _res;
    }, function() {
       
      var ev_10423 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      var _x1 = ev_10423.hnd._val_cwd(ev_10423.marker, ev_10423);
      return (_x1 === ("/home"));
    });
}
 
export function gchildren(g, v) /* (g : graph, v : vertex) -> list<vertex> */  {
  return $std_core_types.Nil;
}
 
export function bound(g) /* (g : graph) -> int */  {
  return 10;
}
 
export function graph_fs__copy(_this) /* (graph) -> graph */  {
  return Graph;
}
 
 
// Automatically generated. Retrieves the `sub` constructor field of the `:rose` type.
export function rose_fs_sub(rose) /* (rose : rose) -> list<rose> */  {
  return rose.sub;
}
 
 
// Automatically generated. Retrieves the `v` constructor field of the `:rose` type.
export function rose_fs_v(rose) /* (rose : rose) -> vertex */  {
  return rose.v;
}
 
export function rose_fs__copy(_this, v, sub) /* (rose, v : ? vertex, sub : ? (list<rose>)) -> rose */  {
  if (v !== undefined) {
    var _x2 = v;
  }
  else {
    var _x2 = _this.v;
  }
  if (sub !== undefined) {
    var _x3 = sub;
  }
  else {
    var _x3 = _this.sub;
  }
  return Rose(_x2, _x3);
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:marked` type.
export function marked_fs__cfc(marked_0) /* forall<e,a> (marked : marked<e,a>) -> int */  {
  return marked_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@fun-marked` constructor field of the `:marked` type.
export function marked_fs__fun_marked(marked_0) /* forall<e,a> (marked : marked<e,a>) -> hnd/clause1<vertex,bool,marked,e,a> */  {
  return marked_0._fun_marked;
}
 
 
// handler for the effect `:marked`
export function marked_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : marked<e,b>, ret : (res : a) -> e b, action : () -> <marked|e> a) -> e b */  {
  return $std_core_hnd._hhandle(marked_fs__tag, hnd, ret, action);
}
 
 
// select `marked` operation out of effect `:marked`
export function marked_fs__select(hnd) /* forall<e,a> (hnd : marked<e,a>) -> hnd/clause1<vertex,bool,marked,e,a> */  {
  return hnd._fun_marked;
}
 
 
// Call the `fun marked` operation of the effect `:marked`
export function marked(v) /* (v : vertex) -> marked bool */  {
   
  var ev_10426 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10426.hnd._fun_marked(ev_10426.marker, ev_10426, v);
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:mark` type.
export function mark_fs__cfc(mark_0) /* forall<e,a> (mark : mark<e,a>) -> int */  {
  return mark_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@fun-mark` constructor field of the `:mark` type.
export function mark_fs__fun_mark(mark_0) /* forall<e,a> (mark : mark<e,a>) -> hnd/clause1<vertex,(),mark,e,a> */  {
  return mark_0._fun_mark;
}
 
 
// handler for the effect `:mark`
export function mark_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : mark<e,b>, ret : (res : a) -> e b, action : () -> <mark|e> a) -> e b */  {
  return $std_core_hnd._hhandle(mark_fs__tag, hnd, ret, action);
}
 
 
// select `mark` operation out of effect `:mark`
export function mark_fs__select(hnd) /* forall<e,a> (hnd : mark<e,a>) -> hnd/clause1<vertex,(),mark,e,a> */  {
  return hnd._fun_mark;
}
 
 
// Call the `fun mark` operation of the effect `:mark`
export function mark(v) /* (v : vertex) -> mark () */  {
   
  var ev_10430 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10430.hnd._fun_mark(ev_10430.marker, ev_10430, v);
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:children` type.
export function children_fs__cfc(children_0) /* forall<e,a> (children : children<e,a>) -> int */  {
  return children_0._cfc;
}
 
 
// Automatically generated. Retrieves the `@fun-children` constructor field of the `:children` type.
export function children_fs__fun_children(children_0) /* forall<e,a> (children : children<e,a>) -> hnd/clause1<vertex,list<vertex>,children,e,a> */  {
  return children_0._fun_children;
}
 
 
// handler for the effect `:children`
export function children_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : children<e,b>, ret : (res : a) -> e b, action : () -> <children|e> a) -> e b */  {
  return $std_core_hnd._hhandle(children_fs__tag, hnd, ret, action);
}
 
 
// select `children` operation out of effect `:children`
export function children_fs__select(hnd) /* forall<e,a> (hnd : children<e,a>) -> hnd/clause1<vertex,list<vertex>,children,e,a> */  {
  return hnd._fun_children;
}
 
 
// Call the `fun children` operation of the effect `:children`
export function children(v) /* (v : vertex) -> children list<vertex> */  {
   
  var ev_10434 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10434.hnd._fun_children(ev_10434.marker, ev_10434, v);
}
 
 
// monadic lift
export function _mlift_trmc_dfs_loop_10309(_acc, v, vv, sub) /* (ctx<list<rose>>, v : vertex, vv : list<vertex>, sub : list<rose>) -> <children,div,mark,marked> list<rose> */  {
   
  var _trmc_x10016 = undefined;
   
  var _trmc_x10017 = $std_core_types.Cons(Rose(v, sub), _trmc_x10016);
  return _trmc_dfs_loop(vv, $std_core_types._cctx_extend(_acc,_trmc_x10017,({obj: _trmc_x10017, field_name: "tail"})));
}
 
 
// monadic lift
export function _mlift_trmc_dfs_loop_10310(_acc_0, v_0, vv_0, _y_x10093) /* (ctx<list<rose>>, v : vertex, vv : list<vertex>, list<vertex>) -> <children,mark,marked,div> list<rose> */  {
   
  var x_10437 = dfs_loop(_y_x10093);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(sub_0 /* list<rose> */ ) {
      return _mlift_trmc_dfs_loop_10309(_acc_0, v_0, vv_0, sub_0);
    });
  }
  else {
    return _mlift_trmc_dfs_loop_10309(_acc_0, v_0, vv_0, x_10437);
  }
}
 
 
// monadic lift
export function _mlift_trmc_dfs_loop_10311(_acc_1, v_1, vv_1, wild__) /* (ctx<list<rose>>, v : vertex, vv : list<vertex>, wild_ : ()) -> <mark,children,marked,div> list<rose> */  {
   
  var x_0_10439 = $std_core_hnd._open_at1(0, function(v_2 /* vertex */ ) {
       
      var ev_10441 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10441.hnd._fun_children(ev_10441.marker, ev_10441, v_2);
    }, v_1);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10093_0 /* list<vertex> */ ) {
      return _mlift_trmc_dfs_loop_10310(_acc_1, v_1, vv_1, _y_x10093_0);
    });
  }
  else {
    return _mlift_trmc_dfs_loop_10310(_acc_1, v_1, vv_1, x_0_10439);
  }
}
 
 
// monadic lift
export function _mlift_trmc_dfs_loop_10312(_acc_2, v_3, vv_2, _y_x10088) /* (ctx<list<rose>>, v : vertex, vv : list<vertex>, bool) -> <marked,children,mark,div> list<rose> */  {
  if (_y_x10088) {
    return _trmc_dfs_loop(vv_2, _acc_2);
  }
  else {
     
    var x_2_10444 = $std_core_hnd._open_at1(1, function(v_1_0 /* vertex */ ) {
         
        var ev_0_10446 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        return ev_0_10446.hnd._fun_mark(ev_0_10446.marker, ev_0_10446, v_1_0);
      }, v_3);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___0 /* () */ ) {
        return _mlift_trmc_dfs_loop_10311(_acc_2, v_3, vv_2, wild___0);
      });
    }
    else {
      return _mlift_trmc_dfs_loop_10311(_acc_2, v_3, vv_2, x_2_10444);
    }
  }
}
 
 
// monadic lift
export function _mlift_trmcm_dfs_loop_10313(_accm, v_4, vv_3, sub_1) /* ((list<rose>) -> list<rose>, v : vertex, vv : list<vertex>, sub : list<rose>) -> <children,div,mark,marked> list<rose> */  {
  return _trmcm_dfs_loop(vv_3, function(_trmc_x10019 /* list<rose> */ ) {
      return _accm($std_core_types.Cons(Rose(v_4, sub_1), _trmc_x10019));
    });
}
 
 
// monadic lift
export function _mlift_trmcm_dfs_loop_10314(_accm_0, v_5, vv_4, _y_x10104) /* ((list<rose>) -> list<rose>, v : vertex, vv : list<vertex>, list<vertex>) -> <children,mark,marked,div> list<rose> */  {
   
  var x_4_10449 = dfs_loop(_y_x10104);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(sub_2 /* list<rose> */ ) {
      return _mlift_trmcm_dfs_loop_10313(_accm_0, v_5, vv_4, sub_2);
    });
  }
  else {
    return _mlift_trmcm_dfs_loop_10313(_accm_0, v_5, vv_4, x_4_10449);
  }
}
 
 
// monadic lift
export function _mlift_trmcm_dfs_loop_10315(_accm_1, v_6, vv_5, wild___1) /* ((list<rose>) -> list<rose>, v : vertex, vv : list<vertex>, wild_ : ()) -> <mark,children,marked,div> list<rose> */  {
   
  var x_5_10451 = $std_core_hnd._open_at1(0, function(v_2_0 /* vertex */ ) {
       
      var ev_1_10453 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_1_10453.hnd._fun_children(ev_1_10453.marker, ev_1_10453, v_2_0);
    }, v_6);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10104_0 /* list<vertex> */ ) {
      return _mlift_trmcm_dfs_loop_10314(_accm_1, v_6, vv_5, _y_x10104_0);
    });
  }
  else {
    return _mlift_trmcm_dfs_loop_10314(_accm_1, v_6, vv_5, x_5_10451);
  }
}
 
 
// monadic lift
export function _mlift_trmcm_dfs_loop_10316(_accm_2, v_7, vv_6, _y_x10099) /* ((list<rose>) -> list<rose>, v : vertex, vv : list<vertex>, bool) -> <marked,children,mark,div> list<rose> */  {
  if (_y_x10099) {
    return _trmcm_dfs_loop(vv_6, _accm_2);
  }
  else {
     
    var x_7_10456 = $std_core_hnd._open_at1(1, function(v_1_1 /* vertex */ ) {
         
        var ev_2_10458 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        return ev_2_10458.hnd._fun_mark(ev_2_10458.marker, ev_2_10458, v_1_1);
      }, v_7);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild___2 /* () */ ) {
        return _mlift_trmcm_dfs_loop_10315(_accm_2, v_7, vv_6, wild___2);
      });
    }
    else {
      return _mlift_trmcm_dfs_loop_10315(_accm_2, v_7, vv_6, x_7_10456);
    }
  }
}
 
export function _trmc_dfs_loop(vs, _acc_3) /* (vs : list<vertex>, ctx<list<rose>>) -> <children,div,mark,marked> list<rose> */  { tailcall: while(1)
{
  if (vs === null) {
    return $std_core_types._cctx_apply(_acc_3,($std_core_types.Nil));
  }
  else {
     
    var x_9_10461 = $std_core_hnd._open_at1(2, function(v_0_0 /* vertex */ ) {
         
        var ev_3_10464 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        return ev_3_10464.hnd._fun_marked(ev_3_10464.marker, ev_3_10464, v_0_0);
      }, vs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10088_0 /* bool */ ) {
        return _mlift_trmc_dfs_loop_10312(_acc_3, vs.head, vs.tail, _y_x10088_0);
      });
    }
    else {
      if (x_9_10461) {
        {
          // tail call
          vs = vs.tail;
          continue tailcall;
        }
      }
      else {
         
        var x_11_10467 = $std_core_hnd._open_at1(1, function(v_1_2 /* vertex */ ) {
             
            var ev_4_10470 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
            return ev_4_10470.hnd._fun_mark(ev_4_10470.marker, ev_4_10470, v_1_2);
          }, vs.head);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild___3 /* () */ ) {
            return _mlift_trmc_dfs_loop_10311(_acc_3, vs.head, vs.tail, wild___3);
          });
        }
        else {
           
          var x_13_10473 = $std_core_hnd._open_at1(0, function(v_2_1 /* vertex */ ) {
               
              var ev_5_10476 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
              return ev_5_10476.hnd._fun_children(ev_5_10476.marker, ev_5_10476, v_2_1);
            }, vs.head);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10093_1 /* list<vertex> */ ) {
              return _mlift_trmc_dfs_loop_10310(_acc_3, vs.head, vs.tail, _y_x10093_1);
            });
          }
          else {
             
            var x_15_10479 = dfs_loop(x_13_10473);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(sub_3 /* list<rose> */ ) {
                return _mlift_trmc_dfs_loop_10309(_acc_3, vs.head, vs.tail, sub_3);
              });
            }
            else {
               
              var _trmc_x10016_0 = undefined;
               
              var _trmc_x10017_0 = $std_core_types.Cons(Rose(vs.head, x_15_10479), _trmc_x10016_0);
              {
                // tail call
                var _x4 = $std_core_types._cctx_extend(_acc_3,_trmc_x10017_0,({obj: _trmc_x10017_0, field_name: "tail"}));
                vs = vs.tail;
                _acc_3 = _x4;
                continue tailcall;
              }
            }
          }
        }
      }
    }
  }
}}
 
export function _trmcm_dfs_loop(vs_0, _accm_3) /* (vs : list<vertex>, (list<rose>) -> list<rose>) -> <children,div,mark,marked> list<rose> */  { tailcall: while(1)
{
  if (vs_0 === null) {
    return _accm_3($std_core_types.Nil);
  }
  else {
     
    var x_16_10482 = $std_core_hnd._open_at1(2, function(v_0_1 /* vertex */ ) {
         
        var ev_6_10485 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        return ev_6_10485.hnd._fun_marked(ev_6_10485.marker, ev_6_10485, v_0_1);
      }, vs_0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10099_0 /* bool */ ) {
        return _mlift_trmcm_dfs_loop_10316(_accm_3, vs_0.head, vs_0.tail, _y_x10099_0);
      });
    }
    else {
      if (x_16_10482) {
        {
          // tail call
          vs_0 = vs_0.tail;
          continue tailcall;
        }
      }
      else {
         
        var x_18_10488 = $std_core_hnd._open_at1(1, function(v_1_3 /* vertex */ ) {
             
            var ev_7_10491 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
            return ev_7_10491.hnd._fun_mark(ev_7_10491.marker, ev_7_10491, v_1_3);
          }, vs_0.head);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild___4 /* () */ ) {
            return _mlift_trmcm_dfs_loop_10315(_accm_3, vs_0.head, vs_0.tail, wild___4);
          });
        }
        else {
           
          var x_20_10494 = $std_core_hnd._open_at1(0, function(v_2_2 /* vertex */ ) {
               
              var ev_8_10497 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
              return ev_8_10497.hnd._fun_children(ev_8_10497.marker, ev_8_10497, v_2_2);
            }, vs_0.head);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10104_1 /* list<vertex> */ ) {
              return _mlift_trmcm_dfs_loop_10314(_accm_3, vs_0.head, vs_0.tail, _y_x10104_1);
            });
          }
          else {
             
            var x_22_10500 = dfs_loop(x_20_10494);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(sub_5 /* list<rose> */ ) {
                return _mlift_trmcm_dfs_loop_10313(_accm_3, vs_0.head, vs_0.tail, sub_5);
              });
            }
            else {
              {
                // tail call
                var _x8 = function(__at_accm_35 /* (list<rose>) -> list<rose> */ , _v_96 /* vertex */ , _x_22_105007 /* list<rose> */ ) {
                  return function(_trmc_x10019_0 /* list<rose> */ ) {
                    return __at_accm_35($std_core_types.Cons(Rose(_v_96, _x_22_105007), _trmc_x10019_0));
                  };
                }(_accm_3, vs_0.head, x_22_10500);
                vs_0 = vs_0.tail;
                _accm_3 = _x8;
                continue tailcall;
              }
            }
          }
        }
      }
    }
  }
}}
 
export function dfs_loop(vs_1) /* (vs : list<vertex>) -> <children,div,mark,marked> list<rose> */  {
  var _x9 = $std_core_hnd._evv_is_affine();
  if (_x9) {
    return _trmc_dfs_loop(vs_1, $std_core_types._cctx_empty());
  }
  else {
    return _trmcm_dfs_loop(vs_1, function(_trmc_x10018 /* list<rose> */ ) {
        return _trmc_x10018;
      });
  }
}
 
 
// monadic lift
export function _mlift_dfs_10317(v_0_0, _y_x10112) /* forall<h> (v@0@0 : vertex, vector<bool>) -> <local<h>,exn,children,div> bool */  {
  return $std_core_hnd._open_at2(1, $std_core_vector._index, _y_x10112, v_0_0);
}
 
export function dfs(g, vs) /* (g : graph, vs : list<vertex>) -> pure list<rose> */  {
  return function() {
     
    var init_10503 = $std_core_hnd._open_none2(function(n /* int */ , $default /* bool */ ) {
        return $std_core_vector.vector_alloc($std_core_int.ssize__t(n), $default);
      }, 10, false);
     
    var loc = { value: init_10503 };
     
    var res = children_fs__handle(_Hnd_children(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(v /* vertex */ ) {
            return $std_core_types.Nil;
          })), function(_res /* list<rose> */ ) {
        return _res;
      }, function() {
        return marked_fs__handle(_Hnd_marked(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(v_0_0 /* vertex */ ) {
                 
                var x_10505 = ((loc).value);
                 
                function next_10506(_y_x10112) /* (vector<bool>) -> <local<5256>,exn,children,div> bool */  {
                  return $std_core_hnd._open_at2(1, $std_core_vector._index, _y_x10112, v_0_0);
                }
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(next_10506);
                }
                else {
                  return next_10506(x_10505);
                }
              })), function(_res_0 /* list<rose> */ ) {
            return _res_0;
          }, function() {
            return mark_fs__handle(_Hnd_mark(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(v_1 /* vertex */ ) {
                    return (loc).value[v_1] = true;
                  })), function(_res_1 /* list<rose> */ ) {
                return _res_1;
              }, function() {
                return $std_core_hnd._open1($std_core_vector.unvlist($std_core_types.Cons(0, $std_core_types.Cons(2, $std_core_types.Cons(3, $std_core_types.Nil)))), dfs_loop, vs);
              });
          });
      });
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function main() /* () -> console/console () */  {
   
  width_fs__handle(_Hnd_width(1, function(_x_at___wildcard_x695__14 /* hnd/marker<console/console,()> */ , _x_at___wildcard_x695__17 /* hnd/ev<width> */ ) {
        return 78;
      }), function(_res /* () */ ) {
      return _res;
    }, function() {
       
      var x_10010 = f();
       
      var _x_x1_0_10286 = $std_core_hnd._open_none1($std_core_tuple.unit_fs_show, x_10010);
      return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_0_10286);
    });
   
  width_fs__handle(_Hnd_width(1, function(_x_at___wildcard_x695__14_0 /* hnd/marker<console/console,()> */ , _x_at___wildcard_x695__17_0 /* hnd/ev<width> */ ) {
        return 78;
      }), function(_res_0 /* () */ ) {
      return _res_0;
    }, function() {
       
      var x_0_10012 = half(function() {
        return $std_core_hnd._open_at0(0, f);
      });
       
      var _x_x1_2_10288 = $std_core_hnd._open_none1($std_core_tuple.unit_fs_show, x_0_10012);
      return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_2_10288);
    });
  return cwd_fs__handle(_Hnd_cwd(1, function(_x_at___wildcard_x695__14_1 /* hnd/marker<console/console,()> */ , _x_at___wildcard_x695__17_1 /* hnd/ev<cwd> */ ) {
        return "/";
      }), function(_res_1 /* () */ ) {
      return _res_1;
    }, function() {
       
      var ev_10512 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
       
      var _x10 = ev_10512.hnd._val_cwd(ev_10512.marker, ev_10512);
      var x_1_10014 = (_x10 === ("/home"));
       
      var _x_x1_5_10291 = $std_core_hnd._open_none1($std_core_bool.show, x_1_10014);
      return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_5_10291);
    });
}