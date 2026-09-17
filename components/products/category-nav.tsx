"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronRight } from "lucide-react"
import type { ProductCategory } from "@/lib/types"
import { resolveText } from "@/lib/locale"
import { cn } from "@/lib/utils"

/**
 * Stable left-hand category navigation (MOT-BAIHONG-02). This is a client
 * component so `useSearchParams` re-renders it in place for active-state
 * highlighting, but every link is a real anchor — navigating only causes
 * the right-hand grid segment (app/products/page.tsx) to re-render inside
 * its Suspense boundary. This component itself never remounts.
 */
export function CategoryNav({ categories }: { categories: ProductCategory[] }) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")
  const activeSub = searchParams.get("sub")

  const links = (
    <nav aria-label="Product categories" className="border border-neutral-200 bg-[#f3f3f3]">
      <Link
        href="/products"
        className={cn(
          "flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold transition-colors",
          !activeCategory ? "bg-[#f39a00] text-white" : "text-neutral-900 hover:bg-[#f39a00] hover:text-white",
        )}
        aria-current={!activeCategory ? "page" : undefined}
      >
        <span>All Products</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>

      {categories.map((category) => {
        const isActiveCategory = activeCategory === category.slug
        return (
          <div key={category.slug} className="group relative">
            <Link
              href={`/products?category=${category.slug}`}
              className={cn(
                "flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold transition-colors",
                isActiveCategory && !activeSub
                  ? "bg-[#f39a00] text-white"
                  : "text-neutral-900 hover:bg-[#f39a00] hover:text-white",
              )}
              aria-current={isActiveCategory && !activeSub ? "page" : undefined}
            >
              <span>{resolveText(category.name)}</span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>

            {category.subcategories.length > 0 && (
              <ul data-hover-submenu={category.slug} className="invisible absolute left-full top-0 z-40 min-w-64 bg-[#f39a00] py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {category.subcategories.map((sub) => {
                  const isActiveSub = activeSub === sub.slug
                  return (
                    <li key={sub.slug}>
                      <Link
                        href={`/products?category=${category.slug}&sub=${sub.slug}`}
                        className={cn(
                          "block px-5 py-3 text-sm font-bold transition-colors",
                          isActiveSub ? "bg-white text-[#f39a00]" : "text-white hover:bg-white hover:text-[#f39a00]",
                        )}
                        aria-current={isActiveSub ? "page" : undefined}
                      >
                        {resolveText(sub.name)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )

  return (
    <>
      <details className="border border-neutral-200 bg-white md:hidden">
        <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-neutral-950">Browse Product Categories</summary>
        <div className="max-h-[60vh] overflow-y-auto border-t border-neutral-200">{links}</div>
      </details>
      <div className="hidden md:block">{links}</div>
    </>
  )
}
