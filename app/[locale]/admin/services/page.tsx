import type {
  Metadata,
} from "next";
import {
  getLocale,
} from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminServices,
  type AdminServiceStatus,
} from "@/lib/services/admin-services-repository";

import {
  updateServiceFeaturedAction,
  updateServiceStatusAction,
} from "./actions";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title:
    "Services Admin | Vatandoshlar.de",
  robots: {
    index: false,
    follow: false,
  },
};

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · XIZMATLAR",
    title:
      "Xizmatlarni boshqarish",
    description:
      "PostgreSQL’dagi xizmat yozuvlarini yarating, tahrirlang va ularning e’lon holati hamda featured statusini boshqaring.",
    lifecycleNote:
      "Bir vaqtning o‘zida faqat bitta e’lon qilingan xizmat featured bo‘lishi mumkin. Draft yoki archived holatiga o‘tkazilganda featured avtomatik o‘chadi.",
    publicStatic:
      "Public Xizmatlar bo‘limi hozircha static data’dan foydalanadi. Admin status va featured o‘zgarishlari hali public sahifaga ta’sir qilmaydi.",
    back:
      "Admin panelga qaytish",
    publicPage:
      "Public xizmatlar",
    create:
      "Yangi xizmat yaratish",
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
    makeFeatured:
      "Featured qilish",
    removeFeatured:
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
    emptyTitle:
      "PostgreSQL’da xizmatlar hali mavjud emas",
    emptyDescription:
      "Yangi xizmat yaratib, uni qoralama sifatida PostgreSQL’ga saqlashingiz mumkin.",
    slug:
      "Slug",
    updated:
      "Yangilangan",
    status:
      "Holat",
    categories: {
      translation:
        "Tarjima",
      legal:
        "Huquq",
      tax:
        "Soliq",
      medical:
        "Tibbiyot",
      craft:
        "Hunarmandchilik",
      consumer:
        "Iste’molchi huquqlari",
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
      "VATANDOSHLAR.DE · ADMIN · DIENSTLEISTUNGEN",
    title:
      "Dienstleistungen verwalten",
    description:
      "Erstellen und bearbeiten Sie Dienstleistungseinträge in PostgreSQL und verwalten Sie Veröffentlichungsstatus sowie Featured.",
    lifecycleNote:
      "Es kann immer nur eine veröffentlichte Dienstleistung Featured sein. Beim Zurücksetzen auf Entwurf oder beim Archivieren wird Featured automatisch entfernt.",
    publicStatic:
      "Der öffentliche Bereich Dienstleistungen verwendet vorerst weiterhin statische Daten. Admin-Status und Featured wirken sich noch nicht auf die öffentliche Seite aus.",
    back:
      "Zur Admin-Übersicht",
    publicPage:
      "Öffentliche Dienstleistungen",
    create:
      "Neue Dienstleistung erstellen",
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
    makeFeatured:
      "Als Featured setzen",
    removeFeatured:
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
    emptyTitle:
      "Noch keine Dienstleistungen in PostgreSQL",
    emptyDescription:
      "Erstellen Sie eine neue Dienstleistung und speichern Sie sie als Entwurf in PostgreSQL.",
    slug:
      "Slug",
    updated:
      "Aktualisiert",
    status:
      "Status",
    categories: {
      translation:
        "Übersetzung",
      legal:
        "Recht",
      tax:
        "Steuern",
      medical:
        "Medizin",
      craft:
        "Handwerk",
      consumer:
        "Verbraucherschutz",
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
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(
    new Date(value),
  );
}

function getStatusClasses(
  status: AdminServiceStatus,
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

function StatusButton({
  serviceId,
  targetStatus,
  children,
  tone = "neutral",
}: {
  serviceId: string;
  targetStatus:
    AdminServiceStatus;
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
        updateServiceStatusAction
      }
    >
      <input
        type="hidden"
        name="serviceId"
        value={serviceId}
      />

      <input
        type="hidden"
        name="targetStatus"
        value={targetStatus}
      />

      <button
        type="submit"
        className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${className}`}
      >
        {children}
      </button>
    </form>
  );
}

function FeaturedButton({
  serviceId,
  featured,
  children,
}: {
  serviceId: string;
  featured: boolean;
  children:
    React.ReactNode;
}) {
  return (
    <form
      action={
        updateServiceFeaturedAction
      }
    >
      <input
        type="hidden"
        name="serviceId"
        value={serviceId}
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

export default async function AdminServicesPage() {
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

  const services =
    await getAdminServices();

  const draftCount =
    services.filter(
      (service) =>
        service.status ===
        "draft",
    ).length;

  const publishedCount =
    services.filter(
      (service) =>
        service.status ===
        "published",
    ).length;

  const archivedCount =
    services.filter(
      (service) =>
        service.status ===
        "archived",
    ).length;

  const featuredCount =
    services.filter(
      (service) =>
        service.featured,
    ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
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

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
              >
                {
                  currentCopy.back
                }
              </Link>

              <Link
                href="/services"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 text-sm font-bold text-violet-700 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/15 dark:focus-visible:ring-offset-slate-900"
              >
                {
                  currentCopy.publicPage
                }
              </Link>

              <Link
                href="/admin/services/new"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-violet-600 px-4 text-sm font-bold text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
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
            currentCopy.status
          }
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {[
            {
              label:
                currentCopy.total,
              value:
                services.length,
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
                currentCopy.featured,
              value:
                featuredCount,
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

        <section className="mt-6">
          {services.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                {
                  currentCopy.emptyTitle
                }
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {
                  currentCopy.emptyDescription
                }
              </p>

              <Link
                href="/admin/services/new"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {
                  currentCopy.create
                }
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {services.map(
                (service) => (
                  <article
                    key={
                      service.id
                    }
                    className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                            service.status,
                          )}`}
                        >
                          {
                            currentCopy.statuses[
                              service.status
                            ]
                          }
                        </span>

                        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                          {
                            currentCopy.categories[
                              service.category
                            ]
                          }
                        </span>

                        {service.featured && (
                          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                            Featured
                          </span>
                        )}
                      </div>

                      <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                        {appLocale ===
                        "de"
                          ? service.titleDe
                          : service.titleUz}
                      </h2>

                      <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {appLocale ===
                        "de"
                          ? service.shortTitleDe
                          : service.shortTitleUz}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-violet-200 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-violet-500/30 dark:hover:text-violet-300 dark:focus-visible:ring-offset-slate-900"
                        >
                          {
                            currentCopy.edit
                          }
                        </Link>

                        {service.status ===
                          "draft" && (
                          <>
                            <StatusButton
                              serviceId={
                                service.id
                              }
                              targetStatus="published"
                              tone="primary"
                            >
                              {
                                currentCopy.publish
                              }
                            </StatusButton>

                            <StatusButton
                              serviceId={
                                service.id
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

                        {service.status ===
                          "published" && (
                          <>
                            <FeaturedButton
                              serviceId={
                                service.id
                              }
                              featured={
                                service.featured
                              }
                            >
                              {service.featured
                                ? currentCopy.removeFeatured
                                : currentCopy.makeFeatured}
                            </FeaturedButton>

                            <StatusButton
                              serviceId={
                                service.id
                              }
                              targetStatus="draft"
                            >
                              {
                                currentCopy.unpublish
                              }
                            </StatusButton>

                            <StatusButton
                              serviceId={
                                service.id
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

                        {service.status ===
                          "archived" && (
                          <StatusButton
                            serviceId={
                              service.id
                            }
                            targetStatus="draft"
                          >
                            {
                              currentCopy.restore
                            }
                          </StatusButton>
                        )}
                      </div>

                      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <dt className="font-medium text-slate-500 dark:text-slate-400">
                            {
                              currentCopy.slug
                            }
                          </dt>

                          <dd className="mt-1 break-all font-mono text-xs text-slate-700 dark:text-slate-300">
                            {
                              service.slug
                            }
                          </dd>
                        </div>

                        <div>
                          <dt className="font-medium text-slate-500 dark:text-slate-400">
                            {
                              currentCopy.updated
                            }
                          </dt>

                          <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                            {formatDate(
                              service.updatedAt,
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
