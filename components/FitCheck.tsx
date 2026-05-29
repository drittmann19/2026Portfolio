"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ScrollFadeIn from "./ScrollFadeIn";
import { parseEvaluation, type ParseResult } from "./fitCheckParser";

const MAX_JD_CHARS = 8000;
const LINKEDIN_URL = "https://www.linkedin.com/in/damean-rittmann/";

type Status = "idle" | "loading" | "done" | "error" | "disabled" | "ratelimited";

export default function FitCheck() {
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ParseResult | null>(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const overLimit = jd.length > MAX_JD_CHARS;
  const canSubmit = jd.trim().length > 0 && !overLimit && status !== "loading";

  async function evaluate() {
    if (!canSubmit) return;
    setStatus("loading");
    setResult(null);
    setMessage("");

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });
      const data = await res.json();

      if (res.ok) {
        setResult(parseEvaluation(data.markdown ?? ""));
        setStatus("done");
        requestAnimationFrame(() =>
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
        );
        return;
      }

      if (res.status === 503 && data.disabled) {
        setMessage(data.error ?? "");
        setStatus("disabled");
      } else if (res.status === 429) {
        setMessage(data.error ?? "You've reached the daily limit. Try again tomorrow.");
        setStatus("ratelimited");
      } else {
        setMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
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
    <section id="fit-check" className="fc-section">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <ScrollFadeIn>
        <p className="fc-kicker">For recruiters and hiring managers</p>
        <h2 className="fc-headline">
          See how I <span className="fc-blue">fit your role.</span>
        </h2>
        <p className="fc-sub">
          Paste a job description and get an honest read on the match. Strengths, gaps, and
          the work most worth your time.
        </p>
      </ScrollFadeIn>

      <ScrollFadeIn delay={80}>
        <div className="fc-field">
          <textarea
            className="fc-textarea"
            placeholder="Paste the job description here…"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Job description"
          />
          <div className="fc-actions">
            <button
              type="button"
              className="fc-upload"
              onClick={() => fileInputRef.current?.click()}
            >
              ↑ or upload a file
            </button>
            <button
              type="button"
              className="fc-go"
              onClick={evaluate}
              disabled={!canSubmit}
            >
              {status === "loading" ? "Evaluating…" : "Evaluate fit →"}
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
            That's {jd.length.toLocaleString()} characters. Trim it to under{" "}
            {MAX_JD_CHARS.toLocaleString()} to evaluate.
          </p>
        )}
      </ScrollFadeIn>

      <div ref={resultRef}>
        {status === "loading" && <LoadingBlock />}

        {(status === "disabled" || status === "ratelimited" || status === "error") && (
          <NoticeBlock status={status} message={message} />
        )}

        {status === "done" && result && <Analysis result={result} />}
      </div>
    </section>
  );
}

function LoadingBlock() {
  return (
    <div className="fc-loading" role="status" aria-live="polite">
      <span className="fc-pulse" aria-hidden="true" />
      Reading the role and matching it to Damean's experience…
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

function Analysis({ result }: { result: ParseResult }) {
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

  const { summary, alignments, gaps, work } = result.evaluation;

  return (
    <ScrollFadeIn>
      <div className="fc-analysis">
        {summary && <p className="fc-summary">{summary}</p>}

        <div className="fc-cols">
          {alignments.length > 0 && (
            <div>
              <p className="fc-collabel">Strong alignment</p>
              {alignments.map((a, i) => (
                <div className="fc-item" key={i}>
                  <span className="fc-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="fc-item-title">{a.title}</h3>
                    {a.body && <p className="fc-item-body">{a.body}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            {gaps.length > 0 && (
              <>
                <p className="fc-collabel">Honest gaps</p>
                {gaps.map((g, i) => (
                  <div className="fc-item" key={i}>
                    <span className="fc-gap-marker" aria-hidden="true" />
                    <div>
                      <h3 className="fc-item-title">{g.title}</h3>
                      {g.body && <p className="fc-item-body">{g.body}</p>}
                    </div>
                  </div>
                ))}
              </>
            )}

            {work && (
              <div className="fc-work">
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
        </div>
      </div>
    </ScrollFadeIn>
  );
}

const CSS = `
.fc-section {
  padding-top: clamp(64px, 14vw, 112px);
  padding-bottom: clamp(64px, 14vw, 112px);
  border-top: 1px solid var(--color-border-subtle);
}
.fc-kicker {
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 12px;
}
.fc-headline {
  font-family: var(--font-gasoek);
  font-size: clamp(28px, 5vw, 42px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  max-width: 16ch;
  margin-bottom: 16px;
}
.fc-blue { color: var(--color-accent); }
.fc-sub {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 54ch;
  margin-bottom: clamp(24px, 4vw, 32px);
}
.fc-field {
  background: var(--color-card);
  border: 1px solid var(--color-border-default);
  border-radius: 14px;
  padding: 18px;
  max-width: 720px;
}
.fc-textarea {
  width: 100%;
  min-height: 132px;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  color: var(--color-text-primary);
  font-family: var(--font-dm-sans), sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
.fc-textarea::placeholder { color: var(--color-text-tertiary); }
.fc-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}
.fc-upload {
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-dm-sans), sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-accent);
  cursor: pointer;
}
.fc-upload:hover { color: var(--color-accent-hover); }
.fc-go {
  background: var(--color-text-primary);
  color: var(--color-page);
  border: none;
  padding: 12px 24px;
  border-radius: 999px;
  font-family: var(--font-dm-sans), sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms ease-out, opacity 150ms ease-out;
}
.fc-go:hover:not(:disabled) { background: var(--color-accent); }
.fc-go:disabled { opacity: 0.45; cursor: not-allowed; }
.fc-overlimit {
  font-size: 13px;
  color: var(--color-metric);
  margin-top: 10px;
  max-width: 720px;
}

.fc-loading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: clamp(32px, 5vw, 48px);
  font-size: var(--text-body);
  color: var(--color-text-secondary);
}
.fc-pulse {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
  animation: fc-pulse 1.2s ease-in-out infinite;
}
@keyframes fc-pulse {
  0%, 100% { opacity: 0.25; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

.fc-notice {
  margin-top: clamp(32px, 5vw, 48px);
  padding: 20px 22px;
  background: var(--color-accent-ghost);
  border: 1px solid var(--color-accent-ghost-border);
  border-radius: 12px;
  max-width: 720px;
}
.fc-notice p { font-size: var(--text-body); color: var(--color-text-primary); line-height: 1.6; }
.fc-notice-error {
  background: var(--color-metric-ghost);
  border-color: rgba(240, 94, 59, 0.2);
}
.fc-notice-link {
  display: inline-block;
  margin-top: 12px;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-accent);
  text-decoration: none;
}
.fc-notice-link:hover { color: var(--color-accent-hover); }

.fc-analysis { margin-top: clamp(36px, 6vw, 56px); }
.fc-summary {
  font-weight: 700;
  font-size: clamp(20px, 3vw, 26px);
  line-height: 1.32;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
  max-width: 40ch;
  padding-bottom: clamp(20px, 3vw, 26px);
  border-bottom: 2px solid var(--color-text-primary);
  margin-bottom: clamp(26px, 4vw, 36px);
}
.fc-cols {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: clamp(32px, 5vw, 56px);
}
.fc-collabel {
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-tertiary);
  margin-bottom: 18px;
}
.fc-item {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  margin-bottom: 22px;
}
.fc-num {
  font-family: var(--font-gasoek);
  font-size: clamp(30px, 4vw, 38px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: rgba(29, 92, 255, 0.4);
}
.fc-gap-marker {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-metric);
  margin-top: 6px;
  justify-self: start;
}
.fc-item-title {
  font-weight: 700;
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
  margin-bottom: 5px;
}
.fc-item-body {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.55;
}

.fc-work {
  margin-top: 26px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border-default);
}
.fc-work-link {
  display: block;
  text-decoration: none;
  background: var(--color-card);
  border: 1px solid var(--color-border-default);
  border-radius: 12px;
  padding: 18px;
  transition: transform 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out;
}
.fc-work-link:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.fc-work-static:hover { transform: none; border-color: var(--color-border-default); box-shadow: none; }
.fc-work-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: clamp(16px, 2vw, 18px);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}
.fc-work-title::after { content: "→"; color: var(--color-accent); }
.fc-work-title-static::after { content: ""; }
.fc-work-rel {
  display: block;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-top: 6px;
}
.fc-raw {
  white-space: pre-wrap;
  font-family: var(--font-dm-sans), sans-serif;
  font-size: 15px;
  color: var(--color-text-primary);
  line-height: 1.6;
}

@media (max-width: 767px) {
  .fc-cols { grid-template-columns: 1fr; gap: 32px; }
  .fc-actions { flex-direction: column; align-items: stretch; }
  .fc-go { width: 100%; order: 1; }
  .fc-upload { order: 2; text-align: center; }
}
`;
