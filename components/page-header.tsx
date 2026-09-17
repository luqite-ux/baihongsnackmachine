import type { ReactNode } from "react"
import Image from "next/image"

export function PageHeader({
  eyebrow,
  title,
  description,
  secondaryDescription,
  variant = "image",
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  secondaryDescription?: string
  variant?: "image" | "solid"
  children?: ReactNode
}) {
  return (
    <section
      data-testid="legacy-page-hero"
      className={`relative isolate overflow-hidden text-white ${variant === "solid" ? "bg-[#0e075f]" : "bg-black"}`}
    >
      {variant === "image" && (
        <>
          <Image
            src="/images/banners/banner-2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-left md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        </>
      )}
      <div className="relative mx-auto flex min-h-[355px] max-w-[1000px] items-center px-4 py-12 sm:px-6 lg:px-0">
        <div className="max-w-[610px]">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f39a00]">{eyebrow}</p>}
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-base font-semibold leading-5 text-white">{description}</p>}
          {secondaryDescription && <p className="mt-3 max-w-2xl text-base font-semibold leading-5 text-white">{secondaryDescription}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
