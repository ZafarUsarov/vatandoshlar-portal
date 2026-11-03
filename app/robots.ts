import type { MetadataRoute } from "next";

const baseUrl =
  "https://uzde.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/uz/admin",
          "/uz/admin/",
          "/de/admin",
          "/de/admin/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
