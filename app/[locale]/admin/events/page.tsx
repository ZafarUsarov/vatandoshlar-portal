import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminEvents,
  type AdminEventCategory,
  type AdminEventFormat,
  type AdminEventRegistrationStatus,
  type AdminEventStatus,
} from "@/lib/events/admin-events-repository";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title:
    "Events Admin | Vatandoshlar.de",
  robots: {
    index: false,
    follow: false,
  },
};

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · TADBIRLAR",
    title:
      "Tadbirlarni boshqarish",
    description:
      "Events PostgreSQL foundation tayyor. Hozir bu sahifa ma’lumotlar bazasidagi tadbir yozuvlarini read-only ko‘rinishda ko‘rsatadi.",
    foundationNote:
      "Public Tadbirlar bo‘limi hozircha static source bilan ishlaydi. Keyingi bosqichda create → draft workflow qo‘shiladi.",
    back:
      "Admin panelga qaytish",
    publicPage:
      "Public tadbirlar",
    total:
      "Jami",
    drafts:
      "Qoralama",
    published:
      "E’lon qilingan",
    archived:
      "Arxivlangan",
    featured:
      "Featured",
    upcoming:
      "Kelgusi",
    past:
      "O‘tgan",
    emptyTitle:
      "PostgreSQL’da tadbirlar hali mavjud emas",
    emptyDescription:
      "Bu kutilgan holat. Hozirgi static Events dataset ham bo‘sh. Keyingi bosqichda admin orqali yangi tadbir yaratish workflow’ini qo‘shamiz.",
    slug:
      "Slug",
    date:
      "Sana",
    location:
      "Joy",
    organizer:
      "Tashkilotchi",
    registration:
      "Ro‘yxatdan o‘tish",
    updated:
      "Yangilangan",

    categories: {
      culture:
        "Madaniyat",
      education:
        "Ta’lim",
      career:
        "Karyera",
      business:
        "Biznes",
      community:
        "Jamiyat",
      sport:
        "Sport",
      children:
        "Bolalar uchun",
      consular:
        "Konsullik",
    },

    formats: {
      offline:
        "Oflayn",
      online:
        "Onlayn",
      hybrid:
        "Gibrid",
    },

    registrationStatuses: {
      open:
        "Ro‘yxatdan o‘tish ochiq",
      not_required:
        "Ro‘yxatdan o‘tish shart emas",
      sold_out:
        "Joylar tugagan",
      closed:
        "Ro‘yxatdan o‘tish yopilgan",
    },

    statuses: {
      draft:
        "Qoralama",
      published:
        "E’lon qilingan",
      archived:
        "Arxivlangan",
    },
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · VERANSTALTUNGEN",
    title:
      "Veranstaltungen verwalten",
    description:
      "Die PostgreSQL-Grundlage für Events ist eingerichtet. Diese Seite zeigt derzeit die Veranstaltungsdatensätze aus der Datenbank schreibgeschützt an.",
    foundationNote:
      "Der öffentliche Veranstaltungsbereich verwendet vorerst weiterhin die statische Quelle. Im nächsten Schritt ergänzen wir den Create-→-Draft-Workflow.",
    back:
      "Zur Admin-Übersicht",
    publicPage:
      "Öffentliche Veranstaltungen",
    total:
      "Gesamt",
    drafts:
      "Entwürfe",
    published:
      "Veröffentlicht",
    archived:
      "Archiviert",
    featured:
      "Featured",
    upcoming:
      "Bevorstehend",
    past:
      "Vergangen",
    emptyTitle:
      "Noch keine Veranstaltungen in PostgreSQL",
    emptyDescription:
      "Das ist erwartbar. Auch der aktuelle statische Events-Datensatz ist leer. Im nächsten Schritt ergänzen wir die Erstellung neuer Veranstaltungen im Admin-Bereich.",
    slug:
      "Slug",
    date:
      "Datum",
    location:
      "Ort",
    organizer:
      "Veranstalter",
    registration:
      "Anmeldung",
    updated:
      "Aktualisiert",

    categories: {
      culture:
        "Kultur",
      education:
        "Bildung",
      career:
        "Karriere",
      business:
        "Business",
      community:
        "Community",
      sport:
        "Sport",
      children:
        "Für Kinder",
      consular:
        "Konsularisches",
    },

    formats: {
      offline:
        "Offline",
      online:
        "Online",
      hybrid:
        "Hybrid",
    },

    registrationStatuses: {
      open:
        "Anmeldung geöffnet",
      not_required:
        "Keine Anmeldung erforderlich",
      sold_out:
        "Ausgebucht",
      closed:
        "Anmeldung geschlossen",
    },

    statuses: {
      draft:
        "Entwurf",
      published:
        "Veröffentlicht",
      archived:
        "Archiviert",
    },
  },
} as const;

type AppLocale =
  | "uz"
  | "de";

function formatDate(
  value: string,
  locale: AppLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz"
      ? "uz-UZ"
      : "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(
    new Date(
      `${value}T12:00:00`,
    ),
  );
}

function formatDateTime(
  value: string,
  locale: AppLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz"
      ? "uz-UZ"
      : "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(
    new Date(value),
  );
}

function getStatusClasses(
  status: AdminEventStatus,
): string {
  if (
    status === "published"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (
    status === "archived"
  ) {
    return "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300";
}

function getLocationLabel(
  format: AdminEventFormat,
  city: string | null,
  bundesland: string | null,
): string {
  if (
    format === "online"
  ) {
    return "Online";
  }

  const values = [
    city,
    bundesland,
  ].filter(Boolean);

  return values.length > 0
    ? values.join(", ")
    : "—";
}

function isPastEvent(
  endDate: string | null,
  startDate: string,
): boolean {
  const finalDate =
    endDate ??
    startDate;

  const eventEnd =
    new Date(
      `${finalDate}T23:59:59`,
    );

  return (
    eventEnd.getTime() <
    Date.now()
  );
}

export default async function AdminEventsPage() {
  const locale =
    await getLocale();

  const appLocale: AppLocale =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(
    appLocale,
  );

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  const events =
    await getAdminEvents();

  const draftCount =
    events.filter(
      (event) =>
        event.status ===
        "draft",
    ).length;

  const publishedCount =
    events.filter(
      (event) =>
        event.status ===
        "published",
    ).length;

  const archivedCount =
    events.filter(
      (event) =>
        event.status ===
        "archived",
    ).length;

  const featuredCount =
    events.filter(
      (event) =>
        event.featured,
    ).length;

  const upcomingCount =
    events.filter(
      (event) =>
        !isPastEvent(
          event.endDate,
          event.startDate,
        ),
    ).length;

  const pastCount =
    events.length -
    upcomingCount;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>

              <p className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm leading-6 text-orange-800 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-200">
                {currentCopy.foundationNote}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.back}
              </Link>

              <Link
                href="/events"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-orange-600 px-4 text-sm font-bold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.publicPage}
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {[
            {
              label:
                currentCopy.total,
              value:
                events.length,
            },
            {
              label:
                currentCopy.drafts,
              value:
                draftCount,
            },
            {
              label:
                currentCopy.published,
              value:
                publishedCount,
            },
            {
              label:
                currentCopy.archived,
              value:
                archivedCount,
            },
            {
              label:
                currentCopy.upcoming,
              value:
                upcomingCount,
            },
            {
              label:
                currentCopy.past,
              value:
                pastCount,
            },
          ].map(
            (item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {item.value}
                </p>
              </div>
            ),
          )}
        </section>

        {featuredCount > 0 && (
          <p className="mt-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">
            {currentCopy.featured}:{" "}
            {featuredCount}
          </p>
        )}

        <section className="mt-6">
          {events.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                {currentCopy.emptyTitle}
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.emptyDescription}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {events.map(
                (event) => (
                  <article
                    key={event.id}
                    className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                          event.status,
                        )}`}
                      >
                        {
                          currentCopy.statuses[
                            event.status
                          ]
                        }
                      </span>

                      <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                        {
                          currentCopy.categories[
                            event.category as AdminEventCategory
                          ]
                        }
                      </span>

                      <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                        {
                          currentCopy.formats[
                            event.format
                          ]
                        }
                      </span>

                      {event.featured && (
                        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                          {currentCopy.featured}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                      {appLocale === "de"
                        ? event.titleDe
                        : event.titleUz}
                    </h2>

                    <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.date}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {formatDate(
                            event.startDate,
                            appLocale,
                          )}
                          {event.endDate &&
                          event.endDate !==
                            event.startDate
                            ? ` — ${formatDate(
                                event.endDate,
                                appLocale,
                              )}`
                            : ""}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.location}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {getLocationLabel(
                            event.format,
                            event.city,
                            event.bundesland,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.organizer}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {event.organizerName}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.registration}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {
                            currentCopy.registrationStatuses[
                              event.registrationStatus as AdminEventRegistrationStatus
                            ]
                          }
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.slug}
                        </dt>

                        <dd className="mt-1 break-all font-mono text-xs text-slate-700 dark:text-slate-300">
                          {event.slug}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.updated}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {formatDateTime(
                            event.updatedAt,
                            appLocale,
                          )}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
