import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** App icon / favicon generated at build time — the PartFix monogram. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: 700,
        color: "white",
        background: "#6d5efc",
        borderRadius: 7,
      }}
    >
      P
    </div>,
    size,
  );
}
