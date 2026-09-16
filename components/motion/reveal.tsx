"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in ms, applied only once the element is animating. */
  delay?: number
  as?: "div" | "section" | "li"
}

/**
 * One-shot viewport reveal (MOT-BAIHONG-03). No global timeout ever marks
 * content as revealed — only a real IntersectionObserver entry does. If
 * JavaScript never runs, `enabled` stays false and the content is rendered
 * fully visible from the first paint.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    setEnabled(true)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Component = as
  return (
    <Component
      ref={ref as never}
      className={cn(
        enabled && "transition-all duration-500 ease-out",
        enabled && !visible && "opacity-0 translate-y-4",
        enabled && visible && "opacity-100 translate-y-0",
        className,
      )}
      style={enabled && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  )
}
