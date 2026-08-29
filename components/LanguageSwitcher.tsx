"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "../i18n/navigation";

type SupportedLocale = "uz" | "de";

type LanguageSwitcherProps = Readonly<{
  variant?: "compact" | "full";
  className?: string;
  onLocaleChange?: () => void;
}>;

const locales: ReadonlyArray<{
  code: SupportedLocale;
  shortLabel: string;
}> = [
  {
    code: "uz",
    shortLabel: "UZ",
  },
  {
    code: "de",
    shortLabel: "DE",
  },
];

export default function LanguageSwitcher({
  variant = "compact",
  className = "",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const t = useTranslations("Header.languageSwitcher");
  const locale = useLocale() as SupportedLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLocale = (nextLocale: SupportedLocale) => {
    if (nextLocale === locale || isPending) {
      return;
    }

    onLocaleChange?.();

    startTransition(() => {
      router.replace(pathname, {
        locale: nextLocale,
      });
    });
  };

  if (variant === "full") {
    return (
      <div
        aria-label={t("groupLabel")}
        className={`rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900 ${className}`}
        role="group"
      >
        <p className="px-2 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {t("title")}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {locales.map((item) => {
            const isActive = locale === item.code;

            return (
              <button
                key={item.code}
                type="button"
                aria-label={t("switchTo", {
                  language: t(`languages.${item.code}`),
                })}
                aria-pressed={isActive}
                disabled={isPending}
                onClick={() => changeLocale(item.code)}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 dark:focus-visible:ring-offset-slate-900 ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 dark:bg-emerald-600"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                }`}
              >
                <span aria-hidden="true">{item.shortLabel}</span>
                <span>{t(`languages.${item.code}`)}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label={t("groupLabel")}
      className={`inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900 ${className}`}
      role="group"
    >
      {locales.map((item) => {
        const isActive = locale === item.code;

        return (
          <button
            key={item.code}
            type="button"
            aria-label={t("switchTo", {
              language: t(`languages.${item.code}`),
            })}
            aria-pressed={isActive}
            disabled={isPending}
            onClick={() => changeLocale(item.code)}
            className={`flex h-7 min-w-8 items-center justify-center rounded-lg px-1.5 text-[11px] font-bold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-wait disabled:opacity-70 ${
              isActive
                ? "bg-emerald-700 text-white shadow-sm dark:bg-emerald-600"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            {item.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
