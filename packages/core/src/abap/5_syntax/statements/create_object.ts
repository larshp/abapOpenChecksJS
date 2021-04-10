import * as Expressions from "../../2_statements/expressions";
import {StatementNode} from "../../nodes";
import {CurrentScope} from "../_current_scope";
import {Source} from "../expressions/source";
import {Target} from "../expressions/target";
import {Dynamic} from "../expressions/dynamic";
import {ReferenceType} from "../_reference";
import {ObjectReferenceType, VoidType} from "../../types/basic";
import {ClassDefinition} from "../../types";

export class CreateObject {
  public runSyntax(node: StatementNode, scope: CurrentScope, filename: string): void {
    // todo, validate parameters

    // CREATE OBJECT, TYPE
    const type = node.findDirectExpression(Expressions.ClassName);
    if (type) {
      const token = type.getFirstToken();
      const name = token.getStr();
      const found = scope.findClassDefinition(name);
      if (found) {
        scope.addReference(token, found, ReferenceType.ObjectOrientedReference, filename);
        if (found.isAbstract() === true) {
          throw new Error(found.getName() + " is abstract, cannot be instantiated");
        }
      } else if (scope.getDDIC().inErrorNamespace(name) === false) {
        scope.addReference(token, undefined, ReferenceType.ObjectOrientedVoidReference, filename, {ooName: name, ooType: "CLAS"});
      } else {
        throw new Error("TYPE \"" + name + "\" not found");
      }
    }

    // just recurse
    for (const s of node.findAllExpressions(Expressions.Source)) {
      new Source().runSyntax(s, scope, filename);
    }

    let first = true;
    for (const t of node.findAllExpressions(Expressions.Target)) {
      const found = new Target().runSyntax(t, scope, filename);
      if (first === true) {
        first = false;
        if (found instanceof VoidType) {
          continue;
        } else if (!(found instanceof ObjectReferenceType)) {
          throw new Error("Target must be a object reference");
        }
        const id = found.getIdentifier();
        if (type === undefined && id instanceof ClassDefinition && id.isAbstract() === true) {
          throw new Error(id.getName() + " is abstract, cannot be instantiated");
        }
      }
    }

    for (const t of node.findDirectExpressions(Expressions.Dynamic)) {
      new Dynamic().runSyntax(t, scope, filename);
    }

  }
}