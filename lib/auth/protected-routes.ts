export const PROTECTED_PROJECT_PATHS = ["/merrill", "/pos", "/unified"] as const

export type ProtectedProjectPath = (typeof PROTECTED_PROJECT_PATHS)[number]

export function toProtectedPath(value: unknown): ProtectedProjectPath {
  return PROTECTED_PROJECT_PATHS.find((path) => path === value) ?? "/merrill"
}
