"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { parseEvaluation, type ParseResult } from "./fitCheckParser";

const MAX_JD_CHARS = 8000;
const LINKEDIN_URL = "https://www.linkedin.com/in/damean-rittmann/";

// ─── LOCAL PREVIEW DEMO (off by default) ─────────────────────────
// Flip DEMO to true to seed a sample analysis and preview the results
// UI without an API key. MUST stay false on commit so visitors see the
// real idle input, not this canned evaluation.
const DEMO = false;
const DEMO_MARKDOWN = `
## Summary
Strong fit. Damean has spent years designing high-stakes financial workflows where trust and accuracy are non-negotiable — exactly the problem space this role centers on.

## Strong alignment
- **High-stakes fintech workflows** → Led design on a $500M+ payments platform, cutting execution time 60% and errors in half — directly relevant to trustworthy financial UX.
- **Cross-functional leadership** → Partners with PMs and engineers from discovery through ship, the collaboration model this role expects.
- **Design systems** → Built and scaled a component system that kept a multi-platform product consistent as the team grew.
- **Complex, expert users** → Designs for users who notice the moment you get it wrong, balancing density with clarity.

## Honest gaps
- **Consumer-scale fintech** → Most depth is in B2B and enterprise; experience with high-volume consumer banking flows is lighter.
- **Native mobile** → Strongest on responsive and cross-platform web; less hands-on with platform-specific iOS / Android patterns.

## Most relevant work
- **Customer Financial Management Hub** → A payments platform rebuild that shows how Damean designs trust into financial workflows under real regulatory and accuracy constraints.
`;
// ─────────────────────────────────────────────────────────────────

type Status = "idle" | "streaming" | "done" | "error" | "disabled" | "ratelimited";

// While streaming we only parse complete lines, so a half-written bullet never
// flashes raw markdown (e.g. "- **Titl…"). Once the stream ends, parse it all.
function parseStreamable(raw: string, done: boolean): ParseResult {
  if (done) return parseEvaluation(raw);
  const lastNewline = raw.lastIndexOf("\n");
  return parseEvaluation(lastNewline >= 0 ? raw.slice(0, lastNewline) : "");
}

export default function FitCheck() {
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState<Status>(DEMO ? "done" : "idle");
  const [streamText, setStreamText] = useState(DEMO ? DEMO_MARKDOWN : "");
  const [streamDone, setStreamDone] = useState(DEMO);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(
    () => (streamText ? parseStreamable(streamText, streamDone) : null),
    [streamText, streamDone],
  );

  const overLimit = jd.length > MAX_JD_CHARS;
  const canSubmit = jd.trim().length > 0 && !overLimit && status !== "streaming";
  // As soon as a structured evaluation starts arriving, swap the input out.
  const hideInput =
    (status === "streaming" || status === "done") && result?.kind === "evaluation";

  async function evaluate() {
    if (!canSubmit) return;
    setStatus("streaming");
    setStreamText("");
    setStreamDone(false);
    setMessage("");

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}) as Record<string, unknown>);
        const error = typeof data.error === "string" ? data.error : "";
        if (res.status === 503 && data.disabled) {
          setMessage(error || "The fit check is temporarily unavailable.");
          setStatus("disabled");
        } else if (res.status === 429) {
          setMessage(error || "You've reached the daily limit. Try again tomorrow.");
          setStatus("ratelimited");
        } else {
          setMessage(error || "Something went wrong. Please try again.");
          setStatus("error");
        }
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let scrolled = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreamText(acc);
        if (!scrolled) {
          scrolled = true;
          requestAnimationFrame(() =>
            resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
          );
        }
      }
      acc += decoder.decode();
      setStreamText(acc);
      setStreamDone(true);
      setStatus("done");
    } catch {
      setMessage("Couldn't reach the evaluator. Check your connection and try again.");
      setStatus("error");
    }
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setJd(String(reader.result ?? "").slice(0, MAX_JD_CHARS + 1));
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      evaluate();
    }
  }

  return (
    <section id="fit-check" className="fitcheck">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="wrap">
        <header className="sec-head" data-reveal>
          <p className="eyebrow mono">fig. 05 · fit check</p>
          <h2>
            Fit <em>check</em>.
          </h2>
          <p className="sec-sub">
            Paste a job description for an honest read on the match. You&apos;ll see where my
            experience lines up, where it falls short, and the case study most relevant to the role.
          </p>
        </header>

        {!hideInput && (
          <div data-reveal>
            <div className="fc-card">
              <p className="fc-head mono">Input / Job description</p>
              <textarea
                className="fc-textarea"
                placeholder="Paste the job description here…"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Job description"
              />
              <div className="fc-bar">
                <button
                  type="button"
                  className="fc-upload mono"
                  onClick={() => fileInputRef.current?.click()}
                >
                  ↑ Upload a file
                </button>
                <span className={`fc-count mono${overLimit ? " fc-count-over" : ""}`}>
                  {jd.length.toLocaleString()} / {MAX_JD_CHARS.toLocaleString()}
                </span>
                <button
                  type="button"
                  className="fc-go"
                  onClick={evaluate}
                  disabled={!canSubmit}
                  title="⌘ + Enter to evaluate"
                >
                  {status === "streaming" ? "Evaluating…" : "Evaluate fit"}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,text/plain"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
            </div>
            {overLimit && (
              <p className="fc-overlimit">
                That&apos;s {jd.length.toLocaleString()} characters. Trim it to under{" "}
                {MAX_JD_CHARS.toLocaleString()} to evaluate.
              </p>
            )}
          </div>
        )}

        <div ref={resultRef}>
          {(status === "streaming" || status === "done") &&
            (result?.kind === "evaluation" || (status === "done" && result) ? (
              <Analysis result={result!} streaming={status === "streaming"} />
            ) : (
              <LoadingBlock />
            ))}

          {(status === "disabled" || status === "ratelimited" || status === "error") && (
            <NoticeBlock status={status} message={message} />
          )}
        </div>
      </div>
    </section>
  );
}

function LoadingBlock() {
  return (
    <div className="fc-loading" role="status" aria-live="polite">
      <span className="fc-pulse" aria-hidden="true" />
      Reading the role and matching it to Damean&apos;s experience…
    </div>
  );
}

function NoticeBlock({ status, message }: { status: Status; message: string }) {
  const showContact = status === "disabled" || status === "ratelimited";
  return (
    <div className={`fc-notice${status === "error" ? " fc-notice-error" : ""}`} role="alert">
      <p>{message}</p>
      {showContact && (
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="fc-notice-link">
          Reach out to Damean on LinkedIn →
        </a>
      )}
    </div>
  );
}

function Caret() {
  return <span className="fc-caret" aria-hidden="true" />;
}

// Reveals words up to `target`, which grows as the model streams its answer.
// The reveal never outruns what's been generated, so its pace tracks the live
// response; when generation pauses the caret simply waits. The catch-up rate is
// capped so a fast burst still reads as writing rather than a hard cut. Stops
// once the stream is complete and everything is shown.
function useRevealStream(target: number, streamComplete: boolean, enabled: boolean) {
  const [revealed, setRevealed] = useState(0);
  const targetRef = useRef(target);
  targetRef.current = target;
  const completeRef = useRef(streamComplete);
  completeRef.current = streamComplete;

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let current = 0;
    let last = performance.now();
    const MAX_WPS = 90;
    const step = (now: number) => {
      current = Math.min(targetRef.current, current + ((now - last) / 1000) * MAX_WPS);
      last = now;
      setRevealed(Math.floor(current));
      const finished = completeRef.current && current >= targetRef.current;
      if (!finished) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  // Reduced motion: skip the animation, just show whatever has been generated.
  useEffect(() => {
    if (!enabled) setRevealed(target);
  }, [enabled, target]);

  return revealed;
}

interface Seg {
  text: string;
  start: number;
  count: number;
}

function Analysis({ result, streaming }: { result: ParseResult; streaming: boolean }) {
  const evaluation = result.kind === "evaluation" ? result.evaluation : null;

  const motion = useMemo(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const stream = useMemo(() => {
    let cursor = 0;
    const reg = (text: string): Seg => {
      const clean = text.trim();
      const count = clean ? clean.split(/\s+/).length : 0;
      const seg = { text: clean, start: cursor, count };
      cursor += count;
      return seg;
    };
    if (!evaluation) {
      return { summary: null, align: null, gap: null, total: 0 } as const;
    }
    const summary = evaluation.summary ? reg(evaluation.summary) : null;
    const align = evaluation.alignments.length
      ? {
          label: reg("Strong alignment"),
          items: evaluation.alignments.map((a) => ({
            title: reg(a.title),
            body: a.body ? reg(a.body) : null,
          })),
        }
      : null;
    const gap = evaluation.gaps.length
      ? {
          label: reg("Honest gaps"),
          items: evaluation.gaps.map((g) => ({
            title: reg(g.title),
            body: g.body ? reg(g.body) : null,
          })),
        }
      : null;
    return { summary, align, gap, total: cursor };
  }, [evaluation]);

  const streamComplete = !streaming;
  const revealed = useRevealStream(stream.total, streamComplete, motion);
  const textRevealed = stream.total > 0 && revealed >= stream.total;
  const done = textRevealed && streamComplete;

  const [caretGone, setCaretGone] = useState(false);
  useEffect(() => {
    if (!motion) {
      setCaretGone(true);
      return;
    }
    if (done) {
      const t = setTimeout(() => setCaretGone(true), 1200);
      return () => clearTimeout(t);
    }
    setCaretGone(false);
  }, [motion, done]);

  if (result.kind === "not_job_description") {
    return (
      <div className="fc-notice" role="status">
        <p>{result.message}</p>
      </div>
    );
  }

  if (result.kind === "unparseable") {
    return (
      <div className="fc-analysis">
        <pre className="fc-raw">{result.raw}</pre>
      </div>
    );
  }

  if (!evaluation) return null;

  const shown = (seg: Seg | null) => {
    if (!seg || seg.count === 0) return "";
    const n = Math.max(0, Math.min(seg.count, revealed - seg.start));
    return seg.text.split(/\s+/).slice(0, n).join(" ");
  };
  const started = (seg: Seg | null) => !!seg && revealed > seg.start;
  const caret = (seg: Seg | null) =>
    !caretGone && !!seg && seg.start < revealed && revealed <= seg.start + seg.count;

  const work = evaluation.work;

  return (
    <div className="fc-analysis" role="region" aria-label="Fit evaluation" aria-busy={!done}>
      {started(stream.summary) && (
        <p className="fc-summary">
          {shown(stream.summary)}
          {caret(stream.summary) && <Caret />}
        </p>
      )}

      {stream.align && started(stream.align.label) && (
        <div className="fc-group">
          <p className="fc-collabel">
            {shown(stream.align.label)}
            {caret(stream.align.label) && <Caret />}
          </p>
          {stream.align.items.map((it, i) =>
            started(it.title) ? (
              <div className="fc-item" key={i}>
                <span className="fc-marker fc-marker-align" aria-hidden="true" />
                <div>
                  <h3 className="fc-item-title">
                    {shown(it.title)}
                    {caret(it.title) && <Caret />}
                  </h3>
                  {it.body && started(it.body) && (
                    <p className="fc-item-body">
                      {shown(it.body)}
                      {caret(it.body) && <Caret />}
                    </p>
                  )}
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}

      {stream.gap && started(stream.gap.label) && (
        <div className="fc-group">
          <p className="fc-collabel">
            {shown(stream.gap.label)}
            {caret(stream.gap.label) && <Caret />}
          </p>
          {stream.gap.items.map((it, i) =>
            started(it.title) ? (
              <div className="fc-item" key={i}>
                <span className="fc-marker fc-marker-gap" aria-hidden="true" />
                <div>
                  <h3 className="fc-item-title">
                    {shown(it.title)}
                    {caret(it.title) && <Caret />}
                  </h3>
                  {it.body && started(it.body) && (
                    <p className="fc-item-body">
                      {shown(it.body)}
                      {caret(it.body) && <Caret />}
                    </p>
                  )}
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}

      {done && work && (
        <div className="fc-group fc-work fc-work-reveal">
          <p className="fc-collabel">Most relevant work</p>
          {work.url ? (
            <Link href={work.url} className="fc-work-link">
              <strong className="fc-work-title">{work.title}</strong>
              {work.relevance && <span className="fc-work-rel">{work.relevance}</span>}
            </Link>
          ) : (
            <div className="fc-work-link fc-work-static">
              <strong className="fc-work-title fc-work-title-static">{work.title}</strong>
              {work.relevance && <span className="fc-work-rel">{work.relevance}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const CSS = `
.fitcheck { border-top: 1px solid var(--line-soft); }

/* Fit Check header + input span the full content width */
.fitcheck .sec-head { max-width: none; }
.fitcheck .sec-sub { max-width: none; }

.fc-card {
  position: relative;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.fc-card:focus-within {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(39, 51, 232, 0.12);
}
.fc-head {
  color: var(--ink-50);
  font-size: 10px;
  padding: 22px 20px 0;
}
.fc-textarea {
  display: block;
  width: 100%;
  min-height: 160px;
  border: 0;
  outline: 0;
  resize: vertical;
  background: transparent;
  color: var(--ink);
  font-family: var(--font-body), sans-serif;
  font-size: 16px;
  line-height: 1.6;
  padding: 12px 20px 16px;
}
.fc-textarea::placeholder { color: var(--ink-50); }
.fc-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px 12px 20px;
  border-top: 1px dashed var(--line);
}
.fc-upload {
  margin-right: auto;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-70);
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s;
}
.fc-upload:hover { border-color: var(--blue); color: var(--ink); }
.fc-count {
  color: var(--ink-50);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.fc-count-over { color: var(--red); }
.fc-go {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: var(--ink);
  color: var(--paper);
  border: 0;
  border-radius: 999px;
  font-family: var(--font-body), sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s, transform 0.25s, opacity 0.25s;
}
.fc-go:hover:not(:disabled) { background: var(--blue); transform: translateY(-1px); }
.fc-go:active:not(:disabled) { transform: translateY(1px); }
.fc-go:disabled { opacity: 0.35; cursor: not-allowed; }
.fc-overlimit {
  font-size: 13px;
  color: var(--red);
  margin-top: 10px;
}

.fc-loading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: clamp(32px, 5vw, 48px);
  font-size: 16px;
  color: var(--ink-70);
}
.fc-pulse {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--blue);
  flex-shrink: 0;
  animation: fc-pulse 1.2s ease-in-out infinite;
}
@keyframes fc-pulse {
  0%, 100% { opacity: 0.25; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

.fc-notice {
  position: relative;
  border-left: 2px solid var(--blue);
  padding: 4px 0 4px 16px;
  margin-top: clamp(32px, 5vw, 48px);
  max-width: 720px;
}
.fc-notice p { font-size: 16px; color: var(--ink); line-height: 1.7; }
.fc-notice-error { border-left-color: var(--red); }
.fc-notice-link {
  display: inline-block;
  margin-top: 12px;
  font-weight: 600;
  font-size: 14px;
  color: var(--blue);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.fc-notice-link:hover { color: var(--blue-deep); }

/* results */
.fc-analysis { margin-top: clamp(36px, 6vh, 56px); }
.fc-summary {
  font-family: var(--font-display), "Georgia", serif;
  font-optical-sizing: auto;
  font-size: clamp(1.35rem, 2vw, 1.85rem);
  line-height: 1.35;
  letter-spacing: -0.01em;
  padding-bottom: clamp(20px, 3vh, 30px);
  border-bottom: 1px dashed var(--line);
  margin-bottom: clamp(26px, 4vh, 38px);
}
.fc-group { margin-bottom: clamp(32px, 5vh, 48px); }
.fc-group:last-child { margin-bottom: 0; }
.fc-collabel {
  font-family: var(--font-mono), monospace;
  font-size: 11.5px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 16px;
}
.fc-item {
  display: grid;
  grid-template-columns: 12px 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.fc-marker {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 6px;
  justify-self: start;
  animation: fc-pop 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.fc-marker-align { background: var(--blue); }
.fc-marker-gap { background: var(--red); }
.fc-caret {
  display: inline-block;
  width: 2px;
  height: 1.04em;
  margin-left: 2px;
  vertical-align: -0.16em;
  border-radius: 1px;
  background: var(--red);
  animation: fc-blink 1.05s steps(1, end) infinite;
}
@keyframes fc-blink {
  0%, 52% { opacity: 1; }
  52.01%, 100% { opacity: 0; }
}
@keyframes fc-pop {
  from { opacity: 0; transform: scale(0.2); }
  to { opacity: 1; transform: scale(1); }
}
.fc-item-title {
  font-family: var(--font-body), sans-serif;
  font-weight: 600;
  font-size: 16.5px;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 4px;
}
.fc-item-body {
  font-size: 15px;
  color: var(--ink-70);
  line-height: 1.55;
  max-width: 68ch;
}

.fc-work-reveal {
  animation: fc-fade-up 400ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes fc-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
.fc-work-link {
  display: block;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 18px 20px;
  text-decoration: none;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.fc-work-link:hover {
  transform: translateY(-2px);
  border-color: var(--blue);
  box-shadow: 0 18px 40px -22px rgba(23, 21, 15, 0.35);
}
.fc-work-static:hover { transform: none; border-color: var(--line); box-shadow: none; }
.fc-work-title {
  font-family: var(--font-display), "Georgia", serif;
  font-optical-sizing: auto;
  font-weight: 480;
  font-size: 1.3rem;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.fc-work-title::after { content: " ↗"; color: var(--blue); }
.fc-work-title-static::after { content: ""; }
.fc-work-rel {
  display: block;
  font-size: 14px;
  color: var(--ink-70);
  line-height: 1.55;
  margin-top: 6px;
}
.fc-raw {
  white-space: pre-wrap;
  font-family: var(--font-body), sans-serif;
  font-size: 15px;
  color: var(--ink);
  line-height: 1.6;
}

@media (max-width: 767px) {
  .fc-bar { flex-wrap: wrap; row-gap: 12px; }
  .fc-go { flex: 1 1 100%; width: 100%; justify-content: center; order: 3; }
}
@media (prefers-reduced-motion: reduce) {
  .fc-card, .fc-go, .fc-upload, .fc-pulse, .fc-work-link, .fc-marker, .fc-work-reveal { transition: none; animation: none; }
  .fc-caret { display: none; }
}
`;
