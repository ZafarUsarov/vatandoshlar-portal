import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminNewsArticles,
  type AdminNewsStatus,
} from "@/lib/news/admin-news-repository";

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
    eyebrow: "VATANDOSHLAR.DE · ADMIN · YANGILIKLAR",
    title: "Yangiliklarni boshqarish",
    description:
      "Bu sahifa PostgreSQL’dagi admin yangiliklari uchun boshqaruv ro‘yxatidir. Public Yangiliklar bo‘limi hozircha mavjud static data orqali ishlashda davom etadi.",
    back: "Boshqaruv paneliga qaytish",
    total: "Jami",
    emptyTitle: "Hozircha admin yangiliklari yo‘q",
    emptyDescription:
      "Database foundation tayyor. Keyingi bosqichda yangi maqola yaratish formasi qo‘shiladi.",
    slug: "Slug",
    verified: "Tekshirildi",
    updated: "Yangilandi",
    featured: "Featured",
    status: "Holat",
    statuses: {
      draft: "Qoralama",
      published: "E’lon qilingan",
      archived: "Arxivlangan",
    },
  },

  de: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN · NACHRICHTEN",
    title: "Nachrichten verwalten",
    description:
      "Diese Seite ist die Verwaltungsliste für Nachrichten in PostgreSQL. Der öffentliche Nachrichtenbereich verwendet vorerst weiterhin die bestehende statische Datenquelle.",
    back: "Zurück zum Verwaltungsbereich",
    total: "Gesamt",
    emptyTitle: "Noch keine Admin-Nachrichten vorhanden",
    emptyDescription:
      "Die Datenbankgrundlage ist bereit. Im nächsten Schritt wird das Formular zum Erstellen neuer Beiträge ergänzt.",
    slug: "Slug",
    verified: "Geprüft",
    updated: "Aktualisiert",
    featured: "Featured",
    status: "Status",
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

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
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
            </div>

            <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-950/60">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                {currentCopy.total}
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                {articles.length}
              </p>
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
