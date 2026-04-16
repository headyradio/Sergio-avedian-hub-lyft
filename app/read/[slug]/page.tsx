"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Clock, Share2, User } from "lucide-react"
import { EditorialCard } from "@/components/EditorialCard"
import { ArticleBody } from "@/components/ArticleBody"
import { TopicBadge } from "@/components/TopicBadge"
import { getContentBySlug, getContentByTopic } from "@/data/content"

export default function ReadPage() {
  const params = useParams<{ slug: string }>()
  const item = getContentBySlug(params.slug)

  const moreLikeThis = useMemo(() => {
    if (!item) return []
    const primaryTopic = item.topicSlugs[0]
    return getContentByTopic(primaryTopic)
      .filter((c) => c.id !== item.id)
      .slice(0, 3)
  }, [item])

  if (!item) {
    return (
      <div className="px-4 md:px-12 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4" style={{ color: "var(--hub-text)" }}>
          Article not found
        </h1>
        <Link href="/" className="text-sm" style={{ color: "var(--color-brand)" }}>
          Back to Hub
        </Link>
      </div>
    )
  }

  const author = item.author ?? "Sergio Avedian"
  const contentTypeLabel = item.type === "guide" ? "Guide" : "Article"

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

      {/* Article header */}
      <article className="px-4 md:px-12 pt-8 md:pt-10">
        <div className="max-w-[780px] mx-auto">
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="inline-flex items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] px-2.5 py-1"
              style={{
                backgroundColor: "var(--color-brand)",
                color: "#FFFFFF",
                borderRadius: "999px",
              }}
            >
              {contentTypeLabel}
            </span>
            {item.topicSlugs.slice(0, 2).map((slug) => (
              <TopicBadge key={slug} topicSlug={slug} size="md" />
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.1] mb-5"
            style={{ color: "var(--hub-text)" }}
          >
            {item.title}
          </h1>

          {/* Byline + meta */}
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-6 md:pb-8 mb-8 text-[13px] md:text-[14px]"
            style={{
              color: "var(--hub-text-muted)",
              borderBottom: "1px solid var(--hub-border)",
            }}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                style={{ backgroundColor: "var(--hub-surface-2)" }}
              >
                <User className="h-3.5 w-3.5" />
              </span>
              <span className="font-semibold" style={{ color: "var(--hub-text)" }}>
                By {author}
              </span>
            </span>
            <span aria-hidden>·</span>
            <span>
              {new Date(item.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {item.readTimeMinutes && (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {item.readTimeMinutes} min read
                </span>
              </>
            )}
            <span aria-hidden className="ml-auto hidden md:inline">·</span>
            <button
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-70"
              aria-label="Share this article"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator.share({
                    title: item.title,
                    url: window.location.href,
                  })
                } else if (typeof navigator !== "undefined") {
                  navigator.clipboard?.writeText(window.location.href)
                }
              }}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>
        </div>

        {/* Cover image */}
        <div className="max-w-[1100px] mx-auto mb-10 md:mb-12">
          <div
            className="relative aspect-[16/9] overflow-hidden"
            style={{ borderRadius: "var(--card-radius)" }}
          >
            <Image
              src={item.thumbnailUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </div>

        {/* Body */}
        <div className="max-w-[780px] mx-auto pb-12 md:pb-16">
          {item.body ? (
            <ArticleBody body={item.body} />
          ) : (
            <div
              className="space-y-5 text-[16px] leading-relaxed"
              style={{ color: "var(--hub-text)" }}
            >
              <p style={{ color: "var(--hub-text-muted)" }}>{item.description}</p>
              <p>
                Full article content coming soon. This placeholder exists while
                we finalize the editorial calendar for this piece.
              </p>
            </div>
          )}
        </div>
      </article>

      {/* More like this */}
      {moreLikeThis.length > 0 && (
        <section
          className="px-4 md:px-12 py-10 md:py-14"
          style={{
            backgroundColor: "var(--hub-surface)",
            borderTop: "1px solid var(--hub-border)",
          }}
          aria-label="More like this"
        >
          <div className="max-w-[1100px] mx-auto">
            <h2
              className="text-xl md:text-2xl font-bold mb-6"
              style={{ color: "var(--hub-text)" }}
            >
              Keep reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {moreLikeThis.map((c) => (
                <EditorialCard key={c.id} item={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
