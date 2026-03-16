"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 2400, suffix: "+", label: "Projects Completed" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 60, suffix: "min", label: "Avg. Response Time" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Staggered entrance for stat items (triggered once)
      const items = sectionRef.current?.querySelectorAll(".stat-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Counter animation (triggered once per stat)
      const counters = sectionRef.current?.querySelectorAll(".stat-value");
      if (!counters) return;

      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            counter.textContent = Math.round(obj.val).toLocaleString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="stat-value font-serif text-5xl text-terracotta lg:text-6xl"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="font-sans text-xl font-light text-terracotta/50">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-3 font-sans text-sm font-light uppercase tracking-widest text-cream/30">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
