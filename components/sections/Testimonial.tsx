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
      const elements = quoteRef.current?.querySelectorAll(".reveal-item");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 75%",
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
      data-nav-theme="light"
      className="relative bg-stone py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          {/* Quote Content */}
          <div ref={quoteRef} className="lg:col-span-3">
            {/* Large decorative quote mark */}
            <div className="reveal-item opacity-0">
              <span className="font-serif text-[8rem] leading-none text-stone-mid/40 lg:text-[10rem]">
                &ldquo;
              </span>
            </div>

            <blockquote className="reveal-item -mt-16 opacity-0 lg:-mt-20">
              <p className="font-serif text-2xl italic leading-relaxed text-charcoal sm:text-3xl lg:text-4xl">
                They didn&apos;t just install a system — they redesigned our
                entire airflow. The difference is night and day. Our energy bills
                dropped 40% in the first month.
              </p>
            </blockquote>

            <div className="reveal-item mt-8 opacity-0">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-teal text-teal"
                  />
                ))}
              </div>
              <p className="mt-3 font-sans text-base font-medium text-charcoal">
                Sarah & David Mitchell
              </p>
              <p className="mt-1 font-sans text-sm font-light text-charcoal/50">
                Heritage Home Retrofit — Oak District
              </p>
            </div>
          </div>

          {/* Project Image */}
          <div className="lg:col-span-2">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Beautiful home interior with modern climate control"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
