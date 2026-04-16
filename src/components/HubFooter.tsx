"use client"

import Link from "next/link"
import Image from "next/image"
import { useTenant } from "@/hooks/useTenant"
import { hubNavLinks } from "@/config/hubNav"

export function HubFooter() {
  const tenant = useTenant()
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-8"
      style={{
        backgroundColor: "#1F1F1F",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-label="Site footer"
    >
      <div
        className="px-4 md:px-12 py-10 md:py-14"
        style={{ maxWidth: 1400, margin: "0 auto" }}
      >
        {/* Top: logo + nav */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Brand */}
          <Link
            href="/"
            className="hub-brand group flex items-center gap-3"
            aria-label={`${tenant.companyName} Driver Financial Wellness — Home`}
          >
            <div
              className="hub-brand__logo px-3 py-2 rounded-md inline-flex items-center transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Image
                src={tenant.logoUrl}
                alt={`${tenant.companyName} logo`}
                width={80}
                height={tenant.logoHeight}
                className="object-contain"
                style={{ height: tenant.logoHeight, width: "auto" }}
              />
            </div>
            <div
              className="hidden sm:block w-px h-5"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              aria-hidden="true"
            />
            <span
              className="hidden sm:inline hub-brand__accent text-[14px] font-semibold transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {tenant.accentText}
            </span>
          </Link>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:gap-x-8">
              {hubNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div
          className="my-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        />

        {/* Bottom: legal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-[12px]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            © {year} {tenant.companyName}. Educational content only — not
            financial, tax, or legal advice.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="text-[12px] transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-[12px] transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="text-[12px] transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Browse all topics
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
