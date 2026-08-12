import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import EventCreateForm from "@/components/admin/events/EventCreateForm";
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
        ? "Veranstaltung erstellen"
        : "Tadbir yaratish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · TADBIRLAR",
    title:
      "Yangi tadbir yaratish",
    description:
      "Yangi tadbir PostgreSQL’ga qoralama sifatida saqlanadi. Public Events sahifasida faqat keyinchalik e’lon qilingan tadbirlar ko‘rinadi.",
    back:
      "Tadbirlar boshqaruviga qaytish",
  },
  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · VERANSTALTUNGEN",
    title:
      "Neue Veranstaltung erstellen",
    description:
      "Die neue Veranstaltung wird als Entwurf in PostgreSQL gespeichert. Im öffentlichen Events-Bereich erscheinen später nur veröffentlichte Veranstaltungen.",
    back:
      "Zur Veranstaltungsverwaltung",
  },
} as const;

export default async function NewEventPage() {
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
            href="/admin/events"
            className="inline-flex text-sm font-bold text-orange-700 transition hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:text-orange-400 dark:hover:text-orange-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
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
          <EventCreateForm
            locale={appLocale}
          />
        </div>
      </div>
    </main>
  );
}
