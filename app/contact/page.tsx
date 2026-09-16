import type { Metadata } from "next"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { InquiryForm } from "@/components/contact/inquiry-form"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact / Request a Quote",
  description: "Send Baihong your equipment requirement and get a quote from our team.",
}

interface ContactPageProps {
  searchParams: Promise<{ product?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { product } = await searchParams

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact / Request a Quote"
        description="Tell us what you need and our team will follow up with pricing and options. No prices are published online."
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:px-8 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-foreground">Direct Contact</h2>
            <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
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
        </div>

        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <h2 className="mb-6 font-semibold text-foreground">Request a Quote</h2>
          <InquiryForm defaultProduct={product} />
        </div>
      </div>
    </>
  )
}
