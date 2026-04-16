"use client"

import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search videos, articles, and guides...",
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (val: string) => {
    setLocalValue(val)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onChange(val), 250)
  }

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--hub-text-muted)" }} />
      <input
        type="search"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-10 text-sm focus:outline-none focus:ring-2"
        style={{
          backgroundColor: "var(--hub-surface)",
          borderRadius: "var(--button-radius)",
          border: `1px solid var(--hub-border)`,
          color: "var(--hub-text)",
        }}
        aria-label="Search content"
      />
      {localValue && (
        <button
          onClick={() => handleChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--hub-text-muted)" }}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
