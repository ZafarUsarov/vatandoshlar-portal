import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import EventCard from "../../../components/cards/EventCard";
import Header from "../../../components/Header";
import {
  formatEventDate,
  formatEventDateRange,
  formatEventTime,
  getEventBySlug,
  getRelatedEvents,
  localizedEvents,
  type RegistrationStatusKey,
  type SupportedEventLocale,
} from "../../../data/events";
import { Link } from "../../../i18n/navigation";

type EventPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export function generateStaticParams() {
  return localizedEvents.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedEventLocale;
  const { slug } = await params;
  const event = getEventBySlug(slug, locale);

  if (!event) {
    return {
      title:
        locale === "uz"
          ? "Tadbir topilmadi | Vatandoshlar.de"
          : "Veranstaltung nicht gefunden | Vatandoshlar.de",
    };
  }

  return {
    title: `${event.title} | Vatandoshlar.de`,
    description: event.excerpt,
    alternates: {
      canonical: `/events/${event.slug}`,
    },
  };
}

function getRegistrationStyles(
  status: RegistrationStatusKey,
): string {
  switch (status) {
    case "open":
      return "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200";
    case "not-required":
      return "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-200";
    case "sold-out":
      return "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200";
    case "closed":
    default:
      return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const locale =
    (await getLocale()) as SupportedEventLocale;
  const { slug } = await params;
  const event = getEventBySlug(slug, locale);

  if (!event) {
    notFound();
  }

  const relatedEvents = getRelatedEvents(
    event,
    locale,
  );

  const copy =
    locale === "uz"
      ? {
          back: "Barcha tadbirlar",
          verified:
            "Rasmiy manbasi tekshirilgan",
          date: "Sana",
          time: "Vaqt",
          city: "Shahar",
          price: "Narx",
          online: "Onlayn",
          notSpecified: "Ko‘rsatilmagan",
          aboutEyebrow: "Tadbir haqida",
          aboutTitle: "Batafsil ma’lumot",
          organizer: "Tashkilotchi",
          organizerPage:
            "Tashkilotchi sahifasi",
          participationEyebrow:
            "Til va qatnashish",
          eventLanguages: "Tadbir tillari",
          participationPrice:
            "Qatnashish narxi",
          importantNotes:
            "Muhim eslatmalar",
          sourceEyebrow: "Rasmiy manba",
          sourceDescription:
            "Tadbir tafsilotlari rasmiy manba orqali tekshirilgan. Tashkilotchi o‘zgarish kiritishi mumkinligi sababli, qatnashishdan oldin rasmiy sahifani qayta tekshiring.",
          openSource:
            "Rasmiy manbani ochish",
          lastVerified: "Oxirgi tekshiruv",
          eventInfo: "Tadbir ma’lumotlari",
          timezone: "Vaqt mintaqasi",
          venue: "Joy",
          address: "Manzil",
          onlineLink: "Onlayn havola",
          openOnline:
            "Onlayn sahifani ochish",
          registration: "Ro‘yxatdan o‘tish",
          deadline: "Oxirgi sana",
          register: "Ro‘yxatdan o‘tish",
          relatedEyebrow:
            "Boshqa tadbirlar",
          relatedTitle:
            "Sizga qiziq bo‘lishi mumkin",
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
          back: "Alle Veranstaltungen",
          verified:
            "Offizielle Quelle geprüft",
          date: "Datum",
          time: "Uhrzeit",
          city: "Stadt",
          price: "Preis",
          online: "Online",
          notSpecified: "Nicht angegeben",
          aboutEyebrow:
            "Über die Veranstaltung",
          aboutTitle:
            "Ausführliche Informationen",
          organizer: "Veranstalter",
          organizerPage:
            "Seite des Veranstalters",
          participationEyebrow:
            "Sprachen und Teilnahme",
          eventLanguages:
            "Veranstaltungssprachen",
          participationPrice:
            "Teilnahmepreis",
          importantNotes:
            "Wichtige Hinweise",
          sourceEyebrow:
            "Offizielle Quelle",
          sourceDescription:
            "Die Veranstaltungsdetails wurden anhand der offiziellen Quelle geprüft. Da der Veranstalter Änderungen vornehmen kann, prüfen Sie die offizielle Seite bitte erneut, bevor Sie teilnehmen.",
          openSource:
            "Offizielle Quelle öffnen",
          lastVerified: "Zuletzt geprüft",
          eventInfo:
            "Veranstaltungsinformationen",
          timezone: "Zeitzone",
          venue: "Veranstaltungsort",
          address: "Adresse",
          onlineLink: "Online-Link",
          openOnline:
            "Online-Seite öffnen",
          registration: "Anmeldung",
          deadline: "Anmeldeschluss",
          register: "Jetzt anmelden",
          relatedEyebrow:
            "Weitere Veranstaltungen",
          relatedTitle:
            "Das könnte Sie ebenfalls interessieren",
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

      <main className="min-h-screen bg-white pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <article>
          <header className="relative overflow-hidden bg-slate-950 text-white">
            <div
              className="absolute inset-0 opacity-20"
              aria-hidden="true"
            >
              <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
              <div className="absolute -bottom-48 left-20 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-8">
              <Link
                href="/events"
                className="text-sm font-semibold text-blue-300 transition hover:text-blue-200"
              >
                ← {copy.back}
              </Link>

              <div className="mt-9 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  {event.category}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  {event.format}
                </span>

                <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-200">
                  {copy.verified}
                </span>
              </div>

              <h1 className="mt-8 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl sm:leading-tight">
                {event.title}
              </h1>

              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
                {event.excerpt}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">
                    {copy.date}
                  </p>
                  <p className="mt-2 font-semibold">
                    {formatEventDateRange(
                      event.startDate,
                      locale,
                      event.endDate,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">
                    {copy.time}
                  </p>
                  <p className="mt-2 font-semibold">
                    {formatEventTime(
                      locale,
                      event.startTime,
                      event.endTime,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">
                    {copy.city}
                  </p>
                  <p className="mt-2 font-semibold">
                    {event.formatKey === "online"
                      ? copy.online
                      : event.city ??
                        copy.notSpecified}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">
                    {copy.price}
                  </p>
                  <p className="mt-2 font-semibold">
                    {event.priceLabel}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
            <div>
              <section>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                  {copy.aboutEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {copy.aboutTitle}
                </h2>

                <div className="mt-7 space-y-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                  {event.description.map(
                    (paragraph) => (
                      <p key={paragraph}>
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </section>

              <section className="mt-14">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                  {copy.organizer}
                </p>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-2xl font-bold">
                    {event.organizerName}
                  </h2>

                  {event.organizerUrl && (
                    <a
                      href={event.organizerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {copy.organizerPage} ↗
                    </a>
                  )}
                </div>
              </section>

              <section className="mt-14">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                  {copy.participationEyebrow}
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 p-7 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {copy.eventLanguages}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {event.language.map(
                        (language) => (
                          <span
                            key={language}
                            className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                          >
                            {language}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 p-7 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {copy.participationPrice}
                    </p>
                    <p className="mt-4 text-2xl font-bold">
                      {event.priceLabel}
                    </p>
                  </div>
                </div>
              </section>

              {event.importantNotes.length > 0 && (
                <aside className="mt-14 rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-8 dark:border-amber-500/20 dark:bg-amber-500/10">
                  <h2 className="text-2xl font-bold text-amber-950 dark:text-amber-100">
                    {copy.importantNotes}
                  </h2>

                  <ul className="mt-5 space-y-3">
                    {event.importantNotes.map(
                      (note) => (
                        <li
                          key={note}
                          className="flex gap-3 leading-7 text-amber-900 dark:text-amber-200"
                        >
                          <span aria-hidden="true">
                            •
                          </span>
                          <span>{note}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </aside>
              )}

              <section className="mt-14 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-8 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  {copy.sourceEyebrow}
                </p>

                <h2 className="mt-3 text-2xl font-bold text-emerald-950 dark:text-emerald-100">
                  {event.officialSourceName}
                </h2>

                <p className="mt-4 leading-7 text-emerald-900 dark:text-emerald-200">
                  {copy.sourceDescription}
                </p>

                <a
                  href={event.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                >
                  {copy.openSource} ↗
                </a>

                <p className="mt-5 text-sm text-emerald-800 dark:text-emerald-300">
                  {copy.lastVerified}:{" "}
                  <time dateTime={event.verifiedAt}>
                    {formatEventDate(
                      event.verifiedAt,
                      locale,
                    )}
                  </time>
                </p>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-bold">
                  {copy.eventInfo}
                </h2>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {copy.date}
                    </dt>
                    <dd className="mt-1 leading-7 text-slate-800 dark:text-slate-200">
                      {formatEventDateRange(
                        event.startDate,
                        locale,
                        event.endDate,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {copy.time}
                    </dt>
                    <dd className="mt-1 leading-7 text-slate-800 dark:text-slate-200">
                      {formatEventTime(
                        locale,
                        event.startTime,
                        event.endTime,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {copy.timezone}
                    </dt>
                    <dd className="mt-1 leading-7 text-slate-800 dark:text-slate-200">
                      {event.timezone}
                    </dd>
                  </div>

                  {event.venueName && (
                    <div>
                      <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {copy.venue}
                      </dt>
                      <dd className="mt-1 leading-7 text-slate-800 dark:text-slate-200">
                        {event.venueName}
                      </dd>
                    </div>
                  )}

                  {event.address && (
                    <div>
                      <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {copy.address}
                      </dt>
                      <dd className="mt-1 leading-7 text-slate-800 dark:text-slate-200">
                        {event.address}
                      </dd>
                    </div>
                  )}

                  {event.onlineUrl && (
                    <div>
                      <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {copy.onlineLink}
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={event.onlineUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {copy.openOnline} ↗
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <div
                  className={`mt-7 rounded-2xl border p-5 ${getRegistrationStyles(
                    event.registrationStatusKey,
                  )}`}
                >
                  <p className="text-sm font-semibold">
                    {copy.registration}
                  </p>
                  <p className="mt-2 font-bold">
                    {event.registrationStatus}
                  </p>

                  {event.registrationDeadline && (
                    <p className="mt-2 text-sm">
                      {copy.deadline}:{" "}
                      {formatEventDate(
                        event.registrationDeadline,
                        locale,
                      )}
                    </p>
                  )}
                </div>

                {event.registrationUrl &&
                  event.registrationStatusKey ===
                    "open" && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full justify-center rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                    >
                      {copy.register} ↗
                    </a>
                  )}
              </div>
            </aside>
          </div>
        </article>

        {relatedEvents.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {copy.relatedEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                {copy.relatedTitle}
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedEvents.map(
                  (relatedEvent, index) => (
                    <EventCard
                      key={relatedEvent.id}
                      event={relatedEvent}
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
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">
          <p>© 2026 Vatandoshlar.de</p>
          <p>{copy.footer}</p>
        </div>
      </footer>
    </>
  );
}
