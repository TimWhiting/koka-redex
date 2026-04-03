// Koka generated module: koka-redex/markdown, koka version: 3.2.4
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
import * as $koka_dash_redex_term from './koka_dash_redex_term.mjs';
import * as $std_core from './std_core.mjs';
import * as $type_dash_level_structs from './type_dash_level_structs.mjs';
import * as $type_dash_level_list from './type_dash_level_list.mjs';
import * as $type_dash_level_nil from './type_dash_level_nil.mjs';
import * as $koka_dash_redex_syntax from './koka_dash_redex_syntax.mjs';
import * as $koka_dash_redex_pattern from './koka_dash_redex_pattern.mjs';
 
// externals
 
// type declarations
// type mdstr
export function Mdstr(s) /* (s : string) -> mdstr */  {
  return s;
}
 
// declarations
 
 
// Helper to wrap text in latex math block for markdown
export function math(s) /* (s : string) -> string */  {
  return $std_core_types._lp__plus__plus__rp_("$", $std_core_types._lp__plus__plus__rp_(s, "$"));
}
 
 
// No premises
export function tnil_fs_show_md_premises(_x_at___wildcard_x20__31) /* forall<e> (type-level/nil/t-nil) -> e list<string> */  {
  return $std_core_types.Nil;
}
 
 
// Format `t-nil`
export function tnil_fs_show_markdown(_x_at___wildcard_x40__28) /* forall<e> (type-level/nil/t-nil) -> e list<string> */  {
  return $std_core_types.Nil;
}
 
 
// Automatically generated. Retrieves the `s` constructor field of the `:mdstr` type.
export function mdstr_fs_s(mdstr) /* (mdstr : mdstr) -> string */  {
  return mdstr;
}
 
export function mdstr_fs__copy(_this, s) /* (mdstr, s : ? string) -> mdstr */  {
  if (s !== undefined) {
    var _x0 = s;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
export function pat_fs_show_md(p, _implicit_fs_term_show_md) /* forall<a> (p : koka-redex/pattern/pat<a>, ?term-show-md : (koka-redex/term/term) -> <div,exn> string) -> <div,exn> string */  {
  if (p._tag === 1) {
    return p.nm;
  }
  else {
    return _implicit_fs_term_show_md(p.t);
  }
}
 
 
// monadic lift
export function default_fs__mlift_show_markdown_10075(_y_x10003) /* forall<e> (string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10003, $std_core_types.Nil);
}
 
 
// Single element
export function default_fs_show_markdown(a, _implicit_fs_show_md) /* forall<a,e> (a : a, ?show-md : (a) -> e string) -> e list<string> */  {
   
  var x_10092 = _implicit_fs_show_md(a);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10003 /* string */ ) {
      return $std_core_types.Cons(_y_x10003, $std_core_types.Nil);
    });
  }
  else {
    return $std_core_types.Cons(x_10092, $std_core_types.Nil);
  }
}
 
 
// monadic lift
export function default_fs__mlift_show_md_premises_10076(_y_x10004) /* forall<e> (string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10004, $std_core_types.Nil);
}
 
 
// Single premise (bare value)
export function default_fs_show_md_premises(a, _implicit_fs_show_md) /* forall<a,e> (a : a, ?show-md : (a) -> e string) -> e list<string> */  {
   
  var x_10096 = _implicit_fs_show_md(a);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10004 /* string */ ) {
      return $std_core_types.Cons(_y_x10004, $std_core_types.Nil);
    });
  }
  else {
    return $std_core_types.Cons(x_10096, $std_core_types.Nil);
  }
}
 
 
// monadic lift
export function rule_fs__mlift_show_markdown_10077(_y_x10008, conc_md, _c_x10009) /* forall<e> (string, conc-md : string, string) -> string */  {
   
  var _x_x2_6_10060 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, conc_md, "\n");
   
  var _x_x2_5_10058 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _c_x10009, _x_x2_6_10060);
   
  var _x_x2_4_10056 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "**\n", _x_x2_5_10058);
   
  var _x_x2_3_10054 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10008, _x_x2_4_10056);
  return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "**", _x_x2_3_10054);
}
 
 
// monadic lift
export function rule_fs__mlift_show_markdown_10078(conc_md, premises_md, _y_x10008) /* forall<e> (conc-md : string, premises-md : string, string) -> e string */  {
   
  if ((premises_md === (""))) {
    var x_10100 = "";
  }
  else {
    var x_10100 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, premises_md, "\n--------\n");
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10009 /* string */ ) {
      return rule_fs__mlift_show_markdown_10077(_y_x10008, conc_md, _c_x10009);
    });
  }
  else {
    return rule_fs__mlift_show_markdown_10077(_y_x10008, conc_md, x_10100);
  }
}
 
 
// monadic lift
export function rule_fs__mlift_show_markdown_10079(name, premises_md, _implicit_fs_name_fs_show_md, _y_x10007) /* forall<e,a> (name : a, premises-md : string, ?name/show-md : (a) -> e string, string) -> e string */  {
   
  var conc_md = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "- ", _y_x10007);
   
  var x_10102 = _implicit_fs_name_fs_show_md(name);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10008 /* string */ ) {
      return rule_fs__mlift_show_markdown_10078(conc_md, premises_md, _y_x10008);
    });
  }
  else {
    return rule_fs__mlift_show_markdown_10078(conc_md, premises_md, x_10102);
  }
}
 
 
// monadic lift
export function rule_fs__mlift_show_markdown_10080(conclusion, name, _implicit_fs_conclusion_fs_show_md, _implicit_fs_name_fs_show_md, _y_x10006) /* forall<a,e,b> (conclusion : a, name : b, ?conclusion/show-md : (a) -> e string, ?name/show-md : (b) -> e string, list<string>) -> e string */  {
   
  var premises_md = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10006, "\n");
   
  var x_10104 = _implicit_fs_conclusion_fs_show_md(conclusion);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10007 /* string */ ) {
      return rule_fs__mlift_show_markdown_10079(name, premises_md, _implicit_fs_name_fs_show_md, _y_x10007);
    });
  }
  else {
    return rule_fs__mlift_show_markdown_10079(name, premises_md, _implicit_fs_name_fs_show_md, x_10104);
  }
}
 
 
// monadic lift
export function rule_fs__mlift_show_markdown_10081(conclusion, name, _implicit_fs_conclusion_fs_show_md, _implicit_fs_name_fs_show_md, _y_x10005) /* forall<a,e,b> (conclusion : a, name : b, ?conclusion/show-md : (a) -> e string, ?name/show-md : (b) -> e string, list<string>) -> e string */  {
   
  var x_10106 = $std_core_list.map(_y_x10005, function(s /* string */ ) {
      return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "- ", s);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10006 /* list<string> */ ) {
      return rule_fs__mlift_show_markdown_10080(conclusion, name, _implicit_fs_conclusion_fs_show_md, _implicit_fs_name_fs_show_md, _y_x10006);
    });
  }
  else {
    return rule_fs__mlift_show_markdown_10080(conclusion, name, _implicit_fs_conclusion_fs_show_md, _implicit_fs_name_fs_show_md, x_10106);
  }
}
 
export function rule_fs_show_markdown(_pat_x57__28, _implicit_fs_show_md_premises, _implicit_fs_conclusion_fs_show_md, _implicit_fs_name_fs_show_md) /* forall<a,e,b,c> (koka-redex/syntax/rule<b,c,a>, ?show-md-premises : (c) -> e list<string>, ?conclusion/show-md : (a) -> e string, ?name/show-md : (b) -> e string) -> e string */  {
   
  var x_10108 = _implicit_fs_show_md_premises(_pat_x57__28.premises);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10005 /* list<string> */ ) {
      return rule_fs__mlift_show_markdown_10081(_pat_x57__28.conclusion, _pat_x57__28.name, _implicit_fs_conclusion_fs_show_md, _implicit_fs_name_fs_show_md, _y_x10005);
    });
  }
  else {
     
    var x_0_10111 = $std_core_list.map(x_10108, function(s /* string */ ) {
        return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "- ", s);
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10006 /* list<string> */ ) {
        return rule_fs__mlift_show_markdown_10080(_pat_x57__28.conclusion, _pat_x57__28.name, _implicit_fs_conclusion_fs_show_md, _implicit_fs_name_fs_show_md, _y_x10006);
      });
    }
    else {
       
      var premises_md = $std_core_hnd._open_none2($std_core_list.joinsep, x_0_10111, "\n");
       
      var x_1_10114 = _implicit_fs_conclusion_fs_show_md(_pat_x57__28.conclusion);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10007 /* string */ ) {
          return rule_fs__mlift_show_markdown_10079(_pat_x57__28.name, premises_md, _implicit_fs_name_fs_show_md, _y_x10007);
        });
      }
      else {
         
        var conc_md = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "- ", x_1_10114);
         
        var x_2_10117 = _implicit_fs_name_fs_show_md(_pat_x57__28.name);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10008 /* string */ ) {
            return rule_fs__mlift_show_markdown_10078(conc_md, premises_md, _y_x10008);
          });
        }
        else {
           
          if ((premises_md === (""))) {
            var x_3_10120 = "";
          }
          else {
            var x_3_10120 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, premises_md, "\n--------\n");
          }
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_c_x10009 /* string */ ) {
              return rule_fs__mlift_show_markdown_10077(x_2_10117, conc_md, _c_x10009);
            });
          }
          else {
             
            var _x_x2_6_10060 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, conc_md, "\n");
             
            var _x_x2_5_10058 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_3_10120, _x_x2_6_10060);
             
            var _x_x2_4_10056 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "**\n", _x_x2_5_10058);
             
            var _x_x2_3_10054 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_2_10117, _x_x2_4_10056);
            return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "**", _x_x2_3_10054);
          }
        }
      }
    }
  }
}
 
 
// Skip premise-sep marker
export function sep_fs_show_md_premises(_pat_x24__30, _implicit_fs_show_md_premises) /* forall<a,e> (type-level/list/t-cons<koka-redex/syntax/premise-sep,a>, ?show-md-premises : (a) -> e list<string>) -> e list<string> */  {
  var _x1 = _pat_x24__30.tail;
  return _implicit_fs_show_md_premises(_x1);
}
 
 
// monadic lift
export function tcons_fs__mlift_show_markdown_10082(_y_x10012, _y_x10013) /* forall<e> (string, list<string>) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10012, _y_x10013);
}
 
 
// monadic lift
export function tcons_fs__mlift_show_markdown_10083(_implicit_fs_show_markdown, t, _y_x10012) /* forall<a,e> (?show-markdown : (a) -> e list<string>, t : a, string) -> e list<string> */  {
   
  var x_10123 = _implicit_fs_show_markdown(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10013 /* list<string> */ ) {
      return $std_core_types.Cons(_y_x10012, _y_x10013);
    });
  }
  else {
    return $std_core_types.Cons(_y_x10012, x_10123);
  }
}
 
 
// Format `tcons` within a judgement
export function tcons_fs_show_markdown(_pat_x44__29, _implicit_fs_show_md, _implicit_fs_show_markdown) /* forall<a,b,e> (type-level/list/t-cons<a,b>, ?show-md : (a) -> e string, ?show-markdown : (b) -> e list<string>) -> e list<string> */  {
   
  var x_10127 = _implicit_fs_show_md(_pat_x44__29.head);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10012 /* string */ ) {
      return tcons_fs__mlift_show_markdown_10083(_implicit_fs_show_markdown, _pat_x44__29.tail, _y_x10012);
    });
  }
  else {
     
    var x_0_10130 = _implicit_fs_show_markdown(_pat_x44__29.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10013 /* list<string> */ ) {
        return $std_core_types.Cons(x_10127, _y_x10013);
      });
    }
    else {
      return $std_core_types.Cons(x_10127, x_0_10130);
    }
  }
}
 
 
// monadic lift
export function tcons_fs__mlift_show_md_10084(_y_x10015) /* forall<e> (list<string>) -> e string */  {
  return $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10015, " ");
}
 
 
// A judgement (tcons chain) as a single string
export function tcons_fs_show_md(l, _implicit_fs_show_markdown) /* forall<a,b,e> (l : type-level/list/t-cons<a,b>, ?show-markdown : (type-level/list/t-cons<a,b>) -> e list<string>) -> e string */  {
   
  var x_10135 = _implicit_fs_show_markdown(l);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10015 /* list<string> */ ) {
      return $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10015, " ");
    });
  }
  else {
    return $std_core_hnd._open_none2($std_core_list.joinsep, x_10135, " ");
  }
}
 
 
// monadic lift
export function tcons_prem_fs__mlift_show_md_premises_10085(_y_x10016, _y_x10017) /* forall<e> (string, list<string>) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10016, _y_x10017);
}
 
 
// monadic lift
export function tcons_prem_fs__mlift_show_md_premises_10086(_implicit_fs_show_md_premises, t, _y_x10016) /* forall<a,e> (?show-md-premises : (a) -> e list<string>, t : a, string) -> e list<string> */  {
   
  var x_10139 = _implicit_fs_show_md_premises(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10017 /* list<string> */ ) {
      return $std_core_types.Cons(_y_x10016, _y_x10017);
    });
  }
  else {
    return $std_core_types.Cons(_y_x10016, x_10139);
  }
}
 
 
// Premise whose head is a judgement chain (tcons)
export function tcons_prem_fs_show_md_premises(_pat_x28__37, _implicit_fs_show_md, _implicit_fs_show_md_premises) /* forall<a,b,c,e> (type-level/list/t-cons<type-level/list/t-cons<a,b>,c>, ?show-md : (type-level/list/t-cons<a,b>) -> e string, ?show-md-premises : (c) -> e list<string>) -> e list<string> */  {
   
  var x_10143 = _implicit_fs_show_md(_pat_x28__37.head);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10016 /* string */ ) {
      return tcons_prem_fs__mlift_show_md_premises_10086(_implicit_fs_show_md_premises, _pat_x28__37.tail, _y_x10016);
    });
  }
  else {
     
    var x_0_10146 = _implicit_fs_show_md_premises(_pat_x28__37.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10017 /* list<string> */ ) {
        return $std_core_types.Cons(x_10143, _y_x10017);
      });
    }
    else {
      return $std_core_types.Cons(x_10143, x_0_10146);
    }
  }
}
 
 
// monadic lift
export function _mlift_map_field_10087(_y_x10019) /* forall<e> (string) -> e mdstr */  {
  return _y_x10019;
}
 
export function map_field(r, _implicit_fs_show_markdown) /* forall<a,e,b,c> (r : koka-redex/syntax/rule<b,c,a>, ?show-markdown : (koka-redex/syntax/rule<b,c,a>) -> e string) -> e mdstr */  {
   
  var x_10151 = _implicit_fs_show_markdown(r);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10019 /* string */ ) {
      return _y_x10019;
    });
  }
  else {
    return x_10151;
  }
}
 
 
// External entries are skipped in Markdown rendering
export function ext_fs_map_field(_x_at___wildcard_x71__23) /* forall<e> (koka-redex/syntax/external-entry) -> e mdstr */  {
  return "";
}
 
 
// monadic lift
export function _mlift_relation_to_md_10088(_c_x10020, _y_x10023) /* forall<e> (string, list<string>) -> e string */  {
   
  var _x_x2_1_10072 = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10023, "\n");
  return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _c_x10020, _x_x2_1_10072);
}
 
 
// monadic lift
export function _mlift_relation_to_md_10089(_c_x10020, _y_x10022) /* forall<e> (string, list<mdstr>) -> e string */  {
   
  var x_10155 = $std_core_list.map(_y_x10022, function(_x_x1_3 /* mdstr */ ) {
      return $std_core_hnd._open_none1(mdstr_fs_s, _x_x1_3);
    });
   
  function next_10156(_y_x10023) /* (list<string>) -> 1611 string */  {
     
    var _x_x2_1_10072 = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10023, "\n");
    return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _c_x10020, _x_x2_1_10072);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10156);
  }
  else {
    return next_10156(x_10155);
  }
}
 
 
// monadic lift
export function _mlift_relation_to_md_10090(_c_x10020, _y_x10021) /* forall<e> (string, list<mdstr>) -> e string */  {
   
  var x_10159 = $std_core_list.filter(_y_x10021, function(l /* mdstr */ ) {
       
      var s_0_10040 = $std_core_hnd._open_none1(function(mdstr /* mdstr */ ) {
          return mdstr;
        }, l);
       
      var _x_x1_1_10070 = (s_0_10040 === (""));
      return $std_core_hnd._open_none1(function(b /* bool */ ) {
          return (b) ? false : true;
        }, _x_x1_1_10070);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10022 /* list<mdstr> */ ) {
      return _mlift_relation_to_md_10089(_c_x10020, _y_x10022);
    });
  }
  else {
    return _mlift_relation_to_md_10089(_c_x10020, x_10159);
  }
}
 
 
// monadic lift
export function _mlift_relation_to_md_10091(rules, _implicit_fs_to_list, _c_x10020) /* forall<e,a> (rules : a, ?to-list : (a) -> e list<mdstr>, string) -> string */  {
   
  var x_10161 = _implicit_fs_to_list(rules);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10021 /* list<mdstr> */ ) {
      return _mlift_relation_to_md_10090(_c_x10020, _y_x10021);
    });
  }
  else {
    return _mlift_relation_to_md_10090(_c_x10020, x_10161);
  }
}
 
export function relation_to_md(_pat_x74__24, name, _implicit_fs_to_list) /* forall<e,a> (koka-redex/syntax/relation-def<a>, name : ? string, ?to-list : (a) -> e list<mdstr>) -> e string */  {
   
  var _x3 = (name !== undefined) ? name : "";
  var _x2 = (_x3 === (""));
  if (_x2) {
    var x_10163 = "";
  }
  else {
     
    var _x4 = (name !== undefined) ? name : "";
    var _x_x2_10066 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x4, "\n\n");
    var x_10163 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "# ", _x_x2_10066);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10020 /* string */ ) {
      return _mlift_relation_to_md_10091(_pat_x74__24, _implicit_fs_to_list, _c_x10020);
    });
  }
  else {
     
    var x_0_10166 = _implicit_fs_to_list(_pat_x74__24);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10021 /* list<mdstr> */ ) {
        return _mlift_relation_to_md_10090(x_10163, _y_x10021);
      });
    }
    else {
       
      var x_1_10169 = $std_core_list.filter(x_0_10166, function(l /* mdstr */ ) {
           
          var s_0_10040 = $std_core_hnd._open_none1(function(mdstr /* mdstr */ ) {
              return mdstr;
            }, l);
           
          var _x_x1_1_10070 = (s_0_10040 === (""));
          return $std_core_hnd._open_none1(function(b /* bool */ ) {
              return (b) ? false : true;
            }, _x_x1_1_10070);
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10022 /* list<mdstr> */ ) {
          return _mlift_relation_to_md_10089(x_10163, _y_x10022);
        });
      }
      else {
         
        var x_2_10172 = $std_core_list.map(x_1_10169, function(_x_x1_3 /* mdstr */ ) {
            return $std_core_hnd._open_none1(mdstr_fs_s, _x_x1_3);
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10023 /* list<string> */ ) {
             
            var _x_x2_1_10072 = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10023, "\n");
            return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_10163, _x_x2_1_10072);
          });
        }
        else {
           
          var _x_x2_1_10072_0 = $std_core_hnd._open_none2($std_core_list.joinsep, x_2_10172, "\n");
          return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_10163, _x_x2_1_10072_0);
        }
      }
    }
  }
}