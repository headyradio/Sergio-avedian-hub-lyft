"use client"

import Link from "next/link"
import {
  Layers,
  Play,
  BookOpen,
  FileText,
  Search as SearchIcon,
} from "lucide-react"
import { SearchBar } from "@/components/SearchBar"
import { PillFilterBar } from "@/components/PillFilterBar"
import { EditorialCard } from "@/components/EditorialCard"
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight"
import { useSearch } from "@/hooks/useSearch"
import { topics } from "@/data/topics"
import { getFeaturedContent } from "@/data/content"

const typeOptions = [
  { value: "all", label: "All", icon: Layers },
  { value: "video", label: "Videos", icon: Play },
  { value: "article", label: "Articles", icon: BookOpen },
  { value: "guide", label: "Guides", icon: FileText },
]

export default function SearchPage() {
  const {
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    topicFilter,
    setTopicFilter,
    results,
  } = useSearch()

  const topicOptions = [
    { value: "all", label: "All topics" },
    ...topics.map((t) => ({ value: t.slug, label: t.name })),
  ]

  const activeFilterCount =
    (typeFilter !== "all" ? 1 : 0) +
    (topicFilter !== "all" ? 1 : 0)

  const hasQuery = query.trim().length > 0
  const hasFilters = activeFilterCount > 0
  const isBrowseMode = !hasQuery && !hasFilters

  const featured = getFeaturedContent()
  const featuredPick = featured[0] ?? null

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Editorial header */}
      <section className="px-4 md:px-12 pt-10 md:pt-14 pb-6">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] px-3 py-1"
            style={{
              backgroundColor: "var(--hub-surface-2)",
              color: "var(--hub-text-muted)",
              borderRadius: "999px",
            }}
          >
            <SearchIcon className="h-3 w-3" />
            Library
          </span>
        </div>
        <h1
          className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] mb-3 max-w-3xl"
          style={{ color: "var(--hub-text)" }}
        >
          Browse the full library.
        </h1>
        <p
          className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl"
          style={{ color: "var(--hub-text-muted)" }}
        >
          Every video, article, and guide — filtered, sorted, and searchable.
          Find exactly what you need, whether you've got five minutes or an
          afternoon.
        </p>
      </section>

      {/* Search bar */}
      <section className="px-4 md:px-12 pb-6">
        <div className="max-w-3xl">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search taxes, savings, investing, and more..."
          />
        </div>
      </section>

      {/* Popular topics (shown in browse mode) */}
      {isBrowseMode && (
        <section className="px-4 md:px-12 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--hub-text-muted)" }}
            >
              Popular topics
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.slice(0, 8).map((t) => (
              <Link
                key={t.slug}
                href={`/topic/${t.slug}`}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  borderRadius: "var(--button-radius)",
                  backgroundColor: "var(--hub-surface-2)",
                  color: "var(--hub-text)",
                  border: "1px solid var(--hub-border)",
                }}
              >
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured spotlight — only shown in browse mode */}
      {isBrowseMode && featuredPick && (
        <section className="px-4 md:px-12 mt-8 md:mt-10">
          <h2
            className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.16em] mb-4"
            style={{ color: "var(--hub-text-muted)" }}
          >
            This week's feature
          </h2>
          <FeaturedSpotlight item={featuredPick} eyebrow="Featured" />
        </section>
      )}

      {/* Filter bars */}
      <section className="px-4 md:px-12 mt-10 md:mt-14">
        <div className="flex flex-col gap-3 mb-6 pb-6" style={{ borderBottom: "1px solid var(--hub-border)" }}>
          <PillFilterBar
            options={typeOptions}
            value={typeFilter}
            onChange={(v) => setTypeFilter(v as typeof typeFilter)}
            label="Filter by type"
          />
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span
              className="text-[11px] font-bold uppercase tracking-wider flex-shrink-0"
              style={{ color: "var(--hub-text-faint)", letterSpacing: "0.1em" }}
            >
              Topic
            </span>
            <PillFilterBar
              options={topicOptions}
              value={topicFilter}
              onChange={setTopicFilter}
              label="Filter by topic"
            />
          </div>
        </div>

        {/* Result header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl md:text-2xl font-bold"
            style={{ color: "var(--hub-text)" }}
          >
            {hasQuery ? (
              <>
                <span style={{ color: "var(--color-brand)" }}>{results.length}</span>{" "}
                {results.length === 1 ? "result" : "results"} for{" "}
                <span style={{ color: "var(--hub-text-muted)", fontWeight: 400 }}>
                  "{query}"
                </span>
              </>
            ) : hasFilters ? (
              <>
                {results.length} {results.length === 1 ? "lesson" : "lessons"}
              </>
            ) : (
              "All content"
            )}
          </h2>
          {hasFilters && (
            <button
              onClick={() => {
                setTypeFilter("all")
                setTopicFilter("all")
              }}
              className="text-[13px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: "var(--color-brand)" }}
            >
              Clear filters ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Results grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {results.map((item) => (
              <EditorialCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div
            className="py-16 md:py-20 px-6 text-center"
            style={{
              backgroundColor: "var(--hub-surface)",
              border: "1px solid var(--hub-border)",
              borderRadius: "var(--card-radius)",
            }}
          >
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ backgroundColor: "var(--hub-surface-2)" }}
            >
              <SearchIcon
                className="h-5 w-5"
                style={{ color: "var(--hub-text-muted)" }}
              />
            </div>
            <p
              className="text-[15px] font-semibold mb-1"
              style={{ color: "var(--hub-text)" }}
            >
              No content matches your search.
            </p>
            <p
              className="text-[13px] mb-5"
              style={{ color: "var(--hub-text-muted)" }}
            >
              Try a different keyword or clear a filter.
            </p>
            <button
              onClick={() => {
                setQuery("")
                setTypeFilter("all")
                setTopicFilter("all")
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-110"
              style={{
                backgroundColor: "var(--color-brand)",
                borderRadius: "var(--button-radius)",
              }}
            >
              Reset everything
            </button>
          </div>
        )}
      </section>

      <div className="pb-8" />
    </div>
  )
}
