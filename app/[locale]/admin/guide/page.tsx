import type {
  Metadata,
} from "next";
import type {
  ReactNode,
} from "react";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminGuideArticles,
  type AdminGuideArticleStatus,
  type AdminGuideCategorySlug,
} from "@/lib/guide/admin-guide-repository";

import {
  updateGuideFeaturedAction,
  updateGuideStatusAction,
} from "./actions";

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
      "PostgreSQL’dagi Guide maqolalarini yarating, tahrirlang va lifecycle hamda featured holatini boshqaring.",
    lifecycleNote:
      "Featured faqat e’lon qilingan maqolada yoqilishi mumkin. Maqola qoralama yoki arxiv holatiga o‘tkazilganda featured avtomatik o‘chadi.",
    publicStatic:
      "Public Guide hozircha modular static source bilan ishlaydi. Admin’dagi lifecycle va content o‘zgarishlari hali public Guide’ga ta’sir qilmaydi.",
    back:
      "Admin panelga qaytish",
    publicPage:
      "Public Guide",
    create:
      "Yangi Guide maqolasi",
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
    emptyTitle:
      "PostgreSQL’da Guide maqolalari mavjud emas",
    emptyDescription:
      "Yangi maqola yaratib, uni draft sifatida PostgreSQL’ga saqlashingiz mumkin.",
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
      "embassy-and-appointments":
        "Elchixona va terminlar",
      documents:
        "Hujjatlar",
      "language-and-certificates":
        "Til va sertifikatlar",
      education:
        "Ta’lim",
      "work-and-career":
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
      "Erstellen und bearbeiten Sie Guide-Artikel in PostgreSQL und verwalten Sie Lifecycle sowie Featured-Status.",
    lifecycleNote:
      "Featured kann nur bei veröffentlichten Artikeln aktiviert werden. Beim Zurücksetzen auf Entwurf oder Archiv wird Featured automatisch entfernt.",
    publicStatic:
      "Der öffentliche Guide verwendet vorerst weiterhin die modulare statische Quelle. Admin-Lifecycle und Inhaltsänderungen wirken sich noch nicht auf den öffentlichen Guide aus.",
    back:
      "Zur Admin-Übersicht",
    publicPage:
      "Öffentlicher Guide",
    create:
      "Neuen Guide-Artikel erstellen",
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
    emptyTitle:
      "Keine Guide-Artikel in PostgreSQL",
    emptyDescription:
      "Erstellen Sie einen neuen Guide-Artikel und speichern Sie ihn als Entwurf in PostgreSQL.",
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
      "embassy-and-appointments":
        "Botschaft und Termine",
      documents:
        "Dokumente",
      "language-and-certificates":
        "Sprache und Zertifikate",
      education:
        "Bildung",
      "work-and-career":
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

function StatusButton({
  articleId,
  targetStatus,
  children,
  tone = "neutral",
}: {
  articleId: string;
  targetStatus: AdminGuideArticleStatus;
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
        updateGuideStatusAction
      }
    >
      <input
        type="hidden"
        name="articleId"
        value={articleId}
      />

      <input
        type="hidden"
        name="targetStatus"
        value={targetStatus}
      />

      <button
        type="submit"
        className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${className}`}
      >
        {children}
      </button>
    </form>
  );
}

function FeaturedButton({
  articleId,
  enabled,
  children,
}: {
  articleId: string;
  enabled: boolean;
  children: ReactNode;
}) {
  return (
    <form
      action={
        updateGuideFeaturedAction
      }
    >
      <input
        type="hidden"
        name="articleId"
        value={articleId}
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
            ? "inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
            : "inline-flex min-h-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/15 dark:focus-visible:ring-offset-slate-900"
        }
      >
        {children}
      </button>
    </form>
  );
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
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>

              <p className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm leading-6 text-teal-800 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-200">
                {currentCopy.lifecycleNote}
              </p>

              <p className="mt-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                {currentCopy.publicStatic}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.back}
              </Link>

              <Link
                href="/guide"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 px-4 text-sm font-bold text-teal-700 transition hover:bg-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300 dark:hover:bg-teal-500/15 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.publicPage}
              </Link>

              <Link
                href="/admin/guide/new"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
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

                      <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300">
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

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Link
                        href={`/admin/guide/${article.id}/edit`}
                        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-teal-200 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-500/30 dark:hover:text-teal-300 dark:focus-visible:ring-offset-slate-900"
                      >
                        {currentCopy.edit}
                      </Link>

                      {article.status === "draft" && (
                        <>
                          <StatusButton
                            articleId={article.id}
                            targetStatus="published"
                            tone="primary"
                          >
                            {currentCopy.publish}
                          </StatusButton>

                          <StatusButton
                            articleId={article.id}
                            targetStatus="archived"
                            tone="danger"
                          >
                            {currentCopy.archive}
                          </StatusButton>
                        </>
                      )}

                      {article.status === "published" && (
                        <>
                          <FeaturedButton
                            articleId={article.id}
                            enabled={article.featured}
                          >
                            {article.featured
                              ? currentCopy.featuredOff
                              : currentCopy.featuredOn}
                          </FeaturedButton>

                          <StatusButton
                            articleId={article.id}
                            targetStatus="draft"
                          >
                            {currentCopy.unpublish}
                          </StatusButton>

                          <StatusButton
                            articleId={article.id}
                            targetStatus="archived"
                            tone="danger"
                          >
                            {currentCopy.archive}
                          </StatusButton>
                        </>
                      )}

                      {article.status === "archived" && (
                        <StatusButton
                          articleId={article.id}
                          targetStatus="draft"
                        >
                          {currentCopy.restore}
                        </StatusButton>
                      )}
                    </div>

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
