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
    <section className="border-b border-slate-200/80 bg-transparent py-20 dark:border-slate-800/80 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <UsersIcon />
              {labels.badge}
            </span>

            <h1 className="mt-7 text-4xl font-bold tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              {labels.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {labels.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="min-w-24 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:min-w-32 sm:px-5"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
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
