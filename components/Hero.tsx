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
      `}</style>

      <section
        id="hero"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        <div>
          {/* Value proposition */}
          <h1
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "40px",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "var(--color-text-primary)",
              marginBottom: "32px",
              ...fadeUp(0),
            }}
          >
            Designer who solves the hard problems. Complex data, real stakes, expert users who notice when you get it wrong. I build trust into high-stakes workflows, and AI sharpens every step of my process.
          </h1>

          {/* Metrics row */}
          <div
            className="font-mono flex items-center flex-wrap"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              ...fadeUp(150),
            }}
          >
            <span style={{ color: "var(--color-metric)" }}>
              <CountUp target={60} delay={COUNT_UP_DELAY} />%+ faster execution
            </span>
            <span style={{ color: "var(--color-text-tertiary)", margin: "0 12px" }}>·</span>
            <span style={{ color: "var(--color-metric)" }}>
              <CountUp target={50} delay={COUNT_UP_DELAY} />%
              {" "}fewer errors
            </span>
            <span style={{ color: "var(--color-text-tertiary)", margin: "0 12px" }}>·</span>
            <span style={{ color: "var(--color-metric)" }}>$500M+ financial platform</span>
          </div>
        </div>
      </section>
    </>
  );
}
