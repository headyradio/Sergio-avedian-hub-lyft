import type { Metadata } from "next"
import { TenantProvider } from "@/components/TenantProvider"
import { HubNav } from "@/components/HubNav"
import { HubFooter } from "@/components/HubFooter"
import { getTenantConfigSync, getTenantSlug } from "@/config/tenants"
import "@/styles/globals.css"
import "@/styles/hub-tokens.css"

export const metadata: Metadata = {
  title: {
    default: "Driver Financial Wellness — Build Wealth on Gig Income",
    template: "%s | Driver Financial Wellness",
  },
  description:
    "Practical, no-jargon financial education built for rideshare drivers and gig workers. Taxes, savings, investing, retirement — explained by Sergio Avedian.",
  openGraph: {
    title: "Driver Financial Wellness",
    description:
      "Build wealth without a financial advisor. Videos, guides, and interactive tools for rideshare drivers.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tenant = getTenantConfigSync(getTenantSlug())
  const { theme } = tenant

  return (
    <html lang="en">
      <body>
        <div
          className="hub-theme"
          style={{
            minHeight: "100vh",
            backgroundColor: theme.bg,
            isolation: "isolate",
            "--color-brand": tenant.brandColor,
            "--color-brand-dark": tenant.brandColorDark,
            "--hub-bg": theme.bg,
            "--hub-surface": theme.surface,
            "--hub-surface-2": theme.surface2,
            "--hub-surface-hover": theme.surfaceHover,
            "--hub-border": theme.border,
            "--hub-text": theme.text,
            "--hub-text-muted": theme.textMuted,
            "--hub-text-faint": theme.textFaint,
            "--card-radius": theme.cardRadius,
            "--button-radius": theme.buttonRadius,
          } as React.CSSProperties}
        >
          <TenantProvider>
            {/* Skip link — first focusable element, visible only when focused */}
            <a href="#main-content" className="hub-skip-link">
              Skip to main content
            </a>
            <HubNav />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <HubFooter />
          </TenantProvider>
        </div>
      </body>
    </html>
  )
}
