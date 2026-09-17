import BrandName from "@/components/ui/BrandName";
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
    eyebrow: "HAMJAMIYAT E’TIROFI",
    title: "Qo‘llab-quvvatlovchilar",
    descriptionBeforeBrand: "",
    descriptionAfterBrand:
      " orqali yaxshilikka hissa qo‘shgan qo‘llab-quvvatlovchilar.",
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
      "Anonim hissalar hisobga olinadi, lekin ochiq ro‘yxatda ism ko‘rsatilmaydi.",
  },
  de: {
    eyebrow: "COMMUNITY-ANERKENNUNG",
    title: "Unterstützer",
    descriptionBeforeBrand: "Menschen, die über ",
    descriptionAfterBrand:
      " freiwillig zu einer guten Tat beigetragen haben.",
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
      "Anonyme Beiträge werden berücksichtigt, Namen erscheinen jedoch nicht in der öffentlichen Liste.",
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
    <section className="bg-white pb-14 pt-6 text-slate-950 dark:bg-slate-950 dark:text-white sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-10 dark:border-white/[0.08]">
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

          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {Array.from(
              { length: 3 },
              (_, index) => {
                const supporter =
                  topSupporters[index];

                return (
                  <article
                    key={
                      supporter
                        ? `${index}-${supporter.name}`
                        : `open-${index}`
                    }
                    className="rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-6 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.035]"
                  >
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/[0.08] dark:text-emerald-300">
                      {rankLabels[index]}
                    </span>

                    {supporter ? (
                      <>
                        <h3 className="mt-6 break-words text-xl font-black">
                          {supporter.name}
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
                        <h3 className="mt-6 text-xl font-black text-slate-500 dark:text-slate-300">
                          {currentCopy.open}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
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
                          {supporter.name}
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
