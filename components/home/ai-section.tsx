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
        className="group flex w-full flex-col justify-between gap-6 rounded-lg border p-5 text-left transition-colors duration-300 hover:border-secondary/40 hover:bg-surface md:p-6"
      >
        <span className="flex flex-col gap-2">
          {card.count !== undefined ? (
            <span className="text-heading tabular-nums">
              <CountUp to={card.count} suffix={card.suffix ?? ""} />
            </span>
          ) : null}
          <span className="text-body text-strong">{card.topic}</span>
          {card.body ? (
            <span className="text-caption text-secondary">{card.body}</span>
          ) : (
            <span className="text-caption text-secondary italic">[Description coming soon]</span>
          )}
        </span>
        <span className="inline-flex items-center gap-2 self-end text-caption text-secondary transition-colors group-hover:text-primary">
          Read more
          <ArrowRight weight="regular" className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
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
