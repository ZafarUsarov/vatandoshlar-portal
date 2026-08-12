import type {
  Metadata,
} from "next";
import type {
  ReactNode,
} from "react";
import {
  getLocale,
} from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminEvents,
  type AdminEventCategory,
  type AdminEventFormat,
  type AdminEventRegistrationStatus,
  type AdminEventStatus,
} from "@/lib/events/admin-events-repository";

import {
  updateEventFeaturedAction,
  updateEventStatusAction,
} from "./actions";

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
      "PostgreSQL’dagi tadbirlarni yarating, tahrirlang va lifecycle hamda featured holatini boshqaring.",
    lifecycleNote:
      "Featured faqat e’lon qilingan tadbirda yoqilishi mumkin. Tadbir qoralama yoki arxiv holatiga o‘tkazilganda featured avtomatik o‘chadi.",
    publicStatic:
      "Public Tadbirlar bo‘limi hozircha static source bilan ishlaydi. Admin’dagi o‘zgarishlar hali public sahifaga ta’sir qilmaydi.",
    back:
      "Admin panelga qaytish",
    publicPage:
      "Public tadbirlar",
    create:
      "Yangi tadbir yaratish",
    edit:
      "Tahrirlash",
    publish:
      "E’lon qilish",
    unpublish:
      "Qoralamaga qaytarish",
    archive:
      "Arxivlash",
    restore:
      "Qoralamaga tiklash",
    featuredOn:
      "Featured qilish",
    featuredOff:
      "Featured’dan olish",
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
      "Yangi tadbir yaratib, uni qoralama sifatida PostgreSQL’ga saqlashingiz mumkin.",
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
      "Erstellen und bearbeiten Sie Veranstaltungen in PostgreSQL und verwalten Sie Lifecycle sowie Featured-Status.",
    lifecycleNote:
      "Featured kann nur bei veröffentlichten Veranstaltungen aktiviert werden. Beim Zurücksetzen auf Entwurf oder beim Archivieren wird Featured automatisch entfernt.",
    publicStatic:
      "Der öffentliche Veranstaltungsbereich verwendet vorerst weiterhin die statische Quelle. Admin-Änderungen wirken sich noch nicht auf die öffentliche Seite aus.",
    back:
      "Zur Admin-Übersicht",
    publicPage:
      "Öffentliche Veranstaltungen",
    create:
      "Neue Veranstaltung erstellen",
    edit:
      "Bearbeiten",
    publish:
      "Veröffentlichen",
    unpublish:
      "Als Entwurf setzen",
    archive:
      "Archivieren",
    restore:
      "Als Entwurf wiederherstellen",
    featuredOn:
      "Als Featured setzen",
    featuredOff:
      "Featured entfernen",
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
      "Erstellen Sie eine neue Veranstaltung und speichern Sie sie als Entwurf in PostgreSQL.",
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

  const values =
    [
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

  return (
    new Date(
      `${finalDate}T23:59:59`,
    ).getTime() <
    Date.now()
  );
}

function StatusButton({
  eventId,
  targetStatus,
  children,
  tone = "neutral",
}: {
  eventId: string;
  targetStatus: AdminEventStatus;
  children: ReactNode;
  tone?:
    | "neutral"
    | "primary"
    | "danger";
}) {
  const className =
    tone === "primary"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15"
      : tone === "danger"
        ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/15"
        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <form
      action={
        updateEventStatusAction
      }
    >
      <input
        type="hidden"
        name="eventId"
        value={eventId}
      />

      <input
        type="hidden"
        name="targetStatus"
        value={targetStatus}
      />

      <button
        type="submit"
        className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${className}`}
      >
        {children}
      </button>
    </form>
  );
}

function FeaturedButton({
  eventId,
  enabled,
  children,
}: {
  eventId: string;
  enabled: boolean;
  children: ReactNode;
}) {
  return (
    <form
      action={
        updateEventFeaturedAction
      }
    >
      <input
        type="hidden"
        name="eventId"
        value={eventId}
      />

      <input
        type="hidden"
        name="enabled"
        value={
          enabled
            ? "false"
            : "true"
        }
      />

      <button
        type="submit"
        className={
          enabled
            ? "inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
            : "inline-flex min-h-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/15 dark:focus-visible:ring-offset-slate-900"
        }
      >
        {children}
      </button>
    </form>
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
        event.status === "draft",
    ).length;

  const publishedCount =
    events.filter(
      (event) =>
        event.status === "published",
    ).length;

  const archivedCount =
    events.filter(
      (event) =>
        event.status === "archived",
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
                {currentCopy.lifecycleNote}
              </p>

              <p className="mt-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                {currentCopy.publicStatic}
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
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-4 text-sm font-bold text-orange-700 transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300 dark:hover:bg-orange-500/15 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.publicPage}
              </Link>

              <Link
                href="/admin/events/new"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-orange-600 px-4 text-sm font-bold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
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
                key={
                  item.label
                }
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {
                    item.label
                  }
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {
                    item.value
                  }
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

              <Link
                href="/admin/events/new"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
              </Link>
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

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-orange-200 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-orange-500/30 dark:hover:text-orange-300 dark:focus-visible:ring-offset-slate-900"
                      >
                        {currentCopy.edit}
                      </Link>

                      {event.status === "draft" && (
                        <>
                          <StatusButton
                            eventId={event.id}
                            targetStatus="published"
                            tone="primary"
                          >
                            {currentCopy.publish}
                          </StatusButton>

                          <StatusButton
                            eventId={event.id}
                            targetStatus="archived"
                            tone="danger"
                          >
                            {currentCopy.archive}
                          </StatusButton>
                        </>
                      )}

                      {event.status === "published" && (
                        <>
                          <FeaturedButton
                            eventId={event.id}
                            enabled={event.featured}
                          >
                            {event.featured
                              ? currentCopy.featuredOff
                              : currentCopy.featuredOn}
                          </FeaturedButton>

                          <StatusButton
                            eventId={event.id}
                            targetStatus="draft"
                          >
                            {currentCopy.unpublish}
                          </StatusButton>

                          <StatusButton
                            eventId={event.id}
                            targetStatus="archived"
                            tone="danger"
                          >
                            {currentCopy.archive}
                          </StatusButton>
                        </>
                      )}

                      {event.status === "archived" && (
                        <StatusButton
                          eventId={event.id}
                          targetStatus="draft"
                        >
                          {currentCopy.restore}
                        </StatusButton>
                      )}
                    </div>

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
