import {seqs, Expression, alts, opts, pluss} from "../combi";
import {Cond, Source, Throw, Let} from ".";
import {IStatementRunnable} from "../statement_runnable";

export class CondBody extends Expression {
  public getRunnable(): IStatementRunnable {
    const when = seqs("WHEN", Cond, "THEN", alts(Source, Throw));

    const elsee = seqs("ELSE", alts(Source, Throw));

    return seqs(opts(Let),
                pluss(when),
                opts(elsee));
  }
}