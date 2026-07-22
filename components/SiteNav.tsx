"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HOME_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Selected Work" },
  { id: "about", label: "About" },
  { id: "values", label: "Values" },
  { id: "projects", label: "Lab" },
  { id: "fit-check", label: "Fit Check" },
  { id: "contact", label: "Contact" },
];

const CASE_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "discovery", label: "Discovery" },
  { id: "insight", label: "Insight" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
];

export function navItemsFor(pathname: string) {
  return pathname.startsWith("/case-study/") ? CASE_ITEMS : HOME_ITEMS;
}

export default function SiteNav() {
  const pathname = usePathname();
  const isCase = pathname.startsWith("/case-study/");
  const items = navItemsFor(pathname);
  const [open, setOpen] = useState(false);

  // body class drives the overlay + scroll lock, matching the mockup
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // close when the route changes (e.g. menu link to a case study)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const anchor = (id: string) => (isCase ? `#${id}` : `/#${id}`);

  return (
    <>
      <header className="topbar" id="top">
        <div className="wrap topbar-in">
          <Link className="brand" href="/#overview">
            <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2v20M3 7l18 10M21 7L3 17" />
            </svg>
            <span>Damean&nbsp;Rittmann</span>
            <span className="mono brand-role">/ product&nbsp;designer</span>
          </Link>
          <nav className="topnav" aria-label="Primary">
            {isCase && <Link href="/">Home</Link>}
            <a href="https://www.linkedin.com/in/damean-rittmann/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:dameanrittmann@gmail.com">Contact Me</a>
            <a href="/DameanRittmann_Resume.pdf" download>Resume</a>
          </nav>
          <div className="top-actions">
            <button
              className="menu-btn mono"
              type="button"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <nav className="menu" id="menu" aria-label="Menu">
        <ul>
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={anchor(item.id)} onClick={() => setOpen(false)}>
                <span className="mono">{String(i).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <div className="menu-ext mono">
            {isCase && (
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            )}
            <a href="https://www.linkedin.com/in/damean-rittmann/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="mailto:dameanrittmann@gmail.com">Contact Me ↗</a>
            <a href="/DameanRittmann_Resume.pdf" download>Resume ↗</a>
          </div>
          <p className="menu-foot mono">trust through legibility ✳ show, don&rsquo;t tell</p>
        </div>
      </nav>
    </>
  );
}
