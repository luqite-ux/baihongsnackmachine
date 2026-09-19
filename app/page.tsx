import { NewsPreview } from "@/components/home/news-preview"
import { HomePageSections } from "@/components/home/home-page-sections"
import { fetchBannerSlides } from "@/lib/data/banners"
import { fetchCategories, fetchProducts } from "@/lib/products-db"
import { getRequestLocale } from "@/lib/request-locale"

const zhSlides = {
  grill: { eyebrow: "商用烧烤设备", title: "黑金刚烧烤炉", body: "升温速度快，最高温度可达850°C，适用于聚餐、烧烤派对、摊位及门店烧烤。", bullets: ["耐高温", "支持定制", "易于清洁", "坚固耐用"] },
  collection: { eyebrow: "ODM 与 OEM", title: "研发、制造与销售", body: "主要产品包括烧烤炉、汉堡炉、香肠机、鹌鹑蛋机、章鱼小丸子机、油炸炉、煎炉、爆米花机和棉花糖机。", bullets: ["质量检测仪器", "经验丰富的工程师", "生产团队", "售后服务团队"] },
  manufacturing: { eyebrow: "百泓制造", title: "设计、生产与加工", body: "徐州百泓厨房设备有限公司专注于食品机械的设计、生产与加工。", bullets: ["6000平方米厂区", "3个车间", "6条生产线", "公开月产能：30000件"] },
}

export const revalidate = 60

export default async function HomePage() {
  const locale = await getRequestLocale()
  const [bannerSlides, categories, productPage] = await Promise.all([
    fetchBannerSlides(),
    fetchCategories(),
    fetchProducts({ page: 1, pageSize: 6 }),
  ])
  const slides = locale === "zh" ? bannerSlides.map((slide) => ({ ...slide, ...(zhSlides[slide.id as keyof typeof zhSlides] || {}) })) : bannerSlides
  return (
    <HomePageSections
      slides={slides}
      categories={categories}
      products={productPage.items}
      newsSlot={<NewsPreview locale={locale} />}
      locale={locale}
    />
  )
}
