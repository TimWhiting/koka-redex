// Koka generated module: handlers/named/file-scoped, koka version: 3.2.4
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
import * as $std_os_path from './std_os_path.mjs';
import * as $std_os_file from './std_os_file.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the effect `:file`
export var file_fs__tag;
var file_fs__tag = "file@file-scoped";
// type file
export function _Hnd_file(_cfc, _fun_read_line) /* forall<s,e,a> (int, hnd/clause0<string,file<s>,e,a>) -> file<s,e,a> */  {
  return { _cfc: _cfc, _fun_read_line: _fun_read_line };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `@cfc` constructor field of the `:file` type.
export function file_fs__cfc(file_0) /* forall<s,e,a> (file : file<s,e,a>) -> int */  {
  return file_0._cfc;
}
 
 
// handler for the effect `:file`
export function file_fs__handle(hnd, ret, action) /* forall<s,a,e,b> (hnd : file<s,e,b>, ret : (res : a) -> e b, action : forall<s1> (hname : hnd/ev<file<s1>>) -> <file<s1>|e> a) -> e b */  {
  return $std_core_hnd._named_handle(file_fs__tag, hnd, ret, action);
}
 
 
// Automatically generated. Retrieves the `@fun-read-line` constructor field of the `:file` type.
export function file_fs__fun_read_line(file_0) /* forall<s,e,a> (file : file<s,e,a>) -> hnd/clause0<string,file<s>,e,a> */  {
  return file_0._fun_read_line;
}
 
 
// select `read-line` operation out of effect `:file`
export function read_line_fs__select(hnd) /* forall<s,e,a> (hnd : file<s,e,a>) -> hnd/clause0<string,file<s>,e,a> */  {
  return hnd._fun_read_line;
}
 
 
// Call the `fun read-line` operation of the effect `:file`
export function read_line(_hname) /* forall<s> (hnd/ev<file<s>>) -> (file<s>) string */  {
  return _hname.hnd._fun_read_line(_hname.marker, _hname);
}
 
 
// monadic lift
export function _mlift_file_10041(fname, _y_x10005) /* forall<h,e> (fname : string, int) -> <local<h>|e> string */  {
   
  var _x_x2_0_10032 = $std_core_hnd._open_none1($std_core_int.show, _y_x10005);
   
  var _x_x2_10030 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, ": line ", _x_x2_0_10032);
  return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, fname, _x_x2_10030);
}
 
 
// monadic lift
export function _mlift_file_10042(fname, i, wild__) /* forall<h,e> (fname : string, i : local-var<h,int>, wild_ : ()) -> <local<h>|e> string */  {
   
  var x_10049 = ((i).value);
   
  function next_10050(_y_x10005) /* (int) -> <local<604>|616> string */  {
     
    var _x_x2_0_10032 = $std_core_hnd._open_none1($std_core_int.show, _y_x10005);
     
    var _x_x2_10030 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, ": line ", _x_x2_0_10032);
    return $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, fname, _x_x2_10030);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10050);
  }
  else {
    return next_10050(x_10049);
  }
}
 
 
// monadic lift
export function _mlift_file_10043(fname, i, _y_x10003) /* forall<h,e> (fname : string, i : local-var<h,int>, int) -> <local<h>|e> string */  {
   
  var x_10053 = ((i).value = ($std_core_types._int_add(_y_x10003,1)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return _mlift_file_10042(fname, i, wild__);
    });
  }
  else {
    return _mlift_file_10042(fname, i, x_10053);
  }
}
 
 
// a handler instance for files
export function file(fname, action) /* forall<a,e> (fname : string, action : forall<s> (hnd/ev<file<s>>) -> <file<s>|e> a) -> e a */  {
  return function() {
     
    var loc = { value: 0 };
     
    var res = file_fs__handle(_Hnd_file(1, $std_core_hnd._open_none1($std_core_hnd.clause_tail0, function() {
             
            var x_10057 = ((loc).value);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_y_x10003 /* int */ ) {
                return _mlift_file_10043(fname, loc, _y_x10003);
              });
            }
            else {
              return _mlift_file_10043(fname, loc, x_10057);
            }
          })), function(_res /* 615 */ ) {
        return _res;
      }, function(f /* hnd/ev<file<597>> */ ) {
        return action(f);
      });
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// monadic lift
export function _mlift_read_both_10044(_y_x10012, _y_x10014) /* forall<e,s,s1> (string, string) -> <file<s1>,file<s>,console/console|e> () */  {
   
  var _x_x2_10038 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\n", _y_x10014);
   
  var _x_x1_1_10036 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10012, _x_x2_10038);
  return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10036);
}
 
 
// monadic lift
export function _mlift_read_both_10045(f2, _y_x10012) /* forall<e,s,s1> (f2 : hnd/ev<file<s1>>, string) -> <file<s>,file<s1>,console/console|e> () */  {
   
  var x_10060 = $std_core_hnd._open_none1(function(_hname_0 /* hnd/ev<file<724>> */ ) {
      return _hname_0.hnd._fun_read_line(_hname_0.marker, _hname_0);
    }, f2);
   
  function next_10061(_y_x10014) /* (string) -> <file<724>,file<723>,console/console|722> () */  {
     
    var _x_x2_10038 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\n", _y_x10014);
     
    var _x_x1_1_10036 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _y_x10012, _x_x2_10038);
    return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10036);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10061);
  }
  else {
    return next_10061(x_10060);
  }
}
 
export function read_both(f1, f2) /* forall<e,s,s1> (f1 : hnd/ev<file<s>>, f2 : hnd/ev<file<s1>>) -> <console/console,file<s>,file<s1>|e> () */  {
   
  var x_10066 = $std_core_hnd._open_none1(function(_hname /* hnd/ev<file<723>> */ ) {
      return _hname.hnd._fun_read_line(_hname.marker, _hname);
    }, f1);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10012 /* string */ ) {
      return _mlift_read_both_10045(f2, _y_x10012);
    });
  }
  else {
     
    var x_0_10071 = $std_core_hnd._open_none1(function(_hname_0 /* hnd/ev<file<724>> */ ) {
        return _hname_0.hnd._fun_read_line(_hname_0.marker, _hname_0);
      }, f2);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_x10014 /* string */ ) {
         
        var _x_x2_10038 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\n", _y_x10014);
         
        var _x_x1_1_10036 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_10066, _x_x2_10038);
        return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10036);
      });
    }
    else {
       
      var _x_x2_10038_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "\n", x_0_10071);
       
      var _x_x1_1_10036_0 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, x_10066, _x_x2_10038_0);
      return $std_core_hnd._open_none1($std_core_console.printsln, _x_x1_1_10036_0);
    }
  }
}
 
export function main() /* () -> console/console () */  {
  return file("package.yaml", function(f1 /* hnd/ev<file<785>> */ ) {
      return file("stack.yaml", function(f2 /* hnd/ev<file<778>> */ ) {
          return read_both(f1, f2);
        });
    });
}