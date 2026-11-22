"use client"

import { useState } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight"
import { home } from "@/lib/content/home"
import type { AiCard } from "@/lib/content/types"
import { SectionHeader, SectionIntro, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { ArticleModal } from "./article-modal"

function AiCardView({ card, index, onOpen }: { card: AiCard; index: number; onOpen: (title: string, trigger: HTMLElement) => void }) {
  return (
    <li data-reveal="" className="flex">
      <button
        type="button"
        onClick={(event) => onOpen(card.articleTitle, event.currentTarget)}
        aria-haspopup="dialog"
        className="card-hover group flex w-full flex-col gap-5 overflow-hidden rounded-lg border pl-6 pt-6 text-left md:gap-6"
      >
        <span className="flex w-full flex-col gap-0 pr-6">
          <span className="flex items-center justify-between text-eyebrow text-muted">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>Article</span>
          </span>
          {card.count !== undefined ? (
            <span className="text-heading tabular-nums">
              {`${card.count}${card.suffix ?? ""}`}
            </span>
          ) : null}
          <span className="text-body">{card.topic}</span>
          {card.sublabel ? <span className="text-eyebrow text-muted">{card.sublabel}</span> : null}
        </span>
        <span className="ai-card-panel flex flex-1 flex-col justify-between gap-6 rounded-tl-lg bg-surface p-6">
          <span className="text-body text-muted">{card.body}</span>
          <span className="inline-flex items-center gap-2 self-end text-caption text-foreground">
            Read more
            <ArrowRight weight="regular" className="arrow-nudge size-3.5" aria-hidden="true" />
          </span>
        </span>
      </button>
    </li>
  )
}

export function AiSection() {
  const { ai } = home
  const [open, setOpen] = useState<{ card: AiCard; trigger: HTMLElement } | null>(null)

  return (
    <SectionShell id="ai">
      <SectionHeader>
        <SectionTitle id="ai">{ai.title}</SectionTitle>
        <SectionIntro>{ai.intro}</SectionIntro>
      </SectionHeader>
      <ul className="grid gap-3 sm:grid-cols-2">
        {ai.cards.map((card, index) => (
          <AiCardView key={card.topic} card={card} index={index} onOpen={(_, trigger) => setOpen({ card, trigger })} />
        ))}
      </ul>
      {open ? <ArticleModal title={open.card.articleTitle} content={open.card.articleContent} returnFocusTo={open.trigger} onClose={() => setOpen(null)} /> : null}
    </SectionShell>
  )
}
