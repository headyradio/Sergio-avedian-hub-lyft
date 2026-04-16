"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  Play,
  BookOpen,
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { EditorialCard } from "@/components/EditorialCard"
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight"
import { PillFilterBar } from "@/components/PillFilterBar"
import { TopicCard } from "@/components/TopicCard"
import { getTopicBySlug, topics } from "@/data/topics"
import { getContentByTopic } from "@/data/content"

export default function TopicPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const topic = getTopicBySlug(slug)
  const allItems = useMemo(() => getContentByTopic(slug), [slug])

  const [typeFilter, setTypeFilter] = useState("all")

  // Counts per type
  const counts = useMemo(() => {
    const videos = allItems.filter((c) => c.type === "video").length
    const articles = allItems.filter((c) => c.type === "article").length
    const guides = allItems.filter((c) => c.type === "guide").length
    return { all: allItems.length, video: videos, article: articles, guide: guides }
  }, [allItems])

  const typeOptions = useMemo(
    () => [
      { value: "all", label: "All", icon: Layers, count: counts.all },
      { value: "video", label: "Videos", icon: Play, count: counts.video },
      { value: "article", label: "Articles", icon: BookOpen, count: counts.article },
      { value: "guide", label: "Guides", icon: FileText, count: counts.guide },
    ],
    [counts]
  )

  // Featured item = first flagged as featured, falling back to newest
  const featuredItem = useMemo(() => {
    return allItems.find((c) => c.isFeatured) ?? allItems[0]
  }, [allItems])

  // Only spotlight the featured item when it matches the current type filter
  const showSpotlight =
    featuredItem &&
    (typeFilter === "all" || featuredItem.type === typeFilter)

  const filteredItems = useMemo(() => {
    let items = allItems
    if (showSpotlight) {
      items = items.filter((c) => c.id !== featuredItem.id)
    }
    if (typeFilter !== "all") {
      items = items.filter((c) => c.type === typeFilter)
    }
    // Always sort by newest — difficulty-based sorting removed
    items = [...items].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    return items
  }, [allItems, typeFilter, featuredItem, showSpotlight])

  // Related topics — exclude current, pick up to 4
  const relatedTopics = useMemo(
    () => topics.filter((t) => t.slug !== slug).slice(0, 4),
    [slug]
  )

  if (!topic) {
    return (
      <div className="px-4 md:px-12 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4" style={{ color: "var(--hub-text)" }}>
          Topic not found
        </h1>
        <Link href="/" className="text-sm" style={{ color: "var(--color-brand)" }}>
          Back to Hub
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Back link */}
      <div className="px-4 md:px-12 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[13px] font-medium transition-colors hover:opacity-70"
          style={{ color: "var(--hub-text-muted)" }}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Hub
        </Link>
      </div>

      {/* Editorial hero */}
      <section
        className="relative mx-4 md:mx-12 mt-6 overflow-hidden"
        style={{
          borderRadius: "var(--card-radius)",
          minHeight: "clamp(260px, 40vh, 420px)",
        }}
        aria-label={`${topic.name} topic hero`}
      >
        <Image
          src={topic.coverImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Readability gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        <div className="relative z-[2] p-6 md:p-12 lg:p-16 flex flex-col justify-end min-h-[inherit]">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] px-3 py-1"
              style={{
                backgroundColor: "var(--color-brand)",
                color: "#FFFFFF",
                borderRadius: "999px",
              }}
            >
              <Sparkles className="h-3 w-3" />
              Topic
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] mb-3 md:mb-5 max-w-3xl"
            style={{
              color: "#FFFFFF",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            {topic.name}
          </h1>
          <p
            className="text-[14px] md:text-[17px] lg:text-[18px] leading-relaxed max-w-2xl"
            style={{
              color: "rgba(255,255,255,0.88)",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            {topic.description}
          </p>
        </div>
      </section>

      {/* Editor's Pick — featured spotlight */}
      {showSpotlight && featuredItem && (
        <section className="px-4 md:px-12 mt-10 md:mt-14" aria-label="Editor's pick">
          <h2
            className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.16em] mb-4"
            style={{ color: "var(--hub-text-muted)" }}
          >
            Editor's Pick
          </h2>
          <FeaturedSpotlight item={featuredItem} eyebrow="Start here" />
        </section>
      )}

      {/* Filters */}
      <section className="px-4 md:px-12 mt-10 md:mt-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2
            className="text-xl md:text-2xl font-bold"
            style={{ color: "var(--hub-text)" }}
          >
            All {topic.name} content
          </h2>
          <PillFilterBar
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
            label="Filter by type"
          />
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredItems.map((item) => (
              <EditorialCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div
            className="py-16 md:py-20 text-center rounded-lg"
            style={{
              backgroundColor: "var(--hub-surface)",
              border: "1px solid var(--hub-border)",
              borderRadius: "var(--card-radius)",
            }}
          >
            <p className="text-sm mb-2" style={{ color: "var(--hub-text)" }}>
              No content matches your filter.
            </p>
            <button
              onClick={() => setTypeFilter("all")}
              className="text-[13px] font-semibold"
              style={{ color: "var(--color-brand)" }}
            >
              Show all
            </button>
          </div>
        )}
      </section>

      {/* Related topics */}
      {relatedTopics.length > 0 && (
        <section className="px-4 md:px-12 mt-14 md:mt-20 mb-8" aria-label="Continue exploring">
          <div className="flex items-end justify-between mb-5 md:mb-6">
            <div>
              <h2
                className="text-lg md:text-xl font-bold mb-1"
                style={{ color: "var(--hub-text)" }}
              >
                Continue exploring
              </h2>
              <p className="text-[13px]" style={{ color: "var(--hub-text-muted)" }}>
                Related topics to deepen your financial toolkit.
              </p>
            </div>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 text-[13px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: "var(--color-brand)" }}
            >
              All topics
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {relatedTopics.map((t) => (
              <TopicCard key={t.slug} topic={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
