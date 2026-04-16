export type BlogArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  readTimeMinutes: number
  publishedAt: string
  coverImage: string
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "driving-burnout-recovery",
    title: "Beating Driver Burnout: A 7-Day Reset Plan",
    excerpt:
      "Ten-hour days. Back-to-back pings. Surge hunts. Here's how to spot burnout before it tanks your earnings — and a week-long reset that actually works.",
    category: "Wellness",
    author: "Sergio Avedian",
    readTimeMinutes: 8,
    publishedAt: "2026-04-10",
    coverImage: "/thumbnails/driving-burnout-recovery.png",
  },
  {
    slug: "retirement-without-employer",
    title: "Why Self-Employed Drivers Are Richer in Retirement (If They Do This)",
    excerpt:
      "No 401(k) match? No problem. Self-employed drivers have access to retirement accounts W-2 workers can only dream of. The catch: nobody tells you about them.",
    category: "Retirement",
    author: "Sergio Avedian",
    readTimeMinutes: 10,
    publishedAt: "2026-04-07",
    coverImage: "/thumbnails/retirement-without-employer.png",
  },
  {
    slug: "lyft-vs-uber-earnings",
    title: "Lyft vs. Uber: Where Drivers Actually Make More in 2026",
    excerpt:
      "We pulled 6 months of earnings from 50 multi-app drivers. The winner depends on your city, your shift, and one setting most drivers never touch.",
    category: "Earnings",
    author: "Sergio Avedian",
    readTimeMinutes: 12,
    publishedAt: "2026-04-02",
    coverImage: "/thumbnails/lyft-vs-uber-earnings.png",
  },
  {
    slug: "driver-insurance-gaps",
    title: "The Insurance Gap That Could Cost You Everything",
    excerpt:
      "Your personal auto policy does NOT cover rideshare driving. Here's the three-phase insurance reality every driver needs to understand — before an accident.",
    category: "Protection",
    author: "Sergio Avedian",
    readTimeMinutes: 7,
    publishedAt: "2026-03-30",
    coverImage: "/thumbnails/driver-insurance-gaps.png",
  },
  {
    slug: "back-pain-long-shifts",
    title: "The 5-Minute Routine That Saves Your Back on Long Shifts",
    excerpt:
      "Lower-back pain is the #1 injury rideshare drivers report. Five stretches you can do at a gas station. No gym, no equipment, no excuses.",
    category: "Health",
    author: "Sergio Avedian",
    readTimeMinutes: 5,
    publishedAt: "2026-03-25",
    coverImage: "/thumbnails/back-pain-long-shifts.png",
  },
  {
    slug: "mental-health-on-the-road",
    title: "Driving Solo, Feeling Isolated? You're Not Alone.",
    excerpt:
      "Rideshare drivers log thousands of hours alone. Here's how top drivers stay mentally sharp, avoid road rage, and build community on and off the road.",
    category: "Wellness",
    author: "Sergio Avedian",
    readTimeMinutes: 9,
    publishedAt: "2026-03-20",
    coverImage: "/thumbnails/mental-health-on-the-road.png",
  },
]
