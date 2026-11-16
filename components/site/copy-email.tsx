"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"
import { site } from "@/lib/content/site"
import { showToast } from "./toast"

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const field = document.createElement("textarea")
    field.value = text
    field.setAttribute("readonly", "")
    field.style.position = "fixed"
    field.style.opacity = "0"
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand("copy")
    field.remove()
    return ok
  }
}

async function copyEmail() {
  const ok = await writeToClipboard(site.email)
  showToast(ok ? "Email copied to clipboard" : `Copy failed. Email me at ${site.email}`)
  return ok
}

/** Footer text link that copies the email address. */
export function CopyEmailLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={copyEmail} className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      Email
    </button>
  )
}

/** Button that confirms a successful copy for two seconds. */
export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onClick = async () => {
    const ok = await copyEmail()
    if (!ok) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const Icon = copied ? Check : Copy

  return (
    <button type="button" onClick={onClick} className={className}>
      <Icon className="size-4" aria-hidden="true" />
      {copied ? "Copied!" : "Copy email"}
    </button>
  )
}
