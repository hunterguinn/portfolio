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

function collectFigureSuffixes(value: unknown, suffixes: Set<number>) {
  if (typeof value === "string") {
    for (const match of value.matchAll(/\bFigure\s+\d+\.(\d+)\b/gi)) {
      suffixes.add(Number(match[1]))
    }
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectFigureSuffixes(item, suffixes))
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectFigureSuffixes(item, suffixes))
  }
}

function rewriteFigureReferences<T>(value: T, sectionNumber: number, suffixes: Map<number, number>): T {
  if (typeof value === "string") {
    return value.replace(/(\bFigure\s+)\d+\.(\d+)\b/gi, (_, label: string, suffix: string) => {
      const nextSuffix = suffixes.get(Number(suffix)) ?? Number(suffix)
      return `${label}${sectionNumber}.${nextSuffix}`
    }) as T
  }
  if (Array.isArray(value)) {
    return value.map((item) => rewriteFigureReferences(item, sectionNumber, suffixes)) as T
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, rewriteFigureReferences(item, sectionNumber, suffixes)]),
    ) as T
  }
  return value
}

/** Reassign figure captions and citations within one source section. */
export function numberFiguresInSection(blocks: Block[], sectionNumber: number): Block[] {
  const sourceSuffixes = new Set<number>()
  collectFigureSuffixes(blocks, sourceSuffixes)
  const sortedSuffixes = [...sourceSuffixes].sort((a, b) => a - b)
  const suffixMap = new Map(sortedSuffixes.map((suffix, index) => [suffix, index]))
  const rewrittenBlocks = rewriteFigureReferences(blocks, sectionNumber, suffixMap)
  const counter = { value: 0 }
  const nextNumber = () => `Figure ${sectionNumber}.${counter.value++}`

  const assignNumbers = (items: Block[]): Block[] =>
    items.map((block) => {
      if (block.type === "pair") {
        return { ...block, main: assignNumbers(block.main), aside: assignNumbers(block.aside) }
      }

      if (block.type === "figure") {
        const hasNumberedSlots =
          block.figure.slots.length > 0 && block.figure.slots.every((slot) => /^Figure\s+\d+\.\d+/i.test(slot.label ?? ""))

        if (hasNumberedSlots) {
          return {
            ...block,
            figure: {
              ...block.figure,
              number: undefined,
              slots: block.figure.slots.map((slot) => ({
                ...slot,
                label: slot.label?.replace(/^Figure\s+\d+\.\d+(\s*[·–—:-]?\s*)/i, (_, separator: string) =>
                  `${nextNumber()}${separator}`,
                ),
              })),
            },
          }
        }

        return { ...block, figure: { ...block.figure, number: nextNumber() } }
      }

      if ("figure" in block) {
        return { ...block, figure: { ...block.figure, number: nextNumber() } }
      }

      return block
    })

  return assignNumbers(rewrittenBlocks)
}

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
        <div data-reveal="" className="flex min-w-0 flex-col gap-2 md:gap-3">
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
    <div className="flex min-w-0 flex-col gap-2 md:gap-3">
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
        <FigureFrame meta={block.figure} kind="visual">
          <TransferSteps steps={block.steps} />
        </FigureFrame>
      )
    case "transfer-demo":
      return (
        <FigureFrame meta={block.figure} kind="visual">
          <TransferDemo mode={block.mode} rows={block.rows} initialStatus={block.initialStatus} rules={block.rules} />
        </FigureFrame>
      )
    case "selection-limit":
      return (
        <FigureFrame meta={block.figure} kind="visual">
          <SelectionLimit limit={block.limit} />
        </FigureFrame>
      )
    case "application-flow":
      return (
        <FigureFrame meta={block.figure} kind="visual">
          <ApplicationFlow {...block} />
        </FigureFrame>
      )
    case "decision-matrix":
      return (
        <FigureFrame meta={block.figure} kind="visual">
          <DecisionMatrix rows={block.rows} />
        </FigureFrame>
      )
    case "delivery-timeline":
      return (
        <FigureFrame meta={block.figure} kind="visual">
          <DeliveryTimeline periods={block.periods} lanes={block.lanes} />
        </FigureFrame>
      )
    case "research-summary":
      return <ResearchSummary questions={block.questions} findings={block.findings} />
    case "citizenship-form":
      return (
        <FigureFrame meta={block.figure} kind="visual">
          <CitizenshipForm copy={block.copy} />
        </FigureFrame>
      )
    case "prototype":
      return (
        <FigureFrame meta={block.figure} kind="prototype">
          <PrototypeSlots title={block.title} slots={block.slots} status={block.status} />
        </FigureFrame>
      )
  }
}
