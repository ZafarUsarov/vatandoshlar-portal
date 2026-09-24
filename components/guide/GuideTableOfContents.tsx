"use client";

import { useEffect, useMemo, useState } from "react";

import type { SupportedGuideLocale } from "../../types/guide";

export type GuideTableOfContentsItem = Readonly<{
  id: string;
  label: string;
}>;

type Props = Readonly<{
  items: ReadonlyArray<GuideTableOfContentsItem>;
  locale: SupportedGuideLocale;
}>;

export default function GuideTableOfContents({ items, locale }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const title = locale === "uz" ? "Mundarija" : "Inhalt";
  const currentLabel = useMemo(
    () => items.find((item) => item.id === activeId)?.label ?? items[0]?.label ?? "",
    [activeId, items],
  );

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const updateFromHash = () => {
      const id = window.location.hash.slice(1);
      if (items.some((item) => item.id === id)) setActiveId(id);
    };

    updateFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -62% 0px", threshold: [0, 0.01, 0.2] },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [items]);

  const nav = (mobile = false) => (
    <nav aria-label={title} className={mobile ? "mt-3 space-y-1" : "space-y-1"}>
      {items.map((item, index) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active ? "location" : undefined}
            onClick={() => {
              setActiveId(item.id);
              if (mobile) setOpen(false);
            }}
            className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              active
                ? "bg-emerald-50 font-bold text-slate-950 dark:bg-emerald-500/10 dark:text-white"
                : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                active
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {index + 1}
            </span>
            <span className="leading-6">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );

  if (items.length === 0) return null;

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="px-3 pb-2 text-base font-bold text-slate-950 dark:text-white">{title}</h2>
          {nav()}
        </div>
      </aside>

      <div className="lg:hidden">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex w-full items-center justify-between gap-4 rounded-xl px-2 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">{title}</span>
              <span className="mt-1 block text-sm font-semibold text-slate-800 dark:text-slate-100">{currentLabel}</span>
            </span>
            <span aria-hidden="true" className={`text-slate-500 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}>⌄</span>
          </button>
          {open ? nav(true) : null}
        </div>
      </div>
    </>
  );
}
