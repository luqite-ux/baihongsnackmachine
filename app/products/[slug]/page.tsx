import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { fetchCategories, fetchProductBySlug, fetchRelatedProducts } from "@/lib/products-db"
import { localePath, resolveText } from "@/lib/locale"
import { siteConfig } from "@/lib/site-config"
import { getRequestLocale } from "@/lib/request-locale"

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getRequestLocale()
  const product = await fetchProductBySlug(slug)
  if (!product) return {}
  const name = resolveText(product.name, locale)
  const description = product.summary ? resolveText(product.summary, locale) : `${name} from ${siteConfig.brand}.`
  const url = localePath(`/products/${product.slug}`, locale)
  const image = product.image.src.startsWith("http") ? product.image.src : `${siteConfig.url}${product.image.src}`
  return {
    title: name,
    description,
    alternates: { canonical: url, languages: { en: `/products/${product.slug}`, "zh-CN": `/zh/products/${product.slug}`, "x-default": `/products/${product.slug}` } },
    openGraph: { title: name, description, url, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: name, description, images: [image] },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const locale = await getRequestLocale()
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()

  const categories = await fetchCategories()
  const category = categories.find((item) => item.slug === product.categorySlug)
  const related = await fetchRelatedProducts(product)
  const name = resolveText(product.name, locale)

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/products/${product.slug}#product`,
    name,
    description: product.description ? resolveText(product.description, locale) : undefined,
    image: product.image.src.startsWith("http") ? product.image.src : `${siteConfig.url}${product.image.src}`,
    url: `${siteConfig.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: siteConfig.brand },
    manufacturer: { "@id": `${siteConfig.url}/#organization` },
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: `${siteConfig.url}/products` },
      ...(category ? [{ "@type": "ListItem", position: 2, name: resolveText(category.name, locale), item: `${siteConfig.url}${localePath(`/products?category=${category.slug}`, locale)}` }] : []),
      { "@type": "ListItem", position: category ? 3 : 2, name, item: `${siteConfig.url}/products/${product.slug}` },
    ],
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href={localePath("/products", locale)} className="hover:text-primary">
          {locale === "zh" ? "产品中心" : "Products"}
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href={localePath(`/products?category=${category.slug}`, locale)} className="hover:text-primary">
              {resolveText(category.name, locale)}
            </Link>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-foreground" aria-current="page">
          {name}
        </span>
      </nav>

      <div className="mx-auto max-w-4xl">
        <div className="relative mx-auto h-[220px] w-full max-w-[520px] bg-white sm:h-[280px]">
          <Image
            src={product.image.src || "/placeholder.svg"}
            alt={resolveText(product.image.alt, locale) || name}
            fill
            sizes="(min-width: 640px) 520px, 100vw"
            className="object-contain p-2 sm:p-4"
            priority
          />
        </div>

          <div className="mt-5">
          <div className="text-center">
            {category && <p className="text-sm font-semibold uppercase tracking-wide text-primary">{resolveText(category.name, locale)}</p>}
            <h1 className="mt-2 text-3xl font-bold text-foreground">{name}</h1>
            {product.model && <p className="mt-5 text-sm text-neutral-600">{product.model}</p>}
          </div>

          <div aria-label="Product image gallery" className="mt-14 space-y-10">
            {(product.images?.length ? product.images : [product.image]).map((image, index) => (
              <div key={`${image.src}-${index}`} className="relative mx-auto aspect-[4/3] w-full bg-white">
                <Image src={image.src} alt={`${resolveText(image.alt, locale) || name}${index ? ` ${index + 1}` : ""}`} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-contain" />
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-3 text-muted-foreground">
            {product.summary && <p>{resolveText(product.summary, locale)}</p>}
            {product.description && resolveText(product.description, locale) !== resolveText(product.summary, locale) && (
              <p>{resolveText(product.description, locale)}</p>
            )}
          </div>

          <div className="mt-8 border border-border bg-secondary/40 p-5">
            <p className="text-sm text-muted-foreground">
              {locale === "zh" ? "价格、定制要求和交期以具体订单为准。请提交询盘，我们的团队将及时跟进。" : "Pricing, customization and lead time depend on your order. Send an inquiry and our team will follow up."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={localePath(`/contact?product=${encodeURIComponent(name)}`, locale)}>{locale === "zh" ? "获取报价" : "Request a Quote"}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-foreground">{locale === "zh" ? "相关产品" : "Related Products"}</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} locale={locale} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
