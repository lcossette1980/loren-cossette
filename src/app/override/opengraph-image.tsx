import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "OVERRIDE: The AI Transformation Playbook for Hostile Territory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Read the book cover image and convert to base64 data URI
  const coverPath = join(process.cwd(), "public/images/override-cover.jpg");
  const coverBuffer = await readFile(coverPath);
  const coverBase64 = `data:image/jpeg;base64,${coverBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #1F1A10 100%)",
          padding: "0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "200px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,153,59,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Gold glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-50px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,153,59,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Book cover — left side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "380px",
            height: "100%",
            padding: "40px 20px 40px 60px",
            flexShrink: 0,
          }}
        >
          <img
            src={coverBase64}
            alt="OVERRIDE book cover"
            style={{
              height: "520px",
              borderRadius: "6px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(196,153,59,0.15)",
            }}
          />
        </div>

        {/* Text content — right side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 60px 60px 30px",
            flex: 1,
          }}
        >
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#C4993B",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#C4993B",
                letterSpacing: "4px",
                textTransform: "uppercase" as const,
                fontFamily: "monospace",
              }}
            >
              New Book
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#F8F7F4",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            OVERRIDE
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "22px",
              fontWeight: 400,
              color: "#C4993B",
              marginTop: "12px",
              lineHeight: 1.3,
            }}
          >
            The AI Transformation Playbook
            <br />
            for Hostile Territory
          </p>

          {/* Tagline */}
          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "rgba(248,247,244,0.55)",
              marginTop: "20px",
              lineHeight: 1.5,
              maxWidth: "440px",
            }}
          >
            Change management assumes good faith. This book doesn&apos;t.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "28px",
            }}
          >
            {[
              { value: "312", label: "Pages" },
              { value: "17", label: "Templates" },
              { value: "11", label: "Scripts" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#C4993B",
                    fontFamily: "monospace",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(248,247,244,0.45)",
                    letterSpacing: "1px",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "28px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "1px",
                background: "rgba(248,247,244,0.2)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(248,247,244,0.5)",
                letterSpacing: "2px",
                fontFamily: "monospace",
              }}
            >
              by Loren T. Cossette
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
