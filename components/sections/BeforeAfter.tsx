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
      <div ref={labelRef} className="mb-6 opacity-0">
        <span className="font-serif text-6xl text-sand/60 lg:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-serif text-3xl text-navy lg:text-4xl">
          {project.label}
        </h3>
        <p className="mt-1 font-sans text-sm font-light text-navy/40">
          {project.location}
        </p>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={project.before}
          alt={`${project.label} — before`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-6 left-6 z-10">
          <span className="bg-navy/70 px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-widest text-ivory/80 backdrop-blur-sm">
            Before
          </span>
        </div>

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
          <div className="absolute bottom-6 right-6 z-10">
            <span className="bg-terracotta/90 px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm">
              After
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-px -translate-x-1/2 bg-ivory/30" />
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
      className="relative bg-ivory-alt py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 max-w-2xl opacity-0">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
            Our Work
          </span>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl lg:text-6xl">
            Transformations that speak for themselves
          </h2>
        </div>

        <div className="space-y-20">
          {PROJECTS.map((project, i) => (
            <ProjectReveal key={project.label} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
