import {ABAPFile} from "../../files";
import {Position} from "../../position";
import {FamixRepository} from "./famix_repository";
import {SourcedEntity} from "./model/famix/sourced_entity";
import {IndexedFileAnchor} from "./model/famix/indexed_file_anchor";
import {StructureNode} from "../../abap/nodes";
import {ModelClass} from "./model_class";
import {Package} from "./model/famix/package";
import {Namespace} from "./model/famix/namespace";

export class ModelABAPFile {
  private sumOfCharsAtRow: number[];
  private modelClasses: ModelClass[] = [];
  private readonly file: ABAPFile;

  constructor(repo: FamixRepository, famixPackage: Package, famixNamespace: Namespace, file: ABAPFile) {
    this.file = file;
    this.calculateSumOfCharsByRow(file);

    for (const classDef of file.getClassDefinitions()) {
      this.modelClasses.push(new ModelClass(repo, famixPackage, famixNamespace, this, classDef));
    }

    for (const interfaceDef of file.getInterfaceDefinitions()) {
      this.modelClasses.push(new ModelClass(repo, famixPackage, famixNamespace, this, interfaceDef));
    }
  }

  public analyseAccessAndInvocations() {
    for(const modelClass of this.modelClasses) {
      modelClass.analyseAccessAndInvocations();
    }
  }

  private calculateSumOfCharsByRow(file: ABAPFile) {
    let i = 1;
    let sum = 0;
    this.sumOfCharsAtRow = new Array(file.getRawRows().length);
    for (const row of file.getRawRows()) {
      sum = sum + row.length + 1;
      this.sumOfCharsAtRow[i] = sum;
      i++;
    }
  }

  public convert(pos: Position): number {
    return pos.getRow() === 1 ? pos.getCol() : this.sumOfCharsAtRow[pos.getRow() - 1] + pos.getCol();
  }

  public getFilename() {
    return this.file.getFilename();
  }

  public getABAPFile(): ABAPFile {
    return this.file;
  }

  public getStructure(): StructureNode | undefined {
    return this.file.getStructure();
  }
  public  getModelClass(): ModelClass[] {
    return this.modelClasses;
  }

  public getBeginOfFile(): number {
    return 1;
  }

  public getEndOfFile(): number {
    return this.sumOfCharsAtRow[this.sumOfCharsAtRow.length];
  }

  public static createIndexedFileAnchor(repo: FamixRepository, fpc: ModelABAPFile, element: SourcedEntity,
                                        start?: Position, end?: Position) {
    const ifa = new IndexedFileAnchor(repo);
    ifa.setFileName(fpc.getFilename());
    ifa.setElement(element);

    if (start) {
      ifa.setStartPos(fpc.convert(start));
    } else {
      ifa.setStartPos(fpc.getBeginOfFile());
    }

    if (end) {
      ifa.setEndPos(fpc.convert(end));
    } else {
      ifa.setStartPos(fpc.getEndOfFile());
    }
  }
}