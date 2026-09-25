import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CarFront,
  CircleHelp,
  ClipboardCheck,
  Files,
  GraduationCap,
  Handshake,
  House,
  Landmark,
  Languages,
  MailPlus,
  PlaneLanding,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Link } from "../../i18n/navigation";
import type {
  GuideCategory,
  GuideCategoryIcon,
} from "../../types/guide";

type GuideCategoryCardProps = Readonly<{
  category: GuideCategory;
  comingSoonLabel: string;
  articlesLabel: string;
  openLabel: string;
}>;

type IconProps = Readonly<{
  type: GuideCategoryIcon;
}>;

const CATEGORY_ICONS: Readonly<
  Partial<Record<GuideCategoryIcon, LucideIcon>>
> = {
  arrival: PlaneLanding,
  visa: BookOpenCheck,
  family: UsersRound,
  invitation: MailPlus,
  embassy: Landmark,
  documents: Files,
  language: Languages,
  education: GraduationCap,
  career: BriefcaseBusiness,
  "after-arrival": ClipboardCheck,
  recognition: BadgeCheck,
  transport: CarFront,
  housing: House,
  integration: Handshake,
};

function CategoryIcon({ type }: IconProps) {
  const Icon = CATEGORY_ICONS[type] ?? CircleHelp;

  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/80 bg-emerald-50/90 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition-[background-color,border-color,color,box-shadow] duration-300 group-hover:border-emerald-200 group-hover:bg-emerald-100/80 group-hover:text-emerald-800 group-hover:shadow-sm motion-reduce:transition-none dark:border-emerald-400/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:shadow-none dark:group-hover:border-emerald-400/25 dark:group-hover:bg-emerald-500/15 dark:group-hover:text-emerald-200"
    >
      <Icon
        className="size-[1.35rem] transition-transform duration-300 group-hover:-translate-y-px group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        strokeWidth={1.9}
      />
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function GuideCategoryCard({
  category,
  comingSoonLabel,
  articlesLabel,
  openLabel,
}: GuideCategoryCardProps) {
  const href = `/guide/${category.slug}`;
  const titleId = `guide-category-${category.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/10"
      />

      <div className="relative flex items-start justify-between gap-4">
        <CategoryIcon type={category.icon} />

        {category.status === "coming-soon" ? (
          <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            {comingSoonLabel}
          </span>
        ) : (
          <span aria-hidden="true" className="size-8" />
        )}
      </div>

      <h2
        id={titleId}
        className="mt-6 text-xl font-bold tracking-[-0.025em] text-slate-950 dark:text-white"
      >
        <Link
          href={href}
          className="outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 z-10 rounded-[1.75rem]"
          />
          {category.title}
        </Link>
      </h2>

      <p className="relative mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
        {category.description}
      </p>

      <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {category.articleCount} {articlesLabel}
        </p>

        <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          {openLabel}
          <ArrowIcon />
        </span>
      </div>
    </article>
  );
}
