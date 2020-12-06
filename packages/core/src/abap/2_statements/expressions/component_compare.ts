import {seq, opts, vers, tok, pluss, alt, Expression} from "../combi";
import {ComponentChainSimple, FieldSub, Constant, Source, CompareOperator} from ".";
import {WParenLeft, ParenRightW} from "../../1_lexer/tokens";
import {Version} from "../../../version";
import {IStatementRunnable} from "../statement_runnable";

export class ComponentCompare extends Expression {
  public getRunnable(): IStatementRunnable {
    const val = alt(FieldSub, Constant);

    const list = seq(tok(WParenLeft),
                     val,
                     pluss(seq(",", val)),
                     tok(ParenRightW));

    const inn = seq(opts("NOT"), "IN", alt(Source, list));

    const sopt = seq("IS",
                     opts("NOT"),
                     alt("SUPPLIED",
                         "BOUND",
                         vers(Version.v750, seq("INSTANCE OF", Source)),
                         "REQUESTED",
                         "ASSIGNED",
                         "INITIAL"));

    const between = seq(opts("NOT"), "BETWEEN", Source, "AND", Source);

    const rett = seq(ComponentChainSimple, alt(seq(CompareOperator, Source), inn, between, sopt));

    const ret = seq(opts("NOT"), rett);

    return ret;
  }
}