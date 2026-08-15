import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocale,
} from "next-intl/server";

import BrandName from "../../../components/ui/BrandName";
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
  toPlanningEventItem,
} from "../../../lib/events/event-presenter";
import type {
  EventItem,
  EventRegistrationMethod,
  PlanningEventItem,
  RegistrationStatusKey,
  SupportedEventLocale,
} from "../../../types/event";
import {
  Link,
} from "../../../i18n/navigation";
import {
  getPublishedEventDetailBySlug,
  getRelatedPublishedEvents,
} from "../../../lib/events/public-events-repository";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type RegistrationAction = Readonly<{
  href: string;
  label: string;
}>;

export const dynamic =
  "force-dynamic";

const baseUrl =
  "https://vatandoshlar.de";

function serializeStructuredData(
  data: object,
): string {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  );
}

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

function getBerlinDate(): string {
  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Europe/Berlin",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  ).format(new Date());
}

function isRegistrationUnavailable(
  event: EventItem,
): boolean {
  return (
    event.registrationStatusKey ===
      "closed" ||
    event.registrationStatusKey ===
      "sold-out" ||
    (
      event.registrationDeadline !== undefined &&
      event.registrationDeadline <
        getBerlinDate()
    )
  );
}

function getRegistrationAction(
  event: EventItem,
  locale: SupportedEventLocale,
): RegistrationAction | null {
  if (
    event.registrationMethod ===
      "none" ||
    event.registrationStatusKey !==
      "open" ||
    isRegistrationUnavailable(event)
  ) {
    return null;
  }

  const labels: Record<
    EventRegistrationMethod,
    string
  > =
    locale === "uz"
      ? {
          google_form:
            "Ro‘yxatdan o‘tish",
          telegram:
            "Telegram orqali bog‘lanish",
          email:
            "Email orqali ro‘yxatdan o‘tish",
          phone:
            "Tashkilotchiga qo‘ng‘iroq qilish",
          external_url:
            "Ro‘yxatdan o‘tish",
          none:
            "Ro‘yxatdan o‘tish shart emas",
        }
      : {
          google_form:
            "Zur Anmeldung",
          telegram:
            "Über Telegram kontaktieren",
          email:
            "Per E-Mail anmelden",
          phone:
            "Veranstalter anrufen",
          external_url:
            "Zur Anmeldung",
          none:
            "Keine Anmeldung erforderlich",
        };

  if (
    event.registrationMethod ===
      "google_form" &&
    event.registrationUrl
  ) {
    if (
      !/^https:\/\/docs\.google\.com\/forms\/.*\/viewform(?:[?#].*)?$/i.test(
        event.registrationUrl,
      )
    ) {
      return null;
    }

    return {
      href:
        event.registrationUrl,
      label:
        labels.google_form,
    };
  }

  if (
    event.registrationMethod ===
      "external_url" &&
    event.registrationUrl
  ) {
    return {
      href:
        event.registrationUrl,
      label:
        labels.external_url,
    };
  }

  if (
    event.registrationMethod ===
      "telegram" &&
    event.registrationValue
  ) {
    const value =
      event.registrationValue.trim();

    const href =
      /^https?:\/\//i.test(value) ||
      /^tg:\/\//i.test(value)
        ? value
        : `https://t.me/${value.replace(
            /^@/,
            "",
          )}`;

    return {
      href,
      label:
        labels.telegram,
    };
  }

  if (
    event.registrationMethod ===
      "email" &&
    event.registrationValue
  ) {
    return {
      href:
        `mailto:${event.registrationValue}`,
      label:
        labels.email,
    };
  }

  if (
    event.registrationMethod ===
      "phone" &&
    event.registrationValue
  ) {
    return {
      href:
        `tel:${event.registrationValue.replace(
          /\s+/g,
          "",
        )}`,
      label:
        labels.phone,
    };
  }

  return null;
}

function OrganizerValue({
  event,
  locale,
}: Readonly<{
  event:
    | EventItem
    | PlanningEventItem;
  locale: SupportedEventLocale;
}>) {
  if (
    event.organizerType ===
    "vatandoshlar"
  ) {
    return (
      <span>
        {locale === "uz"
          ? null
          : "Von "}
        <BrandName />
        {locale === "uz"
          ? " tomonidan"
          : null}
      </span>
    );
  }

  return event.organizerName;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const locale =
    (await getLocale()) as SupportedEventLocale;

  const event =
    await getPublishedEventDetailBySlug(
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
    await getPublishedEventDetailBySlug(
      slug,
      locale,
    );

  if (!publicEvent) {
    notFound();
  }

  const event =
    publicEvent.eventStatus ===
      "planning"
      ? toPlanningEventItem(
          publicEvent,
          locale,
        )
      : toEventItem(
          publicEvent,
          locale,
        );

  const isPlanning =
    event.eventStatus ===
    "planning";

  const relatedEvents =
    publicEvent.eventStatus ===
      "planning"
      ? []
      : (
          await getRelatedPublishedEvents(
            publicEvent,
            locale,
            3,
          )
        ).map(
          (item) =>
            toEventItem(
              item,
              locale,
            ),
        );

  const eventStructuredData =
    event.eventStatus ===
      "scheduled"
      ? (() => {
          const eventUrl =
            `${baseUrl}/${locale}/events/${event.slug}`;

          const startDate =
            event.startTime
              ? `${event.startDate}T${event.startTime}`
              : event.startDate;

          const endDate =
            event.endDate
              ? (
                  event.endTime
                    ? `${event.endDate}T${event.endTime}`
                    : event.endDate
                )
              : undefined;

          const attendanceMode =
            event.onlineUrl &&
            event.address
              ? "https://schema.org/MixedEventAttendanceMode"
              : event.onlineUrl
                ? "https://schema.org/OnlineEventAttendanceMode"
                : "https://schema.org/OfflineEventAttendanceMode";

          return {
            "@context":
              "https://schema.org",
            "@type":
              "Event",
            name:
              event.title,
            description:
              event.excerpt,
            url:
              eventUrl,
            inLanguage:
              locale === "de"
                ? "de-DE"
                : "uz-UZ",
            startDate,
            ...(endDate
              ? {
                  endDate,
                }
              : {}),
            eventAttendanceMode:
              attendanceMode,
            location:
              event.onlineUrl &&
              !event.address
                ? {
                    "@type":
                      "VirtualLocation",
                    url:
                      event.onlineUrl,
                  }
                : {
                    "@type":
                      "Place",
                    name:
                      getEventLocation(
                        event,
                        locale,
                      ),
                    ...(event.address
                      ? {
                          address:
                            event.address,
                        }
                      : {}),
                  },
            organizer: {
              "@type":
                "Organization",
              name:
                event.organizerName,
            },
          };
        })()
      : null;

  const copy =
    locale === "uz"
      ? {
          back:
            "Barcha tadbirlar",
          about:
            "Tadbir haqida",
          planningStatus:
            "Rejalashtirilmoqda",
          planningIntro:
            "Bu tadbir hali reja bosqichida. Sana, manzil va qatnashish tartibi tasdiqlangach shu sahifada yangilanadi.",
          planningDate:
            "Sana keyinroq e’lon qilinadi",
          planningLocation:
            "Manzil tasdiqlangandan keyin qo‘shiladi",
          planningRegistration:
            "Ro‘yxatdan o‘tish tafsilotlari tayyor bo‘lgach e’lon qilinadi",
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
          registrationClosed:
            "Ro‘yxatdan o‘tish yopilgan",
          noRegistration:
            "Ro‘yxatdan o‘tish talab qilinmaydi",
          capacity:
            "Sig‘im",
          capacityValue:
            "kishi",
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
          back:
            "Alle Veranstaltungen",
          about:
            "Über die Veranstaltung",
          planningStatus:
            "In Planung",
          planningIntro:
            "Diese Veranstaltung befindet sich noch in Planung. Datum, Ort und Teilnahmeinformationen werden ergänzt, sobald sie bestätigt sind.",
          planningDate:
            "Datum wird später bekannt gegeben",
          planningLocation:
            "Ort wird nach der Bestätigung ergänzt",
          planningRegistration:
            "Anmeldeinformationen werden ergänzt, sobald sie feststehen",
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
          registrationClosed:
            "Anmeldung geschlossen",
          noRegistration:
            "Keine Anmeldung erforderlich",
          capacity:
            "Kapazität",
          capacityValue:
            "Personen",
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

  const registrationAction =
    event.eventStatus ===
      "scheduled"
      ? getRegistrationAction(
          event,
          locale,
        )
      : null;

  const registrationLabel =
    event.eventStatus ===
      "planning"
      ? copy.planningRegistration
      : isRegistrationUnavailable(
            event,
          )
        ? copy.registrationClosed
        : event.registrationMethod ===
              "none"
          ? copy.noRegistration
          : event.registrationStatus;

  return (
    <>
      {eventStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              serializeStructuredData(
                eventStructuredData,
              ),
          }}
        />
      )}

      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <article>
          <header className="relative overflow-hidden bg-slate-950 text-white">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-25"
            >
              <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500 blur-3xl" />
              <div className="absolute -bottom-48 left-20 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-8">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
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

                {isPlanning && (
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-sm font-semibold text-emerald-200">
                    {
                      copy.planningStatus
                    }
                  </span>
                )}

                {event.eventStatus ===
                    "scheduled" &&
                  event.featured && (
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
              {isPlanning && (
                <section className="mb-10 rounded-3xl border border-cyan-200/80 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-6 shadow-sm dark:border-cyan-400/15 dark:bg-[linear-gradient(135deg,rgba(8,47,73,0.38),rgba(15,23,42,0.7),rgba(6,78,59,0.22))] sm:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                    {
                      copy.planningStatus
                    }
                  </p>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
                    {
                      copy.planningIntro
                    }
                  </p>
                </section>
              )}

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

              {event.eventStatus ===
                "scheduled" && (
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
                      className="button-primary"
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
              )}
            </div>

            <aside>
              <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <dl className="space-y-5 text-sm">
                  {event.eventStatus ===
                  "planning" ? (
                    <>
                      <div>
                        <dt className="font-semibold text-slate-500 dark:text-slate-400">
                          {copy.date}
                        </dt>

                        <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                          {
                            copy.planningDate
                          }
                        </dd>
                      </div>

                      <div>
                        <dt className="font-semibold text-slate-500 dark:text-slate-400">
                          {
                            copy.location
                          }
                        </dt>

                        <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                          {
                            copy.planningLocation
                          }
                        </dd>
                      </div>
                    </>
                  ) : (
                    <>
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
                          {
                            copy.location
                          }
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
                          {
                            event.priceLabel
                          }
                        </dd>
                      </div>
                    </>
                  )}

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
                      <OrganizerValue
                        event={event}
                        locale={locale}
                      />
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-slate-500 dark:text-slate-400">
                      {
                        copy.registration
                      }
                    </dt>

                    <dd className="mt-2">
                      {event.eventStatus ===
                      "planning" ? (
                        <p className="leading-6 text-slate-600 dark:text-slate-400">
                          {
                            registrationLabel
                          }
                        </p>
                      ) : (
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getRegistrationStyles(
                            isRegistrationUnavailable(
                              event,
                            )
                              ? "closed"
                              : event.registrationStatusKey,
                          )}`}
                        >
                          {
                            registrationLabel
                          }
                        </span>
                      )}
                    </dd>
                  </div>

                  {event.eventStatus ===
                      "scheduled" &&
                    event.registrationDeadline && (
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

                  {event.eventStatus ===
                      "scheduled" &&
                    event.capacity !==
                      undefined && (
                    <div>
                      <dt className="font-semibold text-slate-500 dark:text-slate-400">
                        {
                          copy.capacity
                        }
                      </dt>

                      <dd className="mt-1 font-bold text-slate-950 dark:text-white">
                        {event.capacity}{" "}
                        {
                          copy.capacityValue
                        }
                      </dd>
                    </div>
                  )}
                </dl>

                {event.eventStatus ===
                  "scheduled" && (
                  <div className="mt-7 grid gap-3">
                    {registrationAction && (
                      <a
                        href={
                          registrationAction.href
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="button-primary w-full text-center"
                      >
                        {
                          registrationAction.label
                        }
                      </a>
                    )}

                    {event.onlineUrl && (
                      <a
                        href={
                          event.onlineUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="button-secondary w-full text-center"
                      >
                        {copy.openOnline}
                      </a>
                    )}
                  </div>
                )}
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
