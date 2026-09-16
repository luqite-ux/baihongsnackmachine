import { NewsPreview } from "@/components/home/news-preview"
import { HomePageSections } from "@/components/home/home-page-sections"
import { fetchBannerSlides } from "@/lib/data/banners"
import { fetchCategories, fetchProducts } from "@/lib/products-db"

export const revalidate = 60

export default async function HomePage() {
  const [bannerSlides, categories, productPage] = await Promise.all([
    fetchBannerSlides(),
    fetchCategories(),
    fetchProducts({ page: 1, pageSize: 6 }),
  ])
  return (
    <HomePageSections
      slides={bannerSlides}
      categories={categories}
      products={productPage.items}
      newsSlot={<NewsPreview />}
    />
  )
}
