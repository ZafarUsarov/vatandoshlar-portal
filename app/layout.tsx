import type { Metadata } from "next";
import Script from "next/script";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vatandoshlar.de"),

  title: {
    default: "Vatandoshlar.de",
    template: "%s | Vatandoshlar.de",
  },

  description:
    "Germaniyadagi o‘zbekistonliklar uchun yangiliklar, xizmatlar, ish, Telegram guruhlari va tadbirlar portali.",

  applicationName: "Vatandoshlar.de",

  keywords: [
    "Vatandoshlar",
    "Germaniyadagi o‘zbeklar",
    "O‘zbekistonliklar Germaniyada",
    "Germaniyada ish",
    "Telegram guruhlari",
    "Germaniyadagi tadbirlar",
  ],

  authors: [
    {
      name: "Vatandoshlar.de",
    },
  ],

  creator: "Vatandoshlar.de",
  publisher: "Vatandoshlar.de",

  icons: {
    icon: [
      {
        url: "/images/brand/favicon-vatandoshlar.png",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    siteName: "Vatandoshlar.de",
    title: "Vatandoshlar.de",
    description:
      "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const themeInitializationScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem("vatandoshlar-theme");

      var prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      var shouldUseDark =
        storedTheme === "dark" ||
        (!storedTheme && prefersDark);

      document.documentElement.classList.toggle(
        "dark",
        shouldUseDark
      );

      document.documentElement.style.colorScheme =
        shouldUseDark ? "dark" : "light";
    } catch (error) {
      console.error(
        "Theme initialization failed:",
        error
      );
    }
  })();
`;

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function RootLayout({
  children,
}: RootLayoutProps) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="vatandoshlar-theme-initialization"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: themeInitializationScript,
          }}
        />
      </head>

      <body className="min-h-screen bg-white text-slate-950 antialiased transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}
