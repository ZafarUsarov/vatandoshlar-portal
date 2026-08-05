import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import GuideCategoryPage from "../../../components/guide/GuideCategoryPage";
import {
  getGuideArticlesByCategory,
  getGuideCategoryBySlug,
  getGuideCategorySlugs,
} from "../../../data/guide";
import type { SupportedGuideLocale } from "../../../types/guide";

type GuideCategoryRouteProps = Readonly<{
  params: Promise<{
    category: string;
  }>;
}>;

export function generateStaticParams() {
  return getGuideCategorySlugs().map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: GuideCategoryRouteProps): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedGuideLocale;
  const { category: categorySlug } = await params;
  const category = getGuideCategoryBySlug(
    categorySlug,
    locale,
  );

  if (!category) {
    return {
      title:
        locale === "uz"
          ? "Yo‘nalish topilmadi | Vatandoshlar.de"
          : "Bereich nicht gefunden | Vatandoshlar.de",
    };
  }

  return {
    title: `${category.title} | Vatandoshlar.de Guide`,
    description: category.description,
    alternates: {
      canonical: `/guide/${category.slug}`,
    },
  };
}

export default async function GuideCategoryRoute({
  params,
}: GuideCategoryRouteProps) {
  const locale =
    (await getLocale()) as SupportedGuideLocale;
  const { category: categorySlug } = await params;

  const category = getGuideCategoryBySlug(
    categorySlug,
    locale,
  );

  if (!category) {
    notFound();
  }

  const articles = getGuideArticlesByCategory(
    category.slug,
    locale,
  );

  const footer =
    locale === "uz"
      ? "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma"
      : "Digitale Plattform für Usbeken in Deutschland";

  return (
    <>
      <Header />

      <GuideCategoryPage
        category={category}
        articles={articles}
        locale={locale}
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
