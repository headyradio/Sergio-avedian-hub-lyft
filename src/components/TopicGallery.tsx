"use client"

import type { Topic } from "@/data/topics"
import { TopicCard } from "./TopicCard"

type TopicGalleryProps = {
  topics: Topic[]
}

export function TopicGallery({ topics }: TopicGalleryProps) {
  if (topics.length === 0) return null

  return (
    <section className="px-4 md:px-12 py-6 md:py-10" aria-label="Browse by topic">
      <h2
        className="text-lg md:text-xl font-bold mb-5 md:mb-6"
        style={{ color: "var(--hub-text)" }}
      >
        Browse by Topic
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </section>
  )
}
