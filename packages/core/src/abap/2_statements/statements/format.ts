import {IStatement} from "./_statement";
import {verNot, str, per, alts, seqs, opts, altPrios} from "../combi";
import {Source, Color} from "../expressions";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class Format implements IStatement {

  public getMatcher(): IStatementRunnable {
    const eq = seqs("=", Source);
    const value = alts(eq, altPrios("ON", "OFF", Source));

    const options = per(str("RESET"),
                        seqs("INTENSIFIED", opts(value)),
                        seqs("INVERSE", opts(value)),
                        seqs("HOTSPOT", opts(value)),
                        seqs("FRAMES", value),
                        seqs("INPUT", value),
                        new Color());

    const ret = seqs("FORMAT", options);

    return verNot(Version.Cloud, ret);
  }

}