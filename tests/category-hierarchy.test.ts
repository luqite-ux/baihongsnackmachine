import { describe, expect, test } from "vitest"
import { categoryFilterSlugs, mapCategoryHierarchy, mapProduct } from "@/lib/products-db"

describe("backend category hierarchy", () => {
  test("builds the public submenu from standard parent_id child rows", () => {
    const categories = mapCategoryHierarchy([
      {
        id: "root-grill",
        parent_id: null,
        slug: "grill",
        name: "Grill",
        name_i18n: { en: "Grill", zh: "烧烤炉" },
        description: null,
        description_i18n: null,
        extra_data: { icon: "CookingPot" },
      },
      {
        id: "child-gas",
        parent_id: "root-grill",
        slug: "gas-barbecue-grill",
        name: "Gas Barbecue Grill",
        name_i18n: { en: "Gas Barbecue Grill", zh: "燃气烧烤炉" },
        description: null,
        description_i18n: null,
        extra_data: {},
      },
    ])

    expect(categories).toHaveLength(1)
    expect(categories[0].subcategories).toEqual([
      { slug: "gas-barbecue-grill", name: { en: "Gas Barbecue Grill", zh: "燃气烧烤炉" } },
    ])
  })

  test("keeps public root and subcategory slugs when the database category points to a leaf row", () => {
    const product = mapProduct({
      slug: "gas-grill",
      name: "Gas Grill",
      name_i18n: { en: "Gas Grill", zh: "燃气烧烤炉" },
      description: "",
      description_i18n: { en: "", zh: "" },
      category_slug: "grill__gas-barbecue-grill",
      image_url: null,
      extra_data: { parent_category: "grill", public_subcategory: "gas-barbecue-grill" },
    })

    expect(product.categorySlug).toBe("grill")
    expect(product.subcategorySlug).toBe("gas-barbecue-grill")
  })

  test("maps public category filters to root and standard child database slugs", () => {
    const rows = [
      { id: "root", parent_id: null, slug: "grill", extra_data: {} },
      { id: "child", parent_id: "root", slug: "grill__gas", extra_data: { public_slug: "gas" } },
    ]
    expect(categoryFilterSlugs(rows, "grill")).toEqual(["grill", "grill__gas"])
    expect(categoryFilterSlugs(rows, "grill", "gas")).toEqual(["grill__gas"])
  })
})
