import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"
import { getRequestLocale } from "@/lib/request-locale"
import { buildLocaleAlternates } from "@/lib/seo-locale"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const title = locale === "zh" ? `${siteConfig.brand} | ${siteConfig.legalNameZh}` : `${siteConfig.brand} | ${siteConfig.legalNameEn}`
  const description = locale === "zh" ? "专注于商用食品机械设计、生产与加工。" : siteConfig.positioning
  return {
    metadataBase: new URL(siteConfig.url), title: { default: title, template: `%s | ${siteConfig.brand}` }, description,
    alternates: buildLocaleAlternates("/", locale),
    icons: { icon: "/images/brand/baihong-favicon.png", apple: "/images/brand/baihong-favicon.png" },
    openGraph: { title, description, url: locale === "zh" ? `${siteConfig.url}/zh` : siteConfig.url, siteName: siteConfig.brand, type: "website", images: [siteConfig.logo] },
    twitter: { card: "summary_large_image", title, description, images: [siteConfig.logo] },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f39a00",
}

function OrganizationStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalNameEn,
    alternateName: siteConfig.legalNameZh,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.positioning,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressCountry: "CN",
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getRequestLocale()
  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <OrganizationStructuredData />
        <div className="flex min-h-screen flex-col">
          <SiteHeader locale={locale} />
          <main className="flex-1">{children}</main>
          <SiteFooter locale={locale} />
        </div>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
