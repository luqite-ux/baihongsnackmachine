import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { resolveText } from "@/lib/locale"

export function ProductCard({ product }: { product: Product }) {
  const name = resolveText(product.name)
  const categoryName = product.categorySlug.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ")

  return (
    <li className="group">
      <Link
        href={`/products/${product.slug}`}
        className="block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative flex aspect-square items-center justify-center bg-neutral-50 p-6">
          <Image
            src={product.image.src || "/placeholder.svg"}
            alt={resolveText(product.image.alt) || name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-6 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="border-t border-border p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">{categoryName}</p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{name}</h3>
          {product.summary && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{resolveText(product.summary)}</p>
          )}
        </div>
      </Link>
    </li>
  )
}
