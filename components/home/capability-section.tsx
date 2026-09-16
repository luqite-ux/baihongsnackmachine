import { ClipboardList, Factory, PackageCheck } from "lucide-react"
import { ProcessTrace } from "@/components/motion/process-trace"
import { Reveal } from "@/components/motion/reveal"

const steps = [
  { icon: ClipboardList, title: "Design", body: "Equipment is designed for commercial snack and food-service use." },
  { icon: Factory, title: "Production", body: "Machines are produced in-house at our Xuzhou facility." },
  { icon: PackageCheck, title: "Processing", body: "Units are processed and prepared for dispatch to buyers." },
]

export function CapabilitySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Capability</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          Design, Production &amp; Processing In-House
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 100}>
            <div className="flex flex-col gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={250} className="mt-10 flex justify-center">
        <ProcessTrace />
      </Reveal>
    </section>
  )
}
