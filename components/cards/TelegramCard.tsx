import type { TelegramGroup } from "@/types/telegram";

type TelegramCardProps = {
  group: TelegramGroup;
  index?: number;
};

interface IconProps {
  className?: string;
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function TelegramCard({
  group,
  index = 0,
}: TelegramCardProps) {
  const isActive = group.status === "active";

  return (
    <article
      className={`
        group relative flex h-full flex-col overflow-hidden
        rounded-[2rem] border p-6
        backdrop-blur-xl
        transition duration-500
        hover:-translate-y-1.5
        ${
          isActive
            ? "border-sky-200 bg-white shadow-[0_20px_60px_-35px_rgba(14,165,233,.35)] dark:border-sky-400/20 dark:bg-white/[0.04]"
            : "border-slate-200 bg-white/70 dark:border-white/[0.08] dark:bg-white/[0.03]"
        }
      `}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          aria-hidden="true"
          className={`
            flex h-16 w-16 shrink-0 items-center justify-center
            rounded-2xl text-lg font-bold
            ${
              isActive
                ? "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
            }
          `}
        >
          {group.shortName}
        </div>

        <span
          className={`
            rounded-full px-3 py-1.5
            text-xs font-semibold
            ${
              isActive
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
            }
          `}
        >
          {group.statusLabel}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">
        {group.state}
      </h3>

      <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
        {group.description}
      </p>

      {group.href ? (
        <a
          href={group.href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-6 inline-flex min-h-11 items-center justify-center gap-2
            rounded-xl bg-sky-600 px-4 py-2.5
            text-sm font-semibold text-white
            transition
            hover:bg-sky-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-sky-500
            focus-visible:ring-offset-2
            dark:focus-visible:ring-offset-slate-950
          "
        >
          {group.button}
          <ArrowUpRightIcon className="size-4" />
        </a>
      ) : (
        <span
          className="
            mt-6 inline-flex min-h-11 items-center justify-center
            rounded-xl bg-slate-100 px-4 py-2.5
            text-sm font-semibold text-slate-500
            dark:bg-white/5 dark:text-slate-400
          "
        >
          {group.button}
        </span>
      )}
    </article>
  );
}
