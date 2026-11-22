"use client"

import { useActionState, useEffect, useId, useRef } from "react"
import { X } from "@phosphor-icons/react/dist/csr/X"
import { Warning } from "@phosphor-icons/react/dist/ssr/Warning"
import { unlockProjects, type UnlockState } from "@/app/actions/unlock-projects"
import type { ProtectedProjectPath } from "@/lib/auth/protected-routes"
import { useModalBehavior } from "./use-modal-behavior"

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

export type PasswordModalProps = {
  /** Project opened after a successful unlock. */
  next: ProtectedProjectPath
  /** Dismisses the modal: Close, Back, and Escape. */
  onClose: () => void
  /** Element that opened the modal; focus returns to it on close. */
  returnFocusTo?: HTMLElement | null
  /** Forces a state for the development preview; unused in production. */
  preview?: { state?: UnlockState; pending?: boolean }
}

export function PasswordModal({ next, onClose, returnFocusTo, preview }: PasswordModalProps) {
  const [state, formAction, actionPending] = useActionState(unlockProjects, preview?.state ?? initialState)
  const pending = actionPending || Boolean(preview?.pending)
  const dialogRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const errorId = useId()
  const inputId = useId()
  const message = errorMessage(state)

  useModalBehavior(dialogRef, { onClose, canClose: !pending, returnFocusTo })

  useEffect(() => {
    if (state.failures > 0) inputRef.current?.focus()
  }, [state.failures])

  return (
    <div className="fixed inset-0 z-[91] flex h-dvh w-screen items-center justify-center overscroll-contain bg-overlay-black/60">
      <form
        ref={dialogRef}
        action={formAction}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="modal-panel max-h-[calc(100dvh-2rem)] w-[90vw] max-w-lg overflow-y-auto"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-heading text-strong">Protected Page</h2>
              <button
                type="button"
                onClick={onClose}
                disabled={pending}
                aria-label="Close password dialog"
                className="modal-close disabled:opacity-60"
              >
                <X weight="regular" className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p id={descriptionId} className="text-body text-pretty text-muted">
              This project is password protected. Enter the password below or{" "}
              <a
                href="mailto:hunterg26@icloud.com"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
              >
                contact me
              </a>
            </p>
          </div>

          <div className="flex w-full flex-col gap-4">
            <input type="hidden" name="next" value={next} />
            <div className="flex flex-col gap-2">
              <label htmlFor={inputId} className="sr-only">
                Password
              </label>
              <input
                ref={inputRef}
                id={inputId}
                name="password"
                type="password"
                required
                autoFocus
                readOnly={pending}
                maxLength={256}
                autoComplete="current-password"
                placeholder="Enter password"
                aria-invalid={message ? true : undefined}
                aria-describedby={message ? errorId : undefined}
                className="text-caption w-full rounded-md border border-border bg-surface px-4 py-3 text-foreground transition-colors placeholder:text-muted focus-visible:border-foreground"
              />
              <div aria-live="polite" className="min-h-6">
                {message ? (
                  <p
                    key={state.failures}
                    id={errorId}
                    className={`text-caption flex items-center justify-start gap-1.5 text-left text-red ${
                      state.failures > 1 ? "gate-shake" : ""
                    }`}
                  >
                    <Warning size={16} weight="regular" aria-hidden="true" />
                    {message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={pending}
                className="bg-surface text-body min-h-11 rounded-full px-6 py-2.5 font-medium text-foreground transition-colors hover:bg-surface-strong disabled:opacity-60"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={pending}
                aria-busy={pending || undefined}
                className="btn-primary text-body min-h-11 rounded-full px-6 py-2.5 font-medium disabled:opacity-60"
              >
                {pending ? "Checking" : "Enter"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
