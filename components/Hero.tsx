"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import SpecLens from "./SpecLens";
import StatsMarquee from "./StatsMarquee";

/* Hero — "Complexity, made legible." with the circled word, GSAP intro,
   spec lens, and the fold-pinned stats marquee. Content is visible in
   markup by default; GSAP animates FROM hidden, so the page stays
   readable if JS or fonts stall (and under prefers-reduced-motion). */

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      let done = false;
      const intro = () => {
        if (done) return;
        done = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        const title = root.querySelector(".hero-title");
        const circle = root.querySelector(".circled svg path");

        tl.from(".topbar", { y: -14, autoAlpha: 0, duration: 0.7 })
          .from(".hero-eyebrow", { y: 14, autoAlpha: 0, duration: 0.6 }, "-=0.35");

        let lines: Element[] | null = null;
        if (title) {
          try {
            split = new SplitText(title, { type: "lines" });
            lines = split.lines;
          } catch {
            /* fall back to whole-title reveal */
          }
        }
        if (lines && lines.length) {
          tl.from(lines, { y: 56, autoAlpha: 0, duration: 1.05, stagger: 0.14 }, "-=0.25");
        } else if (title) {
          tl.from(title, { y: 34, autoAlpha: 0, duration: 1 }, "-=0.25");
        }

        if (circle) {
          gsap.set(circle, { drawSVG: "0%" });
          tl.to(circle, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" }, "-=0.45");
        }

        tl.from(".hero-lede", { y: 22, autoAlpha: 0, duration: 0.8 }, "-=0.5")
          .from(".marquee", { autoAlpha: 0, duration: 0.7 }, "-=0.4");
      };

      // wait for fonts so SplitText measures real line breaks
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => setTimeout(intro, 50));
        setTimeout(intro, 2500); // safety net if fonts hang
      } else {
        intro();
      }
    });

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="overview" ref={rootRef}>
      <div className="wrap">
        <p className="hero-eyebrow mono">Damean Rittmann ✳ Product Designer ✳ Portfolio, 2026</p>
        <h1 className="hero-title">
          Complexity,
          <br />
          made{" "}
          <span className="circled">
            legible
            <svg viewBox="0 0 310 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M155 12 C226 4 296 18 299 50 C302 84 232 102 150 100 C70 98 12 86 11 54 C10 24 84 10 166 10" />
            </svg>
          </span>
          .
        </h1>
        <div className="hero-sub">
          <p className="hero-lede">
            I&rsquo;m a product designer who makes <em>complex workflows trustworthy</em> for the
            experts who use them. I thrive in spaces where the problems are hard, meaningful,
            and still being figured out.
          </p>
        </div>
      </div>
      <StatsMarquee />
      <SpecLens />
    </section>
  );
}
