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
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-9 dark:border-emerald-500/20 dark:bg-emerald-500/10">
      <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-100">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-emerald-900 dark:text-emerald-200">
        {description}
      </p>

      <ul className="mt-6 space-y-3">
        {sources.map((source) => (
          <li
            key={source.url}
            className="rounded-2xl border border-emerald-200 bg-white/70 p-5 dark:border-emerald-500/20 dark:bg-slate-950/40"
          >
            <p className="font-bold text-emerald-950 dark:text-emerald-100">
              {source.title}
            </p>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">
              {source.organization}
            </p>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              {openLabel} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
