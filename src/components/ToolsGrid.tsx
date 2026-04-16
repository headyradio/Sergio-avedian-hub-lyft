"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Tool } from "@/data/tools"

type ToolsGridProps = {
  tools: Tool[]
  title?: string
  subtitle?: string
}

export function ToolsGrid({
  tools,
  title = "Interactive Tools & Calculators",
  subtitle = "Built for rideshare drivers. Plug in your numbers, get real answers.",
}: ToolsGridProps) {
  if (tools.length === 0) return null

  return (
    <section className="px-4 md:px-12 py-6 md:py-10" aria-label={title}>
      <div className="mb-5 md:mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      className="group relative block overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        borderRadius: "var(--card-radius)",
        backgroundColor: "var(--hub-surface)",
        border: "1px solid var(--hub-border)",
      }}
      aria-label={`${tool.title} — coming soon`}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={tool.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient for tag readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
          }}
        />
        {/* Coming Soon pill */}
        {tool.comingSoon && (
          <span
            className="absolute top-3 left-3 inline-flex items-center text-[10px] md:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              color: "#111",
              letterSpacing: "0.08em",
            }}
          >
            Coming Soon
          </span>
        )}
        {/* Category tag */}
        <span
          className="absolute bottom-3 left-3 inline-flex items-center text-[10px] md:text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
          style={{
            backgroundColor: "var(--color-brand)",
            color: "#fff",
            letterSpacing: "0.06em",
          }}
        >
          {tool.category}
        </span>
      </div>

      {/* Content — title-first, description removed for bolder presentation */}
      <div className="p-5 md:p-6 flex items-center justify-between gap-3">
        <h3
          className="text-[20px] md:text-[22px] lg:text-[24px] font-bold leading-[1.15] tracking-tight"
          style={{ color: "var(--hub-text)" }}
        >
          {tool.title}
        </h3>
        <span
          className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 group-hover:translate-x-0.5"
          style={{
            backgroundColor: "var(--color-brand)",
            color: "#FFFFFF",
          }}
          aria-hidden="true"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  )
}
