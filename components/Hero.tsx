"use client";

import CountUp from "./CountUp";

// Count-up starts after metrics fade-in completes: 150ms delay + 600ms anim
const COUNT_UP_DELAY = 750;

const fadeUp = (delay: number): React.CSSProperties => ({
  opacity: 0,
  animation: `fadeUp 600ms ease-out ${delay}ms forwards`,
});

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
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
      `}</style>

      <section id="hero" className="hero-section">
        <h1 className="hero-headline" style={fadeUp(0)}>
          Hi, I&apos;m Damean,<br />a designer who solves the hard problems. Complex data, real stakes, expert users who notice when you get it wrong. I build trust into high-stakes workflows, and AI sharpens every step of my process.
        </h1>

        <div className="hero-metrics flex items-center flex-wrap" style={fadeUp(150)}>
          <span style={{ color: "var(--color-metric)" }}>
            <CountUp target={60} delay={COUNT_UP_DELAY} />%+ faster execution
          </span>
          <span className="hero-metrics-dot">·</span>
          <span style={{ color: "var(--color-metric)" }}>
            <CountUp target={50} delay={COUNT_UP_DELAY} />% fewer errors
          </span>
          <span className="hero-metrics-dot">·</span>
          <span style={{ color: "var(--color-metric)" }}>$500M+ financial platform</span>
        </div>
      </section>
    </>
  );
}
