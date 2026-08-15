import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import BrandName from "../../components/ui/BrandName";
import EventCard from "../../components/cards/EventCard";
import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import {
  toEventItem,
  toPlanningEventItem,
} from "../../lib/events/event-presenter";
import {
  getPastPublishedEvents,
  getPlanningPublishedEvents,
  getUpcomingPublishedEvents,
} from "../../lib/events/public-events-repository";
import type {
  SupportedEventLocale,
} from "../../types/event";

export const dynamic =
  "force-dynamic";

type IconProps = Readonly<{
  className?: string;
}>;

function CalendarIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 3.5v3m10-3v3M4.5 9.5h15M7 5h10a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M8 13h3m2 0h3M8 16h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CheckIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m6.5 12.5 3.3 3.3 7.7-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedEventLocale;

  return locale === "uz"
    ? {
        title:
          "Tadbirlar | Vatandoshlar.de",
        description:
          "Germaniyadagi o‘zbekistonliklar uchun e’lon qilingan tadbirlar va kelajak uchun rejalashtirilayotgan hamjamiyat tadbirlari.",
        alternates: {
          canonical:
            "/uz/events",
          languages: {
            uz:
              "/uz/events",
            de:
              "/de/events",
          },
        },
      }
    : {
        title:
          "Veranstaltungen | Vatandoshlar.de",
        description:
          "Veröffentlichte Veranstaltungen und geplante Community-Veranstaltungen für Usbeken in Deutschland.",
        alternates: {
          canonical:
            "/de/events",
          languages: {
            uz:
              "/uz/events",
            de:
              "/de/events",
          },
        },
      };
}

export default async function EventsPage() {
  const locale =
    (await getLocale()) as SupportedEventLocale;

  const [
    upcomingPublicEvents,
    planningPublicEvents,
    pastPublicEvents,
  ] = await Promise.all([
    getUpcomingPublishedEvents(
      locale,
    ),
    getPlanningPublishedEvents(
      locale,
    ),
    getPastPublishedEvents(
      locale,
    ),
  ]);

  const upcomingEvents =
    upcomingPublicEvents.map(
      (event) =>
        toEventItem(
          event,
          locale,
        ),
    );

  const planningEvents =
    planningPublicEvents.map(
      (event) =>
        toPlanningEventItem(
          event,
          locale,
        ),
    );

  const pastEvents =
    pastPublicEvents.map(
      (event) =>
        toEventItem(
          event,
          locale,
        ),
    );

  const copy =
    locale === "uz"
      ? {
          heroEyebrow:
            "Tadbirlar",
          heroTitle:
            "Hamjamiyat bilan uchrashing, o‘rganing va birga vaqt o‘tkazing",
          heroDescription:
            "E’lon qilingan tadbirlar tasdiqlangan ma’lumot va rasmiy manba bilan ko‘rsatiladi. Rejadagi tadbirlar esa sana yoki joy uydirilmasdan, aniq “Rejalashtirilmoqda” holatida beriladi.",
          upcomingButton:
            "E’lon qilingan tadbirlar",
          planningButton:
            "Rejadagi tadbirlar",
          stats: {
            overview:
              "Tadbirlar holati",
            upcoming: {
              label:
                "E’lon qilingan tadbirlar",
              description:
                "Sana va ma’lumotlari tasdiqlangan",
              emptyDescription:
                "Hozircha e’lon qilingan tadbir yo‘q",
            },
            planning: {
              label:
                "Rejadagi tadbirlar",
              description:
                "Tafsilotlari tayyorlanmoqda",
            },
          },
          categoryEyebrow:
            "Yo‘nalishlar",
          categoryTitle:
            "Turli qiziqishlar uchun tadbirlar",
          categories: [
            {
              title:
                "Madaniyat",
              description:
                "Bayramlar, madaniy uchrashuvlar va milliy an’analar.",
              accent:
                "from-cyan-500/14 to-blue-500/5",
            },
            {
              title:
                "Jamiyat",
              description:
                "Vatandoshlar uchrashuvlari, oilalar va networking.",
              accent:
                "from-emerald-500/14 to-cyan-500/5",
            },
            {
              title:
                "Sport",
              description:
                "Futbol, voleybol, shaxmat va boshqa jamoaviy faoliyatlar.",
              accent:
                "from-violet-500/12 to-blue-500/5",
            },
            {
              title:
                "Ta’lim va karyera",
              description:
                "Seminar, workshop, ta’lim va professional uchrashuvlar.",
              accent:
                "from-amber-500/12 to-orange-500/5",
            },
          ],
          upcomingEyebrow:
            "Tasdiqlangan",
          upcomingTitle:
            "Yaqin tadbirlar",
          upcomingDescription:
            "Sana, tashkilotchi, joy va mavjud ro‘yxatdan o‘tish ma’lumotlari tekshirilgan real tadbirlar.",
          emptyBadge:
            "Hozircha tasdiqlangan real tadbir yo‘q",
          emptyTitle:
            "Yangi tadbirlar tekshirilgandan keyin shu yerda paydo bo‘ladi",
          emptyDescription:
            "Biz bo‘limni sun’iy sana yoki manzil bilan to‘ldirmaymiz. Quyidagi rejalar esa kelajakdagi tadbir yo‘nalishlarini ochiq ko‘rsatadi.",
          planningEyebrow:
            "Rejadagi tadbirlar",
          planningTitle:
            "Rejadagi tadbirlar",
          planningDescription:
            "Bu kartalar hali e’lon qilingan tadbirlar emas. Sana, joy va ro‘yxatdan o‘tish tartibi aniqlangach ma’lumotlar yangilanadi.",
          planningNote:
            "“Rejalashtirilmoqda” statusi foydalanuvchini taxminiy yoki uydirma ma’lumotdan himoya qiladi.",
          policyEyebrow:
            "Ishonchlilik",
          policyTitle:
            "Har bir holat aniq ajratiladi",
          policyDescription:
            "E’lon qilingan tadbir bilan hali rejadagi tadbir bir xil holatda taqdim etilmaydi. Bu foydalanuvchiga nima tasdiqlangan, nima hali reja ekanini darhol tushunishga yordam beradi.",
          policyItems: [
            "Real tadbirda sana va rasmiy manba tekshiriladi",
            "Tashkilotchi kartada aniq ko‘rsatiladi",
            "Rejadagi tadbirlarda noma’lum ma’lumot uydirilmaydi",
          ],
          archiveEyebrow:
            "Arxiv",
          archiveTitle:
            "O‘tgan tadbirlar",
          reminderEyebrow:
            "Muhim eslatma",
          reminderTitle:
            "Yo‘lga chiqishdan oldin rasmiy manbani yana tekshiring",
          reminderDescription:
            "Tashkilotchilar sana, manzil yoki dasturga o‘zgartirish kiritishi mumkin. Tasdiqlangan tadbir detail sahifasida rasmiy manba ko‘rsatiladi.",
          eventsButton:
            "Tadbirlarga qaytish",
          card: {
            time:
              "Vaqt",
            location:
              "Manzil",
            price:
              "Narx",
            event:
              "Tadbir",
            detailsDescription:
              "Batafsil dastur va manzil",
            details:
              "Batafsil",
            organizer:
              "Tashkilotchi",
            planning:
              "Rejalashtirilmoqda",
            dateTbd:
              "Sana keyinroq e’lon qilinadi",
            locationTbd:
              "Manzil tasdiqlangandan keyin qo‘shiladi",
            planningDescription:
              "Tafsilotlar tasdiqlangach yangilanadi",
          },
        }
      : {
          heroEyebrow:
            "Veranstaltungen",
          heroTitle:
            "Begegnen, lernen und gemeinsam Zeit verbringen",
          heroDescription:
            "Veröffentlichte Veranstaltungen werden mit geprüften Angaben und offizieller Quelle angezeigt. Geplante Veranstaltungen erscheinen transparent als „In Planung“, ohne erfundene Termine oder Orte.",
          upcomingButton:
            "Veröffentlichte Veranstaltungen",
          planningButton:
            "Geplante Veranstaltungen",
          stats: {
            overview:
              "Event-Status im Überblick",
            upcoming: {
              label:
                "Veröffentlichte Veranstaltungen",
              description:
                "Termin und Angaben sind bestätigt",
              emptyDescription:
                "Derzeit keine veröffentlichten Termine",
            },
            planning: {
              label:
                "Geplante Veranstaltungen",
              description:
                "Details werden vorbereitet",
            },
          },
          categoryEyebrow:
            "Bereiche",
          categoryTitle:
            "Veranstaltungen für unterschiedliche Interessen",
          categories: [
            {
              title:
                "Kultur",
              description:
                "Feiertage, kulturelle Treffen und usbekische Traditionen.",
              accent:
                "from-cyan-500/14 to-blue-500/5",
            },
            {
              title:
                "Gemeinschaft",
              description:
                "Community-Treffen, Familien und Networking.",
              accent:
                "from-emerald-500/14 to-cyan-500/5",
            },
            {
              title:
                "Sport",
              description:
                "Fußball, Volleyball, Schach und weitere gemeinsame Aktivitäten.",
              accent:
                "from-violet-500/12 to-blue-500/5",
            },
            {
              title:
                "Bildung und Karriere",
              description:
                "Seminare, Workshops, Bildung und berufliche Begegnungen.",
              accent:
                "from-amber-500/12 to-orange-500/5",
            },
          ],
          upcomingEyebrow:
            "Bestätigt",
          upcomingTitle:
            "Kommende Veranstaltungen",
          upcomingDescription:
            "Reale Veranstaltungen mit geprüftem Datum, Veranstalter, Ort und vorhandenen Anmeldeinformationen.",
          emptyBadge:
            "Derzeit keine bestätigte reale Veranstaltung",
          emptyTitle:
            "Neue Veranstaltungen erscheinen hier nach der Prüfung",
          emptyDescription:
            "Wir füllen den Bereich nicht mit erfundenen Terminen oder Orten. Die folgenden Planungen zeigen transparent mögliche zukünftige Veranstaltungen.",
          planningEyebrow:
            "Geplante Veranstaltungen",
          planningTitle:
            "Geplante Veranstaltungen",
          planningDescription:
            "Diese Karten sind noch keine bestätigten realen Veranstaltungen. Datum, Ort und Anmeldung werden ergänzt, sobald sie feststehen.",
          planningNote:
            "Der Status „In Planung“ schützt vor voreiligen oder erfundenen Angaben.",
          policyEyebrow:
            "Verlässlichkeit",
          policyTitle:
            "Jeder Status wird klar unterschieden",
          policyDescription:
            "Eine veröffentlichte Veranstaltung und eine noch geplante Veranstaltung werden nicht gleich dargestellt. So ist sofort erkennbar, was bestätigt und was noch in Planung ist.",
          policyItems: [
            "Bei realen Veranstaltungen werden Datum und offizielle Quelle geprüft",
            "Der Veranstalter wird direkt auf der Karte genannt",
            "Bei geplanten Veranstaltungen werden unbekannte Angaben nicht erfunden",
          ],
          archiveEyebrow:
            "Archiv",
          archiveTitle:
            "Vergangene Veranstaltungen",
          reminderEyebrow:
            "Wichtiger Hinweis",
          reminderTitle:
            "Offizielle Quelle vor der Anreise erneut prüfen",
          reminderDescription:
            "Veranstalter können Datum, Ort oder Programm ändern. Bei bestätigten Veranstaltungen ist die offizielle Quelle auf der Detailseite angegeben.",
          eventsButton:
            "Zu den Veranstaltungen",
          card: {
            time:
              "Uhrzeit",
            location:
              "Ort",
            price:
              "Preis",
            event:
              "Veranstaltung",
            detailsDescription:
              "Programm und Veranstaltungsort",
            details:
              "Details",
            organizer:
              "Veranstalter",
            planning:
              "In Planung",
            dateTbd:
              "Datum wird später bekannt gegeben",
            locationTbd:
              "Ort wird nach der Bestätigung ergänzt",
            planningDescription:
              "Details folgen nach der Bestätigung",
          },
        };

  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfd_46%,#ffffff_100%)] pt-20 text-slate-950 dark:bg-[linear-gradient(180deg,#020617_0%,#07111f_48%,#020617_100%)] dark:text-white">
        <header className="relative isolate overflow-hidden border-b border-slate-200/70 dark:border-slate-800">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-28 -top-36 size-[32rem] rounded-full bg-cyan-200/30 blur-[120px] dark:bg-cyan-400/[0.035]" />
            <div className="absolute right-[4%] top-0 size-[28rem] rounded-full bg-emerald-200/22 blur-[110px] dark:bg-emerald-400/[0.03]" />
            <div className="absolute right-[22%] top-[58%] size-[18rem] rounded-full bg-amber-200/12 blur-[100px] dark:bg-amber-300/[0.015]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.75fr)] lg:items-center lg:px-8 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-400/15 dark:bg-white/[0.035] dark:text-cyan-300">
                <CalendarIcon className="size-4" />
                <BrandName /> · {copy.heroEyebrow}
              </span>

              <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                {copy.heroTitle}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 dark:text-slate-300">
                {copy.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#upcoming-events"
                  className="button-primary text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-page"
                >
                  {copy.upcomingButton}
                </a>

                <a
                  href="#planning-events"
                  className="button-secondary text-sm backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-page"
                >
                  {copy.planningButton}
                </a>
              </div>
            </div>

            <aside
              aria-label={copy.stats.overview}
              className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/65 p-6 shadow-[0_28px_80px_-58px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-900/45 sm:p-7 lg:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-400/[0.035]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-20 size-64 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-400/[0.03]"
              />

              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  {copy.stats.overview}
                </p>

                <div className="mt-7 grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center lg:grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)]">
                  <div className="relative flex size-28 shrink-0 items-center justify-center sm:size-32">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-cyan-300/55 dark:border-cyan-300/15"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-3 rounded-full border border-emerald-300/65 dark:border-emerald-300/20"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute right-1 top-4 size-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.65)]"
                    />

                    <span className="relative text-6xl font-black leading-none tracking-[-0.07em] text-emerald-600 dark:text-emerald-400">
                      {planningEvents.length}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.08)]"
                      />
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                        {copy.stats.planning.label}
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {copy.stats.planning.description}
                    </p>
                  </div>
                </div>

                <div className="mt-7 border-t border-slate-200/80 pt-5 dark:border-white/[0.08]">
                  <div className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/[0.07] dark:text-emerald-300">
                      <CheckIcon className="size-4" />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">
                          {upcomingEvents.length}
                        </span>
                        <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
                          {copy.stats.upcoming.label}
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {upcomingEvents.length === 0
                          ? copy.stats.upcoming.emptyDescription
                          : copy.stats.upcoming.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {copy.categoryEyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              {copy.categoryTitle}
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.categories.map(
                (category) => (
                  <article
                    key={category.title}
                    className={`rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br ${category.accent} p-6 shadow-[0_18px_48px_-38px_rgba(15,23,42,0.4)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700`}
                  >
                    <span className="block h-1 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400" />
                    <h3 className="mt-5 text-xl font-bold">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {category.description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          id="upcoming-events"
          className="relative py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              {copy.upcomingEyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              {copy.upcomingTitle}
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {copy.upcomingDescription}
            </p>

            {upcomingEvents.length >
            0 ? (
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map(
                  (
                    event,
                    index,
                  ) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      locale={locale}
                      labels={copy.card}
                      index={index}
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/75 p-8 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/65 sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -right-24 -top-24 size-64 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-400/[0.03]"
                />

                <span className="relative inline-flex rounded-full border border-amber-200/80 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 dark:border-amber-400/15 dark:bg-amber-400/[0.05] dark:text-amber-300">
                  {copy.emptyBadge}
                </span>

                <h3 className="relative mt-6 max-w-3xl text-2xl font-black tracking-[-0.035em] sm:text-3xl">
                  {copy.emptyTitle}
                </h3>

                <p className="relative mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
                  {copy.emptyDescription}
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          id="planning-events"
          className="relative border-y border-cyan-100/80 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.09),transparent_26%),linear-gradient(180deg,rgba(248,250,252,0.72),rgba(255,255,255,0.9))] py-16 dark:border-cyan-400/[0.08] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.025),transparent_26%),linear-gradient(180deg,rgba(15,23,42,0.45),rgba(2,6,23,0.72))] sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  {copy.planningEyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  {copy.planningTitle}
                </h2>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                  {copy.planningDescription}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-200/75 bg-white/70 p-5 text-sm leading-6 text-slate-600 shadow-sm backdrop-blur dark:border-cyan-400/12 dark:bg-white/[0.035] dark:text-slate-300">
                {copy.planningNote}
              </div>
            </div>

            {planningEvents.length >
            0 && (
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {planningEvents.map(
                  (
                    event,
                    index,
                  ) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      locale={locale}
                      labels={copy.card}
                      index={index}
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                  {copy.policyEyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  {copy.policyTitle}
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                  {copy.policyDescription}
                </p>
              </div>

              <ul className="space-y-4">
                {copy.policyItems.map(
                  (item) => (
                    <li
                      key={item}
                      className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-[0_16px_42px_-34px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
                    >
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-400/[0.06] dark:text-emerald-300">
                        <CheckIcon className="size-4" />
                      </span>
                      <span className="pt-1 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </section>

        {pastEvents.length >
          0 && (
          <section className="relative py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                {copy.archiveEyebrow}
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                {copy.archiveTitle}
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map(
                  (
                    event,
                    index,
                  ) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      locale={locale}
                      labels={copy.card}
                      index={index}
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}

        <section className="relative overflow-hidden bg-slate-950 py-18 text-white sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(16,185,129,0.10),transparent_28%)]"
          />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
                {copy.reminderEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                {copy.reminderTitle}
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                {copy.reminderDescription}
              </p>
            </div>

            <a
              href="#upcoming-events"
              className="button-primary w-fit shadow-lg shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              {copy.eventsButton}
            </a>
          </div>
        </section>
      </main>

      <SectionPromo target="guide" />

      <Footer />
    </>
  );
}
