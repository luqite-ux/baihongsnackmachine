import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { InquiryForm } from "@/components/contact/inquiry-form"
import { siteConfig } from "@/lib/site-config"
import { getRequestLocale } from "@/lib/request-locale"
import { localePath } from "@/lib/locale"

export const metadata: Metadata = {
  title: "Contact / Request a Quote",
  description: "Send Baihong your equipment requirement and get a quote from our team.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact / Request a Quote", description: "Send Baihong your equipment requirement and get a quote from our team.", url: "/contact", type: "website", images: [siteConfig.logo] },
}

interface ContactPageProps {
  searchParams: Promise<{ product?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { product } = await searchParams
  const locale = await getRequestLocale()

  return (
    <>
      <PageHeader
        title={locale === "zh" ? "联系我们" : "CONTACT US"}
        description={locale === "zh" ? "专注于食品机械设计、生产与加工的制造商" : "A manufacturer specializing in the design, production, and processing of food machinery"}
        secondaryDescription="Introducing advanced technology, integrating research and development, manufacturing, and sales internally, possessing comprehensive quality inspection and testing instruments, experienced engineers, and a production and after-sales service team with over 10 years of experience."
      />
      <div className="mx-auto max-w-[1248px] px-5 py-14 md:px-6 lg:px-0">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-4 text-[14px] text-neutral-500">
          <Link href={localePath("/", locale)} className="transition-colors hover:text-[#f39a00]">{locale === "zh" ? "首页" : "HOME"}</Link><span aria-hidden="true">›</span><span>{locale === "zh" ? "联系我们" : "CONTACT"}</span>
        </nav>
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="space-y-8 px-4 text-center md:px-8">
            <Image src={siteConfig.logo} alt="BAIHONG" width={190} height={145} className="mx-auto h-auto w-[145px] object-contain" />
            <ul className="space-y-5 text-left text-[15px] text-neutral-700">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={siteConfig.phoneHref} className="hover:text-primary">
                  {siteConfig.phone} (Phone / WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={siteConfig.emailHref} className="hover:text-primary">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-[24px] font-black text-neutral-950">{locale === "zh" ? "快速留言" : "Quick Message"}</h2>
            <InquiryForm defaultProduct={product} locale={locale} />
          </div>
        </div>
      </div>

      <section className="bg-neutral-950 py-16 text-center text-white">
        <div className="mx-auto max-w-[1100px] px-5">
          <p className="text-[22px] font-bold text-[#f39a00]">QUALITY SERVICE</p>
          <h2 className="mt-2 text-[34px] font-black">Provide personalized solutions based on customer needs</h2>
          <p className="mx-auto mt-6 max-w-5xl text-[16px] font-semibold leading-7 text-white/85">We have stable production capacity and a comprehensive service system, and our products are widely used in various catering and food processing scenarios. We have been deeply involved in the industry for many years, winning the trust of customers with reliable quality and efficient response. We are your high-quality partner for customizing kitchen equipment.</p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={siteConfig.phoneHref} className="bg-[#f39a00] px-7 py-3 font-bold text-white">{siteConfig.phone} · Welcome to negotiate</a>
            <a href={siteConfig.emailHref} className="border border-white/70 px-7 py-3 font-bold text-white">{siteConfig.email} · Send email information</a>
          </div>
        </div>
      </section>
    </>
  )
}
