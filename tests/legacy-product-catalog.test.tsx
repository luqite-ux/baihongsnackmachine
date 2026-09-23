import { render, screen, within } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { ProductDisplayHero } from "@/components/products/product-display-hero"
import { CategoryNav } from "@/components/products/category-nav"
import { ProductCatalog } from "@/components/product-catalog"
import { ProductPageIntro } from "@/components/products/product-page-intro"
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
  test("keeps the original breadcrumb and product introduction copy", () => {
    render(<ProductPageIntro />)

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toHaveTextContent("HOME")
    expect(screen.getByRole("heading", { name: "Main Product Category" })).toBeVisible()
    expect(screen.getByText(/burger grills, sausage ovens, bird egg ovens/i)).toBeVisible()
    expect(screen.getByText(/stable production capacity and a comprehensive service system/i)).toBeVisible()
  })

  test("renders the original product-display artwork, copy and grey category rail", () => {
    render(<><ProductDisplayHero /><CategoryNav categories={categories} /></>)

    expect(screen.getByRole("heading", { name: "PRODUCT DISPLAY" })).toBeVisible()
    expect(screen.getByText(/Introducing advanced technology, integrating research and development/i)).toBeVisible()
    expect(screen.getByRole("img", { name: "Baihong product range" })).toHaveAttribute("src", expect.stringContaining("product-display-collage.png"))
    const desktopNav = screen.getByRole("navigation", { name: "Product categories" })
    const mobileNav = screen.getByRole("navigation", { name: "Mobile product categories" })
    expect(desktopNav).toHaveClass("bg-[#f3f3f3]")
    expect(within(mobileNav).getByRole("link", { name: "Gas Grill" })).toHaveAttribute("href", "/products?category=grill&sub=gas-grill")
    expect(desktopNav.querySelector('[data-hover-submenu="grill"]')).toBeTruthy()
    expect(desktopNav.querySelector('[data-hover-submenu="grill"]')).not.toHaveClass("hidden")
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

  test("shows direct page numbers so visitors can understand the catalogue range", () => {
    render(<ProductCatalog data={{ ...data, page: 4, total: 42, totalPages: 7 }} category="grill" sub="gas-grill" />)
    const pages = screen.getByRole("navigation", { name: "Product pages" })

    expect(within(pages).getByRole("link", { name: "Page 1" })).toHaveAttribute("href", "/products?category=grill&sub=gas-grill")
    expect(within(pages).getByText("4")).toHaveAttribute("aria-current", "page")
    expect(within(pages).getByRole("link", { name: "Page 7" })).toHaveAttribute("href", "/products?category=grill&sub=gas-grill&page=7")
    expect(within(pages).getAllByText("...")).toHaveLength(2)
  })
})
