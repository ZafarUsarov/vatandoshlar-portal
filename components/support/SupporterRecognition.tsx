import BrandName from "@/components/ui/BrandName";
import type {
  PublicSupportSummary,
  PublicSupporter,
} from "@/lib/support/public-support-repository";

type SupportedLocale = "uz" | "de";

type SupporterRecognitionProps = Readonly<{
  locale: SupportedLocale;
  summary: PublicSupportSummary;
}>;

const copy = {
  uz: {
    eyebrow: "HAMJAMIYAT E’TIROFI",
    title: "Top qo‘llab-quvvatlovchilar",
    descriptionBeforeBrand: "",
    descriptionAfterBrand:
      " rivojiga hissa qo‘shganlar jami tasdiqlangan hissalar bo‘yicha avtomatik tartiblanadi.",
    total: "Tasdiqlangan jami",
    contributions: "Hissalar",
    first: "1-o‘rin",
    second: "2-o‘rin",
    third: "3-o‘rin",
    open: "O‘rin ochiq",
    openDescription:
      "Keyingi qo‘llab-quvvatlovchi uchun.",
    oneContribution: "1 hissa",
    manyContributions: "hissa",
    privacy:
      "Anonim hissalar umumiy summaga kiradi, lekin ochiq reytingda ism ko‘rsatilmaydi.",
  },
  de: {
    eyebrow: "COMMUNITY-ANERKENNUNG",
    title: "Top-Unterstützer",
    descriptionBeforeBrand: "Unterstützer von ",
    descriptionAfterBrand:
      " werden automatisch nach der Summe ihrer bestätigten Beiträge geordnet.",
    total: "Bestätigte Summe",
    contributions: "Beiträge",
    first: "1. Platz",
    second: "2. Platz",
    third: "3. Platz",
    open: "Platz frei",
    openDescription:
      "Für den nächsten Unterstützer.",
    oneContribution: "1 Beitrag",
    manyContributions: "Beiträge",
    privacy:
      "Anonyme Beiträge fließen in die Gesamtsumme ein, Namen werden jedoch nicht in der öffentlichen Rangliste angezeigt.",
  },
} as const;

const rankStyles = [
  {
    card:
      "border-emerald-300/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/80 shadow-[0_18px_50px_-32px_rgba(5,150,105,0.55)] hover:border-emerald-400 hover:shadow-[0_24px_60px_-32px_rgba(5,150,105,0.7)] focus-visible:border-emerald-400 focus-visible:shadow-[0_24px_60px_-32px_rgba(5,150,105,0.7)] dark:border-emerald-400/25 dark:from-emerald-500/[0.13] dark:via-slate-900 dark:to-teal-400/[0.07] dark:hover:border-emerald-400/45 dark:focus-visible:border-emerald-400/45",
    badge:
      "border-emerald-200 bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 dark:border-emerald-400/30 dark:bg-emerald-500 dark:text-slate-950",
    amount:
      "text-emerald-700 dark:text-emerald-300",
    rankNumber:
      "text-emerald-700/30 dark:text-emerald-300/25",
    ornament:
      "bg-emerald-400/10 group-hover:bg-emerald-400/15 group-focus-visible:bg-emerald-400/15 dark:bg-emerald-300/[0.06]",
    award:
      "border-amber-200/80 bg-amber-50 text-amber-600 shadow-sm shadow-amber-500/10 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-300",
    openCard:
      "border-emerald-200/70 bg-emerald-50/30 dark:border-emerald-400/15 dark:bg-emerald-400/[0.035]",
  },
  {
    card:
      "border-sky-200/90 bg-gradient-to-br from-sky-50/80 via-white to-slate-50 shadow-[0_16px_44px_-34px_rgba(14,116,144,0.45)] hover:border-sky-300 hover:shadow-[0_22px_54px_-34px_rgba(14,116,144,0.58)] focus-visible:border-sky-300 focus-visible:shadow-[0_22px_54px_-34px_rgba(14,116,144,0.58)] dark:border-sky-400/20 dark:from-sky-400/[0.08] dark:via-slate-900 dark:to-slate-900 dark:hover:border-sky-400/35 dark:focus-visible:border-sky-400/35",
    badge:
      "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200",
    amount:
      "text-sky-800 dark:text-sky-200",
    rankNumber:
      "text-sky-700/25 dark:text-sky-300/20",
    ornament:
      "bg-sky-400/[0.07] group-hover:bg-sky-400/10 group-focus-visible:bg-sky-400/10 dark:bg-sky-300/[0.045]",
    award: "",
    openCard:
      "border-sky-300/90 bg-sky-50/35 hover:border-sky-400 focus-visible:border-sky-400 dark:border-sky-400/35 dark:bg-sky-400/[0.035] dark:hover:border-sky-300/55 dark:focus-visible:border-sky-300/55",
  },
  {
    card:
      "border-violet-200/90 bg-gradient-to-br from-violet-50/70 via-white to-amber-50/40 shadow-[0_16px_44px_-34px_rgba(124,58,237,0.4)] hover:border-violet-300 hover:shadow-[0_22px_54px_-34px_rgba(124,58,237,0.52)] focus-visible:border-violet-300 focus-visible:shadow-[0_22px_54px_-34px_rgba(124,58,237,0.52)] dark:border-violet-400/20 dark:from-violet-400/[0.08] dark:via-slate-900 dark:to-amber-300/[0.035] dark:hover:border-violet-400/35 dark:focus-visible:border-violet-400/35",
    badge:
      "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200",
    amount:
      "text-violet-800 dark:text-violet-200",
    rankNumber:
      "text-violet-700/25 dark:text-violet-300/20",
    ornament:
      "bg-violet-400/[0.07] group-hover:bg-violet-400/10 group-focus-visible:bg-violet-400/10 dark:bg-violet-300/[0.045]",
    award: "",
    openCard:
      "border-violet-300/90 bg-violet-50/35 hover:border-violet-400 focus-visible:border-violet-400 dark:border-violet-400/35 dark:bg-violet-400/[0.035] dark:hover:border-violet-300/55 dark:focus-visible:border-violet-300/55",
  },
] as const;

function CrownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m4 7 4.2 4L12 5l3.8 6L20 7l-1.5 10h-13L4 7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M6 20h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function formatEuro(
  cents: number,
  locale: SupportedLocale,
): string {
  return new Intl.NumberFormat(
    locale === "de" ? "de-DE" : "uz-UZ",
    {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  ).format(cents / 100);
}

function contributionLabel(
  supporter: PublicSupporter,
  locale: SupportedLocale,
): string {
  const currentCopy =
    locale === "de" ? copy.de : copy.uz;

  if (supporter.contributionCount === 1) {
    return currentCopy.oneContribution;
  }

  return locale === "de"
    ? `${supporter.contributionCount} ${currentCopy.manyContributions}`
    : `${supporter.contributionCount} ta ${currentCopy.manyContributions}`;
}

export default function SupporterRecognition({
  locale,
  summary,
}: SupporterRecognitionProps) {
  const currentCopy =
    locale === "de" ? copy.de : copy.uz;

  const rankLabels = [
    currentCopy.first,
    currentCopy.second,
    currentCopy.third,
  ];

  const topSupporters =
    summary.supporters.slice(0, 3);

  return (
    <section className="relative isolate overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 py-16 text-slate-950 dark:border-white/[0.08] dark:from-slate-950 dark:via-emerald-950/[0.12] dark:to-slate-950 dark:text-white sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[54rem] -translate-x-1/2 rounded-full bg-emerald-300/[0.10] blur-3xl dark:bg-emerald-400/[0.045]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {currentCopy.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                {currentCopy.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                {currentCopy.descriptionBeforeBrand}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  <BrandName />
                </span>
                {currentCopy.descriptionAfterBrand}
              </p>
            </div>

            <dl className="grid shrink-0 grid-cols-2 gap-3">
              <div className="group min-w-[9rem] rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-white/90 to-teal-50/60 px-4 py-3 shadow-[0_12px_32px_-24px_rgba(5,150,105,0.45)] backdrop-blur transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_16px_38px_-24px_rgba(5,150,105,0.55)] motion-reduce:transform-none motion-reduce:transition-none dark:border-emerald-400/20 dark:from-emerald-500/[0.09] dark:via-white/[0.035] dark:to-teal-400/[0.045] dark:hover:border-emerald-400/35">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
                  {currentCopy.total}
                </dt>
                <dd className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                  {formatEuro(
                    summary.totalEurCents,
                    locale,
                  )}
                </dd>
              </div>

              <div className="group min-w-[8rem] rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/65 via-white/90 to-slate-50/80 px-4 py-3 shadow-[0_12px_32px_-24px_rgba(14,116,144,0.38)] backdrop-blur transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_16px_38px_-24px_rgba(14,116,144,0.48)] motion-reduce:transform-none motion-reduce:transition-none dark:border-sky-400/18 dark:from-sky-400/[0.07] dark:via-white/[0.03] dark:to-slate-800/[0.16] dark:hover:border-sky-400/30">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
                  {currentCopy.contributions}
                </dt>
                <dd className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                  {summary.contributionCount}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {Array.from(
              { length: 3 },
              (_, index) => {
                const supporter =
                  topSupporters[index];

                const styles =
                  rankStyles[index];

                return (
                  <article
                    key={
                      supporter
                        ? `${index}-${supporter.name}`
                        : `open-${index}`
                    }
                    tabIndex={0}
                    aria-label={
                      supporter
                        ? `${rankLabels[index]}: ${supporter.name}, ${formatEuro(
                            supporter.totalEurCents,
                            locale,
                          )}`
                        : `${rankLabels[index]}: ${currentCopy.open}`
                    }
                    className={`group relative min-h-[15rem] overflow-hidden rounded-[2rem] border p-6 shadow-sm outline-none transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 motion-reduce:transform-none motion-reduce:transition-none dark:focus-visible:ring-emerald-400/35 dark:focus-visible:ring-offset-slate-950 sm:p-7 ${
                      supporter
                        ? styles.card
                        : styles.openCard
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-2xl transition-colors duration-200 motion-reduce:transition-none ${styles.ornament}`}
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <span
                        className={`inline-flex min-h-9 items-center justify-center rounded-full border px-3 text-xs font-black ${styles.badge}`}
                      >
                        {rankLabels[index]}
                      </span>

                      <div className="flex items-center gap-2">
                        {supporter && index === 0 && (
                          <span
                            title={
                              locale === "de"
                                ? "Top-Unterstützer"
                                : "Top qo‘llab-quvvatlovchi"
                            }
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${styles.award}`}
                          >
                            <span className="sr-only">
                              {locale === "de"
                                ? "Top-Unterstützer"
                                : "Top qo‘llab-quvvatlovchi"}
                            </span>
                            <CrownIcon />
                          </span>
                        )}

                        <span
                          aria-hidden="true"
                          className={`text-sm font-black ${styles.rankNumber}`}
                        >
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    {supporter ? (
                      <>
                        <h3 className="relative mt-8 break-words text-2xl font-black tracking-[-0.025em] text-slate-950 dark:text-white">
                          {supporter.name}
                        </h3>

                        <p
                          className={`relative mt-3 text-2xl font-black tracking-tight ${styles.amount}`}
                        >
                          {formatEuro(
                            supporter.totalEurCents,
                            locale,
                          )}
                        </p>

                        <p className="relative mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                          {contributionLabel(
                            supporter,
                            locale,
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="relative mt-8 text-2xl font-black tracking-tight text-slate-500 dark:text-slate-300">
                          {currentCopy.open}
                        </h3>

                        <p className="relative mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                          {
                            currentCopy.openDescription
                          }
                        </p>
                      </>
                    )}
                  </article>
                );
              },
            )}
          </div>

          <p className="mt-6 text-xs leading-6 text-slate-500 dark:text-slate-500">
            {currentCopy.privacy}
          </p>
        </div>
      </div>
    </section>
  );
}
