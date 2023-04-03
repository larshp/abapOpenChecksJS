import * as Statements from "../abap/2_statements/statements";
import {Issue} from "../issue";
import {ABAPRule} from "./_abap_rule";
import {BasicRuleConfig} from "./_basic_rule_config";
import {Version} from "../version";
import {RuleTag, IRuleMetadata} from "./_irule";
import {ABAPFile} from "../abap/abap_file";
import {ABAPObject} from "../objects/_abap_object";

export class StrictSQLConf extends BasicRuleConfig {
}

export class StrictSQL extends ABAPRule {
  private conf = new StrictSQLConf();

  public getMetadata(): IRuleMetadata {
    return {
      key: "strict_sql",
      title: "Strict SQL",
      shortDescription: `Strict SQL`,
      extendedInformation: `https://help.sap.com/doc/abapdocu_751_index_htm/7.51/en-US/abapinto_clause.htm

https://help.sap.com/doc/abapdocu_751_index_htm/7.51/en-us/abenopensql_strict_mode_750.htm

Also see separate rule sql_escape_host_variables`,
      tags: [RuleTag.Upport, RuleTag.Syntax],
    };
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: StrictSQLConf) {
    this.conf = conf;
  }

  public runParsed(file: ABAPFile, obj: ABAPObject) {
    const issues: Issue[] = [];

    const type = obj.getType();
    if (type === "INTF" || type === "TYPE") {
      return [];
    }

    if (this.reg.getConfig().getVersion() < Version.v740sp02
        && this.reg.getConfig().getVersion() !== Version.Cloud) {
      return [];
    }

    for (const s of file.getStatements()) {
      if (s.get() instanceof Statements.Select
          || s.get() instanceof Statements.SelectLoop) {
        const message = "INTO/APPENDING must be last in strict SQL";
        const issue = Issue.atToken(file, s.getFirstToken(), message, this.getMetadata().key, this.conf.severity);
        issues.push(issue);
        break;
      }
    }

    return issues;
  }
}