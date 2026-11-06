import AnimatedStatNumber from "./AnimatedStatNumber";

type DirectoryHeaderProps = Readonly<{
  labels: Readonly<{
    badge: string;
    title: string;
    description: string;
    profilesLabel: string;
    categoriesLabel: string;
    verifiedLabel: string;
  }>;
  statistics: Readonly<{
    profiles: number;
    categories: number;
    verified: number;
  }>;
}>;

function UsersIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-4A4.5 4.5 0 0 0 3 18.5V20"
        strokeLinecap="round"
      />
      <circle cx="9.5" cy="7.5" r="3.5" />
      <path
        d="M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14.5a4.5 4.5 0 0 1 3 4.2V20"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DirectoryHeader({
  labels,
  statistics,
}: DirectoryHeaderProps) {
  const items = [
    {
      value: statistics.profiles,
      label: labels.profilesLabel,
    },
    {
      value: statistics.categories,
      label: labels.categoriesLabel,
    },
    {
      value: statistics.verified,
      label: labels.verifiedLabel,
    },
  ];

  return (
    <section className="border-b border-slate-200/80 bg-transparent pt-12 pb-8 dark:border-slate-800/80 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <UsersIcon />
              {labels.badge}
            </span>

            <h1 className="mt-5 text-3xl sm:mt-7 sm:text-5xl font-bold tracking-[-0.055em] text-slate-950 lg:text-6xl dark:text-white">
              {labels.title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8 text-slate-600 dark:text-slate-400">
              {labels.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-xl border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/80 to-teal-100/70 px-1.5 py-2 text-center shadow-[0_5px_18px_rgba(5,150,105,0.12)] ring-1 ring-white/70 sm:min-w-24 sm:rounded-xl sm:px-3 sm:py-2.5 dark:border-emerald-900/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950 dark:ring-emerald-900/30"
              >
                <p className="text-lg font-black tabular-nums tracking-[-0.04em] text-emerald-950 sm:text-xl dark:text-emerald-100">
                  <AnimatedStatNumber value={item.value} />
                </p>
                <p className="mt-0.5 text-[10px] font-semibold text-slate-600 sm:text-[11px] dark:text-slate-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
