import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import {
  getAdminAnalyticsSnapshot,
  type AnalyticsCountryStat,
  type AnalyticsDailyStat,
  type AnalyticsLocaleStat,
  type AnalyticsPageStat,
} from "@/lib/analytics/admin-analytics-repository";
import { requireAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === "de"
        ? "Website-Analyse"
        : "Sayt analitikasi",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · ANALITIKA",
    title: "Sayt analitikasi",
    description:
      "Vatandoshlar.de sahifalarining ko‘rilishi, tashrif buyuruvchilar davlati va til bo‘yicha yig‘ilgan maxfiylikka yo‘naltirilgan statistikani kuzating.",
    back: "Boshqaruv paneliga qaytish",
    today: "Bugun",
    last7Days: "Oxirgi 7 kun",
    last30Days: "Oxirgi 30 kun",
    allTime: "Jami",
    countries: "Davlatlar",
    countriesDescription:
      "Oxirgi 30 kunlik sahifa ko‘rishlari.",
    locales: "Tillar",
    localesDescription:
      "Oxirgi 30 kunlik ko‘rishlarning sayt tili bo‘yicha taqsimoti.",
    topPages: "Eng ko‘p ko‘rilgan sahifalar",
    topPagesDescription:
      "Oxirgi 30 kun bo‘yicha Top 20.",
    daily: "Kunlik trafik",
    dailyDescription:
      "Oxirgi 30 kunlik sahifa ko‘rishlari.",
    views: "ko‘rish",
    unknownCountry: "Noma’lum",
    empty: "Hozircha ma’lumot yo‘q.",
    localeUz: "O‘zbekcha",
    localeDe: "Nemischa",
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · ANALYSE",
    title: "Website-Analyse",
    description:
      "Beobachten Sie die datenschutzorientiert erfassten Seitenaufrufe von Vatandoshlar.de nach Zeitraum, Herkunftsland und Sprache.",
    back: "Zurück zum Verwaltungsbereich",
    today: "Heute",
    last7Days: "Letzte 7 Tage",
    last30Days: "Letzte 30 Tage",
    allTime: "Gesamt",
    countries: "Länder",
    countriesDescription:
      "Seitenaufrufe der letzten 30 Tage.",
    locales: "Sprachen",
    localesDescription:
      "Verteilung der Aufrufe der letzten 30 Tage nach Website-Sprache.",
    topPages: "Meistbesuchte Seiten",
    topPagesDescription:
      "Top 20 der letzten 30 Tage.",
    daily: "Täglicher Traffic",
    dailyDescription:
      "Seitenaufrufe der letzten 30 Tage.",
    views: "Aufrufe",
    unknownCountry: "Unbekannt",
    empty: "Noch keine Daten vorhanden.",
    localeUz: "Usbekisch",
    localeDe: "Deutsch",
  },
} as const;

function formatNumber(
  value: number,
  locale: "uz" | "de",
): string {
  return new Intl.NumberFormat(
    locale === "de"
      ? "de-DE"
      : "uz-UZ",
  ).format(value);
}

function formatDay(
  value: string,
  locale: "uz" | "de",
): string {
  return new Intl.DateTimeFormat(
    locale === "de"
      ? "de-DE"
      : "uz-UZ",
    {
      day: "2-digit",
      month: "2-digit",
    },
  ).format(
    new Date(`${value}T12:00:00Z`),
  );
}

function getCountryName(
  countryCode: string,
  locale: "uz" | "de",
  unknownLabel: string,
): string {
  if (countryCode === "ZZ") {
    return unknownLabel;
  }

  try {
    const displayNames =
      new Intl.DisplayNames(
        [
          locale === "de"
            ? "de"
            : "uz",
        ],
        {
          type: "region",
        },
      );

    return (
      displayNames.of(countryCode) ??
      countryCode
    );
  } catch {
    return countryCode;
  }
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function CountryList({
  items,
  locale,
  viewsLabel,
  unknownLabel,
  emptyLabel,
}: {
  items: ReadonlyArray<AnalyticsCountryStat>;
  locale: "uz" | "de";
  viewsLabel: string;
  unknownLabel: string;
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
      {items.map((item) => (
        <div
          key={item.countryCode}
          className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {getCountryName(
                item.countryCode,
                locale,
                unknownLabel,
              )}
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
              {item.countryCode}
            </p>
          </div>

          <p className="shrink-0 text-sm font-black text-slate-700 dark:text-slate-200">
            {formatNumber(
              item.views,
              locale,
            )}{" "}
            <span className="font-medium text-slate-400">
              {viewsLabel}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

function LocaleList({
  items,
  locale,
  viewsLabel,
  emptyLabel,
  uzLabel,
  deLabel,
}: {
  items: ReadonlyArray<AnalyticsLocaleStat>;
  locale: "uz" | "de";
  viewsLabel: string;
  emptyLabel: string;
  uzLabel: string;
  deLabel: string;
}) {
  if (items.length === 0) {
    return (
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {emptyLabel}
      </p>
    );
  }

  const total = items.reduce(
    (sum, item) =>
      sum + item.views,
    0,
  );

  return (
    <div className="mt-5 space-y-5">
      {items.map((item) => {
        const percentage =
          total > 0
            ? Math.round(
                (item.views / total) * 100,
              )
            : 0;

        return (
          <div key={item.locale}>
            <div className="flex items-center justify-between gap-4 text-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                {item.locale === "de"
                  ? deLabel
                  : uzLabel}
              </p>

              <p className="font-black text-slate-700 dark:text-slate-200">
                {formatNumber(
                  item.views,
                  locale,
                )}{" "}
                <span className="font-medium text-slate-400">
                  {viewsLabel}
                </span>
              </p>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-500"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <p className="mt-1 text-right text-xs font-bold text-slate-400">
              {percentage}%
            </p>
          </div>
        );
      })}
    </div>
  );
}

function TopPagesList({
  items,
  locale,
  viewsLabel,
  emptyLabel,
}: {
  items: ReadonlyArray<AnalyticsPageStat>;
  locale: "uz" | "de";
  viewsLabel: string;
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
      {items.map((item, index) => (
        <div
          key={item.path}
          className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0 dark:border-slate-800"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {index + 1}
          </span>

          <code className="min-w-0 flex-1 truncate text-xs font-bold text-slate-700 dark:text-slate-200 sm:text-sm">
            {item.path}
          </code>

          <p className="shrink-0 text-sm font-black text-slate-900 dark:text-white">
            {formatNumber(
              item.views,
              locale,
            )}{" "}
            <span className="hidden font-medium text-slate-400 sm:inline">
              {viewsLabel}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

function DailyTraffic({
  items,
  locale,
  emptyLabel,
}: {
  items: ReadonlyArray<AnalyticsDailyStat>;
  locale: "uz" | "de";
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {emptyLabel}
      </p>
    );
  }

  const maxViews = Math.max(
    ...items.map(
      (item) => item.views,
    ),
    1,
  );

  return (
    <div className="mt-6 overflow-x-auto pb-2">
      <div className="flex min-w-[720px] items-end gap-2">
        {items.map((item) => {
          const height =
            item.views > 0
              ? Math.max(
                  8,
                  Math.round(
                    (item.views /
                      maxViews) *
                      160,
                  ),
                )
              : 2;

          return (
            <div
              key={item.day}
              className="flex min-w-0 flex-1 flex-col items-center"
            >
              <p className="mb-2 text-[10px] font-black text-slate-500 dark:text-slate-400">
                {formatNumber(
                  item.views,
                  locale,
                )}
              </p>

              <div className="flex h-40 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-cyan-500/80"
                  style={{
                    height: `${height}px`,
                  }}
                  title={`${item.day}: ${formatNumber(
                    item.views,
                    locale,
                  )}`}
                />
              </div>

              <p className="mt-2 whitespace-nowrap text-[10px] font-bold text-slate-400">
                {formatDay(
                  item.day,
                  locale,
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  const locale = await getLocale();

  const appLocale =
    locale === "de"
      ? "de"
      : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  await requireAdmin(appLocale);

  const snapshot =
    await getAdminAnalyticsSnapshot();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin"
            className="inline-flex text-sm font-bold text-cyan-700 transition hover:text-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:text-cyan-400 dark:hover:text-cyan-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <div className="mt-7 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
              {currentCopy.eyebrow}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {currentCopy.title}
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {currentCopy.description}
            </p>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label={currentCopy.today}
            value={snapshot.summary.today}
          />
          <SummaryCard
            label={currentCopy.last7Days}
            value={snapshot.summary.last7Days}
          />
          <SummaryCard
            label={currentCopy.last30Days}
            value={snapshot.summary.last30Days}
          />
          <SummaryCard
            label={currentCopy.allTime}
            value={snapshot.summary.allTime}
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              {currentCopy.countries}
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {currentCopy.countriesDescription}
            </p>

            <CountryList
              items={snapshot.countries}
              locale={appLocale}
              viewsLabel={currentCopy.views}
              unknownLabel={
                currentCopy.unknownCountry
              }
              emptyLabel={currentCopy.empty}
            />
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              {currentCopy.locales}
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {currentCopy.localesDescription}
            </p>

            <LocaleList
              items={snapshot.locales}
              locale={appLocale}
              viewsLabel={currentCopy.views}
              emptyLabel={currentCopy.empty}
              uzLabel={currentCopy.localeUz}
              deLabel={currentCopy.localeDe}
            />
          </article>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            {currentCopy.daily}
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {currentCopy.dailyDescription}
          </p>

          <DailyTraffic
            items={snapshot.daily}
            locale={appLocale}
            emptyLabel={currentCopy.empty}
          />
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            {currentCopy.topPages}
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {currentCopy.topPagesDescription}
          </p>

          <TopPagesList
            items={snapshot.topPages}
            locale={appLocale}
            viewsLabel={currentCopy.views}
            emptyLabel={currentCopy.empty}
          />
        </section>
      </div>
    </main>
  );
}
