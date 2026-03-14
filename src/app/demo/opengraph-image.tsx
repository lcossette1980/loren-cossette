import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "AI Leadership Readiness Analyzer | Loren Cossette";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoBuffer = await readFile(
    join(process.cwd(), "public/images/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 40%, #111122 100%)",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(34,231,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,231,240,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow accent top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,231,240,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Glow accent bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(226,184,84,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "2px",
              background: "#e2b854",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#e2b854",
              letterSpacing: "4px",
              textTransform: "uppercase" as const,
              fontFamily: "monospace",
            }}
          >
            Interactive Demo
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#f0f0f5",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-1px",
          }}
        >
          AI Leadership Readiness
          <br />
          <span style={{ color: "#22e7f0" }}>Analyzer</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "rgba(240,240,245,0.5)",
            marginTop: "24px",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Powered by the AILCM Framework — multi-model orchestration using
          GPT-4o and Claude to assess 12 leadership competency dimensions.
        </p>

        {/* Pipeline visualization */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {[
            { label: "GPT-4o", sublabel: "Domain Analysis", color: "#10a37f" },
            { label: "→", sublabel: "", color: "rgba(240,240,245,0.3)" },
            { label: "Claude", sublabel: "Synthesis", color: "#d4a574" },
            { label: "→", sublabel: "", color: "rgba(240,240,245,0.3)" },
            { label: "Assessment", sublabel: "12 Dimensions", color: "#22e7f0" },
          ].map((step, i) =>
            step.sublabel ? (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  border: `1px solid ${step.color}30`,
                  borderRadius: "12px",
                  background: `${step.color}08`,
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: step.color,
                    fontFamily: "monospace",
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "rgba(240,240,245,0.4)",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                  }}
                >
                  {step.sublabel}
                </span>
              </div>
            ) : (
              <span
                key={i}
                style={{ fontSize: "20px", color: step.color }}
              >
                {step.label}
              </span>
            )
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            {["AILCM Framework", "OVERRIDE", "Strategic Adaptability"].map(
              (fw) => (
                <span
                  key={fw}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(34,231,240,0.6)",
                    padding: "4px 12px",
                    border: "1px solid rgba(34,231,240,0.15)",
                    borderRadius: "100px",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                  }}
                >
                  {fw}
                </span>
              )
            )}
          </div>
          <img
            src={logoSrc}
            alt="LC"
            style={{ width: "48px", height: "48px" }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
