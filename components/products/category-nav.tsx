"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type { ProductCategory } from "@/lib/types"
import { resolveText } from "@/lib/locale"
import { CategoryIcon } from "@/components/category-icon"
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
    <nav aria-label="Product categories" className="space-y-1">
      <Link
        href="/products"
        className={cn(
          "block rounded-md px-3 py-2 text-sm font-semibold transition-colors",
          !activeCategory ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary",
        )}
        aria-current={!activeCategory ? "page" : undefined}
      >
        All Products
      </Link>

      {categories.map((category) => {
        const isActiveCategory = activeCategory === category.slug
        return (
          <div key={category.slug}>
            <Link
              href={`/products?category=${category.slug}`}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActiveCategory && !activeSub
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary",
              )}
              aria-current={isActiveCategory && !activeSub ? "page" : undefined}
            >
              <CategoryIcon name={category.icon} className="h-4 w-4 shrink-0" />
              <span>{resolveText(category.name)}</span>
            </Link>

            {isActiveCategory && category.subcategories.length > 0 && (
              <ul className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                {category.subcategories.map((sub) => {
                  const isActiveSub = activeSub === sub.slug
                  return (
                    <li key={sub.slug}>
                      <Link
                        href={`/products?category=${category.slug}&sub=${sub.slug}`}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-sm transition-colors",
                          isActiveSub ? "font-semibold text-primary" : "text-muted-foreground hover:text-primary",
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
      <details className="rounded-lg border border-border bg-card md:hidden">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-foreground">Browse Product Categories</summary>
        <div className="max-h-[60vh] overflow-y-auto border-t border-border p-3">{links}</div>
      </details>
      <div className="hidden md:block">{links}</div>
    </>
  )
}
