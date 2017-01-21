import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "CONVERT TIME STAMP lv_stamp TIME ZONE tz INTO DATE dat TIME tim DAYLIGHT SAVING TIME dst.",
  "CONVERT TIME STAMP obj->stru~created TIME ZONE sy-zonlo INTO DATE lv_date TIME lv_time.",
  "CONVERT DATE lv_date TIME lv_time INTO TIME STAMP rv_time TIME ZONE '      '.",
  "CONVERT DATE iv_date INTO TIME STAMP lv_stamp TIME ZONE lv_zone.",
  "convert time t date d into time stamp lv_ts time zone 'UTC   '.",
  "CONVERT DATE SY-DATUM INTO INVERTED-DATE lv_inv.",
  "CONVERT TIME STAMP iv_timestamp TIME ZONE iv_timezone INTO DATE lv_date.",
  "convert date lv_date time lv_time daylight saving time 'X' into time stamp lv_tstmp time zone lv_tzone.",
];

statementType(tests, "CONVERT", Statements.Convert);