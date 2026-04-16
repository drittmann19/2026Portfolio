"use client";

import Link from "next/link";
import { useState } from "react";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  color: string;
  cardImage?: string;
  cardImageFit?: "cover" | "contain";
  cardImagePadding?: string;
  heroImage?: string;
}

export default function CaseStudyCard({ slug, title, subtitle, tags, color, cardImage, cardImageFit, cardImagePadding, heroImage }: CaseStudyCardProps) {
  const image = cardImage ?? heroImage;
  const fit = cardImageFit ?? "cover";
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/case-study/${slug}`} style={{ textDecoration: "none", display: "flex", height: "100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 8px 24px rgba(0,0,0,0.12), inset 0 0 0 2px #F05E3B"
            : "0 1px 4px rgba(0,0,0,0.02)",
          transition: "transform 200ms ease-out, box-shadow 200ms ease-out",
          cursor: "pointer",
          background: color,
        }}
      >
        {/* Image area — 16:10 */}
        <div
          style={{
            aspectRatio: "16 / 10",
            background: "rgba(255,255,255,0.06)",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: fit, objectPosition: "center", padding: cardImagePadding }}
            />
          )}
        </div>

        {/* Content */}
        <div
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flexGrow: 1,
          }}
        >
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: "16px",
              color: "#ffffff",
              lineHeight: 1.5,
              flexGrow: 1,
            }}
          >
            {subtitle}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "100px",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#ffffff",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  letterSpacing: "0.03em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
