import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  // Use the square LC monogram (not the full lockup) for the apple
  // touch icon — needs to read clearly at 180x180 home-screen size.
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
          background: "linear-gradient(135deg, #0a0a0f 0%, #121220 100%)",
          borderRadius: "40px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="LC"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
