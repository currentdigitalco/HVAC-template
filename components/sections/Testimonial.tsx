"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Quote column parallax — slight upward drift for depth
      if (quoteRef.current) {
        gsap.to(quoteRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // Image parallax (scrub-linked depth)
      const img = sectionRef.current?.querySelector(".testimonial-image img");
      if (img) {
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div ref={quoteRef} className="lg:col-span-3">
            <div data-reveal="clip-left">
              <span className="font-serif text-[8rem] leading-none text-white/10 lg:text-[10rem]">
                &ldquo;
              </span>
            </div>

            <blockquote data-reveal="clip-left" data-reveal-delay="0.1" className="-mt-16 lg:-mt-20">
              <p className="font-serif text-2xl italic leading-relaxed text-cream sm:text-3xl lg:text-4xl">
                They didn&apos;t just install a system — they redesigned our
                entire airflow. The difference is night and day. Our energy bills
                dropped 40% in the first month.
              </p>
            </blockquote>

            <div data-reveal="fade-up" data-reveal-delay="0.3" className="mt-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-terracotta text-terracotta"
                  />
                ))}
              </div>
              <p className="mt-3 font-sans text-base font-medium text-cream">
                Sarah & David Mitchell
              </p>
              <p className="mt-1 font-sans text-sm font-light text-cream/40">
                Heritage Home Retrofit — Oak District
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div data-reveal="clip-center" className="testimonial-image thermal-hover aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Beautiful home interior with modern climate control"
                className="h-[120%] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
