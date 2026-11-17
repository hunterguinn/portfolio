"use client"

import { useActionState, useEffect, useRef } from "react"
import { Warning } from "@phosphor-icons/react/dist/ssr/Warning"
import { unlockProjects, type UnlockState } from "@/app/actions/unlock-projects"
import type { ProtectedProjectPath } from "@/lib/auth/protected-routes"

const initialState: UnlockState = { status: "idle", failures: 0 }

function errorMessage(state: UnlockState) {
  if (state.status === "incorrect") return "Incorrect password"
  if (state.status === "rate-limited") {
    const minutes = state.retryAfterMinutes ?? 15
    return `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}`
  }
  if (state.status === "unavailable") return "Password entry is unavailable right now"
  return null
}

export function PasswordForm({ next }: { next: ProtectedProjectPath }) {
  const [state, formAction, pending] = useActionState(unlockProjects, initialState)
  const inputRef = useRef<HTMLInputElement>(null)
  const message = errorMessage(state)

  useEffect(() => {
    if (state.failures > 0) inputRef.current?.focus()
  }, [state.failures])

  return (
    <form action={formAction} className="flex w-full flex-col items-center gap-4">
      <input type="hidden" name="next" value={next} />
      <label htmlFor="project-password" className="sr-only">
        Password
      </label>
      <input
        ref={inputRef}
        id="project-password"
        name="password"
        type="password"
        required
        maxLength={256}
        autoComplete="current-password"
        placeholder="Enter password"
        aria-invalid={message ? true : undefined}
        aria-describedby={message ? "project-password-error" : undefined}
        className="text-body h-14 w-full rounded-md border border-border bg-surface px-5 text-foreground transition-colors placeholder:text-secondary focus-visible:border-foreground"
      />
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="btn-primary text-body rounded-full px-8 py-2.5 font-medium disabled:opacity-60"
      >
        Enter
      </button>
      <div aria-live="polite" className="min-h-6">
        {message ? (
          <p
            key={state.failures}
            id="project-password-error"
            className={`text-caption flex items-center justify-center gap-1.5 text-center text-red ${
              state.failures > 1 ? "gate-shake" : ""
            }`}
          >
            <Warning size={16} weight="fill" aria-hidden="true" />
            {message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
