import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description: "Commercial snack machines and kitchen equipment from Baihong, organized by category.",
}

/**
 * This shell (header, explanatory copy, left category navigation) is a
 * stable layout segment. Only the Suspense boundary below re-renders when
 * category, subcategory, page, Previous or Next change — the shell never
 * reloads, flashes or loses scroll position (MOT-BAIHONG-02).
 */
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
