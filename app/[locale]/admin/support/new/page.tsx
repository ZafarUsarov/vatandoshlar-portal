import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import SupportContributionForm from "@/components/admin/support/SupportContributionForm";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";

import { createSupportContributionAction } from "./actions";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === "de"
        ? "Unterstützung erfassen"
        : "Support contribution qo‘shish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · SUPPORT",
    title: "Yangi contribution qo‘shish",
    description:
      "Faqat real va tasdiqlangan PayPal yoki Taps to‘lovini kiriting. Ranking va umumiy summa serverda transactionlardan avtomatik hisoblanadi.",
    back: "Support boshqaruviga qaytish",
  },
  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · UNTERSTÜTZUNG",
    title: "Neuen Beitrag erfassen",
    description:
      "Erfassen Sie nur reale und bestätigte PayPal- oder Taps-Zahlungen. Rangliste und Gesamtsumme werden serverseitig automatisch aus den Transaktionen berechnet.",
    back: "Zur Unterstützungsverwaltung",
  },
} as const;

export default async function AdminSupportCreatePage() {
  const locale = await getLocale();

  const appLocale =
    locale === "de" ? "de" : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  await requireAdmin(appLocale);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin/support"
            className="inline-flex text-sm font-bold text-emerald-700 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
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
          <SupportContributionForm
            locale={appLocale}
            mode="create"
            formAction={
              createSupportContributionAction
            }
          />
        </div>
      </div>
    </main>
  );
}
