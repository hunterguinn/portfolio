import Image from "next/image"

export function Avatar({
  name,
  src,
  size = 40,
  alt = "",
}: {
  name: string
  src?: string
  size?: number
  /** Leave empty when the person's name is rendered next to the avatar. */
  alt?: string
}) {
  const dimension = { width: size, height: size }

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size * 2}
        height={size * 2}
        style={dimension}
        className="shrink-0 rounded-full bg-surface-strong object-cover"
      />
    )
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <span
      aria-hidden="true"
      style={dimension}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-surface-strong type-eyebrow text-muted"
    >
      {initials}
    </span>
  )
}
