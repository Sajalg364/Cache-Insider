import Fastify from "fastify"
import { registerRoutes } from "./routes"
import { setupMetrics } from "./metrics"

const app = Fastify()

registerRoutes(app)
setupMetrics(app)

app.listen({ port: 3000, host: "0.0.0.0" }, () => {
  console.log("API Gateway running on port 3000")
})
