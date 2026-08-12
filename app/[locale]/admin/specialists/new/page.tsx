import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import SpecialistCreateForm from "@/components/admin/specialists/SpecialistCreateForm";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === "de"
        ? "Neue Fachkraft erstellen"
        : "Yangi mutaxassis yaratish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN · MUTAXASSISLAR",
    title: "Yangi mutaxassis",
    description:
      "Profilning o‘zbekcha va nemischa asosiy ma’lumotlarini, kategoriyalarini, xizmatlarini va ixtiyoriy aloqa ma’lumotlarini kiriting. Yangi profil avtomatik draft holatida saqlanadi.",
    back: "Mutaxassislar boshqaruviga qaytish",
  },
  de: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN · FACHKRÄFTE",
    title: "Neue Fachkraft",
    description:
      "Erfassen Sie die usbekischen und deutschen Profildaten, Kategorien, Leistungen und optionalen Kontaktdaten. Das neue Profil wird automatisch als Entwurf gespeichert.",
    back: "Zur Fachkräfteverwaltung",
  },
} as const;

export default async function AdminSpecialistsNewPage() {
  const locale = await getLocale();
  const appLocale: "uz" | "de" = locale === "de" ? "de" : "uz";
  const currentCopy = appLocale === "de" ? copy.de : copy.uz;

  await requireAdmin(appLocale);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin/specialists"
            className="inline-flex text-sm font-bold text-fuchsia-700 transition hover:text-fuchsia-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 dark:text-fuchsia-400 dark:hover:text-fuchsia-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-fuchsia-600 dark:text-fuchsia-400">
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
          <SpecialistCreateForm locale={appLocale} />
        </div>
      </div>
    </main>
  );
}
