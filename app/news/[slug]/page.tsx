import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import NewsCard from "../../../components/cards/NewsCard";
import {
  formatNewsDate,
  getLatestNews,
  getNewsBySlug,
  news,
} from "../../../data/news";
import { Link } from "../../../i18n/navigation";
import type { NewsItem } from "../../../types/news";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getNewsBySlug(slug);
  const t = await getTranslations("NewsDetailPage");

  if (!article) {
    return { title: t("metadata.notFound") };
  }

  const key = String(article.id);
  const title = t(`items.${key}.title`);
  const description = t(`items.${key}.excerpt`);

  return {
    title: t("metadata.title", { title }),
    description,
    alternates: {
      canonical: `/${locale}/news/${article.slug}`,
      languages: {
        uz: `/uz/news/${article.slug}`,
        de: `/de/news/${article.slug}`,
      },
    },
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("NewsDetailPage");
  const articleBase = getNewsBySlug(slug);

  if (!articleBase) notFound();

  const localizeItem = (item: NewsItem): NewsItem => {
    const key = String(item.id);

    return {
      ...item,
      title: t(`items.${key}.title`),
      excerpt: t(`items.${key}.excerpt`),
      content: t.raw(`items.${key}.content`) as string[],
      category: t(`items.${key}.category`),
      contentType: t(`items.${key}.contentType`) as NewsItem["contentType"],
      readingTime: t(`items.${key}.readingTime`),
      sourceLanguage: t(`items.${key}.sourceLanguage`),
      location: item.location ? t(`items.${key}.location`) : undefined,
    };
  };

  const article = localizeItem(articleBase);
  const relatedNews = getLatestNews()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3)
    .map(localizeItem);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <article>
          <header className="border-b border-slate-200 bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
            <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-slate-900"
              >
                ← {t("backToAll")}
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  {article.category}
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {article.contentType}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {article.readingTime}
                </span>
                {article.location && (
                  <>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
                    <span className="text-slate-500 dark:text-slate-400">{article.location}</span>
                  </>
                )}
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl sm:leading-tight">
                {article.title}
              </h1>

              <p className="mt-7 text-xl leading-8 text-slate-600 dark:text-slate-300">
                {article.excerpt}
              </p>

              <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("lastVerified", {
                    date: formatNewsDate(article.verifiedAt, locale),
                  })}
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
            <div className="space-y-7">
              {article.content.map((paragraph, index) => (
                <p
                  key={`${article.slug}-${index}`}
                  className="text-lg leading-9 text-slate-700 dark:text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <section className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-8 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                {t("source.eyebrow")}
              </p>
              <h2 className="mt-3 text-xl font-bold text-emerald-950 dark:text-emerald-100">
                {article.sourceName}
              </h2>

              <dl className="mt-5 space-y-3 text-sm text-emerald-900 dark:text-emerald-200">
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="font-semibold">{t("source.language")}</dt>
                  <dd>{article.sourceLanguage}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="font-semibold">{t("source.verified")}</dt>
                  <dd>
                    <time dateTime={article.verifiedAt}>
                      {formatNewsDate(article.verifiedAt, locale)}
                    </time>
                  </dd>
                </div>
              </dl>

              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-950"
              >
                {t("source.open")} ↗
              </a>
            </section>

            <aside className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7 dark:border-amber-500/20 dark:bg-amber-500/10">
              <p className="font-semibold text-amber-950 dark:text-amber-100">
                {t("disclaimer.title")}
              </p>
              <p className="mt-3 leading-7 text-amber-900 dark:text-amber-200">
                {t("disclaimer.description")}
              </p>
            </aside>

            <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t("preparedNote")}
              </p>
              <Link
                href="/news"
                className="shrink-0 font-semibold text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-slate-950"
              >
                {t("backToAll")} →
              </Link>
            </div>
          </div>
        </article>

        <section className="border-t border-slate-200 bg-slate-50 py-20 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              {t("related.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold">{t("related.title")}</h2>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 transition-colors dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">
          <p>© 2026 Vatandoshlar.de</p>
          <p>{t("footer")}</p>
        </div>
      </footer>
    </>
  );
}
