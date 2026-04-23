"use client";

import { useEffect, useRef, useState } from "react";

const NAV_WIDTH_LG = 280;
const LG_BREAKPOINT = "(min-width: 1024px)";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const glow = glowRef.current;
    const clip = clipRef.current;
    if (!glow || !clip) return;

    const lgMql = window.matchMedia(LG_BREAKPOINT);
    let offsetX = lgMql.matches ? NAV_WIDTH_LG : 0;
    const onBreakpoint = (e: MediaQueryListEvent) => { offsetX = e.matches ? NAV_WIDTH_LG : 0; };
    lgMql.addEventListener("change", onBreakpoint);

    const onMove = (e: MouseEvent) => {
      glow.style.transform = `translate3d(${e.clientX - offsetX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      clip.style.opacity = "1";
    };
    const onLeave = () => { clip.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      lgMql.removeEventListener("change", onBreakpoint);
    };
  }, [reducedMotion]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cursor-glow-clip {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          transition: opacity 320ms ease-out;
          z-index: 0;
        }
        @media (min-width: 1024px) {
          .cursor-glow-clip { left: 280px; }
        }

        .cursor-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 560px;
          height: 560px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(240, 94, 59, 0.16) 0%, rgba(240, 94, 59, 0.05) 35%, transparent 65%);
          will-change: transform;
        }

        @media (hover: none) {
          .cursor-glow-clip { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cursor-glow-clip { display: none; }
        }
      ` }} />
      <div ref={clipRef} className="cursor-glow-clip" aria-hidden="true">
        <div ref={glowRef} className="cursor-glow" />
      </div>
    </>
  );
}
