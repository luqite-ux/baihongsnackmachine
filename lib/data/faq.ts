import type { FaqItem } from "@/lib/types"

/**
 * Process-oriented questions only — no invented specifications, lead times,
 * certifications or unsupported service promises. Answers point buyers back to a direct
 * inquiry so real figures always come from a person, not this page.
 */
export const faqItems: FaqItem[] = [
  { question: { en: "What specifications or models are available?", zh: "有哪些规格或型号可供选择？" }, answer: { en: "There are many product specifications and models. Tell us which product you need so our team can confirm the available options and customization.", zh: "产品提供多种规格和型号。请告知所需产品，我们的团队将为您确认可选方案及定制要求。" } },
  { question: { en: "Do you support customized size, material, color, or process?", zh: "是否支持尺寸、材质、颜色或工艺定制？" }, answer: { en: "Size, material, color and process can be discussed according to the product and order requirements.", zh: "可根据具体产品和订单要求沟通尺寸、材质、颜色及工艺方案。" } },
  { question: { en: "Can you provide samples?", zh: "可以提供样品吗？" }, answer: { en: "Sample availability depends on the product. Contact our team with the model you need for confirmation.", zh: "样品供应情况取决于具体产品。请将所需型号告知我们的团队进行确认。" } },
  { question: { en: "Do you provide technical data sheets or test reports?", zh: "是否提供技术参数表或检测报告？" }, answer: { en: "Technical parameter sheets are available. If you need a specific test report, contact our team to confirm what can be supplied for the selected product.", zh: "可提供技术参数资料。如需特定检测报告，请联系我们确认所选产品可提供的文件。" } },
  { question: { en: "What industries or applications are your products suitable for?", zh: "产品适用于哪些行业或应用场景？" }, answer: { en: "The equipment is used in shopping malls, homes, restaurants, camping, catering and snack-food applications, depending on the selected model.", zh: "根据所选型号，设备可用于商场、家庭、餐厅、露营、餐饮及小吃加工等场景。" } },
  { question: { en: "Do you support OEM / ODM services?", zh: "是否支持 OEM / ODM 服务？" }, answer: { en: "OEM and ODM requirements can be discussed with our team according to the product and order.", zh: "可根据具体产品和订单与我们的团队沟通 OEM、ODM 需求。" } },
  { question: { en: "What is the service life or performance advantage of the product?", zh: "产品的使用寿命和性能特点如何？" }, answer: { en: "Performance and service life depend on the selected model, operating conditions and maintenance. Contact our team for the applicable technical information.", zh: "产品性能和使用寿命取决于所选型号、使用条件和维护方式。请联系我们获取适用的技术资料。" } },
  { question: { en: "What is the minimum order quantity (MOQ)?", zh: "最小起订量（MOQ）是多少？" }, answer: { en: "The old site listed an MOQ of 200. Please confirm the applicable quantity with our team for the specific product before ordering.", zh: "旧站标注的最小起订量为 200。下单前请与我们的团队确认具体产品适用的订购数量。" } },
]
