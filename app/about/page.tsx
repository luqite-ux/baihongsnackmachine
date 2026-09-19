import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { PageHeader } from "@/components/page-header"
import { CapabilitySection } from "@/components/home/capability-section"
import { siteConfig } from "@/lib/site-config"
import { getRequestLocale } from "@/lib/request-locale"
import { localePath } from "@/lib/locale"

export const metadata: Metadata = {
  title: "About Us",
  description: siteConfig.positioning,
  alternates: { canonical: "/about" },
  openGraph: { title: "About Us", description: siteConfig.positioning, url: "/about", type: "website" },
}

export default async function AboutPage() {
  const locale = await getRequestLocale()
  return (
    <>
      <PageHeader
        title={locale === "zh" ? "关于我们" : "ABOUT US"}
        description={locale === "zh" ? "专注于食品机械设计、生产与加工的制造商" : "A manufacturer specializing in the design, production, and processing of food machinery"}
        secondaryDescription="Introducing advanced technology, integrating research and development, manufacturing, and sales internally, possessing comprehensive quality inspection and testing instruments, experienced engineers, and a production and after-sales service team with over 10 years of experience."
      />

      <section className="mx-auto max-w-[1248px] px-5 py-16 md:px-6 lg:px-0">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-4 text-[14px] text-neutral-500">
          <Link href={localePath("/", locale)} className="transition-colors hover:text-[#f39a00]">{locale === "zh" ? "首页" : "HOME"}</Link>
          <span aria-hidden="true">›</span>
          <span>{locale === "zh" ? "关于我们" : "ABOUT US"}</span>
        </nav>
        <div className="grid gap-10 md:grid-cols-[52%_48%] md:items-center">
          <Reveal>
            <div className="relative aspect-[4160/1992] overflow-hidden">
              <Image
                src="/images/about/about-factory.jpg"
                alt="Xuzhou Baihong Kitchen Equipment factory"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="md:pl-4">
            <h2 className="text-[34px] font-black leading-tight text-neutral-950">{locale === "zh" ? "徐州百泓厨房设备有限公司" : "Xuzhou Baihong Kitchen Equipment Co., Ltd"}</h2>
            <p className="mt-7 text-[16px] font-medium leading-[1.65] text-neutral-800">
              {locale === "zh" ? "公司于2013年起步，2013年成立铜山区百平机械厂，2018年成立徐州百泓厨房设备有限公司。主要产品包括烧烤炉、汉堡炉、香肠机、鹌鹑蛋机、章鱼小丸子机、油炸炉、煎炉、爆米花机和棉花糖机等。公司引进设备与技术，集研发、制造和销售于一体，配备质量检测仪器，并拥有工程、生产及售后服务团队。" : "The company was established in 2013, with the establishment of tongshan District Baiping Machinery Factory in 2013 and the establishment of Xuzhou Baihong Kitchen Equipment Co., Ltd. in 2018. Our main products include barbecue grills, burger grills, sausage ovens, bird egg ovens, octopus ball machines, deep fryers, grills, popcorn machines, cotton candy machines, etc. We introduce advanced equipment and technology, and integrate research and development, manufacturing, and sales internally. We have complete quality inspection and testing instruments, experienced engineers, and a production and after-sales service team of more than 10 years."}
            </p>
            <Link href={localePath("/about", locale)} className="mt-8 inline-flex bg-[#f39a00] px-7 py-3 text-[16px] font-bold text-white transition-colors hover:bg-[#d98700]">
              {locale === "zh" ? "查看更多" : "VIEW MORE"} &gt;
            </Link>
          </Reveal>
        </div>
      </section>

      <CapabilitySection locale={locale} />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1248px] px-5 text-center md:px-6 lg:px-0">
          <Reveal>
            <h2 className="text-[34px] font-black text-neutral-950">{locale === "zh" ? "视频展示" : "VIDEO PRESENTATION"}</h2>
          </Reveal>
          <Reveal delay={100} className="mx-auto mt-9 max-w-[1000px]">
            <video
              controls
              preload="metadata"
              poster="/images/about/video-poster.jpg"
              className="aspect-video w-full bg-black object-cover"
            >
              <source src="/videos/about-presentation.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </Reveal>
        </div>
      </section>
    </>
  )
}
