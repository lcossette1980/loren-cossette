import { ImageResponse } from "next/og";
import { loadLogo, renderOg } from "@/lib/og-template";

export const alt = "Security & Data Handling | Loren Cossette";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoSrc = await loadLogo();
  return new ImageResponse(
    renderOg({
      logoSrc,
      label: "Security",
      title: "How I Handle Agency Data",
      subtitle: "Agency cloud · Human-in-the-loop · Audit by default",
      description:
        "Plain-language defaults enforced in production across every system I build. Zero data leaves the agency tenant. Model routing transparency. WCAG 2.1 AA conformance commitment.",
      tags: [
        "Zero Data Exfiltration",
        "Human Review Required",
        "Full Audit Trails",
      ],
    }),
    { ...size }
  );
}
