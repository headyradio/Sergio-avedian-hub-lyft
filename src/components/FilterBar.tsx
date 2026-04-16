"use client"

type FilterOption = {
  value: string
  label: string
}

type FilterBarProps = {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  label: string
}

export function FilterBar({ options, value, onChange, label }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide" role="tablist" aria-label={label}>
      {options.map((opt) => {
        const isActive = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            role="tab"
            aria-selected={isActive}
            className="flex-shrink-0 px-4 py-1.5 text-xs font-medium transition-colors"
            style={{
              borderRadius: "var(--button-radius)",
              backgroundColor: isActive ? "var(--color-brand)" : "var(--hub-surface-2)",
              color: isActive ? "#fff" : "var(--hub-text-muted)",
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
