import type { GuideFAQ as GuideFAQItem } from "../../types/guide";

type GuideFAQProps = Readonly<{
  title: string;
  items: ReadonlyArray<GuideFAQItem>;
}>;

export default function GuideFAQ({
  title,
  items,
}: GuideFAQProps) {
  return (
    <section className="border-t border-slate-200 pt-5 dark:border-slate-700">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>

      <div className="mt-3 divide-y divide-slate-200 border-b border-slate-200 dark:divide-slate-700 dark:border-slate-700">
        {items.map((item) => (
          <details
            key={item.question}
            className="group py-2.5"
          >
            <summary className="cursor-pointer list-none py-1 font-semibold text-slate-950 marker:hidden focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-white">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-emerald-600 transition-transform group-open:rotate-45 dark:text-emerald-400"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
