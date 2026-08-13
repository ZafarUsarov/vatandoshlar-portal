import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

type Locale = "uz" | "de";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  const isGerman = locale === "de";

  const title = isGerman
    ? "Vatandoshlar.de – Plattform für Usbeken in Deutschland"
    : "Vatandoshlar.de – Germaniyadagi o‘zbekistonliklar platformasi";

  const description = isGerman
    ? "Nachrichten, Services, Jobs, Fachkräfte, Ratgeber, Telegram-Communitys und Veranstaltungen für Usbeken in Deutschland."
    : "Germaniyadagi o‘zbekistonliklar uchun yangiliklar, xizmatlar, ish, mutaxassislar, qo‘llanmalar, Telegram hamjamiyatlari va tadbirlar.";

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uz: "/uz",
        de: "/de",
      },
    },
    openGraph: {
      type: "website",
      locale: isGerman ? "de_DE" : "uz_UZ",
      siteName: "Vatandoshlar.de",
      title,
      description,
      url: `/${locale}`,
    },
  };
}

export { default } from "../page";
