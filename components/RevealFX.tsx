"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/* Generic scroll reveals — any element with data-reveal fades/rises in
   when it enters the viewport; the attribute value is a stagger delay in
   seconds. Content is visible without JS; GSAP animates FROM hidden.
   Mount once per page that uses data-reveal. */

export default function RevealFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: parseFloat(el.dataset.reveal || "0") || 0,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
