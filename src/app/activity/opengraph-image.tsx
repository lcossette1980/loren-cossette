import { ImageResponse } from "next/og";
import { loadLogo, renderOg } from "@/lib/og-template";

export const alt = "Delivery Evidence | Loren Cossette";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoSrc = await loadLogo();
  return new ImageResponse(
    renderOg({
      logoSrc,
      label: "Delivery Evidence",
      title: "Dated Record of What Shipped",
      subtitle: "Shipping Weekly · Verifiable · Auditable",
      description:
        "Production milestones, validation improvements, and shipped functionality across the Multnomah County AI Program and other work — pulled live from the program hub.",
      tags: [
        "Live Hub Feed",
        "Updated Hourly",
        "Cross-Project Traceable",
      ],
    }),
    { ...size }
  );
}
