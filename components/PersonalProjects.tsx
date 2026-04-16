"use client";

import { useState, useEffect, useRef } from "react";
import ScrollFadeIn from "./ScrollFadeIn";
import { personalProjects, PersonalProject } from "@/data/personal-projects";


function ProjectCard({
  project,
  onClick,
}: {
  project: PersonalProject;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        textAlign: "left",
        background: "var(--color-card)",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.06), inset 0 0 0 2px var(--color-border-hover)"
          : "0 1px 4px rgba(0,0,0,0.02)",
        transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          aspectRatio: "16 / 9",
          background: "var(--color-surface)",
          flexShrink: 0,
        }}
      />

      {/* Content */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
            flexGrow: 1,
          }}
        >
          {project.shortDescription}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-block",
                padding: "3px 9px",
                background: "var(--color-accent-ghost)",
                border: "1px solid var(--color-accent-ghost-border)",
                borderRadius: "100px",
                fontSize: "10px",
                fontWeight: 500,
                color: "var(--color-accent)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function Popover({
  project,
  onClose,
}: {
  project: PersonalProject;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.32)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "24px",
        backdropFilter: "blur(2px)",
        animation: "fadeIn 150ms ease-out",
      }}
    >
      <div
        ref={ref}
        style={{
          background: "var(--color-card)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.16)",
          animation: "slideUp 200ms ease-out",
        }}
      >
        {/* Image area */}
        <div
          style={{
            aspectRatio: "16 / 9",
            background: "var(--color-surface)",
            borderRadius: "16px 16px 0 0",
            flexShrink: 0,
          }}
        />

        {/* Body */}
        <div style={{ padding: "28px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                flexShrink: 0,
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid var(--color-border-default)",
                background: "var(--color-surface)",
                color: "var(--color-text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 10px",
                  background: "var(--color-accent-ghost)",
                  border: "1px solid var(--color-accent-ghost-border)",
                  borderRadius: "100px",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  letterSpacing: "0.03em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Detail rows */}
          {[
            { label: "Overview", value: project.overview },
            { label: "Role", value: project.role },
            { label: "Outcome", value: project.outcome },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "10px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-text-tertiary)",
                  marginBottom: "6px",
                }}
              >
                {label}
              </p>
              <p style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.65 }}>
                {value}
              </p>
            </div>
          ))}

          {/* Optional external link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "4px",
                padding: "10px 18px",
                background: "var(--color-accent)",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "background 150ms ease-out",
              }}
            >
              {project.linkLabel ?? "View Project"} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PersonalProjects() {
  const [active, setActive] = useState<PersonalProject | null>(null);

  return (
    <>
      <section
        id="personal-projects"
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          borderTop: "1px solid var(--color-border-subtle)",
        }}
      >
        <ScrollFadeIn>
          <h2
            style={{
              fontFamily: "var(--font-gasoek)",
              fontSize: "42px",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              marginBottom: "40px",
            }}
          >
            Side Projects
          </h2>
        </ScrollFadeIn>

        {/* Mosaic grid */}
        <div className="projects-grid">
          {personalProjects.map((project, i) => (
            <ScrollFadeIn key={project.id} delay={i * 80}>
              <ProjectCard
                project={project}
                onClick={() => setActive(project)}
              />
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      {active && <Popover project={active} onClose={() => setActive(null)} />}
    </>
  );
}
