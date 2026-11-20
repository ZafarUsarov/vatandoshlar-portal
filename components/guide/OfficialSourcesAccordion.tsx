"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { GuideSource } from "../../types/guide";

type Props = Readonly<{
  title: string;
  description: string;
  sources: ReadonlyArray<GuideSource>;
  openLabel: string;
}>;

export default function OfficialSourcesAccordion({ title, description, sources, openLabel }: Props) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const openFromToc = () => setOpen(true);
    const openFromHash = () => {
      if (window.location.hash === "#guide-section-sources") setOpen(true);
    };
    window.addEventListener("guide:open-official-sources", openFromToc);
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
    return () => {
      window.removeEventListener("guide:open-official-sources", openFromToc);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-slate-200 dark:border-slate-700">
      <h2 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((value) => !value)}
          className="group flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400"
        >
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl dark:text-white">{title}</span>
            <span className="text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">{sources.length}</span>
          </span>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 motion-reduce:transition-none dark:text-slate-400 ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </h2>
      <div id={contentId} aria-hidden={!open} inert={!open} className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden">
          <p className="pb-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
          <ul className="divide-y divide-slate-200 border-b border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${source.title} — ${source.organization}. ${openLabel}`} className="group grid grid-cols-[1fr_auto] items-center gap-3 py-3 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none dark:hover:text-emerald-300 dark:focus-visible:outline-emerald-400">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-5 text-slate-950 dark:text-white">{source.title}</span>
                    <span className="block text-xs leading-5 text-slate-500 dark:text-slate-400">{source.organization}</span>
                  </span>
                  <span aria-hidden="true" className="text-base text-emerald-700 dark:text-emerald-300">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
