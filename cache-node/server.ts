import Fastify from "fastify"
import { LRUCache } from "./lruCache"
import { TTLManager } from "./ttlManager"
import { cacheHits, cacheMisses, setupMetrics } from "./metrics"


const app = Fastify()
const cache = new LRUCache(100)
const ttlManager = new TTLManager()

app.put("/cache/:key", async (req, reply) => {
  const { key } = req.params as any
  const { value, ttl } = req.body as any

  cache.put(key, value)

  if (ttl) {
    ttlManager.set(key, ttl, () => cache.put(key, ""))
  }

  return { status: "stored" }
})

app.get("/cache/:key", async (req, reply) => {
  const { key } = req.params as any
  const value = cache.get(key)

  if (!value) {
  cacheMisses.inc()
  reply.code(404)
  return { error: "cache miss" }
}

  cacheHits.inc()
  return { key, value }
})

setupMetrics(app)

app.listen({ port: 4000, host: "0.0.0.0" }, () => {
  console.log(`Cache Node running on port 4000`)
})
