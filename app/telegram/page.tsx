import Image from "next/image";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import TelegramSection from "../../components/TelegramSection";
import SectionHeroBackground from "../../components/ui/SectionHeroBackground";
import { Link } from "../../i18n/navigation";

type Locale = "uz" | "de";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as Locale;

  const isGerman =
    locale === "de";

  const title = isGerman
    ? "Telegram-Communitys | Vatandoshlar.de"
    : "Telegram hamjamiyatlari | Vatandoshlar.de";

  const description = isGerman
    ? "Finden Sie usbekische Telegram-Communitys nach Bundesländern in Deutschland."
    : "Germaniya federal yerlari bo‘yicha o‘zbek Telegram hamjamiyatlarini toping.";

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical:
        `/${locale}/telegram`,
      languages: {
        uz: "/uz/telegram",
        de: "/de/telegram",
      },
    },
    openGraph: {
      type: "website",
      locale:
        isGerman
          ? "de_DE"
          : "uz_UZ",
      siteName:
        "Vatandoshlar.de",
      title,
      description,
      url:
        `/${locale}/telegram`,
    },
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
        <SectionHeroBackground tone="telegram">
          <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-transparent dark:border-slate-800/80">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
              <Image
                src="/images/telegram/telegram-master-visual.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                quality={88}
                className="object-cover object-[72%_center] opacity-34 sm:object-[70%_center] sm:opacity-40 lg:object-[68%_center] lg:opacity-46 dark:opacity-24 dark:sm:opacity-28 dark:lg:opacity-32"
              />

              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.995)_0%,rgba(248,250,252,0.97)_36%,rgba(248,250,252,0.86)_54%,rgba(248,250,252,0.48)_72%,rgba(248,250,252,0.18)_100%)] dark:bg-[linear-gradient(90deg,rgba(2,6,23,0.995)_0%,rgba(2,6,23,0.97)_36%,rgba(2,6,23,0.88)_54%,rgba(2,6,23,0.62)_72%,rgba(2,6,23,0.38)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,250,252,0.08),rgba(248,250,252,0.46))] dark:bg-[linear-gradient(to_bottom,rgba(2,6,23,0.04),rgba(2,6,23,0.28))]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
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
        </SectionHeroBackground>

        <TelegramSection />
      </main>

      <SectionPromo target="events" />

      <Footer />
    </>
  );
}
