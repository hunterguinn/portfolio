"use client"

import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000)
  return () => window.clearInterval(id)
}

function getMinute() {
  return Math.floor(Date.now() / 60_000)
}

function format(minute: number) {
  const date = new Date(minute * 60_000)
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  const day = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  return { text: `${time}, ${day}`, iso: date.toISOString() }
}

export function HeaderClock() {
  const minute = useSyncExternalStore(subscribe, getMinute, () => null)
  if (minute === null) {
    return <span className="type-eyebrow hidden min-w-[9.5rem] text-muted lg:inline-block" aria-hidden="true" />
  }
  const { text, iso } = format(minute)
  return (
    <time dateTime={iso} className="type-eyebrow hidden min-w-[9.5rem] text-muted tabular-nums lg:inline-block">
      {text}
    </time>
  )
}
