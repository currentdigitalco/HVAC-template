"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Heritage Home Retrofit",
    location: "Oak District",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    stats: [
      { label: "Before", temp: "78", humidity: "58", efficiency: "C" },
      { label: "After", temp: "70", humidity: "48", efficiency: "A" }
    ],
    improvement: "Precision Humidity Control",
    description: "Custom-engineered rooftop units with integrated energy recovery ventilators (ERV) for triple-filtered fresh air exchange."
  }
];

function PerformanceDial({ progress, stats }: { progress: any, stats: any }) {
  const currentTemp = useTransform(progress, [0, 1], [parseInt(stats[0].temp), parseInt(stats[1].temp)]);
  const currentHumidity = useTransform(progress, [0, 1], [parseInt(stats[0].humidity), parseInt(stats[1].humidity)]);
  const status = useTransform(progress, (v: number) => v > 0.8 ? "Optimized" : "Calibrating");

  // Hoist all useTransform calls out of JSX
  const ringRedOffset = useTransform(progress, [0, 1], ["283%", "40%"]);
  const ringRedOpacity = useTransform(progress, [0, 0.2], [1, 0.2]);
  const ringBlueOffset = useTransform(progress, [0, 1], ["283%", "0%"]);
  const ringBlueOpacity = useTransform(progress, [0.5, 1], [0, 1]);
  const roundedTemp = useTransform(currentTemp, (v: number) => Math.round(v));
  const roundedHumidity = useTransform(currentHumidity, (v: number) => Math.round(v));
  const statusColor = useTransform(progress, [0, 1], ["#EA580C", "#38BDF8"]);

  const tempRef = useRef<HTMLSpanElement>(null);
  const humidityRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubs = [
      roundedTemp.on("change", (v) => { if (tempRef.current) tempRef.current.textContent = String(v); }),
      roundedHumidity.on("change", (v) => { if (humidityRef.current) humidityRef.current.textContent = String(v); }),
      status.on("change", (v) => { if (statusRef.current) statusRef.current.textContent = String(v); }),
      statusColor.on("change", (v) => { if (statusRef.current) statusRef.current.style.color = v; }),
    ];
    return () => unsubs.forEach((u) => u());
  }, [roundedTemp, roundedHumidity, status, statusColor]);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] aspect-square rounded-full border border-white/10 bg-white/10 backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center overflow-hidden">
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
                    strokeDashoffset: ringRedOffset,
                    opacity: ringRedOpacity,
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
                className="drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                style={{
                    strokeDashoffset: ringBlueOffset,
                    opacity: ringBlueOpacity,
                }}
            />
        </svg>

        <div className="text-center z-10">
            <span className="block text-[60px] sm:text-[80px] md:text-[100px] font-serif font-bold text-white leading-none tabular-nums">
                <span ref={tempRef}>{stats[0].temp}</span>
                <span className="text-2xl sm:text-3xl md:text-4xl align-top mt-4 inline-block">°</span>
            </span>
            <div className="flex gap-3 sm:gap-4 mt-2 justify-center border-t border-white/10 pt-3 sm:pt-4">
                <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">Humidity</span>
                    <span className="text-sm font-sans font-bold text-white">
                        <span ref={humidityRef}>{stats[0].humidity}</span>%
                    </span>
                </div>
                <div className="text-left border-l border-white/10 pl-3 sm:pl-4">
                    <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</span>
                    <span
                        ref={statusRef}
                        className="text-sm font-sans font-bold"
                        style={{ color: "#EA580C" }}
                    >
                        Calibrating
                    </span>
                </div>
            </div>
        </div>

        {/* Background "Ghost" Metrics */}
        <div className="absolute inset-0 p-8 sm:p-12 opacity-5 pointer-events-none">
            <div className="w-full h-full border-2 border-dashed border-white rounded-full animate-[spin_60s_linear_infinite]" />
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
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
            style={{ scale: bgScale, y: bgY }}
            className="absolute inset-0 z-0"
        >
            <div className="absolute inset-0 bg-navy/60 z-10 backdrop-blur-[1px]" />
            <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
            />
        </motion.div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl md:text-5xl font-serif text-white/10 font-bold italic">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-serif text-white">{project.title}</h3>
                        </div>
                        <p className="text-terracotta font-sans text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <CheckCircle2 size={16} /> {project.improvement}
                        </p>
                        <p className="text-white/70 font-sans font-light text-lg leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 bg-white/5 p-8 rounded-xl border border-white/5">
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Baseline</span>
                                <div className="flex items-baseline gap-1 text-white opacity-50">
                                    <span className="text-2xl font-serif">{project.stats[0].temp}°</span>
                                    <span className="text-xs font-sans">/ {project.stats[0].humidity}% RH</span>
                                </div>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-terracotta font-bold mb-1">Output</span>
                                <div className="flex items-baseline gap-1 text-sky-400 font-bold">
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
        </div>
    </div>
  );
}

export default function PerformanceCaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const els = headerRef.current?.querySelectorAll(".heading-reveal");
      if (els) {
        gsap.fromTo(
          els,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="bg-navy relative overflow-hidden" data-nav-theme="dark">
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative z-20">
        <div className="mb-16">
          <span className="heading-reveal text-terracotta uppercase tracking-[0.3em] font-sans text-xs font-bold mb-4 block opacity-0">
            Proven Outcomes
          </span>
          <h2 className="heading-reveal text-4xl md:text-5xl lg:text-6xl font-serif text-white max-w-2xl opacity-0">
            Hard engineering. <br/><span className="italic font-light">Real results.</span>
          </h2>
        </div>
      </div>

      <div className="divide-y divide-white/5">
          {PROJECTS.map((project, i) => (
              <ProjectCase key={i} project={project} index={i} />
          ))}
      </div>
    </section>
  );
}
