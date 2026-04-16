"use client"

import { useContext } from "react"
import { TenantContext } from "@/components/TenantProvider"

export function useTenant() {
  const ctx = useContext(TenantContext)
  if (!ctx) {
    throw new Error("useTenant must be used within a TenantProvider")
  }
  return ctx
}
