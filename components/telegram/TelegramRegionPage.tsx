import { getLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "@/i18n/navigation";
import { getPublicTelegramGroups } from "@/lib/telegram/public-telegram-repository";
import type { SupportedTelegramLocale } from "@/types/telegram";

type Props = {
  bundesland: "Baden-Württemberg" | "Bayern" | "Niedersachsen";
  generalShortName: "BW" | "BY" | "NI";
};

export default async function TelegramRegionPage({ bundesland, generalShortName }: Props) {
  const locale = (await getLocale()) as SupportedTelegramLocale;
  const groups = (await getPublicTelegramGroups(locale)).filter(
    (group) => group.communityType === "regional" && group.bundesland === bundesland,
  );
  const copy = locale === "uz"
    ? {
        back: "Telegram guruhlariga qaytish",
        eyebrow: bundesland,
        title: "Hududingizdagi hamjamiyatga qo‘shiling",
        description: `${bundesland} hududidagi umumiy va shahar Telegram guruhlarini toping.`,
        general: "Federal yer guruhi",
        city: "Shahar guruhi",
        join: "Telegramga qo‘shilish",
      }
    : {
        back: "Zurück zu den Telegram-Gruppen",
        eyebrow: bundesland,
        title: "Community in Ihrer Region finden",
        description: `Finden Sie landesweite und lokale Telegram-Gruppen in ${bundesland}.`,
        general: "Bundesland-Gruppe",
        city: "Stadtgruppe",
        join: "Auf Telegram beitreten",
      };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20 text-slate-950 lg:pt-24 dark:bg-slate-950 dark:text-white">
        <section className="border-b border-slate-200/80 bg-gradient-to-b from-sky-50/70 to-white dark:border-slate-800 dark:from-sky-400/[0.06] dark:to-slate-950">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-11">
            <Link
              href="/telegram"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 dark:text-sky-300 dark:hover:text-sky-200 dark:focus-visible:ring-offset-slate-950"
            >
              <span aria-hidden="true">←</span>
              {copy.back}
            </Link>

            <div className="mt-6 max-w-3xl sm:mt-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
                {copy.eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {copy.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                {copy.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-7 sm:px-6 sm:py-9 lg:px-8">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {groups.map((group) => {
              const isGeneral = group.shortName === generalShortName;

              return (
                <article
                  key={group.shortName}
                  className="flex min-w-0 flex-col rounded-2xl border border-sky-200/80 bg-white p-4 shadow-sm dark:border-sky-400/15 dark:bg-white/[0.035] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                      {isGeneral ? copy.general : copy.city}
                    </span>
                    <span className={group.status === "active"
                      ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-400"}>
                      {group.statusLabel}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-bold tracking-tight sm:text-xl">
                    {group.state}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {group.description}
                  </p>

                  {group.status === "active" && group.href && (
                    <a
                      href={group.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
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
