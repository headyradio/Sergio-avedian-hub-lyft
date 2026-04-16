"use client"

import { useEffect, useMemo, useState } from "react"
import { HeroSlider } from "@/components/HeroSlider"
import type { HeroSlide } from "@/components/HeroSlider"
import { ContentCard } from "@/components/ContentCard"
import { TopicGallery } from "@/components/TopicGallery"
import { ToolsGrid } from "@/components/ToolsGrid"
import { BlogSection } from "@/components/BlogSection"
import { NewsletterSignup } from "@/components/NewsletterSignup"
import { useTenant } from "@/hooks/useTenant"
import { useProgress } from "@/hooks/useProgress"
import {
  contentItems,
  getStartHereContent,
} from "@/data/content"
import { topics } from "@/data/topics"
import { tools } from "@/data/tools"
import { blogArticles } from "@/data/blog"

const heroSlides: HeroSlide[] = [
  {
    title: "What Happens If I File My Taxes Late?",
    teaser:
      "It happens to the best of us. But the IRS penalty clock starts ticking the moment you miss the deadline. Here's exactly what to expect, what it'll cost you, and the one simple step that can cut your penalty in half.",
    href: "/topic/taxes",
    thumbnailUrl: "/thumbnails/hero-what-happens-if-i-file-my-taxes-late.png",
    ctaLabel: "Learn More",
  },
  {
    title: "How Should I Save My Money?",
    teaser:
      "Your bank's savings account is quietly losing value to inflation. High-yield savings accounts and low-risk index funds can put your money to work — earning 10 to 20 times more while you sleep. Stop leaving money on the table.",
    href: "/topic/saving",
    thumbnailUrl: "/thumbnails/hero-how-should-i-save-my-money.png",
    ctaLabel: "Start Saving Smarter",
  },
  {
    title: "The Best Way to Save for Retirement as a Driver",
    teaser:
      "No employer match? No problem. A Roth IRA lets your money grow completely tax-free — and you can pull out your contributions anytime, no penalty. It's the single most powerful retirement tool for rideshare drivers.",
    href: "/read/roth-ira-self-employed-drivers",
    thumbnailUrl: "/thumbnails/hero-the-best-way-to-save-for-retirement-as-a-driver.png",
    ctaLabel: "Plan Your Retirement",
  },
]

export default function HubHomePage() {
  const tenant = useTenant()
  const { getContinueWatching } = useProgress()

  // Avoid hydration mismatch: useProgress reads localStorage synchronously,
  // so the client's initial render differs from the server's. Defer rendering
  // of any progress-dependent sections until after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const continueWatchingIds = getContinueWatching()
  const continueWatchingItems = useMemo(
    () => contentItems.filter((c) => continueWatchingIds.includes(c.id)),
    [continueWatchingIds]
  )

  const startHereItems = useMemo(() => getStartHereContent(), [])

  const orderedTopics = useMemo(() => {
    const featured = tenant.featuredTopics
    const hidden = new Set(tenant.hiddenTopics)
    const visible = topics.filter((t) => !hidden.has(t.slug))
    return [
      ...visible.filter((t) => featured.includes(t.slug)),
      ...visible.filter((t) => !featured.includes(t.slug)),
    ]
  }, [tenant])

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} />

      {/* Continue Watching — client-only, depends on localStorage */}
      {mounted && continueWatchingItems.length > 0 && (
        <section className="px-4 md:px-12 py-5 md:py-8" aria-label="Continue Watching">
          <h2
            className="text-lg md:text-xl font-bold mb-4"
            style={{ color: "var(--hub-text)" }}
          >
            Continue Watching
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {continueWatchingItems.slice(0, 4).map((item) => (
              <ContentCard key={item.id} item={item} variant="grid" />
            ))}
          </div>
        </section>
      )}

      {/* Interactive Tools & Calculators */}
      <ToolsGrid tools={tools} />

      {/* Start Here — 4 featured how-tos, uniform grid */}
      <section className="px-4 md:px-12 py-5 md:py-8" aria-label="Start Here">
        <h2
          className="text-lg md:text-xl font-bold mb-4"
          style={{ color: "var(--hub-text)" }}
        >
          Start Here
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {startHereItems.map((item) => (
            <ContentCard key={item.id} item={item} variant="grid" />
          ))}
        </div>
      </section>

      {/* Topic gallery */}
      <TopicGallery topics={orderedTopics} />

      {/* Driver Wellness Blog */}
      <BlogSection articles={blogArticles} />

      {/* Newsletter signup */}
      <NewsletterSignup />
    </div>
  )
}
