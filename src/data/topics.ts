export type Topic = {
  slug: string
  name: string
  description: string
  icon: string
  coverImage: string
}

export const topics: Topic[] = [
  {
    slug: "taxes",
    name: "Taxes & Deductions",
    description: "Quarterly taxes, mileage deductions, write-offs",
    icon: "receipt",
    coverImage: "/thumbnails/taxes.png",
  },
  {
    slug: "saving",
    name: "Saving Basics",
    description: "Emergency funds, automating savings, HYSA",
    icon: "piggy-bank",
    coverImage: "/thumbnails/saving.png",
  },
  {
    slug: "investing-101",
    name: "Investing 101",
    description: "Index funds, compound interest, starting with $50",
    icon: "trending-up",
    coverImage: "/thumbnails/investing-101.png",
  },
  {
    slug: "gig-income",
    name: "Managing Gig Income",
    description: "Irregular income budgeting, income smoothing",
    icon: "wallet",
    coverImage: "/thumbnails/gig-income.png",
  },
  {
    slug: "retirement",
    name: "Retirement Planning",
    description: "Solo 401k, SEP-IRA, Roth IRA for the self-employed",
    icon: "landmark",
    coverImage: "/thumbnails/retirement.png",
  },
  {
    slug: "debt",
    name: "Getting Out of Debt",
    description: "Avalanche vs snowball, credit card strategy",
    icon: "credit-card",
    coverImage: "/thumbnails/debt.png",
  },
  {
    slug: "budgeting",
    name: "Budgeting That Works",
    description: "50/30/20 rule, envelope method",
    icon: "calculator",
    coverImage: "/thumbnails/budgeting.png",
  },
  {
    slug: "credit",
    name: "Building Credit",
    description: "Credit score basics, secured cards, utilization",
    icon: "shield-check",
    coverImage: "/thumbnails/credit.png",
  },
]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug)
}

export function getTopicsBySlug(slugs: string[]): Topic[] {
  return slugs
    .map((s) => topics.find((t) => t.slug === s))
    .filter((t): t is Topic => t !== undefined)
}
