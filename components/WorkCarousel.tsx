"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import CaseStudyCard from "./CaseStudyCard";
import { caseStudies } from "@/data/case-studies";

const N = caseStudies.length;
const GAP = 20;
// Three copies: [buffer-left | real | buffer-right]
const extended = [...caseStudies, ...caseStudies, ...caseStudies];

export default function WorkCarousel() {
  const [index, setIndex] = useState(N); // start at first card of middle (real) set
  const [animated, setAnimated] = useState(true);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const indexRef = useRef(N);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    const mobile = window.innerWidth < 768;
    setCardWidth(mobile ? w : (w - GAP) / 2);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Re-enable CSS transition after a snap (which requires transition: none)
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const step = cardWidth + GAP;
  const translateX = cardWidth ? -(index * step) : 0;

  const navigate = (dir: 1 | -1) => {
    if (animating || cardWidth === 0) return;
    setAnimating(true);
    setAnimated(true);
    const next = index + dir;
    indexRef.current = next;
    setIndex(next);
  };

  const onTransitionEnd = () => {
    const curr = indexRef.current;
    // Snap back into the middle set without animation if we've hit a buffer copy
    if (curr >= N * 2) {
      const snapped = curr - N;
      indexRef.current = snapped;
      setAnimated(false);
      setIndex(snapped);
    } else if (curr < N) {
      const snapped = curr + N;
      indexRef.current = snapped;
      setAnimated(false);
      setIndex(snapped);
    }
    setAnimating(false);
  };

  return (
    <section
      id="work"
      style={{
        paddingTop: "clamp(64px, 14vw, 112px)",
        paddingBottom: "clamp(64px, 14vw, 112px)",
        borderTop: "1px solid var(--color-border-subtle)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "clamp(24px, 4vw, 40px)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-gasoek)",
            fontSize: "clamp(28px, 5vw, 42px)",
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
          }}
        >
          Selected Work
        </h2>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => navigate(-1)} aria-label="Previous" className="carousel-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={() => navigate(1)} aria-label="Next" className="carousel-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Track */}
      <div ref={containerRef} style={{ overflow: "hidden", paddingTop: "8px", marginTop: "-8px" }}>
        {cardWidth > 0 && (
          <div
            onTransitionEnd={onTransitionEnd}
            style={{
              display: "flex",
              gap: `${GAP}px`,
              transform: `translateX(${translateX}px)`,
              transition: animated ? "transform 400ms ease-in-out" : "none",
              willChange: "transform",
            }}
          >
            {extended.map((cs, i) => (
              <div key={`${cs.slug}-${i}`} style={{ flex: `0 0 ${cardWidth}px`, minWidth: 0 }}>
                <CaseStudyCard {...cs} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
