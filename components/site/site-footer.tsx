import Link from "next/link"
import { site } from "@/lib/content/site"
import { CopyEmailLink } from "./copy-email"

export function SiteFooter() {
  return (
    <footer className="page-band border-t">
      <div className="page-container grid gap-10 py-14 md:py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-42">
        <p className="text-caption text-secondary order-last lg:order-first">{site.copyright}</p>
        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-labelledby="footer-pages" className="flex flex-col gap-4">
            <h2 id="footer-pages" className="text-eyebrow text-secondary">
              Pages
            </h2>
            <ul className="text-caption flex flex-col gap-3">
              {site.pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="transition-colors hover:text-secondary">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4">
            <h2 className="text-eyebrow text-secondary">Contact</h2>
            <ul className="text-caption flex flex-col gap-3">
              <li>
                <CopyEmailLink className="transition-colors hover:text-secondary" />
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-secondary"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
