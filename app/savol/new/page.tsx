import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CreateQuestionForm from "@/components/savol/CreateQuestionForm";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getActiveQuestionCategories } from "@/lib/savol/savol-repository";

export const dynamic = "force-dynamic";

type SupportedLocale = "uz" | "de";

const copy = {
  uz: {
    title: "Savol berish | Vatandoshlar.de",
    heading: "Savol bering",
    description:
      "Savolingizni aniq yozing. Javob beruvchilarga vaziyatingizni tushunish uchun kerakli ma’lumotlarni kiriting.",
    back: "Barcha savollar",
  },
  de: {
    title: "Frage stellen | Vatandoshlar.de",
    heading: "Frage stellen",
    description:
      "Formulieren Sie Ihre Frage möglichst konkret und geben Sie die Informationen an, die für hilfreiche Antworten nötig sind.",
    back: "Alle Fragen",
  },
} as const;

function resolveLocale(locale: string): SupportedLocale {
  return locale === "de" ? "de" : "uz";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale(await getLocale());

  return {
    title: copy[locale].title,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function NewSavolPage() {
  const locale = resolveLocale(await getLocale());
  const t = copy[locale];

  await requirePublicUser(locale);
  const categories = await getActiveQuestionCategories();

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:px-8">
        <Link
          href="/savol"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          ← {t.back}
        </Link>

        <h1 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
          {t.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {t.description}
        </p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
          <CreateQuestionForm locale={locale} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
