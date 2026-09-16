import { render, screen, within } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import { SiteHeader } from "@/components/site-header"
import { BannerCarousel } from "@/components/home/banner-carousel"
import { bannerSlides } from "@/lib/data/banners"

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("legacy header and banner contract", () => {
  test("keeps the old-site utility message, home navigation, and official logo home link", () => {
    render(<SiteHeader />)

    expect(screen.getByText(/specializing in the design, production and processing of food machinery/i)).toBeVisible()
    expect(screen.getByRole("link", { name: /baihong home/i })).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: "HOME" })).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: /15252102737/ })).toHaveAttribute("href", "tel:+8615252102737")
  })

  test("uses the original banner artwork without replacement quote CTAs", () => {
    render(<BannerCarousel slides={bannerSlides} />)

    const carousel = screen.getByRole("region", { name: /featured products/i })
    expect(within(carousel).getAllByRole("group", { hidden: true })).toHaveLength(3)
    expect(within(carousel).getByText("BLACK DIAMOND BBQ GRILL")).toBeInTheDocument()
    expect(within(carousel).getByText("High Temperature Resistance")).toBeInTheDocument()
    expect(within(carousel).queryByRole("link", { name: /request a quote/i })).not.toBeInTheDocument()
    expect(within(carousel).getByRole("button", { name: /previous slide/i })).toBeInTheDocument()
    expect(within(carousel).getByRole("button", { name: /next slide/i })).toBeInTheDocument()
  })
})
