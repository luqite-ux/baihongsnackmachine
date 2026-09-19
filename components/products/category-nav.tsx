"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import type { ProductCategory } from "@/lib/types"
import { localePath, resolveText } from "@/lib/locale"
import type { Locale } from "@/lib/types"
import { cn } from "@/lib/utils"

export function CategoryNav({ categories, locale }: { categories: ProductCategory[]; locale: Locale }) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")
  const activeSub = searchParams.get("sub")

  return (
    <>
      <details className="border border-neutral-200 bg-white md:hidden">
        <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-neutral-950">Browse Product Categories</summary>
        <nav aria-label="Mobile product categories" className="max-h-[60vh] overflow-y-auto border-t border-neutral-200 bg-[#f3f3f3]">
          <Link
            href={localePath("/products", locale)}
            scroll={false}
            className={cn(
              "flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold",
              !activeCategory ? "bg-[#f39a00] text-white" : "text-neutral-900",
            )}
          >
            <span>{locale === "zh" ? "全部产品" : "All Products"}</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {categories.map((category) => {
            const active = activeCategory === category.slug
            if (category.subcategories.length === 0) {
              return (
                <Link
                  key={category.slug}
                  href={localePath(`/products?category=${category.slug}`, locale)}
                  scroll={false}
                  className={cn(
                    "flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold",
                    active ? "bg-[#f39a00] text-white" : "text-neutral-900",
                  )}
                >
                  <span>{resolveText(category.name, locale)}</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )
            }

            return (
              <details key={category.slug} open={active} className="border-b border-white">
                <summary className={cn("flex min-h-14 cursor-pointer list-none items-center justify-between px-4 text-sm font-bold", active ? "bg-[#f39a00] text-white" : "text-neutral-900")}>
                  <span>{resolveText(category.name, locale)}</span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </summary>
                <div className="bg-white py-1">
                  <Link href={localePath(`/products?category=${category.slug}`, locale)} scroll={false} className="block px-6 py-3 text-sm font-semibold text-neutral-800">
                    {locale === "zh" ? `全部${resolveText(category.name, locale)}` : `All ${resolveText(category.name, locale)}`}
                  </Link>
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={localePath(`/products?category=${category.slug}&sub=${sub.slug}`, locale)}
                      scroll={false}
                      className={cn("block px-6 py-3 text-sm", activeSub === sub.slug ? "bg-orange-50 font-bold text-[#d98200]" : "text-neutral-700")}
                    >
                      {resolveText(sub.name, locale)}
                    </Link>
                  ))}
                </div>
              </details>
            )
          })}
        </nav>
      </details>

      <nav aria-label="Product categories" className="hidden border border-neutral-200 bg-[#f3f3f3] md:block">
        <Link
          href={localePath("/products", locale)}
          scroll={false}
          className={cn(
            "flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold transition-colors",
            !activeCategory ? "bg-[#f39a00] text-white" : "text-neutral-900 hover:bg-[#f39a00] hover:text-white",
          )}
          aria-current={!activeCategory ? "page" : undefined}
        >
          <span>{locale === "zh" ? "全部产品" : "All Products"}</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        {categories.map((category) => {
          const active = activeCategory === category.slug
          return (
            <div key={category.slug} className="group relative">
              <Link
                href={localePath(`/products?category=${category.slug}`, locale)}
                scroll={false}
                className={cn(
                  "flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold transition-colors",
                  active && !activeSub ? "bg-[#f39a00] text-white" : "text-neutral-900 hover:bg-[#f39a00] hover:text-white",
                )}
                aria-current={active && !activeSub ? "page" : undefined}
              >
                <span>{resolveText(category.name, locale)}</span>
                <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
              {category.subcategories.length > 0 && (
                <ul data-hover-submenu={category.slug} className="invisible absolute left-full top-0 z-40 min-w-64 bg-[#f39a00] py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {category.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={localePath(`/products?category=${category.slug}&sub=${sub.slug}`, locale)}
                        scroll={false}
                        className={cn("block px-5 py-3 text-sm font-bold transition-colors", activeSub === sub.slug ? "bg-white text-[#f39a00]" : "text-white hover:bg-white hover:text-[#f39a00]")}
                        aria-current={activeSub === sub.slug ? "page" : undefined}
                      >
                        {resolveText(sub.name, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </>
  )
}
