"use client";

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
  { kind: "anchor",   label: "About",             href: "#about" },
  { kind: "anchor",   label: "Side Projects",     href: "#personal-projects" },
  { kind: "external", label: "LinkedIn",          href: "https://www.linkedin.com/in/damean-rittmann/" },
  { kind: "external", label: "Contact Me",        href: "mailto:dameanrittmann@gmail.com" },
  { kind: "external", label: "Resume",            href: "/DameanRittmann_Resume.pdf", download: true },
];

const ANCHOR_IDS = LINKS.filter((l) => l.kind === "anchor").map((l) =>
  (l as { kind: "anchor"; label: string; href: string }).href.replace("#", "")
);

export default function MobileNav() {
  const activeSection = useActiveSection(ANCHOR_IDS);

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
        <div className="px-5 pt-4 pb-2">
          <span
            className="font-sans font-semibold"
            style={{ fontSize: "15px", color: "var(--color-text-primary)" }}
          >
            Damean Rittmann
          </span>
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
          {LINKS.map((item) => {
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

      {/* Floating AI chat button */}
      <button
        className="lg:hidden fixed z-50 flex items-center justify-center rounded-full shadow-lg"
        style={{
          bottom: "20px",
          right: "20px",
          width: "48px",
          height: "48px",
          backgroundColor: "var(--color-accent)",
          color: "#fff",
        }}
        aria-label="Open AI chat"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V12C17 12.5523 16.5523 13 16 13H7L3 17V4Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
