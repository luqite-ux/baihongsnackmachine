import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { fetchCategories, fetchProductBySlug, fetchRelatedProducts } from "@/lib/products-db"
import { resolveText } from "@/lib/locale"
import { siteConfig } from "@/lib/site-config"

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) return {}
  const name = resolveText(product.name)
  return {
    title: name,
    description: product.summary ? resolveText(product.summary) : `${name} from ${siteConfig.brand}.`,
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()

  const categories = await fetchCategories()
  const category = categories.find((item) => item.slug === product.categorySlug)
  const related = await fetchRelatedProducts(product)
  const name = resolveText(product.name)

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/products/${product.slug}#product`,
    name,
    description: product.description ? resolveText(product.description) : undefined,
    image: product.image.src.startsWith("http") ? product.image.src : `${siteConfig.url}${product.image.src}`,
    url: `${siteConfig.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: siteConfig.brand },
    manufacturer: { "@id": `${siteConfig.url}/#organization` },
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href={`/products?category=${category.slug}`} className="hover:text-primary">
              {resolveText(category.name)}
            </Link>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-foreground" aria-current="page">
          {name}
        </span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative flex aspect-square items-center justify-center rounded-lg border border-border bg-neutral-50">
          <Image
            src={product.image.src || "/placeholder.svg"}
            alt={resolveText(product.image.alt) || name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-10"
            priority
          />
        </div>

        <div>
          {category && <p className="text-sm font-semibold uppercase tracking-wide text-primary">{resolveText(category.name)}</p>}
          <h1 className="mt-2 text-3xl font-bold text-foreground">{name}</h1>
          {product.summary && <p className="mt-4 text-muted-foreground">{resolveText(product.summary)}</p>}
          {product.description && <p className="mt-3 text-muted-foreground">{resolveText(product.description)}</p>}

          <div className="mt-8 rounded-lg border border-border bg-secondary/40 p-5">
            <p className="text-sm text-muted-foreground">
              Pricing, customization and lead time depend on your order. Send an inquiry and our team will follow
              up.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/contact?product=${encodeURIComponent(name)}`}>Request a Quote</Link>
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
          <h2 className="text-xl font-bold text-foreground">Related Products</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
