"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, BookOpen, FileText } from "lucide-react"
import type { ContentItem } from "@/data/content"
import { useProgress } from "@/hooks/useProgress"
import { useTenant } from "@/hooks/useTenant"

type ContentCardProps = {
  item: ContentItem
  variant?: "row" | "grid"
}

const typeIcons: Record<ContentItem["type"], typeof Play> = {
  video: Play,
  article: BookOpen,
  guide: FileText,
}

const typeLabels: Record<ContentItem["type"], string> = {
  video: "Video",
  article: "Article",
  guide: "Guide",
}

function getHref(item: ContentItem): string {
  if (item.type === "video") return `/watch/${item.slug}`
  return `/read/${item.slug}`
}

export function ContentCard({ item, variant = "row" }: ContentCardProps) {
  const { getWatchProgress } = useProgress()
  const tenant = useTenant()
  const progress = getWatchProgress(item.id)
  const Icon = typeIcons[item.type]
  const isLight = tenant.theme.mode === "light"

  const duration = item.durationMinutes
    ? `${item.durationMinutes} min`
    : item.readTimeMinutes
      ? `${item.readTimeMinutes} min read`
      : ""

  return (
    <Link
      href={getHref(item)}
      className="group relative flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        width: variant === "row" ? "var(--card-width)" : "100%",
        transition: "var(--card-transition)",
      }}
      aria-label={`${typeLabels[item.type]}: ${item.title}`}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video overflow-hidden"
        style={{ borderRadius: "var(--card-radius)" }}
      >
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={variant === "row" ? "(max-width:640px) 45vw, (max-width:1024px) 25vw, 20vw" : "(max-width:640px) 50vw, 33vw"}
        />

        {/* Play / type indicator overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: "rgba(0,0,0,0.35)",
            borderRadius: "var(--card-radius)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-brand)" }}
          >
            <Icon className="h-5 w-5 text-white" fill={item.type === "video" ? "currentColor" : "none"} />
          </div>
        </div>

        {/* Duration pill */}
        {duration && (
          <span
            className="absolute bottom-2 right-2 text-[11px] font-medium text-white px-2 py-0.5"
            style={{
              backgroundColor: "rgba(0,0,0,0.65)",
              borderRadius: "var(--button-radius)",
              backdropFilter: "blur(4px)",
            }}
          >
            {duration}
          </span>
        )}

        {/* Premium badge */}
        {item.isPremium && (
          <span
            className="absolute top-2 left-2 text-[10px] font-bold text-black px-2 py-0.5 bg-yellow-400"
            style={{ borderRadius: "var(--button-radius)" }}
          >
            PREMIUM
          </span>
        )}

        {/* Progress bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--color-brand)",
              }}
            />
          </div>
        )}
      </div>

      {/* Meta below thumbnail */}
      <div className="mt-2.5 px-0.5">
        <p
          className="text-[14px] font-semibold leading-snug line-clamp-2"
          style={{ color: "var(--hub-text)" }}
        >
          {item.title}
        </p>
        <p
          className="text-[12px] mt-1 leading-tight"
          style={{ color: "var(--hub-text-muted)" }}
        >
          {typeLabels[item.type]}
          {duration ? ` · ${duration}` : ""}
        </p>
      </div>
    </Link>
  )
}
