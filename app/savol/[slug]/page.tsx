import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CreateAnswerForm from "@/components/savol/CreateAnswerForm";
import { Link } from "@/i18n/navigation";
import {
  getActiveQuestionCategories,
  getPublishedAnswersForQuestion,
  getPublishedQuestionBySlug,
} from "@/lib/savol/savol-repository";

type SavolDetailPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export const dynamic = "force-dynamic";

type SupportedLocale = "uz" | "de";

const copy = {
  uz: {
    notFound: "Savol topilmadi | Vatandoshlar.de",
    answers: "Javoblar",
    noAnswers: "Hozircha javob yo‘q.",
    back: "Barcha savollar",
    questionLabel: "Savol",
    yourAnswer: "Javob yozish",
  },
  de: {
    notFound: "Frage nicht gefunden | Vatandoshlar.de",
    answers: "Antworten",
    noAnswers: "Noch keine Antworten.",
    back: "Alle Fragen",
    questionLabel: "Frage",
    yourAnswer: "Antwort schreiben",
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

export async function generateMetadata({
  params,
}: SavolDetailPageProps): Promise<Metadata> {
  const locale = resolveLocale(await getLocale());
  const { slug } = await params;
  const question = await getPublishedQuestionBySlug(slug);

  if (!question) {
    return {
      title: copy[locale].notFound,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    question.body.length > 160
      ? `${question.body.slice(0, 157).trimEnd()}...`
      : question.body;

  return {
    title: `${question.title} | Vatandoshlar.de`,
    description,
    alternates: {
      canonical: `/${locale}/savol/${question.slug}`,
      languages: {
        uz: `/uz/savol/${question.slug}`,
        de: `/de/savol/${question.slug}`,
      },
    },
    openGraph: {
      type: "article",
      siteName: "Vatandoshlar.de",
      title: question.title,
      description,
      url: `/${locale}/savol/${question.slug}`,
      locale: locale === "de" ? "de_DE" : "uz_UZ",
    },
  };
}

export default async function SavolDetailPage({
  params,
}: SavolDetailPageProps) {
  const locale = resolveLocale(await getLocale());
  const t = copy[locale];
  const { slug } = await params;

  const question = await getPublishedQuestionBySlug(slug);

  if (!question) {
    notFound();
  }

  const [answers, categories] = await Promise.all([
    getPublishedAnswersForQuestion(question.id),
    getActiveQuestionCategories(),
  ]);

  const category = categories.find((item) => item.id === question.categoryId);
  const categoryLabel = category
    ? locale === "de"
      ? category.labelDe
      : category.labelUz
    : null;

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main>
        <article>
          <header className="border-b border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="mx-auto max-w-4xl px-6 py-14 sm:py-16 lg:px-8">
              <Link
                href="/savol"
                className="inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
              >
                ← {t.back}
              </Link>

              <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>{t.questionLabel}</span>
                {categoryLabel ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      {categoryLabel}
                    </span>
                  </>
                ) : null}
                <span aria-hidden="true">·</span>
                <time dateTime={question.createdAt}>
                  {formatDate(question.createdAt, locale)}
                </time>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {question.title}
              </h1>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
            <div className="whitespace-pre-line text-base leading-8 text-slate-700 dark:text-slate-200">
              {question.body}
            </div>

            <section
              aria-labelledby="answer-form-heading"
              className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800"
            >
              <h2
                id="answer-form-heading"
                className="text-2xl font-bold tracking-tight"
              >
                {t.yourAnswer}
              </h2>
              <CreateAnswerForm locale={locale} slug={question.slug} />
            </section>

            <section
              aria-labelledby="answers-heading"
              className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800"
            >
              <h2 id="answers-heading" className="text-2xl font-bold tracking-tight">
                {t.answers}
              </h2>

              {answers.length === 0 ? (
                <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
                  {t.noAnswers}
                </p>
              ) : (
                <div className="mt-6 space-y-4">
                  {answers.map((answer) => (
                    <article
                      key={answer.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50"
                    >
                      <p className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-200">
                        {answer.body}
                      </p>
                      <time
                        dateTime={answer.createdAt}
                        className="mt-4 block text-xs text-slate-500 dark:text-slate-400"
                      >
                        {formatDate(answer.createdAt, locale)}
                      </time>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
