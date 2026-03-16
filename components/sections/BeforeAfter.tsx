"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    label: "Residential Retrofit",
    location: "Heritage Home, Oak District",
    before:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    label: "Commercial Install",
    location: "Sterling Office Complex",
    before:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
  },
];

function ProjectReveal({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Curtain wipe: "after" image is clipped and reveals on scroll
      gsap.fromTo(
        clipRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );

      // Label reveal
      gsap.fromTo(
        labelRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Project Label */}
      <div ref={labelRef} className="mb-6 opacity-0">
        <span className="font-serif text-6xl text-stone-mid/50 lg:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-serif text-3xl text-charcoal lg:text-4xl">
          {project.label}
        </h3>
        <p className="mt-1 font-sans text-sm font-light text-charcoal/50">
          {project.location}
        </p>
      </div>

      {/* Before/After Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {/* Before Image (base layer) */}
        <img
          src={project.before}
          alt={`${project.label} — before`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Before Label */}
        <div className="absolute bottom-6 left-6 z-10">
          <span className="bg-dark/70 px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-widest text-stone/80 backdrop-blur-sm">
            Before
          </span>
        </div>

        {/* After Image (revealed via clip-path) */}
        <div
          ref={clipRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <img
            src={project.after}
            alt={`${project.label} — after`}
            className="h-full w-full object-cover"
          />
          {/* After Label */}
          <div className="absolute bottom-6 right-6 z-10">
            <span className="bg-teal/90 px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm">
              After
            </span>
          </div>
        </div>

        {/* Center divider line */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-px -translate-x-1/2 bg-stone/40" />
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      data-nav-theme="light"
      className="relative bg-stone-light py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 max-w-2xl opacity-0">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-teal">
            Our Work
          </span>
          <h2 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl lg:text-6xl">
            Transformations that speak for themselves
          </h2>
        </div>

        {/* Projects */}
        <div className="space-y-20">
          {PROJECTS.map((project, i) => (
            <ProjectReveal key={project.label} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
