import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import StructuredData from "../components/seo/StructuredData";

import "./globals.css";

const SITE_URL = "https://vatandoshlar.de";
const SOCIAL_PREVIEW_IMAGE_URL = `${SITE_URL}/api/social-preview?v=uzde-m19-4`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#020617",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "UzDe",
    template: "%s | UzDe",
  },

  description:
    "Germaniya bo‘yicha o‘zbekistonliklar uchun yangiliklar, xizmatlar, ish, ta’lim, viza, qo‘llanmalar, Telegram hamjamiyatlari va tadbirlar portali.",

  applicationName: "UzDe",

  keywords: [
    "UzDe",
    "Germaniyadagi o‘zbeklar",
    "O‘zbekistonliklar Germaniyada",
    "Germaniyada ish",
    "Telegram guruhlari",
    "Germaniyadagi tadbirlar",
  ],

  authors: [
    {
      name: "UzDe",
    },
  ],

  creator: "UzDe",
  publisher: "UzDe",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      {
        url: "/images/brand/uzde/uzde-favicon.ico?v=m19-4",
        type: "image/x-icon",
      },
      {
        url: "/images/brand/uzde/uzde-favicon-64.png?v=m19-4",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/images/brand/uzde/uzde-favicon.ico?v=m19-4",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/images/brand/uzde/uzde-apple-touch-icon-180.png?v=m19-4",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    siteName: "UzDe",
    title: "UzDe",
    description:
      "Germaniya bo‘yicha o‘zbekistonliklar uchun raqamli platforma.",
    images: [
      {
        url: SOCIAL_PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "UzDe",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UzDe",
    description:
      "Germaniya bo‘yicha o‘zbekistonliklar uchun raqamli platforma.",
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
