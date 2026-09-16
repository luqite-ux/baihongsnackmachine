import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"

describe("root layout hydration contract", () => {
  test("allows Vercel's deployment attribute on the html root", () => {
    const layoutSource = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8")

    expect(layoutSource).toContain('<html lang="en" suppressHydrationWarning>')
  })
})
