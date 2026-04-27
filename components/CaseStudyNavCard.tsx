"use client";

import Link from "next/link";

export default function CaseStudyNavCard({
  study,
  direction,
}: {
  study: { slug: string; title: string; metrics: string };
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      style={{ textDecoration: "none", flex: 1, minWidth: "240px" }}
    >
      <div
        style={{
          background: "var(--color-card)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "12px",
          padding: "28px 32px",
          cursor: "pointer",
          transition: "transform 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-3px)";
          el.style.borderColor = "var(--color-border-hover)";
          el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "";
          el.style.borderColor = "var(--color-border-subtle)";
          el.style.boxShadow = "";
        }}
      >
        <p
          className="font-mono uppercase"
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "var(--color-text-tertiary)",
            marginBottom: "10px",
          }}
        >
          {direction === "prev" ? "← Previous" : "Next →"}
        </p>
        <p
          className="font-sans"
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: "8px",
            lineHeight: 1.3,
          }}
        >
          {study.title}
        </p>
        <p
          className="font-mono"
          style={{ fontSize: "12px", color: "var(--color-metric)", lineHeight: 1.5 }}
        >
          {study.metrics}
        </p>
      </div>
    </Link>
  );
}
