import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function Logo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center ${className ?? ""}`} aria-label={`${siteConfig.brand} home`}>
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
