import {Statement} from "./statement";
import * as Reuse from "./reuse";
import * as Combi from "../combi";

let str = Combi.str;
let seq = Combi.seq;
let alt = Combi.alt;
let opt = Combi.opt;
let per = Combi.per;
let plus = Combi.plus;

export class ModifyLine extends Statement {

  public static get_matcher(): Combi.IRunnable {

    let form = seq(str("INVERSE ="), new Reuse.Source());

    let value = seq(str("FIELD VALUE"), plus(new Reuse.Source()));
    let format = seq(str("FIELD FORMAT"), new Reuse.Source(), opt(form));
    let from = seq(str("FROM"), new Reuse.Source());
    let lineValue = seq(str("LINE VALUE FROM"), new Reuse.Source());
    let index = seq(str("INDEX"), new Reuse.Source());
    let page = seq(str("OF PAGE"), new Reuse.Source());
    let lineFormat = str("LINE FORMAT INPUT OFF");

    let options = per(index, value, from, format, page, lineFormat, lineValue);

    let ret = seq(str("MODIFY"),
                  alt(str("CURRENT LINE"),
                      seq(str("LINE"), new Reuse.Source())),
                  opt(options));

    return ret;
  }

}