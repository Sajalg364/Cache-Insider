import { Counter, register } from "prom-client"
import { FastifyInstance } from "fastify"

export const cacheHits = new Counter({
  name: "cache_hits_total",
  help: "Total cache hits",
})

export const cacheMisses = new Counter({
  name: "cache_misses_total",
  help: "Total cache misses",
})

export const cacheEvictions = new Counter({
  name: "cache_evictions_total",
  help: "Total cache evictions",
})

export function setupMetrics(app: FastifyInstance) {
  app.get("/metrics", async () => {
    return register.metrics()
  })
}
