import Link from "next/link"
import { site } from "@/lib/content/site"
import { Pending } from "./pending"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="page-container grid gap-10 py-14 md:py-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-[10.5rem]">
        <p className="text-[0.8125rem] text-muted">{site.copyright}</p>
        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages" className="font-mono text-xs uppercase tracking-widest text-muted">
              Pages
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {site.pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="transition-colors hover:text-muted">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Contact</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {site.contact.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-muted">
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <span>{item.label}</span>
                      <Pending>Link pending</Pending>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
