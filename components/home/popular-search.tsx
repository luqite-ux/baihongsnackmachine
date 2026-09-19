import { Search } from "lucide-react"
import type { ProductCategory } from "@/lib/types"
import { localePath, resolveText } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function PopularSearch({ categories, locale }: { categories: ProductCategory[]; locale: Locale }) {
  return (
    <section aria-label="Popular product searches" className="bg-[#f39a00] text-white">
      <div className="mx-auto flex min-h-[114px] max-w-[1170px] flex-col items-center justify-between gap-5 px-4 py-5 md:flex-row lg:px-0">
        <p className="text-[18px] font-bold">{locale === "zh" ? "热门关键词" : "Popular Keywords"}： {categories.slice(0, 3).map((category) => resolveText(category.name, locale)).join(", ")}</p>
        <form action={localePath("/products", locale)} className="flex w-full max-w-[402px] overflow-hidden rounded-full bg-white">
          <label htmlFor="home-product-search" className="sr-only">Search products</label>
          <input id="home-product-search" name="q" type="search" className="h-12 min-w-0 flex-1 bg-transparent px-6 text-neutral-950 outline-none" />
          <button type="submit" aria-label="Submit product search" className="grid w-16 place-items-center text-[#1269ae]"><Search className="h-7 w-7" /></button>
        </form>
      </div>
    </section>
  )
}
