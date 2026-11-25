import AnimatedStatNumber from "./AnimatedStatNumber";
import SpecialistsFlowMark from "./SpecialistsFlowMark";
import AnimatedO from "./AnimatedO";

type DirectoryHeaderProps = Readonly<{
  showFlow?: boolean;
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
  showFlow = false,
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
    <section className="pb-8 pt-9 md:pb-12 md:pt-14 lg:pb-12 lg:pt-16">
      <div className="mx-auto max-w-[var(--uzde-layout-width)] px-5 text-center sm:px-8 lg:px-14">
        <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.23em] text-teal-700 dark:text-teal-300">
          <UsersIcon /> {labels.badge}
        </p>
        {showFlow && labels.title.startsWith("ÖZBEK ") && (
          <div className="mt-7 flex min-w-0 flex-col items-center md:hidden">
            <h1 className="flex w-full min-w-0 flex-col items-center gap-1 font-semibold uppercase leading-[1.12] tracking-normal text-zinc-950 dark:text-zinc-100">
              <span className="whitespace-nowrap text-[clamp(27px,8vw,36px)]"><AnimatedO />ZBEK</span>
              <span className="max-w-full whitespace-nowrap text-[clamp(17px,5.2vw,23px)]">{labels.title.slice(6)}</span>
            </h1>
            <div className="mt-4 flex items-center justify-center text-zinc-950 dark:text-zinc-100 [&>span]:!m-0 [&>span]:!size-14 [&>span]:!translate-y-0">
              <SpecialistsFlowMark />
            </div>
          </div>
        )}
        <h1 className={`mx-auto mt-9 max-w-[1450px] font-semibold uppercase leading-[1.04] tracking-normal text-zinc-950 dark:text-zinc-100 ${showFlow && labels.title.startsWith("ÖZBEK ") ? "hidden md:block" : ""}`}
          style={{ fontSize: showFlow ? "clamp(25px, 5.5vw, 88px)" : "clamp(48px, 5.5vw, 88px)" }}>
          {showFlow && labels.title.startsWith("ÖZBEK ") ? (
            <span className="inline-flex max-w-full flex-wrap items-baseline justify-center gap-x-[0.24em] gap-y-2">
              <span className="whitespace-nowrap"><AnimatedO />ZBEK</span>
              <span className="whitespace-nowrap">{labels.title.slice(6)}<SpecialistsFlowMark /></span>
            </span>
          ) : (
            <>{labels.title}{showFlow && <SpecialistsFlowMark />}</>
          )}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 md:mt-6 text-zinc-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
          {labels.description}
        </p>
        <div className="mx-auto mt-7 grid max-w-2xl md:mt-10 grid-cols-3 gap-x-2 gap-y-4 border-t border-zinc-200 pt-6 dark:border-white/10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12">
          {items.map((item) => (
            <div key={item.label} className="flex min-w-0 flex-col items-center gap-1 text-center sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-2xl font-semibold tabular-nums tracking-tight text-zinc-950 dark:text-zinc-100"><AnimatedStatNumber value={item.value} /></span>
              <span className="text-[11px] leading-4 text-zinc-500 dark:text-zinc-400 sm:text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
