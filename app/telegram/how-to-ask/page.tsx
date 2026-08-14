import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TelegramCultureGuide from "../../../components/telegram/TelegramCultureGuide";

type Locale = "uz" | "de";

const baseUrl =
  "https://vatandoshlar.de";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as Locale;

  const isGerman =
    locale === "de";

  const title = isGerman
    ? "Wie stellt man eine gute Frage in der Gruppe? | Vatandoshlar.de"
    : "Guruhda qanday qilib to‘g‘ri savol berish kerak? | Vatandoshlar.de";

  const description = isGerman
    ? "Praktischer Leitfaden für klare, sichere und hilfreiche Fragen in Telegram-Gruppen."
    : "Telegram guruhlarida aniq, xavfsiz va foydali savol yozish bo‘yicha amaliy qo‘llanma.";

  const canonical =
    `${baseUrl}/${locale}/telegram/how-to-ask`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
      languages: {
        uz:
          `${baseUrl}/uz/telegram/how-to-ask`,
        de:
          `${baseUrl}/de/telegram/how-to-ask`,
      },
    },
    openGraph: {
      type: "article",
      locale:
        isGerman
          ? "de_DE"
          : "uz_UZ",
      siteName:
        "Vatandoshlar.de",
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function TelegramHowToAskPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950 dark:bg-slate-950 dark:text-white">
        <TelegramCultureGuide variant="standalone" />
      </main>

      <Footer />
    </>
  );
}
