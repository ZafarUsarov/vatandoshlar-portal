
import BrandedText from "@/components/ui/BrandedText";

type FounderHeroProps = Readonly<{
  name: string;
  labels: Readonly<{
    badge: string;
    title: string;
    profession: string;
    description: string;
  }>;
}>;

export default function FounderHero({
  name,
  labels,
}: FounderHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 pb-10 pt-28 dark:border-slate-800 dark:bg-slate-950 sm:pb-14 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.14),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.11),transparent_26%),radial-gradient(circle_at_60%_100%,rgba(139,92,246,0.08),transparent_28%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {labels.badge}
          </span>

          <h1 className="mt-5 text-5xl font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            {name}
          </h1>

          <p className="mt-4 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
            {labels.profession}
          </p>

          <h2 className="mt-6 max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-slate-900 sm:text-3xl dark:text-slate-100">
            {labels.title}
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            <BrandedText text={labels.description} />
          </p>


        </div>

      </div>
    </section>
  );
}
