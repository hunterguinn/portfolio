export const site = {
  name: "Hunter Guinn",
  copyright: "© 2026 Hunter Guinn",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/#about" },
  ],
  pages: [
    { label: "Merrill Edge Asset Transfer", href: "/merrill" },
    { label: "Enterprise Point-of-Sale Software", href: "/pos" },
    { label: "Unified Client Application", href: "/unified" },
  ],
  /** Set `href` once a destination is supplied; null renders a "Link pending" tag. */
  contact: [
    { label: "Email", href: null as string | null },
    { label: "Resume", href: null as string | null },
    { label: "LinkedIn", href: null as string | null },
  ],
}

/** Next-project order follows the footer page order. */
export const nextProject: Record<"merrill" | "pos" | "unified", { href: string; title: string }> = {
  merrill: { href: "/pos", title: "Enterprise Point-of-Sale System" },
  pos: { href: "/unified", title: "Unified Client Application" },
  unified: { href: "/merrill", title: "Merrill Edge Asset Transfer" },
}
