export enum FLOW_EDGE_TYPE {
  true = "true",
  false = "false",
  undefined = "undefined",
}

export class FlowGraph {
  private edges: {[from: string]: {[to: string]: FLOW_EDGE_TYPE}};
  private readonly startNode: string;
  private readonly endNode: string;
  private label: string;

  public constructor(counter: number) {
    this.edges = {};
    this.label = "undefined";
    this.startNode = "start#" + counter;
    this.endNode = "end#" + counter;
  }

  public getStart(): string {
    return this.startNode;
  }

  public getLabel(): string {
    return this.label;
  }

  public getEnd(): string {
    return this.endNode;
  }

  public addEdge(from: string, to: string, type: FLOW_EDGE_TYPE) {
    if (this.edges[from] === undefined) {
      this.edges[from] = {};
    }
    this.edges[from][to] = type;
  }

  public removeEdge(from: string, to: string) {
    if (this.edges[from] === undefined) {
      return;
    }
    delete this.edges[from][to];
    if (Object.keys(this.edges[from]).length === 0) {
      delete this.edges[from];
    }
  }

  public listEdges() {
    const list: {from: string, to: string, type: FLOW_EDGE_TYPE}[] = [];
    for (const from of Object.keys(this.edges)) {
      for (const to of Object.keys(this.edges[from])) {
        list.push({from, to, type: this.edges[from][to]});
      }
    }
    return list;
  }

  public listInto(to: string, skipStart = true): string[] {
    const ret: string[] = [];
    for (const e of this.listEdges()) {
      if (skipStart === true && e.from === this.getStart()) {
        continue;
      }
      if (e.to === to) {
        ret.push(e.from);
      }
    }
    return ret;
  }

  public listNodes() {
    const set = new Set<string>();
    for (const l of this.listEdges()) {
      set.add(l.from);
      set.add(l.to);
    }
    return Array.from(set.values());
  }

  public hasEdges(): boolean {
    return Object.keys(this.edges).length > 0;
  }

  /** return value: end node of to graph */
  public addGraph(from: string, to: FlowGraph, type: FLOW_EDGE_TYPE): string {
    if (to.hasEdges() === false) {
      return from;
    }
    this.addEdge(from, to.getStart(), type);
    to.listEdges().forEach(e => this.addEdge(e.from, e.to, type));
    return to.getEnd();
  }

  public toJSON(): string {
    return JSON.stringify(this.edges);
  }

  public toTextEdges(): string {
    let graph = "";
    for (const l of this.listEdges()) {
      const type = l.type === FLOW_EDGE_TYPE.undefined ? "" : l.type;
      graph += `"${l.from}" -${type}> "${l.to}";\n`;
    }
    return graph.trim();
  }

  public setLabel(label: string) {
    this.label = label;
  }

  public toDigraph(): string {
    return `digraph G {
labelloc="t";
label="${this.label}";
graph [fontname = "helvetica"];
node [fontname = "helvetica", shape="box"];
edge [fontname = "helvetica"];
${this.toTextEdges()}
}`;
  }

  public listSources(node: string): string[] {
    const set = new Set<string>();
    for (const l of this.listEdges()) {
      if (node === l.to) {
        set.add(l.from);
      }
    }
    return Array.from(set.values());
  }

  public listTargets(node: string): string[] {
    const set = new Set<string>();
    for (const l of this.listEdges()) {
      if (node === l.from) {
        set.add(l.to);
      }
    }
    return Array.from(set.values());
  }

  /** removes all nodes containing "#" that have one in-going and one out-going edge */
  public reduce() {
    for (const node of this.listNodes()) {
      if (node.includes("#") === false) {
        continue;
      }
      const sources = this.listSources(node);
      const targets = this.listTargets(node);
      if (sources.length > 0 && targets.length > 0) {
        // hash node in the middle of the graph
        for (const s of sources) {
          this.removeEdge(s, node);
        }
        for (const t of targets) {
          this.removeEdge(node, t);
        }
        for (const s of sources) {
          for (const t of targets) {
            this.addEdge(s, t, FLOW_EDGE_TYPE.undefined);
          }
        }
      }

      if (node.startsWith("end#") && sources.length === 0) {
        for (const t of targets) {
          this.removeEdge(node, t);
        }
      }
    }

    return this;
  }
}