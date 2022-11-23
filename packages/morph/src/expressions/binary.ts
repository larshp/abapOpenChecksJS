import {BinaryExpression} from "ts-morph";
import {handleExpressions} from "../expressions";

export class MorphBinary {
  public run(s: BinaryExpression) {
    return handleExpressions(s.forEachChildAsArray());
  }
}