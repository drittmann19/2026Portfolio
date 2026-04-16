export interface PersonalProject {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
  image?: string;
  imagePadding?: string;
  cardColor?: string;
  cardTextDark?: boolean;
  popoverImages?: string[];
  // Popover detail fields
  overview: string;
  role: string;
  outcome: string;
  link?: string;
  linkLabel?: string;
}

export const personalProjects: PersonalProject[] = [
  {
    id: "collectiviz",
    title: "Collectiviz",
    shortDescription: "A full-stack web app that transformed scattered alumni career data into an explorable data visualization for prospective design students.",
    tags: ["Data Viz", "Full-Stack", "Firebase"],
    image: "/images/projects/collectiviz/card.png",
    imagePadding: "0px",
    cardColor: "#000000",
    overview:
      "Prospective students at CU's CTD program had no way to understand where the degree actually leads. Collectiviz is a two-page web app — an alumni data collection form and a public-facing visualization — that filled that gap with real data and real stories.",
    role: "Designer and developer. Owned end-to-end from research through full-stack implementation using Bootstrap, Firebase, and Chart.js.",
    outcome: "3 rounds of user testing shaped the final product. Adopted by CU's ATLAS Institute communications team as part of their alumni outreach workflow.",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    shortDescription: "Designed and built with Next.js, Tailwind, and Claude Code.",
    tags: ["Next.js", "AI-assisted"],
    overview:
      "An experiment in AI-augmented development. I designed the system, wrote the spec, and used Claude Code to implement it — treating the AI as a collaborator rather than a generator.",
    role: "Designer and product owner. Claude Code handled implementation from a detailed spec.",
    outcome: "Shipped faster than any previous portfolio. The process itself became a proof of concept for AI-augmented design workflows.",
  },
  {
    id: "gascast",
    title: "GasCast",
    shortDescription: "Coming soon.",
    tags: ["Product Design"],
    image: "/images/projects/gascast/card.png",
    cardColor: "#4EBC53",
    cardTextDark: true,
    overview: "Coming soon.",
    role: "Coming soon.",
    outcome: "Coming soon.",
  },
  {
    id: "glow",
    title: "Glow",
    shortDescription: "Figma Makeathon project — a wellness check-in tool built entirely in Figma Make.",
    tags: ["Figma Make", "Wellness"],
    image: "/images/projects/glow/card.png",
    cardColor: "#F9C823",
    cardTextDark: true,
    overview:
      "Built during a Figma Makeathon, Glow is a lightweight daily mood and energy check-in tool. The goal was to see how far Figma Make could take a real interactive product.",
    role: "Design and build. Used Figma Make for the full interactive experience.",
    outcome: "Shipped a working prototype in under 48 hours. Explored the limits of Figma Make as a rapid prototyping environment.",
    link: "https://figma.com",
    linkLabel: "View in Figma",
  },
  {
    id: "ai-chat-aside",
    title: "AI Chat Aside",
    shortDescription: "Coming soon.",
    tags: ["AI", "Product Design"],
    image: "/images/projects/ai-chat-aside/card.png",
    cardColor: "#ffffff",
    cardTextDark: true,
    overview: "Coming soon.",
    role: "Coming soon.",
    outcome: "Coming soon.",
  },
  {
    id: "crypto-onboarding",
    title: "Crypto Onboarding",
    shortDescription: "Redesigning the onboarding experience for a crypto wallet app.",
    tags: ["Fintech", "Mobile"],
    image: "/images/projects/crypto-onboarding/card.png",
    cardColor: "#0251FF",
    overview:
      "An exploration into making crypto wallets less intimidating for first-time users — focusing on progressive disclosure and trust-building through transparency.",
    role: "Solo designer. Research, wireframes, high-fidelity Figma prototype.",
    outcome: "Concept project. Documented key friction points and proposed a phased onboarding flow.",
  },
  {
    id: "ontask",
    title: "Ontask",
    shortDescription: "Research-driven productivity app for students managing coursework.",
    tags: ["Education", "Product Design"],
    image: "/images/projects/ontask/card.png",
    cardColor: "#C5B3E5",
    cardTextDark: true,
    overview:
      "End-to-end product design for a student productivity app, from generative research through to a high-fidelity prototype. Focused on reducing cognitive load during high-stress academic periods.",
    role: "Solo designer. User interviews, affinity mapping, IA, wireframes, prototype.",
    outcome: "Identified 3 core mental models students use for task prioritization. Designed a system that maps to those models rather than fighting them.",
  },
]
