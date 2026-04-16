"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"
import { useTenant } from "@/hooks/useTenant"

export function NewsletterSignup() {
  const tenant = useTenant()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail("")
  }

  return (
    <section
      className="px-4 md:px-12 py-10 md:py-14"
      aria-label="Newsletter signup"
    >
      <div
        className="relative overflow-hidden px-6 md:px-12 py-10 md:py-14"
        style={{
          borderRadius: "var(--card-radius)",
          background:
            "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 60%, #1F1F1F 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Decorative accent */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ backgroundColor: "var(--color-brand)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <Mail className="h-5 w-5" style={{ color: "var(--color-brand)" }} />
          </div>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3"
            style={{ color: "#FFFFFF" }}
          >
            Sign up for updates
          </h2>
          <p
            className="text-[14px] md:text-[15px] leading-relaxed mb-6 md:mb-8"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Sign up to get the {tenant.companyName} Driver Financial Wellness
            Newsletter. New articles, tools, and tax deadlines — straight to your
            inbox, no spam.
          </p>

          {submitted ? (
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: "rgba(34,197,94,0.15)",
                color: "#4ADE80",
                border: "1px solid rgba(34,197,94,0.3)",
              }}
              role="status"
              aria-live="polite"
            >
              <Check className="h-4 w-4" />
              You're in. Check your inbox to confirm.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "var(--button-radius)",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 whitespace-nowrap"
                style={{
                  backgroundColor: "var(--color-brand)",
                  borderRadius: "var(--button-radius)",
                }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p
            className="text-[11px] mt-4"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
