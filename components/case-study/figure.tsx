import Image from "next/image"
import { Film, ImageIcon } from "lucide-react"
import type { FigureData, FigureMeta, MediaSlot as MediaSlotData } from "@/lib/content/types"
import { Reveal } from "@/components/site/reveal"
import { OrderScreen } from "@/components/figures/order-screen"

const columnClass: Record<NonNullable<FigureData["columns"]>, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  5: "sm:grid-cols-3 lg:grid-cols-5",
}

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
        <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
          {meta.number ? <span className="font-mono text-xs uppercase tracking-wider text-muted">{meta.number}</span> : null}
          {captionText ? <span className="text-foreground">{captionText}</span> : null}
          {showPending ? <span className="text-muted italic">Caption pending</span> : null}
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
        className={`relative overflow-hidden rounded-lg border ${contain ? "bg-[#ecebe7]" : "bg-surface"}`}
        style={style}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
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
        className="w-full rounded-lg border bg-surface object-cover"
        style={style}
      />
    )
  }

  if (slot.fallback === "order-screen") {
    return <OrderScreen aspect={slot.aspect} />
  }

  const Icon = slot.kind === "video" ? Film : ImageIcon
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${slot.kind}: ${slot.placeholder}`}
      className="card-surface flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-4 text-center"
      style={style}
    >
      <Icon className="size-5 text-muted" aria-hidden="true" />
      <span className="max-w-[18rem] text-xs leading-relaxed text-muted text-pretty">{slot.placeholder}</span>
      <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted/70">
        {slot.kind === "video" ? "Video pending" : "Asset pending"}
      </span>
    </div>
  )
}

export function Figure({ figure }: { figure: FigureData }) {
  const hasSlotLabels = figure.slots.some((slot) => slot.label)
  const grid = (
    <div className={`grid items-end gap-4 ${columnClass[figure.columns ?? 1]}`}>
      {figure.slots.map((slot) => (
        <div key={slot.placeholder} className="flex flex-col gap-2.5">
          <MediaSlot slot={slot} />
          {slot.label ? <p className="font-mono text-xs uppercase tracking-wider text-muted">{slot.label}</p> : null}
        </div>
      ))}
    </div>
  )

  return (
    <FigureFrame meta={figure} hasSlotLabels={hasSlotLabels}>
      {figure.title ? <h3 className="text-base font-medium">{figure.title}</h3> : null}
      {figure.reveal ? <Reveal>{grid}</Reveal> : grid}
    </FigureFrame>
  )
}
