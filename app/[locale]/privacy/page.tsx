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
      "Vatandoshlar.de saytida shaxsiy ma’lumotlar va texnik ma’lumotlar qanday qayta ishlanishi haqida ma’lumot.",
    eyebrow: "MAXFIYLIK",
    title: "Maxfiylik siyosati",
    intro:
      "Ushbu sahifada platformadan foydalanganda qanday texnik va shaxsiy ma’lumotlar qayta ishlanishi, nima maqsadda ishlatilishi va qanday himoya qilinishi tushuntiriladi.",
    updatedLabel: "Yangilangan sana",
    updatedValue: "25.08.2026",
    tocTitle: "Ushbu sahifada",
    controllerTitle: "1. Ma’lumotlarni qayta ishlash uchun mas’ul shaxs",
    controllerBody:
      "Vatandoshlar.de loyihasidagi ma’lumotlarni qayta ishlash uchun mas’ul shaxs: Zafar Usarov.",
    contactLabel: "Aloqa",
    hostingTitle: "2. Hosting va server loglari",
    hostingBody:
      "Vatandoshlar.de Railway infratuzilmasida joylashtirilgan. Saytga murojaat qilinganda hosting va server tizimlari xizmatni yetkazib berish, xavfsizlikni ta’minlash va texnik xatolarni aniqlash uchun IP manzil, so‘rov vaqti, so‘ralgan resurs, brauzer yoki User-Agent kabi texnik ma’lumotlarni qayta ishlashi mumkin.",
    hostingBasis:
      "Qayta ishlashning maqsadi platformani ishonchli va xavfsiz taqdim etishdir. Zarur bo‘lgan hollarda huquqiy asos GDPR 6(1)(f)-moddasidagi qonuniy manfaat hisoblanadi.",
    hostingTransfer:
      "Railway AQShda joylashgan xizmat ko‘rsatuvchi hisoblanadi. Railway o‘z hujjatlarida Yevropa ma’lumotlarini himoya qilish uchun Data Processing Addendum, Standard Contractual Clauses va EU-U.S. Data Privacy Framework mexanizmlaridan foydalanishini bildiradi.",
    railwayPrivacy: "Railway maxfiylik siyosati",
    analyticsTitle: "3. First-party sayt analitikasi",
    analyticsBody:
      "Vatandoshlar.de tashriflar sonini o‘z serveri orqali hisoblaydi. Brauzer faqat joriy sayt tili va sahifa yo‘lini Vatandoshlar.de API endpointiga yuboradi. Server so‘rovdagi IP manzilni mahalliy GeoLite2 Country ma’lumotlar bazasi yordamida davlat kodiga aylantiradi.",
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
      "Sayt foydalanuvchi so‘ragan funksiyalarni taqdim etish uchun cheklangan first-party storage’dan foydalanishi mumkin. Masalan, til tanlovi NEXT_LOCALE orqali eslab qolinadi; admin loginida autentifikatsiya va sessiya cookie’lari ishlatiladi; tema va ayrim qidiruv/interfeys holatlari brauzerning localStorage xotirasida saqlanishi mumkin.",
    storageTracking:
      "Bu storage reklama profili yaratish yoki cross-site tracking uchun ishlatilmaydi. Hozir Vatandoshlar.de Google Analytics, Meta Pixel yoki shunga o‘xshash third-party marketing tracking xizmatlarini ishlatmaydi.",
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
      "Eslatma: ushbu sahifa Vatandoshlar.de’ning joriy texnik ishlashini shaffof tushuntirish uchun tayyorlangan. U individual yuridik maslahat o‘rnini bosmaydi.",
  },

  de: {
    metadataTitle: "Datenschutzerklärung",
    metadataDescription:
      "Informationen darüber, wie Vatandoshlar.de personenbezogene und technische Daten verarbeitet.",
    eyebrow: "DATENSCHUTZ",
    title: "Datenschutzerklärung",
    intro:
      "Diese Datenschutzerklärung erläutert, welche personenbezogenen und technischen Daten bei der Nutzung der Plattform verarbeitet werden, zu welchen Zwecken dies geschieht und wie die Verarbeitung ausgestaltet ist.",
    updatedLabel: "Stand",
    updatedValue: "25.08.2026",
    tocTitle: "In dieser Erklärung",
    controllerTitle: "1. Verantwortlicher",
    controllerBody:
      "Verantwortlich für die Datenverarbeitung im Zusammenhang mit dem Projekt Vatandoshlar.de ist Zafar Usarov.",
    contactLabel: "Kontakt",
    hostingTitle: "2. Hosting und Server-Protokolldaten",
    hostingBody:
      "Vatandoshlar.de wird auf Infrastruktur von Railway bereitgestellt. Beim Aufruf der Website können Hosting- und Serversysteme technische Informationen wie IP-Adresse, Zeitpunkt der Anfrage, angeforderte Ressource sowie Browser- beziehungsweise User-Agent-Daten verarbeiten, um die Website auszuliefern, die Sicherheit zu gewährleisten und technische Fehler zu erkennen.",
    hostingBasis:
      "Die Verarbeitung dient der zuverlässigen und sicheren Bereitstellung der Plattform. Soweit erforderlich, stützt sie sich auf das berechtigte Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO.",
    hostingTransfer:
      "Railway ist ein Anbieter mit Sitz in den USA. Railway beschreibt in seinen rechtlichen Unterlagen unter anderem ein Data Processing Addendum, Standard Contractual Clauses und die Teilnahme am EU-U.S. Data Privacy Framework als Mechanismen für den Schutz europäischer Daten.",
    railwayPrivacy: "Datenschutzerklärung von Railway",
    analyticsTitle: "3. Eigene Website-Analyse",
    analyticsBody:
      "Vatandoshlar.de zählt Seitenaufrufe über eine eigene Server-Schnittstelle. Der Browser übermittelt dabei nur die aktuelle Website-Sprache und den Seitenpfad an einen Vatandoshlar.de-Endpunkt. Die im Request enthaltene IP-Adresse wird serverseitig mit einer lokal gespeicherten GeoLite2-Country-Datenbank in einen Ländercode aufgelöst.",
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
      "Für ausdrücklich genutzte Funktionen kann die Website begrenzten First-Party-Speicher einsetzen. So kann die Sprachauswahl über NEXT_LOCALE gespeichert werden; für den geschützten Admin-Login werden Authentifizierungs- und Session-Cookies verwendet; Theme- und einzelne Such- beziehungsweise Oberflächenzustände können im localStorage des Browsers gespeichert werden.",
    storageTracking:
      "Diese Speichermechanismen werden nicht zur Bildung von Werbeprofilen oder für Cross-Site-Tracking eingesetzt. Vatandoshlar.de verwendet derzeit weder Google Analytics noch Meta Pixel oder vergleichbare Third-Party-Marketing-Tracker.",
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
      "Hinweis: Diese Seite beschreibt die derzeitige technische Datenverarbeitung von Vatandoshlar.de transparent. Sie ersetzt keine individuelle Rechtsberatung.",
  },
} as const;

type SectionAccent =
  | "emerald"
  | "cyan"
  | "blue"
  | "violet"
  | "fuchsia"
  | "pink"
  | "amber"
  | "lime"
  | "orange";

const sectionAccentStyles: Record<
  SectionAccent,
  Readonly<{
    bar: string;
    border: string;
    glow: string;
    number: string;
  }>
> = {
  emerald: {
    bar: "bg-emerald-500",
    border:
      "hover:border-emerald-300 dark:hover:border-emerald-500/40",
    glow:
      "group-hover:shadow-emerald-500/10",
    number:
      "border-emerald-300 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-300",
  },
  cyan: {
    bar: "bg-cyan-500",
    border:
      "hover:border-cyan-300 dark:hover:border-cyan-500/40",
    glow:
      "group-hover:shadow-cyan-500/10",
    number:
      "border-cyan-300 text-cyan-700 dark:border-cyan-500/40 dark:text-cyan-300",
  },
  blue: {
    bar: "bg-blue-500",
    border:
      "hover:border-blue-300 dark:hover:border-blue-500/40",
    glow:
      "group-hover:shadow-blue-500/10",
    number:
      "border-blue-300 text-blue-700 dark:border-blue-500/40 dark:text-blue-300",
  },
  violet: {
    bar: "bg-violet-500",
    border:
      "hover:border-violet-300 dark:hover:border-violet-500/40",
    glow:
      "group-hover:shadow-violet-500/10",
    number:
      "border-violet-300 text-violet-700 dark:border-violet-500/40 dark:text-violet-300",
  },
  fuchsia: {
    bar: "bg-fuchsia-500",
    border:
      "hover:border-fuchsia-300 dark:hover:border-fuchsia-500/40",
    glow:
      "group-hover:shadow-fuchsia-500/10",
    number:
      "border-fuchsia-300 text-fuchsia-700 dark:border-fuchsia-500/40 dark:text-fuchsia-300",
  },
  pink: {
    bar: "bg-pink-500",
    border:
      "hover:border-pink-300 dark:hover:border-pink-500/40",
    glow:
      "group-hover:shadow-pink-500/10",
    number:
      "border-pink-300 text-pink-700 dark:border-pink-500/40 dark:text-pink-300",
  },
  amber: {
    bar: "bg-amber-500",
    border:
      "hover:border-amber-300 dark:hover:border-amber-500/40",
    glow:
      "group-hover:shadow-amber-500/10",
    number:
      "border-amber-300 text-amber-700 dark:border-amber-500/40 dark:text-amber-300",
  },
  lime: {
    bar: "bg-lime-500",
    border:
      "hover:border-lime-300 dark:hover:border-lime-500/40",
    glow:
      "group-hover:shadow-lime-500/10",
    number:
      "border-lime-300 text-lime-700 dark:border-lime-500/40 dark:text-lime-300",
  },
  orange: {
    bar: "bg-orange-500",
    border:
      "hover:border-orange-300 dark:hover:border-orange-500/40",
    glow:
      "group-hover:shadow-orange-500/10",
    number:
      "border-orange-300 text-orange-700 dark:border-orange-500/40 dark:text-orange-300",
  },
};

function Section({
  id,
  title,
  accent,
  children,
}: Readonly<{
  id: string;
  title: string;
  accent: SectionAccent;
  children: React.ReactNode;
}>) {
  const styles =
    sectionAccentStyles[accent];

  return (
    <section
      id={id}
      className={`group scroll-mt-24 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_55px_-42px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-8 ${styles.border} ${styles.glow}`}
    >
      <div
        aria-hidden="true"
        className={`mb-5 h-1 w-12 rounded-full ${styles.bar}`}
      />

      <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function TocLink({
  href,
  number,
  label,
  accent,
}: Readonly<{
  href: string;
  number: number;
  label: string;
  accent: SectionAccent;
}>) {
  const styles =
    sectionAccentStyles[accent];

  return (
    <a
      href={href}
      className={`group relative flex min-h-16 items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 text-sm font-bold text-slate-800 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900/75 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950 ${styles.border} ${styles.glow}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 ${styles.bar}`}
      />

      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-black ${styles.number}`}
      >
        {number}
      </span>

      <span className="leading-5">
        {label.replace(
          /^\d+\.\s*/,
          "",
        )}
      </span>
    </a>
  );
}

function BrandedText({
  text,
}: Readonly<{
  text: string;
}>) {
  const parts =
    text.split("Vatandoshlar.de");

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
      accent: "emerald",
    },
    {
      id: "hosting",
      title:
        currentCopy.hostingTitle,
      accent: "cyan",
    },
    {
      id: "analytics",
      title:
        currentCopy.analyticsTitle,
      accent: "blue",
    },
    {
      id: "content-views",
      title:
        currentCopy.contentViewsTitle,
      accent: "violet",
    },
    {
      id: "storage",
      title:
        currentCopy.storageTitle,
      accent: "fuchsia",
    },
    {
      id: "external-links",
      title:
        currentCopy.externalTitle,
      accent: "pink",
    },
    {
      id: "rights",
      title:
        currentCopy.rightsTitle,
      accent: "amber",
    },
    {
      id: "contact",
      title:
        currentCopy.contactTitle,
      accent: "lime",
    },
    {
      id: "changes",
      title:
        currentCopy.changesTitle,
      accent: "orange",
    },
  ] as const satisfies ReadonlyArray<{
    id: string;
    title: string;
    accent: SectionAccent;
  }>;

  return (
    <>
      <Header />

      <main
        id="top"
        className="relative min-h-screen overflow-hidden bg-slate-50 px-4 pb-10 pt-24 dark:bg-slate-950 sm:px-6 sm:pb-12 sm:pt-24 lg:px-8 lg:pb-16 lg:pt-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.13),transparent_42%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_34%)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <header className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.5)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:p-8 lg:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[42px] border-emerald-500/5" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em]">
                <span className="normal-case tracking-normal">
                  <BrandName />
                </span>

                <span
                  aria-hidden="true"
                  className="text-slate-300 dark:text-slate-600"
                >
                  ·
                </span>

                <span className="text-emerald-600 dark:text-emerald-400">
                  {currentCopy.eyebrow}
                </span>
              </div>

              <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {currentCopy.title}
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {currentCopy.intro}
              </p>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
                {currentCopy.updatedLabel}: {currentCopy.updatedValue}
              </div>
            </div>
          </header>

          <div className="mt-6 grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:items-start">
            <aside className="lg:sticky lg:top-6">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-4 shadow-[0_18px_55px_-42px_rgba(15,23,42,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/55">
                <p className="px-2 pb-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {currentCopy.tocTitle}
                </p>

                <nav
                  aria-label={
                    currentCopy.tocTitle
                  }
                  className="space-y-2"
                >
                  {sections.map(
                    (
                      section,
                      index,
                    ) => (
                      <TocLink
                        key={
                          section.id
                        }
                        href={`#${section.id}`}
                        number={
                          index + 1
                        }
                        label={
                          section.title
                        }
                        accent={
                          section.accent
                        }
                      />
                    ),
                  )}
                </nav>
              </div>
            </aside>

            <article className="min-w-0 space-y-5">
                <Section
                id="controller"
                title={
                  currentCopy.controllerTitle
                }
                accent="emerald"
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
                  className="font-extrabold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:decoration-emerald-700 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
                >
                  Zafar Usarov
                </Link>
                .
              </p>

              <div className="grid gap-3 pt-1 sm:grid-cols-2">
                <Link
                  href="/about/founder"
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/10 dark:focus-visible:ring-offset-slate-900"
                >
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    {appLocale === "de" ? "Gründer & Entwickler" : "Asoschi & dasturchi"}
                  </span>
                  <span className="mt-1 flex items-center justify-between gap-3 font-black text-slate-950 dark:text-white">
                    Zafar Usarov
                    <span aria-hidden="true" className="text-emerald-600 transition-transform group-hover:translate-x-1 dark:text-emerald-400">
                      →
                    </span>
                  </span>
                </Link>

                <a
                  href="mailto:info.vatandoshlar@gmx.de"
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/10 dark:focus-visible:ring-offset-slate-900"
                >
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    {currentCopy.contactLabel}
                  </span>
                  <span className="mt-1 block break-all font-bold text-emerald-700 dark:text-emerald-400">
                    info.vatandoshlar@gmx.de
                  </span>
                </a>
              </div>
            </Section>

              <Section
                id="hosting"
                title={
                  currentCopy.hostingTitle
                }
                accent="cyan"
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
                className="inline-flex min-h-10 items-center font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-600 dark:text-emerald-400 dark:decoration-emerald-700 dark:hover:text-emerald-300"
              >
                {currentCopy.railwayPrivacy} ↗
              </a>
            </Section>

              <Section
                id="analytics"
                title={
                  currentCopy.analyticsTitle
                }
                accent="blue"
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
                accent="violet"
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
                accent="fuchsia"
              >
              <p>
                {currentCopy.storageBody}
              </p>

              <p>
                {currentCopy.storageTracking}
              </p>
            </Section>

              <Section
                id="external-links"
                title={
                  currentCopy.externalTitle
                }
                accent="pink"
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
                accent="amber"
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
                accent="lime"
              >
              <p>
                {currentCopy.contactBody}
              </p>

              <a
                href="mailto:info.vatandoshlar@gmx.de"
                className="inline-flex min-h-10 items-center font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-600 dark:text-emerald-400 dark:decoration-emerald-700 dark:hover:text-emerald-300"
              >
                info.vatandoshlar@gmx.de
              </a>
            </Section>

              <Section
                id="changes"
                title={
                  currentCopy.changesTitle
                }
                accent="orange"
              >
              <p>
                {currentCopy.changesBody}
              </p>
            </Section>

            <aside className="rounded-[1.75rem] border border-amber-200/80 bg-amber-50/80 px-6 py-5 text-sm leading-7 text-amber-950 shadow-[0_18px_55px_-42px_rgba(15,23,42,0.35)] dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200 sm:px-8">
              <BrandedText
                text={
                  currentCopy.note
                }
              />
            </aside>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
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
