import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Reveal } from "@/components/motion/reveal"
import { resolveText } from "@/lib/locale"
import type { Product, ProductCategory } from "@/lib/types"

export function HomeProductCatalog({ categories, products }: { categories: ProductCategory[]; products: Product[] }) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-0">
        <Reveal>
          <h2 className="text-[30px] font-black leading-tight text-neutral-950">Main Product Category</h2>
          <p className="mt-3 max-w-5xl text-sm leading-6 text-neutral-600">
            Our main products include barbecue grills, aluminum plate machines, deep fryers and commercial snack
            equipment. Browse by category or open a product to send an inquiry.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-7 md:grid-cols-[255px_1fr]">
          <Reveal as="div" className="border border-neutral-200 bg-[#f3f3f3]">
            <nav aria-label="Home product categories">
              {categories.slice(0, 10).map((category, index) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className={`flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold transition-colors hover:bg-[#f39a00] hover:text-white ${index === 0 ? "bg-[#f39a00] text-white" : "text-neutral-900"}`}
                >
                  <span>{resolveText(category.name)}</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </Reveal>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product, index) => (
              <Reveal key={product.slug} as="li" delay={Math.min(index, 5) * 50}>
                <ProductCard product={product} bareListItem />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
