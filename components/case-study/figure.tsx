import Image from "next/image"
import { FilmStrip } from "@phosphor-icons/react/dist/ssr/FilmStrip"
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image"
import type { FigureData, FigureMeta, MediaSlot as MediaSlotData } from "@/lib/content/types"
import { OrderScreen } from "@/components/figures/order-screen"

export type FigureKind = "image" | "video" | "visual" | "prototype" | "media"

/** One caption treatment for grouped visuals and individually numbered media slots. */
function CaptionContent({ number, caption, kind }: { number?: string; caption?: string; kind: FigureKind }) {
  const label = kind === "visual" ? "Illustrative" : kind
  return (
    <>
      {number ? <span className="shrink-0 text-eyebrow text-muted">{number}</span> : null}
      <span title={caption} className="pill-hover shrink-0 rounded-full border px-2 py-1 text-eyebrow text-muted">
        {label}
      </span>
    </>
  )
}

/** Frame shared by image, video, and coded figures, with a figcaption below. */
export function FigureFrame({
  meta,
  kind = "visual",
  hasSlotLabels = false,
  showCaptionText = false,
  children,
}: {
  meta: FigureMeta
  kind?: FigureKind
  hasSlotLabels?: boolean
  showCaptionText?: boolean
  children: React.ReactNode
}) {
  const captionText = meta.caption ?? meta.title
  const showCaption = meta.number || captionText || !hasSlotLabels

  return (
    <figure data-reveal="media" className="flex flex-col gap-4">
      {children}
      {showCaption ? (
        <figcaption className="flex flex-wrap items-center justify-end gap-2">
          <CaptionContent number={meta.number} caption={captionText} kind={kind} />
          {showCaptionText && captionText ? <p className="w-full text-caption text-muted">{captionText}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function MediaSlot({ slot }: { slot: MediaSlotData }) {
  const style = { aspectRatio: slot.aspect }

  if (slot.src && slot.kind === "image") {
    const contain = slot.fit === "contain"
    return (
      <div
        className={`relative overflow-hidden rounded-lg ${contain ? "bg-media-canvas" : "bg-surface"}`}
        style={style}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          // The image optimizer fetches without the visitor's session cookie, so protected media loads directly.
          unoptimized={slot.src.startsWith("/media/")}
          className={`media-settle ${contain ? "object-contain p-5 md:p-8" : "object-cover object-top"}`}
        />
      </div>
    )
  }

  if (slot.src && slot.kind === "video") {
    return (
      <video
        src={slot.src}
        poster={slot.poster}
        controls
        playsInline
        preload="metadata"
        aria-label={slot.alt}
        className="w-full rounded-lg bg-surface object-cover"
        style={style}
      />
    )
  }

  if (slot.fallback === "order-screen") {
    return <OrderScreen aspect={slot.aspect} />
  }

  const Icon = slot.kind === "video" ? FilmStrip : ImageIcon
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${slot.kind}: ${slot.placeholder}`}
      className="card-surface flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-center lg:p-6"
      style={{ aspectRatio: "16 / 9" }}
    >
      <Icon weight="regular" className="size-5 text-muted" aria-hidden="true" />
      <span className="text-caption text-muted">{slot.placeholder}</span>
      <span className="text-eyebrow text-muted">
        {slot.kind === "video" ? "Video pending" : "Asset pending"}
      </span>
    </div>
  )
}

export function Figure({ figure }: { figure: FigureData }) {
  const hasSlotLabels = figure.slots.length > 0 && figure.slots.every((slot) => /^Figure\s+\d/i.test(slot.label ?? ""))
  const kinds = new Set(figure.slots.map((slot) => slot.fallback ? "visual" : slot.kind))
  const kind: FigureKind = kinds.size > 1 ? "media" : kinds.values().next().value ?? "image"
  const grid = (
    <div className="flex flex-col gap-4">
      {figure.slots.map((slot) => (
        <div key={slot.placeholder} className="flex w-full flex-col gap-3">
          <MediaSlot slot={slot} />
          {slot.label ? (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <CaptionContent
                kind={slot.fallback ? "visual" : slot.kind}
                number={slot.label.match(/^(Figure\s+\d+(?:\.\d+)*)/i)?.[1]}
                caption={slot.label.replace(/^Figure\s+\d+(?:\.\d+)*\s*[·–—:-]?\s*/i, "") || (slot.fallback ? "visual" : slot.kind)}
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )

  return (
    <FigureFrame meta={figure} kind={kind} hasSlotLabels={hasSlotLabels} showCaptionText={figure.showCaptionText}>
      {figure.title ? <h3 className="text-body text-strong">{figure.title}</h3> : null}
      {grid}
    </FigureFrame>
  )
}
