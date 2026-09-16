import { issueCaptcha } from "@/lib/inquiry-captcha"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const scope = new URL(request.url).searchParams.get("scope")?.trim() || ""
  try {
    return Response.json(await issueCaptcha(scope), { headers: { "Cache-Control": "no-store, max-age=0" } })
  } catch {
    return Response.json({ error: "Verification service is temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } })
  }
}
