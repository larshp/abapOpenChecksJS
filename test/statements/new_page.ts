import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "new-page line-size lv_width.",
  "NEW-PAGE NO-TITLE NO-HEADING.",
  "NEW-PAGE WITH-TITLE.",
  "new-page print off.",
  "NEW-PAGE LINE-COUNT 15.",
  "NEW-PAGE WITH-HEADING.",
  "NEW-PAGE PRINT ON PARAMETERS params NO DIALOG.",
];

statementType(tests, "NEW-PAGE", Statements.NewPage);