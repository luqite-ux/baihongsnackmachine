import { render, screen, within } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { ProductDisplayHero } from "@/components/products/product-display-hero"
import { CategoryNav } from "@/components/products/category-nav"
import { ProductCatalog } from "@/components/product-catalog"
import type { ProductPage } from "@/lib/products-db"
import type { ProductCategory } from "@/lib/types"

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("category=grill&sub=gas-grill"),
}))

const categories: ProductCategory[] = [
  {
    slug: "grill",
    name: { en: "Grill" },
    description: { en: "Commercial grills" },
    icon: "CookingPot",
    subcategories: [{ slug: "gas-grill", name: { en: "Gas Grill" } }],
  },
]

const data: ProductPage = {
  page: 2,
  pageSize: 6,
  total: 18,
  totalPages: 3,
  items: Array.from({ length: 6 }, (_, index) => ({
    slug: `machine-${index + 1}`,
    name: { en: `Machine ${index + 1}` },
    categorySlug: "grill",
    subcategorySlug: "gas-grill",
    summary: { en: "Commercial machine" },
    image: { src: `/machine-${index + 1}.jpg`, width: 900, height: 900, alt: { en: `Machine ${index + 1}` } },
  })),
}

describe("legacy product catalogue", () => {
  test("renders the navy product-display hero and grey category rail", () => {
    render(<><ProductDisplayHero /><CategoryNav categories={categories} /></>)

    expect(screen.getByRole("heading", { name: "PRODUCT DISPLAY" })).toBeVisible()
    expect(screen.getAllByRole("navigation", { name: "Product categories" })[0]).toHaveClass("bg-[#f3f3f3]")
    expect(screen.getAllByRole("link", { name: "Gas Grill" }).every((link) => link.getAttribute("href") === "/products?category=grill&sub=gas-grill")).toBe(true)
    expect(screen.getAllByRole("navigation", { name: "Product categories" })[0].querySelector('[data-hover-submenu="grill"]')).toBeTruthy()
  })

  test("renders six complete product links and preserves filters in pagination", () => {
    render(<ProductCatalog data={data} activeCategory={categories[0]} category="grill" sub="gas-grill" />)

    const grid = screen.getByRole("list", { name: "Products" })
    expect(within(grid).getAllByRole("listitem")).toHaveLength(6)
    const productImages = within(grid).getAllByRole("img")
    expect(productImages).toHaveLength(6)
    expect(productImages.every((image) => image.getAttribute("loading") === "eager")).toBe(true)
    expect(screen.getByRole("link", { name: "Previous page" })).toHaveAttribute(
      "href",
      "/products?category=grill&sub=gas-grill",
    )
    expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute(
      "href",
      "/products?category=grill&sub=gas-grill&page=3",
    )
  })
})
