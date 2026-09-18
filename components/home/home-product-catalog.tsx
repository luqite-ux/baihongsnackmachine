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
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[22px] font-black text-[#f39a00]">PRODUCT</p>
              <h2 className="mt-1 text-[38px] font-black leading-tight text-neutral-950">Main Product Category</h2>
            </div>
            <Link href="/products" className="mt-9 shrink-0 bg-[#f39a00] px-6 py-3 text-sm font-bold text-white hover:bg-black">VIEW MORE &gt;</Link>
          </div>
          <p className="mt-3 max-w-5xl text-[16px] font-bold leading-6 text-neutral-950">
            Our main products include barbecue grills, burger grills, sausage ovens, bird egg ovens, octopus ball machines, deep fryers, grills, popcorn machines, cotton candy machines, etc.
          </p>
          <p className="mt-4 max-w-6xl text-[16px] font-bold leading-6 text-neutral-950">
            Support customized processing and provide personalized solutions according to customer needs.<br />
            We have stable production capacity and a comprehensive service system, and our products are widely used in various catering and food processing scenarios.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-7 md:grid-cols-[255px_1fr]">
          <Reveal as="div" className="border border-neutral-200 bg-[#f3f3f3]">
            <nav aria-label="Home product categories">
              {categories.slice(0, 10).map((category) => (
                <div key={category.slug} className="group relative">
                  <Link href={`/products?category=${category.slug}`} className="flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold text-neutral-900 transition-colors hover:bg-[#f39a00] hover:text-white group-hover:bg-[#f39a00] group-hover:text-white">
                    <span>{resolveText(category.name)}</span><ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {category.subcategories.length > 0 && <ul data-home-hover-submenu className="invisible absolute left-full top-0 z-30 hidden min-w-64 bg-[#f39a00] py-2 opacity-0 shadow-xl transition md:block md:group-hover:visible md:group-hover:opacity-100 md:group-focus-within:visible md:group-focus-within:opacity-100">
                    {category.subcategories.map((sub) => <li key={sub.slug}><Link href={`/products?category=${category.slug}&sub=${sub.slug}`} className="block px-4 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#f39a00]">{resolveText(sub.name)}</Link></li>)}
                  </ul>}
                </div>
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
