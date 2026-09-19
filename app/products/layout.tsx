import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description: "Commercial snack machines and kitchen equipment from Baihong, organized by category.",
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
