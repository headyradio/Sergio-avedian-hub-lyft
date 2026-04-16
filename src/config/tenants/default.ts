import { TenantConfig } from "./index"

export const tenantConfig: TenantConfig = {
  slug: "default",
  companyName: "Sergio Avedian",
  logoUrl: "/logos/sergio-avedian.svg",
  logoHeight: 32,
  brandColor: "#E50914",
  brandColorDark: "#B20710",
  accentText: "Financial Literacy Hub",
  heroTagline:
    "Build wealth without a financial advisor. Practical, no-jargon education for people who work for themselves.",
  featuredTopics: [
    "taxes",
    "saving",
    "investing-101",
    "gig-income",
    "retirement",
    "budgeting",
    "debt",
    "credit",
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
}
