import type { StaticImageData } from "next/image"

/**
 * Content model for the portfolio. Every figure slot keeps its expected asset
 * label in `placeholder`; set `src` (a path under /media, backed by /private/media) to replace a
 * placeholder without touching layout code.
 */

export type MediaSlot = {
  kind: "image" | "video"
  /** Path to the supplied asset, e.g. "/media/merrill/asset-selection.png" (file lives in /private/media and requires the project session). */
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
  /** Show editorial caption text in addition to the existing media-type pill. */
  showCaptionText?: boolean
  slots: MediaSlot[]
  reveal?: boolean
}

export type FigureMeta = Pick<FigureData, "number" | "title" | "caption">

export type CardTone = "problem" | "approach" | "solution"

export type CardIcon =
  | "shield-check"
  | "shield-alert"
  | "unplug"
  | "transfer"
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
  /** Optional animated presentation for dashboard-style metric cards. */
  counter?: { to: number; prefix?: string; suffix?: string; decimals?: number }
  /** Raw value shown in the source export, kept for reference. */
  sourceValue?: string
}

export type Testimonial = { quote: string; name: string; role: string }

export type StackTool = { name: string; src: string }

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "metrics"; metrics: Metric[]; note?: string }
  | { type: "callout"; text: string; attribution?: string }
  | { type: "figure"; figure: FigureData }

export type ArticleSection = {
  heading?: string
  /** Separate paragraphs with a blank line. */
  body: string
  items?: string[]
  conclusion?: string
  demonstration?: "contextual-prompt"
  blocks?: ArticleBlock[]
}

export type ArticleMeta = {
  author: string
  /** ISO date (YYYY-MM-DD). */
  published: string
  /** ISO date (YYYY-MM-DD). */
  updated: string
  tags: string[]
}

export type AiCard = {
  /** Null marks unfinished copy, rendered as a labelled placeholder. */
  body: string | null
  articleTitle: string
  /** Optional editorial title, independent of the homepage card. */
  modalTitle?: string
  articleContent: ArticleSection[]
  meta: ArticleMeta
}

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
      steps: {
        step: string
        title: string
        requirement: "Required" | "Conditional"
        items: { label: string; source: "api" | "you" | "conditional" }[]
      }[]
    }
  | {
      type: "transfer-demo"
      figure: FigureMeta
      mode: "synchronized" | "amount-only"
      rows: TransferRow[]
      initialStatus: string
      /** Source sentences describing each interaction rule, surfaced as the rule is applied. */
      rules: TransferRules
    }
  | { type: "selection-limit"; figure: FigureMeta; limit: number }
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

export type TransferRules = {
  zeroDeselects?: string
  deselectZeroes?: string
  amountReselects?: string
  reselectRequiresAmount?: string
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

/** A major section on the page, grouping one or more source sections as numbered subsections. */
export type Chapter = {
  name: string
  sections: string[]
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
  chapters: Chapter[]
}

export type ProjectIcon = "landmark" | "wallet" | "credit-card" | "store" | "layers" | "briefcase" | "database" | "blocks" | "workflow"

type ProjectMockup = { src: StaticImageData; alt: string }

export type ProjectSummary = {
  slug: CaseStudy["slug"]
  href: string
  title: string
  category: string
  description: string
  team: string[]
  metrics: Metric[]
  metricIcons: [ProjectIcon, ProjectIcon]
  insight: { icon: ProjectIcon; title: string; body: string }
  background: string
  /** Uploaded device assets, composed by the shared homepage/next-project preview. */
  mockups:
    | { layout: "phones" | "terminals"; images: [ProjectMockup, ProjectMockup] }
    | { layout: "browser"; images: [ProjectMockup] }
}
