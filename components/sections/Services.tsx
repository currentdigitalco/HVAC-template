"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Thermometer, Wrench, Wind, Droplets, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "HVAC Installation",
    description:
      "Complete heating, ventilation, and cooling system design and installation for new construction and retrofits. We engineer each system for peak efficiency and comfort — no templates, no shortcuts.",
    details: [
      "Computational load calculations",
      "Custom ductwork design",
      "High-efficiency equipment selection",
      "Full-system commissioning",
    ],
    icon: Thermometer,
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  },
  {
    title: "Maintenance & Repair",
    description:
      "Preventive maintenance programs and 24/7 emergency repair services. We keep your systems running at optimal performance year-round with scheduled inspections and rapid response.",
    details: [
      "Seasonal tune-ups",
      "24/7 emergency service",
      "Performance diagnostics",
      "Extended warranty programs",
    ],
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
  },
  {
    title: "Ductwork Design",
    description:
      "Precision ductwork engineering for maximum airflow efficiency. Custom fabrication using computational fluid dynamics to minimize energy loss and optimize distribution.",
    details: [
      "CFD airflow modeling",
      "Custom sheet metal fabrication",
      "Duct sealing & insulation",
      "Pressure balancing",
    ],
    icon: Wind,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    title: "Indoor Air Quality",
    description:
      "Advanced filtration, UV purification, and humidity control systems. Breathe cleaner, healthier air with solutions tailored to your space and sensitivities.",
    details: [
      "HEPA & UV-C filtration",
      "Whole-home humidification",
      "Air quality monitoring",
      "Allergen & VOC reduction",
    ],
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1631545806609-05faf2faf3f5?w=800&q=80",
  },
];

function ServiceAccordion({
  service,
  isOpen,
  onToggle,
}: {
  service: (typeof SERVICES)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-sand/60">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-6 text-left transition-colors duration-300 lg:py-8"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6">
          <Icon
            size={24}
            strokeWidth={1.5}
            className={cn(
              "transition-colors duration-300",
              isOpen ? "text-terracotta" : "text-sand"
            )}
          />
          <h3 className="font-serif text-2xl text-navy transition-colors duration-300 group-hover:text-terracotta lg:text-3xl">
            {service.title}
          </h3>
        </div>
        <ChevronDown
          size={20}
          className={cn(
            "text-sand transition-transform duration-500",
            isOpen && "rotate-180 text-terracotta"
          )}
        />
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight ?? 500 : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="grid gap-8 pb-8 lg:grid-cols-5 lg:pb-12">
          <div className="lg:col-span-3">
            <p className="font-sans text-base font-light leading-relaxed text-navy/60">
              {service.description}
            </p>
            <ul className="mt-6 space-y-2">
              {service.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-center gap-3 font-sans text-sm text-navy/50"
                >
                  <span className="h-1 w-1 rounded-full bg-terracotta" />
                  {detail}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-block font-sans text-sm font-medium text-terracotta transition-colors duration-300 hover:text-terracotta-light"
            >
              Schedule a consultation &rarr;
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="thermal-hover aspect-[4/3] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-nav-theme="light"
      className="relative bg-ivory py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className="mb-12 max-w-2xl opacity-0">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            What We Do
          </span>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl lg:text-6xl">
            Services built on precision
          </h2>
          <p className="mt-4 font-sans text-lg font-light leading-relaxed text-navy/50">
            Every project is approached with the rigor of engineering and the
            care of craftsmanship.
          </p>
        </div>

        <div className="border-t border-sand/60">
          {SERVICES.map((service, i) => (
            <ServiceAccordion
              key={service.title}
              service={service}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
