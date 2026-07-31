import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import EventCard from "../../../components/cards/EventCard";
import Header from "../../../components/Header";
import {
  events,
  formatEventDate,
  formatEventDateRange,
  formatEventTime,
  getEventBySlug,
  getRelatedEvents,
} from "../../../data/events";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Tadbir topilmadi | Vatandoshlar.de",
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
  status:
    | "Ro‘yxatdan o‘tish ochiq"
    | "Ro‘yxatdan o‘tish shart emas"
    | "Joylar tugagan"
    | "Ro‘yxatdan o‘tish yopilgan",
) {
  switch (status) {
    case "Ro‘yxatdan o‘tish ochiq":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";

    case "Ro‘yxatdan o‘tish shart emas":
      return "border-blue-200 bg-blue-50 text-blue-800";

    case "Joylar tugagan":
      return "border-amber-200 bg-amber-50 text-amber-800";

    case "Ro‘yxatdan o‘tish yopilgan":
      return "border-slate-200 bg-slate-100 text-slate-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = getRelatedEvents(event);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950">
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
                ← Barcha tadbirlar
              </Link>

              <div className="mt-9 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  {event.category}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  {event.format}
                </span>

                <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-200">
                  Rasmiy manbasi tekshirilgan
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
                    Sana
                  </p>

                  <p className="mt-2 font-semibold">
                    {formatEventDateRange(
                      event.startDate,
                      event.endDate,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">
                    Vaqt
                  </p>

                  <p className="mt-2 font-semibold">
                    {formatEventTime(
                      event.startTime,
                      event.endTime,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">
                    Shahar
                  </p>

                  <p className="mt-2 font-semibold">
                    {event.format === "Onlayn"
                      ? "Onlayn"
                      : event.city ?? "Ko‘rsatilmagan"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">
                    Narx
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
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                  Tadbir haqida
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Batafsil ma’lumot
                </h2>

                <div className="mt-7 space-y-6 text-lg leading-8 text-slate-700">
                  {event.description.map((paragraph) => (
                    <p key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section className="mt-14">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                  Tashkilotchi
                </p>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-7">
                  <h2 className="text-2xl font-bold">
                    {event.organizerName}
                  </h2>

                  {event.organizerUrl && (
                    <a
                      href={event.organizerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Tashkilotchi sahifasi ↗
                    </a>
                  )}
                </div>
              </section>

              <section className="mt-14">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                  Til va qatnashish
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 p-7">
                    <p className="text-sm font-semibold text-slate-500">
                      Tadbir tillari
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {event.language.map((language) => (
                        <span
                          key={language}
                          className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 p-7">
                    <p className="text-sm font-semibold text-slate-500">
                      Qatnashish narxi
                    </p>

                    <p className="mt-4 text-2xl font-bold">
                      {event.priceLabel}
                    </p>
                  </div>
                </div>
              </section>

              {event.importantNotes.length > 0 && (
                <aside className="mt-14 rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-8">
                  <h2 className="text-2xl font-bold text-amber-950">
                    Muhim eslatmalar
                  </h2>

                  <ul className="mt-5 space-y-3">
                    {event.importantNotes.map((note) => (
                      <li
                        key={note}
                        className="flex gap-3 leading-7 text-amber-900"
                      >
                        <span aria-hidden="true">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              <section className="mt-14 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  Rasmiy manba
                </p>

                <h2 className="mt-3 text-2xl font-bold text-emerald-950">
                  {event.officialSourceName}
                </h2>

                <p className="mt-4 leading-7 text-emerald-900">
                  Tadbir tafsilotlari rasmiy manba orqali
                  tekshirilgan. Tashkilotchi o‘zgarish
                  kiritishi mumkinligi sababli, qatnashishdan
                  oldin rasmiy sahifani qayta tekshiring.
                </p>

                <a
                  href={event.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                >
                  Rasmiy manbani ochish ↗
                </a>

                <p className="mt-5 text-sm text-emerald-800">
                  Oxirgi tekshiruv:{" "}
                  <time dateTime={event.verifiedAt}>
                    {formatEventDate(event.verifiedAt)}
                  </time>
                </p>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg">
                <h2 className="text-xl font-bold">
                  Tadbir ma’lumotlari
                </h2>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-sm font-semibold text-slate-500">
                      Sana
                    </dt>

                    <dd className="mt-1 leading-7 text-slate-800">
                      {formatEventDateRange(
                        event.startDate,
                        event.endDate,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-semibold text-slate-500">
                      Vaqt
                    </dt>

                    <dd className="mt-1 leading-7 text-slate-800">
                      {formatEventTime(
                        event.startTime,
                        event.endTime,
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-semibold text-slate-500">
                      Vaqt mintaqasi
                    </dt>

                    <dd className="mt-1 leading-7 text-slate-800">
                      {event.timezone}
                    </dd>
                  </div>

                  {event.venueName && (
                    <div>
                      <dt className="text-sm font-semibold text-slate-500">
                        Joy
                      </dt>

                      <dd className="mt-1 leading-7 text-slate-800">
                        {event.venueName}
                      </dd>
                    </div>
                  )}

                  {event.address && (
                    <div>
                      <dt className="text-sm font-semibold text-slate-500">
                        Manzil
                      </dt>

                      <dd className="mt-1 leading-7 text-slate-800">
                        {event.address}
                      </dd>
                    </div>
                  )}

                  {event.onlineUrl && (
                    <div>
                      <dt className="text-sm font-semibold text-slate-500">
                        Onlayn havola
                      </dt>

                      <dd className="mt-2">
                        <a
                          href={event.onlineUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 transition hover:text-blue-700"
                        >
                          Onlayn sahifani ochish ↗
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <div
                  className={`mt-7 rounded-2xl border p-5 ${getRegistrationStyles(
                    event.registrationStatus,
                  )}`}
                >
                  <p className="text-sm font-semibold">
                    Ro‘yxatdan o‘tish
                  </p>

                  <p className="mt-2 font-bold">
                    {event.registrationStatus}
                  </p>

                  {event.registrationDeadline && (
                    <p className="mt-2 text-sm">
                      Oxirgi sana:{" "}
                      {formatEventDate(
                        event.registrationDeadline,
                      )}
                    </p>
                  )}
                </div>

                {event.registrationUrl &&
                  event.registrationStatus ===
                    "Ro‘yxatdan o‘tish ochiq" && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full justify-center rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                    >
                      Ro‘yxatdan o‘tish ↗
                    </a>
                  )}
              </div>
            </aside>
          </div>
        </article>

        {relatedEvents.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Boshqa tadbirlar
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Sizga qiziq bo‘lishi mumkin
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedEvents.map((relatedEvent) => (
                  <EventCard
                    key={relatedEvent.id}
                    event={relatedEvent}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Vatandoshlar.de</p>

          <p>
            Germaniyadagi o‘zbekistonliklar uchun raqamli
            platforma
          </p>
        </div>
      </footer>
    </>
  );
}