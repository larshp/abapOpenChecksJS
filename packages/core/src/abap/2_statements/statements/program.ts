import {IStatement} from "./_statement";
import {verNot, str, seqs, opts, per, optPrio} from "../combi";
import {Source, ReportName} from "../expressions";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class Program implements IStatement {

  public getMatcher(): IStatementRunnable {
    const message = seqs("MESSAGE-ID", Source);
    const size = seqs("LINE-SIZE", Source);
    const heading = str("NO STANDARD PAGE HEADING");
    const line = seqs("LINE-COUNT", Source);
    const options = per(message, size, heading, line);

    const ret = seqs("PROGRAM", optPrio(new ReportName()), opts(options));

    return verNot(Version.Cloud, ret);
  }

}