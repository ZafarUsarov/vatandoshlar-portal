"use client";

import { useTranslations } from "next-intl";

import Header from "@/components/Header";
import { Link } from "@/i18n/navigation";

function CompassIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path
        d="m14.75 9.25-1.8 3.7-3.7 1.8 1.8-3.7 3.7-1.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="min-h-screen bg-white text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
      <Header />

      <main className="flex min-h-screen items-center px-6 pb-16 pt-28 lg:px-8 lg:pt-32">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CompassIcon />
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            {t("eyebrow")}
          </p>

          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">
            {t("title")}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              {t("home")}
            </Link>

            <Link
              href="/guide"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              {t("guide")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
