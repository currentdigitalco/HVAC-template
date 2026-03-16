"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Clock, MapPin } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our Tech", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-nav-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionTheme = (entry.target as HTMLElement).dataset
              .navTheme as "light" | "dark";
            setTheme(sectionTheme);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled
            ? isDark
              ? "bg-navy/80 backdrop-blur-xl border-b border-white/5"
              : "bg-white/90 backdrop-blur-xl shadow-lg border-b border-navy/5"
            : "bg-transparent border-b border-transparent"
        )}
      >
        {/* Top Bar - Still fixed height to prevent layout jumps, but fades out */}
        <div className={cn(
            "hidden md:block transition-all duration-500 overflow-hidden",
            isScrolled ? "h-0 opacity-0" : "h-11 opacity-100",
            isDark ? "text-white/70" : "text-navy/60"
        )}>
            <div className={cn(
                "mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-[0.2em]",
                !isScrolled && "border-b border-white/10"
            )}>
                <div className="flex gap-6">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-terracotta" /> 24/7 Emergency Service</span>
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-terracotta" /> Serving The Greater Metro Area</span>
                </div>
                <a href="tel:8001234567" className="flex items-center gap-2 font-bold text-terracotta hover:text-terracotta-light transition-colors">
                    <Phone size={14} /> Call Now: (800) 123-4567
                </a>
            </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a
              href="#"
              className={cn(
                "font-serif text-2xl font-bold transition-colors duration-300",
                isDark ? "text-white" : "text-navy"
              )}
            >
              Precision<span className="text-terracotta">Climate</span>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative font-sans text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-terracotta group",
                    isDark ? "text-white/80" : "text-navy/70"
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-terracotta transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent-blue px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-accent-blue-light hover:shadow-xl hover:shadow-accent-blue/20 hover:scale-105 active:scale-95"
              >
                Get a Free Quote
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "p-2 transition-colors duration-300 md:hidden",
                isDark ? "text-white" : "text-navy"
              )}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy transition-all duration-500 md:hidden",
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center gap-8 w-full px-6">
           <a
             href="tel:8001234567"
             className={cn(
               "flex items-center gap-3 text-xl font-bold text-terracotta mb-8 transition-all duration-500",
               menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
             )}
             style={{ transitionDelay: menuOpen ? "200ms" : "0ms" }}
           >
              <Phone size={24} /> (800) 123-4567
          </a>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "font-serif text-3xl text-white transition-all duration-500 hover:text-terracotta",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
              style={{ transitionDelay: menuOpen ? `${300 + i * 80}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "mt-8 w-full text-center bg-accent-blue px-8 py-5 font-sans text-lg font-bold uppercase tracking-widest text-white transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? `${300 + NAV_LINKS.length * 80}ms` : "0ms" }}
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </>
  );
}
