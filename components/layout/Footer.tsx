"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "HVAC Installation",
  "Maintenance & Repair",
  "Ductwork Design",
  "Indoor Air Quality",
  "Emergency Service",
];

const SERVICE_AREAS = [
  "Downtown",
  "North District",
  "South County",
  "West End",
  "East Borough",
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const columns = footerRef.current?.querySelectorAll(".footer-col");
      if (columns) {
        gsap.fromTo(
          columns,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
            },
          }
        );
      }

      const bottomBar = footerRef.current?.querySelector(".footer-bottom");
      if (bottomBar) {
        gsap.fromTo(
          bottomBar,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.4,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative text-cream/50" data-nav-theme="dark">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="footer-col opacity-0">
            <h3 className="font-serif text-2xl text-cream">
              Precision Climate
            </h3>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-cream/30">
              Expert HVAC solutions crafted with precision. Residential and
              commercial comfort, designed to last.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-terracotta"
              >
                <Phone size={16} className="text-terracotta/60" />
                (555) 123-4567
              </a>
              <a
                href="mailto:info@precisionclimate.com"
                className="flex items-center gap-3 text-sm transition-colors duration-300 hover:text-terracotta"
              >
                <Mail size={16} className="text-terracotta/60" />
                info@precisionclimate.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-terracotta/60" />
                123 Main Street, Your City
              </div>
            </div>
          </div>

          <div className="footer-col opacity-0">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-cream/20">
              Services
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-300 hover:text-terracotta"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col opacity-0">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-cream/20">
              Service Areas
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row opacity-0">
          <p className="text-xs text-cream/20">
            &copy; {new Date().getFullYear()} Precision Climate. All rights
            reserved.
          </p>
          <p className="text-xs text-cream/20">
            Designed by{" "}
            <a
              href="https://currentdigital.co"
              className="text-terracotta/40 transition-colors hover:text-terracotta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Current Digital Co
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
