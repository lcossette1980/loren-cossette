import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "AI Apps & Ventures | Loren Cossette";
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
            Apps & Ventures
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "58px",
            fontWeight: 800,
            color: "#f0f0f5",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-1px",
          }}
        >
          AI-Powered Products
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "26px",
            fontWeight: 400,
            color: "#22e7f0",
            marginTop: "16px",
            fontFamily: "monospace",
            letterSpacing: "1px",
          }}
        >
          SaaS · Research Tools · AI Platforms
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "19px",
            fontWeight: 400,
            color: "rgba(240,240,245,0.5)",
            marginTop: "24px",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Full-stack AI products from concept to production — multi-agent
          platforms, bias detection, and academic research tools.
        </p>

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
            {[
              "DissertationAI",
              "EquitableAI",
              "AI Newsroom",
              "PersonaLens",
            ].map((app) => (
              <span
                key={app}
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
                {app}
              </span>
            ))}
          </div>

          {/* Logo */}
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
