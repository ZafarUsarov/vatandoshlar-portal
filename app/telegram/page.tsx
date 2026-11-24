import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Inter_Tight } from "next/font/google";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import ShareButton from "../../components/shared/ShareButton";
import TelegramSection from "../../components/TelegramSection";
import TelegramCommunityNetwork from "../../components/telegram/TelegramCommunityNetwork";
import { Link } from "../../i18n/navigation";

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
});

type Locale = "uz" | "de";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as Locale;

  const isGerman =
    locale === "de";

  const title = isGerman
    ? "Telegram-Communitys | UzDe"
    : "Telegram hamjamiyatlari | UzDe";

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
        "UzDe",
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
          eyebrow: "Germaniyadagi hamjamiyatingizni toping",
          title: "Telegram guruhlari",
          description:
            "Vatandoshlar bilan bog‘laning, tajriba almashing va o‘z hamjamiyatingizni toping.",
        }
      : {
          backHome: "Zur Startseite",
          eyebrow: "Finden Sie Ihre Community in Deutschland",
          title: "Telegram-Gruppen",
          description:
            "Vernetzen Sie sich mit Landsleuten, tauschen Sie Erfahrungen aus und finden Sie Ihre Community.",
        };

  return (
    <>
      <Header />

      <main className="uzde-telegram-page uzde-home-frame min-h-screen bg-[var(--uzde-page-bg)] pt-20 text-slate-950 sm:pt-24 dark:text-[var(--telegram-text)]">
        <section className="border-b border-slate-200 bg-[var(--uzde-page-bg)] dark:border-[var(--telegram-border)]">
          <div className="mx-auto max-w-7xl px-5 pb-10 pt-7 sm:px-6 sm:pb-14 sm:pt-9 lg:px-8 lg:pb-16">
            <div className="flex items-center justify-between gap-4">
              <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 dark:text-[var(--telegram-secondary)] dark:hover:text-sky-300"
            >
              <span aria-hidden="true">←</span>
              {copy.backHome}
              </Link>
            </div>

            <div className="mx-auto mt-8 max-w-5xl text-center sm:mt-9 lg:mt-10">
              <p className="text-sm font-medium text-teal-700 sm:text-base dark:text-[var(--telegram-accent)]">
                {copy.eyebrow}
              </p>
              <h1 className={`${interTight.className} mt-4 text-[clamp(2.375rem,9vw,3.25rem)] font-semibold leading-none tracking-normal uppercase text-slate-950 sm:mt-5 sm:text-[clamp(3.25rem,6vw,4.25rem)] lg:mt-6 lg:text-[clamp(4.25rem,5vw,4.706rem)] dark:text-white`}>
                {copy.title}
              </h1>
              <p className="mx-auto mt-3 max-w-[50rem] text-base leading-7 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8 lg:text-xl dark:text-[var(--telegram-secondary)]">
                {copy.description}
              </p>
            </div>

            <div className="relative left-1/2 mt-1 w-[calc(100vw-16px)] -translate-x-1/2 sm:mt-8 sm:w-[calc(100vw-24px)] lg:mt-8 lg:w-[calc(100vw-32px)]">
              <div className="flex justify-end md:hidden">
                <ShareButton
                  title={copy.title}
                  shareUrl={`https://uzde.de/${locale}/telegram`}
                  locale={locale}
                  variant="guide"
                  iconOnly
                  ariaLabel={locale === "uz" ? "Sahifani ulashish" : "Seite teilen"}
                />
              </div>
              <TelegramCommunityNetwork />
            </div>
          </div>
        </section>

        <TelegramSection />
      </main>

      <SectionPromo target="events" variant="compact" />

      <Footer />
    </>
  );
}
