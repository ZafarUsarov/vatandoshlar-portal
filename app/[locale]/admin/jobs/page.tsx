import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminJobGuides,
  type AdminJobStatus,
} from "@/lib/jobs/admin-jobs-repository";

import {
  updateJobFeaturedAction,
  updateJobStatusAction,
} from "./actions";

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
      "PostgreSQL’dagi Jobs qo‘llanmalarini yarating, tahrirlang, e’lon holatini va featured qo‘llanmani boshqaring.",
    lifecycleNote:
      "Bir vaqtning o‘zida faqat bitta e’lon qilingan qo‘llanma featured bo‘lishi mumkin. Draft yoki archived holatiga qaytarilsa featured avtomatik o‘chadi.",
    publicStatic:
      "Public Ish bo‘limi hozircha static data’dan foydalanadi. Admin status va featured o‘zgarishlari hali public sahifaga ta’sir qilmaydi.",
    back:
      "Boshqaruv paneliga qaytish",
    create:
      "Yangi qo‘llanma yaratish",
    edit: "Tahrirlash",
    publish: "E’lon qilish",
    unpublish:
      "Qoralamaga qaytarish",
    archive: "Arxivlash",
    restore:
      "Qoralamaga tiklash",
    makeFeatured:
      "Featured qilish",
    removeFeatured:
      "Featured’dan olish",
    total: "Jami",
    emptyTitle:
      "Hozircha admin Jobs qo‘llanmalari yo‘q",
    emptyDescription:
      "Yangi qo‘llanma yaratib, uni qoralama sifatida PostgreSQL’ga saqlashingiz mumkin.",
    slug: "Slug",
    verified: "Tekshirildi",
    updated: "Yangilandi",
    featured: "Featured",
    statuses: {
      draft: "Qoralama",
      published:
        "E’lon qilingan",
      archived:
        "Arxivlangan",
    },
    categories: {
      students:
        "Talabalar",
      english:
        "Ingliz tilida",
      minijob:
        "Minijob",
      internship:
        "Amaliyot",
      professionals:
        "Malakali mutaxassislar",
      safety:
        "Xavfsiz ish qidirish",
    },
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · ARBEIT",
    title:
      "Jobleitfäden verwalten",
    description:
      "Erstellen und bearbeiten Sie Jobleitfäden in PostgreSQL und verwalten Sie Veröffentlichungsstatus sowie den Featured-Leitfaden.",
    lifecycleNote:
      "Es kann immer nur einen veröffentlichten Featured-Leitfaden geben. Beim Zurücksetzen auf Entwurf oder beim Archivieren wird Featured automatisch entfernt.",
    publicStatic:
      "Der öffentliche Bereich Arbeit verwendet vorerst weiterhin statische Daten. Admin-Status und Featured wirken sich noch nicht auf die öffentliche Seite aus.",
    back:
      "Zurück zum Verwaltungsbereich",
    create:
      "Neuen Leitfaden erstellen",
    edit: "Bearbeiten",
    publish:
      "Veröffentlichen",
    unpublish:
      "Als Entwurf setzen",
    archive:
      "Archivieren",
    restore:
      "Als Entwurf wiederherstellen",
    makeFeatured:
      "Als Featured setzen",
    removeFeatured:
      "Featured entfernen",
    total: "Gesamt",
    emptyTitle:
      "Noch keine Jobleitfäden in der Admin-Datenbank",
    emptyDescription:
      "Erstellen Sie einen neuen Leitfaden und speichern Sie ihn als Entwurf in PostgreSQL.",
    slug: "Slug",
    verified: "Geprüft",
    updated:
      "Aktualisiert",
    featured: "Featured",
    statuses: {
      draft: "Entwurf",
      published:
        "Veröffentlicht",
      archived:
        "Archiviert",
    },
    categories: {
      students:
        "Studierende",
      english:
        "Englischsprachige Stellen",
      minijob:
        "Minijob",
      internship:
        "Praktikum",
      professionals:
        "Fachkräfte",
      safety:
        "Sichere Jobsuche",
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
  ).format(
    new Date(value),
  );
}

function getStatusClassName(
  status: AdminJobStatus,
): string {
  if (
    status === "published"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (
    status === "archived"
  ) {
    return "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300";
}

function StatusButton({
  guideId,
  targetStatus,
  children,
  tone = "neutral",
}: {
  guideId: string;
  targetStatus:
    AdminJobStatus;
  children:
    React.ReactNode;
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
        updateJobStatusAction
      }
    >
      <input
        type="hidden"
        name="guideId"
        value={guideId}
      />

      <input
        type="hidden"
        name="targetStatus"
        value={targetStatus}
      />

      <button
        type="submit"
        className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${className}`}
      >
        {children}
      </button>
    </form>
  );
}

function FeaturedButton({
  guideId,
  featured,
  children,
}: {
  guideId: string;
  featured: boolean;
  children:
    React.ReactNode;
}) {
  return (
    <form
      action={
        updateJobFeaturedAction
      }
    >
      <input
        type="hidden"
        name="guideId"
        value={guideId}
      />

      <input
        type="hidden"
        name="featured"
        value={
          featured
            ? "false"
            : "true"
        }
      />

      <button
        type="submit"
        className={
          featured
            ? "inline-flex min-h-10 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700 transition hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/15 dark:focus-visible:ring-offset-slate-900"
            : "inline-flex min-h-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/15 dark:focus-visible:ring-offset-slate-900"
        }
      >
        {children}
      </button>
    </form>
  );
}

export default async function AdminJobsPage() {
  const locale =
    await getLocale();

  const appLocale:
    | "uz"
    | "de" =
    locale === "de"
      ? "de"
      : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  await requireAdmin(
    appLocale,
  );

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
                {
                  currentCopy.eyebrow
                }
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {
                  currentCopy.title
                }
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {
                  currentCopy.description
                }
              </p>

              <p className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm leading-6 text-violet-800 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200">
                {
                  currentCopy.lifecycleNote
                }
              </p>

              <p className="mt-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                {
                  currentCopy.publicStatic
                }
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {
                    currentCopy.total
                  }
                </p>

                <p className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                  {
                    guides.length
                  }
                </p>
              </div>

              <Link
                href="/admin/jobs/new"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {
                  currentCopy.create
                }
              </Link>
            </div>
          </div>
        </header>

        <section
          aria-label={
            currentCopy.title
          }
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
                {
                  currentCopy.emptyTitle
                }
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {
                  currentCopy.emptyDescription
                }
              </p>

              <Link
                href="/admin/jobs/new"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {
                  currentCopy.create
                }
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {guides.map(
                (guide) => (
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
                            {
                              currentCopy.statuses[
                                guide.status
                              ]
                            }
                          </span>

                          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                            {
                              currentCopy.categories[
                                guide.category
                              ]
                            }
                          </span>

                          {guide.featured && (
                            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                              {
                                currentCopy.featured
                              }
                            </span>
                          )}
                        </div>

                        <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                          {appLocale ===
                          "de"
                            ? guide.titleDe
                            : guide.titleUz}
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {appLocale ===
                          "de"
                            ? guide.shortTitleDe
                            : guide.shortTitleUz}
                        </p>

                        <p className="mt-3 break-all text-sm font-medium text-slate-500 dark:text-slate-400">
                          {
                            currentCopy.slug
                          }
                          :{" "}
                          <span className="text-slate-700 dark:text-slate-300">
                            {
                              guide.slug
                            }
                          </span>
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            href={`/admin/jobs/${guide.id}/edit`}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/30 dark:hover:text-blue-300 dark:focus-visible:ring-offset-slate-900"
                          >
                            {
                              currentCopy.edit
                            }
                          </Link>

                          {guide.status ===
                            "draft" && (
                            <>
                              <StatusButton
                                guideId={
                                  guide.id
                                }
                                targetStatus="published"
                                tone="primary"
                              >
                                {
                                  currentCopy.publish
                                }
                              </StatusButton>

                              <StatusButton
                                guideId={
                                  guide.id
                                }
                                targetStatus="archived"
                                tone="danger"
                              >
                                {
                                  currentCopy.archive
                                }
                              </StatusButton>
                            </>
                          )}

                          {guide.status ===
                            "published" && (
                            <>
                              <FeaturedButton
                                guideId={
                                  guide.id
                                }
                                featured={
                                  guide.featured
                                }
                              >
                                {guide.featured
                                  ? currentCopy.removeFeatured
                                  : currentCopy.makeFeatured}
                              </FeaturedButton>

                              <StatusButton
                                guideId={
                                  guide.id
                                }
                                targetStatus="draft"
                              >
                                {
                                  currentCopy.unpublish
                                }
                              </StatusButton>

                              <StatusButton
                                guideId={
                                  guide.id
                                }
                                targetStatus="archived"
                                tone="danger"
                              >
                                {
                                  currentCopy.archive
                                }
                              </StatusButton>
                            </>
                          )}

                          {guide.status ===
                            "archived" && (
                            <StatusButton
                              guideId={
                                guide.id
                              }
                              targetStatus="draft"
                            >
                              {
                                currentCopy.restore
                              }
                            </StatusButton>
                          )}
                        </div>
                      </div>

                      <dl className="grid shrink-0 gap-4 text-sm sm:grid-cols-2 lg:min-w-[22rem]">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {
                              currentCopy.verified
                            }
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
                            {
                              currentCopy.updated
                            }
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
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
