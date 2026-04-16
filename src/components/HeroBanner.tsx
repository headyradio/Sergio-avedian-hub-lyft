"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Plus } from "lucide-react"
import { useTenant } from "@/hooks/useTenant"
import { TopicBadge } from "./TopicBadge"
import { DifficultyBadge } from "./DifficultyBadge"
import type { ContentItem } from "@/data/content"

type HeroBannerProps = {
  item: ContentItem
}

function getHref(item: ContentItem): string {
  if (item.type === "video") return `/watch/${item.slug}`
  return `/read/${item.slug}`
}

export function HeroBanner({ item }: HeroBannerProps) {
  const tenant = useTenant()
  const isLight = tenant.theme.mode === "light"

  if (isLight) {
    return (
      <section className="px-4 md:px-12 pt-8 pb-4" aria-label="Featured content">
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: "var(--card-radius)" }}
        >
          {/* Background image */}
          <div className="relative aspect-[21/9] md:aspect-[3/1]">
            <Image
              src={item.thumbnailUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark gradient for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)",
              }}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                {item.topicSlugs.slice(0, 2).map((slug) => (
                  <TopicBadge key={slug} topicSlug={slug} size="md" />
                ))}
                <DifficultyBadge difficulty={item.difficulty} variant="dark" />
              </div>

              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                {item.title}
              </h1>

              <p className="text-sm text-white/70 leading-relaxed mb-1 line-clamp-2 hidden md:block">
                {item.description}
              </p>

              <p className="text-xs text-white/50 mb-5">
                {tenant.heroTagline}
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href={getHref(item)}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{
                    backgroundColor: "var(--color-brand)",
                    borderRadius: "var(--button-radius)",
                  }}
                >
                  <Play className="h-4 w-4" fill="currentColor" />
                  {item.type === "video" ? "Watch Now" : "Read Now"}
                </Link>
                <button
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
                  style={{ borderRadius: "var(--button-radius)" }}
                  aria-label={`Add ${item.title} to my list`}
                >
                  <Plus className="h-4 w-4" />
                  My List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Dark mode hero (Netflix style)
  return (
    <section
      className="relative w-full"
      style={{ height: "clamp(420px, 56vh, 620px)" }}
      aria-label="Featured content"
    >
      <Image src={item.thumbnailUrl} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--hub-bg) 30%, rgba(15,15,15,0.7) 60%, transparent)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--hub-bg) 0%, transparent 50%)" }} />
      <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-12 pb-10 md:pb-14 max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          {item.topicSlugs.slice(0, 2).map((slug) => (
            <TopicBadge key={slug} topicSlug={slug} size="md" />
          ))}
          <DifficultyBadge difficulty={item.difficulty} />
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3" style={{ color: "var(--hub-text)" }}>{item.title}</h1>
        <p className="text-sm md:text-base leading-relaxed mb-2 line-clamp-3" style={{ color: "var(--hub-text-muted)" }}>{item.description}</p>
        <p className="text-xs mb-5" style={{ color: "var(--hub-text-faint)" }}>{tenant.heroTagline}</p>
        <div className="flex items-center gap-3">
          <Link href={getHref(item)} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110" style={{ backgroundColor: "var(--color-brand)", borderRadius: "var(--button-radius)" }}>
            <Play className="h-4 w-4" fill="currentColor" />
            {item.type === "video" ? "Watch Now" : "Read Now"}
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors" style={{ borderRadius: "var(--button-radius)" }} aria-label={`Add ${item.title} to my list`}>
            <Plus className="h-4 w-4" />
            My List
          </button>
        </div>
      </div>
    </section>
  )
}
