export type CacheEntry = {
  key: string
  value: string
  expiresAt: number | null
}

export type CacheNode = {
  id: string
  url: string
}
