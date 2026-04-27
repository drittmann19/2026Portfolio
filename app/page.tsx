import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WorkCarousel from "@/components/WorkCarousel";
import About from "@/components/About";
import PersonalProjects from "@/components/PersonalProjects";

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
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />

        <WorkCarousel />

        <About />

        <PersonalProjects />

        <footer
          style={{
            borderTop: "1px solid var(--color-border-subtle)",
            paddingTop: "40px",
            paddingBottom: "40px",
            color: "var(--color-text-tertiary)",
            fontSize: "13px",
          }}
        >
          © 2026 Damean Rittmann
        </footer>
      </div>
    </>
  );
}
