import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "@/i18n/navigation";
import {
  getActiveQuestionCategories,
  getPublishedQuestions,
} from "@/lib/savol/savol-repository";
import type { SavolContentLanguage } from "@/types/savol";

export const dynamic = "force-dynamic";

type SupportedLocale = "uz" | "de";

const copy = {
  uz: {
    metadataTitle: "Savol-javob | Vatandoshlar.de",
    metadataDescription:
      "Germaniyadagi o‘zbeklar uchun amaliy savollar va hamjamiyat javoblari.",
    eyebrow: "Vatandosh Savol",
    title: "Savolingizga javob toping",
    description:
      "Germaniyadagi hayot, hujjatlar, ish, o‘qish va kundalik masalalar bo‘yicha hamjamiyat savollari.",
    questions: "So‘nggi savollar",
    emptyTitle: "Hozircha savollar yo‘q",
    emptyDescription:
      "Birinchi savollar qo‘shilgach, ular shu yerda ko‘rinadi.",
    read: "Savolni ko‘rish",
    languageUz: "O‘zbekcha",
    languageDe: "Nemischa",
    ask: "Savol berish",
  },
  de: {
    metadataTitle: "Fragen & Antworten | Vatandoshlar.de",
    metadataDescription:
      "Praktische Fragen und Community-Antworten für Usbeken in Deutschland.",
    eyebrow: "Vatandosh Savol",
    title: "Antworten auf Ihre Fragen finden",
    description:
      "Community-Fragen zum Leben in Deutschland, zu Dokumenten, Arbeit, Studium und Alltag.",
    questions: "Neueste Fragen",
    emptyTitle: "Noch keine Fragen",
    emptyDescription:
      "Sobald die ersten Fragen veröffentlicht werden, erscheinen sie hier.",
    read: "Frage ansehen",
    languageUz: "Usbekisch",
    languageDe: "Deutsch",
    ask: "Frage stellen",
  },
} as const;

function resolveLocale(locale: string): SupportedLocale {
  return locale === "de" ? "de" : "uz";
}

function formatDate(value: string, locale: SupportedLocale): string {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "uz-UZ", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function languageLabel(
  language: SavolContentLanguage,
  locale: SupportedLocale,
): string {
  return language === "de" ? copy[locale].languageDe : copy[locale].languageUz;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveLocale(await getLocale());
  const t = copy[locale];

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    alternates: {
      canonical: `/${locale}/savol`,
      languages: {
        uz: "/uz/savol",
        de: "/de/savol",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Vatandoshlar.de",
      title: t.metadataTitle,
      description: t.metadataDescription,
      url: `/${locale}/savol`,
      locale: locale === "de" ? "de_DE" : "uz_UZ",
    },
  };
}

export default async function SavolPage() {
  const locale = resolveLocale(await getLocale());
  const t = copy[locale];

  const [questions, categories] = await Promise.all([
    getPublishedQuestions(),
    getActiveQuestionCategories(),
  ]);

  const categoryById = new Map(
    categories.map((category) => [
      category.id,
      locale === "de" ? category.labelDe : category.labelUz,
    ]),
  );

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main>
        <section className="border-b border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
            <p className="text-sm font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
              {t.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t.description}
            </p>
            <Link
              href="/savol/new"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-700 px-6 text-sm font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-900"
            >
              {t.ask}
            </Link>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight">{t.questions}</h2>

            {questions.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
                <h3 className="text-lg font-semibold">{t.emptyTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t.emptyDescription}
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                {questions.map((question) => {
                  const category = categoryById.get(question.categoryId);

                  return (
                    <article
                      key={question.id}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {category ? (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                            {category}
                          </span>
                        ) : null}
                        <span>{languageLabel(question.contentLanguage, locale)}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={question.createdAt}>
                          {formatDate(question.createdAt, locale)}
                        </time>
                      </div>

                      <h3 className="mt-3 text-xl font-semibold tracking-tight">
                        <Link
                          href={`/savol/${question.slug}`}
                          className="transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-slate-900"
                        >
                          {question.title}
                        </Link>
                      </h3>

                      <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {question.body}
                      </p>

                      <Link
                        href={`/savol/${question.slug}`}
                        className="mt-5 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
                      >
                        {t.read}
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
