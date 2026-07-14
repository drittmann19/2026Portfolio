import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getPrevNext, type Block } from "@/data/case-studies";
import CSVideo from "@/components/CSVideo";
import RevealFX from "@/components/RevealFX";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const study = getCaseStudy(params.slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.subtitle,
    openGraph: {
      title: `${study.title} — Damean Rittmann`,
      description: study.subtitle,
      url: `/case-study/${study.slug}`,
    },
  };
}

// ── Block renderer ────────────────────────────────────────────────────────────

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={idx} className="cs-p" data-reveal>
          {block.text}
        </p>
      );

    case "h3":
      return (
        <h3 key={idx} className="cs-h3" data-reveal>
          {block.text}
        </h3>
      );

    case "list":
      return (
        <ul key={idx} className="cs-list" data-reveal>
          {block.items.map((item, i) => (
            <li key={i}>
              <span className="cs-list-mark" aria-hidden="true">✳</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "metric":
      return (
        <div key={idx} className="cs-metric" data-reveal>
          <p className="cs-metric-big">{block.metric}</p>
          <p className="mono cs-metric-label">
            {block.label}
            {block.sublabel ? ` · ${block.sublabel}` : ""}
          </p>
        </div>
      );

    case "metrics_grid":
      return (
        <div key={idx} className="cs-metrics-grid" data-reveal>
          {block.items.map((m, i) => (
            <div key={i} className="cs-metric">
              <p className="cs-metric-big">{m.metric}</p>
              <p className="mono cs-metric-label">
                {m.label}
                {m.sublabel ? ` · ${m.sublabel}` : ""}
              </p>
            </div>
          ))}
        </div>
      );

    case "image":
      return (
        <figure key={idx} className="cs-fig" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cs-img" src={block.src} alt={block.alt} loading="lazy" />
        </figure>
      );

    case "video":
      return (
        <figure key={idx} className="cs-fig" data-reveal>
          <CSVideo src={block.src} />
        </figure>
      );

    default:
      return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const idx = caseStudies.findIndex((s) => s.slug === study.slug);
  const csNum = String(idx + 1).padStart(2, "0");
  const { prev, next } = getPrevNext(params.slug);
  const receiptItems = study.metrics.split("·").map((m) => m.trim());

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.subtitle,
    url: `https://dameanrittmann.com/case-study/${study.slug}`,
    author: {
      "@type": "Person",
      name: "Damean Rittmann",
      url: "https://dameanrittmann.com",
    },
    keywords: study.tags.join(", "),
    ...(study.year ? { dateCreated: String(study.year) } : {}),
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />

      {/* ── Case hero ── */}
      <section className="cs-hero" id="overview">
        <div className="wrap">
          <p className="eyebrow mono">
            cs.{csNum}
            {study.year ? ` · ${study.year}` : ""} ✳ case study
          </p>
          <h1 className="cs-title">{study.title}</h1>
          <p className="cs-lede">{study.subtitle}</p>
          <ul className="chips mono">
            {study.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="cs-receipt mono" aria-label="Outcomes">
          <div className="wrap cs-receipt-in">
            {receiptItems.map((m, i) => (
              <Fragment key={m}>
                <span>{m}</span>
                {i < receiptItems.length - 1 && <i aria-hidden="true">✳</i>}
              </Fragment>
            ))}
          </div>
        </div>
        {study.heroImage && (
          <div className="wrap">
            <figure className="cs-fig cs-hero-fig" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cs-img" src={study.heroImage} alt={`${study.title} hero`} />
            </figure>
          </div>
        )}
      </section>

      {/* ── Content sections ── */}
      <div className="wrap">
        {study.sections.map((section, si) => (
          <section key={section.id} className="cs-section" id={section.id}>
            <div className="cs-sec-label">
              <p className="eyebrow mono" data-reveal>
                fig. {String(si + 1).padStart(2, "0")} · {section.label.toLowerCase()}
              </p>
            </div>
            <div className="cs-sec-body">
              <h2 className="cs-sec-heading" data-reveal>
                {section.heading}
              </h2>
              {section.blocks.map((block, i) => renderBlock(block, i))}
            </div>
          </section>
        ))}
      </div>

      {/* ── Prev / next ── */}
      <section className="cs-prevnext">
        <div className="wrap">
          <p className="eyebrow mono" data-reveal>more work</p>
          <div className="cs-pn-grid">
            {prev && (
              <Link className="cs-pn-card" href={`/case-study/${prev.slug}`} data-reveal>
                <p className="mono cs-pn-label">← previous case</p>
                <h3 className="cs-pn-title">{prev.title}</h3>
                <p className="mono cs-pn-metrics">{prev.metrics}</p>
              </Link>
            )}
            {next && (
              <Link className="cs-pn-card cs-pn-next" href={`/case-study/${next.slug}`} data-reveal>
                <p className="mono cs-pn-label">next case →</p>
                <h3 className="cs-pn-title">{next.title}</h3>
                <p className="mono cs-pn-metrics">{next.metrics}</p>
              </Link>
            )}
          </div>
          <div className="cs-colophon mono">
            <p>© {new Date().getFullYear()} Damean Rittmann ✳ Designed &amp; built by hand (and a little AI)</p>
            <a href="#top" className="to-top">Back to top ↑</a>
          </div>
        </div>
      </section>

      <RevealFX />
    </>
  );
}
