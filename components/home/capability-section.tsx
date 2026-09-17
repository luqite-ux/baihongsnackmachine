import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"

const stats = [
  ["6000+", "Factory area (acres)"],
  ["3", "Production Workshops"],
  ["6", "Professional Production Lines"],
  ["10+", "Professional Production Equipment"],
  ["30000", "Monthly Production Capacity (pieces)"],
]

const factoryImages = ["174185437", "174185439", "174185440", "174185442", "174185444", "174185445", "174185449", "174185450", "174185451", "174185452", "174185453", "174185454", "174185455", "174185459", "174185463", "174185466"].map((id) => `/images/factory/${id}.jpg`)

export function CapabilitySection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f7] py-14 text-neutral-950">
      <Image src="/images/about/business-map.jpg" alt="" fill sizes="100vw" className="pointer-events-none object-cover opacity-80" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1250px] px-4 text-center lg:px-0">
        <Reveal>
          <p className="text-[26px] font-black text-[#f39a00]">BUSINESS ADVANTAGES</p>
          <h2 className="mt-2 text-[40px] font-black leading-tight">Professional services started in 2013</h2>
          <p className="mt-6 text-[16px] font-bold">Focusing on the field of mechanical equipment, we specialize in equipment for food, beverage processing, and catering industries.</p>
          <p className="mt-4 text-[22px] font-medium text-[#f39a00]">Support customized processing and provide personalized solutions according to customer needs.</p>
          <p className="mx-auto mt-4 max-w-5xl text-[16px] font-bold leading-6">We have stable production capacity and a comprehensive service system, and our products are widely used in various catering and food processing scenarios. We have been deeply involved in the industry for many years, winning the trust of customers with reliable quality and efficient response.<br />We are your high-quality partner for customizing kitchen equipment.</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-7 md:grid-cols-5">
          {stats.map(([value, label], index) => <Reveal key={label} delay={index * 60}><strong className="block text-[48px] font-black text-[#f39a00]">{value}</strong><span className="mt-2 block text-[16px] font-bold leading-5">{label}</span></Reveal>)}
        </div>
      </div>
      <div aria-label="Factory gallery" className="relative mt-12 overflow-hidden">
        <div className="factory-marquee flex w-max gap-3">
          {[...factoryImages, ...factoryImages].map((src, index) => <div key={`${src}-${index}`} className="relative h-[250px] w-[375px] shrink-0 overflow-hidden"><Image src={src} alt={index < factoryImages.length ? `Baihong factory view ${index + 1}` : ""} fill sizes="375px" className="object-cover" /></div>)}
        </div>
      </div>
    </section>
  )
}
