import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vatandoshlar.de",
    short_name: "Vatandoshlar.de",
    description:
      "Germaniyadagi o‘zbekistonliklar uchun yangiliklar, xizmatlar, ish, mutaxassislar, qo‘llanmalar, Telegram hamjamiyatlari va tadbirlar.",
    start_url: "/uz",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    icons: [
      {
        src: "/images/brand/favicon-vatandoshlar.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/images/brand/vatandoshlar-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
