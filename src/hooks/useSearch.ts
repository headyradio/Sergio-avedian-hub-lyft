"use client"

import { useState, useMemo } from "react"
import { contentItems, type ContentItem } from "@/data/content"

export function useSearch() {
  const [query, setQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<ContentItem["type"] | "all">("all")
  const [difficultyFilter, setDifficultyFilter] = useState<ContentItem["difficulty"] | "all">("all")
  const [topicFilter, setTopicFilter] = useState<string>("all")

  const results = useMemo(() => {
    let items = contentItems

    if (query.trim()) {
      const q = query.toLowerCase()
      items = items.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (typeFilter !== "all") {
      items = items.filter((c) => c.type === typeFilter)
    }

    if (difficultyFilter !== "all") {
      items = items.filter((c) => c.difficulty === difficultyFilter)
    }

    if (topicFilter !== "all") {
      items = items.filter((c) => c.topicSlugs.includes(topicFilter))
    }

    return items
  }, [query, typeFilter, difficultyFilter, topicFilter])

  return {
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    difficultyFilter,
    setDifficultyFilter,
    topicFilter,
    setTopicFilter,
    results,
  }
}
