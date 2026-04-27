import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#0B0B0F",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Blue accent bar — right edge */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "10px",
            background: "#1D5CFF",
          }}
        />

        {/* Name label */}
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            fontWeight: 700,
            color: "#1D5CFF",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "56px",
          }}
        >
          DAMEAN RITTMANN
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: "88px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
          >
            Product
          </div>
          <div
            style={{
              fontSize: "88px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
          >
            Designer.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#6B7280",
              marginTop: "28px",
              lineHeight: 1.4,
            }}
          >
            Building trust into high-stakes workflows.
          </div>
        </div>

        {/* Metrics row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
            fontSize: "18px",
            fontWeight: 600,
            color: "#1D5CFF",
          }}
        >
          <span>60%+ faster execution</span>
          <span style={{ color: "#2A2A35", margin: "0 20px" }}>·</span>
          <span>50% fewer errors</span>
          <span style={{ color: "#2A2A35", margin: "0 20px" }}>·</span>
          <span>$500M+ financial platform</span>
        </div>
      </div>
    ),
    size
  );
}
