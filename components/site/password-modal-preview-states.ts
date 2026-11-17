export const PREVIEW_STATES = ["default", "incorrect", "rate-limited", "unavailable", "pending"] as const
export type PreviewStateName = (typeof PREVIEW_STATES)[number]
