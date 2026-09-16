import { Building2, Factory, PackageCheck, Wrench } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"

const steps = [
  { icon: Building2, title: "6000 m²", body: "Published factory area" },
  { icon: Factory, title: "3", body: "Production workshops" },
  { icon: Wrench, title: "6", body: "Production lines" },
  { icon: PackageCheck, title: "30000", body: "Published monthly capacity" },
]

export function CapabilitySection() {
  return (
    <section className="bg-neutral-950 py-14 text-white">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-0">
      <Reveal className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f39a00]">Manufacturing</p>
        <h2 className="mt-2 text-3xl font-black">Business Advantages</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 100}>
            <div className="flex min-h-40 flex-col items-center justify-center gap-3 bg-neutral-950 px-4 text-center">
              <span className="flex h-11 w-11 items-center justify-center border border-[#f39a00] text-[#f39a00]">
                <step.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-2xl font-black">{step.title}</h3>
              <p className="text-xs uppercase tracking-wide text-white/70">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  )
}
