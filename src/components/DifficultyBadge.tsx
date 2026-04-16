type DifficultyBadgeProps = {
  difficulty: "beginner" | "intermediate" | "advanced"
}

const styles: Record<string, { bg: string; text: string }> = {
  beginner: { bg: "rgba(22,163,74,0.15)", text: "#16a34a" },
  intermediate: { bg: "rgba(202,138,4,0.15)", text: "#ca8a04" },
  advanced: { bg: "rgba(220,38,38,0.15)", text: "#dc2626" },
}

// Light-on-dark variant for use on dark overlays
const darkStyles: Record<string, { bg: string; text: string }> = {
  beginner: { bg: "rgba(34,197,94,0.2)", text: "#86efac" },
  intermediate: { bg: "rgba(234,179,8,0.2)", text: "#fde047" },
  advanced: { bg: "rgba(248,113,113,0.2)", text: "#fca5a5" },
}

export function DifficultyBadge({
  difficulty,
  variant = "auto",
}: DifficultyBadgeProps & { variant?: "auto" | "dark" }) {
  const c = variant === "dark" ? darkStyles[difficulty] : styles[difficulty]

  return (
    <span
      className="text-[10px] px-2.5 py-0.5 font-semibold uppercase tracking-wider inline-block"
      style={{
        backgroundColor: c.bg,
        color: c.text,
        borderRadius: "var(--button-radius)",
      }}
    >
      {difficulty}
    </span>
  )
}
