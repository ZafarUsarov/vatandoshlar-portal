import { getTranslations } from "next-intl/server";

import Reveal from "../Reveal";

export default async function StatisticsSection() {
  const t = await getTranslations("Home.statistics.items");

  const statistics = [
    {
      value: t("regions.value"),
      label: t("regions.label"),
      description: t("regions.description"),
    },
    {
      value: t("verified.value"),
      label: t("verified.label"),
      description: t("verified.description"),
    },
    {
      value: t("availability.value"),
      label: t("availability.label"),
      description: t("availability.description"),
    },
    {
      value: t("platform.value"),
      label: t("platform.label"),
      description: t("platform.description"),
    },
  ];

  return (
    <Reveal>
      <section className="relative z-10 -mt-1 border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 dark:bg-slate-900">
            {statistics.map((statistic, index) => (
              <article
                key={statistic.label}
                className={`p-7 sm:p-8 ${
                  index > 0
                    ? "border-t border-slate-200 sm:border-l sm:border-t-0 dark:border-slate-800"
                    : ""
                } ${
                  index === 2
                    ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0"
                    : ""
                }`}
              >
                <p className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
                  {statistic.value}
                </p>

                <h2 className="mt-2 font-bold text-slate-950 dark:text-white">
                  {statistic.label}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {statistic.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}