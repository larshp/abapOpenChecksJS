import {Statement} from "./statement";
import * as Combi from "../combi";
import * as Reuse from "./reuse";

let str = Combi.str;
let seq = Combi.seq;
let opt = Combi.opt;
let alt = Combi.alt;

export class Search extends Statement {

  public static get_matcher(): Combi.IRunnable {
    let starting = seq(str("STARTING AT"), new Reuse.Source());

    let mode = alt(str("IN BYTE MODE"), str("IN CHARACTER MODE"));

    let ret = seq(str("SEARCH"),
                  new Reuse.Source(),
                  str("FOR"),
                  new Reuse.Source(),
                  opt(mode),
                  opt(starting));

    return ret;
  }

}