import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { faqItems } from "@/lib/data/faq"
import { resolveText } from "@/lib/locale"

export function FaqPreview() {
  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-0">
        <Reveal>
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[22px] font-black text-[#f39a00]">FAQ ?</p>
              <h2 className="mt-1 text-[34px] font-black text-neutral-950">Frequently Asked Questions</h2>
            </div>
            <Link href="/faq" className="hidden bg-[#f39a00] px-6 py-3 text-sm font-bold text-white transition hover:bg-black sm:inline-flex">VIEW MORE &gt;</Link>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {faqItems.slice(0, 4).map((item, i) => (
            <Reveal key={i} as="li" delay={i * 50} className="flex min-h-[250px] flex-col bg-white p-7 shadow-[0_5px_24px_rgba(0,0,0,0.07)]">
              <time dateTime="2026-05-18" className="text-[14px] font-bold text-neutral-500">2026-05-18</time>
              <h3 className="mt-4 text-[17px] font-bold leading-6 text-neutral-950">{resolveText(item.question)}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">{resolveText(item.answer)}</p>
              <Link href="/faq" className="mt-auto pt-5 text-sm font-bold text-[#f39a00]">more &gt;</Link>
            </Reveal>
          ))}
        </ul>
        <Link href="/faq" className="mt-6 inline-flex bg-[#f39a00] px-6 py-3 text-sm font-bold text-white sm:hidden">VIEW MORE &gt;</Link>
      </div>
    </section>
  )
}
