# Damean Rittmann — Portfolio Build Spec
## For Claude Code Implementation

---

## 1. Project Overview

**What:** Personal portfolio site for a Product Designer targeting fintech, AI tools, and enterprise companies.

**Core goals:**
- Pass the 3-second test (who, what, proof)
- Pass the 10-second test (metrics, outcomes, strategic evidence)
- Demonstrate AI fluency through a built-in AI chat assistant
- Fast load times, strong SEO, smooth interactions

**Tech stack:**
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Typography:** Instrument Sans (Google Fonts) + JetBrains Mono (Google Fonts)
- **AI Chat:** Anthropic API (Claude Sonnet) via Next.js API route
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4 (GA4)

---

## 2. Design System

### Color Palette

```css
:root {
  /* Backgrounds */
  --color-page: #F8F8FA;
  --color-card: #FFFFFF;
  --color-surface: #EEEEF2;
  
  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #4B5066;
  --color-text-tertiary: #8B8FA3;
  
  /* Accent */
  --color-accent: #1D5CFF;
  --color-accent-hover: #1549D4;
  --color-accent-ghost: rgba(29, 92, 255, 0.06);
  --color-accent-ghost-border: rgba(29, 92, 255, 0.12);
  
  /* Metric / highlight */
  --color-metric: #F05E3B;
  --color-metric-ghost: rgba(240, 94, 59, 0.08);
  
  /* Borders */
  --color-border-subtle: rgba(0, 0, 0, 0.06);
  --color-border-default: rgba(0, 0, 0, 0.10);
  --color-border-hover: rgba(0, 0, 0, 0.16);
  
  /* Misc */
  --color-ai-glow: rgba(29, 92, 255, 0.35);
}
```

### Typography

```css
/* Primary: Instrument Sans */
/* Mono: JetBrains Mono */

/* Scale */
--type-hero: 42px / 1.1 / 700 weight (Instrument Sans)
--type-h2: 28px / 1.2 / 600 weight
--type-h3: 20px / 1.3 / 600 weight
--type-body: 16px / 1.6 / 400 weight
--type-small: 14px / 1.5 / 400 weight
--type-caption: 12px / 1.4 / 400 weight

/* Mono usage (JetBrains Mono) */
--type-mono-label: 11px / 500 weight / 0.08em letter-spacing / uppercase
--type-mono-metric: 32px / 600 weight
--type-mono-inline: 13px / 400 weight
```

### Spacing & Layout

```
- Page max-width: 1200px, centered
- Side nav width: 280px (desktop)
- Main content area: remaining width
- Section padding: 80px vertical
- Card padding: 24px
- Card border-radius: 12px
- Button border-radius: 8px
- Standard gap: 16px (cards: 20px)
```

### Animation Specs

All animations use `ease-out` timing unless noted.

```
- Fade-up on scroll: translateY(20px) → 0, opacity 0 → 1, 600ms, staggered 100ms per element
- Hero text stagger: Each line fades up with 150ms delay between lines
- Metric count-up: Numbers animate from 0 to final value over 800ms when scrolled into view (use Intersection Observer)
- Card hover: translateY(-2px), box-shadow increase, border-color transition to --color-border-hover, 200ms
- Nav link hover: color transition to --color-accent, 150ms
- AI chat expand: height auto-transition with 300ms ease-in-out
- Page transitions: Fade between routes, 200ms
- Smooth scroll: CSS scroll-behavior: smooth on html
```

---

## 3. Page Structure

### 3.1 Layout Shell

```
┌─────────────────────────────────────────────┐
│ SIDE NAV (fixed, left)   │  MAIN CONTENT    │
│                          │  (scrollable)     │
│ ┌──────────────────────┐ │                   │
│ │ Name / Title         │ │  [Hero]           │
│ │                      │ │                   │
│ │ ● AI assistant online│ │  [Selected Work]  │
│ │   Ask me anything... │ │                   │
│ │   [expandable chat]  │ │  [About]          │
│ │                      │ │                   │
│ │ ─────────────────    │ │  [Footer]         │
│ │ Work                 │ │                   │
│ │ About                │ │                   │
│ │ ─────────────────    │ │                   │
│ │ LinkedIn ↗           │ │                   │
│ │ Resume ↓             │ │                   │
│ │ Personal Projects ↗  │ │                   │
│ └──────────────────────┘ │                   │
└─────────────────────────────────────────────┘
```

**Desktop (≥1024px):** Side nav fixed left, 280px wide. Main content fills remaining space.

**Tablet (768-1023px):** Side nav collapses. Horizontal sticky nav at top with hamburger for full menu. AI chat becomes floating button → modal.

**Mobile (<768px):** Horizontal sticky nav at top (compact). AI chat floating button bottom-right → bottom sheet modal.

### 3.2 Side Nav (Desktop)

**Structure (top to bottom):**

1. **Identity block:**
   - Name: "Damean Rittmann" (16px, 600 weight, --color-text-primary)
   - Title: "PRODUCT DESIGNER" (mono, 11px, uppercase, --color-text-secondary)

2. **AI Chat trigger (below identity, separated by 20px):**
   - Collapsed state: Row with pulsing blue dot (8px, with box-shadow glow) + "AI assistant online" in mono (12px, --color-accent)
   - Below that: Input field with placeholder "Ask me anything..." (subtle border, --color-surface background)
   - On click/focus of input: Chat expands below with message history area (own scroll, max-height ~400px) and input stays at bottom
   - Expanded state: Messages area + input. Close button (X) top-right of expanded area to collapse back.

3. **Divider** (1px, --color-border-subtle)

4. **Anchor links:**
   - Work (scrolls to Selected Work section)
   - About (scrolls to About section)
   - Active state: --color-accent text + small left border indicator (2px, --color-accent)

5. **Divider** (1px, --color-border-subtle)

6. **External links:**
   - LinkedIn (with ↗ icon, opens new tab)
   - Resume (with ↓ icon, triggers PDF download)
   - Personal Projects (with → icon, navigates to /personal-projects)

**Nav behavior:**
- Fixed position, full viewport height
- Background: --color-card with right border (--color-border-subtle)
- Subtle padding: 32px all sides
- Links use 14px, 400 weight. Hover: color transitions to --color-accent

### 3.3 Homepage — Hero Section

**Layout:**
```
[Value proposition — large, bold]
[Subtitle — name + role, secondary]
[Metrics row — mono, red-orange]
[CTA buttons row]
```

**Content:**
- **Value prop (hero text):** "I simplify high-stakes complexity and accelerate the teams building it."
  - 42px, 700 weight, --color-text-primary
  - Max-width: 680px
  - Staggered fade-up animation on load

- **Name + role (above or below value prop):**
  - "Damean Rittmann · Product Designer"
  - 14px or 16px, 500 weight, --color-text-secondary
  - Positioned ABOVE the value prop as a label line

- **Metrics row:**
  - "85% faster · 50% fewer errors · $500M+ platform"
  - JetBrains Mono, 13px, 500 weight, --color-metric
  - Dots (·) in --color-text-tertiary
  - Numbers count up when page loads (animation)

- **CTA buttons:**
  - Primary: "View Work" → scrolls to Selected Work
    - Background: --color-accent, text: white, padding: 12px 24px, border-radius: 8px
    - Hover: --color-accent-hover
  - Secondary: "Download Resume" → PDF download
    - Border: 1px --color-border-default, text: --color-text-primary, transparent background
    - Hover: background --color-surface

**Spacing:** Hero section has generous top padding (120px from top of content area, 80px bottom).

### 3.4 Homepage — Selected Work Section

**Section header:**
- "Selected Work" — 12px mono, uppercase, --color-text-secondary, letter-spacing 0.08em
- OR no header at all — the case studies speak for themselves. Decide during build.

**Card grid:** 
- All 5 cards equal size
- Desktop: 2 columns, with the 5th card spanning full width or sitting alone left-aligned (NOT centered alone — that looks unbalanced)
- Tablet: 2 columns
- Mobile: 1 column, stacked

**Case study card structure:**
```
┌─────────────────────────────────────┐
│ [Image area — 16:10 aspect ratio]   │
│                                     │
├─────────────────────────────────────┤
│ CASE STUDY (mono label, accent)     │
│ Project Title (h3, primary text)    │
│ One-line description (secondary)    │
│                                     │
│ 85%  (large mono metric, red-orange)│
│ faster payment completion (caption) │
└─────────────────────────────────────┘
```

**Card styling:**
- Background: --color-card
- Border: 1px --color-border-subtle
- Border-radius: 12px
- Overflow: hidden (for image)
- Hover: translateY(-2px), shadow increase, border-color → --color-border-hover
- Entire card is clickable → navigates to /case-study/[slug]
- Transition: all 200ms ease-out

**Case study order and data:**

| # | Title | Subtitle | Metric | Metric label |
|---|-------|----------|--------|--------------|
| 1 | Customer Financial Hub | Payment flow redesign for $500M+ platform | 85% | Faster payment completion |
| 2 | Agriculture Workflow Optimization | Cross-squad design leadership for 10,000+ users | 60% | Faster order creation |
| 3 | Interactive Design System Onboarding | Pioneered org-wide interactive training resource | 10 | Designers onboarded across org |
| 4 | Collectiviz | Alumni career data visualization for CTD program | — | Full-stack web application |
| 5 | OnTask | Research-driven productivity app for students | — | End-to-end product design |

For cards 4 and 5 without strong metrics, use a descriptive tag instead of a number.

### 3.5 Homepage — About Section

**Layout:** Single column, max-width 640px.

**Content blocks:**

1. **Section label:** "About" (mono, 12px, uppercase, --color-text-secondary)

2. **Brand statement (2-3 sentences):**
   "I design complex tools that amplify human capability. At Nutrien, I transformed high-stakes financial workflows — reducing payment times by 85%, cutting errors by 50%, and scaling platforms from zero to thousands of users. I accelerate teams through AI-augmented workflows, scalable design systems, and hands-on mentorship."
   - 16px body text, --color-text-primary

3. **Compact experience block:**
   ```
   Nutrien Ag Solutions · UX Designer · 2021–2025
   University of Colorado Boulder · BS Creative Technology Design · 2017–2021
   ```
   - 14px, --color-text-secondary
   - Minimal — no bullet points, just two clean lines

4. **Values or differentiators (optional — could be 3 short items):**
   - Could be 3 inline items: "Complex systems · Team acceleration · AI-augmented workflows"
   - Mono, small, --color-text-tertiary
   - Only include if it doesn't feel redundant with the brand statement

### 3.6 Homepage — Footer

**Minimal:**
- "© 2026 Damean Rittmann"
- Small row: Email link | LinkedIn link | Resume download
- --color-text-tertiary, 13px
- Top border: 1px --color-border-subtle
- Padding: 40px vertical

---

## 4. Case Study Pages

**Route:** /case-study/[slug]

**Layout:** Full-width main content (no side nav on case study pages — OR keep side nav but simplified with just a back arrow and project title). Decide during build, but I'd recommend keeping the side nav for consistency with a "← Back to work" link at the top.

### Case Study Page Structure

```
[Back link: ← Back to work]

[Hero block]
  - Project title (h1, 36px, 700 weight)
  - One-line subtitle (16px, --color-text-secondary)
  - Metrics row: Key outcomes in mono/metric color (same treatment as homepage hero)
  - Hero image (full-width, max-height 480px, object-fit cover, border-radius 12px)

[Content sections — alternating]
  Each section:
  - Section label (mono, uppercase, accent color): "DISCOVERY" / "THE INSIGHT" / "THE APPROACH" / "THE SOLUTION" / "THE IMPACT" / "REFLECTION"
  - Section heading (h2)
  - Body text (16px, max-width 680px for readability)
  - Images inline where relevant (border-radius 8px, subtle border)

[Bottom navigation]
  - Previous / Next case study links
  - Full-width, card-style, with project title and metric preview
```

**Content mapping per case study:**

The case study content already exists in the project files. Each follows roughly: Discovery → Insight → Approach → Solution → Impact → Reflection. Map existing content to these sections. Keep the writing as-is but ensure metrics are called out prominently (potentially in callout blocks with larger mono text).

**Metric callout block (inline within case study):**
```
┌──────────────────────────────────┐
│  85%                             │
│  reduction in payment time       │
│  (6 min → 55 sec)               │
└──────────────────────────────────┘
```
- Background: --color-metric-ghost
- Metric number: --type-mono-metric, --color-metric
- Label: 14px, --color-text-secondary
- Border-left: 3px --color-metric
- Padding: 20px 24px
- Border-radius: 8px

---

## 5. Personal Projects Page

**Route:** /personal-projects

**Layout:** Same shell as homepage (side nav + main content).

**Structure:**
- Page title: "Personal Projects" (h1)
- Subtitle: "Explorations, side projects, and things I'm learning" (--color-text-secondary)
- Grid of compact project cards (2 columns desktop, 1 mobile)

**Project card (compact):**
```
┌─────────────────────────────────┐
│ [Small image or icon area]      │
│ Project Name (h3)               │
│ Brief description (2 lines max) │
│ Tag: "Crypto UX" / "Figma Make" │
└─────────────────────────────────┘
```

- Cards can link externally or to detail pages (decide per project)
- Initial projects: Crypto app, Glow (Figma Makeathon)
- Room to add more over time

---

## 6. AI Chat System

### Architecture

```
User (browser) → Next.js API route (/api/chat) → Anthropic API → Response back
```

### API Route (/api/chat/route.ts)

```typescript
// Pseudocode structure
export async function POST(req) {
  const { messages, sessionId } = await req.json()
  
  // Rate limiting: check session, max 5 messages
  // If over limit, return friendly message
  
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    system: SYSTEM_PROMPT, // See below
    messages: messages
  })
  
  return response
}
```

### System Prompt (for the AI assistant)

```
You are Damean Rittmann's portfolio AI assistant. You answer questions about Damean's work, experience, skills, and design approach. You speak in first person as if you are representing Damean.

Key facts:
- Product Designer with 4+ years of experience at Nutrien Ag Solutions
- Reduced payment completion time by 85% (6 min → 55 sec)
- Reduced payment errors by 50% on a $500M+ annual payment platform
- Scaled digital hub from 0 to 2,000+ users with 90%+ satisfaction
- Reduced order creation time by 60%, doubled transaction volume
- Led design across 4 product squads
- Built 20+ design system components
- Created org's first interactive design system onboarding
- Mentored 2 designers (one promoted within 2 years)
- Designated as team's AI subject-matter expert
- BS in Creative Technology Design, Minor in CS, CU Boulder (Cum Laude)
- Skilled in Figma, Miro, design systems, user research, AI workflow integration
- Values: collaborative problem-solving, continuous learning, getting out of comfort zone

Tone: Confident, direct, warm, energetic. Never stiff or corporate. Answer concisely (2-4 sentences max unless asked for detail). If asked something you don't know about Damean, say so honestly and suggest they reach out directly.

Do NOT make up information. Only share what's provided here.
```

### Chat UI Specs

**Collapsed state (in side nav):**
- Pulsing blue dot (CSS animation, 2s loop, subtle opacity pulse)
- "AI assistant online" text in mono, --color-accent
- Input field: "Ask me anything..." placeholder
- On focus → expands

**Expanded state:**
- Messages area: max-height 400px, overflow-y auto, custom scrollbar (thin, --color-border-subtle)
- User messages: right-aligned, --color-accent background, white text, border-radius 12px 12px 0 12px
- AI messages: left-aligned, --color-surface background, --color-text-primary, border-radius 12px 12px 12px 0
- Typing indicator: 3 dots animation while waiting for response
- Input area: sticky at bottom of chat, border-top 1px --color-border-subtle
- Send button: --color-accent icon, only visible when input has text
- Close (X) button: top-right corner of expanded chat area
- "Message [count]/5" indicator: subtle counter in --color-text-tertiary, 11px, bottom-right of input area

**Mobile chat:**
- Floating button: 48px circle, --color-accent, bottom-right, 20px from edges
- Small blue pulse animation around it
- Opens bottom sheet: 85vh height, same message UI, drag handle at top to dismiss
- Same 5-message limit

### Rate Limiting

- Track via localStorage: sessionId + message count
- After 5 messages, replace input with: "You've used all 5 messages. Want to learn more? Email me at dameanrittmann@gmail.com"
- Reset on new session (new browser visit after closing tab)

---

## 7. SEO & Performance

### Meta Tags (per page)

**Homepage:**
```html
<title>Damean Rittmann — Product Designer</title>
<meta name="description" content="Product Designer specializing in complex, high-stakes systems. Reduced payment times by 85%, errors by 50%. Currently seeking product design roles in fintech and AI.">
<meta property="og:title" content="Damean Rittmann — Product Designer">
<meta property="og:description" content="I simplify high-stakes complexity and accelerate the teams building it.">
<meta property="og:image" content="/og-image.png">
<meta property="og:type" content="website">
```

**Case study pages:** Dynamic meta from case study data.

### Performance Targets

- Lighthouse Performance: 95+
- First Contentful Paint: <1.2s
- Largest Contentful Paint: <2.0s
- Cumulative Layout Shift: <0.05
- Use Next.js Image component for all images (automatic optimization)
- Font loading: `display=swap` on Google Fonts
- Static generation (SSG) for all pages except API route

### OG Image

- Create a simple OG image (1200x630) with: Name, title, and key metric on the palette background
- Important for LinkedIn shares — this is how your posts look when you share portfolio links

---

## 8. File Structure

```
/portfolio
├── app/
│   ├── layout.tsx          (root layout with nav shell)
│   ├── page.tsx            (homepage)
│   ├── case-study/
│   │   └── [slug]/
│   │       └── page.tsx    (case study template)
│   ├── personal-projects/
│   │   └── page.tsx
│   └── api/
│       └── chat/
│           └── route.ts    (Anthropic API proxy)
├── components/
│   ├── SideNav.tsx
│   ├── MobileNav.tsx
│   ├── AiChat.tsx
│   ├── CaseStudyCard.tsx
│   ├── MetricCallout.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Footer.tsx
│   ├── ScrollFadeIn.tsx    (intersection observer wrapper)
│   └── CountUp.tsx         (metric count animation)
├── data/
│   ├── case-studies.ts     (all case study content + metadata)
│   └── personal-projects.ts
├── public/
│   ├── images/
│   │   ├── case-studies/   (case study images)
│   │   └── projects/       (personal project images)
│   ├── DameanRittmann_Resume.pdf
│   └── og-image.png
├── styles/
│   └── globals.css         (Tailwind + custom properties)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 9. Build Order

1. **Scaffold:** Next.js project, Tailwind config with custom palette, fonts loaded
2. **Layout shell:** Side nav + main content area, responsive breakpoints
3. **Homepage hero:** Text, metrics with count-up, CTAs
4. **Case study cards:** Grid, card component, hover animations
5. **About section + footer**
6. **Scroll animations:** Fade-up with Intersection Observer
7. **Case study pages:** Template, content from data file, metric callouts, prev/next nav
8. **Personal projects page:** Simple grid
9. **AI chat:** API route, chat UI in side nav, mobile floating button + bottom sheet
10. **Polish:** Page transitions, OG images, meta tags, GA4 setup, Lighthouse audit
11. **Deploy:** Vercel

---

## 10. Content to Prepare (Damean's tasks)

Before or during build, you'll need:

- [ ] Case study hero images (1-2 per project, high-res, ideally 16:10 or similar)
- [ ] Inline case study images (screenshots, flows, wireframes — as many as you have)
- [ ] Personal project images/screenshots (Crypto app, Glow)
- [ ] Resume PDF (current version)
- [ ] OG image (can create during build)
- [ ] Anthropic API key (for chat feature)
- [ ] GA4 measurement ID
- [ ] Domain setup (if migrating from dameanrittmann.com)
- [ ] Finalize hero copy (using Option D as placeholder for now)
- [ ] Finalize About section copy

---

*This spec is designed to be handed directly to Claude Code for implementation. Each section contains enough detail to build without ambiguity while leaving room for design judgment on spacing and micro-interactions.*
