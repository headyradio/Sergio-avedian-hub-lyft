"use client"

import { Lightbulb, AlertTriangle, Sparkles, Quote } from "lucide-react"
import type { ArticleBody as ArticleBodyType, ArticleBlock } from "@/data/content"

type ArticleBodyProps = {
  body: ArticleBodyType
}

export function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="article-body">
      {body.dek && (
        <p
          className="text-[17px] md:text-[19px] leading-[1.55] mb-8 font-medium"
          style={{ color: "var(--hub-text-muted)" }}
        >
          {body.dek}
        </p>
      )}

      <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.7]">
        {body.blocks.map((block, idx) => (
          <BlockRenderer key={idx} block={block} />
        ))}
      </div>

      {body.takeaways && body.takeaways.length > 0 && (
        <aside
          className="mt-12 p-6 md:p-7"
          style={{
            backgroundColor: "var(--hub-surface)",
            border: "1px solid var(--hub-border)",
            borderRadius: "var(--card-radius)",
            borderLeft: "4px solid var(--color-brand)",
          }}
          aria-label="Key takeaways"
        >
          <h3
            className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: "var(--color-brand)" }}
          >
            Key Takeaways
          </h3>
          <ul className="space-y-2 text-[15px] md:text-[16px] leading-relaxed">
            {body.takeaways.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{ color: "var(--hub-text)" }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mt-[10px] flex-shrink-0"
                  style={{ backgroundColor: "var(--color-brand)" }}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  )
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p style={{ color: "var(--hub-text)" }}>{block.text}</p>
      )

    case "h2":
      return (
        <h2
          className="text-[22px] md:text-[26px] font-bold leading-tight pt-6 pb-1"
          style={{ color: "var(--hub-text)" }}
        >
          {block.text}
        </h2>
      )

    case "h3":
      return (
        <h3
          className="text-[18px] md:text-[20px] font-bold leading-tight pt-4 pb-0"
          style={{ color: "var(--hub-text)" }}
        >
          {block.text}
        </h3>
      )

    case "ul":
      return (
        <ul className="space-y-2 pl-1 list-none">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: "var(--hub-text)" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mt-[10px] flex-shrink-0"
                style={{ backgroundColor: "var(--color-brand)" }}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case "ol":
      return (
        <ol className="space-y-2 pl-1 list-none">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: "var(--hub-text)" }}
            >
              <span
                className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-bold mt-0.5"
                style={{
                  backgroundColor: "var(--color-brand)",
                  color: "#FFFFFF",
                }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )

    case "callout": {
      const variantConfig = {
        tip: {
          icon: Lightbulb,
          border: "#16A34A",
          bg: "rgba(22,163,74,0.08)",
          label: "Tip",
        },
        warning: {
          icon: AlertTriangle,
          border: "#EAB308",
          bg: "rgba(234,179,8,0.10)",
          label: "Warning",
        },
        insight: {
          icon: Sparkles,
          border: "var(--color-brand)",
          bg: "rgba(229,9,20,0.06)",
          label: "Insight",
        },
      } as const
      const cfg = variantConfig[block.variant]
      const Icon = cfg.icon
      return (
        <aside
          className="my-6 p-5 md:p-6 flex gap-4"
          style={{
            backgroundColor: cfg.bg,
            borderLeft: `4px solid ${cfg.border}`,
            borderRadius: "var(--card-radius)",
          }}
        >
          <Icon
            className="h-5 w-5 flex-shrink-0 mt-0.5"
            style={{ color: cfg.border }}
            aria-hidden="true"
          />
          <div className="flex-1">
            {block.title && (
              <p
                className="text-[14px] md:text-[15px] font-bold mb-1"
                style={{ color: "var(--hub-text)" }}
              >
                {block.title}
              </p>
            )}
            <p
              className="text-[14px] md:text-[15px] leading-relaxed"
              style={{ color: "var(--hub-text)" }}
            >
              {block.text}
            </p>
          </div>
        </aside>
      )
    }

    case "quote":
      return (
        <blockquote
          className="my-6 pl-6 py-2"
          style={{
            borderLeft: "3px solid var(--color-brand)",
          }}
        >
          <Quote
            className="h-4 w-4 mb-2"
            style={{ color: "var(--color-brand)" }}
            aria-hidden="true"
          />
          <p
            className="text-[18px] md:text-[20px] leading-relaxed font-medium italic"
            style={{ color: "var(--hub-text)" }}
          >
            {block.text}
          </p>
          {block.attribution && (
            <footer
              className="mt-2 text-[13px]"
              style={{ color: "var(--hub-text-muted)" }}
            >
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      )

    default:
      return null
  }
}
