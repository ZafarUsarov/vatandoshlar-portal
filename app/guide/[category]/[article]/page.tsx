import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import SectionPromo from "../../../../components/SectionPromo";
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
          ? "Qo‘llanma topilmadi | Vatandoshlar.de"
          : "Leitfaden nicht gefunden | Vatandoshlar.de",
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
          ? "Qo‘llanma topilmadi | Vatandoshlar.de"
          : "Leitfaden nicht gefunden | Vatandoshlar.de",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title:
      `${guideArticle.title} | Vatandoshlar.de`,

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
        "Vatandoshlar.de",
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
      3,
    );

  const articleJsonLd = {
    "@context":
      "https://schema.org",
    "@type":
      "Article",
    headline:
      article.title,
    description:
      article.excerpt,
    dateModified:
      article.updatedAt,
    inLanguage:
      locale,
    isPartOf: {
      "@type":
        "WebSite",
      name:
        "Vatandoshlar.de",
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
            JSON.stringify(
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
              JSON.stringify(
                faqJsonLd,
              ),
          }}
        />
      )}

      <SectionPromo target="news" />

      <Footer />
    </>
  );
}
