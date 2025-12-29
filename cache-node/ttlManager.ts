export class TTLManager {
  private timeouts = new Map<string, NodeJS.Timeout>()

  set(key: string, ttl: number, onExpire: () => void) {
    this.clear(key)
    const timeout = setTimeout(() => {
      onExpire()
      this.timeouts.delete(key)
    }, ttl * 1000)

    this.timeouts.set(key, timeout)
  }

  clear(key: string) {
    const t = this.timeouts.get(key)
    if (t) clearTimeout(t)
  }
}
