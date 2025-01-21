import {CDSAnnotation, CDSType, CDSWithParameters} from ".";
import {Expression, seq, star, opt, str, plus} from "../../abap/2_statements/combi";
import {IStatementRunnable} from "../../abap/2_statements/statement_runnable";
import {CDSName} from "./cds_name";

export class CDSDefineTableFunction extends Expression {
  public getRunnable(): IStatementRunnable {
    const methodName = seq(CDSName, "=", ">", CDSName);

    return seq(star(CDSAnnotation), str("DEFINE TABLE FUNCTION"), CDSName, CDSWithParameters, str("RETURNS {"),
               plus(seq(CDSName, ":", CDSType, ";")),
               str("} IMPLEMENTED BY METHOD"), methodName, opt(";"));
  }
}