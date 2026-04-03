// Koka generated module: std/time/parse, koka version: 3.2.4
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
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_num_ddouble from './std_num_ddouble.mjs';
import * as $std_time_duration from './std_time_duration.mjs';
import * as $std_time_instant from './std_time_instant.mjs';
import * as $std_time_date from './std_time_date.mjs';
import * as $std_time_calendar from './std_time_calendar.mjs';
import * as $std_time_calendars from './std_time_calendars.mjs';
import * as $std_time_time from './std_time_time.mjs';
import * as $std_time_locale from './std_time_locale.mjs';
import * as $std_time_utc from './std_time_utc.mjs';
 
// externals
 
// type declarations
 
// declarations
 
export function optchar(c) /* (c : char) -> std/text/parse/parse char */  {
  return $std_text_parse._lp__bar__bar__rp_(function() {
      return $std_text_parse.char(c);
    }, function() {
      return c;
    });
}
 
export function dash() /* () -> std/text/parse/parse char */  {
  return $std_text_parse._lp__bar__bar__rp_(function() {
      return $std_text_parse.char(0x002D);
    }, function() {
      return 0x002D;
    });
}
 
export function colon() /* () -> std/text/parse/parse char */  {
  return $std_text_parse._lp__bar__bar__rp_(function() {
      return $std_text_parse.char(0x003A);
    }, function() {
      return 0x003A;
    });
}
 
 
// monadic lift
export function _mlift_num_10256(_y_x10049) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10049, 0, function(x /* int */ , d /* int */ ) {
       
      var x_0_10139 = $std_core_types._int_mul(x,10);
      return $std_core_types._int_add(x_0_10139,d);
    });
}
 
export function num(n) /* (n : int) -> std/text/parse/parse int */  {
   
  var x_10309 = $std_text_parse.count(n, $std_text_parse.digit);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_num_10256);
  }
  else {
    return $std_core_list.foldl(x_10309, 0, function(x_0 /* int */ , d /* int */ ) {
         
        var x_0_10139 = $std_core_types._int_mul(x_0,10);
        return $std_core_types._int_add(x_0_10139,d);
      });
  }
}
 
 
// monadic lift
export function _mlift_ptime_10257(tzmin, _c_x10083) /* (tzmin : int, int) -> std/time/calendar/timezone */  {
  return $std_core_hnd._open_none0(function() {
    return $std_time_calendar.tz_fixed(_c_x10083, tzmin);
  });
}
 
 
// monadic lift
export function _mlift_ptime_10258(_y_x10080) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10080, 0, function(x_8 /* int */ , d_3 /* int */ ) {
       
      var x_9_10167 = $std_core_types._int_mul(x_8,10);
      return $std_core_types._int_add(x_9_10167,d_3);
    });
}
 
 
// monadic lift
export function _mlift_ptime_10259(sign, tzhour, tzmin) /* (sign : char, tzhour : int, tzmin : int) -> <std/text/parse/parse,std/time/utc/utc> std/time/calendar/timezone */  {
   
  var x_10312 = ((sign === 0x002D)) ? $std_core_types._int_negate(tzhour) : tzhour;
   
  function next_10313(_c_x10083) /* (int) -> std/time/calendar/timezone */  {
    return $std_core_hnd._open_none0(function() {
      return $std_time_calendar.tz_fixed(_c_x10083, tzmin);
    });
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10313);
  }
  else {
    return next_10313(x_10312);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10260(sign, tzhour, wild___3) /* (sign : char, tzhour : int, wild_@3 : char) -> <std/text/parse/parse,std/time/utc/utc> std/time/calendar/timezone */  {
   
  var x_10316 = $std_core_hnd._open_at1(0, function(n_3 /* int */ ) {
       
      var x_0_10318 = $std_text_parse.count(n_3, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_ptime_10258);
      }
      else {
        return $std_core_list.foldl(x_0_10318, 0, function(x_8 /* int */ , d_3 /* int */ ) {
             
            var x_9_10167 = $std_core_types._int_mul(x_8,10);
            return $std_core_types._int_add(x_9_10167,d_3);
          });
      }
    }, 2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(tzmin /* int */ ) {
      return _mlift_ptime_10259(sign, tzhour, tzmin);
    });
  }
  else {
    return _mlift_ptime_10259(sign, tzhour, x_10316);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10261(_y_x10074) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10074, 0, function(x_6 /* int */ , d_2 /* int */ ) {
       
      var x_7_10163 = $std_core_types._int_mul(x_6,10);
      return $std_core_types._int_add(x_7_10163,d_2);
    });
}
 
 
// monadic lift
export function _mlift_ptime_10262(sign, tzhour) /* (sign : char, tzhour : int) -> <std/text/parse/parse,std/time/utc/utc> std/time/calendar/timezone */  {
   
  var x_10320 = $std_core_hnd._open_at0(0, function() {
      return $std_text_parse._lp__bar__bar__rp_(function() {
          return $std_text_parse.char(0x003A);
        }, function() {
          return 0x003A;
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___3 /* char */ ) {
      return _mlift_ptime_10260(sign, tzhour, wild___3);
    });
  }
  else {
    return _mlift_ptime_10260(sign, tzhour, x_10320);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10263(sign) /* (sign : char) -> <std/text/parse/parse,std/time/utc/utc> std/time/calendar/timezone */  {
   
  var x_10322 = $std_core_hnd._open_at1(0, function(n_2 /* int */ ) {
       
      var x_0_10324 = $std_text_parse.count(n_2, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_ptime_10261);
      }
      else {
        return $std_core_list.foldl(x_0_10324, 0, function(x_6 /* int */ , d_2 /* int */ ) {
             
            var x_7_10163 = $std_core_types._int_mul(x_6,10);
            return $std_core_types._int_add(x_7_10163,d_2);
          });
      }
    }, 2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(tzhour /* int */ ) {
      return _mlift_ptime_10262(sign, tzhour);
    });
  }
  else {
    return _mlift_ptime_10262(sign, x_10322);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10264(wild___4) /* (wild_@4 : char) -> <std/text/parse/parse,std/time/utc/utc> std/time/calendar/timezone */  {
  return $std_time_calendar.tz_utc;
}
 
 
// monadic lift
export function _mlift_ptime_10265(cal, date, hour, min, secs, tzone) /* (cal : std/time/calendar/calendar, date : std/time/date/date, hour : int, min : int, secs : std/num/ddouble/ddouble, tzone : std/time/calendar/timezone) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
  return $std_core_hnd._open_at0(1, function() {
      return $std_time_time.date_fs_time(date, $std_time_date.Clock(hour, min, secs), tzone, cal);
    });
}
 
 
// monadic lift
export function _mlift_ptime_10266(s, _c_x10071) /* (s : int, std/num/ddouble/ddouble) -> std/num/ddouble/ddouble */  {
   
  var _x_x1_7_10221 = $std_core_hnd._open_none1(function(i /* int */ ) {
      return $std_num_ddouble.ddouble_int_exp(i, 0);
    }, s);
  return $std_core_hnd._open_none2($std_num_ddouble._lp__plus__rp_, _x_x1_7_10221, _c_x10071);
}
 
 
// monadic lift
export function _mlift_ptime_10267(wild___2) /* (wild_@2 : char) -> <std/text/parse/parse,std/time/utc/utc> string */  {
  return $std_core_hnd._open_at0(0, $std_text_parse.digits);
}
 
 
// monadic lift
export function _mlift_ptime_10268(s, f) /* (s : int, f : string) -> <std/text/parse/parse,std/time/utc/utc> std/num/ddouble/ddouble */  {
   
  if ((f === (""))) {
    var x_10326 = $std_num_ddouble.zero;
  }
  else {
     
    var _x_x1_5_10218 = $std_core_hnd._open_none2($std_core_types._lp__plus__plus__rp_, "0.", f);
     
    var _x_x1_4_10216 = $std_core_hnd._open_none1($std_num_ddouble.parse_ddouble, _x_x1_5_10218);
    var x_10326 = $std_core_hnd._open_none2(function(m /* maybe<std/num/ddouble/ddouble> */ , nothing /* std/num/ddouble/ddouble */ ) {
        return (m === null) ? nothing : m.value;
      }, _x_x1_4_10216, $std_num_ddouble.zero);
  }
   
  function next_10327(_c_x10071) /* (std/num/ddouble/ddouble) -> std/num/ddouble/ddouble */  {
     
    var _x_x1_7_10221 = $std_core_hnd._open_none1(function(i /* int */ ) {
        return $std_num_ddouble.ddouble_int_exp(i, 0);
      }, s);
    return $std_core_hnd._open_none2($std_num_ddouble._lp__plus__rp_, _x_x1_7_10221, _c_x10071);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10327);
  }
  else {
    return next_10327(x_10326);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10269(_y_x10065) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10065, 0, function(x_3 /* int */ , d_1 /* int */ ) {
       
      var x_4_10151 = $std_core_types._int_mul(x_3,10);
      return $std_core_types._int_add(x_4_10151,d_1);
    });
}
 
 
// monadic lift
export function _mlift_ptime_10270(s) /* (s : int) -> <std/text/parse/parse,std/time/utc/utc> std/num/ddouble/ddouble */  {
   
  var x_10330 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x_0_10332 = $std_core_hnd._open_at1(0, $std_text_parse.one_of, ".,");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_ptime_10267);
      }
      else {
        return $std_core_hnd._open_at0(0, $std_text_parse.digits);
      }
    }, function() {
      return "";
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(f /* string */ ) {
      return _mlift_ptime_10268(s, f);
    });
  }
  else {
    return _mlift_ptime_10268(s, x_10330);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10271(cal, date, hour, min, secs) /* (cal : std/time/calendar/calendar, date : std/time/date/date, hour : int, min : int, secs : std/num/ddouble/ddouble) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10334 = $std_text_parse.choose($std_core_types.Cons(function() {
       
      var x_0_10336 = $std_core_hnd._open_at1(0, $std_text_parse.one_of, "+-");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_ptime_10263);
      }
      else {
        return _mlift_ptime_10263(x_0_10336);
      }
    }, $std_core_types.Cons(function() {
         
        var x_1_10338 = $std_text_parse._lp__bar__bar__rp_(function() {
            return $std_core_hnd._open_at1(0, $std_text_parse.char, 0x005A);
          }, function() {
            return 0x005A;
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(_mlift_ptime_10264);
        }
        else {
          return $std_time_calendar.tz_utc;
        }
      }, $std_core_types.Nil)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(tzone /* std/time/calendar/timezone */ ) {
      return _mlift_ptime_10265(cal, date, hour, min, secs, tzone);
    });
  }
  else {
    return _mlift_ptime_10265(cal, date, hour, min, secs, x_10334);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10272(cal, date, hour, min, wild___1) /* (cal : std/time/calendar/calendar, date : std/time/date/date, hour : int, min : int, wild_@1 : char) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10340 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x_0_10342 = $std_core_hnd._open_at1(0, function(n_1 /* int */ ) {
           
          var x_1_10344 = $std_text_parse.count(n_1, $std_text_parse.digit);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift_ptime_10269);
          }
          else {
            return $std_core_list.foldl(x_1_10344, 0, function(x_3 /* int */ , d_1 /* int */ ) {
                 
                var x_4_10151 = $std_core_types._int_mul(x_3,10);
                return $std_core_types._int_add(x_4_10151,d_1);
              });
          }
        }, 2);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_ptime_10270);
      }
      else {
        return _mlift_ptime_10270(x_0_10342);
      }
    }, function() {
      return $std_num_ddouble.zero;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(secs /* std/num/ddouble/ddouble */ ) {
      return _mlift_ptime_10271(cal, date, hour, min, secs);
    });
  }
  else {
    return _mlift_ptime_10271(cal, date, hour, min, x_10340);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10273(_y_x10058) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10058, 0, function(x_1 /* int */ , d_0 /* int */ ) {
       
      var x_2_10147 = $std_core_types._int_mul(x_1,10);
      return $std_core_types._int_add(x_2_10147,d_0);
    });
}
 
 
// monadic lift
export function _mlift_ptime_10274(cal, date, hour, min) /* (cal : std/time/calendar/calendar, date : std/time/date/date, hour : int, min : int) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10346 = $std_core_hnd._open_at0(0, function() {
      return $std_text_parse._lp__bar__bar__rp_(function() {
          return $std_text_parse.char(0x003A);
        }, function() {
          return 0x003A;
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___1 /* char */ ) {
      return _mlift_ptime_10272(cal, date, hour, min, wild___1);
    });
  }
  else {
    return _mlift_ptime_10272(cal, date, hour, min, x_10346);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10275(cal, date, hour, wild___0) /* (cal : std/time/calendar/calendar, date : std/time/date/date, hour : int, wild_@0 : char) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10348 = $std_text_parse._lp__bar__bar__rp_(function() {
      return $std_core_hnd._open_at1(0, function(n_0 /* int */ ) {
           
          var x_0_10350 = $std_text_parse.count(n_0, $std_text_parse.digit);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift_ptime_10273);
          }
          else {
            return $std_core_list.foldl(x_0_10350, 0, function(x_1 /* int */ , d_0 /* int */ ) {
                 
                var x_2_10147 = $std_core_types._int_mul(x_1,10);
                return $std_core_types._int_add(x_2_10147,d_0);
              });
          }
        }, 2);
    }, function() {
      return 0;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(min /* int */ ) {
      return _mlift_ptime_10274(cal, date, hour, min);
    });
  }
  else {
    return _mlift_ptime_10274(cal, date, hour, x_10348);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10276(_y_x10052) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10052, 0, function(x /* int */ , d /* int */ ) {
       
      var x_0_10143 = $std_core_types._int_mul(x,10);
      return $std_core_types._int_add(x_0_10143,d);
    });
}
 
 
// monadic lift
export function _mlift_ptime_10277(cal, date, hour) /* (cal : std/time/calendar/calendar, date : std/time/date/date, hour : int) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10352 = $std_core_hnd._open_at0(0, function() {
      return $std_text_parse._lp__bar__bar__rp_(function() {
          return $std_text_parse.char(0x003A);
        }, function() {
          return 0x003A;
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0 /* char */ ) {
      return _mlift_ptime_10275(cal, date, hour, wild___0);
    });
  }
  else {
    return _mlift_ptime_10275(cal, date, hour, x_10352);
  }
}
 
 
// monadic lift
export function _mlift_ptime_10278(cal, date, wild__) /* (cal : std/time/calendar/calendar, date : std/time/date/date, wild_ : char) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10354 = $std_core_hnd._open_at1(0, function(n /* int */ ) {
       
      var x_0_10356 = $std_text_parse.count(n, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_ptime_10276);
      }
      else {
        return $std_core_list.foldl(x_0_10356, 0, function(x /* int */ , d /* int */ ) {
             
            var x_0_10143 = $std_core_types._int_mul(x,10);
            return $std_core_types._int_add(x_0_10143,d);
          });
      }
    }, 2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(hour /* int */ ) {
      return _mlift_ptime_10277(cal, date, hour);
    });
  }
  else {
    return _mlift_ptime_10277(cal, date, x_10354);
  }
}
 
export function ptime(date, cal) /* (date : std/time/date/date, cal : std/time/calendar/calendar) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10358 = $std_core_hnd._open_at1(0, $std_text_parse.one_of, "T ");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* char */ ) {
      return _mlift_ptime_10278(cal, date, wild__);
    });
  }
  else {
     
    var x_0_10361 = $std_core_hnd._open_at1(0, function(n /* int */ ) {
         
        var x_1_10364 = $std_text_parse.count(n, $std_text_parse.digit);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(_mlift_ptime_10276);
        }
        else {
          return $std_core_list.foldl(x_1_10364, 0, function(x /* int */ , d /* int */ ) {
               
              var x_0_10143 = $std_core_types._int_mul(x,10);
              return $std_core_types._int_add(x_0_10143,d);
            });
        }
      }, 2);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(hour /* int */ ) {
        return _mlift_ptime_10277(cal, date, hour);
      });
    }
    else {
       
      var x_2_10366 = $std_core_hnd._open_at0(0, function() {
          return $std_text_parse._lp__bar__bar__rp_(function() {
              return $std_text_parse.char(0x003A);
            }, function() {
              return 0x003A;
            });
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild___0 /* char */ ) {
          return _mlift_ptime_10275(cal, date, x_0_10361, wild___0);
        });
      }
      else {
         
        var x_3_10369 = $std_text_parse._lp__bar__bar__rp_(function() {
            return $std_core_hnd._open_at1(0, function(n_0 /* int */ ) {
                 
                var x_4_10372 = $std_text_parse.count(n_0, $std_text_parse.digit);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_ptime_10273);
                }
                else {
                  return $std_core_list.foldl(x_4_10372, 0, function(x_1 /* int */ , d_0 /* int */ ) {
                       
                      var x_2_10147 = $std_core_types._int_mul(x_1,10);
                      return $std_core_types._int_add(x_2_10147,d_0);
                    });
                }
              }, 2);
          }, function() {
            return 0;
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(min /* int */ ) {
            return _mlift_ptime_10274(cal, date, x_0_10361, min);
          });
        }
        else {
           
          var x_5_10374 = $std_core_hnd._open_at0(0, function() {
              return $std_text_parse._lp__bar__bar__rp_(function() {
                  return $std_text_parse.char(0x003A);
                }, function() {
                  return 0x003A;
                });
            });
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(wild___1 /* char */ ) {
              return _mlift_ptime_10272(cal, date, x_0_10361, x_3_10369, wild___1);
            });
          }
          else {
             
            var x_6_10377 = $std_text_parse._lp__bar__bar__rp_(function() {
                 
                var x_7_10380 = $std_core_hnd._open_at1(0, function(n_1 /* int */ ) {
                     
                    var x_8_10382 = $std_text_parse.count(n_1, $std_text_parse.digit);
                    if ($std_core_hnd._yielding()) {
                      return $std_core_hnd.yield_extend(_mlift_ptime_10269);
                    }
                    else {
                      return $std_core_list.foldl(x_8_10382, 0, function(x_3 /* int */ , d_1 /* int */ ) {
                           
                          var x_4_10151 = $std_core_types._int_mul(x_3,10);
                          return $std_core_types._int_add(x_4_10151,d_1);
                        });
                    }
                  }, 2);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift_ptime_10270);
                }
                else {
                  return _mlift_ptime_10270(x_7_10380);
                }
              }, function() {
                return $std_num_ddouble.zero;
              });
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(secs /* std/num/ddouble/ddouble */ ) {
                return _mlift_ptime_10271(cal, date, x_0_10361, x_3_10369, secs);
              });
            }
            else {
               
              var x_9_10384 = $std_text_parse.choose($std_core_types.Cons(function() {
                   
                  var x_10_10387 = $std_core_hnd._open_at1(0, $std_text_parse.one_of, "+-");
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(_mlift_ptime_10263);
                  }
                  else {
                    return _mlift_ptime_10263(x_10_10387);
                  }
                }, $std_core_types.Cons(function() {
                     
                    var x_11_10389 = $std_text_parse._lp__bar__bar__rp_(function() {
                        return $std_core_hnd._open_at1(0, $std_text_parse.char, 0x005A);
                      }, function() {
                        return 0x005A;
                      });
                    if ($std_core_hnd._yielding()) {
                      return $std_core_hnd.yield_extend(_mlift_ptime_10264);
                    }
                    else {
                      return $std_time_calendar.tz_utc;
                    }
                  }, $std_core_types.Nil)));
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(function(tzone /* std/time/calendar/timezone */ ) {
                  return _mlift_ptime_10265(cal, date, x_0_10361, x_3_10369, x_6_10377, tzone);
                });
              }
              else {
                return $std_core_hnd._open_at0(1, function() {
                    return $std_time_time.date_fs_time(date, $std_time_date.Clock(x_0_10361, x_3_10369, x_6_10377), x_9_10384, cal);
                  });
              }
            }
          }
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_piso_10279(cal, date, default_4_10039) /* (cal : std/time/calendar/calendar, date : std/time/date/date, default@4@10039 : std/time/time/time) -> <std/time/utc/utc,std/text/parse/parse> std/time/time/time */  {
  return $std_text_parse._lp__bar__bar__rp_(function() {
      return ptime(date, cal);
    }, function() {
      return default_4_10039;
    });
}
 
 
// monadic lift
export function _mlift_piso_10280(_y_x10100) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10100, 0, function(x_3 /* int */ , d_1 /* int */ ) {
       
      var x_4_10182 = $std_core_types._int_mul(x_3,10);
      return $std_core_types._int_add(x_4_10182,d_1);
    });
}
 
 
// monadic lift
export function _mlift_piso_10281(calendar, m, year, d_2) /* (calendar : std/time/calendar/calendar, m : int, year : int, d@2 : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
  return $std_core_types.Tuple2($std_time_date.$Date(year, m, d_2), calendar);
}
 
 
// monadic lift
export function _mlift_piso_10282(calendar, m, year, wild___0) /* (calendar : std/time/calendar/calendar, m : int, year : int, wild_@0 : char) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10391 = $std_core_hnd._open_at1(0, function(n_1 /* int */ ) {
       
      var x_0_10393 = $std_text_parse.count(n_1, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_piso_10280);
      }
      else {
        return $std_core_list.foldl(x_0_10393, 0, function(x_3 /* int */ , d_1 /* int */ ) {
             
            var x_4_10182 = $std_core_types._int_mul(x_3,10);
            return $std_core_types._int_add(x_4_10182,d_1);
          });
      }
    }, 2);
   
  function next_10392(d_2) /* (int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
    return $std_core_types.Tuple2($std_time_date.$Date(year, m, d_2), calendar);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10392);
  }
  else {
    return next_10392(x_10391);
  }
}
 
 
// monadic lift
export function _mlift_piso_10283(_y_x10094) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10094, 0, function(x_1 /* int */ , d_0 /* int */ ) {
       
      var x_2_10178 = $std_core_types._int_mul(x_1,10);
      return $std_core_types._int_add(x_2_10178,d_0);
    });
}
 
 
// monadic lift
export function _mlift_piso_10284(calendar, year, m) /* (calendar : std/time/calendar/calendar, year : int, m : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10399 = $std_core_hnd._open_at0(0, function() {
      return $std_text_parse._lp__bar__bar__rp_(function() {
          return $std_text_parse.char(0x002D);
        }, function() {
          return 0x002D;
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___0 /* char */ ) {
      return _mlift_piso_10282(calendar, m, year, wild___0);
    });
  }
  else {
    return _mlift_piso_10282(calendar, m, year, x_10399);
  }
}
 
 
// monadic lift
export function _mlift_piso_10285(_y_x10110) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10110, 0, function(x_7 /* int */ , d_4 /* int */ ) {
       
      var x_8_10190 = $std_core_types._int_mul(x_7,10);
      return $std_core_types._int_add(x_8_10190,d_4);
    });
}
 
 
// monadic lift
export function _mlift_piso_10286(w, year, d_0_0) /* (w : int, year : int, d@0@0 : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
  return $std_core_types.Tuple2($std_time_date.$Date(year, w, d_0_0), $std_time_calendars.cal_iso_week);
}
 
 
// monadic lift
export function _mlift_piso_10287(w, year, wild___2) /* (w : int, year : int, wild_@2 : char) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10401 = $std_text_parse._lp__bar__bar__rp_(function() {
      return $std_core_hnd._open_at1(0, function(n_3 /* int */ ) {
           
          var x_0_10403 = $std_text_parse.count(n_3, $std_text_parse.digit);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift_piso_10285);
          }
          else {
            return $std_core_list.foldl(x_0_10403, 0, function(x_7 /* int */ , d_4 /* int */ ) {
                 
                var x_8_10190 = $std_core_types._int_mul(x_7,10);
                return $std_core_types._int_add(x_8_10190,d_4);
              });
          }
        }, 1);
    }, function() {
      return 1;
    });
   
  function next_10402(d_0_0) /* (int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
    return $std_core_types.Tuple2($std_time_date.$Date(year, w, d_0_0), $std_time_calendars.cal_iso_week);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10402);
  }
  else {
    return next_10402(x_10401);
  }
}
 
 
// monadic lift
export function _mlift_piso_10288(_y_x10104) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10104, 0, function(x_5 /* int */ , d_3 /* int */ ) {
       
      var x_6_10186 = $std_core_types._int_mul(x_5,10);
      return $std_core_types._int_add(x_6_10186,d_3);
    });
}
 
 
// monadic lift
export function _mlift_piso_10289(year, w) /* (year : int, w : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10408 = $std_core_hnd._open_at0(0, function() {
      return $std_text_parse._lp__bar__bar__rp_(function() {
          return $std_text_parse.char(0x002D);
        }, function() {
          return 0x002D;
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___2 /* char */ ) {
      return _mlift_piso_10287(w, year, wild___2);
    });
  }
  else {
    return _mlift_piso_10287(w, year, x_10408);
  }
}
 
 
// monadic lift
export function _mlift_piso_10290(year, wild___1) /* (year : int, wild_@1 : char) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10410 = $std_core_hnd._open_at1(0, function(n_2 /* int */ ) {
       
      var x_0_10412 = $std_text_parse.count(n_2, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_piso_10288);
      }
      else {
        return $std_core_list.foldl(x_0_10412, 0, function(x_5 /* int */ , d_3 /* int */ ) {
             
            var x_6_10186 = $std_core_types._int_mul(x_5,10);
            return $std_core_types._int_add(x_6_10186,d_3);
          });
      }
    }, 2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(w /* int */ ) {
      return _mlift_piso_10289(year, w);
    });
  }
  else {
    return _mlift_piso_10289(year, x_10410);
  }
}
 
 
// monadic lift
export function _mlift_piso_10291(_y_x10114) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10114, 0, function(x_9 /* int */ , d_5 /* int */ ) {
       
      var x_10_10193 = $std_core_types._int_mul(x_9,10);
      return $std_core_types._int_add(x_10_10193,d_5);
    });
}
 
 
// monadic lift
export function _mlift_piso_10292(calendar, year, d_1_0) /* (calendar : std/time/calendar/calendar, year : int, d@1@0 : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
  return $std_core_types.Tuple2($std_time_date.$Date(year, 1, d_1_0), calendar);
}
 
 
// monadic lift
export function _mlift_piso_10293(_y_x10124) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10124, 0, function(x_13 /* int */ , d_7 /* int */ ) {
       
      var x_14_10201 = $std_core_types._int_mul(x_13,10);
      return $std_core_types._int_add(x_14_10201,d_7);
    });
}
 
 
// monadic lift
export function _mlift_piso_10294(m_0, year, d_2_0) /* (m@0 : int, year : int, d@2@0 : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
  return $std_core_types.Tuple2($std_time_date.$Date(year, m_0, d_2_0), $std_time_calendars.cal_iso_month);
}
 
 
// monadic lift
export function _mlift_piso_10295(m_0, year, wild___4) /* (m@0 : int, year : int, wild_@4 : char) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10414 = $std_core_hnd._open_at1(0, function(n_6 /* int */ ) {
       
      var x_0_10416 = $std_text_parse.count(n_6, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_piso_10293);
      }
      else {
        return $std_core_list.foldl(x_0_10416, 0, function(x_13 /* int */ , d_7 /* int */ ) {
             
            var x_14_10201 = $std_core_types._int_mul(x_13,10);
            return $std_core_types._int_add(x_14_10201,d_7);
          });
      }
    }, 2);
   
  function next_10415(d_2_0) /* (int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
    return $std_core_types.Tuple2($std_time_date.$Date(year, m_0, d_2_0), $std_time_calendars.cal_iso_month);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10415);
  }
  else {
    return next_10415(x_10414);
  }
}
 
 
// monadic lift
export function _mlift_piso_10296(_y_x10118) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10118, 0, function(x_11 /* int */ , d_6 /* int */ ) {
       
      var x_12_10197 = $std_core_types._int_mul(x_11,10);
      return $std_core_types._int_add(x_12_10197,d_6);
    });
}
 
 
// monadic lift
export function _mlift_piso_10297(year, m_0) /* (year : int, m@0 : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10421 = $std_core_hnd._open_at0(0, function() {
      return $std_text_parse._lp__bar__bar__rp_(function() {
          return $std_text_parse.char(0x002D);
        }, function() {
          return 0x002D;
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild___4 /* char */ ) {
      return _mlift_piso_10295(m_0, year, wild___4);
    });
  }
  else {
    return _mlift_piso_10295(m_0, year, x_10421);
  }
}
 
 
// monadic lift
export function _mlift_piso_10298(year, wild___3) /* (year : int, wild_@3 : char) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10423 = $std_core_hnd._open_at1(0, function(n_5 /* int */ ) {
       
      var x_0_10425 = $std_text_parse.count(n_5, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_piso_10296);
      }
      else {
        return $std_core_list.foldl(x_0_10425, 0, function(x_11 /* int */ , d_6 /* int */ ) {
             
            var x_12_10197 = $std_core_types._int_mul(x_11,10);
            return $std_core_types._int_add(x_12_10197,d_6);
          });
      }
    }, 2);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(m_0 /* int */ ) {
      return _mlift_piso_10297(year, m_0);
    });
  }
  else {
    return _mlift_piso_10297(year, x_10423);
  }
}
 
 
// monadic lift
export function _mlift_piso_10299(_y_x10128) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10128, 0, function(x_15 /* int */ , d_8 /* int */ ) {
       
      var x_16_10205 = $std_core_types._int_mul(x_15,10);
      return $std_core_types._int_add(x_16_10205,d_8);
    });
}
 
 
// monadic lift
export function _mlift_piso_10300(year, d_3_0) /* (year : int, d@3@0 : int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
  return $std_core_types.Tuple2($std_time_date.$Date(year, 1, d_3_0), $std_time_calendars.cal_iso_month);
}
 
 
// monadic lift
export function _mlift_piso_10301(year, wild___5) /* (year : int, wild_@5 : char) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
   
  var x_10427 = $std_core_hnd._open_at1(0, function(n_7 /* int */ ) {
       
      var x_0_10429 = $std_text_parse.count(n_7, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_piso_10299);
      }
      else {
        return $std_core_list.foldl(x_0_10429, 0, function(x_15 /* int */ , d_8 /* int */ ) {
             
            var x_16_10205 = $std_core_types._int_mul(x_15,10);
            return $std_core_types._int_add(x_16_10205,d_8);
          });
      }
    }, 3);
   
  function next_10428(d_3_0) /* (int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
    return $std_core_types.Tuple2($std_time_date.$Date(year, 1, d_3_0), $std_time_calendars.cal_iso_month);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10428);
  }
  else {
    return next_10428(x_10427);
  }
}
 
 
// monadic lift
export function _mlift_piso_10302(_y_x10131) /* ((std/time/date/date, std/time/calendar/calendar)) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10433 = $std_core_hnd._open_at0(1, function() {
      return $std_time_time.date_fs_time(_y_x10131.fst, undefined, undefined, _y_x10131.snd);
    });
   
  function next_10434(default_4_10039) /* (std/time/time/time) -> <std/time/utc/utc,std/text/parse/parse> std/time/time/time */  {
    return $std_text_parse._lp__bar__bar__rp_(function() {
        return ptime(_y_x10131.fst, _y_x10131.snd);
      }, function() {
        return default_4_10039;
      });
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_10434);
  }
  else {
    return next_10434(x_10433);
  }
}
 
 
// monadic lift
export function _mlift_piso_10303(calendar, year, wild__) /* (calendar : std/time/calendar/calendar, year : int, wild_ : char) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10438 = $std_text_parse.choose($std_core_types.Cons(function() {
       
      var x_0_10440 = $std_core_hnd._open_at1(0, function(n_0 /* int */ ) {
           
          var x_1_10442 = $std_text_parse.count(n_0, $std_text_parse.digit);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift_piso_10283);
          }
          else {
            return $std_core_list.foldl(x_1_10442, 0, function(x_1 /* int */ , d_0 /* int */ ) {
                 
                var x_2_10178 = $std_core_types._int_mul(x_1,10);
                return $std_core_types._int_add(x_2_10178,d_0);
              });
          }
        }, 2);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(m /* int */ ) {
          return _mlift_piso_10284(calendar, year, m);
        });
      }
      else {
        return _mlift_piso_10284(calendar, year, x_0_10440);
      }
    }, $std_core_types.Cons(function() {
         
        var x_2_10444 = $std_core_hnd._open_at1(0, $std_text_parse.char, 0x0057);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(wild___1 /* char */ ) {
            return _mlift_piso_10290(year, wild___1);
          });
        }
        else {
          return _mlift_piso_10290(year, x_2_10444);
        }
      }, $std_core_types.Cons(function() {
           
          var x_3_10446 = $std_core_hnd._open_at1(0, function(n_4 /* int */ ) {
               
              var x_4_10448 = $std_text_parse.count(n_4, $std_text_parse.digit);
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(_mlift_piso_10291);
              }
              else {
                return $std_core_list.foldl(x_4_10448, 0, function(x_9 /* int */ , d_5 /* int */ ) {
                     
                    var x_10_10193 = $std_core_types._int_mul(x_9,10);
                    return $std_core_types._int_add(x_10_10193,d_5);
                  });
              }
            }, 3);
           
          function next_3_10447(d_1_0) /* (int) -> <std/text/parse/parse,std/time/utc/utc> (std/time/date/date, std/time/calendar/calendar) */  {
            return $std_core_types.Tuple2($std_time_date.$Date(year, 1, d_1_0), calendar);
          }
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(next_3_10447);
          }
          else {
            return next_3_10447(x_3_10446);
          }
        }, $std_core_types.Cons(function() {
             
            var x_5_10453 = $std_core_hnd._open_at1(0, $std_text_parse.char, 0x004D);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(wild___3 /* char */ ) {
                return _mlift_piso_10298(year, wild___3);
              });
            }
            else {
              return _mlift_piso_10298(year, x_5_10453);
            }
          }, $std_core_types.Cons(function() {
               
              var x_6_10455 = $std_core_hnd._open_at1(0, $std_text_parse.char, 0x004D);
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(function(wild___5 /* char */ ) {
                  return _mlift_piso_10301(year, wild___5);
                });
              }
              else {
                return _mlift_piso_10301(year, x_6_10455);
              }
            }, $std_core_types.Nil))))));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_piso_10302);
  }
  else {
    return _mlift_piso_10302(x_10438);
  }
}
 
 
// monadic lift
export function _mlift_piso_10304(_y_x10088) /* (list<int>) -> std/text/parse/parse int */  {
  return $std_core_list.foldl(_y_x10088, 0, function(x /* int */ , d /* int */ ) {
       
      var x_0_10174 = $std_core_types._int_mul(x,10);
      return $std_core_types._int_add(x_0_10174,d);
    });
}
 
 
// monadic lift
export function _mlift_piso_10305(calendar, year) /* (calendar : std/time/calendar/calendar, year : int) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10457 = $std_core_hnd._open_at0(0, function() {
      return $std_text_parse._lp__bar__bar__rp_(function() {
          return $std_text_parse.char(0x002D);
        }, function() {
          return 0x002D;
        });
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* char */ ) {
      return _mlift_piso_10303(calendar, year, wild__);
    });
  }
  else {
    return _mlift_piso_10303(calendar, year, x_10457);
  }
}
 
export function piso(calendar) /* (calendar : std/time/calendar/calendar) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_10459 = $std_core_hnd._open_at1(0, function(n /* int */ ) {
       
      var x_0_10462 = $std_text_parse.count(n, $std_text_parse.digit);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_piso_10304);
      }
      else {
        return $std_core_list.foldl(x_0_10462, 0, function(x /* int */ , d /* int */ ) {
             
            var x_0_10174 = $std_core_types._int_mul(x,10);
            return $std_core_types._int_add(x_0_10174,d);
          });
      }
    }, 4);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(year /* int */ ) {
      return _mlift_piso_10305(calendar, year);
    });
  }
  else {
     
    var x_1_10464 = $std_core_hnd._open_at0(0, function() {
        return $std_text_parse._lp__bar__bar__rp_(function() {
            return $std_text_parse.char(0x002D);
          }, function() {
            return 0x002D;
          });
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__ /* char */ ) {
        return _mlift_piso_10303(calendar, x_10459, wild__);
      });
    }
    else {
       
      var x_2_10467 = $std_text_parse.choose($std_core_types.Cons(function() {
           
          var x_3_10470 = $std_core_hnd._open_at1(0, function(n_0 /* int */ ) {
               
              var x_4_10472 = $std_text_parse.count(n_0, $std_text_parse.digit);
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(_mlift_piso_10283);
              }
              else {
                return $std_core_list.foldl(x_4_10472, 0, function(x_1 /* int */ , d_0 /* int */ ) {
                     
                    var x_2_10178 = $std_core_types._int_mul(x_1,10);
                    return $std_core_types._int_add(x_2_10178,d_0);
                  });
              }
            }, 2);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(m /* int */ ) {
              return _mlift_piso_10284(calendar, x_10459, m);
            });
          }
          else {
            return _mlift_piso_10284(calendar, x_10459, x_3_10470);
          }
        }, $std_core_types.Cons(function() {
             
            var x_5_10474 = $std_core_hnd._open_at1(0, $std_text_parse.char, 0x0057);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(wild___1 /* char */ ) {
                return _mlift_piso_10290(x_10459, wild___1);
              });
            }
            else {
              return _mlift_piso_10290(x_10459, x_5_10474);
            }
          }, $std_core_types.Cons(function() {
               
              var x_6_10476 = $std_core_hnd._open_at1(0, function(n_4 /* int */ ) {
                   
                  var x_7_10478 = $std_text_parse.count(n_4, $std_text_parse.digit);
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(_mlift_piso_10291);
                  }
                  else {
                    return $std_core_list.foldl(x_7_10478, 0, function(x_9 /* int */ , d_5 /* int */ ) {
                         
                        var x_10_10193 = $std_core_types._int_mul(x_9,10);
                        return $std_core_types._int_add(x_10_10193,d_5);
                      });
                  }
                }, 3);
               
              var next_6_10477 = function(d_1_0 /* int */ ) {
                return $std_core_types.Tuple2($std_time_date.$Date(x_10459, 1, d_1_0), calendar);
              };
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(next_6_10477);
              }
              else {
                return next_6_10477(x_6_10476);
              }
            }, $std_core_types.Cons(function() {
                 
                var x_8_10483 = $std_core_hnd._open_at1(0, $std_text_parse.char, 0x004D);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(wild___3 /* char */ ) {
                    return _mlift_piso_10298(x_10459, wild___3);
                  });
                }
                else {
                  return _mlift_piso_10298(x_10459, x_8_10483);
                }
              }, $std_core_types.Cons(function() {
                   
                  var x_9_10485 = $std_core_hnd._open_at1(0, $std_text_parse.char, 0x004D);
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(function(wild___5 /* char */ ) {
                      return _mlift_piso_10301(x_10459, wild___5);
                    });
                  }
                  else {
                    return _mlift_piso_10301(x_10459, x_9_10485);
                  }
                }, $std_core_types.Nil))))));
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_piso_10302);
      }
      else {
         
        var x_10_10487 = $std_core_hnd._open_at0(1, function() {
            return $std_time_time.date_fs_time(x_2_10467.fst, undefined, undefined, x_2_10467.snd);
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(default_4_10039 /* std/time/time/time */ ) {
            return $std_text_parse._lp__bar__bar__rp_(function() {
                return ptime(x_2_10467.fst, x_2_10467.snd);
              }, function() {
                return default_4_10039;
              });
          });
        }
        else {
          return $std_text_parse._lp__bar__bar__rp_(function() {
              return ptime(x_2_10467.fst, x_2_10467.snd);
            }, function() {
              return x_10_10487;
            });
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift_parse_iso_10306(x, wild__) /* (x : std/time/time/time, wild_ : ()) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
  return x;
}
 
 
// monadic lift
export function _mlift_parse_iso_10307(x) /* (x : std/time/time/time) -> <std/text/parse/parse,std/time/utc/utc> std/time/time/time */  {
   
  var x_0_10493 = $std_core_hnd._open_at0(0, $std_text_parse.eof);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return x;
    });
  }
  else {
    return x;
  }
}
 
 
// monadic lift
export function _mlift_parse_iso_10308(_y_x10138) /* (std/text/parse/parse-error<std/time/time/time>) -> std/time/utc/utc maybe<std/time/time/time> */  {
  return $std_core_hnd._open_none1(function(perr /* std/text/parse/parse-error<std/time/time/time> */ ) {
      if (perr._tag === 1) {
        return $std_core_types.Just(perr.result);
      }
      else {
        return $std_core_types.Nothing;
      }
    }, _y_x10138);
}
 
export function parse_iso(s, calendar) /* (s : string, calendar : ? std/time/calendar/calendar) -> std/time/utc/utc maybe<std/time/time/time> */  {
   
  var input_10041 = $std_core_sslice.Sslice(s, 0, s.length);
   
  var x_10497 = $std_text_parse.parse(input_10041, function() {
       
      var _x0 = (calendar !== undefined) ? calendar : $std_time_calendar.cal_iso;
      var x_0_10500 = piso(_x0);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift_parse_iso_10307);
      }
      else {
        return _mlift_parse_iso_10307(x_0_10500);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift_parse_iso_10308);
  }
  else {
    return $std_core_hnd._open_none1(function(perr /* std/text/parse/parse-error<std/time/time/time> */ ) {
        if (perr._tag === 1) {
          return $std_core_types.Just(perr.result);
        }
        else {
          return $std_core_types.Nothing;
        }
      }, x_10497);
  }
}