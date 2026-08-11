import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminNewsArticles,
  type AdminNewsStatus,
} from "@/lib/news/admin-news-repository";

import {
  updateNewsFeaturedAction,
  updateNewsStatusAction,
} from "./actions";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === "de"
        ? "Nachrichten verwalten"
        : "Yangiliklarni boshqarish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · YANGILIKLAR",
    title: "Yangiliklarni boshqarish",
    description:
      "PostgreSQL’dagi yangiliklarni yarating, tahrirlang, e’lon holatini va featured maqolani boshqaring.",
    featuredNote:
      "Bir vaqtning o‘zida faqat bitta e’lon qilingan maqola featured bo‘lishi mumkin. Draft yoki archived holatiga qaytarilsa featured avtomatik o‘chadi.",
    back: "Boshqaruv paneliga qaytish",
    create: "Yangi maqola yaratish",
    edit: "Tahrirlash",
    publish: "E’lon qilish",
    unpublish: "Qoralamaga qaytarish",
    archive: "Arxivlash",
    restore: "Qoralamaga tiklash",
    makeFeatured: "Featured qilish",
    removeFeatured: "Featured’dan olish",
    total: "Jami",
    emptyTitle:
      "Hozircha admin yangiliklari yo‘q",
    emptyDescription:
      "Yangi maqola yaratib, uni qoralama sifatida PostgreSQL’ga saqlashingiz mumkin.",
    slug: "Slug",
    verified: "Tekshirildi",
    updated: "Yangilandi",
    featured: "Featured",
    statuses: {
      draft: "Qoralama",
      published: "E’lon qilingan",
      archived: "Arxivlangan",
    },
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · NACHRICHTEN",
    title: "Nachrichten verwalten",
    description:
      "Erstellen und bearbeiten Sie Nachrichten in PostgreSQL und verwalten Sie Veröffentlichungsstatus sowie den Featured-Beitrag.",
    featuredNote:
      "Es kann immer nur einen veröffentlichten Featured-Beitrag geben. Beim Zurücksetzen auf Entwurf oder beim Archivieren wird Featured automatisch entfernt.",
    back: "Zurück zum Verwaltungsbereich",
    create: "Neue Nachricht erstellen",
    edit: "Bearbeiten",
    publish: "Veröffentlichen",
    unpublish: "Als Entwurf setzen",
    archive: "Archivieren",
    restore: "Als Entwurf wiederherstellen",
    makeFeatured: "Als Featured setzen",
    removeFeatured: "Featured entfernen",
    total: "Gesamt",
    emptyTitle:
      "Noch keine Admin-Nachrichten vorhanden",
    emptyDescription:
      "Erstellen Sie einen neuen Beitrag und speichern Sie ihn als Entwurf in PostgreSQL.",
    slug: "Slug",
    verified: "Geprüft",
    updated: "Aktualisiert",
    featured: "Featured",
    statuses: {
      draft: "Entwurf",
      published: "Veröffentlicht",
      archived: "Archiviert",
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
  status: AdminNewsStatus,
): string {
  if (status === "published") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (status === "archived") {
    return "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
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
  targetStatus: AdminNewsStatus;
  children: React.ReactNode;
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
    <form action={updateNewsStatusAction}>
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
        className={`inline-flex min-h-10 items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${className}`}
      >
        {children}
      </button>
    </form>
  );
}

function FeaturedButton({
  articleId,
  featured,
  children,
}: {
  articleId: string;
  featured: boolean;
  children: React.ReactNode;
}) {
  return (
    <form action={updateNewsFeaturedAction}>
      <input
        type="hidden"
        name="articleId"
        value={articleId}
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

export default async function AdminNewsPage() {
  const locale = await getLocale();

  const appLocale =
    locale === "de"
      ? "de"
      : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  await requireAdmin(appLocale);

  const articles =
    await getAdminNewsArticles();

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
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>

              <p className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm leading-6 text-violet-800 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200">
                {currentCopy.featuredNote}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-700 dark:bg-slate-950/60">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {currentCopy.total}
                </p>

                <p className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                  {articles.length}
                </p>
              </div>

              <Link
                href="/admin/news/new"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
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
          {articles.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
              <div
                aria-hidden="true"
                className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
              >
                N
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
                {currentCopy.emptyTitle}
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.emptyDescription}
              </p>

              <Link
                href="/admin/news/new"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClassName(
                            article.status,
                          )}`}
                        >
                          {
                            currentCopy.statuses[
                              article.status
                            ]
                          }
                        </span>

                        {article.featured && (
                          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
                            {currentCopy.featured}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                        {appLocale === "de"
                          ? article.titleDe
                          : article.titleUz}
                      </h2>

                      <p className="mt-2 break-all text-sm font-medium text-slate-500 dark:text-slate-400">
                        {currentCopy.slug}:{" "}
                        <span className="text-slate-700 dark:text-slate-300">
                          {article.slug}
                        </span>
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/admin/news/${article.id}/edit`}
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/30 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
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
                              featured={article.featured}
                            >
                              {article.featured
                                ? currentCopy.removeFeatured
                                : currentCopy.makeFeatured}
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
                    </div>

                    <dl className="grid shrink-0 gap-4 text-sm sm:grid-cols-2 lg:min-w-[22rem]">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          {currentCopy.verified}
                        </dt>

                        <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                          {formatDate(
                            article.verifiedAt,
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
                            article.updatedAt,
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
