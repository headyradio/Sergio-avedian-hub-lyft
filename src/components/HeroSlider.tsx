"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useTenant } from "@/hooks/useTenant"

export type HeroSlide = {
  title: string
  teaser: string
  href: string
  thumbnailUrl: string
  ctaLabel: string
}

type HeroSliderProps = {
  slides: HeroSlide[]
  intervalMs?: number
}

export function HeroSlider({ slides, intervalMs = 6000 }: HeroSliderProps) {
  const tenant = useTenant()
  const isLight = tenant.theme.mode === "light"

  // Respect users who prefer reduced motion — auto-rotation stays off until they explicitly press play.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener?.("change", handler)
    return () => mq.removeEventListener?.("change", handler)
  }, [])

  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Sync paused state to reduced-motion preference on mount/change
  useEffect(() => {
    if (prefersReducedMotion) setIsPaused(true)
  }, [prefersReducedMotion])

  const total = slides.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total)
      setProgress(0)
    },
    [total]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-rotate — disabled entirely when user prefers reduced motion
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)

    if (!isPaused && !prefersReducedMotion) {
      setProgress(0)
      const progressTick = 50
      progressRef.current = setInterval(() => {
        setProgress((p) => Math.min(p + progressTick / intervalMs, 1))
      }, progressTick)

      timerRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % total)
        setProgress(0)
      }, intervalMs)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [isPaused, intervalMs, total, current, prefersReducedMotion])

  // Keyboard navigation — arrow keys when slider is focused
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      }
    },
    [prev, next]
  )

  const slide = slides[current]

  return (
    <section
      className="relative w-full"
      aria-label="Featured content slider"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Live region for screen readers: announce current slide without interrupting */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} of {total}: {slide.title}
      </div>
      {/* Slide container */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: isLight ? undefined : "clamp(420px, 56vh, 620px)",
        }}
      >
        <div
          className={
            isLight
              ? "relative w-full h-[clamp(480px,70vh,560px)] md:h-auto md:aspect-[3/1]"
              : "relative w-full h-full"
          }
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
              aria-hidden={i !== current}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}`}
            >
              <Image
                src={s.thumbnailUrl}
                alt=""
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}

          {/* Gradient overlays for text readability */}
          {isLight ? (
            <>
              {/* Mobile: bottom-up gradient (text sits at bottom) */}
              <div
                className="absolute inset-0 z-[2] md:hidden"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.2) 72%, rgba(0,0,0,0) 100%)",
                }}
              />
              {/* Desktop: left-right gradient (text sits left-center) */}
              <div
                className="absolute inset-0 z-[2] hidden md:block"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.25) 100%)",
                }}
              />
            </>
          ) : (
            <>
              <div
                className="absolute inset-0 z-[2]"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 z-[2]"
                style={{
                  background: "linear-gradient(to top, var(--hub-bg) 0%, rgba(15,15,15,0.4) 40%, transparent 70%)",
                }}
              />
            </>
          )}

          {/* Text content — bottom-aligned on mobile, centered on desktop */}
          <div
            className="absolute inset-0 z-[3] flex flex-col justify-end md:justify-center px-5 pb-20 md:px-12 md:pb-0 lg:px-16"
            style={{ maxWidth: "680px" }}
          >
            <h2
              className="text-xl sm:text-2xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] mb-3 md:mb-4"
              style={{
                color: "#FFFFFF",
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              {slide.title}
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-3"
              style={{
                color: "rgba(255,255,255,0.85)",
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              }}
            >
              {slide.teaser}
            </p>
            <div>
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--color-brand)",
                  borderRadius: "var(--button-radius)",
                }}
              >
                <Play className="h-4 w-4" fill="currentColor" />
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] flex items-center justify-end px-6 md:px-12 lg:px-16 pb-4 md:pb-6">
        <div className="flex items-center gap-6 md:gap-8">
          {/* Dot indicators with progress */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                style={{
                  width: i === current ? 32 : 12,
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
              >
                {i === current && (
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress * 100}%`,
                      backgroundColor: "#FFFFFF",
                      transition: "width 50ms linear",
                    }}
                  />
                )}
                {i !== current && i < current && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Arrow + pause controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <Play className="h-3.5 w-3.5 text-white" fill="currentColor" />
              ) : (
                <Pause className="h-3.5 w-3.5 text-white" fill="currentColor" />
              )}
            </button>
            <button
              onClick={next}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
