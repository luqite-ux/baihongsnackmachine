import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { localePath } from "@/lib/locale"
import type { Locale } from "@/lib/types"

export function ProductPageIntro({ locale }: { locale: Locale }) {
  return (
    <div className="mb-7">
      <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-3 text-[13px] text-neutral-500">
        <Link href={localePath("/", locale)} className="text-neutral-700 hover:text-[#f39a00]">{locale === "zh" ? "首页" : "HOME"}</Link>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span>{locale === "zh" ? "产品中心" : "PRODUCT"}</span>
      </nav>
      <h2 className="text-[42px] font-black leading-tight text-neutral-950">{locale === "zh" ? "主要产品分类" : "Main Product Category"}</h2>
      <p className="mt-4 max-w-[1240px] text-[16px] font-bold leading-[1.4] text-neutral-950">
        {locale === "zh" ? "主要产品包括烧烤炉、汉堡炉、香肠机、鹌鹑蛋机、章鱼小丸子机、油炸炉、煎炉、爆米花机和棉花糖机等。" : "Our main products include barbecue grills, burger grills, sausage ovens, bird egg ovens, octopus ball machines, deep fryers, grills, popcorn machines, cotton candy machines, etc."}
      </p>
      <p className="mt-4 max-w-[1240px] text-[16px] font-bold leading-[1.4] text-neutral-950">
        {locale === "zh" ? "支持定制加工，并根据客户需求提供个性化解决方案。" : "Support customized processing and provide personalized solutions according to customer needs."}<br />
        {locale === "zh" ? "我们具备稳定的生产能力和完善的服务体系，产品广泛应用于餐饮及食品加工场景。" : "We have stable production capacity and a comprehensive service system, and our products are widely used in various catering and food processing scenarios."}
      </p>
    </div>
  )
}
