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
    <section className="border-l-2 border-emerald-500 pl-4 sm:pl-6">
      <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl dark:text-white">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
        {description}
      </p>

      <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${source.title} — ${source.organization}. ${openLabel}`}
              className="group grid grid-cols-[1fr_auto] items-center gap-4 px-2 py-3 transition-colors hover:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 motion-reduce:transition-none dark:hover:bg-emerald-500/10"
            >
              <span className="min-w-0 border-l-2 border-transparent pl-3 transition-colors group-hover:border-emerald-500 motion-reduce:transition-none">
                <span className="block font-bold leading-6 text-slate-950 dark:text-white">
                  {source.title}
                </span>
                <span className="mt-0.5 block text-sm leading-5 text-slate-500 dark:text-slate-400">
                  {source.organization}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-lg font-semibold text-emerald-700 transition-colors group-hover:text-emerald-800 motion-reduce:transition-none dark:text-emerald-300 dark:group-hover:text-emerald-200"
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
