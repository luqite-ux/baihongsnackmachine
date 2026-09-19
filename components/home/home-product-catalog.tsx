import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Reveal } from "@/components/motion/reveal"
import { localePath, resolveText } from "@/lib/locale"
import type { Locale, Product, ProductCategory } from "@/lib/types"

export function HomeProductCatalog({ categories, products, locale }: { categories: ProductCategory[]; products: Product[]; locale: Locale }) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-0">
        <Reveal>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[22px] font-black text-[#f39a00]">{locale === "zh" ? "产品" : "PRODUCT"}</p>
              <h2 className="mt-1 text-[38px] font-black leading-tight text-neutral-950">{locale === "zh" ? "主要产品分类" : "Main Product Category"}</h2>
            </div>
            <Link href={localePath("/products", locale)} className="mt-9 shrink-0 bg-[#f39a00] px-6 py-3 text-sm font-bold text-white hover:bg-black">{locale === "zh" ? "查看更多" : "VIEW MORE"} &gt;</Link>
          </div>
          <p className="mt-3 max-w-5xl text-[16px] font-bold leading-6 text-neutral-950">
            {locale === "zh" ? "我们的主要产品包括烧烤炉、汉堡炉、香肠机、鹌鹑蛋机、章鱼小丸子机、油炸炉、煎炉、爆米花机和棉花糖机等。" : "Our main products include barbecue grills, burger grills, sausage ovens, bird egg ovens, octopus ball machines, deep fryers, grills, popcorn machines, cotton candy machines, etc."}
          </p>
          <p className="mt-4 max-w-6xl text-[16px] font-bold leading-6 text-neutral-950">
            {locale === "zh" ? <>支持定制加工，根据客户需求提供个性化解决方案。<br />我们拥有稳定的生产能力和完善的服务体系，产品广泛应用于餐饮及食品加工场景。</> : <>Support customized processing and provide personalized solutions according to customer needs.<br />We have stable production capacity and a comprehensive service system, and our products are widely used in various catering and food processing scenarios.</>}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-7 md:grid-cols-[255px_1fr]">
          <Reveal as="div" className="border border-neutral-200 bg-[#f3f3f3]">
            <nav aria-label="Home product categories">
              {categories.slice(0, 10).map((category) => (
                <div key={category.slug} className="group relative">
                  <Link href={localePath(`/products?category=${category.slug}`, locale)} className="flex min-h-14 items-center justify-between border-b border-white px-4 text-sm font-bold text-neutral-900 transition-colors hover:bg-[#f39a00] hover:text-white group-hover:bg-[#f39a00] group-hover:text-white">
                    <span>{resolveText(category.name, locale)}</span><ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {category.subcategories.length > 0 && <ul data-home-hover-submenu className="invisible absolute left-full top-0 z-30 hidden min-w-64 bg-[#f39a00] py-2 opacity-0 shadow-xl transition md:block md:group-hover:visible md:group-hover:opacity-100 md:group-focus-within:visible md:group-focus-within:opacity-100">
                    {category.subcategories.map((sub) => <li key={sub.slug}><Link href={localePath(`/products?category=${category.slug}&sub=${sub.slug}`, locale)} className="block px-4 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#f39a00]">{resolveText(sub.name, locale)}</Link></li>)}
                  </ul>}
                </div>
              ))}
            </nav>
          </Reveal>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product, index) => (
              <Reveal key={product.slug} as="li" delay={Math.min(index, 5) * 50}>
                <ProductCard product={product} bareListItem locale={locale} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
