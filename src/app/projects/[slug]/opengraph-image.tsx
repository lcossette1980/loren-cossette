import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "@/data/projects";

export const alt = "Project — Loren Cossette";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return new Response("Not found", { status: 404 });

  const logoBuffer = await readFile(
    join(process.cwd(), "public/images/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  /* Category label mapping */
  const categoryLabels: Record<string, string> = {
    "ai-agents": "AI Agents",
    nlp: "NLP",
    "full-stack": "Full Stack",
    compliance: "Compliance",
  };

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
          {/* Category label */}
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
              {categoryLabels[project.category] || project.category}
            </span>
          </div>

          {/* Project title */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#f0f0f5",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-1px",
              maxWidth: "900px",
            }}
          >
            {project.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "#22e7f0",
              marginTop: "12px",
              fontFamily: "monospace",
              letterSpacing: "0.5px",
            }}
          >
            {project.subtitle}
          </p>

          {/* Short description */}
          <p
            style={{
              fontSize: "17px",
              fontWeight: 400,
              color: "rgba(240,240,245,0.45)",
              marginTop: "20px",
              maxWidth: "800px",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Bottom section: stats + tech + logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Stats */}
          <div style={{ display: "flex", gap: "32px" }}>
            {project.stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px 24px",
                  border: "1px solid rgba(34,231,240,0.15)",
                  borderRadius: "12px",
                  background: "rgba(34,231,240,0.04)",
                  minWidth: "120px",
                }}
              >
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#22e7f0",
                    fontFamily: "monospace",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(240,240,245,0.5)",
                    marginTop: "4px",
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Logo + name */}
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
