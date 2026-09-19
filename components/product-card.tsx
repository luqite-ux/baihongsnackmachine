import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { resolveText } from "@/lib/locale"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function ProductCard({ product, bareListItem = false, locale = "en" }: { product: Product; bareListItem?: boolean; locale?: Locale }) {
  const name = resolveText(product.name, locale)
  const categoryName = product.categorySlug.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ")

  const content = (
    <div className="group h-full">
      <Link
        href={localePath(`/products/${product.slug}`, locale)}
        className="block h-full overflow-hidden border border-neutral-200 bg-white transition-colors hover:border-[#f39a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39a00]"
      >
        <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-4">
          <Image
            src={product.image.src || "/placeholder.svg"}
            alt={resolveText(product.image.alt, locale) || name}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-[1.025]"
          />
        </div>
        <div className="border-t border-neutral-200 bg-[#f3f3f3] px-4 py-3 text-center transition-colors group-hover:bg-[#f39a00] group-hover:text-white">
          <h3 className="line-clamp-2 text-sm font-bold">{name}</h3>
          <p className="mt-1 text-xs text-neutral-500 group-hover:text-white/85">{categoryName}</p>
          {product.summary && (
            <p className="mt-1 line-clamp-1 text-xs text-neutral-500 group-hover:text-white/85">{resolveText(product.summary, locale)}</p>
          )}
        </div>
      </Link>
    </div>
  )

  return bareListItem ? content : <li className="h-full">{content}</li>
}
