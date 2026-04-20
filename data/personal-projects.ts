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
  problem: string;
  solution: string;
  reflection: string;
}

export const personalProjects: PersonalProject[] = [
  {
    id: "gascast",
    title: "GasCast",
    shortDescription: "A native iOS app that turns Ethereum gas fees into a weather-style forecast instead of a dashboard of raw numbers.",
    tags: ["Fintech / Crypto", "SwiftUI + Claude Code", "Shipped iOS App"],
    image: "/images/projects/gascast/card.png",
    cardColor: "#4EBC53",
    cardTextDark: true,
    popoverImages: [
      "/images/projects/gascast/screen-1.png",
      "/images/projects/gascast/screen-2.mov",
    ],
    problem:
      "Every time someone transacts on Ethereum, they pay a fee called gas. These fees are volatile, displayed in a technical unit most people don't understand, and the consequences of getting them wrong are real. Overpay and you waste money. Underpay and your transaction stalls for hours before being dropped. Existing trackers show raw numbers, charts, and heatmaps, but none answer the question users actually care about. Is now a good time to transact?",
    solution:
      "I designed and built GasCast, a native iOS app that translates live Ethereum data into a weather-style forecast. The biggest design decision was flipping the header hierarchy. Early versions led with the Gwei number, but \"128.5 GWEI\" communicates nothing to someone who doesn't already know gas pricing. I made the status label the hero instead. OPTIMAL, ACCEPTABLE, COSTLY, or SEVERE. Immediately actionable, no crypto knowledge required. The Gwei value still exists for power users, but in a compact badge rather than dominating the screen. I designed in Figma, built in SwiftUI with Claude Code, and deployed a smart contract to Base Sepolia using Foundry to handle on-chain data. Live on the App Store.",
    reflection:
      "This was a learning project first. I wanted to see how far I could take an idea on my own with AI as a collaborator, and what I took away was a repeatable workflow. Claude helped me synthesize research and plan the MVP. Google Stitch gave me a visual starting point. Then I treated the implementation like sculpting, refining each card and tuning details directly in code rather than approximating them in static mockups. The animated wave grid background is a good example. It responds to gas conditions, calm and slow during Optimal and dense and chaotic during Severe, and getting it right took multiple rounds of iteration in code. The real insight isn't that AI made the work faster. It's that AI tools are most powerful when you treat them as a medium to think through, not a shortcut to skip thinking.",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    shortDescription: "Designed and built with Next.js, Tailwind, and Claude Code.",
    tags: ["Next.js", "AI-assisted"],
    problem:
      "An experiment in AI-augmented development. I designed the system, wrote the spec, and used Claude Code to implement it — treating the AI as a collaborator rather than a generator.",
    solution: "Designer and product owner. Claude Code handled implementation from a detailed spec.",
    reflection: "Shipped faster than any previous portfolio. The process itself became a proof of concept for AI-augmented design workflows.",
  },
  {
    id: "glow",
    title: "Glow",
    shortDescription: "A shared pixel art night sky where messages live as fading stars and attention is the only input that matters.",
    tags: ["Interaction Design", "Figma Make", "Makeathon 2026"],
    image: "/images/projects/glow/card.png",
    cardColor: "#F9C823",
    cardTextDark: true,
    popoverImages: [
      "/images/projects/glow/screen-1.mp4",
    ],
    problem:
      "Shared digital spaces run on the same worn patterns. Tap to like. Scroll to consume. Click a button to contribute. The interface does all the work and the content becomes background noise. I wanted to see what happens when the canvas itself is the only interface and attention is the only input that matters.",
    solution:
      "Glow is a shared pixel art night sky where messages exist as stars that slowly fade over time. No buttons, no menus. Users press and hold empty sky to create a star, choosing a type — wish, gratitude, encouragement, or observation — through inline selection that appears where they held. Hovering over any star reveals its message and gradually restores its brightness. The longer you hover, the brighter it gets. When bright stars cluster together, a soft nebula glow forms behind them. Built in Figma Make for the 2026 Figma Makeathon.",
    reflection:
      "Every decision reinforced one idea. Strip the UI away and let the content and the space do the work. The decay mechanic was the piece I didn't expect to matter so much. It gives the experience a sense of time and care that static feeds never have.",
  },
  {
    id: "aside",
    title: "AI Chat Aside",
    shortDescription: "A feature concept that lets users branch from any AI response without losing their place in the main conversation.",
    tags: ["AI UX", "Figma", "Concept"],
    image: "/images/projects/ai-chat-aside/card.png",
    cardColor: "#ffffff",
    cardTextDark: true,
    popoverImages: [
      "/images/projects/ai-chat-aside/screen-1.mp4",
    ],
    problem:
      "Generative AI conversations become cluttered pillars of text where finding specific exchanges is frustrating. Asking a clarifying question mid-flow risks derailing your entire thought process. Existing branch solutions make this worse by treating each branch as a separate chat, fragmenting context instead of preserving it.",
    solution:
      "I designed Asides, a concept that lets users branch from any response without breaking their main conversation. Instead of creating a new chat, Asides opens a modal overlay where users can ask unlimited follow-up questions and return to their primary thread with the context intact. The icon lives in the existing action menu and shifts through three states — empty, active, and intensified when five or more asides exist. It signals depth without demanding attention.",
    reflection:
      "This was about respecting hierarchy. Branching is a supporting action, not a primary one, and designing it that way meant resisting the urge to make it visible everywhere. Context never gets lost, and the main thread stays the main thread.",
  },
  {
    id: "crypto-onboarding",
    title: "Crypto Onboarding",
    shortDescription: "A Coinbase concept that uses testnet coins to teach blockchain mechanics through practice rather than explanation.",
    tags: ["Fintech / Crypto", "Figma", "Concept"],
    image: "/images/projects/crypto-onboarding/card.png",
    cardColor: "#0251FF",
    popoverImages: [
      "/images/projects/crypto-onboarding/screen-2.mov",
    ],
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
    shortDescription: "A web app that turns CU Boulder alumni career data into a scrollable story so prospective students can see where a design degree leads.",
    tags: ["Data Visualization", "Firebase + Chart.js", "Team Project"],
    image: "/images/projects/collectiviz/card.png",
    imagePadding: "0px",
    cardColor: "#000000",
    popoverImages: [
      "youtube:_XzqA5xtYZY",
    ],
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
    shortDescription: "A concept productivity app that builds a daily schedule around how students actually study, then uses rewards as scaffolding to pull them through the day.",
    tags: ["Productivity", "Figma", "Concept"],
    image: "/images/projects/ontask/card.png",
    cardColor: "#C5B3E5",
    cardTextDark: true,
    popoverImages: [
      "/images/projects/ontask/screen-1.png",
    ],
    problem:
      "Remote learning during the pandemic left college students bored, distracted, and struggling to stay on task. Devices were the biggest source of distraction and the most-used tool for studying at the same time, which meant the usual advice — put your phone down, stick to a schedule — broke down immediately.",
    solution:
      "I designed OnTask, a concept app that builds a daily schedule around a student's existing study habits and motivates follow-through through a rewards system. Onboarding asks questions about work patterns and energy levels, then generates a calendar with tasks attached to specific events. A study mode blocks notifications during focus blocks, and completing tasks unlocks rewards the user chooses themselves. Designed in Figma based on research with six college students.",
    reflection:
      "The most interesting thing I learned was about motivation as a design material. Rewards bolted on as gamification didn't move the needle. Rewards tied to something the student actually wanted — and chose themselves — did. The difference isn't the mechanic. It's the ownership.",
  },
]
