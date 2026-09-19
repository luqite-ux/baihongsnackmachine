"use client"

import { useActionState, useCallback, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { submitInquiry, type InquiryFormState } from "@/app/actions/inquiry"
import type { Locale } from "@/lib/types"

const initialState: InquiryFormState = { status: "idle" }

function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending && <Spinner className="mr-2" />}
      {pending ? (locale === "zh" ? "正在发送…" : "Sending…") : (locale === "zh" ? "提交询盘" : "Send Inquiry")}
    </Button>
  )
}

export function InquiryForm({ defaultProduct, locale = "en" }: { defaultProduct?: string; locale?: Locale }) {
  const [state, formAction] = useActionState(submitInquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const captchaScope = "baihong-contact-main"
  const [captcha, setCaptcha] = useState<{ svg: string; token: string } | null>(null)
  const [captchaError, setCaptchaError] = useState("")

  const refreshCaptcha = useCallback(async () => {
    setCaptcha(null)
    setCaptchaError("")
    try {
      const response = await fetch(`/api/captcha?scope=${captchaScope}`, { cache: "no-store" })
      if (!response.ok) throw new Error("captcha")
      setCaptcha(await response.json())
    } catch {
      setCaptchaError("Verification image could not be loaded. Please try again.")
    }
  }, [])

  useEffect(() => { void refreshCaptcha() }, [refreshCaptcha])
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset()
    if (state.status !== "idle") void refreshCaptcha()
  }, [state, refreshCaptcha])

  return (
    <form ref={formRef} action={formAction} className="space-y-6" noValidate>
      <input type="hidden" name="captchaScope" value={captchaScope} />
      <input type="hidden" name="captchaToken" value={captcha?.token || ""} />
      <FieldGroup>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors?.name)}>
            <FieldLabel htmlFor="name">{locale === "zh" ? "姓名" : "Full Name"} *</FieldLabel>
            <Input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(state.fieldErrors?.name)} />
            {state.fieldErrors?.name && <FieldError>{state.fieldErrors.name}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="company">{locale === "zh" ? "公司" : "Company"}</FieldLabel>
            <Input id="company" name="company" autoComplete="organization" />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors?.email)}>
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(state.fieldErrors?.email)} />
            {state.fieldErrors?.email && <FieldError>{state.fieldErrors.email}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">{locale === "zh" ? "电话 / WhatsApp" : "Phone / WhatsApp"}</FieldLabel>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="product">{locale === "zh" ? "目标产品" : "Target Product"}</FieldLabel>
          <Input id="product" name="product" defaultValue={defaultProduct} placeholder="e.g. Gas Barbecue Grill" />
        </Field>

        <Field>
          <FieldLabel htmlFor="requirement">{locale === "zh" ? "采购要求" : "Procurement Requirement"}</FieldLabel>
          <Input id="requirement" name="requirement" placeholder="e.g. Quantity, voltage, target market" />
        </Field>

        <Field data-invalid={Boolean(state.fieldErrors?.message)}>
          <FieldLabel htmlFor="message">{locale === "zh" ? "留言" : "Message"} *</FieldLabel>
          <Textarea id="message" name="message" rows={5} required aria-invalid={Boolean(state.fieldErrors?.message)} />
          {state.fieldErrors?.message && <FieldError>{state.fieldErrors.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="captchaAnswer">{locale === "zh" ? "验证码" : "Verification Code"} *</FieldLabel>
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-14 w-40 overflow-hidden rounded-lg border border-border bg-white" aria-live="polite">
              {captcha ? <div dangerouslySetInnerHTML={{ __html: captcha.svg }} /> : <div className="h-full animate-pulse bg-muted" />}
            </div>
            <button type="button" onClick={() => void refreshCaptcha()} className="text-sm font-medium text-primary hover:underline">{locale === "zh" ? "刷新图片" : "Refresh image"}</button>
          </div>
          <Input id="captchaAnswer" name="captchaAnswer" inputMode="text" autoComplete="off" maxLength={4} required placeholder={locale === "zh" ? "请输入4位字符" : "Enter the 4 characters"} className="max-w-xs uppercase" />
          {captchaError && <FieldError>{captchaError}</FieldError>}
        </Field>
      </FieldGroup>

      {state.status === "error" && state.message && (
        <Alert variant="destructive" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>{locale === "zh" ? "询盘未发送" : "Inquiry not sent"}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.status === "success" && (
        <Alert role="status">
          <AlertTitle>{locale === "zh" ? "询盘已发送" : "Inquiry sent"}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <SubmitButton locale={locale} />
    </form>
  )
}
