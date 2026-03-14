/**
 * OpenAI function-calling schema for GPT-4o domain analysis.
 * Guarantees consistent JSON structure via tool_choice.
 */
export const domainAnalysisSchema = {
  name: "deliver_domain_analysis",
  description:
    "Deliver a structured AI Leadership Readiness domain analysis based on the AILCM framework.",
  parameters: {
    type: "object" as const,
    required: ["domains"],
    properties: {
      domains: {
        type: "array" as const,
        description: "Exactly 3 domain assessments",
        items: {
          type: "object" as const,
          required: [
            "domainId",
            "domainName",
            "theoreticalBasis",
            "subdimensions",
            "domainSummary",
          ],
          properties: {
            domainId: {
              type: "string" as const,
              description: "Domain identifier",
            },
            domainName: {
              type: "string" as const,
              description: "Full domain name",
            },
            theoreticalBasis: {
              type: "string" as const,
              description: "Theoretical foundation",
            },
            subdimensions: {
              type: "array" as const,
              description: "Exactly 4 subdimension assessments",
              items: {
                type: "object" as const,
                required: [
                  "subdimensionId",
                  "subdimensionName",
                  "score",
                  "justification",
                  "risks",
                  "recommendedActions",
                ],
                properties: {
                  subdimensionId: { type: "string" as const },
                  subdimensionName: { type: "string" as const },
                  score: {
                    type: "string" as const,
                    enum: [
                      "Strong",
                      "Moderate",
                      "Gap Identified",
                      "Critical Gap",
                    ],
                  },
                  justification: {
                    type: "string" as const,
                    description: "1-2 sentence justification citing evidence",
                  },
                  risks: {
                    type: "array" as const,
                    items: { type: "string" as const },
                    description: "1-2 identified risks",
                  },
                  recommendedActions: {
                    type: "array" as const,
                    items: { type: "string" as const },
                    description: "1-2 recommended actions",
                  },
                },
              },
            },
            domainSummary: {
              type: "string" as const,
              description: "2-sentence domain summary",
            },
          },
        },
      },
    },
  },
};
