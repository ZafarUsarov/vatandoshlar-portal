"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect, useTransition } from "react";

import { usePathname, useRouter } from "../i18n/navigation";

type SupportedLocale = "uz" | "de";

type LanguageSwitcherProps = Readonly<{
  variant?: "compact" | "full" | "dropdown";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const changeLocale = (nextLocale: SupportedLocale) => {
    if (nextLocale === locale || isPending) {
      return;
    }

    setIsOpen(false);
    onLocaleChange?.();

    startTransition(() => {
      router.replace(pathname, {
        locale: nextLocale,
      });
    });
  };

  if (variant === "dropdown") {
    return (
      <div ref={dropdownRef} className={`relative shrink-0 ${className}`}>
        <button type="button" aria-label={t("groupLabel")} aria-haspopup="true" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)} className="flex h-11 min-w-11 items-center justify-center gap-0.5 rounded-md px-0.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900/5 active:bg-slate-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-100 dark:hover:bg-white/10 dark:active:bg-white/15">
          <span aria-hidden="true">{locale === "uz" ? "🇺🇿" : "🇩🇪"}</span>
          <span>{locale.toUpperCase()}</span>
          <span aria-hidden="true" className="text-[10px]">⌄</span>
        </button>
        {isOpen && (
          <div role="group" aria-label={t("groupLabel")} className="absolute right-0 top-full z-[70] mt-1 w-[86px] rounded-lg border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            {locales.map((item) => (
              <button key={item.code} type="button" disabled={isPending} aria-pressed={locale === item.code} onClick={() => { if (locale === item.code) setIsOpen(false); else changeLocale(item.code); }} aria-label={t("switchTo", { language: t(`languages.${item.code}`) })} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-1 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-100 dark:hover:bg-slate-800">
                <span aria-hidden="true">{item.code === "uz" ? "🇺🇿" : "🇩🇪"}</span>
                <span>{item.shortLabel}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div
        aria-label={t("groupLabel")}
        className={`rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900 ${className}`}
        role="group"
      >
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
