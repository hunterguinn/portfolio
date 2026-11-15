import Link from "next/link"
import { site } from "@/lib/content/site"
import { HeaderClock } from "./header-clock"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-6 px-5 md:px-10">
        <Link href="/" className="text-sm font-medium tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 md:gap-8">
          <ul className="flex items-center gap-4 text-sm text-muted md:gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <HeaderClock />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
