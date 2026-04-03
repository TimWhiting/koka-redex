// Koka generated module: koka-redex/forward-bridge, koka version: 3.2.4
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
import * as $koka_dash_redex_logic from './koka_dash_redex_logic.mjs';
import * as $std_core from './std_core.mjs';
import * as $koka_dash_redex_term from './koka_dash_redex_term.mjs';
import * as $koka_dash_redex_syntax from './koka_dash_redex_syntax.mjs';
import * as $koka_dash_redex_forward from './koka_dash_redex_forward.mjs';
import * as $type_dash_level_structs from './type_dash_level_structs.mjs';
import * as $type_dash_level_list from './type_dash_level_list.mjs';
import * as $type_dash_level_nil from './type_dash_level_nil.mjs';
import * as $std_core_undiv from './std_core_undiv.mjs';
 
// externals
 
// type declarations
// type key-info
export function Key_info(pred, n_inputs) /* (pred : string, n-inputs : int) -> key-info */  {
  return { pred: pred, n_inputs: n_inputs };
}
// type policy-info
export function Policy_info(pred, policy) /* (pred : string, policy : koka-redex/forward/join-policy) -> policy-info */  {
  return { pred: pred, policy: policy };
}
// type relation-entry
export function RuleEntry(r) /* (r : koka-redex/term/rule) -> relation-entry */  {
  return { _tag: 1, r: r };
}
export function ExtEntry(ext_pred, ext_n_inputs, ext_solver) /* (ext-pred : string, ext-n-inputs : int, ext-solver : (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) -> relation-entry */  {
  return { _tag: 2, ext_pred: ext_pred, ext_n_inputs: ext_n_inputs, ext_solver: ext_solver };
}
 
// declarations
 
 
// Base: single remaining input (bare value)
export function end_fs_from_inputs(args, _implicit_fs_from_term) /* forall<a> (args : list<koka-redex/term/term>, ?from-term : (koka-redex/term/term) -> <exn,div> a) -> <exn,div> a */  {
  if (args !== null) {
    return _implicit_fs_from_term(args.head);
  }
  else {
    return $std_core_exn.$throw("from-inputs: not enough args for base");
  }
}
 
 
// monadic lift
export function tcons_fs__mlift_from_inputs_10090(_y_x10051, _y_x10052) /* forall<a,b> (a, b) -> <exn,div> type-level/list/t-cons<a,b> */  {
  return $type_dash_level_list.TCons(_y_x10051, _y_x10052);
}
 
 
// monadic lift
export function tcons_fs__mlift_from_inputs_10091(_implicit_fs_from_inputs, rest, _y_x10051) /* forall<a,b> (?from-inputs : (list<koka-redex/term/term>) -> <exn,div> b, rest : list<koka-redex/term/term>, a) -> <exn,div> type-level/list/t-cons<a,b> */  {
   
  var x_10096 = _implicit_fs_from_inputs(rest);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10052 /* 541 */ ) {
      return $type_dash_level_list.TCons(_y_x10051, _y_x10052);
    });
  }
  else {
    return $type_dash_level_list.TCons(_y_x10051, x_10096);
  }
}
 
 
// from-inputs: convert list<term> to a tcons chain of domain values
export function tcons_fs_from_inputs(args, _implicit_fs_from_term, _implicit_fs_from_inputs) /* forall<a,b> (args : list<koka-redex/term/term>, ?from-term : (koka-redex/term/term) -> <exn,div> a, ?from-inputs : (list<koka-redex/term/term>) -> <exn,div> b) -> <exn,div> type-level/list/t-cons<a,b> */  {
  if (args !== null) {
     
    var x_10100 = _implicit_fs_from_term(args.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10051 /* 540 */ ) {
        return tcons_fs__mlift_from_inputs_10091(_implicit_fs_from_inputs, args.tail, _y_x10051);
      });
    }
    else {
       
      var x_0_10103 = _implicit_fs_from_inputs(args.tail);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10052 /* 541 */ ) {
          return $type_dash_level_list.TCons(x_10100, _y_x10052);
        });
      }
      else {
        return $type_dash_level_list.TCons(x_10100, x_0_10103);
      }
    }
  }
  else {
    return $std_core_exn.$throw("from-inputs: not enough args for tcons");
  }
}
 
 
// Base: single output value
export function end_fs_to_outputs(v, _implicit_fs_to_term) /* forall<a> (v : a, ?to-term : (a) -> div koka-redex/term/term) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Cons(_implicit_fs_to_term(v), $std_core_types.Nil);
}
 
 
// to-outputs: convert domain output value(s) to list<term>
export function tcons_fs_to_outputs(_pat_x43__3, _implicit_fs_to_term, _implicit_fs_to_outputs) /* forall<a,b> (type-level/list/t-cons<a,b>, ?to-term : (a) -> div koka-redex/term/term, ?to-outputs : (b) -> div list<koka-redex/term/term>) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Cons(_implicit_fs_to_term(_pat_x43__3.head), _implicit_fs_to_outputs(_pat_x43__3.tail));
}
 
 
// Base: two-element cons (last pair of outputs)
export function end_fs_to_output_args(_pat_x70__3, _implicit_fs_to_term, _implicit_fs_tail_fs_to_term) /* forall<a,b> (type-level/list/t-cons<a,b>, ?to-term : (a) -> div koka-redex/term/term, ?tail/to-term : (b) -> div koka-redex/term/term) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Cons(_implicit_fs_to_term(_pat_x70__3.head), $std_core_types.Cons(_implicit_fs_tail_fs_to_term(_pat_x70__3.tail), $std_core_types.Nil));
}
 
export function tnil_fs_to_output_args(tn) /* (tn : type-level/nil/t-nil) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Nil;
}
 
 
// Recursive: head is a value, tail is more cons
export function tcons_fs_to_output_args(_pat_x62__3, _implicit_fs_to_term, _implicit_fs_to_output_args) /* forall<a,b> (type-level/list/t-cons<a,b>, ?to-term : (a) -> div koka-redex/term/term, ?to-output-args : (b) -> div list<koka-redex/term/term>) -> div list<koka-redex/term/term> */  {
  return $std_core_types.Cons(_implicit_fs_to_term(_pat_x62__3.head), _implicit_fs_to_output_args(_pat_x62__3.tail));
}
 
export function tnil_fs_to_fact_args(tn) /* (tn : type-level/nil/t-nil) -> (list<koka-redex/term/term>, string, list<koka-redex/term/term>) */  {
  return $std_core_types.Tuple3($std_core_types.Nil, "", $std_core_types.Nil);
}
 
export function tcons_fs_before_judgment(b, _implicit_fs_before_judgment) /* forall<a,b> (b : type-level/list/t-cons<a,b>, ?before-judgment : (b) -> ()) -> () */  {
  return $std_core_types.Unit;
}
 
export function judgement_fs_before_judgment(j, _implicit_fs_judgment_name) /* forall<a,b> (j : type-level/list/t-cons<a,b>, ?judgment-name : type-level/structs/name<a>) -> () */  {
  return $std_core_types.Unit;
}
 
 
// Marker in middle: head has ?judgment-name, tail is cons of outputs
export function marker_fs_to_fact_args(_pat_x110__3, _implicit_fs_judgment_name, _implicit_fs_to_output_args) /* forall<a,b> (type-level/list/t-cons<a,b>, ?judgment-name : type-level/structs/name<a>, ?to-output-args : (b) -> div list<koka-redex/term/term>) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>) */  {
  var _x0 = _implicit_fs_judgment_name;
  return $std_core_types.Tuple3($std_core_types.Nil, _x0, _implicit_fs_to_output_args(_pat_x110__3.tail));
}
 
 
// Marker near end: head has ?judgment-name, tail is a single bare value
export function marker_end_fs_to_fact_args(_pat_x118__3, _implicit_fs_judgment_name, _implicit_fs_to_term) /* forall<a,b> (type-level/list/t-cons<a,b>, ?judgment-name : type-level/structs/name<a>, ?to-term : (b) -> div koka-redex/term/term) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>) */  {
  var _x1 = _implicit_fs_judgment_name;
  return $std_core_types.Tuple3($std_core_types.Nil, _x1, $std_core_types.Cons(_implicit_fs_to_term(_pat_x118__3.tail), $std_core_types.Nil));
}
 
 
// Pre-marker recursive: head is a value, tail has more (including marker)
export function default_fs_after_fs_to_fact_args(_pat_x92__3, _implicit_fs_to_term, _implicit_fs_to_fact_args) /* forall<a,b> (type-level/list/t-cons<a,b>, ?to-term : (a) -> div koka-redex/term/term, ?to-fact-args : (b) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>)) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>) */  {
  var _x2 = _implicit_fs_to_fact_args(_pat_x92__3.tail);
  return $std_core_types.Tuple3(_x2.fst, _x2.snd, $std_core_types.Cons(_implicit_fs_to_term(_pat_x92__3.head), _x2.thd));
}
 
 
// Pre-marker recursive: head is a value, tail has more (including marker)
export function tcons_fs_to_fact_args(_pat_x82__3, _implicit_fs_to_term, _implicit_fs_to_fact_args, _implicit_fs_before_judgment) /* forall<a,b> (type-level/list/t-cons<a,b>, ?to-term : (a) -> div koka-redex/term/term, ?to-fact-args : (b) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>), ?before-judgment : (b) -> ()) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>) */  {
  var _x3 = _implicit_fs_to_fact_args(_pat_x82__3.tail);
  return $std_core_types.Tuple3($std_core_types.Cons(_implicit_fs_to_term(_pat_x82__3.head), _x3.fst), _x3.snd, _x3.thd);
}
 
 
// Convert a typed judgement chain to a fact
export function chain_fs_to_fact(chain, _implicit_fs_to_fact_args) /* forall<a> (chain : a, ?to-fact-args : (a) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>)) -> div koka-redex/term/fact */  {
  var _x4 = _implicit_fs_to_fact_args(chain);
  return $koka_dash_redex_term.Fact(_x4.snd, $std_core_list.append(_x4.fst, _x4.thd));
}
 
 
// Convert and also get the number of input args (for memo-key)
export function chain_fs_to_fact_info(chain, _implicit_fs_to_fact_args) /* forall<a> (chain : a, ?to-fact-args : (a) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>)) -> div (koka-redex/term/fact, int) */  {
  var _x5 = _implicit_fs_to_fact_args(chain);
  return $std_core_types.Tuple2($koka_dash_redex_term.Fact(_x5.snd, $std_core_list.append(_x5.fst, _x5.thd)), $std_core_list._lift_length_6003(_x5.fst, 0));
}
 
export function fact_fs_to_fact(f) /* (f : koka-redex/term/fact) -> div koka-redex/term/fact */  {
  return f;
}
 
 
// Nil: no premises
export function tnil_fs_to_premises(_x_at___wildcard_x152__26) /* (type-level/nil/t-nil) -> list<koka-redex/term/fact> */  {
  return $std_core_types.Nil;
}
 
 
// Fact-level: single fact (base case)
export function fact_fs_to_premises(f) /* (f : koka-redex/term/fact) -> list<koka-redex/term/fact> */  {
  return $std_core_types.Cons(f, $std_core_types.Nil);
}
 
 
// Domain-type: single judgement chain → convert to fact (base case)
export function default_fs_to_premises(c, _implicit_fs_to_fact) /* forall<a> (c : a, ?to-fact : (a) -> div koka-redex/term/fact) -> div list<koka-redex/term/fact> */  {
  return $std_core_types.Cons(_implicit_fs_to_fact(c), $std_core_types.Nil);
}
 
 
// Premise whose head is a judgement chain (tcons), followed by more premises
export function chain_tcons_fs_to_premises(_pat_x175__3, _implicit_fs_to_fact, _implicit_fs_to_premises) /* forall<a,b,c> (type-level/list/t-cons<type-level/list/t-cons<a,b>,c>, ?to-fact : (type-level/list/t-cons<a,b>) -> div koka-redex/term/fact, ?to-premises : (c) -> div list<koka-redex/term/fact>) -> div list<koka-redex/term/fact> */  {
  return $std_core_types.Cons(_implicit_fs_to_fact(_pat_x175__3.head), _implicit_fs_to_premises(_pat_x175__3.tail));
}
 
 
// Fact-level: fact followed by premise-sep + more facts
export function fact_sep_fs_to_premises(_pat_x168__3, _implicit_fs_to_premises) /* forall<a> (type-level/list/t-cons<koka-redex/term/fact,type-level/list/t-cons<koka-redex/syntax/premise-sep,a>>, ?to-premises : (type-level/list/t-cons<koka-redex/syntax/premise-sep,a>) -> div list<koka-redex/term/fact>) -> div list<koka-redex/term/fact> */  {
  return $std_core_types.Cons(_pat_x168__3.head, _implicit_fs_to_premises(_pat_x168__3.tail));
}
 
 
// Skip premise-sep marker, continue with tail
export function sep_fs_to_premises(_pat_x161__3, _implicit_fs_to_premises) /* forall<a> (type-level/list/t-cons<koka-redex/syntax/premise-sep,a>, ?to-premises : (a) -> div list<koka-redex/term/fact>) -> div list<koka-redex/term/fact> */  {
  var _x6 = _pat_x161__3.tail;
  return _implicit_fs_to_premises(_x6);
}
 
 
// Convert a typed rule to a forward-engine rule
export function rule_fs_to_forward_rule(r, _implicit_fs_name_fs_show, _implicit_fs_to_premises, _implicit_fs_to_fact) /* forall<a,b,c> (r : koka-redex/syntax/rule<b,c,a>, ?name/show : (b) -> div string, ?to-premises : (c) -> div list<koka-redex/term/fact>, ?to-fact : (a) -> div koka-redex/term/fact) -> div koka-redex/term/rule */  {
  return $koka_dash_redex_term.Rule(_implicit_fs_name_fs_show(r.name), _implicit_fs_to_premises(r.premises), _implicit_fs_to_fact(r.conclusion));
}
 
 
// map-field for t-struct traversal (used by to-list)
export function forward_fs_map_field(r, _implicit_fs_name_fs_show, _implicit_fs_to_premises, _implicit_fs_to_fact) /* forall<a,b,c> (r : koka-redex/syntax/rule<b,c,a>, ?name/show : (b) -> div string, ?to-premises : (c) -> div list<koka-redex/term/fact>, ?to-fact : (a) -> div koka-redex/term/fact) -> div koka-redex/term/rule */  {
  return $koka_dash_redex_term.Rule(_implicit_fs_name_fs_show(r.name), _implicit_fs_to_premises(r.premises), _implicit_fs_to_fact(r.conclusion));
}
 
 
// Convert a relation-def to a list of forward-engine rules
export function relation_fs_to_rules(_pat_x214__3, _implicit_fs_to_list) /* forall<a> (koka-redex/syntax/relation-def<a>, ?to-list : (a) -> div list<koka-redex/term/rule>) -> div list<koka-redex/term/rule> */  {
  var _x7 = _pat_x214__3;
  return _implicit_fs_to_list(_x7);
}
 
 
// Create a memo-key function that projects only the first n args
export function make_memo_key(pred, n_inputs) /* (pred : string, n-inputs : int) -> ((koka-redex/term/fact) -> string) */  {
  return function(f /* koka-redex/term/fact */ ) {
    if (((f.pred) === pred)) {
      var _x8 = $koka_dash_redex_term.Fact(f.pred, $std_core_list.take(f.args, n_inputs));
    }
    else {
      var _x8 = f;
    }
    return $koka_dash_redex_term.fact_fs_show(_x8);
  };
}
 
 
// Derive a (judgment-name, memo-key) pair from a sample judgement chain.
// The chain is traversed via to-fact-args to count input positions.
// Usage: derive-key(e |- REval \ v) gives ("eval", key-fn-that-takes-1-input)
export function derive_key(sample, _implicit_fs_to_fact_args) /* forall<a> (sample : a, ?to-fact-args : (a) -> (list<koka-redex/term/term>, string, list<koka-redex/term/term>)) -> (string, (koka-redex/term/fact) -> string) */  {
  var _x9 = _implicit_fs_to_fact_args(sample);
   
  var n_inputs_10012 = $std_core_list._lift_length_6003(_x9.fst, 0);
  return $std_core_types.Tuple2(_x9.snd, function(f /* koka-redex/term/fact */ ) {
      if (((f.pred) === (_x9.snd))) {
        var _x10 = $koka_dash_redex_term.Fact(f.pred, $std_core_list.take(f.args, n_inputs_10012));
      }
      else {
        var _x10 = f;
      }
      return $koka_dash_redex_term.fact_fs_show(_x10);
    });
}
 
 
// Compose memo-keys for multiple relations
export function compose_memo_keys(keys) /* (keys : list<(string, (koka-redex/term/fact) -> string)>) -> ((koka-redex/term/fact) -> string) */  {
  return function(f /* koka-redex/term/fact */ ) {
    var _x11 = $std_core_list.find(keys, function(p /* (string, (koka-redex/term/fact) -> string) */ ) {
        var _x12 = p.fst;
        return (_x12 === (f.pred));
      });
    if (_x11 !== null) {
      return _x11.value.snd(f);
    }
    else {
      return $koka_dash_redex_term.fact_fs_show(f);
    }
  };
}
 
 
// monadic lift
export function _mlift_compose_externals_10092(goal, _y_x10055) /* (goal : koka-redex/term/fact, maybe<(string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>)>) -> <div,exn,koka-redex/logic/logic> maybe<list<koka-redex/term/fact>> */  {
  if (_y_x10055 !== null) {
    return $std_core_hnd._open_none1(function(tuple2_0 /* (string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) */ ) {
        return tuple2_0.snd;
      }, _y_x10055.value)(goal);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
export function compose_externals(solvers) /* (solvers : list<(string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>)>) -> ((goal : koka-redex/term/fact) -> <pure,koka-redex/logic/logic> maybe<list<koka-redex/term/fact>>) */  {
  return function(goal /* koka-redex/term/fact */ ) {
     
    var x_10108 = $std_core_list.find(solvers, function(p /* (string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) */ ) {
        return (($std_core_hnd._open_none1(function(tuple2 /* (string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) */ ) {
            return tuple2.fst;
          }, p)) === (goal.pred));
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10055 /* maybe<(string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>)> */ ) {
        if (_y_x10055 !== null) {
          return $std_core_hnd._open_none1(function(tuple2_0 /* (string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) */ ) {
              return tuple2_0.snd;
            }, _y_x10055.value)(goal);
        }
        else {
          return $std_core_types.Nothing;
        }
      });
    }
    else {
      if (x_10108 !== null) {
        return $std_core_hnd._open_none1(function(tuple2_0_0 /* (string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) */ ) {
            return tuple2_0_0.snd;
          }, x_10108.value)(goal);
      }
      else {
        return $std_core_types.Nothing;
      }
    }
  };
}
 
 
// Automatically generated. Retrieves the `pred` constructor field of the `:key-info` type.
export function key_info_fs_pred(_this) /* (key-info) -> string */  {
  return _this.pred;
}
 
 
// Automatically generated. Retrieves the `n-inputs` constructor field of the `:key-info` type.
export function key_info_fs_n_inputs(_this) /* (key-info) -> int */  {
  return _this.n_inputs;
}
 
export function key_info_fs__copy(_this, pred, n_inputs) /* (key-info, pred : ? string, n-inputs : ? int) -> key-info */  {
  if (pred !== undefined) {
    var _x13 = pred;
  }
  else {
    var _x13 = _this.pred;
  }
  if (n_inputs !== undefined) {
    var _x14 = n_inputs;
  }
  else {
    var _x14 = _this.n_inputs;
  }
  return Key_info(_x13, _x14);
}
 
 
// map-field for key extraction: extract key info from a rule's conclusion
export function key_fs_map_field(_pat_x276__3, _implicit_fs_to_fact_args) /* forall<a,b,c> (koka-redex/syntax/rule<b,c,a>, ?to-fact-args : (a) -> div (list<koka-redex/term/term>, string, list<koka-redex/term/term>)) -> div key-info */  {
  var _x15 = _implicit_fs_to_fact_args(_pat_x276__3.conclusion);
  return Key_info(_x15.snd, $std_core_list._lift_length_6003(_x15.fst, 0));
}
 
 
// Automatically generated. Retrieves the `pred` constructor field of the `:policy-info` type.
export function policy_info_fs_pred(_this) /* (policy-info) -> string */  {
  return _this.pred;
}
 
export function _trmc_unique_by_pred(keys, _acc) /* (keys : list<key-info>, ctx<list<key-info>>) -> div list<key-info> */  { tailcall: while(1)
{
  if (keys === null) {
    return $std_core_types._cctx_apply(_acc,($std_core_types.Nil));
  }
  else {
     
    var _trmc_x10044 = undefined;
     
    var _trmc_x10045 = $std_core_types.Cons(keys.head, _trmc_x10044);
    {
      // tail call
      var _x17 = function(_k16 /* key-info */ ) {
        return $std_core_list.filter(keys.tail, function(k2 /* key-info */ ) {
            var _x18 = k2.pred;
            var _x19 = _k16.pred;
            return (_x18 !== _x19);
          });
      }(keys.head);
      var _x20 = $std_core_types._cctx_extend(_acc,_trmc_x10045,({obj: _trmc_x10045, field_name: "tail"}));
      keys = _x17;
      _acc = _x20;
      continue tailcall;
    }
  }
}}
 
export function unique_by_pred(keys_0) /* (keys : list<key-info>) -> div list<key-info> */  {
  return _trmc_unique_by_pred(keys_0, $std_core_types._cctx_empty());
}
 
 
// Derive key-infos from a relation-def, one per unique predicate
export function relation_fs_derive_keys(_pat_x284__3, _implicit_fs_to_list) /* forall<a> (koka-redex/syntax/relation-def<a>, ?to-list : (a) -> div list<key-info>) -> div list<key-info> */  {
   
  var _x21 = _pat_x284__3;
  var keys_10113 = _implicit_fs_to_list(_x21);
  return _trmc_unique_by_pred(keys_10113, $std_core_types._cctx_empty());
}
 
 
// Automatically generated. Retrieves the `policy` constructor field of the `:policy-info` type.
export function policy_info_fs_policy(_this) /* (policy-info) -> koka-redex/forward/join-policy */  {
  return _this.policy;
}
 
 
// monadic lift
export function policy_info_fs__mlift_copy_10093(_this, pred, _c_x10062) /* (policy-info, pred : ? string, koka-redex/forward/join-policy) -> policy-info */  {
  if (pred !== undefined) {
    var _x21 = pred;
  }
  else {
    var _x21 = _this.pred;
  }
  return Policy_info(_x21, _c_x10062);
}
 
export function policy_info_fs__copy(_this, pred, policy) /* (policy-info, pred : ? string, policy : ? koka-redex/forward/join-policy) -> policy-info */  {
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10062 /* koka-redex/forward/join-policy */ ) {
      if (pred !== undefined) {
        var _x22 = pred;
      }
      else {
        var _x22 = _this.pred;
      }
      return Policy_info(_x22, _c_x10062);
    });
  }
  else {
    if (pred !== undefined) {
      var _x23 = pred;
    }
    else {
      var _x23 = _this.pred;
    }
    if (policy !== undefined) {
      var _x24 = policy;
    }
    else {
      var _x24 = _this.policy;
    }
    return Policy_info(_x23, _x24);
  }
}
 
 
// Default join policy: set-join
export function default_fs_join_policy(_x_at___wildcard_x326__29) /* forall<a> (a) -> koka-redex/forward/join-policy */  {
  return $koka_dash_redex_forward.set_join;
}
 
export function marker_end_fs_to_policy_info(_pat_x319__3, _implicit_fs_judgment_name, _implicit_fs_join_policy) /* forall<a,b> (type-level/list/t-cons<a,b>, ?judgment-name : type-level/structs/name<a>, ?join-policy : (a) -> koka-redex/forward/join-policy) -> div policy-info */  {
  var _x25 = _implicit_fs_judgment_name;
  return Policy_info(_x25, _implicit_fs_join_policy(_pat_x319__3.head));
}
 
 
// Chain traversal: find the relation marker and extract its policy
export function tcons_fs_to_policy_info(_pat_x312__3, _implicit_fs_to_policy_info, _implicit_fs_before_judgment) /* forall<a,b> (type-level/list/t-cons<a,b>, ?to-policy-info : (b) -> div policy-info, ?before-judgment : (b) -> ()) -> div policy-info */  {
  var _x26 = _pat_x312__3.tail;
  return _implicit_fs_to_policy_info(_x26);
}
 
 
// map-field for policy extraction: extract from a rule's conclusion
export function policy_fs_map_field(_pat_x305__3, _implicit_fs_to_policy_info) /* forall<a,b,c> (koka-redex/syntax/rule<b,c,a>, ?to-policy-info : (a) -> div policy-info) -> div policy-info */  {
  var _x27 = _pat_x305__3.conclusion;
  return _implicit_fs_to_policy_info(_x27);
}
 
 
// monadic lift
export function _mlift_trmc_unique_policies_10094(_acc, _trmc_x10046, p, rest, _c_x10063) /* (ctx<list<(string, koka-redex/forward/join-policy)>>, list<(string, koka-redex/forward/join-policy)>, p : policy-info, rest : list<policy-info>, koka-redex/forward/join-policy) -> list<(string, koka-redex/forward/join-policy)> */  {
   
  var _x28 = p.pred;
  var _trmc_x10047 = $std_core_types.Cons($std_core_types.Tuple2(_x28, _c_x10063), _trmc_x10046);
  return _trmc_unique_policies($std_core_list.filter(rest, function(p2 /* policy-info */ ) {
        var _x28 = p2.pred;
        var _x29 = p.pred;
        return (_x28 !== _x29);
      }), $std_core_types._cctx_extend(_acc,_trmc_x10047,({obj: _trmc_x10047, field_name: "tail"})));
}
 
export function _trmc_unique_policies(infos, _acc_0) /* (infos : list<policy-info>, ctx<list<(string, koka-redex/forward/join-policy)>>) -> div list<(string, koka-redex/forward/join-policy)> */  { tailcall: while(1)
{
  if (infos === null) {
    return $std_core_types._cctx_apply(_acc_0,($std_core_types.Nil));
  }
  else {
     
    var _trmc_x10046_0 = undefined;
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_c_x10063_0 /* koka-redex/forward/join-policy */ ) {
        return _mlift_trmc_unique_policies_10094(_acc_0, _trmc_x10046_0, infos.head, infos.tail, _c_x10063_0);
      });
    }
    else {
       
      var _x30 = infos.head.pred;
      var _x31 = infos.head.policy;
      var _trmc_x10047_0 = $std_core_types.Cons($std_core_types.Tuple2(_x30, _x31), _trmc_x10046_0);
      {
        // tail call
        var _x31 = function(_p_030 /* policy-info */ ) {
          return $std_core_list.filter(infos.tail, function(p2_0 /* policy-info */ ) {
              var _x32 = p2_0.pred;
              var _x33 = _p_030.pred;
              return (_x32 !== _x33);
            });
        }(infos.head);
        var _x34 = $std_core_types._cctx_extend(_acc_0,_trmc_x10047_0,({obj: _trmc_x10047_0, field_name: "tail"}));
        infos = _x31;
        _acc_0 = _x34;
        continue tailcall;
      }
    }
  }
}}
 
export function unique_policies(infos_0) /* (infos : list<policy-info>) -> div list<(string, koka-redex/forward/join-policy)> */  {
  return _trmc_unique_policies(infos_0, $std_core_types._cctx_empty());
}
 
 
// Derive policies from relation-def
export function relation_fs_derive_policies(_pat_x331__3, _implicit_fs_to_list) /* forall<a> (koka-redex/syntax/relation-def<a>, ?to-list : (a) -> div list<policy-info>) -> div list<(string, koka-redex/forward/join-policy)> */  {
   
  var _x35 = _pat_x331__3;
  var infos_10123 = _implicit_fs_to_list(_x35);
  return _trmc_unique_policies(infos_10123, $std_core_types._cctx_empty());
}
 
 
// Convert key-infos into a composed memo-key function
export function keys_to_memo_key(keys) /* (keys : list<key-info>) -> ((koka-redex/term/fact) -> string) */  {
   
  var keys_0_10027 = $std_core_list.map(keys, function(k /* key-info */ ) {
      var _x35 = k.pred;
      return $std_core_types.Tuple2(_x35, function(f_0 /* koka-redex/term/fact */ ) {
          var _x38 = k.pred;
          var _x37 = ((f_0.pred) === _x38);
          if (_x37) {
            var _x39 = k.n_inputs;
            var _x36 = $koka_dash_redex_term.Fact(f_0.pred, $std_core_list.take(f_0.args, _x39));
          }
          else {
            var _x36 = f_0;
          }
          return $koka_dash_redex_term.fact_fs_show(_x36);
        });
    });
  return function(f /* koka-redex/term/fact */ ) {
    var _x35 = $std_core_list.find(keys_0_10027, function(p /* (string, (koka-redex/term/fact) -> string) */ ) {
        var _x36 = p.fst;
        return (_x36 === (f.pred));
      });
    if (_x35 !== null) {
      return _x35.value.snd(f);
    }
    else {
      return $koka_dash_redex_term.fact_fs_show(f);
    }
  };
}
 
 
// Automatically generated. Tests for the `RuleEntry` constructor of the `:relation-entry` type.
export function is_ruleEntry(relation_entry) /* (relation-entry : relation-entry) -> bool */  {
  return (relation_entry._tag === 1);
}
 
 
// Automatically generated. Tests for the `ExtEntry` constructor of the `:relation-entry` type.
export function is_extEntry(relation_entry) /* (relation-entry : relation-entry) -> bool */  {
  return (relation_entry._tag === 2);
}
 
 
// map-field: rule -> relation-entry
export function rule_entry_fs_map_field(r, _implicit_fs_name_fs_show, _implicit_fs_to_premises, _implicit_fs_to_fact) /* forall<a,b,c> (r : koka-redex/syntax/rule<b,c,a>, ?name/show : (b) -> div string, ?to-premises : (c) -> div list<koka-redex/term/fact>, ?to-fact : (a) -> div koka-redex/term/fact) -> div relation-entry */  {
  var _x37 = $koka_dash_redex_term.Rule(_implicit_fs_name_fs_show(r.name), _implicit_fs_to_premises(r.premises), _implicit_fs_to_fact(r.conclusion));
  return RuleEntry(_x37);
}
 
 
// monadic lift
export function ext_entry_fs__mlift_map_field_10095(e, _c_x10065) /* (e : koka-redex/syntax/external-entry, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>) -> relation-entry */  {
  var _x38 = e.ext_pred;
  var _x39 = e.ext_n_inputs;
  return ExtEntry(_x38, _x39, _c_x10065);
}
 
 
// map-field: external-entry -> relation-entry
export function ext_entry_fs_map_field(e) /* (e : koka-redex/syntax/external-entry) -> div relation-entry */  {
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_x10065 /* (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>> */ ) {
      var _x40 = e.ext_pred;
      var _x41 = e.ext_n_inputs;
      return ExtEntry(_x40, _x41, _c_x10065);
    });
  }
  else {
    var _x42 = e.ext_pred;
    var _x43 = e.ext_n_inputs;
    var _x44 = e.ext_solver;
    return ExtEntry(_x42, _x43, _x44);
  }
}
 
 
// key map-field: external-entry -> key-info
export function ext_key_fs_map_field(e) /* (e : koka-redex/syntax/external-entry) -> div key-info */  {
  var _x45 = e.ext_pred;
  var _x46 = e.ext_n_inputs;
  return Key_info(_x45, _x46);
}
 
 
// policy map-field: external-entry -> policy-info (default set-join)
export function ext_policy_fs_map_field(e) /* (e : koka-redex/syntax/external-entry) -> div policy-info */  {
  var _x47 = e.ext_pred;
  return Policy_info(_x47, $koka_dash_redex_forward.set_join);
}
 
 
// Partition relation-entries into rules and external solvers
export function partition_entries(entries) /* (entries : list<relation-entry>) -> (list<koka-redex/term/rule>, list<(string, (koka-redex/term/fact) -> <koka-redex/logic/logic,div,exn> maybe<list<koka-redex/term/fact>>)>) */  {
  if (entries === null) {
    return $std_core_types.Tuple2($std_core_types.Nil, $std_core_types.Nil);
  }
  else if (entries !== null && entries.head._tag === 1) {
    var _x48 = partition_entries(entries.tail);
    return $std_core_types.Tuple2($std_core_types.Cons(entries.head.r, _x48.fst), _x48.snd);
  }
  else {
    var _x49 = partition_entries(entries.tail);
    return $std_core_types.Tuple2(_x49.fst, $std_core_types.Cons($std_core_types.Tuple2(entries.head.ext_pred, entries.head.ext_solver), _x49.snd));
  }
}
 
 
// Unified forward-search: extracts rules AND externals from relation-def,
// auto-derives memo-key from relation structure.
export function forward_search(goal, rel, _implicit_fs_to_fact, _implicit_fs_to_list, _implicit_fs_derive_keys, _implicit_fs_derive_policies) /* forall<a,b> (goal : a, rel : koka-redex/syntax/relation-def<b>, ?to-fact : (a) -> div koka-redex/term/fact, ?to-list : (b) -> div list<relation-entry>, ?derive-keys : (koka-redex/syntax/relation-def<b>) -> div list<key-info>, ?derive-policies : (koka-redex/syntax/relation-def<b>) -> div list<(string, koka-redex/forward/join-policy)>) -> <div,exn> list<(string, list<koka-redex/term/fact>)> */  {
   
  var _x_x1_10082 = $std_core_hnd._open_none1(function(_this /* koka-redex/syntax/relation-def<4127> */ ) {
      return _this;
    }, rel);
   
  var entries = $std_core_hnd._open_none1(_implicit_fs_to_list, _x_x1_10082);
  var _x50 = $std_core_hnd._open_none1(partition_entries, entries);
   
  var ext = $std_core_hnd._open_none1(compose_externals, _x50.snd);
   
  var _x_x1_3_10086 = $std_core_hnd._open_none1(_implicit_fs_derive_keys, rel);
   
  var mk = $std_core_hnd._open_none1(keys_to_memo_key, _x_x1_3_10086);
   
  var policies = $std_core_hnd._open_none1(_implicit_fs_derive_policies, rel);
  return $koka_dash_redex_forward.forward_search($std_core_hnd._open_none1(_implicit_fs_to_fact, goal), _x50.fst, ext, mk, policies);
}