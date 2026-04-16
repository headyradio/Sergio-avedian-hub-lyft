"use client"

import { createContext, useEffect, useRef, useState, type ReactNode } from "react"
import { getTenantConfigSync, getTenantSlug, type TenantConfig } from "@/config/tenants"

export const TenantContext = createContext<TenantConfig | null>(null)

export function TenantProvider({ children }: { children: ReactNode }) {
  const markerRef = useRef<HTMLDivElement>(null)
  const [config, setConfig] = useState<TenantConfig>(() =>
    getTenantConfigSync(getTenantSlug())
  )

  useEffect(() => {
    const slug = getTenantSlug()
    setConfig(getTenantConfigSync(slug))
  }, [])

  useEffect(() => {
    // Find the .hub-theme wrapper and set CSS vars directly on it
    // so they override the fallback declarations in hub-tokens.css
    const hubTheme = markerRef.current?.closest(".hub-theme") as HTMLElement | null
    if (!hubTheme) return

    const { theme } = config
    hubTheme.style.setProperty("--color-brand", config.brandColor)
    hubTheme.style.setProperty("--color-brand-dark", config.brandColorDark)
    hubTheme.style.setProperty("--hub-bg", theme.bg)
    hubTheme.style.setProperty("--hub-surface", theme.surface)
    hubTheme.style.setProperty("--hub-surface-2", theme.surface2)
    hubTheme.style.setProperty("--hub-surface-hover", theme.surfaceHover)
    hubTheme.style.setProperty("--hub-border", theme.border)
    hubTheme.style.setProperty("--hub-text", theme.text)
    hubTheme.style.setProperty("--hub-text-muted", theme.textMuted)
    hubTheme.style.setProperty("--hub-text-faint", theme.textFaint)
    hubTheme.style.setProperty("--card-radius", theme.cardRadius)
    hubTheme.style.setProperty("--button-radius", theme.buttonRadius)
    hubTheme.style.setProperty("background-color", theme.bg)
  }, [config])

  return (
    <TenantContext.Provider value={config}>
      <div ref={markerRef} style={{ display: "contents" }}>
        {children}
      </div>
    </TenantContext.Provider>
  )
}
