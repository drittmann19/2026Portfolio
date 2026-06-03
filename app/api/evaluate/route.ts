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

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const messageStream = getClient().messages.stream({
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

        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("[/api/evaluate] Anthropic stream failed:", err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
