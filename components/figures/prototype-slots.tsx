import { Pending } from "@/components/site/pending"
import { MediaSlot } from "@/components/case-study/figure"

export function PrototypeSlots({
  title,
  slots,
  status,
}: {
  title: string
  slots: { device: "Desktop" | "Mobile"; placeholder: string; aspect: string }[]
  status: string
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-base font-medium">{title}</h3>
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end">
        {slots.map((slot) => (
          <div
            key={slot.device}
            className={`flex w-full flex-col gap-2.5 ${slot.device === "Mobile" ? "max-w-[15rem] shrink-0" : "flex-1"}`}
          >
            <MediaSlot
              slot={{
                kind: "image",
                alt: `${slot.device} ${title.toLowerCase()}`,
                placeholder: slot.placeholder,
                aspect: slot.aspect,
              }}
            />
            <p className="font-mono text-xs uppercase tracking-wider text-muted">{slot.device}</p>
          </div>
        ))}
      </div>
      <p>
        <Pending>{status}</Pending>
      </p>
    </div>
  )
}
