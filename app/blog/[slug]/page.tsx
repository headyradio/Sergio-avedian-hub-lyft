"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Clock, Share2, User, ArrowRight } from "lucide-react"
import { ArticleBody } from "@/components/ArticleBody"
import { blogArticles } from "@/data/blog"

export default function BlogArticlePage() {
  const params = useParams<{ slug: string }>()
  const article = useMemo(
    () => blogArticles.find((a) => a.slug === params.slug),
    [params.slug]
  )

  const moreArticles = useMemo(() => {
    if (!article) return []
    return blogArticles
      .filter((a) => a.slug !== article.slug)
      .slice(0, 3)
  }, [article])

  if (!article) {
    return (
      <div className="px-4 md:px-12 py-20 text-center">
        <h1
          className="text-2xl font-semibold mb-4"
          style={{ color: "var(--hub-text)" }}
        >
          Article not found
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
              Blog
            </span>
            <span
              className="inline-flex items-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--color-brand)" }}
            >
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-[2.5rem] lg:text-[3rem] font-bold leading-[1.1] mb-5"
            style={{ color: "var(--hub-text)" }}
          >
            {article.title}
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
                By {article.author}
              </span>
            </span>
            <span aria-hidden>·</span>
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTimeMinutes} min read
            </span>
            <button
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-70"
              aria-label="Share this article"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator.share({
                    title: article.title,
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
              src={article.coverImage}
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
          <ArticleBody body={article.body} />
        </div>
      </article>

      {/* More from the blog */}
      {moreArticles.length > 0 && (
        <section
          className="px-4 md:px-12 py-10 md:py-14"
          style={{
            backgroundColor: "var(--hub-surface)",
            borderTop: "1px solid var(--hub-border)",
          }}
          aria-label="More from the blog"
        >
          <div className="max-w-[1100px] mx-auto">
            <h2
              className="text-xl md:text-2xl font-bold mb-6"
              style={{ color: "var(--hub-text)" }}
            >
              More from the blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {moreArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    borderRadius: "var(--card-radius)",
                    backgroundColor: "var(--hub-bg)",
                    border: "1px solid var(--hub-border)",
                  }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={a.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-[0.1em] mb-2"
                      style={{ color: "var(--color-brand)" }}
                    >
                      {a.category}
                    </span>
                    <h3
                      className="text-[15px] md:text-[17px] font-bold leading-snug mb-2"
                      style={{ color: "var(--hub-text)" }}
                    >
                      {a.title}
                    </h3>
                    <p
                      className="text-[13px] leading-relaxed line-clamp-2 mb-3 flex-1"
                      style={{ color: "var(--hub-text-muted)" }}
                    >
                      {a.excerpt}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-[13px] font-semibold"
                      style={{ color: "var(--color-brand)" }}
                    >
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
