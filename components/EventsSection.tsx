import { getLocale } from "next-intl/server";

import EventCard from "@/components/cards/EventCard";
import {
  toEventItem,
  toPlanningEventItem,
} from "@/lib/events/event-presenter";
import {
  getPlanningPublishedEvents,
  getUpcomingPublishedEvents,
} from "@/lib/events/public-events-repository";
import type {
  EventDiscoveryItem,
  SupportedEventLocale,
} from "@/types/event";
import { Link } from "@/i18n/navigation";

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

function ArrowUpRightIcon({
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
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default async function EventsSection() {
  const locale =
    (await getLocale()) as SupportedEventLocale;

  const [
    upcomingPublicEvents,
    planningPublicEvents,
  ] = await Promise.all([
    getUpcomingPublishedEvents(
      locale,
    ),
    getPlanningPublishedEvents(
      locale,
    ),
  ]);

  const confirmedEvents =
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

  const homepageEvents:
    EventDiscoveryItem[] = [
      ...confirmedEvents,
      ...planningEvents,
    ].slice(0, 3);

  const copy =
    locale === "uz"
      ? {
          badge: "Tadbirlar",
          title:
            "Germaniyadagi o‘zbeklar uchun tadbirlar va kelajakdagi rejalar",
          description:
            "E’lon qilingan tadbirlar alohida tekshiriladi. Sana yoki joyi hali belgilanmagan rejadagi tadbirlar esa foydalanuvchini chalg‘itmasdan “Rejalashtirilmoqda” holatida ko‘rsatiladi.",
          allEvents:
            "Barcha tadbirlar",
          stats: [
            {
              value:
                `${confirmedEvents.length}`,
              label:
                "e’lon qilingan tadbir",
            },
            {
              value:
                `${planningEvents.length}`,
              label:
                "rejadagi tadbir",
            },
            {
              value:
                "DE",
              label:
                "Germaniya bo‘ylab",
            },
          ],
          emptyTitle:
            "Hozircha tadbir e’loni mavjud emas",
          emptyDescription:
            "E’lon qilingan va rejadagi tadbirlar shu yerda ko‘rsatiladi.",
          card: {
            time: "Vaqt",
            location: "Manzil",
            price: "Narx",
            event: "Tadbir",
            detailsDescription:
              "Batafsil dastur va manzil",
            details: "Batafsil",
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
          badge:
            "Veranstaltungen",
          title:
            "Veranstaltungen und kommende Ideen für die usbekische Community",
          description:
            "Veröffentlichte Veranstaltungen werden separat geprüft. Geplante Veranstaltungen ohne bestätigtes Datum oder Ort erscheinen transparent als „In Planung“.",
          allEvents:
            "Alle Veranstaltungen",
          stats: [
            {
              value:
                `${confirmedEvents.length}`,
              label:
                "veröffentlichte Veranstaltung",
            },
            {
              value:
                `${planningEvents.length}`,
              label:
                "geplante Veranstaltung",
            },
            {
              value:
                "DE",
              label:
                "deutschlandweit",
            },
          ],
          emptyTitle:
            "Derzeit gibt es keine Veranstaltung",
          emptyDescription:
            "Veröffentlichte und geplante Veranstaltungen werden hier angezeigt.",
          card: {
            time: "Uhrzeit",
            location: "Ort",
            price: "Preis",
            event: "Veranstaltung",
            detailsDescription:
              "Programm und Veranstaltungsort",
            details: "Details",
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
    <section
      id="events"
      className="relative isolate overflow-hidden border-y border-slate-200/70 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_88%_24%,rgba(16,185,129,0.09),transparent_24%),linear-gradient(180deg,#f8fbfd_0%,#ffffff_48%,#f8fafc_100%)] py-24 sm:py-28 dark:border-slate-800 dark:bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.035),transparent_28%),radial-gradient(circle_at_88%_24%,rgba(16,185,129,0.03),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_48%,#020617_100%)]"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/80 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-400/15 dark:bg-white/[0.035] dark:text-cyan-300">
              <CalendarIcon className="size-4" />
              {copy.badge}
            </span>

            <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {copy.description}
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-bold text-slate-900 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-4 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:hover:border-cyan-400/30 dark:focus-visible:ring-offset-slate-950"
          >
            {copy.allEvents}
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {copy.stats.map(
            (stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/80 bg-white/65 px-5 py-4 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.45)] backdrop-blur dark:border-white/[0.06] dark:bg-white/[0.035]"
              >
                <p className="text-2xl font-black tracking-[-0.03em] text-slate-950 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ),
          )}
        </div>

        {homepageEvents.length >
        0 ? (
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {homepageEvents.map(
              (
                event,
                index,
              ) => (
                <EventCard
                  key={`${event.eventStatus}-${event.id}`}
                  event={event}
                  locale={locale}
                  labels={copy.card}
                  index={index}
                />
              ),
            )}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 sm:p-12">
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
              {copy.emptyTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
              {copy.emptyDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
