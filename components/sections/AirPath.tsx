"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AirPath() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative -my-8 overflow-hidden py-0" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          {/* Ductwork-inspired path connecting sections */}
          <path
            ref={pathRef}
            d="M0,60 C150,60 150,20 300,20 L500,20 C550,20 550,60 600,60 L700,60 C750,60 750,100 900,100 L1100,100 C1150,100 1150,60 1200,60"
            stroke="#C2714F"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          {/* Decorative nodes along the path */}
          <circle cx="300" cy="20" r="3" fill="#C2714F" opacity="0.3" />
          <circle cx="600" cy="60" r="3" fill="#C2714F" opacity="0.3" />
          <circle cx="900" cy="100" r="3" fill="#C2714F" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
