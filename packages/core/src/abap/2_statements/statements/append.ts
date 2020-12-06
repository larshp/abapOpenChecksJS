import {IStatement} from "./_statement";
import {str, opts, alts, seqs, altPrios, optPrio, ver} from "../combi";
import {Version} from "../../../version";
import {FSTarget, Target, Field, Source, SimpleSource} from "../expressions";
import {IStatementRunnable} from "../statement_runnable";

export class Append implements IStatement {

  public getMatcher(): IStatementRunnable {
    const assigning = seqs("ASSIGNING", FSTarget);
    const reference = seqs("REFERENCE INTO", Target);
    const sorted = seqs("SORTED BY", Field);

    const range = seqs(optPrio(seqs("FROM", Source)),
                       optPrio(seqs("TO", Source)));

    const src = alts(ver(Version.v740sp02, new Source()), SimpleSource);

    return seqs("APPEND",
                altPrios("INITIAL LINE", seqs(optPrio(str("LINES OF")), src)),
                opts(range),
                optPrio(seqs("TO", Target)),
                opts(altPrios(assigning, reference)),
                optPrio(str("CASTING")),
                optPrio(sorted));
  }

}