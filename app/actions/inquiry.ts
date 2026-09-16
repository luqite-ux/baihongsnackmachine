"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { verifyCaptchaSubmission } from "@/lib/inquiry-captcha"
import { getTenantId } from "@/lib/supabase"

export interface InquiryFormState {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Record<string, string>
}

export async function submitInquiry(_prevState: InquiryFormState, formData: FormData): Promise<InquiryFormState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  const captchaScope = String(formData.get("captchaScope") ?? "").trim()
  const captchaToken = String(formData.get("captchaToken") ?? "").trim()
  const captchaAnswer = String(formData.get("captchaAnswer") ?? "").trim()

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = "Name is required."
  if (!email) fieldErrors.email = "Email is required."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Enter a valid email address."
  if (!message) fieldErrors.message = "Please describe your requirement."

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors }
  }
  const captchaOk = await verifyCaptchaSubmission(captchaScope, captchaToken, captchaAnswer).catch(() => false)
  if (!captchaOk) return { status: "error", message: "The verification code is invalid or expired. Please refresh it and try again." }
  const tenantId = getTenantId()
  if (!tenantId) return { status: "error", message: "The inquiry service is temporarily unavailable." }
  const product = String(formData.get("product") ?? "").trim()
  const requirement = String(formData.get("requirement") ?? "").trim()
  const { error } = await createAdminClient().from("inquiries").insert({
    tenant_id: tenantId,
    name,
    email,
    company: String(formData.get("company") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    subject: product || "Website inquiry",
    message: [requirement, message].filter(Boolean).join("\n\n"),
    status: "new",
  })
  if (error) return { status: "error", message: "We could not send your inquiry. Please try again or contact us directly." }
  return { status: "success", message: "Thank you. Your inquiry has been sent successfully." }
}
