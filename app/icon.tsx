import { ImageResponse } from "next/og"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/**
 * Square favicon derived from the official Baihong logo (blue "b" mark on
 * white), replacing any template default icon.
 */
export default function Icon() {
  const logoPath = join(process.cwd(), "public/images/brand/baihong-logo.png")
  const logoBase64 = readFileSync(logoPath).toString("base64")
  const logoDataUrl = `data:image/png;base64,${logoBase64}`

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 6,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl || "/placeholder.svg"} alt="" width={28} height={28} style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size },
  )
}
