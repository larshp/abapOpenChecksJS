import {AbstractObject} from "./_abstract_object";
import {xmlToArray} from "../xml_utils";

export class View extends AbstractObject {

  public getType(): string {
    return "VIEW";
  }

  public getAllowedNaming() {
    return {
      maxLength: 30,
      allowNamespace: true,
    };
  }

  // todo, cache parsed data
  public getFields(): string[] {
    const xml = this.getXML();
    if (xml === undefined) {
      return [];
    }
    return this.parsePrivate(this.parseXML());
  }

  private parsePrivate(data: any): string[] {
    const ret: string[] = [];

    if (data === undefined) {
      return [];
    }

    const fields = data.abapGit["asx:abap"]["asx:values"].DD27P_TABLE;
    for (const field of xmlToArray(fields.DD27P)) {
      ret.push(field.VIEWFIELD._text);
    }

    return ret;
  }

}
