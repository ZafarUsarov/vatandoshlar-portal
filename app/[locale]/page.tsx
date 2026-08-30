import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

type Locale = "uz" | "de";

const SITE_URL = "https://vatandoshlar.de";
const SOCIAL_PREVIEW_IMAGE_URL = `${SITE_URL}/api/social-preview`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const isGerman = locale === "de";

  const title = isGerman
    ? "Vatandoshlar.de – Plattform für Usbeken rund um Deutschland"
    : "Vatandoshlar.de – Germaniya bo‘yicha o‘zbekistonliklar platformasi";

  const socialTitle = isGerman
    ? "Plattform für Usbeken rund um Deutschland"
    : "Germaniya bo‘yicha o‘zbekistonliklar platformasi";

  const description = isGerman
    ? "Informationen für Usbeken rund um Deutschland zu Leben, Studium, Arbeit, Ausbildung, Visum und Einreise sowie zu Dienstleistungen, Fachkräften und Communitys."
    : "Germaniyada yashash, o‘qish, ishlash, Ausbildung, viza va ko‘chish bo‘yicha o‘zbekistonliklar uchun yangiliklar, xizmatlar, mutaxassislar, qo‘llanmalar va hamjamiyatlar.";

  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        uz: `${SITE_URL}/uz`,
        de: `${SITE_URL}/de`,
      },
    },
    openGraph: {
      type: "website",
      locale: isGerman ? "de_DE" : "uz_UZ",
      siteName: "Vatandoshlar.de",
      title: socialTitle,
      description,
      url: canonicalUrl,
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
      title: socialTitle,
      description,
      images: [SOCIAL_PREVIEW_IMAGE_URL],
    },
  };
}

export { default } from "../page";
