export interface PersonalProject {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];
  // Popover detail fields
  overview: string;
  role: string;
  outcome: string;
  link?: string;
  linkLabel?: string;
}

export const personalProjects: PersonalProject[] = [
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
    overview: "Coming soon.",
    role: "Coming soon.",
    outcome: "Coming soon.",
  },
  {
    id: "glow",
    title: "Glow",
    shortDescription: "Figma Makeathon project — a wellness check-in tool built entirely in Figma Make.",
    tags: ["Figma Make", "Wellness"],
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
    overview: "Coming soon.",
    role: "Coming soon.",
    outcome: "Coming soon.",
  },
  {
    id: "crypto-onboarding",
    title: "Crypto Onboarding",
    shortDescription: "Redesigning the onboarding experience for a crypto wallet app.",
    tags: ["Fintech", "Mobile"],
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
    overview:
      "End-to-end product design for a student productivity app, from generative research through to a high-fidelity prototype. Focused on reducing cognitive load during high-stress academic periods.",
    role: "Solo designer. User interviews, affinity mapping, IA, wireframes, prototype.",
    outcome: "Identified 3 core mental models students use for task prioritization. Designed a system that maps to those models rather than fighting them.",
  },
]
