import { Counter, Histogram, register } from "prom-client"
import { FastifyInstance } from "fastify"

export const requestCounter = new Counter({
  name: "api_gateway_requests_total",
  help: "Total requests received by API Gateway",
  labelNames: ["method", "route"],
})

export const requestLatency = new Histogram({
  name: "api_gateway_request_latency_seconds",
  help: "Latency of API Gateway requests",
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2],
})

export function setupMetrics(app: FastifyInstance) {
  app.get("/metrics", async () => {
    return register.metrics()
  })
}
