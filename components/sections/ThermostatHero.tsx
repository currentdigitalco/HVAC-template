"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Canvas particle system — reduces count on mobile, pauses when off-screen
const AirflowParticles = ({ progress }: { progress: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fewer particles on mobile for better perf
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 150;

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * -2 - 0.5,
      life: Math.random(),
    }));

    let currentProgress = progress.get();
    const unsubscribe = progress.on("change", (latest: number) => {
      currentProgress = latest;
    });

    // Pause canvas rendering when hero is scrolled past
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) render();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const speedMultiplier = 1 + currentProgress * 4;
        p.y += p.speedY * speedMultiplier;
        p.x += p.speedX * speedMultiplier;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const r = Math.floor(255 - currentProgress * 155);
        const g = Math.floor(100 + currentProgress * 100);
        const b = Math.floor(50 + currentProgress * 205);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const alpha = Math.sin((p.y / canvas.height) * Math.PI) * 0.6;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      unsubscribe();
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full opacity-60 mix-blend-screen"
    />
  );
};

export default function ThermostatHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  const temp = useTransform(smoothProgress, [0, 1], [85, 72]);
  const statusColor = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    ["#ff6b35", "#a1e5fb", "#00b4d8"]
  );

  const background = useTransform(smoothProgress, [0, 1], [
    "radial-gradient(circle at 50% 50%, rgba(194, 113, 79, 0.5) 0%, rgba(13, 27, 42, 1) 100%)",
    "radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.4) 0%, rgba(13, 27, 42, 1) 100%)",
  ]);

  // Direct DOM updates instead of setState — no React re-renders
  useEffect(() => {
    const unsubTemp = temp.on("change", (latest) => {
      const rounded = Math.round(latest);
      if (tempRef.current) tempRef.current.textContent = String(rounded);
      if (statusRef.current) {
        statusRef.current.textContent =
          rounded > 75
            ? "System Active: Cooling"
            : rounded === 72
              ? "Comfort Reached"
              : "Cooling...";
      }
    });

    const unsubColor = statusColor.on("change", (latest) => {
      if (statusRef.current) statusRef.current.style.color = latest;
    });

    return () => {
      unsubTemp();
      unsubColor();
    };
  }, [temp, statusColor]);

  return (
    <motion.section
      ref={containerRef}
      style={{ background }}
      className="relative flex min-h-[150vh] items-start justify-center overflow-hidden bg-navy"
      data-nav-theme="dark"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 lg:p-12 pt-32 lg:pt-40 overflow-hidden">
        <AirflowParticles progress={smoothProgress} />

        {/* Left Content */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start text-left mb-8 md:mb-0 max-w-xl md:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] tracking-tight mb-4 md:mb-6">
              Master your <br />
              <span className="italic font-light">climate.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 font-sans font-light mb-8 md:mb-10 leading-relaxed max-w-lg">
              Scroll to cool down. Experience the precision of engineered HVAC
              systems that bring instant relief and lasting comfort.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-terracotta hover:bg-terracotta-light text-white font-sans font-medium rounded-sm transition-colors text-sm tracking-wide uppercase"
            >
              Book Service Now
            </a>
            <a
              href="#services"
              className="px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white hover:bg-white/10 font-sans font-medium rounded-sm transition-colors text-sm tracking-wide uppercase"
            >
              Our Solutions
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            className="mt-8 md:mt-12 flex gap-4 sm:gap-6 items-center border-t border-white/10 pt-6 md:pt-8 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-navy bg-white/20 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 40}`}
                    alt="Customer avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-xs sm:text-sm font-sans text-white/60">
              <strong className="text-white block font-medium">
                4.9/5 Average Rating
              </strong>
              From 500+ Local homeowners
            </div>
          </motion.div>
        </div>

        {/* Thermostat dial */}
        <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center">
          <motion.div
            className="relative flex items-center justify-center w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[450px] md:h-[450px] rounded-full border border-white/10 bg-black/30 backdrop-blur-2xl shadow-2xl will-change-transform"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-[24px] rounded-full border border-dashed border-white/10 animate-[spin_80s_reverse_linear_infinite]" />

            <div className="text-center relative z-20">
              <span className="block text-xs sm:text-sm md:text-lg font-sans tracking-[0.2em] text-white/50 mb-1 sm:mb-2 uppercase">
                Temperature
              </span>
              <div className="flex items-start justify-center text-white font-sans font-light">
                <span
                  ref={tempRef}
                  className="text-[60px] sm:text-[90px] md:text-[140px] leading-none tracking-tighter tabular-nums drop-shadow-lg"
                >
                  85
                </span>
                <span className="text-2xl sm:text-3xl md:text-5xl mt-1 sm:mt-2 md:mt-4 text-white/70">
                  &deg;
                </span>
              </div>
              <span
                ref={statusRef}
                className="block text-[10px] sm:text-xs md:text-sm font-sans uppercase tracking-widest mt-2 sm:mt-4"
                style={{ color: "#ff6b35" }}
              >
                System Active: Cooling
              </span>
            </div>

            {/* Ring fill */}
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
                  strokeDashoffset: useTransform(
                    smoothProgress,
                    [0, 1],
                    ["295%", "0%"]
                  ),
                  color: useTransform(
                    smoothProgress,
                    [0, 1],
                    ["#ff6b35", "#00b4d8"]
                  ),
                }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]),
          }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 font-sans font-medium">
            Scroll to cool
          </span>
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
