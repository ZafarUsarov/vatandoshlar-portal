"use client";

import { useState } from "react";
import ServiceContactLink from "./ServiceContactLink";

type Group = Readonly<{
  id: string;
  title: string;
  summary: string;
  items: ReadonlyArray<string>;
}>;

type Props = Readonly<{
  groups: ReadonlyArray<Group>;
  locale: "uz" | "de";
  contactEmail: string;
}>;

export default function ServicesCatalog({ groups, locale, contactEmail }: Props) {
  const [category, setCategory] = useState(groups[0]?.id ?? "");
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);
  const visible = groups.filter((group) => group.id === category);
  const uz = locale === "uz";

  return (
    <div>
      <div className="mb-6 border-t border-zinc-300 pt-7 dark:border-zinc-700 sm:mb-10 sm:pt-8">
        <h3 className="text-[clamp(1.45rem,6vw,2rem)] font-semibold leading-tight tracking-[-0.045em] sm:text-[clamp(1.6rem,3vw,2.75rem)]">
          {uz ? "Özingizga mos xizmatni tanlang." : "Finden Sie den passenden Service."}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          {uz ? "To‘rtta yönalişdan birini tanlang." : "Wählen Sie einen von vier Bereichen."}
        </p>
      </div>

      <div className="space-y-3 md:hidden" role="group" aria-label={uz ? "Xizmat kategoriyalari" : "Dienstleistungskategorien"}>
        {groups.map((group, index) => {
          const expanded = mobileCategory === group.id;
          const panelId = `mobile-category-${group.id}`;
          return (
            <section key={group.id} className={`min-w-0 overflow-hidden rounded-xl border transition-colors duration-200 motion-reduce:transition-none ${expanded ? "border-teal-700 bg-teal-50/50 dark:border-teal-400 dark:bg-teal-950/20" : "border-zinc-300 dark:border-zinc-700"}`}>
              <h4>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setMobileCategory(expanded ? null : group.id)}
                  className="flex min-h-20 w-full items-center gap-3 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-600"
                >
                  <span className="shrink-0 text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400">{String(index + 1).padStart(2, "0")} / 04</span>
                  <span className="min-w-0 flex-1 text-base font-semibold leading-snug tracking-tight">{group.title}</span>
                  <span aria-hidden="true" className={`shrink-0 text-lg text-teal-700 transition-transform duration-200 dark:text-teal-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}>⌄</span>
                </button>
              </h4>
              <div id={panelId} hidden={!expanded} className="border-t border-zinc-300 px-4 pb-3 dark:border-zinc-700">
                <p className="py-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{group.summary}</p>
                <ol className="divide-y divide-zinc-300 dark:divide-zinc-700">
                  {group.items.map((item, itemIndex) => (
                    <li key={item}>
                      <details className="group/detail">
                        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-3 transition-colors hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-teal-600 dark:hover:text-teal-300 motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
                          <span className="w-6 shrink-0 text-xs tabular-nums text-zinc-500 dark:text-zinc-400">{String(itemIndex + 1).padStart(2, "0")}</span>
                          <span className="min-w-0 flex-1 text-sm font-medium leading-6">{item}</span>
                          <span aria-hidden="true" className="shrink-0 text-base text-teal-700 transition-transform duration-200 group-open/detail:rotate-90 dark:text-teal-300 motion-reduce:transition-none">↗</span>
                        </summary>
                        <div className="pb-4 pl-9 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                          <p>{group.summary}</p>
                          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{uz ? "Bu yönaliş hozirça konsept sifatida körsatilgan; alohida xizmat tafsilotlari hali e’lon qilinmagan." : "Dieser Bereich ist derzeit ein Konzept; weitere Leistungsdetails sind noch nicht veröffentlicht."}</p>
                          <ServiceContactLink service={item} locale={locale} email={contactEmail} />
                        </div>
                      </details>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          );
        })}
      </div>

      <div className="hidden grid-cols-1 gap-3 md:grid md:grid-cols-2 xl:grid-cols-4" role="group" aria-label={uz ? "Xizmat kategoriyalari" : "Dienstleistungskategorien"}>
        {groups.map((group, index) => {
          const selected = category === group.id;
          return (
            <button
              key={group.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(group.id)}
              className={`group relative flex min-h-36 min-w-0 flex-col items-start justify-between rounded-xl border p-5 text-left transition-[border-color,background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 motion-reduce:transition-none ${selected ? "border-teal-700 bg-teal-50/70 dark:border-teal-400 dark:bg-teal-950/30" : "border-zinc-300 bg-white/50 hover:border-zinc-500 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"}`}
            >
              <span className="flex w-full items-center justify-between gap-3 text-xs font-semibold tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                <span>{String(index + 1).padStart(2, "0")} / 04</span>
                <span className={selected ? "text-teal-700 dark:text-teal-300" : "text-zinc-500 dark:text-zinc-400"} aria-hidden="true">↗</span>
              </span>
              <span className="mt-7 text-lg font-semibold leading-snug tracking-[-0.025em] sm:text-xl">{group.title}</span>
              <span className={`absolute bottom-0 left-5 right-5 h-0.5 ${selected ? "bg-teal-700 dark:bg-teal-400" : "bg-transparent"}`} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="mt-9 hidden space-y-10 md:block">
          {visible.map((group) => (
            <section key={group.id} id={`category-${group.id}`} className="scroll-mt-32">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-zinc-300 pb-5 dark:border-zinc-700">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
                    {String(groups.findIndex((entry) => entry.id === group.id) + 1).padStart(2, "0")} / 04
                  </p>
                  <h4 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{group.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{group.summary}</p>
                </div>
                <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">{group.items.length} / 05</span>
              </div>
              <ol className="divide-y divide-zinc-300 dark:divide-zinc-700">
                {group.items.map((item) => (
                  <li key={item}>
                    <details className="group/detail">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 rounded-sm py-4 transition-colors hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:hover:text-teal-300 motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
                        <span className="w-7 shrink-0 text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                          {String(group.items.indexOf(item) + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 text-base font-medium leading-6 sm:text-lg">{item}</span>
                        <span aria-hidden="true" className="shrink-0 text-lg text-teal-700 transition-transform duration-200 group-open/detail:rotate-90 dark:text-teal-300 motion-reduce:transition-none">↗</span>
                      </summary>
                      <div className="pb-6 pl-11 pr-8 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                        <p>{group.summary}</p>
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          {uz ? "Bu yönaliş hozirça konsept sifatida körsatilgan; alohida xizmat tafsilotlari hali e’lon qilinmagan." : "Dieser Bereich ist derzeit ein Konzept; weitere Leistungsdetails sind noch nicht veröffentlicht."}
                        </p>
                        <ServiceContactLink service={item} locale={locale} email={contactEmail} />
                      </div>
                    </details>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
    </div>
  );
}
