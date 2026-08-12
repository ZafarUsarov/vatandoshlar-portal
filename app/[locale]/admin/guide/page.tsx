import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminGuideArticles,
  type AdminGuideArticleStatus,
  type AdminGuideCategorySlug,
} from "@/lib/guide/admin-guide-repository";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title:
    "Guide Admin | Vatandoshlar.de",
  robots: {
    index: false,
    follow: false,
  },
};

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · GERMANIYA QO‘LLANMASI",
    title:
      "Guide maqolalarini boshqarish",
    description:
      "Germany Guide uchun PostgreSQL foundation tayyor. Hozir bu sahifa database’dagi maqolalarni read-only ko‘rinishda ko‘rsatadi.",
    foundationNote:
      "Public Guide hozircha mavjud modular static data bilan ishlashda davom etadi. Static maqolalar keyingi bosqichlarda xavfsiz va idempotent tarzda PostgreSQL’ga ko‘chiriladi.",
    back:
      "Admin panelga qaytish",
    publicPage:
      "Public Guide",
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
      "PostgreSQL’da Guide maqolalari hali mavjud emas",
    emptyDescription:
      "Bu kutilgan holat. Keyingi bosqichda mavjud static Guide maqolalarini PostgreSQL’ga xavfsiz ko‘chirish workflow’ini qo‘shamiz.",
    category:
      "Kategoriya",
    slug:
      "Slug",
    legacyId:
      "Legacy ID",
    reviewed:
      "Oxirgi tekshiruv",
    updated:
      "Yangilangan",
    statuses: {
      draft:
        "Qoralama",
      published:
        "E’lon qilingan",
      archived:
        "Arxivlangan",
    },
    categories: {
      "coming-to-germany":
        "Germaniyaga kelish",
      visas:
        "Vizalar",
      family:
        "Oila",
      invitation:
        "Taklifnoma",
      embassy:
        "Elchixona va konsullik",
      documents:
        "Hujjatlar",
      language:
        "Til",
      education:
        "Ta’lim",
      career:
        "Ish va karyera",
      "after-arrival":
        "Kelgandan keyin",
      recognition:
        "Tan olish",
      integration:
        "Integratsiya",
    },
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · DEUTSCHLAND-RATGEBER",
    title:
      "Guide-Artikel verwalten",
    description:
      "Die PostgreSQL-Grundlage für den Deutschland-Ratgeber ist eingerichtet. Diese Seite zeigt derzeit die Datenbankartikel schreibgeschützt an.",
    foundationNote:
      "Der öffentliche Guide verwendet vorerst weiterhin die bestehende modulare statische Datenquelle. Die vorhandenen Artikel werden in den nächsten Schritten sicher und idempotent nach PostgreSQL migriert.",
    back:
      "Zur Admin-Übersicht",
    publicPage:
      "Öffentlicher Guide",
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
      "Noch keine Guide-Artikel in PostgreSQL",
    emptyDescription:
      "Das ist erwartbar. Im nächsten Schritt migrieren wir die vorhandenen statischen Guide-Artikel sicher nach PostgreSQL.",
    category:
      "Kategorie",
    slug:
      "Slug",
    legacyId:
      "Legacy-ID",
    reviewed:
      "Zuletzt geprüft",
    updated:
      "Aktualisiert",
    statuses: {
      draft:
        "Entwurf",
      published:
        "Veröffentlicht",
      archived:
        "Archiviert",
    },
    categories: {
      "coming-to-germany":
        "Nach Deutschland kommen",
      visas:
        "Visa",
      family:
        "Familie",
      invitation:
        "Einladung",
      embassy:
        "Botschaft und Konsulat",
      documents:
        "Dokumente",
      language:
        "Sprache",
      education:
        "Bildung",
      career:
        "Arbeit und Karriere",
      "after-arrival":
        "Nach der Ankunft",
      recognition:
        "Anerkennung",
      integration:
        "Integration",
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
  status: AdminGuideArticleStatus,
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

export default async function AdminGuidePage() {
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

  const articles =
    await getAdminGuideArticles();

  const draftCount =
    articles.filter(
      (article) =>
        article.status === "draft",
    ).length;

  const publishedCount =
    articles.filter(
      (article) =>
        article.status === "published",
    ).length;

  const archivedCount =
    articles.filter(
      (article) =>
        article.status === "archived",
    ).length;

  const featuredCount =
    articles.filter(
      (article) =>
        article.featured,
    ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>

              <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                {currentCopy.foundationNote}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.back}
              </Link>

              <Link
                href="/guide"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.publicPage}
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              label:
                currentCopy.total,
              value:
                articles.length,
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

        <section className="mt-6">
          {articles.length === 0 ? (
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
              {articles.map(
                (article) => (
                  <article
                    key={article.id}
                    className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                          article.status,
                        )}`}
                      >
                        {
                          currentCopy.statuses[
                            article.status
                          ]
                        }
                      </span>

                      <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                        {
                          currentCopy.categories[
                            article.categorySlug as AdminGuideCategorySlug
                          ]
                        }
                      </span>

                      {article.featured && (
                        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                          {currentCopy.featured}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                      {appLocale === "de"
                        ? article.titleDe
                        : article.titleUz}
                    </h2>

                    <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-5">
                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.category}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {
                            currentCopy.categories[
                              article.categorySlug
                            ]
                          }
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.slug}
                        </dt>

                        <dd className="mt-1 break-all font-mono text-xs text-slate-700 dark:text-slate-300">
                          {article.slug}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.legacyId}
                        </dt>

                        <dd className="mt-1 break-all font-mono text-xs text-slate-700 dark:text-slate-300">
                          {article.legacyId}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.reviewed}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {formatDate(
                            article.lastReviewedAt,
                            appLocale,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          {currentCopy.updated}
                        </dt>

                        <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                          {formatDateTime(
                            article.updatedAt,
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
