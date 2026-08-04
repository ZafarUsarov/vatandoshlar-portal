import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SpecialistProfile from "@/components/specialists/SpecialistProfile";
import {
  getSpecialistBySlug,
  specialists,
} from "@/data/specialists";
import type {
  SpecialistCategory,
  SpecialistLanguage,
  SupportedLocale,
} from "@/types/specialist";

type SpecialistDetailPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export function generateStaticParams() {
  return specialists
    .filter((specialist) => specialist.profilePublished)
    .map((specialist) => ({
      slug: specialist.slug,
    }));
}

export async function generateMetadata({
  params,
}: SpecialistDetailPageProps): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations(
    "SpecialistDetailPage.metadata",
  );
  const { slug } = await params;
  const specialist = getSpecialistBySlug(slug, locale);

  if (!specialist || !specialist.profilePublished) {
    return {
      title: t("notFound"),
    };
  }

  return {
    title: t("title", {
      name: specialist.name,
    }),
    description: specialist.shortDescription,
  };
}

export default async function SpecialistDetailPage({
  params,
}: SpecialistDetailPageProps) {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations("SpecialistDetailPage");
  const { slug } = await params;
  const specialist = getSpecialistBySlug(slug, locale);

  if (!specialist || !specialist.profilePublished) {
    notFound();
  }

  const categoryKeys: ReadonlyArray<SpecialistCategory> = [
    "medical",
    "legal",
    "technology",
    "automotive",
    "home",
    "education",
    "language-teaching",
    "academic-documents",
    "beauty",
    "finance",
    "creative",
  ];

  const categoriesMap = Object.fromEntries(
    categoryKeys.map((category) => [
      category,
      t(`categories.${category}`),
    ]),
  ) as Record<SpecialistCategory, string>;

  const languageKeys: ReadonlyArray<SpecialistLanguage> = [
    "uz",
    "de",
    "ru",
    "en",
    "tr",
  ];

  const languagesMap = Object.fromEntries(
    languageKeys.map((language) => [
      language,
      t(`languagesMap.${language}`),
    ]),
  ) as Partial<
    Record<SpecialistLanguage, string>
  >;

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <SpecialistProfile
        specialist={specialist}
        labels={{
          backToDirectory: t("backToDirectory"),
          verified: t("verified"),
          notVerified: t("notVerified"),
          premium: t("premium"),
          sponsored: t("sponsored"),
          location: t("location"),
          languages: t("languages"),
          services: t("services"),
          pricing: t("pricing"),
          contact: t("contact.title"),
          contactDescription: t(
            "contact.description",
          ),
          phone: t("contact.phone"),
          email: t("contact.email"),
          website: t("contact.website"),
          whatsapp: t("contact.whatsapp"),
          telegram: t("contact.telegram"),
          instagram: t("contact.instagram"),
          youtube: t("contact.youtube"),
          facebook: t("contact.facebook"),
          categories: t("categoriesTitle"),
          code: t("code"),
          categoriesMap,
          languagesMap,
        }}
      />

      <Footer />
    </div>
  );
}
