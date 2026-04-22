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
  const hasColor = !!project.cardColor;
  const darkText = project.cardTextDark;
  const textColor = hasColor ? (darkText ? "rgba(0,0,0,0.85)" : "#ffffff") : "var(--color-text-primary)";
  const textColorSecondary = hasColor ? (darkText ? "rgba(0,0,0,0.85)" : "#ffffff") : "var(--color-text-primary)";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        textAlign: "left",
        background: project.cardColor ?? "var(--color-card)",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.12), inset 0 0 0 4px #F05E3B"
          : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
      }}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          background: hasColor ? (darkText ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)") : "var(--color-surface)",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: project.imagePadding ?? "24px" }}
          />
        )}
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
        {project.year && (
          <p style={{
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: hasColor ? (darkText ? "rgba(0,0,0,0.85)" : "#ffffff") : "var(--color-text-primary)",
            lineHeight: 1,
            marginBottom: "4px",
          }}>
            {project.year}
          </p>
        )}
        <h3 style={{ fontSize: "var(--text-card-title)", fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "var(--text-body)", color: textColorSecondary, lineHeight: 1.5, flexGrow: 1 }}>
          {project.shortDescription}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-block",
                padding: "3px 9px",
                background: hasColor ? (darkText ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)") : "var(--color-accent-ghost)",
                border: `1px solid ${hasColor ? (darkText ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)") : "var(--color-accent-ghost-border)"}`,
                borderRadius: "100px",
                fontSize: "10px",
                fontWeight: 500,
                color: hasColor ? (darkText ? "rgba(0,0,0,0.75)" : "#ffffff") : "var(--color-accent)",
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

function parseYoutube(src: string): { videoId: string; start: number } | null {
  if (!src.startsWith("youtube:")) return null;
  const [id, query] = src.slice(8).split("?");
  const start = query ? parseInt(new URLSearchParams(query).get("start") ?? "0", 10) : 0;
  return { videoId: id, start };
}

function isVideo(src: string) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

function CarouselSlide({ src, title }: { src: string; title: string }) {
  const youtube = parseYoutube(src);
  if (youtube) {
    const embedUrl = `https://www.youtube.com/embed/${youtube.videoId}?autoplay=1&mute=1&start=${youtube.start}&loop=1&playlist=${youtube.videoId}&rel=0`;
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    );
  }
  if (isVideo(src)) {
    return (
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#000" }}
      />
    );
  }
  return (
    <img
      src={src}
      alt={title}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="popover-image-area" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "11px", color: "var(--color-text-tertiary)" }}>
          Coming soon
        </p>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const single = images.length === 1;

  return (
    <div className="popover-image-area" style={{ position: "relative" }}>
      <CarouselSlide key={`${index}-${images[index]}`} src={images[index]} title={`${title} ${index + 1}`} />

      {!single && (
        <>
          <button onClick={prev} aria-label="Previous" style={{
            position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
            width: "32px", height: "32px", borderRadius: "50%",
            background: "rgba(0,0,0,0.45)", border: "none", color: "#fff",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", backdropFilter: "blur(4px)",
          }}>‹</button>
          <button onClick={next} aria-label="Next" style={{
            position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
            width: "32px", height: "32px", borderRadius: "50%",
            background: "rgba(0,0,0,0.45)", border: "none", color: "#fff",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", backdropFilter: "blur(4px)",
          }}>›</button>

          <div style={{
            position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "6px", pointerEvents: "none",
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === index ? "16px" : "6px", height: "6px",
                  borderRadius: "3px",
                  background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 200ms ease, background 200ms ease",
                  pointerEvents: "auto",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
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

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const carouselImages = project.popoverImages?.length
    ? project.popoverImages
    : project.image
    ? [project.image]
    : [];

  return (
    <div onClick={handleBackdrop} className="popover-backdrop">
      <div ref={ref} className="popover-dialog">
        <div className="popover-handle" aria-hidden="true" />

        <ImageCarousel images={carouselImages} title={project.title} />

        <div className="popover-body">
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
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
                fontSize: "var(--text-body)",
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

          {/* Problem / Solution / Reflection */}
          {[
            { label: "Problem", value: project.problem },
            { label: "Solution", value: project.solution },
            { label: "Reflection", value: project.reflection },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: "20px" }}>
              <p style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
                marginBottom: "6px",
              }}>
                {label}
              </p>
              <p style={{ fontSize: "16px", color: "#111827", lineHeight: 1.65 }}>
                {value}
              </p>
            </div>
          ))}

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
          paddingTop: "112px",
          paddingBottom: "112px",
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

        <div className="projects-grid">
          {[...personalProjects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)).map((project, i) => (
            <ScrollFadeIn key={project.id} delay={i * 80} style={{ height: "100%" }}>
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
