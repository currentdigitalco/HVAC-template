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

  // Layer 1: Top Fan/Housing (moves up on scroll)
  const layer1Y = useTransform(scrollYProgress, [0.3, 0.7], [0, -180]);
  const layer1Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  // Layer 2: Filter/Coil (moves slightly up)
  const layer2Y = useTransform(scrollYProgress, [0.3, 0.7], [0, -60]);
  const layer2Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // Layer 3: Compressor Core (stays put)
  const layer3Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // Layer 4: Base / Drip Pan (moves down)
  const layer4Y = useTransform(scrollYProgress, [0.3, 0.7], [0, 80]);
  const layer4Op = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // General opacity for the whole system
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-ivory-alt py-24" data-nav-theme="light">
      <div className="sticky top-0 left-0 right-0 h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 lg:px-12">
        
        {/* Left text column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center max-w-lg mb-12 md:mb-0">
          <motion.div style={{ opacity }}>
            <span className="text-terracotta text-sm tracking-[0.2em] uppercase font-bold mb-4 block font-sans">
              Anatomy of Performance
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6">
              Precision from the inside out.
            </h2>
            <p className="text-navy/60 font-sans font-light text-lg leading-relaxed mb-8">
              Every system is only as strong as its weakest component. We only install high-efficiency units built with premium-grade compressors, advanced ECM motors, and aerospace-level coils. 
              <br/><br/>
              Scroll to inspect the engineering.
            </p>
          </motion.div>
        </div>

        {/* Right visualization column */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[500px]">
          <motion.div 
            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] perspective-1000"
            style={{ opacity }}
          >
            {/* Base Layer 4: Anti-vibration base */}
            <motion.div 
              style={{ y: layer4Y }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[80%] h-[40px] bg-sand border-2 border-navy/20 rounded-md shadow-2xl flex items-center justify-center z-10"
            >
              <div className="w-[90%] h-[10px] bg-navy/10 rounded-full" />
              <motion.div 
                style={{ opacity: layer4Op }}
                className="absolute right-[-150px] flex items-center gap-3 w-40 text-navy"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest"><ShieldCheck size={18} className="inline mr-2 text-terracotta"/> Isolation Base</span>
              </motion.div>
            </motion.div>

            {/* Layer 3: Compressor & Coils */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[70%] h-[160px] bg-navy border border-navy-light rounded-sm shadow-[0_0_50px_rgba(13,27,42,0.4)] flex items-center justify-center z-20 flex-col gap-2 p-4"
            >
              <div className="w-full flex-1 border-t-2 border-b-2 border-dashed border-white/20 flex flex-col justify-between py-2">
                {[1,2,3,4].map(i => <div key={i} className="w-full h-[4px] bg-terracotta/40 rounded-full" />)}
              </div>
              <motion.div 
                style={{ opacity: layer3Op }}
                className="absolute left-[-180px] flex items-center gap-3 w-48 text-navy flex-row-reverse"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest text-right"><BatteryCharging size={18} className="inline mr-2 text-terracotta"/> Scroll Compressor</span>
              </motion.div>
            </motion.div>

            {/* Layer 2: Filter/Heat Exchanger */}
            <motion.div 
              style={{ y: layer2Y }}
              className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[75%] h-[60px] bg-white border border-sand-light shadow-xl flex items-center px-4 rounded-sm z-30"
            >
              <div className="w-full h-full flex flex-col justify-evenly">
                {[1,2,3,4,5].map(i => <div key={i} className="w-full h-[2px] bg-navy/10" />)}
              </div>
              <motion.div 
                style={{ opacity: layer2Op }}
                className="absolute right-[-160px] flex items-center gap-3 w-40 text-navy"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest"><Wind size={18} className="inline mr-2 text-terracotta"/> HEPA Matrix</span>
              </motion.div>
            </motion.div>

            {/* Layer 1: Top Housing and Fan */}
            <motion.div 
              style={{ y: layer1Y }}
              className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[80%] h-[100px] bg-sand-light rounded-t-xl shadow-2xl border-t border-x border-white flex justify-center items-start pt-4 overflow-hidden z-40"
            >
              <div className="w-[120px] h-[120px] rounded-full border-[8px] border-navy/10 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                  <Fan size={60} className="text-terracotta opacity-80" />
              </div>
              <motion.div 
                style={{ opacity: layer1Op }}
                className="absolute left-[-160px] top-4 flex items-center gap-3 w-40 text-navy flex-row-reverse"
              >
                  <div className="h-[1px] w-8 bg-terracotta" />
                  <span className="text-sm font-sans font-bold uppercase tracking-widest text-right"><Fan size={18} className="inline mr-2 text-terracotta"/> Variable Fan</span>
              </motion.div>
            </motion.div>
            
            {/* Central connecting beams that appear when separated */}
            <motion.div 
                className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[4px] bg-terracotta/30 z-0 h-[60%] -z-10"
                style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
