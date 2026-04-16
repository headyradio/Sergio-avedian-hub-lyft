"use client"

import { useState, useEffect, useCallback } from "react"

type ProgressData = {
  watchedItems: string[]
  savedItems: string[]
  watchProgress: Record<string, number>
}

const STORAGE_KEY = "hub-progress"

function loadProgress(): ProgressData {
  if (typeof window === "undefined") {
    return { watchedItems: [], savedItems: [], watchProgress: {} }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ProgressData
  } catch {
    // ignore
  }
  return { watchedItems: [], savedItems: [], watchProgress: {} }
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const markWatched = useCallback((id: string) => {
    setProgress((prev) => {
      if (prev.watchedItems.includes(id)) return prev
      return { ...prev, watchedItems: [...prev.watchedItems, id] }
    })
  }, [])

  const toggleSaved = useCallback((id: string) => {
    setProgress((prev) => {
      const saved = prev.savedItems.includes(id)
        ? prev.savedItems.filter((s) => s !== id)
        : [...prev.savedItems, id]
      return { ...prev, savedItems: saved }
    })
  }, [])

  const updateWatchProgress = useCallback((id: string, percent: number) => {
    setProgress((prev) => ({
      ...prev,
      watchProgress: { ...prev.watchProgress, [id]: Math.min(100, Math.max(0, percent)) },
    }))
  }, [])

  const isSaved = useCallback(
    (id: string) => progress.savedItems.includes(id),
    [progress.savedItems]
  )

  const getWatchProgress = useCallback(
    (id: string) => progress.watchProgress[id] ?? 0,
    [progress.watchProgress]
  )

  const getContinueWatching = useCallback((): string[] => {
    return Object.entries(progress.watchProgress)
      .filter(([, pct]) => pct > 0 && pct < 100)
      .map(([id]) => id)
  }, [progress.watchProgress])

  return {
    progress,
    markWatched,
    toggleSaved,
    updateWatchProgress,
    isSaved,
    getWatchProgress,
    getContinueWatching,
  }
}
