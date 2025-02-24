import * as Statements from "../abap/2_statements/statements";
import * as Expressions from "../abap/2_statements/expressions";
import {MacroContent, Comment, Empty} from "../abap/2_statements/statements/_statement";
import {StatementNode} from "../abap/nodes/statement_node";
import {IIndentationOptions} from "./indentation_options";
import {VirtualPosition} from "../virtual_position";
import {ABAPFile} from "../abap/abap_file";
import {DynproLogic} from "../abap/3_structures/structures";

// todo, will break if there is multiple statements per line?
export class Indent {
  private readonly options: IIndentationOptions;
  private readonly globalClasses = new Set();

  public constructor(options?: IIndentationOptions) {
    this.options = options || {};
  }

  public execute(original: ABAPFile, modified: string): string {
    const statements = original.getStatements();
    const expected = this.getExpectedIndents(original);

    const lines = modified.split("\n");

    for (const statement of statements) {
      if (statement.getFirstToken().getStart() instanceof VirtualPosition) {
        continue; // macro contents
      }
      const exp = expected.shift();
      if (exp === undefined || exp < 0) {
        continue;
      }
      const row = statement.getFirstToken().getStart().getRow() - 1;
      lines[row] = lines[row].trim();
      for (let i = 1; i < exp; i++) {
        lines[row] = " " + lines[row];
      }
    }

    return lines.join("\n");
  }

  // returns list of expected indentation for each line/statement?
  public getExpectedIndents(file: ABAPFile): number[] {
    const ret: number[] = [];
    const init: number = 1;
    const stack = new Stack();
    let indent: number = init;
    let parentIsEvent: boolean = false;
    const isDynpro = file.getStructure()?.get() instanceof DynproLogic;
    let previousStatement: StatementNode | undefined = undefined;

    for (const statement of file.getStatements()) {
      if (statement.getFirstToken().getStart() instanceof VirtualPosition) {
        continue; // skip macro contents
      }
      const type = statement.get();
      if (type instanceof Statements.EndIf
        || type instanceof Statements.EndWhile
        || type instanceof Statements.EndModule
        || type instanceof Statements.EndSelect
        || type instanceof Statements.EndMethod
        || type instanceof Statements.EndChain
        || type instanceof Statements.EndAt
        || type instanceof Statements.Else
        || type instanceof Statements.EndExec
        || type instanceof Statements.EndOfDefinition
        || type instanceof Statements.EndLoop
        || type instanceof Statements.EndTestInjection
        || type instanceof Statements.EndTestSeam
        || type instanceof Statements.EndForm
        || type instanceof Statements.EndCatch
        || (this.options.selectionScreenBlockIndentation === true
          && type instanceof Statements.SelectionScreen
          && (statement.concatTokens().toUpperCase().includes("END OF SCREEN") ||
          statement.concatTokens().toUpperCase().includes("END OF BLOCK") ||
          statement.concatTokens().toUpperCase().includes("END OF LINE")))
        || type instanceof Statements.ElseIf
        || type instanceof Statements.EndFunction
        || type instanceof Statements.EndInterface
        || type instanceof Statements.EndDo) {
        indent = indent - 2;
      } else if (type instanceof Statements.StartOfSelection
        || type instanceof Statements.AtSelectionScreen
        || type instanceof Statements.AtLineSelection
        || type instanceof Statements.AtPF
        || type instanceof Statements.Initialization
        || type instanceof Statements.AtUserCommand
        || type instanceof Statements.ProcessAfterInput
        || type instanceof Statements.ProcessBeforeOutput
        || type instanceof Statements.ProcessOnValueRequest
        || type instanceof Statements.TopOfPage
        || type instanceof Statements.Get
        || type instanceof Statements.EndOfSelection
        || type instanceof Statements.LoadOfProgram) {
        indent = init;
        parentIsEvent = true;
      } else if (type instanceof Statements.Form
        || (type instanceof Statements.Include && parentIsEvent)
        || (type instanceof Statements.Module && isDynpro === false)
        || type instanceof Statements.ClassImplementation
        || type instanceof Statements.ClassDefinition) {
        indent = init;
        parentIsEvent = false;
      } else if (type instanceof Statements.Cleanup
        || type instanceof Statements.Catch) {
        indent = stack.peek() - 2;
      } else if (type instanceof Statements.Public
        || type instanceof Statements.Protected
        || type instanceof Statements.Private
        || type instanceof Statements.WhenType
        || type instanceof Statements.WhenOthers
        || type instanceof Statements.When) {
        indent = stack.peek();
      } else if (type instanceof Statements.EndTry) {
        indent = stack.pop() - (this.options.alignTryCatch ? 2 : 4);
      } else if (type instanceof Statements.EndClass
        || type instanceof Statements.EndCase) {
        indent = stack.pop() - 2;
        indent = Math.max(indent, init); // maybe move this out of switch before ret.push(indent)
      } else if (type instanceof Comment
        || type instanceof Statements.IncludeType
        || type instanceof Empty
        || type instanceof MacroContent) {
        ret.push(-1);
        previousStatement = statement;
        continue;
      }
      if (previousStatement
        && !(previousStatement.get() instanceof Comment)
        && previousStatement.getLastToken().getEnd().getRow() === statement.getFirstToken().getStart().getRow()) {
// any indentation allowed if there are multiple statements on the same line
        ret.push(-1);
        previousStatement = statement;
        continue;
      }
      ret.push(indent);
      if (type instanceof Statements.If
        || type instanceof Statements.While
        || (type instanceof Statements.Module && isDynpro === false)
        || type instanceof Statements.SelectLoop
        || type instanceof Statements.FunctionModule
        || type instanceof Statements.Interface
        || type instanceof Statements.Do
        || type instanceof Statements.At
        || type instanceof Statements.AtFirst
        || type instanceof Statements.AtLast
        || type instanceof Statements.ExecSQL
        || type instanceof Statements.Catch
        || type instanceof Statements.ProcessAfterInput
        || type instanceof Statements.ProcessBeforeOutput
        || type instanceof Statements.ProcessOnValueRequest
        || type instanceof Statements.Define
        || type instanceof Statements.When
        || type instanceof Statements.WhenType
        || type instanceof Statements.WhenOthers
        || type instanceof Statements.Cleanup
        || type instanceof Statements.Loop
        || type instanceof Statements.LoopAtScreen
        || type instanceof Statements.CatchSystemExceptions
        || type instanceof Statements.Form
        || type instanceof Statements.Else
        || type instanceof Statements.ElseIf
        || type instanceof Statements.MethodImplementation
        || type instanceof Statements.Chain
        || type instanceof Statements.TestInjection
        || type instanceof Statements.TestSeam
        || (this.options.selectionScreenBlockIndentation === true
          && type instanceof Statements.SelectionScreen
          && (statement.concatTokens().toUpperCase().includes("BEGIN OF SCREEN") ||
          statement.concatTokens().toUpperCase().includes("BEGIN OF TABBED BLOCK") ||
          statement.concatTokens().toUpperCase().includes("BEGIN OF BLOCK") ||
          statement.concatTokens().toUpperCase().includes("BEGIN OF LINE")))
        || type instanceof Statements.StartOfSelection
        || type instanceof Statements.Get
        || type instanceof Statements.AtSelectionScreen
        || type instanceof Statements.AtLineSelection
        || type instanceof Statements.LoadOfProgram
        || type instanceof Statements.Initialization
        || type instanceof Statements.AtUserCommand
        || type instanceof Statements.TopOfPage
        || type instanceof Statements.EndOfSelection
        || type instanceof Statements.Public
        || type instanceof Statements.Protected
        || type instanceof Statements.Private) {
        indent = indent + 2;
      } else if (type instanceof Statements.Try) {
        indent = indent + (this.options.alignTryCatch ? 2 : 4);
        stack.push(indent);
      } else if (type instanceof Statements.ClassDefinition
        || type instanceof Statements.Case
        || type instanceof Statements.CaseType
        || type instanceof Statements.ClassImplementation) {
        indent = indent + (this.skipIndentForGlobalClass(statement) ? 0 : 2);
        stack.push(indent);
      }
      previousStatement = statement;
    }
    return ret;
  }

  private skipIndentForGlobalClass(statement: StatementNode): boolean {
    if (!this.options.globalClassSkipFirst) {
      return false;
    }
    const type = statement.get();
    if (type instanceof Statements.ClassDefinition && statement.findFirstExpression(Expressions.ClassGlobal)) {
      const className = statement.findFirstExpression(Expressions.ClassName);
      if (className) {
        this.globalClasses.add(className.getFirstToken().getStr().toUpperCase());
      }
      return true;
    } else if (type instanceof Statements.ClassImplementation) {
      const className = statement.findFirstExpression(Expressions.ClassName);
      if (className && this.globalClasses.has(className.getFirstToken().getStr().toUpperCase())) {
        return true;
      }
    }
    return false;
  }
}

class Stack {
  private items: number[] = [];

  public push(item: number) {
    this.items.push(item);
  }

  public peek(): number {
    return this.items[this.items.length - 1];
  }

  public pop() {
    const peek = this.peek();
    this.items = this.items.slice(0, this.items.length - 1);
    return peek;
  }
}
