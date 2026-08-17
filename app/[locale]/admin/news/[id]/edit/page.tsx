import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import NewsArticleForm from "@/components/admin/news/NewsArticleForm";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminNewsArticleById,
} from "@/lib/news/admin-news-repository";

import { updateNewsAction } from "./actions";

export const dynamic = "force-dynamic";

type AdminNewsEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === "de"
        ? "Nachricht bearbeiten"
        : "Yangilikni tahrirlash",
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
    title: "Maqolani tahrirlash",
    description:
      "Maqolaning o‘zbekcha, nemischa va umumiy ma’lumotlarini yangilang. Status boshqaruvi keyingi bosqichda qo‘shiladi.",
    back: "Yangiliklar boshqaruviga qaytish",
    status: "Holat",
    draft: "Qoralama",
    published: "E’lon qilingan",
    archived: "Arxivlangan",
  },
  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · NACHRICHTEN",
    title: "Nachricht bearbeiten",
    description:
      "Aktualisieren Sie den usbekischen, deutschen und gemeinsamen Inhalt des Beitrags. Die Statusverwaltung folgt im nächsten Schritt.",
    back: "Zur Nachrichtenverwaltung",
    status: "Status",
    draft: "Entwurf",
    published: "Veröffentlicht",
    archived: "Archiviert",
  },
} as const;

export default async function AdminNewsEditPage({
  params,
}: AdminNewsEditPageProps) {
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

  const { id } = await params;

  const article =
    await getAdminNewsArticleById(id);

  if (!article) {
    notFound();
  }

  const boundUpdateAction =
    updateNewsAction.bind(
      null,
      article.id,
    );

  const statusLabel =
    article.status === "published"
      ? currentCopy.published
      : article.status === "archived"
        ? currentCopy.archived
        : currentCopy.draft;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin/news"
            className="inline-flex text-sm font-bold text-emerald-700 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
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

            <div className="shrink-0 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-500/20 dark:bg-amber-500/10">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
                {currentCopy.status}
              </p>

              <p className="mt-1 text-sm font-black text-amber-900 dark:text-amber-100">
                {statusLabel}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-6">
          <NewsArticleForm
            locale={appLocale}
            mode="edit"
            formAction={
              boundUpdateAction
            }
            initialValues={{
              slug: article.slug,
              titleUz: article.titleUz,
              titleDe: article.titleDe,
              excerptUz:
                article.excerptUz,
              excerptDe:
                article.excerptDe,
              contentUz:
                article.contentUz,
              contentDe:
                article.contentDe,
              categoryUz:
                article.categoryUz,
              categoryDe:
                article.categoryDe,
              contentType:
                article.contentType,
              readingTimeUz:
                article.readingTimeUz,
              readingTimeDe:
                article.readingTimeDe,
              sourceNameUz:
                article.sourceNameUz,
              sourceNameDe:
                article.sourceNameDe,
              sourceUrl:
                article.sourceUrl,
              sourceLanguageUz:
                article.sourceLanguageUz,
              sourceLanguageDe:
                article.sourceLanguageDe,
              locationUz:
                article.locationUz ?? "",
              locationDe:
                article.locationDe ?? "",
              verifiedAt:
                article.verifiedAt,
            }}
          />
        </div>
      </div>
    </main>
  );
}
