import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function Logo({ className, imageClassName, locale = "en" }: { className?: string; imageClassName?: string; locale?: Locale }) {
  return (
    <Link href={localePath("/", locale)} className={`flex shrink-0 items-center ${className ?? ""}`} aria-label={`${siteConfig.brand} home`}>
      <Image
        src={siteConfig.logo || "/placeholder.svg"}
        alt={`${siteConfig.brand} logo`}
        width={629}
        height={753}
        className={imageClassName ?? "h-14 w-auto object-contain sm:h-16"}
        priority
      />
    </Link>
  )
}
