"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Thermometer, Wrench, Wind, Droplets } from "lucide-react";

const SERVICES = [
  {
    title: "Diagnostic Inspections",
    description: "Using advanced thermal imaging to detect hidden leaks, poor insulation, and airflow bottlenecks before they become expensive problems.",
    icon: Thermometer,
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80"
  },
  {
    title: "Precision Install",
    description: "Expertly calibrated heating and cooling installations. We don't guess — we engineer the perfect setup for your home's unique layout.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
  },
  {
    title: "Ductwork Optimization",
    description: "Poor ductwork loses up to 30% of your conditioned air. We seal, insulate, and redesign your layout for maximum distribution.",
    icon: Wind,
    image: "/images/ductwork-visual.png"
  },
  {
    title: "Air Quality Control",
    description: "Breathe easier with whole-home filtration, UV purification, and humidity balance systems designed to eradicate pollutants.",
    icon: Droplets,
    image: "/images/air-quality-visual.png"
  }
];

function ThermalCard({ service }: { service: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovered = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseEnter() {
    isHovered.set(1);
  }

  function handleMouseLeave() {
    isHovered.set(0);
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[200px] sm:h-[250px] w-full overflow-hidden bg-black md:cursor-[url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'20\\' height=\\'20\\'><circle cx=\\'10\\' cy=\\'10\\' r=\\'8\\' fill=\\'rgba(255,100,0,0.5)\\' stroke=\\'white\\' stroke-width=\\'2\\'/></svg>'),_auto]">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70 md:opacity-60 transition-opacity duration-500 md:group-hover:opacity-30"
        />

        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                200px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 60, 0, 0.9) 0%,
                rgba(255, 200, 0, 0.6) 30%,
                rgba(0, 100, 255, 0.3) 70%,
                transparent 100%
              )
            `,
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `,
            maskImage: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%
              )
            `
          }}
        />

        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
          style={{
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                150px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                rgba(0,0,0,0.5) 50%,
                transparent 100%
              )
            `,
            maskImage: useMotionTemplate`
              radial-gradient(
                150px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                rgba(0,0,0,0.5) 50%,
                transparent 100%
              )
            `
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
            <span className="px-4 py-2 bg-white/10 text-cream font-sans text-xs tracking-widest uppercase backdrop-blur-sm rounded-full border border-white/20">
                Hover to Scan
            </span>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 bg-white/5 z-20">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-3 bg-white/10 rounded-lg text-terracotta transition-transform duration-300 group-hover:scale-110 group-hover:bg-terracotta/10">
            <service.icon size={22} />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-cream group-hover:text-terracotta transition-colors">{service.title}</h3>
        </div>
        <p className="text-cream/60 font-sans font-light leading-relaxed text-sm sm:text-base">
          {service.description}
        </p>
        <a href="#contact" className="inline-flex items-center gap-2 mt-5 sm:mt-6 font-sans text-sm font-semibold text-terracotta md:opacity-0 md:group-hover:opacity-100 md:-translate-x-4 md:group-hover:translate-x-0 transition-all duration-300">
            Schedule a Scan &rarr;
        </a>
      </div>
    </div>
  );
}

export default function ThermalServices() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 relative"
      data-nav-theme="dark"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span data-reveal="clip-left" className="text-terracotta uppercase tracking-[0.3em] font-sans text-xs font-bold mb-4 block">
            What We Do
          </span>
          <h2 data-reveal="char" className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream">
            We see the invisible.
          </h2>
          <p data-reveal="fade-up" data-reveal-delay="0.2" className="mt-6 text-cream/60 max-w-2xl mx-auto font-light font-sans text-lg">
            Stop guessing why your energy bills are high or your rooms are uncomfortable. We use advanced thermal diagnostics to pinpoint the problem and engineer the perfect fix.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES.map((service, i) => (
            <div key={i} data-reveal="fade-up">
              <ThermalCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
