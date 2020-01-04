import {seq, opt, tok, alt, regex as reg, Expression, IStatementRunnable} from "../combi";
import {Plus} from "../tokens/";
import {SourceFieldSymbol, ArrowOrDash, ComponentName} from "./";

export class FieldOffset extends Expression {
  public getRunnable(): IStatementRunnable {
    const offset = seq(tok(Plus),
// todo, change this regex to Field?
                       alt(reg(/^[\d\w]+$/), new SourceFieldSymbol()),
                       opt(seq(new ArrowOrDash(), new ComponentName())));

    return offset;
  }
}