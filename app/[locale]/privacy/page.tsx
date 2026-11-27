import styles from "./Privacy.module.css";
import PrivacyTableOfContents from "./PrivacyTableOfContents";
import { Inter_Tight } from "next/font/google";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BrandName from "@/components/ui/BrandName";
import { Link } from "@/i18n/navigation";

type SupportedPrivacyLocale =
  | "uz"
  | "de";

const copy = {
  uz: {
    metadataTitle: "Maxfiylik siyosati",
    metadataDescription:
      "UzDe saytida shaxsiy ma’lumotlar va texnik ma’lumotlar qanday qayta ishlanishi haqida ma’lumot.",
    eyebrow: "MAXFIYLIK",
    title: "Maxfiylik siyosati",
    intro:
      "Ushbu sahifada platformadan foydalanganda qanday texnik va shaxsiy ma’lumotlar qayta ishlanishi, nima maqsadda ishlatilishi va qanday himoya qilinishi tushuntiriladi.",
    updatedLabel: "Yangilangan sana",
    updatedValue: "16.09.2026",
    tocTitle: "Ushbu sahifada",
    controllerTitle: "1. Ma’lumotlarni qayta ishlash uchun mas’ul shaxs",
    controllerBody:
      "UzDe loyihasidagi ma’lumotlarni qayta ishlash uchun mas’ul shaxs: Zafar Usarov.",
    contactLabel: "Aloqa",
    hostingTitle: "2. Hosting va server loglari",
    hostingBody:
      "UzDe Railway infratuzilmasida joylashtirilgan. Saytga murojaat qilinganda hosting va server tizimlari xizmatni yetkazib berish, xavfsizlikni ta’minlash va texnik xatolarni aniqlash uchun IP manzil, so‘rov vaqti, so‘ralgan resurs, brauzer yoki User-Agent kabi texnik ma’lumotlarni qayta ishlashi mumkin.",
    hostingBasis:
      "Qayta ishlashning maqsadi platformani ishonchli va xavfsiz taqdim etishdir. Zarur bo‘lgan hollarda huquqiy asos GDPR 6(1)(f)-moddasidagi qonuniy manfaat hisoblanadi.",
    hostingTransfer:
      "Railway AQShda joylashgan xizmat ko‘rsatuvchi hisoblanadi. Railway o‘z hujjatlarida Yevropa ma’lumotlarini himoya qilish uchun Data Processing Addendum, Standard Contractual Clauses va EU-U.S. Data Privacy Framework mexanizmlaridan foydalanishini bildiradi.",
    railwayPrivacy: "Railway maxfiylik siyosati",
    analyticsTitle: "3. First-party sayt analitikasi",
    analyticsBody:
      "UzDe tashriflar sonini o‘z serveri orqali hisoblaydi. Brauzer faqat joriy sayt tili va sahifa yo‘lini UzDe API endpointiga yuboradi. Server so‘rovdagi IP manzilni mahalliy GeoLite2 Country ma’lumotlar bazasi yordamida davlat kodiga aylantiradi.",
    analyticsStorage:
      "Analitika jadvalida faqat sana, davlat kodi, sayt tili, sahifa yo‘li va agregat ko‘rishlar soni saqlanadi. Raw IP manzil analitika jadvalida saqlanmaydi. GeoIP lookup vaqtida tashrif buyuruvchining IP manzili MaxMind’ga yuborilmaydi, chunki lookup serverdagi mahalliy database fayli bilan bajariladi.",
    analyticsCookies:
      "Ushbu first-party analitika uchun alohida analytics yoki marketing cookie yaratilmaydi. Maqsad — qaysi sahifalar foydali ekanini tushunish, platformani yaxshilash va texnik foydalanish tendensiyalarini ko‘rish.",
    contentViewsTitle: "4. News va Guide ko‘rish hisoblagichi",
    contentViewsBody:
      "Yangilik va Guide maqolalaridagi ko‘rish sonini sun’iy ravishda oshirib yubormaslik uchun server 24 soatlik deduplication mexanizmidan foydalanadi. Buning uchun IP manzil, User-Agent va maqola identifikatori server-side maxfiy kalit bilan HMAC orqali pseudonymous kalitga aylantiriladi.",
    contentViewsRetention:
      "Raw IP va User-Agent deduplication jadvalida saqlanmaydi. Pseudonymous dedup yozuvlari qisqa muddatli bo‘lib, 48 soatdan eski yozuvlar tozalanadi. Avval ishlatilgan vatandoshlar_view_visitor persistent cookie endi qo‘llanilmaydi.",
    storageTitle: "5. Cookie va lokal browser xotirasi",
    storageBody:
      "Sayt foydalanuvchi so‘ragan funksiyalarni taqdim etish uchun cheklangan first-party storage’dan foydalanishi mumkin. Masalan, til tanlovi NEXT_LOCALE orqali eslab qolinadi; UzDe ID va admin autentifikatsiyasida sessiya cookie’lari ishlatiladi; tema va ayrim qidiruv/interfeys holatlari brauzerning localStorage xotirasida saqlanishi mumkin.",
    storageTracking:
      "Bu storage reklama profili yaratish yoki cross-site tracking uchun ishlatilmaydi. Hozir UzDe Google Analytics, Meta Pixel yoki shunga o‘xshash third-party marketing tracking xizmatlarini ishlatmaydi.",
    googleAuth:
      "Agar foydalanuvchi Google orqali UzDe ID yaratish yoki tizimga kirishni tanlasa, autentifikatsiya jarayonida Google OAuth xizmati ishlatiladi. UzDe Google’dan tasdiqlangan e-mail manzili, ism va Google hisobining texnik identifikatorini olishi mumkin. Google paroli UzDe’ga uzatilmaydi va saqlanmaydi. Mavjud UzDe ID xavfsizlik sababli bir xil e-mail asosida Google hisobiga avtomatik bog‘lanmaydi.",
    externalTitle: "6. Tashqi havolalar",
    externalBody:
      "Saytda Telegram, Instagram, Facebook, PayPal yoki boshqa tashqi xizmatlarga olib boruvchi havolalar bo‘lishi mumkin. Ular odatda faqat havolani bosganingizdan keyin ochiladi. Tashqi sayt ochilgach, o‘sha xizmatning o‘z maxfiylik qoidalari amal qiladi.",
    rightsTitle: "7. Sizning huquqlaringiz",
    rightsBody:
      "GDPR talablariga muvofiq, tegishli shartlar bajarilganda siz o‘zingizga oid shaxsiy ma’lumotlarga kirish, ularni tuzatish, o‘chirish, qayta ishlashni cheklash, ma’lumotlarni ko‘chirish va qayta ishlashga e’tiroz bildirish huquqlariga ega bo‘lishingiz mumkin. Qonuniy manfaatga asoslangan qayta ishlashga ham tegishli holatlarda e’tiroz bildirish mumkin.",
    complaint:
      "Shuningdek, vakolatli ma’lumotlarni himoya qilish nazorat organiga shikoyat qilish huquqingiz mavjud.",
    contactTitle: "8. Maxfiylik bo‘yicha murojaat",
    contactBody:
      "Maxfiylik, saqlanayotgan ma’lumotlar yoki o‘z huquqlaringiz bo‘yicha savol va murojaatlarni quyidagi e-mail manziliga yuborishingiz mumkin:",
    changesTitle: "9. Ushbu siyosatdagi o‘zgarishlar",
    changesBody:
      "Platformadagi funksiyalar yoki ma’lumotlarni qayta ishlash jarayonlari o‘zgarsa, ushbu maxfiylik siyosati ham yangilanadi. Amaldagi versiya doimo shu sahifada e’lon qilinadi.",
    note:
      "Eslatma: ushbu sahifa UzDe’ning joriy texnik ishlashini shaffof tushuntirish uchun tayyorlangan. U individual yuridik maslahat o‘rnini bosmaydi.",
  },

  de: {
    metadataTitle: "Datenschutzerklärung",
    metadataDescription:
      "Informationen darüber, wie UzDe personenbezogene und technische Daten verarbeitet.",
    eyebrow: "DATENSCHUTZ",
    title: "Datenschutzerklärung",
    intro:
      "Diese Datenschutzerklärung erläutert, welche personenbezogenen und technischen Daten bei der Nutzung der Plattform verarbeitet werden, zu welchen Zwecken dies geschieht und wie die Verarbeitung ausgestaltet ist.",
    updatedLabel: "Stand",
    updatedValue: "16.09.2026",
    tocTitle: "In dieser Erklärung",
    controllerTitle: "1. Verantwortlicher",
    controllerBody:
      "Verantwortlich für die Datenverarbeitung im Zusammenhang mit dem Projekt UzDe ist Zafar Usarov.",
    contactLabel: "Kontakt",
    hostingTitle: "2. Hosting und Server-Protokolldaten",
    hostingBody:
      "UzDe wird auf Infrastruktur von Railway bereitgestellt. Beim Aufruf der Website können Hosting- und Serversysteme technische Informationen wie IP-Adresse, Zeitpunkt der Anfrage, angeforderte Ressource sowie Browser- beziehungsweise User-Agent-Daten verarbeiten, um die Website auszuliefern, die Sicherheit zu gewährleisten und technische Fehler zu erkennen.",
    hostingBasis:
      "Die Verarbeitung dient der zuverlässigen und sicheren Bereitstellung der Plattform. Soweit erforderlich, stützt sie sich auf das berechtigte Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO.",
    hostingTransfer:
      "Railway ist ein Anbieter mit Sitz in den USA. Railway beschreibt in seinen rechtlichen Unterlagen unter anderem ein Data Processing Addendum, Standard Contractual Clauses und die Teilnahme am EU-U.S. Data Privacy Framework als Mechanismen für den Schutz europäischer Daten.",
    railwayPrivacy: "Datenschutzerklärung von Railway",
    analyticsTitle: "3. Eigene Website-Analyse",
    analyticsBody:
      "UzDe zählt Seitenaufrufe über eine eigene Server-Schnittstelle. Der Browser übermittelt dabei nur die aktuelle Website-Sprache und den Seitenpfad an einen UzDe-Endpunkt. Die im Request enthaltene IP-Adresse wird serverseitig mit einer lokal gespeicherten GeoLite2-Country-Datenbank in einen Ländercode aufgelöst.",
    analyticsStorage:
      "In der Analytics-Tabelle werden ausschließlich Datum, Ländercode, Website-Sprache, Seitenpfad und aggregierte Aufrufzahlen gespeichert. Die rohe IP-Adresse wird nicht in der Analytics-Tabelle gespeichert. Bei der GeoIP-Auflösung wird die IP-Adresse des Besuchers nicht an MaxMind übertragen, da die Abfrage gegen eine lokale Datenbankdatei auf dem Server erfolgt.",
    analyticsCookies:
      "Für diese First-Party-Analyse wird kein eigenes Analytics- oder Marketing-Cookie gesetzt. Ziel ist es, die Nutzung der Plattform auf aggregierter Ebene zu verstehen und Inhalte sowie technische Abläufe zu verbessern.",
    contentViewsTitle: "4. Aufrufzähler für News und Guide",
    contentViewsBody:
      "Damit wiederholtes Neuladen die öffentlichen Aufrufzahlen von News- und Guide-Artikeln nicht künstlich erhöht, verwendet der Server ein 24-stündiges Deduplication-Verfahren. IP-Adresse, User-Agent und Inhaltskennung werden dabei serverseitig mit einem geheimen Schlüssel per HMAC in einen pseudonymen Schlüssel umgewandelt.",
    contentViewsRetention:
      "Rohe IP-Adressen und User-Agent-Daten werden nicht in der Deduplication-Tabelle gespeichert. Die pseudonymen Deduplication-Einträge sind kurzlebig; Einträge, die älter als 48 Stunden sind, werden bereinigt. Das früher eingesetzte persistente Cookie vatandoshlar_view_visitor wird nicht mehr verwendet.",
    storageTitle: "5. Cookies und lokaler Browserspeicher",
    storageBody:
      "Für ausdrücklich genutzte Funktionen kann die Website begrenzten First-Party-Speicher einsetzen. So kann die Sprachauswahl über NEXT_LOCALE gespeichert werden; für UzDe ID und den geschützten Admin-Bereich werden Authentifizierungs- und Session-Cookies verwendet; Theme- und einzelne Such- beziehungsweise Oberflächenzustände können im localStorage des Browsers gespeichert werden.",
    storageTracking:
      "Diese Speichermechanismen werden nicht zur Bildung von Werbeprofilen oder für Cross-Site-Tracking eingesetzt. UzDe verwendet derzeit weder Google Analytics noch Meta Pixel oder vergleichbare Third-Party-Marketing-Tracker.",
    googleAuth:
      "Wenn Sie eine UzDe ID mit Google erstellen oder sich mit Google anmelden, wird Google OAuth für die Authentifizierung verwendet. UzDe kann dabei die von Google bestätigte E-Mail-Adresse, den Namen und eine technische Kennung des Google-Kontos erhalten. Ihr Google-Passwort wird nicht an UzDe übermittelt oder gespeichert. Eine bestehende UzDe ID wird aus Sicherheitsgründen nicht allein aufgrund einer übereinstimmenden E-Mail-Adresse automatisch mit Google verknüpft.",
    externalTitle: "6. Externe Links",
    externalBody:
      "Die Website kann Links zu Telegram, Instagram, Facebook, PayPal oder anderen externen Diensten enthalten. Diese Dienste werden in der Regel erst aufgerufen, wenn Sie den jeweiligen Link aktiv öffnen. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen externen Anbieters.",
    rightsTitle: "7. Ihre Rechte",
    rightsBody:
      "Unter den Voraussetzungen der DSGVO können Ihnen insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch zustehen. Gegen Verarbeitungen, die auf berechtigten Interessen beruhen, kann unter den gesetzlichen Voraussetzungen ebenfalls Widerspruch eingelegt werden.",
    complaint:
      "Sie haben außerdem das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.",
    contactTitle: "8. Datenschutzanfragen",
    contactBody:
      "Fragen zum Datenschutz, zu verarbeiteten Daten oder zur Ausübung Ihrer Rechte können Sie an folgende E-Mail-Adresse richten:",
    changesTitle: "9. Änderungen dieser Datenschutzerklärung",
    changesBody:
      "Wenn sich Funktionen der Plattform oder die Art der Datenverarbeitung ändern, wird diese Datenschutzerklärung entsprechend aktualisiert. Die jeweils aktuelle Fassung wird auf dieser Seite veröffentlicht.",
    note:
      "Hinweis: Diese Seite beschreibt die derzeitige technische Datenverarbeitung von UzDe transparent. Sie ersetzt keine individuelle Rechtsberatung.",
  },
} as const;

const heading = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: "600", display: "swap" });

function Section({ id, title, children }: Readonly<{ id: string; title: string; children: React.ReactNode }>) {
  return <section id={id} tabIndex={-1} aria-labelledby={`${id}-heading`} className={styles.section}>
    <div className={styles.sectionHeading}>
      <span className={styles.sectionNumber} aria-hidden="true">{title.match(/^\d+/)?.[0].padStart(2, "0")}</span>
      <h2 id={`${id}-heading`} className={heading.className}>{title.replace(/^\d+\.\s*/, "")}</h2>
    </div>
    <div className={styles.body}>{children}</div>
  </section>;
}

function BrandedText({
  text,
}: Readonly<{
  text: string;
}>) {
  const parts =
    text.split("UzDe");

  if (parts.length === 1) {
    return text;
  }

  return (
    <>
      {parts.map(
        (
          part,
          index,
        ) => (
          <span
            key={`${part}-${index}`}
          >
            {index > 0 && (
              <BrandName />
            )}
            {part}
          </span>
        ),
      )}
    </>
  );
}

export default async function PrivacyPage() {
  const locale =
    await getLocale();

  const appLocale: SupportedPrivacyLocale =
    locale === "de"
      ? "de"
      : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  const sections = [
    {
      id: "controller",
      title:
        currentCopy.controllerTitle,

    },
    {
      id: "hosting",
      title:
        currentCopy.hostingTitle,

    },
    {
      id: "analytics",
      title:
        currentCopy.analyticsTitle,

    },
    {
      id: "content-views",
      title:
        currentCopy.contentViewsTitle,

    },
    {
      id: "storage",
      title:
        currentCopy.storageTitle,

    },
    {
      id: "external-links",
      title:
        currentCopy.externalTitle,

    },
    {
      id: "rights",
      title:
        currentCopy.rightsTitle,

    },
    {
      id: "contact",
      title:
        currentCopy.contactTitle,

    },
    {
      id: "changes",
      title:
        currentCopy.changesTitle,

    },
  ] as const satisfies ReadonlyArray<{
    id: string;
    title: string;

  }>;

  return (
    <div className={styles.surface}>
      <Header />
      <main id="top" className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>UZDE. / {currentCopy.eyebrow}</p>
          <h1 className={heading.className}>{currentCopy.title}.</h1>
          <p className={styles.intro}>{currentCopy.intro}</p>
          <p className={styles.updated}>{currentCopy.updatedLabel}: <time dateTime="2026-09-16">{currentCopy.updatedValue}</time></p>
        </header>
        <div className={styles.layout}>
          <PrivacyTableOfContents title={currentCopy.tocTitle} sections={sections} locale={appLocale} />
          <article className={styles.article}>
                <Section
                id="controller"
                title={
                  currentCopy.controllerTitle
                }

              >
              <p>
                {appLocale === "uz" ? (
                  <>
                    <BrandName /> loyihasidagi ma’lumotlarni qayta ishlash uchun
                    mas’ul shaxs:
                  </>
                ) : (
                  <>
                    Verantwortlich für die Datenverarbeitung im Zusammenhang mit
                    dem Projekt <BrandName /> ist
                  </>
                )}{" "}
                <Link
                  href="/about/founder"
                  className={styles.link}
                >
                  Zafar Usarov
                </Link>
                .
              </p>

              <div className={styles.contactGrid}>
                <Link
                  href="/about/founder"
                  className={styles.contactRow}
                >
                  <span className={styles.contactLabel}>
                    {appLocale === "de" ? "Gründer & Entwickler" : "Asoschi & dasturchi"}
                  </span>
                  <span className={styles.contactValue}>
                    Zafar Usarov
                    <span aria-hidden="true" className={styles.arrow}>
                      →
                    </span>
                  </span>
                </Link>

                <a
                  href="mailto:info@uzde.de"
                  className={styles.contactRow}
                >
                  <span className={styles.contactLabel}>
                    {currentCopy.contactLabel}
                  </span>
                  <span className={styles.contactValue}>
                    info@uzde.de
                  </span>
                </a>
              </div>
            </Section>

              <Section
                id="hosting"
                title={
                  currentCopy.hostingTitle
                }

              >
              <p>
                {currentCopy.hostingBody}
              </p>

              <p>
                {currentCopy.hostingBasis}
              </p>

              <p>
                {currentCopy.hostingTransfer}
              </p>

              <a
                href="https://railway.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {currentCopy.railwayPrivacy} ↗
              </a>
            </Section>

              <Section
                id="analytics"
                title={
                  currentCopy.analyticsTitle
                }

              >
              <p>
                {currentCopy.analyticsBody}
              </p>

              <p>
                {currentCopy.analyticsStorage}
              </p>

              <p>
                {currentCopy.analyticsCookies}
              </p>
            </Section>

              <Section
                id="content-views"
                title={
                  currentCopy.contentViewsTitle
                }

              >
              <p>
                {currentCopy.contentViewsBody}
              </p>

              <p>
                {currentCopy.contentViewsRetention}
              </p>
            </Section>

              <Section
                id="storage"
                title={
                  currentCopy.storageTitle
                }

              >
              <p>
                {currentCopy.storageBody}
              </p>

              <p>
                {currentCopy.storageTracking}
              </p>

              <p>
                {currentCopy.googleAuth}
              </p>
            </Section>

              <Section
                id="external-links"
                title={
                  currentCopy.externalTitle
                }

              >
              <p>
                {currentCopy.externalBody}
              </p>
            </Section>

              <Section
                id="rights"
                title={
                  currentCopy.rightsTitle
                }

              >
              <p>
                {currentCopy.rightsBody}
              </p>

              <p>
                {currentCopy.complaint}
              </p>
            </Section>

              <Section
                id="contact"
                title={
                  currentCopy.contactTitle
                }

              >
              <p>
                {currentCopy.contactBody}
              </p>

              <a
                href="mailto:info@uzde.de"
                className={styles.link}
              >
                info@uzde.de
              </a>
            </Section>

              <Section
                id="changes"
                title={
                  currentCopy.changesTitle
                }

              >
              <p>
                {currentCopy.changesBody}
              </p>
            </Section>

            <aside className={styles.note}>
              <BrandedText
                text={
                  currentCopy.note
                }
              />
            </aside>
            </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    await getLocale();

  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  return {
    title:
      currentCopy.metadataTitle,
    description:
      currentCopy.metadataDescription,
    robots: {
      index: true,
      follow: true,
    },
  };
}
