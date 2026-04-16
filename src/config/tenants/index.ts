export type TenantTheme = {
  mode: "dark" | "light"
  bg: string
  surface: string
  surface2: string
  surfaceHover: string
  border: string
  text: string
  textMuted: string
  textFaint: string
  cardRadius: string
  buttonRadius: string
}

export type TenantConfig = {
  slug: string
  companyName: string
  logoUrl: string
  logoHeight: number
  logoIntrinsicWidth: number
  logoIntrinsicHeight: number
  brandColor: string
  brandColorDark: string
  accentText: string
  heroTagline: string
  featuredTopics: string[]
  hiddenTopics: string[]
  customCTA: string
  theme: TenantTheme
}

const tenantModules: Record<string, () => Promise<{ tenantConfig: TenantConfig }>> = {
  default: () => import("./default"),
  lyft: () => import("./lyft"),
}

let cachedConfig: TenantConfig | null = null

export function getTenantSlug(): string {
  // Standalone Lyft repo — Lyft is the default tenant.
  return process.env.NEXT_PUBLIC_TENANT_SLUG || "lyft"
}

export async function loadTenantConfig(): Promise<TenantConfig> {
  if (cachedConfig) return cachedConfig

  const slug = getTenantSlug()
  const loader = tenantModules[slug] || tenantModules["default"]
  const mod = await loader()
  cachedConfig = mod.tenantConfig
  return cachedConfig
}

export function getTenantConfigSync(slug: string): TenantConfig {
  const configs: Record<string, TenantConfig> = {
    default: {
      slug: "default",
      companyName: "Sergio Avedian",
      logoUrl: "/logos/sergio-avedian.svg",
      logoHeight: 32,
      logoIntrinsicWidth: 480,
      logoIntrinsicHeight: 128,
      brandColor: "#E50914",
      brandColorDark: "#B20710",
      accentText: "Financial Literacy Hub",
      heroTagline:
        "Build wealth without a financial advisor. Practical, no-jargon education for people who work for themselves.",
      featuredTopics: [
        "taxes", "saving", "investing-101", "gig-income",
        "retirement", "budgeting", "debt", "credit",
      ],
      hiddenTopics: [],
      customCTA: "Start Learning",
      theme: {
        mode: "dark",
        bg: "#0F0F0F",
        surface: "#181818",
        surface2: "#222222",
        surfaceHover: "#2A2A2A",
        border: "rgba(255,255,255,0.08)",
        text: "#E5E5E5",
        textMuted: "#A3A3A3",
        textFaint: "#6B6B6B",
        cardRadius: "6px",
        buttonRadius: "6px",
      },
    },
    lyft: {
      slug: "lyft",
      companyName: "Lyft",
      logoUrl: "/logos/Lyft_logo_2025.png",
      logoHeight: 28,
      logoIntrinsicWidth: 1920,
      logoIntrinsicHeight: 1297,
      brandColor: "#FF00BF",
      brandColorDark: "#CC009A",
      accentText: "Driver Financial Wellness",
      heroTagline:
        "Your money, your freedom. Learn how to keep more of what you earn.",
      featuredTopics: ["taxes", "gig-income", "saving", "budgeting", "retirement"],
      hiddenTopics: [],
      customCTA: "Start learning for free",
      theme: {
        mode: "light",
        bg: "#FFFFFF",
        surface: "#F7F7F7",
        surface2: "#EFEFEF",
        surfaceHover: "#E8E8E8",
        border: "rgba(0,0,0,0.08)",
        text: "#111111",
        textMuted: "#6B6B6B",
        textFaint: "#9CA3AF",
        cardRadius: "20px",
        buttonRadius: "48px",
      },
    },
  }

  return configs[slug] || configs["default"]
}
