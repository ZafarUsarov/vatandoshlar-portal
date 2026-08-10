import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type SectionHeroTone =
  | "services"
  | "jobs"
  | "telegram"
  | "specialists"
  | "events"
  | "guide";

type SectionHeroBackgroundProps = Readonly<{
  children: ReactNode;
  tone: SectionHeroTone;
  className?: string;
}>;

type ToneConfig = Readonly<{
  topGlow: string;
  bottomGlow: string;
  accentGlow: string;
}>;

const toneConfig: Record<SectionHeroTone, ToneConfig> = {
  services: {
    topGlow:
      "bg-emerald-200/30 dark:bg-emerald-400/[0.045]",
    bottomGlow:
      "bg-cyan-200/20 dark:bg-cyan-400/[0.035]",
    accentGlow:
      "bg-teal-100/20 dark:bg-teal-400/[0.025]",
  },
  jobs: {
    topGlow:
      "bg-indigo-200/24 dark:bg-indigo-400/[0.04]",
    bottomGlow:
      "bg-cyan-200/20 dark:bg-cyan-400/[0.03]",
    accentGlow:
      "bg-blue-100/22 dark:bg-blue-400/[0.025]",
  },
  telegram: {
    topGlow:
      "bg-sky-200/28 dark:bg-sky-400/[0.04]",
    bottomGlow:
      "bg-cyan-200/22 dark:bg-cyan-400/[0.035]",
    accentGlow:
      "bg-blue-100/20 dark:bg-blue-400/[0.025]",
  },
  specialists: {
    topGlow:
      "bg-emerald-200/28 dark:bg-emerald-400/[0.04]",
    bottomGlow:
      "bg-blue-200/18 dark:bg-blue-400/[0.03]",
    accentGlow:
      "bg-slate-100/45 dark:bg-slate-400/[0.02]",
  },
  events: {
    topGlow:
      "bg-violet-200/24 dark:bg-violet-400/[0.035]",
    bottomGlow:
      "bg-blue-200/20 dark:bg-blue-400/[0.03]",
    accentGlow:
      "bg-emerald-100/18 dark:bg-emerald-400/[0.022]",
  },
  guide: {
    topGlow:
      "bg-emerald-200/28 dark:bg-emerald-400/[0.04]",
    bottomGlow:
      "bg-amber-100/24 dark:bg-amber-300/[0.025]",
    accentGlow:
      "bg-stone-100/45 dark:bg-stone-400/[0.018]",
  },
};

export default function SectionHeroBackground({
  children,
  tone,
  className,
}: SectionHeroBackgroundProps) {
  const config = toneConfig[tone];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-slate-50/70 dark:bg-slate-950",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn(
            "absolute -right-36 -top-28 size-[32rem] rounded-full blur-[125px] sm:size-[38rem] lg:size-[46rem]",
            config.topGlow,
          )}
        />

        <div
          className={cn(
            "absolute -bottom-44 -left-40 size-[30rem] rounded-full blur-[120px] sm:size-[36rem] lg:size-[42rem]",
            config.bottomGlow,
          )}
        />

        <div
          className={cn(
            "absolute left-1/2 top-[46%] size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[115px] sm:size-[36rem]",
            config.accentGlow,
          )}
        />

        <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-[120px] dark:bg-white/[0.012]" />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white/55 dark:to-slate-950/55" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.16),rgba(56,189,248,0.12),transparent)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
