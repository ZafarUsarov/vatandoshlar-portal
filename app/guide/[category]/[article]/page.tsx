import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Header from "../../../../components/Header";
import GuideArticlePage from "../../../../components/guide/GuideArticlePage";
import {
  getAdjacentGuideArticles,
  getGuideArticleBySlug,
  getGuideArticleStaticParams,
  getGuideCategoryBySlug,
  getRelatedGuideArticles,
} from "../../../../data/guide";
import type { SupportedGuideLocale } from "../../../../types/guide";

type GuideArticleRouteProps = Readonly<{
  params: Promise<{
    category: string;
    article: string;
  }>;
}>;

export function generateStaticParams() {
  return getGuideArticleStaticParams();
}

export async function generateMetadata({
  params,
}: GuideArticleRouteProps): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedGuideLocale;
  const { category, article } = await params;

  const guideArticle = getGuideArticleBySlug(
    category,
    article,
    locale,
  );

  if (!guideArticle) {
    return {
      title:
        locale === "uz"
          ? "Qo‘llanma topilmadi | Vatandoshlar.de"
          : "Leitfaden nicht gefunden | Vatandoshlar.de",
    };
  }

  return {
    title: `${guideArticle.title} | Vatandoshlar.de`,
    description: guideArticle.excerpt,
    alternates: {
      canonical: `/guide/${category}/${article}`,
    },
    openGraph: {
      type: "article",
      title: guideArticle.title,
      description: guideArticle.excerpt,
      siteName: "Vatandoshlar.de",
    },
  };
}

export default async function GuideArticleRoute({
  params,
}: GuideArticleRouteProps) {
  const locale =
    (await getLocale()) as SupportedGuideLocale;
  const { category: categorySlug, article: articleSlug } =
    await params;

  const category = getGuideCategoryBySlug(
    categorySlug,
    locale,
  );
  const article = getGuideArticleBySlug(
    categorySlug,
    articleSlug,
    locale,
  );

  if (!category || !article) {
    notFound();
  }

  const relatedArticles = getRelatedGuideArticles(
    article,
    locale,
  );
  const { previous, next } = getAdjacentGuideArticles(
    categorySlug,
    articleSlug,
    locale,
  );

  const footer =
    locale === "uz"
      ? "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma"
      : "Digitale Plattform für Usbeken in Deutschland";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    dateModified: article.lastReviewedAt,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "Vatandoshlar.de",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Header />

      <GuideArticlePage
        article={article}
        category={category}
        relatedArticles={relatedArticles}
        previousArticle={previous}
        nextArticle={next}
        locale={locale}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">
          <p>© 2026 Vatandoshlar.de</p>
          <p>{footer}</p>
        </div>
      </footer>
    </>
  );
}
