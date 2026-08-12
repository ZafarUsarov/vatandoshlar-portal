import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Footer from "../../../components/Footer";
import SectionPromo from "../../../components/SectionPromo";
import Header from "../../../components/Header";
import GuideCategoryPage from "../../../components/guide/GuideCategoryPage";
import {
  getGuideCategoryBySlug,
} from "../../../data/guide";
import {
  getPublishedGuideArticlesByCategory,
  isPublicGuideCategorySlug,
} from "../../../lib/guide/public-guide-repository";
import type {
  GuideCategory,
  SupportedGuideLocale,
} from "../../../types/guide";

type GuideCategoryRouteProps = Readonly<{
  params: Promise<{
    category: string;
  }>;
}>;

export const dynamic =
  "force-dynamic";

export async function generateMetadata({
  params,
}: GuideCategoryRouteProps): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedGuideLocale;

  const {
    category: categorySlug,
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
          ? "Qo‘llanma bo‘limi topilmadi | Vatandoshlar.de"
          : "Guide-Bereich nicht gefunden | Vatandoshlar.de",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const category =
    getGuideCategoryBySlug(
      categorySlug,
      locale,
    );

  if (!category) {
    return {
      title:
        locale === "uz"
          ? "Qo‘llanma bo‘limi topilmadi | Vatandoshlar.de"
          : "Guide-Bereich nicht gefunden | Vatandoshlar.de",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title:
      `${category.title} | Vatandoshlar.de`,

    description:
      category.description,

    alternates: {
      canonical:
        `/${locale}/guide/${category.slug}`,

      languages: {
        uz:
          `/uz/guide/${category.slug}`,
        de:
          `/de/guide/${category.slug}`,
      },
    },

    openGraph: {
      title:
        category.title,
      description:
        category.description,
      siteName:
        "Vatandoshlar.de",
    },
  };
}

export default async function GuideCategoryRoute({
  params,
}: GuideCategoryRouteProps) {
  const locale =
    (await getLocale()) as SupportedGuideLocale;

  const {
    category: categorySlug,
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
    categoryBase,
    articles,
  ] =
    await Promise.all([
      Promise.resolve(
        getGuideCategoryBySlug(
          categorySlug,
          locale,
        ),
      ),

      getPublishedGuideArticlesByCategory(
        categorySlug,
        locale,
      ),
    ]);

  if (!categoryBase) {
    notFound();
  }

  const category: GuideCategory = {
    ...categoryBase,

    articleCount:
      articles.length,

    status:
      articles.length > 0
        ? "available"
        : "coming-soon",
  };

  return (
    <>
      <Header />

      <GuideCategoryPage
        category={category}
        articles={articles}
        locale={locale}
      />

      <SectionPromo target="news" />

      <Footer />
    </>
  );
}
