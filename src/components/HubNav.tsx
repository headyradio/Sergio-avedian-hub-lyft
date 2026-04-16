"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { useTenant } from "@/hooks/useTenant"
import { hubNavLinks as navLinks } from "@/config/hubNav"

export function HubNav() {
  const tenant = useTenant()
  const isLight = tenant.theme.mode === "light"
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname?.startsWith(href) ?? false
  }

  return (
    <nav
      className="sticky top-0 z-50 px-4 md:px-12"
      style={{
        backgroundColor: isLight ? "rgba(255,255,255,0.97)" : "rgba(15,15,15,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"}`,
      }}
      aria-label="Primary"
    >
      {/* Three-column layout: brand | centered nav | actions */}
      <div
        className="grid items-center"
        style={{
          height: 76,
          gridTemplateColumns: "auto 1fr auto",
          gap: 24,
        }}
      >
        {/* Left: Brand lockup (acts as home link with hover animation) */}
        <Link
          href="/"
          aria-label={`${tenant.companyName} Driver Financial Wellness — Home`}
          className="hub-brand group inline-flex items-center gap-3"
        >
          <span
            className="hub-brand__logo inline-flex items-center transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
          >
            <Image
              src={tenant.logoUrl}
              alt={`${tenant.companyName} logo`}
              width={80}
              height={tenant.logoHeight}
              className="object-contain"
              style={{ height: tenant.logoHeight, width: "auto" }}
              priority
            />
          </span>
          <span
            className="hidden md:block w-px h-5 transition-colors duration-300"
            style={{
              backgroundColor: isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.12)",
            }}
            aria-hidden="true"
          />
          <span
            className="hidden md:inline hub-brand__accent text-[14px] font-semibold transition-colors duration-300"
            style={{
              color: isLight ? "#333333" : "var(--hub-text-muted)",
            }}
          >
            {tenant.accentText}
          </span>
        </Link>

        {/* Center: Desktop nav links (truly centered via grid column) */}
        <div className="hidden lg:flex items-center justify-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="hub-nav-link relative px-4 py-2 text-[15px] font-semibold transition-colors rounded-lg"
                style={{
                  color: active
                    ? isLight
                      ? "#111111"
                      : "var(--hub-text)"
                    : isLight
                      ? "#555555"
                      : "var(--hub-text-muted)",
                }}
              >
                {link.label}
                {/* Active indicator */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-brand)",
                    opacity: active ? 1 : 0,
                    transform: active ? "scaleX(1)" : "scaleX(0.5)",
                    transformOrigin: "center",
                  }}
                />
              </Link>
            )
          })}
        </div>

        {/* Empty spacer on mobile so the grid stays consistent */}
        <div className="lg:hidden" aria-hidden="true" />

        {/* Right: Search + mobile menu toggle */}
        <div className="flex items-center gap-2 justify-self-end">
          <Link
            href="/search"
            className="hub-icon-btn flex items-center justify-center w-10 h-10 rounded-full transition-all"
            style={{
              color: isLight ? "#333333" : "var(--hub-text-muted)",
              backgroundColor: isLight ? "#F0F0F0" : "rgba(255,255,255,0.08)",
            }}
            aria-label="Search content"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
          <button
            className="hub-icon-btn lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors"
            style={{
              color: isLight ? "#333333" : "var(--hub-text-muted)",
              backgroundColor: isLight ? "#F0F0F0" : "rgba(255,255,255,0.08)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="hub-mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          id="hub-mobile-nav"
          className="lg:hidden pb-4 flex flex-col gap-1"
          style={{
            borderTop: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className="px-3 py-3 text-[15px] font-semibold transition-colors rounded-lg"
                style={{
                  color: active
                    ? isLight
                      ? "#111111"
                      : "var(--hub-text)"
                    : isLight
                      ? "#555555"
                      : "var(--hub-text-muted)",
                  backgroundColor: active
                    ? isLight
                      ? "rgba(255,0,191,0.08)"
                      : "rgba(255,255,255,0.04)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
