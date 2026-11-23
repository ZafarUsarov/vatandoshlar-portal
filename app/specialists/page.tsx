import type { Metadata } from "next";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import Footer from "@/components/Footer";
import SpecialistsJobsPromo from "@/components/specialists/SpecialistsJobsPromo";
import Header from "@/components/Header";
import DirectoryHeader from "@/components/specialists/DirectoryHeader";
import SpecialistsDirectory from "@/components/specialists/SpecialistsDirectory";
import {
  getPublishedSpecialists,
} from "@/lib/specialists/public-specialists-repository";
import type {
  SpecialistCategory,
  SupportedLocale,
} from "@/types/specialist";

type SpecialistsPageProps = Readonly<{
  searchParams: Promise<{
    category?: string;
  }>;
}>;

export const dynamic =
  "force-dynamic";

const categoryKeys: ReadonlyArray<SpecialistCategory> = [
  "medical",
  "legal",
  "technology",
  "translation",
  "entrepreneur",
  "automotive",
  "home",
  "education",
  "language-teaching",
  "academic-documents",
  "beauty",
  "finance",
  "creative",
  "science",
];

function isSpecialistCategory(
  value: string | undefined,
): value is SpecialistCategory {
  return Boolean(
    value &&
      categoryKeys.includes(
        value as SpecialistCategory,
      ),
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedLocale;

  const t =
    await getTranslations(
      "SpecialistsPage.metadata",
    );

  const title =
    t("title");
  const description =
    t("description");

  return {
    title,
    description,
    alternates: {
      canonical:
        `/${locale}/specialists`,
      languages: {
        uz: "/uz/specialists",
        de: "/de/specialists",
      },
    },
    openGraph: {
      type: "website",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
      siteName:
        "UzDe",
      title,
      description,
      url:
        `/${locale}/specialists`,
    },
  };
}

export default async function SpecialistsPage({
  searchParams,
}: SpecialistsPageProps) {
  const locale =
    (await getLocale()) as SupportedLocale;

  const t =
    await getTranslations(
      "SpecialistsPage",
    );

  const { category } =
    await searchParams;

  const localizedSpecialists =
    await getPublishedSpecialists(
      locale,
    );

  const categoryLabels = {
    all:
      t("categories.all"),
    medical:
      t("categories.medical"),
    legal:
      t("categories.legal"),
    technology:
      t("categories.technology"),
    translation:
      t("categories.translation"),
    entrepreneur:
      t("categories.entrepreneur"),
    automotive:
      t("categories.automotive"),
    home:
      t("categories.home"),
    education:
      t("categories.education"),
    "language-teaching":
      t(
        "categories.languageTeaching",
      ),
    "academic-documents":
      t(
        "categories.academicDocuments",
      ),
    beauty:
      t("categories.beauty"),
    finance:
      t("categories.finance"),
    creative:
      t("categories.creative"),
    science:
      t("categories.science"),
  };

  const bundeslandLabels: Record<
    string,
    string
  > = {
    "Baden-Württemberg":
      "Baden-Württemberg",
    Bayern:
      "Bayern",
    Berlin:
      "Berlin",
    Brandenburg:
      "Brandenburg",
    Bremen:
      "Bremen",
    Hamburg:
      "Hamburg",
    Hessen:
      "Hessen",
    "Mecklenburg-Vorpommern":
      "Mecklenburg-Vorpommern",
    Niedersachsen:
      "Niedersachsen",
    "Nordrhein-Westfalen":
      "Nordrhein-Westfalen",
    "Rheinland-Pfalz":
      "Rheinland-Pfalz",
    Saarland:
      "Saarland",
    Sachsen:
      "Sachsen",
    "Sachsen-Anhalt":
      "Sachsen-Anhalt",
    "Schleswig-Holstein":
      "Schleswig-Holstein",
    Thüringen:
      "Thüringen",
  };

  const uniqueCategories =
    new Set(
      localizedSpecialists.flatMap(
        (specialist) =>
          specialist.categories,
      ),
    ).size;

  const verifiedProfiles =
    localizedSpecialists.filter(
      (specialist) =>
        specialist.status.verified,
    ).length;

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-[var(--uzde-page-bg)] dark:text-zinc-100">
      <Header />

      <main className="pt-[66px] lg:pt-20">
        <div className="border-b border-zinc-200 bg-[#f8f8f8] dark:border-white/10 dark:bg-[var(--uzde-page-bg)]">
          <DirectoryHeader
            showFlow={locale === "uz"}
            labels={{
              badge: t("hero.badge"),
              title: locale === "uz" ? "ÖZBEK MUTAXASSISLARI" : t("hero.title"),
              description: locale === "uz" ? "Germaniya böylab özbek mutaxassislarini bir joyda toping." : t("hero.description"),
              profilesLabel: t("hero.statistics.profiles"),
              categoriesLabel: t("hero.statistics.categories"),
              verifiedLabel: t("hero.statistics.verified"),
            }}
            statistics={{
              profiles: localizedSpecialists.length,
              categories: uniqueCategories,
              verified: verifiedProfiles,
            }}
          />
        </div>

        <section className="bg-white pb-8 pt-8 dark:bg-[var(--uzde-page-bg)] sm:pb-10 sm:pt-10 lg:pb-12">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
            <SpecialistsDirectory
              specialists={
                localizedSpecialists
              }
              initialCategory={
                isSpecialistCategory(
                  category,
                )
                  ? category
                  : undefined
              }
              labels={{
                filters: {
                  searchLabel:
                    t(
                      "filters.searchLabel",
                    ),
                  searchPlaceholder:
                    t(
                      "filters.searchPlaceholder",
                    ),
                  categoryLabel:
                    t(
                      "filters.categoryLabel",
                    ),
                  bundeslandLabel:
                    t(
                      "filters.bundeslandLabel",
                    ),
                  allBundeslaender:
                    t(
                      "filters.allBundeslaender",
                    ),
                  verifiedOnly:
                    t(
                      "filters.verifiedOnly",
                    ),
                  premiumOnly:
                    t(
                      "filters.premiumOnly",
                    ),
                  reset:
                    t(
                      "filters.reset",
                    ),
                },

                categories:
                  categoryLabels,

                bundeslaender:
                  bundeslandLabels,

                featured: {
                  eyebrow:
                    t(
                      "featured.eyebrow",
                    ),
                  title:
                    t(
                      "featured.title",
                    ),
                  description:
                    t(
                      "featured.description",
                    ),
                },

                results: {
                  title:
                    t(
                      "results.title",
                    ),
                  count:
                    t(
                      "results.count",
                      {
                        count:
                          localizedSpecialists.length,
                      },
                    ),
                },

                empty: {
                  title:
                    t(
                      "empty.title",
                    ),
                  description:
                    t(
                      "empty.description",
                    ),
                  applyButton:
                    t(
                      "empty.applyButton",
                    ),
                },

                card: {
                  verified:
                    t(
                      "card.verified",
                    ),
                  premium:
                    t(
                      "card.premium",
                    ),
                  sponsored:
                    t(
                      "card.sponsored",
                    ),
                  details:
                    t(
                      "card.details",
                    ),
                  detailsSoon:
                    t(
                      "card.detailsSoon",
                    ),
                  languages:
                    t(
                      "card.languages",
                    ),
                  serviceArea:
                    t(
                      "card.serviceArea",
                    ),
                },
              }}
            />
          </div>
        </section>
      </main>

      <SpecialistsJobsPromo locale={locale} />

      <Footer variant="compact" />
    </div>
  );
}
