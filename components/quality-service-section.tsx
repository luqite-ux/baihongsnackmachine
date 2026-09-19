import { Mail, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import type { Locale } from "@/lib/types"

export function QualityServiceSection({ locale }: { locale: Locale }) {
  return (
    <section className="bg-neutral-950 py-16 text-center text-white">
      <div className="mx-auto max-w-[1100px] px-5">
        <p className="text-[22px] font-bold text-[#f39a00]">{locale === "zh" ? "品质服务" : "QUALITY SERVICE"}</p>
        <h2 className="mt-2 text-[30px] font-black sm:text-[34px]">{locale === "zh" ? "根据客户需求提供个性化解决方案" : "Provide personalized solutions based on customer needs"}</h2>
        <p className="mx-auto mt-6 max-w-5xl text-[16px] font-semibold leading-7 text-white/85">{locale === "zh" ? "我们具备稳定的生产能力和完善的服务体系，产品广泛应用于餐饮及食品加工场景。团队深耕行业多年，以可靠品质和及时响应服务客户，是厨房设备定制合作伙伴。" : "We have stable production capacity and a comprehensive service system, and our products are widely used in various catering and food processing scenarios. We have been deeply involved in the industry for many years, winning the trust of customers with reliable quality and efficient response. We are your high-quality partner for customizing kitchen equipment."}</p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          <a href={siteConfig.phoneHref} className="flex min-h-16 items-center justify-center gap-3 bg-white px-6 py-3 font-bold text-neutral-950 transition hover:bg-[#f39a00] hover:text-white">
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span>{siteConfig.phone} · {locale === "zh" ? "欢迎洽谈" : "Welcome to negotiate"}</span>
          </a>
          <a href={siteConfig.emailHref} className="flex min-h-16 items-center justify-center gap-3 bg-white px-6 py-3 font-bold text-neutral-950 transition hover:bg-[#f39a00] hover:text-white">
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span>{siteConfig.email} · {locale === "zh" ? "发送邮件资料" : "Send email information"}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
