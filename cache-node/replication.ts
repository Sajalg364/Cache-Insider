import fetch from "node-fetch"

export async function replicate(
  replicas: string[],
  key: string,
  payload: any
) {
  await Promise.allSettled(
    replicas.map(node =>
      fetch(`http://${node}/cache/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    )
  )
}
