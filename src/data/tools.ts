export type Tool = {
  slug: string
  title: string
  description: string
  category: "taxes" | "savings" | "investing"
  icon: string
  coverImage: string
  comingSoon: boolean
}

export const tools: Tool[] = [
  {
    slug: "quarterly-tax-estimator",
    title: "Quarterly Tax Estimator",
    description:
      "Calculate exactly how much to set aside from each Lyft payout to cover your federal and state quarterly estimated taxes.",
    category: "taxes",
    icon: "calculator",
    coverImage: "/thumbnails/quarterly-tax-estimator.png",
    comingSoon: true,
  },
  {
    slug: "gig-tax-savings-calculator",
    title: "Gig Worker Tax Savings Calculator",
    description:
      "See your net tax savings from contributing to a Solo 401(k) or SEP-IRA — the retirement hack most rideshare drivers miss.",
    category: "taxes",
    icon: "piggy-bank",
    coverImage: "/thumbnails/gig-tax-savings-calculator.png",
    comingSoon: true,
  },
  {
    slug: "business-expense-tracker",
    title: "Deduction Checklist & Expense Tracker",
    description:
      "Check off every eligible write-off — phone, tolls, car washes, mileage, supplies — to max out your Schedule C deductions.",
    category: "taxes",
    icon: "receipt",
    coverImage: "/thumbnails/business-expense-tracker.png",
    comingSoon: true,
  },
  {
    slug: "emergency-fund-calculator",
    title: "Emergency Fund Goal Calculator",
    description:
      "Enter your monthly fixed costs and see your 3-to-6-month safety net target — plus how many driving days it'll take to fund it.",
    category: "savings",
    icon: "shield-check",
    coverImage: "/thumbnails/emergency-fund-calculator.png",
    comingSoon: true,
  },
  {
    slug: "pay-yourself-first-allocator",
    title: "Pay Yourself First Allocator",
    description:
      "Drop in your weekly Lyft earnings and get an instant split: taxes, emergency fund, investing, and living expenses.",
    category: "savings",
    icon: "wallet",
    coverImage: "/thumbnails/pay-yourself-first-allocator.png",
    comingSoon: true,
  },
  {
    slug: "hysa-comparison-tool",
    title: "High-Yield Savings Comparison",
    description:
      "Compare the best HYSA APYs against your checking account and see how much free money your idle cash could be earning.",
    category: "savings",
    icon: "trending-up",
    coverImage: "/thumbnails/hysa-comparison-tool.png",
    comingSoon: true,
  },
]
