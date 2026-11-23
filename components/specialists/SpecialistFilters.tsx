"use client";

import { useEffect, useRef, useState } from "react";

import type {
  SpecialistCategory,
} from "@/types/specialist";

type FilterOption<T extends string> = Readonly<{
  value: T;
  label: string;
}>;

type SpecialistFiltersProps = Readonly<{
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  category: "all" | SpecialistCategory;
  onCategoryChange: (
    value: "all" | SpecialistCategory,
  ) => void;
  bundesland: string;
  onBundeslandChange: (value: string) => void;
  verifiedOnly: boolean;
  onVerifiedOnlyChange: (value: boolean) => void;
  premiumOnly: boolean;
  onPremiumOnlyChange: (value: boolean) => void;
  onReset: () => void;
  categories: ReadonlyArray<
    FilterOption<"all" | SpecialistCategory>
  >;
  bundeslaender: ReadonlyArray<FilterOption<string>>;
  labels: Readonly<{
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    bundeslandLabel: string;
    allBundeslaender: string;
    verifiedOnly: string;
    premiumOnly: string;
    reset: string;
  }>;
}>;

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4 4" strokeLinecap="round" />
    </svg>
  );
}

function FilterDropdown<T extends string>({ id, label, value, options, onChange }: {
  id: string;
  label: string;
  value: T;
  options: ReadonlyArray<FilterOption<T>>;
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selected = options[selectedIndex];
  const listId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const focusIndex = (index: number) => {
    const next = (index + options.length) % options.length;
    setActiveIndex(next);
    requestAnimationFrame(() => optionRefs.current[next]?.focus());
  };
  const openAt = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
    requestAnimationFrame(() => optionRefs.current[index]?.focus());
  };
  const select = (option: FilterOption<T>) => {
    onChange(option.value);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="relative min-w-0" ref={rootRef}>
      <span id={`${id}-label`} className="mb-2 block text-xs font-semibold text-zinc-600 dark:text-zinc-300">{label}</span>
      <button
        id={id}
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${id}-label ${id}`}
        onClick={() => open ? setOpen(false) : openAt(selectedIndex)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openAt(event.key === "ArrowDown" ? selectedIndex : options.length - 1);
          } else if (event.key === "Escape" && open) {
            event.preventDefault();
            setOpen(false);
          }
        }}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-lg bg-white px-3.5 text-left text-sm font-medium text-zinc-800 outline-none transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:bg-white/10 dark:text-zinc-100 dark:hover:bg-white/15"
      >
        <span className="truncate">{selected?.label ?? label}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}><path d="m7 10 5 5 5-5" /></svg>
      </button>
      {open && (
        <div
          id={listId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute left-0 top-full z-50 mt-2 max-h-72 w-full min-w-[min(17rem,calc(100vw-3rem))] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-white/15 dark:bg-[var(--uzde-page-bg)]"
          onKeyDown={(event) => {
            if (event.key === "Escape" || event.key === "Tab") {
              setOpen(false);
              if (event.key === "Escape") { event.preventDefault(); triggerRef.current?.focus(); }
            } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              focusIndex(activeIndex + (event.key === "ArrowDown" ? 1 : -1));
            } else if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              focusIndex(event.key === "Home" ? 0 : options.length - 1);
            }
          }}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => { optionRefs.current[index] = element; }}
              type="button"
              role="option"
              aria-selected={option.value === value}
              tabIndex={index === activeIndex ? 0 : -1}
              onFocus={() => setActiveIndex(index)}
              onClick={() => select(option)}
              className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-white/10 dark:focus-visible:bg-white/10 ${option.value === value ? "font-medium text-zinc-900 dark:text-zinc-100" : "text-zinc-700"}`}
            >
              <span aria-hidden="true" className={`flex size-[18px] shrink-0 items-center justify-center rounded-full border ${option.value === value ? "border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500" : "border-zinc-300 bg-transparent dark:border-zinc-500"}`}>
                {option.value === value && (
                  <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8 3 3 6-6" /></svg>
                )}
              </span>
              <span className="min-w-0 flex-1">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SpecialistFilters({
  searchQuery,
  onSearchQueryChange,
  category,
  onCategoryChange,
  bundesland,
  onBundeslandChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  premiumOnly,
  onPremiumOnlyChange,
  onReset,
  categories,
  bundeslaender,
  labels,
}: SpecialistFiltersProps) {
  const activeCount = Number(category !== "all") + Number(bundesland !== "all") + Number(verifiedOnly) + Number(premiumOnly) + Number(searchQuery.trim().length > 0);
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="specialist-search" className="mb-2 block text-xs font-semibold text-zinc-600 dark:text-zinc-300">{labels.searchLabel}</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"><SearchIcon /></span>
          <input id="specialist-search" type="search" value={searchQuery} onChange={(event) => onSearchQueryChange(event.target.value)} placeholder={labels.searchPlaceholder} className="h-12 w-full rounded-lg border border-zinc-200 bg-[#f8f8f8] pl-12 pr-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:border-white/10 dark:bg-white/10 dark:text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-xl bg-[#f1f1f1] p-2.5 dark:bg-white/[0.07] lg:flex-row lg:items-end lg:justify-between">
        <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2 lg:max-w-[620px]">
          <FilterDropdown id="specialist-category" label={labels.categoryLabel} value={category} options={categories} onChange={onCategoryChange} />
          <FilterDropdown id="specialist-bundesland" label={labels.bundeslandLabel} value={bundesland} options={[{ value: "all", label: labels.allBundeslaender }, ...bundeslaender]} onChange={onBundeslandChange} />
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:pb-0.5">
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 text-xs font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-100 sm:text-sm">
            <input type="checkbox" checked={verifiedOnly} onChange={(event) => onVerifiedOnlyChange(event.target.checked)} className="size-4 accent-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500" />{labels.verifiedOnly}
          </label>
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 text-xs font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-100 sm:text-sm">
            <input type="checkbox" checked={premiumOnly} onChange={(event) => onPremiumOnlyChange(event.target.checked)} className="size-4 accent-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500" />{labels.premiumOnly}
          </label>
          <span aria-label={`${activeCount} active filters`} className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-semibold tabular-nums text-teal-700 dark:bg-white/10 dark:text-teal-300">{activeCount}</span>
          <button type="button" onClick={onReset} className="min-h-10 rounded-lg bg-white px-3 text-xs font-medium text-zinc-700 transition hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:bg-white/10 dark:text-zinc-100 sm:text-sm">{labels.reset}</button>
        </div>
      </div>
    </div>
  );
}
