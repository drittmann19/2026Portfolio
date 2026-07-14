import Link from "next/link";
import { caseStudies } from "@/data/case-studies";

/* Selected Work — alternating editorial case rows fed by data/case-studies.ts */
export default function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <p className="eyebrow mono">fig. 01 · selected work</p>
          <h2>
            Work that had to <em>earn trust</em>.
          </h2>
        </header>

        {caseStudies.map((cs, i) => (
          <article key={cs.slug} className={`case${i % 2 === 1 ? " case-flip" : ""}`} data-reveal>
            <div className="case-meta">
              <p className="mono case-index">
                CS.{String(i + 1).padStart(2, "0")}{cs.year ? ` · ${cs.year}` : ""}
              </p>
              <h3 className="case-title">{cs.title}</h3>
              <p className="case-desc">{cs.subtitle}</p>
              <ul className="chips mono">
                {cs.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Link className="case-link" href={`/case-study/${cs.slug}`}>
                Read the case study <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <figure className="case-fig">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="case-img"
                src={cs.cardImage ?? cs.heroImage}
                alt={cs.title}
                loading="lazy"
              />
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
