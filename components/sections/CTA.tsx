"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll(".reveal-item");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-nav-theme="dark"
      className="relative flex min-h-[80vh] items-center bg-dark py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <span className="reveal-item font-sans text-xs font-semibold uppercase tracking-[0.3em] text-teal opacity-0">
          Start Your Project
        </span>

        <h2 className="reveal-item mt-6 font-serif text-5xl text-stone opacity-0 sm:text-6xl lg:text-7xl xl:text-8xl">
          Ready to transform
          <br />
          your space?
        </h2>

        <p className="reveal-item mx-auto mt-6 max-w-lg font-sans text-lg font-light leading-relaxed text-stone/50 opacity-0">
          Schedule a free consultation and let us design a climate solution
          tailored to your space, budget, and comfort goals.
        </p>

        <div className="reveal-item mt-10 flex flex-col items-center justify-center gap-4 opacity-0 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            href="#contact"
            className="gap-2"
          >
            Schedule a Consultation
            <ArrowRight size={16} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="tel:+15551234567"
            className="gap-2 border-stone/20 text-stone hover:bg-stone/10 hover:text-stone"
          >
            <Phone size={16} />
            (555) 123-4567
          </Button>
        </div>
      </div>
    </section>
  );
}
