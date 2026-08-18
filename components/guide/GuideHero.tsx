import Image from "next/image";
import type { ReactNode } from "react";

type GuideHeroProps = Readonly<{
  eyebrow: ReactNode;
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
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-transparent text-slate-950 dark:border-slate-800/80 dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <Image
          src="/images/guide/guide-master-visual.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-[68%_40%] opacity-42 sm:object-[70%_40%] sm:opacity-48 lg:object-[72%_42%] lg:opacity-56 dark:opacity-34 dark:sm:opacity-38 dark:lg:opacity-42"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.995)_0%,rgba(248,250,252,0.97)_36%,rgba(248,250,252,0.82)_54%,rgba(248,250,252,0.38)_72%,rgba(248,250,252,0.12)_100%)] dark:bg-[linear-gradient(90deg,rgba(2,6,23,0.995)_0%,rgba(2,6,23,0.97)_36%,rgba(2,6,23,0.86)_54%,rgba(2,6,23,0.56)_72%,rgba(2,6,23,0.32)_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,250,252,0.08),rgba(248,250,252,0.48))] dark:bg-[linear-gradient(to_bottom,rgba(2,6,23,0.06),rgba(2,6,23,0.30))]" />

        <div className="absolute -right-28 -top-28 size-[28rem] rounded-full bg-emerald-200/20 blur-[110px] dark:bg-emerald-400/[0.035]" />
        <div className="absolute -bottom-36 right-[18%] size-[24rem] rounded-full bg-cyan-200/14 blur-[100px] dark:bg-cyan-400/[0.025]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] sm:text-6xl sm:leading-[1.08]">
            {title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-400">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#guide-categories"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
            >
              {primaryLabel}
            </a>

            <a
              href="#guide-principles"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300/80 bg-white/70 px-6 py-3 font-semibold text-slate-900 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
