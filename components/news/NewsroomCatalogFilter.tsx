"use client";

import { Children, useState, type ReactNode } from "react";

type Props = {
  categories: string[];
  categoryByIndex: string[];
  locale: "uz" | "de";
  children: ReactNode;
};

export default function NewsroomCatalogFilter({
  categories,
  categoryByIndex,
  locale,
  children,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const cards = Children.toArray(children);
  const isGerman = locale === "de";
  const visibleCount = categoryByIndex.filter(
    (category) => selected === null || category === selected,
  ).length;

  return (
    <div>
      <div
        role="group"
        aria-label={isGerman ? "Nach Kategorie filtern" : "Kategoriya böyiça saralaş"}
        className="mb-7 flex flex-wrap gap-2"
      >
        {[null, ...categories].map((category) => {
          const active = selected === category;
          return (
            <button
              key={category ?? "all"}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                active
                  ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-slate-300 text-slate-700 hover:border-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white"
              }`}
            >
              {category ?? (isGerman ? "Alle" : "Barçasi")}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        {isGerman ? `${visibleCount} Beiträge` : `${visibleCount} material`}
      </p>
      <div className="grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) =>
          selected === null || categoryByIndex[index] === selected ? card : null,
        )}
      </div>
    </div>
  );
}
