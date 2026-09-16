import type { FaqItem } from "@/lib/types"

/**
 * Process-oriented questions only — no invented specifications, lead times,
 * certifications or guarantees. Answers point buyers back to a direct
 * inquiry so real figures always come from a person, not this page.
 */
export const faqItems: FaqItem[] = [
  {
    question: { en: "How do I get a price for a machine?" },
    answer: {
      en: "Submit the Request a Quote form or contact us by phone, WhatsApp or email with the product you're interested in and your quantity. We reply with pricing and options for your requirement.",
    },
  },
  {
    question: { en: "Can machines be customized?" },
    answer: {
      en: "Tell us your voltage, gas type, size or output requirement in the inquiry form and our team will confirm what can be configured for your order.",
    },
  },
  {
    question: { en: "Do you ship outside China?" },
    answer: {
      en: "Contact our team with your destination and order size so we can confirm shipping options and documentation for your location.",
    },
  },
  {
    question: { en: "What information should I include in an inquiry?" },
    answer: {
      en: "Please include the product or category you need, the quantity, your company name and the best way to reach you. This helps us respond with an accurate quotation.",
    },
  },
  {
    question: { en: "Can I visit or verify the factory?" },
    answer: {
      en: "Contact us directly to discuss a visit or verification call; our team will coordinate the details with you.",
    },
  },
]
