import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Header from "../../components/Header";
import TelegramSection from "../../components/TelegramSection";
import { Link } from "../../i18n/navigation";

type Locale = "uz" | "de";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return locale === "uz"
    ? {
        title: "Telegram hamjamiyatlari | Vatandoshlar.de",
        description:
          "Germaniya federal yerlari bo‘yicha o‘zbek Telegram hamjamiyatlarini toping.",
      }
    : {
        title: "Telegram-Communitys | Vatandoshlar.de",
        description:
          "Finden Sie usbekische Telegram-Communitys nach Bundesländern in Deutschland.",
      };
}

export default async function TelegramPage() {
  const locale = (await getLocale()) as Locale;

  const copy =
    locale === "uz"
      ? {
          backHome: "Bosh sahifaga qaytish",
          eyebrow: "Hududiy hamjamiyatlar",
          title: "Telegram guruhlari",
          description:
            "O‘zingiz yashayotgan Bundesland bo‘yicha Telegram hamjamiyatini toping, vatandoshlar bilan bog‘laning va foydali ma’lumotlarni oling.",
        }
      : {
          backHome: "Zur Startseite",
          eyebrow: "Regionale Communitys",
          title: "Telegram-Gruppen",
          description:
            "Finden Sie die Community Ihres Bundeslandes, vernetzen Sie sich mit Landsleuten und erhalten Sie hilfreiche Informationen.",
        };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 text-slate-950 lg:pt-28 dark:bg-slate-950 dark:text-white">
        <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span
                aria-hidden="true"
                className="mr-2"
              >
                ←
              </span>
              {copy.backHome}
            </Link>

            <div className="mt-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {copy.eyebrow}
              </p>

              <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                {copy.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                {copy.description}
              </p>
            </div>
          </div>
        </section>

        <TelegramSection />
      </main>
    </>
  );
}
