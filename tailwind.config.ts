import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Breakpoint system: S ≤767 · M 768–1199 · L 1200–1439 · XL ≥1440
      screens: {
        tablet: "768px",
        laptop: "1200px",
        desktop: "1440px",
      },
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-70": "var(--ink-70)",
        "ink-50": "var(--ink-50)",
        blue: "var(--blue)",
        "blue-deep": "var(--blue-deep)",
        red: "var(--red)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
