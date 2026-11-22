"use client"

import { useState } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight"
import { home } from "@/lib/content/home"
import type { AiCard } from "@/lib/content/types"
import { SectionIntro, SectionShell, SectionTitle } from "@/components/site/section-shell"
import { CountUp } from "@/components/site/count-up"
import { ArticleModal } from "./article-modal"

function AiCardView({ card, onOpen }: { card: AiCard; onOpen: (title: string, trigger: HTMLElement) => void }) {
  return (
    <li className="flex">
      <button
        type="button"
        onClick={(event) => onOpen(card.articleTitle, event.currentTarget)}
        aria-haspopup="dialog"
        className="card-hover group flex w-full flex-col gap-5 overflow-hidden rounded-lg border pl-5 pt-5 text-left md:gap-6 md:pl-6 md:pt-6"
      >
        <span className="flex flex-col gap-0 pr-5 md:pr-6">
          {card.count !== undefined ? (
            <span className="text-heading tabular-nums">
              <CountUp to={card.count} suffix={card.suffix ?? ""} />
            </span>
          ) : null}
          <span className="text-body">{card.topic}</span>
        </span>
        <span className="flex flex-1 flex-col justify-between gap-6 rounded-tl-lg bg-surface p-5 md:p-6">
          {card.body ? (
            <span className="text-body text-secondary">{card.body}</span>
          ) : (
            <span className="text-body text-secondary italic">[Description coming soon]</span>
          )}
          <span className="inline-flex items-center gap-2 self-end rounded-full bg-primary/10 px-4 py-2 text-caption text-primary transition-colors duration-300 group-hover:bg-primary/15">
            Read more
            <ArrowRight weight="regular" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
      </button>
    </li>
  )
}

export function AiSection() {
  const { ai } = home
  const [open, setOpen] = useState<{ title: string; trigger: HTMLElement } | null>(null)

  return (
    <SectionShell id="ai">
      <SectionTitle id="ai">{ai.title}</SectionTitle>
      <SectionIntro>{ai.intro}</SectionIntro>
      <ul className="grid gap-3 sm:grid-cols-2">
        {ai.cards.map((card) => (
          <AiCardView key={card.topic} card={card} onOpen={(title, trigger) => setOpen({ title, trigger })} />
        ))}
      </ul>
      {open ? <ArticleModal title={open.title} returnFocusTo={open.trigger} onClose={() => setOpen(null)} /> : null}
    </SectionShell>
  )
}
