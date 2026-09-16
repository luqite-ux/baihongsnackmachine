export interface NavItem {
  href: string
  label: string
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/news", label: "News" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]
