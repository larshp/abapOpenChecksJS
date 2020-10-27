import {AbstractType} from "./_abstract_type";

export class TableType extends AbstractType {
  private readonly rowType: AbstractType;
  private readonly withHeader: boolean;

// todo: add keys
  public constructor(rowType: AbstractType, withHeader: boolean, name?: string) {
    super(name);
    this.rowType = rowType;
    this.withHeader = withHeader;
  }

  public isWithHeader(): boolean {
    return this.withHeader;
  }

  public getRowType(): AbstractType {
    return this.rowType;
  }

  public toABAP(): string {
// this is used for downport, so use default key for now
    return "STANDARD TABLE OF " + this.rowType.toABAP() + " WITH DEFAULT KEY";
  }

  public toText(level: number) {
    let extra = "";
    const type = this.rowType;

    if (type.getQualifiedName()) {
      extra = "\n\nType name: \"" + type.getQualifiedName() + "\"";
    }

    if (this.withHeader === true) {
      return "Table with header of " + type.toText(level + 1) + extra;
    } else {
      return "Table of " + type.toText(level + 1) + extra;
    }
  }

  public isGeneric() {
    return false;
  }

  public containsVoid() {
    return this.rowType.containsVoid();
  }
}