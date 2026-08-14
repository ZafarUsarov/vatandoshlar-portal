import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocale,
} from "next-intl/server";

import EventCard from "../../../components/cards/EventCard";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import SectionPromo from "../../../components/SectionPromo";
import {
  formatEventDate,
  formatEventDateRange,
  formatEventTime,
  getEventLocation,
  toEventItem,
} from "../../../lib/events/event-presenter";
import type {
  RegistrationStatusKey,
  SupportedEventLocale,
} from "../../../types/event";
import {
  Link,
} from "../../../i18n/navigation";
import {
  getPublishedEventBySlug,
  getRelatedPublishedEvents,
} from "../../../lib/events/public-events-repository";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic =
  "force-dynamic";

function getRegistrationStyles(
  status: RegistrationStatusKey,
): string {
  if (
    status === "open"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (
    status === "not-required"
  ) {
    return "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300";
  }

  if (
    status === "sold-out"
  ) {
    return "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300";
  }

  return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const locale =
    (await getLocale()) as SupportedEventLocale;

  const event =
    await getPublishedEventBySlug(
      slug,
      locale,
    );

  if (!event) {
    return {
      title:
        locale === "uz"
          ? "Tadbir topilmadi | Vatandoshlar.de"
          : "Veranstaltung nicht gefunden | Vatandoshlar.de",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title:
      `${event.title} | Vatandoshlar.de`,

    description:
      event.excerpt,

    alternates: {
      canonical:
        `/${locale}/events/${event.slug}`,

      languages: {
        uz:
          `/uz/events/${event.slug}`,
        de:
          `/de/events/${event.slug}`,
      },
    },
    openGraph: {
      type: "website",
      title:
        event.title,
      description:
        event.excerpt,
      url:
        `/${locale}/events/${event.slug}`,
      siteName:
        "Vatandoshlar.de",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
    },
    twitter: {
      card: "summary",
      title:
        event.title,
      description:
        event.excerpt,
    },
  };
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const { slug } =
    await params;

  const locale =
    (await getLocale()) as SupportedEventLocale;

  const publicEvent =
    await getPublishedEventBySlug(
      slug,
      locale,
    );

  if (!publicEvent) {
    notFound();
  }

  const relatedPublicEvents =
    await getRelatedPublishedEvents(
      publicEvent,
      locale,
      3,
    );

  const event =
    toEventItem(
      publicEvent,
      locale,
    );

  const relatedEvents =
    relatedPublicEvents.map(
      (item) =>
        toEventItem(
          item,
          locale,
        ),
    );

  const copy =
    locale === "uz"
      ? {
          back:
            "Barcha tadbirlar",
          about:
            "Tadbir haqida",
          date:
            "Sana",
          time:
            "Vaqt",
          location:
            "Manzil",
          price:
            "Narx",
          languages:
            "Tillar",
          organizer:
            "Tashkilotchi",
          registration:
            "Ro‘yxatdan o‘tish",
          registrationDeadline:
            "Ro‘yxatdan o‘tish muddati",
          register:
            "Ro‘yxatdan o‘tish",
          openOnline:
            "Onlayn tadbirni ochish",
          sourceEyebrow:
            "Rasmiy manba",
          sourceDescription:
            "Tadbir ma’lumotlarini rasmiy tashkilotchi sahifasida qayta tekshiring.",
          sourceButton:
            "Rasmiy manbani ochish",
          verified:
            "Oxirgi tekshiruv",
          notes:
            "Muhim eslatmalar",
          relatedEyebrow:
            "Boshqa tadbirlar",
          relatedTitle:
            "Sizga qiziq bo‘lishi mumkin",
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
          },
        }
      : {
          back:
            "Alle Veranstaltungen",
          about:
            "Über die Veranstaltung",
          date:
            "Datum",
          time:
            "Uhrzeit",
          location:
            "Ort",
          price:
            "Preis",
          languages:
            "Sprachen",
          organizer:
            "Veranstalter",
          registration:
            "Anmeldung",
          registrationDeadline:
            "Anmeldefrist",
          register:
            "Zur Anmeldung",
          openOnline:
            "Online-Veranstaltung öffnen",
          sourceEyebrow:
            "Offizielle Quelle",
          sourceDescription:
            "Prüfen Sie die Veranstaltungsinformationen vor der Teilnahme erneut auf der offiziellen Seite des Veranstalters.",
          sourceButton:
            "Offizielle Quelle öffnen",
          verified:
            "Zuletzt geprüft",
          notes:
            "Wichtige Hinweise",
          relatedEyebrow:
            "Weitere Veranstaltungen",
          relatedTitle:
            "Das könnte Sie interessieren",
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
          },
        };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <article>
          <header className="relative overflow-hidden bg-slate-950 text-white">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
            >
              <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
              <div className="absolute -bottom-48 left-20 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-8">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
              >
                ← {copy.back}
              </Link>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white">
                  {event.category}
                </span>

                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white">
                  {event.format}
                </span>

                {event.featured && (
                  <span className="rounded-full border border-violet-300/30 bg-violet-400/15 px-3 py-1.5 text-sm font-semibold text-violet-100">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {event.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {event.excerpt}
              </p>
            </div>
          </header>

          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8 lg:py-20">
            <div>
              <section>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {copy.about}
                </h2>

                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                  {event.description.map(
                    (
                      paragraph,
                      index,
                    ) => (
                      <p
                        key={`${event.slug}-description-${index}`}
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </section>

              {event.importantNotes.length >
                0 && (
                <section className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-500/20 dark:bg-amber-500/10 sm:p-8">
                  <h2 className="text-xl font-bold text-amber-950 dark:text-amber-100">
                    {copy.notes}
                  </h2>

                  <ul className="mt-5 space-y-3 text-sm leading-7 text-amber-900 dark:text-amber-200">
                    {event.importantNotes.map(
                      (
                        note,
                        index,
                      ) => (
                        <li
                          key={`${event.slug}-note-${index}`}
                          className="flex gap-3"
                        >
                          <span aria-hidden="true">
                            •
                          </span>

                          <span>
                            {note}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              )}

              <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                  {
                    copy.sourceEyebrow
                  }
                </p>

                <h2 className="mt-3 text-xl font-bold">
                  {
                    event.officialSourceName
                  }
                </h2>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                  {
                    copy.sourceDescription
                  }
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href={
                      event.officialSourceUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    {
                      copy.sourceButton
                    }
                  </a>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {copy.verified}:{" "}
                    <time
                      dateTime={
                        event.verifiedAt
                      }
                    >
                      {formatEventDate(
                        event.verifiedAt,
                        locale,
                      )}
                    </time>
                  </p>
                </div>
              </section>
            </div>

            <aside>
              <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <dl className="space-y-5 text-sm">
                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {copy.date}
                    </dt>

                    <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                      {formatEventDateRange(
                        event.startDate,
                        locale,
                        event.endDate,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {copy.time}
                    </dt>

                    <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                      {formatEventTime(
                        locale,
                        event.startTime,
                        event.endTime,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {copy.location}
                    </dt>

                    <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                      {getEventLocation(
                        event,
                        locale,
                      )}
                    </dd>

                    {event.address && (
                      <dd className="mt-1 text-slate-500 dark:text-slate-400">
                        {
                          event.address
                        }
                      </dd>
                    )}
                  </div>

                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {copy.price}
                    </dt>

                    <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                      {event.priceLabel}
                    </dd>
                  </div>

                  {event.language.length >
                    0 && (
                    <div>
                      <dt className="font-semibold text-slate-500 dark:text-slate-400">
                        {
                          copy.languages
                        }
                      </dt>

                      <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                        {event.language.join(
                          ", ",
                        )}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {copy.organizer}
                    </dt>

                    <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                      {
                        event.organizerName
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {
                        copy.registration
                      }
                    </dt>

                    <dd className="mt-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getRegistrationStyles(
                          event.registrationStatusKey,
                        )}`}
                      >
                        {
                          event.registrationStatus
                        }
                      </span>
                    </dd>
                  </div>

                  {event.registrationDeadline && (
                    <div>
                      <dt className="font-semibold text-slate-500 dark:text-slate-400">
                        {
                          copy.registrationDeadline
                        }
                      </dt>

                      <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                        {formatEventDate(
                          event.registrationDeadline,
                          locale,
                        )}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-7 grid gap-3">
                  {event.registrationUrl && (
                    <a
                      href={
                        event.registrationUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                    >
                      {copy.register}
                    </a>
                  )}

                  {event.onlineUrl && (
                    <a
                      href={
                        event.onlineUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-bold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
                    >
                      {copy.openOnline}
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </article>

        {relatedEvents.length >
          0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/60 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                {
                  copy.relatedEyebrow
                }
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {
                  copy.relatedTitle
                }
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedEvents.map(
                  (
                    relatedEvent,
                    index,
                  ) => (
                    <EventCard
                      key={
                        relatedEvent.id
                      }
                      event={
                        relatedEvent
                      }
                      locale={
                        locale
                      }
                      labels={
                        copy.card
                      }
                      index={
                        index
                      }
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <SectionPromo target="guide" />

      <Footer />
    </>
  );
}
