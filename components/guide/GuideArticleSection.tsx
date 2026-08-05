type GuideArticleSectionProps = Readonly<{
  title: string;
  paragraphs?: ReadonlyArray<string>;
  items?: ReadonlyArray<string>;
}>;

export default function GuideArticleSection({
  title,
  paragraphs = [],
  items = [],
}: GuideArticleSectionProps) {
  return (
    <section className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
        {title}
      </h2>

      {paragraphs.length > 0 && (
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl bg-slate-50 p-4 leading-7 text-slate-700 dark:bg-slate-950 dark:text-slate-300"
            >
              <span
                aria-hidden="true"
                className="font-bold text-emerald-600 dark:text-emerald-400"
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
