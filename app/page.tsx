import Hero from "@/components/Hero";
import WorkCarousel from "@/components/WorkCarousel";
import About from "@/components/About";
import PersonalProjects from "@/components/PersonalProjects";

export default function Home() {
  return (
    <div>
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
  );
}
