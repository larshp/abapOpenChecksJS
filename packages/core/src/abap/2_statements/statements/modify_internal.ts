import {IStatement} from "./_statement";
import {seq, opts, alt, pers, pluss} from "../combi";
import {FSTarget, Target, Source, Dynamic, ComponentCond, FieldSub, SimpleName} from "../expressions";
import {IStatementRunnable} from "../statement_runnable";

export class ModifyInternal implements IStatement {

  public getMatcher(): IStatementRunnable {
    const index = seq("INDEX", Source);
    const from = seq("FROM", Source);
    const transporting = seq("TRANSPORTING", pluss(alt(FieldSub, Dynamic)));

    const where = seq("WHERE", ComponentCond);
    const assigning = seq("ASSIGNING", FSTarget);
    const using = seq("USING KEY", SimpleName);
    const additions = pers(where, assigning, using);

    const target = alt(Target, Dynamic);

    const options = alt(
      pers(index, transporting),
      seq(from, opts(pers(index, transporting))),
      seq(pers(index, transporting), from, opts(pers(index, transporting))));

    const long = seq("MODIFY", opts("TABLE"), target, opts(options), opts(additions));

    const simple = seq("MODIFY TABLE", target, from, opts(using));

    return alt(long, simple);
  }

}