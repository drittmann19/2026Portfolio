"use client";

import { usePathname } from "next/navigation";
import { useActiveSection } from "./useActiveSection";

const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ display: "inline", marginLeft: "3px", verticalAlign: "middle" }}>
    <path d="M2 2H10M10 2V10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type NavItem =
  | { kind: "anchor"; label: string; href: string }
  | { kind: "external"; label: string; href: string; download?: boolean };

const LINKS: NavItem[] = [
  { kind: "anchor",   label: "Overview",          href: "#hero" },
  { kind: "anchor",   label: "Selected Work",      href: "#work" },
  { kind: "anchor",   label: "About Me",          href: "#about" },
  { kind: "anchor",   label: "Side Projects",     href: "#personal-projects" },
  { kind: "external", label: "LinkedIn",          href: "https://www.linkedin.com/in/damean-rittmann/" },
  { kind: "external", label: "Contact Me",        href: "mailto:dameanrittmann@gmail.com" },
  { kind: "external", label: "Resume",            href: "/DameanRittmann_Resume.pdf", download: true },
];

const ANCHOR_IDS = LINKS.filter((l) => l.kind === "anchor").map((l) =>
  (l as { kind: "anchor"; label: string; href: string }).href.replace("#", "")
);

const CASE_STUDY_SECTIONS = ["overview", "discovery", "insight", "approach", "solution", "impact", "reflection"];
const CASE_STUDY_LINKS: NavItem[] = [
  { kind: "anchor", label: "Overview",    href: "#overview" },
  { kind: "anchor", label: "Discovery",   href: "#discovery" },
  { kind: "anchor", label: "Insight",     href: "#insight" },
  { kind: "anchor", label: "Approach",    href: "#approach" },
  { kind: "anchor", label: "Solution",    href: "#solution" },
  { kind: "anchor", label: "Impact",      href: "#impact" },
  { kind: "anchor", label: "Reflection",  href: "#reflection" },
  { kind: "external", label: "LinkedIn",  href: "https://www.linkedin.com/in/damean-rittmann/" },
  { kind: "external", label: "Contact Me", href: "mailto:dameanrittmann@gmail.com" },
  { kind: "external", label: "Resume",    href: "/DameanRittmann_Resume.pdf", download: true },
];

export default function MobileNav() {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith("/case-study/");
  const activeSection = useActiveSection(isCaseStudy ? CASE_STUDY_SECTIONS : ANCHOR_IDS);

  return (
    <>
      <header
        className="lg:hidden sticky top-0 z-40"
        style={{
          backgroundColor: "var(--color-card)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        {/* Name row */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <span
            className="font-display"
            style={{ fontSize: "20px", lineHeight: 1, color: "var(--color-text-primary)" }}
          >
            Damean Rittmann
          </span>
          {isCaseStudy && (
            <a
              href="/#work"
              className="font-sans"
              style={{ fontSize: "13px", color: "var(--color-text-secondary)", textDecoration: "none" }}
            >
              ← Home
            </a>
          )}
        </div>

        {/* Scrollable tab bar */}
        <nav
          className="flex overflow-x-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          <style>{`.mobile-tab-bar::-webkit-scrollbar { display: none; }`}</style>
          {(isCaseStudy ? CASE_STUDY_LINKS : LINKS).map((item) => {
            const sectionId = item.kind === "anchor" ? item.href.replace("#", "") : null;
            const isActive = sectionId !== null && activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.kind === "external" && !item.download ? "_blank" : undefined}
                rel={item.kind === "external" && !item.download ? "noopener noreferrer" : undefined}
                download={item.kind === "external" && item.download ? true : undefined}
                className="font-sans flex-shrink-0 transition-colors duration-150"
                style={{
                  fontSize: "13px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                  textDecoration: "none",
                  padding: "8px 16px",
                  whiteSpace: "nowrap",
                  borderBottom: isActive
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                }}
              >
                {item.label}
                {item.kind === "external" && <ArrowUpRight />}
              </a>
            );
          })}
        </nav>
      </header>

    </>
  );
}
