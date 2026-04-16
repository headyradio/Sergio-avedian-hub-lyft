"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Clock, User, Share2 } from "lucide-react"
import { VideoPlayer } from "@/components/VideoPlayer"
import { EditorialCard } from "@/components/EditorialCard"
import { TopicBadge } from "@/components/TopicBadge"
import { getContentBySlug, getContentByTopic } from "@/data/content"

export default function WatchPage() {
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
          Content not found
        </h1>
        <Link href="/" className="text-sm" style={{ color: "var(--color-brand)" }}>
          Back to Hub
        </Link>
      </div>
    )
  }

  const author = item.author ?? "Sergio Avedian"

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

      {/* Video player */}
      <div className="px-4 md:px-12 pt-6">
        <div className="max-w-[1100px] mx-auto">
          <VideoPlayer
            contentId={item.id}
            videoUrl={item.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title={item.title}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="px-4 md:px-12 mt-8 md:mt-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="inline-flex items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] px-2.5 py-1"
              style={{
                backgroundColor: "var(--color-brand)",
                color: "#FFFFFF",
                borderRadius: "999px",
              }}
            >
              Video
            </span>
            {item.topicSlugs.slice(0, 2).map((slug) => (
              <TopicBadge key={slug} topicSlug={slug} size="md" />
            ))}
          </div>

          <h1
            className="text-2xl md:text-[2.25rem] lg:text-[2.5rem] font-bold leading-[1.15] mb-5"
            style={{ color: "var(--hub-text)" }}
          >
            {item.title}
          </h1>

          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-6 mb-6 text-[13px] md:text-[14px]"
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
                {author}
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
            {item.durationMinutes && (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {item.durationMinutes} min
                </span>
              </>
            )}
            <button
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-70"
              aria-label="Share this video"
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

          <p
            className="text-[16px] md:text-[17px] leading-relaxed max-w-[720px]"
            style={{ color: "var(--hub-text)" }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* More like this */}
      {moreLikeThis.length > 0 && (
        <section
          className="px-4 md:px-12 mt-12 md:mt-16 py-10 md:py-14"
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
              Keep watching
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
