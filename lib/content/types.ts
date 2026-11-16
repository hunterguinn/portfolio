/**
 * Content model for the portfolio. Every figure slot keeps its expected asset
 * label in `placeholder`; set `src` (a path under /public/media) to replace a
 * placeholder without touching layout code.
 */

export type MediaSlot = {
  kind: "image" | "video"
  /** Path to the supplied asset, e.g. "/media/merrill/asset-selection.png". */
  src?: string
  /** Video poster frame, when supplied. */
  poster?: string
  /** Meaningful alt text used once the asset is supplied. */
  alt: string
  /** Expected asset label shown while the asset is missing. */
  placeholder: string
  /** CSS aspect-ratio, e.g. "16 / 10". */
  aspect: string
  /** Sub-label shown under the slot (device, breakpoint, or annotation). */
  label?: string
  /** "contain" shows the whole image on a light panel (device mockups); default is "cover". */
  fit?: "contain" | "cover"
  /** Coded stand-in rendered when no `src` is supplied. */
  fallback?: "order-screen"
}

export type FigureData = {
  number?: string
  /** Source figure label, e.g. "Full Transfer – No Asset Selection". */
  title?: string
  /** Source caption. When both title and caption are missing, "Caption pending" renders. */
  caption?: string
  slots: MediaSlot[]
  reveal?: boolean
}

/** One photo in the About Me bento grid. Set `src` (under /public/images/home/about) to replace the placeholder. */
export type GalleryItem = {
  src?: string
  alt: string
  /** Expected asset label shown while the asset is missing. */
  placeholder: string
  /** Minimum CSS aspect-ratio for the photo; the card grows to fill its column. */
  aspect: string
}

export type FigureMeta = Pick<FigureData, "number" | "title" | "caption">

export type CardTone = "problem" | "approach" | "solution"

export type CardIcon =
  | "shield-check"
  | "shield-alert"
  | "unplug"
  | "list-checks"
  | "split"
  | "sliders"
  | "message"
  | "timer"
  | "layers"
  | "eye"
  | "repeat"
  | "target"
  | "pointer"
  | "minimize"
  | "route"
  | "smartphone"
  | "users"
  | "unlink"
  | "user-check"
  | "activity"
  | "life-buoy"

export type Card = { title: string; body: string; icon?: CardIcon; tone?: CardTone }

export type Metric = {
  /** Null renders a muted "Metric pending" placeholder. */
  value: string | null
  label: string
  /** Raw value shown in the source export, kept for reference. */
  sourceValue?: string
}

export type Testimonial = { quote: string; name: string; role: string }

export type TransferRow = { symbol: string; name: string; shares: number; amount: number }

export type Block =
  | { type: "p"; text: string }
  | { type: "pending"; text: string }
  | { type: "callout"; text: string }
  | { type: "testimonial"; testimonial: Testimonial }
  | { type: "cards"; cards: Card[]; columns?: 2 | 3 }
  | { type: "figure"; figure: FigureData }
  | { type: "pair"; main: Block[]; aside: Block[] }
  | { type: "metrics"; metrics: Metric[] }
  | {
      type: "transfer-steps"
      figure: FigureMeta
      steps: { step: string; title: string; requirement: "Required" | "Conditional"; items: string[] }[]
    }
  | {
      type: "transfer-demo"
      figure: FigureMeta
      mode: "synchronized" | "amount-only"
      rows: TransferRow[]
      initialStatus: string
    }
  | {
      type: "application-flow"
      figure: FigureMeta
      once: { label: string; title: string; items: string[] }
      selection: { label: string; title: string; products: { name: string; count: number }[] }
      paths: { label: string; items: string[]; appliesTo: string[] }[]
      review: { label: string; title: string; items: string[] }
    }
  | {
      type: "decision-matrix"
      figure: FigureMeta
      rows: { category: string; trigger: string; reason: string; decision: "Sales" | "Stop" }[]
    }
  | {
      type: "delivery-timeline"
      figure: FigureMeta
      periods: string[]
      lanes: {
        track: string
        cells: { label: string; detail?: string[]; milestone?: boolean }[][]
      }[]
    }
  | {
      type: "research-summary"
      questions: { title: string; items: string[] }
      findings: { title: string; items: { text: string; status: "Confirmed" | "Unconfirmed" }[] }
    }
  | { type: "citizenship-form"; figure: FigureMeta; copy: CitizenshipCopy }
  | {
      type: "prototype"
      title: string
      figure: FigureMeta
      slots: { device: "Desktop" | "Mobile"; placeholder: string; aspect: string }[]
      status: string
    }

export type CitizenshipCopy = {
  heading: string
  required: string
  countryLabel: string
  countryValue: string
  countryHint: string
  statusLabel: string
  statusValue: string
  statusHelpLabel: string
  statusHelp: string
  ssnLabel: string
  ssnPlaceholder: string
}

export type Section = {
  id: string
  /** e.g. "01 – The Problem" */
  label: string
  title: string
  blocks: Block[]
}

export type CaseStudy = {
  slug: "merrill" | "unified" | "pos"
  eyebrow: string
  title: string
  intro: string
  description: string
  team: string[]
  timeline: string[]
  sections: Section[]
}

export type ProjectSummary = {
  slug: CaseStudy["slug"]
  href: string
  title: string
  meta: string
  description: string
  team: { role: string; name: string }[]
  metrics: Metric[]
  highlight: { title: string; body: string }
  cover: MediaSlot
}
