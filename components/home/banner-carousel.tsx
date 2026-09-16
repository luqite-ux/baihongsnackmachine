"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface BannerSlide {
  id: string
  image: string
  /** Explicit 390px-safe focal object position, e.g. "75% 30%". */
  mobileFocalPosition: string
  desktopFocalPosition: string
  eyebrow: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

const AUTOPLAY_MS = 6000

export function BannerCarousel({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    setAutoplayEnabled(!mql.matches)
    const listener = () => setAutoplayEnabled(!mql.matches)
    mql.addEventListener("change", listener)
    return () => mql.removeEventListener("change", listener)
  }, [])

  useEffect(() => {
    if (!autoplayEnabled || paused) return
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [autoplayEnabled, paused, slides.length])

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }, [slides.length])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="relative isolate overflow-hidden bg-neutral-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(delta) > 40) {
          goTo(index + (delta < 0 ? 1 : -1))
        }
        touchStartX.current = null
      }}
    >
      <div className="relative h-[420px] sm:h-[480px] md:h-[560px] lg:h-[620px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover max-sm:[object-position:var(--mobile-pos)] sm:[object-position:var(--desktop-pos)]"
              style={
                {
                  "--mobile-pos": slide.mobileFocalPosition,
                  "--desktop-pos": slide.desktopFocalPosition,
                } as React.CSSProperties
              }
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg text-white">
                <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground/90 text-orange-400">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">{slide.title}</h1>
                <p className="mt-3 text-sm text-white/85 sm:text-base">{slide.body}</p>
                <Button asChild size="lg" className="mt-6">
                  <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-4">
        <Button
          variant="secondary"
          size="icon"
          className="hidden sm:inline-flex"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Button>
        <div className="flex gap-2" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full ring-1 ring-white/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                i === index ? "w-6 bg-white" : "bg-white/30",
              )}
            />
          ))}
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="hidden sm:inline-flex"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}
