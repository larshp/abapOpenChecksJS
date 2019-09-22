import {TreeWidget, ProblemsWidget} from "./widgets";
import {Registry} from "abaplint/registry";
import {Config} from "abaplint/config";
import {MemoryFile} from "abaplint/files";

// magic god class
export class FileSystem {
  private static files: MemoryFile[];
  private static reg: Registry;
  private static tree: TreeWidget;
  private static problems: ProblemsWidget;

  public static setup(tree: TreeWidget, problems: ProblemsWidget) {
    this.files = [];
    this.reg = new Registry();
    this.tree = tree;
    this.problems = problems;

    this.addFile(
"zfoobar.prog.abap",
`REPORT zfoobar.
 WRITE 'Hello World'.

LOOP AT lt_foo ASSIGNING FIELD-SYMBOL(<ls_foo>).
  WRITE 'bar'.
ENDLOOP.`);
    this.addFile("abaplint.json", JSON.stringify(Config.getDefault(), undefined, 2));
  }

  public static updateFile(filename: string, contents: string) {
    const file = new MemoryFile(filename, contents);
    this.reg.updateFile(file);
    this.update();
  }

  public static addFile(filename: string, contents: string) {
    const file = new MemoryFile(filename, contents);
    if (filename !== "abaplint.json") { // hmm, todo
      this.reg.addFile(file);
    }
    this.files.push(file);
    this.update();
  }

  public static getFiles(): MemoryFile[] {
    return this.files;
  }

  public static getIssues() {
    return this.reg.findIssues();
  }

  private static update() {
    this.tree.update();
    this.problems.update();
  }

}