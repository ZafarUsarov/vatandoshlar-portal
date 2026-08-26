import type { Metadata } from "next";
import Script from "next/script";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import StructuredData from "../components/seo/StructuredData";

import "./globals.css";

const SITE_URL = "https://vatandoshlar.de";
const SOCIAL_PREVIEW_IMAGE_URL = `${SITE_URL}/api/social-preview`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

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

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      {
        url: "/images/brand/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/brand/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/images/brand/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/brand/apple-touch-icon.png",
        sizes: "180x180",
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
    images: [
      {
        url: SOCIAL_PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Vatandoshlar.de",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vatandoshlar.de",
    description:
      "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma.",
    images: [SOCIAL_PREVIEW_IMAGE_URL],
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
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
