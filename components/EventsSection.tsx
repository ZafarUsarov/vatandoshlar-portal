import { getLocale } from "next-intl/server";

import EventCard from "@/components/cards/EventCard";
import {
  toEventItem,
} from "@/lib/events/event-presenter";
import {
  getUpcomingPublishedEvents,
} from "@/lib/events/public-events-repository";
import type {
  SupportedEventLocale,
} from "@/types/event";
import { Link } from "@/i18n/navigation";

type IconProps = Readonly<{
  className?: string;
}>;

function CalendarIcon({ className }: IconProps) {
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

function ArrowUpRightIcon({ className }: IconProps) {
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

  const homepageEvents =
    (
      await getUpcomingPublishedEvents(
        locale,
      )
    )
      .slice(
        0,
        3,
      )
      .map(
        (event) =>
          toEventItem(
            event,
            locale,
          ),
      );

  const copy =
    locale === "uz"
      ? {
          badge: "Tadbirlar",
          title:
            "Germaniyadagi o‘zbeklar uchun muhim tadbirlar",
          description:
            "Madaniy uchrashuvlar, ta’lim dasturlari, karyera tadbirlari va jamoat yig‘inlari. Faqat rasmiy manbasi tekshirilgan tadbirlar e’lon qilinadi.",
          allEvents: "Barcha tadbirlar",
          stats: [
            {
              value: `${homepageEvents.length}`,
              label: "yaqin tadbir",
            },
            {
              value: "100%",
              label: "manbasi tekshirilgan",
            },
            {
              value: "DE",
              label: "Germaniya bo‘ylab",
            },
          ],
          emptyTitle:
            "Hozircha tasdiqlangan tadbir mavjud emas",
          emptyDescription:
            "Yangi tadbirlar rasmiy manbasi tekshirilgandan keyin e’lon qilinadi.",
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
          badge: "Veranstaltungen",
          title:
            "Wichtige Veranstaltungen für Usbeken in Deutschland",
          description:
            "Kulturelle Treffen, Bildungsprogramme, Karriereveranstaltungen und gemeinschaftliche Begegnungen. Veröffentlicht werden nur Veranstaltungen mit geprüfter offizieller Quelle.",
          allEvents: "Alle Veranstaltungen",
          stats: [
            {
              value: `${homepageEvents.length}`,
              label: "kommende Veranstaltungen",
            },
            {
              value: "100%",
              label: "Quelle geprüft",
            },
            {
              value: "DE",
              label: "deutschlandweit",
            },
          ],
          emptyTitle:
            "Derzeit gibt es keine bestätigte Veranstaltung",
          emptyDescription:
            "Neue Veranstaltungen werden veröffentlicht, sobald ihre offizielle Quelle geprüft wurde.",
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
    <section
      id="events"
      aria-labelledby="events-heading"
      className="relative isolate overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-32 dark:bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.10),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(124,58,237,0.08),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.06),transparent_32%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
              <CalendarIcon className="size-4" />
              {copy.badge}
            </div>

            <h2
              id="events-heading"
              className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {copy.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              {copy.description}
            </p>
          </div>

          <Link
            href="/events"
            className="group hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md lg:inline-flex dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
          >
            {copy.allEvents}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {homepageEvents.length > 0 ? (
          <>
            <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {homepageEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  locale={locale}
                  labels={copy.card}
                  index={index}
                />
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">
              <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/[0.08]">
                {copy.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-8 py-7"
                  >
                    <div className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12 dark:border-slate-800 dark:bg-slate-900">
            <div
              aria-hidden="true"
              className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-blue-50 text-3xl text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
            >
              ◷
            </div>
            <h3 className="mt-6 text-2xl font-bold text-slate-950 dark:text-white">
              {copy.emptyTitle}
            </h3>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
              {copy.emptyDescription}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
          >
            {copy.allEvents}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
