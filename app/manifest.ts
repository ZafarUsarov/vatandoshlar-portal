import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UzDe",
    short_name: "UzDe",
    description:
      "Germaniya bo‘yicha o‘zbekistonliklar uchun yangiliklar, xizmatlar, ish, ta’lim, viza, mutaxassislar, qo‘llanmalar, Telegram hamjamiyatlari va tadbirlar.",
    start_url: "/uz",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    icons: [
      {
        src: "/images/brand/uzde/uzde-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/uzde/uzde-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/uzde/uzde-icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
