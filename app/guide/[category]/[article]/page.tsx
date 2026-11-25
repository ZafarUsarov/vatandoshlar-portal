import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import ContentViewTracker from "../../../../components/content-views/ContentViewTracker";
import { Link } from "../../../../i18n/navigation";
import GuideArticlePage from "../../../../components/guide/GuideArticlePage";
import {
  getGuideCategoryBySlug,
} from "../../../../data/guide";
import {
  getPublishedGuideArticleBySlug,
  getRelatedPublishedGuideArticles,
  isPublicGuideCategorySlug,
} from "../../../../lib/guide/public-guide-repository";
import type {
  SupportedGuideLocale,
} from "../../../../types/guide";

type GuideArticleRouteProps = Readonly<{
  params: Promise<{
    category: string;
    article: string;
  }>;
}>;

export const dynamic =
  "force-dynamic";

const baseUrl =
  "https://uzde.de";

function serializeStructuredData(
  data: object,
): string {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  );
}

export async function generateMetadata({
  params,
}: GuideArticleRouteProps): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedGuideLocale;

  const {
    category: categorySlug,
    article: articleSlug,
  } =
    await params;

  if (
    !isPublicGuideCategorySlug(
      categorySlug,
    )
  ) {
    return {
      title:
        locale === "uz"
          ? "Qo‘llanma topilmadi | UzDe"
          : "Leitfaden nicht gefunden | UzDe",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const guideArticle =
    await getPublishedGuideArticleBySlug(
      categorySlug,
      articleSlug,
      locale,
    );

  if (!guideArticle) {
    return {
      title:
        locale === "uz"
          ? "Qo‘llanma topilmadi | UzDe"
          : "Leitfaden nicht gefunden | UzDe",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title:
      `${guideArticle.title} | UzDe`,

    description:
      guideArticle.excerpt,

    alternates: {
      canonical:
        `/${locale}/guide/${categorySlug}/${articleSlug}`,

      languages: {
        uz:
          `/uz/guide/${categorySlug}/${articleSlug}`,
        de:
          `/de/guide/${categorySlug}/${articleSlug}`,
      },
    },

    openGraph: {
      type:
        "article",
      title:
        guideArticle.title,
      description:
        guideArticle.excerpt,
      url:
        `/${locale}/guide/${categorySlug}/${articleSlug}`,
      siteName:
        "UzDe",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
    },
    twitter: {
      card: "summary",
      title:
        guideArticle.title,
      description:
        guideArticle.excerpt,
    },
  };
}

export default async function GuideArticleRoute({
  params,
}: GuideArticleRouteProps) {
  const locale =
    (await getLocale()) as SupportedGuideLocale;

  const {
    category: categorySlug,
    article: articleSlug,
  } =
    await params;

  if (
    !isPublicGuideCategorySlug(
      categorySlug,
    )
  ) {
    notFound();
  }

  const [
    category,
    article,
  ] =
    await Promise.all([
      Promise.resolve(
        getGuideCategoryBySlug(
          categorySlug,
          locale,
        ),
      ),

      getPublishedGuideArticleBySlug(
        categorySlug,
        articleSlug,
        locale,
      ),
    ]);

  if (
    !category ||
    !article
  ) {
    notFound();
  }

  const relatedArticles =
    await getRelatedPublishedGuideArticles(
      article,
      locale,
      4,
    );

  const articleUrl =
    `${baseUrl}/${locale}/guide/${categorySlug}/${article.slug}`;

  const articleJsonLd = {
    "@context":
      "https://schema.org",
    "@type":
      "Article",
    headline:
      article.title,
    description:
      article.excerpt,
    url:
      articleUrl,
    mainEntityOfPage: {
      "@type":
        "WebPage",
      "@id":
        articleUrl,
    },
    dateModified:
      article.updatedAt,
    inLanguage:
      locale === "de"
        ? "de-DE"
        : "uz-UZ",
    publisher: {
      "@type":
        "Organization",
      name:
        "UzDe",
      url:
        baseUrl,
    },
    isPartOf: {
      "@type":
        "WebSite",
      name:
        "UzDe",
      url:
        baseUrl,
    },
  };

  const faqJsonLd = {
    "@context":
      "https://schema.org",
    "@type":
      "FAQPage",
    mainEntity:
      article.faq.map(
        (item) => ({
          "@type":
            "Question",
          name:
            item.question,
          acceptedAnswer: {
            "@type":
              "Answer",
            text:
              item.answer,
          },
        }),
      ),
  };

  return (
    <>
      <Header />

      {article.databaseId && (
        <ContentViewTracker
          contentType="guide"
          contentId={article.databaseId}
        />
      )}

      <GuideArticlePage
        article={article}
        category={category}
        locale={locale}
        relatedArticles={relatedArticles}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeStructuredData(
              articleJsonLd,
            ),
        }}
      />

      {article.faq.length >
        0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              serializeStructuredData(
                faqJsonLd,
              ),
          }}
        />
      )}

      <aside className="border-t border-slate-200 bg-[#F7FAFB] dark:border-slate-800 dark:bg-[#091B29]">
        <div className="mx-auto flex w-full max-w-[var(--uzde-layout-width)] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[clamp(16px,3.3vw,112px)] py-5">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {locale === "uz" ? "Germaniyadagi yangiliklar" : "Nachrichten aus Deutschland"}
          </p>
          <Link
            href="/news"
            className="inline-flex min-h-11 items-center gap-2 border-b border-slate-400 text-sm font-semibold text-slate-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 dark:border-slate-600 dark:text-slate-100 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
          >
            {locale === "uz" ? "Yangiliklarni körish" : "Nachrichten ansehen"}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </aside>

      <Footer />
    </>
  );
}
