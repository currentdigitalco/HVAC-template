"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Stagger reveal headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { y: 120, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
          }
        );
      }

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

      // CTA fade in
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Scroll indicator pulse
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Precision", "Climate.", "Crafted", "Comfort."];

  return (
    <section
      ref={containerRef}
      data-nav-theme="dark"
      className="relative flex min-h-screen items-center justify-start overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&q=80"
          alt="Modern HVAC installation in a contemporary building"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/60 to-dark/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="font-serif text-6xl leading-[1.05] text-stone sm:text-7xl lg:text-8xl xl:text-9xl"
            style={{ perspective: "600px" }}
          >
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="word inline-block mr-[0.25em]"
                style={{ transformOrigin: "center bottom" }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 max-w-lg font-sans text-lg font-light leading-relaxed text-stone/70 opacity-0 sm:text-xl"
          >
            Expert HVAC installation, maintenance, and air quality solutions —
            engineered for lasting comfort in every space.
          </p>

          <div ref={ctaRef} className="mt-10 flex gap-4 opacity-0">
            <Button variant="primary" size="lg" href="#projects">
              View Our Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#services"
              className="border-stone/30 text-stone hover:bg-stone/10 hover:text-stone"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-stone/40">
          Scroll
        </span>
        <ChevronDown size={20} className="animate-bounce text-stone/40" />
      </div>
    </section>
  );
}
