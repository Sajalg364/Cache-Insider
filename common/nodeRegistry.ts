import { CacheNode } from "./types"

export class NodeRegistry {
  private nodes = new Map<string, CacheNode>()

  register(node: CacheNode) {
    this.nodes.set(node.id, node)
  }

  remove(nodeId: string) {
    this.nodes.delete(nodeId)
  }

  list(): CacheNode[] {
    return Array.from(this.nodes.values())
  }

  isEmpty(): boolean {
    return this.nodes.size === 0
  }
}
