import { Inter_Tight } from "next/font/google";
import { getLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShareButton from "@/components/shared/ShareButton";
import { Link } from "@/i18n/navigation";
import { getPublicTelegramGroups } from "@/lib/telegram/public-telegram-repository";
import type { SupportedTelegramLocale } from "@/types/telegram";

const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: "600", display: "swap" });

type Props = {
  bundesland: "Baden-Württemberg" | "Bayern" | "Niedersachsen";
  generalShortName: "BW" | "BY" | "NI";
};

export default async function TelegramRegionPage({ bundesland, generalShortName }: Props) {
  const locale = (await getLocale()) as SupportedTelegramLocale;
  const groups = (await getPublicTelegramGroups(locale))
    .filter((group) => group.communityType === "regional" && group.bundesland === bundesland)
    .sort((a, b) => Number(b.shortName === generalShortName) - Number(a.shortName === generalShortName));
  const regionSlug = { BW: "baden-wuerttemberg", BY: "bayern", NI: "niedersachsen" }[generalShortName];
  const copy = locale === "uz"
    ? {
        back: "Telegram guruhlariga qaytish",
        eyebrow: bundesland,
        title: "Telegram guruhlari",
        description: `${bundesland} hududidagi umumiy va shahar Telegram guruhlarini toping.`,
        catalog: "GURUHLAR",
        general: "Federal yer guruhi",
        city: "Shahar guruhi",
        join: "Telegramga qo‘shilish",
      }
    : {
        back: "Zurück zu den Telegram-Gruppen",
        eyebrow: bundesland,
        title: "Telegram-Gruppen",
        description: `Finden Sie landesweite und lokale Telegram-Gruppen in ${bundesland}.`,
        catalog: "GRUPPEN",
        general: "Bundesland-Gruppe",
        city: "Stadtgruppe",
        join: "Auf Telegram beitreten",
      };

  return (
    <>
      <Header />
      <main className="uzde-telegram-page uzde-home-frame min-h-screen bg-[var(--uzde-page-bg)] pt-20 text-slate-950 lg:pt-24 dark:text-white">
        <section className="bg-[var(--uzde-page-bg)]">
          <div className="mx-auto w-full max-w-[var(--uzde-layout-width)] px-[clamp(16px,3.3vw,112px)] pt-8 sm:pt-10 lg:pt-11">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/telegram"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:text-[var(--telegram-secondary)] dark:hover:text-[var(--telegram-accent)]"
              >
                <span aria-hidden="true">←</span>
                {copy.back}
              </Link>
            </div>

            <div className="mx-auto mt-6 max-w-4xl text-center sm:mt-9 lg:mt-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-700 dark:text-[var(--telegram-accent)]">
                {copy.eyebrow}
              </p>
              <h1 className={`${interTight.className} mt-4 text-[clamp(2.375rem,9vw,3.25rem)] font-semibold leading-none tracking-normal uppercase text-slate-950 sm:mt-5 sm:text-[clamp(3.25rem,6vw,4.25rem)] lg:mt-6 lg:text-[clamp(4.25rem,5vw,4.706rem)] dark:text-white`}>
                {copy.title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-[var(--telegram-secondary)] sm:mt-5 sm:text-lg sm:leading-8">
                {copy.description}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[var(--uzde-layout-width)] px-[clamp(16px,3.3vw,112px)] pb-10 pt-8 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-16">
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-[var(--telegram-border)] sm:mb-6">
            <h2 className="text-xl font-bold text-neutral-950 dark:text-white sm:text-2xl">{copy.catalog}</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums text-neutral-500 dark:text-[var(--telegram-muted)]">{groups.length}</span>
              <div className="md:hidden">
                <ShareButton
                    title={`${copy.title} – ${bundesland}`}
                    locale={locale}
                    shareUrl={`https://uzde.de/${locale}/telegram/${regionSlug}`}
                    variant="guide"
                    iconOnly
                    ariaLabel={locale === "uz" ? "Sahifani ulashish" : "Seite teilen"}
                   />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:gap-5">
            {groups.map((group) => {
              const isGeneral = group.shortName === generalShortName;

              return (
                <article
                  key={group.shortName}
                  className="group flex min-w-0 flex-col rounded-[18px] border border-slate-200 bg-[var(--telegram-region-card-bg)] p-4 transition-colors hover:border-teal-400 dark:rounded-[14px] dark:border-[var(--telegram-border)] dark:hover:border-[var(--telegram-accent)] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 dark:text-[var(--telegram-accent)]">
                      {isGeneral ? copy.general : copy.city}
                    </span>
                    <span className={group.status === "active"
                      ? "text-xs font-medium text-emerald-700 dark:text-[var(--telegram-accent)]"
                      : "text-xs font-medium text-slate-500 dark:text-[var(--telegram-secondary)]"}>
                      {group.statusLabel}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.035em]">
                    {group.state}
                  </h2>
                  <p className="mt-2 md:flex-1 text-sm leading-6 text-slate-600 dark:text-[var(--telegram-secondary)]">
                    {group.description}
                  </p>

                  {group.status === "active" && group.href && (
                    <a
                      href={group.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-[var(--telegram-border)] dark:text-white dark:hover:text-[var(--telegram-accent)]"
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
