import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Blog — Loren Cossette";
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
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 40%, #111122 100%)",
          padding: "60px 70px",
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

        {/* Glow top-right */}
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

        {/* Glow bottom-left */}
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

        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
                fontSize: "13px",
                fontWeight: 500,
                color: "#e2b854",
                letterSpacing: "4px",
                textTransform: "uppercase" as const,
                fontFamily: "monospace",
              }}
            >
              Blog
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#f0f0f5",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Blog | Loren Cossette
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "#22e7f0",
              marginTop: "16px",
              fontFamily: "monospace",
              letterSpacing: "0.5px",
            }}
          >
            Thoughts on AI Systems, Governance & Transformation
          </p>
        </div>

        {/* Bottom section: logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(240,240,245,0.4)",
                fontFamily: "monospace",
              }}
            >
              lorencossette.com
            </span>
            <img
              src={logoSrc}
              alt="LC"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
