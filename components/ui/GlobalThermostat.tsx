"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedValue({ value }: { value: any }) {
    const [display, setDisplay] = useState("");
    useEffect(() => {
        return value.on("change", (latest: any) => setDisplay(String(latest)));
    }, [value]);
    
    // Initial value
    useEffect(() => {
        setDisplay(String(value.get()));
    }, []);

    return <>{display}</>;
}

export default function GlobalThermostat() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const score = useTransform(smoothProgress, [0, 1], [0, 100]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-8 right-8 z-[100] hidden lg:flex items-center gap-4 bg-white/90 backdrop-blur-xl border border-navy/10 p-4 pr-6 rounded-full shadow-2xl"
    >
      <div className="w-12 h-12 rounded-full border-2 border-navy/5 flex items-center justify-center relative bg-ivory">
        <Thermometer size={20} className="text-terracotta" />
        <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] -rotate-90">
            <motion.circle
                cx="50%"
                cy="50%"
                r="47%"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                style={{
                    pathLength: smoothProgress
                }}
            />
        </svg>
      </div>

      <div className="flex flex-col items-start leading-tight">
        <span className="text-[9px] uppercase tracking-widest text-navy/40 font-bold">Climate Confidence</span>
        <div className="flex items-baseline gap-1">
            <span className="text-lg font-serif font-black text-navy">
                <AnimatedValue value={useTransform(score, (v) => Math.round(Number(v)))} />
            </span>
            <span className="text-[10px] font-sans font-bold text-accent-blue">%</span>
        </div>
      </div>
    </motion.div>
  );
}
