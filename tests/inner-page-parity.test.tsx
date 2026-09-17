import fs from "node:fs"
import path from "node:path"
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { PageHeader } from "@/components/page-header"

describe("legacy inner-page parity", () => {
  test("uses the shared dark photographic hero for content pages", () => {
    render(<PageHeader title="NEWS" description="Page introduction" />)

    expect(screen.getByRole("heading", { level: 1, name: "NEWS" })).toBeVisible()
    const hero = screen.getByTestId("legacy-page-hero")
    expect(hero).toHaveClass("text-white")
    expect(hero.querySelector("img")).toHaveAttribute("src", expect.stringContaining("banner-2.jpg"))
    expect(hero.querySelector("img")).toHaveClass("object-left", "md:object-center")
  })

  test("keeps the product catalogue shell off product detail routes", () => {
    const root = process.cwd()
    const layout = fs.readFileSync(path.join(root, "app/products/layout.tsx"), "utf8")
    const listing = fs.readFileSync(path.join(root, "app/products/page.tsx"), "utf8")

    expect(layout).not.toContain("ProductDisplayHero")
    expect(layout).not.toContain("CategoryNav")
    expect(listing).toContain("ProductDisplayHero")
    expect(listing).toContain("CategoryNav")
  })

  test("uses the legacy single-column product detail composition", () => {
    const detail = fs.readFileSync(path.join(process.cwd(), "app/products/[slug]/page.tsx"), "utf8")

    expect(detail).not.toContain("md:grid-cols-2")
    expect(detail).toContain("max-w-4xl")
    expect(detail).toContain("text-center")
  })
})
