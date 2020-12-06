import {IStatement} from "./_statement";
import {seqs, alts, pers, altPrios, opts, pluss, optPrios} from "../combi";
import {Target, Dynamic, ComponentChain, SourceFieldSymbol} from "../expressions";
import {IStatementRunnable} from "../statement_runnable";

export class Sort implements IStatement {

  public getMatcher(): IStatementRunnable {
    const order = altPrios("ASCENDING", "DESCENDING");

    const sel = alts(ComponentChain, Dynamic, SourceFieldSymbol);

    const text = "AS TEXT";

    const fields = pluss(seqs(sel, optPrios(text), optPrios(order), optPrios(text)));

    const by = seqs("BY", fields);

    const normal = seqs(Target, opts(pers(order, by, "STABLE", text)));

    const target = alts(normal, text);

    return seqs("SORT", target);
  }

}