import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocale,
} from "next-intl/server";

import BrandName from "../../../components/ui/BrandName";
import EventCard from "../../../components/cards/EventCard";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import ShareButton from "../../../components/shared/ShareButton";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: "600", display: "swap" });
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
  external: boolean;
}>;

export const dynamic =
  "force-dynamic";

const baseUrl =
  "https://uzde.de";

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
            "Röyxatdan ötiş",
          telegram:
            "Telegram orqali boǵlaniş",
          email:
            "Email orqali ro‘yxatdan o‘tish",
          phone:
            "Taşkilotçiga qönǵiroq qiliş",
          external_url:
            "Röyxatdan ötiş",
          none:
            "Röyxatdan ötiş shart emas",
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
      external: true,
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
      external: true,
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
      external:
        /^https?:\/\//i.test(href),
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
      external: false,
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
      external: false,
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
          ? "Tadbir topilmadi | UzDe"
          : "Veranstaltung nicht gefunden | UzDe",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title:
      `${event.title} | UzDe`,
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
        "UzDe",
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
            "Barça tadbirlar",
          about:
            "Tadbir haqida",
          planningStatus:
            "Rejalaştirilmoqda",
          planningIntro:
            "Tadbir reja bosqiçida. Tasdiqlangan tafsilotlar şu sahifada e’lon qilinadi.",
          planningDate:
            "Hali belgilanmagan",
          planningLocation:
            "Tasdiqlanmagan",
          planningRegistration:
            "Keyinroq e’lon qilinadi",
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
            "Taşkilotçi",
          registration:
            "Röyxatdan ötiş",
          registrationDeadline:
            "Röyxatdan ötiş muddati",
          registrationClosed:
            "Röyxatdan ötiş yopilgan",
          registrationUnavailable:
            "Röyxatdan ötiş ma’lumoti hozircha mavjud emas",
          noRegistration:
            "Röyxatdan ötiş talab qilinmaydi",
          capacity:
            "Sig‘im",
          capacityValue:
            "kishi",
          openOnline:
            "Onlayn tadbirni oçiş",
          sourceEyebrow:
            "Rasmiy manba",
          sourceDescription:
            "Tadbir ma’lumotlarini rasmiy tashkilotchi sahifasida qayta tekşiring.",
          sourceButton:
            "Rasmiy manbani oçiş",
          verified:
            "Oxirgi tekşiruv",
          notes:
            "Muhim eslatmalar",
          relatedEyebrow:
            "Boşqa tadbirlar",
          relatedTitle:
            "Sizga qiziq bölişi mumkin",
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
              "Taşkilotçi",
            planning:
              "Rejalaştirilmoqda",
            dateTbd:
              "Hali belgilanmagan",
            locationTbd:
              "Tasdiqlanmagan",
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
          registrationUnavailable:
            "Anmeldeinformation ist derzeit nicht verfügbar",
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
      : event.registrationStatusKey ===
            "sold-out"
        ? event.registrationStatus
        : isRegistrationUnavailable(
              event,
            )
          ? copy.registrationClosed
          : event.registrationMethod ===
                "none"
            ? copy.noRegistration
            : event.registrationStatusKey ===
                  "open" &&
                !registrationAction
              ? copy.registrationUnavailable
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

      <main className="bg-[var(--uzde-page-bg)] pt-20 text-[var(--text-primary)] transition-colors">
        <article>
          <header className="uzde-newsroom-editorial relative border-b border-[var(--border)] bg-[var(--uzde-editorial-bg)]">
            <div className="relative mx-auto w-full max-w-[var(--uzde-layout-width)] px-[clamp(16px,3.3vw,112px)] py-5 sm:py-9">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-teal-600 dark:hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                ← {copy.back}
              </Link>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {event.category}
                </span>

                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {event.format}
                </span>

                {isPlanning && (
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {
                      copy.planningStatus
                    }
                  </span>
                )}

                {event.eventStatus ===
                    "scheduled" &&
                  event.featured && (
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      {locale === "de" ? "Empfohlen" : "Tavsiya etiladi"}
                    </span>
                  )}
              </div>

              <div className="mt-5 flex items-start justify-between gap-3">
                <h1 className={`${interTight.className} min-w-0 max-w-4xl break-words text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.08]`}>
                {event.title}
              </h1>
                <div className="shrink-0">
                  <ShareButton
                    title={event.title}
                    locale={locale}
                    variant="guide"
                    iconOnly
                    ariaLabel={locale === "de" ? "Veranstaltung teilen" : "Tadbirni ulaşiş"}
                  />
                </div>
              </div>

              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[var(--text-secondary)] sm:text-lg">
                {event.excerpt}
              </p>

            </div>
          </header>

          <div className="mx-auto grid w-full max-w-[var(--uzde-layout-width)] gap-7 px-[clamp(16px,3.3vw,112px)] py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.52fr)] lg:gap-14 lg:py-10">
            <aside className="min-w-0 lg:col-start-2 lg:row-start-1">
              <div className="min-w-0">
                <dl className="divide-y divide-[var(--border)] border-y border-[var(--border)] text-sm [&>div]:grid [&>div]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] [&>div]:gap-x-3 [&>div]:py-3 [&_dd]:min-w-0 [&_dd]:break-words lg:[&>div]:block">
                  {event.eventStatus ===
                  "planning" ? (
                    <>
                      <div>
                        <dt className="font-semibold text-[var(--text-secondary)]">
                          {copy.date}
                        </dt>

                        <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
                          {
                            copy.planningDate
                          }
                        </dd>
                      </div>

                      <div>
                        <dt className="font-semibold text-[var(--text-secondary)]">
                          {
                            copy.location
                          }
                        </dt>

                        <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
                          {
                            copy.planningLocation
                          }
                        </dd>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <dt className="font-semibold text-[var(--text-secondary)]">
                          {copy.date}
                        </dt>

                        <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
                          {formatEventDateRange(
                            event.startDate,
                            locale,
                            event.endDate,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-semibold text-[var(--text-secondary)]">
                          {copy.time}
                        </dt>

                        <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
                          {formatEventTime(
                            locale,
                            event.startTime,
                            event.endTime,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-semibold text-[var(--text-secondary)]">
                          {
                            copy.location
                          }
                        </dt>

                        <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
                          {getEventLocation(
                            event,
                            locale,
                          )}
                        </dd>

                        {event.address && (
                          <dd className="col-start-2 mt-1 text-[var(--text-secondary)]">
                            {
                              event.address
                            }
                          </dd>
                        )}
                      </div>

                      <div>
                        <dt className="font-semibold text-[var(--text-secondary)]">
                          {copy.price}
                        </dt>

                        <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
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
                      <dt className="font-semibold text-[var(--text-secondary)]">
                        {
                          copy.languages
                        }
                      </dt>

                      <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
                        {event.language.join(
                          ", ",
                        )}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="font-semibold text-[var(--text-secondary)]">
                      {copy.organizer}
                    </dt>

                    <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
                      <OrganizerValue
                        event={event}
                        locale={locale}
                      />
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-[var(--text-secondary)]">
                      {
                        copy.registration
                      }
                    </dt>

                    <dd className="lg:mt-1">
                      {event.eventStatus ===
                      "planning" ? (
                        <p className="leading-6 text-[var(--text-secondary)]">
                          {
                            registrationLabel
                          }
                        </p>
                      ) : (
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getRegistrationStyles(
                            event.registrationStatusKey ===
                              "sold-out"
                              ? "sold-out"
                              : isRegistrationUnavailable(
                                    event,
                                  )
                                ? "closed"
                                : event.registrationStatusKey ===
                                      "open" &&
                                    !registrationAction
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
                      <dt className="font-semibold text-[var(--text-secondary)]">
                        {
                          copy.registrationDeadline
                        }
                      </dt>

                      <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
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
                      <dt className="font-semibold text-[var(--text-secondary)]">
                        {
                          copy.capacity
                        }
                      </dt>

                      <dd className="font-medium text-[var(--text-primary)] lg:mt-1">
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
                        {...(
                          registrationAction.external
                            ? {
                                target:
                                  "_blank",
                                rel:
                                  "noreferrer",
                              }
                            : {}
                        )}
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
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              {isPlanning && (
                <section className="mb-6 border-b border-[var(--border)] pb-5">


                  <p className="max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                    {
                      copy.planningIntro
                    }
                  </p>
                </section>
              )}

              <section>
                <h2 className={`${interTight.className} text-[22px] font-semibold sm:text-[28px]`}>
                  {copy.about}
                </h2>

                <div className="mt-4 max-w-3xl space-y-4 text-[15px] leading-7 text-[var(--text-secondary)] sm:text-base">
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
                <section className="mt-7 border-t border-[var(--border)] pt-5">
                  <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                    {copy.notes}
                  </h2>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
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
                <section className="mt-7 border-t border-[var(--border)] pt-5">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">
                    {
                      copy.sourceEyebrow
                    }
                  </p>

                  <h2 className="mt-3 text-xl font-bold">
                    {
                      event.officialSourceName
                    }
                  </h2>

                  <p className="mt-3 leading-7 text-[var(--text-secondary)]">
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

                    <p className="text-sm text-[var(--text-secondary)]">
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


          </div>
        </article>

        {relatedEvents.length >
          0 && (
          <section className="border-t border-[var(--border)] py-7 sm:py-10">
            <div className="mx-auto w-full max-w-[var(--uzde-layout-width)] px-[clamp(16px,3.3vw,112px)]">
              <p className="text-sm font-semibold text-[var(--text-secondary)]">
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
      <nav aria-label={locale === "de" ? "Veranstaltungsnavigation" : "Tadbirlar navigatsiyasi"} className="mx-auto w-full max-w-[var(--uzde-layout-width)] px-[clamp(16px,3.3vw,112px)] pb-7"><Link href="/events" className="inline-flex min-h-11 items-center border-t border-[var(--border)] text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4">← {copy.back}</Link></nav>
      </main>



      <Footer />
    </>
  );
}
