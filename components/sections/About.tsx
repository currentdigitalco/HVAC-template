"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const img = imageRef.current?.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      const elements = contentRef.current?.querySelectorAll(".reveal-item");
      if (elements) {
        elements.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
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
      id="about"
      data-nav-theme="light"
      className="relative overflow-hidden bg-ivory py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <div ref={imageRef} className="overflow-hidden lg:col-span-3">
            <div className="aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000&q=80"
                alt="HVAC technician working on a precision installation"
                className="h-[120%] w-full object-cover"
              />
            </div>
          </div>

          <div ref={contentRef} className="lg:col-span-2">
            <span className="reveal-item font-sans text-xs font-semibold uppercase tracking-[0.3em] text-terracotta opacity-0">
              Our Philosophy
            </span>

            <blockquote className="reveal-item mt-6 opacity-0">
              <p className="font-serif text-3xl italic leading-snug text-navy lg:text-4xl">
                &ldquo;Every system we design is a promise of comfort that lasts
                decades, not seasons.&rdquo;
              </p>
            </blockquote>

            <div className="reveal-item mt-8 h-px w-16 bg-terracotta opacity-0" />

            <p className="reveal-item mt-8 font-sans text-base font-light leading-relaxed text-navy/50 opacity-0">
              Founded on the principle that climate control is both science and
              craft, we bring engineering precision to every project. Our team
              combines decades of field experience with modern computational
              design tools.
            </p>

            <p className="reveal-item mt-4 font-sans text-base font-light leading-relaxed text-navy/50 opacity-0">
              From residential comfort to commercial-scale installations, we
              approach each space as unique — because it is. No templates, no
              shortcuts, just solutions that fit.
            </p>

            <a
              href="#contact"
              className="reveal-item mt-8 inline-block font-sans text-sm font-medium text-terracotta transition-colors duration-300 hover:text-terracotta-light opacity-0"
            >
              Meet the team &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
