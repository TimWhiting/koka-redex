// Koka generated module: std/os/dir, koka version: 3.2.4
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
 
// externals
 
// type declarations
 
// declarations
 
export function prim_copy_file(from, to, preserve_mtime) /* (from : string, to : string, preserve-mtime : bool) -> fsys error<()> */  {
  return $std_core._unsupported_external("std/os/dir/@extern-prim-copy-file");
}
 
 
// Copy a file.
export function copy_file(from, to, preserve_mtime) /* (from : std/os/path/path, to : std/os/path/path, preserve-mtime : ? bool) -> <exn,fsys> () */  {
   
  var _x_x1_10057 = $std_core_hnd._open_none1($std_os_path.string, from);
   
  var _x_x2_10058 = $std_core_hnd._open_none1($std_os_path.string, to);
  var _x1 = (preserve_mtime !== undefined) ? preserve_mtime : true;
  var _x0 = $std_core_hnd._open_none3(prim_copy_file, _x_x1_10057, _x_x2_10058, _x1);
  if (_x0._tag === 1) {
     
    var _x_x1_4_10066 = $std_core_hnd._open_none1(function(p /* std/os/path/path */ ) {
        return $std_core_show.string_fs_show($std_os_path.string(p));
      }, from);
     
    var _x_x2_3_10070 = $std_core_hnd._open_none1(function(p_0 /* std/os/path/path */ ) {
        return $std_core_show.string_fs_show($std_os_path.string(p_0));
      }, to);
     
    var _x_x2_2_10067 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, " to ", _x_x2_3_10070);
     
    var _x_x2_1_10065 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, _x_x1_4_10066, _x_x2_2_10067);
     
    var _x_x2_0_10063 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "unable to copy ", _x_x2_1_10065);
     
    var exn_0_10000 = $std_core_hnd._open_none2(function(exn_1 /* exception */ , pre /* string */ ) {
        var _x2 = exn_1.message;
        var _x3 = exn_1.info;
        return $std_core_exn.Exception($std_core_types._lp__plus__plus__rp_(pre, $std_core_types._lp__plus__plus__rp_(": ", _x2)), _x3);
      }, _x0.error, _x_x2_0_10063);
     
    var ev_10107 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    var _x2 = $std_core_exn.throw_exn_fs__select(ev_10107.hnd);
    return _x2(ev_10107.marker, ev_10107, exn_0_10000);
  }
  else {
    return $std_core_types.Unit;
  }
}
 
export function ensure_dir_err(path, mode) /* (path : string, mode : int) -> fsys error<()> */  {
  return $std_core._unsupported_external("std/os/dir/@extern-ensure-dir-err");
}
 
 
// Ensure a directory path exists
export function ensure_dir(dir) /* (dir : std/os/path/path) -> <exn,fsys> () */  {
   
  var _x_x1_10073 = $std_core_hnd._open_none1($std_os_path.string, dir);
  var _x3 = $std_core_hnd._open_none2(ensure_dir_err, _x_x1_10073, -1);
  if (_x3._tag === 1) {
     
    var _x_x2_1_10079 = $std_core_hnd._open_none1(function(p /* std/os/path/path */ ) {
        return $std_core_show.string_fs_show($std_os_path.string(p));
      }, dir);
     
    var _x_x2_0_10077 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "unable to create directory ", _x_x2_1_10079);
     
    var exn_0_10001 = $std_core_hnd._open_none2(function(exn_1 /* exception */ , pre /* string */ ) {
        var _x4 = exn_1.message;
        var _x5 = exn_1.info;
        return $std_core_exn.Exception($std_core_types._lp__plus__plus__rp_(pre, $std_core_types._lp__plus__plus__rp_(": ", _x4)), _x5);
      }, _x3.error, _x_x2_0_10077);
     
    var ev_10110 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    var _x4 = $std_core_exn.throw_exn_fs__select(ev_10110.hnd);
    return _x4(ev_10110.marker, ev_10110, exn_0_10001);
  }
  else {
    return $std_core_types.Unit;
  }
}
 
export function prim_is_dir(dir) /* (dir : string) -> fsys bool */  {
  return $std_core._unsupported_external("std/os/dir/@extern-prim-is-dir");
}
 
 
// Is the path a valid directory?
export function is_directory(dir) /* (dir : std/os/path/path) -> fsys bool */  {
  return prim_is_dir($std_os_path.string(dir));
}
 
export function prim_list_dir(dir) /* (dir : string) -> fsys error<vector<string>> */  {
  return $std_core._unsupported_external("std/os/dir/@extern-prim-list-dir");
}
 
 
// List directory contents (excluding `.` and `..`).
// Returns a list of full paths (not just the names in the directory).
export function list_directory(dir) /* (dir : std/os/path/path) -> <exn,fsys> list<std/os/path/path> */  {
   
  var _x_x1_10082 = $std_core_hnd._open_none1($std_os_path.string, dir);
  var _x5 = $std_core_hnd._open_none1(prim_list_dir, _x_x1_10082);
  if (_x5._tag === 1) {
     
    var ev_10113 = $std_core_hnd._evv_at(($std_core_hnd._open_none1($std_core_types._make_ssize__t, 0)));
    var _x6 = $std_core_exn.throw_exn_fs__select(ev_10113.hnd);
    return _x6(ev_10113.marker, ev_10113, _x5.error);
  }
  else {
    return $std_core_list.map($std_core_hnd._open_none1(function(v /* vector<string> */ ) {
          return $std_core_vector.vlist(v);
        }, _x5.value), function(name /* string */ ) {
         
        var _x_x2_10087 = $std_core_hnd._open_none1($std_os_path.path, name);
        return $std_core_hnd._open_none2($std_os_path._lp__fs__rp_, dir, _x_x2_10087);
      });
  }
}
 
 
// monadic lift
export function _mlift_list_directory_recursive_10100(all, _y_x10013) /* (all : list<std/os/path/path>, list<std/os/path/path>) -> <div,exn,fsys> list<std/os/path/path> */  {
  return $std_core_hnd._open_none2(function(xs /* list<std/os/path/path> */ , ys /* list<std/os/path/path> */ ) {
      return $std_core_list.append(xs, ys);
    }, all, _y_x10013);
}
 
 
// monadic lift
export function _mlift_list_directory_recursive_10101(all_0, max_depth, dirs) /* (all : list<std/os/path/path>, max-depth : ? int, dirs : list<std/os/path/path>) -> <fsys,div,exn> list<std/os/path/path> */  {
   
  var x_10116 = $std_core_list.flatmap(dirs, function(sub /* std/os/path/path */ ) {
      var _x7 = (max_depth !== undefined) ? max_depth : 1000;
      return list_directory_recursive(sub, $std_core_types._int_sub(_x7,1));
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10013_0 /* list<std/os/path/path> */ ) {
      return _mlift_list_directory_recursive_10100(all_0, _y_x10013_0);
    });
  }
  else {
    return _mlift_list_directory_recursive_10100(all_0, x_10116);
  }
}
 
 
// monadic lift
export function _mlift_list_directory_recursive_10102(max_depth_0, all_1) /* (max-depth : ? int, all : list<std/os/path/path>) -> <exn,fsys> list<std/os/path/path> */  {
   
  var x_0_10118 = $std_core_list.filter(all_1, function(_x_x1 /* std/os/path/path */ ) {
      return $std_core_hnd._open_none1(is_directory, _x_x1);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(dirs_0 /* list<std/os/path/path> */ ) {
      return _mlift_list_directory_recursive_10101(all_1, max_depth_0, dirs_0);
    });
  }
  else {
    return _mlift_list_directory_recursive_10101(all_1, max_depth_0, x_0_10118);
  }
}
 
 
// Recursively list all the entries under a directory.
export function list_directory_recursive(dir, max_depth_1) /* (dir : std/os/path/path, max-depth : ? int) -> <pure,fsys> list<std/os/path/path> */  {
  var _x8 = (max_depth_1 !== undefined) ? max_depth_1 : 1000;
  var _x7 = $std_core_types._int_lt(_x8,0);
  if (_x7) {
    return $std_core_types.Nil;
  }
  else {
     
    var x_1_10120 = list_directory(dir);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(all_2 /* list<std/os/path/path> */ ) {
        return _mlift_list_directory_recursive_10102(max_depth_1, all_2);
      });
    }
    else {
       
      var x_2_10123 = $std_core_list.filter(x_1_10120, function(_x_x1_0 /* std/os/path/path */ ) {
          return $std_core_hnd._open_none1(is_directory, _x_x1_0);
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(dirs_1 /* list<std/os/path/path> */ ) {
          return _mlift_list_directory_recursive_10101(x_1_10120, max_depth_1, dirs_1);
        });
      }
      else {
         
        var x_3_10126 = $std_core_list.flatmap(x_2_10123, function(sub_0 /* std/os/path/path */ ) {
            var _x9 = (max_depth_1 !== undefined) ? max_depth_1 : 1000;
            return list_directory_recursive(sub_0, $std_core_types._int_sub(_x9,1));
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_x10013_1 /* list<std/os/path/path> */ ) {
            return _mlift_list_directory_recursive_10100(x_1_10120, _y_x10013_1);
          });
        }
        else {
          return $std_core_hnd._open_none2(function(xs_0 /* list<std/os/path/path> */ , ys_0 /* list<std/os/path/path> */ ) {
              return $std_core_list.append(xs_0, ys_0);
            }, x_1_10120, x_3_10126);
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_copy_directory_10103(dirs, to, wild___0) /* (dirs : list<std/os/path/path>, to : std/os/path/path, wild_@0 : ()) -> <exn,fsys,div> () */  {
  return $std_core_list.foreach(dirs, function(d /* std/os/path/path */ ) {
       
      var _x_x2_0_10095 = $std_core_hnd._open_none1(function(p_0 /* std/os/path/path */ ) {
           
          var _x9 = p_0.parts;
          var parts_10113_0 = $std_core_list.take(_x9, 1);
          if (parts_10113_0 !== undefined) {
            var _x9 = parts_10113_0;
          }
          else {
            var _x9 = p_0.parts;
          }
          return $std_os_path.Path("", _x9);
        }, d);
      return copy_directory(d, $std_core_hnd._open_none2($std_os_path._lp__fs__rp_, to, _x_x2_0_10095));
    });
}
 
 
// monadic lift
export function _mlift_copy_directory_10104(to_0, _y_x10017) /* (to : std/os/path/path, (list<std/os/path/path>, list<std/os/path/path>)) -> <fsys,div,exn> () */  {
   
  var x_10129 = $std_core_list.foreach(_y_x10017.snd, function(f /* std/os/path/path */ ) {
       
      var _x_x2_10092 = $std_core_hnd._open_none1(function(p /* std/os/path/path */ ) {
           
          var _x9 = p.parts;
          var parts_10113 = $std_core_list.take(_x9, 1);
          if (parts_10113 !== undefined) {
            var _x9 = parts_10113;
          }
          else {
            var _x9 = p.parts;
          }
          return $std_os_path.Path("", _x9);
        }, f);
      return copy_file(f, $std_core_hnd._open_none2($std_os_path._lp__fs__rp_, to_0, _x_x2_10092));
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0_0 /* () */ ) {
      return _mlift_copy_directory_10103(_y_x10017.fst, to_0, wild___0_0);
    });
  }
  else {
    return _mlift_copy_directory_10103(_y_x10017.fst, to_0, x_10129);
  }
}
 
 
// monadic lift
export function _mlift_copy_directory_10105(to_1, all) /* (to : std/os/path/path, all : list<std/os/path/path>) -> <exn,fsys> () */  {
   
  var x_0_10131 = $std_core_list.partition(all, function(_x_x1 /* std/os/path/path */ ) {
      return $std_core_hnd._open_none1(is_directory, _x_x1);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_x10017_0 /* (list<std/os/path/path>, list<std/os/path/path>) */ ) {
      return _mlift_copy_directory_10104(to_1, _y_x10017_0);
    });
  }
  else {
    return _mlift_copy_directory_10104(to_1, x_0_10131);
  }
}
 
 
// monadic lift
export function _mlift_copy_directory_10106(dir, to_2, wild__) /* (dir : std/os/path/path, to : std/os/path/path, wild_ : ()) -> <exn,fsys> () */  {
   
  var x_1_10133 = list_directory(dir);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(all_0 /* list<std/os/path/path> */ ) {
      return _mlift_copy_directory_10105(to_2, all_0);
    });
  }
  else {
    return _mlift_copy_directory_10105(to_2, x_1_10133);
  }
}
 
export function copy_directory(dir_0, to_3) /* (dir : std/os/path/path, to : std/os/path/path) -> <pure,fsys> () */  {
   
  var x_2_10135 = ensure_dir(to_3);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___1 /* () */ ) {
      return _mlift_copy_directory_10106(dir_0, to_3, wild___1);
    });
  }
  else {
     
    var x_3_10138 = list_directory(dir_0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(all_1 /* list<std/os/path/path> */ ) {
        return _mlift_copy_directory_10105(to_3, all_1);
      });
    }
    else {
       
      var x_4_10141 = $std_core_list.partition(x_3_10138, function(_x_x1_0 /* std/os/path/path */ ) {
          return $std_core_hnd._open_none1(is_directory, _x_x1_0);
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_x10017_1 /* (list<std/os/path/path>, list<std/os/path/path>) */ ) {
          return _mlift_copy_directory_10104(to_3, _y_x10017_1);
        });
      }
      else {
         
        var x_5_10144 = $std_core_list.foreach(x_4_10141.snd, function(f_0 /* std/os/path/path */ ) {
             
            var _x_x2_10092_0 = $std_core_hnd._open_none1(function(p_1 /* std/os/path/path */ ) {
                 
                var _x9 = p_1.parts;
                var parts_10113_1 = $std_core_list.take(_x9, 1);
                if (parts_10113_1 !== undefined) {
                  var _x9 = parts_10113_1;
                }
                else {
                  var _x9 = p_1.parts;
                }
                return $std_os_path.Path("", _x9);
              }, f_0);
            return copy_file(f_0, $std_core_hnd._open_none2($std_os_path._lp__fs__rp_, to_3, _x_x2_10092_0));
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild___0_1 /* () */ ) {
            return _mlift_copy_directory_10103(x_4_10141.fst, to_3, wild___0_1);
          });
        }
        else {
          return $std_core_list.foreach(x_4_10141.fst, function(d_0 /* std/os/path/path */ ) {
               
              var _x_x2_0_10095_0 = $std_core_hnd._open_none1(function(p_0_0 /* std/os/path/path */ ) {
                   
                  var _x9 = p_0_0.parts;
                  var parts_10113_0_0 = $std_core_list.take(_x9, 1);
                  if (parts_10113_0_0 !== undefined) {
                    var _x9 = parts_10113_0_0;
                  }
                  else {
                    var _x9 = p_0_0.parts;
                  }
                  return $std_os_path.Path("", _x9);
                }, d_0);
              return copy_directory(d_0, $std_core_hnd._open_none2($std_os_path._lp__fs__rp_, to_3, _x_x2_0_10095_0));
            });
        }
      }
    }
  }
}
 
 
// Copy a file to a directory
export function copy_file_to_dir(from, dir) /* (from : std/os/path/path, dir : std/os/path/path) -> <exn,fsys> () */  {
   
  var _x_x2_10098 = $std_core_hnd._open_none1(function(p /* std/os/path/path */ ) {
       
      var _x9 = p.parts;
      var parts_10113 = $std_core_list.take(_x9, 1);
      if (parts_10113 !== undefined) {
        var _x9 = parts_10113;
      }
      else {
        var _x9 = p.parts;
      }
      return $std_os_path.Path("", _x9);
    }, from);
  return copy_file(from, $std_core_hnd._open_none2($std_os_path._lp__fs__rp_, dir, _x_x2_10098));
}
 
export function prim_is_file(path) /* (path : string) -> fsys bool */  {
  return $std_core._unsupported_external("std/os/dir/@extern-prim-is-file");
}
 
 
// Is the path a valid file?
export function is_file(path) /* (path : std/os/path/path) -> fsys bool */  {
  return prim_is_file($std_os_path.string(path));
}