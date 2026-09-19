import fs from "node:fs"
import path from "node:path"
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { PageHeader } from "@/components/page-header"

describe("legacy inner-page parity", () => {
  test("uses the original shared photographic hero and product collage for content pages", () => {
    render(<PageHeader title="NEWS" description="Page introduction" />)

    expect(screen.getByRole("heading", { level: 1, name: "NEWS" })).toBeVisible()
    const hero = screen.getByTestId("legacy-page-hero")
    expect(hero).toHaveClass("text-white")
    expect(hero.querySelector('img[alt=""]')).toHaveAttribute("src", expect.stringContaining("product-display-bg.jpg"))
    expect(screen.getByRole("img", { name: "Baihong product range" })).toHaveAttribute(
      "src",
      expect.stringContaining("product-display-collage.png"),
    )
  })

  test("keeps the original About page sections and wording", () => {
    const about = fs.readFileSync(path.join(process.cwd(), "app/about/page.tsx"), "utf8")

    expect(about).toContain("The company was established in 2013")
    expect(about).toContain('locale === "zh" ? "查看更多" : "VIEW MORE"')
    expect(about).toContain("CapabilitySection")
    expect(about).toContain("VIDEO PRESENTATION")
    expect(about).toContain("about-factory.jpg")
  })

  test("keeps the product catalogue shell stable across list pagination without sticky positioning", () => {
    const root = process.cwd()
    const rootLayout = fs.readFileSync(path.join(root, "app/products/layout.tsx"), "utf8")
    const layout = fs.readFileSync(path.join(root, "app/products/(catalog)/layout.tsx"), "utf8")
    const listing = fs.readFileSync(path.join(root, "app/products/(catalog)/page.tsx"), "utf8")

    expect(layout).toContain("ProductDisplayHero")
    expect(layout).toContain("CategoryNav")
    expect(layout).not.toContain("md:sticky")
    expect(rootLayout).not.toContain("ProductDisplayHero")
    expect(listing).not.toContain("ProductDisplayHero")
    expect(listing).not.toContain("CategoryNav")
  })

  test("uses the legacy single-column product detail composition", () => {
    const detail = fs.readFileSync(path.join(process.cwd(), "app/products/[slug]/page.tsx"), "utf8")

    expect(detail).not.toContain("md:grid-cols-2")
    expect(detail).toContain("max-w-4xl")
    expect(detail).toContain("text-center")
    expect(detail).toContain("max-w-[520px]")
    expect(detail).not.toContain('aspect-[16/9]')
  })

  test("keeps the old product-page quality-service block and news-detail breadcrumb", () => {
    const root = process.cwd()
    const productsLayout = fs.readFileSync(path.join(root, "app/products/(catalog)/layout.tsx"), "utf8")
    const newsDetail = fs.readFileSync(path.join(root, "app/news/[slug]/page.tsx"), "utf8")

    expect(productsLayout).toContain("QualityServiceSection")
    expect(newsDetail).toContain('aria-label="Breadcrumb"')
  })
})
