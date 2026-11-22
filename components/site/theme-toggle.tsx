"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Moon } from "@phosphor-icons/react/dist/csr/Moon"
import { Sun } from "@phosphor-icons/react/dist/csr/Sun"

const noop = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(noop, () => true, () => false)
  const isDark = !mounted || resolvedTheme !== "light"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-10 shrink-0 items-center justify-center rounded-icon border text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {isDark ? <Sun weight="regular" className="size-4" aria-hidden="true" /> : <Moon weight="regular" className="size-4" aria-hidden="true" />}
    </button>
  )
}
