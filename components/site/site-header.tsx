import Link from "next/link"
import { site } from "@/lib/content/site"
import { HeaderClock } from "./header-clock"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="page-band sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="page-container flex h-14 items-center justify-between gap-6">
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 type-supporting text-muted md:gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-5 md:gap-8">
          <HeaderClock />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
