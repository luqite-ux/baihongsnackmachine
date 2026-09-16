"use client"

import { useEffect, useRef, useState } from "react"

/**
 * MOT-BAIHONG industry-specific motion: a single abstract heat-flow line
 * that traces once from preparation to output when the capability section
 * enters the viewport. Purely decorative — it must never be read as a claim
 * about specific equipment or production capacity.
 */
export function ProcessTrace() {
  const ref = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 40"
      className="h-6 w-full max-w-md text-primary"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 20 C 120 20, 160 4, 220 20 S 340 36, 400 20 S 520 4, 596 20"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      <path
        d="M4 20 C 120 20, 160 4, 220 20 S 340 36, 400 20 S 520 4, 596 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="900"
        strokeDashoffset={visible ? 0 : 900}
        style={{
          transition: "stroke-dashoffset 1400ms ease-in-out",
        }}
      />
    </svg>
  )
}
