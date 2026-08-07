type SupportCostItem = Readonly<{
  title: string;
  description: string;
  icon: "hosting" | "domain" | "development";
}>;

type SupportHeroProps = Readonly<{
  badge: string;
  title: string;
  description: string;
  voluntary: string;
  costsTitle: string;
  costs: ReadonlyArray<SupportCostItem>;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function HeartIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HostingIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <rect x="3.5" y="4" width="17" height="6" rx="2" />
      <rect x="3.5" y="14" width="17" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" strokeLinecap="round" />
    </svg>
  );
}

function DomainIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path
        d="M3.8 12h16.4M12 3.5c2.2 2.3 3.4 5.2 3.4 8.5S14.2 18.2 12 20.5C9.8 18.2 8.6 15.3 8.6 12S9.8 5.8 12 3.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DevelopmentIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5l-3 14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CostIcon({ icon }: Readonly<{ icon: SupportCostItem["icon"] }>) {
  switch (icon) {
    case "hosting":
      return <HostingIcon />;
    case "domain":
      return <DomainIcon />;
    case "development":
      return <DevelopmentIcon />;
  }
}

export default function SupportHero({
  badge,
  title,
  description,
  voluntary,
  costsTitle,
  costs,
}: SupportHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-20 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.10),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.06),transparent_32%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            <HeartIcon />
            {badge}
          </span>

          <h1 className="mt-7 text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            {description}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            {voluntary}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <h2 className="text-center text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
            {costsTitle}
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {costs.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <CostIcon icon={item.icon} />
                </span>

                <h3 className="mt-5 text-lg font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
