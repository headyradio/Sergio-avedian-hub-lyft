"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, BookOpen, FileText, ArrowRight, Clock } from "lucide-react"
import type { ContentItem } from "@/data/content"

type EditorialCardProps = {
  item: ContentItem
}

const typeConfig = {
  video: { icon: Play, label: "Video", cta: "Watch" },
  article: { icon: BookOpen, label: "Article", cta: "Read" },
  guide: { icon: FileText, label: "Guide", cta: "Read" },
}

function getHref(item: ContentItem): string {
  if (item.type === "video") return `/watch/${item.slug}`
  return `/read/${item.slug}`
}

export function EditorialCard({ item }: EditorialCardProps) {
  const config = typeConfig[item.type]
  const Icon = config.icon
  const href = getHref(item)
  const duration = item.durationMinutes
    ? `${item.durationMinutes} min`
    : item.readTimeMinutes
      ? `${item.readTimeMinutes} min read`
      : ""

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{
        borderRadius: "var(--card-radius)",
        backgroundColor: "var(--hub-surface)",
        border: "1px solid var(--hub-border)",
      }}
      aria-label={`${config.label}: ${item.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={item.thumbnailUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark wash on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
          aria-hidden="true"
        />

        {/* Video play button */}
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              style={{
                backgroundColor: "var(--color-brand)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
              }}
            >
              <Play className="h-5 w-5 md:h-6 md:w-6 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Type badge — top-left */}
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5"
          style={{
            backgroundColor: "rgba(0,0,0,0.75)",
            color: "#FFFFFF",
            borderRadius: "var(--button-radius)",
            backdropFilter: "blur(6px)",
            letterSpacing: "0.08em",
          }}
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </span>

        {/* Premium */}
        {item.isPremium && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5"
            style={{
              backgroundColor: "#FFD700",
              color: "#111",
              borderRadius: "var(--button-radius)",
            }}
          >
            PRO
          </span>
        )}

        {/* Duration — bottom-right */}
        {duration && !item.isPremium && (
          <span
            className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold text-white px-2 py-0.5"
            style={{
              backgroundColor: "rgba(0,0,0,0.72)",
              borderRadius: "var(--button-radius)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Clock className="h-3 w-3" />
            {duration}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-5 flex flex-col">
        <h3
          className="text-[15px] md:text-[17px] font-bold leading-snug mb-2 line-clamp-2"
          style={{ color: "var(--hub-text)" }}
        >
          {item.title}
        </h3>
        <p
          className="text-[13px] leading-relaxed line-clamp-2 mb-4 flex-1"
          style={{ color: "var(--hub-text-muted)" }}
        >
          {item.description}
        </p>
        <div
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-transform duration-200 group-hover:gap-2.5"
          style={{ color: "var(--color-brand)" }}
        >
          {config.cta} {item.type === "video" ? "now" : "article"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
