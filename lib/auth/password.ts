import "server-only"
import { readFileSync } from "node:fs"
import path from "node:path"
import bcrypt from "bcryptjs"

const BCRYPT_HASH = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/

/**
 * Accepts the raw bcrypt hash, or a base64-encoded copy for .env files that
 * expand `$` sequences (Next.js loads `.env*` files with variable expansion).
 */
function normalizeHash(value: string | undefined) {
  const raw = value?.trim()
  if (!raw) return null
  if (BCRYPT_HASH.test(raw)) return raw
  const decoded = Buffer.from(raw, "base64").toString("utf8").trim()
  return BCRYPT_HASH.test(decoded) ? decoded : null
}

/**
 * In development, Next.js expands `$` sequences in `.env*` files, which corrupts
 * bcrypt hashes. Deployed environments inject variables directly, so this
 * fallback only reads the unexpanded value from the local env file.
 */
function unexpandedDevHash() {
  if (process.env.NODE_ENV !== "development") return null
  try {
    const contents = readFileSync(path.join(process.cwd(), ".env.development.local"), "utf8")
    const line = contents.split(/\r?\n/).find((entry) => entry.startsWith("PROJECT_PASSWORD_HASH="))
    if (!line) return null
    return normalizeHash(line.slice("PROJECT_PASSWORD_HASH=".length).trim().replace(/^(['"])(.*)\1$/, "$2"))
  } catch {
    return null
  }
}

function passwordHash() {
  return normalizeHash(process.env.PROJECT_PASSWORD_HASH) ?? unexpandedDevHash()
}

export function isPasswordConfigured() {
  return passwordHash() !== null && (process.env.PROJECT_SESSION_SECRET?.length ?? 0) >= 32
}

export async function verifyProjectPassword(password: string) {
  const hash = passwordHash()
  if (!hash) return false
  return bcrypt.compare(password, hash)
}
