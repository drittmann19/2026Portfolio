import ScrollFadeIn from "./ScrollFadeIn";

const storyParagraphs = [
  "I come from a family of teachers. Growing up, I watched my parents find ways to make difficult concepts click for students who were struggling. That probably explains why I ended up in design. I'm drawn to the moment when something confusing becomes clear.",
  "I didn't know design was a job until college. I started in computer science, but something was missing. When I discovered design, it clicked. I could blend my creative and technical sides to solve real, complex problems that empower people. Growing up in Shanghai, studying abroad in Sweden, and landing at CU Boulder taught me that perspective matters. What works for one person, one culture, one workflow doesn't automatically transfer to the next. You have to truly understand the problem and the person behind it before you solve.",
  "My real design education came at Nutrien, where I spent four years in the agricultural technology space. The problems were the kind I've come to love. Field workers with unreliable connectivity, seasonal workflows that shifted constantly, legacy systems that didn't always cooperate, and expert users who noticed every wrong detail. I learned that simplifying complexity isn't about hiding it. It's about making it legible enough that people trust what they're looking at. Somewhere in those four years I also got curious about how AI could change the way I work, and I haven't stopped experimenting since. It's become part of how I think, prototype, and ship.",
];

const hobbies =
  "Outside of work, you'll find me feeding my growth mindset by traveling to explore new cultures, diving into music production and live shows, or channeling my competitive spirit through table tennis, ultimate frisbee, and Rocket League. Games taught me to adapt quickly and think strategically under pressure, which translates to design more than I expected. When I'm not out exploring, I'm hanging out with my three cats Rotary, Axl, and Piper (see if you can guess the theme). They're my best work partners, helping me think through tricky problems and making sure I actually take breaks.";

const values = [
  {
    title: "Clarity over cleverness",
    body: "The best design isn't the most innovative solution. It's the one people understand immediately. Transparency builds trust faster than polish.",
  },
  {
    title: "Stay uncomfortable",
    body: "Every time I've grown, it started with discomfort. Pitching to executives for the first time. Leading design across four squads. Moving to a new country. I seek out the edges of what I know because that's where perspective comes from.",
  },
  {
    title: "Make the team faster, not just the product better",
    body: "I care about what ships, but I care just as much about how we work together to ship it. The artifacts I build (decision documents, shared models, onboarding resources) aren't extras. They're how good work scales and how collaborative cultures get built.",
  },
];

function AboutImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: "12px", overflow: "hidden", ...style }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        paddingTop: "112px",
        paddingBottom: "112px",
        borderTop: "1px solid var(--color-border-subtle)",
      }}
    >
      {/* Section heading */}
      <ScrollFadeIn>
        <h2
          style={{
            fontFamily: "var(--font-gasoek)",
            fontSize: "42px",
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
            marginBottom: "40px",
          }}
        >
          About Me
        </h2>
      </ScrollFadeIn>

      {/* Story card */}
      <ScrollFadeIn>
        <div
          style={{
            background: "var(--color-card)",
            borderRadius: "16px",
            padding: "40px",
            marginBottom: "56px",
          }}
        >
          {/* Text with floated headshot */}
          <div style={{ marginBottom: "24px" }}>
            <AboutImage
              src="/images/about/LinkedInHeadshot.png"
              alt="Damean Rittmann"
              style={{ float: "right", width: "calc((100% - 24px) / 3)", aspectRatio: "3 / 4", marginLeft: "32px", marginBottom: "16px" }}
            />
            <div>
              {storyParagraphs.map((p, i) => (
                <p key={i} style={{ fontSize: "var(--text-body)", color: "var(--color-text-primary)", lineHeight: 1.7, marginBottom: "16px" }}>
                  {p}
                </p>
              ))}
              <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
                {hobbies}
              </p>
            </div>
            <div style={{ clear: "both" }} />
          </div>

          {/* 3 small images row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            <AboutImage src="/images/about/Plane.png" alt="Traveling" style={{ aspectRatio: "4 / 3" }} />
            <AboutImage src="/images/about/festival.png" alt="Festival" style={{ aspectRatio: "4 / 3" }} />
            <AboutImage src="/images/about/cats.png" alt="Rotary, Axl, and Piper" style={{ aspectRatio: "4 / 3" }} />
          </div>
        </div>
      </ScrollFadeIn>

      {/* Values */}
      <ScrollFadeIn delay={100}>
        <h3
          style={{
            fontFamily: "var(--font-gasoek)",
            fontSize: "28px",
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          My Values
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {values.map((v) => (
            <div
              key={v.title}
              style={{
                background: "var(--color-card)",
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {v.title}
              </p>
              <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </ScrollFadeIn>
    </section>
  );
}
