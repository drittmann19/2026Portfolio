"use client";

import Link from "next/link";
import { useActiveSection } from "./useActiveSection";

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 2H10M10 2V10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 7H3M3 7L7 3M3 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SECTION_IDS = ["overview", "discovery", "insight", "approach", "solution", "impact", "reflection"];

const SECTION_LABELS: Record<string, string> = {
  overview: "Overview",
  discovery: "Discovery",
  insight: "Insight",
  approach: "Approach",
  solution: "Solution",
  impact: "Impact",
  reflection: "Reflection",
};

const EXTERNAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/damean-rittmann/", newTab: true },
  { label: "Contact Me", href: "mailto:dameanrittmann@gmail.com", newTab: true },
  { label: "Resume", href: "/DameanRittmann_Resume.pdf", download: true },
];

function Divider() {
  return (
    <hr
      className="border-none h-px"
      style={{ backgroundColor: "var(--color-border-subtle)", margin: "24px 0" }}
    />
  );
}

export default function CaseStudySideNav() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <nav
      className="fixed top-0 left-0 h-screen flex flex-col"
      style={{
        width: "280px",
        backgroundColor: "var(--color-card)",
        borderRight: "1px solid var(--color-border-subtle)",
        padding: "32px",
        overflowY: "auto",
      }}
    >
      {/* Identity */}
      <div>
        <p
          className="font-display leading-none"
          style={{ fontSize: "38px", color: "var(--color-text-primary)" }}
        >
          Damean<br />Rittmann
        </p>
        <p
          className="font-sans uppercase mt-3"
          style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--color-text-secondary)" }}
        >
          Product Designer
        </p>
      </div>

      {/* Back to work */}
      <div className="mt-6">
        <Link
          href="/#work"
          className="flex items-center gap-2 font-sans transition-colors duration-150"
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
          }}
        >
          <ArrowLeft />
          <span>Back to Home</span>
        </Link>
      </div>

      <Divider />

      {/* Case study section anchors */}
      <ul className="flex flex-col gap-1 list-none">
        {SECTION_IDS.map((id) => {
          const isActive = activeSection === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-center font-sans transition-colors duration-150"
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                  paddingLeft: isActive ? "10px" : "12px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  borderLeft: isActive
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                }}
              >
                {SECTION_LABELS[id]}
              </a>
            </li>
          );
        })}
      </ul>

      <Divider />

      {/* External links */}
      <ul className="flex flex-col gap-1 list-none">
        {EXTERNAL_LINKS.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.newTab ? "_blank" : undefined}
              rel={item.newTab ? "noopener noreferrer" : undefined}
              download={item.download ? true : undefined}
              className="flex items-center gap-2 font-sans transition-colors duration-150"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "var(--color-text-secondary)",
                paddingLeft: "12px",
                paddingTop: "6px",
                paddingBottom: "6px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
              }}
            >
              <span className="flex-1">{item.label}</span>
              {(item.newTab || item.download) && (
                <span className="flex-shrink-0" style={{ opacity: 0.5 }}>
                  <ArrowUpRight />
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
