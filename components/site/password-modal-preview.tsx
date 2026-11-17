"use client"

import type { UnlockState } from "@/app/actions/unlock-projects"
import { PasswordModal } from "./password-modal"
import type { PreviewStateName } from "./password-modal-preview-states"

const previewStates: Record<PreviewStateName, { state?: UnlockState; pending?: boolean }> = {
  default: {},
  incorrect: { state: { status: "incorrect", failures: 2 } },
  "rate-limited": { state: { status: "rate-limited", failures: 1, retryAfterMinutes: 15 } },
  unavailable: { state: { status: "unavailable", failures: 1 } },
  pending: { pending: true },
}

/** Development-only wrapper that pins the modal to a given state for visual editing. */
export function PasswordModalPreview({ name }: { name: PreviewStateName }) {
  return <PasswordModal next="/merrill" onClose={() => undefined} preview={previewStates[name]} />
}
