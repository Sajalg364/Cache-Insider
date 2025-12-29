import { FastifyInstance } from "fastify"
import fetch from "node-fetch"
import { HashRing } from "./hashRing"
import { requestCounter, requestLatency } from "./metrics"

const ring = new HashRing()

// Register cache nodes
;["cache1:4000", "cache2:4000"].forEach(node => ring.addNode(node))

export async function registerRoutes(app: FastifyInstance) {
  app.put("/cache/:key", async (req, reply) => {
    const end = requestLatency.startTimer()
    const { key } = req.params as any
    const node = ring.getNode(key)

    requestCounter.inc({ method: "PUT", route: "/cache/:key" })

    const res = await fetch(`http://${node}/cache/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    })

    end()
    reply.code(res.status)
    return res.json()
  })

  app.get("/cache/:key", async (req, reply) => {
    const end = requestLatency.startTimer()
    const { key } = req.params as any
    const node = ring.getNode(key)

    requestCounter.inc({ method: "GET", route: "/cache/:key" })

    const res = await fetch(`http://${node}/cache/${key}`)
    end()

    reply.code(res.status)
    return res.json()
  })
}
