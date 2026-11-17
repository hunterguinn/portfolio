import type { ReactNode } from "react"
import Link from "next/link"
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"

/** Primary pill with a separate circle holding a right caret with a slot-machine hover motion. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`btn-primary-group group inline-flex items-center gap-1 self-start rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${className}`}
    >
      <span className="btn-primary inline-flex h-11 flex-1 items-center justify-center rounded-full px-6 text-caption font-medium">
        {children}
      </span>
      <span className="btn-primary arrow-flip-wrap flex size-11 items-center justify-center overflow-hidden rounded-full" aria-hidden="true">
        <span className="arrow-slot">
          <CaretRight weight="regular" className="arrow-slot-icon arrow-slot-icon-current size-4" />
          <CaretRight weight="regular" className="arrow-slot-icon arrow-slot-icon-next size-4" />
        </span>
      </span>
    </Link>
  )
}
