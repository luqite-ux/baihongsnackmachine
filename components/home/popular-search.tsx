import Link from "next/link"
import type { ProductCategory } from "@/lib/types"
import { resolveText } from "@/lib/locale"

export function PopularSearch({ categories }: { categories: ProductCategory[] }) {
  return (
    <nav aria-label="Popular product searches" className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex min-h-11 max-w-[1200px] items-center gap-4 overflow-x-auto px-4 text-xs lg:px-0">
        <strong className="shrink-0 uppercase text-[#f39a00]">Popular Search</strong>
        <span className="h-4 w-px shrink-0 bg-neutral-300" aria-hidden="true" />
        {categories.slice(0, 7).map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="shrink-0 text-neutral-600 hover:text-[#f39a00]"
          >
            {resolveText(category.name)}
          </Link>
        ))}
      </div>
    </nav>
  )
}
