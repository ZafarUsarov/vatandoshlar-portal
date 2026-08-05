type GuideHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
}>;

export default function GuideHero({
  eyebrow,
  title,
  description,
  primaryLabel,
  secondaryLabel,
}: GuideHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-24 -top-28 size-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-10 size-[30rem] rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] sm:text-6xl sm:leading-[1.08]">
            {title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#guide-categories"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              {primaryLabel}
            </a>

            <a
              href="#guide-principles"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
