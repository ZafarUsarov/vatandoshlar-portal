"use client";

import type { SupportedGuideLocale } from "../../types/guide";
import { useActiveSection } from "./hooks/useActiveSection";

export type GuideTableOfContentsItem = Readonly<{
  id: string;
  label: string;
}>;

type GuideTableOfContentsProps = Readonly<{
  items: ReadonlyArray<GuideTableOfContentsItem>;
  locale: SupportedGuideLocale;
}>;

export default function GuideTableOfContents({
  items,
  locale,
}: GuideTableOfContentsProps) {
  const sectionIds = items.map((item) => item.id);
  const activeSectionId = useActiveSection(sectionIds);

  if (items.length === 0) {
    return null;
  }

  const copy =
    locale === "uz"
      ? {
          title: "Mundarija",
          open: "Mundarijani ochish",
          navigationLabel: "Maqola mundarijasi",
        }
      : {
          title: "Inhalt",
          open: "Inhaltsverzeichnis öffnen",
          navigationLabel: "Artikelinhaltsverzeichnis",
        };

  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${sectionId}`,
    );
  };

  const navigation = (
    <nav aria-label={copy.navigationLabel}>
      <ol className="space-y-1.5">
        {items.map((item, index) => {
          const isActive = activeSectionId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToSection(item.id);
                }}
                className={[
                  "group flex min-h-10 items-start gap-3 rounded-xl px-3 py-2 text-sm no-underline transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                  "dark:focus-visible:ring-offset-slate-900",
                  isActive
                    ? "bg-emerald-50 font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-600 group-hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700",
                  ].join(" ")}
                >
                  {index + 1}
                </span>

                <span className="leading-6">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  return (
    <>
      <details className="rounded-2xl border border-slate-200 bg-white p-5 lg:hidden dark:border-slate-800 dark:bg-slate-900">
        <summary className="cursor-pointer list-none font-bold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-white dark:focus-visible:ring-offset-slate-950">
          <span className="flex items-center justify-between gap-4">
            <span>{copy.title}</span>
            <span
              aria-label={copy.open}
              className="text-emerald-700 dark:text-emerald-300"
            >
              ↓
            </span>
          </span>
        </summary>

        <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
          {navigation}
        </div>
      </details>

      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-950 dark:text-white">
            {copy.title}
          </h2>

          <div className="mt-4">{navigation}</div>
        </div>
      </aside>
    </>
  );
}
