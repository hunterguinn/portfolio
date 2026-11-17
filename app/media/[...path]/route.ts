import { readFile } from "node:fs/promises"
import path from "node:path"
import { hasProjectAccess } from "@/lib/auth/session"

const MEDIA_ROOT = path.join(process.cwd(), "private", "media")

const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
}

const DOWNLOAD_TYPES = new Set([".pdf", ".zip"])

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
}

function notFound() {
  return new Response("Not found", { status: 404, headers: privateHeaders })
}

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!(await hasProjectAccess())) return notFound()

  const { path: segments } = await params
  if (segments.some((segment) => !segment || segment.startsWith(".") || /[\\\0]/.test(segment))) return notFound()

  const filePath = path.resolve(MEDIA_ROOT, ...segments)
  const extension = path.extname(filePath).toLowerCase()
  const contentType = CONTENT_TYPES[extension]
  if (!filePath.startsWith(MEDIA_ROOT + path.sep) || !contentType) return notFound()

  let file: Buffer
  try {
    file = await readFile(filePath)
  } catch {
    return notFound()
  }

  const fileName = path.basename(filePath).replace(/"/g, "")
  return new Response(new Uint8Array(file), {
    headers: {
      ...privateHeaders,
      "Content-Type": contentType,
      "Content-Length": String(file.byteLength),
      "Content-Disposition": `${DOWNLOAD_TYPES.has(extension) ? "attachment" : "inline"}; filename="${fileName}"`,
    },
  })
}
