import { ImageResponse } from "next/og";
import { createElement } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET() {
  const logoBuffer = await readFile(
    join(
      process.cwd(),
      "public/images/brand/uzde/uzde-logo-original-transparent.png"
    )
  );

  const brandIconUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  const content = createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      },
    },
    createElement(
      "div",
      {
        style: {
          width: "1080px",
          height: "510px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "48px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f8fffc 55%, #f3fbff 100%)",
          border: "2px solid #e6f5ef",
        },
      },
      createElement(
        "div",
        {
          style: {
            width: "340px",
            height: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#020617",
            borderRadius: "56px",
          },
        },
        createElement("img", {
          src: brandIconUrl,
        alt: "UzDe",
        width: 280,
        height: 280,
        style: {
          width: "280px",
          height: "280px",
          objectFit: "contain",
        },
      }),
      ),
    ),
  );

  return new ImageResponse(content, {
    width: 1200,
    height: 630,
    headers: {
      "Cache-Control":
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
