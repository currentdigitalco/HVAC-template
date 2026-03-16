"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Button from "@/components/ui/Button";

// A component that generates canvas particles
const AirflowParticles = ({ progress }: { progress: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    // Set proper canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle system
    const particles = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * -2 - 0.5, // generally moving up
      life: Math.random(), // used for opacity
    }));

    // Subscribe to framer motion progress value to drive particle color & speed
    let currentProgress = progress.get();
    const unsubscribe = progress.on("change", (latest: number) => {
      currentProgress = latest;
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // As progress goes 0 -> 1, speed goes faster and color changes from red/orange to blue/cyan
        const speedMultiplier = 1 + currentProgress * 4;
        
        p.y += p.speedY * speedMultiplier;
        p.x += p.speedX * speedMultiplier;

        // Reset particle if it goes out of bounds
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Color interpolation
        // Warm: rgb(255, 100, 50)
        // Cool: rgb(100, 200, 255)
        const r = Math.floor(255 - currentProgress * 155);
        const g = Math.floor(100 + currentProgress * 100);
        const b = Math.floor(50 + currentProgress * 205);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const alpha = Math.sin(p.y / canvas.height * Math.PI) * 0.6; // fade out at top/bottom
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      unsubscribe();
    };
  }, [progress]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full opacity-60 mix-blend-screen" />;
};

export default function ThermostatHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Map progress (0 -> 1) to temperature (85 -> 72)
  const temp = useTransform(smoothProgress, [0, 1], [85, 72]);
  
  // Background gradient color transition From warm orange to frost blue
  const background = useTransform(
    smoothProgress,
    [0, 1],
    [
      "radial-gradient(circle at 50% 50%, rgba(194, 113, 79, 0.5) 0%, rgba(13, 27, 42, 1) 100%)",
      "radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.4) 0%, rgba(13, 27, 42, 1) 100%)"
    ]
  );
  
  // Convert temperature to state for printing inside the component
  const [currentTemp, setCurrentTemp] = useState(85);
  
  useEffect(() => {
    return temp.on("change", (latest) => {
      setCurrentTemp(Math.round(latest));
    });
  }, [temp]);

  return (
    <motion.section
      ref={containerRef}
      style={{ background }}
      className="relative flex min-h-[150vh] items-start justify-center overflow-hidden bg-navy"
      data-nav-theme="dark"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 lg:p-12 overflow-hidden">
        <AirflowParticles progress={smoothProgress} />
        
        {/* Left Content */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start text-left mb-12 md:mb-0 max-w-xl md:pr-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-white text-xs font-semibold tracking-widest uppercase">24/7 Emergency Service</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] tracking-tight mb-6">
                Master your <br/><span className="italic font-light">climate.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/70 font-sans font-light mb-10 leading-relaxed max-w-lg">
                Scroll to cool down. Experience the precision of engineered HVAC systems that bring instant relief and lasting comfort.
                </p>
            </motion.div>
          
            <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <a href="#contact" className="px-8 py-4 bg-terracotta hover:bg-terracotta-light text-white font-sans font-medium rounded-sm transition-colors text-sm tracking-wide uppercase">
                    Book Service Now
                </a>
                <a href="#services" className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-sans font-medium rounded-sm transition-colors text-sm tracking-wide uppercase">
                    Our Solutions
                </a>
            </motion.div>
            
            {/* Trust Tributes */}
            <motion.div 
                className="mt-12 flex gap-6 items-center border-t border-white/10 pt-8 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-navy bg-white/20 overflow-hidden`}>
                            <img src={`https://i.pravatar.cc/100?img=${i+40}`} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="text-sm font-sans text-white/60">
                    <strong className="text-white block font-medium">4.9/5 Average Rating</strong>
                    From 500+ Local homeowners
                </div>
            </motion.div>
        </div>

        {/* Right Content: Thermostat UI */}
        <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center">
          <motion.div 
            className="relative flex items-center justify-center w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full border border-white/10 bg-black/30 backdrop-blur-2xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            {/* Glass highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            {/* Dial Tick marks */}
            <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-[24px] rounded-full border border-dashed border-white/10 animate-[spin_80s_reverse_linear_infinite]" />
            
            <div className="text-center relative z-20">
              <span className="block text-sm md:text-lg font-sans tracking-[0.2em] text-white/50 mb-2 uppercase">
                Temperature
              </span>
              <div className="flex items-start justify-center text-white font-sans font-light">
                <span className="text-[90px] md:text-[140px] leading-none tracking-tighter tabular-nums drop-shadow-lg">
                  {currentTemp}
                </span>
                <span className="text-3xl md:text-5xl mt-2 md:mt-4 text-white/70">&deg;</span>
              </div>
              <motion.span 
                className="block text-xs md:text-sm font-sans uppercase tracking-widest mt-4"
                style={{
                  color: useTransform(smoothProgress, [0, 0.8, 1], ["#ff6b35", "#a1e5fb", "#00b4d8"])
                }}
              >
                {currentTemp > 75 ? "System Active: Cooling" : currentTemp === 72 ? "Comfort Reached" : "Cooling..."}
              </motion.span>
            </div>
            
            {/* Ring fill indicator */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <motion.circle
                cx="50%"
                cy="50%"
                r="47%"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="transition-colors duration-200"
                style={{
                  strokeDasharray: "295%",
                  strokeDashoffset: useTransform(smoothProgress, [0, 1], ["295%", "0%"]),
                  color: useTransform(smoothProgress, [0, 1], ["#ff6b35", "#00b4d8"])
                }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70"
          style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 font-sans font-medium">Scroll to cool</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-white"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
