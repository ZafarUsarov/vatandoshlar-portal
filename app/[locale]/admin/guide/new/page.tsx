import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import GuideCreateFormClient from "@/components/admin/guide/GuideCreateFormClient";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    await getLocale();

  return {
    title:
      locale === "de"
        ? "Guide-Artikel erstellen"
        : "Guide maqolasi yaratish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · GERMANIYA QO‘LLANMASI",
    title:
      "Yangi Guide maqolasi yaratish",
    description:
      "Yangi maqola PostgreSQL’ga draft sifatida saqlanadi. Public Guide hozircha static source bilan ishlashda davom etadi.",
    back:
      "Guide boshqaruviga qaytish",
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · DEUTSCHLAND-RATGEBER",
    title:
      "Neuen Guide-Artikel erstellen",
    description:
      "Der neue Artikel wird als Entwurf in PostgreSQL gespeichert. Der öffentliche Guide verwendet vorerst weiterhin die statische Quelle.",
    back:
      "Zur Guide-Verwaltung",
  },
} as const;

export default async function NewGuideArticlePage() {
  const locale =
    await getLocale();

  const appLocale:
    | "uz"
    | "de" =
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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin/guide"
            className="inline-flex text-sm font-bold text-teal-700 transition hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-teal-400 dark:hover:text-teal-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
            {currentCopy.eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {currentCopy.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            {currentCopy.description}
          </p>
        </header>

        <div className="mt-6">
          <GuideCreateFormClient
            locale={appLocale}
          />
        </div>
      </div>
    </main>
  );
}
