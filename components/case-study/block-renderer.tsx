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
import { SelectionLimit } from "@/components/figures/selection-limit"

const isProse = (block: Block) => block.type === "p" || block.type === "pending"

const blockStack = "flex min-w-0 flex-col gap-8 md:gap-10"

/** Consecutive paragraphs reveal as one readable group; every other block is its own reveal unit. */
function groupBlocks(blocks: Block[]) {
  const groups: { prose: boolean; blocks: Block[] }[] = []
  for (const block of blocks) {
    const last = groups.at(-1)
    if (isProse(block) && last?.prose) last.blocks.push(block)
    else groups.push({ prose: isProse(block), blocks: [block] })
  }
  return groups
}

/** Renders a section's blocks. An optional heading reveals together with the prose that follows it. */
export function Blocks({ blocks, heading }: { blocks: Block[]; heading?: React.ReactNode }) {
  const groups = groupBlocks(blocks)
  const leadsWithProse = Boolean(heading) && groups[0]?.prose
  const rest = leadsWithProse ? groups.slice(1) : groups

  const body = (
    <div className={blockStack}>
      {leadsWithProse ? (
        <div data-reveal="" className="flex min-w-0 flex-col gap-6">
          {heading}
          <div className={blockStack}>
            {groups[0].blocks.map((block, index) => (
              <BlockView key={index} block={block} />
            ))}
          </div>
        </div>
      ) : null}
      {rest.map((group, groupIndex) =>
        group.prose ? (
          <div key={groupIndex} data-reveal="" className={blockStack}>
            {group.blocks.map((block, index) => (
              <BlockView key={index} block={block} />
            ))}
          </div>
        ) : (
          <BlockView key={groupIndex} block={group.blocks[0]} />
        ),
      )}
    </div>
  )

  if (!heading || leadsWithProse) return body
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div data-reveal="">{heading}</div>
      {body}
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
        <div className="flex min-w-0 flex-col gap-8 md:gap-10">
          <Blocks blocks={block.main} />
          <div className="min-w-0">
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
          <TransferDemo mode={block.mode} rows={block.rows} initialStatus={block.initialStatus} rules={block.rules} />
        </FigureFrame>
      )
    case "selection-limit":
      return (
        <FigureFrame meta={block.figure}>
          <SelectionLimit limit={block.limit} />
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
