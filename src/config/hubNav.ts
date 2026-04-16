export type HubNavLink = {
  label: string
  href: string
}

// Shared nav links used by both HubNav and HubFooter.
// "Home" is intentionally omitted — the Lyft brand lockup is the home link.
export const hubNavLinks: HubNavLink[] = [
  { label: "Browse", href: "/search" },
  { label: "Savings", href: "/topic/saving" },
  { label: "Investing", href: "/topic/investing-101" },
  { label: "Taxes", href: "/topic/taxes" },
  { label: "Debt", href: "/topic/debt" },
]
