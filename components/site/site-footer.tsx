import Link from "next/link"
import { Download } from "lucide-react"
import { site } from "@/lib/content/site"
import { CopyEmailLink } from "./copy-email"

export function SiteFooter() {
  return (
    <footer className="page-band border-t">
      <div className="page-container grid gap-10 py-14 md:py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-[10.5rem]">
        <p className="type-supporting text-muted">{site.copyright}</p>
        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-labelledby="footer-pages" className="flex flex-col gap-4">
            <h2 id="footer-pages" className="type-eyebrow text-muted">
              Pages
            </h2>
            <ul className="type-supporting flex flex-col gap-2.5">
              {site.pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="transition-colors hover:text-muted">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4">
            <h2 className="type-eyebrow text-muted">Contact</h2>
            <ul className="type-supporting flex flex-col gap-2.5">
              <li>
                <CopyEmailLink className="transition-colors hover:text-muted" />
              </li>
              <li>
                <a
                  href={site.resume.href}
                  download={site.resume.filename}
                  className="inline-flex items-center gap-2 transition-colors hover:text-muted"
                >
                  Resume
                  <Download className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-muted"
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
