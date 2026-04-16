import { TenantConfig } from "./index"

export const tenantConfig: TenantConfig = {
  slug: "lyft",
  companyName: "Lyft",
  logoUrl: "/logos/Lyft_logo_2025.png",
  logoHeight: 28,
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
}
