import type {
  PublicSupportAmount,
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
    title: "Qo‘llab-quvvatlaganlar",
    description: "Loyiha faoliyati va rivojlanishiga hissa qo‘shgan insonlar.",
    contributions: "Hissalar",
    first: "1-o‘rin",
    second: "2-o‘rin",
    third: "3-o‘rin",
    open: "O‘rin ochiq",
    openDescription:
      "Keyingi qo‘llab-quvvatlovchi uchun.",
    oneContribution: "1 hissa",
    manyContributions: "hissa",
    others: "Boshqa qo‘llab-quvvatlovchilar",
    privacy:
      "Anonim hissalar shaxsiy ma’lumotsiz “Anonim” nomi bilan ko‘rsatiladi.",
  },
  de: {
    title: "Unterstützer",
    description: "Menschen, die zum Betrieb und zur Weiterentwicklung des Projekts beigetragen haben.",
    contributions: "Beiträge",
    first: "1. Platz",
    second: "2. Platz",
    third: "3. Platz",
    open: "Platz frei",
    openDescription:
      "Für den nächsten Unterstützer.",
    oneContribution: "1 Beitrag",
    manyContributions: "Beiträge",
    others: "Weitere Unterstützer",
    privacy:
      "Anonyme Beiträge werden ohne personenbezogene Daten als „Anonym“ angezeigt.",
  },
} as const;

function formatOriginalAmount(
  amount: PublicSupportAmount,
  locale: SupportedLocale,
): string {
  if (amount.currency === "UZS") {
    const value = new Intl.NumberFormat(
      locale === "de" ? "de-DE" : "uz-UZ",
      { maximumFractionDigits: 0 },
    ).format(amount.amountMinor);

    return locale === "de"
      ? `${value} UZS`
      : `${value} so‘m`;
  }

  return new Intl.NumberFormat(
    locale === "de" ? "de-DE" : "uz-UZ",
    {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits:
        amount.amountMinor % 100 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    },
  ).format(amount.amountMinor / 100);
}

function supporterDisplayName(
  supporter: PublicSupporter,
  locale: SupportedLocale,
): string {
  if (supporter.name === "__anonymous__") {
    return locale === "de" ? "Anonym" : "Anonim";
  }

  return supporter.name;
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

function Amounts({
  supporter,
  locale,
}: Readonly<{
  supporter: PublicSupporter;
  locale: SupportedLocale;
}>) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {supporter.amounts.map((amount) => (
        <span
          key={amount.currency}
          className="text-xl font-black tracking-tight text-emerald-700 dark:text-emerald-300"
        >
          {formatOriginalAmount(amount, locale)}
        </span>
      ))}
    </div>
  );
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
  const otherSupporters =
    summary.supporters.slice(3);

  return (
    <section className="bg-white pb-14 pt-4 text-slate-950 dark:bg-slate-950 dark:text-white sm:pb-16 sm:pt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-8 dark:border-white/[0.08]">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              {currentCopy.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
              {currentCopy.description}
            </p>
          </div>

          <div className="mt-8 grid items-start gap-4 lg:grid-cols-3">
            {Array.from(
              { length: 3 },
              (_, index) => {
                const supporter =
                  topSupporters[index];

                const rankStyles = [
                  {
                    card: "border-emerald-300/90 hover:border-emerald-400 focus-visible:border-emerald-400 focus-visible:ring-emerald-500/35 dark:border-emerald-400/30 dark:hover:border-emerald-400/55",
                    badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/[0.08] dark:text-emerald-300",
                    shadow:
                      "hover:shadow-[0_16px_38px_-26px_rgba(5,150,105,0.5)]",
                  },
                  {
                    card: "border-sky-300/90 hover:border-sky-400 focus-visible:border-sky-400 focus-visible:ring-sky-500/35 dark:border-sky-400/30 dark:hover:border-sky-400/55",
                    badge: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/25 dark:bg-sky-400/[0.08] dark:text-sky-300",
                    shadow:
                      "hover:shadow-[0_16px_38px_-26px_rgba(14,165,233,0.45)]",
                  },
                  {
                    card: "border-violet-300/90 hover:border-violet-400 focus-visible:border-violet-400 focus-visible:ring-violet-500/35 dark:border-violet-400/30 dark:hover:border-violet-400/55",
                    badge: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/25 dark:bg-violet-400/[0.08] dark:text-violet-300",
                    shadow:
                      "hover:shadow-[0_16px_38px_-26px_rgba(139,92,246,0.42)]",
                  },
                ] as const;

                const rankStyle = rankStyles[index];

                return (
                  <article
                    key={
                      supporter
                        ? `${index}-${supporter.name}`
                        : `open-${index}`
                    }
                    tabIndex={0}
                    className={`group self-start rounded-[1.5rem] border bg-slate-50/70 px-5 py-4 shadow-sm outline-none transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:bg-white/[0.035] dark:focus-visible:ring-offset-slate-950 ${rankStyle.card} ${rankStyle.shadow}`}
                  >
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${rankStyle.badge}`}
                    >
                      {rankLabels[index]}
                    </span>

                    {supporter ? (
                      <>
                        <h3 className="mt-4 break-words text-xl font-black">
                          {supporterDisplayName(supporter, locale)}
                        </h3>
                        <Amounts
                          supporter={supporter}
                          locale={locale}
                        />
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                          {contributionLabel(
                            supporter,
                            locale,
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="mt-4 text-xl font-black text-slate-500 dark:text-slate-300">
                          {currentCopy.open}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
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

          {otherSupporters.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {currentCopy.others}
              </h3>
              <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 dark:divide-white/[0.08] dark:border-white/[0.08]">
                {otherSupporters.map(
                  (supporter, index) => (
                    <div
                      key={supporter.name}
                      className="grid gap-2 px-5 py-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                    >
                      <span className="text-sm font-black text-slate-400">
                        #{index + 4}
                      </span>
                      <div>
                        <p className="font-bold">
                          {supporterDisplayName(supporter, locale)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {contributionLabel(
                            supporter,
                            locale,
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-x-3 sm:justify-end">
                        {supporter.amounts.map(
                          (amount) => (
                            <span
                              key={amount.currency}
                              className="font-bold text-emerald-700 dark:text-emerald-300"
                            >
                              {formatOriginalAmount(
                                amount,
                                locale,
                              )}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs leading-6 text-slate-500 dark:text-slate-500">
            <span>
              {currentCopy.contributions}:{" "}
              {summary.contributionCount}
            </span>
            <span>{currentCopy.privacy}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
