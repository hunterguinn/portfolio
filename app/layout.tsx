import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import { CustomCursor } from "@/components/site/custom-cursor"
import { ContextMenuGuard } from "@/components/site/context-menu-guard"
import { MotionReveal } from "@/components/site/motion-reveal"
import { ToastHost } from "@/components/site/toast"
import { ProjectAccessGate } from "@/components/site/project-access-gate"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Hunter Guinn · Product Designer",
    template: "%s · Hunter Guinn",
  },
  description:
    "Hunter Guinn designs financial experiences that create clarity, build trust, and scale. Currently at Bank of America.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
          >
            Skip to content
          </a>
          <main id="main">{children}</main>
          <MotionReveal />
          <ProjectAccessGate />
          <ToastHost />
          <CustomCursor />
          <ContextMenuGuard />
        </ThemeProvider>
      </body>
    </html>
  )
}
