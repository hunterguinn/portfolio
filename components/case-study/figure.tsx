import Image from "next/image"
import { FilmStrip } from "@phosphor-icons/react/dist/ssr/FilmStrip"
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image"
import type { FigureData, FigureMeta, MediaSlot as MediaSlotData } from "@/lib/content/types"
import { OrderScreen } from "@/components/figures/order-screen"

/** Frame shared by image, video, and coded figures, with a figcaption below. */
export function FigureFrame({
  meta,
  hasSlotLabels = false,
  children,
}: {
  meta: FigureMeta
  hasSlotLabels?: boolean
  children: React.ReactNode
}) {
  const captionText = meta.caption ?? meta.title
  const showPending = !captionText && !hasSlotLabels
  const showCaption = meta.number || captionText || showPending

  return (
    <figure className="flex flex-col gap-4">
      {children}
      {showCaption ? (
        <figcaption className="text-caption flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {meta.number ? <span className="text-eyebrow text-secondary">{meta.number}</span> : null}
          {captionText ? <span className="text-primary">{captionText}</span> : null}
          {showPending ? <span className="text-secondary italic">Caption pending</span> : null}
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
          className={contain ? "object-contain p-5 md:p-8" : "object-cover object-top"}
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
      className="card-surface flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-center"
      style={style}
    >
      <Icon weight="regular" className="size-5 text-secondary" aria-hidden="true" />
      <span className="text-caption text-secondary">{slot.placeholder}</span>
      <span className="text-eyebrow text-secondary">
        {slot.kind === "video" ? "Video pending" : "Asset pending"}
      </span>
    </div>
  )
}

export function Figure({ figure }: { figure: FigureData }) {
  const hasSlotLabels = figure.slots.some((slot) => slot.label)
  const grid = (
    <div className="flex flex-col gap-4">
      {figure.slots.map((slot) => (
        <div key={slot.placeholder} className="flex w-full flex-col gap-3">
          <MediaSlot slot={slot} />
          {slot.label ? <p className="text-eyebrow text-secondary">{slot.label}</p> : null}
        </div>
      ))}
    </div>
  )

  return (
    <FigureFrame meta={figure} hasSlotLabels={hasSlotLabels}>
      {figure.title ? <h3 className="text-body text-strong">{figure.title}</h3> : null}
      {grid}
    </FigureFrame>
  )
}
