"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { isPasswordConfigured, verifyProjectPassword } from "@/lib/auth/password"
import { clearAttempts, consumeAttempt } from "@/lib/auth/rate-limit"
import { startProjectSession } from "@/lib/auth/session"
import { toProtectedPath } from "@/lib/auth/protected-routes"

export type UnlockState = {
  status: "idle" | "incorrect" | "rate-limited" | "unavailable"
  /** Increments on every failed submission so the client can re-trigger the error animation. */
  failures: number
  retryAfterMinutes?: number
}

const MAX_PASSWORD_LENGTH = 256

async function clientIdentifier() {
  const requestHeaders = await headers()
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || requestHeaders.get("x-real-ip") || "unknown"
}

export async function unlockProjects(previous: UnlockState, formData: FormData): Promise<UnlockState> {
  const destination = toProtectedPath(formData.get("next"))
  const password = formData.get("password")
  const failed = (status: UnlockState["status"], retryAfterMinutes?: number): UnlockState => ({
    status,
    failures: previous.failures + 1,
    retryAfterMinutes,
  })

  if (!isPasswordConfigured()) return failed("unavailable")

  const identifier = await clientIdentifier()
  let attempt
  try {
    attempt = await consumeAttempt(identifier)
  } catch (error) {
    console.error("Password rate limiter unavailable", error)
    return failed("unavailable")
  }
  if (!attempt.allowed) return failed("rate-limited", Math.ceil(attempt.retryAfterSeconds / 60))

  if (typeof password !== "string" || password.length === 0 || password.length > MAX_PASSWORD_LENGTH) {
    return failed("incorrect")
  }
  if (!(await verifyProjectPassword(password))) return failed("incorrect")

  await clearAttempts(identifier).catch(() => undefined)
  await startProjectSession()
  redirect(destination)
}
