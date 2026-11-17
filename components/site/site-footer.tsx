import Link from "next/link"
import { site } from "@/lib/content/site"
import { CopyEmailLink } from "./copy-email"

export function SiteFooter() {
  return (
    <footer className="page-band border-t">
      <div className="page-container grid gap-10 py-14 md:py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-42">
        <p className="text-caption text-secondary order-last lg:order-first">{site.copyright}</p>
        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-labelledby="footer-pages" className="flex flex-col gap-2">
            <h2 id="footer-pages" className="text-eyebrow text-secondary">
              Pages
            </h2>
            {site.pages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-caption self-start transition-colors hover:text-secondary"
              >
                {page.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <h2 className="text-eyebrow text-secondary">Contact</h2>
            <CopyEmailLink className="text-caption self-start transition-colors hover:text-secondary" />
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption self-start transition-colors hover:text-secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
