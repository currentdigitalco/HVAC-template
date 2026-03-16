"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, ArrowRight, ShieldCheck, Zap, Thermometer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll(".reveal-item");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-nav-theme="dark"
      className="relative flex min-h-[80vh] items-center bg-navy py-24 lg:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.15),transparent)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
                <span className="reveal-item block text-terracotta uppercase tracking-[0.3em] font-sans text-xs font-bold mb-6 opacity-0">
                    Get Comfort Today
                </span>

                <h2 className="reveal-item font-serif text-5xl text-white opacity-0 sm:text-6xl lg:text-7xl leading-tight">
                Don&apos;t wait for a <br/><span className="italic text-accent-blue-light font-light">breakdown.</span>
                </h2>

                <p className="reveal-item mt-8 max-w-lg font-sans text-lg font-light leading-relaxed text-white/50 opacity-0">
                Whether it&apos;s an emergency repair or a high-efficiency upgrade, our engineering team is ready to respond. Guaranteed comfort, precision install, and 24/7 support.
                </p>
                
                <div className="reveal-item mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 opacity-0">
                    <div className="flex items-center gap-3 text-white/70 font-sans text-sm">
                        <ShieldCheck className="text-terracotta" size={20} /> Licensed & Fully Insured
                    </div>
                    <div className="flex items-center gap-3 text-white/70 font-sans text-sm">
                        <Zap className="text-terracotta" size={20} /> Emergency 24hr Response
                    </div>
                    <div className="flex items-center gap-3 text-white/70 font-sans text-sm">
                        <Thermometer className="text-terracotta" size={20} /> High-Efficiency Focus
                    </div>
                </div>
            </div>

            <div className="reveal-item relative flex flex-col items-center justify-center gap-6 opacity-0 bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-2xl">
                <h3 className="text-2xl font-serif text-white mb-2">Book Your Free Estimate</h3>
                <a
                    href="#contact"
                    className="w-full flex items-center justify-center gap-3 bg-accent-blue hover:bg-accent-blue-light px-8 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 rounded-sm"
                >
                    Online Booking
                    <ArrowRight size={18} />
                </a>
                <div className="w-full flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-white/30 text-xs font-sans uppercase">Or</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>
                <a
                    href="tel:8001234567"
                    className="w-full flex items-center justify-center gap-3 border border-white/20 hover:bg-white/5 px-8 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 rounded-sm"
                >
                    <Phone size={18} />
                    (800) 123-4567
                </a>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mt-4">Average response time: 60 minutes</p>
            </div>
        </div>
      </div>
    </section>
  );
}
