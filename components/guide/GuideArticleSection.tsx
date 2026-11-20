import BrandedText from "../ui/BrandedText";

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
    <section className="scroll-mt-28 border-t border-slate-200 pt-5 dark:border-slate-700">
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        <BrandedText text={title} />
      </h2>

      {paragraphs.length > 0 && (
        <div className="mt-3 max-w-[75ch] space-y-3 text-base leading-7 text-slate-700 dark:text-slate-300">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}><BrandedText text={paragraph} /></p>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 py-0.5 leading-7 text-slate-700 dark:text-slate-300"
            >
              <span
                aria-hidden="true"
                className="font-bold text-emerald-600 dark:text-emerald-400"
              >
                ✓
              </span>
              <span><BrandedText text={item} /></span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
