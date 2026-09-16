import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto"

const DIGITS = "2346789"
const TTL = 5 * 60 * 1000
const SCOPE = /^[A-Za-z0-9_-]{16,160}$/

type Payload = { v: 1; exp: number; nonce: string; cid: string; scope: string; tenant: string; site: string; answerHash: string }
type Store = {
  issue(record: { tenantId: string; siteScopeHash: string; formScopeHash: string; challengeHash: string; tokenHash: string; expiresAt: number }): Promise<void>
  consume(record: { tenantId: string; siteScopeHash: string; formScopeHash: string; challengeHash: string; tokenHash: string | null }): Promise<boolean>
}

const sha = (value: string) => createHash("sha256").update(value).digest("base64url")
const hmac = (secret: string, value: string) => createHmac("sha256", secret).update(value).digest("base64url")
const safe = (a: string, b: string) => {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

const segments: Record<string, string> = {
  "2": "abdeg", "3": "abcdg", "4": "bcfg", "6": "acdefg", "7": "abc", "8": "abcdefg", "9": "abcdfg",
}
const shapes: Record<string, string> = {
  a: "M5 2h18l-3 4H8z", b: "M24 4v18l-4-3V8z", c: "M24 24v18l-4-4V27z", d: "M5 44h18l-3-4H8z",
  e: "M2 24v18l4-4V27z", f: "M2 4v18l4-3V8z", g: "M5 22h18l-3 4H8z",
}

function svg(answer: string, nonce: string) {
  const seed = Buffer.from(nonce, "base64url")
  const byte = (index: number) => seed[index % seed.length]
  const glyphs = [...answer].map((digit, index) => {
    const paths = [...segments[digit]].map((segment) => `<path d="${shapes[segment]}"/>`).join("")
    const rotate = (byte(index) % 9) - 4
    return `<g transform="translate(${12 + index * 36} 5) rotate(${rotate} 13 23)">${paths}</g>`
  }).join("")
  const noise = [0, 1, 2].map((index) => `<path d="M2 ${10 + byte(index + 5) % 35} C45 ${byte(index + 8) % 50},115 ${byte(index + 11) % 50},158 ${8 + byte(index + 14) % 38}"/>`).join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="56" viewBox="0 0 160 56" role="img" aria-label="Four character verification image"><rect width="160" height="56" rx="8" fill="#f8fafc"/><g fill="none" stroke="#94a3b8" opacity=".55">${noise}</g><g fill="#0f172a">${glyphs}</g></svg>`
}

function validate(secret: string, tenantId: string, siteScope: string, scope: string) {
  if (secret.length < 32) throw new Error("CAPTCHA_SECRET must contain at least 32 characters")
  if (!/^[0-9a-f-]{36}$/i.test(tenantId)) throw new Error("Invalid tenant ID")
  if (!siteScope || !SCOPE.test(scope)) throw new Error("Invalid CAPTCHA scope")
  return { tenantId, siteScopeHash: sha(siteScope), formScopeHash: sha(scope) }
}

export function createCaptchaStore(env: Record<string, string | undefined> = process.env): Store {
  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "")
  const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) throw new Error("CAPTCHA store is not configured")
  const call = async (name: string, body: Record<string, unknown>) => {
    const response = await fetch(`${url}/rest/v1/rpc/${name}`, { method: "POST", headers: { apikey: key, authorization: `Bearer ${key}`, "content-type": "application/json" }, body: JSON.stringify(body), cache: "no-store" })
    if (!response.ok) throw new Error(`CAPTCHA RPC failed: ${response.status}`)
    return response.json()
  }
  return {
    async issue(record) {
      const ok = await call("issue_inquiry_captcha_challenge", { p_tenant_id: record.tenantId, p_site_scope_hash: record.siteScopeHash, p_form_scope_hash: record.formScopeHash, p_challenge_hash: record.challengeHash, p_token_hash: record.tokenHash, p_expires_at: new Date(record.expiresAt).toISOString() })
      if (ok !== true) throw new Error("CAPTCHA issue was not confirmed")
    },
    async consume(record) {
      return await call("consume_inquiry_captcha_challenge", { p_tenant_id: record.tenantId, p_site_scope_hash: record.siteScopeHash, p_form_scope_hash: record.formScopeHash, p_challenge_hash: record.challengeHash, p_token_hash: record.tokenHash }) === true
    },
  }
}

export async function issueCaptcha(scope: string) {
  const secret = process.env.CAPTCHA_SECRET?.trim() || ""
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() || ""
  const siteScope = process.env.CAPTCHA_SITE_SCOPE?.trim() || ""
  const context = validate(secret, tenantId, siteScope, scope)
  const answer = Array.from({ length: 4 }, () => DIGITS[randomInt(DIGITS.length)]).join("")
  const nonce = randomBytes(16).toString("base64url")
  const cid = randomBytes(16).toString("base64url")
  const expiresAt = Date.now() + TTL
  const payload: Payload = { v: 1, exp: expiresAt, nonce, cid, scope, tenant: sha(tenantId), site: sha(siteScope), answerHash: hmac(secret, `${nonce}:${answer}:${scope}:${tenantId}:${sha(siteScope)}:${cid}`) }
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const token = `${encoded}.${hmac(secret, encoded)}`
  await createCaptchaStore().issue({ ...context, challengeHash: sha(cid), tokenHash: sha(token), expiresAt })
  return { svg: svg(answer, nonce), token, expiresAt }
}

export async function verifyCaptchaSubmission(scope: string, token: string, answer: string) {
  const secret = process.env.CAPTCHA_SECRET?.trim() || ""
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() || ""
  const siteScope = process.env.CAPTCHA_SITE_SCOPE?.trim() || ""
  const context = validate(secret, tenantId, siteScope, scope)
  const [encoded, signature, extra] = token.split(".")
  let payload: Payload | null = null
  try { payload = JSON.parse(Buffer.from(encoded || "", "base64url").toString("utf8")) } catch { payload = null }
  const structurallyValid = Boolean(payload && !extra && signature && safe(signature, hmac(secret, encoded)) && payload.v === 1 && payload.scope === scope && payload.tenant === sha(tenantId) && payload.site === sha(siteScope))
  const challengeHash = payload?.cid ? sha(payload.cid) : sha(randomBytes(16).toString("base64url"))
  const consumed = await createCaptchaStore().consume({ ...context, challengeHash, tokenHash: structurallyValid ? sha(token) : null })
  if (!structurallyValid || !payload || Date.now() > payload.exp || !consumed) return false
  return safe(payload.answerHash, hmac(secret, `${payload.nonce}:${answer.trim().toUpperCase()}:${scope}:${tenantId}:${sha(siteScope)}:${payload.cid}`))
}
