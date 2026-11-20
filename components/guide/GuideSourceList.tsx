import type { GuideSource } from "../../types/guide";

type GuideSourceListProps = Readonly<{
  title: string;
  description: string;
  sources: ReadonlyArray<GuideSource>;
  openLabel: string;
}>;

export default function GuideSourceList({
  title,
  description,
  sources,
  openLabel,
}: GuideSourceListProps) {
  return (
    <section className="border-t border-slate-200 pt-4 dark:border-slate-700">
      <h2 className="text-lg font-bold tracking-tight text-slate-950 sm:text-xl dark:text-white">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {description}
      </p>

      <ul className="mt-2 divide-y divide-slate-200 border-b border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${source.title} — ${source.organization}. ${openLabel}`}
              className="group grid grid-cols-[1fr_auto] items-center gap-3 py-2 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 motion-reduce:transition-none dark:hover:bg-emerald-500/10"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 text-slate-950 dark:text-white">
                  {source.title}
                </span>
                <span className="block text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {source.organization}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-base font-medium text-emerald-700 transition-colors group-hover:text-emerald-800 motion-reduce:transition-none dark:text-emerald-300 dark:group-hover:text-emerald-200"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
