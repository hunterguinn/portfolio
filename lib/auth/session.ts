import "server-only"
import { cookies } from "next/headers"

export const SESSION_COOKIE = "__Host-project-access"
export const SESSION_TTL_SECONDS = 8 * 60 * 60

const VERSION = "v1"
const encoder = new TextEncoder()

function sessionSecret() {
  const secret = process.env.PROJECT_SESSION_SECRET
  if (!secret || secret.length < 32) return null
  return secret
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ])
}

function toBase64Url(bytes: ArrayBuffer) {
  return Buffer.from(bytes).toString("base64url")
}

export async function createSessionToken(now = Date.now()) {
  const secret = sessionSecret()
  if (!secret) throw new Error("PROJECT_SESSION_SECRET must be set to at least 32 characters.")
  const expiresAt = Math.floor(now / 1000) + SESSION_TTL_SECONDS
  const payload = `${VERSION}.${expiresAt}`
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(payload))
  return `${payload}.${toBase64Url(signature)}`
}

export async function verifySessionToken(token: string | undefined, now = Date.now()) {
  const secret = sessionSecret()
  if (!secret || !token) return false

  const [version, expiresAtRaw, signatureRaw, ...rest] = token.split(".")
  if (version !== VERSION || !expiresAtRaw || !signatureRaw || rest.length > 0) return false
  if (!/^\d{1,12}$/.test(expiresAtRaw) || Number(expiresAtRaw) * 1000 <= now) return false

  let signature: Buffer
  try {
    signature = Buffer.from(signatureRaw, "base64url")
  } catch {
    return false
  }

  // crypto.subtle.verify compares in constant time.
  return crypto.subtle.verify(
    "HMAC",
    await hmacKey(secret),
    new Uint8Array(signature),
    encoder.encode(`${version}.${expiresAtRaw}`),
  )
}

export async function hasProjectAccess() {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}

export async function startProjectSession() {
  const store = await cookies()
  const isProduction = process.env.NODE_ENV === "production"
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    // The v0 dev preview runs in a cross-site iframe, which only accepts partitioned SameSite=None cookies.
    sameSite: isProduction ? "lax" : "none",
    partitioned: !isProduction,
  })
}
