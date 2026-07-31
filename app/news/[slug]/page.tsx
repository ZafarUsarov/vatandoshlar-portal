import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import NewsCard from "../../../components/NewsCard";
import {
  formatNewsDate,
  getLatestNews,
  getNewsBySlug,
  news,
} from "../../../data/news";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return {
      title: "Ma’lumot topilmadi | Vatandoshlar.de",
    };
  }

  return {
    title: `${article.title} | Vatandoshlar.de`,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${article.slug}`,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = getLatestNews()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950">
        <article>
          {/* ARTICLE HEADER */}
          <header className="border-b border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                ← Barcha materiallar
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
                  {article.category}
                </span>

                <span className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">
                  {article.contentType}
                </span>

                <span className="text-slate-500">
                  {article.readingTime}
                </span>

                {article.location && (
                  <>
                    <span
                      className="text-slate-300"
                      aria-hidden="true"
                    >
                      •
                    </span>

                    <span className="text-slate-500">
                      {article.location}
                    </span>
                  </>
                )}
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl sm:leading-tight">
                {article.title}
              </h1>

              <p className="mt-7 text-xl leading-8 text-slate-600">
                {article.excerpt}
              </p>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="text-sm text-slate-500">
                  Ma’lumot oxirgi marta{" "}
                  <time dateTime={article.verifiedAt}>
                    {formatNewsDate(article.verifiedAt)}
                  </time>{" "}
                  kuni tekshirildi.
                </p>
              </div>
            </div>
          </header>

          {/* ARTICLE CONTENT */}
          <div className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
            <div className="space-y-7">
              {article.content.map((paragraph, index) => (
                <p
                  key={`${article.slug}-${index}`}
                  className="text-lg leading-9 text-slate-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* OFFICIAL SOURCE */}
            <section className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Rasmiy manba
              </p>

              <h2 className="mt-3 text-xl font-bold text-emerald-950">
                {article.sourceName}
              </h2>

              <dl className="mt-5 space-y-3 text-sm text-emerald-900">
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="font-semibold">
                    Manba tili:
                  </dt>

                  <dd>{article.sourceLanguage}</dd>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <dt className="font-semibold">
                    Oxirgi tekshiruv:
                  </dt>

                  <dd>
                    <time dateTime={article.verifiedAt}>
                      {formatNewsDate(article.verifiedAt)}
                    </time>
                  </dd>
                </div>
              </dl>

              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Rasmiy manbani ochish ↗
              </a>
            </section>

            {/* DISCLAIMER */}
            <aside className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7">
              <p className="font-semibold text-amber-950">
                Muhim eslatma
              </p>

              <p className="mt-3 leading-7 text-amber-900">
                Qonunlar, to‘lovlar, ariza talablari,
                muddatlar va idoralarning ish tartibi
                o‘zgarishi mumkin. Rasmiy harakatni
                boshlashdan oldin yuqoridagi birlamchi
                manbani qayta tekshiring.
              </p>
            </aside>

            <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Material rasmiy manba asosida
                Vatandoshlar.de uchun o‘zbek tilida
                tayyorlandi.
              </p>

              <Link
                href="/news"
                className="shrink-0 font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Barcha materiallar →
              </Link>
            </div>
          </div>
        </article>

        {/* RELATED MATERIALS */}
        <section className="border-t border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Foydali ma’lumotlar
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Boshqa materiallar
            </h2>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Vatandoshlar.de</p>

          <p>
            Germaniyadagi o‘zbekistonliklar uchun raqamli
            platforma
          </p>
        </div>
      </footer>
    </>
  );
}