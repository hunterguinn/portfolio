import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

/** Primary pill with a separate circle holding an arrow that flips from up-right to right on hover. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`btn-primary-group group inline-flex items-center gap-1 self-start rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${className}`}
    >
      <span className="btn-primary inline-flex h-11 flex-1 items-center justify-center rounded-full px-6 type-supporting font-medium md:flex-none">
        {children}
      </span>
      <span className="btn-primary arrow-flip-wrap flex size-11 items-center justify-center rounded-full" aria-hidden="true">
        <ArrowRight className="arrow-flip size-4" />
      </span>
    </Link>
  )
}
