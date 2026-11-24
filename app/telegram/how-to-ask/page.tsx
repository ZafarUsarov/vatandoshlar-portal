import type { Metadata } from "next";
import { getLocale } from "next-intl/server";


import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import TelegramCultureGuide from "../../../components/telegram/TelegramCultureGuide";


type Locale = "uz" | "de";


const baseUrl =
  "https://uzde.de";


export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as Locale;


  const isGerman =
    locale === "de";


  const title = isGerman
    ? "Wie stellt man eine gute Frage in der Gruppe? | UzDe"
    : "Guruhda qanday qilib töǵri savol beriş kerak? | UzDe";


  const description = isGerman
    ? "Praktischer Leitfaden für klare, sichere und hilfreiche Fragen in Telegram-Gruppen."
    : "Telegram guruhlarida aniq savol yoziş, kontekst beriş va xavfsiz muloqot qiliş böyiça amaliy qöllanma.";


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
        "UzDe",
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


      <main className="uzde-telegram-page uzde-home-frame min-h-screen bg-[var(--uzde-page-bg)] pt-20 text-slate-950 dark:text-white">
        <TelegramCultureGuide variant="standalone" />
      </main>


      <Footer />
    </>
  );
}
