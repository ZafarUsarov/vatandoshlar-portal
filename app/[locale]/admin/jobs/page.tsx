import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminJobGuides,
  type AdminJobStatus,
} from "@/lib/jobs/admin-jobs-repository";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    await getLocale();

  return {
    title:
      locale === "de"
        ? "Jobleitfäden verwalten"
        : "Ish qo‘llanmalarini boshqarish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · ISH",
    title:
      "Ish qo‘llanmalarini boshqarish",
    description:
      "PostgreSQL’dagi Jobs qo‘llanmalarini boshqaring. Hozirgi bosqichda yangi qo‘llanma yaratish va qoralama sifatida saqlash ishlaydi.",
    back:
      "Boshqaruv paneliga qaytish",
    create:
      "Yangi qo‘llanma yaratish",
    total: "Jami",
    emptyTitle:
      "Hozircha admin Jobs qo‘llanmalari yo‘q",
    emptyDescription:
      "Yangi qo‘llanma yaratib, uni qoralama sifatida PostgreSQL’ga saqlashingiz mumkin.",
    slug: "Slug",
    verified: "Tekshirildi",
    updated: "Yangilandi",
    featured: "Featured",
    publicStatic:
      "Public Ish bo‘limi hozircha static data’dan foydalanadi. Admin’dagi yangi draft public sahifaga chiqmaydi.",
    statuses: {
      draft: "Qoralama",
      published: "E’lon qilingan",
      archived: "Arxivlangan",
    },
    categories: {
      students: "Talabalar",
      english: "Ingliz tilida",
      minijob: "Minijob",
      internship: "Amaliyot",
      professionals: "Malakali mutaxassislar",
      safety: "Xavfsiz ish qidirish",
    },
  },
  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · ARBEIT",
    title:
      "Jobleitfäden verwalten",
    description:
      "Verwalten Sie Jobleitfäden in PostgreSQL. In diesem Schritt können neue Leitfäden erstellt und als Entwurf gespeichert werden.",
    back:
      "Zurück zum Verwaltungsbereich",
    create:
      "Neuen Leitfaden erstellen",
    total: "Gesamt",
    emptyTitle:
      "Noch keine Jobleitfäden in der Admin-Datenbank",
    emptyDescription:
      "Erstellen Sie einen neuen Leitfaden und speichern Sie ihn als Entwurf in PostgreSQL.",
    slug: "Slug",
    verified: "Geprüft",
    updated: "Aktualisiert",
    featured: "Featured",
    publicStatic:
      "Der öffentliche Bereich Arbeit verwendet vorerst weiterhin statische Daten. Neue Admin-Entwürfe erscheinen dort nicht.",
    statuses: {
      draft: "Entwurf",
      published: "Veröffentlicht",
      archived: "Archiviert",
    },
    categories: {
      students: "Studierende",
      english: "Englischsprachige Stellen",
      minijob: "Minijob",
      internship: "Praktikum",
      professionals: "Fachkräfte",
      safety: "Sichere Jobsuche",
    },
  },
} as const;

function formatDate(
  value: string,
  locale: "uz" | "de",
): string {
  return new Intl.DateTimeFormat(
    locale === "de"
      ? "de-DE"
      : "uz-UZ",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(new Date(value));
}

function getStatusClassName(
  status: AdminJobStatus,
): string {
  if (status === "published") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (status === "archived") {
    return "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300";
}

export default async function AdminJobsPage() {
  const locale =
    await getLocale();

  const appLocale: "uz" | "de" =
    locale === "de"
      ? "de"
      : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  await requireAdmin(appLocale);

  const guides =
    await getAdminJobGuides();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin"
            className="inline-flex text-sm font-bold text-emerald-700 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>

              <p className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                {currentCopy.publicStatic}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {currentCopy.total}
                </p>

                <p className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                  {guides.length}
                </p>
              </div>

              <Link
                href="/admin/jobs/new"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
              </Link>
            </div>
          </div>
        </header>

        <section
          aria-label={currentCopy.title}
          className="mt-6"
        >
          {guides.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
              <div
                aria-hidden="true"
                className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
              >
                J
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
                {currentCopy.emptyTitle}
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.emptyDescription}
              </p>

              <Link
                href="/admin/jobs/new"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {guides.map((guide) => (
                <article
                  key={guide.id}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClassName(
                            guide.status,
                          )}`}
                        >
                          {currentCopy.statuses[guide.status]}
                        </span>

                        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                          {currentCopy.categories[guide.category]}
                        </span>

                        {guide.featured && (
                          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                            {currentCopy.featured}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                        {appLocale === "de"
                          ? guide.titleDe
                          : guide.titleUz}
                      </h2>

                      <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                        {appLocale === "de"
                          ? guide.shortTitleDe
                          : guide.shortTitleUz}
                      </p>

                      <p className="mt-3 break-all text-sm font-medium text-slate-500 dark:text-slate-400">
                        {currentCopy.slug}:{" "}
                        <span className="text-slate-700 dark:text-slate-300">
                          {guide.slug}
                        </span>
                      </p>
                    </div>

                    <dl className="grid shrink-0 gap-4 text-sm sm:grid-cols-2 lg:min-w-[22rem]">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          {currentCopy.verified}
                        </dt>

                        <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                          {formatDate(
                            guide.verifiedAt,
                            appLocale,
                          )}
                        </dd>
                      </div>

                      <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          {currentCopy.updated}
                        </dt>

                        <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                          {formatDate(
                            guide.updatedAt,
                            appLocale,
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
