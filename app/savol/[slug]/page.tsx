import { listAnswerAttachments } from "@/lib/savol/answer-attachment-repository";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PublicUserAvatar from "@/components/account/PublicUserAvatar";
import CreateAnswerForm from "@/components/savol/CreateAnswerForm";
import OwnAnswerControls from "@/components/savol/OwnAnswerControls";
import OwnQuestionMenu from "@/components/savol/OwnQuestionMenu";
import { getPublishedAnswerReplies } from "@/lib/savol/answer-replies-repository";
import ShareQuestionButton from "@/components/savol/ShareQuestionButton";
import SavolAttachmentGallery from "@/components/savol/SavolAttachmentGallery";
import SavolInteractions from "@/components/savol/SavolInteractions";
import ReportContentForm from "@/components/savol/ReportContentForm";
import AnswerVoteButtons from "@/components/savol/AnswerVoteButtons";
import ThreadBranch from "@/components/savol/ThreadBranch";
import CommentThread from "@/components/savol/CommentThread";
import { getAnswerDownvoteCounts } from "@/lib/savol/answer-votes-repository";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, MessageCircle, Plus, SquarePen } from "lucide-react";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { getSavolAuthorProfiles } from "@/lib/savol/savol-author-names";
import { getQuestionAttachments } from "@/lib/savol/savol-attachment-repository";
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
    notFound: "Savol topilmadi | UzDe",
    answers: "Javoblar",
    noAnswers: "Hozircha javob yo‘q.",
    back: "Barcha savollar",
    questionLabel: "Savol",
    yourAnswer: "Javob yozish",
    edit: "Tahrirlash",
  },
  de: {
    notFound: "Frage nicht gefunden | UzDe",
    answers: "Antworten",
    noAnswers: "Noch keine Antworten.",
    back: "Alle Fragen",
    questionLabel: "Frage",
    yourAnswer: "Antwort schreiben",
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
    title: `${question.title} | UzDe`,
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
      siteName: "UzDe",
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
  const [answers, followCount] = await Promise.all([
    getPublishedAnswersForQuestion(question.id),
    getQuestionFollowCount(question.id),
  ]);

  const attachments = await getQuestionAttachments(question.id);
  const answerAttachments = await listAnswerAttachments(answers.map((answer) => answer.id));
  const repliesByAnswer = await getPublishedAnswerReplies(answers.map((answer) => answer.id));
  const authorProfiles = await getSavolAuthorProfiles([
    question.authorUserId,
    ...answers.map((answer) => answer.authorUserId),
    ...Array.from(repliesByAnswer.values()).flat().map((reply) => reply.authorUserId),
  ]);
  const authorLabel = (id: string) =>
    authorProfiles.get(id)?.displayName ?? (locale === "de" ? "Mitglied" : "Foydalanuvchi");

  const helpfulCounts = await getAnswerHelpfulCounts(
    answers.map((answer) => answer.id),
  );

  const downvoteCounts = await getAnswerDownvoteCounts(answers.map((answer) => answer.id));

  const readyAttachments = attachments.filter((attachment) => attachment.status === "ready");
  const initials = (id: string) => authorLabel(id).split(/\s+/).slice(0, 2).map((word) => word.charAt(0)).join("").toUpperCase();
  const avatar = (id: string) => (
    <PublicUserAvatar
      name={authorLabel(id)}
      avatarUrl={authorProfiles.get(id)?.avatarUrl}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/savol" className="inline-flex items-center gap-1.5 transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"><ArrowLeft size={16} />{t.back}</Link>
          <span aria-hidden="true">/</span><span className="truncate">{t.questionLabel}</span>
        </nav>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_270px]">
          <div className="min-w-0 space-y-5">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                {avatar(question.authorUserId)}
                <span className="font-semibold text-slate-900 dark:text-white">{authorLabel(question.authorUserId)}</span>
                <time dateTime={question.createdAt}>{formatDate(question.createdAt, locale)}</time>
                {categoryLabel && <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{categoryLabel}</span>}
              </div>
              {isOwner && <OwnQuestionMenu locale={locale} slug={question.slug} />}
              </div>
              <h1 className="mt-5 break-words text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{question.title}</h1>
              <div className="mt-4 whitespace-pre-wrap break-words text-sm leading-[1.55rem] font-normal text-slate-800 dark:text-slate-200">{question.body}</div>
              <SavolAttachmentGallery locale={locale} items={readyAttachments.map((a) => ({ id: a.id, fileName: a.fileName, contentType: a.contentType, byteSize: a.byteSize }))} />
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <ShareQuestionButton locale={locale} />
                <SavolInteractions kind="follow" locale={locale} slug={question.slug} targetId={question.id} count={followCount} />
                {!isOwner && <ReportContentForm locale={locale} slug={question.slug} targetType="question" targetId={question.id} />}
              </div>
            </article>
            <section aria-labelledby="answers-heading" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800"><h2 id="answers-heading" className="text-xl font-bold">{t.answers} ({answers.length})</h2><MessageCircle size={19} className="text-emerald-600" /></div>
              {answers.length === 0 && <p className="py-5 text-sm text-slate-500 dark:text-slate-400">{t.noAnswers}</p>}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {answers.map((answer) => <article key={answer.id} id={`answer-${answer.id}`} className="relative py-4 first:pt-1">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 shrink-0">{avatar(answer.authorUserId)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pr-11 text-xs"><span className="font-semibold text-slate-900 dark:text-white">{authorLabel(answer.authorUserId)}</span><time dateTime={answer.createdAt} className="text-slate-500 dark:text-slate-400">{formatDate(answer.createdAt, locale)}</time></div>
                      <OwnAnswerControls locale={locale} slug={question.slug} answerId={answer.id} body={answer.body} isOwner={currentUser?.user.id === answer.authorUserId} />
                      <SavolAttachmentGallery locale={locale} items={(answerAttachments.get(answer.id) ?? []).map(a => ({id:a.id,fileName:a.fileName,contentType:a.contentType,byteSize:a.byteSize}))} endpoint="answer" compact />
                      <div className="mt-2 flex flex-wrap items-center gap-2"><AnswerVoteButtons locale={locale} slug={question.slug} answerId={answer.id} upCount={helpfulCounts.get(answer.id) ?? 0} downCount={downvoteCounts.get(answer.id) ?? 0} /></div>
                    </div>
                  </div>
                  {(repliesByAnswer.get(answer.id) ?? []).length > 0 && (
                    <div className="ml-[18px] mt-2 min-w-0">
                      <ThreadBranch locale={locale} count={(repliesByAnswer.get(answer.id) ?? []).length}>
                        <CommentThread
                          currentUserId={currentUser?.user.id}
                          locale={locale}
                          slug={question.slug}
                          answerId={answer.id}
                          replies={(repliesByAnswer.get(answer.id) ?? []).map((reply) => ({ ...reply, authorName: authorLabel(reply.authorUserId), authorInitials: initials(reply.authorUserId), authorAvatarUrl: authorProfiles.get(reply.authorUserId)?.avatarUrl ?? null, formattedDate: formatDate(reply.createdAt, locale) }))}
                        />
                      </ThreadBranch>
                    </div>
                  )}
                </article>)}
              </div>
              {!isOwner && <section aria-labelledby="answer-form-heading" className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800"><h3 id="answer-form-heading" className="mb-3 text-lg font-bold">{t.yourAnswer}</h3><CreateAnswerForm locale={locale} slug={question.slug} /></section>}
            </section>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-emerald-900/40 dark:from-emerald-950/30 dark:to-slate-900"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400"><SquarePen size={23} /></div><h2 className="mt-4 text-lg font-bold">{locale === "de" ? "Haben Sie eine Frage?" : "Savolingiz bormi?"}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{locale === "de" ? "Teilen Sie Ihre Frage mit der Community und profitieren Sie vom Wissen und den Erfahrungen anderer." : "Savolingizni hamjamiyat bilan bo‘lishing va vatandoshlarimizning bilim hamda tajribalaridan foydalaning."}</p><Link href="/savol/new" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"><Plus size={18} />{locale === "de" ? "Frage stellen" : "Yangi savol berish"}</Link></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-bold">{locale === "de" ? "Community" : "Hamjamiyat"}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{locale === "de" ? "Fragen stellen, Erfahrungen teilen und gemeinsam Lösungen finden." : "Savollar bering, tajriba ulashing va birgalikda yechim toping."}</p><Link href="/savol" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"><ArrowLeft size={15} />{t.back}</Link></div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
