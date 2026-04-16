/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import MetricCallout from "@/components/MetricCallout";
import { getCaseStudy, getPrevNext, type Block } from "@/data/case-studies";
import { notFound } from "next/navigation";

// ── Block renderer ────────────────────────────────────────────────────────────

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={idx}
          style={{
            marginBottom: "20px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.8,
            fontSize: "16px",
          }}
        >
          {block.text}
        </p>
      );

    case "h3":
      return (
        <h3
          key={idx}
          className="font-sans"
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginTop: "40px",
            marginBottom: "14px",
            lineHeight: 1.3,
          }}
        >
          {block.text}
        </h3>
      );

    case "list":
      return (
        <ul
          key={idx}
          style={{
            marginBottom: "20px",
            marginTop: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {block.items.map((item, i) => (
            <li
              key={i}
              style={{ display: "flex", gap: "14px", alignItems: "flex-start", color: "var(--color-text-secondary)" }}
            >
              <span
                className="font-mono"
                style={{
                  color: "var(--color-metric)",
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: "1px",
                  fontSize: "14px",
                }}
              >
                —
              </span>
              <span style={{ lineHeight: 1.7 }}>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "metric":
      return (
        <div key={idx} style={{ margin: "32px 0" }}>
          <ScrollFadeIn>
            <MetricCallout metric={block.metric} label={block.label} sublabel={block.sublabel} />
          </ScrollFadeIn>
        </div>
      );

    case "metrics_grid":
      return (
        <div
          key={idx}
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            margin: "32px 0",
          }}
        >
          {block.items.map((item, i) => (
            <ScrollFadeIn key={i} delay={i * 80}>
              <MetricCallout metric={item.metric} label={item.label} sublabel={item.sublabel} />
            </ScrollFadeIn>
          ))}
        </div>
      );

    case "image":
      return (
        <div key={idx} style={{ margin: "32px 0" }}>
          <ScrollFadeIn>
            {block.src ? (
              <img
                src={block.src}
                alt={block.alt}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid var(--color-border-subtle)",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "320px",
                  borderRadius: "10px",
                  border: "1px solid var(--color-border-subtle)",
                  backgroundColor: "var(--color-surface)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <p className="font-mono" style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                  Image placeholder
                </p>
                <p className="font-mono" style={{ fontSize: "11px", color: "var(--color-border-default)" }}>
                  {block.alt.replace("Placeholder: ", "")}
                </p>
              </div>
            )}
          </ScrollFadeIn>
        </div>
      );

    default:
      return null;
  }
}

// ── Section ───────────────────────────────────────────────────────────────────

function Section({
  id,
  label,
  heading,
  children,
}: {
  id: string;
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="cs-section-grid">
      {/* Left column: section label */}
      <ScrollFadeIn>
        <div style={{ paddingTop: "6px" }}>
          <p
            className="font-mono uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              fontWeight: 500,
              color: "var(--color-accent)",
              lineHeight: 1,
            }}
          >
            {label}
          </p>
        </div>
      </ScrollFadeIn>

      {/* Right column: heading + body */}
      <div>
        <ScrollFadeIn>
          <h2
            className="font-sans"
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: 1.25,
              marginBottom: "28px",
            }}
          >
            {heading}
          </h2>
        </ScrollFadeIn>

        <div className="font-sans">
          {children}
        </div>
      </div>
    </section>
  );
}

// ── Metric chip ───────────────────────────────────────────────────────────────

function MetricChip({ label }: { label: string }) {
  return (
    <span
      className="font-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "12px",
        fontWeight: 500,
        color: "var(--color-metric)",
        background: "var(--color-metric-ghost)",
        border: "1px solid rgba(240, 94, 59, 0.18)",
        borderRadius: "100px",
        padding: "5px 14px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Prev / Next card ──────────────────────────────────────────────────────────

function NavCard({
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const { prev, next } = getPrevNext(params.slug);
  const metricChips = study.metrics.split(" · ");

  return (
    <div style={{ width: "100%" }}>

      {/* Back link — mobile only */}
      <div className="block lg:hidden" style={{ marginBottom: "28px" }}>
        <Link
          href="/"
          className="font-sans transition-colors duration-150"
          style={{ fontSize: "14px", color: "var(--color-text-secondary)", textDecoration: "none" }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* ── Hero ── */}
      <div id="overview" style={{ paddingBottom: "72px" }}>

        {/* Tags row */}
        <ScrollFadeIn>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-tertiary)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "100px",
                  padding: "4px 12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollFadeIn>

        {/* Title */}
        <ScrollFadeIn delay={60}>
          <h1
            className="font-sans"
            style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            {study.title}
          </h1>
        </ScrollFadeIn>

        {/* Subtitle */}
        <ScrollFadeIn delay={120}>
          <p
            className="font-sans"
            style={{
              fontSize: "18px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              marginBottom: "28px",
            }}
          >
            {study.subtitle}
          </p>
        </ScrollFadeIn>

        {/* Metric chips */}
        <ScrollFadeIn delay={180}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
            {metricChips.map((chip) => (
              <MetricChip key={chip} label={chip.trim()} />
            ))}
          </div>
        </ScrollFadeIn>

        {/* Hero image */}
        <ScrollFadeIn delay={240}>
          <div
            style={{
              width: "100%",
              height: "clamp(300px, 40vw, 520px)",
              borderRadius: "14px",
              backgroundColor: study.heroImage ? undefined : "var(--color-surface)",
              border: "1px solid var(--color-border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {study.heroImage ? (
              <img
                src={study.heroImage}
                alt={`${study.title} hero`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ textAlign: "center" }}>
                <p
                  className="font-mono"
                  style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginBottom: "6px" }}
                >
                  Hero image
                </p>
                <p
                  className="font-mono"
                  style={{ fontSize: "11px", color: "var(--color-border-default)" }}
                >
                  /public/images/case-studies/
                </p>
              </div>
            )}
          </div>
        </ScrollFadeIn>
      </div>

      {/* ── Content sections ── */}
      {study.sections.map((section) => (
        <Section key={section.id} id={section.id} label={section.label} heading={section.heading}>
          {section.blocks.map((block, i) => renderBlock(block, i))}
        </Section>
      ))}

      {/* ── Bottom nav ── */}
      {(prev || next) && (
        <div
          style={{
            marginTop: "96px",
            paddingTop: "48px",
            borderTop: "1px solid var(--color-border-subtle)",
          }}
        >
          <p
            className="font-mono uppercase"
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "var(--color-text-tertiary)",
              marginBottom: "20px",
            }}
          >
            More case studies
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {prev && <NavCard study={prev} direction="prev" />}
            {next && <NavCard study={next} direction="next" />}
          </div>
        </div>
      )}

      <div style={{ height: "96px" }} />
    </div>
  );
}
