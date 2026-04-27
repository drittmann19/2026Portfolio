import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/data/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);

  const title = study?.title ?? "Case Study";
  const metrics = study?.metrics ?? "";
  const tags = study?.tags ?? [];
  const accentColor = study?.color ?? "#1D5CFF";

  // Split metrics string into chips for display
  const metricChips = metrics.split(" · ").slice(0, 2);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#0B0B0F",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Colored accent bar — left edge using study color */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "10px",
            background: accentColor,
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "64px 80px 64px 96px",
          }}
        >
          {/* Tags row */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "36px",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#6B7280",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "#1A1A24",
                  border: "1px solid #2A2A38",
                  borderRadius: "100px",
                  padding: "6px 16px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: "62px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              flex: 1,
            }}
          >
            {title}
          </div>

          {/* Metrics */}
          {metricChips.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "40px",
              }}
            >
              {metricChips.map((chip, i) => (
                <div key={chip} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: accentColor }}>{chip.trim()}</span>
                  {i < metricChips.length - 1 && (
                    <span style={{ color: "#2A2A35", margin: "0 16px" }}>·</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Byline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              paddingTop: "24px",
              borderTop: "1px solid #1E1E28",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#9CA3AF",
                letterSpacing: "0.05em",
              }}
            >
              DAMEAN RITTMANN
            </span>
            <span style={{ color: "#2A2A35", fontSize: "16px" }}>·</span>
            <span
              style={{
                fontSize: "16px",
                color: "#4B5563",
                letterSpacing: "0.05em",
              }}
            >
              PRODUCT DESIGNER
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
