import styles from "./Support.module.css";
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

export default function SupporterRecognition({ locale, summary }: SupporterRecognitionProps) {
  const currentCopy = copy[locale];
  return (
    <section className={styles.section} aria-labelledby="supporters-title">
      <h2 id="supporters-title"><span className={styles.desktopCopy}>{currentCopy.title}</span><span className={styles.mobileCopy}>{locale === "de" ? "Unterstützer" : "Hissa qoşganlar"}</span></h2>
      <p className={styles.description}><span className={styles.desktopCopy}>{currentCopy.description}</span><span className={styles.mobileCopy}>{locale === "de" ? "Wir danken allen, die UzDe. unterstützen." : "UzDe. rivojiga hissa qoşayotgan barçaga minnatdormiz."}</span></p>
      {summary.supporters.length > 0 && (
        <ol className={styles.topSupporters} data-count={Math.min(summary.supporters.length, 3)}>
          {summary.supporters.slice(0, 3).map((supporter, index) => (
            <li key={supporter.name} className={styles.topSupporter} data-rank={index + 1}>
              <span className={styles.rank}>{locale === "de" ? `${index + 1}. Platz` : `${index + 1}-örin`}</span>
              <h3>{supporterDisplayName(supporter, locale)}</h3>
              <div className={styles.topAmounts}>{supporter.amounts.map(amount => <span key={amount.currency}>{formatOriginalAmount(amount, locale)}</span>)}</div>
              <p className={styles.note}>{contributionLabel(supporter, locale)}</p>
            </li>
          ))}
        </ol>
      )}
      {summary.supporters.length > 3 && (
        <div className={styles.otherSupporters}>
          <h3 className={styles.otherHeading}>{currentCopy.others}</h3>
          <ol start={4} className={styles.supporters}>
            {summary.supporters.slice(3).map((supporter, index) => (
              <li key={supporter.name} className={styles.supporter}>
                <span className={styles.rank}>{String(index + 4).padStart(2, "0")}</span>
                <div><h3>{supporterDisplayName(supporter, locale)}</h3><p className={styles.note}>{contributionLabel(supporter, locale)}</p></div>
                <div className={styles.amounts}>{supporter.amounts.map(amount => <span key={amount.currency}>{formatOriginalAmount(amount, locale)}</span>)}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
      {summary.supporters.length === 0 && <p className={styles.note}>{locale === "de" ? "Noch keine öffentlichen Beiträge." : "Hozirça oçiq hissalar mavjud emas."}</p>}
      <p className={styles.note}>{currentCopy.contributions}: {summary.contributionCount} · {currentCopy.privacy}</p>
    </section>
  );
}
