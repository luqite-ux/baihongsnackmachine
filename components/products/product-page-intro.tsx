import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function ProductPageIntro() {
  return (
    <div className="mb-7">
      <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-3 text-[13px] text-neutral-500">
        <Link href="/" className="text-neutral-700 hover:text-[#f39a00]">HOME</Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span>PRODUCT</span>
      </nav>
      <h2 className="text-[42px] font-black leading-tight text-neutral-950">Main Product Category</h2>
      <p className="mt-4 max-w-[1240px] text-[16px] font-bold leading-[1.4] text-neutral-950">
        Our main products include barbecue grills, burger grills, sausage ovens, bird egg ovens, octopus ball machines, deep fryers, grills, popcorn machines, cotton candy machines, etc.
      </p>
      <p className="mt-4 max-w-[1240px] text-[16px] font-bold leading-[1.4] text-neutral-950">
        Support customized processing and provide personalized solutions according to customer needs.<br />
        We have stable production capacity and a comprehensive service system, and our products are widely used in various catering and food processing scenarios.
      </p>
    </div>
  )
}
