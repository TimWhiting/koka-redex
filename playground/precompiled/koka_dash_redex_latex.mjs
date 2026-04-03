// Koka generated module: koka-redex/latex, koka version: 3.2.4
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
import * as $std_core_undiv from './std_core_undiv.mjs';
 
// externals
 
// type declarations
// type latexstr
export function Latexstr(s) /* (s : string) -> latexstr */  {
  return s;
}
 
// declarations
 
 
// No premises
export function tnil_fs_show_latex_premises(_x_at___wildcard_x17__34) /* forall<e> (type-level/nil/t-nil) -> e list<string> */  {
  return $std_core_types.Nil;
}
 
 
// Format `t-nil`
export function tnil_fs_show_latex_tokens(_x_at___wildcard_x37__32) /* forall<e> (type-level/nil/t-nil) -> e list<string> */  {
  return $std_core_types.Nil;
}
 
 
// Automatically generated. Retrieves the `s` constructor field of the `:latexstr` type.
export function latexstr_fs_s(latexstr) /* (latexstr : latexstr) -> string */  {
  return latexstr;
}
 
export function latexstr_fs__copy(_this, s) /* (latexstr, s : ? string) -> latexstr */  {
  if (s !== undefined) {
    var _x0 = s;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
export function pat_fs_show_latex(p, _implicit_fs_term_show_latex) /* forall<a> (p : koka-redex/pattern/pat<a>, ?term-show-latex : (koka-redex/term/term) -> <div,exn> string) -> <div,exn> string */  {
  if (p._tag === 1) {
    if ($std_core_types._int_eq((p.id),0)) {
      return p.nm;
    }
    else {
       
      var _x_x1_1_10046 = $std_core_hnd._open_none1($std_core_int.show, p.id);
       
      var _x_x2_0_10045 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_1_10046, "}");
       
      var _x_x2_10043 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "_{", _x_x2_0_10045);
      return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, p.nm, _x_x2_10043);
    }
  }
  else {
    return _implicit_fs_term_show_latex(p.t);
  }
}
 
 
// monadic lift
export function default_fs__mlift_show_latex_premises_10073(_y_x10004) /* forall<e> (string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10004, $std_core_types.Nil);
}
 
 
// Single premise (bare value, not tcons) — base case
export function default_fs_show_latex_premises(a, _implicit_fs_show_latex) /* forall<a,e> (a : a, ?show-latex : (a) -> e string) -> e list<string> */  {
   
  var x_10087 = _implicit_fs_show_latex(a);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10004 /* string */ ) {
      return $std_core_types.Cons(_y_x10004, $std_core_types.Nil);
    });
  }
  else {
    return $std_core_types.Cons(x_10087, $std_core_types.Nil);
  }
}
 
 
// monadic lift
export function default_fs__mlift_show_latex_tokens_10074(_y_x10005) /* forall<e> (string) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10005, $std_core_types.Nil);
}
 
 
// Single element as list
export function default_fs_show_latex_tokens(a, _implicit_fs_show_latex) /* forall<a,e> (a : a, ?show-latex : (a) -> e string) -> e list<string> */  {
   
  var x_10091 = _implicit_fs_show_latex(a);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10005 /* string */ ) {
      return $std_core_types.Cons(_y_x10005, $std_core_types.Nil);
    });
  }
  else {
    return $std_core_types.Cons(x_10091, $std_core_types.Nil);
  }
}
 
 
// monadic lift
export function rule_fs__mlift_show_latex_10075(conc_str, premises_str, _y_x10008) /* forall<e> (conc-str : string, premises-str : string, string) -> e string */  {
   
  var _x_x2_4_10060 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, conc_str, " }");
   
  var _x_x2_3_10058 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, " }\n  { ", _x_x2_4_10060);
   
  var _x_x2_2_10056 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, premises_str, _x_x2_3_10058);
   
  var _x_x2_1_10054 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "]\n  { ", _x_x2_2_10056);
   
  var _x_x2_0_10052 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10008, _x_x2_1_10054);
  return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\\inferrule*[Right=", _x_x2_0_10052);
}
 
 
// monadic lift
export function rule_fs__mlift_show_latex_10076(name, premises_str, _implicit_fs_name_fs_show_latex, conc_str) /* forall<e,a> (name : a, premises-str : string, ?name/show-latex : (a) -> e string, conc-str : string) -> e string */  {
   
  var x_10095 = _implicit_fs_name_fs_show_latex(name);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10008 /* string */ ) {
      return rule_fs__mlift_show_latex_10075(conc_str, premises_str, _y_x10008);
    });
  }
  else {
    return rule_fs__mlift_show_latex_10075(conc_str, premises_str, x_10095);
  }
}
 
 
// monadic lift
export function rule_fs__mlift_show_latex_10077(conclusion, name, _implicit_fs_conclusion_fs_show_latex, _implicit_fs_name_fs_show_latex, _y_x10006) /* forall<a,e,b> (conclusion : a, name : b, ?conclusion/show-latex : (a) -> e string, ?name/show-latex : (b) -> e string, list<string>) -> e string */  {
   
  var premises_str = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10006, " \\\\\\\\ ");
   
  var x_10097 = _implicit_fs_conclusion_fs_show_latex(conclusion);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(conc_str /* string */ ) {
      return rule_fs__mlift_show_latex_10076(name, premises_str, _implicit_fs_name_fs_show_latex, conc_str);
    });
  }
  else {
    return rule_fs__mlift_show_latex_10076(name, premises_str, _implicit_fs_name_fs_show_latex, x_10097);
  }
}
 
export function rule_fs_show_latex(_pat_x54__25, _implicit_fs_show_latex_premises, _implicit_fs_conclusion_fs_show_latex, _implicit_fs_name_fs_show_latex) /* forall<a,e,b,c> (koka-redex/syntax/rule<b,c,a>, ?show-latex-premises : (c) -> e list<string>, ?conclusion/show-latex : (a) -> e string, ?name/show-latex : (b) -> e string) -> e string */  {
   
  var x_10099 = _implicit_fs_show_latex_premises(_pat_x54__25.premises);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10006 /* list<string> */ ) {
      return rule_fs__mlift_show_latex_10077(_pat_x54__25.conclusion, _pat_x54__25.name, _implicit_fs_conclusion_fs_show_latex, _implicit_fs_name_fs_show_latex, _y_x10006);
    });
  }
  else {
     
    var premises_str = $std_core_hnd._open_none2($std_core_list.joinsep, x_10099, " \\\\\\\\ ");
     
    var x_0_10102 = _implicit_fs_conclusion_fs_show_latex(_pat_x54__25.conclusion);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(conc_str /* string */ ) {
        return rule_fs__mlift_show_latex_10076(_pat_x54__25.name, premises_str, _implicit_fs_name_fs_show_latex, conc_str);
      });
    }
    else {
       
      var x_1_10105 = _implicit_fs_name_fs_show_latex(_pat_x54__25.name);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10008 /* string */ ) {
          return rule_fs__mlift_show_latex_10075(x_0_10102, premises_str, _y_x10008);
        });
      }
      else {
         
        var _x_x2_4_10060 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_0_10102, " }");
         
        var _x_x2_3_10058 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, " }\n  { ", _x_x2_4_10060);
         
        var _x_x2_2_10056 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, premises_str, _x_x2_3_10058);
         
        var _x_x2_1_10054 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "]\n  { ", _x_x2_2_10056);
         
        var _x_x2_0_10052 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_1_10105, _x_x2_1_10054);
        return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\\inferrule*[Right=", _x_x2_0_10052);
      }
    }
  }
}
 
 
// Skip premise-sep marker, continue with tail
export function sep_fs_show_latex_premises(_pat_x21__33, _implicit_fs_show_latex_premises) /* forall<a,e> (type-level/list/t-cons<koka-redex/syntax/premise-sep,a>, ?show-latex-premises : (a) -> e list<string>) -> e list<string> */  {
  var _x1 = _pat_x21__33.tail;
  return _implicit_fs_show_latex_premises(_x1);
}
 
 
// monadic lift
export function tcons_fs__mlift_show_latex_10078(_y_x10011) /* forall<e> (list<string>) -> e string */  {
  return $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10011, " ");
}
 
 
// A judgement (tcons chain) rendered as a single string by joining tokens with spaces
export function tcons_fs_show_latex(l, _implicit_fs_show_latex_tokens) /* forall<a,b,e> (l : type-level/list/t-cons<a,b>, ?show-latex-tokens : (type-level/list/t-cons<a,b>) -> e list<string>) -> e string */  {
   
  var x_10108 = _implicit_fs_show_latex_tokens(l);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10011 /* list<string> */ ) {
      return $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10011, " ");
    });
  }
  else {
    return $std_core_hnd._open_none2($std_core_list.joinsep, x_10108, " ");
  }
}
 
 
// monadic lift
export function tcons_fs__mlift_show_latex_tokens_10079(_y_x10012, _y_x10013) /* forall<e> (string, list<string>) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10012, _y_x10013);
}
 
 
// monadic lift
export function tcons_fs__mlift_show_latex_tokens_10080(_implicit_fs_show_latex_tokens, t, _y_x10012) /* forall<a,e> (?show-latex-tokens : (a) -> e list<string>, t : a, string) -> e list<string> */  {
   
  var x_10112 = _implicit_fs_show_latex_tokens(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10013 /* list<string> */ ) {
      return $std_core_types.Cons(_y_x10012, _y_x10013);
    });
  }
  else {
    return $std_core_types.Cons(_y_x10012, x_10112);
  }
}
 
 
// Format `tcons` within a judgement — each element is one token
export function tcons_fs_show_latex_tokens(_pat_x41__33, _implicit_fs_show_latex, _implicit_fs_show_latex_tokens) /* forall<a,b,e> (type-level/list/t-cons<a,b>, ?show-latex : (a) -> e string, ?show-latex-tokens : (b) -> e list<string>) -> e list<string> */  {
   
  var x_10116 = _implicit_fs_show_latex(_pat_x41__33.head);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10012 /* string */ ) {
      return tcons_fs__mlift_show_latex_tokens_10080(_implicit_fs_show_latex_tokens, _pat_x41__33.tail, _y_x10012);
    });
  }
  else {
     
    var x_0_10119 = _implicit_fs_show_latex_tokens(_pat_x41__33.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10013 /* list<string> */ ) {
        return $std_core_types.Cons(x_10116, _y_x10013);
      });
    }
    else {
      return $std_core_types.Cons(x_10116, x_0_10119);
    }
  }
}
 
 
// monadic lift
export function tcons_prem_fs__mlift_show_latex_premises_10081(_y_x10015, _y_x10016) /* forall<e> (string, list<string>) -> e list<string> */  {
  return $std_core_types.Cons(_y_x10015, _y_x10016);
}
 
 
// monadic lift
export function tcons_prem_fs__mlift_show_latex_premises_10082(_implicit_fs_show_latex_premises, t, _y_x10015) /* forall<a,e> (?show-latex-premises : (a) -> e list<string>, t : a, string) -> e list<string> */  {
   
  var x_10124 = _implicit_fs_show_latex_premises(t);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10016 /* list<string> */ ) {
      return $std_core_types.Cons(_y_x10015, _y_x10016);
    });
  }
  else {
    return $std_core_types.Cons(_y_x10015, x_10124);
  }
}
 
 
// Premise whose head is a judgement chain (tcons) — render as one joined string
export function tcons_prem_fs_show_latex_premises(_pat_x25__40, _implicit_fs_show_latex, _implicit_fs_show_latex_premises) /* forall<a,b,c,e> (type-level/list/t-cons<type-level/list/t-cons<a,b>,c>, ?show-latex : (type-level/list/t-cons<a,b>) -> e string, ?show-latex-premises : (c) -> e list<string>) -> e list<string> */  {
   
  var x_10128 = _implicit_fs_show_latex(_pat_x25__40.head);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10015 /* string */ ) {
      return tcons_prem_fs__mlift_show_latex_premises_10082(_implicit_fs_show_latex_premises, _pat_x25__40.tail, _y_x10015);
    });
  }
  else {
     
    var x_0_10131 = _implicit_fs_show_latex_premises(_pat_x25__40.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10016 /* list<string> */ ) {
        return $std_core_types.Cons(x_10128, _y_x10016);
      });
    }
    else {
      return $std_core_types.Cons(x_10128, x_0_10131);
    }
  }
}
 
 
// monadic lift
export function _mlift_map_field_10083(_y_x10018) /* forall<e> (string) -> e latexstr */  {
  return _y_x10018;
}
 
export function map_field(r, _implicit_fs_show_latex) /* forall<a,e,b,c> (r : koka-redex/syntax/rule<b,c,a>, ?show-latex : (koka-redex/syntax/rule<b,c,a>) -> e string) -> e latexstr */  {
   
  var x_10136 = _implicit_fs_show_latex(r);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10018 /* string */ ) {
      return _y_x10018;
    });
  }
  else {
    return x_10136;
  }
}
 
 
// External entries are skipped in LaTeX rendering
export function ext_fs_map_field(_x_at___wildcard_x66__23) /* forall<e> (koka-redex/syntax/external-entry) -> e latexstr */  {
  return "";
}
 
 
// monadic lift
export function _mlift_relation_to_latex_10084(_y_x10021) /* forall<e> (list<string>) -> e string */  {
   
  var _x_x1_3_10069 = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10021, "\n\n");
   
  var _x_x2_10068 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_3_10069, "\n\\end{mathpar}");
  return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\\begin{mathpar}\n", _x_x2_10068);
}
 
 
// monadic lift
export function _mlift_relation_to_latex_10085(_y_x10020) /* forall<e> (list<latexstr>) -> e string */  {
   
  var x_10140 = $std_core_list.map(_y_x10020, function(_x_x1_1 /* latexstr */ ) {
      return $std_core_hnd._open_none1(latexstr_fs_s, _x_x1_1);
    });
   
  function next_10141(_y_x10021) /* (list<string>) -> 1706 string */  {
     
    var _x_x1_3_10069 = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10021, "\n\n");
     
    var _x_x2_10068 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_3_10069, "\n\\end{mathpar}");
    return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\\begin{mathpar}\n", _x_x2_10068);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10141);
  }
  else {
    return next_10141(x_10140);
  }
}
 
 
// monadic lift
export function _mlift_relation_to_latex_10086(_y_x10019) /* forall<e> (list<latexstr>) -> e string */  {
   
  var x_10143 = $std_core_list.filter(_y_x10019, function(l /* latexstr */ ) {
       
      var s_10036 = $std_core_hnd._open_none1(function(latexstr /* latexstr */ ) {
          return latexstr;
        }, l);
       
      var _x_x1_10066 = (s_10036 === (""));
      return $std_core_hnd._open_none1(function(b /* bool */ ) {
          return (b) ? false : true;
        }, _x_x1_10066);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10020 /* list<latexstr> */ ) {
      return _mlift_relation_to_latex_10085(_y_x10020);
    });
  }
  else {
    return _mlift_relation_to_latex_10085(x_10143);
  }
}
 
export function relation_to_latex(_pat_x69__27, _implicit_fs_to_list) /* forall<e,a> (koka-redex/syntax/relation-def<a>, ?to-list : (a) -> e list<latexstr>) -> e string */  {
   
  var x_10145 = _implicit_fs_to_list(_pat_x69__27);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10019 /* list<latexstr> */ ) {
      return _mlift_relation_to_latex_10086(_y_x10019);
    });
  }
  else {
     
    var x_0_10148 = $std_core_list.filter(x_10145, function(l /* latexstr */ ) {
         
        var s_10036 = $std_core_hnd._open_none1(function(latexstr /* latexstr */ ) {
            return latexstr;
          }, l);
         
        var _x_x1_10066 = (s_10036 === (""));
        return $std_core_hnd._open_none1(function(b /* bool */ ) {
            return (b) ? false : true;
          }, _x_x1_10066);
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10020 /* list<latexstr> */ ) {
        return _mlift_relation_to_latex_10085(_y_x10020);
      });
    }
    else {
       
      var x_1_10151 = $std_core_list.map(x_0_10148, function(_x_x1_1 /* latexstr */ ) {
          return $std_core_hnd._open_none1(latexstr_fs_s, _x_x1_1);
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10021 /* list<string> */ ) {
           
          var _x_x1_3_10069 = $std_core_hnd._open_none2($std_core_list.joinsep, _y_x10021, "\n\n");
           
          var _x_x2_10068 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_3_10069, "\n\\end{mathpar}");
          return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\\begin{mathpar}\n", _x_x2_10068);
        });
      }
      else {
         
        var _x_x1_3_10069_0 = $std_core_hnd._open_none2($std_core_list.joinsep, x_1_10151, "\n\n");
         
        var _x_x2_10068_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_3_10069_0, "\n\\end{mathpar}");
        return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\\begin{mathpar}\n", _x_x2_10068_0);
      }
    }
  }
}