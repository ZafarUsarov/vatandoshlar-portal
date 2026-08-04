import type { Metadata } from "next";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SpecialistsDirectory from "@/components/specialists/SpecialistsDirectory";
import {
  localizeSpecialist,
  specialists,
} from "@/data/specialists";
import type {
  SpecialistCategory,
  SupportedLocale,
} from "@/types/specialist";

type SpecialistsPageProps = Readonly<{
  searchParams: Promise<{
    category?: string;
  }>;
}>;

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

function isSpecialistCategory(
  value: string | undefined,
): value is SpecialistCategory {
  return Boolean(
    value &&
      categoryKeys.includes(value as SpecialistCategory),
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "SpecialistsPage.metadata",
  );

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SpecialistsPage({
  searchParams,
}: SpecialistsPageProps) {
  const locale = (await getLocale()) as SupportedLocale;
  const t = await getTranslations("SpecialistsPage");
  const { category } = await searchParams;

  const localizedSpecialists = specialists.map(
    (specialist) =>
      localizeSpecialist(specialist, locale),
  );

  const categoryLabels = {
    all: t("categories.all"),
    medical: t("categories.medical"),
    legal: t("categories.legal"),
    technology: t("categories.technology"),
    automotive: t("categories.automotive"),
    home: t("categories.home"),
    education: t("categories.education"),
    "language-teaching": t(
      "categories.languageTeaching",
    ),
    "academic-documents": t(
      "categories.academicDocuments",
    ),
    beauty: t("categories.beauty"),
    finance: t("categories.finance"),
    creative: t("categories.creative"),
  };

  const bundeslandLabels: Record<string, string> = {
    "Baden-Württemberg": "Baden-Württemberg",
    Bayern: "Bayern",
    Berlin: "Berlin",
    Brandenburg: "Brandenburg",
    Bremen: "Bremen",
    Hamburg: "Hamburg",
    Hessen: "Hessen",
    "Mecklenburg-Vorpommern":
      "Mecklenburg-Vorpommern",
    Niedersachsen: "Niedersachsen",
    "Nordrhein-Westfalen":
      "Nordrhein-Westfalen",
    "Rheinland-Pfalz": "Rheinland-Pfalz",
    Saarland: "Saarland",
    Sachsen: "Sachsen",
    "Sachsen-Anhalt": "Sachsen-Anhalt",
    "Schleswig-Holstein":
      "Schleswig-Holstein",
    Thüringen: "Thüringen",
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-950 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.10),transparent_25%)]"
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                {t("hero.badge")}
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-950 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SpecialistsDirectory
              specialists={localizedSpecialists}
              initialCategory={
                isSpecialistCategory(category)
                  ? category
                  : undefined
              }
              labels={{
                filters: {
                  searchLabel: t(
                    "filters.searchLabel",
                  ),
                  searchPlaceholder: t(
                    "filters.searchPlaceholder",
                  ),
                  categoryLabel: t(
                    "filters.categoryLabel",
                  ),
                  bundeslandLabel: t(
                    "filters.bundeslandLabel",
                  ),
                  allBundeslaender: t(
                    "filters.allBundeslaender",
                  ),
                  verifiedOnly: t(
                    "filters.verifiedOnly",
                  ),
                  premiumOnly: t(
                    "filters.premiumOnly",
                  ),
                  reset: t("filters.reset"),
                },
                categories: categoryLabels,
                bundeslaender: bundeslandLabels,
                results: {
                  title: t("results.title"),
                  count: t("results.count", {
                    count:
                      localizedSpecialists.length,
                  }),
                },
                empty: {
                  title: t("empty.title"),
                  description: t(
                    "empty.description",
                  ),
                  applyButton: t(
                    "empty.applyButton",
                  ),
                },
                card: {
                  verified: t("card.verified"),
                  premium: t("card.premium"),
                  sponsored: t("card.sponsored"),
                  details: t("card.details"),
                  detailsSoon: t(
                    "card.detailsSoon",
                  ),
                  languages: t("card.languages"),
                },
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
