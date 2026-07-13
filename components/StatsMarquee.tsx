import { Fragment } from "react";

/* The rolling stats tape at the hero's fold. Every number carries its
   source case study as a superscript cite; hover pauses the tape. */

const STATS: Array<{ text: string; cite: string }> = [
  { text: "60% Faster Order Creation", cite: "cs.01" },
  { text: "20,000+ expert users served", cite: "cs.01·02" },
  { text: "$500M+ payments platform", cite: "cs.02" },
  { text: "85% faster payments", cite: "cs.02" },
  { text: "50% fewer errors", cite: "cs.02" },
  { text: "2× transaction volume", cite: "cs.01" },
  { text: "90% satisfaction", cite: "cs.02" },
];

function Group() {
  return (
    <div className="marquee-group">
      {STATS.map((s) => (
        <Fragment key={s.text}>
          <span>
            {s.text} <b className="cite">{s.cite}</b>
          </span>
          <i>✳</i>
        </Fragment>
      ))}
    </div>
  );
}

export default function StatsMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
