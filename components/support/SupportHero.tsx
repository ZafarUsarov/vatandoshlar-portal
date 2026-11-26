import { Inter_Tight } from "next/font/google";
import { ChevronDown } from "lucide-react";
import ShareButton from "@/components/shared/ShareButton";
import styles from "./Support.module.css";
const heading = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: "600", display: "swap" });
type SupportHeroProps = Readonly<{
  badge: string;
  title: string;
  description: string;
  action: string;
  locale: "uz" | "de";
}>;

export default function SupportHero({ badge, title, description, locale }: SupportHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="support-heading">
      <div className={styles.heroLabel}>
        <p className={styles.eyebrow}>{badge}</p>
      </div>
      <h1 id="support-heading" className={heading.className}>
        <span className={styles.desktopCopy}>{title}</span>
        <span className={styles.mobileCopy}>{locale === "de" ? "Unterstützen Sie UzDe." : "UzDe. rivojiga hissa qoşing."}</span>
      </h1>
      <p className={`${styles.description} ${styles.desktopCopy}`}>{description}</p>
      <div className={styles.mobileCopy}>
        <p className={styles.mobileIntro}>{locale === "de" ? "Ihr freiwilliger Beitrag unterstützt die Weiterentwicklung und den nachhaltigen Betrieb des Projekts." : "Sizning ixtiyoriy hissangiz loyihaning rivojlanişi va barqaror faoliyatiga xizmat qiladi."}</p>
        <div className={styles.disclosureShare}>
          <details className={styles.disclosure}>
  <summary>{locale === "de" ? "Mehr erfahren" : "Batafsil"}<ChevronDown size={16} aria-hidden="true" /></summary>
  <p>{locale === "de" ? "Mit Ihrem Beitrag helfen Sie, die Entwicklung sowie Domain-, Hosting- und technische Kosten zu finanzieren. Wir danken allen herzlich für ihre Unterstützung." : "Hissangiz loyihani rivojlantiriş, domen, hosting va texnik xarajatlarni qoplaşga yordam beradi. Bizni qöllab-quvvatlayotgan barçaga çuqur minnatdorçilik bildiramiz."}</p>
          </details>
        <div className={styles.mobileShare}>
          <ShareButton title={title} locale={locale} variant="guide" iconOnly ariaLabel={locale === "de" ? "Seite teilen" : "Sahifani ulaşiş"} />
        </div>
        </div>
        <div className={styles.charityRow}>
          <strong aria-hidden="true">20%</strong>
          <p>{locale === "de" ? "20 Prozent jedes Beitrags werden zum Jahresende berechnet und für Hilfe für Kinder in Gaza bereitgestellt." : "Har bir hissaning 20 foizi yil yakunida hisoblanib, Ǵazodagi bolalarga yordam uçun ajratiladi."}</p>
        </div>
      </div>
    </section>
  );
}
