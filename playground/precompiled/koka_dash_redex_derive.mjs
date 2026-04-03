// Koka generated module: koka-redex/derive, koka version: 3.2.4
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
import * as $type_dash_level_con_dash_info from './type_dash_level_con_dash_info.mjs';
import * as $type_dash_level_structs from './type_dash_level_structs.mjs';
import * as $type_dash_level_list from './type_dash_level_list.mjs';
import * as $type_dash_level_nil from './type_dash_level_nil.mjs';
import * as $koka_dash_redex_term from './koka_dash_redex_term.mjs';
 
// externals
 
// type declarations
// type field-witness
export const FieldWitness = { _tag: 1 }; // forall<a> field-witness<a>
// type latex-entry
export function Latex_entry(entry) /* (entry : render-entry) -> latex-entry */  {
  return entry;
}
// type md-entry
export function Md_entry(entry) /* (entry : render-entry) -> md-entry */  {
  return entry;
}
 
// declarations
 
export function end_fs_fields_to_terms(_pat_x33__29, _implicit_fs_to_term) /* forall<a> (type-level/list/t-cons<a,type-level/nil/t-nil>, ?to-term : (a) -> div koka-redex/term/term) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Cons(_implicit_fs_to_term(_pat_x33__29.head), $std_core_types.Nil);
}
 
export function default_fs_end_fs_fields_to_terms(_pat_x37__37, _implicit_fs_a_fs_to_term, _implicit_fs_b_fs_to_term) /* forall<a,b> (type-level/list/t-cons<a,b>, ?a/to-term : (a) -> div koka-redex/term/term, ?b/to-term : (b) -> div koka-redex/term/term) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Cons(_implicit_fs_a_fs_to_term(_pat_x37__37.head), $std_core_types.Cons(_implicit_fs_b_fs_to_term(_pat_x37__37.tail), $std_core_types.Nil));
}
 
export function tcons_fs_fields_to_terms(_pat_x28__31, _implicit_fs_to_term, _implicit_fs_tail_fs_fields_to_terms) /* forall<a,b,c> (type-level/list/t-cons<a,type-level/list/t-cons<b,c>>, ?to-term : (a) -> div koka-redex/term/term, ?tail/fields-to-terms : (type-level/list/t-cons<b,c>) -> div list<koka-redex/term/term>) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Cons(_implicit_fs_to_term(_pat_x28__31.head), _implicit_fs_tail_fs_fields_to_terms(_pat_x28__31.tail));
}
 
 
// monadic lift
export function end_fs__mlift_terms_to_fields_10159(_y_x10036) /* forall<a> (a) -> <exn,div> type-level/list/t-cons<a,type-level/nil/t-nil> */  {
  return $type_dash_level_list.TCons(_y_x10036, $type_dash_level_nil.TNil);
}
 
export function end_fs_terms_to_fields(args, _implicit_fs_from_term) /* forall<a> (args : list<koka-redex/term/term>, ?from-term : (koka-redex/term/term) -> <exn,div> a) -> <exn,div> type-level/list/t-cons<a,type-level/nil/t-nil> */  {
  if (args !== null) {
     
    var x_10169 = _implicit_fs_from_term(args.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10036 /* 754 */ ) {
        return $type_dash_level_list.TCons(_y_x10036, $type_dash_level_nil.TNil);
      });
    }
    else {
      return $type_dash_level_list.TCons(x_10169, $type_dash_level_nil.TNil);
    }
  }
  else {
    return $std_core_exn.$throw("terms-to-fields: not enough args");
  }
}
 
 
// monadic lift
export function tcons_fs__mlift_terms_to_fields_10160(_y_x10039, _y_x10040) /* forall<a,b,c> (a, type-level/list/t-cons<b,c>) -> <exn,div> type-level/list/t-cons<a,type-level/list/t-cons<b,c>> */  {
  return $type_dash_level_list.TCons(_y_x10039, _y_x10040);
}
 
 
// monadic lift
export function tcons_fs__mlift_terms_to_fields_10161(t, _implicit_fs_tail_fs_terms_to_fields, _y_x10039) /* forall<a,b,c> (t : list<koka-redex/term/term>, ?tail/terms-to-fields : (list<koka-redex/term/term>) -> <exn,div> type-level/list/t-cons<b,c>, a) -> <exn,div> type-level/list/t-cons<a,type-level/list/t-cons<b,c>> */  {
   
  var x_10173 = _implicit_fs_tail_fs_terms_to_fields(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10040 /* type-level/list/t-cons<821,822> */ ) {
      return $type_dash_level_list.TCons(_y_x10039, _y_x10040);
    });
  }
  else {
    return $type_dash_level_list.TCons(_y_x10039, x_10173);
  }
}
 
export function tcons_fs_terms_to_fields(args, _implicit_fs_from_term, _implicit_fs_tail_fs_terms_to_fields) /* forall<a,b,c> (args : list<koka-redex/term/term>, ?from-term : (koka-redex/term/term) -> <exn,div> a, ?tail/terms-to-fields : (list<koka-redex/term/term>) -> <exn,div> type-level/list/t-cons<b,c>) -> <exn,div> type-level/list/t-cons<a,type-level/list/t-cons<b,c>> */  {
  if (args !== null) {
     
    var x_10177 = _implicit_fs_from_term(args.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10039 /* 820 */ ) {
        return tcons_fs__mlift_terms_to_fields_10161(args.tail, _implicit_fs_tail_fs_terms_to_fields, _y_x10039);
      });
    }
    else {
       
      var x_0_10180 = _implicit_fs_tail_fs_terms_to_fields(args.tail);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10040 /* type-level/list/t-cons<821,822> */ ) {
          return $type_dash_level_list.TCons(x_10177, _y_x10040);
        });
      }
      else {
        return $type_dash_level_list.TCons(x_10177, x_0_10180);
      }
    }
  }
  else {
    return $std_core_exn.$throw("terms-to-fields: not enough args");
  }
}
 
 
// fields = string → TAtom
export function atom_fs_to_matcher(ci) /* forall<a,b> (ci : type-level/con-info/con-info<a,string,b>) -> to-term-matcher<b> */  {
  return function(v /* 888 */ ) {
    var _x0 = ci.con_match(v);
    if (_x0 !== null) {
      return $std_core_types.Just($koka_dash_redex_term.TAtom(_x0.value));
    }
    else {
      return $std_core_types.Nothing;
    }
  };
}
 
 
// fields = t-cons<a, b> → TNode(name, fields)
export function node_fs_to_matcher(ci, _implicit_fs_con_name, _implicit_fs_fields_to_terms) /* forall<a,b,c,d> (ci : type-level/con-info/con-info<a,type-level/list/t-cons<c,d>,b>, ?con-name : type-level/structs/name<a>, ?fields-to-terms : (type-level/list/t-cons<c,d>) -> div list<koka-redex/term/term>) -> to-term-matcher<b> */  {
  return function(v /* 1002 */ ) {
    var _x1 = ci.con_match(v);
    if (_x1 !== null) {
      var _x2 = _implicit_fs_con_name;
      return $std_core_types.Just($koka_dash_redex_term.TNode(_x2, _implicit_fs_fields_to_terms(_x1.value)));
    }
    else {
      return $std_core_types.Nothing;
    }
  };
}
 
 
// fields = t-nil → TNode(name, [])
export function nullary_fs_to_matcher(ci, _implicit_fs_con_name) /* forall<a,b> (ci : type-level/con-info/con-info<a,type-level/nil/t-nil,b>, ?con-name : type-level/structs/name<a>) -> to-term-matcher<b> */  {
  return function(v /* 1099 */ ) {
    var _x3 = ci.con_match(v);
    if (_x3 !== null && _x3.value === 1) {
      var _x4 = _implicit_fs_con_name;
      return $std_core_types.Just($koka_dash_redex_term.TNode(_x4, $std_core_types.Nil));
    }
    else {
      return $std_core_types.Nothing;
    }
  };
}
 
export function nil_fs_to_matchers(s, _implicit_fs_to_matcher) /* forall<a,b,c,d> (s : type-level/structs/t-struct<d,type-level/con-info/con-info<a,b,c>,type-level/nil/t-nil>, ?to-matcher : (type-level/con-info/con-info<a,b,c>) -> to-term-matcher<c>) -> list<to-term-matcher<c>> */  {
  var _x5 = s.head_field;
  return $std_core_types.Cons(_implicit_fs_to_matcher(_x5), $std_core_types.Nil);
}
 
export function tstruct_fs_to_matchers(s, _implicit_fs_to_matcher, _implicit_fs_to_matchers) /* forall<a,b,c,d,a1,b1,c1,d1> (s : type-level/structs/t-struct<b1,type-level/con-info/con-info<a,c,a1>,type-level/structs/t-struct<c1,type-level/con-info/con-info<b,d,a1>,d1>>, ?to-matcher : (type-level/con-info/con-info<a,c,a1>) -> to-term-matcher<a1>, ?to-matchers : (type-level/structs/t-struct<c1,type-level/con-info/con-info<b,d,a1>,d1>) -> list<to-term-matcher<a1>>) -> list<to-term-matcher<a1>> */  {
  var _x6 = s.head_field;
  var _x7 = s.rest;
  return $std_core_types.Cons(_implicit_fs_to_matcher(_x6), _implicit_fs_to_matchers(_x7));
}
 
export function generic_to_term(v, matchers) /* forall<a> (v : a, matchers : list<to-term-matcher<a>>) -> div koka-redex/term/term */  { tailcall: while(1)
{
  if (matchers !== null) {
    var _x8 = matchers.head(v);
    if (_x8 !== null) {
      return _x8.value;
    }
    else {
      {
        // tail call
        matchers = matchers.tail;
        continue tailcall;
      }
    }
  }
  else {
    return $koka_dash_redex_term.TAtom("<unknown>");
  }
}}
 
export function derive_to_term(v, info, _implicit_fs_to_matchers) /* forall<a,b> (v : a, info : b, ?to-matchers : (b) -> list<to-term-matcher<a>>) -> div koka-redex/term/term */  {
  return generic_to_term(v, _implicit_fs_to_matchers(info));
}
 
 
// fields = string → match TAtom
export function atom_fs_from_matcher(ci) /* forall<a,b> (ci : type-level/con-info/con-info<a,string,b>) -> from-term-matcher<b> */  {
  return function(t /* koka-redex/term/term */ ) {
    if (t._tag === 2) {
       
      var _x_x0_10078 = $std_core_hnd._open_none1(function(_this /* type-level/con-info/con-info<1573,string,1574> */ ) {
          return _this.con_build;
        }, ci);
      return $std_core_types.Just($std_core_hnd._open_none1(_x_x0_10078, t.name));
    }
    else {
      return $std_core_types.Nothing;
    }
  };
}
 
 
// monadic lift
export function node_fs__mlift_from_matcher_10162(ci, _y_x10044) /* forall<a,b,c,d> (ci : type-level/con-info/con-info<a,type-level/list/t-cons<c,d>,b>, type-level/list/t-cons<c,d>) -> <exn,div> maybe<b> */  {
   
  var _x_x0_10080 = $std_core_hnd._open_none1(function(_this /* type-level/con-info/con-info<1807,type-level/list/t-cons<1809,1810>,1808> */ ) {
      return _this.con_build;
    }, ci);
  return $std_core_types.Just($std_core_hnd._open_none1(_x_x0_10080, _y_x10044));
}
 
 
// fields = t-cons<a, b> → match TNode(name, args), convert args to fields
export function node_fs_from_matcher(ci, _implicit_fs_con_name, _implicit_fs_terms_to_fields) /* forall<a,b,c,d> (ci : type-level/con-info/con-info<a,type-level/list/t-cons<c,d>,b>, ?con-name : type-level/structs/name<a>, ?terms-to-fields : (list<koka-redex/term/term>) -> <exn,div> type-level/list/t-cons<c,d>) -> from-term-matcher<b> */  {
  return function(t /* koka-redex/term/term */ ) {
    if (t._tag === 4) {
      var _x9 = _implicit_fs_con_name;
      if (((t.name) === _x9)){
         
        var x_10185 = _implicit_fs_terms_to_fields(t.args);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10044 /* type-level/list/t-cons<1809,1810> */ ) {
             
            var _x_x0_10080 = $std_core_hnd._open_none1(function(_this /* type-level/con-info/con-info<1807,type-level/list/t-cons<1809,1810>,1808> */ ) {
                return _this.con_build;
              }, ci);
            return $std_core_types.Just($std_core_hnd._open_none1(_x_x0_10080, _y_x10044));
          });
        }
        else {
           
          var _x_x0_10080_0 = $std_core_hnd._open_none1(function(_this_0 /* type-level/con-info/con-info<1807,type-level/list/t-cons<1809,1810>,1808> */ ) {
              return _this_0.con_build;
            }, ci);
          return $std_core_types.Just($std_core_hnd._open_none1(_x_x0_10080_0, x_10185));
        }
      }
    }
    return $std_core_types.Nothing;
  };
}
 
 
// fields = t-nil → match TNode(name, [])
export function nullary_fs_from_matcher(ci, _implicit_fs_con_name) /* forall<a,b> (ci : type-level/con-info/con-info<a,type-level/nil/t-nil,b>, ?con-name : type-level/structs/name<a>) -> from-term-matcher<b> */  {
  return function(t /* koka-redex/term/term */ ) {
    if (t._tag === 4) {
      var _x10 = _implicit_fs_con_name;
      if (((t.name) === _x10)){
         
        var _x_x0_10082 = $std_core_hnd._open_none1(function(_this /* type-level/con-info/con-info<2031,type-level/nil/t-nil,2032> */ ) {
            return _this.con_build;
          }, ci);
        return $std_core_types.Just($std_core_hnd._open_none1(_x_x0_10082, $type_dash_level_nil.TNil));
      }
    }
    return $std_core_types.Nothing;
  };
}
 
export function nil_fs_from_matchers(s, _implicit_fs_from_matcher) /* forall<a,b,c,d> (s : type-level/structs/t-struct<d,type-level/con-info/con-info<a,b,c>,type-level/nil/t-nil>, ?from-matcher : (type-level/con-info/con-info<a,b,c>) -> from-term-matcher<c>) -> list<from-term-matcher<c>> */  {
  var _x11 = s.head_field;
  return $std_core_types.Cons(_implicit_fs_from_matcher(_x11), $std_core_types.Nil);
}
 
export function struct_fs_from_matchers(s, _implicit_fs_from_matcher, _implicit_fs_from_matchers) /* forall<a,b,c,d,a1,b1,c1,d1> (s : type-level/structs/t-struct<b1,type-level/con-info/con-info<a,c,a1>,type-level/structs/t-struct<c1,type-level/con-info/con-info<b,d,a1>,d1>>, ?from-matcher : (type-level/con-info/con-info<a,c,a1>) -> from-term-matcher<a1>, ?from-matchers : (type-level/structs/t-struct<c1,type-level/con-info/con-info<b,d,a1>,d1>) -> list<from-term-matcher<a1>>) -> list<from-term-matcher<a1>> */  {
  var _x12 = s.head_field;
  var _x13 = s.rest;
  return $std_core_types.Cons(_implicit_fs_from_matcher(_x12), _implicit_fs_from_matchers(_x13));
}
 
 
// monadic lift
export function _mlift_generic_from_term_10163(rest, t, _y_x10047) /* forall<a> (rest : list<from-term-matcher<a>>, t : koka-redex/term/term, maybe<a>) -> <exn,div> a */  {
  if (_y_x10047 !== null) {
    return _y_x10047.value;
  }
  else {
    return generic_from_term(t, rest);
  }
}
 
export function generic_from_term(t_0, matchers) /* forall<a> (t : koka-redex/term/term, matchers : list<from-term-matcher<a>>) -> <exn,div> a */  { tailcall: while(1)
{
  if (matchers !== null) {
     
    var x_10190 = matchers.head(t_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10047_0 /* maybe<2486> */ ) {
        return _mlift_generic_from_term_10163(matchers.tail, t_0, _y_x10047_0);
      });
    }
    else {
      if (x_10190 !== null) {
        return x_10190.value;
      }
      else {
        {
          // tail call
          matchers = matchers.tail;
          continue tailcall;
        }
      }
    }
  }
  else {
     
    var _x_x2_10117 = $std_core_hnd._open_none1($koka_dash_redex_term.term_fs_show, t_0);
    return $std_core_exn.$throw($std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "from-term: no constructor matched ", _x_x2_10117));
  }
}}
 
export function derive_from_term(t, info, _implicit_fs_from_matchers) /* forall<a,b> (t : koka-redex/term/term, info : b, ?from-matchers : (b) -> list<from-term-matcher<a>>) -> <exn,div> a */  {
  return generic_from_term(t, $std_core_hnd._open_none1(_implicit_fs_from_matchers, info));
}
 
export function field_witness_fs__copy(_this) /* forall<a> (field-witness<a>) -> field-witness<a> */  {
  return FieldWitness;
}
 
export function end_fs_build_string_tcons(ss, _x_at___wildcard_x223__3) /* (ss : list<string>, field-witness<type-level/nil/t-nil>) -> exn type-level/list/t-cons<string,type-level/nil/t-nil> */  {
  if (ss !== null) {
    return $type_dash_level_list.TCons(ss.head, $type_dash_level_nil.TNil);
  }
  else {
    return $std_core_exn.$throw("build-string-tcons: not enough strings");
  }
}
 
 
// monadic lift
export function tcons_fs__mlift_build_string_tcons_10164(h, _y_x10055) /* forall<a> (h : string, type-level/list/t-cons<string,a>) -> exn type-level/list/t-cons<string,type-level/list/t-cons<string,a>> */  {
  return $type_dash_level_list.TCons(h, _y_x10055);
}
 
export function tcons_fs_build_string_tcons(ss, _x_at___wildcard_x214__3, _implicit_fs_tail_fs_build_string_tcons) /* forall<a,b,c> (ss : list<string>, field-witness<type-level/list/t-cons<a,b>>, ?tail/build-string-tcons : (list<string>, field-witness<b>) -> exn type-level/list/t-cons<string,c>) -> exn type-level/list/t-cons<string,type-level/list/t-cons<string,c>> */  {
  if (ss !== null) {
     
    var x_10193 = _implicit_fs_tail_fs_build_string_tcons(ss.tail, FieldWitness);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10055 /* type-level/list/t-cons<string,2681> */ ) {
        return $type_dash_level_list.TCons(ss.head, _y_x10055);
      });
    }
    else {
      return $type_dash_level_list.TCons(ss.head, x_10193);
    }
  }
  else {
    return $std_core_exn.$throw("build-string-tcons: not enough strings");
  }
}
 
 
// Default name rendering: constructor name as-is
export function default_fs_name_latex(n) /* forall<a> (n : type-level/structs/name<a>) -> string */  {
  return n;
}
 
export function default_fs_name_md(n) /* forall<a> (n : type-level/structs/name<a>) -> string */  {
  return n;
}
 
 
// Automatically generated. Retrieves the `entry` constructor field of the `:latex-entry` type.
export function latex_entry_fs_entry(_this) /* (latex-entry) -> render-entry */  {
  return _this;
}
 
export function latex_entry_fs__copy(_this, entry) /* (latex-entry, entry : ? render-entry) -> latex-entry */  {
  if (entry !== undefined) {
    var _x14 = entry;
  }
  else {
    var _x14 = _this;
  }
  return _x14;
}
 
 
// Automatically generated. Retrieves the `entry` constructor field of the `:md-entry` type.
export function md_entry_fs_entry(_this) /* (md-entry) -> render-entry */  {
  return _this;
}
 
export function md_entry_fs__copy(_this, entry) /* (md-entry, entry : ? render-entry) -> md-entry */  {
  if (entry !== undefined) {
    var _x15 = entry;
  }
  else {
    var _x15 = _this;
  }
  return _x15;
}
 
export function atom_fs_latex_fs_map_field(ci, _implicit_fs_con_name) /* forall<a,b> (ci : type-level/con-info/con-info<a,string,b>, ?con-name : type-level/structs/name<a>) -> latex-entry */  {
  var _x16 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x16, function(_pat_x260__31 /* list<string> */ ) {
      if (_pat_x260__31 !== null) {
        return _pat_x260__31.head;
      }
      else {
        return $std_core_exn.error_pattern("koka-redex/derive(260,31)", "atom/latex/map-field");
      }
    });
}
 
 
// monadic lift
export function node_fs_latex_fs__mlift_map_field_10165(_implicit_fs_con_name, _implicit_fs_render_latex, _y_x10060) /* forall<a,b> (?con-name : type-level/structs/name<a>, ?render-latex : (type-level/structs/name<a>, b) -> <div,exn> string, b) -> exn string */  {
  return _implicit_fs_render_latex(_implicit_fs_con_name, _y_x10060);
}
 
export function node_fs_latex_fs_map_field(ci, _implicit_fs_con_name, _implicit_fs_render_latex, _implicit_fs_build_string_tcons) /* forall<a,b,c,d,a1> (ci : type-level/con-info/con-info<a,type-level/list/t-cons<d,a1>,b>, ?con-name : type-level/structs/name<a>, ?render-latex : (type-level/structs/name<a>, c) -> <div,exn> string, ?build-string-tcons : (list<string>, field-witness<a1>) -> exn c) -> latex-entry */  {
  var _x17 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x17, function(rendered /* list<string> */ ) {
       
      var x_10198 = _implicit_fs_build_string_tcons(rendered, FieldWitness);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10060 /* 2925 */ ) {
          return _implicit_fs_render_latex(_implicit_fs_con_name, _y_x10060);
        });
      }
      else {
        return _implicit_fs_render_latex(_implicit_fs_con_name, x_10198);
      }
    });
}
 
export function default_fs_node_fs_latex_fs_map_field(ci, _implicit_fs_con_name) /* forall<a,b,c,d> (ci : type-level/con-info/con-info<a,type-level/list/t-cons<c,d>,b>, ?con-name : type-level/structs/name<a>) -> latex-entry */  {
  var _x18 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x18, function(rendered /* list<string> */ ) {
       
      var _x_x1_1_10124 = $std_core_hnd._open_none2($std_core_list.joinsep, rendered, ", ");
       
      var _x_x2_0_10123 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_1_10124, ")");
       
      var _x_x2_10121 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "(", _x_x2_0_10123);
      var _x19 = _implicit_fs_con_name;
      return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x19, _x_x2_10121);
    });
}
 
export function nullary_fs_latex_fs_map_field(ci, _implicit_fs_con_name, _implicit_fs_name_latex) /* forall<a,b> (ci : type-level/con-info/con-info<a,type-level/nil/t-nil,b>, ?con-name : type-level/structs/name<a>, ?name-latex : (type-level/structs/name<a>) -> string) -> latex-entry */  {
  var _x20 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x20, function(_x_at___wildcard_x282__25 /* list<string> */ ) {
      return $std_core_hnd._open_none1(_implicit_fs_name_latex, _implicit_fs_con_name);
    });
}
 
export function atom_fs_md_fs_map_field(ci, _implicit_fs_con_name) /* forall<a,b> (ci : type-level/con-info/con-info<a,string,b>, ?con-name : type-level/structs/name<a>) -> md-entry */  {
  var _x21 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x21, function(_pat_x289__29 /* list<string> */ ) {
      if (_pat_x289__29 !== null) {
        return _pat_x289__29.head;
      }
      else {
        return $std_core_exn.error_pattern("koka-redex/derive(289,29)", "atom/md/map-field");
      }
    });
}
 
 
// monadic lift
export function node_fs_md_fs__mlift_map_field_10166(_implicit_fs_con_name, _implicit_fs_render_md, _y_x10064) /* forall<a,b> (?con-name : type-level/structs/name<a>, ?render-md : (type-level/structs/name<a>, b) -> <div,exn> string, b) -> exn string */  {
  return _implicit_fs_render_md(_implicit_fs_con_name, _y_x10064);
}
 
export function node_fs_md_fs_map_field(ci, _implicit_fs_con_name, _implicit_fs_render_md, _implicit_fs_build_string_tcons) /* forall<a,b,c,d,a1> (ci : type-level/con-info/con-info<a,type-level/list/t-cons<d,a1>,b>, ?con-name : type-level/structs/name<a>, ?render-md : (type-level/structs/name<a>, c) -> <div,exn> string, ?build-string-tcons : (list<string>, field-witness<a1>) -> exn c) -> md-entry */  {
  var _x22 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x22, function(rendered /* list<string> */ ) {
       
      var x_10203 = _implicit_fs_build_string_tcons(rendered, FieldWitness);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10064 /* 3296 */ ) {
          return _implicit_fs_render_md(_implicit_fs_con_name, _y_x10064);
        });
      }
      else {
        return _implicit_fs_render_md(_implicit_fs_con_name, x_10203);
      }
    });
}
 
export function default_fs_node_fs_md_fs_map_field(ci, _implicit_fs_con_name) /* forall<a,b,c,d> (ci : type-level/con-info/con-info<a,type-level/list/t-cons<c,d>,b>, ?con-name : type-level/structs/name<a>) -> md-entry */  {
  var _x23 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x23, function(rendered /* list<string> */ ) {
       
      var _x_x1_10129 = $std_core_hnd._open_none1(function(name_0 /* type-level/structs/name<3448> */ ) {
          return name_0;
        }, _implicit_fs_con_name);
       
      var _x_x1_2_10134 = $std_core_hnd._open_none2($std_core_list.joinsep, rendered, ", ");
       
      var _x_x2_0_10133 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_2_10134, ")");
       
      var _x_x2_10130 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "(", _x_x2_0_10133);
      return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_10129, _x_x2_10130);
    });
}
 
export function nullary_fs_md_fs_map_field(ci, _implicit_fs_con_name, _implicit_fs_name_md) /* forall<a,b> (ci : type-level/con-info/con-info<a,type-level/nil/t-nil,b>, ?con-name : type-level/structs/name<a>, ?name-md : (type-level/structs/name<a>) -> string) -> md-entry */  {
  var _x24 = _implicit_fs_con_name;
  return $std_core_types.Tuple2(_x24, function(_x_at___wildcard_x311__22 /* list<string> */ ) {
      return $std_core_hnd._open_none1(_implicit_fs_name_md, _implicit_fs_con_name);
    });
}
 
 
// monadic lift
export function _mlift_render_term_10167(name, rendered_args, _y_x10069) /* (name : string, rendered-args : list<string>, maybe<render-entry>) -> <div,exn> string */  {
  if (_y_x10069 !== null) {
    return _y_x10069.value.snd(rendered_args);
  }
  else {
     
    var _x_x1_3_10145 = $std_core_hnd._open_none2($std_core_list.joinsep, rendered_args, ", ");
     
    var _x_x2_0_10144 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_3_10145, ")");
     
    var _x_x2_10142 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "(", _x_x2_0_10144);
    return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, name, _x_x2_10142);
  }
}
 
 
// monadic lift
export function _mlift_render_term_10168(entries, name_0, rendered_args_0) /* (entries : list<render-entry>, name : string, rendered-args : list<string>) -> <div,exn> string */  {
   
  var x_10208 = $std_core_list.find(entries, function(e /* render-entry */ ) {
      return (($std_core_hnd._open_none1(function(tuple2 /* (string, render-fmt) */ ) {
          return tuple2.fst;
        }, e)) === name_0);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10069_0 /* maybe<render-entry> */ ) {
      return _mlift_render_term_10167(name_0, rendered_args_0, _y_x10069_0);
    });
  }
  else {
    return _mlift_render_term_10167(name_0, rendered_args_0, x_10208);
  }
}
 
export function render_term(t, entries_0, var_render) /* (t : koka-redex/term/term, entries : list<render-entry>, var-render : (string, int) -> pure string) -> pure string */  {
  if (t._tag === 1) {
    return var_render(t.name, t.id);
  }
  else if (t._tag === 2) {
    return t.name;
  }
  else if (t._tag === 3) {
    return $std_core_hnd._open_none1($std_core_int.show, t.value);
  }
  else if (t._tag === 4) {
     
    var x_0_10210 = $std_core_list.map(t.args, function(a /* koka-redex/term/term */ ) {
        return render_term(a, entries_0, var_render);
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(rendered_args_1 /* list<string> */ ) {
        return _mlift_render_term_10168(entries_0, t.name, rendered_args_1);
      });
    }
    else {
       
      var x_1_10213 = $std_core_list.find(entries_0, function(e_0 /* render-entry */ ) {
          return (($std_core_hnd._open_none1(function(tuple2_0 /* (string, render-fmt) */ ) {
              return tuple2_0.fst;
            }, e_0)) === (t.name));
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10069_1 /* maybe<render-entry> */ ) {
          return _mlift_render_term_10167(t.name, x_0_10210, _y_x10069_1);
        });
      }
      else {
        if (x_1_10213 !== null) {
          return x_1_10213.value.snd(x_0_10210);
        }
        else {
           
          var _x_x1_3_10145_0 = $std_core_hnd._open_none2($std_core_list.joinsep, x_0_10210, ", ");
           
          var _x_x2_0_10144_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_3_10145_0, ")");
           
          var _x_x2_10142_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "(", _x_x2_0_10144_0);
          return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, t.name, _x_x2_10142_0);
        }
      }
    }
  }
  else {
    return $std_core_exn.error_pattern("koka-redex/derive(323, 3)", "render-term");
  }
}
 
 
// Default var renderers
export function latex_fs_var_render(nm, id) /* (nm : string, id : int) -> pure string */  {
  if ($std_core_types._int_eq(id,0)) {
    return nm;
  }
  else {
     
    var _x_x1_1_10153 = $std_core_hnd._open_none1($std_core_int.show, id);
     
    var _x_x2_0_10152 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_1_10153, "}");
     
    var _x_x2_10150 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "_{", _x_x2_0_10152);
    return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, nm, _x_x2_10150);
  }
}
 
export function md_fs_var_render(nm, id) /* (nm : string, id : int) -> pure string */  {
  if ($std_core_types._int_eq(id,0)) {
    return nm;
  }
  else {
     
    var _x_x2_10157 = $std_core_hnd._open_none1($std_core_int.show, id);
    return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, nm, _x_x2_10157);
  }
}
 
export function make_term_renderer(entries, _implicit_fs_var_render) /* (entries : list<render-entry>, ?var-render : (string, int) -> pure string) -> term-renderer */  {
  return function(t /* koka-redex/term/term */ ) {
    return render_term(t, entries, _implicit_fs_var_render);
  };
}
 
export function derive_term_renderer(info, _implicit_fs_to_render_entries, _implicit_fs_var_render) /* forall<a,b> (info : b, ?to-render-entries : (b) -> list<render-entry>, ?var-render : (string, int) -> <div,exn> string) -> term-renderer */  {
   
  var entries_10034 = _implicit_fs_to_render_entries(info);
  return function(t /* koka-redex/term/term */ ) {
    return render_term(t, entries_10034, _implicit_fs_var_render);
  };
}