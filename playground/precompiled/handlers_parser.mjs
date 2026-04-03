// Koka generated module: handlers/parser, koka version: 3.2.4
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
 
 
// runtime tag for the effect `:many`
export var many_fs__tag;
var many_fs__tag = "many@parser";
 
 
// runtime tag for the effect `:parse`
export var parse_fs__tag;
var parse_fs__tag = "parse@parser";
// type many
export function _Hnd_many(_cfc, _ctl_fail, _ctl_flip) /* forall<e,a> (int, forall<b> hnd/clause0<b,many,e,a>, hnd/clause0<bool,many,e,a>) -> many<e,a> */  {
  return { _cfc: _cfc, _ctl_fail: _ctl_fail, _ctl_flip: _ctl_flip };
}
// type parse
export function _Hnd_parse(_cfc, _fun_satisfy) /* forall<e,a> (int, forall<b> hnd/clause1<(string) -> maybe<(b, string)>,b,parse,e,a>) -> parse<e,a> */  {
  return { _cfc: _cfc, _fun_satisfy: _fun_satisfy };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:many` type.
export function many_fs__cfc(many_0) /* forall<e,a> (many : many<e,a>) -> int */  {
  return many_0._cfc;
}
 
 
// handler for the effect `:many`
export function many_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : many<e,b>, ret : (res : a) -> e b, action : () -> <many|e> a) -> e b */  {
  return $std_core_hnd._hhandle(many_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@ctl-flip` constructor field of the `:many` type.
export function many_fs__ctl_flip(many_0) /* forall<e,a> (many : many<e,a>) -> hnd/clause0<bool,many,e,a> */  {
  return many_0._ctl_flip;
}
 
 
// select `flip` operation out of effect `:many`
export function flip_fs__select(hnd) /* forall<e,a> (hnd : many<e,a>) -> hnd/clause0<bool,many,e,a> */  {
  return hnd._ctl_flip;
}
 
 
// flip a coin and return either `True` or `False` .. or both
// Call the `ctl flip` operation of the effect `:many`
export function flip() /* () -> many bool */  {
   
  var ev_10163 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  return ev_10163.hnd._ctl_flip(ev_10163.marker, ev_10163);
}
 
 
// Automatically generated. Retrieves the `@ctl-fail` constructor field of the `:many` type.
export function many_fs__ctl_fail(many_0) /* forall<e,a,b> (many : many<e,a>) -> hnd/clause0<b,many,e,a> */  {
  return many_0._ctl_fail;
}
 
 
// select `fail` operation out of effect `:many`
export function fail_fs__select(hnd) /* forall<a,e,b> (hnd : many<e,b>) -> hnd/clause0<a,many,e,b> */  {
  return hnd._ctl_fail;
}
 
 
// fail the current computation
// Call the `ctl fail` operation of the effect `:many`
export function fail() /* forall<a> () -> many a */  {
   
  var ev_10165 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x0 = ev_10165.hnd._ctl_fail;
  return _x0(ev_10165.marker, ev_10165);
}
 
 
// monadic lift
export function _mlift_select_10134(x, xx, _y_x10018) /* forall<a> (x : a, xx : list<a>, bool) -> many a */  {
  if (_y_x10018) {
    return x;
  }
  else {
    return select(xx);
  }
}
 
export function select(xs) /* forall<a> (xs : list<a>) -> many a */  { tailcall: while(1)
{
  if (xs === null) {
     
    var ev_10167 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    var _x1 = ev_10167.hnd._ctl_fail;
    return _x1(ev_10167.marker, ev_10167);
  }
  else {
     
    var ev_0_10169 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
     
    var x_1 = ev_0_10169.hnd._ctl_flip(ev_0_10169.marker, ev_0_10169);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10018_0 /* bool */ ) {
        return _mlift_select_10134(xs.head, xs.tail, _y_x10018_0);
      });
    }
    else {
      if (x_1) {
        return xs.head;
      }
      else {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// monadic lift
export function _mlift_solutions_10135(_y_x10022, _y_x10023) /* forall<a,e> (list<a>, list<a>) -> e list<a> */  {
  return $std_core_hnd._open_none2(function(xs /* list<643> */ , ys /* list<643> */ ) {
      return $std_core_list.append(xs, ys);
    }, _y_x10022, _y_x10023);
}
 
 
// monadic lift
export function _mlift_solutions_10136(resume_0, _y_x10022) /* forall<a,e> (resume@0 : (bool) -> e list<a>, list<a>) -> e list<a> */  {
   
  var x_10171 = resume_0(false);
   
  function next_10172(_y_x10023) /* (list<643>) -> 644 list<643> */  {
    return $std_core_hnd._open_none2(function(xs /* list<643> */ , ys /* list<643> */ ) {
        return $std_core_list.append(xs, ys);
      }, _y_x10022, _y_x10023);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10172);
  }
  else {
    return next_10172(x_10171);
  }
}
 
 
// Return all solutions
export function solutions(_action) /* forall<a,e> (() -> <many|e> a) -> e list<a> */  {
  return many_fs__handle(_Hnd_many(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (596) -> 644 list<643> */ ) {
          return $std_core_types.Nil;
        }), $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume_0 /* (bool) -> 644 list<643> */ ) {
           
          var x_10175 = resume_0(true);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(_y_x10022 /* list<643> */ ) {
              return _mlift_solutions_10136(resume_0, _y_x10022);
            });
          }
          else {
            return _mlift_solutions_10136(resume_0, x_10175);
          }
        })), function(x_0 /* 643 */ ) {
      return $std_core_types.Cons(x_0, $std_core_types.Nil);
    }, _action);
}
 
 
// monadic lift
export function _mlift_eager_10137(resume_0, _y_x10025) /* forall<a,e> (resume@0 : (bool) -> e list<a>, list<a>) -> e list<a> */  {
  if (_y_x10025 === null) {
    return resume_0(false);
  }
  else {
    return _y_x10025;
  }
}
 
 
// Return the first solution
export function eager(_action) /* forall<a,e> (() -> <many|e> a) -> e list<a> */  {
  return many_fs__handle(_Hnd_many(3, $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume /* (731) -> 776 list<775> */ ) {
          return $std_core_types.Nil;
        }), $std_core_hnd._open_none1($std_core_hnd.clause_control0, function(resume_0 /* (bool) -> 776 list<775> */ ) {
           
          var x_10177 = resume_0(true);
           
          function next_10178(_y_x10025) /* (list<775>) -> 776 list<775> */  {
            if (_y_x10025 === null) {
              return resume_0(false);
            }
            else {
              return _y_x10025;
            }
          }
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(next_10178);
          }
          else {
            return next_10178(x_10177);
          }
        })), function(x_0 /* 775 */ ) {
      return $std_core_types.Cons(x_0, $std_core_types.Nil);
    }, _action);
}
 
 
// monadic lift
export function _mlift_choice_10138(p1, p2, _y_x10030) /* forall<a,e> (p1 : () -> <many|e> a, p2 : () -> <many|e> a, bool) -> <many|e> a */  {
  if (_y_x10030) {
    return p1();
  }
  else {
    return p2();
  }
}
 
 
// Choice is now defined over `flip` to possibly return multiple results
export function choice(p1, p2) /* forall<a,e> (p1 : () -> <many|e> a, p2 : () -> <many|e> a) -> <many|e> a */  {
   
  var x_10181 = $std_core_hnd._open_at0($std_core_hnd._evv_index(many_fs__tag), function() {
       
      var ev_10184 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
      return ev_10184.hnd._ctl_flip(ev_10184.marker, ev_10184);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10030 /* bool */ ) {
      if (_y_x10030) {
        return p1();
      }
      else {
        return p2();
      }
    });
  }
  else {
    if (x_10181) {
      return p1();
    }
    else {
      return p2();
    }
  }
}
 
 
// monadic lift
export function _mlift_many1_10139(_y_x10036, _y_x10037) /* forall<a,e> (a, list<a>) -> <div,many|e> list<a> */  {
  return $std_core_types.Cons(_y_x10036, _y_x10037);
}
 
 
// monadic lift
export function _mlift_many1_10140(p_0, _y_x10036_0) /* forall<a,e> (p@0 : () -> <many,div|e> a, a) -> <many,div|e> list<a> */  {
   
  var x_10189 = many(p_0);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10037_0 /* list<911> */ ) {
      return _mlift_many1_10139(_y_x10036_0, _y_x10037_0);
    });
  }
  else {
    return _mlift_many1_10139(_y_x10036_0, x_10189);
  }
}
 
 
// Basic combinators
export function many(p) /* forall<a,e> (p : () -> <div,many|e> a) -> <div,many|e> list<a> */  {
  return choice(function() {
      return many1(p);
    }, function() {
      return $std_core_types.Nil;
    });
}
 
export function many1(p_0_0) /* forall<a,e> (p : () -> <div,many|e> a) -> <div,many|e> list<a> */  {
   
  var x_0_10191 = p_0_0();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10036_1 /* 911 */ ) {
      return _mlift_many1_10140(p_0_0, _y_x10036_1);
    });
  }
  else {
     
    var x_1_10194 = many(p_0_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10037_1 /* list<911> */ ) {
        return _mlift_many1_10139(x_0_10191, _y_x10037_1);
      });
    }
    else {
      return $std_core_types.Cons(x_0_10191, x_1_10194);
    }
  }
}
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:parse` type.
export function parse_fs__cfc(parse_0) /* forall<e,a> (parse : parse<e,a>) -> int */  {
  return parse_0._cfc;
}
 
 
// handler for the effect `:parse`
export function parse_fs__handle(hnd, ret, action) /* forall<a,e,b> (hnd : parse<e,b>, ret : (res : a) -> e b, action : () -> <parse|e> a) -> e b */  {
  return $std_core_hnd._hhandle(parse_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-satisfy` constructor field of the `:parse` type.
export function parse_fs__fun_satisfy(parse_0) /* forall<e,a,b> (parse : parse<e,a>) -> hnd/clause1<(string) -> maybe<(b, string)>,b,parse,e,a> */  {
  return parse_0._fun_satisfy;
}
 
 
// select `satisfy` operation out of effect `:parse`
export function satisfy_fs__select(hnd) /* forall<a,e,b> (hnd : parse<e,b>) -> hnd/clause1<(string) -> maybe<(a, string)>,a,parse,e,b> */  {
  return hnd._fun_satisfy;
}
 
 
// Call the `fun satisfy` operation of the effect `:parse`
export function satisfy(pred) /* forall<a> (pred : (string) -> maybe<(a, string)>) -> parse a */  {
   
  var ev_10198 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x2 = ev_10198.hnd._fun_satisfy;
  return _x2(ev_10198.marker, ev_10198, pred);
}
 
 
// monadic lift
export function _mlift_parse_10141(res, wild__) /* forall<a,h,e> (res : a, wild_ : ()) -> <local<h>,many|e> a */  {
  return res;
}
 
 
// monadic lift
export function _mlift_parse_10142(input, pred, _y_x10040) /* forall<a,h,e> (input : local-var<h,string>, pred : (string) -> maybe<(a, string)>, string) -> <local<h>,many|e> a */  {
  var _x3 = $std_core_hnd._open_none1(pred, _y_x10040);
  if (_x3 === null) {
    return $std_core_hnd._open_at0($std_core_hnd._evv_index(many_fs__tag), function() {
         
        var ev_10201 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
        var _x4 = ev_10201.hnd._ctl_fail;
        return _x4(ev_10201.marker, ev_10201);
      });
  }
  else {
     
    var x_10203 = ((input).value = (_x3.value.snd));
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
        return _x3.value.fst;
      });
    }
    else {
      return _x3.value.fst;
    }
  }
}
 
 
// monadic lift
export function _mlift_parse_10143(x, _y_x10045) /* forall<h,a,e> (x : a, string) -> <local<h>,many|e> (a, string) */  {
  return $std_core_types.Tuple2(x, _y_x10045);
}
 
 
// The parse handler uses the `many` effect to return results
// and local state to keep track of the current parser state
// (which is saved/restored among multiple parser strands when using multiple resumptions)
export function parse(inp, action) /* forall<a,e> (inp : string, action : () -> <parse,many|e> a) -> <many|e> (a, string) */  {
  return function() {
     
    var loc = { value: inp };
     
    var res = parse_fs__handle(_Hnd_parse(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail1, function(pred /* (string) -> maybe<(1322, string)> */ ) {
             
            var x_10209 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10040 /* string */ ) {
                return _mlift_parse_10142(loc, pred, _y_x10040);
              });
            }
            else {
              return _mlift_parse_10142(loc, pred, x_10209);
            }
          })), function(x_0 /* 1389 */ ) {
         
        var x_1_10211 = ((loc).value);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10045 /* string */ ) {
            return $std_core_types.Tuple2(x_0, _y_x10045);
          });
        }
        else {
          return $std_core_types.Tuple2(x_0, x_1_10211);
        }
      }, action);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function char(p) /* (p : (char) -> bool) -> parse char */  {
   
  var ev_10216 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
  var _x5 = ev_10216.hnd._fun_satisfy;
  return _x5(ev_10216.marker, ev_10216, function(input /* string */ ) {
       
      var sc = $std_core_sslice.head(input);
      var _x6 = $std_core_string.list(sc);
      if (_x6 !== null && _x6.tail === null) {
        if (p(_x6.head)){
          return $std_core_types.Just($std_core_types.Tuple2(_x6.head, $std_core_sslice.tail(input)));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
 
// monadic lift
export function _mlift_symbol_10144(wild__) /* (wild_ : char) -> parse () */  {
  return $std_core_types.Unit;
}
 
 
// Expression parsers
export function symbol(c) /* (c : char) -> parse () */  {
   
  var x_10219 = char(function(d /* char */ ) {
    return (c === d);
  });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_symbol_10144);
  }
  else {
    return $std_core_types.Unit;
  }
}
 
 
// monadic lift
export function _mlift_digit_10145(_y_x10052) /* (char) -> parse int */  {
  return ($std_core_hnd._open_none2(function(c /* char */ , d /* char */ ) {
       
      var x_10002 = c;
       
      var y_10003 = d;
      return (($std_core_types._int_sub(x_10002,y_10003)));
    }, _y_x10052, 0x0030));
}
 
export function digit() /* () -> parse int */  {
   
  var x_10222 = char($std_core_char.is_digit);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_digit_10145);
  }
  else {
    return ($std_core_hnd._open_none2(function(c /* char */ , d /* char */ ) {
         
        var x_10002 = c;
         
        var y_10003 = d;
        return (($std_core_types._int_sub(x_10002,y_10003)));
      }, x_10222, 0x0030));
  }
}
 
 
// monadic lift
export function _mlift_alpha_10146(_y_x10053) /* (char) -> parse int */  {
  return ($std_core_hnd._open_none2(function(c /* char */ , d /* char */ ) {
       
      var x_10002 = c;
       
      var y_10003 = d;
      return (($std_core_types._int_sub(x_10002,y_10003)));
    }, _y_x10053, 0x0061));
}
 
export function alpha() /* () -> parse int */  {
   
  var x_10225 = char($std_core_char.is_alpha);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_alpha_10146);
  }
  else {
    return ($std_core_hnd._open_none2(function(c /* char */ , d /* char */ ) {
         
        var x_10002 = c;
         
        var y_10003 = d;
        return (($std_core_types._int_sub(x_10002,y_10003)));
      }, x_10225, 0x0061));
  }
}
 
 
// monadic lift
export function _mlift_number_10147(_y_x10054, _y_x10056) /* (int, list<int>) -> <many,div,parse> int */  {
  return $std_core_list.foldl($std_core_types.Cons(_y_x10054, _y_x10056), 0, function(n /* int */ , d /* int */ ) {
       
      var x_10102 = $std_core_types._int_mul(10,n);
      return $std_core_types._int_add(x_10102,d);
    });
}
 
 
// monadic lift
export function _mlift_number_10148(p_0_10002, _y_x10054) /* (p@0@10002 : () -> <many,div,parse> int, int) -> <many,div,parse> int */  {
   
  var x_10228 = choice(function() {
      return many1(p_0_10002);
    }, function() {
      return $std_core_types.Nil;
    });
   
  function next_10229(_y_x10056) /* (list<int>) -> <many,div,parse> int */  {
    return $std_core_list.foldl($std_core_types.Cons(_y_x10054, _y_x10056), 0, function(n /* int */ , d /* int */ ) {
         
        var x_10102 = $std_core_types._int_mul(10,n);
        return $std_core_types._int_add(x_10102,d);
      });
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10229);
  }
  else {
    return next_10229(x_10228);
  }
}
 
export function number() /* () -> <div,many,parse> int */  {
   
  function p_0_10002() /* () -> <many,div,parse> int */  {
    return $std_core_hnd._open_at0(1, digit);
  }
   
  var x_10232 = p_0_10002();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10054 /* int */ ) {
      return _mlift_number_10148(p_0_10002, _y_x10054);
    });
  }
  else {
     
    var x_0_10235 = choice(function() {
        return many1(p_0_10002);
      }, function() {
        return $std_core_types.Nil;
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10056 /* list<int> */ ) {
        return $std_core_list.foldl($std_core_types.Cons(x_10232, _y_x10056), 0, function(n /* int */ , d /* int */ ) {
             
            var x_10102 = $std_core_types._int_mul(10,n);
            return $std_core_types._int_add(x_10102,d);
          });
      });
    }
    else {
      return $std_core_list.foldl($std_core_types.Cons(x_10232, x_0_10235), 0, function(n_0 /* int */ , d_0 /* int */ ) {
           
          var x_10102_0 = $std_core_types._int_mul(10,n_0);
          return $std_core_types._int_add(x_10102_0,d_0);
        });
    }
  }
}
 
 
// monadic lift
export function _mlift_expr_10149(i, j) /* (i : int, j : int) -> <div,many,parse> int */  {
  return $std_core_types._int_add(i,j);
}
 
 
// monadic lift
export function _mlift_expr_10150(wild__) /* (wild_ : char) -> parse () */  {
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_expr_10151(i_0, wild___0) /* (i : int, wild_@0 : ()) -> <parse,many,div> int */  {
   
  var x_10240 = term();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(j_0 /* int */ ) {
      return _mlift_expr_10149(i_0, j_0);
    });
  }
  else {
    return _mlift_expr_10149(i_0, x_10240);
  }
}
 
 
// monadic lift
export function _mlift_expr_10152(i_1) /* (i : int) -> <div,many,parse> int */  {
   
  var x_0_10242 = $std_core_hnd._open_at1(1, function(c /* char */ ) {
       
      var x_1_10244 = char(function(d /* char */ ) {
        return (c === d);
      });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_expr_10150);
      }
      else {
        return _mlift_expr_10150(x_1_10244);
      }
    }, 0x002B);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0_0 /* () */ ) {
      return _mlift_expr_10151(i_1, wild___0_0);
    });
  }
  else {
    return _mlift_expr_10151(i_1, x_0_10242);
  }
}
 
 
// monadic lift
export function _mlift_factor_10153(wild___2) /* (wild_@2 : char) -> parse () */  {
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_factor_10154(i_0_0, wild___0_0_0) /* (i@0 : int, wild_@0@0@0 : ()) -> <parse,div,many> int */  {
  return i_0_0;
}
 
 
// monadic lift
export function _mlift_factor_10155(i_0_1) /* (i@0 : int) -> <div,many,parse> int */  {
   
  var x_2_10246 = $std_core_hnd._open_at1(1, function(c_1 /* char */ ) {
       
      var x_3_10248 = char(function(d_1 /* char */ ) {
        return (c_1 === d_1);
      });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_factor_10153);
      }
      else {
        return _mlift_factor_10153(x_3_10248);
      }
    }, 0x0029);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0_0_0_0 /* () */ ) {
      return _mlift_factor_10154(i_0_1, wild___0_0_0_0);
    });
  }
  else {
    return _mlift_factor_10154(i_0_1, x_2_10246);
  }
}
 
 
// monadic lift
export function _mlift_factor_10156(wild___1) /* (wild_@1 : char) -> parse () */  {
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_factor_10157(wild___0_0_1) /* (wild_@0@0 : ()) -> <parse,div,many> int */  {
   
  var x_4_10250 = expr();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_factor_10155);
  }
  else {
    return _mlift_factor_10155(x_4_10250);
  }
}
 
 
// monadic lift
export function _mlift_term_10158(i_1_0, j_0_0) /* (i@1 : int, j@0 : int) -> <div,many,parse> int */  {
  return $std_core_types._int_mul(i_1_0,j_0_0);
}
 
 
// monadic lift
export function _mlift_term_10159(wild___3) /* (wild_@3 : char) -> parse () */  {
  return $std_core_types.Unit;
}
 
 
// monadic lift
export function _mlift_term_10160(i_1_1, wild___1_0) /* (i@1 : int, wild_@1@0 : ()) -> <parse,div,many> int */  {
   
  var x_5_10252 = factor();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(j_0_1 /* int */ ) {
      return _mlift_term_10158(i_1_1, j_0_1);
    });
  }
  else {
    return _mlift_term_10158(i_1_1, x_5_10252);
  }
}
 
 
// monadic lift
export function _mlift_term_10161(i_1_2) /* (i@1 : int) -> <div,many,parse> int */  {
   
  var x_6_10254 = $std_core_hnd._open_at1(1, function(c_2 /* char */ ) {
       
      var x_7_10256 = char(function(d_2 /* char */ ) {
        return (c_2 === d_2);
      });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_term_10159);
      }
      else {
        return _mlift_term_10159(x_7_10256);
      }
    }, 0x002A);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___1_0_0 /* () */ ) {
      return _mlift_term_10160(i_1_2, wild___1_0_0);
    });
  }
  else {
    return _mlift_term_10160(i_1_2, x_6_10254);
  }
}
 
export function expr() /* () -> <div,many,parse> int */  {
  return choice(function() {
       
      var x_8_10258 = term();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_expr_10152);
      }
      else {
        return _mlift_expr_10152(x_8_10258);
      }
    }, term);
}
 
export function factor() /* () -> <div,many,parse> int */  {
  return choice(number, function() {
       
      var x_9_10260 = $std_core_hnd._open_at1(1, function(c_0 /* char */ ) {
           
          var x_10_10262 = char(function(d_0 /* char */ ) {
            return (c_0 === d_0);
          });
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift_factor_10156);
          }
          else {
            return _mlift_factor_10156(x_10_10262);
          }
        }, 0x0028);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_factor_10157);
      }
      else {
        return _mlift_factor_10157(x_9_10260);
      }
    });
}
 
export function term() /* () -> <div,many,parse> int */  {
  return choice(function() {
       
      var x_11_10264 = factor();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_term_10161);
      }
      else {
        return _mlift_term_10161(x_11_10264);
      }
    }, factor);
}
 
 
// Testing
// Parse for all solutions
export function mparse(p, input) /* forall<a,e> (p : () -> <many,parse|e> a, input : string) -> e list<(a, string)> */  {
  return solutions(function() {
    return parse(input, p);
  });
}
 
 
// Parse eagerly
export function eparse(p, input) /* forall<a,e> (p : () -> <many,parse|e> a, input : string) -> e list<(a, string)> */  {
  return eager(function() {
    return parse(input, p);
  });
}
 
export function example1() /* () -> <console/console,div> () */  {
   
  var x_10003 = solutions(function() {
    return parse("1+2*3", function() {
        return choice(function() {
             
            var x_10266 = choice(function() {
                 
                var x_11_10264 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264);
                }
              }, factor);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift_expr_10152);
            }
            else {
              return _mlift_expr_10152(x_10266);
            }
          }, function() {
            return choice(function() {
                 
                var x_11_10264_0 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264_0);
                }
              }, factor);
          });
      });
  });
  return $std_core_console.printsln($std_core_list.show(x_10003, function(_arg_x1_0 /* (int, string) */ ) {
      return $std_core_tuple.tuple2_fs_show(_arg_x1_0, $std_core_int.show, $std_core_show.string_fs_show);
    }));
}
 
export function example2() /* () -> <console/console,div> () */  {
   
  var x_10007 = eager(function() {
    return parse("1+2*3", function() {
        return choice(function() {
             
            var x_10268 = choice(function() {
                 
                var x_11_10264 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264);
                }
              }, factor);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift_expr_10152);
            }
            else {
              return _mlift_expr_10152(x_10268);
            }
          }, function() {
            return choice(function() {
                 
                var x_11_10264_0 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264_0);
                }
              }, factor);
          });
      });
  });
  return $std_core_console.printsln($std_core_list.show(x_10007, function(_arg_x1_0 /* (int, string) */ ) {
      return $std_core_tuple.tuple2_fs_show(_arg_x1_0, $std_core_int.show, $std_core_show.string_fs_show);
    }));
}
 
export function main() /* () -> <console/console,div> () */  {
   
  var x_10003 = solutions(function() {
    return parse("1+2*3", function() {
        return choice(function() {
             
            var x_10270 = choice(function() {
                 
                var x_11_10264 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264);
                }
              }, factor);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift_expr_10152);
            }
            else {
              return _mlift_expr_10152(x_10270);
            }
          }, function() {
            return choice(function() {
                 
                var x_11_10264_0 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264_0);
                }
              }, factor);
          });
      });
  });
   
  $std_core_console.printsln($std_core_list.show(x_10003, function(_arg_x1_0 /* (int, string) */ ) {
      return $std_core_tuple.tuple2_fs_show(_arg_x1_0, $std_core_int.show, $std_core_show.string_fs_show);
    }));
   
  var x_10007 = eager(function() {
    return parse("1+2*3", function() {
        return choice(function() {
             
            var x_0_10272 = choice(function() {
                 
                var x_11_10264_1 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264_1);
                }
              }, factor);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift_expr_10152);
            }
            else {
              return _mlift_expr_10152(x_0_10272);
            }
          }, function() {
            return choice(function() {
                 
                var x_11_10264_2 = factor();
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_term_10161);
                }
                else {
                  return _mlift_term_10161(x_11_10264_2);
                }
              }, factor);
          });
      });
  });
  return $std_core_console.printsln($std_core_list.show(x_10007, function(_arg_x1_0_0 /* (int, string) */ ) {
      return $std_core_tuple.tuple2_fs_show(_arg_x1_0_0, $std_core_int.show, $std_core_show.string_fs_show);
    }));
}