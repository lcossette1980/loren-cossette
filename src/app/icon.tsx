import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  // Use the square LC monogram (not the full LOREN COSSETTE lockup) so
  // the favicon stays legible at 32x32 and on browser tabs.
  const logoBuffer = await readFile(
    join(process.cwd(), "public/images/logo-mark.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="LC"
          style={{
            width: "32px",
            height: "32px",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
