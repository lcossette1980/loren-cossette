/**
 * Shared OG image template. Renders the standard dark + cyan + warm-gold
 * card layout used across all route opengraph-image.tsx files.
 *
 * Pass a Stat to render a value+label column. Pass a string to skip the
 * stats row entirely.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";

export interface OgStat {
  value: string;
  label: string;
}

export interface OgTemplateProps {
  /** Top-right label in cyan caps, e.g. "Public Sector" */
  label: string;
  /** Big headline, e.g. "Public-Sector AI Modernization" */
  title: string;
  /** Cyan monospace subtitle below the title */
  subtitle?: string;
  /** Soft gray descriptive paragraph */
  description?: string;
  /** Optional stats row (1-4 stats) */
  stats?: OgStat[];
  /** Optional pill tags shown at bottom-left */
  tags?: string[];
}

export async function loadLogo(): Promise<string> {
  const logoBuffer = await readFile(
    join(process.cwd(), "public/images/logo.png")
  );
  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}

export function renderOg({
  label,
  title,
  subtitle,
  description,
  stats,
  tags,
  logoSrc,
}: OgTemplateProps & { logoSrc: string }) {
  return (
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
          {label}
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
          maxWidth: "1000px",
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
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
          {subtitle}
        </p>
      )}

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: "19px",
            fontWeight: 400,
            color: "rgba(240,240,245,0.5)",
            marginTop: "24px",
            maxWidth: "780px",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}

      {/* Stats row */}
      {stats && stats.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "36px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  color: "#22e7f0",
                  fontFamily: "monospace",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(240,240,245,0.4)",
                  letterSpacing: "2px",
                  textTransform: "uppercase" as const,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

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
          {(tags ?? []).map((tag) => (
            <span
              key={tag}
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
              {tag}
            </span>
          ))}
        </div>

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="LC"
          style={{ width: "48px", height: "48px" }}
        />
      </div>
    </div>
  );
}
