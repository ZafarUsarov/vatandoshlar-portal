import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditQuestionForm from "@/components/savol/EditQuestionForm";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getActiveQuestionCategories, getPublishedQuestionBySlug } from "@/lib/savol/savol-repository";

export const dynamic = "force-dynamic";
export default async function EditSavolPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const { slug } = await params;
  const user = await requirePublicUser(locale, `/savol/${slug}/edit`);
  const question = await getPublishedQuestionBySlug(slug);
  if (!question || question.authorUserId !== user.user.id) notFound();
  const categories = await getActiveQuestionCategories();
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <Header />
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6">
      <Link href={`/savol/${slug}`} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">← {locale === "de" ? "Zur Frage" : "Savolga qaytish"}</Link>
      <h1 className="mb-6 mt-6 text-3xl font-bold">{locale === "de" ? "Frage bearbeiten" : "Savolni tahrirlash"}</h1>
      <EditQuestionForm question={question} categories={categories} locale={locale} />
    </main><Footer />
  </div>;
}
