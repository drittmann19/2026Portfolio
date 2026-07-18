"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Lab — side project tiles + the "lab note" overlay (problem / solution /
   reflection per project, with an image/video/embed carousel). */

type Media =
  | { type: "img"; src: string }
  | { type: "video"; src: string }
  | { type: "youtube"; src: string };

interface Project {
  id: string;
  title: string;
  label: string;
  desc: string;
  tone: string; // tile color class
  size: string; // grid span class
  card: string;
  cardAlt: string;
  fig?: never;
  tags: string;
  media: Media[];
  problem: string;
  solution: string;
  reflection: string;
}

const PROJECTS: Project[] = [
  {
    id: "portfolio",
    title: "This Portfolio",
    label: "P.01 · 2026",
    desc: "The site you are on. Designed and built to match my brand, using Next.js and Claude Code.",
    tone: "t-blue",
    size: "s3",
    card: "/images/projects/portfolio/card.png",
    cardAlt: "This portfolio site",
    tags: "Web Design · Next.js + Claude Code · Live Website",
    media: [{ type: "img", src: "/images/projects/portfolio/screen-1.png" }],
    problem:
      "I needed a portfolio that matched my updated brand. My previous site was built in Figma Sites, which got me online quickly but ran out of room for custom interactions, animations, or anything beyond the template system. The gap between how I was presenting myself and the work I actually wanted to be hired for was widening. I also wanted to continue understanding the limits of Claude Code and Claude Design by building something real, not by reading documentation.",
    solution:
      "I designed this site to feel like the brand behind it. Confident, direct, and focused on the work. The side and top navigation let readers jump to what they care about instead of scrolling through each page and case study. Animations and interactions were added with intent, not as decoration, and the overall pace favors scannability over spectacle. The one AI feature visitors can actually use is Fit Check. Paste a role and it gives an honest read on how my experience maps to it, grounded in my real case studies and built on the Anthropic API. One feature doing one useful thing, not a chatbot bolted on for show. Designed by me, a human, with some suggestions from Claude Design and the Impeccable skill in Claude Code. Built with Claude Code using Next.js and Tailwind.",
    reflection:
      "The most useful AI moment was a pushback one. When I asked Claude Design to polish my existing layout, it came back with a full redesign leaning into a technical, overdone brand that wasn't mine. It looked great but it wasn't me. I kept a few small details, then simplified everything else. AI gives you a thousand directions fast. Knowing which one represents you is still design work, and it's the part I'm not outsourcing.",
  },
  {
    id: "gascast",
    title: "GasCast",
    label: "P.02 · 2026",
    desc: "A native iOS app that turns Ethereum gas fees into a weather-style forecast instead of a dashboard of raw numbers.",
    tone: "t-green",
    size: "s3",
    card: "/images/projects/gascast/card.png",
    cardAlt: "GasCast iOS app",
    tags: "Fintech / Crypto · SwiftUI + Claude Code · Shipped iOS App",
    media: [
      { type: "img", src: "/images/projects/gascast/screen-1.png" },
      { type: "video", src: "/images/projects/gascast/screen-2.mov" },
    ],
    problem:
      "Every time someone transacts on Ethereum, they pay a fee called gas. These fees are volatile, displayed in a technical unit most people don't understand, and the consequences of getting them wrong are real. Overpay and you waste money. Underpay and your transaction stalls for hours before being dropped. Existing trackers show raw numbers, charts, and heatmaps, but none answer the question users actually care about. Is now a good time to transact?",
    solution:
      "I designed and built GasCast, a native iOS app that translates live Ethereum data into a weather-style forecast. The biggest design decision was flipping the header hierarchy. Early versions led with the Gwei number, but \"128.5 GWEI\" communicates nothing to someone who doesn't already know gas pricing. I made the status label the hero instead. OPTIMAL, ACCEPTABLE, COSTLY, or SEVERE. Immediately actionable, no crypto knowledge required. The Gwei value still exists for power users, but in a compact badge rather than dominating the screen. I designed in Figma, built in SwiftUI with Claude Code, and deployed a smart contract to Base Sepolia using Foundry to handle on-chain data. Live on the App Store.",
    reflection:
      "This was a learning project first. I wanted to see how far I could take an idea on my own with AI as a collaborator, and what I took away was a repeatable workflow. Claude helped me synthesize research and plan the MVP. Google Stitch gave me a visual starting point. Then I treated the implementation like sculpting, refining each card and tuning details directly in code rather than approximating them in static mockups. The animated wave grid background is a good example. It responds to gas conditions, calm and slow during Optimal and dense and chaotic during Severe, and getting it right took multiple rounds of iteration in code. The real insight isn't that AI made the work faster. It's that AI tools are most powerful when you treat them as a medium to think through, not a shortcut to skip thinking.",
  },
  {
    id: "glow",
    title: "Glow",
    label: "P.03 · 2026",
    desc: "A shared pixel art night sky where messages live as fading stars and attention is the only input that matters.",
    tone: "t-night",
    size: "s2",
    card: "/images/projects/glow/card.png",
    cardAlt: "Glow shared night sky",
    tags: "Interaction Design · Figma Make · Makeathon 2026",
    media: [{ type: "video", src: "/images/projects/glow/screen-1.mp4" }],
    problem:
      "Shared digital spaces run on the same worn patterns. Tap to like. Scroll to consume. Click a button to contribute. The interface does all the work and the content becomes background noise. I wanted to see what happens when the canvas itself is the only interface and attention is the only input that matters.",
    solution:
      "Glow is a shared pixel art night sky where messages exist as stars that slowly fade over time. No buttons, no menus. Users press and hold empty sky to create a star, choosing a type (wish, gratitude, encouragement, or observation) through inline selection that appears where they held. Hovering over any star reveals its message and gradually restores its brightness. The longer you hover, the brighter it gets. When bright stars cluster together, a soft nebula glow forms behind them. Built in Figma Make for the 2026 Figma Makeathon.",
    reflection:
      "Every decision reinforced one idea. Strip the UI away and let the content and the space do the work. The decay mechanic was the piece I didn't expect to matter so much. It gives the experience a sense of time and care that static feeds never have.",
  },
  {
    id: "aside",
    title: "Aside",
    label: "P.04 · 2025",
    desc: "A feature concept that lets users branch from any AI response without losing their place in the main conversation.",
    tone: "t-sky",
    size: "s2",
    card: "/images/projects/ai-chat-aside/card.png",
    cardAlt: "Aside AI branching concept",
    tags: "AI UX · Figma · Concept",
    media: [{ type: "video", src: "/images/projects/ai-chat-aside/screen-1.mp4" }],
    problem:
      "Generative AI conversations become cluttered pillars of text where finding specific exchanges is frustrating. Asking a clarifying question mid-flow risks derailing your entire thought process. Existing branch solutions make this worse by treating each branch as a separate chat, fragmenting context instead of preserving it.",
    solution:
      "I designed Asides, a concept that lets users branch from any response without breaking their main conversation. Instead of creating a new chat, Asides opens a modal overlay where users can ask unlimited follow-up questions and return to their primary thread with the context intact. The icon lives in the existing action menu and shifts through three states: empty, active, and intensified when five or more asides exist. It signals depth without demanding attention.",
    reflection:
      "This was about respecting hierarchy. Branching is a supporting action, not a primary one, and designing it that way meant resisting the urge to make it visible everywhere. Context never gets lost, and the main thread stays the main thread.",
  },
  {
    id: "crypto",
    title: "Crypto Onboarding",
    label: "P.05 · 2025",
    desc: "A Coinbase concept that uses testnet coins to teach blockchain mechanics through practice rather than explanation.",
    tone: "t-clay",
    size: "s2",
    card: "/images/projects/crypto-onboarding/card.png",
    cardAlt: "Crypto onboarding concept",
    tags: "Fintech / Crypto · Figma · Concept",
    media: [{ type: "video", src: "/images/projects/crypto-onboarding/screen-2.mov" }],
    problem:
      "Crypto onboarding gets new users through wallet setup quickly, but the education stops there. Coinbase, Base, and MetaMask all introduce core concepts upfront, then drop users into a system where every action costs real money and mistakes are permanent. Setup is fast. Confidence isn't.",
    solution:
      "I designed a concept for Coinbase that uses testnet coins to teach blockchain mechanics through practice rather than explanation. Guided tours walk users through earning, sending, and experimenting with tokens in a risk-free sandbox, with top nudge cards and animated highlights that direct attention without overwhelming. Helper text explains concepts in plain language while introducing crypto terminology gradually, so the vocabulary builds alongside the experience. A dedicated learning home gives users ongoing access to testnet coins so practice doesn't end after the tour.",
    reflection:
      "The insight was that crypto education fails because it's decoupled from crypto use. Reading about sending a transaction and actually sending one with testnet coins are different levels of understanding, and the gap between them is where most new users give up. Onboarding that lets people practice without risk is the bridge. It's the same trust-through-clarity principle that works anywhere else, applied to a system that makes it especially hard.",
  },
  {
    id: "collectiviz",
    title: "Collectiviz",
    label: "P.06 · 2021",
    desc: "A web app that turns CU Boulder alumni career data into a scrollable story so prospective students can see where a design degree leads.",
    tone: "t-ink",
    size: "s3",
    card: "/images/projects/collectiviz/card.png",
    cardAlt: "Collectiviz data storytelling site",
    tags: "Data Visualization · Firebase + Chart.js · Team Project",
    media: [{ type: "youtube", src: "https://www.youtube.com/embed/_XzqA5xtYZY" }],
    problem:
      "High school students rarely hear about design careers, and the programs that produce designers have no easy way to show where their alumni end up. CU Boulder's Creative Technology Design program was stuck with time-consuming manual surveys and scattered spreadsheets, which meant prospective students couldn't see the career outcomes that might have convinced them to enroll. This was personal. I didn't know design was a career until CTD showed me, and I wanted other students to get that same door opened sooner.",
    solution:
      "I worked on a team of four to design and build a two-part product. A streamlined alumni intake form with skip logic and input validation that wrote directly to a Firebase database, and a public-facing visualization site that pulled from that same database to turn career data into a narrative. Salaries, job titles, locations, and alumni stories were framed as a single scrollable story rather than a standalone dashboard. The goal was to let a prospective student walk away feeling like they understood what this degree could become. I designed the visualizations and built the front-end using Bootstrap and Chart.js.",
    reflection:
      "The biggest pivot came when the comms team handed us qualitative data we hadn't planned for. We incorporated testimonials and quotes to tell a story, which taught me that real data almost never matches the data you designed for. Telling a story with data starts with the data, not the chart.",
  },
  {
    id: "ontask",
    title: "OnTask",
    label: "P.07 · 2021",
    desc: "A concept productivity app that builds a daily schedule around how students actually study, then uses rewards as scaffolding to pull them through the day.",
    tone: "t-mustard",
    size: "s3",
    card: "/images/projects/ontask/card.png",
    cardAlt: "OnTask productivity concept",
    tags: "Productivity · Figma · Concept",
    media: [{ type: "img", src: "/images/projects/ontask/screen-1.png" }],
    problem:
      "Remote learning during the pandemic left college students bored, distracted, and struggling to stay on task. Devices were the biggest source of distraction and the most-used tool for studying at the same time, which meant the usual advice to put your phone down and stick to a schedule broke down immediately.",
    solution:
      "I designed OnTask, a concept app that builds a daily schedule around a student's existing study habits and motivates follow-through through a rewards system. Onboarding asks questions about work patterns and energy levels, then generates a calendar with tasks attached to specific events. A study mode blocks notifications during focus blocks, and completing tasks unlocks rewards the user chooses themselves. Designed in Figma based on research with six college students.",
    reflection:
      "The most interesting thing I learned was about motivation as a design material. Rewards bolted on as gamification didn't move the needle. Rewards the student actually wanted and chose for themselves did. The difference isn't the mechanic. It's the ownership.",
  },
];

const REVEALS = [0, 0.06, 0, 0.06, 0.12, 0, 0.06];

function NoteMedia({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const list = project.media;
  const item = list[index];
  if (!item) return null;

  const step = (delta: number) => setIndex((i) => (i + delta + list.length) % list.length);

  return (
    <div className="note-media">
      {item.type === "img" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt={project.title} />
      )}
      {item.type === "video" && (
        <video src={item.src} controls muted autoPlay loop playsInline preload="metadata" />
      )}
      {item.type === "youtube" && (
        <iframe
          src={item.src}
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {list.length > 1 && (
        <>
          <button className="note-nav prev" type="button" aria-label="Previous media" onClick={() => step(-1)}>←</button>
          <button className="note-nav next" type="button" aria-label="Next media" onClick={() => step(1)}>→</button>
          <span className="note-count mono">{index + 1} / {list.length}</span>
        </>
      )}
    </div>
  );
}

export default function Lab() {
  const [openId, setOpenId] = useState<string | null>(null);
  const lastTile = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const project = PROJECTS.find((p) => p.id === openId) ?? null;

  const close = useCallback(() => {
    setOpenId(null);
    lastTile.current?.focus();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("note-open", !!project);
    return () => document.body.classList.remove("note-open");
  }, [project]);

  useEffect(() => {
    if (!project) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, close]);

  return (
    <section className="lab" id="projects">
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <p className="eyebrow mono">fig. 04 · the lab</p>
          <h2>
            Built to <em>learn fast</em>.
          </h2>
          <p className="sec-sub">
            Side projects that started as learning projects. Some shipped, some stayed concepts.
          </p>
        </header>
        <div className="lab-grid">
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              className={`tile ${p.tone} ${p.size}`}
              data-reveal={REVEALS[i]}
              data-project={p.id}
              tabIndex={0}
              role="button"
              aria-haspopup="dialog"
              aria-label={`Open project notes: ${p.title}`}
              onClick={(e) => {
                lastTile.current = e.currentTarget;
                setOpenId(p.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  lastTile.current = e.currentTarget;
                  setOpenId(p.id);
                }
              }}
            >
              <div className="tile-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.card} alt={p.cardAlt} loading="lazy" />
              </div>
              <div className="tile-body">
                <div className="tile-head">
                  <h3>{p.title}</h3>
                  <p className="mono tile-label">{p.label}</p>
                </div>
                <p className="tile-desc">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {project && (
        <div
          className="note-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="note-card" role="dialog" aria-modal="true" aria-labelledby="noteTitle">
            <header className="note-head">
              <div>
                <p className="mono note-label">{project.label}</p>
                <h3 className="note-title" id="noteTitle">{project.title}</h3>
              </div>
              <button className="note-close mono" type="button" onClick={close} ref={closeBtnRef}>
                ✕ close
              </button>
            </header>
            <NoteMedia key={project.id} project={project} />
            <div className="note-body">
              {(["problem", "solution", "reflection"] as const).map((k) => (
                <div key={k}>
                  <p className="note-sec-label mono">{k[0].toUpperCase() + k.slice(1)}</p>
                  <p className="note-sec-text">{project[k]}</p>
                </div>
              ))}
            </div>
            <p className="mono note-tags">{project.tags}</p>
          </div>
        </div>
      )}
    </section>
  );
}
