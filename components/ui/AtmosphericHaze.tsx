"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport fixed overlay that creates a slow-drifting
 * atmospheric haze — like Jesko Jets' 48s cloud drift.
 * Barely perceptible but makes the scene feel alive.
 */
export default function AtmosphericHaze() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced && ref.current) {
      ref.current.style.display = "none";
    }
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
      style={{
        mixBlendMode: "soft-light",
        opacity: 0.04,
        background: `
          radial-gradient(ellipse 80% 60% at 30% 40%, rgba(234, 88, 12, 0.4) 0%, transparent 70%),
          radial-gradient(ellipse 60% 80% at 70% 60%, rgba(37, 99, 235, 0.3) 0%, transparent 70%)
        `,
        backgroundSize: "200% 200%, 200% 200%",
        animation: "haze-drift 45s ease-in-out infinite",
      }}
    />
  );
}
