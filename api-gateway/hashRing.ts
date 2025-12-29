import crypto from "crypto"

export class HashRing {
  private ring = new Map<number, string>()
  private replicas = 100

  addNode(nodeId: string) {
    for (let i = 0; i < this.replicas; i++) {
      const hash = this.hash(`${nodeId}:${i}`)
      this.ring.set(hash, nodeId)
    }
  }

  removeNode(nodeId: string) {
    for (let i = 0; i < this.replicas; i++) {
      const hash = this.hash(`${nodeId}:${i}`)
      this.ring.delete(hash)
    }
  }

  getNode(key: string): string {
    const hash = this.hash(key)
    const sorted = [...this.ring.keys()].sort((a, b) => a - b)

    for (const h of sorted) {
      if (hash <= h) return this.ring.get(h)!
    }
    return this.ring.get(sorted[0])!
  }

  private hash(value: string): number {
    return parseInt(
      crypto.createHash("md5").update(value).digest("hex").slice(0, 8),
      16
    )
  }
}
