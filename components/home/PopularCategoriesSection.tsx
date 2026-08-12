import { getTranslations } from "next-intl/server";

import CategoryCard from "@/components/cards/CategoryCard";
import { popularCategories } from "@/data/popular-categories";
import { Link } from "@/i18n/navigation";
import {
  getPublishedSpecialistCategories,
} from "@/lib/specialists/public-specialists-repository";

type IconProps = Readonly<{
  className?: string;
}>;

function GridIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="2"
      />

      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="2"
      />

      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="2"
      />

      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="2"
      />
    </svg>
  );
}

function ArrowUpRightIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function PopularCategoriesSection() {
  const [
    t,
    publishedCategories,
  ] = await Promise.all([
    getTranslations(
      "PopularCategoriesSection",
    ),

    getPublishedSpecialistCategories(),
  ]);

  const activeCategoryIds =
    new Set(
      publishedCategories,
    );

  return (
    <section
      id="popular-categories"
      aria-labelledby="popular-categories-heading"
      className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-24 sm:py-28 lg:py-32 dark:border-slate-800 dark:bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(59,130,246,0.10),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.08),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <GridIcon className="size-4" />

              {t("badge")}
            </div>

            <h2
              id="popular-categories-heading"
              className="mt-6 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {t("title")}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              {t("description")}
            </p>
          </div>

          <Link
            href="/specialists"
            className="group hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 lg:inline-flex dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:border-white/20 dark:focus-visible:ring-offset-slate-950"
          >
            {t("viewAll")}

            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {popularCategories.map(
            (
              category,
              index,
            ) => {
              const isActive =
                activeCategoryIds.has(
                  category.id,
                );

              return (
                <CategoryCard
                  key={category.id}
                  category={
                    category
                  }
                  title={t(
                    `items.${category.messageKey}.title`,
                  )}
                  description={t(
                    `items.${category.messageKey}.description`,
                  )}
                  statusLabel={
                    isActive
                      ? undefined
                      : t(
                          "status.comingSoon",
                        )
                  }
                  linkLabel={t(
                    "openCategory",
                  )}
                  index={
                    index
                  }
                />
              );
            },
          )}
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/specialists"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:border-white/20 dark:focus-visible:ring-offset-slate-950"
          >
            {t("viewAll")}

            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}