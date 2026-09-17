import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { HomePageSections } from "@/components/home/home-page-sections"
import { bannerSlides } from "@/lib/data/banners"
import type { Product, ProductCategory } from "@/lib/types"

const categories: ProductCategory[] = [
  { slug: "grill", name: { en: "Grill" }, description: { en: "Commercial grills" }, icon: "CookingPot", subcategories: [] },
  { slug: "deep-fryer", name: { en: "Deep Fryer" }, description: { en: "Commercial fryers" }, icon: "Flame", subcategories: [] },
]

const products: Product[] = Array.from({ length: 6 }, (_, index) => ({
  slug: `product-${index + 1}`,
  name: { en: `Product ${index + 1}` },
  categorySlug: index % 2 === 0 ? "grill" : "deep-fryer",
  summary: { en: "Commercial food machine" },
  image: { src: `/product-${index + 1}.jpg`, width: 800, height: 800, alt: { en: `Product ${index + 1}` } },
}))

describe("legacy home sequence", () => {
  test("renders the approved dense old-site section order with real product links", () => {
    const { container } = render(
      <HomePageSections
        slides={bannerSlides}
        categories={categories}
        products={products}
        newsSlot={<section aria-label="News"><h2>News</h2></section>}
      />,
    )

    const orderedLabels = [
      "Popular Keywords",
      "Main Product Category",
      "Years of Manufacturing Experience",
      "About Us",
      "BUSINESS ADVANTAGES",
      "Quality Service",
      "News",
      "Frequently Asked Questions",
    ]
    const text = container.textContent ?? ""
    const positions = orderedLabels.map((label) => text.indexOf(label))

    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(screen.getAllByRole("link", { name: /Product [1-6]/ })).toHaveLength(6)
    expect(screen.getAllByRole("link", { name: "Grill" }).every((link) => link.getAttribute("href") === "/products?category=grill")).toBe(true)
    expect(screen.getByRole("searchbox", { name: /search products/i })).toBeVisible()
    expect(screen.getByRole("link", { name: /view more/i })).toHaveAttribute("href", "/products")
    expect(screen.getAllByText(/burger grills, sausage ovens, bird egg ovens/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/stable production capacity and a comprehensive service system/i).length).toBeGreaterThan(0)
    expect(screen.getByRole("heading", { name: "Professional services started in 2013" })).toBeVisible()
    expect(screen.getByLabelText("Factory gallery")).toBeVisible()
  })
})
