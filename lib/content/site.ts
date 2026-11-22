export const site = {
  name: "Hunter Guinn",
  copyright: "© 2026 Hunter Guinn",
  pages: [
    { label: "Merrill Edge Asset Transfer", href: "/merrill" },
    { label: "Enterprise Point-of-Sale Software", href: "/pos" },
    { label: "Unified Client Application", href: "/unified" },
  ],
  email: "hunterg26@icloud.com",
  /** Lives in public/files; the filename is the one the browser saves. */
  resume: { href: "/files/Hunter%20Guinn%20-%20Resume.pdf", filename: "Hunter Guinn - Resume.pdf" },
  linkedin: "https://linkedin.com/in/hunterguinn",
  github: "https://github.com/hunterguinn",
}

/** Next-project order follows the footer page order. */
export const nextProject: Record<"merrill" | "pos" | "unified", { href: string; title: string }> = {
  merrill: { href: "/pos", title: "Enterprise Point-of-Sale System" },
  pos: { href: "/unified", title: "Unified Client Application" },
  unified: { href: "/merrill", title: "Merrill Edge Asset Transfer" },
}
