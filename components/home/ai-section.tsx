"use client"

import { useState } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight"
import { Clock } from "@phosphor-icons/react/dist/csr/Clock"
import { home } from "@/lib/content/home"
import type { AiCard } from "@/lib/content/types"
import { SectionHeader, SectionIntro, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { ArticleModal } from "./article-modal"

const WORDS_PER_MINUTE = 200

function readMinutes(card: AiCard) {
  const words = card.articleContent.map((section) => `${section.heading ?? ""} ${section.body}`).join(" ").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

function AiCardView({ card, onOpen }: { card: AiCard; onOpen: (title: string, trigger: HTMLElement) => void }) {
  return (
    <li data-reveal="" className="flex">
      <button
        type="button"
        onClick={(event) => onOpen(card.articleTitle, event.currentTarget)}
        aria-haspopup="dialog"
        className="card-hover group flex w-full flex-col gap-7 overflow-hidden rounded-lg border pl-7 pt-7 text-left"
      >
        <span className="text-heading pr-7">{card.articleTitle}</span>
        <span className="ai-card-panel flex flex-1 flex-col justify-between gap-6 rounded-tl-lg bg-surface p-6">
          <span className="text-body text-muted">{card.body}</span>
          <span className="flex w-full items-center justify-between gap-4 text-caption">
            <span className="inline-flex items-center gap-2 text-muted">
              <Clock weight="regular" className="size-4 shrink-0" aria-hidden="true" />
              {readMinutes(card)} min read
            </span>
            <span className="inline-flex items-center gap-2 text-foreground">
              Read more
              <ArrowRight weight="regular" className="arrow-nudge size-3.5" aria-hidden="true" />
            </span>
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
        {ai.cards.map((card) => (
          <AiCardView key={card.articleTitle} card={card} onOpen={(_, trigger) => setOpen({ card, trigger })} />
        ))}
      </ul>
      {open ? <ArticleModal title={open.card.articleTitle} content={open.card.articleContent} returnFocusTo={open.trigger} onClose={() => setOpen(null)} /> : null}
    </SectionShell>
  )
}
