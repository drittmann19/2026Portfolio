import { getCaseStudy } from "@/data/case-studies";

export interface Bullet {
  title: string;
  body: string;
}

export interface WorkLink {
  /** The case study name exactly as returned by the model. */
  name: string;
  /** One-sentence relevance the model wrote for this JD. */
  relevance: string;
  /** Display title from live case-study data (falls back to name). */
  title: string;
  /** Route to the case study, or null if the name didn't map (render as plain text). */
  url: string | null;
}

export interface Evaluation {
  summary: string;
  alignments: Bullet[]; // 0-4
  gaps: Bullet[]; // usually 2
  work: WorkLink | null; // exactly 1, or null if missing/unmapped
}

export type ParseResult =
  | { kind: "evaluation"; evaluation: Evaluation }
  | { kind: "not_job_description"; message: string }
  | { kind: "unparseable"; raw: string };

// The system prompt recommends exactly ONE case study, always by one of these
// exact names. Bridge each to the real on-site slug; the display title is pulled
// from live case-study data so there's a single source of truth.
const PROMPT_NAME_TO_SLUG: Record<string, string> = {
  "Customer Financial Management Hub": "customer-financial-hub",
  "Agriculture Workflow Optimization": "agriculture-workflow-optimization",
  "Interactive Design System Onboarding": "design-system-onboarding",
};

const SLUG_BY_NORMALIZED_NAME = new Map<string, string>(
  Object.entries(PROMPT_NAME_TO_SLUG).map(([name, slug]) => [normalizeName(name), slug]),
);

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

export function resolveWorkLink(name: string, relevance: string): WorkLink {
  const slug = SLUG_BY_NORMALIZED_NAME.get(normalizeName(name));
  if (!slug) {
    return { name, relevance, title: name, url: null };
  }
  const study = getCaseStudy(slug);
  return {
    name,
    relevance,
    title: study?.title ?? name,
    url: `/case-study/${slug}`,
  };
}

/** Split markdown into a map of `## Header` → the lines beneath it. */
function splitSections(markdown: string): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  let current: string | null = null;
  for (const rawLine of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const headerMatch = rawLine.match(/^\s*##\s+(.+?)\s*$/);
    if (headerMatch) {
      current = headerMatch[1].toLowerCase();
      sections.set(current, []);
      continue;
    }
    if (current) sections.get(current)!.push(rawLine);
  }
  return sections;
}

/** Parse `- **Title** → Body` bullets, tolerating multi-line bodies. */
function parseBullets(lines: string[] | undefined): Bullet[] {
  if (!lines) return [];
  const bullets: Bullet[] = [];
  let buffer: string | null = null;

  const flush = () => {
    if (buffer === null) return;
    const text = buffer.trim();
    buffer = null;
    if (!text) return;
    const match = text.match(/^\*\*(.+?)\*\*\s*(?:→|->|:)?\s*([\s\S]*)$/);
    if (match) {
      bullets.push({ title: match[1].trim(), body: match[2].trim() });
    } else {
      bullets.push({ title: text, body: "" });
    }
  };

  for (const line of lines) {
    const bulletStart = line.match(/^\s*[-*]\s+(.*)$/);
    if (bulletStart) {
      flush();
      buffer = bulletStart[1];
    } else if (buffer !== null && line.trim()) {
      buffer += " " + line.trim();
    }
  }
  flush();
  return bullets;
}

export function parseEvaluation(markdown: string): ParseResult {
  const trimmed = markdown.trim();
  const sections = splitSections(trimmed);

  // No section headers at all → the model returned the plain "not a JD" line
  // (or some other unstructured text). Surface it as a message verbatim.
  if (sections.size === 0) {
    return { kind: "not_job_description", message: trimmed };
  }

  const summaryLines = sections.get("summary") ?? [];
  const summary = summaryLines
    .map((l) => l.trim())
    .filter(Boolean)
    .join(" ")
    .trim();

  const alignments = parseBullets(sections.get("strong alignment"));
  const gaps = parseBullets(sections.get("honest gaps"));

  const workBullets = parseBullets(sections.get("most relevant work"));
  const work = workBullets[0]
    ? resolveWorkLink(workBullets[0].title, workBullets[0].body)
    : null;

  // If we found headers but extracted nothing usable, fall back to raw.
  if (!summary && alignments.length === 0 && gaps.length === 0 && !work) {
    return { kind: "unparseable", raw: trimmed };
  }

  return { kind: "evaluation", evaluation: { summary, alignments, gaps, work } };
}
