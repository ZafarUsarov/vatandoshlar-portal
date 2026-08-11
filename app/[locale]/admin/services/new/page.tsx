import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import ServiceCreateForm from "@/components/admin/services/ServiceCreateForm";
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
        ? "Neue Dienstleistung erstellen"
        : "Yangi xizmat yaratish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · XIZMATLAR",
    title:
      "Yangi xizmat",
    description:
      "O‘zbekcha va nemischa xizmat ma’lumotlarini to‘ldiring. Yangi yozuv avtomatik ravishda qoralama sifatida PostgreSQL’ga saqlanadi.",
    back:
      "Xizmatlar boshqaruviga qaytish",
  },
  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · DIENSTLEISTUNGEN",
    title:
      "Neue Dienstleistung",
    description:
      "Füllen Sie die usbekischen und deutschen Dienstleistungsinformationen aus. Der neue Eintrag wird automatisch als Entwurf in PostgreSQL gespeichert.",
    back:
      "Zur Dienstleistungsverwaltung",
  },
} as const;

export default async function AdminServicesNewPage() {
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

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin/services"
            className="inline-flex text-sm font-bold text-violet-700 transition hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:text-violet-400 dark:hover:text-violet-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
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
          <ServiceCreateForm
            locale={appLocale}
          />
        </div>
      </div>
    </main>
  );
}
