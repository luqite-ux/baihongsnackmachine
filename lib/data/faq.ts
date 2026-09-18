import type { FaqItem } from "@/lib/types"

/**
 * Process-oriented questions only — no invented specifications, lead times,
 * certifications or unsupported service promises. Answers point buyers back to a direct
 * inquiry so real figures always come from a person, not this page.
 */
export const faqItems: FaqItem[] = [
  { question: { en: "What specifications or models are available?" }, answer: { en: "There are many product specifications and models. Tell us which product you need so our team can confirm the available options and customization." } },
  { question: { en: "Do you support customized size, material, color, or process?" }, answer: { en: "Size, material, color and process can be discussed according to the product and order requirements." } },
  { question: { en: "Can you provide samples?" }, answer: { en: "Sample availability depends on the product. Contact our team with the model you need for confirmation." } },
  { question: { en: "Do you provide technical data sheets or test reports?" }, answer: { en: "Technical parameter sheets are available. If you need a specific test report, contact our team to confirm what can be supplied for the selected product." } },
  { question: { en: "What industries or applications are your products suitable for?" }, answer: { en: "The equipment is used in shopping malls, homes, restaurants, camping, catering and snack-food applications, depending on the selected model." } },
  { question: { en: "Do you support OEM / ODM services?" }, answer: { en: "OEM and ODM requirements can be discussed with our team according to the product and order." } },
  { question: { en: "What is the service life or performance advantage of the product?" }, answer: { en: "Performance and service life depend on the selected model, operating conditions and maintenance. Contact our team for the applicable technical information." } },
  { question: { en: "What is the minimum order quantity (MOQ)?" }, answer: { en: "The old site listed an MOQ of 200. Please confirm the applicable quantity with our team for the specific product before ordering." } },
]
