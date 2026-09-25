import BrandedText from "@/components/ui/BrandedText";

type SupportPurposeProps = Readonly<{
  title: string;
  description: string;
}>;

function HighlightPercentage({ text }: Readonly<{ text: string }>) {
  const [before, after] = text.split("20%");

  if (after === undefined) {
    return <BrandedText text={text} />;
  }

  return (
    <>
      <BrandedText text={before} />
      <strong className="font-extrabold text-emerald-700 dark:text-emerald-300">
        20%
      </strong>
      <BrandedText text={after} />
    </>
  );
}

export default function SupportPurpose({
  title,
  description,
}: SupportPurposeProps) {
  return (
    <section
      aria-labelledby="support-purpose-title"
      className="bg-white py-10 text-slate-950 dark:bg-slate-950 dark:text-white sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl border-y border-slate-200 py-6 dark:border-white/[0.08] sm:py-7">
          <h2
            id="support-purpose-title"
            className="text-xl font-bold tracking-[-0.025em] sm:text-2xl"
          >
            <BrandedText text={title} />
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
            <HighlightPercentage text={description} />
          </p>
        </div>
      </div>
    </section>
  );
}
