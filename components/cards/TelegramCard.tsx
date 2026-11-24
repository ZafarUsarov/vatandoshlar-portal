import { Code2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TelegramGroup } from "@/types/telegram";

type TelegramCardProps = {
  group: TelegramGroup;
  index?: number;
  detailsHref?: string;
  detailsLabel?: string;
  variant?: "default" | "directory";
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

function ProfessionalIcon({ shortName }: { shortName: string }) {
  if (shortName === "IT") {
    return <Code2 aria-hidden="true" className="size-5" strokeWidth={1.8} />;
  }

  if (shortName === "KP-ZM") {
    return (
      <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 5.2c-2.1-1.7-4.4-2.1-6.1-.8C3.3 6.5 4.5 10.5 5.7 14c.7 2 1.1 5.8 3 5.8 1.5 0 1.5-4.8 3.3-4.8s1.8 4.8 3.3 4.8c1.9 0 2.3-3.8 3-5.8 1.2-3.5 2.4-7.5-.2-9.6-1.7-1.3-4-.9-6.1.8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return <span>{shortName}</span>;
}

export default function TelegramCard({
  group,
  index: _index = 0,
  detailsHref,
  detailsLabel,
  variant = "default",
}: TelegramCardProps) {
  void _index;
  const isActive = group.status === "active";
  const isDirectory = variant === "directory";

  if (isDirectory) {
    const actionClass = "mt-6 inline-flex min-h-11 items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-[var(--telegram-border,#334155)] dark:text-slate-100 dark:hover:text-teal-300";

    return (
      <article className={`group flex h-full flex-col rounded-[18px] dark:rounded-[14px] border p-5 transition-colors duration-200 sm:p-6 ${isActive ? "border-slate-200 bg-white hover:border-teal-400 dark:border-[var(--telegram-border,#1e293b)] dark:bg-[var(--telegram-card,#0f172a)] dark:hover:border-[var(--telegram-accent,#14b8a6)]" : "border-slate-200 bg-slate-100/60 dark:border-[var(--telegram-border,#1e293b)] dark:bg-[var(--telegram-card-muted,rgba(15,23,42,0.4))]"}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-700 dark:text-[var(--telegram-accent,#5eead4)]">
            {group.shortName}
          </span>
          <span className={`text-xs font-medium ${isActive ? "text-emerald-700 dark:text-[var(--telegram-accent,#34d399)]" : "text-slate-500 dark:text-[var(--telegram-secondary,#94a3b8)]"}`}>
            {group.statusLabel}
          </span>
        </div>
        <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.035em] text-slate-950 dark:text-white">
          {group.state}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-[var(--telegram-secondary,#94a3b8)]">
          {group.description}
        </p>
        {detailsHref ? (
          <Link href={detailsHref} className={actionClass}>
            <span>{detailsLabel}</span>
            <span aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1">→</span>
          </Link>
        ) : group.href ? (
          <a href={group.href} target="_blank" rel="noopener noreferrer" className={actionClass}>
            <span>{group.button}</span>
            <ArrowUpRightIcon className="size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <span className="mt-6 inline-flex min-h-11 items-center border-t border-slate-200 pt-3 text-sm font-medium text-slate-400 dark:border-[var(--telegram-border,#1e293b)] dark:text-slate-500">
            {group.button}
          </span>
        )}
      </article>
    );
  }

  return (
    <article
      className={`
        group relative flex h-full flex-col overflow-hidden
        rounded-[18px] dark:rounded-[14px] border p-5 sm:p-6
        transition-colors duration-200
        ${
          isActive
            ? "border-slate-200 bg-white hover:border-teal-400 dark:border-[var(--telegram-border,#1e293b)] dark:bg-[var(--telegram-card,#0f172a)] dark:hover:border-[var(--telegram-accent,#14b8a6)]"
            : "border-slate-200 bg-slate-100/60 dark:border-[var(--telegram-border,#1e293b)] dark:bg-[var(--telegram-card-muted,rgba(15,23,42,0.4))]"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          aria-hidden="true"
          className={`
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-xl text-sm font-semibold tracking-wide
            ${
              isActive
                ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-[var(--telegram-accent,#5eead4)]"
                : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-[var(--telegram-secondary,#94a3b8)]"
            }
          `}
        >
          <ProfessionalIcon shortName={group.shortName} />
        </div>

        <span
          className={`
            rounded-full px-2.5 py-1
            text-xs font-semibold
            ${
              isActive
                ? "bg-emerald-100 text-emerald-700 dark:bg-[var(--telegram-elevated,rgba(16,185,129,0.1))] dark:text-[var(--telegram-accent,#6ee7b7)]"
                : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-[var(--telegram-secondary,#94a3b8)]"
            }
          `}
        >
          {group.statusLabel}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.035em] text-slate-950 dark:text-white">
        {group.state}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-[var(--telegram-secondary,#94a3b8)]">
        {group.description}
      </p>

      {detailsHref ? (
        <Link
          href={detailsHref}
          className={"mt-6 inline-flex min-h-11 items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-[var(--telegram-border,#334155)] dark:text-slate-100 dark:hover:text-teal-300"}
        >
          {detailsLabel}
          <span aria-hidden="true">→</span>
        </Link>
      ) : group.href ? (
        <a
          href={group.href}
          target="_blank"
          rel="noopener noreferrer"
          className={"mt-6 inline-flex min-h-11 items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm font-semibold text-slate-900 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-[var(--telegram-border,#334155)] dark:text-slate-100 dark:hover:text-teal-300"}
        >
          {group.button}
          <ArrowUpRightIcon className="size-4" />
        </a>
      ) : (
        <span
          className="mt-6 inline-flex min-h-11 items-center border-t border-slate-200 pt-3 text-sm font-medium text-slate-400 dark:border-[var(--telegram-border,#1e293b)] dark:text-slate-500"
        >
          {group.button}
        </span>
      )}
    </article>
  );
}
