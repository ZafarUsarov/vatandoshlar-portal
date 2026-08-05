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
    <section className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
        {title}
      </h2>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
          >
            <summary className="cursor-pointer list-none font-bold text-slate-950 marker:hidden dark:text-white">
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
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
