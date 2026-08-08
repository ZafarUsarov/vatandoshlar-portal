import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import EventCard from "../../components/cards/EventCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  getPastEvents,
  getUpcomingEvents,
  type SupportedEventLocale,
} from "../../data/events";
import { Link } from "../../i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedEventLocale;

  return locale === "uz"
    ? {
        title: "Tadbirlar | Vatandoshlar.de",
        description:
          "Germaniyadagi o‘zbekistonliklar uchun tekshirilgan madaniy, ta’lim, karyera, biznes va jamoat tadbirlari.",
      }
    : {
        title: "Veranstaltungen | Vatandoshlar.de",
        description:
          "Geprüfte Kultur-, Bildungs-, Karriere-, Wirtschafts- und Gemeinschaftsveranstaltungen für Usbeken in Deutschland.",
      };
}

export default async function EventsPage() {
  const locale =
    (await getLocale()) as SupportedEventLocale;
  const upcomingEvents = getUpcomingEvents(locale);
  const pastEvents = getPastEvents(locale);

  const copy =
    locale === "uz"
      ? {
          heroEyebrow:
            "Vatandoshlar.de tadbirlar kalendari",
          heroTitle:
            "Uchrashing, o‘rganing va hamjamiyat bilan bog‘laning",
          heroDescription:
            "Germaniyadagi o‘zbekistonliklar uchun madaniy, ta’limiy, professional va jamoat tadbirlari. Har bir e’lon rasmiy manba orqali tekshiriladi.",
          upcomingButton:
            "Yaqin tadbirlarni ko‘rish",
          policyButton: "Tekshirish tartibi",
          stats: {
            upcoming: "Yaqin tadbir",
            categories: "Asosiy yo‘nalish",
            verified:
              "Rasmiy manbasi tekshirilgan",
          },
          categories: [
            {
              title: "Madaniyat",
              description:
                "Konsertlar, bayramlar, ko‘rgazmalar va milliy madaniyat tadbirlari.",
              icon: "◈",
            },
            {
              title: "Ta’lim",
              description:
                "Seminarlar, kurslar, ochiq darslar va talabalar uchun uchrashuvlar.",
              icon: "▤",
            },
            {
              title: "Karyera",
              description:
                "Ish yarmarkalari, networking, Ausbildung va professional uchrashuvlar.",
              icon: "◇",
            },
            {
              title: "Jamiyat",
              description:
                "Vatandoshlar uchrashuvlari, oilaviy tadbirlar va jamoat loyihalari.",
              icon: "◎",
            },
          ],
          upcomingEyebrow: "Yaqin tadbirlar",
          upcomingTitle:
            "Rejalashtirilgan tadbirlar",
          upcomingDescription:
            "Sana, manzil, tashkilotchi va ro‘yxatdan o‘tish havolasi tekshirilgan tadbirlar shu yerda ko‘rsatiladi.",
          emptyBadge:
            "Hozircha tasdiqlangan tadbir yo‘q",
          emptyTitle:
            "Yangi tadbirlar tekshirilgandan keyin e’lon qilinadi",
          emptyDescription:
            "Vatandoshlar.de foydalanuvchilarni chalg‘itmaslik uchun uydirma sana, manzil yoki ro‘yxatdan o‘tish havolalarini joylashtirmaydi.",
          emptyRequirementsTitle:
            "Tadbir e’lon qilinishi uchun:",
          emptyRequirements: [
            "Rasmiy tashkilotchi ko‘rsatilishi",
            "Sana va manzil tasdiqlanishi",
            "Rasmiy manba havolasi mavjud bo‘lishi",
            "Ro‘yxatdan o‘tish tartibi aniq bo‘lishi",
          ],
          policyEyebrow: "Ishonchlilik",
          policyTitle:
            "Tadbirlar qanday tekshiriladi?",
          policyDescription:
            "Har bir tadbir portalga joylashtirilishidan oldin asosiy ma’lumotlari va rasmiy manbasi tekshiriladi.",
          policySteps: [
            {
              number: "01",
              title: "Tashkilotchi",
              description:
                "Tashkilot yoki mas’ul shaxsning rasmiy sahifasi tekshiriladi.",
            },
            {
              number: "02",
              title: "Sana va manzil",
              description:
                "Tadbir sanasi, vaqti va manzili manba bilan solishtiriladi.",
            },
            {
              number: "03",
              title: "Ro‘yxatdan o‘tish",
              description:
                "Ariza havolasi va qatnashish shartlari tekshiriladi.",
            },
            {
              number: "04",
              title: "Tekshiruv sanasi",
              description:
                "Har bir tadbirda ma’lumot oxirgi marta qachon tekshirilgani ko‘rsatiladi.",
            },
          ],
          archiveEyebrow: "Arxiv",
          archiveTitle: "O‘tgan tadbirlar",
          reminderEyebrow: "Muhim eslatma",
          reminderTitle:
            "Yo‘lga chiqishdan oldin tadbirni qayta tekshiring",
          reminderDescription:
            "Tashkilotchilar sana, manzil yoki dasturga o‘zgartirish kiritishi mumkin. Tadbirga borishdan oldin rasmiy manba sahifasini yana bir marta oching.",
          homeButton: "Bosh sahifaga qaytish",
          footer:
            "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma",
          card: {
            time: "Vaqt",
            location: "Manzil",
            price: "Narx",
            event: "Tadbir",
            detailsDescription:
              "Batafsil dastur va manzil",
            details: "Batafsil",
          },
        }
      : {
          heroEyebrow:
            "Veranstaltungskalender von Vatandoshlar.de",
          heroTitle:
            "Begegnen, lernen und sich mit der Gemeinschaft vernetzen",
          heroDescription:
            "Kulturelle, bildungsbezogene, berufliche und gemeinschaftliche Veranstaltungen für Usbeken in Deutschland. Jede Veröffentlichung wird anhand einer offiziellen Quelle geprüft.",
          upcomingButton:
            "Kommende Veranstaltungen ansehen",
          policyButton: "Prüfverfahren",
          stats: {
            upcoming: "Kommende Veranstaltungen",
            categories: "Hauptbereiche",
            verified: "Offizielle Quelle geprüft",
          },
          categories: [
            {
              title: "Kultur",
              description:
                "Konzerte, Feiertage, Ausstellungen und Veranstaltungen zur usbekischen Kultur.",
              icon: "◈",
            },
            {
              title: "Bildung",
              description:
                "Seminare, Kurse, offene Unterrichtsangebote und Treffen für Studierende.",
              icon: "▤",
            },
            {
              title: "Karriere",
              description:
                "Jobmessen, Networking, Ausbildung und berufliche Begegnungen.",
              icon: "◇",
            },
            {
              title: "Gemeinschaft",
              description:
                "Treffen von Landsleuten, Familienveranstaltungen und Gemeinschaftsprojekte.",
              icon: "◎",
            },
          ],
          upcomingEyebrow:
            "Kommende Veranstaltungen",
          upcomingTitle:
            "Geplante Veranstaltungen",
          upcomingDescription:
            "Hier erscheinen Veranstaltungen, deren Datum, Ort, Veranstalter und Anmeldelink geprüft wurden.",
          emptyBadge:
            "Derzeit keine bestätigte Veranstaltung",
          emptyTitle:
            "Neue Veranstaltungen werden nach der Prüfung veröffentlicht",
          emptyDescription:
            "Vatandoshlar.de veröffentlicht keine erfundenen Termine, Orte oder Anmeldelinks.",
          emptyRequirementsTitle:
            "Voraussetzungen für eine Veröffentlichung:",
          emptyRequirements: [
            "Ein offizieller Veranstalter ist angegeben",
            "Datum und Veranstaltungsort sind bestätigt",
            "Eine offizielle Quellenangabe ist vorhanden",
            "Das Anmeldeverfahren ist eindeutig beschrieben",
          ],
          policyEyebrow: "Verlässlichkeit",
          policyTitle:
            "Wie werden Veranstaltungen geprüft?",
          policyDescription:
            "Vor der Veröffentlichung werden die wichtigsten Angaben und die offizielle Quelle jeder Veranstaltung geprüft.",
          policySteps: [
            {
              number: "01",
              title: "Veranstalter",
              description:
                "Die offizielle Seite der Organisation oder verantwortlichen Person wird geprüft.",
            },
            {
              number: "02",
              title: "Datum und Ort",
              description:
                "Datum, Uhrzeit und Ort werden mit der Quelle abgeglichen.",
            },
            {
              number: "03",
              title: "Anmeldung",
              description:
                "Anmeldelink und Teilnahmebedingungen werden geprüft.",
            },
            {
              number: "04",
              title: "Prüfdatum",
              description:
                "Bei jeder Veranstaltung wird das Datum der letzten Prüfung angegeben.",
            },
          ],
          archiveEyebrow: "Archiv",
          archiveTitle:
            "Vergangene Veranstaltungen",
          reminderEyebrow: "Wichtiger Hinweis",
          reminderTitle:
            "Prüfen Sie die Veranstaltung vor der Abfahrt erneut",
          reminderDescription:
            "Veranstalter können Datum, Ort oder Programm ändern. Öffnen Sie deshalb vor der Teilnahme noch einmal die offizielle Quellenseite.",
          homeButton: "Zur Startseite",
          footer:
            "Digitale Plattform für Usbeken in Deutschland",
          card: {
            time: "Uhrzeit",
            location: "Ort",
            price: "Preis",
            event: "Veranstaltung",
            detailsDescription:
              "Programm und Veranstaltungsort",
            details: "Details",
          },
        };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                {copy.heroEyebrow}
              </p>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl sm:leading-tight">
                {copy.heroTitle}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
                {copy.heroDescription}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#upcoming-events"
                  className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  {copy.upcomingButton}
                </a>

                <a
                  href="#event-policy"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  {copy.policyButton}
                </a>
              </div>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold">
                  {upcomingEvents.length}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {copy.stats.upcoming}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold">
                  {copy.categories.length}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {copy.stats.categories}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold">
                  100%
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {copy.stats.verified}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.categories.map((category) => (
                <article
                  key={category.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    {category.icon}
                  </div>
                  <h2 className="mt-6 text-xl font-bold">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {category.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="upcoming-events"
          className="py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {copy.upcomingEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {copy.upcomingTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                {copy.upcomingDescription}
              </p>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    locale={locale}
                    labels={copy.card}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="flex min-h-80 items-center justify-center bg-gradient-to-br from-blue-700 to-slate-950 p-10 text-white">
                    <div className="text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/10 text-5xl">
                        ◷
                      </div>
                      <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                        {copy.heroEyebrow}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                    <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                      {copy.emptyBadge}
                    </span>

                    <h3 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                      {copy.emptyTitle}
                    </h3>

                    <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                      {copy.emptyDescription}
                    </p>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                      <p className="font-semibold">
                        {copy.emptyRequirementsTitle}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {copy.emptyRequirements.map(
                          (requirement) => (
                            <li key={requirement}>
                              • {requirement}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section
          id="event-policy"
          className="border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                  {copy.policyEyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {copy.policyTitle}
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                  {copy.policyDescription}
                </p>
              </div>

              <ol className="grid gap-4 sm:grid-cols-2">
                {copy.policySteps.map((step) => (
                  <li
                    key={step.number}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {step.number}
                    </span>
                    <h3 className="mt-4 text-xl font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {pastEvents.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {copy.archiveEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {copy.archiveTitle}
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    locale={locale}
                    labels={copy.card}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  {copy.reminderEyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  {copy.reminderTitle}
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  {copy.reminderDescription}
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-white !bg-white px-7 py-3 font-bold !text-slate-950 shadow-lg shadow-black/20 transition duration-200 visited:!text-slate-950 hover:-translate-y-0.5 hover:!bg-slate-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                {copy.homeButton}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
