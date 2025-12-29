class DLLNode {
  key: string
  value: string
  prev?: DLLNode
  next?: DLLNode

  constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }
}

export class LRUCache {
  private map = new Map<string, DLLNode>()
  private capacity: number
  private head?: DLLNode
  private tail?: DLLNode

  constructor(capacity: number) {
    this.capacity = capacity
  }

  get(key: string): string | null {
    const node = this.map.get(key)
    if (!node) return null
    this.moveToFront(node)
    return node.value
  }

  put(key: string, value: string) {
    if (this.map.has(key)) {
      const node = this.map.get(key)!
      node.value = value
      this.moveToFront(node)
      return
    }

    const node = new DLLNode(key, value)
    this.map.set(key, node)
    this.addToFront(node)

    if (this.map.size > this.capacity) {
      this.evict()
    }
  }

  private addToFront(node: DLLNode) {
    node.next = this.head
    if (this.head) this.head.prev = node
    this.head = node
    if (!this.tail) this.tail = node
  }

  private moveToFront(node: DLLNode) {
    if (node === this.head) return
    this.remove(node)
    this.addToFront(node)
  }

  private remove(node: DLLNode) {
    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev
    if (node === this.tail) this.tail = node.prev
  }

  private evict() {
    if (!this.tail) return
    this.map.delete(this.tail.key)
    this.remove(this.tail)
  }
}
