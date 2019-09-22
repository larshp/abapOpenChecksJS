import * as monaco from "monaco-editor";
import {Message} from "@phosphor/messaging";
import {Widget} from "@phosphor/widgets";
import {IFile} from "../filesystem";

export class EditorWidget extends Widget {
  private editor: monaco.editor.IStandaloneCodeEditor | undefined = undefined;
  private file: IFile;

  public static createNode(): HTMLElement {
    const node = document.createElement("div");
    return node;
  }

  constructor(file: IFile) {
    super({node: EditorWidget.createNode()});
    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass("editor");
    this.title.label = file.filename;
    this.title.closable = true;
    this.title.caption = this.title.label;
    this.file = file;
  }

  get inputNode(): HTMLInputElement {
    return this.node.getElementsByTagName("input")[0] as HTMLInputElement;
  }

  protected onResize() {
    if (this.editor) {
      this.editor.layout();
    }
  }

  protected onActivateRequest(msg: Message): void {
    if (this.editor) {
      this.editor.focus();
    }
  }

  protected determineLanguage(filename: string): string {
    const split = filename.split(".");
    return split[split.length - 1];
  }

  protected onAfterAttach() {
    if (this.editor === undefined) {
      this.editor = monaco.editor.create(this.node, {
        value: this.file.contents,
        language: this.determineLanguage(this.file.filename),
        theme: "vs-dark",
        glyphMargin: true,
        lightbulb: {
          enabled: true,
        },
      });
    }
  }
}