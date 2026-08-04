import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import type {
  PopularCategory,
  PopularCategoryIcon,
} from "@/types/category";

type CategoryCardProps = Readonly<{
  category: PopularCategory;
  title: string;
  description: string;
  statusLabel: string;
  linkLabel: string;
  index?: number;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function Icon({
  children,
  className = "size-6",
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

function CategoryIcon({
  icon,
}: {
  icon: PopularCategoryIcon;
}) {
  switch (icon) {
    case "medical":
      return (
        <Icon>
          <path d="M12 4v16M4 12h16" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" />
        </Icon>
      );
    case "legal":
      return (
        <Icon>
          <path
            d="M12 3v18M6 6h12M4.5 6 2 12h5L4.5 6Zm15 0L17 12h5l-2.5-6ZM8 21h8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      );
    case "technology":
      return (
        <Icon>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        </Icon>
      );
    case "automotive":
      return (
        <Icon>
          <path
            d="M5 16.5 3.5 14l1.8-5.2A2.5 2.5 0 0 1 7.7 7h8.6a2.5 2.5 0 0 1 2.4 1.8l1.8 5.2-1.5 2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4 14h16v4H4z" />
          <circle cx="7" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
        </Icon>
      );
    case "home":
      return (
        <Icon>
          <path
            d="m3 10 9-7 9 7v10H6V10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 20v-6h4v6" />
        </Icon>
      );
    case "education":
      return (
        <Icon>
          <path
            d="m3 9 9-5 9 5-9 5-9-5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 11.5V16c3 2 9 2 12 0v-4.5M21 9v6"
            strokeLinecap="round"
          />
        </Icon>
      );
    case "finance":
      return (
        <Icon>
          <circle cx="12" cy="12" r="9" />
          <path
            d="M15 8.5c-.7-.8-1.7-1.2-3-1.2-1.8 0-3 .8-3 2.1 0 3.3 6 1.2 6 4.7 0 1.5-1.3 2.6-3.3 2.6-1.4 0-2.6-.5-3.4-1.4M12 5.5v13"
            strokeLinecap="round"
          />
        </Icon>
      );
    case "creative":
      return (
        <Icon>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="12" r="2.5" />
          <path
            d="m13 9 2-2 4 4-2 2M13 15l4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      );
  }
}

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

function getAccentClasses(
  accent: PopularCategory["accent"],
) {
  switch (accent) {
    case "emerald":
      return {
        icon: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
        glow: "bg-emerald-500/10",
      };
    case "blue":
      return {
        icon: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20",
        glow: "bg-blue-500/10",
      };
    case "violet":
      return {
        icon: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/20",
        glow: "bg-violet-500/10",
      };
    case "amber":
      return {
        icon: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
        glow: "bg-amber-500/10",
      };
    case "cyan":
      return {
        icon: "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-500/20",
        glow: "bg-cyan-500/10",
      };
    case "rose":
      return {
        icon: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
        glow: "bg-rose-500/10",
      };
  }
}

export default function CategoryCard({
  category,
  title,
  description,
  statusLabel,
  linkLabel,
  index = 0,
}: CategoryCardProps) {
  const accentClasses = getAccentClasses(category.accent);

  return (
    <article
      className="group relative isolate flex min-h-[320px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/20 sm:p-7"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-20 -top-20 size-48 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125 ${accentClasses.glow}`}
      />

      <div className="relative z-10 flex w-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`flex size-14 items-center justify-center rounded-2xl ring-1 transition duration-300 group-hover:scale-105 group-hover:-rotate-2 ${accentClasses.icon}`}
          >
            <CategoryIcon icon={category.icon} />
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            {statusLabel}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold tracking-[-0.025em] text-slate-950 dark:text-white sm:text-2xl">
            <Link
              href={category.href}
              className="outline-none transition-colors group-hover:text-emerald-600 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:group-hover:text-emerald-400 dark:focus-visible:ring-offset-slate-900"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-20"
              />
              {title}
            </Link>
          </h3>

          <p className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div className="mt-auto border-t border-slate-200 pt-5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition-all duration-300 group-hover:gap-3 dark:text-emerald-400">
            {linkLabel}
            <ArrowUpRightIcon />
          </span>
        </div>
      </div>
    </article>
  );
}
