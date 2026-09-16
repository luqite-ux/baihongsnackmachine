/**
 * Shared content types for the Baihong site.
 *
 * Text fields that may need translation in the future are modeled as
 * `LocalizedText` (a partial map of locale -> string) instead of plain
 * strings, so pages, categories, products and articles can be swapped for
 * server-side backend queries later without redesigning components.
 */

export type Locale = "en" | "zh"

export const DEFAULT_LOCALE: Locale = "en"

/** Partial so content can launch English-only and gain locales incrementally. */
export type LocalizedText = Partial<Record<Locale, string>>

export interface ProductCategory {
  slug: string
  name: LocalizedText
  /** Short line describing the group, shown in the left navigation and product intro. */
  description?: LocalizedText
  /** Lucide icon name used consistently across category chips and cards. */
  icon: string
  subcategories: ProductSubcategory[]
}

export interface ProductSubcategory {
  slug: string
  name: LocalizedText
}

export interface ProductImage {
  src: string
  width: number
  height: number
  alt: LocalizedText
}

export interface Product {
  slug: string
  name: LocalizedText
  categorySlug: string
  subcategorySlug?: string
  summary?: LocalizedText
  description?: LocalizedText
  image: ProductImage
  /** True when the photo is a verified customer-supplied asset rather than a placeholder. */
  isVerifiedImage?: boolean
}

export interface Article {
  slug: string
  title: LocalizedText
  excerpt?: LocalizedText
  body?: LocalizedText
  publishedAt?: string
}

export interface FaqItem {
  question: LocalizedText
  answer: LocalizedText
}
