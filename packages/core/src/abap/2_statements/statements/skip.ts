import {IStatement} from "./_statement";
import {verNot, seqs, opts} from "../combi";
import {Source} from "../expressions";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class Skip implements IStatement {

  public getMatcher(): IStatementRunnable {
    const ret = seqs("SKIP",
                     opts("TO LINE"),
                     opts(Source));

    return verNot(Version.Cloud, ret);
  }

}