"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PROJECTS = [
  {
    title: "Heritage Home Retrofit",
    location: "Oak District",
    stats: [
      { label: "Before", temp: "82", humidity: "65", efficiency: "D-" },
      { label: "After", temp: "72", humidity: "45", efficiency: "A+" }
    ],
    improvement: "40% Energy Reduction",
    description: "Replaced a failing 20-year-old boiler and window units with a multi-zone heat pump system and high-velocity ducting."
  },
  {
    title: "Sterling Office Complex",
    location: "Commercial Hub",
    stats: [
      { label: "Before", temp: "78", humidity: "58", efficiency: "C" },
      { label: "After", temp: "70", humidity: "48", efficiency: "A" }
    ],
    improvement: "Precision Humidity Control",
    description: "Custom-engineered rooftop units with integrated energy recovery ventilators (ERV) for triple-filtered fresh air exchange."
  }
];

function AnimatedValue({ value }: { value: any }) {
    const [display, setDisplay] = useState("");
    useMotionValueEvent(value, "change", (latest: any) => setDisplay(String(latest)));
    useEffect(() => { setDisplay(String(value.get())); }, [value]);
    return <>{display}</>;
}

function PerformanceDial({ progress, stats }: { progress: any, stats: any }) {
  const currentTemp = useTransform(progress, [0, 1], [parseInt(stats[0].temp), parseInt(stats[1].temp)]);
  const currentHumidity = useTransform(progress, [0, 1], [parseInt(stats[0].humidity), parseInt(stats[1].humidity)]);
  const status = useTransform(progress, (v) => Number(v) > 0.8 ? "Optimized" : "Calibrating");
  
  return (
    <div className="relative w-full max-w-[400px] aspect-square rounded-full border border-navy/5 bg-white shadow-2xl flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
            <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#EA580C"
                strokeWidth="2"
                strokeDasharray="283%"
                style={{
                    strokeDashoffset: useTransform(progress, [0, 1], ["283%", "40%"]),
                    opacity: useTransform(progress, [0, 0.2], [1, 0.2])
                }}
            />
            <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#2563EB"
                strokeWidth="6"
                strokeDasharray="283%"
                strokeLinecap="round"
                style={{
                    strokeDashoffset: useTransform(progress, [0, 1], ["283%", "0%"]),
                    opacity: useTransform(progress, [0.5, 1], [0, 1])
                }}
            />
        </svg>

        <div className="text-center z-10">
            <span className="block text-[80px] md:text-[100px] font-serif font-bold text-navy leading-none tabular-nums">
                <AnimatedValue value={useTransform(currentTemp, (v) => Math.round(Number(v)))} />
                <span className="text-3xl md:text-4xl align-top mt-4 inline-block">°</span>
            </span>
            <div className="flex gap-4 mt-2 justify-center border-t border-navy/5 pt-4">
                <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-widest text-navy/40 font-bold">Humidity</span>
                    <span className="text-sm font-sans font-bold text-navy">
                        <AnimatedValue value={useTransform(currentHumidity, (v) => Math.round(Number(v)))} />%
                    </span>
                </div>
                <div className="text-left border-l border-navy/5 pl-4">
                    <span className="block text-[10px] uppercase tracking-widest text-navy/40 font-bold">Status</span>
                    <motion.span 
                        className="text-sm font-sans font-bold"
                        style={{ color: useTransform(progress, [0, 1], ["#EA580C", "#2563EB"]) }}
                    >
                        <AnimatedValue value={status} />
                    </motion.span>
                </div>
            </div>
        </div>
        
        {/* Background "Ghost" Metrics */}
        <div className="absolute inset-0 p-12 opacity-5 pointer-events-none">
            <div className="w-full h-full border-2 border-dashed border-navy rounded-full animate-[spin_60s_linear_infinite]" />
        </div>
    </div>
  );
}

function ProjectCase({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-screen py-24">
        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl md:text-5xl font-serif text-navy/10 font-bold italic">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif text-navy">{project.title}</h3>
                </div>
                <p className="text-terracotta font-sans text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <CheckCircle2 size={16} /> {project.improvement}
                </p>
                <p className="text-navy/60 font-sans font-light text-lg leading-relaxed mb-8">
                    {project.description}
                </p>

                <div className="grid grid-cols-2 gap-6 bg-navy/5 p-8 rounded-xl border border-navy/5">
                    <div>
                        <span className="block text-[10px] uppercase tracking-widest text-navy/40 font-bold mb-1">Baseline</span>
                        <div className="flex items-baseline gap-1 text-navy opacity-60">
                            <span className="text-2xl font-serif">{project.stats[0].temp}°</span>
                            <span className="text-xs font-sans">/ {project.stats[0].humidity}% RH</span>
                        </div>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase tracking-widest text-terracotta font-bold mb-1">Output</span>
                        <div className="flex items-baseline gap-1 text-accent-blue font-bold">
                            <span className="text-2xl font-serif">{project.stats[1].temp}°</span>
                            <span className="text-xs font-sans">/ {project.stats[1].humidity}% RH</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        <div className="flex items-center justify-center">
            <PerformanceDial progress={progress} stats={project.stats} />
        </div>
    </div>
  );
}

export default function PerformanceCaseStudies() {
  return (
    <section id="projects" className="bg-white py-24" data-nav-theme="light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-terracotta uppercase tracking-[0.3em] font-sans text-xs font-bold mb-4 block">
            Proven Outcomes
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy max-w-2xl">
            Hard engineering. <br/><span className="italic font-light">Real results.</span>
          </h2>
        </div>

        <div className="divide-y divide-navy/5">
            {PROJECTS.map((project, i) => (
                <ProjectCase key={i} project={project} index={i} />
            ))}
        </div>
      </div>
    </section>
  );
}
