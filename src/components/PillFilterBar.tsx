"use client"

import type { LucideIcon } from "lucide-react"

type PillOption = {
  value: string
  label: string
  icon?: LucideIcon
  count?: number
}

type PillFilterBarProps = {
  options: PillOption[]
  value: string
  onChange: (value: string) => void
  label: string
}

export function PillFilterBar({ options, value, onChange, label }: PillFilterBarProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
      role="tablist"
      aria-label={label}
    >
      {options.map((opt) => {
        const Icon = opt.icon
        const isActive = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            role="tab"
            aria-selected={isActive}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold transition-all duration-200"
            style={{
              borderRadius: "var(--button-radius)",
              backgroundColor: isActive
                ? "var(--color-brand)"
                : "var(--hub-surface-2)",
              color: isActive ? "#FFFFFF" : "var(--hub-text)",
              border: isActive
                ? "1px solid var(--color-brand)"
                : "1px solid var(--hub-border)",
              boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className="ml-1 text-[11px] font-semibold px-1.5 py-0 rounded-full"
                style={{
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(0,0,0,0.08)",
                  color: isActive ? "#FFFFFF" : "var(--hub-text-muted)",
                  minWidth: 20,
                  textAlign: "center",
                  lineHeight: "18px",
                }}
              >
                {opt.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
