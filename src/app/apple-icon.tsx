import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <span
          style={{
            fontSize: "80px",
            fontWeight: 700,
            letterSpacing: "4px",
            color: "#22e7f0",
            fontFamily: "monospace",
          }}
        >
          LC
        </span>
      </div>
    ),
    { ...size }
  );
}
