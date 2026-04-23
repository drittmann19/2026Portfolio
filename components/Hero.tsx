"use client";

import { useEffect, useState } from "react";
import CountUp from "./CountUp";

const HEADLINE_TEXT = "Hi, I'm Damean,\na designer who solves the hard problems. Complex data, real stakes, expert users who notice when you get it wrong. I build trust into high-stakes workflows, and AI sharpens every step of my process.";
const TYPE_SPEED_MS = 14;
const METRICS_FADE_DELAY_MS = 260;

const fadeUp = (delay: number): React.CSSProperties => ({
  opacity: 0,
  animation: `fadeUp 600ms ease-out ${delay}ms forwards`,
});

export default function Hero() {
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setTypedCount(HEADLINE_TEXT.length);
      setTypingDone(true);
      return;
    }
    const id = setInterval(() => {
      setTypedCount((c) => {
        if (c >= HEADLINE_TEXT.length) {
          clearInterval(id);
          setTypingDone(true);
          return c;
        }
        return c + 1;
      });
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const metricsDelay = typingDone ? 0 : 999_999;
  const countUpDelay = typingDone ? METRICS_FADE_DELAY_MS + 300 : 999_999;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes typewriter-blink {
          0%, 50% { opacity: 1; }
          50.001%, 100% { opacity: 0; }
        }

        .hero-section {
          padding-top: 80px;
          padding-bottom: 128px;
        }

        .hero-headline {
          font-family: var(--font-jakarta);
          font-weight: 900;
          color: var(--color-text-primary);
          font-size: clamp(32px, 5.4vw, 76px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          white-space: pre-line;
        }

        .typewriter-hidden {
          opacity: 0;
        }

        .typewriter-cursor {
          display: inline-block;
          width: 0;
          position: relative;
          vertical-align: baseline;
        }
        .typewriter-cursor::after {
          content: "";
          position: absolute;
          left: 2px;
          bottom: 0.05em;
          width: 0.08em;
          height: 0.85em;
          background: var(--color-metric);
          animation: typewriter-blink 1s step-end infinite;
        }

        .hero-metrics {
          margin-top: 40px;
          font-size: clamp(16px, 1.6vw, 22px);
          line-height: 1.4;
          font-weight: 500;
        }

        .hero-metrics-dot {
          color: var(--color-text-tertiary);
          margin: 0 14px;
        }

        @media (max-width: 1023px) {
          .hero-section {
            padding-top: 56px;
            padding-bottom: 96px;
          }
          .hero-metrics {
            margin-top: 28px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .typewriter-cursor::after { display: none; }
        }
      ` }} />

      <section id="hero" className="hero-section">
        <h1 className="hero-headline" aria-label={HEADLINE_TEXT}>
          <span aria-hidden="true">
            {HEADLINE_TEXT.slice(0, typedCount)}
            {!reducedMotion && <span className="typewriter-cursor" />}
          </span>
          <span aria-hidden="true" className="typewriter-hidden">
            {HEADLINE_TEXT.slice(typedCount)}
          </span>
        </h1>

        <div className="hero-metrics flex items-center flex-wrap" style={fadeUp(metricsDelay)}>
          <span style={{ color: "var(--color-metric)" }}>
            <CountUp target={60} delay={countUpDelay} />%+ faster execution
          </span>
          <span className="hero-metrics-dot">·</span>
          <span style={{ color: "var(--color-metric)" }}>
            <CountUp target={50} delay={countUpDelay} />% fewer errors
          </span>
          <span className="hero-metrics-dot">·</span>
          <span style={{ color: "var(--color-metric)" }}>$500M+ financial platform</span>
        </div>
      </section>
    </>
  );
}
