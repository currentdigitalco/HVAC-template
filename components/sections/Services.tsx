"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Thermometer, Wrench, Wind, Droplets } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "HVAC Installation",
    description:
      "Complete heating, ventilation, and cooling system design and installation for new construction and retrofits. We engineer each system for peak efficiency and comfort.",
    icon: Thermometer,
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  },
  {
    num: "02",
    title: "Maintenance & Repair",
    description:
      "Preventive maintenance programs and 24/7 emergency repair services. Keep your systems running at optimal performance year-round.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
  },
  {
    num: "03",
    title: "Ductwork Design",
    description:
      "Precision ductwork engineering using computational fluid dynamics. Custom fabrication for maximum airflow efficiency and minimal energy loss.",
    icon: Wind,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    num: "04",
    title: "Indoor Air Quality",
    description:
      "Advanced filtration, UV purification, and humidity control systems. Breathe cleaner air with solutions tailored to your space.",
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1631545806609-05faf2faf3f5?w=800&q=80",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger reveal
      const cards = sectionRef.current?.querySelectorAll(".service-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              delay: i * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-nav-theme="light"
      className="relative bg-stone py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 max-w-2xl opacity-0">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-teal">
            What We Do
          </span>
          <h2 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl lg:text-6xl">
            Services built on precision
          </h2>
          <p className="mt-4 font-sans text-lg font-light leading-relaxed text-charcoal/60">
            Every project is approached with the rigor of engineering and the
            care of craftsmanship.
          </p>
        </div>

        {/* Stacking Cards */}
        <div className="space-y-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.num}
                className="service-card sticky top-24 opacity-0"
              >
                <div className="overflow-hidden border border-stone-mid/40 bg-stone-light shadow-lg">
                  <div className="grid items-center gap-8 p-8 md:grid-cols-5 lg:p-12">
                    {/* Left: Number + Content */}
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-6xl text-stone-mid/60 lg:text-7xl">
                          {service.num}
                        </span>
                        <div className="h-px flex-1 bg-stone-mid/30" />
                        <Icon
                          size={24}
                          className="text-teal"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="mt-6 font-serif text-3xl text-charcoal lg:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-lg font-sans text-base font-light leading-relaxed text-charcoal/60">
                        {service.description}
                      </p>
                      <a
                        href="#contact"
                        className="mt-6 inline-block font-sans text-sm font-medium text-teal transition-colors duration-300 hover:text-teal/70"
                      >
                        Learn more &rarr;
                      </a>
                    </div>

                    {/* Right: Image */}
                    <div className="md:col-span-2">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
