import { ImageResponse } from "next/og"
import { readFileSync } from "node:fs"
import { join } from "node:path"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl || "/placeholder.svg"} alt="" width={140} height={140} style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size },
  )
}
