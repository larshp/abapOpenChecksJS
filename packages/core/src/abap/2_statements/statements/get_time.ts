import {IStatement} from "./_statement";
import {seqs, alts, opts} from "../combi";
import {Target} from "../expressions";
import {IStatementRunnable} from "../statement_runnable";

export class GetTime implements IStatement {

  public getMatcher(): IStatementRunnable {
    const options = seqs(alts("STAMP FIELD", "FIELD"), Target);

    return seqs("GET TIME", opts(options));
  }

}