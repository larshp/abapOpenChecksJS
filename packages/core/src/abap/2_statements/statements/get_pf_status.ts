import {IStatement} from "./_statement";
import {verNot, seqs, opts} from "../combi";
import {Target, Source} from "../expressions";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class GetPFStatus implements IStatement {

  public getMatcher(): IStatementRunnable {
    const program = seqs("PROGRAM", Source);
    const excl = seqs("EXCLUDING", Source);

    const ret = seqs("GET PF-STATUS",
                     Target,
                     opts(program),
                     opts(excl));

    return verNot(Version.Cloud, ret);
  }

}