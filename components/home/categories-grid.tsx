import Link from "next/link"
import { fetchCategories } from "@/lib/products-db"
import { resolveText } from "@/lib/locale"
import { CategoryIcon } from "@/components/category-icon"
import { Reveal } from "@/components/motion/reveal"

export async function CategoriesGrid() {
  const categories = await fetchCategories()
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Product Range</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">Main Product Categories</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse the equipment groups Baihong manufactures, from barbecue grills to snack-forming machines.
          </p>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, i) => (
            <Reveal key={category.slug} as="li" delay={Math.min(i, 6) * 40}>
              <Link
                href={`/products?category=${category.slug}`}
                className="flex h-full flex-col items-center gap-3 rounded-lg border border-border bg-card p-5 text-center transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CategoryIcon name={category.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-foreground">{resolveText(category.name)}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
