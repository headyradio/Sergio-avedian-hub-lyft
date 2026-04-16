"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogArticle } from "@/data/blog"

type BlogSectionProps = {
  articles: BlogArticle[]
  title?: string
  subtitle?: string
}

export function BlogSection({
  articles,
  title = "Driver Wellness Blog",
  subtitle = "Mind, body, and money — the three things a long shift burns through.",
}: BlogSectionProps) {
  if (articles.length === 0) return null

  const [hero, ...rest] = articles

  return (
    <section className="px-4 md:px-12 py-6 md:py-10" aria-label={title}>
      <div className="flex items-end justify-between mb-5 md:mb-6">
        <div>
          <h2
            className="text-lg md:text-xl font-bold"
            style={{ color: "var(--hub-text)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-[13px] md:text-sm mt-1"
              style={{ color: "var(--hub-text-muted)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1 text-[13px] font-semibold transition-opacity hover:opacity-80"
          style={{ color: "var(--color-brand)" }}
        >
          All articles
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Featured hero article */}
        {hero && (
          <Link
            href={`/blog/${hero.slug}`}
            className="group lg:col-span-2 lg:row-span-2 block overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              borderRadius: "var(--card-radius)",
              backgroundColor: "var(--hub-surface)",
              border: "1px solid var(--hub-border)",
            }}
          >
            <div className="relative aspect-[16/9] lg:aspect-[16/10] overflow-hidden">
              <Image
                src={hero.coverImage}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />
              <span
                className="absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--color-brand)",
                  color: "#fff",
                  letterSpacing: "0.08em",
                }}
              >
                {hero.category}
              </span>
            </div>
            <div className="p-5 md:p-6">
              <h3
                className="text-xl md:text-2xl font-bold leading-tight mb-2"
                style={{ color: "var(--hub-text)" }}
              >
                {hero.title}
              </h3>
              <p
                className="text-[14px] md:text-[15px] leading-relaxed line-clamp-2 md:line-clamp-3 mb-3"
                style={{ color: "var(--hub-text-muted)" }}
              >
                {hero.excerpt}
              </p>
              <BlogMeta article={hero} />
            </div>
          </Link>
        )}

        {/* Secondary articles — 2 stack next to hero, 3 fill the row below */}
        {rest.slice(0, 5).map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex gap-3 lg:block overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              borderRadius: "var(--card-radius)",
              backgroundColor: "var(--hub-surface)",
              border: "1px solid var(--hub-border)",
            }}
          >
            <div className="relative shrink-0 w-32 h-24 lg:w-full lg:h-auto lg:aspect-[16/9] overflow-hidden">
              <Image
                src={article.coverImage}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 128px, 33vw"
              />
            </div>
            <div className="py-3 pr-3 lg:p-4 flex-1 min-w-0">
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-wider mb-1.5"
                style={{
                  color: "var(--color-brand)",
                  letterSpacing: "0.08em",
                }}
              >
                {article.category}
              </span>
              <h3
                className="text-[14px] md:text-[15px] font-semibold leading-snug mb-1.5 line-clamp-2"
                style={{ color: "var(--hub-text)" }}
              >
                {article.title}
              </h3>
              <BlogMeta article={article} compact />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function BlogMeta({ article, compact = false }: { article: BlogArticle; compact?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 ${compact ? "text-[11px]" : "text-[12px] md:text-[13px]"}`}
      style={{ color: "var(--hub-text-faint)" }}
    >
      {!compact && <span className="font-medium">By {article.author}</span>}
      {!compact && <span aria-hidden="true">·</span>}
      <span className="inline-flex items-center gap-1">
        <Clock className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
        {article.readTimeMinutes} min read
      </span>
    </div>
  )
}
