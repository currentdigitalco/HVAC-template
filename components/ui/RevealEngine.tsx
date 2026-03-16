"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  RevealEngine — Jesko Jets-style data-attribute animation system.

  Supported data-reveal types:
    "fade-up"      — y: 50 -> 0, opacity: 0 -> 1
    "clip-left"    — clipPath wipe from left to right
    "clip-center"  — clipPath zoom reveal from center
    "char"         — split into characters, stagger entrance
    "stagger"      — children animate in with stagger
    "scale-x"      — horizontal line/divider grows from left
    "highlight"    — words illuminate sequentially on scroll (scrub-linked)

  Optional attributes:
    data-reveal-delay="0.2"    — delay before animation (seconds)
    data-reveal-stagger="0.1"  — stagger between children (for "stagger" type)
*/

export default function RevealEngine() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).style.visibility = "visible";
      });
      return;
    }

    let ctx: gsap.Context;

    // Wait one frame so all component DOM is committed
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {

        // ── fade-up ──────────────────────────────────────────
        document.querySelectorAll('[data-reveal="fade-up"]').forEach((el) => {
          const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
          gsap.set(el, { y: 50, opacity: 0, visibility: "visible" });
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // ── clip-left ────────────────────────────────────────
        document.querySelectorAll('[data-reveal="clip-left"]').forEach((el) => {
          const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
          gsap.set(el, { clipPath: "inset(0 100% 0 0)", visibility: "visible" });
          gsap.to(el, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            delay,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        // ── clip-center ──────────────────────────────────────
        document.querySelectorAll('[data-reveal="clip-center"]').forEach((el) => {
          const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
          gsap.set(el, {
            clipPath: "inset(8% 8% 8% 8%)",
            opacity: 0,
            visibility: "visible",
          });
          gsap.to(el, {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.4,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        // ── char ─────────────────────────────────────────────
        document.querySelectorAll('[data-reveal="char"]').forEach((el) => {
          const htmlEl = el as HTMLElement;
          const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
          const text = htmlEl.textContent || "";
          htmlEl.innerHTML = "";

          text.split("").forEach((char) => {
            if (char === " ") {
              // Regular text node for spaces — preserves word wrapping
              htmlEl.appendChild(document.createTextNode(" "));
            } else {
              const span = document.createElement("span");
              span.style.display = "inline-block";
              span.textContent = char;
              htmlEl.appendChild(span);
            }
          });

          const chars = htmlEl.querySelectorAll("span");
          gsap.set(chars, { opacity: 0, y: 30 });
          gsap.set(htmlEl, { visibility: "visible" });
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: { trigger: htmlEl, start: "top 85%", once: true },
          });
        });

        // ── stagger ──────────────────────────────────────────
        document.querySelectorAll('[data-reveal="stagger"]').forEach((el) => {
          const children = el.children;
          if (!children.length) return;
          const staggerVal = parseFloat(
            el.getAttribute("data-reveal-stagger") || "0.12"
          );
          const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
          gsap.set(children, { y: 40, opacity: 0 });
          gsap.set(el, { visibility: "visible" });
          gsap.to(children, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            stagger: staggerVal,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // ── scale-x ─────────────────────────────────────────
        document.querySelectorAll('[data-reveal="scale-x"]').forEach((el) => {
          const delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
          gsap.set(el, {
            scaleX: 0,
            transformOrigin: "left center",
            visibility: "visible",
          });
          gsap.to(el, {
            scaleX: 1,
            duration: 1,
            delay,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // ── highlight (scrub-linked word illumination) ──────
        document.querySelectorAll('[data-reveal="highlight"]').forEach((el) => {
          const htmlEl = el as HTMLElement;
          const text = htmlEl.textContent || "";
          htmlEl.innerHTML = "";

          text.split(/(\s+)/).forEach((part) => {
            if (part.match(/^\s+$/)) {
              htmlEl.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement("span");
              span.textContent = part;
              span.style.color = "rgba(255,248,237,0.15)";
              span.style.transition = "color 0.3s ease";
              htmlEl.appendChild(span);
            }
          });

          const wordSpans = htmlEl.querySelectorAll("span");
          gsap.set(htmlEl, { visibility: "visible" });
          gsap.to(wordSpans, {
            color: "rgba(255,248,237,0.9)",
            stagger: { each: 0.08 },
            scrollTrigger: {
              trigger: htmlEl,
              start: "top 75%",
              end: "bottom 30%",
              scrub: 0.5,
            },
          });
        });

      }); // end gsap.context
    }); // end rAF

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return null;
}
