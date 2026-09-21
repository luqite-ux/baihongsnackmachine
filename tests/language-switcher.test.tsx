import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { LanguageSwitcher } from "@/components/language-switcher"

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} data-next-link="true" {...props}>
      {children}
    </a>
  ),
}))

describe("LanguageSwitcher", () => {
  it("uses a full-document navigation when changing locale", () => {
    render(<LanguageSwitcher locale="en" />)

    fireEvent.click(screen.getByRole("button", { name: /English/i }))
    const chineseLink = screen.getByRole("menuitem", { name: "简体中文" })

    expect(chineseLink).toHaveAttribute("href", "/zh")
    expect(chineseLink).not.toHaveAttribute("data-next-link")
  })

  it("shows the active Chinese locale in the trigger", () => {
    render(<LanguageSwitcher locale="zh" />)

    expect(screen.getByRole("button", { name: /简体中文/ })).toBeInTheDocument()
  })
})
