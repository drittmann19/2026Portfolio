import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Values from "@/components/Values";
import Lab from "@/components/Lab";
import FitCheck from "@/components/FitCheck";
import RevealFX from "@/components/RevealFX";

export const metadata: Metadata = {
  title: "Damean Rittmann — Product Designer",
  description:
    "Product designer building trust into high-stakes workflows. 60%+ faster execution, 50% fewer errors, $500M+ fintech platform.",
  openGraph: {
    title: "Damean Rittmann — Product Designer",
    description:
      "Product designer building trust into high-stakes workflows. 60%+ faster execution, 50% fewer errors, $500M+ fintech platform.",
    url: "/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Damean Rittmann",
  jobTitle: "Product Designer",
  url: "https://dameanrittmann.com",
  sameAs: ["https://www.linkedin.com/in/damean-rittmann/"],
  knowsAbout: [
    "Product Design",
    "UX Design",
    "Enterprise Software",
    "Fintech",
    "Design Systems",
    "AgTech",
    "Cross-Platform Strategy",
  ],
  description:
    "Product designer building trust into high-stakes workflows. 60%+ faster execution, 50% fewer errors, $500M+ fintech platform.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Hero />
      <Work />
      <About />
      <Values />
      <Lab />
      <FitCheck />

      <footer className="contact" id="contact">
        <div className="wrap">
          <p className="eyebrow mono" data-reveal>fig. 06 · contact</p>
          <h2 className="contact-title" data-reveal>
            Let&rsquo;s make it <em>legible</em>, together.
          </h2>
          <div className="contact-actions" data-reveal>
            <a className="btn btn-fill" href="mailto:dameanrittmann@gmail.com">
              Email me <span aria-hidden="true">↗</span>
            </a>
            <a className="btn" href="https://www.linkedin.com/in/damean-rittmann/" target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className="btn" href="/DameanRittmann_Resume.pdf" download>
              Resume <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="colophon mono">
            <a href="#overview" className="to-top">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <RevealFX />
    </>
  );
}
