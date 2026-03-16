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
    if (prefersReduced) {
      [headlineRef, subtitleRef, ctaRef, scrollRef].forEach((ref) => {
        if (ref.current) ref.current.style.opacity = "1";
      });
      const words = headlineRef.current?.querySelectorAll(".word");
      words?.forEach((w) => ((w as HTMLElement).style.opacity = "1"));
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { y: 80, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15,
          }
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-nav-theme="dark"
      className="relative flex min-h-screen items-end overflow-hidden pb-24 lg:pb-32"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&q=80"
          className="h-full w-full object-cover"
        >
          {/* Replace src with AI-generated video: air from outdoor HVAC → ducts → into home → people content */}
          <source src="" type="video/mp4" />
        </video>
        {/* Gradient: dark at top for nav, fading to warm ivory at bottom for seamless body transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/50 to-ivory" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="font-serif text-6xl leading-[1.05] text-ivory sm:text-7xl lg:text-8xl xl:text-[7rem]"
          >
            <span className="word inline-block opacity-0">The </span>
            <span className="word inline-block opacity-0">Architecture </span>
            <br className="hidden sm:block" />
            <span className="word inline-block opacity-0">of </span>
            <span className="word inline-block opacity-0 italic">Comfort.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 max-w-lg font-sans text-lg font-light leading-relaxed text-ivory/70 opacity-0 sm:text-xl"
          >
            Expert HVAC engineering — from precision installation to indoor air
            quality systems — crafted for comfort that lasts decades.
          </p>

          <div ref={ctaRef} className="mt-10 flex gap-4 opacity-0">
            <Button variant="primary" size="lg" href="#projects">
              Explore Our Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="#services"
              className="border-ivory/30 text-ivory hover:bg-ivory/10 hover:text-ivory"
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
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-navy/40">
          Scroll
        </span>
        <ChevronDown size={20} className="animate-bounce text-navy/40" />
      </div>
    </section>
  );
}
