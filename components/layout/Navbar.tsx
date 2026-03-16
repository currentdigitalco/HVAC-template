"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme-switching: observe which section is at the nav position
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
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? isDark
              ? "bg-dark/80 backdrop-blur-md"
              : "bg-stone/80 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className={cn(
                "font-serif text-2xl transition-colors duration-300",
                isDark ? "text-stone" : "text-charcoal"
              )}
            >
              Precision Climate
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "font-sans text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70",
                    isDark ? "text-stone/80" : "text-charcoal/70"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-300",
                  isDark
                    ? "bg-teal text-white hover:bg-teal/90"
                    : "bg-charcoal text-stone hover:bg-charcoal/90"
                )}
              >
                <Phone size={14} />
                Get a Quote
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "p-2 transition-colors duration-300 md:hidden",
                isDark ? "text-stone" : "text-charcoal"
              )}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark transition-all duration-500 md:hidden",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-4xl text-stone transition-colors duration-300 hover:text-teal"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-2 bg-teal px-8 py-4 font-sans text-lg font-medium text-white"
          >
            <Phone size={18} />
            Get a Quote
          </a>
        </div>
      </div>
    </>
  );
}
