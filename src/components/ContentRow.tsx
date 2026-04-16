"use client"

import { useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ContentCard } from "./ContentCard"
import type { ContentItem } from "@/data/content"
import { useTenant } from "@/hooks/useTenant"

type ContentRowProps = {
  title: string
  items: ContentItem[]
  seeAllHref?: string
}

export function ContentRow({ title, items, seeAllHref }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const tenant = useTenant()
  const isLight = tenant.theme.mode === "light"

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }, [])

  if (items.length === 0) return null

  return (
    <section className="relative py-5 md:py-8" aria-label={title}>
      {/* Row header */}
      <div className="flex items-center justify-between px-4 md:px-12 mb-4">
        <h2
          className="text-lg md:text-xl font-bold"
          style={{ color: "var(--hub-text)" }}
        >
          {title}
        </h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-[13px] font-semibold transition-colors hover:opacity-80"
            style={{ color: "var(--color-brand)" }}
          >
            See all
          </Link>
        )}
      </div>

      {/* Scrollable row */}
      <div className="relative group/row">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-[25%] z-10 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-lg"
            style={{
              backgroundColor: isLight ? "#fff" : "rgba(40,40,40,0.95)",
              color: "var(--hub-text)",
              border: isLight ? "1px solid rgba(0,0,0,0.08)" : "none",
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 md:gap-5 px-4 md:px-12 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
          role="list"
        >
          {items.map((item) => (
            <div key={item.id} style={{ scrollSnapAlign: "start" }} role="listitem">
              <ContentCard item={item} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-[25%] z-10 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-lg"
            style={{
              backgroundColor: isLight ? "#fff" : "rgba(40,40,40,0.95)",
              color: "var(--hub-text)",
              border: isLight ? "1px solid rgba(0,0,0,0.08)" : "none",
            }}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </section>
  )
}
