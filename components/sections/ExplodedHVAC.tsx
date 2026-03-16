"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Fan, Wind, BatteryCharging, ShieldCheck } from "lucide-react";

export default function ExplodedHVAC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const layer1Y = useTransform(scrollYProgress, [0.3, 0.7], [0, -180]);
  const layer1Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const layer2Y = useTransform(scrollYProgress, [0.3, 0.7], [0, -60]);
  const layer2Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const layer3Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const layer4Y = useTransform(scrollYProgress, [0.3, 0.7], [0, 80]);
  const layer4Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const beamOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] md:min-h-[200vh] py-24" data-nav-theme="dark">

      <div className="sticky top-0 left-0 right-0 h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 lg:px-12">

        <div className="w-full md:w-1/2 flex flex-col justify-center max-w-lg mb-8 md:mb-0">
          <motion.div style={{ opacity }}>
            <span className="text-terracotta text-sm tracking-[0.2em] uppercase font-bold mb-4 block font-sans">
              Anatomy of Performance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-4 md:mb-6">
              Precision from the inside out.
            </h2>
            <p className="text-cream/60 font-sans font-light text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              Every system is only as strong as its weakest component. We only install high-efficiency units built with premium-grade compressors, advanced ECM motors, and aerospace-level coils.
              <br/><br className="hidden md:block"/>
              Scroll to inspect the engineering.
            </p>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
          <motion.div
            className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] will-change-transform"
            style={{ opacity }}
          >
            <motion.div
              style={{ y: layer4Y }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[80%] h-[40px] bg-white/5 border border-white/10 rounded-md shadow-2xl flex items-center justify-center z-10"
            >
              <div className="w-[90%] h-[10px] bg-white/10 rounded-full" />
              <motion.div
                style={{ opacity: layer4Op }}
                className="hidden md:flex absolute right-[-150px] items-center gap-3 w-40 text-cream"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest"><ShieldCheck size={18} className="inline mr-2 text-terracotta"/> Isolation Base</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[70%] h-[120px] sm:h-[160px] bg-navy border border-white/20 rounded-sm shadow-[0_0_50px_rgba(13,27,42,0.4)] flex items-center justify-center z-20 flex-col gap-2 p-3 sm:p-4"
            >
              <div className="w-full flex-1 border-t-2 border-b-2 border-dashed border-white/20 flex flex-col justify-between py-2">
                {[1,2,3,4].map(i => <div key={i} className="w-full h-[4px] bg-terracotta/40 rounded-full" />)}
              </div>
              <motion.div
                style={{ opacity: layer3Op }}
                className="hidden md:flex absolute left-[-180px] items-center gap-3 w-48 text-cream flex-row-reverse"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest text-right"><BatteryCharging size={18} className="inline mr-2 text-terracotta"/> Scroll Compressor</span>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: layer2Y }}
              className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[75%] h-[50px] sm:h-[60px] bg-white/5 border border-white/10 shadow-xl flex items-center px-3 sm:px-4 rounded-sm z-30"
            >
              <div className="w-full h-full flex flex-col justify-evenly">
                {[1,2,3,4,5].map(i => <div key={i} className="w-full h-[2px] bg-white/10" />)}
              </div>
              <motion.div
                style={{ opacity: layer2Op }}
                className="hidden md:flex absolute right-[-160px] items-center gap-3 w-40 text-cream"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest"><Wind size={18} className="inline mr-2 text-terracotta"/> HEPA Matrix</span>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: layer1Y }}
              className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[80%] h-[80px] sm:h-[100px] bg-white/5 rounded-t-xl shadow-2xl border-t border-x border-white/10 flex justify-center items-start pt-3 sm:pt-4 overflow-hidden z-40"
            >
              <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full border-[6px] sm:border-[8px] border-white/10 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                  <Fan size={40} className="text-terracotta opacity-80 sm:hidden" />
                  <Fan size={60} className="text-terracotta opacity-80 hidden sm:block" />
              </div>
              <motion.div
                style={{ opacity: layer1Op }}
                className="hidden md:flex absolute left-[-160px] top-4 items-center gap-3 w-40 text-cream flex-row-reverse"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest text-right"><Fan size={18} className="inline mr-2 text-terracotta"/> Variable Fan</span>
              </motion.div>
            </motion.div>

            <motion.div
                className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[4px] bg-terracotta/30 h-[60%] -z-10"
                style={{ opacity: beamOpacity }}
            />
          </motion.div>

          <motion.div
            style={{ opacity }}
            className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-3 flex-wrap px-4"
          >
            {[
              { icon: Fan, label: "Variable Fan" },
              { icon: Wind, label: "HEPA Matrix" },
              { icon: BatteryCharging, label: "Compressor" },
              { icon: ShieldCheck, label: "Isolation Base" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-cream/60">
                <Icon size={12} className="text-terracotta" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
