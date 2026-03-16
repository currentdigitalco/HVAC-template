"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface AirPathProps {
    variant?: "wave" | "step" | "straight" | "diagonal";
    color?: string;
    opacity?: number;
}

const PATHS = {
    wave: "M0,80 C150,80 150,20 300,20 L500,20 C550,20 550,80 600,80 L700,80 C750,80 750,140 900,140 L1100,140 C1150,140 1150,80 1200,80",
    step: "M0,20 L400,20 L400,100 L800,100 L800,40 L1200,40",
    straight: "M0,50 L1200,50",
    diagonal: "M0,20 L300,20 L900,120 L1200,120",
};

const PULSE_OFFSETS = [0, 0.2, 0.4, 0.6, 0.8] as const;

function AirPulse({ scrollYProgress, offset, color, pathD }: { scrollYProgress: any; offset: number; color: string; pathD: string }) {
  const offsetDistance = useTransform(scrollYProgress, [0, 1], [`${offset * 100}%`, `${(offset + 1.2) * 100}%`]);
  const pulseOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  return (
    <motion.circle
      r="5"
      fill={color}
      className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      style={{
        offsetPath: `path('${pathD}')`,
        offsetDistance,
        opacity: pulseOpacity,
      }}
    />
  );
}

export default function AirPath({ variant = "wave", color = "#2563EB", opacity = 1 }: AirPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 40,
    damping: 20
  });

  const pathD = PATHS[variant];

  return (
    <div
        ref={containerRef}
        style={{ opacity }}
        className="relative w-full overflow-hidden h-40 flex items-center"
        aria-hidden="true"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <svg
          viewBox="0 0 1200 160"
          fill="none"
          className="h-auto w-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Background Shadow Path */}
          <path
            d={pathD}
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.03"
          />

          {/* Animated Active Duct */}
          <motion.path
            ref={pathRef}
            d={pathD}
            stroke={color}
            // @ts-ignore
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
            style={{
                pathLength: pathLength
            }}
          />

          {/* Traveling Air Pulses — each is its own component to respect hooks rules */}
          {PULSE_OFFSETS.map((offset, i) => (
            <AirPulse
              key={i}
              scrollYProgress={scrollYProgress}
              offset={offset}
              color={color}
              pathD={pathD}
            />
          ))}

          {/* Connection Nodes */}
          <circle cx="400" cy={variant === "step" ? 20 : 50} r="2" fill={color} opacity="0.1" />
          <circle cx="800" cy={variant === "step" ? 100 : 50} r="2" fill={color} opacity="0.1" />
        </svg>
      </div>
    </div>
  );
}
