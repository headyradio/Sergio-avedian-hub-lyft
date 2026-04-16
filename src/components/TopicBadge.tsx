import { getTopicBySlug } from "@/data/topics"

type TopicBadgeProps = {
  topicSlug: string
  size?: "sm" | "md"
}

export function TopicBadge({ topicSlug, size = "sm" }: TopicBadgeProps) {
  const topic = getTopicBySlug(topicSlug)
  if (!topic) return null

  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-2.5 py-0.5"
      : "text-[11px] px-3 py-1"

  return (
    <span
      className={`${sizeClasses} font-semibold inline-block`}
      style={{
        borderRadius: "var(--button-radius)",
        backgroundColor: "var(--color-brand)",
        color: "#fff",
      }}
    >
      {topic.name}
    </span>
  )
}
