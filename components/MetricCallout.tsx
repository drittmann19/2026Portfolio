interface MetricCalloutProps {
  metric: string;
  label: string;
  sublabel?: string;
}

export default function MetricCallout({ metric, label, sublabel }: MetricCalloutProps) {
  return (
    <div
      style={{
        background: "var(--color-metric-ghost)",
        borderLeft: "3px solid var(--color-metric)",
        borderRadius: "10px",
        padding: "24px 28px",
      }}
    >
      <p
        className="font-mono"
        style={{
          fontSize: "40px",
          fontWeight: 700,
          color: "var(--color-metric)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {metric}
      </p>
      <p
        className="font-sans"
        style={{
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          marginTop: "10px",
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className="font-mono"
          style={{
            fontSize: "12px",
            color: "var(--color-text-tertiary)",
            marginTop: "4px",
          }}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}
