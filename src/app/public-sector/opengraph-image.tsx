import { ImageResponse } from "next/og";
import { loadLogo, renderOg } from "@/lib/og-template";

export const alt =
  "Public-Sector AI Modernization | Loren Cossette · Cossette Consulting LLC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoSrc = await loadLogo();
  return new ImageResponse(
    renderOg({
      logoSrc,
      label: "Public Sector",
      title: "AI Modernization for Public-Sector Teams",
      subtitle: "Embedded AI lead · Currently at Multnomah County",
      description:
        "State · county · municipal AI modernization. 5 production initiatives at Multnomah County. Cooperative-purchasing-ready.",
      stats: [
        { value: "5", label: "Production Initiatives" },
        { value: "56.5K", label: "Files Nightly" },
        { value: "92.3%", label: "Independent Audit" },
      ],
      tags: ["Sourcewell", "OMNIA Partners", "TIPS", "NASPO"],
    }),
    { ...size }
  );
}
