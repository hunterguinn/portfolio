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
      <h3 className="text-body text-strong">{title}</h3>
      <div className="flex flex-col gap-6">
        {slots.map((slot) => (
          <div key={slot.device} className="flex w-full flex-col gap-3">
            <MediaSlot
              slot={{
                kind: "image",
                alt: `${slot.device} ${title.toLowerCase()}`,
                placeholder: slot.placeholder,
                aspect: slot.aspect,
              }}
            />
            <p className="text-eyebrow text-secondary">{slot.device}</p>
          </div>
        ))}
      </div>
      <p>
        <Pending>{status}</Pending>
      </p>
    </div>
  )
}
