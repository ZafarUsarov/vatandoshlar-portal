import { getTranslations } from "next-intl/server";

import NewsCard from "@/components/cards/NewsCard";
import { getLatestNews } from "@/data/news";
import { Link } from "@/i18n/navigation";
import type { NewsItem } from "@/types/news";

interface IconProps {
  className?: string;
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function NewspaperIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M5 5.5h14v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 13h8M8 17h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function NewsSection() {
  const t = await getTranslations("NewsSection");

  const latestNews = getLatestNews(3).map((item) => {
    const key = String(item.id);

    return {
      ...item,
      title: t(`items.${key}.title`),
      excerpt: t(`items.${key}.excerpt`),
      category: t(`items.${key}.category`),
      contentType: t(`items.${key}.contentType`) as NewsItem["contentType"],
      readingTime: t(`items.${key}.readingTime`),
      location: item.location ? t(`items.${key}.location`) : undefined,
    };
  });

  return (
    <section
      id="news"
      aria-labelledby="news-heading"
      className="relative isolate overflow-hidden bg-slate-50 py-24 sm:py-28 lg:py-32 dark:bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.06),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              <NewspaperIcon className="size-4" />
              {t("badge")}
            </div>

            <h2
              id="news-heading"
              className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {t("title")}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              {t("description")}
            </p>
          </div>

          <Link
            href="/news"
            className="group hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 lg:inline-flex dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:border-white/20 dark:focus-visible:ring-violet-400 dark:focus-visible:ring-offset-slate-950"
          >
            {t("viewAll")}
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:border-white/20 dark:focus-visible:ring-violet-400 dark:focus-visible:ring-offset-slate-950"
          >
            {t("viewAll")}
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
