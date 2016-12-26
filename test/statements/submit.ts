import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "SUBMIT zdemo WITH rb_down = abap_true WITH rb_show = abap_false AND RETURN.",
  "SUBMIT (wa_report-progname) VIA SELECTION-SCREEN AND RETURN.",
  "submit zreport and return with bar in foo with dark = 'X'.",
  "SUBMIT zmoo WITH p_foo EQ bar WITH p_bar EQ foo.",
  "SUBMIT zfoobar WITH s_print = iv_tddest WITH s_pnow = 'X' VIA JOB 'BKG' NUMBER lv_number AND RETURN.",
  "SUBMIT (progname) AND RETURN WITH p_backfn = filename WITH rb_back  = 'X'.",
  "SUBMIT zfoo VIA SELECTION-SCREEN WITH SELECTION-TABLE tab AND RETURN.",
];

statementType(tests, "SUBMIT", Statements.Submit);