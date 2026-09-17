import { describe, expect, test } from "vitest"
import { mapProduct } from "@/lib/products-db"

describe("legacy product detail mapping", () => {
  test("keeps the model number and complete detail gallery from migrated data", () => {
    const product = mapProduct({
      slug: "60-manual-barbecue-grill-1583100",
      name: "60 manual barbecue grill",
      name_i18n: { en: "60 manual barbecue grill" },
      description: "Gas barbecue grill",
      description_i18n: { en: "Gas barbecue grill" },
      category_slug: "grill",
      image_url: "https://example.com/primary.jpg",
      extra_data: {
        model: "BH-QSKL-60SD",
        images: ["https://example.com/primary.jpg", "https://example.com/detail.jpg"],
      },
    })

    expect(product.model).toBe("BH-QSKL-60SD")
    expect(product.images?.map((image) => image.src)).toEqual([
      "https://example.com/primary.jpg",
      "https://example.com/detail.jpg",
    ])
  })
})
