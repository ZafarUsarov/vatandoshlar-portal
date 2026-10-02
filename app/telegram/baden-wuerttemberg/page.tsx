import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { Link } from "../../../i18n/navigation";
import { getPublicTelegramGroups } from "../../../lib/telegram/public-telegram-repository";
import type { SupportedTelegramLocale } from "../../../types/telegram";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedTelegramLocale;
  const isGerman = locale === "de";

  return {
    title: {
      absolute: isGerman
        ? "Baden-Württemberg Telegram-Communitys | Vatandoshlar.de"
        : "Baden-Württemberg Telegram guruhlari | Vatandoshlar.de",
    },
    description: isGerman
      ? "Usbekische Telegram-Communitys in Baden-Württemberg."
      : "Baden-Württembergdagi o‘zbek Telegram hamjamiyatlari.",
  };
}

export default async function BadenWuerttembergTelegramPage() {
  const locale = (await getLocale()) as SupportedTelegramLocale;
  const groups = (await getPublicTelegramGroups(locale)).filter(
    (group) => group.bundesland === "Baden-Württemberg",
  );

  const copy =
    locale === "uz"
      ? {
          back: "Telegram guruhlariga qaytish",
          eyebrow: "Baden-Württemberg",
          title: "Hududingizdagi hamjamiyatga qo‘shiling",
          description:
            "Baden-Württemberg umumiy guruhiga yoki sizga yaqin shahar hamjamiyatiga qo‘shiling.",
          general: "Federal yer guruhi",
          city: "Shahar guruhi",
          join: "Telegramga qo‘shilish",
        }
      : {
          back: "Zurück zu den Telegram-Gruppen",
          eyebrow: "Baden-Württemberg",
          title: "Community in Ihrer Region finden",
          description:
            "Treten Sie der landesweiten Community oder einer passenden Stadtgruppe bei.",
          general: "Bundesland-Gruppe",
          city: "Stadtgruppe",
          join: "Auf Telegram beitreten",
        };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 text-slate-950 lg:pt-28 dark:bg-slate-950 dark:text-white">
        <section className="border-b border-slate-200/80 bg-gradient-to-b from-sky-50/80 to-white dark:border-slate-800 dark:from-sky-400/[0.06] dark:to-slate-950">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 lg:px-8">
            <Link
              href="/telegram"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 dark:text-sky-300 dark:hover:text-sky-200 dark:focus-visible:ring-offset-slate-950"
            >
              <span aria-hidden="true">←</span>
              {copy.back}
            </Link>

            <div className="mt-10 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                {copy.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {groups.map((group) => {
              const isGeneral = group.shortName === "BW";

              return (
                <article
                  key={group.shortName}
                  className="flex min-h-64 flex-col rounded-[1.75rem] border border-sky-200/80 bg-white p-6 shadow-[0_22px_65px_-48px_rgba(14,165,233,0.55)] dark:border-sky-400/15 dark:bg-white/[0.035] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                      {isGeneral ? copy.general : copy.city}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {group.statusLabel}
                    </span>
                  </div>

                  <h2 className="mt-6 text-2xl font-bold tracking-[-0.025em]">
                    {group.state}
                  </h2>
                  <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
                    {group.description}
                  </p>

                  {group.href && (
                    <a
                      href={group.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                    >
                      {copy.join}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
