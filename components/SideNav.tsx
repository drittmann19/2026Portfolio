"use client";

import { useActiveSection } from "./useActiveSection";

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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

function Divider() {
  return (
    <hr
      className="border-none h-px"
      style={{ backgroundColor: "var(--color-border-subtle)", margin: "24px 0" }}
    />
  );
}

export default function SideNav() {
  const activeSection = useActiveSection(ANCHOR_IDS);

  return (
    <nav
      className="fixed top-0 left-0 h-screen flex flex-col"
      style={{
        width: "280px",
        backgroundColor: "var(--color-card)",
        borderRight: "1px solid var(--color-border-subtle)",
        padding: "32px",
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

      {/* AI Chat placeholder */}
      <div className="mt-5">
        <p className="font-mono" style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
          AI Chat placeholder
        </p>
      </div>

      <Divider />

      {/* Anchor links */}
      <ul className="flex flex-col gap-1 list-none">
        {LINKS.filter((l) => l.kind === "anchor").map((item) => {
          if (item.kind === "anchor") {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center font-sans transition-colors duration-150"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
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
                  {item.label}
                </a>
              </li>
            );
          }

          return null;
        })}
      </ul>

      <Divider />

      {/* External links */}
      <ul className="flex flex-col gap-1 list-none">
        {LINKS.filter((l) => l.kind === "external").map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={(item as { kind: "external"; download?: boolean }).download ? undefined : "_blank"}
              rel={(item as { kind: "external"; download?: boolean }).download ? undefined : "noopener noreferrer"}
              download={(item as { kind: "external"; download?: boolean }).download ? true : undefined}
              className="flex items-center gap-2 font-sans transition-colors duration-150"
              style={{
                fontSize: "14px",
                fontWeight: 500,
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
              <span className="flex-shrink-0" style={{ opacity: 0.5 }}>
                <ArrowUpRight />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
