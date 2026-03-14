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

export const maxDuration = 60; // Vercel function timeout

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

    // 2. Rate limit check
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

    // 3. Create SSE stream
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // ── STAGE 1: GPT-4o structured domain analysis ──
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ stage: "analyzing", message: "Stage 1: GPT-4o analyzing 12 subdimensions..." })}\n\n`
            )
          );

          const gpt4oResponse = await getOpenAI().chat.completions.create({
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
          });

          const toolCall = gpt4oResponse.choices[0]?.message?.tool_calls?.[0];
          if (!toolCall || toolCall.type !== "function" || !toolCall.function?.arguments) {
            throw new Error("GPT-4o did not return structured output");
          }

          const domainAnalysis = JSON.parse(
            (toolCall as { type: "function"; function: { arguments: string } }).function.arguments
          );

          // Send Stage 1 results to client
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ stage: "domains_complete", domainAnalysis })}\n\n`
            )
          );

          // ── STAGE 2: Claude strategic synthesis ──
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ stage: "synthesizing", message: "Stage 2: Claude synthesizing strategic recommendations..." })}\n\n`
            )
          );

          const claudeResponse = await getAnthropic().messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 2000,
            system: buildClaudePrompt(),
            messages: [
              {
                role: "user",
                content: `Original organization description:\n${description}\n\nStructured domain analysis from GPT-4o:\n${JSON.stringify(domainAnalysis, null, 2)}`,
              },
            ],
          });

          // Extract text from Claude's response
          const claudeText = claudeResponse.content
            .filter((block): block is Anthropic.TextBlock => block.type === "text")
            .map((block) => block.text)
            .join("");

          let strategicSynthesis;
          try {
            strategicSynthesis = JSON.parse(claudeText);
          } catch {
            // If Claude didn't return clean JSON, try extracting it
            const jsonMatch = claudeText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              strategicSynthesis = JSON.parse(jsonMatch[0]);
            } else {
              throw new Error("Claude did not return valid JSON");
            }
          }

          // Send Stage 2 results
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ stage: "complete", strategicSynthesis, remaining: rateResult.remaining })}\n\n`
            )
          );

          controller.close();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "An unexpected error occurred";
          console.error("Assessment pipeline error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ stage: "error", error: message })}\n\n`
            )
          );
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
    console.error("Assessment API error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
        code: "API_ERROR",
      },
      { status: 500 }
    );
  }
}
