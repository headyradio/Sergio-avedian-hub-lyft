"use client"

import { useEffect, useRef, useCallback } from "react"
import { useProgress } from "@/hooks/useProgress"

type VideoPlayerProps = {
  contentId: string
  videoUrl: string
  title: string
}

export function VideoPlayer({ contentId, videoUrl, title }: VideoPlayerProps) {
  const { updateWatchProgress, markWatched } = useProgress()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef(0)

  const simulateProgress = useCallback(() => {
    // Simulates progress for embedded YouTube videos
    // In production this would use the YouTube IFrame API
    progressRef.current = Math.min(100, progressRef.current + 1)
    updateWatchProgress(contentId, progressRef.current)
    if (progressRef.current >= 100) {
      markWatched(contentId)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [contentId, updateWatchProgress, markWatched])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handlePlay = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(simulateProgress, 3000)
    }
  }, [simulateProgress])

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
      <iframe
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={handlePlay}
      />

      {/* Progress indicator below player */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10" aria-live="polite">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progressRef.current}%`,
            backgroundColor: "var(--color-brand)",
          }}
          role="progressbar"
          aria-valuenow={progressRef.current}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Watch progress: ${progressRef.current}%`}
        />
      </div>
    </div>
  )
}
