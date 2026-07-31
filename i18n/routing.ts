import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "de"],

  defaultLocale: "uz",

  localePrefix: "always",

  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];