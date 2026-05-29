import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./system-prompt";
import { checkRateLimit } from "./rateLimit";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 1000;
const MAX_JD_CHARS = 8000;

const UNAVAILABLE_MESSAGE =
  "The fit check is temporarily unavailable. Reach out to Damean directly and he'll be happy to talk through the role.";

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  if (process.env.EVALUATOR_ENABLED !== "true") {
    return NextResponse.json(
      { error: UNAVAILABLE_MESSAGE, disabled: true },
      { status: 503 },
    );
  }

  let jobDescription: unknown;
  try {
    const body = await request.json();
    jobDescription = body?.jobDescription;
  } catch {
    return NextResponse.json(
      { error: "Could not read the request. Please try again." },
      { status: 400 },
    );
  }

  if (typeof jobDescription !== "string" || jobDescription.trim().length === 0) {
    return NextResponse.json(
      { error: "Paste a job description to see how Damean fits the role." },
      { status: 400 },
    );
  }

  if (jobDescription.length > MAX_JD_CHARS) {
    return NextResponse.json(
      {
        error: `That job description is a bit long. Trim it to under ${MAX_JD_CHARS.toLocaleString()} characters and try again.`,
      },
      { status: 400 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[/api/evaluate] ANTHROPIC_API_KEY is not set.");
    return NextResponse.json(
      { error: UNAVAILABLE_MESSAGE, disabled: true },
      { status: 503 },
    );
  }

  const { allowed, retryAfterSeconds } = await checkRateLimit(getClientIp(request));
  if (!allowed) {
    return NextResponse.json(
      {
        error:
          "You've reached the daily limit. Try again tomorrow, or reach out to Damean directly.",
        rateLimited: true,
      },
      {
        status: 429,
        headers: retryAfterSeconds
          ? { "Retry-After": String(retryAfterSeconds) }
          : undefined,
      },
    );
  }

  const wrappedJD = `<job_description>\n${jobDescription}\n</job_description>`;

  try {
    const response = await getClient().messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: wrappedJD }],
    });

    const markdown = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    if (!markdown) {
      return NextResponse.json(
        { error: "The evaluation came back empty. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ markdown });
  } catch (err) {
    console.error("[/api/evaluate] Anthropic request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong generating the evaluation. Please try again in a moment." },
      { status: 500 },
    );
  }
}
