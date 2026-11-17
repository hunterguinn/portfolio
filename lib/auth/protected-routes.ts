export const PROTECTED_PROJECT_PATHS = ["/merrill", "/pos", "/unified"] as const

export type ProtectedProjectPath = (typeof PROTECTED_PROJECT_PATHS)[number]

export function toProtectedPath(value: unknown): ProtectedProjectPath {
  return PROTECTED_PROJECT_PATHS.find((path) => path === value) ?? "/merrill"
}

/** Returns the protected project path a URL pathname points at, tolerating a trailing slash. */
export function findProtectedPath(pathname: string): ProtectedProjectPath | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname
  return PROTECTED_PROJECT_PATHS.find((path) => path === normalized) ?? null
}
