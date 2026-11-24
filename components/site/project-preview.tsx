import Image from "next/image"
import Link from "next/link"
import type { ProjectSummary } from "@/lib/content/types"

export function ProjectPreview({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={project.href}
      aria-label={`View project: ${project.title}`}
      className="card-hover card-hover-flat group relative block overflow-hidden rounded-lg border"
      style={{ aspectRatio: project.cover.aspect }}
    >
      <div className="media-settle cover-zoom absolute inset-0">
        <Image
          src={project.background}
          alt=""
          fill
          sizes="(min-width: 768px) 40rem, 100vw"
          className="object-cover"
        />
        <div className="absolute top-[16.6%] right-0 bottom-0 left-[11%] overflow-hidden rounded-tl-lg bg-surface">
          {project.cover.src ? (
            <div
              className="absolute"
              style={{ left: project.mockup.left, top: project.mockup.top, width: project.mockup.size }}
            >
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.mockup.width}
                height={project.mockup.height}
                sizes="(min-width: 768px) 30rem, 80vw"
                className="h-auto w-full"
              />
            </div>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-caption text-muted">
              {project.cover.placeholder}
            </span>
          )}
        </div>
      </div>
      <span className="cover-pill text-caption absolute top-5 left-5">{project.category}</span>
    </Link>
  )
}
