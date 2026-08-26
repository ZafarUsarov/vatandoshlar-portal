import { ImageResponse } from "next/og";
import { createElement } from "react";

const BRAND_ICON_URL =
  "https://vatandoshlar.de/images/brand/vatandoshlar-icon.png";

export async function GET() {
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
      createElement("img", {
        src: BRAND_ICON_URL,
        alt: "Vatandoshlar.de",
        width: 280,
        height: 280,
        style: {
          width: "280px",
          height: "280px",
          objectFit: "contain",
        },
      }),
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
