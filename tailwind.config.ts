import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "var(--color-page)",
        card: "var(--color-card)",
        surface: "var(--color-surface)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-ghost": "var(--color-accent-ghost)",
        metric: "var(--color-metric)",
        "border-subtle": "var(--color-border-subtle)",
        "border-default": "var(--color-border-default)",
        "border-hover": "var(--color-border-hover)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-gasoek)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
