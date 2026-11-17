import "server-only"

export const MAX_ATTEMPTS = 5
export const WINDOW_SECONDS = 15 * 60

type AttemptResult = { allowed: boolean; retryAfterSeconds: number }

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

async function redisPipeline(commands: (string | number)[][]) {
  const config = redisConfig()
  if (!config) return null
  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`Rate limit store responded with ${response.status}`)
  return (await response.json()) as { result: unknown }[]
}

// Fallback for local development or when no shared store is configured; limits are per server instance.
const memory = new Map<string, { count: number; resetAt: number }>()

function memoryAttempt(key: string): AttemptResult {
  const now = Date.now()
  for (const [entryKey, entry] of memory) if (entry.resetAt <= now) memory.delete(entryKey)

  const entry = memory.get(key) ?? { count: 0, resetAt: now + WINDOW_SECONDS * 1000 }
  entry.count += 1
  memory.set(key, entry)
  return {
    allowed: entry.count <= MAX_ATTEMPTS,
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
  }
}

export async function consumeAttempt(identifier: string): Promise<AttemptResult> {
  const key = `project-gate:attempts:${identifier}`
  const results = await redisPipeline([
    ["INCR", key],
    ["EXPIRE", key, WINDOW_SECONDS, "NX"],
    ["TTL", key],
  ])
  if (!results) return memoryAttempt(key)

  const count = Number(results[0]?.result)
  const ttl = Number(results[2]?.result)
  return { allowed: count <= MAX_ATTEMPTS, retryAfterSeconds: ttl > 0 ? ttl : WINDOW_SECONDS }
}

export async function clearAttempts(identifier: string) {
  const key = `project-gate:attempts:${identifier}`
  const results = await redisPipeline([["DEL", key]])
  if (!results) memory.delete(key)
}
