import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className ?? ""}`} aria-label={`${siteConfig.brand} home`}>
      <Image
        src={siteConfig.logo || "/placeholder.svg"}
        alt={`${siteConfig.brand} logo`}
        width={44}
        height={52}
        className="h-10 w-auto sm:h-11"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-tight text-primary sm:text-xl">{siteConfig.brand}</span>
        <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Kitchen Equipment</span>
      </span>
    </Link>
  )
}
