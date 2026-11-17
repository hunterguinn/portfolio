import Image from "next/image"
import { Image as ImageIcon } from "@phosphor-icons/react/dist/ssr/Image"
import type { GalleryItem } from "@/lib/content/types"

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <li className="card-surface gallery-card flex flex-1 flex-col rounded-3xl p-2">
      <div
        className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-surface-strong"
        style={{ aspectRatio: item.aspect }}
      >
        {item.src ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 20vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`Placeholder for photo: ${item.placeholder}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center"
          >
            <ImageIcon weight="regular" className="size-5 text-secondary" aria-hidden="true" />
            <span className="text-caption text-secondary">{item.placeholder}</span>
          </div>
        )}
      </div>
    </li>
  )
}

/** Bento grid of photos: four stacked columns at wide sizes, two columns on smaller screens. */
export function AboutGallery({ columns }: { columns: GalleryItem[][] }) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {columns.map((column) => (
        <ul key={column[0].placeholder} className="flex flex-col gap-2">
          {column.map((item) => (
            <GalleryCard key={item.placeholder} item={item} />
          ))}
        </ul>
      ))}
    </div>
  )
}
