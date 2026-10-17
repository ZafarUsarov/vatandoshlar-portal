import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CreateAnswerForm from "@/components/savol/CreateAnswerForm";
import AnswerReplyForm from "@/components/savol/AnswerReplyForm";
import { getPublishedAnswerReplies } from "@/lib/savol/answer-replies-repository";
import SavolInteractions from "@/components/savol/SavolInteractions";
import ReportContentForm from "@/components/savol/ReportContentForm";
import { Link } from "@/i18n/navigation";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { getSavolAuthorNames } from "@/lib/savol/savol-author-names";
import { getPublishedGuideArticlesForQuestion } from "@/lib/guide/public-guide-repository";
import { getPublishedSpecialistsForQuestion } from "@/lib/specialists/public-specialists-repository";
import {
  getActiveQuestionCategories,
  getAnswerHelpfulCounts,
  getPublishedAnswersForQuestion,
  getPublishedQuestionBySlug,
  getQuestionFollowCount,
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
    relatedKnowledge: "Foydali qo‘llanmalar",
    relatedKnowledgeHint: "Savolingizga aloqador Vatandoshlar.de qo‘llanmalari.",
    relatedSpecialists: "Mos mutaxassislar",
    relatedSpecialistsHint: "Savol mavzusiga mos Vatandoshlar.de mutaxassislari.",
    openGuide: "Qo‘llanmani ochish",
    openSpecialist: "Profilni ochish",
    verified: "Tasdiqlangan",
    edit: "Tahrirlash",
  },
  de: {
    notFound: "Frage nicht gefunden | Vatandoshlar.de",
    answers: "Antworten",
    noAnswers: "Noch keine Antworten.",
    back: "Alle Fragen",
    questionLabel: "Frage",
    yourAnswer: "Antwort schreiben",
    relatedKnowledge: "Hilfreiche Ratgeber",
    relatedKnowledgeHint: "Passende Ratgeber von Vatandoshlar.de zu dieser Frage.",
    relatedSpecialists: "Passende Fachleute",
    relatedSpecialistsHint: "Fachleute auf Vatandoshlar.de, die zum Thema passen.",
    openGuide: "Ratgeber öffnen",
    openSpecialist: "Profil öffnen",
    verified: "Verifiziert",
    edit: "Bearbeiten",
  },
} as const;

function resolveLocale(locale: string): SupportedLocale {
  return locale === "de" ? "de" : "uz";
}

function formatDate(value: string, locale: SupportedLocale): string {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "uz-UZ", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
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

  const currentUser = await getCurrentPublicUser();
  const isOwner = currentUser?.user.id === question.authorUserId;
  const categories = await getActiveQuestionCategories();
  const category = categories.find((item) => item.id === question.categoryId);
  const categoryLabel = category
    ? locale === "de"
      ? category.labelDe
      : category.labelUz
    : null;
  const knowledgeQuery = [question.title, question.body, categoryLabel].filter(Boolean).join(" ");

  const [answers, followCount, relatedGuides, relatedSpecialists] = await Promise.all([
    getPublishedAnswersForQuestion(question.id),
    getQuestionFollowCount(question.id),
    getPublishedGuideArticlesForQuestion(knowledgeQuery, locale, 3),
    getPublishedSpecialistsForQuestion(knowledgeQuery, locale, 3),
  ]);

  const repliesByAnswer = await getPublishedAnswerReplies(answers.map((answer) => answer.id));
  const authorNames = await getSavolAuthorNames([
    question.authorUserId,
    ...answers.map((answer) => answer.authorUserId),
    ...Array.from(repliesByAnswer.values()).flat().map((reply) => reply.authorUserId),
  ]);
  const authorLabel = (id: string) =>
    authorNames.get(id) ?? (locale === "de" ? "Mitglied" : "Foydalanuvchi");

  const helpfulCounts = await getAnswerHelpfulCounts(
    answers.map((answer) => answer.id),
  );

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main className="pt-20 sm:pt-24">
        <article>
          <header className="border-b border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="mx-auto max-w-4xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
              <Link
                href="/savol"
                className="inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
              >
                ← {t.back}
              </Link>

              <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>{t.questionLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{authorLabel(question.authorUserId)}</span>
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

          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="whitespace-pre-wrap break-words rounded-2xl border border-slate-200 bg-white p-5 text-[15px] leading-7 text-slate-700 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200">
              {question.body}
            </div>

            <div className="mt-8 flex flex-wrap items-start gap-4">
              <SavolInteractions
                kind="follow"
                locale={locale}
                slug={question.slug}
                targetId={question.id}
                count={followCount}
              />
              {isOwner ? (
                <Link href={`/savol/${question.slug}/edit`} className="inline-flex items-center rounded-xl border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950">
                  ✎ {t.edit}
                </Link>
              ) : (
                <ReportContentForm locale={locale} slug={question.slug} targetType="question" targetId={question.id} />
              )}
            </div>

            {!isOwner ? <section
              aria-labelledby="answer-form-heading"
              className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800"
            >
              <h2
                id="answer-form-heading"
                className="text-2xl font-bold tracking-tight"
              >
                {t.yourAnswer}
              </h2>
              <CreateAnswerForm locale={locale} slug={question.slug} />
            </section> : null}

            <section
              aria-labelledby="answers-heading"
              className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800"
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
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{authorLabel(answer.authorUserId)}</span>
                        <time dateTime={answer.createdAt}>{formatDate(answer.createdAt, locale)}</time>
                      </div>
                      <p className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-200">
                        {answer.body}
                      </p>
                      <div className="mt-4 flex flex-wrap items-start gap-4">
                        <SavolInteractions
                          kind="helpful"
                          locale={locale}
                          slug={question.slug}
                          targetId={answer.id}
                          count={helpfulCounts.get(answer.id) ?? 0}
                        />
                        {currentUser?.user.id !== answer.authorUserId ? (
                          <ReportContentForm locale={locale} slug={question.slug} targetType="answer" targetId={answer.id} />
                        ) : null}
                      </div>
                      {(repliesByAnswer.get(answer.id) ?? []).length > 0 ? (
                        <div className="mt-5 space-y-3 border-l-2 border-emerald-200 pl-4 dark:border-emerald-900" aria-label={locale === "de" ? "Kommentare" : "Izohlar"}>
                          {(repliesByAnswer.get(answer.id) ?? []).map((reply) => (
                            <div key={reply.id} className="rounded-xl bg-white p-3 dark:bg-slate-950/70">
                              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <span className="font-semibold text-slate-800 dark:text-slate-100">{authorLabel(reply.authorUserId)}</span>
                                <time dateTime={reply.createdAt}>{formatDate(reply.createdAt, locale)}</time>
                              </div>
                              <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 dark:text-slate-200">{reply.body}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <AnswerReplyForm locale={locale} slug={question.slug} answerId={answer.id} />
                    </article>
                  ))}
                </div>
              )}
            </section>
            {(relatedGuides.length > 0 || relatedSpecialists.length > 0) ? (
              <section
                aria-labelledby="knowledge-heading"
                className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800"
              >
                <h2 id="knowledge-heading" className="text-2xl font-bold tracking-tight">
                  {t.relatedKnowledge}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t.relatedKnowledgeHint}
                </p>

                {relatedGuides.length > 0 ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {relatedGuides.map((guide) => (
                      <article key={guide.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
                        <h3 className="font-bold leading-6">{guide.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{guide.excerpt}</p>
                        <Link href={`/guide/${guide.categorySlug}/${guide.slug}`} className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
                          {t.openGuide} →
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : null}

                {relatedSpecialists.length > 0 ? (
                  <div className="mt-10">
                    <h3 className="text-lg font-bold">{t.relatedSpecialists}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.relatedSpecialistsHint}</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {relatedSpecialists.map((specialist) => (
                        <article key={specialist.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/50">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold">{specialist.name}</h4>
                            {specialist.status.verified ? (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">{t.verified}</span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{specialist.profession}</p>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{specialist.shortDescription}</p>
                          <Link href={`/specialists/${specialist.slug}`} className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
                            {t.openSpecialist} →
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
