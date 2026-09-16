import { render, screen, within } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import { SiteFooter } from "@/components/site-footer"

describe("legacy footer contract", () => {
  test("publishes the legal owner, verified contacts, site links, and product-category shortcuts", () => {
    render(<SiteFooter />)

    const footer = screen.getByRole("contentinfo")
    expect(within(footer).getByRole("link", { name: /baihong home/i })).toHaveAttribute("href", "/")
    expect(within(footer).getByRole("heading", { name: "Quick Links" })).toBeVisible()
    expect(within(footer).getByRole("heading", { name: "Product Categories" })).toBeVisible()
    expect(within(footer).getByRole("link", { name: "Grill" })).toHaveAttribute("href", "/products?category=grill")
    expect(within(footer).getByRole("link", { name: /15252102737/ })).toHaveAttribute("href", "tel:+8615252102737")
    expect(within(footer).getByRole("link", { name: "info@baihongsnackmachine.com" })).toHaveAttribute(
      "href",
      "mailto:info@baihongsnackmachine.com",
    )
    expect(footer).toHaveTextContent("Xuzhou Baihong Kitchen Equipment Co., Ltd. All rights reserved.")
  })
})
