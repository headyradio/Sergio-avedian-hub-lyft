"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import type { Topic } from "@/data/topics"
import { getContentByTopic } from "@/data/content"

type TopicCardProps = {
  topic: Topic
}

export function TopicCard({ topic }: TopicCardProps) {
  const itemCount = getContentByTopic(topic.slug).length

  return (
    <Link
      href={`/topic/${topic.slug}`}
      className="group relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ borderRadius: "var(--card-radius)" }}
      aria-label={`${topic.name} — ${topic.description}`}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ borderRadius: "var(--card-radius)" }}
      >
        <Image
          src={topic.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Bottom solid panel for guaranteed text contrast */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "62%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
          <h3
            className="text-[15px] md:text-[17px] font-bold leading-tight mb-1.5"
            style={{
              color: "#FFFFFF",
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
            }}
          >
            {topic.name}
          </h3>
          <p
            className="text-[12px] md:text-[13px] leading-snug line-clamp-2 mb-2.5"
            style={{
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            {topic.description}
          </p>

          {/* Bottom bar: count + arrow */}
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold"
              style={{
                color: "rgba(255,255,255,0.85)",
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              {itemCount} {itemCount === 1 ? "lesson" : "lessons"}
            </span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundColor: "var(--color-brand)" }}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
