import { Link } from "@/i18n/navigation";

type FounderHeroProps = Readonly<{
  name: string;
  avatarUrl?: string;
  labels: Readonly<{
    badge: string;
    title: string;
    profession: string;
    description: string;
    contactButton: string;
    specialistButton: string;
  }>;
}>;

function ArrowUpRightIcon() {
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
        d="M7 17 17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FounderHero({
  name,
  avatarUrl,
  labels,
}: FounderHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-950 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.14),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.11),transparent_26%),radial-gradient(circle_at_60%_100%,rgba(139,92,246,0.08),transparent_28%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_380px] lg:items-center lg:px-8">
        <div>
          <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {labels.badge}
          </span>

          <h1 className="mt-7 text-5xl font-bold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            {name}
          </h1>

          <p className="mt-4 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
            {labels.profession}
          </p>

          <h2 className="mt-8 max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-slate-900 sm:text-3xl dark:text-slate-100">
            {labels.title}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            {labels.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:info.vatandoshlar@gmx.de"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950"
            >
              {labels.contactButton}
              <ArrowUpRightIcon />
            </a>

            <Link
              href="/specialists/zafar-usarov"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 dark:focus-visible:ring-offset-slate-950"
            >
              {labels.specialistButton}
              <ArrowUpRightIcon />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-violet-400/20 blur-2xl"
          />

          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2.75rem] border border-white/50 bg-gradient-to-br from-emerald-500 to-teal-800 shadow-2xl shadow-emerald-950/20 dark:border-white/10">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center text-white">
                <span className="block text-7xl font-black tracking-[-0.08em]">
                  ZU
                </span>
                <span className="mt-4 block text-sm font-bold uppercase tracking-[0.22em] text-emerald-100">
                  Vatandoshlar.de
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
