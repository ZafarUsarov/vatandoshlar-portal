import styles from "./Impressum.module.css";
import { Inter_Tight } from "next/font/google";
import type { Metadata } from "next";
import { ArrowUpRight, Globe, Mail } from "lucide-react";
import FounderAvatar from "./FounderAvatar";
import { specialists } from "@/data/specialists";
import { getLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BrandName from "@/components/ui/BrandName";
import { imprint } from "@/data/legal/imprint";
import { Link } from "@/i18n/navigation";
const copy = {
  uz: {
    eyebrow: "HUQUQIY MA’LUMOT",
    title: "Impressum",
    description:
      "UzDe — Germaniyada yashayotgan hamda Germaniyaga kelishni rejalashtirayotgan o‘zbekistonliklar uchun axborot va hamjamiyat platformasi.",
    operator: "Platforma operatori",
    founderRole: "UzDe asoschisi va platforma boshqaruvchisi",
    founderPlatform:
      "UzDe — Germaniyadagi o‘zbekistonliklar uchun mustaqil axborot va hamjamiyat platformasi.",
    operatorText:
      "UzDe xususiy, notijorat axborot va hamjamiyat loyihasidir.",
    address: "Pochta manzili",
    editorial: "§ 18 Abs. 2 MStV bo‘yicha jurnalistik-tahririy mas’ul",
    editorialAddressReference: "Manzil yuqorida ko‘rsatilgan.",
    contact: "Aloqa",
    website: "Veb-sayt",
    metadataDescription: "UzDe platformasining operatori, aloqa manzili va tahririy mas’ul shaxs haqidagi huquqiy ma’lumotlar.",
  },
  de: {
    eyebrow: "RECHTLICHE INFORMATIONEN",
    title: "Impressum",
    description:
      "UzDe ist eine Informations- und Community-Plattform für Menschen aus Usbekistan, die bereits in Deutschland leben oder planen, nach Deutschland zu kommen.",
    operator: "Angaben zum Diensteanbieter",
    founderRole: "Gründer und Betreiber der Plattform UzDe",
    founderPlatform:
      "UzDe — eine unabhängige Informations- und Community-Plattform für Menschen aus Usbekistan in Deutschland.",
    operatorText:
      "UzDe ist ein privat betriebenes, nicht kommerzielles Informations- und Community-Projekt.",
    address: "Postanschrift",
    editorial: "Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV",
    editorialAddressReference: "Anschrift wie oben.",
    contact: "Kontakt",
    website: "Website",
    metadataDescription: "Rechtliche Angaben zum Betreiber, zur Kontaktanschrift und zur redaktionell verantwortlichen Person von UzDe.",
  },
} as const;
const founderAvatarUrl =
  specialists.find((specialist) => specialist.slug === "zafar-usarov")
    ?.avatarUrl ?? null;

const heading = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: "600", display: "swap" });

export default async function ImpressumPage() {
  const locale = await getLocale();
  const t = locale === "de" ? copy.de : copy.uz;

  return (
    <div className={styles.surface}>
      <Header />
      <main id="top" className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>UZDE. / {t.eyebrow}</p>
          <h1 className={heading.className}>{t.title}.</h1>
          <p className={styles.description}><BrandName className="text-inherit" />{t.description.slice(4)}</p>
        </header>
        <div className={styles.columns}>
          <section className={styles.section} aria-labelledby="operator-heading">
            <h2 id="operator-heading" className={heading.className}>{t.operator}</h2>
            <p><BrandName className="text-inherit" />{t.founderPlatform.slice(4)}</p>
            <p><BrandName className="text-inherit" />{t.operatorText.slice(4)}</p>
            <address className={styles.address}>
              <strong>{imprint.operatorName}</strong>
              {imprint.serviceAddress.map((line) => <span key={line}>{line}</span>)}
            </address>
          </section>
          <section className={styles.section} aria-labelledby="contact-heading">
            <h2 id="contact-heading" className={heading.className}>{t.contact}</h2>
            <div className={styles.profile}>
              <div className={styles.avatar}><FounderAvatar src={founderAvatarUrl} alt="Zafar Usarov" /></div>
              <div className={styles.profileText}>
                <Link href="/about/founder" className={styles.name}>Zafar Usarov</Link>
                <p>{t.founderRole}</p>
              </div>
            </div>
            <div className={styles.contacts}>
              <a href={imprint.website} className={styles.contactRow}>
                <Globe aria-hidden="true" size={19} strokeWidth={1.8} />
                <span>{imprint.website}</span>
                <ArrowUpRight aria-hidden="true" size={19} />
              </a>
              <a href={`mailto:${imprint.email}`} className={styles.contactRow}>
                <Mail aria-hidden="true" size={19} strokeWidth={1.8} />
                <span>{imprint.email}</span>
                <ArrowUpRight aria-hidden="true" size={19} />
              </a>
            </div>
          </section>
        </div>
        <section aria-labelledby="editorial-responsibility" className={`${styles.section} ${styles.editorial}`}>
          <h2 id="editorial-responsibility" className={heading.className}>{t.editorial}</h2>
          <div className={styles.address}>
            <strong>{imprint.editorialResponsible}</strong>
            <span>{t.editorialAddressReference}</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = locale === "de" ? copy.de : copy.uz;
  return {
    title: t.title,
    description: t.metadataDescription,
    robots: { index: true, follow: true },
  };
}
