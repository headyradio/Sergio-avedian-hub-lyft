"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, BookOpen, FileText, ArrowRight, Clock } from "lucide-react"
import type { ContentItem } from "@/data/content"

type FeaturedSpotlightProps = {
  item: ContentItem
  eyebrow?: string
}

const typeConfig = {
  video: { icon: Play, label: "Video", cta: "Watch now" },
  article: { icon: BookOpen, label: "Article", cta: "Read article" },
  guide: { icon: FileText, label: "Guide", cta: "Read the guide" },
}

function getHref(item: ContentItem): string {
  if (item.type === "video") return `/watch/${item.slug}`
  return `/read/${item.slug}`
}

export function FeaturedSpotlight({ item, eyebrow = "Editor's Pick" }: FeaturedSpotlightProps) {
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
      className="group block overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        borderRadius: "var(--card-radius)",
        backgroundColor: "var(--hub-surface)",
        border: "1px solid var(--hub-border)",
      }}
      aria-label={`${config.label}: ${item.title}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Image — left on desktop, top on mobile */}
        <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-3 overflow-hidden">
          <Image
            src={item.thumbnailUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          {/* Play-button overlay for videos */}
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: "var(--color-brand)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <Play className="h-7 w-7 md:h-9 md:w-9 text-white ml-1" fill="currentColor" />
              </div>
            </div>
          )}
          {/* Duration pill */}
          {duration && (
            <span
              className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] md:text-[12px] font-semibold text-white px-2.5 py-1"
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

        {/* Content — right on desktop, bottom on mobile */}
        <div className="lg:col-span-2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          {/* Eyebrow + type */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded"
              style={{
                backgroundColor: "var(--color-brand)",
                color: "#FFFFFF",
              }}
            >
              {eyebrow}
            </span>
            <span
              className="inline-flex items-center gap-1 text-[11px] md:text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--hub-text-muted)", letterSpacing: "0.08em" }}
            >
              <Icon className="h-3.5 w-3.5" />
              {config.label}
            </span>
          </div>

          <h2
            className="text-2xl md:text-3xl lg:text-[2.25rem] font-bold leading-[1.15] mb-4"
            style={{ color: "var(--hub-text)" }}
          >
            {item.title}
          </h2>
          <p
            className="text-[14px] md:text-[15px] leading-relaxed mb-6 line-clamp-4"
            style={{ color: "var(--hub-text-muted)" }}
          >
            {item.description}
          </p>

          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all group-hover:brightness-110"
              style={{
                backgroundColor: "var(--color-brand)",
                borderRadius: "var(--button-radius)",
              }}
            >
              <Icon
                className="h-4 w-4"
                fill={item.type === "video" ? "currentColor" : "none"}
              />
              {config.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
