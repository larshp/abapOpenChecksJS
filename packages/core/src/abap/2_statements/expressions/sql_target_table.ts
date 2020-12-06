import {alts, seqs, Expression, opts} from "../combi";
import {SQLTarget} from ".";
import {IStatementRunnable} from "../statement_runnable";

export class SQLTargetTable extends Expression {
  public getRunnable(): IStatementRunnable {
    const intoTable = seqs(alts("INTO", "APPENDING"),
                           opts("CORRESPONDING FIELDS OF"),
                           "TABLE",
                           SQLTarget);

    return intoTable;
  }
}