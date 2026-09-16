"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  bullets: string[]
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
      <h1 className="sr-only">Commercial snack machine manufacturer</h1>
      <div className="relative h-[250px] sm:h-[320px] md:h-auto md:aspect-[12/5]">
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
              className="object-contain md:object-cover max-sm:[object-position:var(--mobile-pos)] sm:[object-position:var(--desktop-pos)]"
              style={
                {
                  "--mobile-pos": slide.mobileFocalPosition,
                  "--desktop-pos": slide.desktopFocalPosition,
                } as React.CSSProperties
              }
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent md:from-black/75 md:via-black/20" />
            <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-center px-8 sm:px-14 lg:px-0">
              <div className="max-w-[48%] text-white sm:max-w-[520px]">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f39a00] sm:text-sm">
                  {slide.eyebrow}
                </p>
                <h2 className="text-xl font-black uppercase leading-[1.05] sm:text-3xl md:text-5xl">
                  {slide.title}
                </h2>
                <p className="mt-4 hidden max-w-[500px] text-sm leading-6 text-white/85 sm:block md:text-base">
                  {slide.body}
                </p>
                <ul className="mt-5 hidden grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold sm:grid">
                  {slide.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#f39a00]" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
          type="button"
          className="absolute left-3 top-1/2 hidden h-12 w-8 -translate-y-1/2 items-center justify-center bg-black/35 text-white hover:bg-[#f39a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
          type="button"
          className="absolute right-3 top-1/2 hidden h-12 w-8 -translate-y-1/2 items-center justify-center bg-black/35 text-white hover:bg-[#f39a00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="absolute inset-x-0 bottom-3 flex justify-center">
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
                "h-2.5 w-2.5 border border-white bg-black/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                i === index ? "bg-[#f39a00]" : "hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
