import {Issue} from "../issue";
import {ABAPRule} from "./_abap_rule";
import {BasicRuleConfig} from "./_basic_rule_config";
import * as Statements from "../abap/2_statements/statements";
import * as Structures from "../abap/3_structures/structures";
import {IRuleMetadata, RuleTag} from "./_irule";
import {ABAPFile} from "../abap/abap_file";
import {ABAPObject} from "../objects/_abap_object";
import {Program} from "../objects";
import {StatementNode, StructureNode} from "../abap/nodes";
import {SELECTION_EVENTS} from "../abap/flow/selection_events";

export class ImplicitStartOfSelectionConf extends BasicRuleConfig {
}

export class ImplicitStartOfSelection extends ABAPRule {

  private conf = new ImplicitStartOfSelectionConf();

  public getMetadata(): IRuleMetadata {
    return {
      key: "implicit_start_of_selection",
      title: "Implicit START-OF-SELECTION",
      shortDescription: `Add explicit selection screen event handling`,
      extendedInformation: `Only runs for executable programs

https://help.sap.com/doc/abapdocu_751_index_htm/7.51/en-us/abapstart-of-selection.htm`,
      tags: [RuleTag.SingleFile],
      badExample: `REPORT zfoo.
WRITE 'hello'.`,
      goodExample: `REPORT zfoo.
START-OF-SELECTION.
  WRITE 'hello'.`,
    };
  }

  public getConfig() {
    return this.conf;
  }

  public setConfig(conf: ImplicitStartOfSelectionConf) {
    this.conf = conf;
  }

  public runParsed(file: ABAPFile, obj: ABAPObject) {
    const issues: Issue[] = [];

    if (!(obj instanceof Program) || obj.isInclude()) {
      return issues;
    }

    const stru = file.getStructure();
    if (stru === undefined) {
      return [];
    }

    let inEvent = false;
    let collected: (StatementNode | StructureNode)[] = [];
    for (const s of stru.getChildren() || []) {
      if (SELECTION_EVENTS.some(f => s.get() instanceof f)) {
        if (inEvent === false && collected.length > 0) {
          // implicit START-OF-SELECTION
          let first = collected[0];
          if (first instanceof StructureNode) {
            first = first.getFirstStatement()!;
          }
          issues.push(Issue.atStatement(file, first, "Implicit START-OF-SELECTION", this.getMetadata().key, this.getConfig().severity));
        }

        collected = [];
        inEvent = true;
      } else if (s.get() instanceof Structures.Normal) {
        const stru = s as StructureNode;
        // ignore declaration stuff
        if (stru.getFirstStatement()?.get() instanceof Statements.Data
            || stru.getFirstStatement()?.get() instanceof Statements.DataBegin
            || stru.getFirstStatement()?.get() instanceof Statements.Constant
            || stru.getFirstStatement()?.get() instanceof Statements.Parameter
            || stru.getFirstStatement()?.get() instanceof Statements.SelectionScreen
            || stru.getFirstStatement()?.get() instanceof Statements.ConstantBegin) {
          continue;
        }
        collected.push(s);
      } else {
        if (inEvent === true) {
          inEvent = false;
        }
        collected = [];
      }
    }

    if (inEvent === false && collected.length > 0) {
      // implicit START-OF-SELECTION
      let first = collected[0];
      if (first instanceof StructureNode) {
        first = first.getFirstStatement()!;
      }
      issues.push(Issue.atStatement(file, first, "Implicit START-OF-SELECTION", this.getMetadata().key, this.getConfig().severity));
    }

    return issues;
  }

}
