import { describe, expect, test } from "vitest"
import { faqItems } from "@/lib/data/faq"

describe("legacy FAQ migration", () => {
  test("retains all eight old-site questions while removing forbidden warranty commitments", () => {
    expect(faqItems).toHaveLength(8)
    expect(faqItems.map((item) => item.question.en)).toEqual([
      "What specifications or models are available?",
      "Do you support customized size, material, color, or process?",
      "Can you provide samples?",
      "Do you provide technical data sheets or test reports?",
      "What industries or applications are your products suitable for?",
      "Do you support OEM / ODM services?",
      "What is the service life or performance advantage of the product?",
      "What is the minimum order quantity (MOQ)?",
    ])
    expect(JSON.stringify(faqItems)).not.toMatch(/warrant(?:y|ies)|guarantee(?:d)?|质保|保修/i)
  })
})
