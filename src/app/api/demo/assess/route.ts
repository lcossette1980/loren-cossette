import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildGpt4oPrompt, buildClaudePrompt } from "@/lib/demo-prompts";
import { domainAnalysisSchema } from "@/lib/demo-schema";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
}

function getAnthropic() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
}

const MIN_INPUT_LENGTH = 50;
const MAX_INPUT_LENGTH = 3000;

/**
 * Strip verbose fields from the GPT-4o domain analysis before
 * forwarding to Claude. Keeps scores, names, and summaries —
 * drops full justifications, risk lists, and action lists to
 * cut input tokens roughly in half.
 */
function condenseDomainAnalysis(analysis: Record<string, unknown>) {
  const domains = (analysis as { domains?: Array<Record<string, unknown>> }).domains;
  if (!Array.isArray(domains)) return analysis;

  return {
    domains: domains.map((d) => ({
      domainName: d.domainName,
      domainSummary: d.domainSummary,
      subdimensions: Array.isArray(d.subdimensions)
        ? (d.subdimensions as Array<Record<string, unknown>>).map((s) => ({
            subdimensionName: s.subdimensionName,
            score: s.score,
            // One-line summary instead of full justification + arrays
            keyFinding: typeof s.justification === "string"
              ? (s.justification as string).split(".")[0] + "."
              : "",
          }))
        : [],
    })),
  };
}

export const maxDuration = 60; // Vercel function timeout

/**
 * Race a promise against a timeout so we don't silently hang.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${ms / 1000}s`)),
      ms
    );
    promise.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); }
    );
  });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate input
    const body = await request.json();
    const description = body?.description?.trim();

    if (!description || description.length < MIN_INPUT_LENGTH) {
      return NextResponse.json(
        {
          error:
            "Please provide at least 50 characters describing your organization's AI situation.",
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    if (description.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: "Description must be under 3,000 characters.", code: "INVALID_INPUT" },
        { status: 400 }
      );
    }

    // 2. Verify API keys are present
    if (!process.env.OPENAI_API_KEY) {
      console.error("[demo] OPENAI_API_KEY is not set");
      return NextResponse.json(
        { error: "Service configuration error (OpenAI key missing).", code: "CONFIG_ERROR" },
        { status: 500 }
      );
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("[demo] ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "Service configuration error (Anthropic key missing).", code: "CONFIG_ERROR" },
        { status: 500 }
      );
    }

    // 3. Rate limit check
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const rateResult = checkRateLimit(ip);

    if (!rateResult.allowed) {
      return NextResponse.json(
        {
          error: "Daily assessment limit reached. Try again tomorrow.",
          code: "RATE_LIMITED",
          retryAfter: rateResult.retryAfter,
        },
        { status: 429 }
      );
    }

    // 4. Create SSE stream
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        const send = (data: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        try {
          // ── STAGE 1: GPT-4o structured domain analysis ──
          console.log("[demo] Stage 1: Starting GPT-4o domain analysis...");
          send({ stage: "analyzing", message: "Stage 1: GPT-4o analyzing 12 subdimensions..." });

          let domainAnalysis: Record<string, unknown>;

          try {
            const gpt4oResponse = await withTimeout(
              getOpenAI().chat.completions.create({
                model: "gpt-4o",
                messages: [
                  { role: "system", content: buildGpt4oPrompt() },
                  {
                    role: "user",
                    content: `Assess this organization's AI leadership readiness:\n\n${description}`,
                  },
                ],
                tools: [
                  { type: "function", function: domainAnalysisSchema },
                ],
                tool_choice: {
                  type: "function",
                  function: { name: "deliver_domain_analysis" },
                },
                temperature: 0.3,
              }),
              25000,
              "GPT-4o"
            );

            console.log("[demo] GPT-4o raw finish_reason:", gpt4oResponse.choices[0]?.finish_reason);

            const toolCall = gpt4oResponse.choices[0]?.message?.tool_calls?.[0];
            if (!toolCall || toolCall.type !== "function" || !toolCall.function?.arguments) {
              const debugInfo = JSON.stringify({
                finish_reason: gpt4oResponse.choices[0]?.finish_reason,
                hasToolCalls: !!gpt4oResponse.choices[0]?.message?.tool_calls,
                toolCallCount: gpt4oResponse.choices[0]?.message?.tool_calls?.length ?? 0,
                contentPreview: gpt4oResponse.choices[0]?.message?.content?.slice(0, 200),
              });
              console.error("[demo] GPT-4o no tool call:", debugInfo);
              throw new Error("GPT-4o did not return a function call");
            }

            domainAnalysis = JSON.parse(toolCall.function.arguments);

            const domainCount = Array.isArray((domainAnalysis as { domains?: unknown[] }).domains)
              ? (domainAnalysis as { domains: unknown[] }).domains.length
              : "unknown";
            console.log(`[demo] GPT-4o complete — ${domainCount} domains parsed`);
          } catch (gptErr) {
            const msg = gptErr instanceof Error ? gptErr.message : String(gptErr);
            console.error("[demo] GPT-4o failed:", msg);
            send({ stage: "error", error: `Stage 1 (GPT-4o) failed: ${msg}` });
            controller.close();
            return;
          }

          // Send Stage 1 results to client
          send({ stage: "domains_complete", domainAnalysis });

          // ── STAGE 2: Claude strategic synthesis ──
          console.log("[demo] Stage 2: Starting Claude synthesis...");
          send({ stage: "synthesizing", message: "Stage 2: Claude synthesizing strategic recommendations..." });

          let strategicSynthesis: Record<string, unknown>;

          try {
            // Condense domain analysis for Claude — full JSON is too verbose
            // and inflates input tokens / latency. Keep scores + key info only.
            const condensed = condenseDomainAnalysis(domainAnalysis);
            console.log("[demo] Condensed analysis length:", JSON.stringify(condensed).length, "chars (from", JSON.stringify(domainAnalysis).length, ")");

            const claudeResponse = await withTimeout(
              getAnthropic().messages.create({
                model: "claude-sonnet-4-6",
                max_tokens: 1500,
                system: buildClaudePrompt(),
                messages: [
                  {
                    role: "user",
                    content: `Organization description:\n${description}\n\nDomain analysis (3 domains, 12 subdimensions):\n${JSON.stringify(condensed, null, 2)}`,
                  },
                ],
              }),
              50000, // 50s — safely under 60s Vercel limit
              "Claude"
            );

            console.log("[demo] Claude response — stop_reason:", claudeResponse.stop_reason, "blocks:", claudeResponse.content.length);

            // Extract text from Claude's response
            const claudeText = claudeResponse.content
              .filter((block): block is Anthropic.TextBlock => block.type === "text")
              .map((block) => block.text)
              .join("");

            console.log("[demo] Claude text length:", claudeText.length, "| first 300 chars:", claudeText.slice(0, 300));

            if (!claudeText.trim()) {
              throw new Error("Claude returned empty text response");
            }

            // Parse JSON — handle various output formats Claude might use
            try {
              // Attempt 1: Direct JSON parse
              strategicSynthesis = JSON.parse(claudeText.trim());
            } catch {
              // Attempt 2: Strip markdown code fences
              const stripped = claudeText
                .replace(/^```(?:json)?\s*\n?/m, "")
                .replace(/\n?```\s*$/m, "")
                .trim();
              try {
                strategicSynthesis = JSON.parse(stripped);
              } catch {
                // Attempt 3: Extract JSON object via regex
                const jsonMatch = stripped.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                  strategicSynthesis = JSON.parse(jsonMatch[0]);
                } else {
                  console.error("[demo] Claude JSON parse failed. Full text:", claudeText);
                  throw new Error("Claude response was not valid JSON");
                }
              }
            }

            console.log("[demo] Claude synthesis parsed — keys:", Object.keys(strategicSynthesis).join(", "));
          } catch (claudeErr) {
            const msg = claudeErr instanceof Error ? claudeErr.message : String(claudeErr);
            console.error("[demo] Claude failed:", msg);
            send({ stage: "error", error: `Stage 2 (Claude) failed: ${msg}` });
            controller.close();
            return;
          }

          // Send Stage 2 results + close stream
          send({ stage: "complete", strategicSynthesis, remaining: rateResult.remaining });
          console.log("[demo] Pipeline complete ✓");

          controller.close();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "An unexpected error occurred";
          console.error("[demo] Pipeline error:", err);
          send({ stage: "error", error: message });
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-RateLimit-Remaining": String(rateResult.remaining),
      },
    });
  } catch (error) {
    console.error("[demo] Top-level API error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
        code: "API_ERROR",
      },
      { status: 500 }
    );
  }
}
