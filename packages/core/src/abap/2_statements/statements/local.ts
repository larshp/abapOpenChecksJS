import {IStatement} from "./_statement";
import {verNot, seqs, opt} from "../combi";
import {FieldSub, TableBody} from "../expressions";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class Local implements IStatement {

  public getMatcher(): IStatementRunnable {
    const ret = seqs("LOCAL", FieldSub, opt(new TableBody()));

    return verNot(Version.Cloud, ret);
  }

}