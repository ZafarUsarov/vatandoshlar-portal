import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import SpecialistEditForm from "@/components/admin/specialists/SpecialistEditForm";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminSpecialistById,
} from "@/lib/specialists/admin-specialists-repository";

export const dynamic =
  "force-dynamic";

type AdminSpecialistEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    await getLocale();

  return {
    title:
      locale === "de"
        ? "Fachkraft bearbeiten"
        : "Mutaxassisni tahrirlash",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · MUTAXASSISLAR",
    title:
      "Mutaxassisni tahrirlash",
    description:
      "PostgreSQL’dagi mavjud mutaxassis profilining o‘zbekcha, nemischa va umumiy ma’lumotlarini yangilang.",
    back:
      "Mutaxassislar boshqaruviga qaytish",
  },
  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · FACHKRÄFTE",
    title:
      "Fachkraft bearbeiten",
    description:
      "Bearbeiten Sie die usbekischen, deutschen und gemeinsamen Informationen des vorhandenen Fachkraftprofils in PostgreSQL.",
    back:
      "Zur Fachkräfteverwaltung",
  },
} as const;

export default async function AdminSpecialistEditPage({
  params,
}: AdminSpecialistEditPageProps) {
  const locale =
    await getLocale();

  const appLocale:
    | "uz"
    | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  const { id } =
    await params;

  const specialist =
    await getAdminSpecialistById(id);

  if (!specialist) {
    notFound();
  }

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
          <SpecialistEditForm
            locale={appLocale}
            specialist={specialist}
          />
        </div>
      </div>
    </main>
  );
}
