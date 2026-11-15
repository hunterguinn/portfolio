import type { Block } from "@/lib/content/types"
import { Pending } from "@/components/site/pending"
import { Figure, FigureFrame } from "./figure"
import { Callout, Cards, Metrics, Paragraph, TestimonialQuote } from "./content-primitives"
import { TransferSteps } from "@/components/figures/transfer-steps"
import { TransferDemo } from "@/components/figures/transfer-demo"
import { ApplicationFlow } from "@/components/figures/application-flow"
import { DecisionMatrix } from "@/components/figures/decision-matrix"
import { DeliveryTimeline } from "@/components/figures/delivery-timeline"
import { ResearchSummary } from "@/components/figures/research-summary"
import { CitizenshipForm } from "@/components/figures/citizenship-form"
import { PrototypeSlots } from "@/components/figures/prototype-slots"

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-8 md:gap-10">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <Paragraph>{block.text}</Paragraph>
    case "pending":
      return <Pending>{block.text}</Pending>
    case "callout":
      return <Callout text={block.text} />
    case "testimonial":
      return <TestimonialQuote testimonial={block.testimonial} />
    case "cards":
      return <Cards cards={block.cards} columns={block.columns} />
    case "metrics":
      return <Metrics metrics={block.metrics} />
    case "figure":
      return <Figure figure={block.figure} />
    case "pair":
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <Blocks blocks={block.main} />
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <Blocks blocks={block.aside} />
          </div>
        </div>
      )
    case "transfer-steps":
      return (
        <FigureFrame meta={block.figure}>
          <TransferSteps steps={block.steps} />
        </FigureFrame>
      )
    case "transfer-demo":
      return (
        <FigureFrame meta={block.figure}>
          <TransferDemo mode={block.mode} rows={block.rows} initialStatus={block.initialStatus} />
        </FigureFrame>
      )
    case "application-flow":
      return (
        <FigureFrame meta={block.figure}>
          <ApplicationFlow {...block} />
        </FigureFrame>
      )
    case "decision-matrix":
      return (
        <FigureFrame meta={block.figure}>
          <DecisionMatrix rows={block.rows} />
        </FigureFrame>
      )
    case "delivery-timeline":
      return (
        <FigureFrame meta={block.figure}>
          <DeliveryTimeline periods={block.periods} lanes={block.lanes} />
        </FigureFrame>
      )
    case "research-summary":
      return <ResearchSummary questions={block.questions} findings={block.findings} />
    case "citizenship-form":
      return (
        <FigureFrame meta={block.figure}>
          <CitizenshipForm copy={block.copy} />
        </FigureFrame>
      )
    case "prototype":
      return (
        <FigureFrame meta={block.figure} hasSlotLabels>
          <PrototypeSlots title={block.title} slots={block.slots} status={block.status} />
        </FigureFrame>
      )
  }
}
