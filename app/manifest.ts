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
        src: "/images/brand/icon-192x192-v3.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/icon-512x512-v3.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/icon-maskable-512x512-v3.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}