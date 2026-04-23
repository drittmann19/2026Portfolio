import Hero from "@/components/Hero";
import WorkCarousel from "@/components/WorkCarousel";
import About from "@/components/About";
import PersonalProjects from "@/components/PersonalProjects";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
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
