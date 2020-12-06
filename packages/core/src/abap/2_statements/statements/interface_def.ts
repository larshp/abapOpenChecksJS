import {IStatement} from "./_statement";
import {Version} from "../../../version";
import {str, seqs, opt, alt, ver, plus} from "../combi";
import {Source, InterfaceName, AttributeName, AbstractMethods, FinalMethods} from "../expressions";
import {IStatementRunnable} from "../statement_runnable";

export class InterfaceDef implements IStatement {

  public getMatcher(): IStatementRunnable {
    const val = seqs(AttributeName, "=", Source);

    const dataValues = seqs("DATA VALUES",
                            plus(val));

    const options = alt(new AbstractMethods(),
                        new FinalMethods(),
                        str("ALL METHODS ABSTRACT"),
                        str("ALL METHODS FINAL"),
                        ver(Version.v740sp02, str("PARTIALLY IMPLEMENTED")));

    return seqs("INTERFACES",
                InterfaceName,
                opt(options),
                opt(dataValues));
  }

}